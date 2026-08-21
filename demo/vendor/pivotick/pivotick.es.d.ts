// Hand-authored type declaration for the vendored Pivotick ESM build.
// Pivotick's release dist doesn't ship .d.ts files (see ../../scripts/sync-pivotick.mjs
// for why), so this is written by us, kept to only what the demo actually
// calls. Not part of FILES_TO_VENDOR in the sync script, so re-running it
// won't overwrite this file — update it by hand if the demo starts relying
// on more of the Pivotick API. Verified against Graph.ts's real constructor
// signature in the pinned pivotick/pivotick release tag (the constructor
// takes positional args, not a single options object as pivotick's own
// README currently shows).
export declare class Pivotick {
  constructor(
    container: HTMLElement,
    data?: { nodes: unknown[]; edges: unknown[] },
    options?: { render?: unknown; UI?: { mode?: 'viewer' | 'full' | 'light' | 'static'; theme?: string } },
  )
  destroy(): void
  // Real, public property on the Graph class Pivotick's constructor
  // returns (verified in the vendored bundle: `this.graph.simulation`
  // usage throughout, `applyPhysicsPreset(t)` reading a `{tight, loose,
  // default}` preset map keyed by `t`). `default` and `loose` currently
  // carry identical values in that map, but calling this explicitly
  // still documents intent and survives if that ever changes upstream.
  simulation?: { applyPhysicsPreset(preset: 'tight' | 'loose' | 'default'): void }
}
