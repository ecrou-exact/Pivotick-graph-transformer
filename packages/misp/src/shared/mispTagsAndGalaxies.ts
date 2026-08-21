import type { NodeId, RawEdge, RawNode } from 'pivotick-transformer-core'

import { edgeStyleFor } from './edgeStyleFor.js'
import { mispIconSvg } from './mispIconSvg.js'
import { mispTagColor } from './mispTagColor.js'
import stylesConfig from './styles.json' with { type: 'json' }
import type { MispGalaxy, MispGalaxyCluster, MispTag } from './types.js'

// MISP represents a galaxy cluster's association two ways: the structured
// Galaxy/GalaxyCluster arrays `addMispGalaxies` handles below, *and* as a
// plain machine tag of this exact shape (it's literally GalaxyCluster's
// own `tag_name` field) — e.g. `misp-galaxy:tool="Cobalt Strike"`. It's
// still structurally a tag node (same shape/size as every other tag,
// same 'tag' edge kind) — only its icon and colour are swapped for the
// galaxy's own, so it reads as "a tag, but a galaxy one" rather than
// turning into a differently-shaped node. Its colour comes from
// styles.json's "galaxyCluster" category (not a separate hardcoded
// value), so it stays in sync with whatever a "real" GalaxyCluster node
// is coloured.
const GALAXY_TAG_PATTERN = /^misp-galaxy:([^=]+)="(.+)"$/

/**
 * Shared across every MISP variant: Tags (plain or galaxy-pattern) are
 * always flat, deduplicated nodes connected by an edge from whichever
 * entity carries them — never nested as a `RawNode.children` entry, even
 * in variants (like `event-root-simplified`) that otherwise nest
 * Attributes/Objects. A node can only be nested under one parent in
 * Pivotick's children/expand-collapse model, but the same tag name
 * routinely appears on many Attributes/Objects/Events in one input (e.g.
 * `tlp:white`) — nesting it would force either duplicating the node per
 * carrier (losing dedup) or picking one arbitrary "owner" (silently
 * dropping the others' edges). One shared node with one edge per carrier
 * sidesteps both, and Pivotick still re-anchors an edge sensibly when its
 * target is currently hidden inside a collapsed ancestor.
 */
export function addMispTags(params: { tags: MispTag[] | undefined; parentId: NodeId; nodes: RawNode[]; edges: RawEdge[]; tagNodeIdByName: Map<string, NodeId> }): void {
  const { tags, parentId, nodes, edges, tagNodeIdByName } = params
  for (const tag of tags ?? []) {
    let tagNodeId = tagNodeIdByName.get(tag.name)
    if (!tagNodeId) {
      tagNodeId = `tag:${tag.name}`
      tagNodeIdByName.set(tag.name, tagNodeId)

      const galaxyMatch = GALAXY_TAG_PATTERN.exec(tag.name)
      // e.g. 'tool=FakeUpdates' — the galaxy type is part of the
      // label on purpose: the bare cluster value alone ('FakeUpdates')
      // doesn't say what kind of thing it is without also reading the
      // icon/colour, whereas the raw tag name in full
      // ('misp-galaxy:tool="FakeUpdates"') is needlessly verbose for a
      // small chip.
      const label = galaxyMatch ? `${galaxyMatch[1]}=${galaxyMatch[2]}` : tag.name
      // Colour: a galaxy tag always gets the galaxyCluster category's
      // colour (from styles.json), ignoring its own `colour`; a plain
      // tag gets its own colour, or the misp-taxonomies fallback (e.g.
      // tlp:red -> #FF2B2B) when it didn't carry one — real MISP
      // exports normally already carry the right colour directly on
      // the Tag, so that fallback mostly covers hand-built/incomplete
      // input. Computed and carried as `data.colour` — used below as
      // the node's actual render style.
      const colour = galaxyMatch ? (stylesConfig.icons.nodes.galaxyCluster.color as string) : mispTagColor(tag)

      // Icon: the galaxy's own misp-iconify icon for a galaxy tag,
      // otherwise none — attribute/object/event icons don't apply to a
      // tag.
      const svgIcon = galaxyMatch ? mispIconSvg(`galaxies/${galaxyMatch[1]}`) : undefined
      nodes.push({
        id: tagNodeId,
        data: { label, entityType: 'tag', colour },
        // Still structurally a tag node — same shape/size as every
        // other tag (styles.json's "tag" category), only `color`
        // and `svgIcon` are overridden here, per node. `colour` is
        // the fill; `strokeColor` is pinned to a fixed dark neutral
        // rather than following it (Pivotick's own default stroke
        // is white), so the outline stays visible even for a
        // white/near-white colour — and since svgIcon's currentColor
        // context follows strokeColor, not color, the icon renders
        // in that same dark neutral, readable against any fill
        // colour instead of disappearing into it.
        style: colour ? { color: colour, strokeColor: '#334155', strokeWidth: 1.5, ...(svgIcon ? { svgIcon } : {}) } : undefined,
      })
    }
    edges.push({ from: parentId, to: tagNodeId, data: { kind: 'hasTag' }, style: edgeStyleFor('hasTag') })
  }
}

/** Same dedup/edge reasoning as `addMispTags()`, for Galaxy/GalaxyCluster. */
export function addMispGalaxies(params: {
  galaxies: MispGalaxy[] | undefined
  parentId: NodeId
  nodes: RawNode[]
  edges: RawEdge[]
  clusterNodeIdById: Map<string, NodeId>
  clusterNodeIdByUuid: Map<string, NodeId>
  seenClusters: MispGalaxyCluster[]
}): void {
  const { galaxies, parentId, nodes, edges, clusterNodeIdById, clusterNodeIdByUuid, seenClusters } = params
  for (const galaxy of galaxies ?? []) {
    for (const cluster of galaxy.GalaxyCluster ?? []) {
      let clusterNodeId = clusterNodeIdById.get(cluster.id)
      if (!clusterNodeId) {
        clusterNodeId = `cluster:${cluster.id}`
        clusterNodeIdById.set(cluster.id, clusterNodeId)
        // Only populated when a cluster's `uuid` is actually non-empty
        // (it's frequently `''` in real exports) — used to resolve
        // GalaxyClusterRelation targets, which reference clusters by uuid.
        if (cluster.uuid) clusterNodeIdByUuid.set(cluster.uuid, clusterNodeId)
        // Every cluster we've created a node for, so relations can be
        // resolved once at the end instead of per-parent (a cluster
        // attached to three entities would otherwise have its relations
        // processed three times) — see buildClusterRelationEdges().
        seenClusters.push(cluster)
        nodes.push({
          id: clusterNodeId,
          data: { label: cluster.value, entityType: `galaxies/${galaxy.type}`, description: cluster.description, source: cluster.source },
        })
      }
      edges.push({ from: parentId, to: clusterNodeId, data: { kind: 'hasGalaxy' }, style: edgeStyleFor('hasGalaxy') })
    }
  }
}
