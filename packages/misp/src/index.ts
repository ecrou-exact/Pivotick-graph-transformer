import { ConverterRegistry } from 'pivotick-transformer-core'

import { MispEventRootConverter } from './MispEventRootConverter.js'

export { MispEventRootConverter }
export type { MispEvent } from './types.js'

ConverterRegistry.register(new MispEventRootConverter())
