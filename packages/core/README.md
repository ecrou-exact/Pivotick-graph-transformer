# pivotick-transformer-core

The only package in this monorepo with no format-specific logic. It defines the contract every converter follows and the registry that ties them together.

## Exports

- **`GraphConverter<TInput>`** — abstract base class. Implement `format`, `detect()`, `convert()`; optionally `getNodeTypeAccessor()` and `getDefaultStyleMap()`. See the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md) for a full walkthrough.
- **`ConverterRegistry`** — static registry (`register`, `get`, `has`, `list`, `detectFormat`, `convert`, `convertAuto`).
- **Types** — `RawNode`, `RawEdge`, `ConversionResult`, `ConverterOptions`, `NodeTypeAccessor`, `NodeStyleMap`, `PivotickRenderOptions`, `PivotickReadyOptions`. These mirror the corresponding shapes in the [Pivotick](https://github.com/pivotick/pivotick) library itself (see `src/types.ts` for details on why they're duplicated rather than imported).

## Usage

```ts
import { GraphConverter, ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult } from 'pivotick-transformer-core'

class MyFormatConverter extends GraphConverter<MyFormatInput> {
  readonly format = 'my-format'
  detect(input: unknown): boolean { /* ... */ return false }
  convert(input: MyFormatInput): ConversionResult { return { nodes: [], edges: [] } }
}

ConverterRegistry.register(new MyFormatConverter())

const { data, render } = ConverterRegistry.get('my-format').toPivotickOptions(someInput)
```
