# pivotick-transformer-misp

Converts [MISP](https://www.misp-project.org/) Events and Objects into Pivotick's `nodes` / `edges` shape.

> **Status**: `event-root` maps each Event's top-level Attributes, Objects (with their nested Attributes, each Attribute's `object_relation` shown as the edge label) and explicit Object References, Tags and Galaxy/GalaxyCluster wherever MISP allows them (Event, Attribute, Object) — deduped by tag name / cluster id, so a tag reused across many entities is one node with many edges, not a duplicate per entity — plus GalaxyClusterRelation as extra edges between the clusters themselves (MISP's own cluster-to-cluster graph, e.g. a threat-actor cluster "uses" a malware cluster — distinct from an Object Reference). Standalone Objects root themselves. Sighting is aggregated into a count on the Attribute's node data, not rendered as its own nodes. Field shapes are checked against PyMISP's actual class definitions (`pymisp/mispevent.py`, `pymisp/abstract.py`) and real example exports, not guessed — see [`src/types.ts`](./src/types.ts).

## Input

Accepts any of the shapes MISP actually exports things in — see [`normalizeMispInput.ts`](./src/normalizeMispInput.ts), which every variant's `detect()`/`convert()` shares:

- a single Event: `{ Event: { uuid, info, Attribute?, Object? } }`
- an Event with no wrapper — its fields directly at the top level, `{ uuid, info, Attribute?, Object? }` — the shape `pymisp`'s `MISPEvent.to_json()` actually produces
- a bare list of Events: `[{ Event: {...} }, { Event: {...} }]`
- a `restSearch`-style API response: `{ response: [{ Event: {...} }, ...] }`
- a standalone Object, wrapped (`{ Object: { uuid, name, Attribute? } }`) or bare (`{ uuid, name, Attribute? }`), exported on its own outside any Event
- a list of standalone Objects, or a mix of Events and Objects in one array

All Events/Objects found in one input land in the same graph. See [`src/types.ts`](./src/types.ts) for the full field shapes this converter reads, and `demo/fixtures/misp/` in the repo root for a worked example of each case.

## Variants

| id | name | description |
|---|---|---|
| `event-root` (default) | Event as root node | The Event is a cluster node; Attributes and Objects are its children. |

A future `object-refs-only` variant (no Event node, edges only from explicit Object References) is planned — see the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md#multiple-variants-for-the-same-format).

## Usage

```ts
import { ConverterRegistry } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp'

const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
```

No second import needed for icons — see below.

## Icons and styling

`getDefaultStyleMap()` ships a real icon (inline SVG, via Pivotick's `NodeStyle.svgIcon` — see [`../../docs/icons-and-styling.md`](../../docs/icons-and-styling.md) for why that's the mechanism, not `iconClass`) for every attribute type / object / galaxy cluster type [misp-iconify](https://github.com/MISP/misp-iconify) covers (410 keys), falling back to shape/color only for the rest. Node labels aren't shown as on-canvas text on purpose — with icons already carrying the type and hundreds of nodes on screen at once, that's clutter, not signal; `node.data.label` is still there for the sidebar/tooltip. Edges carry the actually-interesting labels instead: an Object Reference's `relationship_type`, an Object Attribute's `object_relation`, a GalaxyClusterRelation's type.

**Shape, color, and edge styling are configuration, not code** — [`src/styles.json`](./src/styles.json) is a small, hand-maintained file:

```json
{
  "nodes": {
    "event": { "shape": "hexagon", "color": "#1f6feb", "size": 28 },
    "tag": { "shape": "circle", "color": "#94a3b8", "size": 10 },
    "attribute": { "shape": "circle", "color": "#0ea5e9", "size": 14 },
    "object": { "shape": "hexagon", "color": "#7c3aed", "size": 18 },
    "galaxyCluster": { "shape": "square", "color": "#a855f7", "size": 16 },
    "generic": { "shape": "circle", "color": "#64748b", "size": 12 }
  },
  "edges": {
    "default": { "strokeColor": "#94a3b8", "strokeWidth": 1 },
    "structure": { "strokeColor": "#cbd5e1", "strokeWidth": 1 },
    "tag": { "strokeColor": "#94a3b8", "strokeWidth": 1, "dashed": true },
    "galaxy": { "strokeColor": "#a855f7", "strokeWidth": 1, "dashed": true },
    "reference": { "strokeColor": "#7c3aed", "strokeWidth": 1.5 },
    "clusterRelation": { "strokeColor": "#a855f7", "strokeWidth": 1.5 }
  },
  "arrow": { "markerWidth": 7, "markerHeight": 7 }
}
```

Want objects to render as squares instead of hexagons, Object References to be thicker, or a different accent color? Edit that file directly — nothing else needs to change. `nodes` is per node category; `edges` is per relation *kind* — `convert()` stamps `data.kind` (`structure`/`tag`/`galaxy`/`reference`/`clusterRelation`) on every edge it creates, and `getDefaultEdgeStyle()`'s `styleCb` reads it back to pick the right entry, falling back to `default`. `arrow` resizes the built-in arrowhead marker — mind the aspect ratio if you change it (width and height scale together for a normal-looking triangle). (Watch node `size` if you pick `triangle`, though — Pivotick sizes the icon at `size * 1.4` regardless of shape, and a triangle's usable inner area is much smaller than a circle/square/hexagon's at the same `size`, so an icon tuned for those will visibly overflow a triangle's edges. `circle`/`square`/`hexagon` are all safe at normal sizes.)

The specific icon per key (`domain` vs `ip-dst` vs `md5`, ...) comes from [`src/icons.generated.ts`](./src/icons.generated.ts) instead — that one **is** machine-generated (by `scripts/sync-icons.mjs` from the vendored `misp-iconify` submodule) and shouldn't be hand-edited. Galaxy cluster icons specifically trace back to each galaxy's own `icon` field in [misp-galaxy](https://github.com/MISP/misp-galaxy) (e.g. `threat-actor.json` declares `"icon": "user-secret"`) — misp-iconify converts that Font Awesome name into the SVG we actually ship, so this is the galaxy's own defined icon, not a substitute.

Tag colour is the Tag's own `colour` if the input set one (the normal case — MISP's backend already resolves and embeds the taxonomy colour when a tag gets applied), falling back to the colour [misp-taxonomies](https://github.com/MISP/misp-taxonomies) itself declares for that machine tag (`tlp:red` → `#FF2B2B`, ...) when it didn't — see [`src/mispTagColor.ts`](./src/mispTagColor.ts) and [`src/taxonomyColors.generated.ts`](./src/taxonomyColors.generated.ts) (machine-generated by `scripts/sync-taxonomies.mjs` from the vendored `misp-taxonomies` submodule, 572 entries — most taxonomy entries don't declare a colour at all, so this is intentionally sparse). Custom/local tags with no taxonomy behind them fall back to no colour, which is correct — there isn't one to find.

One exception: a Tag named `misp-galaxy:<type>="<value>"` (this is literally `GalaxyCluster.tag_name` — MISP tags a galaxy cluster association this way as often as, or instead of, the structured `Galaxy`/`GalaxyCluster` arrays `addGalaxies` handles) is styled and iconed as `galaxies/<type>` — same purple squares and misp-iconify icons as a "real" GalaxyCluster node, ignoring its own `colour` — rather than as a generic tag. It's deduped by tag name, not cluster id, so the rare case of the same cluster appearing both as a Tag and in the structured arrays ends up as two nodes, not merged into one.

For anything beyond `styles.json`, override the returned render options yourself — they're plain objects:

```ts
const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
new Pivotick(container, data, {
  render: { ...render, nodeStyleMap: { ...render.nodeStyleMap, domain: { color: 'red' } } },
})
```
