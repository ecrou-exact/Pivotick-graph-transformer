import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// What a MISP Attribute node looks like by default — same icon-card
// pattern as event/defaults.ts and object/defaults.ts (shape: 'none', the
// real look drawn by buildIconLabelCard via `html`). Like Object, the icon
// isn't fixed: import.ts picks `attributes/<type>.svg` when misp-iconify
// has one for that Attribute's `type` (e.g. "ip-dst", "sha256", ...),
// falling back to this generic `attribute` icon otherwise.
export const MISP_ATTRIBUTE_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'none',
  icon: 'attribute',
  accentColor: '#97CC04',
  // Smaller than Object — Attributes are the graph's leaves.
  fontSize: 10,
  iconSize: 18
}

// The "Attributes" grouping node — one per parent that has any, standing in
// for all of them when `ConverterOptions.viewMode` is 'grouped' (see
// import.ts's maybeGroup). Same icon/accent as the individual Attribute
// above, just at Object's size — it reads as one step up from a leaf.
export const MISP_ATTRIBUTE_GROUP_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'none',
  icon: 'attribute',
  accentColor: '#97CC04',
  fontSize: 14,
  iconSize: 26
}
