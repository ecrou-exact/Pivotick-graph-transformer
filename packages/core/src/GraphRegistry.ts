import { GraphExporter } from './GraphExporter'
import { GraphImporter } from './GraphImporter'
import { ConverterVariantMeta, GraphData } from './types'

// Single registry for both directions: what this repo knows how to read
// (importers) and what it knows how to produce (exporters). One place to
// ask "which formats do I support", instead of two registries to keep in sync.
export class GraphRegistry {
  private static importers = new Map<string, GraphImporter<any>[]>()
  private static exporters = new Map<string, GraphExporter<any>[]>()

  static registerImporter(importer: GraphImporter<any>): void {
    GraphRegistry.register(GraphRegistry.importers, importer)
  }

  static registerExporter(exporter: GraphExporter<any>): void {
    GraphRegistry.register(GraphRegistry.exporters, exporter)
  }

  static getImporter(format: string, variantId?: string): GraphImporter<any> {
    return GraphRegistry.pick(GraphRegistry.importers, format, variantId)
  }

  static getExporter(format: string, variantId?: string): GraphExporter<any> {
    return GraphRegistry.pick(GraphRegistry.exporters, format, variantId)
  }

  // Auto-detects the source format via each registered importer's detect()
  // and converts using its default variant.
  static importAuto(input: unknown): GraphData {
    for (const list of GraphRegistry.importers.values()) {
      const match = list.find(importer => importer.detect(input))
      if (match) return match.convert(input)
    }
    throw new Error('No registered importer detected this input format')
  }

  static listImporters(): string[] {
    return [...GraphRegistry.importers.keys()]
  }

  static listExporters(): string[] {
    return [...GraphRegistry.exporters.keys()]
  }

  static listImporterVariants(format: string): ConverterVariantMeta[] {
    return (GraphRegistry.importers.get(format) ?? []).map(importer => importer.variant)
  }

  static listExporterVariants(format: string): ConverterVariantMeta[] {
    return (GraphRegistry.exporters.get(format) ?? []).map(exporter => exporter.variant)
  }

  private static register<T extends { format: string }>(registry: Map<string, T[]>, entry: T): void {
    const list = registry.get(entry.format) ?? []
    list.push(entry)
    registry.set(entry.format, list)
  }

  private static pick<T extends { variant: ConverterVariantMeta }>(
    registry: Map<string, T[]>,
    format: string,
    variantId?: string
  ): T {
    const list = registry.get(format)
    if (!list || list.length === 0) throw new Error(`No converter registered for format "${format}"`)
    if (variantId) {
      const match = list.find(entry => entry.variant.id === variantId)
      if (!match) throw new Error(`No variant "${variantId}" registered for format "${format}"`)
      return match
    }
    return list.find(entry => entry.variant.default) ?? list[0]
  }
}
