import type { ConversionResult, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { edgeStyleFor } from '../../shared/edgeStyleFor.js'
import { buildClusterRelationEdges, buildObjectReferenceEdges } from '../../shared/mispCrossReferenceEdges.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { addMispGalaxies, addMispTags } from '../../shared/mispTagsAndGalaxies.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispAttribute, MispGalaxyCluster, MispInput, MispObject } from '../../shared/types.js'

/**
 * `event-root-simplified` variant: the same entities/relationships as
 * `event-root` (`MispEventRootConverter` — see its doc for the full list),
 * with one topology change: an Object's own Attributes are nested as
 * `RawNode.children` on that Object, collapsed (`expanded: false`) by
 * default, instead of flat nodes connected by a `hasAttribute` edge.
 * Pivotick renders a collapsed Object with a single "+" control — click
 * it to reveal that Object's Attributes, "−" to collapse them again.
 *
 * Deliberately scoped to *only* Object → Attribute: an Object is where a
 * MISP export's Attribute count actually explodes (a `file` or
 * `domain-ip` Object can easily carry dozens of Attributes), whereas an
 * Event's own top-level Attributes/Objects are usually few enough to read
 * directly — so the Event node stays flat/always-expanded, exactly like
 * `event-root`, with no "+" control of its own. Concretely: an Event with
 * 3 Objects, each holding 20 Attributes, still shows the Event and all 3
 * Objects immediately (4 nodes) — only each Object's 20 Attributes start
 * collapsed behind its own "+", one Object at a time.
 *
 * Tags and Galaxy Clusters are unaffected either way: they always stay
 * flat, deduplicated nodes connected by an ordinary edge, in both
 * variants — see `addMispTags()`'s doc for why (a node can only nest
 * under one parent, but the same tag/cluster routinely attaches to many
 * entities). Pivotick still re-anchors such an edge sensibly when its
 * target is currently hidden inside a collapsed Object.
 */
export class MispEventRootSimplifiedConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root-simplified',
    name: 'Event as root node (simplified)',
    description:
      'Same as "Event as root node", but each Object\'s Attributes start collapsed and expand on demand via Pivotick\'s +/- control — a clearer overview for Objects with many Attributes.',
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
    const nodeIdByUuid = new Map<string, NodeId>()
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispAttribute['Tag'], parentId: NodeId): void => addMispTags({ tags, parentId, nodes, edges, tagNodeIdByName })
    const addGalaxies = (galaxies: MispAttribute['Galaxy'], parentId: NodeId): void =>
      addMispGalaxies({ galaxies, parentId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters })

    // Builds an Attribute node (id/data + its own Tags/Galaxies), without
    // deciding how it's attached to its parent — that's the caller's job:
    // `addTopLevelAttribute()` pushes it flat with an edge (an Event's own
    // Attribute), `addObject()` nests it directly as a `children` entry
    // (an Object's Attribute) — see class doc for why only the latter
    // collapses.
    const buildAttributeNode = (attribute: MispAttribute): RawNode => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      addTags(attribute.Tag, attributeNodeId)
      addGalaxies(attribute.Galaxy, attributeNodeId)
      return {
        id: attributeNodeId,
        data: {
          label: attribute.value,
          entityType: attribute.type,
          category: attribute.category,
          objectRelation: attribute.object_relation,
          toIds: attribute.to_ids,
          comment: attribute.comment,
          sightingCount: attribute.Sighting?.length,
        },
      }
    }

    // An Event's own top-level Attribute: flat, always-visible node + edge
    // — same as event-root, no collapsing (only an Object's Attributes
    // collapse — see class doc).
    const addTopLevelAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const node = buildAttributeNode(attribute)
      nodes.push(node)
      edges.push({
        from: parentId,
        to: node.id,
        data: attribute.object_relation
          ? { label: attribute.object_relation, kind: 'hasAttribute', category: attribute.category }
          : { kind: 'hasAttribute', category: attribute.category },
        style: edgeStyleFor('hasAttribute'),
      })
    }

    // `parentId: null` for a standalone Object (no Event to hang off of)
    // — it becomes its own root node instead of a child. Its Attributes
    // are always nested as collapsed children (see class doc), whether
    // the Object itself is a root or nested under an Event.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodeIdByUuid.set(object.uuid, objectNodeId)

      const attributeNodes = (object.Attribute ?? []).map(buildAttributeNode)

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
        // Collapsed by default (see class doc) — only set at all when
        // there's actually something to collapse, so an Object with no
        // Attributes doesn't carry a meaningless "expanded: false"/dead
        // +/- control.
        ...(attributeNodes.length > 0 ? { children: attributeNodes, expanded: false } : {}),
      })

      if (parentId) {
        const metaCategory = object['meta-category']
        edges.push({
          from: parentId,
          to: objectNodeId,
          data: metaCategory ? { label: metaCategory, kind: 'hasObject' } : { kind: 'hasObject' },
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
      // The Event node never nests children/expanded — no "+" control of
      // its own (see class doc); its Objects/top-level Attributes are
      // always flat, always-visible nodes, exactly like event-root.
      nodes.push({ id: eventNodeId, data: eventData })
      addTags(event.Tag, eventNodeId)
      addGalaxies(event.Galaxy, eventNodeId)

      // Top-level Attributes only — ones that belong to an Object
      // (object_id set to something other than '0') are added via that
      // Object's own nested Attribute list instead, to avoid emitting
      // them twice.
      const topLevelAttributes = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0')
      for (const attribute of topLevelAttributes) {
        addTopLevelAttribute(attribute, eventNodeId)
      }

      for (const object of event.Object ?? []) {
        addObject(object, eventNodeId)
      }

      // Filled in after the loops above, once the real counts are known —
      // `eventData` is the same object already pushed onto `nodes`, so
      // mutating it here still lands on that node.
      eventData.attributeCount = topLevelAttributes.length
      eventData.objectCount = event.Object?.length ?? 0
      eventData.tagCount = event.Tag?.length ?? 0
    }

    for (const object of standaloneObjects) {
      addObject(object, null)
    }

    // Explicit Object References and GalaxyClusterRelation become extra
    // edges, exactly as in `event-root` — reference targets are resolved
    // by uuid regardless of whether the referenced Attribute is currently
    // nested inside a collapsed Object. See
    // buildObjectReferenceEdges()/buildClusterRelationEdges().
    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    edges.push(...buildObjectReferenceEdges(allObjects, nodeIdByUuid))
    edges.push(...buildClusterRelationEdges(seenClusters, clusterNodeIdById, clusterNodeIdByUuid))

    return { nodes, edges }
  }
}
