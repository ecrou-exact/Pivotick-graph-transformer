# pivotick-transformer-misp

Converts [MISP](https://www.misp-project.org/) Events and Objects into Pivotick's `nodes` / `edges` shape.

> **Status**: first pass. `event-root` maps each Event's top-level Attributes, Objects (with their nested Attributes) and explicit Object References, plus Tags and Galaxy/GalaxyCluster wherever MISP allows them (Event, Attribute, Object) — deduped by tag name / cluster id, so a tag reused across many entities is one node with many edges, not a duplicate per entity. Standalone Objects root themselves. Sighting isn't mapped yet — see the `// TODO` in [`src/MispEventRootConverter.ts`](./src/MispEventRootConverter.ts).

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

`getDefaultStyleMap()` ships a real icon (inline SVG, via Pivotick's `NodeStyle.svgIcon` — see [`../../docs/icons-and-styling.md`](../../docs/icons-and-styling.md) for why that's the mechanism, not `iconClass`) for every attribute type / object / galaxy cluster type [misp-iconify](https://github.com/MISP/misp-iconify) covers (410 keys), falling back to shape/color only for the rest. Every node also shows its label (Event `info`, Attribute `value`, Tag `name`, ...) as text on the node itself, via `NodeStyle.text`.

**Shape and color are configuration, not code** — [`src/styles.json`](./src/styles.json) is a small, hand-maintained file, one entry per category:

```json
{
  "event": { "shape": "hexagon", "color": "#1f6feb", "size": 28 },
  "tag": { "shape": "circle", "size": 10 },
  "attribute": { "shape": "circle", "color": "#0ea5e9", "size": 14 },
  "object": { "shape": "hexagon", "color": "#7c3aed", "size": 18 },
  "galaxyCluster": { "shape": "triangle", "color": "#f59e0b", "size": 11 },
  "generic": { "shape": "circle", "color": "#64748b", "size": 12 }
}
```

Want objects to render as squares instead of hexagons, or a different accent color? Edit that file directly — nothing else needs to change. (Keep an eye on `size` if you pick a shape with a tight inner area relative to its outline, like `triangle` — Pivotick sizes the icon at `size * 1.4` regardless of shape, so a size tuned for a circle's icon will visibly overflow a triangle's edges; `galaxyCluster`'s smaller `size` above is deliberately compensating for exactly that.)

The specific icon per key (`domain` vs `ip-dst` vs `md5`, ...) comes from [`src/icons.generated.ts`](./src/icons.generated.ts) instead — that one **is** machine-generated (by `scripts/sync-icons.mjs` from the vendored `misp-iconify` submodule) and shouldn't be hand-edited.

For anything beyond `styles.json`, override the returned `nodeStyleMap` yourself — it's a plain object:

```ts
const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)
new Pivotick(container, data, {
  render: { ...render, nodeStyleMap: { ...render.nodeStyleMap, domain: { color: 'red' } } },
})
```
