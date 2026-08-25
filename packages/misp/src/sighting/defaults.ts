import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// The "Sightings" summary node — one per Attribute that has any Sighting
// entries, same icon-card pattern as Galaxy clusters' grouping node
// (auxiliary/meta information about its parent, not primary threat-intel
// content, hence the smaller size tier).
export const MISP_SIGHTING_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'square',
  color: 'transparent',
  strokeColor: 'transparent',
  icon: 'sighting',
  accentColor: '#890096',
  fontSize: 12,
  iconSize: 22
}

// One per sighting *type* under a "Sightings" node — "Positive"/"False
// positive"/"Expired", same as MISP's own Sightings widget breaks it down.
// accentColor is always overridden per type (green/red/amber — see
// import.ts); misp-iconify has no separate thumbs-up/down icon, so all
// three reuse the generic `sighting` icon and differ by colour alone.
export const MISP_SIGHTING_TYPE_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'square',
  color: 'transparent',
  strokeColor: 'transparent',
  icon: 'sighting',
  accentColor: '#890096',
  fontSize: 10,
  iconSize: 18
}
