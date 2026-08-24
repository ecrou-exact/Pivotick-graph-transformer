// The pivot language every importer/exporter speaks. Mirrors Pivotick's own
// RawNode / RawEdge / NodeStyle shapes, verified against the vendored v1.5.0
// release (demo/vendor/pivotick, see demo/scripts/sync-pivotick.mjs) so
// consumers can pass this straight into `new Pivotick(container, data, options)`.
//
// Note the two things that don't match a "generic" graph shape: edges use
// from/to (not source/target), and label/type-like fields live inside the
// free-form `data` bag, not as top-level properties.

export interface RawNode {
  id: string | number
  data?: Record<string, unknown>
  style?: Partial<NodeStyle>
  weight?: number
  expanded: boolean
  domID?: string
  children?: RawNode[]
  x?: number
  y?: number
  fx?: number
  fy?: number
}

export interface RawEdge {
  id?: string | number
  from: string | number
  to: string | number
  data?: Record<string, unknown>
  style?: Partial<EdgeStyle>
}

export interface GraphData {
  nodes: RawNode[]
  edges: RawEdge[]
}

export interface NodeStyle {
  color?: string
  icon?: string
  shape?: string
  weight?: number
  [key: string]: unknown
}

export interface EdgeStyle {
  color?: string
  [key: string]: unknown
}

export type NodeStyleMap = Record<string, NodeStyle>

export type NodeTypeAccessor = (node: RawNode) => string

// Identifies which mapping strategy a given importer/exporter implements.
// A format can have several variants (e.g. "Event as root node" vs
// "flattened, references only") sharing the same `format` id.
export interface ConverterVariantMeta {
  id: string
  name: string
  description: string
  default?: boolean
}

// A single "if this node/edge looks like X, apply Y" rule — matched against
// the free-form `data` bag any importer builds. `when` fields are ANDed
// together; a node matches only if every one of them equals. Rules apply in
// array order, later ones winning on conflict, so a broad "by type" rule can
// sit before a narrower "by type + category" one. This is what every format
// importer should read to let callers tune shape/color/icon/extra-data
// per element, purely through the options bag — never by touching Pivotick.
export interface StyleRule {
  when: Record<string, unknown>
  style?: Partial<NodeStyle>
  data?: Record<string, unknown>
}

export interface ConverterOptions {
  styleRules?: StyleRule[]
  [key: string]: unknown
}
