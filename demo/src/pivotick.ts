import { GraphData, GraphRegistry } from '../../packages/core/src/index'
import { MispEventInput } from '../../packages/misp/src/index'

// A loaded fixture is either a single MISP Event export (`{ Event }`) or a
// MISP search/index response (`{ response: [{ Event }, ...] }`) — the
// latter is converted event-by-event and merged into one graph, each Event
// its own root. Shared by both demo pages (index.html's interactive Demo
// and docs.html's per-concept previews) so they never drift apart.
export function toGraphData(json: unknown, theme: 'dark' | 'light'): GraphData {
  const importer = GraphRegistry.getImporter('misp')
  const listResponse = (json as { response?: { Event: MispEventInput['Event'] }[] }).response
  if (Array.isArray(listResponse)) {
    return listResponse.reduce<GraphData>((graph, entry) => {
      const converted = importer.convert({ Event: entry.Event }, { theme })
      return { nodes: [...graph.nodes, ...converted.nodes], edges: [...graph.edges, ...converted.edges] }
    }, { nodes: [], edges: [] })
  }
  return importer.convert(json as MispEventInput, { theme })
}

// Pivotick's own d3-force defaults (d3LinkDistance: 40, d3ManyBodyStrength:
// -150) assume small native shapes — our custom html cards
// (buildIconLabelCard/buildTagChip) run much bigger, and a MISP Event can
// have dozens of Attribute/Tag/Galaxy children, so the defaults clump
// everything into an unreadable pile without this. These are still
// Pivotick's own documented simulation knobs, just tuned well past its own
// UI-slider ceiling (linkDistance maxes at 260, repulsion at -400,
// collideRadiusMultiplier at 2.4) for our unusually large node sizes.
// Shared by both demo pages — see README's Demo section for the same note.
export const TUNED_SIMULATION = {
  d3LinkDistance: 260,
  d3ManyBodyStrength: -700,
  d3CollideRadiusMultiplier: 2
}

// Pivotick's own named "loose" physics preset (its GraphOptions UI offers
// tight/loose/default, backed by friendly 0-100-ish knobs it maps onto the
// same raw d3-force options above) — translated here into those raw values
// since we set them directly: linkDistance 150 (that knob's units already
// equal its d3 value 1:1), repulsion 70 -> d3ManyBodyStrength -280 (its
// 0-100 range maps onto 0..-400), collisionRadius 26 -> d3CollideRadius-
// Multiplier ~1.31 (its 4-60 range maps onto 0.6..2.4), friction 28 ->
// d3VelocityDecay 0.28 (0-100 maps onto 0..1). Used for docs.html's small
// per-concept previews, which don't need TUNED_SIMULATION's much stronger
// spacing — that one's for the Demo page's dozens-of-nodes real events.
export const LOOSE_SIMULATION = {
  d3LinkDistance: 150,
  d3ManyBodyStrength: -280,
  d3CollideRadiusMultiplier: 1.31,
  d3VelocityDecay: 0.28
}
