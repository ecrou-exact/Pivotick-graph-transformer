import {
  ConverterOptions,
  ConverterVariantMeta,
  GraphData,
  GraphImporter,
  NodeStyleMap,
  NodeTypeAccessor,
  RawEdge,
  RawNode
} from '../../core/src/index'
import { MispAttribute, MispEventInput, MispObject } from './types'

// MISP Event -> Pivotick. The Event is the root node; Attributes and Objects
// hang off it as children. Object Attributes hang off their parent Object.
// Object References (Object -> Object) become edges in their own right.
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

  convert(input: MispEventInput, _options?: ConverterOptions): GraphData {
    const { Event: event } = input
    const nodes: RawNode[] = []
    const edges: RawEdge[] = []

    nodes.push({ id: event.uuid, data: { label: event.info, type: 'misp-event' }, expanded: false })

    for (const attribute of event.Attribute ?? []) {
      this.addAttribute(nodes, edges, event.uuid, attribute)
    }

    for (const object of event.Object ?? []) {
      this.addObject(nodes, edges, event.uuid, object)
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

  getNodeTypeAccessor(): NodeTypeAccessor {
    return node => (node.data?.type as string) ?? 'default'
  }

  getDefaultStyleMap(): NodeStyleMap {
    return {
      'misp-event': { shape: 'square', color: '#3B5BA5' },
      'misp-object': { shape: 'diamond', color: '#5A9367' },
      'misp-attribute': { shape: 'circle', color: '#B4884D' }
    }
  }

  private addAttribute(nodes: RawNode[], edges: RawEdge[], parentId: string, attribute: MispAttribute): void {
    nodes.push({
      id: attribute.uuid,
      data: {
        label: `${attribute.type}: ${attribute.value}`,
        type: 'misp-attribute',
        category: attribute.category
      },
      expanded: false
    })
    edges.push({
      id: `${parentId}-${attribute.uuid}`,
      from: parentId,
      to: attribute.uuid,
      data: { type: 'has-attribute' }
    })
  }

  private addObject(nodes: RawNode[], edges: RawEdge[], eventId: string, object: MispObject): void {
    nodes.push({
      id: object.uuid,
      data: {
        label: object.name,
        type: 'misp-object',
        metaCategory: object.meta_category
      },
      expanded: false
    })
    edges.push({
      id: `${eventId}-${object.uuid}`,
      from: eventId,
      to: object.uuid,
      data: { type: 'has-object' }
    })

    for (const attribute of object.Attribute ?? []) {
      this.addAttribute(nodes, edges, object.uuid, attribute)
    }
  }
}
