import { NodeStyle, StyleRule } from './types'

// Applies every matching StyleRule on top of a node's built-in default
// data/style, in order. Every importer's convert() should route through
// this instead of inventing its own per-format style knobs.
export function resolveNodeAppearance(
  baseData: Record<string, unknown>,
  baseStyle: Partial<NodeStyle>,
  rules?: StyleRule[]
): { data: Record<string, unknown>, style: Partial<NodeStyle> } {
  let data = { ...baseData }
  let style = { ...baseStyle }

  for (const rule of rules ?? []) {
    const matches = Object.entries(rule.when).every(([key, value]) => data[key] === value)
    if (!matches) continue
    if (rule.data) data = { ...data, ...rule.data }
    if (rule.style) style = { ...style, ...rule.style }
  }

  return { data, style }
}
