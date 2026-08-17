#!/usr/bin/env node
// Maintainer-run script — NOT part of `npm install` or `npm run build`.
//
// Pivotick (https://github.com/pivotick/pivotick) is `"private": true` in its
// own package.json, so it can't be published to npm, and it doesn't commit a
// built `dist/` either — so neither `npm install pivotick` nor
// `npm install github:pivotick/pivotick` works. The Pivotick README's own
// recommended no-build path is to grab the pre-built `dist` bundle attached
// to a GitHub Release. This script automates exactly that: download the
// pinned release's dist zip, extract only the ES module files the demo
// actually needs, and write them into `demo/vendor/pivotick/` — committed to
// git, same "sync at maintain-time, ship at install-time" pattern documented
// in docs/icons-and-styling.md for MISP's icon set.
//
// Usage: node demo/scripts/sync-pivotick.mjs
// Requires `unzip` on PATH (present by default on macOS/Linux and GitHub
// Actions ubuntu-latest runners).

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Bump this (and re-run this script) to pick up a newer Pivotick release.
// Bumping is a deliberate, reviewable diff — never automatic.
const PIVOTICK_VERSION = 'v1.5.0'

const REPO = 'Pivotick/Pivotick'
const DOWNLOAD_URL = `https://github.com/${REPO}/releases/download/${PIVOTICK_VERSION}/pivotick-dist.zip`

// Pivotick's ES build keeps a handful of its own `dependencies` external
// (bare `import ... from 'd3-selection'` etc. left unbundled in
// index-*.js) rather than inlining them — dompurify/marked, by contrast,
// ARE bundled in. After bumping PIVOTICK_VERSION, re-check which imports
// are still bare specifiers (`grep -oE 'from "[^"./][^"]*"'
// demo/vendor/pivotick/index-*.js`) and keep demo/package.json's
// `dependencies` in sync — otherwise the demo builds locally (Node's
// resolver may find a stray copy elsewhere on disk) but fails in CI.

// Only the ES module build + the chunks it actually references at runtime.
// The UMD/IIFE bundles and the duplicate `assets/pivotick.css` in the zip
// aren't needed by the Vite-based demo, so they're intentionally left out.
const FILES_TO_VENDOR = [
  'pivotick.es.js',
  'pivotick.css',
  'index-Bzoqf7dC.js',
  'SimulationWorker-B46OdSE7.js',
  'workers/simulation.worker.js',
]

// The nav logo isn't part of the release dist zip (it's a docs/brand asset,
// not a build output) — fetched separately, straight from the repo at the
// same pinned tag.
const LOGO_URL = `https://raw.githubusercontent.com/${REPO}/${PIVOTICK_VERSION}/public/pivotick.svg`

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vendorDir = path.join(__dirname, '..', 'vendor', 'pivotick')

const workDir = mkdtempSync(path.join(tmpdir(), 'pivotick-sync-'))

try {
  const zipPath = path.join(workDir, 'pivotick-dist.zip')

  console.log(`Downloading ${DOWNLOAD_URL}`)
  execFileSync('curl', ['-sL', '-o', zipPath, DOWNLOAD_URL])

  console.log(`Extracting to ${workDir}`)
  execFileSync('unzip', ['-o', '-q', zipPath, '-d', workDir])

  // Only overwrite the managed files below — never wipe vendorDir wholesale,
  // it also holds pivotick.es.d.ts (hand-written, see that file's header)
  // which this script must never touch.
  mkdirSync(vendorDir, { recursive: true })

  for (const relPath of FILES_TO_VENDOR) {
    const from = path.join(workDir, relPath)
    const to = path.join(vendorDir, relPath)
    mkdirSync(path.dirname(to), { recursive: true })
    copyFileSync(from, to)
    console.log(`  vendored ${relPath}`)
  }

  console.log(`Downloading logo ${LOGO_URL}`)
  execFileSync('curl', ['-sL', '-o', path.join(vendorDir, 'logo.svg'), LOGO_URL])
  console.log('  vendored logo.svg')

  writeFileSync(
    path.join(vendorDir, 'VERSION'),
    `${PIVOTICK_VERSION}\nSynced from ${DOWNLOAD_URL}\nLogo from ${LOGO_URL}\n`,
  )

  console.log(`Done. Vendored Pivotick ${PIVOTICK_VERSION} into ${vendorDir}`)
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
