// Minimal shape of a MISP Attribute, covering the fields this importer
// actually reads. Not the full MISP schema.

export interface MispAttribute {
  uuid: string
  type: string
  category: string
  value: string
  id?: string
  to_ids?: boolean
  comment?: string
  timestamp?: string
  distribution?: string
  sharing_group_id?: string
  first_seen?: string | null
  last_seen?: string | null
  // Only set when the Attribute belongs to an Object — its role within
  // that Object's template (e.g. "filename", "sha256").
  object_relation?: string | null
  // Real MISP Attribute exports carry more fields (event_id, object_id,
  // deleted, disable_correlation, Galaxy, ShadowAttribute, ...) that vary
  // by instance/version. Only the fields above are surfaced in the
  // properties panel (see fields.ts) — this stays open so the importer can
  // still read whatever else a given export happens to carry.
  [key: string]: unknown
}
