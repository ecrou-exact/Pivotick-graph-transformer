import '../vendor/pivotick/pivotick.css'
import './fixturePicker.css'
import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../../packages/misp/src/index'
import { GraphData, GraphRegistry } from '../../packages/core/src/index'
import { MispEventInput } from '../../packages/misp/src/index'

const containerEl = document.getElementById('app')
if (!containerEl) throw new Error('Missing #app container')
const container = containerEl

// Every fixture under demo/fixtures/**, bundled eagerly so the picker below
// can list them without a server round-trip (this is a dev-only demo, not
// something Pivotick or the importers need to know about).
const fixtureModules = import.meta.glob('../fixtures/**/*.json', { eager: true }) as Record<string, { default: unknown }>

interface FixtureEntry {
  path: string
  group: string
  label: string
  json: unknown
}

const fixtures: FixtureEntry[] = Object.entries(fixtureModules)
  .map(([path, module]) => {
    const relative = path.replace(/^\.\.\/fixtures\//, '')
    const segments = relative.split('/')
    const fileName = segments.pop() ?? relative
    return {
      path,
      group: segments.join(' / '),
      label: fileName.replace(/\.json$/, ''),
      json: module.default
    }
  })
  .sort((a, b) => a.group.localeCompare(b.group) || a.label.localeCompare(b.label))

// Verified against the vendored bundle's Ct()/Ds() fallback: without a
// nodePropertiesMap, Pivotick lists every key in node.data — this makes
// that explicit rather than relying on the default not changing later.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodePropertiesMap(node: any) {
  const nodeData = typeof node.getData === 'function' ? node.getData() : node.data ?? {}
  return Object.entries(nodeData)
    .filter(([key, value]) => key && value !== undefined && value !== null && value !== '')
    .map(([name, value]) => ({ name, value: String(value) }))
}

// A loaded fixture is either a single MISP Event export (`{ Event }`) or a
// MISP search/index response (`{ response: [{ Event }, ...] }`) — the
// latter is converted event-by-event and merged into one graph, each Event
// its own root.
function toGraphData(json: unknown): GraphData {
  const importer = GraphRegistry.getImporter('misp')
  const listResponse = (json as { response?: { Event: MispEventInput['Event'] }[] }).response
  if (Array.isArray(listResponse)) {
    return listResponse.reduce<GraphData>((graph, entry) => {
      const converted = importer.convert({ Event: entry.Event })
      return { nodes: [...graph.nodes, ...converted.nodes], edges: [...graph.edges, ...converted.edges] }
    }, { nodes: [], edges: [] })
  }
  return importer.convert(json as MispEventInput)
}

// Every user-facing toggle explicitly on, so the demo shows the full UI —
// see GraphOptions/GraphUI/RendererOptions in the vendored Pivotick v1.5.0.
function renderPivotick(json: unknown): void {
  // No documented dispose/destroy on the vendored Pivotick — clearing the
  // container before re-instantiating is the safe way to swap fixtures.
  container.innerHTML = ''
  new Pivotick(container, toGraphData(json), {
    isDirected: true,
    render: {
      type: 'svg',
      enableFocusMode: true,
      enableNodeExpansion: true,
      zoomEnabled: true,
      zoomAnimation: true,
      dragEnabled: true,
      interactionEnabled: true,
      selectionBox: { enabled: true }
    },
    simulation: {
      enabled: true,
      useWorker: true,
      fitViewOnExpandCollapse: true
    },
    layout: {
      type: 'force'
    },
    UI: {
      mode: 'full',
      sidebar: { collapsed: false },
      tooltip: { enabled: true, allowPinning: true, nodePropertiesMap },
      propertiesPanel: { nodePropertiesMap },
      contextMenu: { enabled: true },
      navigation: { enabled: true },
      editors: { nodeEditor: { enabled: true } },
      // "coming soon" mode-rail slots — off by default, shown here since we
      // want every visible affordance on, even the disabled SOON badges.
      modeRail: { explore: true, enrich: true }
    }
  })
}

renderPivotick(fixtures[0].json)

// Floating fixture picker, appended to <body> (a sibling of #app, not a
// child) and positioned via fixturePicker.css so it sits over Pivotick
// without Pivotick's own container/options ever knowing it's there.
const picker = document.createElement('div')
picker.id = 'fixture-picker'
picker.innerHTML = `
  <button id="fixture-picker-toggle" type="button" aria-expanded="true">Fixtures ▾</button>
  <div id="fixture-picker-body">
    <select id="fixture-picker-select"></select>
  </div>
`
document.body.appendChild(picker)

const select = picker.querySelector('#fixture-picker-select') as HTMLSelectElement
const groups = new Map<string, HTMLOptGroupElement>()
for (const fixture of fixtures) {
  let optgroup = groups.get(fixture.group)
  if (!optgroup) {
    optgroup = document.createElement('optgroup')
    optgroup.label = fixture.group
    select.appendChild(optgroup)
    groups.set(fixture.group, optgroup)
  }
  const option = document.createElement('option')
  option.value = fixture.path
  option.textContent = fixture.label
  optgroup.appendChild(option)
}

select.addEventListener('change', () => {
  const fixture = fixtures.find(f => f.path === select.value)
  if (fixture) renderPivotick(fixture.json)
})

const toggle = picker.querySelector('#fixture-picker-toggle') as HTMLButtonElement

// Dragging the toggle bar moves the whole panel — switching from its
// bottom/right default anchor to an explicit left/top position on first
// grab so it can be placed anywhere on screen.
let dragOffset: { x: number, y: number } | null = null
let didDrag = false

toggle.addEventListener('pointerdown', event => {
  const rect = picker.getBoundingClientRect()
  dragOffset = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  didDrag = false
  picker.style.left = `${rect.left}px`
  picker.style.top = `${rect.top}px`
  picker.style.right = 'auto'
  picker.style.bottom = 'auto'
  toggle.setPointerCapture(event.pointerId)
})

toggle.addEventListener('pointermove', event => {
  if (!dragOffset) return
  didDrag = true
  picker.style.left = `${event.clientX - dragOffset.x}px`
  picker.style.top = `${event.clientY - dragOffset.y}px`
})

toggle.addEventListener('pointerup', event => {
  dragOffset = null
  toggle.releasePointerCapture(event.pointerId)
})

toggle.addEventListener('click', () => {
  // A drag ends with a click event right after — swallow that one so
  // dragging the panel doesn't also toggle it collapsed/expanded.
  if (didDrag) {
    didDrag = false
    return
  }
  const collapsed = picker.classList.toggle('collapsed')
  toggle.setAttribute('aria-expanded', String(!collapsed))
  toggle.textContent = collapsed ? 'Fixtures ▸' : 'Fixtures ▾'
})
