import type { MispEventBody, MispObject } from './types.js'

/** Every Event and standalone Object found in an input, flattened. */
export interface MispPayload {
  events: MispEventBody[]
  objects: MispObject[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// pymisp's `MISPEvent.to_dict()`/`to_json()` (and anything downstream of
// it, e.g. a STIX->MISP conversion) emits the Event's fields directly at
// the top level — no `{ Event: {...} }` wrapper. `uuid` + `info` together
// are specific enough to that shape to use as the signal.
function looksLikeEventBody(record: Record<string, unknown>): boolean {
  return typeof record.uuid === 'string' && typeof record.info === 'string'
}

// Same idea for a standalone Object with no `{ Object: {...} }` wrapper:
// `uuid` + `name`, and not already matched as an Event body above.
function looksLikeObjectBody(record: Record<string, unknown>): boolean {
  return typeof record.uuid === 'string' && typeof record.name === 'string' && typeof record.info !== 'string'
}

function collectFrom(item: unknown, into: MispPayload): void {
  if (!isRecord(item)) return

  if (isRecord(item.Event)) {
    into.events.push(item.Event as unknown as MispEventBody)
  } else if (looksLikeEventBody(item)) {
    into.events.push(item as unknown as MispEventBody)
  }

  if (isRecord(item.Object)) {
    into.objects.push(item.Object as unknown as MispObject)
  } else if (looksLikeObjectBody(item)) {
    into.objects.push(item as unknown as MispObject)
  }

  if (Array.isArray(item.response)) {
    for (const entry of item.response) collectFrom(entry, into)
  }
}

/**
 * Flattens any of `MispInput`'s accepted shapes into a common
 * `{ events, objects }` list. Used by both `detect()` and `convert()` so
 * they agree on what counts as MISP data. Accepted shapes:
 *
 * - `{ Event: {...} }`, or the Event's fields directly at the top level
 *   with no wrapper (what `pymisp`'s `MISPEvent.to_json()` produces)
 * - `{ Object: {...} }`, or an Object's fields directly at the top level
 * - a bare array of any of the above, or a `{ response: [...] }`
 *   restSearch-style wrapper — any mix of Events/Objects
 */
export function normalizeMispInput(input: unknown): MispPayload {
  const payload: MispPayload = { events: [], objects: [] }

  if (Array.isArray(input)) {
    for (const item of input) collectFrom(item, payload)
  } else {
    collectFrom(input, payload)
  }

  return payload
}
