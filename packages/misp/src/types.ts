// Shape of a MISP Event, as exported by the MISP core format
// (https://www.misp-project.org/documentation/). Only the fields this
// converter actually reads are modeled — MISP Events carry many more
// optional fields (Sighting, ShadowAttribute, ...) that aren't mapped yet.

/** A MISP Tag, as it can appear under an Event, Attribute, or Object. */
export interface MispTag {
  name: string
  colour?: string
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
  meta?: Record<string, unknown>
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

export interface MispAttribute {
  uuid: string
  type: string
  category?: string
  value: string
  comment?: string
  to_ids?: boolean
  /** `'0'` (or absent) for a top-level Attribute; otherwise the id of the Object it belongs to. */
  object_id?: string
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
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
  Attribute?: MispAttribute[]
  ObjectReference?: MispObjectReference[]
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
}

export interface MispEventBody {
  uuid: string
  info: string
  date?: string
  Attribute?: MispAttribute[]
  Object?: MispObject[]
  Tag?: MispTag[]
  Galaxy?: MispGalaxy[]
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
