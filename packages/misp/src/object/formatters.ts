import { toDistributionLabel, toReadableDate, toSharingGroupLabel } from '../shared/formatters'
import { MispObjectFieldFormat } from './fields'
import { MispObject } from './types'

export function formatMispObjectField(format: MispObjectFieldFormat | undefined, value: unknown, object: MispObject): unknown {
  switch (format) {
    case 'date': return toReadableDate(value)
    case 'distribution': return toDistributionLabel(value)
    case 'sharing-group': return toSharingGroupLabel(value, object)
    default: return value
  }
}
