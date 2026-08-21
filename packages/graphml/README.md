# pivotick-transformer-graphml

Exports Pivotick's `nodes` / `edges` shape — this repo's [`ConversionResult`](../core/src/types.ts), the same thing every converter in this monorepo already produces — to [GraphML](http://graphml.graphdrawing.org/), with visual styling via the [yFiles GraphML extension](https://docs.yworks.com/yfileshtml/#/dguide/graphml) yEd and most other GraphML tools read for actual rendering (plain GraphML itself has no visual vocabulary of its own).

Like [`pivotick-transformer-dot`](../dot), this is the opposite direction from every `pivotick-transformer-<format>` package here — those turn a third-party format *into* Pivotick's shape; this turns Pivotick's shape *into* a third-party format. It doesn't extend `GraphConverter` or register with `ConverterRegistry` for that reason.

## Usage

```ts
import { toGraphML } from 'pivotick-transformer-graphml'

const graphml = toGraphML({
  nodes: [{ id: 'a', data: { label: 'Alice' } }, { id: 'b', data: { label: 'Bob' } }],
  edges: [{ from: 'a', to: 'b', data: { label: 'knows' } }],
}, {
  nodeStyle: () => ({ shape: 'ellipse', fillColor: '#1f6feb' }),
  nodePosition: (node) => ({ x: node.id === 'a' ? 0 : 120, y: 0 }),
})
```

## Options

All optional, passed as a second argument:

| option | default | effect |
|---|---|---|
| `directed` | `true` | `edgedefault="directed"` vs `"undirected"` — matches Pivotick's own `isDirected` default |
| `graphId` | `'G'` | the `<graph>` element's own `id` (cosmetic only) |
| `nodeLabel(node)` | `node.data.label` if a string | a node's label |
| `nodeStyle(node)` | — | `{ shape, fillColor, borderColor, borderWidth, width, height }` — omit for a plain, unstyled node |
| `nodePosition(node)` | — | `{ x, y }` — see "Layout" below |
| `nodeData(node)` | — | extra plain-string `<data>` fields beyond `label`, e.g. an icon |
| `edgeLabel(edge)` | `edge.data.label` if a string | an edge's label |
| `edgeStyle(edge)` | — | `{ color, width, dashed, arrow }` |
| `includeChildEdges` | `true` | see "Scope and limits" below |

## Layout

Unlike DOT/Graphviz, GraphML carries no layout engine of its own — a `y:ShapeNode` needs a real `y:Geometry x/y/width/height` to show up somewhere sensible; a reader with none to go on typically either auto-layouts on load or stacks every node at the origin. Computing that position isn't this package's job (it has no opinion on *how* — force-directed, hierarchical, ...) — pass it in via `nodePosition`.

## Scope and limits

- **`RawNode.children`** (Pivotick's own expand/collapse nesting) has no GraphML equivalent, so it's flattened the same way `pivotick-transformer-dot` does: every child becomes an ordinary top-level `<node>`, plus a synthetic dashed edge from parent to child recording the relationship. Set `includeChildEdges: false` to flatten silently instead.
- **Icons** have no yFiles-standard element this package relies on — encode one via `nodeData`'s generic `<data>` mechanism instead (any string works; a consumer decides what to do with it). yEd itself won't render it, but a consumer that generated the file — same process that already knows what the icon should look like — can read it straight back out.
