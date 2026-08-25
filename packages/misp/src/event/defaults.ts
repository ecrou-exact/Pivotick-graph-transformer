import { NodeStyle } from '../../../core/src/index'
import { MISP_ICONS } from '../icons'

// What a MISP Event node looks like by default — pure data (shape/size/
// colors/which icon). The icon+label layout itself is behavior, not data,
// and lives in packages/core/src/buildIconLabelCard.ts instead. Tune a
// value here to change every Event node; a caller overriding via
// options.styleRules still wins (see resolveNodeAppearance).
//
// Each concept folder (event/, attribute/, object/, ...) exports one such
// default; import.ts merges them into the one lookup it needs by node type.
export const MISP_EVENT_NODE_DEFAULT: Partial<NodeStyle> & { icon?: keyof typeof MISP_ICONS, accentColor?: string, fontSize?: number, iconSize?: number } = {
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
  accentColor: '#1892B1',
  // The Event is the graph's root — bigger text/icon than Object/Attribute
  // so it reads as the starting point at a glance.
  fontSize: 20,
  iconSize: 36
}
