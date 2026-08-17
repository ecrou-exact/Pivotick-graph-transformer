import { MISP_TAXONOMY_COLORS } from './taxonomyColors.generated.js'

/**
 * Resolves a Tag's colour: its own `colour` if the source data set one
 * (the common case — MISP's backend normally already resolves and embeds
 * the taxonomy colour directly on the Tag at apply-time), falling back to
 * the taxonomy-defined colour for its machine tag name (e.g. `tlp:red`)
 * when the input didn't carry one (custom/local tags with no taxonomy
 * behind them still won't resolve to anything — that's expected).
 */
export function mispTagColor(tag: { name: string; colour?: string }): string | undefined {
  return tag.colour || MISP_TAXONOMY_COLORS[tag.name]
}
