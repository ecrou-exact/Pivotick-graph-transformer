import { GraphData, GraphRegistry } from '../../packages/core/src/index'
import { MispEventInput } from '../../packages/misp/src/index'

// A loaded fixture is either a single MISP Event export (`{ Event }`) or a
// MISP search/index response (`{ response: [{ Event }, ...] }`) — the
// latter is converted event-by-event and merged into one graph, each Event
// its own root. Shared by demo.html's interactive Demo, docs.html's
// per-concept previews, and index.html's own small Tag preview, so they
// never drift apart.
export function toGraphData(json: unknown, theme: 'dark' | 'light', viewMode?: 'detailed' | 'grouped' | 'relations'): GraphData {
  const importer = GraphRegistry.getImporter('misp')
  const listResponse = (json as { response?: { Event: MispEventInput['Event'] }[] }).response
  if (Array.isArray(listResponse)) {
    const merged = listResponse.reduce<GraphData>((graph, entry) => {
      const converted = importer.convert({ Event: entry.Event }, { theme, viewMode })
      return {
        nodes: [...graph.nodes, ...converted.nodes],
        edges: [...graph.edges, ...converted.edges],
        // Each empty Event carries its own "Nothing to display" note (see
        // convert()'s own comment) — only worth keeping if the *whole*
        // merged graph still ends up empty, dropped below otherwise.
        notes: [...(graph.notes ?? []), ...(converted.notes ?? [])]
      }
    }, { nodes: [], edges: [] })
    if (merged.nodes.length > 0) merged.notes = undefined
    return merged
  }
  return importer.convert(json as MispEventInput, { theme, viewMode })
}

// The same two accepted shapes as toGraphData above, checked without
// converting — for the "paste your own JSON" modal to tell a malformed/
// unrelated upload apart from a real MISP export before rendering it.
export function isMispJson(json: unknown): boolean {
  if (typeof json !== 'object' || json === null) return false
  const importer = GraphRegistry.getImporter('misp')
  const listResponse = (json as { response?: unknown[] }).response
  if (Array.isArray(listResponse)) {
    return listResponse.length > 0 && listResponse.every(entry => importer.detect(entry))
  }
  return importer.detect(json)
}

// Pivotick's own named "loose" physics preset (its GraphOptions UI offers
// tight/loose/default, backed by friendly 0-100-ish knobs it maps onto raw
// d3-force options) — translated here into those raw values since we set
// them directly: linkDistance 150 (that knob's units already equal its d3
// value 1:1), repulsion 70 -> d3ManyBodyStrength -280 (its 0-100 range maps
// onto 0..-400), collisionRadius 26 -> d3CollideRadiusMultiplier ~1.31 (its
// 4-60 range maps onto 0.6..2.4), friction 28 -> d3VelocityDecay 0.28
// (0-100 maps onto 0..1). Used for docs.html's small per-concept previews —
// the Demo page itself leaves physics untouched (Pivotick's own defaults).
export const LOOSE_SIMULATION = {
  d3LinkDistance: 150,
  d3ManyBodyStrength: -280,
  d3CollideRadiusMultiplier: 1.31,
  d3VelocityDecay: 0.28
}
