import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  // GitHub Pages serves a project site from /<repo-name>/, not /, so every
  // asset URL Vite emits needs that prefix — set by CI (see
  // .github/workflows/deploy-demo.yml); local `npm run dev`/`build` still
  // default to '/'.
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  build: {
    // Vite only builds the entry it's told about — without this, adding a
    // second/third page wouldn't be reflected in `npm run build` output.
    // index.html is the landing/home page (deliberately, so it's what
    // GitHub Pages' project root serves) — the interactive fixture-picker
    // Demo page lives at demo.html instead.
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        demo: path.resolve(__dirname, 'demo.html'),
        docs: path.resolve(__dirname, 'docs.html')
      }
    }
  }
})
