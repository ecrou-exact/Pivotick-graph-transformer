#!/usr/bin/env node
// Maintainer-run script — NOT part of `npm install` or `npm run build`.
//
// Regenerates demo/fixtures/misp/example-icon-showcase.json: one Attribute
// per attribute-type icon, one Object per object-type icon, one Galaxy +
// GalaxyCluster per galaxy-type icon — every icon packages/misp currently
// ships via misp-iconify, in one Event, so the demo can render all of them
// at once. Re-run after packages/misp/scripts/sync-icons.mjs picks up a
// newer misp-iconify commit, to keep the showcase in sync.
//
// Usage: npm run build --workspace=pivotick-transformer-misp && node demo/scripts/generate-icon-showcase.mjs

import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { MISP_ATTRIBUTE_ICONS, MISP_GALAXY_ICONS, MISP_OBJECT_ICONS } from '../../packages/misp/dist/icons.generated.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'fixtures', 'misp', 'example-icon-showcase.json')

const attributeKeys = Object.keys(MISP_ATTRIBUTE_ICONS).sort()
const objectKeys = Object.keys(MISP_OBJECT_ICONS).sort()
const galaxyKeys = Object.keys(MISP_GALAXY_ICONS).sort()

const Attribute = attributeKeys.map((type) => ({
  uuid: `attr-${type}`,
  type,
  category: 'Other',
  value: type,
}))

// No nested Attribute per Object on purpose — this fixture is a pure icon
// showcase, not a realistic export, and 213 extra generic-icon filler
// attributes would just clutter it without showing anything new.
const Object_ = objectKeys.map((name) => ({
  uuid: `obj-${name}`,
  name,
  'meta-category': 'misc',
  description: name,
}))

const Galaxy = galaxyKeys.map((type) => ({
  id: `galaxy-${type}`,
  uuid: `galaxy-${type}`,
  name: type,
  type,
  description: type,
  GalaxyCluster: [
    {
      id: `cluster-${type}`,
      uuid: `cluster-${type}`,
      value: type,
      description: type,
    },
  ],
}))

const event = {
  Event: {
    uuid: 'event-icon-showcase',
    info: `misp-iconify showcase — ${Attribute.length} attribute, ${Object_.length} object and ${Galaxy.length} galaxy icons Pivotick Graph Transformer ships by default`,
    date: new Date().toISOString().slice(0, 10),
    Attribute,
    Object: Object_,
    Galaxy,
  },
}

writeFileSync(outPath, JSON.stringify(event, null, 2) + '\n')
console.log(`Wrote ${outPath}`)
console.log(`  ${Attribute.length} attributes, ${Object_.length} objects, ${Galaxy.length} galaxy clusters`)
