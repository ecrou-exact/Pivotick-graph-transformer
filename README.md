# Pivotick Graph Transformer

Format converters that turn third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

## Goal

This repo is meant to be consumed as a **git submodule** directly inside Pivotick (or any other consumer), importing the TypeScript source by relative path. No npm package, no build/publish step for the library itself.

npm is only used locally for a small demo/test site — not for the library.

## License

MIT
