import type { ConverterOptions, NodeId, RawEdge } from 'pivotick-transformer-core'

import { edgeStyleFor, shouldLabelEdges } from './edgeStyleFor.js'
import type { MispGalaxyCluster, MispObject } from './types.js'

/**
 * Explicit Object References become extra edges on top of whatever
 * structural containment a variant expresses (flat hasObject/hasAttribute
 * edges, or `RawNode.children` nesting) — this is MISP's own named
 * relationship between Objects/Attributes, identical regardless of
 * topology. A reference's target can be any UUID in the input (another
 * Object, or an Attribute); skipped if it doesn't resolve to a node the
 * caller created. `nodeIdByUuid` must already contain every Object/
 * Attribute node the variant created.
 */
export function buildObjectReferenceEdges(objects: MispObject[], nodeIdByUuid: Map<string, NodeId>, options?: ConverterOptions): RawEdge[] {
  const showLabels = shouldLabelEdges(options)
  const edges: RawEdge[] = []
  for (const object of objects) {
    const fromId = nodeIdByUuid.get(object.uuid)
    if (!fromId) continue

    for (const reference of object.ObjectReference ?? []) {
      const toId = nodeIdByUuid.get(reference.referenced_uuid)
      if (!toId) continue
      // `label` is what Pivotick actually shows on the edge (see
      // EdgeDrawer.ts's edgeLabelGetter — reads edge.getData().label
      // directly, no render-option wiring needed) — see
      // `shouldLabelEdges()`'s doc for why `'icon'` style omits it.
      // Purely structural edges are left unlabeled on purpose otherwise —
      // Object References are MISP's actual named relationships, so
      // that's where a label earns its place instead of adding clutter.
      edges.push({
        from: fromId,
        to: toId,
        data: { ...(showLabels ? { label: reference.relationship_type ?? '' } : {}), relationshipType: reference.relationship_type, kind: 'reference' },
        style: edgeStyleFor('reference'),
      })
    }
  }
  return edges
}

/**
 * MISP's own cluster-to-cluster graph (GalaxyClusterRelation), distinct
 * from an Object Reference — e.g. a threat-actor cluster "uses" a malware
 * cluster. Targets are resolved by uuid; skipped if the referenced
 * cluster wasn't one the caller rendered (out of scope of this input, or
 * its uuid is empty in the source data). `seenClusters` must be every
 * GalaxyCluster the variant created a node for (see `addMispGalaxies()`).
 */
export function buildClusterRelationEdges(
  seenClusters: MispGalaxyCluster[],
  clusterNodeIdById: Map<string, NodeId>,
  clusterNodeIdByUuid: Map<string, NodeId>,
  options?: ConverterOptions,
): RawEdge[] {
  const showLabels = shouldLabelEdges(options)
  const edges: RawEdge[] = []
  for (const cluster of seenClusters) {
    const fromId = clusterNodeIdById.get(cluster.id)
    if (!fromId) continue

    for (const relation of cluster.GalaxyClusterRelation ?? []) {
      const toId = clusterNodeIdByUuid.get(relation.referenced_galaxy_cluster_uuid)
      if (!toId) continue
      edges.push({
        from: fromId,
        to: toId,
        data: { ...(showLabels ? { label: relation.referenced_galaxy_cluster_type } : {}), kind: 'clusterRelation' },
        style: edgeStyleFor('clusterRelation'),
      })
    }
  }
  return edges
}
