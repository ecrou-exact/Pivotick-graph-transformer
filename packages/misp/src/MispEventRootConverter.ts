import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, NodeStyleMap, NodeTypeAccessor, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import { normalizeMispInput } from './normalizeMispInput.js'
import type { MispAttribute, MispInput, MispObject } from './types.js'

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

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodes.push({
        id: attributeNodeId,
        data: { label: attribute.value, entityType: attribute.type, category: attribute.category },
      })
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      edges.push({ from: parentId, to: attributeNodeId })
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

    // TODO: Tag / Galaxy / Sighting are not mapped yet.
    return { nodes, edges }
  }

  getNodeTypeAccessor(): NodeTypeAccessor {
    return (node) => (node.data?.entityType as string | undefined) ?? 'unknown'
  }

  getDefaultStyleMap(): NodeStyleMap {
    // Shape/color only for now — no curated icon set wired up yet, see
    // docs/icons-and-styling.md. `entityType` already uses misp-iconify's
    // key convention (bare attribute `type`, `objects/<name>`) so icons can
    // be layered on later without reshaping this map.
    return {
      event: { shape: 'hexagon', color: '#1f6feb', size: 28 },
    }
  }
}
