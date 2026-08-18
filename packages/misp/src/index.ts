import { ConverterRegistry } from 'pivotick-transformer-core'

import { MispEventRootSimplifiedConverter } from './variants/event-root-simplified/EventRootSimplifiedConverter.js'
import { MispEventRootConverter } from './variants/event-root/EventRootConverter.js'

export { MispEventRootConverter, MispEventRootSimplifiedConverter }
export type { MispEvent, MispInput, MispObject } from './shared/types.js'

ConverterRegistry.register(new MispEventRootConverter())
ConverterRegistry.register(new MispEventRootSimplifiedConverter())
