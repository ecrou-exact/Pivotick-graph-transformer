// Every Object Reference edge gets this one fixed blue, regardless of its
// `relationship_type` — it's what tells a *relationship* apart from every
// other edge kind this importer draws (has-tag, has-attribute, has-object,
// ...), not what tells one relationship apart from another (that's the
// edge's `label`, already shown on the line and in the legend's
// Relationship section — see import.ts's object-reference edge and
// demo/src/main.ts's edge-scoped legend section).
export const RELATIONSHIP_EDGE_COLOR = '#428BCA'
