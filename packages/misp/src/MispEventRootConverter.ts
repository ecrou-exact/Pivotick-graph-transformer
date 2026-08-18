import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, NodeStyleMap, NodeTypeAccessor, RawEdge, RawNode, RenderNodeFn } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import { MISP_ATTRIBUTE_ICONS, MISP_GALAXY_ICONS, MISP_GENERIC_ICONS, MISP_OBJECT_ICONS } from './icons.generated.js'
import { cardGroupFor, classifyEntityType } from './mispKind.js'
import type { MispCardGroup } from './mispKind.js'
import { mispIconSvg } from './mispIconSvg.js'
import { mispTagColor } from './mispTagColor.js'
import { normalizeMispInput } from './normalizeMispInput.js'
import stylesConfig from './styles.json' with { type: 'json' }
import type { MispAttribute, MispGalaxy, MispGalaxyCluster, MispInput, MispObject, MispTag } from './types.js'

// MISP represents a galaxy cluster's association two ways: the structured
// Galaxy/GalaxyCluster arrays `addGalaxies` handles below, *and* as a
// plain machine tag of this exact shape (it's literally GalaxyCluster's
// own `tag_name` field) — e.g. `misp-galaxy:tool="Cobalt Strike"`. It's
// still structurally a tag node (same shape/size as every other tag,
// same 'tag' edge kind) — only its icon and colour are swapped for the
// galaxy's own, so it reads as "a tag, but a galaxy one" rather than
// turning into a differently-shaped node. Its colour comes from
// styles.json's "galaxyCluster" category (not a separate hardcoded
// value), so it stays in sync with whatever a "real" GalaxyCluster node
// is coloured. Only in `icons` mode — see `resolveMode()`.
const GALAXY_TAG_PATTERN = /^misp-galaxy:([^=]+)="(.+)"$/

/** Every entityType key this converter ever produces that isn't dynamic (event/tag are fixed; the rest come from the generated icon key lists). */
function allKnownEntityTypes(): string[] {
  return [
    'event',
    'tag',
    ...Object.keys(MISP_ATTRIBUTE_ICONS),
    ...Object.keys(MISP_OBJECT_ICONS).map((key) => `objects/${key}`),
    ...Object.keys(MISP_GALAXY_ICONS).map((key) => `galaxies/${key}`),
    ...Object.keys(MISP_GENERIC_ICONS).filter((key) => key !== 'event' && key !== 'tag'),
  ]
}

/**
 * Resolves an edge's real style from styles.json's "edges" section, keyed
 * by the same `kind` string set on `edge.data`, and attaches it directly
 * to each `RawEdge.style` at `convert()` time.
 *
 * Each kind's own `"structural": true` flag (styles.json) is what decides
 * whether it loses its arrowhead — *structural* kinds (hasObject/
 * hasAttribute/hasTag/hasGalaxy — "this belongs to that") aren't real
 * directed relationships, just containment, so they render with no
 * arrowhead; the rest (reference/clusterRelation — an Object Reference's
 * relationship_type, a GalaxyClusterRelation's type, e.g. "uses"/
 * "dropped-by") are real named, directional relationships an analyst
 * cares about, so they keep theirs. A maintainer reclassifying a kind (or
 * adding a new one) only ever edits that flag, not this function.
 *
 * This has to happen per-edge, not through a single `styleCb` on
 * `RendererOptions.defaultEdgeStyle` — verified directly against
 * Pivotick's own renderer (`EdgeRenderer.getEdgeStyle()`): it only ever
 * calls `edge.getEdgeStyle()?.styleCb` (the *per-edge* style's callback),
 * and reads `defaultEdgeStyle`'s fields individually as plain fallback
 * values — `defaultEdgeStyle.styleCb` is never invoked.
 *
 * The returned object is nested under an `edge` key — `{ edge: {
 * strokeColor, ... } }`, not the flat style object itself — because
 * `Edge.getEdgeStyle()` reads `this.style?.edge`, not `this.style`
 * directly (verified against Pivotick's real `Edge` class, and matching
 * adulau/threat-actor-explorer's own `style: { edge: {...}, label: {...}
 * }` shape). An earlier version of this function returned the flat shape,
 * which `getEdgeStyle()` silently read as `{}` (its `?? {}` fallback) —
 * so every edge fell through to the flat default regardless of its real
 * kind, same end symptom as the `styleCb`-on-`defaultEdgeStyle` bug above.
 */
function edgeStyleFor(kind: keyof typeof stylesConfig.edges): Record<string, unknown> {
  const { structural, ...base } = stylesConfig.edges[kind] as Record<string, unknown>
  return { edge: structural ? { ...base, markerEnd: 'none' } : base }
}

// ── 'cards' mode rendering helpers ──────────────────────────────────────
//
// styles.json's "cards" section lists, per `MispCardGroup`, which extra
// node.data fields to surface as readable rows below the title — same
// "styles.json is the central config" approach as node/edge styling (see
// docs/icons-and-styling.md): which fields show up, and how they're
// labelled, is a JSON edit, not a code change. Only `formatCardValue`'s
// small set of formats (values MISP itself encodes numerically/booleanly
// — analysis level, threat level, booleans) needs code.

interface CardField {
  key: string
  label: string
  format?: 'boolean' | 'analysisLevel' | 'threatLevel'
  /** Skip this row entirely when the value is exactly `0` (e.g. an empty count isn't worth a row). */
  hideIfZero?: boolean
  /** Clip long free-text values (e.g. a Comment or Description) so one verbose field can't blow up the card's size. */
  truncate?: boolean
}

const MISP_ANALYSIS_LABELS: Record<string, string> = { '0': 'Initial', '1': 'Ongoing', '2': 'Completed' }
const MISP_THREAT_LEVEL_LABELS: Record<string, string> = { '1': 'High', '2': 'Medium', '3': 'Low', '4': 'Undefined' }

function formatCardValue(value: unknown, format: CardField['format']): string {
  if (format === 'boolean') return value ? 'Yes' : 'No'
  if (format === 'analysisLevel') return MISP_ANALYSIS_LABELS[String(value)] ?? String(value)
  if (format === 'threatLevel') return MISP_THREAT_LEVEL_LABELS[String(value)] ?? String(value)
  return String(value)
}

function truncateText(text: string, max = 90): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/** A pre-built badge element (an icon chip), or a short text mark to render as a plain colored badge. */
type CardBadge = HTMLElement | string

/**
 * The shared "readable card" shell — icon/mark badge + title + subtitle +
 * a handful of label/value rows — used by both `cards` mode (every node)
 * and `icons` mode (the Event node only, see `getRenderNode()`). Kept as
 * one function so both modes' cards look and behave identically; only
 * what goes in the badge and which fields are shown differs per caller.
 */
function buildReadableCard(params: {
  badge: CardBadge
  accentColor: string
  title: string
  subtitle: string
  fields: CardField[]
  data: Record<string, unknown>
  /** The Event card only: a visibly heavier border + bigger title, so it reads as the root of its cluster at a glance. */
  emphasized?: boolean
}): HTMLElement {
  const { badge, accentColor, title, subtitle, fields, data, emphasized } = params

  const card = document.createElement('div')
  Object.assign(card.style, {
    // Pivotick measures this element's getBoundingClientRect() to size its
    // wrapping <foreignObject> (initially a 20x20 box it clips to — see
    // NodeRenderer.render() in Pivotick's own renderer), then resizes the
    // foreignObject to fit. A block-level box (plain `flex`) stretches to
    // fill that initial 20px container instead of sizing to its own
    // content, clipping everything — `inline-flex` shrink-to-fits instead.
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '6px',
    padding: emphasized ? '5px 10px 5px 4px' : '3px 8px 3px 3px',
    borderRadius: '8px',
    background: '#ffffff',
    border: `${emphasized ? '2.5px' : '1.5px'} solid ${accentColor}`,
    boxShadow: '0 1px 3px rgba(0,0,0,.18)',
    fontFamily: 'system-ui, sans-serif',
    cursor: 'default',
  })

  let badgeEl: HTMLElement
  if (typeof badge === 'string') {
    badgeEl = document.createElement('span')
    Object.assign(badgeEl.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '22px',
      height: '20px',
      padding: '0 4px',
      borderRadius: '5px',
      background: accentColor,
      color: '#fff',
      fontWeight: '700',
      fontSize: '9px',
      flexShrink: '0',
      marginTop: '1px',
    })
    badgeEl.textContent = badge
  } else {
    badgeEl = badge
  }

  const content = document.createElement('span')
  Object.assign(content.style, { display: 'inline-flex', flexDirection: 'column', lineHeight: '1.3', gap: '1px' })

  const titleEl = document.createElement('span')
  Object.assign(titleEl.style, {
    fontWeight: '600',
    fontSize: emphasized ? '13px' : '11px',
    color: '#0f172a',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '220px',
  })
  titleEl.textContent = title

  const subtitleEl = document.createElement('span')
  Object.assign(subtitleEl.style, { fontSize: '9px', color: '#64748b' })
  subtitleEl.textContent = subtitle

  content.append(titleEl, subtitleEl)

  for (const field of fields) {
    const raw = data[field.key]
    if (raw === undefined || raw === null || raw === '') continue
    if (field.hideIfZero && raw === 0) continue

    let text = formatCardValue(raw, field.format)
    if (field.truncate) text = truncateText(text)

    const row = document.createElement('span')
    Object.assign(row.style, { fontSize: '9.5px', color: '#334155', whiteSpace: 'normal', maxWidth: '220px' })
    const rowLabel = document.createElement('span')
    Object.assign(rowLabel.style, { fontWeight: '600', color: '#64748b' })
    rowLabel.textContent = `${field.label}: `
    row.append(rowLabel, document.createTextNode(text))
    content.append(row)
  }

  card.append(badgeEl, content)
  return card
}

// ── 'icons' mode rendering helpers ──────────────────────────────────────
//
// 'icons' mode renders every node — Event included — as one consistent
// badge (buildIconBadge): a coloured icon token plus the node's name,
// same shell for every type, only the token's shape/colour/icon (and a
// slightly larger token for Event) varying. This goes through
// `renderNode` rather than Pivotick's native shape+`nodeStyleMap`
// rendering (still described by getDefaultStyleMap()'s 'icons' branch,
// kept for consumers who use this converter without the badge look) only
// because Pivotick's renderNode hook is all-or-nothing for the whole
// graph — once it's set at all, every node is routed through it, with no
// per-node opt-out back to native rendering (verified against Pivotick's
// actual NodeRenderer.render() — see the note on RenderNodeFn in
// packages/core/src/types.ts).

/** Same 'attribute' vs 'generic' split `getDefaultStyleMap()`'s 'icons' branch makes, minus event/tag (handled directly by entityType). */
const GENERIC_ICON_ENTITY_TYPES = new Set(Object.keys(MISP_GENERIC_ICONS).filter((key) => key !== 'event' && key !== 'tag'))

function iconCategoryFor(entityType: string): 'event' | 'tag' | 'attribute' | 'object' | 'galaxyCluster' | 'generic' {
  if (entityType === 'event') return 'event'
  if (entityType === 'tag') return 'tag'
  if (entityType.startsWith('objects/')) return 'object'
  if (entityType.startsWith('galaxies/')) return 'galaxyCluster'
  if (GENERIC_ICON_ENTITY_TYPES.has(entityType)) return 'generic'
  return 'attribute'
}

/**
 * The badge's muted second line — one more specific, genuinely useful
 * fact beyond the title/kind-chip: the *specific* type one level more
 * precise than the coarse kind chip already shown (an object's real
 * template, e.g. 'domain-ip'; an attribute's real type, e.g. 'ip-dst'; a
 * galaxy cluster's real galaxy type, e.g. 'threat-actor' — all stripped
 * of this converter's internal `objects/`/`galaxies/` entityType prefix,
 * not itself meaningful to a reader), or — the one case with no more
 * specific "type" to show — the Event's org and/or date.
 */
function secondaryInfoFor(entityType: string, data: Record<string, unknown>): string | undefined {
  if (entityType === 'event') {
    const org = data.org as string | undefined
    const date = data.date as string | undefined
    if (org && date) return `${org} · ${date}`
    return org ?? date
  }
  if (entityType.startsWith('objects/')) return entityType.slice('objects/'.length)
  if (entityType.startsWith('galaxies/')) return entityType.slice('galaxies/'.length)
  return entityType
}

/**
 * Perceived-brightness contrast pick (standard luma weighting) — MISP's
 * own tag pills are solid colour with the text directly on top (no
 * outline), so text needs to switch between light and dark on its own
 * rather than relying on a fixed neutral, unlike the outlined badges
 * `buildIconBadge()` draws for every other entity type.
 */
function contrastTextColor(hexColor: string): string {
  const { threshold, light, dark } = stylesConfig.badge.contrast
  const hex = hexColor.replace('#', '')
  if (hex.length !== 6) return light
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luma > threshold ? dark : light
}

/**
 * Tags and galaxy-pattern tags render as MISP's own real tag pill —
 * solid colour, small rounded corners, the tag's actual name printed
 * directly on it — rather than the white-card-with-coloured-border look
 * every other entity type gets: this is the one shape a MISP user already
 * recognizes on sight, so matching it (plus an icon, which MISP's own
 * pills don't have) beats inventing a new one.
 */
function buildTagChip(color: string, svgIcon: string | undefined, label: string, wide: boolean, fullLabel: boolean): HTMLElement {
  const textColor = contrastTextColor(color)
  const cfg = stylesConfig.badge.tag
  const size = cfg.sizes[wide ? 'wide' : 'normal']

  const chip = document.createElement('div')
  Object.assign(chip.style, {
    // A fixed width/min-height (not shrink-to-fit) — same technique
    // adulau/threat-actor-explorer's renderReadableNode() uses for its
    // own renderNode cards (`.misp-graph-node { width: 184px; min-height:
    // 82px; ... overflow: hidden }`). Pivotick measures whatever this
    // returns via getBoundingClientRect() and treats
    // max(width,height)/2 as a *circular* edge-anchor radius, no matter
    // the real shape — a single-line, shrink-to-fit pill made that
    // radius huge relative to its actual height (edges stopping well
    // short of the visible chip), while truncating to keep it small cut
    // real tag names off ('tlp:...'). A fixed, bounded box sidesteps
    // both: the radius is small and predictable regardless of content,
    // and up to 2 lines of text still fit before `overflow: hidden`
    // clips anything longer. Width/height are kept close to each other
    // (not just "fixed") for the same reason — max(w,h)/2 only
    // approximates the real edge-touching point well when the box is
    // close to square; a wide-short pill still leaves a gap above/below
    // even once the size is fixed. Both sizes (styles.json's
    // "badge.tag.sizes") are the caller's choice — see `wide` below.
    //
    // `wide` — a galaxy-pattern tag's label is `type="value"` (e.g.
    // `mitre-attack-pattern="Phishing - T1566"`), routinely much longer
    // than a plain tag's own name, so it gets a bigger box rather than
    // clipping MITRE ATT&CK-style names down to a couple of words.
    //
    // `fullLabel` opts out of all of the above: no fixed size, no
    // clipping — every tag renders at whatever size its full name needs.
    // This trades away the edge-anchor mitigation entirely (an
    // organically-sized, possibly very wide chip is exactly the
    // elongated-box case that mitigation exists for) in favour of never
    // hiding any part of a name — the caller's explicit choice, exposed
    // as `ConverterOptions.fullLabels`.
    ...(fullLabel
      ? {}
      : {
          width: `${size.width}px`,
          minHeight: `${size.minHeight}px`,
          overflow: 'hidden',
        }),
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: cfg.padding,
    borderRadius: `${cfg.borderRadius}px`,
    background: color,
    // A thin dark outline on every tag, not just pale ones — a solid
    // near-white MISP tag colour (e.g. `tlp:white`, MISP's own default)
    // would otherwise vanish edge-to-edge against a light/white canvas.
    // Deliberately not colour-dependent (unlike the text/icon tint), so
    // every tag gets the same subtle, consistent ring.
    border: cfg.border,
    boxShadow: cfg.boxShadow,
    fontFamily: stylesConfig.badge.fontFamily,
    cursor: 'default',
  })

  if (svgIcon) {
    const iconWrap = document.createElement('span')
    Object.assign(iconWrap.style, { width: `${cfg.iconSize}px`, height: `${cfg.iconSize}px`, display: 'flex', flexShrink: '0', color: textColor })
    // Trusted markup — see buildIconToken()'s identical note.
    iconWrap.innerHTML = svgIcon
    const svgEl = iconWrap.firstElementChild
    if (svgEl) {
      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
    }
    chip.append(iconWrap)
  }

  const labelEl = document.createElement('span')
  Object.assign(labelEl.style, {
    fontSize: `${cfg.fontSize}px`,
    fontWeight: String(cfg.fontWeight),
    lineHeight: '1.25',
    color: textColor,
    minWidth: '0',
    ...(fullLabel
      ? { whiteSpace: 'nowrap' }
      : { display: '-webkit-box', webkitLineClamp: String(cfg.lineClamp), webkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }),
  })
  labelEl.textContent = label

  chip.append(labelEl)
  return chip
}

/**
 * A compact, fixed-size icon chip — shape (circle/square via CSS;
 * Pivotick's own hexagon approximated with `clip-path`) + colour + the
 * real misp-iconify icon, closely mirroring what `getDefaultStyleMap()`'s
 * 'icons' branch draws natively. Explicit width/height are set upfront
 * (rather than relying on Pivotick's measure-then-resize loop, which
 * polls up to 300 animation frames per node waiting for non-zero content)
 * so hundreds of these on screen at once — a large MISP export easily has
 * that many attributes — stay cheap; only the Event card's genuinely
 * variable-length content needs that loop.
 */
function buildIconToken(shape: string, fillColor: string, iconTint: string, diameter: number, svgIcon: string | undefined): HTMLElement {
  const token = document.createElement('div')
  Object.assign(token.style, {
    width: `${diameter}px`,
    height: `${diameter}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: fillColor,
    // The icon's currentColor context — deliberately not always white:
    // see buildIconBadge()'s note on why a pale fill (e.g. a near-white
    // tag colour) needs a dark icon tint to stay visible against its own
    // background, exactly mirroring Pivotick's native svgIcon behaviour
    // (its currentColor context follows `strokeColor`, not `color`).
    color: iconTint,
    boxSizing: 'border-box',
    flexShrink: '0',
    ...((stylesConfig.badge.shapeStyle as Record<string, Record<string, string>>)[shape] ?? {}),
  })

  if (svgIcon) {
    const iconWrap = document.createElement('span')
    Object.assign(iconWrap.style, { width: '62%', height: '62%', display: 'flex' })
    // Trusted markup: sourced from this package's own generated
    // icons.generated.ts (vendored from misp-iconify at build time), never
    // from MISP input data — see docs/icons-and-styling.md.
    iconWrap.innerHTML = svgIcon
    const svgEl = iconWrap.firstElementChild
    if (svgEl) {
      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
    }
    token.append(iconWrap)
  }

  return token
}

/**
 * One consistent badge for every node in `icons` mode, Event included:
 * coloured icon token, the node's own name, and — new — a small kind-label
 * chip underneath (e.g. "Event", "Object", "Threat Actor") plus an
 * optional muted secondary line for one more specific, genuinely useful
 * fact (an attribute's real type, an object's real template, a galaxy
 * cluster's real galaxy type, or an Event's org/date) — so reading the
 * graph alone answers "what is this" without hovering or opening a
 * sidebar. Same shell for every entity type on purpose (a uniform
 * silhouette reads as one coherent visual language) — only the icon
 * token's shape/colour/icon and, for Event specifically, a markedly larger
 * token/title (so it still reads as each cluster's root at a glance) vary
 * per kind.
 *
 * `fillColor` is the badge's own identity colour (a kind's colour, or a
 * tag's real — possibly near-white, e.g. `tlp:white` — MISP colour).
 * `outlineColor` is optional: pass it only when `fillColor` alone
 * wouldn't stay legible as a border/icon tint against the badge's white
 * background (exactly the tag case — see `convert()`'s `strokeColor`
 * pin); every other kind's `fillColor` is already vivid enough to serve
 * as both fill *and* border/icon-tint on its own.
 */
function buildIconBadge(params: {
  shape: string
  fillColor: string
  outlineColor: string | undefined
  svgIcon: string | undefined
  title: string
  kindLabel: string
  kindColor: string
  secondary?: string
  /**
   * 'emphasized' — the Event, unmistakably each cluster's root.
   * 'wide' — galaxy clusters specifically: MITRE ATT&CK technique names
   * and threat-actor/malware names routinely run much longer than an
   * attribute value, so they get more room than the 'normal' size before
   * `overflow: hidden` starts clipping.
   */
  size: 'normal' | 'wide' | 'emphasized'
  /**
   * Opts out of the fixed-size/clipping behaviour above entirely: the
   * badge sizes itself to whatever its title/kind chip/secondary text
   * actually need, in full, never truncated. Trades away the edge-anchor
   * mitigation (an organically-sized, possibly very wide badge is exactly
   * the elongated-box case that mitigation exists for) for guaranteeing
   * every name is fully visible — the caller's explicit choice, exposed
   * as `ConverterOptions.fullLabels`.
   */
  fullLabel: boolean
}): HTMLElement {
  const { shape, fillColor, outlineColor, svgIcon, title, kindLabel, kindColor, secondary, size, fullLabel } = params
  const emphasized = size === 'emphasized'
  const borderColor = outlineColor ?? fillColor
  const iconTint = outlineColor ?? '#ffffff'
  // Every concrete pixel/font/spacing value below (styles.json's
  // "badge.sizes.<size>") is the tunable part — a maintainer changing how
  // big/bold an Event badge is only ever edits that JSON. What *isn't*
  // there (the fixed-vs-fullLabel branching, inline-flex, the DOM tree
  // itself) is structural, not a design choice.
  const cfg = stylesConfig.badge.sizes[size]

  const badge = document.createElement('div')
  Object.assign(badge.style, {
    // A fixed width/min-height (not shrink-to-fit) — same technique
    // adulau/threat-actor-explorer's renderReadableNode() uses for its
    // own renderNode cards (`.misp-graph-node { width: 184px; min-height:
    // 82px; ...; overflow: hidden }`, `.full { width: 224px; min-height:
    // 96px }`). Pivotick measures whatever this returns via
    // getBoundingClientRect() and treats max(width,height)/2 as a
    // *circular* edge-anchor radius no matter the real shape — letting
    // the box shrink/grow to fit a single line of content (our first
    // attempt) made that radius swing wildly per node and, for long
    // titles, made it far bigger than the box's real height (edges
    // stopping well short of the visible badge); truncating hard to keep
    // it small cut real names off. A fixed, bounded box sidesteps both:
    // the radius is small and predictable for *every* node regardless of
    // content, and up to 2-3 lines of text still fit before
    // `overflow: hidden` clips anything longer. Width/height are also
    // kept close to each other (not just fixed) — max(w,h)/2 only
    // approximates the real edge-touching point well when the box is
    // close to square; a wide-short box still leaves a gap above/below
    // even once its size is fixed and predictable.
    ...(fullLabel
      ? {}
      : {
          width: `${cfg.width}px`,
          minHeight: `${cfg.minHeight}px`,
          overflow: 'hidden',
        }),
    boxSizing: 'border-box',
    // `inline-flex`, not `flex`: a block-level flex container with no
    // explicit width (the `fullLabel` case) stretches to fill its
    // containing block instead of sizing to its own content — and its
    // containing block, at the moment Pivotick first measures this
    // element, is the wrapping <foreignObject>'s initial 20x20 clip box
    // (see buildReadableCard()'s longer note on this same mechanism).
    // `inline-flex` shrink-to-fits regardless; an explicit width (every
    // non-fullLabel size) still wins either way, so this is safe there too.
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '7px',
    padding: cfg.padding,
    borderRadius: `${cfg.borderRadius}px`,
    background: '#ffffff',
    border: `${cfg.borderWidth}px solid ${borderColor}`,
    boxShadow: cfg.boxShadow,
    fontFamily: stylesConfig.badge.fontFamily,
    cursor: 'default',
  })

  const token = buildIconToken(shape, fillColor, iconTint, cfg.iconDiameter, svgIcon)
  Object.assign(token.style, { marginTop: emphasized ? '1px' : '0.5px' })

  const content = document.createElement('span')
  Object.assign(content.style, { display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0', flex: '1' })

  const titleEl = document.createElement('span')
  Object.assign(titleEl.style, {
    fontSize: `${cfg.titleFontSize}px`,
    fontWeight: String(cfg.titleFontWeight),
    lineHeight: '1.25',
    color: '#0f172a',
    ...(fullLabel
      ? { whiteSpace: 'nowrap' }
      : { display: '-webkit-box', webkitLineClamp: String(cfg.titleLineClamp), webkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }),
  })
  titleEl.textContent = title

  const metaRow = document.createElement('span')
  Object.assign(metaRow.style, { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' })

  const kindChip = document.createElement('span')
  Object.assign(kindChip.style, {
    fontSize: `${cfg.kindChipFontSize}px`,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: kindColor,
    background: `${kindColor}1f`,
    padding: '1.5px 5px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    flexShrink: '0',
  })
  kindChip.textContent = kindLabel
  metaRow.append(kindChip)

  if (secondary) {
    const secondaryEl = document.createElement('span')
    Object.assign(secondaryEl.style, {
      fontSize: `${cfg.secondaryFontSize}px`,
      color: '#64748b',
      whiteSpace: 'nowrap',
      minWidth: '0',
      ...(fullLabel ? {} : { overflow: 'hidden', textOverflow: 'ellipsis' }),
    })
    secondaryEl.textContent = secondary
    metaRow.append(secondaryEl)
  }

  content.append(titleEl, metaRow)
  badge.append(token, content)
  return badge
}

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
 *
 * `options.mode` picks the display mode (default `styles.json`'s
 * `defaultMode`, `'icons'`):
 * - `'icons'` — a real misp-iconify icon per specific type (410 keys).
 * - `'simple'` — shape + colour only, from a coarse 8-kind classification
 *   (`mispKind.ts`), no icons — a short text mark (e.g. `'TA'`) instead.
 * - `'cards'` — same coarse classification, rendered as a readable HTML
 *   card (via `getRenderNode()`) instead of an icon-only shape.
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

  private resolveMode(options?: ConverterOptions): string {
    return (options?.mode as string | undefined) ?? stylesConfig.defaultMode
  }

  convert(input: MispInput, options?: ConverterOptions): ConversionResult {
    const { events, objects: standaloneObjects } = normalizeMispInput(input)
    if (events.length === 0 && standaloneObjects.length === 0) {
      throw new Error('Not MISP data: expected an Event, a standalone Object, or a list of either.')
    }

    const iconsMode = this.resolveMode(options) === 'icons'

    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const nodeIdByUuid = new Map<string, NodeId>()
    // Tags/Galaxy clusters are commonly reused across many Events/Attributes/
    // Objects in the same input (e.g. every Attribute tagged tlp:white) — one
    // node per unique tag name / cluster id, with an edge from every entity
    // that carries it, rather than a duplicate node each time.
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    // Only populated when a cluster's `uuid` is actually non-empty (it's
    // frequently `''` in real exports) — used to resolve
    // GalaxyClusterRelation targets, which reference clusters by uuid.
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    // Every cluster we've created a node for, so relations can be resolved
    // once at the end instead of per-parent (a cluster attached to three
    // entities would otherwise have its relations processed three times).
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispTag[] | undefined, parentId: NodeId): void => {
      for (const tag of tags ?? []) {
        let tagNodeId = tagNodeIdByName.get(tag.name)
        if (!tagNodeId) {
          tagNodeId = `tag:${tag.name}`
          tagNodeIdByName.set(tag.name, tagNodeId)

          const galaxyMatch = GALAXY_TAG_PATTERN.exec(tag.name)
          // e.g. 'tool=FakeUpdates' — the galaxy type is part of the
          // label on purpose: the bare cluster value alone ('FakeUpdates')
          // doesn't say what kind of thing it is without also reading the
          // icon/colour, whereas the raw tag name in full
          // ('misp-galaxy:tool="FakeUpdates"') is needlessly verbose for a
          // small chip.
          const label = galaxyMatch ? `${galaxyMatch[1]}=${galaxyMatch[2]}` : tag.name
          // Colour: a galaxy tag always gets the galaxyCluster category's
          // colour (from styles.json), ignoring its own `colour`; a plain
          // tag gets its own colour, or the misp-taxonomies fallback (e.g.
          // tlp:red -> #FF2B2B) when it didn't carry one — real MISP
          // exports normally already carry the right colour directly on
          // the Tag, so that fallback mostly covers hand-built/incomplete
          // input. Computed and carried as `data.colour` unconditionally
          // (MISP tags are colored pills in its own UI, genuinely
          // informative on its own) — only `icons` mode additionally
          // *uses* it as the node's actual render style, below.
          const colour = galaxyMatch ? (stylesConfig.icons.nodes.galaxyCluster.color as string) : mispTagColor(tag)

          if (iconsMode) {
            // Icon: the galaxy's own misp-iconify icon for a galaxy tag,
            // otherwise none — attribute/object/event icons don't apply
            // to a tag.
            const svgIcon = galaxyMatch ? mispIconSvg(`galaxies/${galaxyMatch[1]}`) : undefined
            nodes.push({
              id: tagNodeId,
              data: { label, entityType: 'tag', colour },
              // Still structurally a tag node — same shape/size as every
              // other tag (styles.json's "tag" category), only `color`
              // and `svgIcon` are overridden here, per node. `colour` is
              // the fill; `strokeColor` is pinned to a fixed dark neutral
              // rather than following it (Pivotick's own default stroke
              // is white), so the outline stays visible even for a
              // white/near-white colour — and since svgIcon's currentColor
              // context follows strokeColor, not color, the icon renders
              // in that same dark neutral, readable against any fill
              // colour instead of disappearing into it.
              style: colour ? { color: colour, strokeColor: '#334155', strokeWidth: 1.5, ...(svgIcon ? { svgIcon } : {}) } : undefined,
            })
          } else {
            // 'simple'/'cards': every node follows the flat kind-based
            // style uniformly, tags included — no per-node shape/size
            // exceptions. 'cards' mode still reads `data.colour` back out
            // to accent the card itself — see getRenderNode().
            nodes.push({ id: tagNodeId, data: { label, entityType: 'tag', colour } })
          }
        }
        edges.push({ from: parentId, to: tagNodeId, data: { kind: 'hasTag' }, style: edgeStyleFor('hasTag') })
      }
    }

    const addGalaxies = (galaxies: MispGalaxy[] | undefined, parentId: NodeId): void => {
      for (const galaxy of galaxies ?? []) {
        for (const cluster of galaxy.GalaxyCluster ?? []) {
          let clusterNodeId = clusterNodeIdById.get(cluster.id)
          if (!clusterNodeId) {
            clusterNodeId = `cluster:${cluster.id}`
            clusterNodeIdById.set(cluster.id, clusterNodeId)
            if (cluster.uuid) clusterNodeIdByUuid.set(cluster.uuid, clusterNodeId)
            seenClusters.push(cluster)
            nodes.push({
              id: clusterNodeId,
              data: { label: cluster.value, entityType: `galaxies/${galaxy.type}`, description: cluster.description, source: cluster.source },
            })
          }
          edges.push({ from: parentId, to: clusterNodeId, data: { kind: 'hasGalaxy' }, style: edgeStyleFor('hasGalaxy') })
        }
      }
    }

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
        data: attribute.object_relation
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
          data: metaCategory ? { label: metaCategory, kind: 'hasObject' } : { kind: 'hasObject' },
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
        // `label` is what Pivotick actually shows on the edge (see
        // EdgeDrawer.ts's edgeLabelGetter — reads edge.getData().label
        // directly, no render-option wiring needed). Purely structural
        // edges (event->attribute, ...) are left unlabeled on purpose —
        // Object References are MISP's actual named relationships, so
        // that's where a label earns its place instead of adding clutter.
        edges.push({
          from: fromId,
          to: toId,
          data: { label: reference.relationship_type ?? '', relationshipType: reference.relationship_type, kind: 'reference' },
          style: edgeStyleFor('reference'),
        })
      }
    }

    // GalaxyClusterRelation — MISP's own cluster-to-cluster graph (e.g. a
    // threat-actor cluster "uses" a malware cluster), distinct from an
    // Object Reference. Targets are resolved by uuid; skipped if the
    // referenced cluster wasn't one we rendered (out of scope of this
    // input, or its uuid is empty in the source data).
    for (const cluster of seenClusters) {
      const fromId = clusterNodeIdById.get(cluster.id)
      if (!fromId) continue

      for (const relation of cluster.GalaxyClusterRelation ?? []) {
        const toId = clusterNodeIdByUuid.get(relation.referenced_galaxy_cluster_uuid)
        if (!toId) continue
        edges.push({
          from: fromId,
          to: toId,
          data: { label: relation.referenced_galaxy_cluster_type, kind: 'clusterRelation' },
          style: edgeStyleFor('clusterRelation'),
        })
      }
    }

    // TODO: Sighting is aggregated into sightingCount on the Attribute
    // node's data, not rendered as its own nodes — individual sightings
    // (a timestamp + source) aren't graph-worthy entities on their own.
    return { nodes, edges }
  }

  getNodeTypeAccessor(): NodeTypeAccessor {
    return (node) => (node.data?.entityType as string | undefined) ?? 'unknown'
  }

  getDefaultStyleMap(options?: ConverterOptions): NodeStyleMap {
    if (this.resolveMode(options) === 'icons') {
      // shape/color per *category* comes from styles.json's "icons.nodes"
      // section — a small, hand-edited config, not generated — so
      // tweaking "objects should be squares" or "attributes should be
      // green" is a one-line JSON edit, not a code change. The *icon* per
      // specific key (domain vs ip-dst vs md5, ...) is what's actually
      // per-key and machine-generated, from scripts/sync-icons.mjs —
      // layered on top of the category style.
      //
      // Node labels (NodeStyle.text) are deliberately not set in this
      // mode — with icons already carrying the entity type and hundreds
      // of nodes on screen at once, always-on text under every node is
      // clutter, not signal. node.data.label is still there for the
      // sidebar/tooltip either way. Edge labels (Object Reference
      // relationship_type, Object Attribute object_relation,
      // GalaxyClusterRelation type) carry the actually-interesting
      // relation names instead — see convert().
      const nodeStyles = stylesConfig.icons.nodes

      const withIcon = (categoryStyle: Record<string, unknown>, entityType: string): Record<string, unknown> => {
        const svgIcon = mispIconSvg(entityType)
        return svgIcon ? { ...categoryStyle, svgIcon } : categoryStyle
      }

      const styleMap: NodeStyleMap = {
        event: withIcon(nodeStyles.event, 'event'),
        tag: withIcon(nodeStyles.tag, 'tag'),
      }
      for (const key of Object.keys(MISP_ATTRIBUTE_ICONS)) styleMap[key] = withIcon(nodeStyles.attribute, key)
      for (const key of Object.keys(MISP_OBJECT_ICONS)) styleMap[`objects/${key}`] = withIcon(nodeStyles.object, `objects/${key}`)
      for (const key of Object.keys(MISP_GALAXY_ICONS)) styleMap[`galaxies/${key}`] = withIcon(nodeStyles.galaxyCluster, `galaxies/${key}`)
      for (const key of Object.keys(MISP_GENERIC_ICONS)) {
        if (key === 'event' || key === 'tag') continue
        styleMap[key] = withIcon(nodeStyles.generic, key)
      }
      return styleMap
    }

    // 'simple' and 'cards' modes share the same flat, icon-free style: a
    // coarse kind (mispKind.ts) drives shape/color/a short text mark. Every
    // known key is enumerated up front rather than computed lazily per
    // node, since NodeStyleMap is a plain lookup object, not a function —
    // a genuinely unrecognized type (not in any of the generated icon key
    // lists) falls through to getDefaultNodeStyle()'s 'other' style
    // instead of getting its own entry here.
    const styleMap: NodeStyleMap = {}
    for (const entityType of allKnownEntityTypes()) {
      const kind = stylesConfig.kinds[classifyEntityType(entityType)]
      styleMap[entityType] = { shape: kind.shape, color: kind.color, size: kind.size, text: kind.mark }
    }
    return styleMap
  }

  getDefaultNodeStyle(options?: ConverterOptions): Record<string, unknown> {
    if (this.resolveMode(options) === 'icons') return {}
    const kind = stylesConfig.kinds.other
    return { shape: kind.shape, color: kind.color, size: kind.size, text: kind.mark }
  }

  getDefaultEdgeStyle(): Record<string, unknown> {
    // Just the flat fallback — every edge's real, kind-specific style
    // (styles.json's "edges" section) is resolved and attached directly
    // to its own `RawEdge.style` in convert() via `edgeStyleFor()`. See
    // that function's doc comment for why: `styleCb` only works as a
    // *per-edge* style callback in Pivotick's real renderer, never as a
    // `defaultEdgeStyle` one.
    return stylesConfig.edges.default
  }

  getMarkerStyleMap(): Record<string, unknown> {
    // Smaller arrowheads than Pivotick's built-in 12x12 default — same
    // triangle proportions, just scaled down (see styles.json's "arrow").
    // Only `markerWidth`/`markerHeight` are configurable from JSON; shape
    // and anchor point stay fixed since they're tied to those dimensions.
    const { markerWidth, markerHeight } = stylesConfig.arrow
    const halfHeight = markerHeight / 2
    return {
      arrow: {
        pathD: `M0,-${halfHeight}L${markerWidth},0L0,${halfHeight}`,
        viewBox: `0 -${halfHeight} ${markerWidth} ${markerHeight}`,
        refX: markerWidth * 0.6,
        refY: 0,
        markerWidth,
        markerHeight,
        markerUnits: 'userSpaceOnUse',
        orient: 'auto',
      },
    }
  }

  getRenderNode(options?: ConverterOptions): RenderNodeFn | undefined {
    const mode = this.resolveMode(options)

    if (mode === 'cards') {
      // A readable card for every node — icon-badge + title + subtitle,
      // plus a handful of "extra info" rows so the card actually answers
      // "who/what is this" on its own, not just "what kind of thing is
      // this". Modeled after adulau/threat-actor-explorer's
      // renderReadableNode(), adapted to this converter's data. Built with
      // DOM APIs only (buildReadableCard uses `textContent`, never
      // `innerHTML`, for anything derived from MISP data), so a MISP
      // value containing markup can't be interpreted as such.
      return (node) => {
        const data = node.getData?.()
        if (!data) return undefined
        const entityType = (data.entityType as string | undefined) ?? 'unknown'
        const kindKey = classifyEntityType(entityType)
        const kind = stylesConfig.kinds[kindKey]
        const cardGroup: MispCardGroup = cardGroupFor(kindKey)

        // Badge accent: an attribute card is accented by its real MISP
        // category (e.g. "Network activity" -> its own colour/mark)
        // rather than the generic "attribute" kind, when known; a tag
        // card is accented by the tag's own colour (its actual MISP UI
        // colour, e.g. tlp:red -> red) rather than the generic grey "tag"
        // kind. Both fall back to the kind's own colour/mark otherwise —
        // every other card group always uses the kind's.
        let accentColor = kind.color
        let accentMark = kind.mark
        if (cardGroup === 'attribute') {
          const category = data.category as string | undefined
          const categoryStyle = category ? (stylesConfig.categories as Record<string, { color: string; mark: string }>)[category] : undefined
          if (categoryStyle) {
            accentColor = categoryStyle.color
            accentMark = categoryStyle.mark
          }
        } else if (cardGroup === 'tag' && typeof data.colour === 'string' && data.colour) {
          accentColor = data.colour
        }

        // Subtitle: the *specific* type, one level more precise than the
        // coarse kind badge already shown — the object's real template
        // name (e.g. 'domain-ip'), the attribute's real type (e.g.
        // 'ip-dst'), the galaxy cluster's real galaxy type (e.g.
        // 'threat-actor') — stripped of this converter's internal
        // `objects/`/`galaxies/` entityType prefix, not itself meaningful
        // to a reader.
        const subtitle =
          cardGroup === 'event' ? 'Event' : cardGroup === 'tag' ? 'Tag' : entityType.replace(/^objects\//, '').replace(/^galaxies\//, '')

        return buildReadableCard({
          badge: accentMark,
          accentColor,
          title: (data.label as string | undefined) ?? entityType,
          subtitle,
          fields: (stylesConfig.cards as Record<MispCardGroup, CardField[]>)[cardGroup] ?? [],
          data,
          emphasized: cardGroup === 'event',
        })
      }
    }

    if (mode === 'icons') {
      const nodeStyles = stylesConfig.icons.nodes
      // 'ConverterOptions.fullLabels' (default off): never truncate a
      // badge/tag's text, sizing it to whatever its content actually
      // needs instead of the fixed, edge-anchor-friendly box sizes below
      // — see buildIconBadge()'s and buildTagChip()'s `fullLabel` param
      // for the tradeoff this makes.
      const fullLabels = Boolean(options?.fullLabels)

      return (node) => {
        const data = node.getData?.()
        if (!data) return undefined
        const entityType = (data.entityType as string | undefined) ?? 'unknown'
        const isEvent = entityType === 'event'

        // A tag (plain or galaxy-pattern) prefers its own per-node style
        // override (set in convert(), only for `icons` mode) over the
        // generic "tag" category — that's where a galaxy-pattern tag's
        // real galaxy icon and its resolved colour actually live, same
        // source the native renderer itself would've used.
        const nodeStyle = node.getStyle?.()
        const categoryStyle = nodeStyles[iconCategoryFor(entityType)]
        const svgIcon = (nodeStyle?.svgIcon as string | undefined) ?? mispIconSvg(entityType)
        const fillColor = (nodeStyle?.color as string | undefined) ?? categoryStyle.color
        const title = (data.label as string | undefined) ?? entityType

        // A galaxy-pattern tag is the only kind of tag that carries an
        // icon override (see addTags() — plain tags never get an
        // svgIcon), so its presence doubles as the "this needs more room"
        // signal without having to plumb a separate flag through.
        if (entityType === 'tag') return buildTagChip(fillColor, svgIcon, title, Boolean(nodeStyle?.svgIcon), fullLabels)

        const outlineColor = nodeStyle?.strokeColor as string | undefined

        // The kind chip's own label/colour come from the finer 13-kind
        // vocabulary (mispKind.ts), not the coarser 6-category one the
        // icon token's shape/colour above uses — a "Threat Actor" cluster
        // and a "Malware" cluster both render as the same purple square
        // token (still unmistakably "some kind of galaxy cluster"), but
        // their chips say which, in a colour of their own, exactly the
        // kind of specific-yet-uncluttered info this badge is for.
        const kindMeta = stylesConfig.kinds[classifyEntityType(entityType)]

        const size = isEvent ? 'emphasized' : entityType.startsWith('galaxies/') ? 'wide' : 'normal'

        return buildIconBadge({
          shape: categoryStyle.shape,
          fillColor,
          outlineColor,
          svgIcon,
          title,
          kindLabel: kindMeta.label,
          kindColor: kindMeta.color,
          secondary: secondaryInfoFor(entityType, data),
          size,
          fullLabel: fullLabels,
        })
      }
    }

    return undefined
  }
}
