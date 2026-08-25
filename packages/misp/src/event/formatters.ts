import { MispEventFieldFormat } from './fields'
import { MispEvent, MispOrg } from './types'

// MISP's fixed distribution levels (Event.distribution) — see
// https://www.misp-project.org/2016/05/25/MISP.Sightings.and.More.html and
// the MISP core `Distribution` enum. Level 4 ("Sharing group") is the only
// one where `sharing_group_id` means anything.
const DISTRIBUTION_LABELS: Record<string, string> = {
  '0': 'Your organisation only',
  '1': 'This community only',
  '2': 'Connected communities',
  '3': 'All communities',
  '4': 'Sharing group'
}

function toReadableDate(value: unknown): unknown {
  if (typeof value !== 'string' && typeof value !== 'number') return value
  const epochSeconds = Number(value)
  if (!Number.isFinite(epochSeconds)) return value
  return new Date(epochSeconds * 1000).toLocaleString()
}

function toDistributionLabel(value: unknown): unknown {
  const label = DISTRIBUTION_LABELS[String(value)]
  return label ?? value
}

// sharing_group_id only means something when distribution is "Sharing
// group" (4) — otherwise MISP just leaves it at 0. Returning undefined
// here drops the field entirely (see the nodePropertiesMap filter in
// demo/src/main.ts) rather than showing a value that doesn't apply.
function toSharingGroupLabel(value: unknown, event: MispEvent): unknown {
  if (String(event.distribution) !== '4' || value === undefined || value === null || String(value) === '0') {
    return undefined
  }
  return `Sharing group #${value}`
}

function toOrgName(value: unknown): unknown {
  return (value as MispOrg | undefined)?.name ?? value
}

export function formatMispEventField(format: MispEventFieldFormat | undefined, value: unknown, event: MispEvent): unknown {
  switch (format) {
    case 'date': return toReadableDate(value)
    case 'distribution': return toDistributionLabel(value)
    case 'sharing-group': return toSharingGroupLabel(value, event)
    case 'org-name': return toOrgName(value)
    default: return value
  }
}
