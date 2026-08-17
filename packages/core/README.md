# pivotick-transformer-core

The only package in this monorepo with no format-specific logic. It defines the contract every converter follows and the registry that ties them together.

## Exports

- **`GraphConverter<TInput>`** — abstract base class. Implement `format`, `variant`, `detect()`, `convert()`; optionally `getNodeTypeAccessor()` and `getDefaultStyleMap()`. See the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md) for a full walkthrough.
- **`ConverterRegistry`** — static registry (`register`, `unregister`, `has`, `listFormats`, `listVariants`, `get`, `detectFormat`, `convert`, `convertAuto`).
- **Types** — `RawNode`, `RawEdge`, `ConversionResult`, `ConverterOptions`, `ConverterVariantMeta`, `NodeTypeAccessor`, `NodeStyleMap`, `PivotickRenderOptions`, `PivotickReadyOptions`. These mirror the corresponding shapes in the [Pivotick](https://github.com/pivotick/pivotick) library itself (see `src/types.ts` for details on why they're duplicated rather than imported).

## Variants

A single source format can be mapped to a graph in more than one reasonable way. MISP is the running example: should the Event be a root/cluster node with Attributes and Objects hanging off it, or should the graph only contain edges for explicit Object References? Both are valid — they're **variants** of the `misp` format.

Each variant is its own `GraphConverter` instance: same `format`, distinct `variant.id`. The registry tracks them as `format → variantId → converter` and can list what's available so a consumer (or a picker UI) can choose:

```ts
ConverterRegistry.listVariants('misp')
// => [
//   { id: 'event-root', name: 'Event as root node', description: '...', default: true },
//   { id: 'object-refs-only', name: 'Explicit references only', description: '...' },
// ]

ConverterRegistry.get('misp', 'object-refs-only').toPivotickOptions(mispEvent)
```

Omitting `variantId` resolves to whichever variant was registered with `variant.default: true` (or the first one registered, if none is marked default) — so `ConverterRegistry.get('misp')` always works, even for consumers who don't care about the distinction.

## Usage

```ts
import { GraphConverter, ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult } from 'pivotick-transformer-core'

class MyFormatConverter extends GraphConverter<MyFormatInput> {
  readonly format = 'my-format'
  readonly variant = { id: 'default', name: 'Default mapping', description: '...', default: true }

  detect(input: unknown): boolean { /* ... */ return false }
  convert(input: MyFormatInput): ConversionResult { return { nodes: [], edges: [] } }
}

ConverterRegistry.register(new MyFormatConverter())

const { data, render } = ConverterRegistry.get('my-format').toPivotickOptions(someInput)
```
