import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// What a MISP Attribute node looks like by default — same icon-card
// pattern as event/defaults.ts and object/defaults.ts (square/transparent
// native shape, the real look drawn by buildIconLabelCard via `html`).
// Like Object, the icon isn't fixed: import.ts picks `attributes/<type>.svg`
// when misp-iconify has one for that Attribute's `type` (e.g. "ip-dst",
// "sha256", ...), falling back to this generic `attribute` icon otherwise.
export const MISP_ATTRIBUTE_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string } = {
  shape: 'square',
  color: 'transparent',
  strokeColor: 'transparent',
  icon: 'attribute',
  accentColor: '#97CC04'
}
