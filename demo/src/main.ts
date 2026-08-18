import { ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp'

import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../vendor/pivotick/pivotick.css'

import { renderJsonViewer } from './jsonViewer.js'

// Vite-native glob import: every JSON file under demo/fixtures/, eagerly
// parsed. Add fixtures there — no wiring needed here, this list updates
// itself.
const fixtureModules = import.meta.glob<{ default: unknown }>('../fixtures/**/*.json', { eager: true })

// Files dropped/browsed in via the dropzone, keyed by `upload:<filename>`.
// In-memory only — not written back to demo/fixtures/.
const uploadedFixtures = new Map<string, unknown>()

const formatSelect = document.querySelector<HTMLSelectElement>('#format-select')!
const variantSelect = document.querySelector<HTMLSelectElement>('#variant-select')!
const fixtureSelect = document.querySelector<HTMLSelectElement>('#fixture-select')!
const modeSelect = document.querySelector<HTMLSelectElement>('#mode-select')!
const fullLabelsCheckbox = document.querySelector<HTMLInputElement>('#full-labels-checkbox')!
const debugRadiusCheckbox = document.querySelector<HTMLInputElement>('#debug-radius-checkbox')!
const form = document.querySelector<HTMLFormElement>('#controls')!
const statusEl = document.querySelector<HTMLElement>('#status')!
const jsonOutput = document.querySelector<HTMLElement>('#json-output')!
const outputSummaryMeta = document.querySelector<HTMLElement>('#output-summary-meta')!
const container = document.querySelector<HTMLDivElement>('#pivotick-container')!
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')!
const dropzone = document.querySelector<HTMLDivElement>('#dropzone')!
const fileInput = document.querySelector<HTMLInputElement>('#file-input')!
const pasteJson = document.querySelector<HTMLDetailsElement>('#paste-json')!
const pasteTextarea = document.querySelector<HTMLTextAreaElement>('#paste-textarea')!
const pasteLoadBtn = document.querySelector<HTMLButtonElement>('#paste-load-btn')!

let pivotickInstance: Pivotick | undefined

function populateFormats(): void {
  formatSelect.innerHTML = ''
  for (const format of ConverterRegistry.listFormats()) {
    const option = document.createElement('option')
    option.value = format
    option.textContent = format
    formatSelect.append(option)
  }
  populateVariants()
}

function populateVariants(): void {
  variantSelect.innerHTML = ''
  for (const variant of ConverterRegistry.listVariants(formatSelect.value)) {
    const option = document.createElement('option')
    option.value = variant.id
    option.textContent = variant.default ? `${variant.name} (default)` : variant.name
    option.title = variant.description
    variantSelect.append(option)
  }
}

function populateFixtures(selectValue?: string): void {
  fixtureSelect.innerHTML = ''

  const uploadKeys = [...uploadedFixtures.keys()]
  const fixturePaths = Object.keys(fixtureModules).sort()

  if (uploadKeys.length === 0 && fixturePaths.length === 0) {
    const option = document.createElement('option')
    option.textContent = 'No fixtures yet — add JSON files under demo/fixtures/<format>/, or drop one in'
    option.disabled = true
    fixtureSelect.append(option)
    return
  }

  for (const key of uploadKeys) {
    const option = document.createElement('option')
    option.value = key
    option.textContent = `📄 ${key.slice('upload:'.length)} (uploaded)`
    fixtureSelect.append(option)
  }

  for (const path of fixturePaths) {
    const option = document.createElement('option')
    option.value = path
    option.textContent = path.replace('../fixtures/', '')
    fixtureSelect.append(option)
  }

  if (selectValue) fixtureSelect.value = selectValue
}

function getFixtureData(key: string): { data: unknown; found: true } | { found: false } {
  if (uploadedFixtures.has(key)) return { data: uploadedFixtures.get(key), found: true }
  const module = fixtureModules[key]
  if (module) return { data: module.default, found: true }
  return { found: false }
}

// Shared by file upload/drop and paste: parse `text`, stash it under
// `upload:<label>` so it appears in the fixture picker like any other
// fixture, try to auto-detect its format, and render it.
function loadJsonSource(text: string, label: string): void {
  try {
    // Strip a leading UTF-8 BOM — common in JSON files saved by some
    // Windows editors/exporters, and otherwise makes JSON.parse throw.
    const parsed: unknown = JSON.parse(text.replace(/^\uFEFF/, ''))
    const key = `upload:${label}`
    uploadedFixtures.set(key, parsed)
    populateFixtures(key)

    const detectedFormat = ConverterRegistry.detectFormat(parsed)
    if (!detectedFormat) {
      statusEl.textContent = `No registered converter recognized "${label}"'s format. Pick a format/variant manually and hit Render to try anyway.`
      return
    }
    formatSelect.value = detectedFormat
    populateVariants()
    render()
  } catch (error) {
    statusEl.textContent = `Could not read "${label}": ${error instanceof Error ? error.message : String(error)}`
  }
}

async function handleFiles(files: FileList): Promise<void> {
  const file = files[0]
  if (!file) return
  loadJsonSource(await file.text(), file.name)
}

function render(): void {
  const fixture = getFixtureData(fixtureSelect.value)
  if (!fixture.found) {
    statusEl.textContent = 'Add a fixture under demo/fixtures/<format>/, or drop one into the dropzone.'
    return
  }

  const format = formatSelect.value
  const variantId = variantSelect.value

  let data: ConversionResult
  try {
    const converter = ConverterRegistry.get(format, variantId)
    // `mode`/`fullLabels` are only meaningful to converters that define
    // them (currently just pivotick-transformer-misp's icons/simple/cards
    // switch and its "never truncate a badge" toggle) — passed through
    // unconditionally since ConverterOptions is free-form and a converter
    // that doesn't look at a given key just ignores it.
    const toPivotick = converter.toPivotickOptions(fixture.data, {
      mode: modeSelect.value,
      fullLabels: fullLabelsCheckbox.checked,
      debugRadius: debugRadiusCheckbox.checked,
    })
    data = toPivotick.data

    renderJsonViewer(jsonOutput, data)
    outputSummaryMeta.textContent = `${data.nodes.length} node(s), ${data.edges.length} edge(s)`

    pivotickInstance?.destroy()
    container.innerHTML = ''
    const theme = document.documentElement.dataset.theme
    pivotickInstance = new Pivotick(container, data, {
      render: toPivotick.render,
      // Explicit rather than relying on Pivotick's own default: show the
      // full UI (sidebar, header, tooltip, context menu, navigation), not
      // just the bare canvas. UI.theme is only set when the user has
      // manually overridden the theme (see the toggle below) — left
      // unset, the widget already follows the system color scheme on its
      // own via inherited --pvt-* custom properties.
      UI: { mode: 'full', ...(theme ? { theme } : {}) },
    })
    // Wider default spacing (Pivotick's own 'loose' physics preset —
    // more link distance/repulsion, less crowding) — mainly requested to
    // give the custom-rendered cards more breathing room, since a tighter
    // layout makes their approximate circular edge-anchor radius (see
    // pivotick-transformer-misp's scheduleMinRadiusCorrection()) more
    // likely to visibly overlap a neighbour.
    pivotickInstance.simulation?.applyPhysicsPreset('loose')

    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId}.`
  } catch (error) {
    statusEl.textContent = error instanceof Error ? error.message : String(error)
    jsonOutput.replaceChildren()
    outputSummaryMeta.textContent = ''
  }
}

// ── Theme toggle ──────────────────────────────────────────────────────
//
// pivotick.css's [data-theme] rules are scoped to `.pivotick[data-theme=…]`
// (the embedded widget's own root, set by its `UI.theme` option — see
// UIManager.ts) — NOT to <html>. Our own page chrome is themed by the
// :root[data-theme] rules in style.css instead. The toggle below drives
// both: the attribute on <html> for our chrome, and either a live patch on
// the widget's `.pivotick` root (if already rendered) or the `UI.theme`
// option (on the next render()) for the widget.

const THEME_KEY = 'pivotick-demo-theme'

function effectiveTheme(): 'light' | 'dark' {
  const stored = document.documentElement.dataset.theme
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function updateThemeToggleLabel(): void {
  themeToggle.textContent = effectiveTheme() === 'dark' ? '☀️' : '🌙'
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_KEY, theme)
  container.querySelector<HTMLElement>('.pivotick')?.setAttribute('data-theme', theme)
  updateThemeToggleLabel()
}

function initTheme(): void {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored
  updateThemeToggleLabel()
}

themeToggle.addEventListener('click', () => {
  applyTheme(effectiveTheme() === 'dark' ? 'light' : 'dark')
})

// ── Dropzone: drag & drop, or click to browse ────────────────────────

dropzone.addEventListener('click', () => fileInput.click())
dropzone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    fileInput.click()
  }
})
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropzone.classList.add('dropzone--active')
})
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dropzone--active'))
dropzone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropzone.classList.remove('dropzone--active')
  if (event.dataTransfer?.files.length) void handleFiles(event.dataTransfer.files)
})
fileInput.addEventListener('change', () => {
  if (fileInput.files?.length) void handleFiles(fileInput.files)
  fileInput.value = ''
})

// ── Paste JSON ────────────────────────────────────────────────────────

pasteJson.addEventListener('toggle', () => {
  if (pasteJson.open) pasteTextarea.focus()
})
pasteLoadBtn.addEventListener('click', () => {
  const text = pasteTextarea.value.trim()
  if (!text) {
    statusEl.textContent = 'Paste some JSON first.'
    return
  }
  loadJsonSource(text, 'pasted.json')
})

formatSelect.addEventListener('change', populateVariants)
modeSelect.addEventListener('change', render)
fullLabelsCheckbox.addEventListener('change', render)
debugRadiusCheckbox.addEventListener('change', render)
form.addEventListener('submit', (event) => {
  event.preventDefault()
  render()
})

initTheme()
populateFormats()
populateFixtures()
