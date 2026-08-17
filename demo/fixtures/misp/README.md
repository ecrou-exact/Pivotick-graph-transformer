# Fixtures — misp

Drop MISP Event JSON files here (e.g. `event-basic.json`). Each one shows up
automatically in the demo's fixture picker — no wiring needed.

Three samples, one per input shape `MispEventRootConverter` accepts (see
`packages/misp/src/normalizeMispInput.ts`):

- `example-event.json` — a single Event (domain + email Attribute, an
  `ip-port` Object with an Object Reference back to the domain)
- `example-object-standalone.json` — a standalone Object, not attached to
  any Event
- `example-event-list.json` — a `{ response: [...] }` restSearch-style list
  of two Events
