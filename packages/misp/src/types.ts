// Shape of a MISP Event, as exported by the MISP core format
// (https://www.misp-project.org/documentation/). Only the fields this
// converter actually reads are modeled — MISP Events carry many more
// optional fields (Tag, Galaxy, Sighting, ...) that aren't mapped yet.
export interface MispAttribute {
  uuid: string
  type: string
  category?: string
  value: string
  comment?: string
  to_ids?: boolean
  /** `'0'` (or absent) for a top-level Attribute; otherwise the id of the Object it belongs to. */
  object_id?: string
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
}

export interface MispEventBody {
  uuid: string
  info: string
  date?: string
  Attribute?: MispAttribute[]
  Object?: MispObject[]
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
