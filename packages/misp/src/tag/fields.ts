// The only Tag fields shown in Pivotick's properties panel/tooltip, in
// display order — same pattern as event/fields.ts and object/fields.ts.
// Add/remove/reorder entries here to change what shows up.
//
// `name`/`colour` are deliberately not here — `name` is already the
// chip's own label and `colour` is its background (see buildTagChip in
// import.ts); showing them again in the properties panel would just
// duplicate them. No `format` here (unlike the other concepts) since
// every field below is already plainly readable as-is.

export interface MispTagFieldConfig {
  key: string
  source?: string
}

export const MISP_TAG_FIELDS: MispTagFieldConfig[] = [
  { key: 'id' },
  { key: 'local_only' },
  { key: 'local' },
  { key: 'exportable' }
]
