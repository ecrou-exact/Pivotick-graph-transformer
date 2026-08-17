# Contributing

Thanks for considering adding a converter, or improving an existing one. The goal of this project is that adding support for a new data format is as close as possible to "write one class."

## Adding a new format converter

1. **Create a package**: `packages/<format>/` (e.g. `packages/misp/`), copying the layout of [`packages/core`](./packages/core) (`package.json`, `tsconfig.json`, `src/`).

2. **Extend `GraphConverter`**:

   ```ts
   import { GraphConverter } from 'pivotick-transformer-core'
   import type { ConversionResult, ConverterOptions, NodeStyleMap } from 'pivotick-transformer-core'

   interface MyFormatInput {
     // shape of the input your converter accepts
   }

   export class MyFormatConverter extends GraphConverter<MyFormatInput> {
     readonly format = 'my-format'

     detect(input: unknown): boolean {
       // cheap structural check, e.g. a distinctive top-level key
       return typeof input === 'object' && input !== null && 'myFormatMarker' in input
     }

     convert(input: MyFormatInput, options?: ConverterOptions): ConversionResult {
       // your mapping logic: input -> { nodes, edges }
       return { nodes: [], edges: [] }
     }

     getDefaultStyleMap(): NodeStyleMap {
       // optional: a sensible default look per entity type, so consumers
       // get a readable graph without configuring styles themselves
       return {}
     }
   }
   ```

3. **Register it as a side effect** in your package's `src/index.ts`:

   ```ts
   import { ConverterRegistry } from 'pivotick-transformer-core'
   import { MyFormatConverter } from './MyFormatConverter.js'

   export { MyFormatConverter }
   ConverterRegistry.register(new MyFormatConverter())
   ```

   This lets consumers just do `import 'pivotick-transformer-my-format'` to make the converter available through the shared registry, in addition to importing the class directly if they prefer explicit wiring.

4. **Add fixtures** under `packages/<format>/test/fixtures/` — at least one realistic sample input. A shared conformance test harness in `packages/core` (validating any converter's output: unique ids, no dangling edges, valid `RawNode`/`RawEdge` shape) is planned; wire your fixtures into it once it lands.

5. **Follow the code style**: no semicolons, single quotes, TypeScript strict mode. Run `npm run lint` and `npm run build` from the repo root before opening a PR.

## Design rules

- Don't invent a different base interface, and don't bypass `ConverterRegistry`. The whole point of this repo is that every converter looks the same from the outside — a different shape per converter defeats the purpose.
- Implement `getNodeTypeAccessor()` / `getDefaultStyleMap()` whenever the format has a natural notion of entity type (it almost always does). Without it, every consumer has to rebuild styling by hand, which is exactly the duplicated work this project exists to remove.
- `format` should be a unique, descriptive string. Namespace it if the source format itself has versions that produce meaningfully different output, e.g. `stix-2.0` vs `stix-2.1`, rather than trying to handle every version in one converter.
- Keep `detect()` cheap and specific — it may be called against input that isn't yours, so avoid false positives on other formats.

## Pull request checklist

- [ ] Converter extends `GraphConverter` and lives in its own `packages/<format>` package
- [ ] `format` is a unique, descriptive string (namespaced per version if needed)
- [ ] `detect()` is cheap and specific enough not to false-positive on other formats
- [ ] `getDefaultStyleMap()` / `getNodeTypeAccessor()` implemented if the format has a natural entity-type concept
- [ ] At least one realistic fixture included
- [ ] `npm run build` and `npm run lint` pass from the repo root
- [ ] The new package's README briefly documents the input shape it expects
