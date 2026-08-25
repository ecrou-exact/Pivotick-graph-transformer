import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../../packages/misp/src/index'
import tagFixture from '../fixtures-docs/attribute-tag.json'
import { LOOSE_SIMULATION, toGraphData } from './pivotick'
import { renderSiteHeader } from './siteHeader'
import { getTheme, onThemeChange } from './theme'

renderSiteHeader('home')

const mount = document.querySelector<HTMLElement>('.home-preview-mount')

// Exactly docs.html's per-concept preview treatment (see docs.ts's
// renderExample) — same "basic" Pivotick shape, same loose physics, same
// box — just here as a bit of visual life on the homepage instead of next
// to a documented example.
function renderTagPreview(): void {
  if (!mount) return
  mount.innerHTML = ''
  const theme = getTheme()
  new Pivotick(mount, toGraphData(tagFixture, theme), {
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
    UI: {
      theme
    }
  })
}

renderTagPreview()
onThemeChange(renderTagPreview)
