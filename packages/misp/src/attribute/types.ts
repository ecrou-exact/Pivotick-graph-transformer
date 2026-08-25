// Minimal shape of a MISP Attribute, covering the fields this importer
// actually reads. Not the full MISP schema.

export interface MispAttribute {
  uuid: string
  type: string
  category: string
  value: string
  object_relation?: string
  comment?: string
}
