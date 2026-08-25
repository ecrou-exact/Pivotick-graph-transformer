import { getTheme, onThemeChange, setTheme } from './theme'

// Same top-nav shape Pivotick's own site (https://pivotick.github.io/Pivotick/)
// uses: brand, an external link back to Pivotick itself, Docs/Demo (one
// marked active), a GitHub link, and a theme toggle — shared by both pages
// via ./theme.ts so this button and any other theme control on the same
// page (e.g. the Demo page's fixture-picker switch) never disagree.
export function renderSiteHeader(activePage: 'home' | 'demo' | 'docs'): void {
  const header = document.createElement('header')
  header.id = 'site-header'
  header.innerHTML = `
    <a class="site-header-brand" href="./index.html">
      <img src="./static/images/logo.jpeg" alt="" class="site-header-logo" />
      <span class="site-header-brand-name">Pivotick</span>
      <span class="site-header-brand-suffix">Graph Transformer</span>
    </a>
    <nav class="site-header-nav" aria-label="Main">
      <a href="./index.html" ${activePage === 'home' ? 'class="active" aria-current="page"' : ''}>Home</a>
      <a href="./docs.html" ${activePage === 'docs' ? 'class="active" aria-current="page"' : ''}>Docs</a>
      <a href="./demo.html" ${activePage === 'demo' ? 'class="active" aria-current="page"' : ''}>Demo</a>
      <a href="https://pivotick.github.io/Pivotick/" target="_blank" rel="noopener noreferrer">Pivotick ↗</a>
      <a href="https://github.com/ecrou-exact/pivotick-graph-transformer" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub repository">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.03 3.26 9.29 7.79 10.8.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.36-3.84-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" /></svg>
      </a>
      <button id="site-header-theme-toggle" type="button" role="switch" aria-label="Toggle dark/light theme">
        <span id="site-header-theme-icon"></span>
      </button>
    </nav>
  `
  document.body.prepend(header)

  const toggle = header.querySelector('#site-header-theme-toggle') as HTMLButtonElement
  const icon = header.querySelector('#site-header-theme-icon') as HTMLSpanElement

  const sunIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm7 3a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM6 11a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h1zm11.66-5.66a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0zm-10.6 10.6a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0zm10.6 0 .7.7a1 1 0 1 1-1.42 1.42l-.7-.7a1 1 0 1 1 1.42-1.42zM7.06 5.34l.7.7A1 1 0 1 1 6.34 7.46l-.7-.7a1 1 0 1 1 1.42-1.42zM12 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"/></svg>'
  const moonIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.74 14.5a8.5 8.5 0 0 1-11.24-11.24.75.75 0 0 0-.96-.96A10 10 0 1 0 21.7 15.46a.75.75 0 0 0-.96-.96z"/></svg>'

  function syncToggle(theme: 'dark' | 'light'): void {
    toggle.setAttribute('aria-checked', String(theme === 'light'))
    icon.innerHTML = theme === 'light' ? sunIcon : moonIcon
  }

  toggle.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark')
  })
  onThemeChange(syncToggle)
  syncToggle(getTheme())
}
