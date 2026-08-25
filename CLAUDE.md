# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Pivotick Graph Transformer converts third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

## Strategy: consumed as a git submodule, not an npm package

This repo is meant to be added as a **git submodule** directly inside Pivotick (or any other consumer), which then imports the TypeScript source by relative path. There is intentionally no build/publish step for the library itself — no `npm publish`, no compiled `dist/` to depend on.

The only place npm/build tooling is allowed to exist is a small local demo/test site, kept separate from the library source, used to sanity-check converters in a browser during development.

## Hard rule: never modify Pivotick itself

The vendored Pivotick bundle (`demo/vendor/pivotick/`) is read-only, including from the demo. Every feature — theming, card backgrounds, what shows in the properties panel, which nodes exist at all — must be achieved by shaping the `nodes`/`edges` JSON and the options bag this repo hands to `new Pivotick(container, data, options)`, using whatever knobs Pivotick's own public options already expose (e.g. its `UI.theme` option, `styleRules`-driven `data`/`style` on a node, `nodePropertiesMap`). If something seems to need a Pivotick source/CSS change, the fix belongs in how we generate the JSON/options, not in the vendored files.

**Gotcha, verified straight from the vendored bundle:** Pivotick's dark/light theme option is `UI: { theme: 'dark' | 'light' }`, *not* a top-level `theme` key — its `UIManager` only ever receives `options.UI`, so a top-level `theme` is silently never read and its own canvas/chrome stays stuck on the no-`data-theme` default. This is unrelated to this repo's own `ConverterOptions.theme` (the hint importers use to pick their card backgrounds) — both need setting, in two different places, to get a fully themed page.

## Current state

`packages/core` has the generic converter plumbing (`GraphImporter`/`GraphRegistry`/`GraphExporter`, `resolveNodeAppearance`, `buildIconLabelCard`, `buildTagChip`, `estimateCardSize`) and the pivot `RawNode`/`RawEdge`/`ConverterOptions` types every format converter speaks.

`packages/misp` has the one MISP importer so far (`MispEventImporter`, in `import.ts`), organized one folder per MISP concept (`event/`, `object/`, `attribute/`, `tag/`, ...) — each with its own `types.ts`, and where the properties panel needs curating, a `fields.ts` (which raw fields to show) + `formatters.ts` (how to make them readable, reusing `shared/formatters.ts` where more than one concept needs the same transform). See README's "MISP concepts to implement" for which concepts are done vs. still to do.

`demo/` is the local Vite site this strategy allows (`cd demo && npm run dev`), two pages: `index.html` (Demo — a floating fixture picker over a full-UI Pivotick instance, switching between `demo/fixtures/misp/**`) and `docs.html` (Docs — one section per MISP concept, each a small hand-written fixture under `demo/fixtures-docs/` paired with a live "basic" Pivotick preview). Both share a top nav (`demo/src/siteHeader.ts`) and a dark/light toggle persisted across pages in `localStorage` (`demo/src/theme.ts`) — see README's "Demo & Docs" section.
