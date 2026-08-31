import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// The "Tags" grouping node — one per parent that has any, standing in for
// all of them when `ConverterOptions.viewMode` is 'grouped' (see import.ts's
// maybeGroup). Unlike Attribute/Object, a Tag has no *one* accent colour of
// its own (each carries its own `colour`), so this picks a fixed accent
// rather than reusing any individual tag's — a terracotta, distinct from
// Attribute's green and Object's brown.
export const MISP_TAG_GROUP_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'none',
  icon: 'tag',
  accentColor: '#DB6A47',
  fontSize: 12,
  iconSize: 22
}
