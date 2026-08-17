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

/**
 * Describes one mapping strategy among possibly several for the same source
 * format — e.g. a MISP Event can be mapped with the Event as a root/cluster
 * node, or flattened with only explicit Object References as edges. Each
 * strategy is a separate `GraphConverter` instance sharing the same `format`
 * but a distinct `variant.id`, so consumers can list and pick between them.
 */
export interface ConverterVariantMeta {
  /** Unique within its `format`, e.g. `'event-root'`. Combined with `format` as the registry key. */
  id: string
  /** Human-readable name for a picker UI, e.g. `'Event as root node'`. */
  name: string
  /** What this variant does and when to prefer it over the format's other variants. */
  description: string
  /** Marks this as the variant `ConverterRegistry.get(format)` resolves to when no `variantId` is given. Exactly one variant per format should set this. */
  default?: boolean
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
