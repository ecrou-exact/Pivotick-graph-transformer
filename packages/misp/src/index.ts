import { ConverterRegistry } from 'pivotick-transformer-core'

import { MispEventRootConverter } from './MispEventRootConverter.js'

export { MispEventRootConverter }
export type { MispEvent, MispInput, MispObject } from './types.js'

ConverterRegistry.register(new MispEventRootConverter())
