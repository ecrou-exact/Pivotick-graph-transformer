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
  // shape: 'none' — the actual rectangle look is drawn by
  // buildIconLabelCard() via `html`; Pivotick's hitbox/edge-anchor tracks
  // that real card shape directly (see NodeStyle's own comment), so there's
  // no native shape to size/hide here. No `size` here on purpose —
  // MispEventImporter computes it per node from the actual label via
  // estimateCardSize(), it's not a constant. accentColor (not a real
  // NodeStyle field) is the card's own border/text color.
  shape: 'none',
  icon: 'event',
  accentColor: '#1892B1',
  // The Event is the graph's root — bigger text/icon than Object/Attribute
  // so it reads as the starting point at a glance.
  fontSize: 20,
  iconSize: 36
}
