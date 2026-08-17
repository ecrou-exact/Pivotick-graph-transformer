// Field shapes below are checked against MISP's real data model — PyMISP's
// class definitions (github.com/MISP/PyMISP, pymisp/mispevent.py and
// pymisp/abstract.py) and real example exports (PyMISP/tests/, including
// one with a full Galaxy/GalaxyCluster/GalaxyClusterRelation tree) — not
// guessed from the docs site alone. Only the fields this converter actually
// reads, or that are worth carrying through as node data, are modeled; MISP
// exports carry many more (ShadowAttribute, SharingGroup, CryptographicKey,
// user/org administrative fields, ...) that aren't mapped.

/** `0` Initial, `1` Ongoing, `2` Completed. */
export type MispAnalysisLevel = '0' | '1' | '2'

/** `1` High, `2` Medium, `3` Low, `4` Undefined. */
export type MispThreatLevel = '1' | '2' | '3' | '4'

/**
 * `0` This organisation only, `1` This community only, `2` Connected
 * communities, `3` All communities, `4` Sharing group, `5` Inherit from the
 * parent Event/Object.
 */
export type MispDistributionLevel = '0' | '1' | '2' | '3' | '4' | '5'

/** A MISP Organisation, as it appears under an Event's `Org`/`Orgc`. */
export interface MispOrganisation {
  uuid?: string
  name: string
}

/** A MISP Tag, as it can appear under an Event, Attribute, Object, or GalaxyClusterRelation. */
export interface MispTag {
  name: string
  colour?: string
  /** Non-empty only on a Tag attached to a relationship (e.g. a GalaxyClusterRelation's Tag) — describes that relationship, not the tag itself. */
  relationship_type?: string
}

/** One fact about a GalaxyCluster (e.g. `{ key: 'country', value: 'ZZ' }`) — MISP's `meta` object flattened into a list; see `GalaxyCluster.meta` for the un-flattened form actually used on the wire. */
export interface MispGalaxyClusterElement {
  key: string
  value: string
}

/**
 * A directed link from one GalaxyCluster to another (e.g. a threat-actor
 * cluster "uses" a malware cluster) — MISP's own cluster-to-cluster graph,
 * distinct from an Object Reference.
 */
export interface MispGalaxyClusterRelation {
  galaxy_cluster_uuid?: string
  referenced_galaxy_cluster_uuid: string
  /** e.g. `'uses'`, `'targets'`, `'dropped-by'` — the actual relationship name. */
  referenced_galaxy_cluster_type: string
  Tag?: MispTag[]
}

/**
 * One cluster within a Galaxy (e.g. one specific threat actor within the
 * "Threat Actor" galaxy). `uuid` is frequently an empty string in real
 * MISP exports — `id` is the field that's reliably present and unique,
 * so it's what this converter dedupes clusters by.
 */
export interface MispGalaxyCluster {
  id: string
  uuid?: string
  value: string
  description?: string
  /** `misp-galaxy:<galaxy-type>="<value>"` — the machine tag name backing this cluster. */
  tag_name?: string
  source?: string
  authors?: string[]
  /** Free-form facts about the cluster (e.g. `{ country: ['ZZ'] }`) — MISP allows a key to repeat, hence array values. */
  meta?: Record<string, string[] | undefined>
  GalaxyClusterRelation?: MispGalaxyClusterRelation[]
}

/** A MISP Galaxy — a named category (`type`) of clusters, e.g. "threat-actor". */
export interface MispGalaxy {
  id: string
  uuid?: string
  name: string
  type: string
  description?: string
  GalaxyCluster?: MispGalaxyCluster[]
}

/** A Sighting — a report that an Attribute's value was observed. Only its count matters for the graph; individual sightings aren't rendered as their own nodes. */
export interface MispSighting {
  id?: string
  /** `0` sighting, `1` false-positive; absent is treated as a normal sighting. */
  type?: '0' | '1'
  source?: string
  date_sighting?: string
}

export interface MispAttribute {
  uuid: string
  type: string
  category?: string
  value: string
  comment?: string
  to_ids?: boolean
  /** `'0'` (or absent) for a top-level Attribute; otherwise the id of the Object it belongs to. */
  object_id?: string
  /** This Attribute's semantic role within its parent Object's template (e.g. `'first-name'`, `'ip'`) — the human-meaningful name MISP's own UI shows, more specific than `type`. Only present on Object Attributes. */
  object_relation?: string
  first_seen?: string
  last_seen?: string
  distribution?: MispDistributionLevel
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
  Sighting?: MispSighting[]
}

export interface MispObjectReference {
  uuid: string
  referenced_uuid: string
  relationship_type?: string
}

export interface MispObject {
  uuid: string
  name: string
  'meta-category'?: string
  description?: string
  comment?: string
  template_uuid?: string
  template_version?: string
  first_seen?: string
  last_seen?: string
  Attribute?: MispAttribute[]
  ObjectReference?: MispObjectReference[]
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
}

export interface MispEventReport {
  uuid: string
  name: string
  /** Markdown body — not rendered into the graph, but carried through as node data (e.g. for a properties-panel preview) if a consumer wants it. */
  content?: string
}

export interface MispEventBody {
  uuid: string
  info: string
  date?: string
  published?: boolean
  analysis?: MispAnalysisLevel
  threat_level_id?: MispThreatLevel
  distribution?: MispDistributionLevel
  extends_uuid?: string
  Org?: MispOrganisation
  Orgc?: MispOrganisation
  Attribute?: MispAttribute[]
  Object?: MispObject[]
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
  EventReport?: MispEventReport[]
}

export interface MispEvent {
  Event: MispEventBody
}

/**
 * Every top-level shape MISP actually exports things in, that this
 * converter accepts: a single Event (`{ Event: {...} }` or, as pymisp's
 * `MISPEvent.to_json()` emits it, the Event's fields directly at the top
 * level with no wrapper), a bare list of Events, a `restSearch`-style
 * `{ response: [...] }` wrapper, a standalone Object (wrapped or bare,
 * exported on its own outside any Event), or a list of those. See
 * `normalizeMispInput.ts` for how each is flattened into a common shape.
 */
export type MispInput =
  | MispEvent
  | MispEventBody
  | MispEvent[]
  | MispEventBody[]
  | { response: MispEvent[] }
  | { Object: MispObject }
  | MispObject
  | MispObject[]
