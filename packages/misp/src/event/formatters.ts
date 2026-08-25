import { toDistributionLabel, toReadableDate, toSharingGroupLabel } from '../shared/formatters'
import { MispEventFieldFormat } from './fields'
import { MispEvent, MispOrg } from './types'

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
