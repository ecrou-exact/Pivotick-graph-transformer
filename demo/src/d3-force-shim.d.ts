/**
 * Minimal ambient type for the handful of d3-force exports the GraphML
 * view's layout pass uses — the package ships as plain JS with no
 * bundled `.d.ts` and no `@types/d3-force` is installed (same situation
 * as `d3-selection-shim.d.ts`). GraphML (unlike DOT/Graphviz) carries no
 * layout engine of its own, so `renderGraphMLView()` runs a quick,
 * throwaway force simulation itself purely to give each node a real
 * `x`/`y` before handing it to `toGraphML()`'s `nodePosition` — d3-force
 * mutates the plain node objects passed in, adding `x`/`y` directly,
 * which is all that's modelled here.
 */
declare module 'd3-force' {
  export interface SimulationNodeDatum {
    x?: number
    y?: number
    vx?: number
    vy?: number
  }

  export interface Simulation<NodeDatum> {
    force(name: string, force: unknown): Simulation<NodeDatum>
    tick(iterations?: number): Simulation<NodeDatum>
    stop(): Simulation<NodeDatum>
  }

  export function forceSimulation<NodeDatum extends SimulationNodeDatum>(nodes?: NodeDatum[]): Simulation<NodeDatum>

  export interface ForceLink<NodeDatum> {
    id(accessor: (node: NodeDatum) => string): ForceLink<NodeDatum>
    distance(value: number): ForceLink<NodeDatum>
  }
  export function forceLink<NodeDatum extends SimulationNodeDatum, LinkDatum>(links?: LinkDatum[]): ForceLink<NodeDatum>

  export interface ForceManyBody {
    strength(value: number): ForceManyBody
  }
  export function forceManyBody(): ForceManyBody

  export interface ForceCollide<NodeDatum> {
    radius(accessor: (node: NodeDatum) => number): ForceCollide<NodeDatum>
  }
  export function forceCollide<NodeDatum extends SimulationNodeDatum>(radius?: number): ForceCollide<NodeDatum>

  export function forceCenter(x?: number, y?: number): unknown
}
