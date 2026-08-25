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
import { GALAXY_METALLIC_SHEEN, galaxyPalette } from './galaxy/colour'
import { MISP_GALAXY_CLUSTERS_NODE_DEFAULT, MISP_GALAXY_NODE_DEFAULT } from './galaxy/defaults'
import { MISP_GALAXY_CLUSTER_FIELDS, MISP_GALAXY_FIELDS } from './galaxy/fields'
import { MispGalaxy, MispGalaxyCluster } from './galaxy/types'
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
  'misp-object': MISP_OBJECT_NODE_DEFAULT,
  'misp-galaxy-clusters': MISP_GALAXY_CLUSTERS_NODE_DEFAULT,
  'misp-galaxy': MISP_GALAXY_NODE_DEFAULT
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
    nodes.push({ id: event.uuid, data: eventData, style: eventStyle, expanded: false })

    this.addTagsAndGalaxies(nodes, edges, event.uuid, event.Tag ?? [], event.Galaxy ?? [], dedup, options)

    for (const attribute of event.Attribute ?? []) {
      this.addAttribute(nodes, edges, event.uuid, attribute, dedup, options)
    }

    for (const object of event.Object ?? []) {
      this.addObject(nodes, edges, event.uuid, object, dedup, options)
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
    edges.push({
      id: `${parentId}-${attribute.uuid}`,
      from: parentId,
      to: attribute.uuid,
      data: { type: 'has-attribute' }
    })

    this.addTagsAndGalaxies(nodes, edges, attribute.uuid, attribute.Tag ?? [], attribute.Galaxy ?? [], dedup, options)
  }

  private addObject(
    nodes: RawNode[],
    edges: RawEdge[],
    eventId: string,
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

    this.addTagsAndGalaxies(nodes, edges, object.uuid, object.Tag ?? [], object.Galaxy ?? [], dedup, options)

    for (const attribute of object.Attribute ?? []) {
      this.addAttribute(nodes, edges, object.uuid, attribute, dedup, options)
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
    const tagNodeId = `tag-${tag.id}`

    if (!tagIds.has(tag.id)) {
      tagIds.add(tag.id)

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
    for (const tag of tags) {
      this.addTag(nodes, edges, parentId, tag, dedup.tagIds, options)
    }

    if (galaxies.length === 0) return

    const groupNodeId = `galaxy-clusters-${parentId}`
    const groupLabel = 'Galaxy clusters'
    const { data: groupData, style: groupStyle } = resolveNodeAppearance(
      { label: groupLabel, type: 'misp-galaxy-clusters' },
      this.defaultStyle('misp-galaxy-clusters', groupLabel, { theme: options?.theme }),
      options?.styleRules
    )
    nodes.push({ id: groupNodeId, data: groupData, style: groupStyle, expanded: false })
    edges.push({
      id: `${parentId}-${groupNodeId}`,
      from: parentId,
      to: groupNodeId,
      data: { type: 'has-galaxy-clusters' }
    })

    for (const galaxy of galaxies) {
      this.addGalaxyType(nodes, edges, groupNodeId, galaxy, dedup, options)
      for (const cluster of galaxy.GalaxyCluster ?? []) {
        this.addGalaxyCluster(nodes, edges, `galaxy-type-${galaxy.type}`, galaxy.name, cluster, dedup, options)
      }
    }
  }

  private addGalaxyType(
    nodes: RawNode[],
    edges: RawEdge[],
    groupNodeId: string,
    galaxy: MispGalaxy,
    dedup: Dedup,
    options?: ConverterOptions
  ): void {
    const nodeId = `galaxy-type-${galaxy.type}`
    // groupNodeId is unique per attaching entity already, so this edge
    // never needs its own dedup — only the galaxy-type -> cluster edge
    // below does (see the Dedup interface's comment).
    edges.push({ id: `${groupNodeId}-${nodeId}`, from: groupNodeId, to: nodeId, data: { type: 'has-galaxy' } })

    if (dedup.galaxyTypeIds.has(galaxy.type)) return
    dedup.galaxyTypeIds.add(galaxy.type)

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
    nodes.push({ id: nodeId, data, style, expanded: false })
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
    const nodeId = `galaxy-cluster-${cluster.id}`
    const edgeId = `${galaxyTypeNodeId}-${nodeId}`

    if (!dedup.galaxyClusterEdgeIds.has(edgeId)) {
      dedup.galaxyClusterEdgeIds.add(edgeId)
      edges.push({ id: edgeId, from: galaxyTypeNodeId, to: nodeId, data: { type: 'has-cluster' } })
    }

    if (dedup.galaxyClusterIds.has(nodeId)) return
    dedup.galaxyClusterIds.add(nodeId)

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
    accentColorOverride?: string
    badge?: string
  }): Partial<NodeStyle> {
    const { icon: defaultIcon, accentColor: defaultAccentColor, fontSize, iconSize, ...style } = NODE_DEFAULTS[type] ?? {}
    const icon = options?.iconOverride ?? defaultIcon
    const accentColor = options?.accentColorOverride ?? defaultAccentColor
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
