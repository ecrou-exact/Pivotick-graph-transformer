import { toDistributionLabel, toReadableDate, toSharingGroupLabel } from '../shared/formatters'
import { MispAttributeFieldFormat } from './fields'
import { MispAttribute } from './types'

export function formatMispAttributeField(format: MispAttributeFieldFormat | undefined, value: unknown, attribute: MispAttribute): unknown {
  switch (format) {
    case 'date': return toReadableDate(value)
    case 'distribution': return toDistributionLabel(value)
    case 'sharing-group': return toSharingGroupLabel(value, attribute)
    default: return value
  }
}
