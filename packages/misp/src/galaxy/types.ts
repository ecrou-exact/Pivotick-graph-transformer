// Minimal shape of a MISP Galaxy/GalaxyCluster, covering the fields this
// importer actually reads. Not the full MISP schema.
//
// A galaxy attachment is always represented twice in a MISP export: as a
// plain Tag (`is_galaxy: true`, name like `misp-galaxy:mitre-attack-
// pattern="Valid Accounts - T1078"`) and, only when the exporting instance
// still has that galaxy cluster locally, as a matching entry here — see
// import.ts's addGalaxyClusters for how the two get reconciled (the Tag is
// the source of truth for "this is attached"; this structured data is used
// when available for a richer render, and its absence is a real,
// expected case, not an error).

export interface MispGalaxyClusterMeta {
  // MITRE ATT&CK technique id ("T1078"), when this cluster has one.
  external_id?: string[]
}

export interface MispGalaxyCluster {
  id: string
  type: string
  value: string
  // Matches a Tag's `name` — the join key between the two representations.
  tag_name: string
  description?: string
  meta?: MispGalaxyClusterMeta
}

export interface MispGalaxy {
  id: string
  name: string
  type: string
  description?: string
  namespace?: string
  GalaxyCluster?: MispGalaxyCluster[]
}
