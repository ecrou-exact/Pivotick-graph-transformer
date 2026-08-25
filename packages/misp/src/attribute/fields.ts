// The only Attribute fields shown in Pivotick's properties panel/tooltip,
// in display order — same pattern as event/fields.ts and object/fields.ts.
// Add/remove/reorder entries here to change what shows up; anything not
// listed here is simply not shown, however many extra fields the raw MISP
// Attribute JSON carries.
//
// `type` and `value` are deliberately not here — they're already the
// card's badge and title (see buildIconLabelCard in import.ts), showing
// them again in the properties panel would just duplicate them.

export type MispAttributeFieldFormat = 'date' | 'distribution' | 'sharing-group'

export interface MispAttributeFieldConfig {
  key: string
  source?: string
  format?: MispAttributeFieldFormat
}

export const MISP_ATTRIBUTE_FIELDS: MispAttributeFieldConfig[] = [
  { key: 'id' },
  { key: 'uuid' },
  { key: 'category' },
  { key: 'object_relation' },
  { key: 'to_ids' },
  { key: 'comment' },
  { key: 'timestamp', format: 'date' },
  { key: 'first_seen' },
  { key: 'last_seen' },
  { key: 'distribution', format: 'distribution' },
  { key: 'sharing_group_id', format: 'sharing-group' }
]
