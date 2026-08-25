import { GraphRegistry } from '../../core/src/index'
import { MispEventImporter } from './import'

export * from './attribute/fields'
export * from './attribute/types'
export * from './event/fields'
export * from './event/types'
export * from './galaxy/colour'
export * from './galaxy/fields'
export * from './galaxy/types'
export * from './import'
export * from './object/fields'
export * from './object/types'
export * from './tag/fields'
export * from './tag/types'

GraphRegistry.registerImporter(new MispEventImporter())
