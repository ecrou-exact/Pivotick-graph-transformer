// Formatting helpers reused by more than one MISP concept — Event and
// Object (and, once implemented, Attribute/Sighting) all carry the same
// epoch-timestamp / distribution / sharing_group_id shape. Concept-only
// formatting (e.g. Event's Org/Orgc -> name) stays in that concept's own
// formatters.ts instead of here.

// MISP's fixed distribution levels — see
// https://www.misp-project.org/2016/05/25/MISP.Sightings.and.More.html and
// the MISP core `Distribution` enum. Level 4 ("Sharing group") is the only
// one where `sharing_group_id` means anything; level 5 only appears on
// Attributes/Objects, meaning "use the parent Event's distribution".
const DISTRIBUTION_LABELS: Record<string, string> = {
  '0': 'Your organisation only',
  '1': 'This community only',
  '2': 'Connected communities',
  '3': 'All communities',
  '4': 'Sharing group',
  '5': 'Inherit event'
}

export function toReadableDate(value: unknown): unknown {
  if (typeof value !== 'string' && typeof value !== 'number') return value
  const epochSeconds = Number(value)
  if (!Number.isFinite(epochSeconds)) return value
  return new Date(epochSeconds * 1000).toLocaleString()
}

export function toDistributionLabel(value: unknown): unknown {
  const label = DISTRIBUTION_LABELS[String(value)]
  return label ?? value
}

// sharing_group_id only means something when distribution is "Sharing
// group" (4) — otherwise MISP just leaves it at 0. Returning undefined
// here drops the field entirely (see the nodePropertiesMap filter in
// demo/src/main.ts) rather than showing a value that doesn't apply.
export function toSharingGroupLabel(value: unknown, record: { distribution?: unknown }): unknown {
  if (String(record.distribution) !== '4' || value === undefined || value === null || String(value) === '0') {
    return undefined
  }
  return `Sharing group #${value}`
}
