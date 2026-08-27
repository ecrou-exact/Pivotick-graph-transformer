import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import { NODE_DEFAULTS } from '../../packages/misp/src/index'
import { TUNED_SIMULATION, toGraphData } from './pivotick'
import { renderSiteHeader } from './siteHeader'
import { getTheme, onThemeChange, setTheme } from './theme'

renderSiteHeader('demo')

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
    // `label` is required in data for Pivotick's own tooltip title resolver
    // (falls back to "Could not resolve title" without it) — hidden here so
    // it doesn't also show up as a duplicate of the card's own title.
    .filter(([key, value]) => key && key !== 'label' && value !== undefined && value !== null && value !== '')
    .map(([name, value]) => ({ name, value: String(value) }))
}

// Human labels for the legend rows below — NODE_DEFAULTS' keys are the raw
// `type` values written into node.data, not meant to be read as-is.
const NODE_TYPE_LABELS: Record<string, string> = {
  'misp-event': 'Event',
  'misp-attribute': 'Attribute',
  'misp-object': 'Object',
  'misp-galaxy-group': 'Galaxy clusters',
  'misp-galaxy': 'Galaxy',
  'misp-sighting-summary': 'Sightings',
  'misp-sighting-type': 'Sighting type',
  'misp-tag': 'Tag'
}

// UI.legend can't sample a real colour off these nodes (see NODE_DEFAULTS'
// own comment in import.ts), so its swatches are declared here instead, from
// the one place that already knows each type's accentColor. Tags don't have
// one fixed accentColor (each tag carries its own `colour`), so their entry
// falls back to buildTagChip's own default swatch (#888888) — a stand-in,
// not the colour of any one tag.
const nodeTypeLegendCatalog = [
  ...Object.entries(NODE_DEFAULTS)
    .filter(([, style]) => style.accentColor)
    .map(([type, style]) => ({ id: type, label: NODE_TYPE_LABELS[type] ?? type, color: style.accentColor as string })),
  { id: 'misp-tag', label: NODE_TYPE_LABELS['misp-tag'], color: '#888888' }
]

// Re-derived on every legend rebuild (fixture switch, filter, expand/collapse)
// so it only ever lists the types actually present in the *current* graph —
// a fixture with no galaxy or sighting shouldn't show empty rows for them.
function nodeTypeLegendEntries(graph: { getNodes(): { getData(): Record<string, unknown> }[] }) {
  const presentTypes = new Set(graph.getNodes().map(node => node.getData().type as string))
  return nodeTypeLegendCatalog.filter(entry => presentTypes.has(entry.id))
}

// Current fixture selection lives here, not as a render() parameter, so
// the fixture picker can trigger a re-render on its own without needing to
// know about the theme (which now lives in ./theme.ts, shared with the
// site header's own toggle — see onThemeChange below).
const defaultFixture = fixtures.find(f => f.label === 'reel-events') ?? fixtures[0]
let currentFixtureJson: unknown = defaultFixture.json

// Every user-facing toggle explicitly on, so the demo shows the full UI —
// see GraphOptions/GraphUI/RendererOptions in the vendored Pivotick build
// (Pivotick/Pivotick@1870d99, branch worktree-shape-edge-anchoring — not
// yet an official release; carries the shape-aware edge anchoring fix and
// UI.legend).
// `theme` is Pivotick's own public option (it sets `data-theme` on its
// container internally) — the demo never touches Pivotick's vendored files,
// only the data/options it's given.
function renderPivotick(): void {
  // No documented dispose/destroy on the vendored Pivotick — clearing the
  // container before re-instantiating is the safe way to swap fixtures.
  container.innerHTML = ''
  new Pivotick(container, toGraphData(currentFixtureJson, getTheme()), {
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
      fitViewOnExpandCollapse: true,
      ...TUNED_SIMULATION
    },
    layout: {
      type: 'force'
    },
    UI: {
      // Pivotick reads `theme` from *here* (options.UI.theme), not from a
      // top-level `theme` option — verified straight from the vendored
      // bundle: its UIManager only ever receives `options.UI` and sets
      // `data-theme` off `options.UI.theme`. A top-level `theme` is simply
      // never read, silently leaving Pivotick's own canvas/chrome stuck on
      // its no-data-theme default regardless of what we pass.
      theme: getTheme(),
      mode: 'full',
      sidebar: { collapsed: false },
      tooltip: { enabled: true, allowPinning: true, nodePropertiesMap },
      propertiesPanel: { nodePropertiesMap },
      contextMenu: { enabled: true },
      navigation: { enabled: true },
      editors: { nodeEditor: { enabled: true } },
      // "coming soon" mode-rail slots — off by default, shown here since we
      // want every visible affordance on, even the disabled SOON badges.
      modeRail: { explore: true, enrich: true },
      // Every MISP node carries a `type` (misp-event, misp-tag, ...) — key
      // the canvas legend on it so it also doubles as a type filter. `entries`
      // is a function (re-run on every rebuild) so it only lists types the
      // *current* fixture actually has, each with its real swatch colour —
      // without declaring these, every row would sample the same
      // 'transparent' off the node's own (invisible) native shape.
      legend: { key: 'type', title: 'Node type', entries: nodeTypeLegendEntries }
    }
  })
}

renderPivotick()

// Floating fixture picker, appended to <body> (a sibling of #app, not a
// child) and positioned via fixturePicker.css so it sits over Pivotick
// without Pivotick's own container/options ever knowing it's there.
const picker = document.createElement('div')
picker.id = 'fixture-picker'
picker.innerHTML = `
  <button id="fixture-picker-toggle" type="button" aria-expanded="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 8H13V3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
    <span id="fixture-picker-toggle-label">Fixtures ▾</span>
  </button>
  <div id="fixture-picker-body">
    <select id="fixture-picker-select"></select>
    <div class="fixture-picker-row">
      <span id="fixture-picker-theme-label">Light theme</span>
      <button id="fixture-picker-theme-toggle" type="button" role="switch" aria-checked="true" aria-label="Toggle dark/light theme">
        <span class="fixture-picker-theme-toggle-thumb"></span>
      </button>
    </div>
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
select.value = defaultFixture.path

select.addEventListener('change', () => {
  const fixture = fixtures.find(f => f.path === select.value)
  if (!fixture) return
  currentFixtureJson = fixture.json
  renderPivotick()
})

const themeToggle = picker.querySelector('#fixture-picker-theme-toggle') as HTMLButtonElement
const themeLabel = picker.querySelector('#fixture-picker-theme-label') as HTMLSpanElement
themeToggle.addEventListener('click', () => {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
})
// Shared with the site header's own theme toggle — either one flips this
// switch's UI and re-renders the graph, so the two never disagree.
onThemeChange(theme => {
  themeToggle.setAttribute('aria-checked', String(theme === 'light'))
  themeLabel.textContent = theme === 'dark' ? 'Dark theme' : 'Light theme'
  renderPivotick()
})

const toggle = picker.querySelector('#fixture-picker-toggle') as HTMLButtonElement
const toggleLabel = picker.querySelector('#fixture-picker-toggle-label') as HTMLSpanElement

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
  toggleLabel.textContent = collapsed ? 'Fixtures ▸' : 'Fixtures ▾'
})
