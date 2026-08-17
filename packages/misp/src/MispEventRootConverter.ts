import { GraphConverter } from 'pivotick-transformer-core'
import type { ConversionResult, ConverterOptions, ConverterVariantMeta, NodeId, NodeStyleMap, NodeTypeAccessor, RawEdge, RawNode } from 'pivotick-transformer-core'

import { detectMispEvent } from './detectMispEvent.js'
import { MISP_ATTRIBUTE_ICONS, MISP_GALAXY_ICONS, MISP_GENERIC_ICONS, MISP_OBJECT_ICONS } from './icons.generated.js'
import { mispIconSvg } from './mispIconSvg.js'
import { mispTagColor } from './mispTagColor.js'
import { normalizeMispInput } from './normalizeMispInput.js'
import stylesConfig from './styles.json' with { type: 'json' }
import type { MispAttribute, MispGalaxy, MispGalaxyCluster, MispInput, MispObject, MispTag } from './types.js'

// MISP represents a galaxy cluster's association two ways: the structured
// Galaxy/GalaxyCluster arrays `addGalaxies` handles below, *and* as a
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
 * `event-root` variant: each Event is a root/cluster node, with its
 * Attributes and Objects as children; standalone Objects (not attached to
 * any Event) are their own root node. See CONTRIBUTING.md for how this
 * differs from the (planned) `object-refs-only` variant.
 *
 * Accepts a single Event, a list of Events, a `{ response: [...] }`
 * restSearch-style wrapper, a standalone Object, or a list of Objects —
 * any mix of these — see `normalizeMispInput.ts`. Multiple Events/Objects
 * in one input all land in the same graph, side by side.
 */
export class MispEventRootConverter extends GraphConverter<MispInput> {
  readonly format = 'misp'

  readonly variant: ConverterVariantMeta = {
    id: 'event-root',
    name: 'Event as root node',
    description: 'Each Event is a cluster node; Attributes and Objects are its children. Standalone Objects root themselves.',
    default: true,
  }

  detect(input: unknown): boolean {
    return detectMispEvent(input)
  }

  convert(input: MispInput, _options?: ConverterOptions): ConversionResult {
    const { events, objects: standaloneObjects } = normalizeMispInput(input)
    if (events.length === 0 && standaloneObjects.length === 0) {
      throw new Error('Not MISP data: expected an Event, a standalone Object, or a list of either.')
    }

    const nodes: RawNode[] = []
    const edges: RawEdge[] = []
    const nodeIdByUuid = new Map<string, NodeId>()
    // Tags/Galaxy clusters are commonly reused across many Events/Attributes/
    // Objects in the same input (e.g. every Attribute tagged tlp:white) — one
    // node per unique tag name / cluster id, with an edge from every entity
    // that carries it, rather than a duplicate node each time.
    const tagNodeIdByName = new Map<string, NodeId>()
    const clusterNodeIdById = new Map<string, NodeId>()
    // Only populated when a cluster's `uuid` is actually non-empty (it's
    // frequently `''` in real exports) — used to resolve
    // GalaxyClusterRelation targets, which reference clusters by uuid.
    const clusterNodeIdByUuid = new Map<string, NodeId>()
    // Every cluster we've created a node for, so relations can be resolved
    // once at the end instead of per-parent (a cluster attached to three
    // entities would otherwise have its relations processed three times).
    const seenClusters: MispGalaxyCluster[] = []

    const addTags = (tags: MispTag[] | undefined, parentId: NodeId): void => {
      for (const tag of tags ?? []) {
        let tagNodeId = tagNodeIdByName.get(tag.name)
        if (!tagNodeId) {
          tagNodeId = `tag:${tag.name}`
          tagNodeIdByName.set(tag.name, tagNodeId)

          const galaxyMatch = GALAXY_TAG_PATTERN.exec(tag.name)
          // Colour: a galaxy tag always gets the galaxyCluster category's
          // colour (from styles.json), ignoring its own `colour`; a plain
          // tag gets its own colour, or the misp-taxonomies fallback (e.g.
          // tlp:red -> #FF2B2B) when it didn't carry one — real MISP
          // exports normally already carry the right colour directly on
          // the Tag, so that fallback mostly covers hand-built/incomplete
          // input.
          const colour = galaxyMatch ? (stylesConfig.nodes.galaxyCluster.color as string) : mispTagColor(tag)
          // Icon: the galaxy's own misp-iconify icon for a galaxy tag
          // (deduped by tag name, not cluster id — a plain Tag carries no
          // cluster id/uuid to correlate against a "real" GalaxyCluster
          // node, so the rare case of the same cluster appearing both ways
          // ends up as two nodes, not one), otherwise none — attribute/
          // object/event icons don't apply to a tag.
          const svgIcon = galaxyMatch ? mispIconSvg(`galaxies/${galaxyMatch[1]}`) : undefined
          const label = galaxyMatch ? galaxyMatch[2] : tag.name

          nodes.push({
            id: tagNodeId,
            data: { label, entityType: 'tag' },
            // Still structurally a tag node — same shape/size as every
            // other tag (styles.json's "tag" category), only `color` and
            // `svgIcon` are overridden here, per node. `colour` is the
            // fill; `strokeColor` is pinned to a fixed dark neutral rather
            // than following it (Pivotick's own default stroke is white),
            // so the outline stays visible even for a white/near-white
            // colour — and since svgIcon's currentColor context follows
            // strokeColor, not color, the icon renders in that same dark
            // neutral, readable against any fill colour instead of
            // disappearing into it.
            style: colour ? { color: colour, strokeColor: '#334155', strokeWidth: 1.5, ...(svgIcon ? { svgIcon } : {}) } : undefined,
          })
        }
        edges.push({ from: parentId, to: tagNodeId, data: { kind: 'tag' } })
      }
    }

    const addGalaxies = (galaxies: MispGalaxy[] | undefined, parentId: NodeId): void => {
      for (const galaxy of galaxies ?? []) {
        for (const cluster of galaxy.GalaxyCluster ?? []) {
          let clusterNodeId = clusterNodeIdById.get(cluster.id)
          if (!clusterNodeId) {
            clusterNodeId = `cluster:${cluster.id}`
            clusterNodeIdById.set(cluster.id, clusterNodeId)
            if (cluster.uuid) clusterNodeIdByUuid.set(cluster.uuid, clusterNodeId)
            seenClusters.push(cluster)
            nodes.push({
              id: clusterNodeId,
              data: { label: cluster.value, entityType: `galaxies/${galaxy.type}`, description: cluster.description },
            })
          }
          edges.push({ from: parentId, to: clusterNodeId, data: { kind: 'galaxy' } })
        }
      }
    }

    const addAttribute = (attribute: MispAttribute, parentId: NodeId): void => {
      const attributeNodeId: NodeId = `attribute:${attribute.uuid}`
      nodes.push({
        id: attributeNodeId,
        data: {
          label: attribute.value,
          entityType: attribute.type,
          category: attribute.category,
          // The attribute's semantic role within its parent Object's
          // template (e.g. 'first-name', 'ip') — MISP's own UI shows this,
          // not the raw `type`, when the attribute belongs to an Object.
          objectRelation: attribute.object_relation,
          sightingCount: attribute.Sighting?.length,
        },
      })
      nodeIdByUuid.set(attribute.uuid, attributeNodeId)
      edges.push({
        from: parentId,
        to: attributeNodeId,
        // object_relation doubles as the edge label when present — it's a
        // real MISP-defined relation name, same idea as an Object
        // Reference's relationship_type, just for Object->Attribute
        // membership instead of Object->Object.
        data: attribute.object_relation ? { label: attribute.object_relation, kind: 'structure' } : { kind: 'structure' },
      })
      addTags(attribute.Tag, attributeNodeId)
      addGalaxies(attribute.Galaxy, attributeNodeId)
    }

    // `parentId: null` for a standalone Object (no Event to hang off of) —
    // it becomes its own root node instead of a child.
    const addObject = (object: MispObject, parentId: NodeId | null): void => {
      const objectNodeId: NodeId = `object:${object.uuid}`
      nodes.push({
        id: objectNodeId,
        data: { label: object.name, entityType: `objects/${object.name}`, description: object.description },
      })
      nodeIdByUuid.set(object.uuid, objectNodeId)
      if (parentId) edges.push({ from: parentId, to: objectNodeId, data: { kind: 'structure' } })
      addTags(object.Tag, objectNodeId)
      addGalaxies(object.Galaxy, objectNodeId)

      for (const attribute of object.Attribute ?? []) {
        addAttribute(attribute, objectNodeId)
      }
    }

    for (const event of events) {
      const eventNodeId: NodeId = `event:${event.uuid}`
      nodes.push({
        id: eventNodeId,
        data: {
          label: event.info,
          entityType: 'event',
          date: event.date,
          published: event.published,
          analysis: event.analysis,
          threatLevel: event.threat_level_id,
          org: event.Orgc?.name ?? event.Org?.name,
        },
      })
      addTags(event.Tag, eventNodeId)
      addGalaxies(event.Galaxy, eventNodeId)

      // Top-level Attributes only — ones that belong to an Object
      // (object_id set to something other than '0') are added via the
      // Object's own nested Attribute list instead, to avoid emitting
      // them twice.
      for (const attribute of event.Attribute ?? []) {
        if (attribute.object_id && attribute.object_id !== '0') continue
        addAttribute(attribute, eventNodeId)
      }

      for (const object of event.Object ?? []) {
        addObject(object, eventNodeId)
      }
    }

    for (const object of standaloneObjects) {
      addObject(object, null)
    }

    // Explicit Object References become extra edges, on top of the
    // structural ones above — across every Object we rendered, whether it
    // came from an Event or stood alone. A reference's target can be any
    // UUID in the input (another Object, or an Attribute); skip it if it
    // doesn't resolve to a node we created.
    const allObjects = [...events.flatMap((event) => event.Object ?? []), ...standaloneObjects]
    for (const object of allObjects) {
      const fromId = nodeIdByUuid.get(object.uuid)
      if (!fromId) continue

      for (const reference of object.ObjectReference ?? []) {
        const toId = nodeIdByUuid.get(reference.referenced_uuid)
        if (!toId) continue
        // `label` is what Pivotick actually shows on the edge (see
        // EdgeDrawer.ts's edgeLabelGetter — reads edge.getData().label
        // directly, no render-option wiring needed). Purely structural
        // edges (event->attribute, ...) are left unlabeled on purpose —
        // Object References are MISP's actual named relationships, so
        // that's where a label earns its place instead of adding clutter.
        edges.push({
          from: fromId,
          to: toId,
          data: { label: reference.relationship_type ?? '', relationshipType: reference.relationship_type, kind: 'reference' },
        })
      }
    }

    // GalaxyClusterRelation — MISP's own cluster-to-cluster graph (e.g. a
    // threat-actor cluster "uses" a malware cluster), distinct from an
    // Object Reference. Targets are resolved by uuid; skipped if the
    // referenced cluster wasn't one we rendered (out of scope of this
    // input, or its uuid is empty in the source data).
    for (const cluster of seenClusters) {
      const fromId = clusterNodeIdById.get(cluster.id)
      if (!fromId) continue

      for (const relation of cluster.GalaxyClusterRelation ?? []) {
        const toId = clusterNodeIdByUuid.get(relation.referenced_galaxy_cluster_uuid)
        if (!toId) continue
        edges.push({
          from: fromId,
          to: toId,
          data: { label: relation.referenced_galaxy_cluster_type, kind: 'clusterRelation' },
        })
      }
    }

    // TODO: Sighting is aggregated into sightingCount on the Attribute
    // node's data, not rendered as its own nodes — individual sightings
    // (a timestamp + source) aren't graph-worthy entities on their own.
    return { nodes, edges }
  }

  getNodeTypeAccessor(): NodeTypeAccessor {
    return (node) => (node.data?.entityType as string | undefined) ?? 'unknown'
  }

  getDefaultStyleMap(): NodeStyleMap {
    // shape/color per *category* comes from styles.json's "nodes" section —
    // a small, hand-edited config, not generated — so tweaking "objects
    // should be squares" or "attributes should be green" is a one-line
    // JSON edit, not a code change. The *icon* per specific key (domain vs
    // ip-dst vs md5, ...) is what's actually per-key and machine-generated,
    // from scripts/sync-icons.mjs — layered on top of the category style.
    //
    // Node labels (NodeStyle.text) are deliberately not set — with icons
    // already carrying the entity type and hundreds of nodes on screen at
    // once, always-on text under every node is clutter, not signal.
    // node.data.label is still there for the sidebar/tooltip either way.
    // Edge labels (Object Reference relationship_type, Object Attribute
    // object_relation, GalaxyClusterRelation type) are set instead, in
    // convert() — those are the actually-interesting relation names, and
    // there are far fewer edges worth labeling than nodes.
    const nodeStyles = stylesConfig.nodes

    const withIcon = (categoryStyle: Record<string, unknown>, entityType: string): Record<string, unknown> => {
      const svgIcon = mispIconSvg(entityType)
      return svgIcon ? { ...categoryStyle, svgIcon } : categoryStyle
    }

    const styleMap: NodeStyleMap = {
      event: withIcon(nodeStyles.event, 'event'),
      // Tag nodes carry the tag's own MISP colour as a per-node
      // strokeColor/color override (set in `addTags`, above) rather than
      // through this map, since colour varies per tag, not per type.
      tag: withIcon(nodeStyles.tag, 'tag'),
    }

    for (const key of Object.keys(MISP_ATTRIBUTE_ICONS)) styleMap[key] = withIcon(nodeStyles.attribute, key)
    for (const key of Object.keys(MISP_OBJECT_ICONS)) styleMap[`objects/${key}`] = withIcon(nodeStyles.object, `objects/${key}`)
    for (const key of Object.keys(MISP_GALAXY_ICONS)) styleMap[`galaxies/${key}`] = withIcon(nodeStyles.galaxyCluster, `galaxies/${key}`)
    for (const key of Object.keys(MISP_GENERIC_ICONS)) {
      if (key === 'event' || key === 'tag') continue
      styleMap[key] = withIcon(nodeStyles.generic, key)
    }

    return styleMap
  }

  getDefaultEdgeStyle(): Record<string, unknown> {
    // styles.json's "edges" section is keyed by the `kind` convert() sets
    // on each edge's data (structure/tag/galaxy/reference/clusterRelation)
    // — styleCb reads it back per edge, same "small hand-edited JSON is
    // the source of truth" approach as node styling.
    const edgeStyles = stylesConfig.edges
    return {
      ...edgeStyles.default,
      styleCb: (edge: { getData?: () => Record<string, unknown> | undefined }): Record<string, unknown> => {
        const kind = edge.getData?.()?.kind as string | undefined
        return kind && kind in edgeStyles ? edgeStyles[kind as keyof typeof edgeStyles] : {}
      },
    }
  }

  getMarkerStyleMap(): Record<string, unknown> {
    // Smaller arrowheads than Pivotick's built-in 12x12 default — same
    // triangle proportions, just scaled down (see styles.json's "arrow").
    // Only `markerWidth`/`markerHeight` are configurable from JSON; shape
    // and anchor point stay fixed since they're tied to those dimensions.
    const { markerWidth, markerHeight } = stylesConfig.arrow
    const halfHeight = markerHeight / 2
    return {
      arrow: {
        pathD: `M0,-${halfHeight}L${markerWidth},0L0,${halfHeight}`,
        viewBox: `0 -${halfHeight} ${markerWidth} ${markerHeight}`,
        refX: markerWidth * 0.6,
        refY: 0,
        markerWidth,
        markerHeight,
        markerUnits: 'userSpaceOnUse',
        orient: 'auto',
      },
    }
  }
}
