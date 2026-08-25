import { MispAttribute } from '../attribute/types'
import { MispGalaxy } from '../galaxy/types'
import { MispTag } from '../tag/types'

// Minimal shape of a MISP Object, covering the fields this importer
// actually reads. Not the full MISP schema.

export interface MispObjectReference {
  uuid: string
  referenced_uuid: string
  relationship_type: string
}

export interface MispObject {
  uuid: string
  name: string
  id?: string
  // MISP's own JSON key is hyphenated (not a valid JS identifier), so it
  // can't be a plain `meta_category` property like the rest — object/fields.ts
  // reads it via `source: 'meta-category'` and displays it as `category`.
  'meta-category'?: string
  description?: string
  comment?: string
  timestamp?: string
  distribution?: string
  sharing_group_id?: string
  first_seen?: string | null
  last_seen?: string | null
  Attribute?: MispAttribute[]
  ObjectReference?: MispObjectReference[]
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
  // Real MISP Object exports carry more fields (template_uuid,
  // template_version, event_id, deleted, ...) that vary by instance/
  // version. Only the fields above are surfaced in the properties panel
  // (see fields.ts) — this stays open so the importer can still read
  // whatever else a given export happens to carry.
  [key: string]: unknown
}
