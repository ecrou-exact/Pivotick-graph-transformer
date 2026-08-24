import { ConverterOptions, ConverterVariantMeta, GraphData, NodeStyleMap, NodeTypeAccessor } from './types'

// Base class for "external format -> Pivotick" converters (MISP, STIX, ...).
export abstract class GraphImporter<TInput> {
  abstract readonly format: string
  abstract readonly variant: ConverterVariantMeta

  abstract detect(input: unknown): boolean
  abstract convert(input: TInput, options?: ConverterOptions): GraphData

  getNodeTypeAccessor?(): NodeTypeAccessor
  getDefaultStyleMap?(): NodeStyleMap

  // Combines convert() + the optional styling hooks into what Pivotick's
  // constructor expects: `new Pivotick(container, data, { render })`.
  toPivotickOptions(input: TInput, options?: ConverterOptions): {
    data: GraphData
    render: { nodeTypeAccessor?: NodeTypeAccessor, nodeStyleMap?: NodeStyleMap }
  } {
    const data = this.convert(input, options)
    const render: { nodeTypeAccessor?: NodeTypeAccessor, nodeStyleMap?: NodeStyleMap } = {}
    if (this.getNodeTypeAccessor) render.nodeTypeAccessor = this.getNodeTypeAccessor()
    if (this.getDefaultStyleMap) render.nodeStyleMap = this.getDefaultStyleMap()
    return { data, render }
  }
}
