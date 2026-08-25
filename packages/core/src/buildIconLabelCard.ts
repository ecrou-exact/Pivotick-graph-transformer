export interface IconLabelCardOptions {
  textColor?: string
  // Background of the small hexagon the icon sits in; the icon itself
  // should use `fill="currentColor"` so it picks up textColor's counterpart.
  iconBackground?: string
  // Pivotick's own node shapes are always as wide as tall (size*2 x size*2)
  // — there's no native rectangle. So this card draws its own rectangle
  // (borderColor/background) centered inside whatever square footprint
  // Pivotick gives the node; the node's own shape/color/strokeColor should
  // be set to 'transparent' by the caller so it doesn't show behind this.
  borderColor?: string
  background?: string
  // Small pill shown below the icon+label row (e.g. a MISP Object's
  // meta-category) — omitted entirely when not given.
  badge?: string
  // Label font size in px (default 12) — lets one node type read as more
  // or less prominent than another (e.g. a graph's root vs. its leaves).
  fontSize?: number
  // Icon badge width/height in px (default 22); the icon glyph inside it
  // scales proportionally.
  iconSize?: number
}

// Icon (in its own small hexagon badge) + label, top-left aligned inside a
// rectangle card — leaves room below for more content later. Meant to be
// used via `style.html`, since Pivotick's built-in svgIcon/text fields both
// render centered and would overlap rather than sit next to each other.
// Generic, not MISP-specific, so any format package can reuse it.
export function buildIconLabelCard(iconSvg: string | undefined, label: string, options?: IconLabelCardOptions): HTMLElement {
  const textColor = options?.textColor ?? '#1892B1'
  const iconBackground = options?.iconBackground ?? textColor
  const borderColor = options?.borderColor ?? textColor
  const background = options?.background ?? '#FFFFFF'
  const fontSize = options?.fontSize ?? 12
  const iconSize = options?.iconSize ?? 22

  const outer = document.createElement('div')
  outer.style.width = '100%'
  outer.style.height = '100%'
  outer.style.display = 'flex'
  outer.style.alignItems = 'center'
  outer.style.justifyContent = 'center'

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'flex-start'
  wrapper.style.justifyContent = 'flex-start'
  wrapper.style.width = 'fit-content'
  wrapper.style.maxWidth = '100%'
  wrapper.style.height = 'auto'
  wrapper.style.padding = '8px 10px'
  wrapper.style.boxSizing = 'border-box'
  wrapper.style.background = background
  wrapper.style.border = `2px solid ${borderColor}`
  wrapper.style.borderRadius = '6px'
  wrapper.style.fontFamily = 'system-ui, sans-serif'
  wrapper.style.fontSize = `${fontSize}px`
  wrapper.style.color = textColor

  const header = document.createElement('div')
  header.style.display = 'flex'
  // flex-start, not center: with center, a long label that wraps to
  // several lines drags the icon down to the middle of the paragraph
  // instead of staying pinned next to its first line.
  header.style.alignItems = 'flex-start'
  header.style.gap = '6px'
  header.style.width = '100%'

  if (iconSvg) {
    const badge = document.createElement('span')
    badge.style.flex = '0 0 auto'
    badge.style.width = `${iconSize}px`
    badge.style.height = `${iconSize}px`
    badge.style.display = 'flex'
    badge.style.alignItems = 'center'
    badge.style.justifyContent = 'center'
    badge.style.background = iconBackground
    badge.style.color = '#FFFFFF'
    badge.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

    const icon = document.createElement('span')
    // Same ratio as the original fixed 14px-glyph-in-22px-badge sizing.
    const glyphSize = Math.round(iconSize * (14 / 22))
    icon.style.width = `${glyphSize}px`
    icon.style.height = `${glyphSize}px`
    icon.innerHTML = iconSvg
    badge.append(icon)
    header.append(badge)
  }

  // Label and badge sit in their own column, next to the icon — so the
  // badge lands under the label text only, not under the icon as well.
  const textColumn = document.createElement('div')
  textColumn.style.display = 'flex'
  textColumn.style.flexDirection = 'column'
  textColumn.style.alignItems = 'flex-start'
  textColumn.style.gap = '4px'
  textColumn.style.minWidth = '0'

  // No ellipsis/nowrap here — Pivotick owns node sizing, this just wraps
  // naturally within whatever box it's given. overflowWrap/wordBreak matter
  // because MISP attribute values are often one long unbroken token (a
  // URL, a hash, ...) with no space to wrap at otherwise, which would
  // overflow the card's edge instead of wrapping onto another line.
  const text = document.createElement('span')
  text.style.overflowWrap = 'anywhere'
  text.style.wordBreak = 'break-word'
  text.textContent = label
  textColumn.append(text)

  if (options?.badge) {
    const badge = document.createElement('span')
    badge.textContent = options.badge
    badge.style.padding = '0 4px'
    badge.style.borderRadius = '999px'
    badge.style.fontSize = '6px'
    badge.style.lineHeight = '1.6'
    badge.style.fontWeight = '600'
    badge.style.textTransform = 'uppercase'
    badge.style.letterSpacing = '0.01em'
    badge.style.color = textColor
    badge.style.background = `color-mix(in srgb, ${textColor} 16%, transparent)`
    textColumn.append(badge)
  }

  header.append(textColumn)
  wrapper.append(header)
  outer.append(wrapper)
  return outer
}
