# Pivotick Graph Transformer

**One place for the format converters every [Pivotick](https://github.com/pivotick/pivotick) integrator ends up writing anyway.**

## The problem

Every tool that adopts Pivotick to visualize a graph ends up writing the same kind of code: a converter from its own data format into the `nodes` / `edges` shape Pivotick expects.

- MISP has to turn a MISP Event (Attributes, Objects, Object References) into Pivotick nodes and edges.
- A STIX-based tool has to turn a STIX bundle (SDOs, SROs) into the same shape.
- A VirusTotal Graph integration has to do the same for VT Graph entities and relationships.

Same problem, solved independently, over and over, by teams that never talk to each other.

## The idea

A single, community-maintained collection of format converters, all implementing the same small interface, all producing output that plugs directly into Pivotick. Write (or contribute) a converter once — every tool using that data format benefits.

## Status

Early scaffolding. The core converter interface and registry are in place (`packages/core`). Format-specific converters (MISP first) are not implemented yet — contributions welcome, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Packages

| Package | Description |
|---|---|
| [`packages/core`](./packages/core) | `GraphConverter` base class + `ConverterRegistry`. No format-specific logic. |
| `packages/misp` | *(planned)* MISP Event → Pivotick |

## How it will look for consumers

```ts
import { Pivotick } from 'pivotick'
import { ConverterRegistry } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp' // registers itself

const { data, render } = ConverterRegistry.get('misp').toPivotickOptions(mispEventJson)

new Pivotick({
  container: document.getElementById('app'),
  data,
  options: { render },
})
```

One call gets you both the graph data *and* a matching node style map — no manual wiring required.

## Development

```bash
npm install       # install all workspaces
npm run build     # tsc build for every workspace package
npm run lint       # ESLint across every workspace package
```

## Contributing

Adding a new format converter should be as close to "write one class" as possible. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the step-by-step guide, and [CLAUDE.md](./CLAUDE.md) / [AGENTS.md](./AGENTS.md) for the architecture reference used by AI coding agents working in this repo.

## License

MIT
