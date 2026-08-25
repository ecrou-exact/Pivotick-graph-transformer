// Minimal shape of a MISP Tag, covering the fields this importer actually
// reads. Not the full MISP schema.

export interface MispTag {
  // Some MISP exports omit this (relying on `name` as the natural identity
  // instead) — see import.ts's addTag for the dedup fallback this implies.
  id?: string
  name: string
  colour?: string
  exportable?: boolean
  hide_tag?: boolean
  is_galaxy?: boolean
  is_custom_galaxy?: boolean
  local_only?: boolean
  local?: boolean
  // Real MISP Tag exports carry more fields (user_id, numerical_value,
  // relationship_type, ...) that vary by instance/version. Only the fields
  // above are surfaced in the properties panel (see fields.ts) — this
  // stays open so the importer can still read whatever else a given
  // export happens to carry.
  [key: string]: unknown
}
