import '../vendor/pivotick/pivotick.css'
import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../../packages/misp/src/index'
import { GraphRegistry } from '../../packages/core/src/index'
import mispFixture from '../fixtures/misp/Event/simple-event.json'

const container = document.getElementById('app')
if (!container) throw new Error('Missing #app container')

// Node shape/color come baked into the JSON itself (see resolveNodeAppearance
// in packages/core and MispEventImporter's built-in defaults) — nothing here
// configures Pivotick's own styling mechanism.
const importer = GraphRegistry.getImporter('misp')
const data = importer.convert(mispFixture)

// Every user-facing toggle explicitly on, so the demo shows the full UI —
// see GraphOptions/GraphUI/RendererOptions in the vendored Pivotick v1.5.0.
new Pivotick(container, data, {
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
    tooltip: { enabled: true, allowPinning: true },
    contextMenu: { enabled: true },
    navigation: { enabled: true },
    editors: { nodeEditor: { enabled: true } },
    // "coming soon" mode-rail slots — off by default, shown here since we
    // want every visible affordance on, even the disabled SOON badges.
    modeRail: { explore: true, enrich: true }
  }
})
