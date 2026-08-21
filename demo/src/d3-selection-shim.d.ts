/**
 * Minimal ambient type for d3-selection's `select()` — the package ships
 * as plain JS with no bundled `.d.ts` and no `@types/d3-selection` is
 * installed. Used only to construct a genuine D3 selection to hand to
 * Pivotick's own d3-zoom `zoomBehavior.transform()` (see main.ts's
 * `restoreZoomTransform()`) so the previous pan/zoom survives a Pivotick
 * instance recreation. Its shape past "a real D3 selection object" is
 * irrelevant here, so it's typed as `unknown` rather than modelling the
 * whole library.
 */
declare module 'd3-selection' {
  export function select(node: Element): unknown
}
