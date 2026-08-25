import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  build: {
    // Vite only builds the entry it's told about — without this, adding a
    // second/third page wouldn't be reflected in `npm run build` output
    // (currently unused by any CI/deploy, but cheap to keep correct).
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'home.html'),
        main: path.resolve(__dirname, 'index.html'),
        docs: path.resolve(__dirname, 'docs.html')
      }
    }
  }
})
