import { defineConfig } from 'vite'

// GITHUB_PAGES_BASE is set by .github/workflows/deploy-demo.yml to the repo
// name (GitHub Pages serves project sites from /<repo>/). Left unset, the
// demo runs at the site root — what `vite dev`/`vite preview` want locally.
export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  build: {
    outDir: 'dist',
  },
})
