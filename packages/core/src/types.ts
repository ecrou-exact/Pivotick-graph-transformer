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

// Verified field-by-field against Pivotick v1.5.0's mergeNodeStylingOptions()
// and defaultNodeStyle (index-Bzoqf7dC.js in the vendored bundle) — this is
// the exact set of fields it reads, not a guessed generic shape.
export interface NodeStyle {
  // Any other string silently falls back to a circle (see genericNodeRender
  // in the vendored bundle) — the `string & {}` keeps literal autocomplete
  // while still allowing that fallback deliberately.
  shape?: 'circle' | 'square' | 'triangle' | 'hexagon' | (string & {})
  size?: number
  color?: string
  strokeColor?: string
  strokeWidth?: number | string
  fontFamily?: string
  textColor?: string
  textAnchorPosition?: string
  textHorizontalShift?: number
  textVerticalShift?: number
  textRotateDegree?: number
  iconUnicode?: string
  iconClass?: string
  svgIcon?: string
  imagePath?: string
  imageFit?: 'icon' | 'cover' | 'frame'
  text?: string
  html?: (node: unknown) => string | HTMLElement
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
  // Hint for importers whose default styling (e.g. an html card background)
  // isn't just CSS and so can't follow Pivotick's own `theme` option/
  // `data-theme` attribute on its own — passed through by the caller so the
  // node stays legible in both themes instead of being baked in once.
  theme?: 'dark' | 'light'
  // 'detailed' (default): every Tag/Attribute hangs directly off its parent,
  // flat. 'grouped': each parent's Tags and Attributes collapse behind one
  // summary node apiece (Pivotick's own node-expansion "+" —
  // RendererOptions.enableNodeExpansion), so a large event reads as a
  // handful of clickable groups instead of every leaf at once. Objects and
  // Events are unaffected either way. Same styling either way too — this
  // only changes which nodes are nested vs top-level.
  viewMode?: 'detailed' | 'grouped'
  [key: string]: unknown
}
