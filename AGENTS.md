# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project overview

Pivotick Graph Transformer is a community-maintained collection of converters that turn third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects. The goal: stop every Pivotick integrator from writing their own ad-hoc converter for the same handful of formats.

This is a monorepo (npm workspaces). Each source format gets its own package under `packages/`, all built on a shared `GraphConverter` interface defined in `packages/core`.

## Build & development commands

```bash
npm install       # install all workspaces
npm run build     # tsc build for every workspace package
npm run lint       # ESLint across every workspace package
npm run lint_fix   # ESLint --fix across every workspace package
```

There is no test framework configured yet. Use `npm run build` to verify TypeScript correctness and `npm run lint` to check style compliance.

## Code style

- **No semicolons** — ESLint enforced, do not add semicolons
- **Single quotes** — ESLint enforced, do not use double quotes in TypeScript/JavaScript
- **TypeScript strict mode** — do not leave unused variables or imports

## Architecture

### `packages/core`

The only package with no format-specific logic. Exposes:

- **`GraphConverter<TInput>`** (`packages/core/src/GraphConverter.ts`) — abstract base class every format converter extends.
  - Required: `format` (a unique string id, e.g. `'misp'`), `detect(input)` (return `true` if `input` looks like this format), `convert(input, options)` (return `{ nodes: RawNode[], edges: RawEdge[] }`).
  - Optional: `getNodeTypeAccessor()` and `getDefaultStyleMap()`, which let a converter ship a ready-to-use Pivotick `nodeTypeAccessor` / `nodeStyleMap` so consumers get sensible styling without configuring it themselves.
  - `toPivotickOptions(input, options)` is implemented once, on the base class, and combines all of the above into `{ data, render }`, ready to spread into `new Pivotick({ ..., data, options: { render } })`. Do not reimplement this per converter.

- **`ConverterRegistry`** (`packages/core/src/ConverterRegistry.ts`) — static registry, mirrors the Factory pattern Pivotick itself uses for renderer selection (`src/renderers/GraphRendererFactory.ts` in the Pivotick repo). Converters call `ConverterRegistry.register(new XConverter())` as a module side effect, so `import 'pivotick-transformer-misp'` alone is enough to make it available. `ConverterRegistry.convertAuto(input)` auto-detects the format via each registered converter's `detect()`.

- **`packages/core/src/types.ts`** — `RawNode` / `RawEdge` / style-map types. These intentionally mirror Pivotick's own `RawNode` / `RawEdge` (`src/interfaces/GraphOptions.ts`) and `NodeStyle` / `RendererOptions` (`src/interfaces/RendererOptions.ts`) types from the Pivotick repo. **Pivotick is not currently published to npm** (`private: true` in its `package.json`), so these are duplicated here rather than imported. If Pivotick is ever published, replace `types.ts` with re-exports from the real `pivotick` package and keep the shapes in sync until then.

### Format packages (`packages/<format>`)

Each format package (e.g. a future `packages/misp`) exports one or more `GraphConverter` subclasses and registers them as an import side effect. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the exact steps to add one — follow that guide rather than improvising a different shape, so every converter stays consistent and passes the same conformance checks.

## Adding a new converter — quick checklist for agents

1. Create `packages/<format>/` following the `packages/core` package layout (`package.json`, `tsconfig.json` extending the root, `src/`).
2. Extend `GraphConverter<TInput>` from `pivotick-transformer-core`.
3. Implement `format`, `detect()`, `convert()`. Add `getNodeTypeAccessor()` / `getDefaultStyleMap()` if the format has a natural notion of "entity type" (it almost always does).
4. Register the converter as a side effect in the package's entry point (`ConverterRegistry.register(new XConverter())`).
5. Do not invent a different base interface or bypass `ConverterRegistry` — the whole point of this repo is that every converter looks the same from the outside.
6. Match the code style rules above, and run `npm run build` + `npm run lint` from the repo root before considering the task done.
