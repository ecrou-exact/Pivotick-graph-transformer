// Shared detect() logic for every `misp` variant — see CONTRIBUTING.md,
// "Multiple variants for the same format".
export function detectMispEvent(input: unknown): boolean {
  if (typeof input !== 'object' || input === null) return false

  const event = (input as { Event?: unknown }).Event
  if (typeof event !== 'object' || event === null) return false

  const { uuid, info } = event as Record<string, unknown>
  return typeof uuid === 'string' && typeof info === 'string'
}
