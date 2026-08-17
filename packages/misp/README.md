# pivotick-transformer-misp

Converts a [MISP](https://www.misp-project.org/) Event into Pivotick's `nodes` / `edges` shape.

> **Status**: scaffolding only. `detect()` and `convert()` are stubbed with `// TODO` — see [`src/MispEventRootConverter.ts`](./src/MispEventRootConverter.ts).

## Input

Expects a MISP Event JSON object (`MispEvent`, currently a placeholder type — see [`src/types.ts`](./src/types.ts)).

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
