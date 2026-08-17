// Shared detect() logic for every `misp` variant — see CONTRIBUTING.md,
// "Multiple variants for the same format".
export function detectMispEvent(_input: unknown): boolean {
  // TODO: cheap structural check, e.g. a top-level `Event` key with the
  // fields a real MISP Event always has (`id`, `uuid`, `Attribute`, ...).
  return false
}
