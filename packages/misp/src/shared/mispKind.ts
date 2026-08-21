/**
 * A fixed vocabulary of MISP entity "kinds" — a handful of broad,
 * immediately-readable categories driving the small kind chip shown under
 * every node's badge (see `MispEventRootConverter.getRenderNode()`),
 * alongside the precise per-key icon set (410 misp-iconify keys) each
 * badge already carries. The `event`/`tag`/`object`/`attribute` buckets
 * mirror MISP's own top-level entity types directly; the rest classify a
 * galaxy cluster's `type` string (e.g. `'threat-actor'`, `'ransomware'`)
 * into MISP's commonly-used galaxy families — modeled after
 * adulau/threat-actor-explorer's `KIND_STYLE`/`classifyRecord`
 * (github.com/adulau/threat-actor-explorer), which does the same kind of
 * bucketing for galaxy clusters specifically; extended here with more
 * granularity (malware split from tool, plus technique, vulnerability,
 * campaign, sector, country) and to cover Events/Objects/Attributes/Tags
 * too, since this converter handles those as well.
 */
export type MispKind =
  | 'event'
  | 'tag'
  | 'object'
  | 'attribute'
  | 'actor'
  | 'malware'
  | 'tool'
  | 'technique'
  | 'vulnerability'
  | 'campaign'
  | 'sector'
  | 'country'
  | 'other'

// Keyword-matched against the galaxy `type` string — a heuristic, not
// sourced from an authoritative field (MISP galaxies don't carry a "this
// is an actor vs a tool" flag), so deliberately conservative: falls back
// to 'other' rather than guessing wrong. Every pattern below targets real
// misp-galaxy `type` values/families (threat-actor, ransomware,
// mitre-attack-pattern, sector, country, ...), not invented ones.
function classifyGalaxyType(galaxyType: string): MispKind {
  const type = galaxyType.toLowerCase()
  if (/threat-actor|intrusion-set|activity-group/.test(type)) return 'actor'
  if (/malware|ransomware|backdoor|botnet|banker|stealer/.test(type)) return 'malware'
  if (/\btool\b|exploit-kit|\brat\b/.test(type)) return 'tool'
  if (/attack-pattern|technique|tactic|course-of-action/.test(type)) return 'technique'
  if (/vulnerability|\bcve\b/.test(type)) return 'vulnerability'
  if (/campaign/.test(type)) return 'campaign'
  if (/sector/.test(type)) return 'sector'
  if (/country|region/.test(type)) return 'country'
  return 'other'
}

/**
 * Classifies one of this converter's `entityType` strings (as produced by
 * `MispEventRootConverter` — bare attribute type, `objects/<name>`,
 * `galaxies/<type>`, `event`, or `tag`) into a `MispKind`.
 */
export function classifyEntityType(entityType: string): MispKind {
  if (entityType === 'event') return 'event'
  if (entityType === 'tag') return 'tag'
  if (entityType.startsWith('objects/')) return 'object'
  if (entityType.startsWith('galaxies/')) return classifyGalaxyType(entityType.slice('galaxies/'.length))
  // Bare attribute type, or one of the handful of "generic" misp-iconify
  // keys (report, sighting, ...) — both are attribute-ish in this coarse
  // vocabulary; there's no dedicated bucket fine-grained enough to be
  // worth splitting further.
  return 'attribute'
}
