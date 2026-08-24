import { ConverterOptions, ConverterVariantMeta, GraphData } from './types'

// Base class for "Pivotick -> external format" transformers (GraphML, DOT, ...).
// Symmetric to GraphImporter, but there is no detect() — the input is always
// already-known Pivotick shape, never guessed.
export abstract class GraphExporter<TOutput> {
  abstract readonly format: string
  abstract readonly variant: ConverterVariantMeta

  abstract export(data: GraphData, options?: ConverterOptions): TOutput
}
