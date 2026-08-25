// Single shared theme state — both demo pages (and every control that can
// flip it: the Demo page's fixture-picker switch, the shared site header's
// toggle) read/write here instead of keeping their own copy, so two toggles
// on the same page can never disagree about what theme is active. Persisted
// in localStorage so it survives a full page navigation too (index.html and
// docs.html are separate page loads, not client-side routes, so an in-memory
// variable alone would reset to the default on every nav).

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'pivotick-demo-theme'

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    // Storage can throw (private browsing, blocked site data, ...) — fall
    // back to the default rather than let a theme read crash the page.
    return 'light'
  }
}

let currentTheme: Theme = readStoredTheme()
// Applied immediately at module load (not just inside setTheme) so a page
// that opens already in dark mode never paints a light flash first.
document.documentElement.dataset.theme = currentTheme

const listeners = new Set<(theme: Theme) => void>()

export function getTheme(): Theme {
  return currentTheme
}

export function setTheme(theme: Theme): void {
  if (theme === currentTheme) return
  currentTheme = theme
  // Drives the page's own light/dark CSS (siteHeader.css, docsStyle.css) —
  // separate from Pivotick's own `theme` option, which only affects what's
  // inside a given Pivotick instance.
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Non-fatal — the in-memory value for this page load is still correct,
    // it just won't carry over to the next navigation.
  }
  for (const listener of listeners) listener(theme)
}

export function onThemeChange(listener: (theme: Theme) => void): void {
  listeners.add(listener)
}
