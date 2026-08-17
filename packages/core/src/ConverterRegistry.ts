import type { GraphConverter } from './GraphConverter.js'
import type { ConversionResult, ConverterOptions } from './types.js'

/**
 * Static registry of converters, keyed by `format`.
 *
 * Mirrors the Factory pattern Pivotick itself uses for renderer selection
 * (`GraphRendererFactory` in the Pivotick repo), so a converter is looked up
 * the same way a Pivotick renderer is: by a string key, through one shared
 * registry, rather than every consumer importing and instantiating classes
 * by hand.
 *
 * Format packages are expected to call `ConverterRegistry.register()` as a
 * module side effect, so `import 'pivotick-transformer-misp'` alone is
 * enough to make the MISP converter available through the registry.
 */
export class ConverterRegistry {
  private static converters = new Map<string, GraphConverter>()

  static register(converter: GraphConverter): void {
    if (this.converters.has(converter.format)) {
      throw new Error(`A converter for format "${converter.format}" is already registered`)
    }
    this.converters.set(converter.format, converter)
  }

  static unregister(format: string): void {
    this.converters.delete(format)
  }

  static has(format: string): boolean {
    return this.converters.has(format)
  }

  static get(format: string): GraphConverter {
    const converter = this.converters.get(format)
    if (!converter) {
      const known = [...this.converters.keys()].join(', ') || 'none'
      throw new Error(`No converter registered for format "${format}". Registered formats: ${known}`)
    }
    return converter
  }

  /** All currently registered format identifiers. */
  static list(): string[] {
    return [...this.converters.keys()]
  }

  /** Returns the first registered converter whose `detect()` matches `input`, if any. */
  static detectFormat(input: unknown): GraphConverter | undefined {
    for (const converter of this.converters.values()) {
      if (converter.detect(input)) return converter
    }
    return undefined
  }

  static convert(format: string, input: unknown, options?: ConverterOptions): ConversionResult {
    return this.get(format).convert(input, options)
  }

  /** Auto-detects the format via each registered converter's `detect()`, then converts. */
  static convertAuto(input: unknown, options?: ConverterOptions): ConversionResult {
    const converter = this.detectFormat(input)
    if (!converter) {
      throw new Error('No registered converter matched this input. Did you forget to import the converter package?')
    }
    return converter.convert(input, options)
  }
}
