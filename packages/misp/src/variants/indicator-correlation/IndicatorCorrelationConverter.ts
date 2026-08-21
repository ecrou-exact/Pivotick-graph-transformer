import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { edgeStyleFor, shouldLabelEdges } from '../../shared/edgeStyleFor.js'
import { buildClusterRelationEdges, buildObjectReferenceEdges } from '../../shared/mispCrossReferenceEdges.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { addMispGalaxies, addMispTags } from '../../shared/mispTagsAndGalaxies.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispAttribute, MispGalaxyCluster, MispInput, MispObject } from '../../shared/types.js'

/**
 * `indicator-correlation` variant: the same entities as `event-root`, but
 * Attributes are deduplicated by `type + value` — MISP's own correlation
 * key (its UI's "Attribute is also in other events" feature) — instead of
 * by uuid. The same indicator (e.g. the same `ip-dst` value) appearing in
 * two different Events becomes *one* node with an edge to each Event/
 * Object that carries it, instead of two disconnected copies. Events and
 * Objects are satellites around whichever indicators connect them, not
 * the graph's organizing hub — the opposite emphasis from every
 * `event-root*` variant, useful for pivoting ("where else has this IOC
 * shown up") rather than reading one Event at a time.
 *
 * This is a simplification of MISP's real correlation engine, which also
 * accounts for warninglists and type-compatible cross-matching (e.g.
 * `domain` vs `hostname`) — here it's a plain exact `(type, value)` match,
 * nothing fuzzier. When the same value repeats, only the *first*
 * occurrence's `category`/`objectRelation`/`toIds`/`comment`/
 * `sightingCount` are kept on the shared node (later occurrences might
 * disagree on these — MISP's own correlation UI has the same limit,
 * showing one canonical record plus "also seen elsewhere"); `data.
 * occurrenceCount` on the node counts every occurrence, and the rendered
 * badge shows it directly (see `MispIconRenderingConverter`'s
 * `secondaryInfoFor()`) whenever it's more than 1.
 *
 * Tags/Galaxies on a since-merged Attribute still all attach to the one
 * shared indicator node (deduplicated the same way `event-root` dedupes
 * Tags/Clusters) — so a `tlp:red` tag on the value in Event A and a
 * `tlp:white` tag on the same value in Event B both end up as edges from
 * the one indicator node, which is the correct (if occasionally
 * contradictory-looking) picture of what the raw data actually says.
 */
export class MispIndicatorCorrelationConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'indicator-correlation',
    name: 'Indicator correlation',
    description:
      'Attributes are deduplicated by type+value across the whole input, so the same indicator seen in multiple Events becomes one shared node — a pivot/correlation view rather than one Event at a time.',
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
    // Every Attribute/Object uuid resolves here — an Object's own uuid
    // maps to its own node id (one per instance, same as event-root);
    // an Attribute's uuid maps to its *shared* indicator node id (many
    // uuids across many occurrences can point at the same node id). Both
    // are what buildObjectReferenceEdges() needs to resolve a reference's
    // target regardless of which kind of node it turned out to be.
    const nodeIdByUuid = new Map<string, NodeId>()
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispAttribute['Tag'], parentId: NodeId): void => addMispTags({ tags, parentId, nodes, edges, tagNodeIdByName })
    const addGalaxies = (galaxies: MispAttribute['Galaxy'], parentId: NodeId): void =>
      addMispGalaxies({ galaxies, parentId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters })

    // Correlation key: exact `type`+`value` match — see class doc for why
    // this is deliberately simpler than MISP's own correlation engine.
    // `indicatorNodeIdByKey` finds the shared node for a repeat
    // occurrence; `indicatorDataById` keeps a live reference to that
    // node's own `data` object so `occurrenceCount` can keep incrementing
    // on every subsequent occurrence, the same "mutate after push()"
    // trick `event-root`'s Event node data uses for its own counts.
    const indicatorNodeIdByKey = new Map<string, NodeId>()
    const indicatorDataById = new Map<NodeId, Record<string, unknown>>()

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const correlationKey = `${attribute.type}::${attribute.value}`
      let indicatorNodeId = indicatorNodeIdByKey.get(correlationKey)

      if (!indicatorNodeId) {
        indicatorNodeId = `attribute:${correlationKey}`
        indicatorNodeIdByKey.set(correlationKey, indicatorNodeId)
        const data: Record<string, unknown> = {
          label: attribute.value,
          entityType: attribute.type,
          // First occurrence's fields only — see class doc.
          category: attribute.category,
          objectRelation: attribute.object_relation,
          toIds: attribute.to_ids,
          comment: attribute.comment,
          sightingCount: attribute.Sighting?.length,
          occurrenceCount: 0,
        }
        indicatorDataById.set(indicatorNodeId, data)
        nodes.push({ id: indicatorNodeId, data })
      }

      const data = indicatorDataById.get(indicatorNodeId)!
      data.occurrenceCount = (data.occurrenceCount as number) + 1

      nodeIdByUuid.set(attribute.uuid, indicatorNodeId)
      // A shared indicator can carry a different object_relation per
      // occurrence (e.g. 'ip' in one Object's template, 'destination-ip'
      // in another) — labeled per-edge, same as event-root, so each
      // occurrence's own relation name still shows correctly even though
      // the node itself is shared.
      edges.push({
        from: parentId,
        to: indicatorNodeId,
        data:
          attribute.object_relation && showEdgeLabels
            ? { label: attribute.object_relation, kind: 'hasAttribute', category: attribute.category }
            : { kind: 'hasAttribute', category: attribute.category },
        style: edgeStyleFor('hasAttribute'),
      })

      addTags(attribute.Tag, indicatorNodeId)
      addGalaxies(attribute.Galaxy, indicatorNodeId)
    }

    // `parentId: null` for a standalone Object (no Event to hang off of) —
    // it becomes its own root node instead of a child, same fallback as
    // every other MISP variant.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
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

      for (const attribute of object.Attribute ?? []) {
        addAttribute(attribute, objectNodeId)
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

      const topLevelAttributes = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0')
      for (const attribute of topLevelAttributes) {
        addAttribute(attribute, eventNodeId)
      }

      for (const object of event.Object ?? []) {
        addObject(object, eventNodeId)
      }

      eventData.attributeCount = topLevelAttributes.length
      eventData.objectCount = event.Object?.length ?? 0
      eventData.tagCount = event.Tag?.length ?? 0
    }

    for (const object of standaloneObjects) {
      addObject(object, null)
    }

    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    edges.push(...buildObjectReferenceEdges(allObjects, nodeIdByUuid, options))
    edges.push(...buildClusterRelationEdges(seenClusters, clusterNodeIdById, clusterNodeIdByUuid, options))

    return { nodes, edges }
  }
}
