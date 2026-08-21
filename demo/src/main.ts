import { ConverterRegistry } from 'pivotick-transformer-core'
import type { ConversionResult, PivotickRenderOptions, RawEdge, RawNode } from 'pivotick-transformer-core'
import { toDot } from 'pivotick-transformer-dot'
import { toGraphML } from 'pivotick-transformer-graphml'
import type { GraphMLEdgeStyle, GraphMLNodeStyle } from 'pivotick-transformer-graphml'
import 'pivotick-transformer-misp'

import type { ImageSize, Viz } from '@viz-js/viz'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force'
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
 * Extracts a raw `<svg>` string's own intrinsic size from its `viewBox`
 * — misp-iconify's icons are ordinary SVG-icon-pack output, not a
 * uniform grid: attribute icons are `0 0 24 24`, but plenty of galaxy
 * icons (converted from other icon packs) are wide/short or tall/narrow
 * (e.g. `0 0 640 448`). Graphviz needs a real width/height to lay a node
 * out around an `image` attribute (see `dotNodeIcon()`), and it can't
 * measure a `data:` URI itself (`@viz-js/viz` runs sandboxed, no image
 * decoding) — this is what that size comes from, scaled to `targetHeight`
 * points tall with the aspect ratio preserved. Returns `undefined` for
 * anything that isn't a plain numeric `viewBox` (defensive — every icon
 * this repo vendors has one, but this only ever gates an optional visual
 * extra, never a correctness-critical path).
 */
function svgIconSize(svg: string, targetHeight: number): { width: number; height: number } | undefined {
  const match = /viewBox="[\d.-]+ [\d.-]+ ([\d.]+) ([\d.]+)"/.exec(svg)
  if (!match) return undefined
  const [viewBoxWidth, viewBoxHeight] = [Number(match[1]), Number(match[2])]
  if (!viewBoxWidth || !viewBoxHeight) return undefined
  return { width: targetHeight * (viewBoxWidth / viewBoxHeight), height: targetHeight }
}

/**
 * Builds a `data:image/svg+xml` URI Graphviz's `image` node attribute can
 * reference — every icon here (`icons.generated.ts`, from misp-iconify)
 * draws with `stroke="currentColor"`, meaning it renders invisibly
 * (inherits nothing) once it's its own standalone image document rather
 * than inline in the page, so `color` is set directly on the root `<svg>`
 * to give `currentColor` something to resolve to, same fix Pivotick's own
 * badge rendering needs for the same reason (see `mispTagsAndGalaxies.ts`
 * on why a Tag's icon "follows strokeColor, not color").
 */
function svgIconDataUri(svg: string, color: string): string {
  const colored = svg.replace('<svg ', `<svg color="${color}" `)
  return `data:image/svg+xml,${encodeURIComponent(colored)}`
}

const ICON_TARGET_HEIGHT_POINTS = 20

/**
 * Resolves a node style's `svgIcon` (if any) into a Graphviz `image`
 * attribute value plus the `ImageSize` entry that must accompany it in
 * `SVGRenderOptions.images` — see `svgIconSize()`'s doc for why Graphviz
 * needs telling. `iconColor` is whatever `dotNodeAttributes()` already
 * decided the node's icon/text should read in (its `strokeColor`
 * override, or a contrast pick against the fill) — kept as a plain
 * parameter here rather than recomputed, so the two stay in sync by
 * construction rather than by two call sites agreeing on the same logic.
 */
function dotNodeIcon(style: Record<string, unknown>, iconColor: string): { image: string; size: ImageSize } | undefined {
  if (typeof style.svgIcon !== 'string') return undefined
  const size = svgIconSize(style.svgIcon, ICON_TARGET_HEIGHT_POINTS)
  if (!size) return undefined
  const image = svgIconDataUri(style.svgIcon, iconColor)
  return { image, size: { name: image, ...size } }
}

/**
 * Best-effort translation of a node's resolved Pivotick style into DOT
 * attributes. Two layers, matching how Pivotick's own renderer resolves a
 * node's style (verified against its real `NodeDrawer`): a category
 * default from `nodeTypeAccessor`/`nodeStyleMap`/`defaultNodeStyle`
 * (`toPivickOptions().render`, passed in as `render`) — e.g. every MISP
 * Tag is grey — overridden field-by-field by the node's own `RawNode
 * .style`, if it set one — e.g. a specific Tag like `tlp:red` carries its
 * taxonomy's *real* colour there (see `mispTagsAndGalaxies.ts`'s
 * `addMispTags()`), which must win over the generic "tag" grey.
 *
 * Deliberately narrow on which fields get mapped: `shape`/`color` (every
 * shape name this repo's converters use — hexagon/square/circle — is
 * already a real Graphviz shape keyword), `strokeColor`/`strokeWidth`
 * for the border — mirroring why MISP sets a `strokeColor` on light Tags
 * at all: fill alone can wash out the node against a similarly light
 * background (see the `tlp:white`-legible-even-though-white case in
 * that same doc), so it stays worth carrying over here too — and
 * `svgIcon` via `dotNodeIcon()`, MISP's real misp-iconify icon per
 * entity type. Pixel sizes and anything else with no sane DOT equivalent
 * are left alone. This lives here rather than in `pivotick-transformer-
 * dot` itself because it's inherently tied to *this* rendering
 * convention — a future converter for a different format is free to
 * shape its own style objects differently.
 *
 * `icons` collects one `ImageSize` per distinct icon actually used
 * (deduped by data URI, since the same icon appears on every node of a
 * given type) — the caller hands the accumulated values to
 * `viz.renderSVGElement()`'s own `images` option once every node has been
 * visited, since Graphviz needs each image's size declared up front, not
 * discoverable mid-layout.
 */
/**
 * Graphviz's `circle` and `square` node shapes force `regular=true` —
 * width and height locked equal — baked into those two shape names
 * specifically (confirmed empirically: an explicit `regular="false"`
 * attribute is silently ignored on them, so it can't be overridden
 * node-by-node). Harmless for a short label, but a longer one still has
 * to fit, so *both* dimensions balloon out to its width — dramatically,
 * for a node whose label is a full sentence — dwarfing everything drawn
 * inside, including a fixed-size icon meant to sit near its top edge.
 * `ellipse`/`box` (Graphviz's *actual* default, non-regular shapes) read
 * as the same "round" / "sharp-cornered" shape family at a glance —
 * genuinely circular/square for a short label, same as before — but
 * scale their two dimensions independently, so a long label just widens
 * the node instead of inflating it into a giant square/circle.
 */
const DOT_NON_REGULAR_SHAPE: Record<string, string> = {
  circle: 'ellipse',
  square: 'box',
}

function dotNodeAttributes(node: RawNode, render: PivotickRenderOptions, icons: Map<string, ImageSize>): Record<string, string> {
  const type = render.nodeTypeAccessor?.(node)
  const categoryStyle = (type !== undefined ? render.nodeStyleMap?.[type] : undefined) ?? render.defaultNodeStyle
  const style = { ...categoryStyle, ...node.style }

  const attrs: Record<string, string> = {}
  if (typeof style.shape === 'string') attrs.shape = DOT_NON_REGULAR_SHAPE[style.shape] ?? style.shape
  if (typeof style.color === 'string') {
    attrs.style = 'filled'
    attrs.fillcolor = style.color
    attrs.fontcolor = readableTextColor(style.color)
  }
  // `color` (the border) is only set from an explicit `strokeColor` —
  // never defaulted to the fill colour. Left unset, Graphviz's own
  // default border (a thin black outline) already reads fine on every
  // fill colour here, which a same-as-fill border wouldn't.
  if (typeof style.strokeColor === 'string') attrs.color = style.strokeColor
  if (typeof style.strokeWidth === 'number') attrs.penwidth = String(style.strokeWidth)

  const iconColor = typeof style.strokeColor === 'string' ? style.strokeColor : readableTextColor(typeof style.color === 'string' ? style.color : '#64748b')
  const icon = dotNodeIcon(style, iconColor)
  if (icon) {
    attrs.image = icon.image
    icons.set(icon.image, icon.size)
    // Graphviz centers both an `image` and a `label` on the node by
    // default (`imagepos`/`labelloc` both default to middle) — with
    // neither told otherwise they land exactly on top of each other,
    // label text obscuring the icon underneath it. Stacking them (icon
    // above, text below, matching Pivotick's own badge layout) needs
    // `height` bumped past Graphviz's own default too — otherwise the
    // shape only grows to fit whichever of the two is taller, not both
    // stacked, and they still overlap.
    attrs.imagepos = 'tc'
    attrs.labelloc = 'b'
    attrs.height = String((ICON_TARGET_HEIGHT_POINTS + 28) / 72)
  }
  return attrs
}

/**
 * Same idea as `dotNodeAttributes()`, for edges — but only one layer:
 * every converter that wants its edges actually styled in Pivotick has to
 * attach `{ edge: { strokeColor, strokeWidth, dashed, markerEnd } }`
 * directly to `RawEdge.style` in the first place (verified against
 * Pivotick's real `Edge.getEdgeStyle()`, which reads `this.style?.edge`
 * — see `edgeStyleFor.ts`'s doc), so there's no separate per-node-style
 * override to merge in on top — it's already sitting right there on the
 * edge this function is called with. Falls back to `render
 * .defaultEdgeStyle` (flat, no `edge` wrapper — the one shape Pivotick's
 * renderer *does* read a bare fallback from) for the rare edge with no
 * per-edge style of its own.
 */
function dotEdgeAttributes(edge: RawEdge, render: PivotickRenderOptions): Record<string, string> {
  const edgeStyle = (edge.style as { edge?: Record<string, unknown> } | undefined)?.edge ?? render.defaultEdgeStyle ?? {}

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
  const icons = new Map<string, ImageSize>()
  const dotSource = toDot(data, {
    nodeAttributes: (node) => dotNodeAttributes(node, render, icons),
    edgeAttributes: (edge) => dotEdgeAttributes(edge, render),
  })
  renderPlainTextOutput(jsonOutput, dotSource)

  try {
    const viz = await getViz()
    if (generation !== renderGeneration) return
    const svg = viz.renderSVGElement(dotSource, { images: [...icons.values()] })
    container.replaceChildren(svg)
    statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId} as .dot (Graphviz).`
  } catch (error) {
    if (generation !== renderGeneration) return
    statusEl.textContent = `Graphviz couldn't render this .dot output: ${error instanceof Error ? error.message : String(error)}`
  }
}

// ── GraphML view ──────────────────────────────────────────────────────
//
// GraphML (unlike DOT/Graphviz) carries no layout engine of its own —
// see pivotick-transformer-graphml's own README on its `nodePosition`
// option — so this view runs its own quick, throwaway force simulation
// (d3-force, the same library Pivotick's own canvas uses internally)
// purely to give each node a real position before handing it to
// toGraphML(). The generated GraphML text (shown in the "Converted
// output" panel, same as every other view) is the actual deliverable,
// carrying colour/shape/icon as plain data any GraphML-aware tool can
// read — but the on-screen *preview* deliberately doesn't render from
// that text the way the `.dot` view renders from real Graphviz output:
// GraphML has no visual-rendering engine of its own to lean on, and a
// hand-rolled shapes-and-icons approximation (which an earlier version
// of this view did) reads as a plainer, `.dot`-flavoured redraw rather
// than something that actually looks like Pivotick. So instead, the
// preview calls the exact same `render.renderNode` callback the
// Pivotick view itself calls for the current Style choice (card/flat/
// label/icon) — the *real* MISP badge DOM, colours/icons/kind chips and
// all — and places that HTML inside the SVG via `<foreignObject>`, at
// the position the same layout pass already gave each node.

const SVG_NS = 'http://www.w3.org/2000/svg'

interface FlatLayoutEntry {
  id: string
  parentId?: string
  node: RawNode
}

function flattenForLayout(nodes: RawNode[]): FlatLayoutEntry[] {
  const flat: FlatLayoutEntry[] = []
  const seenIds = new Set<string>()
  const visit = (node: RawNode, parentId?: string): void => {
    const id = String(node.id)
    if (!seenIds.has(id)) {
      seenIds.add(id)
      flat.push({ id, parentId, node })
    }
    for (const child of node.children ?? []) visit(child, id)
  }
  for (const node of nodes) visit(node)
  return flat
}

interface SimNode {
  id: string
  x?: number
  y?: number
}

/**
 * Runs a short, fixed-iteration force simulation purely to give each
 * node a real `{x, y}` — see this section's own doc for why. Not meant
 * to be interactive or to match Pivotick's own physics tuning, just
 * spread out enough for a legible static preview; `RawNode.children`
 * (flattened the same way `toGraphML()` itself flattens them) get a
 * synthetic link to their parent too, so a nested node doesn't just sit
 * unconnected wherever the simulation happens to drop it.
 *
 * `radiusById` — each node's own real rendered half-size, from
 * `measureAllNodes()` — drives a collision force so cards don't just
 * land on top of each other: `charge` alone repels every pair by the
 * same fixed strength regardless of size, which reliably still overlaps
 * a big card against a small one.
 */
function computeForceLayout(data: ConversionResult, radiusById: Map<string, number>): Map<string, { x: number; y: number }> {
  const flatNodes = flattenForLayout(data.nodes)
  const simNodes: SimNode[] = flatNodes.map((n) => ({ id: n.id }))
  const simLinks = [
    ...data.edges.map((edge) => ({ source: String(edge.from), target: String(edge.to) })),
    ...flatNodes.filter((n): n is FlatLayoutEntry & { parentId: string } => n.parentId !== undefined).map((n) => ({ source: n.parentId, target: n.id })),
  ]

  const simulation = forceSimulation(simNodes)
    .force('link', forceLink<SimNode, { source: string; target: string }>(simLinks).id((n) => n.id).distance(110))
    .force('charge', forceManyBody().strength(-220))
    .force('collide', forceCollide<SimNode>().radius((n) => radiusById.get(n.id) ?? 40))
    .force('center', forceCenter(0, 0))
    .stop()
  for (let i = 0; i < 300; i++) simulation.tick()

  const positions = new Map<string, { x: number; y: number }>()
  for (const n of simNodes) positions.set(n.id, { x: n.x ?? 0, y: n.y ?? 0 })
  return positions
}

const GRAPHML_NODE_SHAPE: Record<string, string> = {
  circle: 'ellipse',
  square: 'rectangle',
}

/**
 * Rough estimate of a label's on-screen width at roughly the font size
 * a plain GraphML-reading tool (yEd, say — anything that isn't this
 * view's own Pivotick-card preview, which measures its own real DOM
 * instead) would show it at. GraphML has no auto-sizing layout pass to
 * lean on the way Graphviz did for the `.dot` view, so the *exported*
 * `y:Geometry` still needs a real width/height committed to upfront,
 * even though this view's own on-screen preview no longer depends on it
 * (see `renderGraphMLPreview()`, which measures the actual rendered
 * card instead).
 */
function estimateLabelWidth(label: string): number {
  return label.length * 6.5
}

/**
 * Same translation `dotNodeAttributes()` does for the `.dot` view —
 * style resolved the same two-layer way (category default, then a
 * node's own per-node override) — just aimed at GraphML's
 * `GraphMLNodeStyle` shape instead of DOT attributes. `width`/`height`
 * only matter for the *exported* `y:Geometry` now (see
 * `estimateLabelWidth()`'s doc) — the on-screen preview measures its own
 * real card DOM instead, so a plain GraphML reader is the only thing
 * that still depends on this being a reasonable size.
 */
function graphmlNodeStyle(node: RawNode, render: PivotickRenderOptions): GraphMLNodeStyle {
  const type = render.nodeTypeAccessor?.(node)
  const categoryStyle = (type !== undefined ? render.nodeStyleMap?.[type] : undefined) ?? render.defaultNodeStyle
  const style = { ...categoryStyle, ...node.style }

  const label = typeof node.data?.label === 'string' ? node.data.label : String(node.id)
  const hasIcon = typeof style.svgIcon === 'string'

  return {
    shape: typeof style.shape === 'string' ? (GRAPHML_NODE_SHAPE[style.shape] ?? style.shape) : undefined,
    fillColor: typeof style.color === 'string' ? style.color : undefined,
    borderColor: typeof style.strokeColor === 'string' ? style.strokeColor : undefined,
    borderWidth: typeof style.strokeWidth === 'number' ? style.strokeWidth : undefined,
    width: Math.max(64, estimateLabelWidth(label) + 16),
    height: hasIcon ? ICON_TARGET_HEIGHT_POINTS + 34 : 40,
  }
}

/** Same idea as `dotEdgeAttributes()`, aimed at GraphML's `GraphMLEdgeStyle` shape. */
function graphmlEdgeStyle(edge: RawEdge, render: PivotickRenderOptions): GraphMLEdgeStyle {
  const edgeStyle = (edge.style as { edge?: Record<string, unknown> } | undefined)?.edge ?? render.defaultEdgeStyle ?? {}
  return {
    color: typeof edgeStyle.strokeColor === 'string' ? edgeStyle.strokeColor : undefined,
    width: typeof edgeStyle.strokeWidth === 'number' ? edgeStyle.strokeWidth : undefined,
    dashed: edgeStyle.dashed === true,
    arrow: edgeStyle.markerEnd === 'none' ? 'none' : 'standard',
  }
}

/** GraphML has no yFiles-standard icon element (see `pivotick-transformer-graphml`'s README) — carried instead in the *exported* file as this view's own `icon` generic `<data>` field, for a plain GraphML reader; the on-screen preview gets its icon for free, already part of the real card DOM `renderGraphMLPreview()` places. */
function graphmlNodeData(node: RawNode, render: PivotickRenderOptions): Record<string, string> | undefined {
  const type = render.nodeTypeAccessor?.(node)
  const categoryStyle = (type !== undefined ? render.nodeStyleMap?.[type] : undefined) ?? render.defaultNodeStyle
  const style = { ...categoryStyle, ...node.style }
  return typeof style.svgIcon === 'string' ? { icon: style.svgIcon } : undefined
}

function createSvgElement<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag)
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
  return el
}

/**
 * The minimal `{ getData, getStyle }` shape `render.renderNode` (a
 * `RenderNodeFn`) actually calls, per its own implementation in
 * `MispIconRenderingConverter.getRenderNode()` — it never calls
 * `getCircleRadius`/`setCircleRadius` despite the type allowing them, so
 * this doesn't need a real Pivotick `Node` instance to stand in for,
 * just this pair of methods reading straight off the `RawNode` itself.
 */
function fakePivotickNode(node: RawNode): { getData: () => Record<string, unknown> | undefined; getStyle: () => Record<string, unknown> | undefined } {
  return { getData: () => node.data, getStyle: () => node.style }
}

/**
 * Measures `element` the same way Pivotick's own renderer does after
 * calling `renderNode()` (per `RenderNodeFn`'s own doc: "measures the
 * element via `getBoundingClientRect()`") — appended off-screen just
 * long enough to lay out and measure, then handed back still attached to
 * the document (removing it here would also discard any state a card's
 * own DOM construction set up), ready for the caller to place wherever
 * it actually belongs.
 */
function measureRenderedNode(element: HTMLElement): { width: number; height: number } {
  element.style.position = 'fixed'
  element.style.left = '-9999px'
  element.style.top = '-9999px'
  element.style.visibility = 'hidden'
  document.body.append(element)
  const rect = element.getBoundingClientRect()
  element.remove()
  element.style.position = ''
  element.style.left = ''
  element.style.top = ''
  element.style.visibility = ''
  return { width: rect.width || 60, height: rect.height || 40 }
}

/** Plain fallback for a node whose converter has no `renderNode` (or one that, per `RenderNodeFn`'s contract, chose to return nothing for this particular node) — every converter this repo ships always has one, so in practice this only ever matters for a hypothetical future converter that doesn't. */
function fallbackNodeElement(node: RawNode): HTMLElement {
  const div = document.createElement('div')
  div.textContent = typeof node.data?.label === 'string' ? node.data.label : String(node.id)
  div.style.cssText = 'display:inline-block;padding:4px 8px;background:#94a3b8;color:#fff;border-radius:6px;font:600 11px ui-monospace,Menlo,Monaco,Consolas,monospace;white-space:nowrap;'
  return div
}

interface MeasuredNode {
  id: string
  element: HTMLElement
  width: number
  height: number
}

/**
 * Renders (via `render.renderNode`, same as the Pivotick view) and
 * measures every node once, up front. Both `computeForceLayout()`'s
 * collision radius and `renderGraphMLPreview()`'s placement need a real
 * size — computing it once here and threading it through means the same
 * card DOM only ever gets built and measured a single time.
 */
function measureAllNodes(data: ConversionResult, render: PivotickRenderOptions): MeasuredNode[] {
  return flattenForLayout(data.nodes).map(({ id, node }) => {
    const rendered = render.renderNode?.(fakePivotickNode(node))
    const element = rendered instanceof HTMLElement ? rendered : fallbackNodeElement(node)
    const { width, height } = measureRenderedNode(element)
    return { id, element, width, height }
  })
}

interface PreviewNodeBox {
  cx: number
  cy: number
}

/**
 * Builds the GraphML view's on-screen preview — see this section's own
 * doc for why it's real Pivotick badge DOM in `<foreignObject>`s rather
 * than a redraw from the GraphML text. Edges are deliberately plain
 * straight lines with no routing: this is about showing what the *nodes*
 * look like, not competing with Pivotick's own edge rendering.
 */
function renderGraphMLPreview(measuredNodes: MeasuredNode[], edges: RawEdge[], render: PivotickRenderOptions, positions: Map<string, { x: number; y: number }>): SVGSVGElement {
  const svg = createSvgElement('svg', {})
  const edgeGroup = createSvgElement('g', {})
  const nodeGroup = createSvgElement('g', {})
  svg.append(edgeGroup, nodeGroup)

  const boxes = new Map<string, PreviewNodeBox>()
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const { id, element, width, height } of measuredNodes) {
    const pos = positions.get(id) ?? { x: 0, y: 0 }
    const x = pos.x - width / 2
    const y = pos.y - height / 2
    const foreignObject = createSvgElement('foreignObject', { x: String(x), y: String(y), width: String(width), height: String(height) })
    foreignObject.append(element)
    nodeGroup.append(foreignObject)

    boxes.set(id, { cx: pos.x, cy: pos.y })
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x + width)
    maxY = Math.max(maxY, y + height)
  }

  for (const edge of edges) {
    const sourceBox = boxes.get(String(edge.from))
    const targetBox = boxes.get(String(edge.to))
    if (!sourceBox || !targetBox) continue

    const style = graphmlEdgeStyle(edge, render)
    edgeGroup.append(createSvgElement('line', {
      x1: String(sourceBox.cx),
      y1: String(sourceBox.cy),
      x2: String(targetBox.cx),
      y2: String(targetBox.cy),
      stroke: style.color ?? '#94a3b8',
      'stroke-width': String(style.width ?? 1),
      ...(style.dashed ? { 'stroke-dasharray': '5,4' } : {}),
    }))

    const label = typeof edge.data?.label === 'string' ? edge.data.label : undefined
    if (label !== undefined) {
      const text = createSvgElement('text', {
        x: String((sourceBox.cx + targetBox.cx) / 2),
        y: String((sourceBox.cy + targetBox.cy) / 2 - 4),
        'text-anchor': 'middle',
        'font-size': '9',
        'font-family': 'ui-monospace, Menlo, Monaco, Consolas, monospace',
        fill: style.color ?? '#64748b',
      })
      text.textContent = label
      edgeGroup.append(text)
    }
  }

  const padding = 40
  if (minX === Infinity) {
    minX = 0
    minY = 0
    maxX = 100
    maxY = 100
  }
  svg.setAttribute('viewBox', `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`)
  return svg
}

/**
 * The GraphML View option's counterpart to constructing a `Pivotick`
 * instance. Unlike `renderDotView()`, nothing here is asynchronous — no
 * WASM build to load — so this runs straight through: compute a layout,
 * generate the GraphML text, show it, and (independently — see
 * `renderGraphMLPreview()`'s doc on why it isn't driven by this same
 * text) draw the preview.
 *
 * Still parses the generated text back with `DOMParser` and surfaces a
 * failure in `statusEl` if it doesn't — the preview no longer depends on
 * this succeeding, but a `toGraphML()` bug producing invalid XML is
 * exactly the kind of thing worth catching and saying so plainly, not
 * silently ignoring just because the preview happens to not need it.
 */
function renderGraphMLView(data: ConversionResult, render: PivotickRenderOptions, format: string, variantId: string): void {
  const measuredNodes = measureAllNodes(data, render)
  const radiusById = new Map(measuredNodes.map((n) => [n.id, Math.max(n.width, n.height) / 2]))
  const positions = computeForceLayout(data, radiusById)

  const graphmlSource = toGraphML(data, {
    nodeStyle: (node) => graphmlNodeStyle(node, render),
    nodePosition: (node) => positions.get(String(node.id)),
    nodeData: (node) => graphmlNodeData(node, render),
    edgeStyle: (edge) => graphmlEdgeStyle(edge, render),
  })
  renderPlainTextOutput(jsonOutput, graphmlSource)

  const parserError = new DOMParser().parseFromString(graphmlSource, 'application/xml').getElementsByTagName('parsererror')[0]
  if (parserError) {
    statusEl.textContent = `Generated GraphML failed to parse: ${parserError.textContent ?? 'unknown error'}`
    return
  }

  container.replaceChildren(renderGraphMLPreview(measuredNodes, data.edges, render, positions))
  statusEl.textContent = `Rendered ${data.nodes.length} node(s), ${data.edges.length} edge(s) with ${format}/${variantId} as GraphML.`
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
  const view = viewSelect.value
  const isPivotickView = view === 'pivotick'

  // Smart zoom only makes sense for the Pivotick canvas — the `.dot` and
  // GraphML views are static layouts with no zoom-index of their own to
  // drive it from, so it's greyed out (but left checked, so switching
  // back to Pivotick resumes it) and never consulted for `style` below.
  smartZoomCheckbox.disabled = !isPivotickView
  const smartZoomActive = isPivotickView && smartZoomCheckbox.checked
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

    if (view === 'dot') {
      pivotickInstance?.destroy()
      pivotickInstance = undefined
      container.innerHTML = ''
      statusEl.textContent = 'Loading Graphviz…'
      void renderDotView(data, toPivotick.render, format, variantId, generation)
      return
    }

    if (view === 'graphml') {
      pivotickInstance?.destroy()
      pivotickInstance = undefined
      container.innerHTML = ''
      renderGraphMLView(data, toPivotick.render, format, variantId)
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
