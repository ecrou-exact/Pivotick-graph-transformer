import type { GraphConverter } from './GraphConverter.js'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta } from './types.js'

/**
 * Static registry of converters, keyed by `format` and then by `variant.id`.
 *
 * Mirrors the Factory pattern Pivotick itself uses for renderer selection
 * (`GraphRendererFactory` in the Pivotick repo), so a converter is looked up
 * the same way a Pivotick renderer is: by a string key, through one shared
 * registry, rather than every consumer importing and instantiating classes
 * by hand.
 *
 * A `format` can have several registered variants (different mapping
 * strategies for the same source format). `get(format)` without a
 * `variantId` resolves to whichever variant was registered with
 * `variant.default: true` (or the first one registered, if none is marked).
 *
 * Format packages are expected to call `ConverterRegistry.register()` for
 * each variant as a module side effect, so `import 'pivotick-transformer-misp'`
 * alone is enough to make all of that package's variants available through
 * the registry.
 */
export class ConverterRegistry {
  private static converters = new Map<string, Map<string, GraphConverter>>()
  private static defaultVariant = new Map<string, string>()

  static register(converter: GraphConverter): void {
    const { format, variant } = converter
    let variants = this.converters.get(format)
    if (!variants) {
      variants = new Map()
      this.converters.set(format, variants)
    }
    if (variants.has(variant.id)) {
      throw new Error(`Variant "${variant.id}" for format "${format}" is already registered`)
    }
    variants.set(variant.id, converter)

    if (variant.default || !this.defaultVariant.has(format)) {
      this.defaultVariant.set(format, variant.id)
    }
  }

  static unregister(format: string, variantId: string): void {
    const variants = this.converters.get(format)
    if (!variants) return
    variants.delete(variantId)
    if (variants.size === 0) {
      this.converters.delete(format)
      this.defaultVariant.delete(format)
    } else if (this.defaultVariant.get(format) === variantId) {
      this.defaultVariant.set(format, variants.keys().next().value as string)
    }
  }

  static has(format: string, variantId?: string): boolean {
    const variants = this.converters.get(format)
    if (!variants) return false
    return variantId === undefined ? true : variants.has(variantId)
  }

  /** All currently registered source format identifiers. */
  static listFormats(): string[] {
    return [...this.converters.keys()]
  }

  /** All registered variants for `format`, in registration order. Empty array if the format is unknown. */
  static listVariants(format: string): ConverterVariantMeta[] {
    const variants = this.converters.get(format)
    if (!variants) return []
    return [...variants.values()].map((converter) => converter.variant)
  }

  /**
   * Looks up a converter. Omit `variantId` to get the format's default
   * variant (the one registered with `variant.default: true`, or the first
   * one registered if none was marked default).
   */
  static get(format: string, variantId?: string): GraphConverter {
    const variants = this.converters.get(format)
    if (!variants) {
      const known = this.listFormats().join(', ') || 'none'
      throw new Error(`No converter registered for format "${format}". Registered formats: ${known}`)
    }

    const id = variantId ?? this.defaultVariant.get(format)
    const converter = id ? variants.get(id) : undefined
    if (!converter) {
      const known = [...variants.keys()].join(', ') || 'none'
      throw new Error(`No variant "${id}" registered for format "${format}". Available variants: ${known}`)
    }
    return converter
  }

  /** Returns the format of the first registered converter (any of its variants) whose `detect()` matches `input`, if any. */
  static detectFormat(input: unknown): string | undefined {
    for (const [format, variants] of this.converters) {
      for (const converter of variants.values()) {
        if (converter.detect(input)) return format
      }
    }
    return undefined
  }

  static convert(format: string, input: unknown, variantId?: string, options?: ConverterOptions): ConversionResult {
    return this.get(format, variantId).convert(input, options)
  }

  /** Auto-detects the format via each registered converter's `detect()`, then converts with that format's variant (default unless `variantId` is given). */
  static convertAuto(input: unknown, variantId?: string, options?: ConverterOptions): ConversionResult {
    const format = this.detectFormat(input)
    if (!format) {
      throw new Error('No registered converter matched this input. Did you forget to import the converter package?')
    }
    return this.convert(format, input, variantId, options)
  }
}
