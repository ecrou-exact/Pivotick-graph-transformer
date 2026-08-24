import '../vendor/pivotick/pivotick.css'
import { Pivotick } from '../vendor/pivotick/pivotick.es.js'
import '../../packages/misp/src/index'
import { GraphRegistry } from '../../packages/core/src/index'
import mispFixture from '../fixtures/misp/simple-event.json'

const container = document.getElementById('app')
if (!container) throw new Error('Missing #app container')

const data = GraphRegistry.importAuto(mispFixture)

new Pivotick(container, data, {})
