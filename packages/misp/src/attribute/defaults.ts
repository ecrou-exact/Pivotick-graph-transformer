import { NodeStyle } from '../../../core/src/index'

// What a MISP Attribute node looks like by default — see event/defaults.ts
// for the full explanation of this pattern (one such default per concept,
// merged together where the importer needs to look one up by node type).
export const MISP_ATTRIBUTE_NODE_DEFAULT: Partial<NodeStyle> = {
  shape: 'circle',
  color: '#B4884D'
}
