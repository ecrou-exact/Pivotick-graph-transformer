export interface EstimateCardSizeOptions {
  hasIcon?: boolean
  charWidth?: number
  maxWidth?: number
  lineHeight?: number
  padding?: number
}

// Pivotick's node footprint is always a size*2 x size*2 square (see
// buildIconLabelCard.ts for why) — there's no "auto" option on its side, so
// whoever builds the card has to size that square to fit the actual label.
// This stays a plain heuristic (character count, no DOM/canvas) rather than
// measuring real text width, so convert() keeps working outside a browser.
export function estimateCardSize(label: string, options?: EstimateCardSizeOptions): number {
  const hasIcon = options?.hasIcon ?? true
  const charWidth = options?.charWidth ?? 6.5
  const maxWidth = options?.maxWidth ?? 260
  const lineHeight = options?.lineHeight ?? 20
  const padding = options?.padding ?? 20
  const iconWidth = hasIcon ? 28 : 0

  const contentWidth = padding + iconWidth + label.length * charWidth
  const width = Math.min(maxWidth, contentWidth)
  const lines = Math.max(1, Math.ceil(contentWidth / maxWidth))
  const height = padding + lines * lineHeight

  return Math.ceil(Math.max(width, height) / 2)
}
