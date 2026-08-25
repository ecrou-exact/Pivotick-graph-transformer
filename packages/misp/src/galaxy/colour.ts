// Deterministic colour scheme for MISP galaxies, ported from MISP's own
// "Overmind theme" GalaxyColour PHP class (hash-the-name -> hue -> a fixed
// hsl()/hsla() palette). A galaxy's colour comes purely from its *name*, so
// the same galaxy type reads with the same colour family everywhere it
// shows up in the graph, without us having to hand-pick or store a colour
// for the (currently) 131 known galaxy types.

export interface GalaxyPalette {
  hue: number
  badgeBg: string
  badgeText: string
  badgeBorder: string
  headerText: string
  sectionBg: string
  sectionBorder: string
}

// 32-bit rolling hash, same shape as PHP's `(($hash << 5) - $hash + ord($c)) & 0x7FFFFFFF`.
export function galaxyHue(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) & 0x7fffffff
  }
  return hash % 360
}

export function galaxyPalette(name: string): GalaxyPalette {
  return galaxyPaletteFromHue(galaxyHue(name))
}

export function galaxyPaletteFromHue(hue: number): GalaxyPalette {
  const h = ((hue % 360) + 360) % 360
  return {
    hue: h,
    badgeBg: `hsla(${h}, 65%, 55%, 0.12)`,
    badgeText: `hsl(${h}, 65%, 28%)`,
    badgeBorder: `hsl(${h}, 55%, 65%)`,
    headerText: `hsl(${h}, 65%, 26%)`,
    sectionBg: `hsla(${h}, 55%, 55%, 0.08)`,
    sectionBorder: `hsl(${h}, 55%, 70%)`
  }
}

// Metallic sheen overlay shared by every galaxy pill/badge in MISP's own
// theme — layered as `backgroundImage` on top of the solid/translucent
// `backgroundColor` a caller sets separately.
export const GALAXY_METALLIC_SHEEN =
  'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.04) 100%)'
