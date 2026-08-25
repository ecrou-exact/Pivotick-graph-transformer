// Properties panel fields for the two Galaxy-concept node kinds — same
// pattern as event/fields.ts, object/fields.ts, ... `name`/`value` aren't
// listed since they're already each node's own card title/pill label.

export interface MispGalaxyFieldConfig {
  key: string
}

export const MISP_GALAXY_FIELDS: MispGalaxyFieldConfig[] = [
  { key: 'namespace' },
  { key: 'description' }
]

export const MISP_GALAXY_CLUSTER_FIELDS: MispGalaxyFieldConfig[] = [
  { key: 'description' },
  { key: 'external_id' }
]
