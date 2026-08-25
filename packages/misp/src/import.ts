import {
  ConverterOptions,
  ConverterVariantMeta,
  GraphData,
  GraphImporter,
  NodeStyle,
  RawEdge,
  RawNode,
  buildIconLabelCard,
  buildTagChip,
  estimateCardSize,
  resolveNodeAppearance
} from '../../core/src/index'
import { MISP_ATTRIBUTE_NODE_DEFAULT } from './attribute/defaults'
import { MISP_ATTRIBUTE_FIELDS } from './attribute/fields'
import { formatMispAttributeField } from './attribute/formatters'
import { MispAttribute } from './attribute/types'
import { MISP_EVENT_NODE_DEFAULT } from './event/defaults'
import { MISP_EVENT_FIELDS } from './event/fields'
import { formatMispEventField } from './event/formatters'
import { MispEventInput } from './event/types'
import { MISP_ICONS } from './icons'
import { MISP_OBJECT_NODE_DEFAULT } from './object/defaults'
import { MISP_OBJECT_FIELDS } from './object/fields'
import { formatMispObjectField } from './object/formatters'
import { MispObject } from './object/types'
import { MISP_TAG_FIELDS } from './tag/fields'
import { MispTag } from './tag/types'

// One node-style default per MISP concept, each living next to that
// concept's other files (event/, attribute/, object/, ...) — merged here
// since this importer is the only thing that needs to look one up by node
// type. Add a new concept's default to this map as it gets implemented.
const NODE_DEFAULTS: Record<string, Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number }> = {
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
    // The same Tag (same MISP tag id) is often attached to the Event and
    // to many of its Attributes — one shared node per tag id, with an
    // edge from every entity that carries it, instead of one node per
    // attachment.
    const seenTagIds = new Set<string>()

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
      // `label` is required here — Pivotick's own tooltip title resolver
      // reads `data.label` directly (falls back to "Could not resolve
      // title" otherwise). The demo's nodePropertiesMap hides it from the
      // properties list so it doesn't also duplicate the card's title.
      { ...displayFields, label: event.info, type: 'misp-event' },
      this.defaultStyle('misp-event', event.info, { theme: options?.theme }),
      options?.styleRules
    )
    nodes.push({ id: event.uuid, data: eventData, style: eventStyle, expanded: false })

    for (const tag of event.Tag ?? []) {
      this.addTag(nodes, edges, event.uuid, tag, seenTagIds, options)
    }

    for (const attribute of event.Attribute ?? []) {
      this.addAttribute(nodes, edges, event.uuid, attribute, seenTagIds, options)
    }

    for (const object of event.Object ?? []) {
      this.addObject(nodes, edges, event.uuid, object, seenTagIds, options)
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
    seenTagIds: Set<string>,
    options?: ConverterOptions
  ): void {
    // The value is the card's title; its `type` ("text", "ip-dst", ...)
    // shows as the small badge underneath instead of being prefixed onto
    // the title — same treatment as an Object's meta-category badge.
    const label = attribute.value

    // Only the fields listed in MISP_ATTRIBUTE_FIELDS reach the node's
    // `data` (and therefore the properties panel/tooltip) — see
    // attribute/fields.ts to add/remove/reorder what's shown.
    const displayFields: Record<string, unknown> = {}
    for (const field of MISP_ATTRIBUTE_FIELDS) {
      const rawValue = attribute[field.source ?? field.key]
      displayFields[field.key] = formatMispAttributeField(field.format, rawValue, attribute)
    }

    // misp-iconify has a dedicated icon for ~51 known Attribute types
    // ("ip-dst", "sha256", "email-src", ...) — use it when this Attribute's
    // `type` matches one, otherwise NODE_DEFAULTS' generic `attribute` icon
    // applies.
    const iconOverride = MISP_ICONS[`attributes/${attribute.type}`] ? `attributes/${attribute.type}` : undefined

    const { data, style } = resolveNodeAppearance(
      // `label` is required here — see the same note in convert() for Event.
      { ...displayFields, label, type: 'misp-attribute' },
      this.defaultStyle('misp-attribute', label, { theme: options?.theme, iconOverride, badge: attribute.type }),
      options?.styleRules
    )
    nodes.push({ id: attribute.uuid, data, style, expanded: false })
    edges.push({
      id: `${parentId}-${attribute.uuid}`,
      from: parentId,
      to: attribute.uuid,
      data: { type: 'has-attribute' }
    })

    for (const tag of attribute.Tag ?? []) {
      this.addTag(nodes, edges, attribute.uuid, tag, seenTagIds, options)
    }
  }

  private addObject(
    nodes: RawNode[],
    edges: RawEdge[],
    eventId: string,
    object: MispObject,
    seenTagIds: Set<string>,
    options?: ConverterOptions
  ): void {
    // Only the fields listed in MISP_OBJECT_FIELDS reach the node's `data`
    // (and therefore the properties panel/tooltip) — see object/fields.ts
    // to add/remove/reorder what's shown.
    const displayFields: Record<string, unknown> = {}
    for (const field of MISP_OBJECT_FIELDS) {
      const rawValue = object[field.source ?? field.key]
      displayFields[field.key] = formatMispObjectField(field.format, rawValue, object)
    }

    // misp-iconify has a dedicated icon for ~213 known Object names
    // ("domain-ip", "file", "email", ...) — use it when this Object's name
    // matches one, otherwise NODE_DEFAULTS' generic `object` icon applies.
    const iconOverride = MISP_ICONS[`objects/${object.name}`] ? `objects/${object.name}` : undefined

    const { data, style } = resolveNodeAppearance(
      // `label` is required here — see the same note in convert() for Event.
      { ...displayFields, label: object.name, type: 'misp-object' },
      this.defaultStyle('misp-object', object.name, { theme: options?.theme, iconOverride, badge: object['meta-category'] as string | undefined }),
      options?.styleRules
    )
    nodes.push({ id: object.uuid, data, style, expanded: false })
    edges.push({
      id: `${eventId}-${object.uuid}`,
      from: eventId,
      to: object.uuid,
      data: { type: 'has-object' }
    })

    for (const tag of object.Tag ?? []) {
      this.addTag(nodes, edges, object.uuid, tag, seenTagIds, options)
    }

    for (const attribute of object.Attribute ?? []) {
      this.addAttribute(nodes, edges, object.uuid, attribute, seenTagIds, options)
    }
  }

  private addTag(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    tag: MispTag,
    seenTagIds: Set<string>,
    options?: ConverterOptions
  ): void {
    const tagNodeId = `tag-${tag.id}`

    if (!seenTagIds.has(tag.id)) {
      seenTagIds.add(tag.id)

      // Only the fields listed in MISP_TAG_FIELDS reach the node's `data`
      // (and therefore the properties panel/tooltip) — see tag/fields.ts
      // to add/remove/reorder what's shown.
      const displayFields: Record<string, unknown> = {}
      for (const field of MISP_TAG_FIELDS) {
        displayFields[field.key] = tag[field.source ?? field.key]
      }

      const background = tag.colour ?? '#888888'
      const { data, style } = resolveNodeAppearance(
        // `label` is required here — see the same note in convert() for
        // Event. Unlike the icon-card concepts, a Tag renders as a small
        // colour-filled chip (buildTagChip) rather than buildIconLabelCard
        // — MISP tags don't have an icon, just a name and a colour.
        { ...displayFields, label: tag.name, type: 'misp-tag' },
        {
          shape: 'square',
          color: 'transparent',
          strokeColor: 'transparent',
          size: estimateCardSize(tag.name, { hasIcon: false, fontSize: 11, padding: 14 }),
          html: () => buildTagChip(tag.name, { background })
        },
        options?.styleRules
      )
      nodes.push({ id: tagNodeId, data, style, expanded: false })
    }

    edges.push({
      id: `${parentId}-${tagNodeId}`,
      from: parentId,
      to: tagNodeId,
      data: { type: 'has-tag' }
    })
  }

  // Reads NODE_DEFAULTS for `type` and turns its icon (if any) into an
  // icon+label html card; falls back to Pivotick's plain `text` field for
  // types with no icon defined yet. `iconOverride` wins over NODE_DEFAULTS'
  // icon — used where the icon varies per node instance rather than being
  // fixed per type (a MISP Object's icon depends on its `name`).
  //
  // The card is a DOM snippet baked once at conversion time (Pivotick's
  // `style.html`), not CSS — it can't pick up Pivotick's own `data-theme`
  // toggle on its own, so the caller's `theme` (see ConverterOptions in
  // core/types.ts) picks its background explicitly instead.
  private defaultStyle(type: string, label: string, options?: {
    theme?: 'dark' | 'light'
    iconOverride?: string
    badge?: string
  }): Partial<NodeStyle> {
    const { icon: defaultIcon, accentColor, fontSize, iconSize, ...style } = NODE_DEFAULTS[type] ?? {}
    const icon = options?.iconOverride ?? defaultIcon
    if (icon && MISP_ICONS[icon]) {
      // Not near-black — a muted accent color (like Object's #524948)
      // barely reads against a background that dark; a lighter charcoal
      // keeps the card readable while still looking like a dark theme.
      const background = options?.theme === 'light' ? '#FFFFFF' : '#33373C'
      const badge = options?.badge
      return {
        ...style,
        size: estimateCardSize(label, { hasIcon: true, fontSize, iconSize, extraLines: badge ? 1 : 0, secondaryText: badge }),
        html: () => buildIconLabelCard(MISP_ICONS[icon], label, { textColor: accentColor, borderColor: accentColor, background, badge, fontSize, iconSize })
      }
    }
    return { ...style, text: label }
  }
}
