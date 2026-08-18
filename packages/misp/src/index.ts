import { ConverterRegistry } from 'pivotick-transformer-core'

import { MispEventRootConverter } from './variants/event-root/EventRootConverter.js'

export { MispEventRootConverter }
export type { MispEvent, MispInput, MispObject } from './shared/types.js'

ConverterRegistry.register(new MispEventRootConverter())
