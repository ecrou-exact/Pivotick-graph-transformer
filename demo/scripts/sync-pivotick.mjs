#!/usr/bin/env node
// Vendors a pinned Pivotick release's built dist/ into demo/vendor/pivotick/.
// Pivotick is `private: true` and ships no dist/ in its git tree, so neither
// `npm install pivotick` nor a `github:` dependency works — the release's
// `pivotick-dist.zip` asset is the only distribution channel. Re-run this
// script after bumping PIVOTICK_VERSION, then commit the resulting vendor/ diff.

import { createWriteStream, existsSync, mkdirSync, rmSync } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const PIVOTICK_VERSION = 'v1.6.0'
const RELEASE_URL = `https://github.com/Pivotick/Pivotick/releases/download/${PIVOTICK_VERSION}/pivotick-dist.zip`

const demoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const vendorDir = path.join(demoDir, 'vendor', 'pivotick')
const zipPath = path.join(demoDir, '.pivotick-dist.zip')

console.log(`Downloading Pivotick ${PIVOTICK_VERSION} from ${RELEASE_URL}`)
const response = await fetch(RELEASE_URL)
if (!response.ok) throw new Error(`Failed to download ${RELEASE_URL}: ${response.status}`)
await pipeline(response.body, createWriteStream(zipPath))

if (existsSync(vendorDir)) rmSync(vendorDir, { recursive: true })
mkdirSync(vendorDir, { recursive: true })

execFileSync('unzip', ['-o', '-q', zipPath, '-d', vendorDir])
rmSync(zipPath)

console.log(`Vendored Pivotick ${PIVOTICK_VERSION} into ${path.relative(demoDir, vendorDir)}`)
