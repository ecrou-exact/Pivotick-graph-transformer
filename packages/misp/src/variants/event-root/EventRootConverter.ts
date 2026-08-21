import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from '../../shared/detectMispEvent.js'
import { edgeStyleFor, shouldLabelEdges } from '../../shared/edgeStyleFor.js'
import { buildClusterRelationEdges, buildObjectReferenceEdges } from '../../shared/mispCrossReferenceEdges.js'
import { MispIconRenderingConverter } from '../../shared/MispIconRenderingConverter.js'
import { addMispGalaxies, addMispTags } from '../../shared/mispTagsAndGalaxies.js'
import { normalizeMispInput } from '../../shared/normalizeMispInput.js'
import type { MispAttribute, MispGalaxyCluster, MispInput, MispObject } from '../../shared/types.js'

/**
 * `event-root` variant: each Event is a root/cluster node, with its
 * Attributes and Objects as children; standalone Objects (not attached to
 * any Event) are their own root node. See CONTRIBUTING.md for how this
 * differs from the (planned) `object-refs-only` variant, and
 * `event-root-simplified` (`EventRootSimplifiedConverter`) for a variant
 * with the exact same entities/relationships but a collapsed-by-default,
 * expand-on-demand layout for large graphs, and `event-root-overview`
 * (`EventRootOverviewConverter`) for the coarsest option — Attributes
 * dropped entirely, no expand/collapse, fewest nodes possible.
 *
 * Accepts a single Event, a list of Events, a `{ response: [...] }`
 * restSearch-style wrapper, a standalone Object, or a list of Objects —
 * any mix of these — see `normalizeMispInput.ts`. Multiple Events/Objects
 * in one input all land in the same graph, side by side.
 *
 * Rendering (the icon badge look, styles.json-driven colors/shapes) is
 * shared with every other MISP variant — see `MispIconRenderingConverter`.
 * This class only decides topology: every Attribute/Object is a flat,
 * always-visible node connected by a plain hasObject/hasAttribute edge —
 * unlike `event-root-simplified`, nothing is nested/collapsed.
 */
export class MispEventRootConverter extends MispIconRenderingConverter {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root',
    name: 'Event as root node',
    description: 'Each Event is a cluster node; Attributes and Objects are its children. Standalone Objects root themselves.',
    default: true,
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
    // Tags/Galaxy clusters are commonly reused across many Events/Attributes/
    // Objects in the same input (e.g. every Attribute tagged tlp:white) — one
    // node per unique tag name / cluster id, with an edge from every entity
    // that carries it, rather than a duplicate node each time.
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispAttribute['Tag'], parentId: NodeId): void => addMispTags({ tags, parentId, nodes, edges, tagNodeIdByName })
    const addGalaxies = (galaxies: MispAttribute['Galaxy'], parentId: NodeId): void =>
      addMispGalaxies({ galaxies, parentId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters })

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodes.push({
        id: attributeNodeId,
        data: {
          label: attribute.value,
          entityType: attribute.type,
          category: attribute.category,
          // The attribute's semantic role within its parent Object's
          // template (e.g. 'first-name', 'ip') — MISP's own UI shows this,
          // not the raw `type`, when the attribute belongs to an Object.
          objectRelation: attribute.object_relation,
          // Whether MISP would export this as an actionable indicator
          // (IDS flag) — a real, meaningful distinction (many attributes
          // are context/free-text, not meant for IDS export), not
          // derivable from `type`/`category` alone.
          toIds: attribute.to_ids,
          comment: attribute.comment,
          sightingCount: attribute.Sighting?.length,
        },
      })
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      // object_relation doubles as the edge label when present — it's a
      // real MISP-defined relation name, same idea as an Object
      // Reference's relationship_type, just for Object->Attribute
      // membership instead of Object->Object. Left unlabeled otherwise (a
      // top-level Event Attribute) — a plain "this event has this
      // attribute" edge doesn't need a label to earn its colour/dash
      // styling (see styles.json's "hasAttribute"), and a graph with
      // hundreds of attributes would drown in text if every single one
      // carried a label.
      edges.push({
        from: parentId,
        to: attributeNodeId,
        data:
          attribute.object_relation && showEdgeLabels
            ? { label: attribute.object_relation, kind: 'hasAttribute', category: attribute.category }
            : { kind: 'hasAttribute', category: attribute.category },
        style: edgeStyleFor('hasAttribute'),
      })
      addTags(attribute.Tag, attributeNodeId)
      addGalaxies(attribute.Galaxy, attributeNodeId)
    }

    // `parentId: null` for a standalone Object (no Event to hang off of) —
    // it becomes its own root node instead of a child.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: {
          label: object.name,
          entityType: `objects/${object.name}`,
          description: object.description,
          // MISP's own broad grouping for Object templates (e.g. 'network',
          // 'file', 'financial') — distinct from `object.name`, which is the
          // specific template (e.g. 'domain-ip').
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

      // Top-level Attributes only — ones that belong to an Object
      // (object_id set to something other than '0') are added via the
      // Object's own nested Attribute list instead, to avoid emitting
      // them twice.
      const topLevelAttributes = (event.Attribute ?? []).filter((attribute) => !attribute.object_id || attribute.object_id === '0')
      for (const attribute of topLevelAttributes) {
        addAttribute(attribute, eventNodeId)
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
    // edges, on top of the structural ones above — across every Object/
    // GalaxyCluster we rendered, whether it came from an Event or stood
    // alone. See buildObjectReferenceEdges()/buildClusterRelationEdges().
    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    edges.push(...buildObjectReferenceEdges(allObjects, nodeIdByUuid, options))
    edges.push(...buildClusterRelationEdges(seenClusters, clusterNodeIdById, clusterNodeIdByUuid, options))

    // TODO: Sighting is aggregated into sightingCount on the Attribute
    // node's data, not rendered as its own nodes — individual sightings
    // (a timestamp + source) aren't graph-worthy entities on their own.
    return { nodes, edges }
  }
}
