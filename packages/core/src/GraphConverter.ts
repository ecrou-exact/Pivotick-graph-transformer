import type {
  ConversionResult,
  ConverterOptions,
  ConverterVariantMeta,
  NodeStyleMap,
  NodeTypeAccessor,
  PivotickReadyOptions,
  RenderNodeFn,
} from './types.js'

/**
 * Base class every format converter must extend.
 *
 * A converter turns some third-party input (a MISP Event, a STIX bundle, a
 * VirusTotal Graph response, ...) into the `{ nodes, edges }` shape Pivotick
 * expects. Implementers only need to provide `format`, `variant`, `detect()`
 * and `convert()` — everything needed to wire the result into Pivotick is
 * handled once, here, by `toPivotickOptions()`.
 *
 * A single source format can have several converters — same `format`,
 * different `variant` — for different mapping strategies (e.g. "MISP Event
 * as a root node" vs "MISP Event flattened, edges from Object References
 * only"). Consumers pick one via `ConverterRegistry.listVariants(format)` /
 * `ConverterRegistry.get(format, variantId)`.
 */
export abstract class GraphConverter<TInput = unknown> {
  /** Unique identifier for this source format, e.g. `'misp'` or `'stix-2.1'`. Shared by every variant of this format. */
  abstract readonly format: string

  /** Which mapping strategy this converter instance implements. Its `id` must be unique among converters sharing the same `format`. */
  abstract readonly variant: ConverterVariantMeta

  /** Optional version of the source format this converter targets, e.g. `'2.4'`. */
  readonly version?: string

  /**
   * Cheap structural check: does `input` look like this format?
   * Used by `ConverterRegistry.detectFormat()` / `convertAuto()` for auto-detection.
   * Should not throw — return `false` for anything that isn't a confident match.
   */
  abstract detect(input: unknown): boolean

  /** Convert `input` into Pivotick-ready nodes and edges. */
  abstract convert(input: TInput, options?: ConverterOptions): ConversionResult

  /**
   * Optional: a function mapping a node to its "type" key, matching Pivotick's
   * `RendererOptions.nodeTypeAccessor`. Implement this when the source format
   * has a natural entity-type concept (it almost always does). Receives the
   * same `options` as `convert()`.
   */
  getNodeTypeAccessor?(options?: ConverterOptions): NodeTypeAccessor

  /**
   * Optional: a default per-type style map, matching Pivotick's
   * `RendererOptions.nodeStyleMap`, so consumers get a readable graph
   * without configuring styles themselves. Receives the same `options` as
   * `convert()` — e.g. a display-mode switch that picks between a few
   * built-in presets. Consumers who want something narrower can still
   * override individual entries after the fact: `{ ...render, nodeStyleMap:
   * { ...render.nodeStyleMap, myType: { color: 'red' } } }`.
   */
  getDefaultStyleMap?(options?: ConverterOptions): NodeStyleMap

  /**
   * Optional: the fallback style for any node whose type isn't a
   * `getDefaultStyleMap()` key, matching Pivotick's
   * `RendererOptions.defaultNodeStyle` — e.g. a genuinely unrecognized
   * type in a coarse/"simple" display mode that only enumerates the types
   * it already knows about. Receives the same `options` as `convert()`.
   */
  getDefaultNodeStyle?(options?: ConverterOptions): Record<string, unknown>

  /**
   * Optional: a default edge style, matching Pivotick's
   * `RendererOptions.defaultEdgeStyle` — typically a `styleCb(edge)` that
   * varies color/dash/etc. by whatever the converter recorded on
   * `edge.data` (e.g. a `kind` field) to tell relation types apart.
   * Receives the same `options` as `convert()`.
   */
  getDefaultEdgeStyle?(options?: ConverterOptions): Record<string, unknown>

  /**
   * Optional: overrides for Pivotick's built-in edge markers, matching
   * `RendererOptions.markerStyleMap` — e.g. a smaller `'arrow'`. Receives
   * the same `options` as `convert()`.
   */
  getMarkerStyleMap?(options?: ConverterOptions): Record<string, unknown>

  /**
   * Optional: fully custom per-node rendering, matching Pivotick's
   * `RendererOptions.renderNode` — for a display mode where nodes are, say,
   * readable HTML cards rather than icon-only shapes. Receives the same
   * `options` as `convert()`, so it can return `undefined` (no custom
   * rendering, fall back to `nodeStyleMap`) unless a specific mode asked
   * for it.
   */
  getRenderNode?(options?: ConverterOptions): RenderNodeFn | undefined

  /**
   * Convenience entry point for consumers: converts `input` and bundles it
   * with this converter's default styling into options ready to spread into
   * `new Pivotick({ ..., data, options: { render } })`.
   */
  toPivotickOptions(input: TInput, options?: ConverterOptions): PivotickReadyOptions {
    const data = this.convert(input, options)
    const nodeTypeAccessor = this.getNodeTypeAccessor?.(options)
    const nodeStyleMap = this.getDefaultStyleMap?.(options)
    const defaultNodeStyle = this.getDefaultNodeStyle?.(options)
    const defaultEdgeStyle = this.getDefaultEdgeStyle?.(options)
    const markerStyleMap = this.getMarkerStyleMap?.(options)
    const renderNode = this.getRenderNode?.(options)

    return {
      data,
      render: {
        ...(nodeTypeAccessor ? { nodeTypeAccessor } : {}),
        ...(nodeStyleMap ? { nodeStyleMap } : {}),
        ...(defaultNodeStyle ? { defaultNodeStyle } : {}),
        ...(defaultEdgeStyle ? { defaultEdgeStyle } : {}),
        ...(markerStyleMap ? { markerStyleMap } : {}),
        ...(renderNode ? { renderNode } : {}),
      },
    }
  }
}
