// The only Event fields shown in Pivotick's properties panel/tooltip, in
// display order. Add/remove/reorder entries here to change what shows up —
// no other file needs to change. Anything not listed here is simply not
// shown, however many extra fields the raw MISP Event JSON carries.
//
// `source` lets the displayed key differ from where the raw value lives in
// the Event JSON (e.g. `org`/`orgc` come from the nested `Org`/`Orgc`
// objects, not from `org_id`/`orgc_id`). `format` picks one of the
// formatters in formatters.ts to turn a raw value into a readable one;
// omit it for verbatim passthrough (still subject to the empty/null/
// undefined filtering the demo's nodePropertiesMap already does).

export type MispEventFieldFormat = 'date' | 'distribution' | 'sharing-group' | 'org-name'

export interface MispEventFieldConfig {
  key: string
  source?: string
  format?: MispEventFieldFormat
}

export const MISP_EVENT_FIELDS: MispEventFieldConfig[] = [
  { key: 'id' },
  { key: 'uuid' },
  { key: 'date' },
  { key: 'published' },
  { key: 'timestamp', format: 'date' },
  { key: 'publish_timestamp', format: 'date' },
  { key: 'first_publication', format: 'date' },
  { key: 'distribution', format: 'distribution' },
  { key: 'sharing_group_id', format: 'sharing-group' },
  { key: 'org', source: 'Org', format: 'org-name' },
  { key: 'orgc', source: 'Orgc', format: 'org-name' }
]
