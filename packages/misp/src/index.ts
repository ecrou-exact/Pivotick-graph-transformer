import { GraphRegistry } from '../../core/src/index'
import { MispEventImporter } from './import'

export * from './import'
export * from './types'

GraphRegistry.registerImporter(new MispEventImporter())
