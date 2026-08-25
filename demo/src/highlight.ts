// Minimal, dependency-free syntax highlighting for the two static code
// snippets on docs.html's Getting Started section — not a general-purpose
// highlighter, just enough token categories (comment/string/keyword) for
// the bash and TypeScript samples actually shown there.

type Lang = 'bash' | 'ts'

const PATTERNS: Record<Lang, [RegExp, string][]> = {
  ts: [
    [/\/\/[^\n]*/, 'comment'],
    [/(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/, 'string'],
    [/\b(?:import|from|export|default|const|let|new|function|return|interface|type|as)\b/, 'keyword']
  ],
  bash: [
    [/#[^\n]*/, 'comment'],
    [/\b(?:git|submodule|add|update)\b/, 'keyword']
  ]
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char] as string)
}

export function highlightCode(code: string, lang: Lang): string {
  const patterns = PATTERNS[lang]
  const combined = new RegExp(patterns.map(([pattern]) => `(${pattern.source})`).join('|'), 'g')

  let result = ''
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = combined.exec(code))) {
    result += escapeHtml(code.slice(lastIndex, match.index))
    const groupIndex = match.slice(1).findIndex(group => group !== undefined)
    const className = patterns[groupIndex][1]
    result += `<span class="tok-${className}">${escapeHtml(match[0])}</span>`
    lastIndex = match.index + match[0].length
  }
  result += escapeHtml(code.slice(lastIndex))
  return result
}

// Highlights every `<code data-lang="bash|ts">` on the page in place —
// call once on load.
export function highlightAllSnippets(): void {
  document.querySelectorAll<HTMLElement>('code[data-lang]').forEach(codeEl => {
    const lang = codeEl.dataset.lang as Lang
    if (lang !== 'bash' && lang !== 'ts') return
    codeEl.innerHTML = highlightCode(codeEl.textContent ?? '', lang)
  })
}
