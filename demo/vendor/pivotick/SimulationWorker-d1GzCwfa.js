import "d3-force";
import { N as E, S as F, E as A, T as k, a as I } from "./index-WSkuy_Tb.js";
const C = 1e4, S = 2e4, h = 0.15 * S;
self.onmessage = (g) => {
  var D, t, n;
  if (g.data.source !== "simulation-worker-wrapper") return;
  const { nodes: y, edges: i, options: a, canvasBCR: f } = g.data, u = y.map((e) => {
    const c = new E(e.id, e.data, e.style);
    return c.setCircleRadius(e._circleRadius ?? 10), typeof e.x == "number" && (c.x = e.x), typeof e.y == "number" && (c.y = e.y), typeof e.fx == "number" && (c.fx = e.fx), typeof e.fy == "number" && (c.fy = e.fy), c;
  }), o = new Map(u.map((e) => [e.id, e])), { simulation: r, simulationForces: p } = F.initSimulationForces(a, f), d = [];
  for (const e of i) {
    const c = o.get(e.from.id), x = o.get(e.to.id);
    if (c && x) {
      const _ = e.style ?? {};
      d.push(new A(e.id, c, x, e.data, _, e.directed));
    }
  }
  r.nodes(u);
  const T = r.force("link");
  T && T.id((e) => e.id).links(d), ((D = a.layout) == null ? void 0 : D.type) === "tree" ? k.registerForcesOnSimulation(
    u,
    d,
    r,
    p,
    a.layout,
    f,
    k
  ) : ((t = a.layout) == null ? void 0 : t.type) === "egoTree" && k.registerForcesOnSimulation(
    u,
    d,
    r,
    p,
    a.layout,
    f,
    I
  );
  let s = a.warmupTicks || S;
  s = s === "auto" ? S : s, s = s - h;
  let m = 0.3;
  r.alphaTarget(m);
  const l = (/* @__PURE__ */ new Date()).getTime();
  let w;
  for (let e = 0; e < s && !((/* @__PURE__ */ new Date()).getTime() - l > C || (/* @__PURE__ */ new Date()).getTime() - l > a.cooldownTime || b(a, r, m) && (/* @__PURE__ */ new Date()).getTime() - l > a.cooldownTime * 0.15); ++e)
    e % 5 === 0 && (w = M(e, (/* @__PURE__ */ new Date()).getTime() - l, a), postMessage({ type: "tick", progress: w, elapsedTime: (/* @__PURE__ */ new Date()).getTime() - l })), r.tick();
  m = 0, r.alphaTarget(m), r.alpha(1);
  for (let e = 0; e < h && !(b(a, r, m) && (/* @__PURE__ */ new Date()).getTime() - l > a.cooldownTime * 0.15); ++e)
    r.tick(), e % 5 === 0 && (w = M(s + e, (/* @__PURE__ */ new Date()).getTime() - l, a), postMessage({ type: "tick", progress: w, elapsedTime: (/* @__PURE__ */ new Date()).getTime() - l }));
  postMessage({ type: "tick", progress: 1, elapsedTime: (/* @__PURE__ */ new Date()).getTime() - l }), ((n = a.layout) == null ? void 0 : n.type) === "tree" && k.simulationDone(
    u,
    d,
    r,
    a.layout
  ), postMessage({
    type: "done",
    nodes: u.map((e) => e.toDict()),
    edges: d.map((e) => e.toDict())
  });
};
function R(g, y, i, a) {
  var l, w, D;
  const f = g.map((t) => {
    const n = new E(t.id, t.getData(), t.getStyle());
    return n.weight = t.weight || 1, n.setCircleRadius(t.getCircleRadius()), typeof t.x == "number" && (n.x = t.x), typeof t.y == "number" && (n.y = t.y), typeof t.fx == "number" && (n.fx = t.fx), typeof t.fy == "number" && (n.fy = t.fy), n;
  }), u = new Map(f.map((t) => [t.id, t])), { simulation: o, simulationForces: r } = F.initSimulationForces(i, a), p = [];
  for (const t of y) {
    const n = u.get(t.from.id), e = u.get(t.to.id);
    if (n && e) {
      const c = t.getStyle() ?? {};
      p.push(new A(t.id, n, e, t.getData(), c, t.directed));
    }
  }
  o.nodes(f);
  const d = o.force("link");
  d && d.id((t) => t.id).links(p), (((l = i.layout) == null ? void 0 : l.type) === "tree" || ((w = i.layout) == null ? void 0 : w.type) === "egoTree") && k.registerForcesOnSimulation(
    f,
    p,
    o,
    r,
    i.layout,
    a,
    k
  );
  let T;
  i.warmupTicks === "auto" || i.warmupTicks == null ? T = S : T = i.warmupTicks, T = T - h;
  let s = 0.3;
  o.alphaTarget(s);
  const m = (/* @__PURE__ */ new Date()).getTime();
  for (let t = 0; t < T && !((/* @__PURE__ */ new Date()).getTime() - m > C || (/* @__PURE__ */ new Date()).getTime() - m > i.cooldownTime || b(i, o, s) && (/* @__PURE__ */ new Date()).getTime() - m > i.cooldownTime * 0.15); ++t)
    o.tick();
  s = 0, o.alphaTarget(s), o.alpha(1);
  for (let t = 0; t < h && !(b(i, o, s) && (/* @__PURE__ */ new Date()).getTime() - m > i.cooldownTime * 0.15); ++t)
    o.tick();
  return ((D = i.layout) == null ? void 0 : D.type) === "tree" && k.simulationDone(
    f,
    p,
    o,
    i.layout
  ), {
    nodes: f,
    edges: p
  };
}
function M(g, y, i) {
  return y / i.cooldownTime;
}
function b(g, y, i) {
  return g.d3AlphaMin > 0 && y.alpha() - i < g.d3AlphaMin;
}
export {
  R as runSimulation
};
