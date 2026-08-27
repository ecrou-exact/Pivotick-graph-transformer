# Pivotick Graph Transformer

<img src="demo/static/images/logo.jpeg" alt="Pivotick Graph Transformer logo" width="120" />

Format converters that turn third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

This repo has no npm package and no build step for the library itself — it's meant to be added as a **git submodule** directly inside a Pivotick-based app, which then imports the TypeScript source by relative path. npm is only used locally, for the small demo/docs site under `demo/` — never for the library.

## Getting started

### Installation

Add it as a submodule, and pull in its own submodule too (the vendored [misp-iconify](https://github.com/MISP/misp-iconify) icon set):

```
git submodule add https://github.com/ecrou-exact/pivotick-graph-transformer.git vendor/pivotick-graph-transformer
git submodule update --init --recursive
```

### Usage in your code

Importing a format's package (e.g. `packages/misp/src/index`) registers its converter with the shared `GraphRegistry`. Convert your source JSON to get the exact `{ nodes, edges }` shape Pivotick's own constructor expects, and hand that straight to it:

```ts
import { Pivotick } from 'pivotick'
import { GraphRegistry } from './vendor/pivotick-graph-transformer/packages/core/src/index'
import './vendor/pivotick-graph-transformer/packages/misp/src/index' // registers the MISP importer

const mispEvent = { Event: { /* ...your MISP Event export... */ } }

// { nodes, edges } — ready to hand straight to Pivotick.
const data = GraphRegistry.getImporter('misp').convert(mispEvent, { theme: 'light' })

new Pivotick(document.getElementById('app'), data, {
  isDirected: true,
  render: { type: 'svg' },
  layout: { type: 'force' },
  UI: { theme: 'light' } // Pivotick reads its own theme from here, not a top-level `theme`
})
```

## Demo & Docs

```
cd demo && npm run dev
```

Three pages, all built against whatever converter output this repo currently produces:

- **Home** (`/index.html`) — the landing page, explaining the project and linking into the other two. Kept at `index.html` deliberately, so it's what GitHub Pages' project root serves.
- **Demo** (`/demo.html`) — a real, full-UI Pivotick instance. A floating panel (bottom-right, draggable, collapsible) lets you pick any fixture under `demo/fixtures/misp/**` and toggle dark/light theme.
- **Docs** (`/docs.html`) — one section per MISP concept (Event, Object, Attribute, Tag, Galaxy, Sighting), each pairing a small hand-written fixture (`demo/fixtures-docs/`) with a live "basic" Pivotick preview and a plain-language breakdown of that concept's color/icon/shape rules.

Dark/light is shared across all three pages (persisted in `localStorage`, see `demo/src/theme.ts`).

The Demo page leaves Pivotick's own physics defaults untouched. The Docs page's small previews use Pivotick's own "loose" preset instead (`demo/src/pivotick.ts`'s `LOOSE_SIMULATION`), translated to raw d3-force values.

## MISP concepts to implement

The MISP importer converts one MISP concept at a time into nodes/edges + curated properties-panel fields. Each concept gets its own folder under `packages/misp/src/` (`event/`, `attribute/`, `object/`, ...) with a `fields.ts` (which raw fields to show, in what order) and a `formatters.ts` (how to make them readable — reusing `shared/formatters.ts` for anything more than one concept needs, e.g. epoch timestamps or distribution codes). Status of each concept in MISP's own data model:

- [x] **Event** — root node; Org/Orgc resolved to their name, timestamps made readable, distribution/sharing_group_id made readable (see `packages/misp/src/event/`)
- [x] **Object** (e.g. `file`, `domain-ip`, ...) — curated fields (id/uuid/name/category/description/comment/timestamp/first_seen/last_seen/distribution/sharing_group_id), including MISP's `5` = "Inherit event" distribution level (see `packages/misp/src/object/`)
- [x] **Attribute** — value is the card's title, type is a small badge underneath (with its own misp-iconify icon per type), curated fields (id/uuid/category/object_relation/to_ids/comment/timestamp/first_seen/last_seen/distribution/sharing_group_id) (see `packages/misp/src/attribute/`)
- [x] **Tag** — renders as a colour-filled chip (its own name, text auto black/white for contrast) rather than an icon card; one shared node per tag even when the same tag is attached to the Event and many of its Attributes/Objects — deduplicated by `id`, falling back to `name` when a MISP export omits it (see `packages/misp/src/tag/`)
- [x] **Galaxy / Galaxy Cluster** — MITRE ATT&CK, threat actors, malware families, tools, ...; driven by an entity's own structured `Galaxy` array (independent of any matching `is_galaxy` Tag, which still renders separately as a plain Tag chip): entity -> "Galaxy clusters" -> one shared node per galaxy type -> one shared pill per cluster, coloured via a deterministic hash of the galaxy's *name* ported from MISP's own Overmind theme (see `packages/misp/src/galaxy/`)
- [x] **Sighting** — summarized into one "Sightings" node per Attribute (count/false-positive/expiration breakdown, first/last seen, reporting orgs) rather than one node per Sighting, since a popular indicator can have dozens (see `packages/misp/src/sighting/`)
- [ ] **Organisation** (`Org`/`Orgc`) — currently only surfaced as a resolved `org`/`orgc` name on the Event; not a node of its own yet
- [ ] **Sharing Group** — currently only a readable label on the Event; not a node of its own (no name/org members resolved)
- [ ] **EventReport** — freeform narrative report(s) attached to an Event
- [ ] **Correlation** — attributes shared across different Events (the actual cross-event edges)
- [ ] **Analyst Data** (Note / Opinion / Relationship) — MISP's newer annotation layer on top of any of the above
- [ ] **Feed** — the external source an Event/Attribute was pulled from
- [ ] **Warninglist match** — a flag on an Attribute noting it matched a known false-positive list

## Boundary: we never modify Pivotick

Pivotick itself (vendored in `demo/vendor/pivotick/`) is treated as read-only. This project only ever produces the `nodes`/`edges` data and the options passed into `new Pivotick(container, data, options)` — theming, node appearance, what shows in the properties panel, and so on are all driven through Pivotick's own public options (its `UI.theme` option, per-node `data`/`style`, `nodePropertiesMap`, ...), never by patching Pivotick's source or CSS.

## License

MIT
