import {
  ConverterOptions,
  ConverterVariantMeta,
  GraphData,
  GraphImporter,
  RawEdge,
  RawNode,
  resolveNodeAppearance
} from '../../core/src/index'
import { MispAttribute, MispEventInput, MispObject } from './types'

// MISP Event -> Pivotick. The Event is the root node; Attributes and Objects
// hang off it as children. Object Attributes hang off their parent Object.
// Object References (Object -> Object) become edges in their own right.
//
// Visual tuning (shape/color/icon/extra data, per node type or category) is
// entirely driven by `options.styleRules` (see resolveNodeAppearance in
// core) — this file only ever sets sensible built-in defaults.
export class MispEventImporter extends GraphImporter<MispEventInput> {
  readonly format = 'misp'
  readonly variant: ConverterVariantMeta = {
    id: 'event-root',
    name: 'Event as root node',
    description: 'The MISP Event is the root node; Attributes and Objects are its children, Object References become edges between Objects.',
    default: true
  }

  detect(input: unknown): boolean {
    if (typeof input !== 'object' || input === null) return false
    const event = (input as Record<string, unknown>).Event
    if (typeof event !== 'object' || event === null) return false
    return 'uuid' in event && 'info' in event
  }

  convert(input: MispEventInput, options?: ConverterOptions): GraphData {
    const { Event: event } = input
    const nodes: RawNode[] = []
    const edges: RawEdge[] = []

    const { data: eventData, style: eventStyle } = resolveNodeAppearance(
      { label: event.info, type: 'misp-event' },
      { shape: 'square', color: '#3B5BA5' },
      options?.styleRules
    )
    nodes.push({ id: event.uuid, data: eventData, style: eventStyle, expanded: false })

    for (const attribute of event.Attribute ?? []) {
      this.addAttribute(nodes, edges, event.uuid, attribute, options)
    }

    for (const object of event.Object ?? []) {
      this.addObject(nodes, edges, event.uuid, object, options)
    }

    for (const object of event.Object ?? []) {
      for (const reference of object.ObjectReference ?? []) {
        edges.push({
          id: `${object.uuid}-${reference.referenced_uuid}`,
          from: object.uuid,
          to: reference.referenced_uuid,
          data: { label: reference.relationship_type, type: 'misp-object-reference' }
        })
      }
    }

    return { nodes, edges }
  }

  private addAttribute(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    attribute: MispAttribute,
    options?: ConverterOptions
  ): void {
    const { data, style } = resolveNodeAppearance(
      {
        label: `${attribute.type}: ${attribute.value}`,
        type: 'misp-attribute',
        category: attribute.category
      },
      { shape: 'circle', color: '#B4884D' },
      options?.styleRules
    )
    nodes.push({ id: attribute.uuid, data, style, expanded: false })
    edges.push({
      id: `${parentId}-${attribute.uuid}`,
      from: parentId,
      to: attribute.uuid,
      data: { type: 'has-attribute' }
    })
  }

  private addObject(
    nodes: RawNode[],
    edges: RawEdge[],
    eventId: string,
    object: MispObject,
    options?: ConverterOptions
  ): void {
    const { data, style } = resolveNodeAppearance(
      {
        label: object.name,
        type: 'misp-object',
        metaCategory: object.meta_category
      },
      { shape: 'diamond', color: '#5A9367' },
      options?.styleRules
    )
    nodes.push({ id: object.uuid, data, style, expanded: false })
    edges.push({
      id: `${eventId}-${object.uuid}`,
      from: eventId,
      to: object.uuid,
      data: { type: 'has-object' }
    })

    for (const attribute of object.Attribute ?? []) {
      this.addAttribute(nodes, edges, object.uuid, attribute, options)
    }
  }
}
