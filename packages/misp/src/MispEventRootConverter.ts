import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeStyleMap, NodeTypeAccessor } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import type { MispEvent } from './types.js'

/**
 * `event-root` variant: the MISP Event is a root/cluster node, with its
 * Attributes and Objects as children. See CONTRIBUTING.md for how this
 * differs from the (planned) `object-refs-only` variant.
 */
export class MispEventRootConverter extends GraphConverter<MispEvent> {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root',
    name: 'Event as root node',
    description: 'The Event is a cluster node; Attributes and Objects are its children.',
    default: true,
  }

  detect(input: unknown): boolean {
    return detectMispEvent(input)
  }

  convert(_input: MispEvent, _options?: ConverterOptions): ConversionResult {
    // TODO: map the Event, its Attributes, Objects and Object References
    // into RawNode[] / RawEdge[].
    return { nodes: [], edges: [] }
  }

  getNodeTypeAccessor(): NodeTypeAccessor {
    // TODO: return the MISP entity type (attribute `type`, object `name`,
    // galaxy cluster `type`, or `'event'` for the root node) per node.
    return () => 'unknown'
  }

  getDefaultStyleMap(): NodeStyleMap {
    // TODO: default shape/color (and, later, icons — see
    // docs/icons-and-styling.md) per MISP entity type.
    return {}
  }
}
