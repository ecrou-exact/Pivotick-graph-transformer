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
  'attribute-sighting': attributeSightingFixture
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
// the Demo page's full UI turns on. Physics-wise these use Pivotick's own
// named "loose" preset (LOOSE_SIMULATION) rather than the Demo page's much
// stronger TUNED_SIMULATION — these examples are only 2-5 nodes, nowhere
// near the dozens-of-nodes crowding TUNED_SIMULATION exists to fix.
function renderExample(example: Example): void {
  example.mount.innerHTML = ''
  const theme = getTheme()
  const fixture = FIXTURES[example.key]
  new Pivotick(example.mount, toGraphData(fixture, theme), {
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
