import { NodeStyle } from '../../../core/src/index'

// What a MISP Object node looks like by default — see event/defaults.ts
// for the full explanation of this pattern (one such default per concept,
// merged together where the importer needs to look one up by node type).
export const MISP_OBJECT_NODE_DEFAULT: Partial<NodeStyle> = {
  // Pivotick only ships circle/square/triangle/hexagon — 'diamond' would
  // silently fall back to a circle, so triangle it is until we revisit this.
  shape: 'triangle',
  color: '#5A9367'
}
