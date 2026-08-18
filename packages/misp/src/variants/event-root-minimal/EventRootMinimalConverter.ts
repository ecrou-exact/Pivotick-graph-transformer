import type { ConversionResult, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { edgeStyleFor } from '../../shared/edgeStyleFor.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispGalaxy, MispInput, MispTag } from '../../shared/types.js'

/** One Event's node id plus everything collected about it, purely to decide which other Events to link to — never rendered as nodes themselves. */
interface EventContext {
  nodeId: NodeId
  uuid: string
  extendsUuid?: string
  tagNames: Set<string>
  /** Galaxy Cluster id -> its display value (e.g. the actor/malware name), for the shared-cluster edge's label. */
  clusterLabelById: Map<string, string>
}

function collectTagNames(tags: MispTag[] | undefined, into: Set<string>): void {
  for (const tag of tags ?? []) into.add(tag.name)
}

function collectClusterLabels(galaxies: MispGalaxy[] | undefined, into: Map<string, string>): void {
  for (const galaxy of galaxies ?? []) {
    for (const cluster of galaxy.GalaxyCluster ?? []) {
      into.set(cluster.id, cluster.value)
    }
  }
}

/**
 * `event-root-minimal` variant: the absolute smallest graph — one point
 * per Event (or per standalone Object, when there's no Event), nothing
 * else. No Object, Attribute, Tag, or Galaxy Cluster ever becomes its own
 * node here — every one of those is only ever used to decide *whether
 * two Events should be linked*, then discarded.
 *
 * Two Events get a direct edge when:
 * - one explicitly `extends` the other (MISP's own `extends_uuid` field
 *   — a real, directed relationship, so it keeps its arrowhead), or
 * - they share at least one Tag name, anywhere in either Event (its own
 *   Tags, or any of its Objects'/Attributes' Tags), or
 * - they share at least one Galaxy Cluster (by id), anywhere in either
 *   Event, same reach as Tags above.
 *
 * One edge per distinct shared item (not one generic "related" edge) —
 * each is labeled with the actual tag name or cluster value, so *why*
 * two Events are linked stays inspectable without adding a single node
 * for the tag/cluster itself. If Event A and Event B are both tagged
 * `tlp:white` and both carry the same "Cobalt Strike" cluster, that's
 * two edges between them, not one.
 *
 * This is deliberately narrower than `event-root-overview`: no Object/
 * Attribute/Tag/Galaxy Cluster nodes survive at all, and correlation is
 * scoped to Event ↔ Event only — a standalone Object still gets its own
 * point (there's nothing else to represent it by), but never links to
 * anything.
 */
export class MispEventRootMinimalConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root-minimal',
    name: 'Event as root node (minimal)',
    description:
      'Just the Events, as points — plus a direct edge between any two Events that explicitly extend one another or share a Tag/Galaxy Cluster, labeled with what they share. Nothing else is ever shown.',
  }

  detect(input: unknown): boolean {
    return detectMispEvent(input)
  }

  convert(input: MispInput): ConversionResult {
    const { events, objects: standaloneObjects } = normalizeMispInput(input)
    if (events.length === 0 && standaloneObjects.length === 0) {
      throw new Error('Not MISP data: expected an Event, a standalone Object, or a list of either.')
    }

    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const eventContexts: EventContext[] = []

    for (const event of events) {
      const eventNodeId: NodeId = `event:${event.uuid}`
      const eventData: Record<string, unknown> = {
        label: event.info,
        entityType: 'event',
        date: event.date,
        published: event.published,
        analysis: event.analysis,
        threatLevel: event.threat_level_id,
        org: event.Orgc?.name ?? event.Org?.name,
      }

      // Collected purely to decide which other Events this one links to
      // (see class doc) — never rendered as nodes.
      const tagNames = new Set<string>()
      const clusterLabelById = new Map<string, string>()
      collectTagNames(event.Tag, tagNames)
      collectClusterLabels(event.Galaxy, clusterLabelById)

      const topLevelAttributes = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0')
      for (const attribute of topLevelAttributes) {
        collectTagNames(attribute.Tag, tagNames)
        collectClusterLabels(attribute.Galaxy, clusterLabelById)
      }

      let nestedAttributeCount = 0
      for (const object of event.Object ?? []) {
        collectTagNames(object.Tag, tagNames)
        collectClusterLabels(object.Galaxy, clusterLabelById)
        for (const attribute of object.Attribute ?? []) {
          collectTagNames(attribute.Tag, tagNames)
          collectClusterLabels(attribute.Galaxy, clusterLabelById)
        }
        nestedAttributeCount += object.Attribute?.length ?? 0
      }

      // Totals across the *whole* Event, including every nested Object's
      // Attributes — still useful summary data even though none of it
      // becomes a node.
      eventData.attributeCount = topLevelAttributes.length + nestedAttributeCount
      eventData.objectCount = event.Object?.length ?? 0
      eventData.tagCount = event.Tag?.length ?? 0

      nodes.push({ id: eventNodeId, data: eventData })
      eventContexts.push({ nodeId: eventNodeId, uuid: event.uuid, extendsUuid: event.extends_uuid, tagNames, clusterLabelById })
    }

    // A standalone Object (no Event at all) still gets its own point —
    // there's nothing else to represent it by — but never participates
    // in the Event <-> Event correlation below.
    for (const object of standaloneObjects) {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: {
          label: object.name,
          entityType: `objects/${object.name}`,
          description: object.description,
          metaCategory: object['meta-category'],
          attributeCount: object.Attribute?.length ?? 0,
          tagCount: object.Tag?.length ?? 0,
        },
      })
    }

    const eventNodeIdByUuid = new Map(eventContexts.map((context) => [context.uuid, context.nodeId]))

    for (let i = 0; i < eventContexts.length; i++) {
      const eventA = eventContexts[i]

      if (eventA.extendsUuid) {
        const extendedNodeId = eventNodeIdByUuid.get(eventA.extendsUuid)
        if (extendedNodeId) {
          edges.push({ from: eventA.nodeId, to: extendedNodeId, data: { label: 'extends', kind: 'eventExtends' }, style: edgeStyleFor('eventExtends') })
        }
      }

      for (let j = i + 1; j < eventContexts.length; j++) {
        const eventB = eventContexts[j]

        for (const tagName of eventA.tagNames) {
          if (eventB.tagNames.has(tagName)) {
            edges.push({ from: eventA.nodeId, to: eventB.nodeId, data: { label: tagName, kind: 'sharedTag' }, style: edgeStyleFor('sharedTag') })
          }
        }

        for (const [clusterId, clusterLabel] of eventA.clusterLabelById) {
          if (eventB.clusterLabelById.has(clusterId)) {
            edges.push({ from: eventA.nodeId, to: eventB.nodeId, data: { label: clusterLabel, kind: 'sharedGalaxyCluster' }, style: edgeStyleFor('sharedGalaxyCluster') })
          }
        }
      }
    }

    return { nodes, edges }
  }
}
