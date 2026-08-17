import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, NodeStyleMap, NodeTypeAccessor, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import type { MispAttribute, MispEvent } from './types.js'

/**
 * `event-root` variant: the MISP Event is a root/cluster node, with its
 * Attributes and Objects as children. See CONTRIBUTING.md for how this
 * differs from the (planned) `object-refs-only` variant.
 */
export class MispEventRootConverter extends GraphConverter<MispEvent> {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root',
    name: 'Event as root node',
    description: 'The Event is a cluster node; Attributes and Objects are its children.',
    default: true,
  }

  detect(input: unknown): boolean {
    return detectMispEvent(input)
  }

  convert(input: MispEvent, _options?: ConverterOptions): ConversionResult {
    const event = input.Event
    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const nodeIdByUuid = new Map<string, NodeId>()

    const eventNodeId: NodeId = `event:${event.uuid}`
    nodes.push({
      id: eventNodeId,
      data: { label: event.info, entityType: 'event', date: event.date },
    })

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodes.push({
        id: attributeNodeId,
        data: { label: attribute.value, entityType: attribute.type, category: attribute.category },
      })
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      edges.push({ from: parentId, to: attributeNodeId })
    }

    // Top-level Attributes only — ones that belong to an Object (object_id
    // set to something other than '0') are added below, nested under that
    // Object instead, to avoid emitting them twice.
    for (const attribute of event.Attribute ?? []) {
      if (attribute.object_id && attribute.object_id !== '0') continue
      addAttribute(attribute, eventNodeId)
    }

    for (const object of event.Object ?? []) {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: { label: object.name, entityType: `objects/${object.name}`, description: object.description },
      })
      nodeIdByUuid.set(object.uuid, objectNodeId)
      edges.push({ from: eventNodeId, to: objectNodeId })

      for (const attribute of object.Attribute ?? []) {
        addAttribute(attribute, objectNodeId)
      }
    }

    // Explicit Object References become extra edges, on top of the
    // Event->Object structural ones above. A reference's target can be any
    // UUID in the event (another Object, or an Attribute); skip it if it
    // doesn't resolve to a node we created.
    for (const object of event.Object ?? []) {
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
