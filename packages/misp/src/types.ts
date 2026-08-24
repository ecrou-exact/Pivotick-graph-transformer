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

export interface MispEvent {
  uuid: string
  info: string
  date?: string
  Attribute?: MispAttribute[]
  Object?: MispObject[]
}

export interface MispEventInput {
  Event: MispEvent
}
