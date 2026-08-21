// Shared by main.ts and docs.ts: every page carries the same nav with a
// #theme-toggle button and is themed via [data-theme] on <html> (style.css's
// :root[data-theme] rules). Only main.ts additionally has a live Pivotick
// instance to keep in sync — that's what `onChange` is for; docs.ts (no
// Pivotick instance on the page) just calls this with no callback.

const THEME_KEY = 'pivotick-demo-theme'

export function effectiveTheme(): 'light' | 'dark' {
  const stored = document.documentElement.dataset.theme
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function initThemeToggle(onChange?: (theme: 'light' | 'dark') => void): void {
  const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')
  if (!themeToggle) return

  function updateLabel(): void {
    themeToggle!.textContent = effectiveTheme() === 'dark' ? '☀️' : '🌙'
  }

  function applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
    updateLabel()
    onChange?.(theme)
  }

  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored
  updateLabel()

  themeToggle.addEventListener('click', () => {
    applyTheme(effectiveTheme() === 'dark' ? 'light' : 'dark')
  })
}
