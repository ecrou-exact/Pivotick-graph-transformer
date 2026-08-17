/**
 * These types intentionally mirror Pivotick's own `RawNode` / `RawEdge`
 * (see `src/interfaces/GraphOptions.ts` in the Pivotick repo) and the
 * style-related shapes from `src/interfaces/RendererOptions.ts`.
 *
 * Pivotick is not currently published to npm (`private: true` in its
 * package.json), so these are duplicated here rather than imported.
 * If Pivotick is ever published, replace this file with re-exports from
 * the real `pivotick` package and keep the shapes in sync until then.
 */

export type NodeId = string | number

export interface RawNode {
  id: NodeId
  data?: Record<string, unknown>
  style?: Record<string, unknown>
  weight?: number
  expanded?: boolean
  domID?: string
  children?: RawNode[]
}

export interface RawEdge {
  id?: NodeId
  from: NodeId
  to: NodeId
  data?: Record<string, unknown>
  style?: Record<string, unknown>
}

/** A function that returns a per-node "type" key, used to look up `NodeStyleMap`. Mirrors Pivotick's `nodeTypeAccessor`. */
export type NodeTypeAccessor = (node: RawNode) => string

/** Style overrides keyed by node type, mirrors Pivotick's `nodeStyleMap`. */
export type NodeStyleMap = Record<string, Record<string, unknown>>

export interface ConversionResult {
  nodes: RawNode[]
  edges: RawEdge[]
}

/** Free-form options a converter implementation may accept, e.g. filtering or mapping toggles. */
export interface ConverterOptions {
  [key: string]: unknown
}

/** Subset of Pivotick's `RendererOptions` that a converter can provide alongside converted data. */
export interface PivotickRenderOptions {
  nodeTypeAccessor?: NodeTypeAccessor
  nodeStyleMap?: NodeStyleMap
}

/** Return type of `GraphConverter.toPivotickOptions()` — ready to spread into `new Pivotick({ ..., data, options: { render } })`. */
export interface PivotickReadyOptions {
  data: ConversionResult
  render: PivotickRenderOptions
}
