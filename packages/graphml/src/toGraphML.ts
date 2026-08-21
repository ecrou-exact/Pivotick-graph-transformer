import type { ConversionResult, RawEdge, RawNode } from 'pivotick-transformer-core'

import { escapeXmlAttribute, escapeXmlText } from './graphmlXml.js'

/**
 * Visual style for one node, written as a yFiles `y:ShapeNode` block (the
 * `http://www.yworks.com/xml/graphml` extension yEd and most other
 * GraphML tools read for actual visual rendering — plain GraphML itself
 * has no visual vocabulary of its own). `shape` is a yFiles shape-type
 * name, e.g. `'ellipse'`, `'rectangle'`, `'hexagon'`, `'diamond'` — see
 * https://docs.yworks.com/yfileshtml/#/api/ShapeNodeShape for the full
 * set this repo's converters might reasonably produce.
 */
export interface GraphMLNodeStyle {
  shape?: string
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  width?: number
  height?: number
}

/** Visual style for one edge, written as a yFiles `y:PolyLineEdge` block. */
export interface GraphMLEdgeStyle {
  color?: string
  width?: number
  dashed?: boolean
  /** Target-end arrowhead — a yFiles arrow-type name, e.g. `'standard'` or `'none'`. Source end is always `'none'` (this repo's converters have no notion of a bidirectional edge). */
  arrow?: string
}

export interface GraphMLExportOptions {
  /** `edgedefault="directed"` vs `"undirected"`. Defaults to `true` — matches Pivotick's own `isDirected` default. */
  directed?: boolean
  /** The `<graph>` element's own `id` — cosmetic only. Defaults to `'G'`. */
  graphId?: string
  /** Derives a node's label (used both as a plain `<data>` value and, if styled, `y:NodeLabel`). Defaults to `node.data.label` when it's a string. */
  nodeLabel?: (node: RawNode) => string | undefined
  /** Visual style for a node — omit entirely for a plain, unstyled node (still valid GraphML, just no `y:ShapeNode` block). */
  nodeStyle?: (node: RawNode) => GraphMLNodeStyle | undefined
  /**
   * A node's layout position, in the `y:Geometry` element every
   * `y:ShapeNode` needs. GraphML (unlike DOT/Graphviz) carries no layout
   * engine of its own — a reader with no `y:Geometry` to go on typically
   * either auto-layouts on load or stacks every node at the origin, so
   * omitting this for a styled node produces valid but visually useless
   * output. Not this package's job to compute (it has no opinion on
   * *how* — force-directed, hierarchical, ...); the caller supplies it.
   */
  nodePosition?: (node: RawNode) => { x: number; y: number } | undefined
  /**
   * Extra plain-string `<data>` entries for a node, beyond `label` —
   * e.g. an icon. Each distinct key returned across every node gets its
   * own declared `<key>` (GraphML requires every `attr.name` a `<data>`
   * references to be declared once, up front); a node that doesn't
   * return a given key simply omits that `<data>` element.
   */
  nodeData?: (node: RawNode) => Record<string, string> | undefined
  /** Same as `nodeLabel`, for edges — defaults to `edge.data.label`. */
  edgeLabel?: (edge: RawEdge) => string | undefined
  /** Same as `nodeStyle`, for edges. */
  edgeStyle?: (edge: RawEdge) => GraphMLEdgeStyle | undefined
  /**
   * Pivotick's `RawNode.children` (its built-in expand/collapse nesting)
   * has no GraphML equivalent to fall back on automatically, so it's
   * flattened: every child becomes an ordinary top-level `<node>`, plus a
   * synthetic dashed edge from parent to child recording the
   * relationship that existed. Set to `false` to flatten silently
   * instead, with no synthetic edge. Defaults to `true`.
   */
  includeChildEdges?: boolean
}

const DEFAULT_NODE_WIDTH = 60
const DEFAULT_NODE_HEIGHT = 40

function defaultNodeLabel(node: RawNode): string | undefined {
  const label = node.data?.label
  return typeof label === 'string' ? label : undefined
}

function defaultEdgeLabel(edge: RawEdge): string | undefined {
  const label = edge.data?.label
  return typeof label === 'string' ? label : undefined
}

interface FlatNode {
  node: RawNode
  parentId?: RawNode['id']
}

function flattenNodes(nodes: RawNode[]): FlatNode[] {
  const flat: FlatNode[] = []
  const seenIds = new Set<string>()
  const visit = (node: RawNode, parentId?: RawNode['id']): void => {
    const id = String(node.id)
    if (!seenIds.has(id)) {
      seenIds.add(id)
      flat.push({ node, parentId })
    }
    for (const child of node.children ?? []) visit(child, node.id)
  }
  for (const node of nodes) visit(node)
  return flat
}

function nodeDataKeyId(name: string): string {
  return `nd_${name}`
}

/**
 * Renders Pivotick's `{ nodes, edges }` shape (this repo's
 * `ConversionResult` — every converter here already produces it) as
 * GraphML, per http://graphml.graphdrawing.org/ — plain generic `<data>`
 * attributes for label/extra fields (readable by any GraphML-aware
 * tool), plus a yFiles `y:ShapeNode`/`y:PolyLineEdge` block per styled
 * node/edge (readable specifically by yEd and other yFiles-based tools —
 * ignored, harmlessly, by anything that only understands plain GraphML).
 */
export function toGraphML(data: ConversionResult, options: GraphMLExportOptions = {}): string {
  const directed = options.directed ?? true
  const includeChildEdges = options.includeChildEdges ?? true
  const graphId = options.graphId ?? 'G'
  const nodeLabel = options.nodeLabel ?? defaultNodeLabel
  const edgeLabel = options.edgeLabel ?? defaultEdgeLabel

  const flatNodes = flattenNodes(data.nodes)

  // GraphML requires every `<data key="...">`'s key to be declared by a
  // `<key>` element up front — one pass to discover which extra
  // `nodeData()` field names are actually used, before writing any node.
  const nodeDataFieldNames = new Set<string>()
  for (const { node } of flatNodes) {
    const extra = options.nodeData?.(node)
    if (extra) for (const name of Object.keys(extra)) nodeDataFieldNames.add(name)
  }

  const lines: string[] = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:y="http://www.yworks.com/xml/graphml" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">')
  lines.push('  <key id="label" for="node" attr.name="label" attr.type="string"/>')
  for (const name of nodeDataFieldNames) {
    lines.push(`  <key id="${escapeXmlAttribute(nodeDataKeyId(name))}" for="node" attr.name="${escapeXmlAttribute(name)}" attr.type="string"/>`)
  }
  lines.push('  <key id="nodegraphics" for="node" yfiles.type="nodegraphics"/>')
  lines.push('  <key id="edgelabel" for="edge" attr.name="label" attr.type="string"/>')
  lines.push('  <key id="edgegraphics" for="edge" yfiles.type="edgegraphics"/>')
  lines.push(`  <graph id="${escapeXmlAttribute(graphId)}" edgedefault="${directed ? 'directed' : 'undirected'}">`)

  for (const { node, parentId } of flatNodes) {
    const id = String(node.id)
    const label = nodeLabel(node)
    const style = options.nodeStyle?.(node)
    const position = options.nodePosition?.(node)
    const extra = options.nodeData?.(node)

    lines.push(`    <node id="${escapeXmlAttribute(id)}">`)
    if (label !== undefined) lines.push(`      <data key="label">${escapeXmlText(label)}</data>`)
    for (const name of nodeDataFieldNames) {
      const value = extra?.[name]
      if (value !== undefined) lines.push(`      <data key="${escapeXmlAttribute(nodeDataKeyId(name))}">${escapeXmlText(value)}</data>`)
    }
    if (style) {
      const width = style.width ?? DEFAULT_NODE_WIDTH
      const height = style.height ?? DEFAULT_NODE_HEIGHT
      const x = position?.x ?? 0
      const y = position?.y ?? 0
      lines.push('      <data key="nodegraphics">')
      lines.push('        <y:ShapeNode>')
      lines.push(`          <y:Geometry x="${x}" y="${y}" width="${width}" height="${height}"/>`)
      if (style.fillColor) lines.push(`          <y:Fill color="${escapeXmlAttribute(style.fillColor)}" transparent="false"/>`)
      if (style.borderColor !== undefined || style.borderWidth !== undefined) {
        lines.push(`          <y:BorderStyle color="${escapeXmlAttribute(style.borderColor ?? '#000000')}" width="${style.borderWidth ?? 1}"/>`)
      }
      if (style.shape) lines.push(`          <y:Shape type="${escapeXmlAttribute(style.shape)}"/>`)
      if (label !== undefined) lines.push(`          <y:NodeLabel>${escapeXmlText(label)}</y:NodeLabel>`)
      lines.push('        </y:ShapeNode>')
      lines.push('      </data>')
    }
    lines.push('    </node>')

    if (parentId !== undefined && includeChildEdges) {
      lines.push(`    <edge source="${escapeXmlAttribute(String(parentId))}" target="${escapeXmlAttribute(id)}">`)
      lines.push('      <data key="edgegraphics"><y:PolyLineEdge><y:LineStyle type="dashed"/></y:PolyLineEdge></data>')
      lines.push('    </edge>')
    }
  }

  for (const edge of data.edges) {
    const label = edgeLabel(edge)
    const style = options.edgeStyle?.(edge)
    lines.push(`    <edge source="${escapeXmlAttribute(String(edge.from))}" target="${escapeXmlAttribute(String(edge.to))}">`)
    if (label !== undefined) lines.push(`      <data key="edgelabel">${escapeXmlText(label)}</data>`)
    if (style) {
      lines.push('      <data key="edgegraphics">')
      lines.push('        <y:PolyLineEdge>')
      lines.push(`          <y:LineStyle color="${escapeXmlAttribute(style.color ?? '#000000')}" type="${style.dashed ? 'dashed' : 'line'}" width="${style.width ?? 1}"/>`)
      lines.push(`          <y:Arrows source="none" target="${escapeXmlAttribute(style.arrow ?? 'standard')}"/>`)
      if (label !== undefined) lines.push(`          <y:EdgeLabel>${escapeXmlText(label)}</y:EdgeLabel>`)
      lines.push('        </y:PolyLineEdge>')
      lines.push('      </data>')
    }
    lines.push('    </edge>')
  }

  lines.push('  </graph>')
  lines.push('</graphml>')
  return lines.join('\n')
}
