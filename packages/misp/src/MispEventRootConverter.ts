import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, NodeStyleMap, NodeTypeAccessor, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import { MISP_ATTRIBUTE_ICON_KEYS, MISP_GALAXY_ICON_KEYS, MISP_GENERIC_ICON_KEYS, MISP_OBJECT_ICON_KEYS } from './icons.generated.js'
import { mispIconClass } from './mispIconClass.js'
import { normalizeMispInput } from './normalizeMispInput.js'
import type { MispAttribute, MispGalaxy, MispInput, MispObject, MispTag } from './types.js'

/**
 * `event-root` variant: each Event is a root/cluster node, with its
 * Attributes and Objects as children; standalone Objects (not attached to
 * any Event) are their own root node. See CONTRIBUTING.md for how this
 * differs from the (planned) `object-refs-only` variant.
 *
 * Accepts a single Event, a list of Events, a `{ response: [...] }`
 * restSearch-style wrapper, a standalone Object, or a list of Objects —
 * any mix of these — see `normalizeMispInput.ts`. Multiple Events/Objects
 * in one input all land in the same graph, side by side.
 */
export class MispEventRootConverter extends GraphConverter<MispInput> {
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

  convert(input: MispInput, _options?: ConverterOptions): ConversionResult {
    const { events, objects: standaloneObjects } = normalizeMispInput(input)
    if (events.length === 0 && standaloneObjects.length === 0) {
      throw new Error('Not MISP data: expected an Event, a standalone Object, or a list of either.')
    }

    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const nodeIdByUuid = new Map<string, NodeId>()
    // Tags/Galaxy clusters are commonly reused across many Events/Attributes/
    // Objects in the same input (e.g. every Attribute tagged tlp:white) — one
    // node per unique tag name / cluster id, with an edge from every entity
    // that carries it, rather than a duplicate node each time.
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()

    const addTags = (tags: MispTag[] | undefined, parentId: NodeId): void => {
      for (const tag of tags ?? []) {
        let tagNodeId = tagNodeIdByName.get(tag.name)
        if (!tagNodeId) {
          tagNodeId = `tag:${tag.name}`
          tagNodeIdByName.set(tag.name, tagNodeId)
          nodes.push({
            id: tagNodeId,
            data: { label: tag.name, entityType: 'tag' },
            style: tag.colour ? { color: tag.colour } : undefined,
          })
        }
        edges.push({ from: parentId, to: tagNodeId })
      }
    }

    const addGalaxies = (galaxies: MispGalaxy[] | undefined, parentId: NodeId): void => {
      for (const galaxy of galaxies ?? []) {
        for (const cluster of galaxy.GalaxyCluster ?? []) {
          let clusterNodeId = clusterNodeIdById.get(cluster.id)
          if (!clusterNodeId) {
            clusterNodeId = `cluster:${cluster.id}`
            clusterNodeIdById.set(cluster.id, clusterNodeId)
            nodes.push({
              id: clusterNodeId,
              data: { label: cluster.value, entityType: `galaxies/${galaxy.type}`, description: cluster.description },
            })
          }
          edges.push({ from: parentId, to: clusterNodeId })
        }
      }
    }

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodes.push({
        id: attributeNodeId,
        data: { label: attribute.value, entityType: attribute.type, category: attribute.category },
      })
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      edges.push({ from: parentId, to: attributeNodeId })
      addTags(attribute.Tag, attributeNodeId)
      addGalaxies(attribute.Galaxy, attributeNodeId)
    }

    // `parentId: null` for a standalone Object (no Event to hang off of) —
    // it becomes its own root node instead of a child.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: { label: object.name, entityType: `objects/${object.name}`, description: object.description },
      })
      nodeIdByUuid.set(object.uuid, objectNodeId)
      if (parentId) edges.push({ from: parentId, to: objectNodeId })
      addTags(object.Tag, objectNodeId)
      addGalaxies(object.Galaxy, objectNodeId)

      for (const attribute of object.Attribute ?? []) {
        addAttribute(attribute, objectNodeId)
      }
    }

    for (const event of events) {
      const eventNodeId: NodeId = `event:${event.uuid}`
      nodes.push({
        id: eventNodeId,
        data: { label: event.info, entityType: 'event', date: event.date },
      })
      addTags(event.Tag, eventNodeId)
      addGalaxies(event.Galaxy, eventNodeId)

      // Top-level Attributes only — ones that belong to an Object
      // (object_id set to something other than '0') are added via the
      // Object's own nested Attribute list instead, to avoid emitting
      // them twice.
      for (const attribute of event.Attribute ?? []) {
        if (attribute.object_id && attribute.object_id !== '0') continue
        addAttribute(attribute, eventNodeId)
      }

      for (const object of event.Object ?? []) {
        addObject(object, eventNodeId)
      }
    }

    for (const object of standaloneObjects) {
      addObject(object, null)
    }

    // Explicit Object References become extra edges, on top of the
    // structural ones above — across every Object we rendered, whether it
    // came from an Event or stood alone. A reference's target can be any
    // UUID in the input (another Object, or an Attribute); skip it if it
    // doesn't resolve to a node we created.
    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    for (const object of allObjects) {
      const fromId = nodeIdByUuid.get(object.uuid)
      if (!fromId) continue

      for (const reference of object.ObjectReference ?? []) {
        const toId = nodeIdByUuid.get(reference.referenced_uuid)
        if (!toId) continue
        edges.push({ from: fromId, to: toId, data: { relationshipType: reference.relationship_type } })
      }
    }

    // TODO: Sighting is not mapped yet.
    return { nodes, edges }
  }

  getNodeTypeAccessor(): NodeTypeAccessor {
    return (node) => (node.data?.entityType as string | undefined) ?? 'unknown'
  }

  getDefaultStyleMap(options?: ConverterOptions): NodeStyleMap {
    // `entityType` already uses misp-iconify's key convention (bare
    // attribute `type`, `objects/<name>`, `galaxies/<galaxy-type>`), so
    // one iconClass lookup per known key covers every type misp-iconify
    // ships an icon for. `iconFrame` ('simple' | 'hexagon', default
    // 'simple') is a pure styling toggle — see docs/icons-and-styling.md
    // for why it's a ConverterOptions field rather than a variant.
    // Consumers who need more than that can still override individual
    // entries themselves: `{ ...render, nodeStyleMap: {
    // ...render.nodeStyleMap, domain: { color: 'red' } } }`.
    const frame = options?.iconFrame === 'hexagon' ? 'hexagon' : 'simple'

    const styleMap: NodeStyleMap = {
      event: { shape: 'hexagon', color: '#1f6feb', size: 28 },
      // Tag nodes carry the tag's own MISP colour directly as
      // `style.color` (set in `addTags`, above) rather than through this
      // map, since colour varies per tag, not per type.
      tag: { shape: 'circle', size: 10 },
    }

    for (const key of MISP_ATTRIBUTE_ICON_KEYS) styleMap[key] = { iconClass: mispIconClass(key, frame) }
    for (const key of MISP_OBJECT_ICON_KEYS) styleMap[`objects/${key}`] = { iconClass: mispIconClass(`objects/${key}`, frame) }
    for (const key of MISP_GALAXY_ICON_KEYS) styleMap[`galaxies/${key}`] = { iconClass: mispIconClass(`galaxies/${key}`, frame) }
    for (const key of MISP_GENERIC_ICON_KEYS) {
      styleMap[key] = { ...styleMap[key], iconClass: mispIconClass(key, frame) }
    }

    return styleMap
  }
}
