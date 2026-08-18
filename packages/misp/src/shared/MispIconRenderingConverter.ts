import { GraphConverter } from 'pivotick-transformer-core'
import type { ConverterOptions, NodeStyleMap, NodeTypeAccessor, RenderNodeFn } from 'pivotick-transformer-core'

import { MISP_ATTRIBUTE_ICONS, MISP_GALAXY_ICONS, MISP_GENERIC_ICONS, MISP_OBJECT_ICONS } from './icons.generated.js'
import { classifyEntityType } from './mispKind.js'
import { mispIconSvg } from './mispIconSvg.js'
import flatStylesConfig from './styles.flat.json' with { type: 'json' }
import stylesConfig from './styles.json' with { type: 'json' }
import type { MispInput } from './types.js'

// ── node rendering helpers ────────────────────────────────────────────
//
// Two interchangeable "looks," picked via `ConverterOptions.style`
// ('card', the default, or 'flat') — a pure styling choice, not a variant
// (see CONTRIBUTING.md's note on the distinction): every MISP variant's
// `convert()` output renders identically either way, only the DOM/CSS
// `getRenderNode()` builds for each node changes.
//
// - 'card' (buildIconBadge/buildTagChip, styles.json): a white card with
//   a coloured border and a boxed icon token — the original look.
// - 'flat' (buildFlatBadge/buildFlatTagChip, styles.flat.json): a soft
//   colour-tinted chip with a circular icon avatar and a coloured left
//   accent bar, no border/shadow beyond a thin neutral hairline — a
//   calmer, more compact alternative that leans on tint instead of an
//   outline to carry each kind's colour.
//
// Both read the *same* icons.nodes/kinds colour-and-icon mapping (shared
// styles.json) — only the shell around that colour/icon differs, so the
// two looks stay one coherent visual language, never a different palette
// per mode.
//
// This goes through `renderNode` rather than Pivotick's native
// shape+`nodeStyleMap` rendering (still described by getDefaultStyleMap(),
// kept for consumers who use this converter without either badge look)
// only because Pivotick's renderNode hook is all-or-nothing for the whole
// graph — once it's set at all, every node is routed through it, with no
// per-node opt-out back to native rendering (verified against Pivotick's
// actual NodeRenderer.render() — see the note on RenderNodeFn in
// packages/core/src/types.ts).

/** Same 'attribute' vs 'generic' split `getDefaultStyleMap()` makes, minus event/tag (handled directly by entityType). */
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
 *
 * `data.occurrenceCount` (only ever set by `indicator-correlation`, which
 * dedupes Attributes by type+value instead of by uuid) gets appended when
 * present and above 1 — the whole point of that variant is showing "this
 * indicator is shared," so the badge should say so directly rather than
 * making the reader count incoming edges.
 */
function secondaryInfoFor(entityType: string, data: Record<string, unknown>): string | undefined {
  const occurrenceCount = typeof data.occurrenceCount === 'number' ? data.occurrenceCount : undefined
  const correlationSuffix = occurrenceCount && occurrenceCount > 1 ? ` · in ${occurrenceCount} events` : ''

  if (entityType === 'event') {
    const org = data.org as string | undefined
    const date = data.date as string | undefined
    if (org && date) return `${org} · ${date}`
    return org ?? date
  }
  if (entityType.startsWith('objects/')) return entityType.slice('objects/'.length) + correlationSuffix
  if (entityType.startsWith('galaxies/')) return entityType.slice('galaxies/'.length) + correlationSuffix
  return entityType + correlationSuffix
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
 * 'flat' mode's entire colour strategy in one function: a *light tint* of
 * `hexColor` (mixed toward the badge's own white/near-white background at
 * `opacity`), never the solid colour itself. This is what lets 'flat'
 * mode's text stay a single fixed dark neutral everywhere — unlike
 * 'card' mode's `contrastTextColor()`, which has to flip between light
 * and dark per tag colour because a solid fill can be dark *or* light.
 * A light tint of any colour, including a near-white one like
 * `tlp:white`, is always light enough for dark text to read clearly on —
 * one less thing to special-case.
 */
function tintColor(hexColor: string, opacity: number): string {
  const hex = hexColor.replace('#', '')
  if (hex.length !== 6) return `rgba(148, 163, 184, ${opacity})`
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
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
 * real misp-iconify icon, closely mirroring what `getDefaultStyleMap()`
 * draws natively. Explicit width/height are set upfront
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
 * One consistent badge for every node, Event included: coloured icon
 * token, the node's own name, and a small kind-label chip underneath
 * (e.g. "Event", "Object", "Threat Actor") plus an
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
    // element, is the wrapping <foreignObject>'s initial 20x20 clip box.
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

// ── 'flat' mode ──────────────────────────────────────────────────────
//
// A calmer alternative to buildIconBadge()/buildTagChip() above: a
// colour-tinted chip instead of a white card with a coloured border —
// see the file's top-of-file comment for the two looks' overall
// rationale. Reads styles.flat.json instead of styles.json's "badge"
// section, but the same icons.nodes/kinds colour-and-icon mapping either
// way (both passed in by the caller, `getRenderNode()`).

/** 'flat' mode's icon avatar: always a circle (unlike buildIconToken()'s per-category shape), since a uniform silhouette is what lets the coloured chip itself, not the token, carry each kind's shape-of-the-day. */
function buildFlatAvatar(fillColor: string, diameter: number, svgIcon: string | undefined): HTMLElement {
  const avatar = document.createElement('div')
  Object.assign(avatar.style, {
    width: `${diameter}px`,
    height: `${diameter}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: fillColor,
    // Unlike 'card' mode's buildIconToken() (which has to pick between a
    // white or dark icon tint depending on the fill), the avatar is
    // always the kind's full, solid colour — vivid enough on its own —
    // so the icon is always white, no contrast branching needed.
    color: '#ffffff',
    boxSizing: 'border-box',
    flexShrink: '0',
  })

  if (svgIcon) {
    const iconWrap = document.createElement('span')
    Object.assign(iconWrap.style, { width: '58%', height: '58%', display: 'flex' })
    // Trusted markup — see buildIconToken()'s identical note.
    iconWrap.innerHTML = svgIcon
    const svgEl = iconWrap.firstElementChild
    if (svgEl) {
      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
    }
    avatar.append(iconWrap)
  }

  return avatar
}

/**
 * 'flat' mode's Tag/galaxy-pattern-tag pill: a light tint of the tag's
 * own colour (see `tintColor()`) instead of 'card' mode's solid fill —
 * text stays a fixed dark neutral regardless of the tag's colour, which
 * sidesteps `contrastTextColor()`'s light/dark branching entirely (a
 * light tint is always light enough for dark text). A thin neutral
 * hairline border keeps a near-white tag (e.g. `tlp:white`) visible
 * against a light/white canvas, same reasoning as 'card' mode's outline.
 */
function buildFlatTagChip(color: string, svgIcon: string | undefined, label: string, wide: boolean, fullLabel: boolean): HTMLElement {
  const cfg = flatStylesConfig.badge.tag
  const size = cfg.sizes[wide ? 'wide' : 'normal']

  const chip = document.createElement('div')
  Object.assign(chip.style, {
    ...(fullLabel ? {} : { width: `${size.width}px`, minHeight: `${size.minHeight}px`, overflow: 'hidden' }),
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: cfg.padding,
    borderRadius: `${cfg.borderRadius}px`,
    background: tintColor(color, cfg.tintOpacity),
    border: `1px solid ${flatStylesConfig.badge.borderColor}`,
    borderLeft: `${flatStylesConfig.badge.accentWidth}px solid ${color}`,
    fontFamily: flatStylesConfig.badge.fontFamily,
    cursor: 'default',
  })

  if (svgIcon) {
    const iconWrap = document.createElement('span')
    Object.assign(iconWrap.style, { width: `${cfg.iconSize}px`, height: `${cfg.iconSize}px`, display: 'flex', flexShrink: '0', color })
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
    color: '#0f172a',
    minWidth: '0',
    ...(fullLabel ? { whiteSpace: 'nowrap' } : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  })
  labelEl.textContent = label

  chip.append(labelEl)
  return chip
}

/**
 * 'flat' mode's badge for every other entity type: a circular avatar
 * (`buildFlatAvatar`) plus a title/kind/secondary text stack, inside a
 * chip tinted with the kind's own colour and a coloured left accent bar
 * — see the file's top comment for why this reads as a distinct,
 * coherent alternative to `buildIconBadge()` rather than a re-skin of it.
 * Same params as `buildIconBadge()` (this is a drop-in alternative render
 * path, picked by `getRenderNode()` based on `ConverterOptions.style`).
 */
function buildFlatBadge(params: {
  fillColor: string
  svgIcon: string | undefined
  title: string
  kindLabel: string
  kindColor: string
  secondary?: string
  size: 'normal' | 'wide' | 'emphasized'
  fullLabel: boolean
}): HTMLElement {
  const { fillColor, svgIcon, title, kindLabel, kindColor, secondary, size, fullLabel } = params
  const cfg = flatStylesConfig.badge.sizes[size]

  const badge = document.createElement('div')
  Object.assign(badge.style, {
    ...(fullLabel ? {} : { width: `${cfg.width}px`, minHeight: `${cfg.minHeight}px`, overflow: 'hidden' }),
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: cfg.padding,
    borderRadius: `${cfg.borderRadius}px`,
    background: tintColor(fillColor, cfg.tintOpacity),
    border: `1px solid ${flatStylesConfig.badge.borderColor}`,
    borderLeft: `${flatStylesConfig.badge.accentWidth}px solid ${fillColor}`,
    fontFamily: flatStylesConfig.badge.fontFamily,
    cursor: 'default',
  })

  const avatar = buildFlatAvatar(fillColor, cfg.avatarDiameter, svgIcon)

  const content = document.createElement('span')
  Object.assign(content.style, { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0', flex: '1' })

  const titleEl = document.createElement('span')
  Object.assign(titleEl.style, {
    fontSize: `${cfg.titleFontSize}px`,
    fontWeight: String(cfg.titleFontWeight),
    lineHeight: '1.3',
    color: '#0f172a',
    minWidth: '0',
    ...(fullLabel ? { whiteSpace: 'nowrap' } : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  })
  titleEl.textContent = title

  const metaRow = document.createElement('span')
  Object.assign(metaRow.style, { display: 'flex', alignItems: 'center', gap: '4px', minWidth: '0' })

  const kindEl = document.createElement('span')
  Object.assign(kindEl.style, {
    fontSize: `${cfg.kindFontSize}px`,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: kindColor,
    whiteSpace: 'nowrap',
    flexShrink: '0',
  })
  kindEl.textContent = kindLabel
  metaRow.append(kindEl)

  if (secondary) {
    const secondaryEl = document.createElement('span')
    Object.assign(secondaryEl.style, {
      fontSize: `${cfg.secondaryFontSize}px`,
      color: '#64748b',
      minWidth: '0',
      ...(fullLabel ? {} : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
    })
    secondaryEl.textContent = `· ${secondary}`
    metaRow.append(secondaryEl)
  }

  content.append(titleEl, metaRow)
  badge.append(avatar, content)
  return badge
}

/**
 * Shared MISP rendering base: every MISP variant — regardless of graph
 * *topology* (e.g. `event-root`'s flat containment edges vs.
 * `event-root-simplified`'s nested, collapsible `RawNode.children`) —
 * renders every node identically: one consistent icon badge
 * (`buildIconBadge`/`buildTagChip`) — a coloured icon token, the node's
 * name, and a coarse kind chip (`mispKind.ts`) underneath. Variants only
 * differ in `convert()` (what's a node, what's an edge, what's nested as
 * a child) — see each variant's own class for that.
 */
export abstract class MispIconRenderingConverter extends GraphConverter<MispInput> {
  getNodeTypeAccessor(): NodeTypeAccessor {
    return (node) => (node.data?.entityType as string | undefined) ?? 'unknown'
  }

  getDefaultStyleMap(): NodeStyleMap {
    // shape/color per *category* comes from styles.json's "icons.nodes"
    // section — a small, hand-edited config, not generated — so
    // tweaking "objects should be squares" or "attributes should be
    // green" is a one-line JSON edit, not a code change. The *icon* per
    // specific key (domain vs ip-dst vs md5, ...) is what's actually
    // per-key and machine-generated, from scripts/sync-icons.mjs —
    // layered on top of the category style.
    //
    // Node labels (NodeStyle.text) are deliberately not set here — with
    // icons already carrying the entity type and hundreds of nodes on
    // screen at once, always-on text under every node is clutter, not
    // signal. node.data.label is still there for the sidebar/tooltip
    // either way. Edge labels (Object Reference relationship_type, Object
    // Attribute object_relation, GalaxyClusterRelation type) carry the
    // actually-interesting relation names instead — see convert().
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

  getRenderNode(options?: ConverterOptions): RenderNodeFn {
    const nodeStyles = stylesConfig.icons.nodes
    // 'ConverterOptions.fullLabels' (default off): never truncate a
    // badge/tag's text, sizing it to whatever its content actually
    // needs instead of the fixed, edge-anchor-friendly box sizes below
    // — see buildIconBadge()'s and buildTagChip()'s `fullLabel` param
    // for the tradeoff this makes.
    const fullLabels = Boolean(options?.fullLabels)
    // 'ConverterOptions.style' ('card', the default, or 'flat') — see
    // this file's top comment for what each look is. A pure rendering
    // choice, not a variant: every node's underlying data is identical
    // either way.
    const flat = options?.style === 'flat'

    return (node) => {
      const data = node.getData?.()
      if (!data) return undefined
      const entityType = (data.entityType as string | undefined) ?? 'unknown'
      const isEvent = entityType === 'event'

      // A tag (plain or galaxy-pattern) prefers its own per-node style
      // override (set by addMispTags()) over the generic "tag" category
      // — that's where a galaxy-pattern tag's real galaxy icon and its
      // resolved colour actually live, same source the native renderer
      // itself would've used.
      const nodeStyle = node.getStyle?.()
      const categoryStyle = nodeStyles[iconCategoryFor(entityType)]
      const svgIcon = (nodeStyle?.svgIcon as string | undefined) ?? mispIconSvg(entityType)
      const fillColor = (nodeStyle?.color as string | undefined) ?? categoryStyle.color
      const title = (data.label as string | undefined) ?? entityType

      // A galaxy-pattern tag is the only kind of tag that carries an
      // icon override (see addMispTags() — plain tags never get an
      // svgIcon), so its presence doubles as the "this needs more room"
      // signal without having to plumb a separate flag through.
      if (entityType === 'tag') {
        return flat
          ? buildFlatTagChip(fillColor, svgIcon, title, Boolean(nodeStyle?.svgIcon), fullLabels)
          : buildTagChip(fillColor, svgIcon, title, Boolean(nodeStyle?.svgIcon), fullLabels)
      }

      // The kind chip's own label/colour come from the finer 13-kind
      // vocabulary (mispKind.ts), not the coarser 6-category one the
      // icon token's shape/colour above uses — a "Threat Actor" cluster
      // and a "Malware" cluster both render as the same purple square
      // token (still unmistakably "some kind of galaxy cluster"), but
      // their chips say which, in a colour of their own, exactly the
      // kind of specific-yet-uncluttered info this badge is for.
      const kindMeta = stylesConfig.kinds[classifyEntityType(entityType)]

      const size = isEvent ? 'emphasized' : entityType.startsWith('galaxies/') ? 'wide' : 'normal'
      const secondary = secondaryInfoFor(entityType, data)

      if (flat) {
        return buildFlatBadge({
          fillColor,
          svgIcon,
          title,
          kindLabel: kindMeta.label,
          kindColor: kindMeta.color,
          secondary,
          size,
          fullLabel: fullLabels,
        })
      }

      const outlineColor = nodeStyle?.strokeColor as string | undefined
      return buildIconBadge({
        shape: categoryStyle.shape,
        fillColor,
        outlineColor,
        svgIcon,
        title,
        kindLabel: kindMeta.label,
        kindColor: kindMeta.color,
        secondary,
        size,
        fullLabel: fullLabels,
      })
    }
  }
}
