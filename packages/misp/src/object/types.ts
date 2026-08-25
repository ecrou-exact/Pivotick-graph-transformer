import { MispAttribute } from '../attribute/types'

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
  meta_category?: string
  Attribute?: MispAttribute[]
  ObjectReference?: MispObjectReference[]
}
