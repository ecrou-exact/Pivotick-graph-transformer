import { NodeStyle } from '../../core/src/index'
import { MISP_ICONS } from './icons'

// One place for what each MISP node type looks like by default — pure data
// (shape/size/colors/which icon). The icon+label layout itself is behavior,
// not data, and lives in packages/core/src/buildIconLabelCard.ts instead.
// Tune a value here to change every node of that type; a caller overriding
// via options.styleRules still wins (see resolveNodeAppearance).
export const MISP_NODE_DEFAULTS: Record<string, Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string }> = {
  'misp-event': {
    // Pivotick's own shape is always as wide as tall — the actual rectangle
    // look is drawn by buildIconLabelCard() via `html`, so the native shape
    // stays here only for the simulation's collision footprint, invisible.
    // No `size` here on purpose — MispEventImporter computes it per node
    // from the actual label via estimateCardSize(), it's not a constant.
    // accentColor (not a real NodeStyle field) is the card's own border/text
    // color, since strokeColor above is forced transparent.
    shape: 'square',
    color: 'transparent',
    strokeColor: 'transparent',
    icon: 'event',
    accentColor: '#1892B1'
  },
  'misp-object': {
    // Pivotick only ships circle/square/triangle/hexagon — 'diamond' would
    // silently fall back to a circle, so triangle it is until we revisit this.
    shape: 'triangle',
    color: '#5A9367'
  },
  'misp-attribute': {
    shape: 'circle',
    color: '#B4884D'
  }
}
