import {
  ConverterOptions,
  ConverterVariantMeta,
  GraphData,
  GraphImporter,
  NodeStyle,
  RawEdge,
  RawNode,
  buildIconLabelCard,
  estimateCardSize,
  resolveNodeAppearance
} from '../../core/src/index'
import { MISP_ATTRIBUTE_NODE_DEFAULT } from './attribute/defaults'
import { MispAttribute } from './attribute/types'
import { MISP_EVENT_NODE_DEFAULT } from './event/defaults'
import { MISP_EVENT_FIELDS } from './event/fields'
import { formatMispEventField } from './event/formatters'
import { MispEventInput } from './event/types'
import { MISP_ICONS } from './icons'
import { MISP_OBJECT_NODE_DEFAULT } from './object/defaults'
import { MispObject } from './object/types'

// One node-style default per MISP concept, each living next to that
// concept's other files (event/, attribute/, object/, ...) — merged here
// since this importer is the only thing that needs to look one up by node
// type. Add a new concept's default to this map as it gets implemented.
const NODE_DEFAULTS: Record<string, Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string }> = {
  'misp-event': MISP_EVENT_NODE_DEFAULT,
  'misp-attribute': MISP_ATTRIBUTE_NODE_DEFAULT,
  'misp-object': MISP_OBJECT_NODE_DEFAULT
}

// MISP Event -> Pivotick. The Event is the root node; Attributes and Objects
// hang off it as children. Object Attributes hang off their parent Object.
// Object References (Object -> Object) become edges in their own right.
//
// Visual tuning (shape/color/icon/extra data, per node type or category) is
// entirely driven by `options.styleRules` (see resolveNodeAppearance in
// core) on top of NODE_DEFAULTS above — this file only wires the two
// together.
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

    // Only the fields listed in MISP_EVENT_FIELDS reach the node's `data`
    // (and therefore the properties panel/tooltip) — see event/fields.ts to
    // add/remove/reorder what's shown, and event/formatters.ts for how raw
    // values (epoch timestamps, distribution codes, Org/Orgc objects, ...)
    // become readable ones.
    const displayFields: Record<string, unknown> = {}
    for (const field of MISP_EVENT_FIELDS) {
      const rawValue = event[field.source ?? field.key]
      displayFields[field.key] = formatMispEventField(field.format, rawValue, event)
    }

    const { data: eventData, style: eventStyle } = resolveNodeAppearance(
      { ...displayFields, label: event.info, type: 'misp-event' },
      this.defaultStyle('misp-event', event.info, options?.theme),
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
    const label = `${attribute.type}: ${attribute.value}`
    const { data, style } = resolveNodeAppearance(
      { label, type: 'misp-attribute', category: attribute.category },
      this.defaultStyle('misp-attribute', label),
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
      { label: object.name, type: 'misp-object', metaCategory: object.meta_category },
      this.defaultStyle('misp-object', object.name),
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

  // Reads NODE_DEFAULTS for `type` and turns its `icon` key (if any) into an
  // icon+label html card; falls back to Pivotick's plain `text` field for
  // types with no icon defined yet.
  //
  // The card is a DOM snippet baked once at conversion time (Pivotick's
  // `style.html`), not CSS — it can't pick up Pivotick's own `data-theme`
  // toggle on its own, so the caller's `theme` (see ConverterOptions in
  // core/types.ts) picks its background explicitly instead.
  private defaultStyle(type: string, label: string, theme?: 'dark' | 'light'): Partial<NodeStyle> {
    const { icon, accentColor, ...style } = NODE_DEFAULTS[type] ?? {}
    if (icon && MISP_ICONS[icon]) {
      const background = theme === 'light' ? '#FFFFFF' : '#1C1F24'
      return {
        ...style,
        size: estimateCardSize(label, { hasIcon: true }),
        html: () => buildIconLabelCard(MISP_ICONS[icon], label, { textColor: accentColor, borderColor: accentColor, background })
      }
    }
    return { ...style, text: label }
  }
}
