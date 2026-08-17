import { normalizeMispInput } from './normalizeMispInput.js'

// Shared detect() logic for every `misp` variant — see CONTRIBUTING.md,
// "Multiple variants for the same format". Accepts any of the shapes
// `normalizeMispInput` understands (single/listed Events, a restSearch
// response wrapper, standalone Objects); a cheap structural check on
// whatever it found, to avoid false-positives on other formats.
export function detectMispEvent(input: unknown): boolean {
  const { events, objects } = normalizeMispInput(input)

  const hasRealEvent = events.some((event) => typeof event?.uuid === 'string' && typeof event?.info === 'string')
  const hasRealObject = objects.some((object) => typeof object?.uuid === 'string' && typeof object?.name === 'string')

  return hasRealEvent || hasRealObject
}
