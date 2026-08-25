# Pivotick Graph Transformer

Format converters that turn third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

## Goal

This repo is meant to be consumed as a **git submodule** directly inside Pivotick (or any other consumer), importing the TypeScript source by relative path. No npm package, no build/publish step for the library itself.

npm is only used locally for a small demo/test site — not for the library.

## Demo

```
cd demo && npm run dev
```

Opens a real Pivotick instance rendering whatever converter output this repo currently produces. A floating panel (bottom-right, draggable, collapsible) lets you pick any fixture under `demo/fixtures/misp/**` and toggle dark/light theme — both re-render immediately.

`demo/src/main.ts`'s `simulation` block pushes `d3LinkDistance`/`d3ManyBodyStrength`/`d3CollideRadiusMultiplier` well past Pivotick's own UI-slider ceiling — its defaults assume small native shapes, and our custom html cards (Event/Object/Attribute/Tag/Galaxy) run much bigger with many more children per node than that, so the defaults clump everything into an unreadable pile without this. **Revisit/remove this tuning if Pivotick itself ever gets a fix that sizes its own physics off a node's actual rendered footprint** (e.g. a custom `html` node) instead of a generic default — at that point this workaround would just be fighting a problem Pivotick no longer has.

## MISP concepts to implement

The MISP importer converts one MISP concept at a time into nodes/edges + curated properties-panel fields. Each concept gets its own folder under `packages/misp/src/` (`event/`, `attribute/`, `object/`, ...) with a `fields.ts` (which raw fields to show, in what order) and a `formatters.ts` (how to make them readable — reusing `shared/formatters.ts` for anything more than one concept needs, e.g. epoch timestamps or distribution codes). Status of each concept in MISP's own data model:

- [x] **Event** — root node; Org/Orgc resolved to their name, timestamps made readable, distribution/sharing_group_id made readable (see `packages/misp/src/event/`)
- [x] **Object** (e.g. `file`, `domain-ip`, ...) — curated fields (id/uuid/name/category/description/comment/timestamp/first_seen/last_seen/distribution/sharing_group_id), including MISP's `5` = "Inherit event" distribution level (see `packages/misp/src/object/`)
- [x] **Attribute** — value is the card's title, type is a small badge underneath (with its own misp-iconify icon per type), curated fields (id/uuid/category/object_relation/to_ids/comment/timestamp/first_seen/last_seen/distribution/sharing_group_id) (see `packages/misp/src/attribute/`)
- [x] **Tag** — renders as a colour-filled chip (its own name, text auto black/white for contrast) rather than an icon card; one shared node per tag id even when the same tag is attached to the Event and many of its Attributes/Objects (see `packages/misp/src/tag/`)
- [x] **Galaxy / Galaxy Cluster** — MITRE ATT&CK, threat actors, malware families, tools, ...; driven by an entity's own structured `Galaxy` array (independent of any matching `is_galaxy` Tag, which still renders separately as a plain Tag chip): entity -> "Galaxy clusters" -> one shared node per galaxy type -> one shared pill per cluster, coloured via a deterministic hash of the galaxy's *name* ported from MISP's own Overmind theme (see `packages/misp/src/galaxy/`)
- [ ] **Sighting** — sighting/false-positive counts and timestamps on an Attribute
- [ ] **Organisation** (`Org`/`Orgc`) — currently only surfaced as a resolved `org`/`orgc` name on the Event; not a node of its own yet
- [ ] **Sharing Group** — currently only a readable label on the Event; not a node of its own (no name/org members resolved)
- [ ] **EventReport** — freeform narrative report(s) attached to an Event
- [ ] **Correlation** — attributes shared across different Events (the actual cross-event edges)
- [ ] **Analyst Data** (Note / Opinion / Relationship) — MISP's newer annotation layer on top of any of the above
- [ ] **Feed** — the external source an Event/Attribute was pulled from
- [ ] **Warninglist match** — a flag on an Attribute noting it matched a known false-positive list

## Boundary: we never modify Pivotick

Pivotick itself (vendored in `demo/vendor/pivotick/`) is treated as read-only. This project only ever produces the `nodes`/`edges` data and the options passed into `new Pivotick(container, data, options)` — theming, node appearance, what shows in the properties panel, and so on are all driven through Pivotick's own public options (its `theme` option, per-node `data`/`style`, `nodePropertiesMap`, ...), never by patching Pivotick's source or CSS.

## License

MIT
