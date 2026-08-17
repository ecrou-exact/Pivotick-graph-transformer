import type { MispEventBody, MispObject } from './types.js'

/** Every Event and standalone Object found in an input, flattened. */
export interface MispPayload {
  events: MispEventBody[]
  objects: MispObject[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function collectFrom(item: unknown, into: MispPayload): void {
  if (!isRecord(item)) return

  if (isRecord(item.Event)) into.events.push(item.Event as unknown as MispEventBody)
  if (isRecord(item.Object)) into.objects.push(item.Object as unknown as MispObject)
  if (Array.isArray(item.response)) {
    for (const entry of item.response) collectFrom(entry, into)
  }
}

/**
 * Flattens any of `MispInput`'s accepted shapes — a single Event, a bare
 * array of Events, a `{ response: [...] }` search-result wrapper, a
 * standalone Object, or an array of Objects (any of these can also be
 * mixed in one array) — into a common `{ events, objects }` list. Used by
 * both `detect()` and `convert()` so they agree on what counts as MISP
 * data.
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
