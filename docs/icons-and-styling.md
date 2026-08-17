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

- `metadata/icons.json` — maps every icon key (410 total: e.g. `objects/ip-port`, `event`, `galaxies/threat-actor`) to its attribution metadata (`source`, `original`, `license`, `url`).
- `exports/css/icons.css` — a **generated, already-committed** stylesheet (~4 MB). Uses a `mask-image: url("data:image/svg+xml;base64,...")` technique with `background-color: currentColor`, so icon color follows the CSS `color` property.

  Class naming is `.misp-icon-<basename>.misp-<frame>` (two classes, not chained with more dots than that) — and it's less uniform than it first looks:

  - `<basename>` **strips** the `objects/`/`galaxies/` prefix a key has in `icons.json` — the `objects/ip-port` icon is `.misp-icon-ip-port`, not `.misp-icon-objects/ip-port`.
  - `<frame>` is one of **five** values, not just "simple vs hexagon frame" as it might look at a glance: `misp-objects` and `misp-galaxies` are exclusive to keys under those prefixes (213 and 131 keys respectively); `misp-attributes` covers most bare attribute-type keys (50); the remaining ~16 generic keys (`event`, `tag`, `misp`, ...) get both `misp-simple` and `misp-hexagone`, which really is a stylistic pick between the two.

  (Confirmed by parsing the actual committed CSS, not by reading a spec — see `packages/misp/scripts/sync-icons.mjs`, which does the same parsing at maintain-time.)
- `src/svg/**/*.svg` — the raw source SVGs, if inlining is ever preferred over the CSS approach for a subset of icons.
- No `package.json` at the repo root.

That last point matters: **`npm install github:MISP/misp-iconify` does not work.** This was tested directly (`npm init` + `npm install github:MISP/misp-iconify` in a scratch project) and fails with `ENOENT ... Could not read package.json` — npm's git installer requires one, and misp-iconify doesn't ship one. There is no way to make misp-iconify a normal npm dependency as-is.

### The vendoring approach (implemented)

Since we can't depend on it live, we vendor it — pull what we need at *maintenance time*, commit the result, and let ordinary `npm install` handle the rest:

1. **`packages/misp/vendor/misp-iconify`** is a git submodule pinned to a specific commit (`git submodule status` shows which) — not an npm dependency, just a convenient, versioned local checkout for the sync script (and for maintainers) to read from. It ships its own already-generated build output (`exports/css/icons.css`, `metadata/icons.json`), so nothing needs building inside it and its own nested submodules never need checking out. **The submodule is a maintain-time-only tool, not part of the install path** — `assets/icons.css` and `src/icons.generated.ts` (below) are the actually-committed output that ships in the npm package, so a plain `npm install` on this repo works with the submodule left uninitialized. `git submodule update --init packages/misp/vendor/misp-iconify` is only needed to re-run the sync script itself.
2. **`packages/misp/scripts/sync-icons.mjs`** (maintainer-run, not part of the install/build path) reads the submodule and:
   - copies `exports/css/icons.css` into `packages/misp/assets/icons.css` (committed to git)
   - parses that same CSS for which icon keys exist and which frame class(es) each has (the real ground truth — see above), and writes the result as `packages/misp/src/icons.generated.ts`: four `Set<string>` lookups (object/galaxy/attribute/generic keys) consumed by `packages/misp/src/mispIconClass.ts` at runtime to build the `iconClass` string for a given `entityType`, or return `undefined` if misp-iconify has no icon for it
   - copies the submodule's own `ATTRIBUTION.md` (already lists every icon's upstream source/license) to `packages/misp/ATTRIBUTION.md`, prefixed with the pinned commit it came from
3. `packages/misp/package.json` ships `assets/icons.css` as a package export (`"./icons.css": "./assets/icons.css"`, following the same `exports` field pattern already used in `packages/core`), so consumers do:

   ```ts
   import 'pivotick-transformer-misp/icons.css' // once, anywhere in the app
   import { MispEventRootConverter } from 'pivotick-transformer-misp'
   ```

   and `getDefaultStyleMap()` returns entries like `{ iconClass: 'misp-icon misp-icon-ip-port misp-objects' }` for every `entityType` misp-iconify covers, falling back to shape/color-only styling (see `getDefaultStyleMap`'s hand-written `event`/`tag` entries) for the rest.
4. Refreshing the icon set: `git submodule update --remote packages/misp/vendor/misp-iconify` (or check out a specific newer commit), then re-run the sync script and commit the diff — a normal PR, reviewed like any other change, never something that happens automatically on someone else's `npm install`. A submodule bump with no corresponding `assets/`/`icons.generated.ts` diff in the same PR is a sign the sync script wasn't re-run.

This is the same shape as `pivotick` itself requiring `import 'pivotick/dist/pivotick.css'` — consumers already expect one CSS import for a graph library, so this isn't an extra foreign step, it's the same step they already know.

The **simple vs. hexagon** choice (`misp-simple` / `misp-hexagone` — only meaningful for the ~16 generic keys that ship both; object/galaxy/attribute icons each only have one frame) is a pure styling toggle, not a structural one — it doesn't change which nodes/edges get produced. It's implemented as `ConverterOptions.iconFrame` (`'simple' | 'hexagon'`, default `'simple'`), read by `getDefaultStyleMap(options)` — see `packages/core/src/GraphConverter.ts`, which passes `toPivotickOptions()`'s `options` through to `getDefaultStyleMap` for exactly this. It is **not** a separate `variant`: variants (see [CONTRIBUTING.md](../CONTRIBUTING.md)) are reserved for choices that change graph topology, like "Event as root node" vs "flattened, references only."

Consumers who need more control than the `iconFrame` toggle can override the generated style map after the fact — nothing special is needed for this, `nodeStyleMap` is a plain object:

```ts
const { data, render } = converter.toPivotickOptions(input, { iconFrame: 'hexagon' })
new Pivotick(container, data, {
  render: { ...render, nodeStyleMap: { ...render.nodeStyleMap, domain: { color: 'red' } } },
})
```

## Formats without a curated icon set

Not every format will have an equivalent of misp-iconify. Two options, in order of preference:

1. **No icons, style by shape/color only.** `getDefaultStyleMap()` can set `shape` + `color` per type without any icon at all. This is a perfectly fine default and requires zero asset work — don't force icons where a curated set doesn't exist yet.
2. **Vendor a small, curated subset of an open icon library as inline `svgIcon` strings**, picked by hand for the handful of entity types the format actually has (e.g. a dozen STIX SDO types). Prefer a single-license, attribution-light set (e.g. Lucide — ISC license, or Tabler Icons — MIT) over Font Awesome Free, whose icons are split across CC BY 4.0 (icons), SIL OFL 1.1 (fonts) and MIT (code) — still usable, but a heavier attribution/license story to track for what would be a hand-picked handful of icons. Whichever set is used, vendor the specific icons as inline SVG directly in the converter's generated style map (same "sync at maintain-time, ship at npm-install-time" pattern as MISP above) — never require the consumer to load a third-party icon framework's CSS/webfont themselves.

**Font Awesome specifically**: don't wire it up as a live `iconClass` dependency (`fa-solid fa-globe` etc.) that assumes the consumer's page already loads Font Awesome's CSS — that reintroduces exactly the manual setup step this project exists to remove, and it silently breaks (icons render as blank boxes, no error) for any consumer who hasn't loaded it. If a contributor wants specifically Font Awesome's glyphs, vendor the needed subset as inline SVG (Font Awesome Free icons are individually available as SVG and are CC BY 4.0 — keep the attribution) rather than referencing its CSS classes live.
