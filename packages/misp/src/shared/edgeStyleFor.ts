import stylesConfig from './styles.json' with { type: 'json' }

/**
 * Resolves an edge's real style from styles.json's "edges" section, keyed
 * by the same `kind` string set on `edge.data`, and attaches it directly
 * to each `RawEdge.style` at `convert()` time. Shared by every MISP
 * variant — a relation kind's color/width/dash policy doesn't depend on
 * graph topology, so every variant that stamps `edge.data.kind` resolves
 * its style the same way.
 *
 * Each kind's own `"structural": true` flag (styles.json) is what decides
 * whether it loses its arrowhead — *structural* kinds (hasObject/
 * hasAttribute/hasTag/hasGalaxy — "this belongs to that") aren't real
 * directed relationships, just containment, so they render with no
 * arrowhead; the rest (reference/clusterRelation — an Object Reference's
 * relationship_type, a GalaxyClusterRelation's type, e.g. "uses"/
 * "dropped-by") are real named, directional relationships an analyst
 * cares about, so they keep theirs. A maintainer reclassifying a kind (or
 * adding a new one) only ever edits that flag, not this function.
 *
 * This has to happen per-edge, not through a single `styleCb` on
 * `RendererOptions.defaultEdgeStyle` — verified directly against
 * Pivotick's own renderer (`EdgeRenderer.getEdgeStyle()`): it only ever
 * calls `edge.getEdgeStyle()?.styleCb` (the *per-edge* style's callback),
 * and reads `defaultEdgeStyle`'s fields individually as plain fallback
 * values — `defaultEdgeStyle.styleCb` is never invoked.
 *
 * The returned object is nested under an `edge` key — `{ edge: {
 * strokeColor, ... } }`, not the flat style object itself — because
 * `Edge.getEdgeStyle()` reads `this.style?.edge`, not `this.style`
 * directly (verified against Pivotick's real `Edge` class, and matching
 * adulau/threat-actor-explorer's own `style: { edge: {...}, label: {...}
 * }` shape). An earlier version of this function returned the flat shape,
 * which `getEdgeStyle()` silently read as `{}` (its `?? {}` fallback) —
 * so every edge fell through to the flat default regardless of its real
 * kind, same end symptom as the `styleCb`-on-`defaultEdgeStyle` bug above.
 */
export function edgeStyleFor(kind: keyof typeof stylesConfig.edges): Record<string, unknown> {
  const { structural, ...base } = stylesConfig.edges[kind] as Record<string, unknown>
  return { edge: structural ? { ...base, markerEnd: 'none' } : base }
}
