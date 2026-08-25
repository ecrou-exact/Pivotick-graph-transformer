# Pivotick Graph Transformer

Format converters that turn third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

## Goal

This repo is meant to be consumed as a **git submodule** directly inside Pivotick (or any other consumer), importing the TypeScript source by relative path. No npm package, no build/publish step for the library itself.

npm is only used locally for a small demo/test site — not for the library.

## Boundary: we never modify Pivotick

Pivotick itself (vendored in `demo/vendor/pivotick/`) is treated as read-only. This project only ever produces the `nodes`/`edges` data and the options passed into `new Pivotick(container, data, options)` — theming, node appearance, what shows in the properties panel, and so on are all driven through Pivotick's own public options (its `theme` option, per-node `data`/`style`, `nodePropertiesMap`, ...), never by patching Pivotick's source or CSS.

## License

MIT
