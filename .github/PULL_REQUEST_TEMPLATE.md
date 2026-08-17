## Summary

<!-- What does this PR add or change? -->

## Checklist (new converter)

- [ ] Extends `GraphConverter`, lives in its own `packages/<format>` package
- [ ] `format` is a unique, descriptive string (namespaced per version if needed)
- [ ] `detect()` is cheap and specific enough not to false-positive on other formats
- [ ] `getDefaultStyleMap()` / `getNodeTypeAccessor()` implemented where relevant
- [ ] At least one realistic fixture included
- [ ] `npm run build` and `npm run lint` pass from the repo root
