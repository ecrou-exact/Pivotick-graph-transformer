import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { edgeStyleFor, shouldLabelEdges } from '../../shared/edgeStyleFor.js'
import { buildClusterRelationEdges, buildObjectReferenceEdges } from '../../shared/mispCrossReferenceEdges.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { addMispGalaxies, addMispTags } from '../../shared/mispTagsAndGalaxies.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispGalaxyCluster, MispInput, MispObject } from '../../shared/types.js'

/**
 * `event-root-overview` variant: the coarsest MISP mapping — the fewest
 * nodes that still tell a coherent story. Attributes (the raw indicator
 * values — IPs, hashes, domains, ...) are dropped entirely: not rendered,
 * not collapsed, not counted as nodes at all. Only the "big picture"
 * entities remain: Events, Objects, Tags, and Galaxy Clusters (threat
 * actor / malware / campaign classifications) — the narrative context an
 * analyst wants at a glance, without every raw IOC cluttering the canvas.
 *
 * Unlike `event-root-simplified`, there is no expand/collapse anywhere in
 * this variant — nothing is hidden-but-reachable; Attributes are simply
 * absent from the graph. See `event-root-minimal`
 * (`EventRootMinimalConverter`) for an even coarser option: just Events
 * as points, directly linked to each other when they share context —
 * no Object/Tag/Galaxy Cluster nodes survive at all. An Object's
 * `attributeCount`/`tagCount` are
 * still carried on its node data (visible in the sidebar/tooltip) even
 * though the Attributes themselves never become nodes, so "how much detail
 * did this collapse" is still answerable without rendering it.
 *
 * Same entities' Tags/Galaxies still dedupe exactly as in `event-root` —
 * see `addMispTags()`'s doc. An Attribute's *own* Tags are the one thing
 * this variant can't show at all (there's no Attribute node for them to
 * attach to) — that's an accepted trade-off of "fewest nodes possible."
 * Likewise, an Object Reference whose target is an Attribute (rather than
 * another Object) silently doesn't resolve to any edge, same as any other
 * reference to a node this variant didn't create.
 */
export class MispEventRootOverviewConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root-overview',
    name: 'Event as root node (overview)',
    description: 'Same as "Event as root node", but Attributes are omitted entirely — only Events, Objects, Tags, and Galaxy Clusters appear. No expand/collapse; the fewest nodes that still tell a coherent story.',
  }

  detect(input: unknown): boolean {
    return detectMispEvent(input)
  }

  convert(input: MispInput, options?: ConverterOptions): ConversionResult {
    const { events, objects: standaloneObjects } = normalizeMispInput(input)
    if (events.length === 0 && standaloneObjects.length === 0) {
      throw new Error('Not MISP data: expected an Event, a standalone Object, or a list of either.')
    }

    const showEdgeLabels = shouldLabelEdges(options)
    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const nodeIdByUuid = new Map<string, NodeId>()
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispObject['Tag'], parentId: NodeId): void => addMispTags({ tags, parentId, nodes, edges, tagNodeIdByName })
    const addGalaxies = (galaxies: MispObject['Galaxy'], parentId: NodeId): void =>
      addMispGalaxies({ galaxies, parentId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters })

    // `parentId: null` for a standalone Object (no Event to hang off of) —
    // it becomes its own root node instead of a child. Deliberately no
    // Attribute nodes/edges anywhere below — see class doc.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: {
          label: object.name,
          entityType: `objects/${object.name}`,
          description: object.description,
          metaCategory: object['meta-category'],
          // Still carried on node data even though Attributes never
          // become nodes here — the sidebar/tooltip can still answer
          // "how much detail is this hiding" without rendering it.
          attributeCount: object.Attribute?.length ?? 0,
          tagCount: object.Tag?.length ?? 0,
        },
      })
      nodeIdByUuid.set(object.uuid, objectNodeId)
      if (parentId) {
        const metaCategory = object['meta-category']
        edges.push({
          from: parentId,
          to: objectNodeId,
          data: metaCategory && showEdgeLabels ? { label: metaCategory, kind: 'hasObject' } : { kind: 'hasObject' },
          style: edgeStyleFor('hasObject'),
        })
      }
      addTags(object.Tag, objectNodeId)
      addGalaxies(object.Galaxy, objectNodeId)
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

      for (const object of event.Object ?? []) {
        addObject(object, eventNodeId)
      }

      // Top-level Attribute count only — not rendered as nodes at all
      // (unlike event-root/event-root-simplified), just retained as a
      // fact on the Event's own data.
      const topLevelAttributeCount = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0').length
      eventData.attributeCount = topLevelAttributeCount
      eventData.objectCount = event.Object?.length ?? 0
      eventData.tagCount = event.Tag?.length ?? 0
    }

    for (const object of standaloneObjects) {
      addObject(object, null)
    }

    // Object References/GalaxyClusterRelation resolve exactly as in
    // event-root — a reference whose target is an Attribute (which never
    // became a node in this variant) simply doesn't resolve to an edge,
    // same as any other reference to a node we didn't create.
    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    edges.push(...buildObjectReferenceEdges(allObjects, nodeIdByUuid, options))
    edges.push(...buildClusterRelationEdges(seenClusters, clusterNodeIdById, clusterNodeIdByUuid, options))

    return { nodes, edges }
  }
}
