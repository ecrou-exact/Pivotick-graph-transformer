import { MISP_ATTRIBUTE_ICONS, MISP_GALAXY_ICONS, MISP_GENERIC_ICONS, MISP_OBJECT_ICONS } from './icons.generated.js'

/**
 * Maps an `entityType` (this converter's per-node type key — a bare
 * attribute type, `objects/<name>`, `galaxies/<type>`, or a bare generic
 * key like `event`/`tag`) to the inline SVG markup misp-iconify ships for
 * it, via Pivotick's `NodeStyle.svgIcon` (real inline SVG — not
 * `iconClass`, which Pivotick resolves through a Font Awesome glyph
 * lookup and doesn't render misp-iconify's CSS-mask-based classes at
 * all — see scripts/sync-icons.mjs). Returns `undefined` when
 * misp-iconify has no icon for that key, so callers can fall back to
 * shape/color only.
 */
export function mispIconSvg(entityType: string): string | undefined {
  if (entityType.startsWith('objects/')) return MISP_OBJECT_ICONS[entityType.slice('objects/'.length)]
  if (entityType.startsWith('galaxies/')) return MISP_GALAXY_ICONS[entityType.slice('galaxies/'.length)]
  return MISP_ATTRIBUTE_ICONS[entityType] ?? MISP_GENERIC_ICONS[entityType]
}
