import { ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult } from 'pivotick-transformer-core'
import 'pivotick-transformer-misp'

import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../vendor/pivotick/pivotick.css'

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
const container = document.querySelector<HTMLDivElement>('#pivotick-container')!

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

    jsonOutput.textContent = JSON.stringify(data, null, 2)

    pivotickInstance?.destroy()
    container.innerHTML = ''
    pivotickInstance = new Pivotick(container, data, { render: toPivotick.render })

    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId}.`
  } catch (error) {
    statusEl.textContent = error instanceof Error ? error.message : String(error)
    jsonOutput.textContent = ''
  }
}

formatSelect.addEventListener('change', populateVariants)
form.addEventListener('submit', (event) => {
  event.preventDefault()
  render()
})

populateFormats()
populateFixtures()
