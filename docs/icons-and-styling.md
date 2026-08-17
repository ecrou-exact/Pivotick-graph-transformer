# Icons and visual styling

This document is the reference for adding icons/visual styling to a converter's `getDefaultStyleMap()`. It uses MISP + [misp-iconify](https://github.com/MISP/misp-iconify) as the worked example, then generalizes to any format that doesn't have its own curated icon set.

## The one rule that matters

**A consumer runs `npm install pivotick-transformer-<format>` and gets working icons. No second install, no manual asset copy, no "also go clone this other repo."**

This project exists to remove duplicated work from Pivotick integrators — an icon setup that requires its own manual steps just relocates the duplicated work instead of removing it. Concretely, that means: whatever a converter needs at *runtime* must already be inside its published npm package. Fetching or cloning anything at install time or at run time is not acceptable.

## What Pivotick can actually render

Pivotick's `NodeStyle` (see `RendererOptions` in the Pivotick repo) supports, per node:

- `shape` — `'circle' | 'square' | 'triangle' | 'hexagon'`, or a custom SVG path (`{ d: string }`)
- `color`, `strokeColor`, `strokeWidth`, `size`
- `iconClass` — one or more CSS classes applied to the node (works with any CSS-based icon system: a webfont, or a class-based technique like `mask-image`)
- `iconUnicode` — a single codepoint from an icon font
- `svgIcon` — inline SVG (string or element) baked directly into the node, no external stylesheet needed
- `imagePath` — a URL to a raster/vector image
- `html` — a fully custom `ForeignObject`, for anything the above can't express

Every one of these is set per node type through `nodeStyleMap` (keyed by whatever `nodeTypeAccessor` returns for a node) — which is exactly what `GraphConverter.getDefaultStyleMap()` / `getNodeTypeAccessor()` produce.

Two realistic delivery mechanisms follow from this:

| Mechanism | How it works | Consumer setup required |
|---|---|---|
| `svgIcon` (inline) | The style map itself contains the SVG markup as a string | None — it's just data, already inside the JS you imported |
| `iconClass` (CSS-based) | The style map references a CSS class name; a stylesheet defining that class must be loaded on the page | One `import 'pivotick-transformer-<format>/icons.css'`, same pattern Pivotick itself already requires for `pivotick.css` |

`imagePath` and `iconUnicode` are not used by converters in this project: `imagePath` implies hosting/serving image files somewhere (a manual step, and it breaks offline/air-gapped use — relevant for CTI tooling), and `iconUnicode` implies a webfont the consumer has to load, which is worse than the CSS-class option for no benefit.

So: **prefer inline `svgIcon`. Use `iconClass` + a bundled stylesheet when the source icon set is already shaped that way and re-inlining everything would be wasteful** (this is MISP's case, below).

## Case study: MISP → misp-iconify

[misp-iconify](https://github.com/MISP/misp-iconify) is the MISP project's official icon set: one icon per attribute type, per MISP object (from the `misp-objects` submodule), and per galaxy/cluster type (from `misp-galaxy`). License: **BSD-2-Clause**, with a generated `ATTRIBUTION.md` — permissive, redistribution is fine as long as attribution is kept.

What's actually in the repo (verified directly, not assumed):

- `metadata/icons.json` — maps every icon key (e.g. `objects/ip-port`, `event`, `galaxies/threat-actor`) to its attribution metadata.
- `exports/css/icons.css` — a **generated, already-committed** stylesheet (~4 MB). Uses a `mask-image: url("data:image/svg+xml;base64,...")` technique with `background-color: currentColor`, so icon color follows the CSS `color` property. Class naming: `.misp-icon.misp-icon-<key>.misp-simple` or `.misp-icon.misp-icon-<key>.misp-hexagone` (MISP's UI uses a hexagon frame; a plain variant is also available).
- `src/svg/**/*.svg` — the raw source SVGs, if inlining is ever preferred over the CSS approach for a subset of icons.
- No `package.json` at the repo root.

That last point matters: **`npm install github:MISP/misp-iconify` does not work.** This was tested directly (`npm init` + `npm install github:MISP/misp-iconify` in a scratch project) and fails with `ENOENT ... Could not read package.json` — npm's git installer requires one, and misp-iconify doesn't ship one. There is no way to make misp-iconify a normal npm dependency as-is.

### The vendoring approach

Since we can't depend on it live, we vendor it — pull the specific files we need at *maintenance time*, commit the result, and let ordinary `npm install` handle the rest:

1. **`packages/misp/scripts/sync-icons.mjs`** (maintainer-run, not part of the install/build path): downloads `metadata/icons.json` and `exports/css/icons.css` from `raw.githubusercontent.com/MISP/misp-iconify/<pinned-commit-sha>/...` — pinned to a specific commit so a refresh is a deliberate, reviewable diff, not a moving target.
2. The script writes the fetched files into `packages/misp/assets/` (committed to git) and regenerates a small typed lookup, e.g. `packages/misp/src/icons.generated.ts`, mapping MISP type keys (attribute `type`, object `name`/template, galaxy cluster `type`) to the corresponding `misp-icon-<key>` class name.
3. `packages/misp/package.json` ships `assets/icons.css` as a package export (`"./icons.css": "./assets/icons.css"`, following the same `exports` field pattern already used in `packages/core`), so consumers do:

   ```ts
   import 'pivotick-transformer-misp/icons.css' // once, anywhere in the app
   import { MispEventRootConverter } from 'pivotick-transformer-misp'
   ```

   and `getDefaultStyleMap()` returns entries like `{ iconClass: 'misp-icon misp-icon-objects/ip-port misp-simple' }`.
4. `packages/misp/ATTRIBUTION.md` carries forward the upstream attribution requirement (copy of the relevant `misp-iconify` `ATTRIBUTION.md` content, or a link to the pinned commit's version).
5. Re-running the sync script and bumping the pinned commit is how the icon set gets refreshed — a normal PR, reviewed like any other change, never something that happens automatically on someone else's `npm install`.

This is the same shape as `pivotick` itself requiring `import 'pivotick/dist/pivotick.css'` — consumers already expect one CSS import for a graph library, so this isn't an extra foreign step, it's the same step they already know.

The **simple vs. hexagon** choice (`misp-simple` / `misp-hexagone`) is a pure styling toggle, not a structural one — it doesn't change which nodes/edges get produced. It belongs in `ConverterOptions` (e.g. `{ iconFrame: 'hexagon' }` passed to `convert()`/`toPivotickOptions()`), **not** as a separate `variant`. Variants (see [CONTRIBUTING.md](../CONTRIBUTING.md)) are reserved for choices that change graph topology, like "Event as root node" vs "flattened, references only."

## Formats without a curated icon set

Not every format will have an equivalent of misp-iconify. Two options, in order of preference:

1. **No icons, style by shape/color only.** `getDefaultStyleMap()` can set `shape` + `color` per type without any icon at all. This is a perfectly fine default and requires zero asset work — don't force icons where a curated set doesn't exist yet.
2. **Vendor a small, curated subset of an open icon library as inline `svgIcon` strings**, picked by hand for the handful of entity types the format actually has (e.g. a dozen STIX SDO types). Prefer a single-license, attribution-light set (e.g. Lucide — ISC license, or Tabler Icons — MIT) over Font Awesome Free, whose icons are split across CC BY 4.0 (icons), SIL OFL 1.1 (fonts) and MIT (code) — still usable, but a heavier attribution/license story to track for what would be a hand-picked handful of icons. Whichever set is used, vendor the specific icons as inline SVG directly in the converter's generated style map (same "sync at maintain-time, ship at npm-install-time" pattern as MISP above) — never require the consumer to load a third-party icon framework's CSS/webfont themselves.

**Font Awesome specifically**: don't wire it up as a live `iconClass` dependency (`fa-solid fa-globe` etc.) that assumes the consumer's page already loads Font Awesome's CSS — that reintroduces exactly the manual setup step this project exists to remove, and it silently breaks (icons render as blank boxes, no error) for any consumer who hasn't loaded it. If a contributor wants specifically Font Awesome's glyphs, vendor the needed subset as inline SVG (Font Awesome Free icons are individually available as SVG and are CC BY 4.0 — keep the attribution) rather than referencing its CSS classes live.
