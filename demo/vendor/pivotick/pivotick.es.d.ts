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
    options?: { render?: unknown },
  )
  destroy(): void
}
