import { MISP_ATTRIBUTE_ICON_KEYS, MISP_GALAXY_ICON_KEYS, MISP_GENERIC_ICON_KEYS, MISP_OBJECT_ICON_KEYS } from './icons.generated.js'

/**
 * Which of misp-iconify's two "generic" frame classes to use for icons
 * that aren't an object/galaxy-cluster/attribute icon (event, tag, ...).
 * A pure styling toggle, not a variant — see docs/icons-and-styling.md.
 * @default 'simple'
 */
export type MispIconFrame = 'simple' | 'hexagon'

/**
 * Maps an `entityType` (this converter's per-node type key — already
 * shaped like misp-iconify's own keys: a bare attribute type, `objects/
 * <name>`, or `galaxies/<type>`) to the `iconClass` string for
 * `pivotick-transformer-misp/icons.css`. Returns `undefined` when
 * misp-iconify has no icon for that key, so callers can fall back to
 * shape/color only.
 */
export function mispIconClass(entityType: string, frame: MispIconFrame = 'simple'): string | undefined {
  const frameClass = frame === 'hexagon' ? 'misp-hexagone' : 'misp-simple'

  if (entityType.startsWith('objects/')) {
    const base = entityType.slice('objects/'.length)
    return MISP_OBJECT_ICON_KEYS.has(base) ? `misp-icon misp-icon-${base} misp-objects` : undefined
  }

  if (entityType.startsWith('galaxies/')) {
    const base = entityType.slice('galaxies/'.length)
    return MISP_GALAXY_ICON_KEYS.has(base) ? `misp-icon misp-icon-${base} misp-galaxies` : undefined
  }

  if (MISP_ATTRIBUTE_ICON_KEYS.has(entityType)) {
    return `misp-icon misp-icon-${entityType} misp-attributes`
  }

  if (MISP_GENERIC_ICON_KEYS.has(entityType)) {
    return `misp-icon misp-icon-${entityType} ${frameClass}`
  }

  return undefined
}
