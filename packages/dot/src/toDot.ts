import type { ConversionResult, RawEdge, RawNode } from 'pivotick-transformer-core'

import { formatDotId, quoteDotString } from './dotId.js'

export interface DotExportOptions {
  /** `digraph` with `->` edges, or `graph` with `--` edges. Defaults to `true` — matches Pivotick's own `isDirected` default. */
  directed?: boolean
  /** The graph's own DOT identifier — cosmetic only, doesn't affect rendering. Defaults to `'G'`. */
  graphName?: string
  /**
   * Derives a node's `label` attribute. Defaults to `node.data.label` when
   * it's a string (the convention every converter in this repo already
   * follows) — return `undefined` to leave a node unlabeled (Graphviz then
   * falls back to showing its id).
   */
  nodeLabel?: (node: RawNode) => string | undefined
  /**
   * Extra DOT attributes for a node, e.g. `{ shape: 'box' }`. Values are
   * always quoted in the output, which is valid DOT for every attribute.
   * A `label` key here is taken as-is instead of the `nodeLabel` result.
   */
  nodeAttributes?: (node: RawNode) => Record<string, string> | undefined
  /** Same as `nodeLabel`, for edges — defaults to `edge.data.label`. */
  edgeLabel?: (edge: RawEdge) => string | undefined
  /** Same as `nodeAttributes`, for edges. */
  edgeAttributes?: (edge: RawEdge) => Record<string, string> | undefined
  /**
   * Pivotick's `RawNode.children` (its built-in expand/collapse nesting)
   * has no DOT equivalent to fall back on automatically, so it's flattened
   * into ordinary nodes plus a synthetic `style="dashed"` edge from parent
   * to child recording the relationship. Set to `false` to flatten
   * silently instead, with no synthetic edge. Defaults to `true`.
   */
  includeChildEdges?: boolean
}

function defaultNodeLabel(node: RawNode): string | undefined {
  const label = node.data?.label
  return typeof label === 'string' ? label : undefined
}

function defaultEdgeLabel(edge: RawEdge): string | undefined {
  const label = edge.data?.label
  return typeof label === 'string' ? label : undefined
}

function formatAttributes(attrs: Record<string, string>): string {
  const entries = Object.entries(attrs)
  if (entries.length === 0) return ''
  return ` [${entries.map(([key, value]) => `${key}=${quoteDotString(value)}`).join(', ')}]`
}

/**
 * Renders Pivotick's `{ nodes, edges }` shape (this repo's `ConversionResult`
 * — every converter here already produces it) as Graphviz DOT source,
 * per https://graphviz.org/doc/info/lang.html.
 */
export function toDot(data: ConversionResult, options: DotExportOptions = {}): string {
  const directed = options.directed ?? true
  const includeChildEdges = options.includeChildEdges ?? true
  const edgeOp = directed ? '->' : '--'

  const lines: string[] = []
  const seenNodeIds = new Set<string>()

  const emitNode = (node: RawNode, parentId?: RawNode['id']): void => {
    const id = String(node.id)
    if (!seenNodeIds.has(id)) {
      seenNodeIds.add(id)
      const attrs = { ...(options.nodeAttributes?.(node) ?? {}) }
      if (attrs.label === undefined) {
        const label = (options.nodeLabel ?? defaultNodeLabel)(node)
        if (label !== undefined) attrs.label = label
      }
      lines.push(`  ${formatDotId(id)}${formatAttributes(attrs)};`)
    }
    if (parentId !== undefined && includeChildEdges) {
      lines.push(`  ${formatDotId(String(parentId))} ${edgeOp} ${formatDotId(id)} [style="dashed"];`)
    }
    for (const child of node.children ?? []) emitNode(child, node.id)
  }

  for (const node of data.nodes) emitNode(node)

  for (const edge of data.edges) {
    const attrs = { ...(options.edgeAttributes?.(edge) ?? {}) }
    if (attrs.label === undefined) {
      const label = (options.edgeLabel ?? defaultEdgeLabel)(edge)
      if (label !== undefined) attrs.label = label
    }
    lines.push(`  ${formatDotId(String(edge.from))} ${edgeOp} ${formatDotId(String(edge.to))}${formatAttributes(attrs)};`)
  }

  const keyword = directed ? 'digraph' : 'graph'
  const graphName = formatDotId(options.graphName ?? 'G')
  return `${keyword} ${graphName} {\n${lines.join('\n')}\n}\n`
}
