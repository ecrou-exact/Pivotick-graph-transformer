import { ConverterRegistry } from 'pivotick-transformer-core'

import { MispEventRootMinimalConverter } from './variants/event-root-minimal/EventRootMinimalConverter.js'
import { MispEventRootOverviewConverter } from './variants/event-root-overview/EventRootOverviewConverter.js'
import { MispEventRootSimplifiedConverter } from './variants/event-root-simplified/EventRootSimplifiedConverter.js'
import { MispEventRootConverter } from './variants/event-root/EventRootConverter.js'

export { MispEventRootConverter, MispEventRootSimplifiedConverter, MispEventRootOverviewConverter, MispEventRootMinimalConverter }
export type { MispEvent, MispInput, MispObject } from './shared/types.js'

ConverterRegistry.register(new MispEventRootConverter())
ConverterRegistry.register(new MispEventRootSimplifiedConverter())
ConverterRegistry.register(new MispEventRootOverviewConverter())
ConverterRegistry.register(new MispEventRootMinimalConverter())
