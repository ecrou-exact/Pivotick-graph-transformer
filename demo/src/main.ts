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

const formatSelect = document.querySelector<HTMLSelectElement>('#format-select')!
const variantSelect = document.querySelector<HTMLSelectElement>('#variant-select')!
const fixtureSelect = document.querySelector<HTMLSelectElement>('#fixture-select')!
const form = document.querySelector<HTMLFormElement>('#controls')!
const statusEl = document.querySelector<HTMLElement>('#status')!
const jsonOutput = document.querySelector<HTMLElement>('#json-output')!
const outputSummaryMeta = document.querySelector<HTMLElement>('#output-summary-meta')!
const container = document.querySelector<HTMLDivElement>('#pivotick-container')!
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')!

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

function populateFixtures(): void {
  fixtureSelect.innerHTML = ''
  const paths = Object.keys(fixtureModules).sort()

  if (paths.length === 0) {
    const option = document.createElement('option')
    option.textContent = 'No fixtures yet — add JSON files under demo/fixtures/<format>/'
    option.disabled = true
    fixtureSelect.append(option)
    return
  }

  for (const path of paths) {
    const option = document.createElement('option')
    option.value = path
    option.textContent = path.replace('../fixtures/', '')
    fixtureSelect.append(option)
  }
}

function render(): void {
  const fixtureModule = fixtureModules[fixtureSelect.value]
  if (!fixtureModule) {
    statusEl.textContent = 'Add a fixture under demo/fixtures/<format>/ first.'
    return
  }

  const format = formatSelect.value
  const variantId = variantSelect.value

  let data: ConversionResult
  try {
    const converter = ConverterRegistry.get(format, variantId)
    const toPivotick = converter.toPivotickOptions(fixtureModule.default)
    data = toPivotick.data

    renderJsonViewer(jsonOutput, data)
    outputSummaryMeta.textContent = `${data.nodes.length} node(s), ${data.edges.length} edge(s)`

    pivotickInstance?.destroy()
    container.innerHTML = ''
    pivotickInstance = new Pivotick(container, data, {
      render: toPivotick.render,
      // Explicit rather than relying on Pivotick's own default: show the
      // full UI (sidebar, header, tooltip, context menu, navigation), not
      // just the bare canvas.
      UI: { mode: 'full' },
    })

    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId}.`
  } catch (error) {
    statusEl.textContent = error instanceof Error ? error.message : String(error)
    jsonOutput.replaceChildren()
    outputSummaryMeta.textContent = ''
  }
}

const THEME_KEY = 'pivotick-demo-theme'

function effectiveTheme(): 'light' | 'dark' {
  const stored = document.documentElement.dataset.theme
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function updateThemeToggleLabel(): void {
  themeToggle.textContent = effectiveTheme() === 'dark' ? '☀️' : '🌙'
}

function initTheme(): void {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored
  updateThemeToggleLabel()
}

themeToggle.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  localStorage.setItem(THEME_KEY, next)
  updateThemeToggleLabel()
})

formatSelect.addEventListener('change', populateVariants)
form.addEventListener('submit', (event) => {
  event.preventDefault()
  render()
})

initTheme()
populateFormats()
populateFixtures()
