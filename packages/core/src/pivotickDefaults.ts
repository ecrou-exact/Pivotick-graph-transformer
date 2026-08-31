// Unlike everything else in packages/core, these two constants aren't data
// this repo's importers produce (they only ever emit `{ nodes, edges }` and
// per-node style) — they're recommended fragments of the `options` bag and
// page CSS a *consumer* hands to `new Pivotick(container, data, options)`
// and its page respectively. Centralized here, instead of left for every
// consumer (including this repo's own demo) to rediscover independently,
// so a submodule update carries the fix forward automatically.

// Spread into `new Pivotick(...)`'s own `simulation` option.
export const RECOMMENDED_PIVOTICK_SIMULATION_OPTIONS = {
  // Recentering the whole canvas on every "+" click is disorienting once a
  // graph has more than a couple of expandable groups — the node you just
  // expanded ends up somewhere else instead of growing in place.
  fitViewOnExpandCollapse: false
}

// Inject once per page (e.g. a <style> element appended before any Pivotick
// instance mounts) — never a change to Pivotick's own source/CSS, only the
// consumer-facing `--pvt-*` custom properties and classes it already
// publishes for exactly this kind of retinting (same knob a consumer would
// use to retint `--pvt-theme-primary`).
//
// Fixes two rough edges in v1.6.0's collapsed-node ("+") affordance:
//
// 1. A collapsed node draws a dashed ring on top of its own "+" icon, and
//    a dashed "shadow link"/"synthetic" edge for any real edge touching
//    it — three affordances for the same "this hides something" fact.
//    --pvt-node-dash-stroke / --pvt-edge-stroke-dasharray are Pivotick's
//    own theming variables for the first two; .pvt-edge-synthetic's own
//    dasharray is hardcoded, not a variable, so it needs a plain rule at
//    matching specificity instead. Pivotick redeclares the two variables
//    on its own `.pivotick[data-theme=...]` container, not just `:root`,
//    which outranks a plain `:root` override — matching that selector
//    here is the only way to actually win the cascade.
// 2. Side effect of #1: Pivotick's own collapsed-node rule
//    (`.pvt-node-has-children:not(.pvt-node-expanded)>.node`, 4 classes)
//    has higher specificity than either state ring it can combine with
//    (`.pvt-node-selected-highlight>.node` or `.pvt-node-highlighted>
//    .node`, 1-2 classes) — so on a collapsed node it always won the
//    `stroke` property. With a real dash colour that still painted
//    *something*; with #1's fix making it transparent, a selected or
//    highlighted "+" node would otherwise show no ring at all.
//    Re-declaring `stroke` on the combined selector (5 classes) restores
//    it without reintroducing the dash.
export const PIVOTICK_STYLE_OVERRIDES = `
.pivotick[data-theme='light'],
.pivotick[data-theme='dark'] {
  --pvt-node-dash-stroke: transparent;
  --pvt-edge-stroke-dasharray: none;
}
.pvt-edge-group.pvt-edge-synthetic path {
  stroke-dasharray: none;
}
.pvt-node.pvt-node-has-children:not(.pvt-node-expanded).pvt-node-selected-highlight > .node {
  stroke: var(--pvt-node-selected-stroke);
}
.pvt-node.pvt-node-has-children:not(.pvt-node-expanded).pvt-node-highlighted > .node {
  stroke: var(--pvt-node-highlighted-stroke);
}
`
