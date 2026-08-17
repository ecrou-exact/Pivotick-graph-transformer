# Pivotick Graph Transformer — demo

A small browser app styled after [pivotick.github.io](https://pivotick.github.io/Pivotick/) (same nav/brand tokens, same logo): pick a registered converter
(format + variant), pick a fixture — or drag-and-drop / browse for your own
JSON file — and see the actual Pivotick render side-by-side with the raw
`{ nodes, edges }` JSON it produced, useful while a converter's `convert()`
is still a stub.

Not a published package — `private: true`, lives outside `packages/*` on
purpose so it never ships as part of a converter's npm install.

## Running it locally

```bash
npm install        # from the repo root
npm run build       # builds packages/core and packages/misp the demo imports
cd demo
npm run dev
```

## Adding fixtures

Drop a JSON file under `demo/fixtures/<format>/`, e.g.
`demo/fixtures/misp/event-basic.json`. It shows up in the demo's fixture
picker automatically (Vite glob-imports everything under `demo/fixtures/`) —
no code changes needed.

## How Pivotick gets in here

Pivotick isn't on npm (`"private": true` in its own `package.json`), and it
doesn't commit a built `dist/` either, so neither `npm install pivotick` nor
a `github:` dependency works. Its own README's recommended no-build path is
the pre-built `dist` bundle attached to each GitHub Release — that's what
[`scripts/sync-pivotick.mjs`](./scripts/sync-pivotick.mjs) automates: it
downloads the pinned release's dist zip and writes the ES module files this
demo needs into [`vendor/pivotick/`](./vendor/pivotick), which is committed
to git. Same "sync at maintain-time, ship at install-time" pattern already
used for MISP's icon set — see
[`../docs/icons-and-styling.md`](../docs/icons-and-styling.md).

To pick up a newer Pivotick release: bump `PIVOTICK_VERSION` in
`scripts/sync-pivotick.mjs`, re-run it, and commit the diff under
`vendor/pivotick/` as its own reviewable PR.

`vendor/pivotick/pivotick.es.d.ts` is hand-written by us (Pivotick's dist
doesn't ship types) and isn't touched by the sync script.

## Deployment

[`.github/workflows/deploy-demo.yml`](../.github/workflows/deploy-demo.yml)
builds this app and publishes it to GitHub Pages on every push to `main`
that touches `demo/**` or `packages/**`.
