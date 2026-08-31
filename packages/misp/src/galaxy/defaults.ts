import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// The "Galaxy clusters" grouping node — one per entity that has any galaxy
// tag, sitting between that entity and the galaxy-type nodes underneath it
// (see import.ts's addGalaxyClusters). Fixed purple, not hue-derived like
// the galaxy-type/cluster nodes below it — it isn't itself a galaxy, just
// where a MISP entity's galaxies are grouped.
export const MISP_GALAXY_CLUSTERS_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'none',
  icon: 'galaxy',
  accentColor: '#8B5CF6',
  fontSize: 12,
  iconSize: 22
}

// A galaxy-type node (e.g. "Attack Pattern"/mitre-attack-pattern). Its
// accentColor/icon are always overridden per-instance (see
// galaxy/colour.ts and the `galaxies/<type>` icon lookup in import.ts) —
// these are just the fallback when neither resolves.
export const MISP_GALAXY_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
  shape: 'none',
  icon: 'galaxy',
  accentColor: '#8B5CF6',
  fontSize: 12,
  iconSize: 22
}
