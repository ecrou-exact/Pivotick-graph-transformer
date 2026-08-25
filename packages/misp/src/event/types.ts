import { MispAttribute } from '../attribute/types'
import { MispObject } from '../object/types'

// Minimal shape of a MISP Event export (JSON), covering the fields this
// importer actually reads. Not the full MISP schema.

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
  // fields.ts) — this stays open so the importer can still read whatever
  // else a given export happens to carry.
  [key: string]: unknown
}

export interface MispEventInput {
  Event: MispEvent
}
