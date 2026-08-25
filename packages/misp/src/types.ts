// Render tuning for this importer is just `ConverterOptions.styleRules`
// (packages/core/src/types.ts) — rules matched against each node's `data`
// (which always has at least `type`, and `category` for attributes).
// No MISP-specific options type needed on top of it.

// Minimal shape of a MISP Event export (JSON), covering the fields this
// importer actually reads. Not the full MISP schema.

export interface MispAttribute {
  uuid: string
  type: string
  category: string
  value: string
  object_relation?: string
  comment?: string
}

export interface MispObjectReference {
  uuid: string
  referenced_uuid: string
  relationship_type: string
}

export interface MispObject {
  uuid: string
  name: string
  meta_category?: string
  Attribute?: MispAttribute[]
  ObjectReference?: MispObjectReference[]
}

export interface MispOrg {
  id: string
  name: string
  uuid: string
  local?: boolean
}

export interface MispEvent {
  uuid: string
  info: string
  date?: string
  id?: string
  published?: boolean
  timestamp?: string
  publish_timestamp?: string
  first_publication?: string
  distribution?: string
  sharing_group_id?: string
  Org?: MispOrg
  Orgc?: MispOrg
  Attribute?: MispAttribute[]
  Object?: MispObject[]
  // Real MISP Event exports carry many more fields (org_id, orgc_id,
  // threat_level_id, analysis, locked, ...) that vary by instance/version.
  // Only the fields above are surfaced in the properties panel (see
  // eventFields.ts) — this stays open so the importer can still read
  // whatever else a given export happens to carry.
  [key: string]: unknown
}

export interface MispEventInput {
  Event: MispEvent
}
