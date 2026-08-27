import { DEFAULT_CARD_MAX_WIDTH } from './estimateCardSize'

export interface TagChipOptions {
  background?: string
  fontSize?: number
  // Explicit text/border colors, for a caller with its own palette (e.g. a
  // MISP galaxy's hue-derived colours) — omit either to fall back to this
  // chip's own black/white contrast pick (textColor) or its default subtle
  // grey (borderColor).
  textColor?: string
  borderColor?: string
  // An extra `background-image` layered on top of `background` — MISP's
  // galaxy badges add a metallic sheen gradient this way.
  backgroundImage?: string
}

// Picks black or white for legible contrast against an arbitrary hex
// background, using the standard perceived-luminance (YIQ-style) heuristic
// rather than raw RGB average — human eyes weigh green much more than blue.
function readableTextColor(hexColor: string): string {
  const normalized = hexColor.replace('#', '')
  const full = normalized.length === 3
    ? normalized.split('').map(c => c + c).join('')
    : normalized.padEnd(6, '0').slice(0, 6)
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// MISP's own tag look: a small pill filled with the tag's colour, its
// name as the label, text automatically black or white for contrast.
// Meant to be used via `style.html`, same as buildIconLabelCard — Pivotick
// has no native pill/chip shape of its own.
export function buildTagChip(label: string, options?: TagChipOptions): HTMLElement {
  const background = options?.background ?? '#888888'
  const fontSize = options?.fontSize ?? 11
  const textColor = options?.textColor ?? readableTextColor(background)

  // inline-flex + max-content, not flex+100%: Pivotick measures *this*
  // element (its real width/height, not just their aspect ratio) to decide
  // whether the node anchors edges on a circle or on the chip's own border.
  // `fit-content`/auto sizing is defined as min(max-content, max(min-content,
  // available-space)) — bound by the foreignObject's guessed footprint, so a
  // 100%-stretched chip always measured back exactly that square footprint,
  // never its own real (usually wider-than-tall) shape. `max-content` is a
  // pure intrinsic size, unaffected by the ancestor's available space, so it
  // always reflects the chip's true rendered dimensions.
  const outer = document.createElement('div')
  outer.style.display = 'inline-flex'
  outer.style.width = 'max-content'
  outer.style.alignItems = 'center'
  outer.style.justifyContent = 'center'

  const chip = document.createElement('div')
  chip.style.display = 'flex'
  chip.style.alignItems = 'center'
  chip.style.justifyContent = 'center'
  chip.style.width = 'max-content'
  // A px cap, not '100%': see buildIconLabelCard.ts's wrapper for why.
  chip.style.maxWidth = `${DEFAULT_CARD_MAX_WIDTH}px`
  chip.style.padding = '4px 10px'
  chip.style.boxSizing = 'border-box'
  chip.style.borderRadius = '999px'
  chip.style.background = background
  chip.style.color = textColor
  chip.style.fontFamily = 'system-ui, sans-serif'
  chip.style.fontSize = `${fontSize}px`
  chip.style.fontWeight = '600'
  chip.style.textAlign = 'center'
  chip.style.overflowWrap = 'anywhere'
  chip.style.wordBreak = 'break-word'
  // A near-white or near-black tag colour would otherwise vanish against
  // a similarly-toned card/page background.
  chip.style.border = `1px solid ${options?.borderColor ?? 'rgba(128, 128, 128, 0.35)'}`
  if (options?.backgroundImage) chip.style.backgroundImage = options.backgroundImage
  chip.textContent = label

  outer.append(chip)
  return outer
}
