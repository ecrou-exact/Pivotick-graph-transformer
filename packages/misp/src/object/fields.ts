// The only Object fields shown in Pivotick's properties panel/tooltip, in
// display order — same pattern as event/fields.ts. Add/remove/reorder
// entries here to change what shows up; anything not listed here is simply
// not shown, however many extra fields the raw MISP Object JSON carries.
//
// `source` lets the displayed key differ from where the raw value lives in
// the Object JSON (MISP's own key is the hyphenated `meta-category`, not a
// valid JS identifier). `format` picks one of the formatters in
// formatters.ts to turn a raw value into a readable one; omit it for
// verbatim passthrough.

export type MispObjectFieldFormat = 'date' | 'distribution' | 'sharing-group'

export interface MispObjectFieldConfig {
  key: string
  source?: string
  format?: MispObjectFieldFormat
}

export const MISP_OBJECT_FIELDS: MispObjectFieldConfig[] = [
  { key: 'id' },
  { key: 'uuid' },
  // `name` is deliberately not here — it's already the card's own label
  // (see buildIconLabelCard in import.ts), showing it again in the
  // properties panel would just duplicate it.
  { key: 'category', source: 'meta-category' },
  { key: 'description' },
  { key: 'comment' },
  { key: 'timestamp', format: 'date' },
  { key: 'first_seen' },
  { key: 'last_seen' },
  { key: 'distribution', format: 'distribution' },
  { key: 'sharing_group_id', format: 'sharing-group' }
]
