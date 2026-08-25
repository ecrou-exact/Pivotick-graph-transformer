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

// Pivotick's node footprint is always a size*2 x size*2 square (see
// buildIconLabelCard.ts for why) — there's no "auto" option on its side, so
// whoever builds the card has to size that square to fit the actual label.
// This stays a plain heuristic (character count, no DOM/canvas) rather than
// measuring real text width, so convert() keeps working outside a browser.
export function estimateCardSize(label: string, options?: EstimateCardSizeOptions): number {
  const hasIcon = options?.hasIcon ?? true
  const fontSize = options?.fontSize ?? 12
  // Ratios measured against the original fixed 12px/20px card text.
  const charWidth = fontSize * (6.5 / 12)
  const lineHeight = fontSize * (20 / 12)
  const iconSize = options?.iconSize ?? 22
  const maxWidth = options?.maxWidth ?? 260
  const padding = options?.padding ?? 20
  const extraLines = options?.extraLines ?? 0
  const secondaryCharWidth = options?.secondaryCharWidth ?? 4.5
  const iconWidth = hasIcon ? iconSize + 6 : 0

  const labelWidth = padding + iconWidth + label.length * charWidth
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

  return Math.ceil(Math.max(width, height) / 2)
}
