import { MispSighting } from './types'

// A raw Sighting on its own carries little (a date, an org, one of 3 fixed
// types) — the useful signal is the aggregate per type, same granularity
// MISP's own "Sightings" widget shows (a total, then one count per type):
// one node per Sighting would mean dozens of near-identical nodes for a
// widely-seen indicator; one node per *type* keeps that same detail level
// without the explosion.
export interface SightingGroupSummary {
  count: number
  firstSeen?: string
  lastSeen?: string
  organisations: string
}

export interface SightingBreakdown {
  total: number
  positive: SightingGroupSummary
  falsePositive: SightingGroupSummary
  expired: SightingGroupSummary
}

function summarizeGroup(sightings: MispSighting[]): SightingGroupSummary {
  const dates = sightings.map(s => Number(s.date_sighting)).filter(Number.isFinite)
  const toDate = (epochSeconds: number) => new Date(epochSeconds * 1000).toLocaleDateString()
  const organisations = [...new Set(sightings.map(s => s.Organisation?.name).filter((name): name is string => Boolean(name)))].join(', ')

  return {
    count: sightings.length,
    firstSeen: dates.length ? toDate(Math.min(...dates)) : undefined,
    lastSeen: dates.length ? toDate(Math.max(...dates)) : undefined,
    organisations
  }
}

export function summarizeSightings(sightings: MispSighting[]): SightingBreakdown {
  return {
    total: sightings.length,
    // MISP's fixed sighting types: 0 = sighting ("positive"), 1 = false
    // positive, 2 = expiration.
    positive: summarizeGroup(sightings.filter(s => s.type === '0')),
    falsePositive: summarizeGroup(sightings.filter(s => s.type === '1')),
    expired: summarizeGroup(sightings.filter(s => s.type === '2'))
  }
}
