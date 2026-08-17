# Icons and visual styling

This document is the reference for adding icons/visual styling to a converter's `getDefaultStyleMap()`. It uses MISP + [misp-iconify](https://github.com/MISP/misp-iconify) as the worked example, then generalizes to any format that doesn't have its own curated icon set.

## The one rule that matters

**A consumer runs `npm install pivotick-transformer-<format>` and gets working icons. No second install, no manual asset copy, no "also go clone this other repo."**

This project exists to remove duplicated work from Pivotick integrators — an icon setup that requires its own manual steps just relocates the duplicated work instead of removing it. Concretely, that means: whatever a converter needs at *runtime* must already be inside its published npm package. Fetching or cloning anything at install time or at run time is not acceptable.

## What Pivotick can actually render

Pivotick's `NodeStyle` (see `RendererOptions` in the Pivotick repo) supports, per node:

- `shape` — `'circle' | 'square' | 'triangle' | 'hexagon'`, or a custom SVG path (`{ d: string }`)
- `color`, `strokeColor`, `strokeWidth`, `size`
- `iconClass` — **icon-font oriented, not a generic CSS-class hook.** Verified directly against Pivotick's renderer source (`src/renderers/svg/NodeDrawer.ts`), not assumed from the type's doc comment: it appends a `<text>` element and sets its content via `faGlyph(style.iconClass ?? '')` — a **Font Awesome** glyph-name lookup — falling back to a hollow-square placeholder (`☐`) for anything `faGlyph` doesn't recognize. A CSS class from an unrelated icon set (e.g. one built on `mask-image`, like misp-iconify) never renders anything through this path — not "requires an extra stylesheet," genuinely inert. Only use this for actual Font Awesome class names.
- `iconUnicode` — a single codepoint from an icon font
- `svgIcon` — inline SVG (string or element), the mechanism this project actually uses. Also verified against `NodeDrawer.ts`: it's parsed into a real `<svg>` element, sized to the node (`width/height = size * 1.4`), with `color` set to `style.strokeColor` so a `fill="currentColor"`/`stroke="currentColor"` source SVG follows it. No external stylesheet, no glyph-name lookup — the markup you provide is what renders.
- `imagePath` — a URL to a raster/vector image
- `html` — a fully custom `ForeignObject`, for anything the above can't express

Every one of these is set per node type through `nodeStyleMap` (keyed by whatever `nodeTypeAccessor` returns for a node) — which is exactly what `GraphConverter.getDefaultStyleMap()` / `getNodeTypeAccessor()` produce.

**Use `svgIcon`.** `imagePath` implies hosting/serving image files somewhere (a manual step, and it breaks offline/air-gapped use — relevant for CTI tooling); `iconUnicode`/`iconClass` both imply a font/glyph system the consumer would have to load correctly *and* that actually has the glyph you want, which — per the note above — real-world icon sets like misp-iconify generally don't. `svgIcon` is data: it's already inside the JS the consumer imported, nothing to load, nothing to misconfigure.

An earlier version of this project vendored misp-iconify's `iconClass`-based stylesheet (`exports/css/icons.css`, ~4 MB, a `mask-image` technique). It built without errors and *looked* correct — every `NodeStyleMap` entry had a plausible-looking `iconClass` string — but rendered nothing but each node's plain shape, because of the `faGlyph()` behavior above. Caught by a demo user reporting "just blue circles and arrows," not by any build-time check, since nothing about it is a type error or a runtime exception — the lesson being that verifying an icon delivery mechanism means visually checking the render, not just checking that `nodeStyleMap` has the fields you expect.

## Case study: MISP → misp-iconify

[misp-iconify](https://github.com/MISP/misp-iconify) is the MISP project's official icon set: one icon per attribute type, per MISP object (from the `misp-objects` submodule), and per galaxy/cluster type (from `misp-galaxy`). License: **BSD-2-Clause**, with a generated `ATTRIBUTION.md` — permissive, redistribution is fine as long as attribution is kept.

What's actually in the repo (verified directly, not assumed):

- `src/svg/` — the raw source SVGs this project actually uses, organized into `attributes/`, `objects/`, `galaxies/`, and `simple/` (bare/generic icons like `event`, `tag`) — plus `objects-framed/`, `galaxies-orbit/`, and `hexagone/`, each the same icons pre-composited with their own background frame. **Use the unframed directories** (`attributes/`, `objects/`, `galaxies/`, `simple/`): Pivotick's own `shape` style already draws a frame (hexagon, circle, ...) around the node, so a pre-framed icon on top would double up borders. Filenames are the icon key with any `objects/`/`galaxies/` category prefix stripped (`objects/ip-port` → `objects/ip-port.svg`, i.e. `ip-port.svg` inside the `objects/` directory).
- `metadata/icons.json` / `exports/css/icons.css` — misp-iconify's own generated CSS-icon-font-style build output. **Not used here** — this is the delivery mechanism that doesn't actually render in Pivotick (see above).
- No `package.json` at the repo root.

That last point matters: **`npm install github:MISP/misp-iconify` does not work.** This was tested directly (`npm init` + `npm install github:MISP/misp-iconify` in a scratch project) and fails with `ENOENT ... Could not read package.json` — npm's git installer requires one, and misp-iconify doesn't ship one. There is no way to make misp-iconify a normal npm dependency as-is.

### The vendoring approach (implemented)

Since we can't depend on it live, we vendor it — pull what we need at *maintenance time*, commit the result, and let ordinary `npm install` handle the rest. Two pieces, split deliberately:

- **`packages/misp/src/styles.json`** — hand-maintained, not generated. `nodes`: shape/color/size *per category* — `event`, `tag`, `attribute`, `object`, `galaxyCluster`, `generic` (the handful of misp-iconify keys that are neither an attribute, object, nor galaxy cluster type — `report`, `sighting`, ...). `edges`: color/width/dash *per relation kind* — `structure`, `tag`, `galaxy`, `reference`, `clusterRelation` (see `MispEventRootConverter.convert()`, which stamps each edge's `data.kind`) — plus `default` for anything without one. `arrow`: the built-in arrowhead marker's size. This is genuinely meant to be hand-edited — want objects to render as squares instead of hexagons, Object References to be thicker, or a different accent color? Change the one line in this file, nothing else.
- **`packages/misp/src/icons.generated.ts`** — machine-generated, *don't* hand-edit. One inline-SVG string per icon key misp-iconify ships (410 total, minified), split into the same four `Record<string, string>` maps (`MISP_ATTRIBUTE_ICONS`, `MISP_OBJECT_ICONS`, `MISP_GALAXY_ICONS`, `MISP_GENERIC_ICONS`) so `mispIconSvg.ts` can look up "does this specific key have an icon, and what's its markup" separately from "what should this category generally look like."

`getDefaultStyleMap()` combines the two: for each of the 410 known keys, `{ ...stylesConfig[category], svgIcon: <that key's markup> }`. A key misp-iconify has no icon for still gets the category's shape/color, just no `svgIcon` — never a missing/broken render.

1. **`packages/misp/vendor/misp-iconify`** is a git submodule pinned to a specific commit (`git submodule status` shows which) — not an npm dependency, just a convenient, versioned local checkout for the sync script (and for maintainers) to read from. **The submodule is a maintain-time-only tool, not part of the install path** — `src/icons.generated.ts` (committed) is the actual output that ships in the npm package, so a plain `npm install` on this repo works with the submodule left uninitialized. `git submodule update --init packages/misp/vendor/misp-iconify` is only needed to re-run the sync script itself.
2. **`packages/misp/scripts/sync-icons.mjs`** (maintainer-run, not part of the install/build path) reads the submodule's `src/svg/{attributes,objects,galaxies,simple}/` directories, lightly minifies each SVG (strips the XML prolog, comments, and Inkscape/Sodipodi editor metadata; deliberately leaves `id` attributes alone — ~80 of these icons use `clip-path`/`mask`/`<use>` referencing them internally), and writes the result to `src/icons.generated.ts`. It also copies the submodule's own `ATTRIBUTION.md` (already lists every icon's upstream source/license) to `packages/misp/ATTRIBUTION.md`, prefixed with the pinned commit it came from. It does **not** touch `styles.json`.
3. Consumers just do:

   ```ts
   import { ConverterRegistry } from 'pivotick-transformer-core'
   import 'pivotick-transformer-misp'

   const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
   ```

   No second import, no stylesheet — `svgIcon` strings are already inside the JS.
4. Refreshing the icon set: `git submodule update --remote packages/misp/vendor/misp-iconify` (or check out a specific newer commit), then re-run the sync script and commit the diff — a normal PR, reviewed like any other change, never something that happens automatically on someone else's `npm install`. A submodule bump with no corresponding `icons.generated.ts` diff in the same PR is a sign the sync script wasn't re-run.

Consumers who want something other than what `styles.json` picked can override the generated style map after the fact — nothing special is needed for this, `nodeStyleMap` is a plain object:

```ts
const { data, render } = converter.toPivotickOptions(input)
new Pivotick(container, data, {
  render: { ...render, nodeStyleMap: { ...render.nodeStyleMap, domain: { color: 'red' } } },
})
```

## Formats without a curated icon set

Not every format will have an equivalent of misp-iconify. Two options, in order of preference:

1. **No icons, style by shape/color only.** `getDefaultStyleMap()` can set `shape` + `color` per type without any icon at all. This is a perfectly fine default and requires zero asset work — don't force icons where a curated set doesn't exist yet.
2. **Vendor a small, curated subset of an open icon library as inline `svgIcon` strings**, picked by hand for the handful of entity types the format actually has (e.g. a dozen STIX SDO types). Prefer a single-license, attribution-light set (e.g. Lucide — ISC license, or Tabler Icons — MIT) over Font Awesome Free, whose icons are split across CC BY 4.0 (icons), SIL OFL 1.1 (fonts) and MIT (code) — still usable, but a heavier attribution/license story to track for what would be a hand-picked handful of icons. Whichever set is used, vendor the specific icons as inline SVG directly in the converter's generated style map (same "sync at maintain-time, ship at npm-install-time" pattern as MISP above) — never require the consumer to load a third-party icon framework's CSS/webfont themselves.

**Font Awesome specifically**: `iconClass` genuinely is the right field for actual Font Awesome class names (`fa-solid fa-globe` etc.) — that's what `faGlyph()` resolves. But don't wire it up as a live dependency that assumes the consumer's page already loads Font Awesome's CSS/font files — that reintroduces exactly the manual setup step this project exists to remove, and (per the `faGlyph` fallback above) it fails *silently*, rendering the hollow-square placeholder with no error. If a contributor wants specifically Font Awesome's glyphs, vendor the needed subset as inline SVG via `svgIcon` (Font Awesome Free icons are individually available as SVG and are CC BY 4.0 — keep the attribution) rather than depending on its class names live.
