import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../../packages/misp/src/index'
import eventFixture from '../fixtures-docs/event.json'
import eventAttributeFixture from '../fixtures-docs/event-attribute.json'
import eventGalaxyFixture from '../fixtures-docs/event-galaxy.json'
import eventObjectFixture from '../fixtures-docs/event-object.json'
import eventTagFixture from '../fixtures-docs/event-tag.json'
import objectAttributeFixture from '../fixtures-docs/object-attribute.json'
import attributeGalaxyFixture from '../fixtures-docs/attribute-galaxy.json'
import attributeSightingFixture from '../fixtures-docs/attribute-sighting.json'
import attributeTagFixture from '../fixtures-docs/attribute-tag.json'
import viewCorrelationFixture from '../fixtures-docs/view-correlation.json'
import viewDetailedFixture from '../fixtures-docs/view-detailed.json'
import viewRelationsFixture from '../fixtures-docs/view-relations.json'
import { highlightAllSnippets } from './highlight'
import { LOOSE_SIMULATION, toGraphData } from './pivotick'
import { renderSiteHeader } from './siteHeader'
import { getTheme, onThemeChange } from './theme'

renderSiteHeader('docs')
highlightAllSnippets()
initCopyButtons()

// One button per static <pre class="docs-snippet"> (Getting Started only —
// the per-concept .docs-example previews have no code block to copy).
// Reads .textContent rather than the fixture/source string so it always
// copies exactly what highlightAllSnippets() rendered, tag markup stripped.
function initCopyButtons(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('.docs-copy-btn')) {
    const code = button.parentElement?.querySelector('pre.docs-snippet code')
    if (!code) continue
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent ?? '').then(() => {
        button.textContent = 'Copied!'
        button.classList.add('docs-copy-btn-done')
        setTimeout(() => {
          button.textContent = 'Copy'
          button.classList.remove('docs-copy-btn-done')
        }, 1500)
      })
    })
  }
}

// Keyed by each <div class="docs-example" data-fixture="..."> in docs.html.
// Deliberately tiny, hand-written fixtures under ../fixtures-docs/ — NOT
// ../fixtures/, which demo/src/main.ts globs into the Demo page's fixture
// picker; these are illustration-only and don't belong there.
const FIXTURES: Record<string, unknown> = {
  event: eventFixture,
  'event-object': eventObjectFixture,
  'event-attribute': eventAttributeFixture,
  'event-tag': eventTagFixture,
  'event-galaxy': eventGalaxyFixture,
  'object-attribute': objectAttributeFixture,
  'attribute-tag': attributeTagFixture,
  'attribute-galaxy': attributeGalaxyFixture,
  'attribute-sighting': attributeSightingFixture,
  // 'view-detailed' and 'view-grouped' intentionally share one fixture —
  // the whole point of the pairing (see docs.html's Views section) is
  // showing the *same* data with viewMode the only thing that changed.
  'view-detailed': viewDetailedFixture,
  'view-grouped': viewDetailedFixture,
  'view-relations': viewRelationsFixture,
  'view-correlation': viewCorrelationFixture
}

// Only the Views section's examples need a non-default viewMode — every
// other key above falls through to 'detailed' via toGraphData's own default.
const VIEW_MODES: Record<string, 'detailed' | 'grouped' | 'relations' | 'correlation'> = {
  'view-grouped': 'grouped',
  'view-relations': 'relations',
  'view-correlation': 'correlation'
}

interface Example {
  key: string
  mount: HTMLElement
}

const examples: Example[] = Array.from(document.querySelectorAll<HTMLElement>('.docs-example')).flatMap(el => {
  const key = el.dataset.fixture ?? ''
  const mount = el.querySelector<HTMLElement>('.docs-preview')
  if (!mount || !FIXTURES[key]) return []
  return [{ key, mount }]
})

// Every mini preview is Pivotick in its "basic" shape — just render +
// simulation + layout, none of the sidebar/tooltip/mode-rail/editors chrome
// the Demo page's full UI turns on. Physics-wise these use LOOSE_SIMULATION
// (Pivotick's own named "loose" preset, translated to raw d3-force values) —
// the Demo page itself leaves physics untouched (Pivotick's own defaults).
function renderExample(example: Example): void {
  example.mount.innerHTML = ''
  const theme = getTheme()
  const fixture = FIXTURES[example.key]
  const viewMode = VIEW_MODES[example.key]
  new Pivotick(example.mount, toGraphData(fixture, theme, viewMode), {
    isDirected: true,
    render: {
      type: 'svg',
      zoomEnabled: true,
      zoomAnimation: true,
      dragEnabled: true,
      interactionEnabled: true
    },
    simulation: {
      enabled: true,
      useWorker: true,
      fitViewOnExpandCollapse: true,
      ...LOOSE_SIMULATION
    },
    layout: {
      type: 'force'
    },
    // Pivotick reads `theme` from options.UI.theme, not a top-level
    // `theme` — see the same note in main.ts's renderPivotick(). This is
    // the only `UI` key these "basic" previews need.
    UI: {
      theme
    }
  })
}

function renderAll(): void {
  for (const example of examples) renderExample(example)
}

renderAll()
onThemeChange(renderAll)
