/**
 * DOT identifier formatting, per the grammar at
 * https://graphviz.org/doc/info/lang.html — an ID is either a bare
 * alphanumeric/underscore token not starting with a digit, a numeral, or a
 * double-quoted string (backslash and `"` escaped inside it). Quoting is
 * always valid, so `formatId` only leaves a value bare when doing so is
 * unambiguously safe and reads more naturally in the output (e.g. `A -> B`
 * rather than `"A" -> "B"`) — everything else, including the six reserved
 * keywords, falls back to a quoted string.
 */

const BARE_ID = /^[A-Za-z_][A-Za-z0-9_]*$/
const NUMERAL = /^-?(\.[0-9]+|[0-9]+(\.[0-9]*)?)$/
const RESERVED = new Set(['graph', 'digraph', 'subgraph', 'node', 'edge', 'strict'])

export function quoteDotString(value: string): string {
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r\n|\r|\n/g, '\\n')
  return `"${escaped}"`
}

export function formatDotId(value: string): string {
  if (RESERVED.has(value.toLowerCase())) return quoteDotString(value)
  if (BARE_ID.test(value) || NUMERAL.test(value)) return value
  return quoteDotString(value)
}
