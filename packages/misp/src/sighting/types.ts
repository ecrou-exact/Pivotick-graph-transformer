// Minimal shape of a MISP Sighting, covering the fields this importer
// actually reads. Not the full MISP schema.
//
// Sightings attach to an Attribute as a flat array — often many of them
// for a popular indicator (one per org/date it was seen on) — so they're
// summarized into one node rather than rendered one-by-one; see
// summarize.ts.

export interface MispSightingOrganisation {
  id: string
  uuid: string
  name: string
}

export interface MispSighting {
  id: string
  uuid: string
  // MISP's fixed sighting types: 0 = sighting, 1 = false positive,
  // 2 = expiration.
  type: '0' | '1' | '2'
  date_sighting: string
  Organisation?: MispSightingOrganisation
}
