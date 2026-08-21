import { ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult, PivotickRenderOptions, RawEdge, RawNode } from 'pivotick-transformer-core'
import { toDot } from 'pivotick-transformer-dot'
import 'pivotick-transformer-misp'

import type { Viz } from '@viz-js/viz'
import { select } from 'd3-selection'

import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../vendor/pivotick/pivotick.css'

import { renderJsonViewer } from './jsonViewer.js'
import { initThemeToggle } from './theme.js'

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
const viewSelect = document.querySelector<HTMLSelectElement>('#view-select')!
const styleSelect = document.querySelector<HTMLSelectElement>('#style-select')!
const smartZoomCheckbox = document.querySelector<HTMLInputElement>('#smart-zoom-checkbox')!
const fullLabelsCheckbox = document.querySelector<HTMLInputElement>('#full-labels-checkbox')!
const form = document.querySelector<HTMLFormElement>('#controls')!
const statusEl = document.querySelector<HTMLElement>('#status')!
const jsonOutput = document.querySelector<HTMLElement>('#json-output')!
const outputSummaryMeta = document.querySelector<HTMLElement>('#output-summary-meta')!
const container = document.querySelector<HTMLDivElement>('#pivotick-container')!
const dropzone = document.querySelector<HTMLDivElement>('#dropzone')!
const fileInput = document.querySelector<HTMLInputElement>('#file-input')!
const pasteJson = document.querySelector<HTMLDetailsElement>('#paste-json')!
const pasteTextarea = document.querySelector<HTMLTextAreaElement>('#paste-textarea')!
const pasteLoadBtn = document.querySelector<HTMLButtonElement>('#paste-load-btn')!

let pivotickInstance: Pivotick | undefined

// ── Smart zoom ────────────────────────────────────────────────────────
//
// When enabled, the Style dropdown is driven automatically from
// Pivotick's own current zoom level instead of picked by hand: zoomed in
// shows 'card' (full detail), a middle band shows 'label' (icon + name
// only), and zoomed out past that shows 'icon' (icon only) — cheaper to
// render once you're too zoomed out for per-node detail to be legible
// anyway.
const SMART_ZOOM_CARD_MIN_SCALE = 1
const SMART_ZOOM_LABEL_MIN_SCALE = 0.4

function styleForZoomScale(k: number): 'card' | 'label' | 'icon' {
  if (k >= SMART_ZOOM_CARD_MIN_SCALE) return 'card'
  if (k >= SMART_ZOOM_LABEL_MIN_SCALE) return 'label'
  return 'icon'
}

let smartZoomCurrentStyle: 'card' | 'label' | 'icon' = 'card'
let smartZoomDebounceTimer: ReturnType<typeof setTimeout> | undefined

// Bumped once at the top of every `render()` call — a general "which
// render() call is this" counter that anything async started by a given
// render() can check against later to tell whether it's still the most
// current one.
//
// Smart zoom needs this: a `canvasZoom` listener attached by
// `attachSmartZoom()` closes over the generation value current at attach
// time — if a *newer* render() has since run (bumping this further) by
// the time the listener's own debounce timer fires, that listener is
// stale (its instance has already been replaced) and must not call
// render() again. Without this guard, restoring the captured zoom
// transform onto a freshly-created instance (see `restoreZoomTransform()`)
// can itself dispatch a `canvasZoom` event — if that lands on the
// *already-reattached* listener (observed in practice to depend on
// d3-zoom's own internal scheduling, not always perfectly synchronous),
// it would otherwise re-enter `render()` and repeat forever. This turns
// "only the single most current listener may ever trigger another
// render" into an invariant, independent of exactly which echo/ordering
// caused the extra event.
//
// The `.dot` view (see `renderDotView()`) needs the same guard for a
// different reason: loading the Graphviz WASM instance is asynchronous,
// so a slow first load finishing after the user has already switched
// fixture/view again must not overwrite what's on screen by then.
let renderGeneration = 0

/** A d3-zoom `ZoomTransform`'s own shape — just the three fields anything here reads/passes through. */
interface ZoomTransformLike {
  k: number
  x: number
  y: number
}

/**
 * Pivotick's `renderer` — and its `getGraphInteraction()` (whose
 * `on('canvasZoom', ...)` fires on every zoom/pan tick with the current
 * d3-zoom transform), `getZoomTransform()`, and `getZoomBehavior()`
 * methods — are real public methods on a constructed instance, verified
 * directly against the vendored bundle
 * (demo/vendor/pivotick/index-Bzoqf7dC.js), but aren't declared in the
 * hand-maintained vendor/pivotick/pivotick.es.d.ts, which only covers
 * what this file already used before Smart zoom (constructor/destroy/
 * simulation). Typed here instead of touching that file, which is meant
 * to only grow with what's actually used.
 */
interface PivotickZoomAccess {
  renderer?: {
    getGraphInteraction?: () => { on: (eventName: string, callback: (event: { transform: ZoomTransformLike }) => void) => void } | undefined
    getZoomTransform?: () => ZoomTransformLike | undefined
    getZoomBehavior?: () => { transform: (selection: unknown, transform: ZoomTransformLike) => void } | undefined
    // Present on every renderer (verified in the vendored bundle) but not
    // otherwise used by this file — see `disableAutoFitOnLoad()`'s doc for
    // why it's typed here just to be overwritten with a no-op.
    fitAndCenterWhenSettled?: (scale?: number) => void
  }
}

/** Reads the current pan/zoom transform off an instance about to be destroyed, so `restoreZoomTransform()` can reapply it to its replacement. `undefined` on the very first render (no prior instance yet). */
function captureZoomTransform(instance: Pivotick | undefined): ZoomTransformLike | undefined {
  return (instance as unknown as PivotickZoomAccess | undefined)?.renderer?.getZoomTransform?.()
}

/**
 * Every `new Pivotick(...)` construction — not just Smart zoom's own
 * threshold-crossing recreations — schedules an automatic "fit and
 * center the whole graph" pass on its own, verified directly against the
 * vendored bundle: the constructor's `startAndRender()` (fired
 * fire-and-forget, not awaited) does `await simulation.start(); await
 * simulation.waitForSimulationStop(); renderer.fitAndCenterWhenSettled()`
 * — the last step polls the layout's bounding box until it stops
 * changing (up to ~3s) and then snaps the zoom/pan to fit the *entire*
 * graph in view, unconditionally, with no constructor option to skip it.
 *
 * That directly fights `restoreZoomTransform()`: it fires asynchronously,
 * well after this file's own synchronous `render()` has already restored
 * the previous transform, silently overwriting it back to a "fit
 * everything" view moments later — and since that's a real zoom change,
 * it dispatches its own `canvasZoom` event too, which Smart zoom's
 * listener (still the current generation) would otherwise treat as
 * genuine input and recompute the style bucket from, cascading into
 * repeated, never-settling re-renders.
 *
 * There's no supported constructor/`RendererOptions` flag to opt out
 * (confirmed against the vendored source), so this overwrites the
 * instance's own `renderer.fitAndCenterWhenSettled` with a no-op right
 * after construction — before the async chain above ever gets to call
 * it. Deliberately narrow: only this one always-on, on-load pass is
 * disabled; `fitAndCenter()` itself (e.g. a manual "fit view" toolbar
 * button, if the UI exposes one) is left untouched.
 */
function disableAutoFitOnLoad(instance: Pivotick): void {
  const renderer = (instance as unknown as PivotickZoomAccess).renderer
  if (renderer) renderer.fitAndCenterWhenSettled = () => {}
}

/**
 * Reapplies a captured pan/zoom transform to a freshly-constructed
 * instance — `render()` calls this after every recreation (not just
 * Smart zoom's own threshold-crossing ones) so switching Style, toggling
 * Full labels, or Smart zoom itself changing style never yanks the view
 * back to the default framing. Goes through a genuine d3 selection
 * (`select()`) and `zoomBehavior.transform()` — the real, documented
 * d3-zoom idiom for setting a transform programmatically (as opposed to
 * via a user gesture) — rather than trying to poke at `zoomGroup`'s own
 * SVG `transform` attribute directly, which would desync d3-zoom's own
 * internal transform state from what's on screen.
 *
 * Must target Pivotick's own canvas element specifically
 * (`svg.pvt-canvas-element`) rather than a plain `querySelector('svg')` —
 * the container also holds dozens of unrelated `<svg>`s (toolbar buttons,
 * node badges, ...), and a bare `'svg'` selector matches whichever of
 * those happens to come first in the DOM. Setting the transform there
 * still *looked* right (the `'zoom'` handler is a closure over the
 * renderer's real zoom-layer, not bound to which node fired it, so it
 * dutifully repainted at the intended scale) but left the real canvas
 * node's own internal zoom state at whatever it was before — so the next
 * drag gesture on the actual canvas computed its delta from that stale
 * baseline instead of the one just restored, snapping the view back to
 * it mid-pan.
 */
function restoreZoomTransform(instance: Pivotick, transform: ZoomTransformLike | undefined): void {
  if (!transform) return
  const zoomBehavior = (instance as unknown as PivotickZoomAccess).renderer?.getZoomBehavior?.()
  const svgEl = container.querySelector('svg.pvt-canvas-element')
  if (zoomBehavior && svgEl) zoomBehavior.transform(select(svgEl), transform)
}

/**
 * Wires up Smart zoom on a freshly-constructed Pivotick instance — no-op
 * if the checkbox is off. Debounced ~500ms after the last zoom/pan tick
 * (Pivotick's `canvasZoom` event fires on every tick, not just when a
 * gesture ends) so one zoom gesture crossing a threshold doesn't
 * re-render mid-motion.
 *
 * Re-rendering here means the same full destroy+recreate `render()`
 * already does for every other control — there is no supported Pivotick
 * API to swap a converter's `renderNode` callback on an
 * already-constructed graph (verified against the vendored bundle: the
 * `style` value is captured once in a closure when
 * `MispIconRenderingConverter.getRenderNode()` is called, not re-read per
 * node). `render()`'s own capture/restore of the zoom transform (see
 * above) is what keeps this recreation invisible — you stay at the same
 * pan/zoom index you were at, only the node style underneath changes.
 */
function attachSmartZoom(instance: Pivotick): void {
  if (!smartZoomCheckbox.checked) return
  const graphInteraction = (instance as unknown as PivotickZoomAccess).renderer?.getGraphInteraction?.()
  if (!graphInteraction) return

  // See `renderGeneration`'s doc: this listener is only allowed to act
  // while it's still the one attached by the *current* render() call.
  const generationAtAttach = renderGeneration

  graphInteraction.on('canvasZoom', (event) => {
    if (generationAtAttach !== renderGeneration) return
    if (smartZoomDebounceTimer !== undefined) clearTimeout(smartZoomDebounceTimer)
    smartZoomDebounceTimer = setTimeout(() => {
      if (generationAtAttach !== renderGeneration) return
      const nextStyle = styleForZoomScale(event.transform.k)
      if (nextStyle !== smartZoomCurrentStyle) {
        smartZoomCurrentStyle = nextStyle
        render()
      }
    }, 500)
  })
}

// ── .dot view ─────────────────────────────────────────────────────────
//
// An alternative to the interactive Pivotick canvas: run the exact same
// converted `data` through `pivotick-transformer-dot`'s `toDot()` and lay
// it out with a real Graphviz build (`@viz-js/viz`, compiled to WASM) —
// mainly so `pivotick-transformer-dot` has somewhere to actually prove
// its output is valid, laid-out-able DOT, not just well-formed text.

let vizInstancePromise: Promise<Viz> | undefined

/**
 * Loads the WASM Graphviz build on first use only; every later call
 * reuses the same instance. A dynamic `import()` — not a static one at
 * the top of this file — so the (multi-MB, wasm-bundling) module is its
 * own chunk, fetched only by someone who actually opens the `.dot` view,
 * not by every visitor of the default Pivotick-canvas view.
 */
function getViz(): Promise<Viz> {
  vizInstancePromise ??= import('@viz-js/viz').then((viz) => viz.instance())
  return vizInstancePromise
}

/** Replaces `target`'s content with a plain, non-interactive text block — used for the DOT source, as opposed to `renderJsonViewer()`'s tree view for the usual nodes/edges JSON. */
function renderPlainTextOutput(target: HTMLElement, text: string): void {
  const pre = document.createElement('pre')
  pre.className = 'dot-source-output'
  pre.textContent = text
  target.replaceChildren(pre)
}

/**
 * Relative-luminance contrast pick (standard sRGB luma coefficients, not
 * tied to any one converter's palette) — for a node filled with
 * `hexColor`, which of black/white text stays readable on it. Mirrors
 * what MISP's own badge rendering already does for the same reason (see
 * `packages/misp/src/shared/styles.json`'s `badge.contrast`), just
 * reimplemented generically here rather than importing that MISP-specific
 * config into a view meant to work with any registered converter.
 */
function readableTextColor(hexColor: string): string {
  const match = /^#([0-9a-f]{6})$/i.exec(hexColor)
  if (!match) return '#000000'
  const channel = (offset: number): number => parseInt(match[1].slice(offset, offset + 2), 16) / 255
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4)
  return luminance > 0.6 ? '#0f172a' : '#ffffff'
}

/**
 * Best-effort translation of a node's resolved Pivotick style — via
 * whichever `GraphConverter` produced it, through the same
 * `nodeTypeAccessor`/`nodeStyleMap`/`defaultNodeStyle` mechanism Pivotick
 * itself uses (`toPivickOptions().render`, passed in as `render`) — into
 * DOT attributes. Deliberately narrow: `color` and `shape` are the only
 * two concepts common enough to map with any confidence (every shape
 * name this repo's converters use — hexagon/square/circle — is already a
 * real Graphviz shape keyword); a style's icon SVGs, pixel sizes, etc.
 * have no sane DOT equivalent and are left alone. This lives here rather
 * than in `pivotick-transformer-dot` itself because it's inherently
 * tied to *this* rendering convention — a future converter for a
 * different format is free to shape its own style objects differently.
 */
function dotNodeAttributes(node: RawNode, render: PivotickRenderOptions): Record<string, string> {
  const type = render.nodeTypeAccessor?.(node)
  const style = (type !== undefined ? render.nodeStyleMap?.[type] : undefined) ?? render.defaultNodeStyle
  if (!style) return {}

  const attrs: Record<string, string> = {}
  if (typeof style.shape === 'string') attrs.shape = style.shape
  if (typeof style.color === 'string') {
    attrs.style = 'filled'
    attrs.color = style.color
    attrs.fillcolor = style.color
    attrs.fontcolor = readableTextColor(style.color)
  }
  return attrs
}

/**
 * Same idea as `dotNodeAttributes()`, but edge style needs no render-side
 * lookup — every converter that wants its edges actually styled in
 * Pivotick has to attach `{ edge: { strokeColor, strokeWidth, dashed,
 * markerEnd } }` directly to `RawEdge.style` in the first place (verified
 * against Pivotick's real `Edge.getEdgeStyle()`, which reads `this.style
 * ?.edge` — see `packages/misp/src/shared/edgeStyleFor.ts`'s doc), so
 * it's already sitting right there on the edge this function is called
 * with.
 */
function dotEdgeAttributes(edge: RawEdge): Record<string, string> {
  const edgeStyle = (edge.style as { edge?: Record<string, unknown> } | undefined)?.edge
  if (!edgeStyle) return {}

  const attrs: Record<string, string> = {}
  if (typeof edgeStyle.strokeColor === 'string') attrs.color = edgeStyle.strokeColor
  if (typeof edgeStyle.strokeWidth === 'number') attrs.penwidth = String(edgeStyle.strokeWidth)
  if (edgeStyle.dashed === true) attrs.style = 'dashed'
  if (edgeStyle.markerEnd === 'none') attrs.arrowhead = 'none'
  return attrs
}

/**
 * The `.dot` View option's counterpart to constructing a `Pivotick`
 * instance: shows the raw DOT source in the "Converted output" panel
 * (more useful here than the usual JSON — it's the actual artifact being
 * checked), then, once Graphviz has laid it out, the resulting SVG in the
 * graph area.
 *
 * `generation` is `renderGeneration`'s value as of the `render()` call
 * that kicked this off — loading the WASM build is only ever slow on the
 * very first call, but that's enough time for the user to have already
 * switched to a different fixture or back to the Pivotick view, whose
 * result this must then not clobber.
 */
async function renderDotView(data: ConversionResult, render: PivotickRenderOptions, format: string, variantId: string, generation: number): Promise<void> {
  const dotSource = toDot(data, {
    nodeAttributes: (node) => dotNodeAttributes(node, render),
    edgeAttributes: dotEdgeAttributes,
  })
  renderPlainTextOutput(jsonOutput, dotSource)

  try {
    const viz = await getViz()
    if (generation !== renderGeneration) return
    const svg = viz.renderSVGElement(dotSource)
    container.replaceChildren(svg)
    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId} as .dot (Graphviz).`
  } catch (error) {
    if (generation !== renderGeneration) return
    statusEl.textContent = `Graphviz couldn't render this .dot output: ${error instanceof Error ? error.message : String(error)}`
  }
}

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
  // Invalidates any Smart zoom listener still attached from a previous
  // instance, and any still-loading `.dot` view render — see
  // `renderGeneration`'s doc.
  renderGeneration++
  const generation = renderGeneration

  const fixture = getFixtureData(fixtureSelect.value)
  if (!fixture.found) {
    statusEl.textContent = 'Add a fixture under demo/fixtures/<format>/, or drop one into the dropzone.'
    return
  }

  const format = formatSelect.value
  const variantId = variantSelect.value
  const isDotView = viewSelect.value === 'dot'

  // Smart zoom only makes sense for the Pivotick canvas — the `.dot` view
  // is a static Graphviz layout with no zoom-index of its own to drive it
  // from, so it's greyed out (but left checked, so switching back to
  // Pivotick resumes it) and never consulted for `style` below.
  smartZoomCheckbox.disabled = isDotView
  const smartZoomActive = !isDotView && smartZoomCheckbox.checked
  // Smart zoom (when active) drives the Style dropdown automatically —
  // see attachSmartZoom()'s doc — and keeps the dropdown itself disabled
  // and in sync so its displayed value never lies about what's actually
  // rendering.
  styleSelect.disabled = smartZoomActive
  if (smartZoomActive) styleSelect.value = smartZoomCurrentStyle
  const style = smartZoomActive ? smartZoomCurrentStyle : styleSelect.value

  let data: ConversionResult
  try {
    const converter = ConverterRegistry.get(format, variantId)
    // `fullLabels`/`style` are only meaningful to converters that define
    // them (currently just pivotick-transformer-misp's "never truncate a
    // badge" toggle and its card/flat/label/icon rendering choice) —
    // passed through unconditionally since ConverterOptions is free-form
    // and a converter that doesn't look at a given key just ignores it.
    const toPivotick = converter.toPivotickOptions(fixture.data, {
      fullLabels: fullLabelsCheckbox.checked,
      style,
    })
    data = toPivotick.data
    outputSummaryMeta.textContent = `${data.nodes.length} node(s), ${data.edges.length} edge(s)`

    if (isDotView) {
      pivotickInstance?.destroy()
      pivotickInstance = undefined
      container.innerHTML = ''
      statusEl.textContent = 'Loading Graphviz…'
      void renderDotView(data, toPivotick.render, format, variantId, generation)
      return
    }

    renderJsonViewer(jsonOutput, data)

    const previousZoomTransform = captureZoomTransform(pivotickInstance)
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
    // Only when there's an actual previous view to preserve — see
    // `disableAutoFitOnLoad()`'s doc. On the very first render (no prior
    // instance, `previousZoomTransform` is undefined) there's nothing to
    // protect from being overwritten, so Pivotick's own auto-fit stays on
    // and nicely frames the graph as it always did. Must happen before
    // anything below yields to the event loop, since it's racing
    // Pivotick's own fire-and-forget post-construction pass.
    if (previousZoomTransform) disableAutoFitOnLoad(pivotickInstance)
    // Wider default spacing (Pivotick's own 'loose' physics preset —
    // more link distance/repulsion, less crowding) — mainly requested to
    // give the custom-rendered cards more breathing room, since a
    // tighter layout makes their approximate circular edge-anchor radius
    // more likely to visibly overlap a neighbour.
    pivotickInstance.simulation?.applyPhysicsPreset('loose')
    restoreZoomTransform(pivotickInstance, previousZoomTransform)
    attachSmartZoom(pivotickInstance)

    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId}.`
  } catch (error) {
    statusEl.textContent = error instanceof Error ? error.message : String(error)
    jsonOutput.replaceChildren()
    outputSummaryMeta.textContent = ''
  }
}

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
viewSelect.addEventListener('change', render)
styleSelect.addEventListener('change', render)
smartZoomCheckbox.addEventListener('change', render)
fullLabelsCheckbox.addEventListener('change', render)
form.addEventListener('submit', (event) => {
  event.preventDefault()
  render()
})

// pivotick.css's [data-theme] rules are scoped to `.pivotick[data-theme=…]`
// (the embedded widget's own root, set by its `UI.theme` option — see
// UIManager.ts) — NOT to <html>. initThemeToggle() already flips <html>'s
// [data-theme] for our own page chrome; this callback additionally patches
// the widget's own root live, if it's already rendered.
initThemeToggle((theme) => {
  container.querySelector<HTMLElement>('.pivotick')?.setAttribute('data-theme', theme)
})
populateFormats()
populateFixtures()
