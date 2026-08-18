import { ConverterRegistry } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp'

import { initThemeToggle } from './theme.js'

// Reaches straight into pivotick-transformer-misp's built dist output for its
// styles.json — same "read the built artifact directly" pattern
// demo/scripts/generate-icon-showcase.mjs already uses for that package's
// icons.generated.js. styles.json is that converter's single source of
// truth for every color/shape/mark shown below, so importing it directly
// (rather than hand-copying values here) means this legend can never drift
// out of sync with what actually renders in the Demo.
import mispStylesRaw from '../../packages/misp/dist/shared/styles.json' with { type: 'json' }

interface KindStyle {
  shape: string
  color: string
  size: number
  mark: string
  label: string
}

interface EdgeStyle {
  strokeColor: string
  strokeWidth: number
  dashed?: boolean
  structural?: boolean
}

const mispStyles = mispStylesRaw as unknown as {
  kinds: Record<string, KindStyle>
  edges: Record<string, EdgeStyle>
}

// ── small DOM helpers ─────────────────────────────────────────────────────

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function buildTable(headers: string[], rows: HTMLElement[][]): HTMLTableElement {
  const table = el('table', 'docs-table')
  const thead = el('thead')
  const headRow = el('tr')
  for (const header of headers) headRow.append(el('th', undefined, header))
  thead.append(headRow)

  const tbody = el('tbody')
  for (const cells of rows) {
    const row = el('tr')
    for (const cellContent of cells) {
      const td = el('td')
      td.append(cellContent)
      row.append(td)
    }
    tbody.append(row)
  }

  table.append(thead, tbody)
  return table
}

/** A colored swatch matching the node shape it stands for (circle/square/hexagon, mirroring styles.json's "badge.shapeStyle" clip paths). */
function shapeSwatch(color: string, shape: string): HTMLElement {
  const swatch = el('span', 'docs-swatch')
  swatch.style.background = color
  if (shape === 'square') swatch.classList.add('docs-swatch--square')
  else if (shape === 'hexagon') swatch.classList.add('docs-swatch--hexagon')
  else swatch.classList.add('docs-swatch--circle')
  return swatch
}

/** A short colored line sample for an edge kind — dashed if styles.json marks it dashed, with a real arrowhead if it isn't structural (containment-only edges never get one — see the edge legend's intro copy in docs.html). */
function edgeSample(edge: EdgeStyle): HTMLElement {
  const wrap = el('span', 'docs-edge-sample')
  const svgNs = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNs, 'svg')
  svg.setAttribute('viewBox', '0 0 64 16')
  svg.setAttribute('width', '64')
  svg.setAttribute('height', '16')

  const markerId = `docs-arrow-${edge.strokeColor.replace('#', '')}`
  if (!edge.structural) {
    const marker = document.createElementNS(svgNs, 'marker')
    marker.setAttribute('id', markerId)
    marker.setAttribute('markerWidth', '8')
    marker.setAttribute('markerHeight', '8')
    marker.setAttribute('refX', '5')
    marker.setAttribute('refY', '4')
    marker.setAttribute('orient', 'auto')
    const arrowPath = document.createElementNS(svgNs, 'path')
    arrowPath.setAttribute('d', 'M0,0 L8,4 L0,8 Z')
    arrowPath.setAttribute('fill', edge.strokeColor)
    marker.append(arrowPath)
    const defs = document.createElementNS(svgNs, 'defs')
    defs.append(marker)
    svg.append(defs)
  }

  const line = document.createElementNS(svgNs, 'line')
  line.setAttribute('x1', '2')
  line.setAttribute('y1', '8')
  line.setAttribute('x2', edge.structural ? '62' : '52')
  line.setAttribute('y2', '8')
  line.setAttribute('stroke', edge.strokeColor)
  line.setAttribute('stroke-width', String(edge.strokeWidth))
  if (edge.dashed) line.setAttribute('stroke-dasharray', '4 3')
  if (!edge.structural) line.setAttribute('marker-end', `url(#${markerId})`)
  svg.append(line)

  wrap.append(svg)
  return wrap
}

// ── Registered formats & variants ────────────────────────────────────────

function renderFormatList(): void {
  const root = document.querySelector<HTMLDivElement>('#docs-formats')
  if (!root) return

  for (const format of ConverterRegistry.listFormats()) {
    const card = el('div', 'docs-format-card')
    card.append(el('h3', 'docs-format-name', format))

    const list = el('ul', 'docs-variant-list')
    for (const variant of ConverterRegistry.listVariants(format)) {
      const item = el('li', 'docs-variant-item')
      const nameRow = el('div', 'docs-variant-name-row')
      nameRow.append(el('strong', undefined, variant.name))
      nameRow.append(el('code', 'docs-variant-id', variant.id))
      if (variant.default) nameRow.append(el('span', 'docs-badge', 'default'))
      item.append(nameRow, el('p', 'docs-variant-desc', variant.description))
      list.append(item)
    }
    card.append(list)
    root.append(card)
  }
}

// ── Node kind legend (styles.json "kinds") ───────────────────────────────

const KIND_DESCRIPTIONS: Record<string, string> = {
  event: 'The Event itself — the root/cluster node every Attribute, Object and Tag ultimately hangs off of.',
  tag: 'A MISP Tag, including a galaxy-pattern machine tag (misp-galaxy:type="value").',
  object: 'A MISP Object, e.g. domain-ip, file, or any other Object template.',
  attribute: 'A MISP Attribute, e.g. an IP address, hash, domain, or free-text value.',
  actor: 'A Galaxy Cluster classified as a threat actor, intrusion set, or activity group.',
  malware: 'A Galaxy Cluster classified as malware, ransomware, a backdoor, botnet, banker, or stealer.',
  tool: 'A Galaxy Cluster classified as a tool, exploit kit, or RAT.',
  technique: 'A Galaxy Cluster classified as an ATT&CK technique, tactic, or course of action.',
  vulnerability: 'A Galaxy Cluster classified as a vulnerability or CVE.',
  campaign: 'A Galaxy Cluster classified as a campaign.',
  sector: 'A Galaxy Cluster classified as a targeted sector.',
  country: 'A Galaxy Cluster classified as a targeted country or region.',
  other: 'Anything that does not match a more specific kind above — the fallback bucket.',
}

function renderKindLegend(): void {
  const root = document.querySelector<HTMLDivElement>('#docs-kind-legend')
  if (!root) return

  const rows = Object.entries(mispStyles.kinds).map(([key, kind]) => [
    shapeSwatch(kind.color, kind.shape),
    el('strong', undefined, kind.label),
    el('span', 'docs-mono', kind.shape),
    el('span', 'docs-mono', kind.mark),
    el('span', undefined, KIND_DESCRIPTIONS[key] ?? ''),
  ])

  root.append(buildTable(['', 'Kind', 'Shape', 'Mark', 'Maps to'], rows))
}

// ── Edge legend (styles.json "edges") ────────────────────────────────────

const EDGE_DESCRIPTIONS: Record<string, string> = {
  default: 'Fallback style for any edge without a recognized kind.',
  hasObject: 'An Event or Object contains an Object — structural containment, not a named relationship.',
  hasAttribute: 'An Event or Object contains an Attribute — structural containment.',
  hasTag: 'A Tag applied to an Event, Object, or Attribute.',
  hasGalaxy: 'A Galaxy Cluster attached to an Event, Object, or Attribute.',
  reference: 'An explicit MISP Object Reference — a real, named relationship (e.g. "uses", "dropped-by") between two Objects/Attributes. Labeled with the actual relationship_type.',
  clusterRelation: 'A MISP Galaxy Cluster Relation — a named relationship between two Galaxy Clusters (e.g. a threat actor "uses" a malware family). Labeled with the relation type.',
  eventExtends: 'event-root-minimal only: one Event explicitly extends another (MISP\'s own extends_uuid field) — a real, directed relationship.',
  sharedTag: 'event-root-minimal only: two Events share a Tag name somewhere inside them, in place of a Tag node. Labeled with the shared tag name.',
  sharedGalaxyCluster: 'event-root-minimal only: two Events share a Galaxy Cluster somewhere inside them, in place of a Galaxy Cluster node. Labeled with the shared cluster\'s value.',
}

function renderEdgeLegend(): void {
  const root = document.querySelector<HTMLDivElement>('#docs-edge-legend')
  if (!root) return

  const rows = Object.entries(mispStyles.edges).map(([key, edge]) => [
    edgeSample(edge),
    el('strong', 'docs-mono', key),
    el('span', undefined, edge.structural ? 'None (containment)' : 'Yes (directed)'),
    el('span', undefined, EDGE_DESCRIPTIONS[key] ?? ''),
  ])

  root.append(buildTable(['Line', 'Kind', 'Arrowhead', 'Meaning'], rows))
}

initThemeToggle()
renderFormatList()
renderKindLegend()
renderEdgeLegend()
