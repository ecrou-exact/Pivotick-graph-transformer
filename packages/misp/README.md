# pivotick-transformer-misp

Converts [MISP](https://www.misp-project.org/) Events and Objects into Pivotick's `nodes` / `edges` shape.

> **Status**: first pass. `event-root` maps each Event's top-level Attributes, Objects (with their nested Attributes) and explicit Object References; standalone Objects root themselves. Tag / Galaxy / Sighting aren't mapped yet — see the `// TODO` in [`src/MispEventRootConverter.ts`](./src/MispEventRootConverter.ts).

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
