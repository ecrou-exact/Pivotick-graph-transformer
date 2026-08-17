# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

There is no test framework configured yet.

## Code style

Matches the conventions of the Pivotick library itself, for consistency across the ecosystem:

- **No semicolons** — ESLint enforced (`semi: ['error', 'never']`)
- **Single quotes** — ESLint enforced
- **TypeScript strict mode**

## Architecture

### `packages/core`

The only package with no format-specific logic. Exposes:

- **`GraphConverter<TInput>`** (`packages/core/src/GraphConverter.ts`) — abstract base class every format converter extends.
  - Required: `format` (a unique string id shared by every variant of that format, e.g. `'misp'`), `variant` (a `ConverterVariantMeta` — `{ id, name, description, default? }` — identifying which mapping strategy this instance implements), `detect(input)` (return `true` if `input` looks like this format), `convert(input, options)` (return `{ nodes: RawNode[], edges: RawEdge[] }`).
  - Optional: `getNodeTypeAccessor()` and `getDefaultStyleMap()`, which let a converter ship a ready-to-use Pivotick `nodeTypeAccessor` / `nodeStyleMap` so consumers get sensible styling without configuring it themselves.
  - `toPivotickOptions(input, options)` is implemented once, on the base class, and combines all of the above into `{ data, render }`, ready to spread into `new Pivotick({ ..., data, options: { render } })`. Do not reimplement this per converter.
  - **Variants**: a source format can have several converters — same `format`, different `variant.id` — for different mapping strategies (e.g. MISP Event as a root/cluster node vs. flattened with only explicit Object References as edges). Variants are for choices that change graph topology. A pure styling toggle (e.g. icon frame shape) is not a variant — pass it through `ConverterOptions` to `convert()` instead. See [CONTRIBUTING.md](./CONTRIBUTING.md).

- **`ConverterRegistry`** (`packages/core/src/ConverterRegistry.ts`) — static registry, mirrors the Factory pattern Pivotick itself uses for renderer selection (`src/renderers/GraphRendererFactory.ts` in the Pivotick repo). Converters call `ConverterRegistry.register(new XConverter())` as a module side effect, so `import 'pivotick-transformer-misp'` alone is enough to make it available. `ConverterRegistry.convertAuto(input)` auto-detects the format via each registered converter's `detect()`.

- **`packages/core/src/types.ts`** — `RawNode` / `RawEdge` / style-map types. These intentionally mirror Pivotick's own `RawNode` / `RawEdge` (`src/interfaces/GraphOptions.ts`) and `NodeStyle` / `RendererOptions` (`src/interfaces/RendererOptions.ts`) types from the Pivotick repo. **Pivotick is not currently published to npm** (`private: true` in its `package.json`), so these are duplicated here rather than imported. If Pivotick is ever published, replace `types.ts` with re-exports from the real `pivotick` package and keep the shapes in sync until then.

### Format packages (`packages/<format>`)

Each format package (e.g. a future `packages/misp`) exports one or more `GraphConverter` subclasses and registers them as an import side effect. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the exact steps to add one — follow that guide rather than improvising a different shape, so every converter stays consistent and passes the same conformance checks.

### Icons and visual assets

If a format has curated iconography (MISP's attribute/object/galaxy icons, STIX SDO icons, ...), converters should ship it via `getDefaultStyleMap()`. The hard constraint: **a plain `npm install pivotick-transformer-<format>` must be enough** — never make a converter depend on a manual asset-fetching step, and never wire up a third-party icon framework (e.g. Font Awesome) that assumes the consumer already loads its CSS. Icon sets that live in a separate upstream repo (e.g. [misp-iconify](https://github.com/MISP/misp-iconify), which has no `package.json` and cannot be an npm dependency as-is) must be vendored at maintain-time by a sync script whose output is committed, not fetched live. Full writeup, including why the direct `github:` npm dependency was tried and fails: [`docs/icons-and-styling.md`](./docs/icons-and-styling.md).

## Adding a new converter — quick checklist for agents

1. Create `packages/<format>/` following the `packages/core` package layout (`package.json`, `tsconfig.json` extending the root, `src/`).
2. Extend `GraphConverter<TInput>` from `pivotick-transformer-core`.
3. Implement `format`, `variant` (with a unique `id` within the format; exactly one variant per format should set `default: true`), `detect()`, `convert()`. Add `getNodeTypeAccessor()` / `getDefaultStyleMap()` if the format has a natural notion of "entity type" (it almost always does).
4. If the same format needs more than one mapping strategy, add more `GraphConverter` classes with the same `format` and a different `variant.id`, sharing the `detect()` logic via a helper function rather than duplicating it.
5. Register every variant as a side effect in the package's entry point (`ConverterRegistry.register(new XConverter())`).
6. Do not invent a different base interface or bypass `ConverterRegistry` — the whole point of this repo is that every converter looks the same from the outside.
7. If adding icons, follow [`docs/icons-and-styling.md`](./docs/icons-and-styling.md) — assets must be vendored into the package, not fetched from a live dependency.
8. Match the code style rules above, and run `npm run build` + `npm run lint` from the repo root before considering the task done.
