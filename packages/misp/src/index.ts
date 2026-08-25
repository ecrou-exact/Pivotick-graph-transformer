import { GraphRegistry } from '../../core/src/index'
import { MispEventImporter } from './import'

export * from './attribute/fields'
export * from './attribute/types'
export * from './event/fields'
export * from './event/types'
export * from './import'
export * from './object/fields'
export * from './object/types'

GraphRegistry.registerImporter(new MispEventImporter())
