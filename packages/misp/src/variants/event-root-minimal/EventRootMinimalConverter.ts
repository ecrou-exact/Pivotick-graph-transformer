import type { ConversionResult, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { buildClusterRelationEdges } from '../../shared/mispCrossReferenceEdges.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { addMispGalaxies, addMispTags } from '../../shared/mispTagsAndGalaxies.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispAttribute, MispGalaxyCluster, MispInput, MispObject } from '../../shared/types.js'

/**
 * `event-root-minimal` variant: the smallest graph this converter can
 * produce — one node per Event (or per standalone Object, when there's no
 * Event), plus the Tags and Galaxy Clusters reachable *anywhere* inside
 * it. Objects and Attributes are never rendered as nodes at all, at any
 * level — unlike `event-root-overview` (which still shows Objects), here
 * an Object is fully absorbed into its owning Event/root: its own Tags/
 * Galaxies, and its Attributes' Tags/Galaxies, all roll straight up to
 * the Event (or root Object) as direct edges. "Keeping the logic" means
 * exactly this: every piece of threat classification (TLP, threat actor,
 * malware family, campaign, ...) anywhere in the input is still visible,
 * connected straight to its Event — only the raw structural nesting
 * (which specific Object or Attribute carried it) is dropped.
 *
 * A quick MISP-shape refresher for why this rollup is safe: nesting is
 * always exactly Event → Object → Attribute (Objects don't nest inside
 * each other), so "roll every Tag/Galaxy up to the Event" only ever means
 * walking one or two levels down, never an unbounded tree.
 *
 * Object References can't be expressed at all here (both of its ends are
 * always an Object or Attribute, neither of which exists as a node in
 * this variant) — silently dropped. GalaxyClusterRelation is unaffected,
 * since Galaxy Cluster nodes still exist and dedupe exactly as in every
 * other variant — see `addMispGalaxies()`'s doc.
 *
 * `attributeCount`/`objectCount`/`tagCount` on the Event's node data are
 * still totals across the *whole* Event (including every nested Object's
 * Attributes) — the sidebar/tooltip can still answer "how much detail is
 * this hiding," same spirit as `event-root-overview`, just summed one
 * level deeper since Objects themselves don't get their own node/count.
 */
export class MispEventRootMinimalConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root-minimal',
    name: 'Event as root node (minimal)',
    description:
      'The smallest graph possible: one node per Event, plus every Tag/Galaxy Cluster reachable anywhere inside it, rolled straight up as a direct edge. Objects and Attributes never appear as nodes.',
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
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispAttribute['Tag'], rootId: NodeId): void => addMispTags({ tags, parentId: rootId, nodes, edges, tagNodeIdByName })
    const addGalaxies = (galaxies: MispAttribute['Galaxy'], rootId: NodeId): void =>
      addMispGalaxies({ galaxies, parentId: rootId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters })

    // Rolls every Tag/Galaxy an Object (and its own Attributes) carries
    // straight up to `rootId` — the Object/Attribute nodes themselves
    // never exist in this variant, only their classification does. See
    // class doc for why this is a safe, bounded walk (Objects don't
    // nest inside each other).
    const rollUpObject = (object: MispObject, rootId: NodeId): void => {
      addTags(object.Tag, rootId)
      addGalaxies(object.Galaxy, rootId)
      for (const attribute of object.Attribute ?? []) {
        addTags(attribute.Tag, rootId)
        addGalaxies(attribute.Galaxy, rootId)
      }
    }

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
      nodes.push({ id: eventNodeId, data: eventData })
      addTags(event.Tag, eventNodeId)
      addGalaxies(event.Galaxy, eventNodeId)

      // Top-level Attributes only — ones that belong to an Object
      // (object_id set to something other than '0') are rolled up via
      // that Object's own list instead, to avoid double-counting/double-
      // attaching their Tags/Galaxies.
      const topLevelAttributes = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0')
      for (const attribute of topLevelAttributes) {
        addTags(attribute.Tag, eventNodeId)
        addGalaxies(attribute.Galaxy, eventNodeId)
      }

      let nestedAttributeCount = 0
      for (const object of event.Object ?? []) {
        rollUpObject(object, eventNodeId)
        nestedAttributeCount += object.Attribute?.length ?? 0
      }

      // Totals across the *whole* Event, including every nested Object's
      // Attributes — see class doc.
      eventData.attributeCount = topLevelAttributes.length + nestedAttributeCount
      eventData.objectCount = event.Object?.length ?? 0
      eventData.tagCount = event.Tag?.length ?? 0
    }

    // A standalone Object (no Event to roll up into) becomes its own
    // root instead — same fallback every other MISP variant uses.
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
      rollUpObject(object, objectNodeId)
    }

    // GalaxyClusterRelation is unaffected — Galaxy Cluster nodes still
    // exist and dedupe exactly as in every other variant. Object
    // References can't be expressed at all here (both ends are always
    // an Object/Attribute, neither of which is a node in this variant).
    edges.push(...buildClusterRelationEdges(seenClusters, clusterNodeIdById, clusterNodeIdByUuid))

    return { nodes, edges }
  }
}
