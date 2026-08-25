import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// What a MISP Object node looks like by default — same icon-card pattern
// as event/defaults.ts (square/transparent native shape, the real look
// drawn by buildIconLabelCard via `html`). Unlike Event, the icon itself
// isn't fixed: import.ts picks `objects/<name>.svg` when misp-iconify has
// one for that Object's `name` (e.g. "domain-ip", "file", ...), falling
// back to this generic `object` icon otherwise.
export const MISP_OBJECT_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'square',
  color: 'transparent',
  strokeColor: 'transparent',
  icon: 'object',
  accentColor: '#524948',
  // Bigger than Attribute's leaves, smaller than the Event root.
  fontSize: 14,
  iconSize: 26
}
