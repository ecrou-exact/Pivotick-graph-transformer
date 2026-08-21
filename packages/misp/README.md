# pivotick-transformer-misp

Converts [MISP](https://www.misp-project.org/) Events and Objects into Pivotick's `nodes` / `edges` shape.

> **Status**: `event-root` maps each Event's top-level Attributes, Objects (with their nested Attributes, each Attribute's `object_relation` shown as the edge label) and explicit Object References, Tags and Galaxy/GalaxyCluster wherever MISP allows them (Event, Attribute, Object) — deduped by tag name / cluster id, so a tag reused across many entities is one node with many edges, not a duplicate per entity — plus GalaxyClusterRelation as extra edges between the clusters themselves (MISP's own cluster-to-cluster graph, e.g. a threat-actor cluster "uses" a malware cluster — distinct from an Object Reference). Standalone Objects root themselves. Sighting is aggregated into a count on the Attribute's node data, not rendered as its own nodes. Field shapes are checked against PyMISP's actual class definitions (`pymisp/mispevent.py`, `pymisp/abstract.py`) and real example exports, not guessed — see [`src/shared/types.ts`](./src/shared/types.ts).

## Input

Accepts any of the shapes MISP actually exports things in — see [`normalizeMispInput.ts`](./src/shared/normalizeMispInput.ts), which every variant's `detect()`/`convert()` shares:

- a single Event: `{ Event: { uuid, info, Attribute?, Object? } }`
- an Event with no wrapper — its fields directly at the top level, `{ uuid, info, Attribute?, Object? }` — the shape `pymisp`'s `MISPEvent.to_json()` actually produces
- a bare list of Events: `[{ Event: {...} }, { Event: {...} }]`
- a `restSearch`-style API response: `{ response: [{ Event: {...} }, ...] }`
- a standalone Object, wrapped (`{ Object: { uuid, name, Attribute? } }`) or bare (`{ uuid, name, Attribute? }`), exported on its own outside any Event
- a list of standalone Objects, or a mix of Events and Objects in one array

All Events/Objects found in one input land in the same graph. See [`src/shared/types.ts`](./src/shared/types.ts) for the full field shapes this converter reads, and `demo/fixtures/misp/` in the repo root for a worked example of each case.

## Variants

| id | name | description |
|---|---|---|
| `event-root` (default) | Event as root node | The Event is a cluster node; Attributes and Objects are its children, all rendered as flat, always-visible nodes. |
| `event-root-simplified` | Event as root node (simplified) | Same entities/relationships as `event-root`, but each Object nests its own Attributes as collapsed children — see below. |
| `event-root-overview` | Event as root node (overview) | Attributes are omitted entirely — only Events, Objects, Tags, and Galaxy Clusters appear. No expand/collapse; the fewest nodes possible while still telling a coherent story — see below. |
| `event-root-minimal` | Event as root node (minimal) | Just the Events, as points — plus a direct edge between any two Events that explicitly extend one another or share a Tag/Galaxy Cluster, labeled with what they share. Nothing else is ever shown — see below. |
| `indicator-correlation` | Indicator correlation | Attributes are deduplicated by type+value across the whole input, so the same indicator seen in multiple Events becomes one shared node — a pivot/correlation view instead of one Event at a time. Events and Objects are satellites, not the graph's hub — see below. |

A future `object-refs-only` variant (no Event node, edges only from explicit Object References) is planned — see the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md#multiple-variants-for-the-same-format).

### `event-root-simplified`: an Object's Attributes collapse by default

A MISP Object (`file`, `domain-ip`, ...) can easily carry dozens of Attributes, which makes `event-root`'s always-fully-expanded flat layout hard to read at a glance. `event-root-simplified` maps the exact same entities and relationships, but an Object's own Attributes are nested directly as [`RawNode.children`](../core/src/types.ts) on that Object, with `expanded: false` — Pivotick's own built-in expand/collapse feature (a small "+" control; click it to reveal that Object's Attributes, "−" to collapse them again).

This is deliberately scoped to *only* Object → Attribute: an Event's own top-level Attributes/Objects are usually few enough to read directly, so the Event node stays flat/always-expanded, exactly like `event-root`, with no "+" control of its own. So a MISP Event with 3 Objects, each holding 20 Attributes, still shows the Event and all 3 Objects immediately (4 nodes) — only each Object's 20 Attributes start collapsed behind its own "+", one Object at a time. Nothing about the graph's *data* changes — same nodes, same edges, same styling (`MispIconRenderingConverter`, shared by both variants) — only which nodes start visible.

Tags and Galaxy Clusters are the one exception: they always stay flat, deduplicated nodes connected by an ordinary edge in both variants, never nested as `children` — a node can only be nested under one parent in Pivotick's model, but the same tag (e.g. `tlp:white`) routinely attaches to many different entities, and nesting it would force either duplicating it per parent or picking one arbitrary "owner." Pivotick still re-anchors a Tag/Cluster's edge sensibly when its target is currently hidden inside a collapsed ancestor.

### `event-root-overview`: no Attributes at all

The coarsest mapping — the fewest nodes that still tell a coherent story, with no expand/collapse anywhere. Attributes (the raw indicator values — IPs, hashes, domains, ...) are dropped entirely: not rendered, not collapsed, not counted as nodes at all. Only the "big picture" entities remain: Events, Objects, Tags, and Galaxy Clusters (threat actor / malware / campaign classifications) — narrative context, without every raw IOC cluttering the canvas.

An Object's `attributeCount`/`tagCount` are still carried on its node data (visible in the sidebar/tooltip) even though the Attributes themselves never become nodes — "how much detail did this collapse" stays answerable without rendering it. An Attribute's *own* Tags are the one thing this variant genuinely can't show (there's no Attribute node for them to attach to), and an Object Reference whose target is an Attribute silently doesn't resolve to any edge — both an accepted trade-off of "fewest nodes possible."

### `event-root-minimal`: just Events, as points, linked when related

The smallest graph this converter can produce: one point per Event (or per standalone Object, when there's no Event). Nothing else ever becomes a node — no Object, Attribute, Tag, or Galaxy Cluster. Every one of those is only ever used to decide *whether two Events should be linked*, then discarded.

Two Events get a direct edge when:

- one explicitly `extends` the other (MISP's own `extends_uuid` field — a real, directed relationship, so it keeps its arrowhead), or
- they share at least one Tag name, anywhere in either Event (its own Tags, or any of its Objects'/Attributes' Tags), or
- they share at least one Galaxy Cluster (by id), anywhere in either Event, same reach as Tags.

One edge per distinct shared item, not one generic "related" edge — each is labeled with the actual tag name or cluster value, so *why* two Events are linked stays inspectable without adding a single extra node. If Event A and Event B are both tagged `tlp:white` and both carry the same "Cobalt Strike" cluster, that's two edges between them, not one.

`attributeCount`/`objectCount`/`tagCount` on the Event's node data are still totals across the *whole* Event, same spirit as `event-root-overview`, even though none of it becomes a node. Correlation is scoped to Event ↔ Event only — a standalone Object still gets its own point (there's nothing else to represent it by), but never links to anything.

### `indicator-correlation`: no Event in the middle — pivot on shared indicators instead

Every other variant is rooted on the Event: Attributes are keyed by their own uuid, so the same indicator value repeated in two different Events becomes two disconnected nodes, one per Event, even though it's genuinely the same IOC. `indicator-correlation` maps the exact same entities, but deduplicates Attributes by `type` + `value` — MISP's own correlation key (the "Attribute is also in other events" feature in MISP's own UI) — instead of by uuid. The same `ip-dst` value seen in three Events becomes *one* shared node with an edge to each Event/Object that carries it, so shared infrastructure/indicators become the graph's actual connective tissue instead of invisible coincidences. Events and Objects are satellites around whichever indicators connect them — the opposite emphasis from every `event-root*` variant, better for pivot-style investigation ("where else has this hash shown up") than for reading one Event's own story.

This is a simplification of MISP's real correlation engine, which also accounts for warninglists and type-compatible cross-matching (e.g. `domain` vs `hostname`) — here it's a plain exact `(type, value)` match, nothing fuzzier. When the same value repeats, only the *first* occurrence's `category`/`objectRelation`/`toIds`/`comment`/`sightingCount` are kept on the shared node (later occurrences might disagree on these — MISP's own correlation UI has the same limit, showing one canonical record plus "also seen elsewhere"); a running `occurrenceCount` on the node counts every occurrence, and the rendered badge shows it directly (e.g. "ip-dst · in 3 events") whenever it's more than 1. Tags/Galaxies on a since-merged Attribute all attach to the one shared node, deduplicated the same way `event-root` dedupes Tags/Clusters — so a `tlp:red` tag in Event A and a `tlp:white` tag on the same value in Event B both end up as edges from the one indicator node, which is the correct (if occasionally contradictory-looking) picture of what the raw data actually says.

## Usage

```ts
import { ConverterRegistry } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp'

const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
```

No second import needed for icons — see below.

## Icons and styling

`getDefaultStyleMap()` ships a real icon (inline SVG, via Pivotick's `NodeStyle.svgIcon` — see [`../../docs/icons-and-styling.md`](../../docs/icons-and-styling.md) for why that's the mechanism, not `iconClass`) for every attribute type / object / galaxy cluster type [misp-iconify](https://github.com/MISP/misp-iconify) covers (410 keys), falling back to shape/color only for the rest. Node labels aren't shown as on-canvas text on purpose — with icons already carrying the type and hundreds of nodes on screen at once, that's clutter, not signal; `node.data.label` is still there for the sidebar/tooltip. Edges carry the actually-interesting labels instead: an Object Reference's `relationship_type`, an Object Attribute's `object_relation`, a GalaxyClusterRelation's type.

**Shape, color, and edge styling are configuration, not code** — [`src/shared/styles.json`](./src/shared/styles.json) is a small, hand-maintained file:

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

The specific icon per key (`domain` vs `ip-dst` vs `md5`, ...) comes from [`src/shared/icons.generated.ts`](./src/shared/icons.generated.ts) instead — that one **is** machine-generated (by `scripts/sync-icons.mjs` from the vendored `misp-iconify` submodule) and shouldn't be hand-edited. Galaxy cluster icons specifically trace back to each galaxy's own `icon` field in [misp-galaxy](https://github.com/MISP/misp-galaxy) (e.g. `threat-actor.json` declares `"icon": "user-secret"`) — misp-iconify converts that Font Awesome name into the SVG we actually ship, so this is the galaxy's own defined icon, not a substitute.

Tag colour is the Tag's own `colour` if the input set one (the normal case — MISP's backend already resolves and embeds the taxonomy colour when a tag gets applied), falling back to the colour [misp-taxonomies](https://github.com/MISP/misp-taxonomies) itself declares for that machine tag (`tlp:red` → `#FF2B2B`, ...) when it didn't — see [`src/shared/mispTagColor.ts`](./src/shared/mispTagColor.ts) and [`src/shared/taxonomyColors.generated.ts`](./src/shared/taxonomyColors.generated.ts) (machine-generated by `scripts/sync-taxonomies.mjs` from the vendored `misp-taxonomies` submodule, 572 entries — most taxonomy entries don't declare a colour at all, so this is intentionally sparse). Custom/local tags with no taxonomy behind them fall back to no colour, which is correct — there isn't one to find.

One exception: a Tag named `misp-galaxy:<type>="<value>"` (this is literally `GalaxyCluster.tag_name` — MISP tags a galaxy cluster association this way as often as, or instead of, the structured `Galaxy`/`GalaxyCluster` arrays `addGalaxies` handles) stays a tag structurally — same shape/size as any other tag — but its `color` and icon are overridden to the galaxy category's purple and the galaxy's own misp-iconify icon, ignoring its own `colour`, so it reads as "a tag, but a galaxy one" rather than a generic one. It's deduped by tag name, not cluster id, so the rare case of the same cluster appearing both as a Tag and in the structured arrays ends up as two nodes, not merged into one.

### Four node looks: `card`, `flat`, `label`, `icon`

`ConverterOptions.style` picks how every node is actually drawn — a pure rendering choice, not a variant (every variant's underlying nodes/edges are identical no matter which one is picked; see `MispIconRenderingConverter`, shared by every variant):

- `'card'` (the default, or when unset) — a white card, a coloured border, and a boxed icon token: the original look.
- `'flat'` — a soft colour-tinted chip with a circular icon avatar and a coloured left accent bar, no border/shadow beyond a thin neutral hairline; a calmer, more compact alternative that leans on tint instead of an outline to carry each kind's colour.
- `'label'` — just the icon token and the node's name side by side, nothing else: no kind chip, no secondary line, no card/tint/border at all.
- `'icon'` — the icon token alone, no text whatsoever: the smallest possible representation of a node.

```ts
const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson, { style: 'flat' })
```

All four read the exact same `icons.nodes`/`kinds` colour-and-icon mapping from `styles.json` — only the shell around that colour/icon differs, so switching styles never changes what a colour or icon *means*, just how it's drawn.

`flat`'s own layout numbers (chip sizes, tint opacity, accent width) live in a second, `badge`-only config, [`src/shared/styles.flat.json`](./src/shared/styles.flat.json) — edit that file to tune `flat` mode without touching `card`'s own `styles.json`. `flat` also sidesteps `card`'s light/dark text-contrast branching entirely: a light tint of any colour (even a near-white one like `tlp:white`) is always light enough for the fixed dark title text to read clearly, so there's no `contrastTextColor()`-style special-casing to get right.

`label` and `icon` share one function and one config, [`src/shared/styles.minimal.json`](./src/shared/styles.minimal.json) — `icon` is exactly `label` with the text half omitted, not a separate implementation. Both also differ from `card`/`flat` in one more way: **Tags don't get their own pill shape** at this level of minimalism — a Tag renders through the same generic icon-token-plus-optional-label function as every other entity type, since there's no room left for a Tag-specific treatment to add anything once everything else is already this plain.

For anything beyond these JSON files, override the returned render options yourself — they're plain objects:

```ts
const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
new Pivotick(container, data, {
  render: { ...render, nodeStyleMap: { ...render.nodeStyleMap, domain: { color: 'red' } } },
})
```
