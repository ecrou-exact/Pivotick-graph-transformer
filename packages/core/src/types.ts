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

/**
 * Fully custom per-node rendering, matching Pivotick's `RendererOptions.renderNode`
 * — takes over that node's rendering entirely (a real `HTMLElement`, not just
 * shape/icon/text), e.g. for a readable "card" showing a label directly, not
 * just an icon. Not typed against Pivotick's real `Node` class (this project
 * doesn't depend on `pivotick`) — just the `getData()`/`getStyle()` shape
 * it's known to expose (verified against Pivotick's actual `NodeRenderer`/
 * `Node` source: `getStyle()` returns whatever per-node `RawNode.style`
 * override this converter set in `convert()`, if any — not the fully
 * resolved `nodeStyleMap`-merged style, which only the renderer's own
 * internal `NodeDrawer` computes).
 *
 * Important: once `renderNode` is set at all, Pivotick routes *every* node
 * through it — there's no per-node opt-out back to normal shape/icon
 * rendering. Returning `undefined` for a given node leaves it blank (an
 * empty, never-resized box), not a shape/icon fallback — a converter that
 * wants most nodes to still look icon/shape-like needs to build that look
 * itself for every node this function is called with.
 *
 * `getCircleRadius`/`setCircleRadius` are also real, public methods on
 * Pivotick's `Node` class (verified against its source) — after this
 * function returns, Pivotick measures the element via
 * `getBoundingClientRect()` and calls `setCircleRadius(max(width,height)/2)`
 * itself, treating the node as a circle of that radius for edge-anchor
 * math no matter its real (e.g. rectangular) shape. Exposed here for a
 * converter that wants to override Pivotick's own measurement, but no
 * converter in this repo currently does — Pivotick's default is used
 * as-is.
 */
export type RenderNodeFn = (node: {
  getData?: () => Record<string, unknown> | undefined
  getStyle?: () => Record<string, unknown> | undefined
  getCircleRadius?: () => number | undefined
  setCircleRadius?: (radius: number) => void
}) => HTMLElement | string | undefined

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
  /** Matches Pivotick's `RendererOptions.defaultEdgeStyle` — applied to every edge; its `styleCb(edge)` is how a converter varies edge styling per relation kind. */
  defaultEdgeStyle?: Record<string, unknown>
  /** Matches Pivotick's `RendererOptions.markerStyleMap` — e.g. overriding the built-in `'arrow'` marker's size. */
  markerStyleMap?: Record<string, unknown>
  /** Matches Pivotick's `RendererOptions.renderNode` — fully custom per-node rendering (e.g. an HTML "card"), taking over from shape/icon/text for every node it doesn't return `undefined` for. */
  renderNode?: RenderNodeFn
  /** Matches Pivotick's `RendererOptions.defaultNodeStyle` — the fallback for any node whose type isn't a `nodeStyleMap` key (e.g. a genuinely unknown/unrecognized type). */
  defaultNodeStyle?: Record<string, unknown>
}

/** Return type of `GraphConverter.toPivotickOptions()` — ready to spread into `new Pivotick({ ..., data, options: { render } })`. */
export interface PivotickReadyOptions {
  data: ConversionResult
  render: PivotickRenderOptions
}
