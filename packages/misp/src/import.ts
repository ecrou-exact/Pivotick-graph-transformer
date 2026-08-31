import {
  ConverterOptions,
  ConverterVariantMeta,
  GraphData,
  GraphImporter,
  NodeStyle,
  RawEdge,
  RawNode,
  RawNote,
  buildIconLabelCard,
  buildTagChip,
  estimateCardSize,
  resolveNodeAppearance
} from '../../core/src/index'
import { MISP_ATTRIBUTE_GROUP_NODE_DEFAULT, MISP_ATTRIBUTE_NODE_DEFAULT } from './attribute/defaults'
import { MISP_ATTRIBUTE_FIELDS } from './attribute/fields'
import { formatMispAttributeField } from './attribute/formatters'
import { MispAttribute } from './attribute/types'
import { MISP_EVENT_NODE_DEFAULT } from './event/defaults'
import { MISP_EVENT_FIELDS } from './event/fields'
import { formatMispEventField } from './event/formatters'
import { MispEvent, MispEventInput, MispRelatedEventSummary } from './event/types'
import { GALAXY_METALLIC_SHEEN, galaxyPalette } from './galaxy/colour'
import { MISP_GALAXY_CLUSTERS_NODE_DEFAULT, MISP_GALAXY_NODE_DEFAULT } from './galaxy/defaults'
import { MISP_GALAXY_CLUSTER_FIELDS, MISP_GALAXY_FIELDS } from './galaxy/fields'
import { MispGalaxy, MispGalaxyCluster } from './galaxy/types'
import { MISP_ICONS } from './icons'
import { MISP_OBJECT_NODE_DEFAULT } from './object/defaults'
import { MISP_OBJECT_FIELDS } from './object/fields'
import { formatMispObjectField } from './object/formatters'
import { RELATIONSHIP_EDGE_COLOR } from './object/relationshipColour'
import { MispObject } from './object/types'
import { MISP_SIGHTING_NODE_DEFAULT, MISP_SIGHTING_TYPE_NODE_DEFAULT } from './sighting/defaults'
import { SIGHTING_THUMB_DOWN_ICON, SIGHTING_THUMB_UP_ICON } from './sighting/icons'
import { SightingGroupSummary, summarizeSightings } from './sighting/summarize'
import { MispSighting } from './sighting/types'
import { MISP_TAG_GROUP_NODE_DEFAULT } from './tag/defaults'
import { MISP_TAG_FIELDS } from './tag/fields'
import { MispTag } from './tag/types'

// Every non-relationship edge (has-tag, has-attribute, has-object, ...) —
// plain structure, not a MISP relationship — gets this one neutral grey, so
// RELATIONSHIP_EDGE_COLOR's blue (object-reference edges) actually reads as
// a distinct *kind* of edge instead of blending into whatever Pivotick's
// own default stroke happens to be.
const STRUCTURAL_EDGE_COLOR = '#9CA3AF'

// correlateEvents' own edges (a RelatedEvent link, or an event -> shared-
// indicator hub) — same amber as MISP_CORRELATION_NODE_DEFAULT's accent
// below, so "this is about correlation" reads as one consistent colour.
const CORRELATION_EDGE_COLOR = '#F59E0B'

// The shared-indicator hub node correlateEvents() builds — not a MISP
// concept with its own folder, just an Attribute value elevated to hub
// status because it recurs across events. Vivid amber so it reads as the
// one thing this view exists to highlight; icon falls back to the generic
// `attribute` glyph (correlateEvents overrides it per the sample's real
// `type`, same lookup addAttribute uses, whenever misp-iconify has one).
const MISP_CORRELATION_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'square',
  color: 'transparent',
  strokeColor: 'transparent',
  icon: 'attribute',
  accentColor: '#F59E0B',
  fontSize: 11,
  iconSize: 20
}

// One node-style default per MISP concept, each living next to that
// concept's other files (event/, attribute/, object/, ...) — merged here
// since this importer is the only thing that needs to look one up by node
// type. Add a new concept's default to this map as it gets implemented.
// Exported (not just an implementation detail) because it's the only place
// that knows each type's `accentColor` — the consumer's node's own `style.color`
// is always 'transparent' (see buildIconLabelCard.ts), so a Pivotick `UI.legend`
// keyed on `type` can't sample a real colour and needs these declared as its
// own `entries` instead.
export const NODE_DEFAULTS: Record<string, Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number }> = {
  'misp-event': MISP_EVENT_NODE_DEFAULT,
  'misp-attribute': MISP_ATTRIBUTE_NODE_DEFAULT,
  'misp-attribute-group': MISP_ATTRIBUTE_GROUP_NODE_DEFAULT,
  'misp-object': MISP_OBJECT_NODE_DEFAULT,
  'misp-tag-group': MISP_TAG_GROUP_NODE_DEFAULT,
  'misp-galaxy-group': MISP_GALAXY_CLUSTERS_NODE_DEFAULT,
  'misp-galaxy': MISP_GALAXY_NODE_DEFAULT,
  'misp-sighting-summary': MISP_SIGHTING_NODE_DEFAULT,
  'misp-sighting-type': MISP_SIGHTING_TYPE_NODE_DEFAULT,
  'misp-correlation': MISP_CORRELATION_NODE_DEFAULT
}

// Node/edge ids that must stay unique across the *whole* converted graph,
// not just within one Event/Attribute/Object's own subtree — threaded
// through every add*() call instead of being module-level state, so two
// convert() calls (e.g. one per Event in a `{ response: [...] }` list)
// never bleed into each other.
interface Dedup {
  // The same Tag (by id) or galaxy type/cluster is often attached to the
  // Event and to many of its Attributes/Objects — one shared node, with an
  // edge from every entity that carries it, instead of one node per
  // attachment.
  tagIds: Set<string>
  galaxyTypeIds: Set<string>
  galaxyClusterIds: Set<string>
  // Only the galaxy-type -> cluster edge needs its own dedup set: both
  // ends are globally shared nodes, so the same pair can otherwise get
  // re-added once per entity that happens to carry that cluster. The
  // entity -> "Galaxy clusters" and "Galaxy clusters" -> galaxy-type edges
  // don't need this — their first endpoint is unique per call already.
  galaxyClusterEdgeIds: Set<string>
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
    const dedup: Dedup = {
      tagIds: new Set(),
      galaxyTypeIds: new Set(),
      galaxyClusterIds: new Set(),
      galaxyClusterEdgeIds: new Set()
    }

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
    const relations = options?.viewMode === 'relations'
    // 'relations' has no root at all — see ConverterOptions.viewMode's own
    // doc comment for why: the Object Reference graph is what's on screen,
    // an Event owning things isn't part of that graph.
    if (!relations) {
      nodes.push({ id: event.uuid, data: eventData, style: eventStyle, expanded: false })
      this.addTagsAndGalaxies(nodes, edges, event.uuid, event.Tag ?? [], event.Galaxy ?? [], dedup, options)
    }

    // Only computed in 'relations' view: which event-level Attributes and
    // Objects actually participate in the Object Reference graph (see
    // computeConnectivity's own doc comment).
    const connectivity = relations ? this.computeConnectivity(event) : undefined

    const attributes = (event.Attribute ?? []).filter(
      attribute => !connectivity || connectivity.referencedAttrUuids.has(attribute.uuid)
    )
    if (relations) {
      // No owning Object to nest under, and no Event root to hang off in this
      // view — left as bare top-level nodes, connected only by whichever
      // Object's reference targets them (the loop below).
      for (const attribute of attributes) {
        this.addAttribute(nodes, edges, undefined, attribute, dedup, options)
      }
    } else {
      const attributeNodes = this.maybeGroup(nodes, edges, event.uuid, 'misp-attribute-group', 'Attributes', 'has-attributes', attributes.length, options)
      for (const attribute of attributes) {
        this.addAttribute(attributeNodes, edges, event.uuid, attribute, dedup, options)
      }
    }

    const objects = (event.Object ?? []).filter(
      object => !connectivity || connectivity.connectedObjUuids.has(object.uuid)
    )
    for (const object of objects) {
      this.addObject(nodes, edges, relations ? undefined : event.uuid, object, dedup, options)
    }

    // Only objects actually added above can be a reference's source, so this
    // never draws an edge from a node 'relations' left out — an Object with
    // any (non-deleted) reference of its own is always in `connectivity`.
    for (const object of objects) {
      for (const reference of object.ObjectReference ?? []) {
        if (relations && this.isDeleted(reference)) continue
        // MISP allows a reference with no relationship_type at all — it's
        // still a real link, just not a *named* relationship, so it reads
        // as a plain structural one (same grey as has-tag/has-object/...)
        // rather than RELATIONSHIP_EDGE_COLOR's blue, which is reserved for
        // a reference that actually says what it is.
        const label = reference.relationship_type || undefined
        edges.push({
          id: `${object.uuid}-${reference.referenced_uuid}`,
          from: object.uuid,
          to: reference.referenced_uuid,
          data: { label, type: 'misp-object-reference' },
          // Marks this edge as *a relationship*, distinct from every other
          // edge kind (has-tag, has-attribute, has-object, ...) this
          // importer draws — see relationshipColour.ts's own comment.
          style: { edge: { strokeColor: label ? RELATIONSHIP_EDGE_COLOR : STRUCTURAL_EDGE_COLOR } }
        })
      }
    }

    // A view can legitimately produce an empty graph — most commonly
    // 'relations' on data with no Object References at all — so an empty
    // canvas reads as "it worked, there's just nothing to show" rather than
    // looking broken. A Pivotick Note, not a fake node: it's a real message
    // to the viewer, not a MISP entity, and Pivotick's own note surface
    // already looks native instead of a hand-built card imitating one.
    const notes: RawNote[] | undefined = nodes.length === 0
      ? [{ content: 'Nothing to display', surface: 'terminal', width: 260, height: 90 }]
      : undefined

    return { nodes, edges, notes }
  }

  // MISP's own correlation engine links events through shared indicator
  // values — this builds that graph directly, across *every* event at once
  // (unlike convert(), which handles one). A separate entry point rather
  // than a convert() viewMode, since its input shape is fundamentally
  // different (a list of Events, not one) — wired up by
  // demo/src/pivotick.ts's toGraphData when viewMode is 'correlation'.
  //
  // Two correlation signals, both drawn:
  //  1. RelatedEvent — MISP's own precomputed result, straight from the
  //     export. Authoritative, and the *only* signal available on an export
  //     like MISP's real ones sometimes are: RelatedEvent populated, but
  //     Attribute empty (a summary response, not a full pull) — this reads
  //     it in preference to re-deriving correlation client-side for exactly
  //     that reason. The other Event may only be a short summary (uuid/info/
  //     Org/Orgc, no Attribute/Object of its own) — still gets a node.
  //  2. A shared Attribute value — when full Attribute detail *is* present,
  //     honouring disable_correlation (the same signal MISP's own engine
  //     respects) — becomes one shared hub node, with an edge to every event
  //     that carries it. A value seen in only one event is inventory, not
  //     correlation — left out, same "only what's relevant" philosophy as
  //     'relations'. So are Tags/Galaxies/Sightings.
  // An Event with neither never gets a node — nothing to say about it here.
  correlateEvents(events: MispEventInput['Event'][], options?: ConverterOptions): GraphData {
    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const addedEventUuids = new Set<string>()
    const fullEventsByUuid = new Map(events.map(event => [event.uuid, event]))

    const addEventNode = (event: MispEvent | MispRelatedEventSummary): void => {
      if (addedEventUuids.has(event.uuid)) return
      addedEventUuids.add(event.uuid)
      const displayFields: Record<string, unknown> = {}
      for (const field of MISP_EVENT_FIELDS) {
        const rawValue = (event as Record<string, unknown>)[field.source ?? field.key]
        displayFields[field.key] = formatMispEventField(field.format, rawValue, event as MispEvent)
      }
      const { data, style } = resolveNodeAppearance(
        { ...displayFields, label: event.info, type: 'misp-event' },
        this.defaultStyle('misp-event', event.info, { theme: options?.theme }),
        options?.styleRules
      )
      nodes.push({ id: event.uuid, data, style, expanded: false })
    }

    // A pair can list each other on both sides — sorted-pair dedup so it
    // only draws once.
    const relatedPairs = new Set<string>()
    for (const event of events) {
      for (const related of event.RelatedEvent ?? []) {
        const target = fullEventsByUuid.get(related.Event.uuid) ?? related.Event
        const pairKey = [event.uuid, target.uuid].sort().join('|')
        if (relatedPairs.has(pairKey)) continue
        relatedPairs.add(pairKey)

        addEventNode(event)
        addEventNode(target)
        edges.push({
          id: `related-${pairKey}`,
          from: event.uuid,
          to: target.uuid,
          data: { type: 'related-event' },
          style: { edge: { strokeColor: CORRELATION_EDGE_COLOR } }
        })
      }
    }

    // key: `${type}:${value}` -> every distinct event carrying it, plus one
    // sample Attribute (any of them — they share type/value by definition)
    // to build the shared hub's card from.
    const occurrences = new Map<string, { eventUuids: Set<string>, sample: MispAttribute }>()
    const collect = (eventUuid: string, attribute: MispAttribute): void => {
      if (this.isDeleted(attribute) || attribute.disable_correlation) return
      const key = `${attribute.type}:${attribute.value}`
      const existing = occurrences.get(key)
      if (existing) existing.eventUuids.add(eventUuid)
      else occurrences.set(key, { eventUuids: new Set([eventUuid]), sample: attribute })
    }
    for (const event of events) {
      for (const attribute of event.Attribute ?? []) collect(event.uuid, attribute)
      for (const object of event.Object ?? []) {
        for (const attribute of object.Attribute ?? []) collect(event.uuid, attribute)
      }
    }

    let hubCount = 0
    for (const { eventUuids, sample } of occurrences.values()) {
      if (eventUuids.size < 2) continue

      for (const eventUuid of eventUuids) addEventNode(fullEventsByUuid.get(eventUuid) as MispEvent)

      const nodeId = `correlation-${hubCount++}`
      // Same per-instance icon lookup as addAttribute — a correlated
      // "ip-dst" hub gets the same glyph a plain ip-dst Attribute would.
      const iconOverride = MISP_ICONS[`attributes/${sample.type}`] ? `attributes/${sample.type}` : undefined
      const badge = `${sample.type} · ${eventUuids.size} events`
      const { data, style } = resolveNodeAppearance(
        { label: sample.value, type: 'misp-correlation', attributeType: sample.type, eventCount: eventUuids.size },
        this.defaultStyle('misp-correlation', sample.value, { theme: options?.theme, iconOverride, badge }),
        options?.styleRules
      )
      nodes.push({ id: nodeId, data, style, expanded: false })

      for (const eventUuid of eventUuids) {
        edges.push({
          id: `${eventUuid}-${nodeId}`,
          from: eventUuid,
          to: nodeId,
          data: { type: 'correlates-with' },
          style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
        })
      }
    }

    // Neither signal found anything: nothing correlates here, so this view
    // shows nothing rather than a pile of disconnected Event nodes with
    // nothing to say about them.
    if (nodes.length === 0) {
      return {
        nodes: [],
        edges: [],
        notes: [{
          content: events.length > 1
            ? `No correlated attributes across these ${events.length} events`
            : 'Nothing to correlate — only one event',
          surface: 'terminal',
          width: 300,
          height: 90
        }]
      }
    }

    return { nodes, edges }
  }

  // Soft-deleted (tombstone) MISP records — never real, current relationships.
  private isDeleted(record: { deleted?: boolean | number | string }): boolean {
    return record.deleted === true || record.deleted === 1 || record.deleted === '1'
  }

  // 'relations' view's connectivity rule, ported from a real MISP-embedded
  // Pivotick integration this importer doesn't otherwise share code with:
  // an Object shows only when it references something itself, is the
  // *target* of another Object's reference, or owns an Attribute that is —
  // anything else is inventory with no relationships to draw, out of scope
  // for this view. An event-level Attribute shows only when some Object's
  // reference targets it directly (an Object's own Attributes always show
  // once their Object does, unfiltered — see addObject).
  private computeConnectivity(event: MispEventInput['Event']): {
    referencedAttrUuids: Set<string>
    connectedObjUuids: Set<string>
  } {
    const referencedAttrUuids = new Set<string>()
    const connectedObjUuids = new Set<string>()
    const attrOwner = new Map<string, string>() // child attribute uuid -> owning Object uuid

    for (const object of event.Object ?? []) {
      for (const attribute of object.Attribute ?? []) {
        attrOwner.set(attribute.uuid, object.uuid)
      }
    }
    for (const object of event.Object ?? []) {
      for (const reference of object.ObjectReference ?? []) {
        if (this.isDeleted(reference)) continue
        connectedObjUuids.add(object.uuid)
        if (String(reference.referenced_type) === '1') {
          connectedObjUuids.add(reference.referenced_uuid)
        } else {
          referencedAttrUuids.add(reference.referenced_uuid)
          const owner = attrOwner.get(reference.referenced_uuid)
          if (owner) connectedObjUuids.add(owner)
        }
      }
    }
    return { referencedAttrUuids, connectedObjUuids }
  }

  private addAttribute(
    nodes: RawNode[],
    edges: RawEdge[],
    // Undefined in 'relations' view for a standalone event-level Attribute:
    // there's no Event root to hang a has-attribute edge off in that view
    // (see convert()) — it stays connected only via whichever Object's
    // reference targets it.
    parentId: string | undefined,
    attribute: MispAttribute,
    dedup: Dedup,
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
    if (parentId !== undefined) {
      edges.push({
        id: `${parentId}-${attribute.uuid}`,
        from: parentId,
        to: attribute.uuid,
        data: { type: 'has-attribute' },
        style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
      })
    }

    if (options?.viewMode === 'relations') return

    this.addTagsAndGalaxies(nodes, edges, attribute.uuid, attribute.Tag ?? [], attribute.Galaxy ?? [], dedup, options)

    if (attribute.Sighting?.length) {
      this.addSightingSummary(nodes, edges, attribute.uuid, attribute.Sighting, options)
    }
  }

  private addObject(
    nodes: RawNode[],
    edges: RawEdge[],
    // Undefined in 'relations' view — there's no Event root to hang a
    // has-object edge off there (see convert()); the Object stays connected
    // only via whatever Object References touch it.
    eventId: string | undefined,
    object: MispObject,
    dedup: Dedup,
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

    const relations = options?.viewMode === 'relations'
    // Built up-front (relations only) so its length can seed a rim badge on
    // the Object's own style below, before resolveNodeAppearance runs — same
    // "count of what's hidden behind the +" maybeGroup gives Tags/Attributes
    // summary nodes, just anchored to the Object itself since it's the
    // expandable unit here (see the comment below).
    const relationsChildren: RawNode[] = []
    if (relations) {
      for (const attribute of object.Attribute ?? []) {
        if (this.isDeleted(attribute)) continue
        this.addAttribute(relationsChildren, edges, undefined, attribute, dedup, options)
      }
    }

    const { data, style } = resolveNodeAppearance(
      // `label` is required here — see the same note in convert() for Event.
      { ...displayFields, label: object.name, type: 'misp-object' },
      {
        ...this.defaultStyle('misp-object', object.name, { theme: options?.theme, iconOverride, badge: object['meta-category'] as string | undefined }),
        ...(relationsChildren.length > 0
          ? { badges: [{ text: String(relationsChildren.length), title: `${relationsChildren.length} hidden attribute${relationsChildren.length === 1 ? '' : 's'}` }] }
          : {})
      },
      options?.styleRules
    )

    if (relations) {
      // Ported from a real MISP-embedded Pivotick integration (see
      // ConverterOptions.viewMode's own doc comment): the Object *is* the
      // expandable unit here, its Attributes nested behind its own native
      // "+" (RawNode.children) rather than beside it through a separate
      // "Attributes" card or has-attribute edges.
      nodes.push({ id: object.uuid, data, style, expanded: false, children: relationsChildren })
      return
    }

    nodes.push({ id: object.uuid, data, style, expanded: false })
    edges.push({
      id: `${eventId}-${object.uuid}`,
      from: eventId as string,
      to: object.uuid,
      data: { type: 'has-object' },
      style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
    })

    this.addTagsAndGalaxies(nodes, edges, object.uuid, object.Tag ?? [], object.Galaxy ?? [], dedup, options)

    const attributes = object.Attribute ?? []
    const attributeNodes = this.maybeGroup(nodes, edges, object.uuid, 'misp-attribute-group', 'Attributes', 'has-attributes', attributes.length, options)
    for (const attribute of attributes) {
      this.addAttribute(attributeNodes, edges, object.uuid, attribute, dedup, options)
    }
  }

  private addTag(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    tag: MispTag,
    tagIds: Set<string>,
    options?: ConverterOptions
  ): void {
    // Some MISP exports omit `id` on a Tag — falling back to `name` avoids
    // every id-less tag wrongly deduplicating onto whichever one rendered
    // first (they'd otherwise all share the key `undefined`).
    const dedupeKey = tag.id || tag.name

    // Detailed view: one shared Tag node, however many parents carry it —
    // dedupeKey alone. Grouped view: each parent's "Tags" cluster needs its
    // *own* copy, even of a tag another parent also carries — a node nested
    // under one parent's collapse toggle doesn't answer to a different
    // parent's, so sharing it would mean collapsing one group's Tags could
    // still leave that same tag showing through another's.
    const grouped = options?.viewMode === 'grouped'
    const scopedKey = grouped ? `${parentId}:${dedupeKey}` : dedupeKey
    const tagNodeId = grouped ? `tag-${parentId}-${dedupeKey}` : `tag-${dedupeKey}`

    if (!tagIds.has(scopedKey)) {
      tagIds.add(scopedKey)

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
      data: { type: 'has-tag' },
      style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
    })
  }

  // Tags and Galaxies are two independent, parallel representations, not
  // one a variant of the other — every Tag (`is_galaxy` or not) always
  // renders as a plain Tag chip via addTag(), unconditionally; separately,
  // this entity's own structured `Galaxy` array (present only when the
  // exporting MISP instance still has that cluster locally — its absence
  // is expected, not an error) independently drives a "Galaxy clusters"
  // grouping node -> one node per galaxy type (e.g. "Attack Pattern") ->
  // one node per cluster detail (e.g. "Valid Accounts - T1078"). A galaxy
  // tag with no matching structured entry here simply won't have a Galaxy-
  // clusters counterpart — it still shows up as a Tag, just not there too.
  private addTagsAndGalaxies(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    tags: MispTag[],
    galaxies: MispGalaxy[],
    dedup: Dedup,
    options?: ConverterOptions
  ): void {
    if (tags.length > 0) {
      const tagNodes = this.maybeGroup(nodes, edges, parentId, 'misp-tag-group', 'Tags', 'has-tags', tags.length, options)
      for (const tag of tags) {
        this.addTag(tagNodes, edges, parentId, tag, dedup.tagIds, options)
      }
    }

    if (galaxies.length === 0) return

    const grouped = options?.viewMode === 'grouped'
    const groupNodeId = `galaxy-clusters-${parentId}`
    const groupLabel = 'Galaxy clusters'
    const { data: groupData, style: groupStyle } = resolveNodeAppearance(
      { label: groupLabel, type: 'misp-galaxy-group' },
      this.defaultStyle('misp-galaxy-group', groupLabel, { theme: options?.theme }),
      options?.styleRules
    )
    // In `viewMode: 'grouped'`, the group's own native "+" nests the
    // galaxy-type nodes (each in turn nesting its own cluster nodes below —
    // see addGalaxyType/addGalaxyCluster) instead of hanging them beside it
    // through has-galaxy/has-cluster edges — same treatment as
    // maybeGroup gives Tags/Attributes, applied by hand here since a galaxy
    // is itself a two-level group, not a flat list of leaves.
    const groupChildren: RawNode[] = []
    const galaxyTargetNodes = grouped ? groupChildren : nodes
    nodes.push({
      id: groupNodeId, data: groupData, style: groupStyle, expanded: false,
      ...(grouped ? { children: groupChildren } : {})
    })
    edges.push({
      id: `${parentId}-${groupNodeId}`,
      from: parentId,
      to: groupNodeId,
      data: { type: 'has-galaxy-clusters' },
      style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
    })

    for (const galaxy of galaxies) {
      const { children: clusterNodes, nodeId: typeNodeId } =
        this.addGalaxyType(galaxyTargetNodes, edges, groupNodeId, galaxy, dedup, options)
      for (const cluster of galaxy.GalaxyCluster ?? []) {
        this.addGalaxyCluster(clusterNodes, edges, typeNodeId, galaxy.name, cluster, dedup, options)
      }
    }
  }

  // In `viewMode: 'grouped'`, wraps a parent's Tags or Attributes (Objects
  // and the Event root are unaffected) behind one collapsed summary node —
  // Pivotick's own node-expansion "+"
  // (RendererOptions.enableNodeExpansion), driven by RawNode.children, not
  // by an edge — instead of hanging every one of them directly off the
  // parent. Returns the array the caller should push its individual items
  // into: the group's own nested `children` (grouped), or `nodes` itself,
  // unchanged, in the default 'detailed' view.
  //
  // The parent -> group edge is real (not just the stand-in Pivotick's own
  // cross-cluster handling would synthesize from the individual items' own
  // edges to parentId, left untouched below) — belt and suspenders, since a
  // group node the force simulation never sees a real link for would drift
  // wherever collision leaves it rather than settling near its parent.
  private maybeGroup(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    type: string,
    label: string,
    edgeType: string,
    count: number,
    options?: ConverterOptions
  ): RawNode[] {
    if (options?.viewMode !== 'grouped' || count === 0) return nodes

    const groupNodeId = `${type}-${parentId}`
    const { data, style } = resolveNodeAppearance(
      { label, type, count },
      {
        ...this.defaultStyle(type, label, {
          theme: options?.theme,
          badge: `${count} ${label.toLowerCase()}`
        }),
        // A rim badge repeats the hidden count right on the "+" affordance
        // itself (Pivotick auto-places it on the corner opposite the
        // expand icon, see NodeBadge's comment) — legible before the card's
        // own in-body count is even in view at a zoomed-out scale.
        badges: [{ text: String(count), title: `${count} hidden ${label.toLowerCase()}` }]
      },
      options?.styleRules
    )
    const children: RawNode[] = []
    nodes.push({ id: groupNodeId, data, style, expanded: false, children })
    edges.push({ id: `${parentId}-${groupNodeId}`, from: parentId, to: groupNodeId, data: { type: edgeType }, style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } } })
    return children
  }

  // One "Sightings" summary node per Attribute, then one child per
  // sighting *type* that actually occurred ("Positive"/"False positive"/
  // "Expired") — the same two-level breakdown MISP's own Sightings widget
  // shows (a total, then one count per type), not one node per raw
  // Sighting (a widely-seen indicator can have dozens of those). See
  // sighting/summarize.ts for the counting.
  private addSightingSummary(
    nodes: RawNode[],
    edges: RawEdge[],
    parentId: string,
    sightings: MispSighting[],
    options?: ConverterOptions
  ): void {
    const nodeId = `sighting-summary-${parentId}`
    const label = 'Sightings'
    const breakdown = summarizeSightings(sightings)
    const badge = `${breakdown.total} sighting${breakdown.total === 1 ? '' : 's'}`

    const { data, style } = resolveNodeAppearance(
      { label, type: 'misp-sighting-summary', count: breakdown.total },
      this.defaultStyle('misp-sighting-summary', label, { theme: options?.theme, badge }),
      options?.styleRules
    )
    nodes.push({ id: nodeId, data, style, expanded: false })
    edges.push({
      id: `${parentId}-${nodeId}`,
      from: parentId,
      to: nodeId,
      data: { type: 'has-sightings' },
      style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
    })

    // Same colours MISP itself uses for these three states.
    this.addSightingType(nodes, edges, nodeId, 'Positive', '#16A34A', SIGHTING_THUMB_UP_ICON, breakdown.positive, options)
    this.addSightingType(nodes, edges, nodeId, 'False positive', '#DC2626', SIGHTING_THUMB_DOWN_ICON, breakdown.falsePositive, options)
    // No dedicated "expired" pictogram (misp-iconify has none either) —
    // the generic `sighting` icon NODE_DEFAULTS already falls back to.
    this.addSightingType(nodes, edges, nodeId, 'Expired', '#F59E0B', undefined, breakdown.expired, options)
  }

  private addSightingType(
    nodes: RawNode[],
    edges: RawEdge[],
    summaryNodeId: string,
    label: string,
    accentColorOverride: string,
    iconSvgOverride: string | undefined,
    group: SightingGroupSummary,
    options?: ConverterOptions
  ): void {
    if (group.count === 0) return

    const nodeId = `${summaryNodeId}-${label.toLowerCase().replace(/\s+/g, '-')}`
    const { data, style } = resolveNodeAppearance(
      {
        label,
        type: 'misp-sighting-type',
        count: group.count,
        first_seen: group.firstSeen,
        last_seen: group.lastSeen,
        organisations: group.organisations || undefined
      },
      this.defaultStyle('misp-sighting-type', label, { theme: options?.theme, accentColorOverride, iconSvgOverride, badge: String(group.count) }),
      options?.styleRules
    )
    nodes.push({ id: nodeId, data, style, expanded: false })
    edges.push({
      id: `${summaryNodeId}-${nodeId}`,
      from: summaryNodeId,
      to: nodeId,
      data: { type: 'has-sighting-type' },
      style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } }
    })
  }

  // Returns where this galaxy's own cluster nodes should be pushed (its
  // fresh `children`, grouped, or `nodes` unchanged, detailed — same
  // contract as maybeGroup) plus the id addGalaxyCluster's edge/dedup keys
  // need, since that id differs by view (see below).
  private addGalaxyType(
    nodes: RawNode[],
    edges: RawEdge[],
    groupNodeId: string,
    galaxy: MispGalaxy,
    dedup: Dedup,
    options?: ConverterOptions
  ): { children: RawNode[], nodeId: string } {
    const grouped = options?.viewMode === 'grouped'
    // Detailed view: one shared galaxy-type node, however many parents carry
    // it. Grouped view: each parent's "Galaxy clusters" group needs its own
    // copy, nested behind its own "+" — same per-parent scoping as addTag's
    // (see its own comment for why sharing a nested node breaks collapse).
    const dedupeKey = grouped ? `${groupNodeId}:${galaxy.type}` : galaxy.type
    const nodeId = grouped ? `galaxy-type-${groupNodeId}-${galaxy.type}` : `galaxy-type-${galaxy.type}`

    if (!grouped) {
      // groupNodeId is unique per attaching entity already, so this edge
      // never needs its own dedup — only the galaxy-type -> cluster edge
      // below does (see the Dedup interface's comment).
      edges.push({ id: `${groupNodeId}-${nodeId}`, from: groupNodeId, to: nodeId, data: { type: 'has-galaxy' }, style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } } })
    }

    // Already added (by an earlier parent in detailed view, or — rare, the
    // same galaxy type listed twice on one parent — in grouped view): reuse
    // it, at the cost of a grouped-view duplicate landing at the top level
    // instead of re-opening the original's own children.
    if (dedup.galaxyTypeIds.has(dedupeKey)) return { children: nodes, nodeId }
    dedup.galaxyTypeIds.add(dedupeKey)

    // A galaxy's colour is derived purely from its display *name* (not its
    // `type` key — MISP's own Overmind theme hashes "Attack Pattern", not
    // "mitre-attack-pattern"; hashing the type key instead lands on a
    // different, wrong hue) — see galaxy/colour.ts.
    const palette = galaxyPalette(galaxy.name)
    // misp-iconify has a dedicated icon for ~131 known galaxy types
    // ("mitre-attack-pattern", "threat-actor", "ransomware", ...); falls
    // back to NODE_DEFAULTS' generic `galaxy` icon otherwise.
    const iconOverride = MISP_ICONS[`galaxies/${galaxy.type}`] ? `galaxies/${galaxy.type}` : undefined

    const displayFields: Record<string, unknown> = {}
    for (const field of MISP_GALAXY_FIELDS) {
      displayFields[field.key] = galaxy[field.key as keyof MispGalaxy]
    }

    const { data, style } = resolveNodeAppearance(
      { ...displayFields, label: galaxy.name, type: 'misp-galaxy' },
      this.defaultStyle('misp-galaxy', galaxy.name, { theme: options?.theme, iconOverride, accentColorOverride: palette.headerText }),
      options?.styleRules
    )

    if (grouped) {
      const children: RawNode[] = []
      nodes.push({ id: nodeId, data, style, expanded: false, children })
      return { children, nodeId }
    }
    nodes.push({ id: nodeId, data, style, expanded: false })
    return { children: nodes, nodeId }
  }

  private addGalaxyCluster(
    nodes: RawNode[],
    edges: RawEdge[],
    galaxyTypeNodeId: string,
    galaxyName: string,
    cluster: MispGalaxyCluster,
    dedup: Dedup,
    options?: ConverterOptions
  ): void {
    const grouped = options?.viewMode === 'grouped'
    // Same per-parent scoping as addGalaxyType/addTag — see their comments.
    const dedupeKey = grouped ? `${galaxyTypeNodeId}:${cluster.id}` : cluster.id
    const nodeId = grouped ? `galaxy-cluster-${galaxyTypeNodeId}-${cluster.id}` : `galaxy-cluster-${cluster.id}`

    if (!grouped) {
      const edgeId = `${galaxyTypeNodeId}-${nodeId}`
      if (!dedup.galaxyClusterEdgeIds.has(edgeId)) {
        dedup.galaxyClusterEdgeIds.add(edgeId)
        edges.push({ id: edgeId, from: galaxyTypeNodeId, to: nodeId, data: { type: 'has-cluster' }, style: { edge: { strokeColor: STRUCTURAL_EDGE_COLOR } } })
      }
    }

    if (dedup.galaxyClusterIds.has(dedupeKey)) return
    dedup.galaxyClusterIds.add(dedupeKey)

    // Same palette as the parent galaxy-type node — hashed from its
    // display *name*, not its `type` key (see addGalaxyType's comment).
    const palette = galaxyPalette(galaxyName)
    const displayFields: Record<string, unknown> = {}
    for (const field of MISP_GALAXY_CLUSTER_FIELDS) {
      displayFields[field.key] = field.key === 'external_id'
        ? cluster.meta?.external_id?.join(', ')
        : (cluster[field.key as keyof MispGalaxyCluster] as unknown)
    }

    const { data, style } = resolveNodeAppearance(
      { ...displayFields, label: cluster.value, type: 'misp-galaxy-cluster' },
      {
        shape: 'square',
        color: 'transparent',
        strokeColor: 'transparent',
        size: estimateCardSize(cluster.value, { hasIcon: false, fontSize: 11, padding: 14 }),
        html: () => buildTagChip(cluster.value, {
          background: palette.badgeBg,
          textColor: palette.badgeText,
          borderColor: palette.badgeBorder,
          backgroundImage: GALAXY_METALLIC_SHEEN
        })
      },
      options?.styleRules
    )
    nodes.push({ id: nodeId, data, style, expanded: false })
  }

  // Reads NODE_DEFAULTS for `type` and turns its icon (if any) into an
  // icon+label html card; falls back to Pivotick's plain `text` field for
  // types with no icon defined yet. `iconOverride`/`accentColorOverride`
  // win over NODE_DEFAULTS' own icon/accentColor — used where either
  // varies per node instance rather than being fixed per type (a MISP
  // Object's icon depends on its `name`; a galaxy's colour on its type).
  //
  // The card is a DOM snippet baked once at conversion time (Pivotick's
  // `style.html`), not CSS — it can't pick up Pivotick's own `data-theme`
  // toggle on its own, so the caller's `theme` (see ConverterOptions in
  // core/types.ts) picks its background explicitly instead.
  private defaultStyle(type: string, label: string, options?: {
    theme?: 'dark' | 'light'
    iconOverride?: string
    // A ready-made SVG string (e.g. a hand-drawn icon misp-iconify has no
    // equivalent for) — wins over both iconOverride and NODE_DEFAULTS' own
    // icon, since neither is a lookup key in that case.
    iconSvgOverride?: string
    accentColorOverride?: string
    badge?: string
  }): Partial<NodeStyle> {
    const { icon: defaultIcon, accentColor: defaultAccentColor, fontSize, iconSize, ...style } = NODE_DEFAULTS[type] ?? {}
    const iconKey = options?.iconOverride ?? defaultIcon
    const iconSvg = options?.iconSvgOverride ?? (iconKey ? MISP_ICONS[iconKey] : undefined)
    const accentColor = options?.accentColorOverride ?? defaultAccentColor
    if (iconSvg) {
      // Not near-black — a muted accent color (like Object's #524948)
      // barely reads against a background that dark; a lighter charcoal
      // keeps the card readable while still looking like a dark theme.
      const background = options?.theme === 'light' ? '#FFFFFF' : '#33373C'
      const badge = options?.badge
      return {
        ...style,
        size: estimateCardSize(label, { hasIcon: true, fontSize, iconSize, extraLines: badge ? 1 : 0, secondaryText: badge }),
        html: () => buildIconLabelCard(iconSvg, label, { textColor: accentColor, borderColor: accentColor, background, badge, fontSize, iconSize })
      }
    }
    return { ...style, text: label }
  }
}
