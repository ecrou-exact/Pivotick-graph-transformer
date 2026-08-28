import { MispAttribute } from '../attribute/types'
import { MispGalaxy } from '../galaxy/types'
import { MispObject } from '../object/types'
import { MispTag } from '../tag/types'

// Minimal shape of a MISP Event export (JSON), covering the fields this
// importer actually reads. Not the full MISP schema.

export interface MispOrg {
  id: string
  name: string
  uuid: string
  local?: boolean
}

// A RelatedEvent entry is MISP's own server-computed correlation result — it
// exists (and is often the *only* correlation signal available) even on an
// export with an empty Attribute array, since MISP already did the
// attribute-matching work when it built this response. Deliberately a
// separate, smaller shape from MispEvent: MISP only ever sends this summary
// for a related Event, never its full Attribute/Object/Tag detail.
export interface MispRelatedEventSummary {
  uuid: string
  info: string
  id?: string
  date?: string
  Org?: MispOrg
  Orgc?: MispOrg
  [key: string]: unknown
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
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
  // MISP's own precomputed correlation: other Events sharing a correlatable
  // attribute with this one — see correlateEvents in import.ts, which reads
  // this in preference to (client-side) re-deriving correlation from
  // Attribute values, since that fails outright on an export like this one
  // that carries RelatedEvent but no Attribute detail.
  RelatedEvent?: { Event: MispRelatedEventSummary }[]
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
