// Shared with buildIconLabelCard.ts/buildTagChip.ts, which must wrap their
// real HTML at this same width — a `max-width: 100%` there would resolve
// against whatever (possibly slightly off) footprint this estimate guessed,
// instead of the fixed width the estimate itself wrapped its lines at.
export const DEFAULT_CARD_MAX_WIDTH = 260

export interface EstimateCardSizeOptions {
  hasIcon?: boolean
  // Label font size in px (default 12) — drives the character-width and
  // line-height estimate, so a node type rendered with a bigger/smaller
  // font (see buildIconLabelCard's own `fontSize`) still gets a card sized
  // to actually fit it.
  fontSize?: number
  // Icon badge width/height in px (default 22) — must match whatever's
  // passed to buildIconLabelCard's `iconSize` for the same node.
  iconSize?: number
  maxWidth?: number
  padding?: number
  // Extra rows of content the label alone doesn't account for (e.g. a badge
  // line below it) — each adds one more line at the label's line height.
  extraLines?: number
  // Extra text rendered smaller than the label (e.g. a badge) that can
  // still force the card wider than the label alone would — most MISP
  // Object names are shorter than their meta-category.
  secondaryText?: string
  secondaryCharWidth?: number
}

// Pivotick's node footprint is always a size*2 x size*2 square, but only
// ever as a *guess*: the renderer measures the real HTML afterwards and can
// grow the node's border past that guess to whatever it actually rendered
// (see NodeDrawer.fitCardToContent upstream, and buildIconLabelCard.ts for
// why our card content must be free to measure narrower/shorter than it).
// So this deliberately returns the *smaller* of the two dimensions, not the
// larger: a card is normally wider than tall (icon + one-line label), and
// sizing the square to the short axis guarantees the long axis measures
// past its guess, which is what lets a shape-aware renderer tell the real
// rectangle apart from a circle. Sizing to the long axis (the largest
// dimension) would give a square that already contains the whole card on
// both axes — nothing would ever measure bigger than the guess, and the
// card would anchor edges as a circle no matter how elongated it actually
// is. This stays a plain heuristic (character count, no DOM/canvas) rather
// than measuring real text width, so convert() keeps working outside a
// browser.
export function estimateCardSize(label: string, options?: EstimateCardSizeOptions): number {
  const hasIcon = options?.hasIcon ?? true
  const fontSize = options?.fontSize ?? 12
  // Ratios measured against the original fixed 12px/20px card text.
  const charWidth = fontSize * (6.5 / 12)
  const lineHeight = fontSize * (20 / 12)
  const iconSize = options?.iconSize ?? 22
  const maxWidth = options?.maxWidth ?? DEFAULT_CARD_MAX_WIDTH
  const padding = options?.padding ?? 20
  const extraLines = options?.extraLines ?? 0
  const secondaryCharWidth = options?.secondaryCharWidth ?? 4.5
  const iconWidth = hasIcon ? iconSize + 6 : 0

  // +1 charWidth of safety margin: a plain per-character average
  // underestimates wide glyphs (all-caps text like "TCP" runs wider per
  // character than the mixed-case text this ratio was measured against),
  // and being short by even a couple pixels means the last character
  // wraps onto its own line under overflow-wrap: anywhere.
  const labelWidth = padding + iconWidth + label.length * charWidth + charWidth
  const secondaryWidth = options?.secondaryText
    ? padding + iconWidth + options.secondaryText.length * secondaryCharWidth
    : 0
  const contentWidth = Math.max(labelWidth, secondaryWidth)
  const width = Math.min(maxWidth, contentWidth)
  // Wrapping is driven by the label alone — the badge doesn't wrap, it
  // just needs to fit within whatever width the label (or its own length)
  // already forces.
  const lines = Math.max(1, Math.ceil(labelWidth / maxWidth))
  const height = padding + (lines + extraLines) * lineHeight

  return Math.ceil(Math.min(width, height) / 2)
}
