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
     readonly variant = {
       id: 'default',
       name: 'Default mapping',
       description: 'What this mapping strategy does, in one sentence.',
       default: true,
     }

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

## Multiple variants for the same format

If a format can reasonably be mapped to a graph in more than one way, don't try to satisfy everyone with one converter full of flags. Register **one `GraphConverter` per mapping strategy**, all sharing the same `format` but each with a distinct `variant.id`:

```ts
export class MispEventRootConverter extends GraphConverter<MispEvent> {
  readonly format = 'misp'
  readonly variant = { id: 'event-root', name: 'Event as root node', description: 'Event is a cluster node; Attributes/Objects are its children.', default: true }
  detect = detectMispEvent // share the detection logic across variants, see below
  convert(input: MispEvent) { /* ... */ }
}

export class MispObjectRefsOnlyConverter extends GraphConverter<MispEvent> {
  readonly format = 'misp'
  readonly variant = { id: 'object-refs-only', name: 'Explicit references only', description: 'No Event node; edges only where an Object Reference exists.' }
  detect = detectMispEvent
  convert(input: MispEvent) { /* ... */ }
}
```

Register both in the package's entry point. Exactly one variant per format should set `variant.default: true` (whichever is the sane default for someone who doesn't care about the distinction) — `ConverterRegistry.get(format)` without a `variantId` resolves to it.

`detect()` is about the *format*, not the mapping strategy, so it's usually identical across a format's variants — factor it into a shared function (like `detectMispEvent` above) instead of duplicating it per class.

## Icons and visual styling

If the source format has a natural notion of entity type with recognizable iconography (MISP attribute/object/galaxy types, STIX SDO types, ...), converters should ship a `getDefaultStyleMap()` that includes icons, not just colors — see [`docs/icons-and-styling.md`](./docs/icons-and-styling.md) for how to package icon assets so consumers get them for free via `npm install`, without a separate manual setup step.

## Design rules

- Don't invent a different base interface, and don't bypass `ConverterRegistry`. The whole point of this repo is that every converter looks the same from the outside — a different shape per converter defeats the purpose.
- Implement `getNodeTypeAccessor()` / `getDefaultStyleMap()` whenever the format has a natural notion of entity type (it almost always does). Without it, every consumer has to rebuild styling by hand, which is exactly the duplicated work this project exists to remove.
- `format` should be a unique, descriptive string. Namespace it if the source format itself has versions that produce meaningfully different output, e.g. `stix-2.0` vs `stix-2.1`, rather than trying to handle every version in one converter.
- Keep `detect()` cheap and specific — it may be called against input that isn't yours, so avoid false positives on other formats.
- Never make a converter's installation depend on a manual step (cloning another repo, running a separate build, downloading assets at runtime). Everything a converter needs — including icon assets — must be inside its npm package after a plain `npm install`. See [`docs/icons-and-styling.md`](./docs/icons-and-styling.md) for how this is done for icon sets that live in a separate upstream repo.

## Pull request checklist

- [ ] Converter extends `GraphConverter` and lives in its own `packages/<format>` package
- [ ] `format` is a unique, descriptive string (namespaced per version if needed)
- [ ] `variant` is set with a unique `id` within the format, and exactly one variant of the format is marked `default: true`
- [ ] `detect()` is cheap and specific enough not to false-positive on other formats (and shared across the format's variants rather than duplicated)
- [ ] `getDefaultStyleMap()` / `getNodeTypeAccessor()` implemented if the format has a natural entity-type concept
- [ ] Icon assets (if any) are vendored into the package at build/maintain time, not fetched from a third-party dependency at install or run time
- [ ] At least one realistic fixture included
- [ ] `npm run build` and `npm run lint` pass from the repo root
- [ ] The new package's README briefly documents the input shape it expects and lists its available variants
