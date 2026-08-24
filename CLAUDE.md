# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Pivotick Graph Transformer converts third-party graph/data formats (MISP, STIX, VirusTotal Graph, AIL-framework, ...) into the `nodes` / `edges` shape the [Pivotick](https://github.com/pivotick/pivotick) graph visualization library expects.

## Strategy: consumed as a git submodule, not an npm package

This repo is meant to be added as a **git submodule** directly inside Pivotick (or any other consumer), which then imports the TypeScript source by relative path. There is intentionally no build/publish step for the library itself — no `npm publish`, no compiled `dist/` to depend on.

The only place npm/build tooling is allowed to exist is a small local demo/test site, kept separate from the library source, used to sanity-check converters in a browser during development.

Currently restarting from zero — no packages exist yet.
