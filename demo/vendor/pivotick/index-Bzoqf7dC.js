var _r = Object.defineProperty;
var Ir = (r, t, e) => t in r ? _r(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var h = (r, t, e) => Ir(r, typeof t != "symbol" ? t + "" : t, e);
import { select as Z } from "d3-selection";
import { transition as ni } from "d3-transition";
import { zoom as Lr, zoomTransform as Dr, zoomIdentity as qi } from "d3-zoom";
import { forceCenter as Rr, forceRadial as Wi, forceY as Vi, forceX as Yi, forceCollide as Or, forceManyBody as Pr, forceLink as Fr, forceSimulation as Br } from "d3-force";
import rt from "lodash.merge";
import { drag as zr } from "d3-drag";
import { tree as Is, hierarchy as Ls } from "d3-hierarchy";
function K(r, ...t) {
  if (typeof r == "string")
    return r;
  if (typeof r == "function") {
    const e = r(...t);
    return typeof e == "string" ? e : void 0;
  }
}
function Yt(r, ...t) {
  if (typeof r == "boolean")
    return r;
  if (typeof r == "function") {
    const e = r(...t);
    return typeof e == "boolean" ? e : void 0;
  }
}
function it(r, ...t) {
  if (typeof r == "number")
    return r;
  if (typeof r == "function") {
    const e = r(...t);
    return typeof e == "number" ? e : void 0;
  }
}
function Ds(r, ...t) {
  if (Array.isArray(r))
    return r;
  if (typeof r == "function") {
    const e = r(...t);
    return Array.isArray(e) ? e : [];
  }
  return [];
}
function _n(r) {
  const t = document.createElement("span");
  return t.textContent = r, t;
}
function Ee(r, ...t) {
  const e = typeof r == "function" ? r(...t) : r;
  if (e instanceof Element)
    return e;
  if (typeof e == "string")
    return _n(e.trim());
  if (typeof e == "boolean")
    return _n(String(e));
  if (typeof e == "object")
    return _n(JSON.stringify(e, void 0, 2));
}
const Xi = /* @__PURE__ */ new Map();
function Hr(r) {
  const t = r.trim();
  if (!t) return { glyph: "", fontFamily: "", fontWeight: "", fontStyle: "" };
  const e = Xi.get(t);
  if (e) return e;
  const n = document.createElement("i");
  n.className = t, n.style.position = "absolute", n.style.left = "-9999px", n.style.top = "-9999px", n.style.visibility = "hidden", document.body.appendChild(n);
  const i = getComputedStyle(n, "::before"), s = {
    glyph: Gr(i.content),
    fontFamily: i.fontFamily,
    fontWeight: i.fontWeight,
    fontStyle: i.fontStyle
  };
  return document.body.removeChild(n), Xi.set(t, s), s;
}
function Gr(r) {
  if (!r || r === "none" || r === "normal" || /counter\(|counters\(|attr\(|url\(/.test(r)) return "";
  const t = r.match(/(['"])((?:\\.|(?!\1).)*)\1/);
  return t ? t[2] : "";
}
/*! @license DOMPurify 3.4.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.7/LICENSE */
function Ki(r, t) {
  (t == null || t > r.length) && (t = r.length);
  for (var e = 0, n = Array(t); e < t; e++) n[e] = r[e];
  return n;
}
function $r(r) {
  if (Array.isArray(r)) return r;
}
function Ur(r, t) {
  var e = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (e != null) {
    var n, i, s, o, a = [], l = !0, d = !1;
    try {
      if (s = (e = e.call(r)).next, t !== 0) for (; !(l = (n = s.call(e)).done) && (a.push(n.value), a.length !== t); l = !0) ;
    } catch (c) {
      d = !0, i = c;
    } finally {
      try {
        if (!l && e.return != null && (o = e.return(), Object(o) !== o)) return;
      } finally {
        if (d) throw i;
      }
    }
    return a;
  }
}
function jr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qr(r, t) {
  return $r(r) || Ur(r, t) || Wr(r, t) || jr();
}
function Wr(r, t) {
  if (r) {
    if (typeof r == "string") return Ki(r, t);
    var e = {}.toString.call(r).slice(8, -1);
    return e === "Object" && r.constructor && (e = r.constructor.name), e === "Map" || e === "Set" ? Array.from(r) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Ki(r, t) : void 0;
  }
}
const Rs = Object.entries, Zi = Object.setPrototypeOf, Vr = Object.isFrozen, Yr = Object.getPrototypeOf, Xr = Object.getOwnPropertyDescriptor;
let le = Object.freeze, de = Object.seal, nt = Object.create, Os = typeof Reflect < "u" && Reflect, jn = Os.apply, qn = Os.construct;
le || (le = function(t) {
  return t;
});
de || (de = function(t) {
  return t;
});
jn || (jn = function(t, e) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++)
    i[s - 2] = arguments[s];
  return t.apply(e, i);
});
qn || (qn = function(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    n[i - 1] = arguments[i];
  return new t(...n);
});
const Qe = Y(Array.prototype.forEach), Kr = Y(Array.prototype.lastIndexOf), Qi = Y(Array.prototype.pop), Je = Y(Array.prototype.push), Zr = Y(Array.prototype.splice), oe = Array.isArray, wt = Y(String.prototype.toLowerCase), In = Y(String.prototype.toString), Ji = Y(String.prototype.match), et = Y(String.prototype.replace), es = Y(String.prototype.indexOf), Qr = Y(String.prototype.trim), Jr = Y(Number.prototype.toString), eo = Y(Boolean.prototype.toString), ts = typeof BigInt > "u" ? null : Y(BigInt.prototype.toString), ns = typeof Symbol > "u" ? null : Y(Symbol.prototype.toString), z = Y(Object.prototype.hasOwnProperty), mt = Y(Object.prototype.toString), J = Y(RegExp.prototype.test), vt = to(TypeError);
function Y(r) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      n[i - 1] = arguments[i];
    return jn(r, t, n);
  };
}
function to(r) {
  return function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return qn(r, e);
  };
}
function A(r, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wt;
  if (Zi && Zi(r, null), !oe(t))
    return r;
  let n = t.length;
  for (; n--; ) {
    let i = t[n];
    if (typeof i == "string") {
      const s = e(i);
      s !== i && (Vr(t) || (t[n] = s), i = s);
    }
    r[i] = !0;
  }
  return r;
}
function no(r) {
  for (let t = 0; t < r.length; t++)
    z(r, t) || (r[t] = null);
  return r;
}
function te(r) {
  const t = nt(null);
  for (const n of Rs(r)) {
    var e = qr(n, 2);
    const i = e[0], s = e[1];
    z(r, i) && (oe(s) ? t[i] = no(s) : s && typeof s == "object" && s.constructor === Object ? t[i] = te(s) : t[i] = s);
  }
  return t;
}
function io(r) {
  switch (typeof r) {
    case "string":
      return r;
    case "number":
      return Jr(r);
    case "boolean":
      return eo(r);
    case "bigint":
      return ts ? ts(r) : "0";
    case "symbol":
      return ns ? ns(r) : "Symbol()";
    case "undefined":
      return mt(r);
    case "function":
    case "object": {
      if (r === null)
        return mt(r);
      const t = r, e = Se(t, "toString");
      if (typeof e == "function") {
        const n = e(t);
        return typeof n == "string" ? n : mt(n);
      }
      return mt(r);
    }
    default:
      return mt(r);
  }
}
function Se(r, t) {
  for (; r !== null; ) {
    const n = Xr(r, t);
    if (n) {
      if (n.get)
        return Y(n.get);
      if (typeof n.value == "function")
        return Y(n.value);
    }
    r = Yr(r);
  }
  function e() {
    return null;
  }
  return e;
}
function so(r) {
  try {
    return J(r, ""), !0;
  } catch {
    return !1;
  }
}
const is = le(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ln = le(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Dn = le(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ro = le(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Rn = le(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), oo = le(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), ss = le(["#text"]), rs = le(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), On = le(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), os = le(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ht = le(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ao = de(/{{[\w\W]*|^[\w\W]*}}/g), lo = de(/<%[\w\W]*|^[\w\W]*%>/g), co = de(/\${[\w\W]*/g), ho = de(/^data-[\-\w.\u00B7-\uFFFF]+$/), uo = de(/^aria-[\-\w]+$/), as = de(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), po = de(/^(?:\w+script|data):/i), go = de(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), fo = de(/^html$/i), mo = de(/^[a-z][.\w]*(-[.\w]+)+$/i), ke = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, vo = function() {
  return typeof window > "u" ? null : window;
}, yo = function(t, e) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let n = null;
  const i = "data-tt-policy-suffix";
  e && e.hasAttribute(i) && (n = e.getAttribute(i));
  const s = "dompurify" + (n ? "#" + n : "");
  try {
    return t.createPolicy(s, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + s + " could not be created."), null;
  }
}, ls = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Ps() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : vo();
  const t = (E) => Ps(E);
  if (t.version = "3.4.7", t.removed = [], !r || !r.document || r.document.nodeType !== ke.document || !r.Element)
    return t.isSupported = !1, t;
  let e = r.document;
  const n = e, i = n.currentScript;
  r.DocumentFragment;
  const s = r.HTMLTemplateElement, o = r.Node, a = r.Element, l = r.NodeFilter, d = r.NamedNodeMap;
  d === void 0 && (r.NamedNodeMap || r.MozNamedAttrMap), r.HTMLFormElement;
  const c = r.DOMParser, u = r.trustedTypes, p = a.prototype, g = Se(p, "cloneNode"), f = Se(p, "remove"), v = Se(p, "nextSibling"), y = Se(p, "childNodes"), b = Se(p, "parentNode"), k = Se(p, "shadowRoot"), C = Se(p, "attributes"), T = o && o.prototype ? Se(o.prototype, "nodeType") : null, I = o && o.prototype ? Se(o.prototype, "nodeName") : null;
  if (typeof s == "function") {
    const E = e.createElement("template");
    E.content && E.content.ownerDocument && (e = E.content.ownerDocument);
  }
  let N, O = "";
  const re = e, Ne = re.implementation, Me = re.createNodeIterator, Re = re.createDocumentFragment, _t = re.getElementsByTagName, gn = n.importNode;
  let j = ls();
  t.isSupported = typeof Rs == "function" && typeof b == "function" && Ne && Ne.createHTMLDocument !== void 0;
  const Ae = ao, ye = lo, ce = co, Ue = ho, je = uo, qe = po, It = go, fn = mo;
  let We = as, G = null;
  const mn = A({}, [...is, ...Ln, ...Dn, ...Rn, ...ss]);
  let q = null;
  const vn = A({}, [...rs, ...On, ...os, ...Ht]);
  let $ = Object.seal(nt(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), dt = null, Lt = null;
  const _e = Object.seal(nt(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Ci = !0, yn = !0, Ei = !1, Ti = !0, Ie = !1, ut = !0, Oe = !1, bn = !1, wn = !1, Ve = !1, Dt = !1, Rt = !1, Ni = !0, Mi = !1;
  const Ai = "user-content-";
  let xn = !0, pt = !1, Ye = {}, be = null;
  const kn = A({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let _i = null;
  const Ii = A({}, ["audio", "video", "img", "source", "image", "track"]);
  let Sn = null;
  const Li = A({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ot = "http://www.w3.org/1998/Math/MathML", Pt = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1999/xhtml";
  let Xe = we, Cn = !1, En = null;
  const Sr = A({}, [Ot, Pt, we], In);
  let Tn = A({}, ["mi", "mo", "mn", "ms", "mtext"]), Nn = A({}, ["annotation-xml"]);
  const Cr = A({}, ["title", "style", "font", "a", "script"]);
  let gt = null;
  const Er = ["application/xhtml+xml", "text/html"], Tr = "text/html";
  let U = null, Ke = null;
  const Nr = e.createElement("form"), Di = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, Mn = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (Ke && Ke === m)
      return;
    (!m || typeof m != "object") && (m = {}), m = te(m), gt = // eslint-disable-next-line unicorn/prefer-includes
    Er.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? Tr : m.PARSER_MEDIA_TYPE, U = gt === "application/xhtml+xml" ? In : wt, G = z(m, "ALLOWED_TAGS") && oe(m.ALLOWED_TAGS) ? A({}, m.ALLOWED_TAGS, U) : mn, q = z(m, "ALLOWED_ATTR") && oe(m.ALLOWED_ATTR) ? A({}, m.ALLOWED_ATTR, U) : vn, En = z(m, "ALLOWED_NAMESPACES") && oe(m.ALLOWED_NAMESPACES) ? A({}, m.ALLOWED_NAMESPACES, In) : Sr, Sn = z(m, "ADD_URI_SAFE_ATTR") && oe(m.ADD_URI_SAFE_ATTR) ? A(te(Li), m.ADD_URI_SAFE_ATTR, U) : Li, _i = z(m, "ADD_DATA_URI_TAGS") && oe(m.ADD_DATA_URI_TAGS) ? A(te(Ii), m.ADD_DATA_URI_TAGS, U) : Ii, be = z(m, "FORBID_CONTENTS") && oe(m.FORBID_CONTENTS) ? A({}, m.FORBID_CONTENTS, U) : kn, dt = z(m, "FORBID_TAGS") && oe(m.FORBID_TAGS) ? A({}, m.FORBID_TAGS, U) : te({}), Lt = z(m, "FORBID_ATTR") && oe(m.FORBID_ATTR) ? A({}, m.FORBID_ATTR, U) : te({}), Ye = z(m, "USE_PROFILES") ? m.USE_PROFILES && typeof m.USE_PROFILES == "object" ? te(m.USE_PROFILES) : m.USE_PROFILES : !1, Ci = m.ALLOW_ARIA_ATTR !== !1, yn = m.ALLOW_DATA_ATTR !== !1, Ei = m.ALLOW_UNKNOWN_PROTOCOLS || !1, Ti = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ie = m.SAFE_FOR_TEMPLATES || !1, ut = m.SAFE_FOR_XML !== !1, Oe = m.WHOLE_DOCUMENT || !1, Ve = m.RETURN_DOM || !1, Dt = m.RETURN_DOM_FRAGMENT || !1, Rt = m.RETURN_TRUSTED_TYPE || !1, wn = m.FORCE_BODY || !1, Ni = m.SANITIZE_DOM !== !1, Mi = m.SANITIZE_NAMED_PROPS || !1, xn = m.KEEP_CONTENT !== !1, pt = m.IN_PLACE || !1, We = so(m.ALLOWED_URI_REGEXP) ? m.ALLOWED_URI_REGEXP : as, Xe = typeof m.NAMESPACE == "string" ? m.NAMESPACE : we, Tn = z(m, "MATHML_TEXT_INTEGRATION_POINTS") && m.MATHML_TEXT_INTEGRATION_POINTS && typeof m.MATHML_TEXT_INTEGRATION_POINTS == "object" ? te(m.MATHML_TEXT_INTEGRATION_POINTS) : A({}, ["mi", "mo", "mn", "ms", "mtext"]), Nn = z(m, "HTML_INTEGRATION_POINTS") && m.HTML_INTEGRATION_POINTS && typeof m.HTML_INTEGRATION_POINTS == "object" ? te(m.HTML_INTEGRATION_POINTS) : A({}, ["annotation-xml"]);
    const w = z(m, "CUSTOM_ELEMENT_HANDLING") && m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING == "object" ? te(m.CUSTOM_ELEMENT_HANDLING) : nt(null);
    if ($ = nt(null), z(w, "tagNameCheck") && Di(w.tagNameCheck) && ($.tagNameCheck = w.tagNameCheck), z(w, "attributeNameCheck") && Di(w.attributeNameCheck) && ($.attributeNameCheck = w.attributeNameCheck), z(w, "allowCustomizedBuiltInElements") && typeof w.allowCustomizedBuiltInElements == "boolean" && ($.allowCustomizedBuiltInElements = w.allowCustomizedBuiltInElements), Ie && (yn = !1), Dt && (Ve = !0), Ye && (G = A({}, ss), q = nt(null), Ye.html === !0 && (A(G, is), A(q, rs)), Ye.svg === !0 && (A(G, Ln), A(q, On), A(q, Ht)), Ye.svgFilters === !0 && (A(G, Dn), A(q, On), A(q, Ht)), Ye.mathMl === !0 && (A(G, Rn), A(q, os), A(q, Ht))), _e.tagCheck = null, _e.attributeCheck = null, z(m, "ADD_TAGS") && (typeof m.ADD_TAGS == "function" ? _e.tagCheck = m.ADD_TAGS : oe(m.ADD_TAGS) && (G === mn && (G = te(G)), A(G, m.ADD_TAGS, U))), z(m, "ADD_ATTR") && (typeof m.ADD_ATTR == "function" ? _e.attributeCheck = m.ADD_ATTR : oe(m.ADD_ATTR) && (q === vn && (q = te(q)), A(q, m.ADD_ATTR, U))), z(m, "ADD_URI_SAFE_ATTR") && oe(m.ADD_URI_SAFE_ATTR) && A(Sn, m.ADD_URI_SAFE_ATTR, U), z(m, "FORBID_CONTENTS") && oe(m.FORBID_CONTENTS) && (be === kn && (be = te(be)), A(be, m.FORBID_CONTENTS, U)), z(m, "ADD_FORBID_CONTENTS") && oe(m.ADD_FORBID_CONTENTS) && (be === kn && (be = te(be)), A(be, m.ADD_FORBID_CONTENTS, U)), xn && (G["#text"] = !0), Oe && A(G, ["html", "head", "body"]), G.table && (A(G, ["tbody"]), delete dt.tbody), m.TRUSTED_TYPES_POLICY) {
      if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      N = m.TRUSTED_TYPES_POLICY, O = N.createHTML("");
    } else
      N === void 0 && (N = yo(u, i)), N !== null && typeof O == "string" && (O = N.createHTML(""));
    (j.uponSanitizeElement.length > 0 || j.uponSanitizeAttribute.length > 0) && G === mn && (G = te(G)), j.uponSanitizeAttribute.length > 0 && q === vn && (q = te(q)), le && le(m), Ke = m;
  }, Ri = A({}, [...Ln, ...Dn, ...ro]), Oi = A({}, [...Rn, ...oo]), Mr = function(m) {
    let w = b(m);
    (!w || !w.tagName) && (w = {
      namespaceURI: Xe,
      tagName: "template"
    });
    const S = wt(m.tagName), R = wt(w.tagName);
    return En[m.namespaceURI] ? m.namespaceURI === Pt ? w.namespaceURI === we ? S === "svg" : w.namespaceURI === Ot ? S === "svg" && (R === "annotation-xml" || Tn[R]) : !!Ri[S] : m.namespaceURI === Ot ? w.namespaceURI === we ? S === "math" : w.namespaceURI === Pt ? S === "math" && Nn[R] : !!Oi[S] : m.namespaceURI === we ? w.namespaceURI === Pt && !Nn[R] || w.namespaceURI === Ot && !Tn[R] ? !1 : !Oi[S] && (Cr[S] || !Ri[S]) : !!(gt === "application/xhtml+xml" && En[m.namespaceURI]) : !1;
  }, ue = function(m) {
    Je(t.removed, {
      element: m
    });
    try {
      b(m).removeChild(m);
    } catch {
      f(m);
    }
  }, Pe = function(m, w) {
    try {
      Je(t.removed, {
        attribute: w.getAttributeNode(m),
        from: w
      });
    } catch {
      Je(t.removed, {
        attribute: null,
        from: w
      });
    }
    if (w.removeAttribute(m), m === "is")
      if (Ve || Dt)
        try {
          ue(w);
        } catch {
        }
      else
        try {
          w.setAttribute(m, "");
        } catch {
        }
  }, Pi = function(m) {
    let w = null, S = null;
    if (wn)
      m = "<remove></remove>" + m;
    else {
      const F = Ji(m, /^[\r\n\t ]+/);
      S = F && F[0];
    }
    gt === "application/xhtml+xml" && Xe === we && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const R = N ? N.createHTML(m) : m;
    if (Xe === we)
      try {
        w = new c().parseFromString(R, gt);
      } catch {
      }
    if (!w || !w.documentElement) {
      w = Ne.createDocument(Xe, "template", null);
      try {
        w.documentElement.innerHTML = Cn ? O : R;
      } catch {
      }
    }
    const _ = w.body || w.documentElement;
    return m && S && _.insertBefore(e.createTextNode(S), _.childNodes[0] || null), Xe === we ? _t.call(w, Oe ? "html" : "body")[0] : Oe ? w.documentElement : _;
  }, Fi = function(m) {
    return Me.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, Bi = function(m) {
    m.normalize();
    const w = Me.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let S = w.nextNode();
    for (; S; ) {
      let R = S.data;
      Qe([Ae, ye, ce], (_) => {
        R = et(R, _, " ");
      }), S.data = R, S = w.nextNode();
    }
  }, Ft = function(m) {
    const w = I ? I(m) : null;
    return typeof w != "string" || U(w) !== "form" ? !1 : typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    m.attributes !== C(m) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    m.nodeType !== T(m) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    m.childNodes !== y(m);
  }, ft = function(m) {
    if (!T || typeof m != "object" || m === null)
      return !1;
    try {
      return T(m) === ke.documentFragment;
    } catch {
      return !1;
    }
  }, Bt = function(m) {
    if (!T || typeof m != "object" || m === null)
      return !1;
    try {
      return typeof T(m) == "number";
    } catch {
      return !1;
    }
  };
  function Te(E, m, w) {
    Qe(E, (S) => {
      S.call(t, m, w, Ke);
    });
  }
  const zi = function(m) {
    let w = null;
    if (Te(j.beforeSanitizeElements, m, null), Ft(m))
      return ue(m), !0;
    const S = U(m.nodeName);
    if (Te(j.uponSanitizeElement, m, {
      tagName: S,
      allowedTags: G
    }), ut && m.hasChildNodes() && !Bt(m.firstElementChild) && J(/<[/\w!]/g, m.innerHTML) && J(/<[/\w!]/g, m.textContent) || ut && m.namespaceURI === we && S === "style" && Bt(m.firstElementChild) || m.nodeType === ke.progressingInstruction || ut && m.nodeType === ke.comment && J(/<[/\w]/g, m.data))
      return ue(m), !0;
    if (dt[S] || !(_e.tagCheck instanceof Function && _e.tagCheck(S)) && !G[S]) {
      if (!dt[S] && Gi(S) && ($.tagNameCheck instanceof RegExp && J($.tagNameCheck, S) || $.tagNameCheck instanceof Function && $.tagNameCheck(S)))
        return !1;
      if (xn && !be[S]) {
        const _ = b(m), F = y(m);
        if (F && _) {
          const he = F.length;
          for (let xe = he - 1; xe >= 0; --xe) {
            const pe = g(F[xe], !0);
            _.insertBefore(pe, v(m));
          }
        }
      }
      return ue(m), !0;
    }
    return (T ? T(m) : m.nodeType) === ke.element && !Mr(m) || (S === "noscript" || S === "noembed" || S === "noframes") && J(/<\/no(script|embed|frames)/i, m.innerHTML) ? (ue(m), !0) : (Ie && m.nodeType === ke.text && (w = m.textContent, Qe([Ae, ye, ce], (_) => {
      w = et(w, _, " ");
    }), m.textContent !== w && (Je(t.removed, {
      element: m.cloneNode()
    }), m.textContent = w)), Te(j.afterSanitizeElements, m, null), !1);
  }, Hi = function(m, w, S) {
    if (Lt[w] || Ni && (w === "id" || w === "name") && (S in e || S in Nr))
      return !1;
    const R = q[w] || _e.attributeCheck instanceof Function && _e.attributeCheck(w, m);
    if (!(yn && !Lt[w] && J(Ue, w))) {
      if (!(Ci && J(je, w))) {
        if (!R || Lt[w]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Gi(m) && ($.tagNameCheck instanceof RegExp && J($.tagNameCheck, m) || $.tagNameCheck instanceof Function && $.tagNameCheck(m)) && ($.attributeNameCheck instanceof RegExp && J($.attributeNameCheck, w) || $.attributeNameCheck instanceof Function && $.attributeNameCheck(w, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            w === "is" && $.allowCustomizedBuiltInElements && ($.tagNameCheck instanceof RegExp && J($.tagNameCheck, S) || $.tagNameCheck instanceof Function && $.tagNameCheck(S)))
          ) return !1;
        } else if (!Sn[w]) {
          if (!J(We, et(S, It, ""))) {
            if (!((w === "src" || w === "xlink:href" || w === "href") && m !== "script" && es(S, "data:") === 0 && _i[m])) {
              if (!(Ei && !J(qe, et(S, It, "")))) {
                if (S)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ar = A({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Gi = function(m) {
    return !Ar[wt(m)] && J(fn, m);
  }, $i = function(m) {
    Te(j.beforeSanitizeAttributes, m, null);
    const w = m.attributes;
    if (!w || Ft(m))
      return;
    const S = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: q,
      forceKeepAttr: void 0
    };
    let R = w.length;
    for (; R--; ) {
      const _ = w[R], F = _.name, he = _.namespaceURI, xe = _.value, pe = U(F), An = xe;
      let Q = F === "value" ? An : Qr(An);
      if (S.attrName = pe, S.attrValue = Q, S.keepAttr = !0, S.forceKeepAttr = void 0, Te(j.uponSanitizeAttribute, m, S), Q = S.attrValue, Mi && (pe === "id" || pe === "name") && es(Q, Ai) !== 0 && (Pe(F, m), Q = Ai + Q), ut && J(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, Q)) {
        Pe(F, m);
        continue;
      }
      if (pe === "attributename" && Ji(Q, "href")) {
        Pe(F, m);
        continue;
      }
      if (S.forceKeepAttr)
        continue;
      if (!S.keepAttr) {
        Pe(F, m);
        continue;
      }
      if (!Ti && J(/\/>/i, Q)) {
        Pe(F, m);
        continue;
      }
      Ie && Qe([Ae, ye, ce], (ji) => {
        Q = et(Q, ji, " ");
      });
      const Ui = U(m.nodeName);
      if (!Hi(Ui, pe, Q)) {
        Pe(F, m);
        continue;
      }
      if (N && typeof u == "object" && typeof u.getAttributeType == "function" && !he)
        switch (u.getAttributeType(Ui, pe)) {
          case "TrustedHTML": {
            Q = N.createHTML(Q);
            break;
          }
          case "TrustedScriptURL": {
            Q = N.createScriptURL(Q);
            break;
          }
        }
      if (Q !== An)
        try {
          he ? m.setAttributeNS(he, F, Q) : m.setAttribute(F, Q), Ft(m) ? ue(m) : Qi(t.removed);
        } catch {
          Pe(F, m);
        }
    }
    Te(j.afterSanitizeAttributes, m, null);
  }, zt = function(m) {
    let w = null;
    const S = Fi(m);
    for (Te(j.beforeSanitizeShadowDOM, m, null); w = S.nextNode(); )
      if (Te(j.uponSanitizeShadowNode, w, null), zi(w), $i(w), ft(w.content) && zt(w.content), (T ? T(w) : w.nodeType) === ke.element) {
        const _ = k ? k(w) : w.shadowRoot;
        ft(_) && (Ze(_), zt(_));
      }
    Te(j.afterSanitizeShadowDOM, m, null);
  }, Ze = function(m) {
    const w = T ? T(m) : m.nodeType;
    if (w === ke.element) {
      const _ = k ? k(m) : m.shadowRoot;
      ft(_) && (Ze(_), zt(_));
    }
    const S = y ? y(m) : m.childNodes;
    if (!S)
      return;
    const R = [];
    Qe(S, (_) => {
      Je(R, _);
    });
    for (const _ of R)
      Ze(_);
    if (w === ke.element) {
      const _ = I ? I(m) : null;
      if (typeof _ == "string" && U(_) === "template") {
        const F = m.content;
        ft(F) && Ze(F);
      }
    }
  };
  return t.sanitize = function(E) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, w = null, S = null, R = null, _ = null;
    if (Cn = !E, Cn && (E = "<!-->"), typeof E != "string" && !Bt(E) && (E = io(E), typeof E != "string"))
      throw vt("dirty is not a string, aborting");
    if (!t.isSupported)
      return E;
    if (bn || Mn(m), t.removed = [], typeof E == "string" && (pt = !1), pt) {
      const xe = I ? I(E) : E.nodeName;
      if (typeof xe == "string") {
        const pe = U(xe);
        if (!G[pe] || dt[pe])
          throw vt("root node is forbidden and cannot be sanitized in-place");
      }
      if (Ft(E))
        throw vt("root node is clobbered and cannot be sanitized in-place");
      Ze(E);
    } else if (Bt(E))
      w = Pi("<!---->"), S = w.ownerDocument.importNode(E, !0), S.nodeType === ke.element && S.nodeName === "BODY" || S.nodeName === "HTML" ? w = S : w.appendChild(S), Ze(S);
    else {
      if (!Ve && !Ie && !Oe && // eslint-disable-next-line unicorn/prefer-includes
      E.indexOf("<") === -1)
        return N && Rt ? N.createHTML(E) : E;
      if (w = Pi(E), !w)
        return Ve ? null : Rt ? O : "";
    }
    w && wn && ue(w.firstChild);
    const F = Fi(pt ? E : w);
    for (; R = F.nextNode(); )
      zi(R), $i(R), ft(R.content) && zt(R.content);
    if (pt)
      return Ie && Bi(E), E;
    if (Ve) {
      if (Ie && Bi(w), Dt)
        for (_ = Re.call(w.ownerDocument); w.firstChild; )
          _.appendChild(w.firstChild);
      else
        _ = w;
      return (q.shadowroot || q.shadowrootmode) && (_ = gn.call(n, _, !0)), _;
    }
    let he = Oe ? w.outerHTML : w.innerHTML;
    return Oe && G["!doctype"] && w.ownerDocument && w.ownerDocument.doctype && w.ownerDocument.doctype.name && J(fo, w.ownerDocument.doctype.name) && (he = "<!DOCTYPE " + w.ownerDocument.doctype.name + `>
` + he), Ie && Qe([Ae, ye, ce], (xe) => {
      he = et(he, xe, " ");
    }), N && Rt ? N.createHTML(he) : he;
  }, t.setConfig = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Mn(E), bn = !0;
  }, t.clearConfig = function() {
    Ke = null, bn = !1;
  }, t.isValidAttribute = function(E, m, w) {
    Ke || Mn({});
    const S = U(E), R = U(m);
    return Hi(S, R, w);
  }, t.addHook = function(E, m) {
    typeof m == "function" && Je(j[E], m);
  }, t.removeHook = function(E, m) {
    if (m !== void 0) {
      const w = Kr(j[E], m);
      return w === -1 ? void 0 : Zr(j[E], w, 1)[0];
    }
    return Qi(j[E]);
  }, t.removeHooks = function(E) {
    j[E] = [];
  }, t.removeAllHooks = function() {
    j = ls();
  }, t;
}
var ii = Ps();
function Fs(r) {
  const t = r.trim(), e = /^<svg[\s>]/i.test(t), n = ii.sanitize(e ? t : `<svg>${t}</svg>`, {
    USE_PROFILES: { svg: !0, svgFilters: !0 },
    RETURN_DOM_FRAGMENT: !0
  });
  if (e) return n;
  const i = n.firstElementChild, s = document.createDocumentFragment();
  for (; i != null && i.firstChild; )
    s.appendChild(i.firstChild);
  return s;
}
function P(r) {
  r.variant = r.variant ?? "primary";
  const {
    variant: t,
    size: e,
    onClick: n,
    onClickArgs: i,
    iconUnicode: s,
    iconClass: o,
    svgIcon: a,
    imagePath: l,
    disabled: d,
    text: c,
    childElement: u,
    ...p
  } = r, g = document.createElement("button");
  g.classList.add("pivotick-button"), g.classList.add(`pivotick-button-${t}`), e && g.classList.add(`pivotick-button-${e}`);
  for (const [v, y] of Object.entries(p))
    v === "class" ? Array.isArray(y) ? g.classList.add(...y) : g.classList.add(String(y)) : v in g ? g[v] = y : g.setAttribute(v, String(y));
  let f;
  if (s && (f = B({ iconUnicode: s })), o && (f = B({ iconClass: o })), a && (f = B({ svgIcon: a })), l && (f = B({ imagePath: l })), f && g.append(f), d !== void 0 && (g.disabled = d), c) {
    const v = document.createElement("text");
    v.textContent = c, g.append(v);
  }
  if (u && g.append(u), typeof n == "function") {
    const v = i ?? [];
    g.addEventListener("click", (y) => {
      n(y, ...v);
    });
  }
  return g;
}
const bo = "outline-primary";
function Bs(r, t = {}, e = []) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", r);
  for (const [i, s] of Object.entries(t))
    Array.isArray(s) ? n.setAttribute(i, s.join(" ")) : n.setAttribute(i, s.toString());
  for (const i of e)
    typeof i == "string" ? n.appendChild(document.createTextNode(i)) : n.appendChild(i);
  return n;
}
function x(r, t = {}, e = []) {
  const n = document.createElement(r);
  for (const [i, s] of Object.entries(t))
    Array.isArray(s) ? n.setAttribute(i, s.join(" ")) : n.setAttribute(i, s.toString());
  for (const i of e)
    typeof i == "string" ? n.appendChild(document.createTextNode(i)) : n.appendChild(i);
  return n;
}
function V(r) {
  const t = document.createElement("template");
  return t.innerHTML = r.trim(), t.content.firstElementChild;
}
function Vt(r, t) {
  const e = {
    ctrl: "⌃",
    shift: "⇧",
    alt: "⌥",
    cmd: "⌘"
  }, n = document.createElement("span");
  n.classList.add("pvt-keyboard-shortcut");
  const i = r.split("+").map((s) => s.trim()).filter(Boolean).map((s) => {
    const o = s.toLowerCase();
    return e[o] ?? s.toUpperCase();
  }).join(" ");
  return n.textContent = i, n;
}
function Gt(r, t, e) {
  const n = x("div", { class: "pvt-action-list" }), i = Array.isArray(e) ? e[0] : e;
  return t.forEach((s) => {
    if (s.visible = s.visible ?? !0, Yt(s.visible, i) ?? !0) {
      const a = wo(r, s, e);
      n.appendChild(a);
    }
  }), n;
}
function $t(r, t, e) {
  const n = x("div", { class: "pvt-action-list" }), i = Array.isArray(e) ? e[0] : e;
  return t.forEach((s) => {
    if (s.visible = s.visible ?? !0, Yt(s.visible, i) ?? !0) {
      const a = xo(r, s, e);
      n.appendChild(a);
    }
  }), n;
}
function wo(r, t, e) {
  t.variant = t.variant ?? bo;
  const { onclick: n, ...i } = t, s = x(
    "span",
    {
      class: ["pvt-action-item", `pvt-action-item-${t.variant}`],
      style: `${t.flushRight ? "margin-left: auto;" : ""}`
    },
    [
      P({
        size: "sm",
        ...i
      })
    ]
  );
  return typeof n == "function" && s.addEventListener("click", (o) => {
    n.call(r, o, e);
  }), s;
}
function xo(r, t, e) {
  const n = ko(t.shortcut);
  n instanceof HTMLSpanElement && (n.classList.add("pvt-ms-auto"), n.style.borderColor = "var(--pvt-bg-color-8)");
  const i = x(
    "div",
    {
      class: ["pvt-action-item", `pvt-action-item-${t.variant}`]
    },
    [
      B({ fixedWidth: !0, ...t }),
      x("span", {
        class: "pvt-action-text",
        title: t.title ?? ""
      }, [t.text ?? ""]),
      n
    ]
  );
  return typeof t.onclick == "function" && i.addEventListener("click", (s) => {
    t.onclick.call(r, s, e);
  }), i;
}
function ct(r = 8, t = "id-") {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", n = e + "0123456789-_";
  let i = e.charAt(Math.floor(Math.random() * e.length));
  for (let s = 1; s < r; s++)
    i += n.charAt(Math.floor(Math.random() * n.length));
  return `${t}${i}`;
}
function B(r) {
  const t = document.createElement("span");
  if (t.classList.add("pvt-icon"), r.fixedWidth && t.classList.add("fixed-width"), r.iconUnicode || r.iconClass) {
    const e = document.createElement("text");
    r.iconUnicode && (e.className = "icon icon-unicode"), r.iconClass && (e.className = `icon ${r.iconClass ?? ""}`), r.iconUnicode && (e.textContent = r.iconUnicode), t.append(e);
  } else if (r.svgIcon) {
    const e = Fs(r.svgIcon).firstElementChild;
    e && (e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), t.append(e)), t.style.display = "inline-flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.width = "1em";
  } else if (r.imagePath) {
    const e = document.createElement("img");
    e.src = r.imagePath, t.style.display = "inline-flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.width = "1em", t.append(e);
  }
  return t;
}
function ko(r) {
  if (!r) return "";
  const t = document.createElement("span");
  return t.classList.add("pvt-keyboard-shortcut"), t.textContent = r, t;
}
function So(r, t, e, n = {}) {
  let i = !1, s = 0, o = 0, a = 0, l = 0, d = null, c = null;
  t.classList.add("draggable"), t.addEventListener("mousedown", (g) => {
    var y, b;
    const f = new AbortController(), { signal: v } = f;
    i = !0, t.style.transition = "none", s = g.clientX, o = g.clientY, a = r.offsetLeft, l = r.offsetTop, d = r.getBoundingClientRect(), c = e.getBoundingClientRect(), (y = n.onDragStart) == null || y.call(n, g, r), (b = window.getSelection()) == null || b.removeAllRanges(), document.addEventListener("mousemove", u, { signal: v }), document.addEventListener("mouseup", (k) => {
      f.abort(), p(k);
    }, { signal: v });
  });
  function u(g) {
    var T;
    if (!i || !c || !d) return;
    const f = g.clientX - s, v = g.clientY - o;
    let y = a + f, b = l + v;
    const k = d.width, C = d.height;
    y = Math.max(c.left, Math.min(y, c.right - k)), b = Math.max(c.top, Math.min(b, c.bottom - C)), r.style.left = y + "px", r.style.top = b + "px", (T = n.onDrag) == null || T.call(n, g, r);
  }
  function p(g) {
    var f;
    i = !1, r.style.transition = "", (f = n.onDragStop) == null || f.call(n, g, r);
  }
}
class W {
  /**
   * Create a new Node instance.
   * @param id - Unique identifier for the node
   * @param data - Optional data payload associated with the node
   */
  constructor(t, e, n, i = ct(), s = []) {
    h(this, "id");
    h(this, "data");
    h(this, "children");
    h(this, "style");
    h(this, "edgesOut");
    h(this, "edgesIn");
    h(this, "defaultCircleRadius", 10);
    // Layout/physics properties
    h(this, "x");
    h(this, "y");
    h(this, "vx");
    h(this, "vy");
    h(this, "fx");
    h(this, "fy");
    h(this, "weight");
    h(this, "frozen");
    h(this, "visible");
    h(this, "expanded");
    /** True if this node is a child within a collapsed cluster */
    h(this, "isChild");
    h(this, "childrenDepth");
    /** True if this node has child nodes */
    h(this, "isParent");
    /** Reference to the parent cluster node (if this node is a child) */
    h(this, "parentNode");
    /**
     * Reference to the main graph node when this node is a clone in a subgraph.
     * Used for syncing position updates from subgraph back to main graph.
     */
    h(this, "_original_object");
    /**
     * Reference to the deepest sub graph node.
     * Used for checking state of this node in its subgraph
     */
    h(this, "_deepest_node_clone");
    /** The subgraph graph instance created when expanding this node */
    h(this, "_subgraph");
    h(this, "_circleRadius", this.defaultCircleRadius);
    h(this, "_circleRadiusCollapsed", this.defaultCircleRadius);
    h(this, "_dirty");
    h(this, "domID");
    this.id = t, this.domID = i, this.data = e ?? {}, this.style = n ?? {}, this.children = [], this.isParent = !1, this.setChildren(s), this._dirty = !0, this.frozen = !1, this.visible = !0, this.expanded = !1, this.isChild = !1, this.childrenDepth = 0, this.edgesOut = /* @__PURE__ */ new Set(), this.edgesIn = /* @__PURE__ */ new Set();
  }
  /**
   * Get the node's data.
   */
  getData() {
    return this.data;
  }
  /**
   * Update the node's data.
   * @param newData - New data to set
   */
  setData(t) {
    this.data = t, this.markDirty();
  }
  /**
   * Merge partial data into the current node data.
   * Useful for updating only parts of the data.
   * @param partialData - Partial data object to merge
   */
  updateData(t) {
    this.data = { ...this.data, ...t }, this.markDirty();
  }
  /**
   * @private
   */
  registerEdgeOut(t) {
    this.edgesOut.add(t);
  }
  /**
   * @private
   */
  registerEdgeIn(t) {
    this.edgesIn.add(t);
  }
  /**
   * @private
   */
  emptyEdges() {
    this.edgesOut.clear(), this.edgesIn.clear();
  }
  getConnectedNodes() {
    return [...this.edgesOut].map((t) => t.to);
  }
  getConnectingNodes() {
    return [...this.edgesIn].map((t) => t.from);
  }
  getEdgesOut() {
    return [...this.edgesOut];
  }
  getEdgesIn() {
    return [...this.edgesIn];
  }
  /**
   * Get the node's data.
   */
  getStyle() {
    return this.style;
  }
  /**
   * Update the node's data.
   * @param newStyle - New data to set
   */
  setStyle(t) {
    this.style = t, this.markDirty();
  }
  /**
   * Merge partial data into the current node data.
   * Useful for updating only parts of the data.
   * @param partialStyle - Partial data object to merge
   */
  updateStyle(t) {
    this.style = { ...this.style, ...t }, this.markDirty();
  }
  getGraphElement() {
    return document ? document.getElementById(`node-${this.domID}`) : null;
  }
  /**
   * Convert node to a simple JSON object representation.
   * @param dataOnly - default: false
   */
  toDict(t = !1) {
    const e = {
      id: this.id,
      data: this.data,
      style: this.style,
      weight: this.weight
      // expanded: this.expanded,
    };
    return t || (e.x = this.x, e.y = this.y, e.vx = this.vx, e.vy = this.vy, e.fx = this.fx, e.fy = this.fy), this.hasChildren() && (e.children = this.children.map((n) => n.toDict(t))), e;
  }
  /** Structured-cloneable payload for the simulation worker (no live parent/children/_subgraph refs, unlike `clone()`). */
  toSimulationDTO() {
    return {
      id: this.id,
      data: this.data,
      style: this.style,
      weight: this.weight,
      _circleRadius: this._circleRadius,
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
      fx: this.fx,
      fy: this.fy
    };
  }
  clone() {
    const t = { ...this.data }, e = { ...this.style }, n = new W(this.id, t, e);
    return n.x = this.x, n.y = this.y, n.vx = this.vx, n.vy = this.vy, n.fx = this.fx, n.fy = this.fy, n.weight = this.weight, n.frozen = this.frozen, n.visible = this.visible, n.expanded = this.expanded, n.isChild = this.isChild, n.childrenDepth = this.childrenDepth, n.isParent = this.isParent, n.parentNode = this.parentNode, n._circleRadius = this._circleRadius, n.children = this.children.map((i) => i.clone()), n;
  }
  /**
   * @private
   */
  markDirty() {
    this._dirty = !0;
  }
  /**
   * @private
   */
  clearDirty() {
    this._dirty = !1;
  }
  /**
   * @private
   */
  isDirty() {
    return this._dirty;
  }
  freeze() {
    this.frozen = !0, this.fx = this.x, this.fy = this.y;
  }
  unfreeze() {
    this.frozen = !1, this.fx = void 0, this.fy = void 0;
  }
  toggleVisibility(t) {
    t ? this.show() : this.hide(), this.markDirty();
  }
  show() {
    this.visible = !0;
  }
  hide() {
    this.visible = !1;
  }
  toggleExpand(t) {
    t === void 0 ? this.expanded ? this.collapse() : this.expand() : t ? this.expand() : this.collapse(), this.markDirty();
  }
  expand() {
    this.expanded = !0, this._original_object && (this._original_object.expanded = !0);
  }
  collapse() {
    this.expanded = !1, this._original_object && (this._original_object.expanded = !1);
  }
  degree() {
    return this.edgesOut.size + this.edgesIn.size;
  }
  setCircleRadius(t) {
    this._circleRadius = t;
  }
  getCircleRadius() {
    return this._circleRadius;
  }
  setCircleRadiusCollapsed(t) {
    this._circleRadiusCollapsed = t;
  }
  getCircleRadiusCollapsed() {
    return this._circleRadiusCollapsed;
  }
  setChildren(t) {
    this.children = t, this.hasChildren() ? this.isParent = !0 : this.isParent = !1;
  }
  hasChildren() {
    return this.children.length > 0;
  }
  markAsChild(t, e) {
    this.isChild = !0, this.childrenDepth = e, this.parentNode = t;
  }
  markAsParent() {
    this.isParent = !0;
  }
  /**
   * Sets the subgraph instance (when opening a cluster).
   * @private
   */
  setSubgraph(t) {
    this._subgraph = t;
  }
  /**
   * Gets the subgraph instance created from this node.
   * Returns undefined if this node didn't created a subgraph.
   * @private
   */
  getSubgraph() {
    return this._subgraph;
  }
  /**
   * Sets a reference to the original node from the main graph.
   * Used when this node is a clone in a subgraph to enable position syncing.
   * @private
   */
  setOriginalObject(t) {
    this._original_object = t;
  }
  /**
   * Gets the reference to the original node from the main graph.
   * Returns undefined if this is not a subgraph clone.
   * @private
   */
  getOriginalObject() {
    return this._original_object;
  }
  /**
   * Sets a reference to the original node from the main graph.
   * Used when this node is a clone in a subgraph to enable position syncing.
   * @private
   */
  setDeepestNodeClone(t) {
    this._deepest_node_clone = t;
  }
  /**
   * Gets the reference to the original node from the main graph.
   * Returns undefined if this is not a subgraph clone.
   * @private
   */
  getDeepestNodeClone() {
    return this._deepest_node_clone;
  }
}
class ae {
  /**
   * Create a new Edge instance.
   * @param id - Unique identifier for the edge
   * @param from - Source node
   * @param to - Target node
   * @param data - Optional data payload for the edge
   * @param style - Optional style for the edge
   */
  constructor(t, e, n, i, s, o = null, a) {
    h(this, "id");
    h(this, "from");
    h(this, "to");
    h(this, "directed");
    h(this, "data");
    h(this, "style");
    h(this, "visible");
    /** True if this is a synthetic edge (placeholder for collapsed cluster child) */
    h(this, "isSynthetic");
    /**
     * True for the subclass of synthetic edges that stand in for a real edge whose
     * *both* endpoints are children of different clusters. Unlike the external→cluster
     * synthetic edges, these are resolved as a set (one per collapse state) by
     * {@link ClusterDrawer.resolveCrossClusterEdges} rather than the per-node toggle.
     */
    h(this, "isCrossCluster");
    /** The actual child node this synthetic edge points to (for expansion logic) */
    h(this, "syntheticTerminalNode");
    /** For a cross-cluster synthetic edge: the real child the `from` side stands in for. */
    h(this, "syntheticSourceNode");
    h(this, "_original_object");
    h(this, "_subgraphFromNode");
    h(this, "_subgraphToNode");
    h(this, "_dirty");
    h(this, "domID");
    this.id = t, this.domID = ct(), this.from = e, this.to = n, this.directed = o, this.data = i ?? {}, this.style = s ?? {}, this.visible = !0, this._dirty = !0, this.isSynthetic = a !== void 0, this.syntheticTerminalNode = a, this.from.registerEdgeOut(this), this.to.registerEdgeIn(this);
  }
  /** Required by d3-force */
  get source() {
    return this.from;
  }
  get target() {
    return this.to;
  }
  /**
   * Get the edge's data.
   */
  getData() {
    return this.data;
  }
  /**
   * Update the edge's data.
   * @param newData - New data to set
   */
  setData(t) {
    this.data = t, this.markDirty();
  }
  /**
   * Merge partial data into the current edge data.
   * @param partialData - Partial data object to merge
   */
  updateData(t) {
    this.data = { ...this.data, ...t }, this.markDirty();
  }
  /**
   * Get the edge's style.
   */
  getStyle() {
    return this.style;
  }
  /**
   * Get the edge's style.
   */
  getEdgeStyle() {
    var t;
    return ((t = this.style) == null ? void 0 : t.edge) ?? {};
  }
  /**
   * Get the edge's label style if available.
   */
  getLabelStyle() {
    var t;
    return ((t = this.style) == null ? void 0 : t.label) ?? {};
  }
  /**
   * Update the edge's style.
   * @param newStyle - New style to set
   */
  setStyle(t) {
    this.style = t, this.markDirty();
  }
  /**
   * Merge partial style into the current edge style.
   * Useful for updating only parts of the style.
   * @param partialStyle - Partial style object to merge
   */
  updateStyle(t) {
    const e = this.style, n = t;
    this.style = {
      ...e,
      ...n,
      edge: { ...e.edge, ...n.edge },
      label: { ...e.label, ...n.label }
    }, this.markDirty();
  }
  getGraphElement() {
    return document ? document.getElementById(`edge-${this.domID}`) : null;
  }
  setFrom(t) {
    this.from = t;
  }
  setTo(t) {
    this.to = t;
  }
  /**
   * Convert edge to a simple JSON object representation.
   */
  toDict() {
    return {
      id: this.id,
      from: this.from.id,
      to: this.to.id,
      data: this.data,
      style: this.style
    };
  }
  /** Structured-cloneable payload for the simulation worker; endpoints reduced to ids, keeps `directed`. */
  toSimulationDTO() {
    return {
      id: this.id,
      from: { id: this.from.id },
      to: { id: this.to.id },
      data: this.data,
      style: this.style,
      directed: this.directed
    };
  }
  clone() {
    const t = { ...this.data }, e = { ...this.style }, n = new ae(
      this.id,
      this.from.clone(),
      this.to.clone(),
      t,
      e,
      this.directed
    );
    return n.visible = this.visible, n;
  }
  markDirty() {
    this._dirty = !0;
  }
  clearDirty() {
    this._dirty = !1;
  }
  isDirty() {
    return this._dirty;
  }
  toggleVisibility(t) {
    t ? this.show() : this.hide(), this.markDirty();
  }
  show() {
    this.visible = !0;
  }
  hide() {
    this.visible = !1;
  }
  /**
   * Sets a reference to the original node from the main graph.
   * Used when this node is a clone in a subgraph to enable position syncing.
   * @private
   */
  setOriginalObject(t) {
    this._original_object = t;
  }
  /**
   * Gets the reference to the original node from the main graph.
   * Returns undefined if this is not a subgraph clone.
   * @private
   */
  getOriginalObject() {
    return this._original_object;
  }
  /**
   * Sets a reference to the subgraph node from the main graph.
   * Used when the FROM node has a clone in a subgraph
   * @private
   */
  setSubgraphFromNode(t) {
    this._subgraphFromNode = t;
  }
  /**
   * Sets a reference to the subgraph node from the main graph.
   * Used when the TO node has a clone in a subgraph
   * @private
   */
  setSubgraphToNode(t) {
    this._subgraphToNode = t;
  }
  /**
   * Gets the reference to the subgraph node from the main graph.
   * @private
   */
  getSubgraphFromNode() {
    return this._subgraphFromNode;
  }
  /**
   * Gets the reference to the subgraph node from the main graph.
   * @private
   */
  getSubgraphToNode() {
    return this._subgraphToNode;
  }
}
const Co = {
  arrow: {
    pathD: "M0,-5L10,0L0,5",
    viewBox: "0 -5 10 10",
    refX: 6,
    refY: 0,
    markerWidth: 12,
    markerHeight: 12,
    markerUnits: "userSpaceOnUse",
    orient: "auto",
    selected: {
      fill: "var(--pvt-edge-selected-stroke, #007acc)"
    }
  },
  circle: {
    pathD: "M5,5m-3,0a3,3 0 1,0 6,0a3,3 0 1,0 -6,0",
    viewBox: "0 0 10 10",
    refX: 5,
    refY: 5,
    markerWidth: 10,
    markerHeight: 10,
    markerUnits: "userSpaceOnUse",
    orient: 0,
    selected: {
      fill: "var(--pvt-edge-selected-stroke, #007acc)",
      markerWidth: 16,
      markerHeight: 16
    }
  },
  diamond: {
    pathD: "M0,-4L4,0L0,4L-4,0Z",
    viewBox: "-5 -5 10 10",
    refX: 0,
    refY: 0,
    markerWidth: 8,
    markerHeight: 8,
    markerUnits: "userSpaceOnUse",
    orient: 0,
    selected: {
      fill: "var(--pvt-edge-selected-stroke, #007acc)",
      markerWidth: 14,
      markerHeight: 14
    }
  },
  bigcircle: {
    pathD: "M5,5m-3,0a3,3 0 1,0 6,0a3,3 0 1,0 -6,0",
    viewBox: "0 0 10 10",
    refX: 5,
    refY: 5,
    markerWidth: 16,
    markerHeight: 16,
    markerUnits: "userSpaceOnUse",
    orient: 0,
    selected: {
      fill: "var(--pvt-edge-selected-stroke, #007acc)",
      markerWidth: 24,
      markerHeight: 24
    }
  }
}, Eo = {
  shape: "circle",
  size: 10,
  strokeWidth: "var(--pvt-node-stroke-width, 2)",
  color: "var(--pvt-node-color, #007acc)",
  strokeColor: "var(--pvt-node-stroke, #fff)",
  fontFamily: "var(--pvt-label-font, system-ui, sans-serif)",
  textColor: "var(--pvt-node-text-color, #fff)",
  textAnchorPosition: "middle",
  textHorizontalShift: 0,
  textVerticalShift: 0,
  textRotateDegree: 0,
  iconUnicode: void 0,
  iconClass: void 0,
  svgIcon: void 0,
  imagePath: void 0,
  text: void 0,
  html: void 0
}, To = {
  strokeWidth: 2,
  opacity: 1,
  curveStyle: "bidirectional",
  dashed: !1,
  animateDash: !0,
  rotateLabel: !1,
  markerEnd: "arrow",
  markerStart: void 0,
  strokeColor: "var(--pvt-edge-stroke, #999)"
}, Wn = {
  fontSize: 12,
  fontFamily: "var(--pvt-label-font, system-ui, sans-serif)",
  color: "var(--pvt-edge-label-color, #333)",
  backgroundColor: "var(--pvt-edge-label-bg, #ffffffa0)"
};
function No(r) {
  const t = r.replace(/[\x00-\x20]+/g, ""), e = /^([a-z][a-z0-9+.-]*):/i.exec(t);
  return e ? e[1].toLowerCase() : null;
}
const Mo = ["http", "https", "mailto", "ftp", "tel"], Ao = ["http", "https", "data", "blob"];
function zs(r, t) {
  const e = No(r);
  return e === null || t.includes(e);
}
function Vn(r, t) {
  let e = [];
  function n() {
    if (!e) return;
    const i = (r - t) * 0.9;
    for (const s of e) {
      if (s.x == null || s.y == null) continue;
      const o = s.x, a = s.y, l = s.getCircleRadius() ?? 10, d = Math.sqrt(o * o + a * a) + l;
      if (d > i) {
        const c = i / d, u = o * c, p = a * c;
        s.x = u, s.y = p;
      }
    }
  }
  return n.initialize = (i) => {
    e = i;
  }, n;
}
class _o {
  /**
   * Convert global coordinates to local coordinates relative to a parent cluster.
   *
   * Used when reading positions from the main graph and applying them to subgraph nodes.
   *
   * @param globalX Global X coordinate
   * @param globalY Global Y coordinate  * @param parentNode The parent cluster node (whose position defines the local origin)
   * @returns Local coordinates relative to parent center
   */
  static globalToLocal(t, e, n) {
    const i = n.x ?? 0, s = n.y ?? 0;
    return {
      x: t - i,
      y: e - s
    };
  }
  /**
   * Convert local coordinates (relative to parent cluster center) to global coordinates.
   *
   * Used when reading positions from subgraph nodes and updating the main graph.
   *
   * @param localX Local X coordinate (relative to parent)
   * @param localY Local Y coordinate (relative to parent)
   * @param parentNode The parent cluster node (whose position defines the local origin)
   * @returns Global coordinates
   */
  static localToGlobal(t, e, n) {
    const i = n.x ?? 0, s = n.y ?? 0;
    return {
      x: t + i,
      y: e + s
    };
  }
}
class H {
  constructor(t) {
    h(this, "nodeDrawer");
    h(this, "edgeDrawer");
    this.nodeDrawer = t;
  }
  /**
   * Renders an expanded cluster with its nested subgraph.
   *
   * This is called when a node with children is expanded. It creates:
   * - A cluster area circle around the parent node
   * - A nested subgraph containing the children nodes
   * - Appropriate edge visibility (hide synthetic, show actual)
   *
   * @param theClusterSelection - D3 selection of the cluster's SVG group element
   * @param node - The node being expanded
   * @param cb - Callback invoked after cluster expansion completes, receives final radius
   * @returns The cluster circle selection
   */
  render(t, e, n) {
    this.edgeDrawer || (this.edgeDrawer = this.nodeDrawer.graphSvgRenderer.edgeDrawer);
    let i = t.select(".pvt-cluster-area");
    if (i.empty()) {
      i = t.append("circle").classed("pvt-cluster-area", !0).lower();
      const u = H.buildGradientForNode(
        t.node().querySelector(".node"),
        i,
        e
      );
      u && i.style("stroke", `color-mix(in srgb, ${u} 70%, transparent)`);
    }
    const s = H.updateToNewRadiusExpanded(this.nodeDrawer.graph, e);
    i.attr("r", 0).attr("_final_r", s).attr("cx", 0).attr("cy", 0), i.transition().duration(250).attr("r", s);
    const o = /* @__PURE__ */ new Set(), a = e.children.flatMap((u) => [
      ...u.getEdgesOut() ?? [],
      ...u.getEdgesIn() ?? []
    ]).filter((u) => o.has(u.id) ? !1 : (o.add(u.id), !0)), l = t.node(), d = this.createSubgraph(
      e.children,
      a,
      l,
      e,
      this.nodeDrawer.graph
    );
    e.setSubgraph(d), t.select(":scope > .zoom-layer").attr("opacity", 0).transition().duration(250).attr("opacity", 1), H.toggleSyntheticEdges(e), H.resolveCrossClusterEdges(this.nodeDrawer.graph);
    let c = this.nodeDrawer.graph.getParentGraph();
    for (; c; )
      c.renderer.update(!1), c = c.getParentGraph();
    return n && requestAnimationFrame(() => {
      n(s);
    }), i;
  }
  /**
   * Creates a nested subgraph for rendering children inside a cluster.
   *
   * The subgraph is a separate Graph instance that:
   * - Uses local coordinates (relative to parent cluster center at 0,0)
   * - Contains clones of the child nodes
   * - Shares the same Node object references for proper position syncing
   * - Has its own simulation constrained within the parent radius
   *
   * @param nodes - Child nodes to include in the subgraph
   * @param edges - Edges connecting the child nodes
   * @param container - SVG group element to contain the subgraph
   * @param parentNode - The parent cluster node (defines the local coordinate origin)
   * @param parentGraph - Reference to the parent graph for coordinate conversion
   * @returns The created subgraph instance
   */
  createSubgraph(t, e, n, i, s) {
    const o = (p) => {
      p.getMutableNodes().forEach((g) => {
        let f = s.getMutableNode(g.id);
        f = f.getOriginalObject() ?? f, g.setOriginalObject(f), f.setDeepestNodeClone(g), g.isChild = !0;
      }), p.getMutableEdges().forEach((g) => {
        let f = s.getMutableEdge(g.id);
        f && (f = f.getOriginalObject() ?? f, g.setOriginalObject(f));
      }), t.forEach((g) => {
        var f;
        if (((f = g.parentNode) == null ? void 0 : f.id) === i.id) {
          const v = p.getMutableNode(g.id);
          v && (v.parentNode = i);
        }
      }), s.getMutableEdges().forEach((g) => {
        const f = g.getOriginalObject() ?? g, v = p.getMutableNode(g.from.id), y = p.getMutableNode(g.to.id);
        v && f.setSubgraphFromNode(v), y && f.setSubgraphToNode(y);
      });
    }, a = {
      UI: {
        mode: "viewer",
        tooltip: {
          enabled: !1
        },
        contextMenu: {
          enabled: !1
        },
        navigation: {
          enabled: !1
        }
      },
      render: {
        ...this.nodeDrawer.graph.getOptions().render,
        zoomEnabled: !1,
        zoomAnimationDuration: 100,
        beforeRender: o
      },
      simulation: {
        useWorker: !1,
        warmupTicks: 10,
        cooldownTime: 50,
        freezeNodesOnDrag: !1
      },
      callbacks: {
        onNodeSelect: (p) => {
          const g = s.getMutableNode(p.id);
          g && s.selectElement(g);
        },
        onNodesSelect: () => {
          const p = c.renderer.getGraphInteraction().getSelectedNodeIDs();
          if (p === null) return;
          const g = p.map((f) => {
            const v = s.getMutableNode(f);
            return {
              node: v,
              element: v == null ? void 0 : v.getGraphElement()
            };
          });
          s.renderer.getGraphInteraction().addNodesToSelection(g);
        },
        onEdgeSelect: (p) => {
          const g = s.getMutableEdge(p.id);
          g && s.selectElement(g);
        },
        onNodeHoverIn: (p, g) => {
          var f;
          (f = s.UIManager.tooltip) == null || f.openForNodeOnElement(p, g);
        }
      },
      parentGraph: this.nodeDrawer.graph
    }, l = {
      nodes: [...t].map((p) => p.toDict(!0)),
      edges: [...e].map((p) => p.toDict())
    }, d = document.createElement("div"), c = new ee(d, l, a), u = d.querySelector(".zoom-layer");
    return n.appendChild(u), c.getMutableNodes().forEach((p) => {
      H.toggleSyntheticEdges(p);
    }), c.on("ready", () => {
      c.simulation.getSimulation().force("center", Rr(0, 0)).force("constrainParent", Vn(i.getCircleRadius(), 10)), c.simulation.restart();
    }), c.renderer.getGraphInteraction().on("dragended", () => {
    }), c.renderer.getGraphInteraction().on("simulationTick", () => {
      c.getMutableNodes().filter((g) => g.visible).forEach((g) => {
        const f = g.x ?? 0, v = g.y ?? 0;
        this.updatePositionOnRealChild(f, v, g.id);
      });
    }), s.renderer.getGraphInteraction().on("dragging", () => {
      this.updatePositionOnAllRealChildren(s);
    }), s.renderer.getGraphInteraction().on("simulationTick", () => {
      this.updatePositionOnAllRealChildren(s);
    }), s.renderer.getGraphInteraction().on("canvasClick", () => {
      c.deselectAll();
    }), c;
  }
  /**
   * Recursively updates positions of all real child nodes across nested subgraphs.
   *
   * This is called during simulation tick and drag events to propagate position changes
   * from subgraphs up to the main graph. It handles nested clusters by recursing through
   * parent graphs.
   *
   * @param graph - The graph to process (can be main graph or subgraph)
   */
  updatePositionOnAllRealChildren(t) {
    t.getMutableNodes().filter((e) => e.isParent && e.expanded).forEach((e) => {
      const n = e.children, i = e.getSubgraph(), s = /* @__PURE__ */ new Map();
      i && (i.getMutableNodes().forEach((o) => {
        s.set(o.id, o);
      }), this.updatePositionOnAllRealChildren(i)), n.forEach((o) => {
        const a = s.get(o.id);
        !a || !a.x || !a.y || this.updatePositionOnRealChild(a.x, a.y, o.id);
      });
    });
  }
  /**
   * Updates the position of a real child node in the main graph based on its subgraph position.
   * Then recursively bubbles the update up to parent graphs.
   *
   * This is the core method for syncing subgraph positions (local coordinates) to the main
   * graph (global coordinates). It:
   * 1. Converts local subgraph position to global position
   * 2. Updates the real node's position in the parent graph
   * 3. Triggers a render tick for the updated node
   * 4. Recursively updates parent graphs if this is a nested subgraph
   *
   * @param x - Local X position of the child in the subgraph
   * @param y - Local Y position of the child in the subgraph
   * @param id - ID of the child node (same in both subgraph and main graph)
   */
  updatePositionOnRealChild(t, e, n) {
    const i = this.nodeDrawer.graph.getMutableNode(n), s = i == null ? void 0 : i.parentNode;
    if (i && s) {
      const o = _o.localToGlobal(t, e, s);
      i.x = o.x, i.y = o.y, this.nodeDrawer.graph.renderer.nextTickFor([i]);
      const a = this.nodeDrawer.graph.getParentGraph();
      a && a.renderer.nodeDrawer.clusterDrawer.updatePositionOnRealChild(t, e, n);
    }
  }
  /**
   * Toggles visibility of synthetic edges based on cluster expansion state.
   *
   * Synthetic edges are placeholder edges created during graph normalization that point
   * from external nodes to collapsed cluster children. When a cluster is expanded:
   * - Synthetic edges pointing to children are hidden
   * - Actual edges within the subgraph are shown
   * When collapsed:
   * - Synthetic edges are shown again
   * - Actual nested edges are hidden
   *
   * @param node - The cluster node being expanded/collapsed
   */
  static toggleSyntheticEdges(t) {
    const e = (n) => n.isSynthetic === !0 && n.isCrossCluster !== !0;
    if (t.expanded) {
      t.getEdgesIn().filter(e).forEach((i) => {
        i.hide();
      });
      const n = t.getOriginalObject() ?? t;
      n.getEdgesIn().filter(e).forEach((i) => {
        i.hide();
      }), n.children.forEach((i) => {
        i.getEdgesIn().filter((s) => !n.children.includes(s.from)).filter((s) => s.isCrossCluster !== !0).forEach((s) => {
          s.show();
        });
      });
    } else {
      t.getEdgesIn().filter(e).forEach((i) => {
        i.show();
      });
      const n = t.getOriginalObject() ?? t;
      n.getEdgesIn().filter(e).forEach((i) => {
        t.visible && i.show();
      }), H.hideNestedEdges(n);
    }
  }
  /**
   * Re-resolve which cross-cluster (child↔child) stand-in edges are visible after an
   * expand/collapse, walking to the root graph so a nested toggle updates the whole
   * set. Delegates the per-edge decision to {@link Graph.resolveCrossClusterEdges}.
   *
   * @param graph - Any graph in the hierarchy that just changed expansion state
   */
  static resolveCrossClusterEdges(t) {
    let e = t, n = e.getParentGraph();
    for (; n; )
      e = n, n = e.getParentGraph();
    ee.resolveCrossClusterEdges(e.getMutableEdges());
  }
  /**
   * Recursively hides edges that point to nested children of a collapsed cluster.
   *
   * When a cluster is collapsed, edges that would point to its nested children
   * need to be hidden since those children are not visible. This method traverses
   * the entire child hierarchy.
   *
   * @param node - The cluster node whose nested edges should be hidden
   */
  static hideNestedEdges(t) {
    t.children.forEach((e) => {
      H.hideNestedEdges(e), e.getEdgesIn().filter((n) => !t.children.includes(n.from)).forEach((n) => {
        n.hide();
      });
    });
  }
  /**
   * Recursively collapses all expanded clusters starting from the given node.
   *
   * Used when collapsing a parent cluster - all nested expanded clusters
   * must also be collapsed first.
   *
   * @param node - The node whose subtree should be collapsed
   */
  static collapseAllOpenedClusters(t) {
    t.children.forEach((e) => {
      H.collapseAllOpenedClusters(e), e.collapse(), e.setCircleRadius(e.getCircleRadiusCollapsed());
    });
  }
  /**
   * Updates the radius of a node when it is expanded, propagating changes up the parent hierarchy.
   *
   * When a cluster node expands:
   * 1. Save current radius as collapsed radius
   * 2. Calculate new expanded radius based on children
   * 3. Update the node in its parent graph
   * 4. Recursively update parent clusters
   *
   * @param graph - The graph containing the node
   * @param node - The node being expanded
   * @returns The calculated expanded radius
   */
  static updateToNewRadiusExpanded(t, e) {
    const n = H.getRadiusForClusterNode(e);
    e.expanded || e.setCircleRadiusCollapsed(e.getCircleRadius()), e.setCircleRadius(n);
    const i = t.getParentGraph();
    if (i) {
      const s = H.updateParentGraph(i, e, n);
      s && t.simulation.getSimulation().force("link", null).force("constrainParent", Vn(s, 10)), i.getParentGraph() && e.parentNode && H.updateToNewRadiusExpanded(i, e.parentNode);
    }
    return n;
  }
  /**
   * Updates the radius of a node when it is collapsed, propagating changes up the parent hierarchy.
   *
   * @param node - The node being collapsed
   * @param restoreR - Whether to restore the original collapsed radius
   * @param graph - The graph containing the node (optional, used for propagation)
   */
  static updateToNewRadiusCollapsed(t, e, n) {
    const i = e ? t.getCircleRadiusCollapsed() : H.getRadiusForClusterNode(t);
    if (t.setCircleRadius(i), n) {
      H.updateParentGraph(n, t, i);
      const s = n.getParentGraph();
      t.parentNode && H.updateToNewRadiusCollapsed(t.parentNode, !1, s);
    }
  }
  /**
   * Calculates the appropriate radius for a cluster node based on its expansion state.
   *
   * For collapsed nodes: returns current radius + 4px padding
   * For expanded nodes: calculates radius based on children count and sizes using
   * a formula that approximates the area needed to contain all children.
   *
   * @param node - The cluster node to calculate radius for
   * @returns The calculated radius
   */
  static getRadiusForClusterNode(t) {
    if (!t.expanded)
      return t.getCircleRadius() + 4;
    const e = 50, n = 16, s = t.children.reduce((a, l) => {
      const d = l.getCircleRadius();
      return a + d + n;
    }, 0) / t.children.length, o = Math.sqrt(t.children.length) * (2 * s) + e;
    return Math.max(50, o);
  }
  /**
   * Updates the parent graph when a child cluster's radius changes.
   *
   * This method:
   * 1. Updates the radius of the node in the parent graph
   * 2. Triggers a re-layout of the parent graph
   * 3. Updates the parent cluster's visual radius if it exists
   *
   * @param parentGraph - The parent graph to update
   * @param node - The node whose radius changed
   * @param r - The new radius
   * @returns The parent's new radius if updated, undefined otherwise
   */
  static updateParentGraph(t, e, n) {
    var a;
    const i = t.getMutableNode(e.id);
    i == null || i.setCircleRadius(n);
    const s = e.getOriginalObject();
    s && s.setCircleRadius(n);
    const o = e.parentNode;
    if (o) {
      const l = H.getRadiusForClusterNode(o);
      o.setCircleRadius(l), t.onChange(), t.simulation.reheat(0.1);
      const d = (a = o.getGraphElement()) == null ? void 0 : a.querySelector("& > .pvt-cluster-area");
      if (d) {
        const c = Z(d);
        c.attr("_final_r", l).transition().duration(250).attr("r", l), cn.handleChildrenExpanded(t, o, c);
      }
      return l;
    }
  }
  /**
   * Creates a radial gradient fill for the cluster area circle.
   *
   * The gradient fades from transparent at 90% to a color-mixed version of the
   * parent node's fill color at 100%, creating a subtle visual boundary.
   *
   * @param parentCircleElement - The parent node's circle element
   * @param clusterSelection - The cluster area circle selection
   * @param node - The cluster node
   * @returns The parent node's fill color, or undefined if not found
   */
  static buildGradientForNode(t, e, n) {
    if (t) {
      const i = getComputedStyle(t).fill, s = `color-mix(in srgb, ${i} 40%, transparent)`, o = `pvt-cluster-area-${n.id}`, a = t.closest(".pvt-canvas-element"), l = a == null ? void 0 : a.querySelector("defs");
      if (!l) return;
      const d = l.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "radialGradient"));
      d.setAttribute("id", o);
      const c = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      c.setAttribute("offset", "90%"), c.setAttribute("stop-color", "#ffffff00"), d.appendChild(c);
      const u = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      return u.setAttribute("offset", "100%"), u.setAttribute("stop-color", s), d.appendChild(u), e.style("fill", `url(#${o})`), i;
    }
  }
}
const Io = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm0 2H9v14h9a1 1 0 0 0 .993-.883L19 18V6a1 1 0 0 0-.883-.993zm-4.387 4.21l.094.083l2 2a1 1 0 0 1 .083 1.32l-.083.094l-2 2a1 1 0 0 1-1.497-1.32l.083-.094L13.585 12l-1.292-1.293a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083"/></svg>', Lo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm-3 2H6a1 1 0 0 0-.993.883L5 6v12a1 1 0 0 0 .883.993L6 19h9zm-3.293 4.293a1 1 0 0 1 .083 1.32l-.083.094L10.415 12l1.292 1.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083l-2-2a1 1 0 0 1-.083-1.32l.083-.094l2-2a1 1 0 0 1 1.414 0"/></svg>', Hs = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M13 3.5v3a.5.5 0 0 1-1 0V4.71L9.85 6.86a.5.5 0 0 1-.707-.707l2.15-2.15h-1.79a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .351.144l.004.004a.5.5 0 0 1 .144.348v.004zM3.5 9a.5.5 0 0 1 .5.5v1.79l2.15-2.15a.5.5 0 0 1 .707.707l-2.15 2.15h1.79a.5.5 0 0 1 0 1H3.494a.5.5 0 0 1-.497-.499v-3a.5.5 0 0 1 .5-.5z"/><path fill="currentColor" fill-rule="evenodd" d="M0 4.8c0-1.68 0-2.52.327-3.16A3.02 3.02 0 0 1 1.637.33c.642-.327 1.48-.327 3.16-.327h6.4c1.68 0 2.52 0 3.16.327a3.02 3.02 0 0 1 1.31 1.31c.327.642.327 1.48.327 3.16v6.4c0 1.68 0 2.52-.327 3.16a3 3 0 0 1-1.31 1.31c-.642.327-1.48.327-3.16.327h-6.4c-1.68 0-2.52 0-3.16-.327a3 3 0 0 1-1.31-1.31C0 13.718 0 12.88 0 11.2zM4.8 1h6.4c.857 0 1.44 0 1.89.038c.438.035.663.1.819.18c.376.192.682.498.874.874c.08.156.145.38.18.819c.037.45.038 1.03.038 1.89v6.4c0 .857-.001 1.44-.038 1.89c-.036.438-.101.663-.18.819a2 2 0 0 1-.874.874c-.156.08-.381.145-.819.18c-.45.036-1.03.037-1.89.037H4.8c-.857 0-1.44 0-1.89-.037c-.438-.036-.663-.101-.819-.18a2 2 0 0 1-.874-.874c-.08-.156-.145-.381-.18-.82C1 12.64.999 12.06.999 11.2V4.8c0-.856.001-1.44.038-1.89c.036-.437.101-.662.18-.818c.192-.376.498-.682.874-.874c.156-.08.381-.145.819-.18C3.36 1 3.94 1 4.8 1" clip-rule="evenodd"/></svg>', Do = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1.5a.5.5 0 0 0-.5-.5H4.2c-1.12 0-1.68 0-2.11.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.11v3.3a.5.5 0 0 0 1 0v-3.3c0-.577 0-.949.024-1.23c.022-.272.06-.372.085-.422c.096-.188.249-.341.437-.437c.05-.025.15-.063.422-.085c.283-.023.656-.024 1.23-.024h3.3a.5.5 0 0 0 .5-.5zm7 10.3V8.5a.5.5 0 0 0-1 0v3.3c0 .577 0 .949-.024 1.23c-.022.272-.06.372-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085c-.283.023-.656.024-1.23.024h-3.3a.5.5 0 0 0 0 1h3.3c1.12 0 1.68 0 2.11-.218c.376-.192.682-.498.874-.874c.218-.428.218-.988.218-2.11zM6.85 9.15a.5.5 0 0 1 .147.35v3.003a.5.5 0 0 1-1 0v-1.79l-4.15 4.15a.5.5 0 0 1-.707-.707l4.15-4.15H3.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .191.038q.09.036.162.11zM10.7 6l4.15-4.15a.5.5 0 0 0-.707-.707l-4.15 4.15v-1.79a.5.5 0 0 0-1 0v3.003a.5.5 0 0 0 .309.46a.5.5 0 0 0 .19.037h3a.5.5 0 0 0 0-1h-1.79z"/></svg>', Ro = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M24.23 11.71a39 39 0 0 0-4.57-3.92a23 23 0 0 1 3.48-1.72c.32-.12.62-.21.92-.3a2.28 2.28 0 0 0 3.81-.46a3.3 3.3 0 0 1 1.92.84c1.19 1.19 1.22 3.59.1 6.58c.49.65.94 1.31 1.35 2c.17-.4.35-.79.49-1.18c1.47-3.85 1.28-7-.53-8.78a5.3 5.3 0 0 0-3.33-1.44a2.29 2.29 0 0 0-4.31.54c-.37.11-.74.22-1.13.37a26 26 0 0 0-4.57 2.35a26 26 0 0 0-4.58-2.39c-3.85-1.46-7-1.28-8.77.53c-1.66 1.67-1.93 4.44-.83 7.86a2.28 2.28 0 0 0 1.59 3.67c.32.61.67 1.22 1.06 1.82A25.5 25.5 0 0 0 4 22.66c-1.47 3.84-1.28 7 .53 8.77a5.63 5.63 0 0 0 4.12 1.51a13.3 13.3 0 0 0 4.65-1a26 26 0 0 0 4.58-2.35A26 26 0 0 0 22.43 32a14.2 14.2 0 0 0 3.65.9a2.3 2.3 0 0 0 4.38-.9a4.6 4.6 0 0 0 .74-.57c1.81-1.81 2-4.93.53-8.77a32.7 32.7 0 0 0-7.5-10.95M12.57 30.09c-3 1.15-5.45 1.13-6.65-.08s-1.23-3.62-.07-6.64a23 23 0 0 1 1.71-3.48a40 40 0 0 0 3.92 4.56c.43.43.87.85 1.31 1.25q.9-.46 1.83-1.05c-.58-.52-1.16-1-1.72-1.61a34 34 0 0 1-5.74-7.47a2.29 2.29 0 0 0-1.66-3.88c-.75-2.5-.62-4.49.43-5.54a3.72 3.72 0 0 1 2.72-.92a11.4 11.4 0 0 1 3.93.84a23 23 0 0 1 3.48 1.72a39 39 0 0 0-4.57 3.92c-.44.44-.87.9-1.29 1.36a20 20 0 0 0 1 1.85c.54-.61 1.09-1.21 1.68-1.8a36.3 36.3 0 0 1 5-4.17a37 37 0 0 1 4.95 4.17a36.3 36.3 0 0 1 4.17 5a37 37 0 0 1-4.17 5a30.7 30.7 0 0 1-10.26 6.97M29.79 30l-.16.13a2.27 2.27 0 0 0-3.5.72a12.6 12.6 0 0 1-3-.77a22 22 0 0 1-3.48-1.72a39 39 0 0 0 4.57-3.92a38 38 0 0 0 3.92-4.56a23 23 0 0 1 1.72 3.48C31 26.39 31 28.81 29.79 30" class="clr-i-solid clr-i-solid-path-1"/><circle cx="17.99" cy="18.07" r="3.3" fill="currentColor" transform="rotate(-9.22 17.955 18.05)"/><path fill="none" d="M0 0h36v36H0z"/></svg>', Gs = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.76 20.83L17.6 18l-2.84-2.83l1.41-1.41L19 16.57l2.83-2.81l1.41 1.41L20.43 18l2.81 2.83l-1.41 1.41L19 19.4l-2.83 2.84zM12 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L8.29 18.7a.99.99 0 0 1-.29-.83V12h-.03L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 12z"/></svg>', $s = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L8.29 18.7a.99.99 0 0 1-.29-.83V12h-.03L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 12zm3 5h3v-3h2v3h3v2h-3v3h-2v-3h-3z"/></svg>', Us = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" d="M5.655 2.639a.5.5 0 0 0 .69.723l1.313-1.254a.5.5 0 0 1 .691.001l1.305 1.252a.5.5 0 0 0 .692-.721L9.042 1.388a1.5 1.5 0 0 0-2.075-.003zM3.362 6.346a.5.5 0 1 0-.723-.69L1.388 6.963a1.5 1.5 0 0 0 0 2.073l1.251 1.31a.5.5 0 0 0 .723-.691l-1.251-1.31a.5.5 0 0 1 0-.69zm2.984 6.293a.5.5 0 0 0-.691.723l1.314 1.256a1.5 1.5 0 0 0 2.077-.004l1.301-1.254a.5.5 0 1 0-.694-.72l-1.3 1.254a.5.5 0 0 1-.693.001zm7.015-6.985a.5.5 0 1 0-.722.693l1.258 1.31a.5.5 0 0 1 0 .693L12.64 9.654a.5.5 0 1 0 .72.694l1.257-1.304a1.5 1.5 0 0 0 .001-2.08zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z" />
</svg>`, Oo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4" />
</svg>`, Po = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" fill-rule="evenodd" d="M2 8a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1" clip-rule="evenodd" />
</svg>`, ze = (r) => `<svg xmlns="http://www.w3.org/2000/svg" width="${r ?? 24}" height="${r ?? 24}" viewBox="0 0 24 24" style="filter: drop-shadow(0px 2px 1px #00000033);">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linejoin="round" d="M8 6h1.78c2.017 0 3.025 0 3.534.241a2.5 2.5 0 0 1 1.211 3.276c-.229.515-.994 1.17-2.525 2.483c-1.53 1.312-2.296 1.968-2.525 2.483a2.5 2.5 0 0 0 1.211 3.276c.51.241 1.517.241 3.534.241H16" />
        <path d="M2 6a3 3 0 1 0 6 0a3 3 0 0 0-6 0Zm14 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0Z" />
    </g>
</svg>`, js = (r) => `<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${r}" viewBox="0 0 256 256" ><g fill="currentColor"><path d="M216 40v176H40V40Z" opacity="0.2"/><path d="M152 40a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8m-8 168h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16m64-176h-24a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0V48a16 16 0 0 0-16-16m8 72a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8m0 72a8 8 0 0 0-8 8v24h-24a8 8 0 0 0 0 16h24a16 16 0 0 0 16-16v-24a8 8 0 0 0-8-8M40 152a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8m32 56H48v-24a8 8 0 0 0-16 0v24a16 16 0 0 0 16 16h24a8 8 0 0 0 0-16m0-176H48a16 16 0 0 0-16 16v24a8 8 0 0 0 16 0V48h24a8 8 0 0 0 0-16"/></g></svg>`, Fo = '<svg width="16" height="16"viewBox="0 0 3.4393651 3.7032704" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1" /> <g id="layer1" transform="translate(-128.32315,-97.896729)" fill="currentColor"> <path id="path1" d="m 130.91707,97.898417 a 0.79375,0.79375 0 0 0 -0.71416,0.999939 l -0.51729,0.296106 a 0.79375,0.79375 0 1 0 0,1.107428 l 0.51729,0.29559 a 0.79454375,0.79454375 0 0 0 0.76584,1.00252 0.79375,0.79375 0 1 0 -0.56896,-1.3472 l -0.51728,-0.296111 a 0.79375,0.79375 0 0 0 0,-0.417545 l 0.51728,-0.296106 a 0.79375,0.79375 0 0 0 1.36271,-0.553455 0.79375,0.79375 0 0 0 -0.84543,-0.791166 z m 0.0517,0.394291 a 0.396875,0.396875 0 0 1 0,0.79375 0.396875,0.396875 0 1 1 0,-0.79375 z m 0,2.116662 a 0.396875,0.396875 0 0 1 0,0.79375 0.396875,0.396875 0 0 1 0,-0.79375 z" /> </g> </svg> ', si = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
</svg>`, qs = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
</svg>`, Bo = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M227.73 66.85L160 139.17v55.49a16 16 0 0 1-7.13 13.34l-32 21.34A16 16 0 0 1 96 216v-76.83L28.27 66.85l-.08-.09A16 16 0 0 1 40 40h176a16 16 0 0 1 11.84 26.76ZM227.31 192l18.35-18.34a8 8 0 0 0-11.32-11.32L216 180.69l-18.34-18.35a8 8 0 0 0-11.32 11.32L204.69 192l-18.35 18.34a8 8 0 0 0 11.32 11.32L216 203.31l18.34 18.35a8 8 0 0 0 11.32-11.32Z"/></svg>', zo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <path d="M11.272 36.728A17.94 17.94 0 0 0 24 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17" />
        <path d="M6 9v8h8" />
    </g>
</svg>`, Ho = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" style="transform: scaleX(-1); transform-origin: center;">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <path d="M11.272 36.728A17.94 17.94 0 0 0 24 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17" />
        <path d="M6 9v8h8" />
    </g>
</svg>`, Go = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"/></svg>', $o = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4h2v12l5.5-5.5l1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5L11 16z"/></svg>', Uo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4"/></svg>', jo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0l-4 4m4-4l-4-4"/></svg>', qo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.75 5.623V9.52a4 4 0 0 1-4 4H3.871m4.236 4.857L4.31 14.58a1.5 1.5 0 0 1-.44-1.061m4.236-4.857L4.31 12.46c-.293.293-.44.677-.44 1.061"/></svg>', Wo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75"/></svg>', ot = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m15.113 3.21l.094.083l5.5 5.5a1 1 0 0 1-1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1-.158.277l-.07.08l-1.5 1.5a1 1 0 0 1-1.32.082l-.095-.083L9 16.415l-3.793 3.792a1 1 0 0 1-1.497-1.32l.083-.094L7.585 15l-2.792-2.793a1 1 0 0 1-.083-1.32l.083-.094l1.5-1.5a1 1 0 0 1 .258-.187l.098-.042l3.796-1.425l3.171-3.17a1 1 0 0 1 1.497-1.26z"/></svg>', ri = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20.971 17.172l-1.414 1.414l-3.535-3.535l-.073.074l-.707 3.535l-1.415 1.415l-4.242-4.243l-4.95 4.95l-1.414-1.414l4.95-4.95l-4.243-4.243l1.414-1.414l3.536-.707l.073-.074l-3.536-3.536l1.414-1.415zm-2.12-4.95l1.34-1.34l.707.707l1.415-1.414l-8.486-8.485l-1.414 1.414l.707.707l-1.34 1.34z"/></svg>', oi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m7 7l10 10M7 17L17 7"/></svg>', ai = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6H8a2 2 0 0 0-2 2v8m10 26H8a2 2 0 0 1-2-2v-8m26 10h8a2 2 0 0 0 2-2v-8M32 6h8a2 2 0 0 1 2 2v8"/><circle cx="24" cy="24" r="6"/></svg>', Vo = '<svg xmlns="http://www.w3.org/2000/svg" width="${fixedPreviewSize}" height="${fixedPreviewSize}" viewBox="0 0 256 256" ><g fill="currentColor"><path d="M216 40v176H40V40Z" opacity="0.2"/><path d="M152 40a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8m-8 168h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16m64-176h-24a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0V48a16 16 0 0 0-16-16m8 72a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8m0 72a8 8 0 0 0-8 8v24h-24a8 8 0 0 0 0 16h24a16 16 0 0 0 16-16v-24a8 8 0 0 0-8-8M40 152a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8m32 56H48v-24a8 8 0 0 0-16 0v24a16 16 0 0 0 16 16h24a8 8 0 0 0 0-16m0-176H48a16 16 0 0 0-16 16v24a8 8 0 0 0 16 0V48h24a8 8 0 0 0 0-16"/></g></svg>', at = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>', lt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>', Ws = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425z"/></svg>', Yo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><circle cx="21" cy="26" r="2" fill="currentColor"/><circle cx="21" cy="6" r="2" fill="currentColor"/><circle cx="4" cy="16" r="2" fill="currentColor"/><path fill="currentColor" d="M28 12a3.996 3.996 0 0 0-3.858 3h-4.284a3.966 3.966 0 0 0-5.491-2.643l-3.177-3.97A3.96 3.96 0 0 0 12 6a4 4 0 1 0-4 4a4 4 0 0 0 1.634-.357l3.176 3.97a3.924 3.924 0 0 0 0 4.774l-3.176 3.97A4 4 0 0 0 8 22a4 4 0 1 0 4 4a3.96 3.96 0 0 0-.81-2.387l3.176-3.97A3.966 3.966 0 0 0 19.858 17h4.284A3.993 3.993 0 1 0 28 12M6 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m8-10a2 2 0 1 1 2-2a2 2 0 0 1-2 2m12 0a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg>', Xo = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.172 14.829l5.657-5.657M7.05 11.293l-1.414 1.414a4 4 0 1 0 5.657 5.657l1.412-1.414m-1.413-9.9l1.414-1.414a4 4 0 1 1 5.657 5.657l-1.414 1.414"/></svg>', cs = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></g></svg>', Ko = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></g></svg>', Zo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="round" d="M17.5 17.5L22 22"/><path d="M20 11a9 9 0 1 0-18 0a9 9 0 0 0 18 0Z"/><path stroke-linecap="round" d="m14.5 9.5l.92.793c.387.333.58.5.58.707s-.193.374-.58.707l-.92.793m-7-3l-.92.793c-.387.333-.58.5-.58.707s.193.374.58.707l.92.793m4.5-4l-2 5"/></g></svg>', Qo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1M4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm2 5h2v2H6zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-3 4H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-2 3H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1" clip-rule="evenodd"/></svg>', Jo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m11.852 2.011l.058-.007L12 2l.075.003l.126.017l.111.03l.111.044l.098.052l.104.074l.082.073l3 3a1 1 0 1 1-1.414 1.414L13 5.415V13a1 1 0 0 1-2 0V5.415L9.707 6.707a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414l3-3q.053-.054.112-.097l.11-.071l.114-.054l.105-.035zM12 16a3 3 0 1 1 0 6a3 3 0 0 1 0-6"/></svg>', ea = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a1 1 0 0 1 1 1v7.584l1.293-1.291a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-.112.097l-.11.071l-.114.054l-.105.035l-.149.03L12 22l-.075-.003l-.126-.017l-.111-.03l-.111-.044l-.098-.052l-.096-.067l-.09-.08l-3-3a1 1 0 0 1 1.414-1.414L11 18.586V11a1 1 0 0 1 1-1m0-8a3 3 0 1 1-3 3l.005-.176A3 3 0 0 1 12 2"/></svg>', Xt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">< path d = "M0 0h24v24H0z" fill = "none" /><path fill="currentColor" d = "M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>', an = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">< path d = "M0 0h24v24H0z" fill = "none" /><path fill="currentColor" d = "m14 19l5-5h-4q-.425 0-.712.288T14 15zm-9 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v9.175q0 .4-.15.763t-.425.637l-4.85 4.85q-.275.275-.637.425t-.763.15zm3-7h3q.425 0 .713-.288T12 13t-.288-.712T11 12H8q-.425 0-.712.288T7 13t.288.713T8 14m0-4h8q.425 0 .713-.288T17 9t-.288-.712T16 8H8q-.425 0-.712.288T7 9t.288.713T8 10" /></svg>', Vs = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">< path d = "M0 0h14v14H0z" fill = "none" /><g fill="none" stroke = "currentColor" stroke - linecap="round" stroke - linejoin="round" ><path d="M4.123 12.709c1.518 0 1.897-1.073 1.897-1.61c0-.535-.38-1.608-1.897-1.608c-1.518 0-1.897 1.073-1.897 1.609s.38 1.609 1.897 1.609" /><path d="M7 9.806C1.8 9.806.5 6.744.5 5.213C.5 3.683 1.8.621 7 .621s6.5 3.062 6.5 4.592c0 1.531-1.3 4.593-6.5 4.593m-1.414.226c1.01 1.147 1.683 1.912 1.68 3.345" /></g></svg>', ta = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">< path d = "M0 0h256v256H0z" fill = "none" /><path fill="currentColor" d = "M156 216a12 12 0 0 1-12 12h-32a12 12 0 0 1 0-24h32a12 12 0 0 1 12 12M40 156a12 12 0 0 0 12-12v-32a12 12 0 0 0-24 0v32a12 12 0 0 0 12 12m32 48H52v-20a12 12 0 0 0-24 0v24a20 20 0 0 0 20 20h24a12 12 0 0 0 0-24M228 48v160a20 20 0 0 1-20 20h-24a12 12 0 0 1 0-24h3L52 69v3a12 12 0 0 1-24 0V48a20 20 0 0 1 20-20h160a20 20 0 0 1 20 20m-24 4H69l135 135Z" /></svg>', na = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" fill-rule="evenodd" d="M8.145 2.75a2 2 0 1 1-.13 1H5a1.5 1.5 0 1 0 0 3h7a2.5 2.5 0 0 1 0 5H6.485a2 2 0 1 1-.13-1H12a1.5 1.5 0 0 0 0-3H5a2.5 2.5 0 0 1 0-5z" clip-rule="evenodd" /></svg>', ia = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="currentColor"><path d="M4 2h16v2H4zM2 2h2v20H2zm2 9h16v2H4zm16-9h2v20h-2z"/><path d="M11 4h2v18h-2z"/><path d="M4 20h16v2H4z"/></g></svg>', sa = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M207 50.25A87.46 87.46 0 0 0 144.6 24h-.33A87.48 87.48 0 0 0 82 49.81L20.61 112a16 16 0 0 0 .06 22.56l28.66 28.66a15.92 15.92 0 0 0 11.32 4.69h.09a16 16 0 0 0 11.36-4.82l60.9-62.4a16.08 16.08 0 0 1 22.41-.21a15.6 15.6 0 0 1 4.73 11.19a16.9 16.9 0 0 1-4.85 12L93 183.88a16 16 0 0 0-.17 22.79l28.66 28.66a16.06 16.06 0 0 0 22.52.12l61.8-60.45c34.45-34.5 34.98-90.44 1.19-124.75M60.65 151.89L32 123.24l29.42-29.81l28.48 28.48ZM132.79 224l-28.68-28.65l30.13-29.13l28.49 28.48Z"/></svg>', Kt = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 640 640"><path d="M0 0h640v640H0z" fill="none" /><path fill="currentColor" d="M535.6 85.7c-21.9-21.9-57.3-21.9-79.2 0L432 110.1l97.9 97.9l24.4-24.4c21.9-21.9 21.9-57.3 0-79.2zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L496 241.9L398.1 144zM160 128c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32z" /></svg>', ra = '<svg width="48mm" height="48mm" viewBox="0 0 48 48" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="layer1"><path id="path2" fill="currentColor" style="stroke-width:2.3195" d="m 20.890715,15.528251 -0.166399,0.0088 -0.129707,0.0088 -0.255282,0.04392 -0.199471,0.05219 -0.02997,0.01757 -0.02532,0.0047 -0.180867,0.07028 -0.04186,0.02636 -0.02584,0.0088 -18.5559738,9.277987 a 2.3195042,2.3195042 0 0 0 0,4.147033 l 18.5559738,9.277987 a 2.3195042,2.3195042 0 0 0 2.073775,0 L 40.465747,29.1946 a 2.3195042,2.3195042 0 0 0 0,-4.147033 l -5.209501,-2.604492 -4.774902,4.780586 c -0.61342,0.60353 -1.355493,1.068182 -2.166793,1.335319 l -8.786027,2.928504 c -0.860773,0.286923 -1.800232,0.0695 -2.433443,-0.573609 -0.633208,-0.643104 -0.861048,-1.58308 -0.574126,-2.43396 l 2.928504,-8.78551 c 0.267138,-0.821195 0.732308,-1.563265 1.335836,-2.166793 l 1.546675,-1.546675 -0.422196,-0.211357 -0.02791,-0.0088 -0.03721,-0.01757 -0.115755,-0.04393 -0.0677,-0.03514 -0.02791,-0.0047 -0.02791,-0.01757 -0.199471,-0.05219 -0.257349,-0.04392 c -0.08504,-0.01169 -0.171251,-0.01757 -0.257865,-0.01757 z M 39.569678,34.087325 A 2.3195042,2.3195042 0 0 0 38.394039,34.32762 L 20.872111,43.083675 3.3532837,34.330204 a 2.3195042,2.3195042 0 0 0 -2.0737752,4.147034 l 18.5559735,9.277987 a 2.3195042,2.3195042 0 0 0 2.073775,0 L 40.46523,38.477238 a 2.3195042,2.3195042 0 0 0 1.03663,-3.110405 l 0.0026,-0.0021 a 2.3195042,2.3195042 0 0 0 -1.934765,-1.277441 z" /><path fill="currentColor" d="m 45.219806,1.3000621 c -1.733413,-1.73341614 -4.535371,-1.73341614 -6.268788,0 l -1.931292,1.9312921 7.74892,7.7489198 1.931291,-1.931295 c 1.733417,-1.7334133 1.733417,-4.5353728 0,-6.268789 z M 21.537721,18.713361 c -0.482823,0.482823 -0.854834,1.076457 -1.068544,1.733413 l -2.34288,7.02864 c -0.229538,0.680704 -0.04749,1.432641 0.459078,1.947124 0.506569,0.514484 1.258506,0.688615 1.947124,0.459077 l 7.02864,-2.342879 c 0.64904,-0.21371 1.242677,-0.58572 1.733413,-1.068544 L 42.085412,13.663503 34.336494,5.9145853 Z" id="path2-6" style="stroke-width:0.0791513" /></g></svg>', oa = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M21 18.3V5.7c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H5.7c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7v12.6c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1h12.6c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7m-2 0c-.3.2-.5.4-.7.7H5.7c-.2-.3-.4-.5-.7-.7V5.7c.3-.2.5-.4.7-.7h12.6c.2.3.4.5.7.7zM14 9V8c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h1v-3c0-1.1.9-2 2-2zm2 1h-5c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1" /></svg>', aa = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18.3v-6.6c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H15V5.7c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H5.7c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7v6.6c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1H9v3.3c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1h6.6c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7M5.7 13c-.2-.3-.4-.5-.7-.7V5.7c.3-.2.5-.4.7-.7h6.6c.2.3.4.5.7.7V9h-1.3c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7V13zm7.3-.7c-.3.2-.5.4-.7.7H11v-1.3c.3-.2.5-.4.7-.7H13zm-.7 2.7c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7V11h3.3c.2.3.4.5.7.7v6.6c-.3.2-.5.4-.7.7h-6.6c-.2-.3-.4-.5-.7-.7V15z"/></svg>', ln = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>', la = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10s10-4.49 10-10S17.51 2 12 2m0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8"/></svg>', li = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" y1="13.5" x2="6" y2="21"/><line x1="18" y1="12" x2="21" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.05-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>', Zt = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.36z"/></svg>', ca = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l2.09 5.91L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-2.09z"/><path fill="currentColor" d="M18 14l.94 2.56L21.5 17.5l-2.56.94L18 21l-.94-2.56L14.5 17.5l2.56-.94z"/></svg>', ha = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/><path fill="currentColor" d="M15.5 8.5l-2 5l-5 2l2-5z"/></svg>', da = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>', hs = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"/></svg>', ua = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3v6a6 6 0 1 0 12 0V3M6 7h4m4 0h4"/></svg>', pa = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8l-4 4l4 4m8-8l4 4l-4 4M4 12h16"/></svg>', ga = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.56 3.69a9 9 0 0 0-2.92 1.95m-1.95 2.92a9 9 0 0 0-.69 3.44m.69 3.44a9 9 0 0 0 1.95 2.92m2.92 1.95a9 9 0 0 0 3.44.69m3.44-.69a9 9 0 0 0 2.92-1.95m1.95-2.92a9 9 0 0 0 .69-3.44m-.69-3.44a9 9 0 0 0-1.95-2.92m-2.92-1.95A9 9 0 0 0 12 3"/></svg>', fa = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5M3 16h7a2 2 0 1 1-2 2"/></svg>';
Z.prototype.transition = ni;
class cn {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "rendererOptions");
    h(this, "graphSvgRenderer");
    h(this, "clusterDrawer");
    h(this, "renderCB");
    /** Pending frame for the debounced collision reheat, if any. */
    h(this, "collisionReheatFrame", null);
    var i;
    this.graphSvgRenderer = n, this.graph = e, this.rendererOptions = t, this.renderCB = (i = this.rendererOptions) == null ? void 0 : i.renderNode, this.clusterDrawer = new H(this);
  }
  render(t, e) {
    var n, i;
    if (this.renderCB) {
      const s = t.append("foreignObject"), o = (n = this == null ? void 0 : this.renderCB) == null ? void 0 : n.call(this, e);
      s.attr("width", 20).attr("height", 20), typeof o == "string" ? s.text(o) : o instanceof HTMLElement && ((i = s.node()) == null || i.append(o));
      const a = 300, l = (d) => {
        const c = s.node();
        if (!c || !c.isConnected) return;
        const u = c.firstElementChild;
        if (!u) return;
        const p = u.getBoundingClientRect();
        if ((p.width === 0 || p.height === 0) && d < a) {
          requestAnimationFrame(() => l(d + 1));
          return;
        }
        const g = Math.ceil(p.width), f = Math.ceil(p.height);
        if (!(g === 0 || f === 0) && (s.attr("width", g).attr("height", f), s.attr("x", -g / 2).attr("y", -f / 2), !e.hasChildren() || !e.expanded)) {
          const v = 0.5 * Math.max(g, f);
          e.getCircleRadius() !== v && (e.setCircleRadius(v), this.scheduleCollisionReheat());
        }
      };
      requestAnimationFrame(() => l(0));
    } else
      this.defaultNodeRender(t, e), requestAnimationFrame(() => {
        const s = t.node();
        if (!s) return;
        let o = 50, a = 50;
        const l = s.querySelector(".node").getBBox();
        l.width > 0 && l.height > 0 && (o = Math.ceil(l.width), a = Math.ceil(l.height)), this.rendererOptions.enableNodeExpansion && (!e.hasChildren() || !e.expanded) && (this.getNodeStyle(e).shape == "square" ? e.setCircleRadius(Math.SQRT1_2 * Math.max(o, a)) : e.setCircleRadius(0.5 * Math.max(o, a)));
      });
    if (this.rendererOptions.enableNodeExpansion && e.hasChildren()) {
      if (e.expanded) {
        const s = this.clusterDrawer.render(t, e, () => {
          cn.handleChildrenExpanded(this.graph, e, s);
        });
        requestAnimationFrame(() => {
          H.updateToNewRadiusExpanded(this.graph, e);
        });
      }
      requestAnimationFrame(() => {
        this.addExpandCollapseIcons(t, e);
      });
    }
  }
  /**
   * Reheat the sim once so collision re-spaces custom nodes whose radius was
   * just set from their measured size. Custom nodes measure asynchronously (and
   * on different frames), so this is debounced to one reheat after the last
   * measurement lands, and is a no-op when the simulation is disabled.
   */
  scheduleCollisionReheat() {
    this.collisionReheatFrame !== null && cancelAnimationFrame(this.collisionReheatFrame), this.collisionReheatFrame = requestAnimationFrame(() => {
      var t;
      this.collisionReheatFrame = null, (t = this.graph.simulation) == null || t.refreshForcesAndReheat();
    });
  }
  updatePositions(t) {
    t.attr("transform", (e) => {
      const n = e.x && isFinite(e.x) ? e.x : 0, i = e.y && isFinite(e.y) ? e.y : 0;
      return `translate(${n},${i})`;
    });
  }
  defaultNodeRender(t, e) {
    const n = this.getNodeStyle(e);
    this.genericNodeRender(t, n, e);
  }
  mergeNodeStylingOptions(t) {
    return {
      shape: (t == null ? void 0 : t.shape) ?? this.rendererOptions.defaultNodeStyle.shape,
      strokeColor: (t == null ? void 0 : t.strokeColor) ?? this.rendererOptions.defaultNodeStyle.strokeColor,
      strokeWidth: (t == null ? void 0 : t.strokeWidth) ?? this.rendererOptions.defaultNodeStyle.strokeWidth,
      fontFamily: (t == null ? void 0 : t.fontFamily) ?? this.rendererOptions.defaultNodeStyle.fontFamily,
      size: (t == null ? void 0 : t.size) ?? this.rendererOptions.defaultNodeStyle.size,
      color: (t == null ? void 0 : t.color) ?? this.rendererOptions.defaultNodeStyle.color,
      textColor: (t == null ? void 0 : t.textColor) ?? this.rendererOptions.defaultNodeStyle.textColor,
      textAnchorPosition: (t == null ? void 0 : t.textAnchorPosition) ?? this.rendererOptions.defaultNodeStyle.textAnchorPosition,
      textHorizontalShift: (t == null ? void 0 : t.textHorizontalShift) ?? this.rendererOptions.defaultNodeStyle.textHorizontalShift,
      textVerticalShift: (t == null ? void 0 : t.textVerticalShift) ?? this.rendererOptions.defaultNodeStyle.textVerticalShift,
      textRotateDegree: (t == null ? void 0 : t.textRotateDegree) ?? this.rendererOptions.defaultNodeStyle.textRotateDegree,
      iconUnicode: (t == null ? void 0 : t.iconUnicode) ?? this.rendererOptions.defaultNodeStyle.iconUnicode,
      iconClass: (t == null ? void 0 : t.iconClass) ?? this.rendererOptions.defaultNodeStyle.iconClass,
      svgIcon: (t == null ? void 0 : t.svgIcon) ?? this.rendererOptions.defaultNodeStyle.svgIcon,
      imagePath: (t == null ? void 0 : t.imagePath) ?? this.rendererOptions.defaultNodeStyle.imagePath,
      imageFit: (t == null ? void 0 : t.imageFit) ?? this.rendererOptions.defaultNodeStyle.imageFit,
      text: (t == null ? void 0 : t.text) ?? this.rendererOptions.defaultNodeStyle.text,
      html: (t == null ? void 0 : t.html) ?? this.rendererOptions.defaultNodeStyle.html
    };
  }
  computeNodeStyle(t) {
    let e = {};
    if (this.rendererOptions.nodeStyleMap && typeof this.rendererOptions.nodeTypeAccessor == "function") {
      const s = this.rendererOptions.nodeTypeAccessor(t);
      s && (e = this.rendererOptions.nodeStyleMap[s] ?? {});
    }
    const n = t.getStyle();
    let i = {};
    return n.styleCb ? i = n.styleCb(t) : i = {
      shape: (n == null ? void 0 : n.shape) ?? (e == null ? void 0 : e.shape),
      strokeColor: (n == null ? void 0 : n.strokeColor) ?? (e == null ? void 0 : e.strokeColor),
      strokeWidth: (n == null ? void 0 : n.strokeWidth) ?? (e == null ? void 0 : e.strokeWidth),
      fontFamily: (n == null ? void 0 : n.fontFamily) ?? (e == null ? void 0 : e.fontFamily),
      size: (n == null ? void 0 : n.size) ?? (e == null ? void 0 : e.size),
      color: (n == null ? void 0 : n.color) ?? (e == null ? void 0 : e.color),
      textColor: (n == null ? void 0 : n.textColor) ?? (e == null ? void 0 : e.textColor),
      textAnchorPosition: (n == null ? void 0 : n.textAnchorPosition) ?? (e == null ? void 0 : e.textAnchorPosition),
      textHorizontalShift: (n == null ? void 0 : n.textHorizontalShift) ?? (e == null ? void 0 : e.textHorizontalShift),
      textVerticalShift: (n == null ? void 0 : n.textVerticalShift) ?? (e == null ? void 0 : e.textVerticalShift),
      textRotateDegree: (n == null ? void 0 : n.textRotateDegree) ?? (e == null ? void 0 : e.textRotateDegree),
      iconUnicode: (n == null ? void 0 : n.iconUnicode) ?? (e == null ? void 0 : e.iconUnicode),
      iconClass: (n == null ? void 0 : n.iconClass) ?? (e == null ? void 0 : e.iconClass),
      svgIcon: (n == null ? void 0 : n.svgIcon) ?? (e == null ? void 0 : e.svgIcon),
      imagePath: (n == null ? void 0 : n.imagePath) ?? (e == null ? void 0 : e.imagePath),
      imageFit: (n == null ? void 0 : n.imageFit) ?? (e == null ? void 0 : e.imageFit),
      text: (n == null ? void 0 : n.text) ?? (e == null ? void 0 : e.text),
      html: (n == null ? void 0 : n.html) ?? (e == null ? void 0 : e.html)
    }, this.mergeNodeStylingOptions(i);
  }
  getNodeStyle(t) {
    const e = this.computeNodeStyle(t);
    return typeof e.shape == "function" && (e.shape = e.shape(t)), e.strokeWidth = e.strokeWidth !== void 0 ? K(e.strokeWidth.toString(), t) ?? "var(--pvt-node-stroke-width, 2)" : "var(--pvt-node-stroke-width, 2)", e.strokeColor = e.strokeColor !== void 0 ? K(e.strokeColor, t) ?? "var(--pvt-node-stroke, #fff)" : "var(--pvt-node-stroke, #fff)", e.size = e.size !== void 0 ? it(e.size, t) ?? 10 : 10, e.color = e.color !== void 0 ? K(e.color, t) ?? "var(--pvt-node-color, #007acc)" : "var(--pvt-node-color, #007acc)", e.textColor = e.textColor !== void 0 ? K(e.textColor, t) ?? "var(--pvt-node-text-color, #fff)" : "var(--pvt-node-text-color, #fff)", e.textAnchorPosition = e.textAnchorPosition !== void 0 ? K(e.textAnchorPosition, t) : "middle", e.textHorizontalShift = e.textHorizontalShift !== void 0 ? it(e.textHorizontalShift, t) ?? 0 : 0, e.textVerticalShift = e.textVerticalShift !== void 0 ? it(e.textVerticalShift, t) ?? 0 : 0, e.textRotateDegree = e.textRotateDegree !== void 0 ? it(e.textRotateDegree, t) ?? 0 : 0, e.text = e.text !== void 0 ? K(e.text, t) : void 0, e.iconUnicode = e.iconUnicode !== void 0 ? K(e.iconUnicode, t) : void 0, e.iconClass = e.iconClass !== void 0 ? K(e.iconClass, t) : void 0, e.svgIcon = e.svgIcon !== void 0 ? K(e.svgIcon, t) : void 0, e.imagePath = e.imagePath !== void 0 ? K(e.imagePath, t) : void 0, e.imagePath !== void 0 && !zs(e.imagePath, Ao) && (e.imagePath = void 0), e.imageFit = e.imageFit !== void 0 ? K(e.imageFit, t) : void 0, e;
  }
  isCustomShape(t) {
    return typeof t == "object" && t !== null && "d" in t;
  }
  // Draw the "image unavailable" glyph for a picture whose source failed to load, so the
  // node shows its shape + a crossed-out-picture icon rather than the browser's broken-image
  // placeholder. The broken `<image>` is hidden (not removed) so it still carries the src for
  // getNodeImageHref — keeping the preview / tooltip / lightbox fallbacks consistent.
  renderImageFallback(t, e, n) {
    var a;
    e.style("display", "none");
    const i = n.size, s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.innerHTML = li, ((a = s.children[0]) == null ? void 0 : a.nodeName) === "svg" && (s.children[0].removeAttribute("width"), s.children[0].removeAttribute("height"));
    const o = i * 1.1;
    t.append(() => s).attr("class", "node-content pvt-node-image-fallback").attr("x", -o / 2).attr("y", -o / 2).attr("width", o).attr("height", o).attr("color", n.textColor);
  }
  genericNodeRender(t, e, n) {
    var a, l, d;
    e.size = e.size, e.shape = e.shape, e.text = e.text, e.textAnchorPosition = e.textAnchorPosition, e.textHorizontalShift = e.textHorizontalShift, e.textVerticalShift = e.textVerticalShift, e.textRotateDegree = e.textRotateDegree, !!e.imagePath && e.imageFit === "frame" && (e.shape = "square");
    let s = e.shape;
    e.shape == "square" ? s = "rect" : (this.isCustomShape(e.shape) || ["triangle", "hexagon"].includes(e.shape)) && (s = "path");
    const o = t.append(s).attr("stroke", e.strokeColor).attr("stroke-width", e.strokeWidth).attr("fill", e.color).classed("node", !0);
    switch (e.shape) {
      case "circle":
        o.attr("r", e.size), n.setCircleRadius(e.size);
        break;
      case "square":
        o.attr("width", e.size * 2).attr("height", e.size * 2).attr("x", -e.size).attr("y", -e.size), n.setCircleRadius(Math.SQRT1_2 * e.size);
        break;
      case "triangle": {
        const c = [
          [0, -e.size],
          [e.size, e.size],
          [-e.size, e.size]
        ].map((u) => u.join(",")).join(" ");
        o.attr("d", `M${c}Z`), n.setCircleRadius(e.size);
        break;
      }
      case "hexagon": {
        const c = Math.PI / 3, u = Array.from({ length: 6 }, (p, g) => {
          const f = c * g;
          return [Math.cos(f) * e.size, Math.sin(f) * e.size];
        }).map((p) => p.join(",")).join(" ");
        o.attr("d", `M${u}Z`), n.setCircleRadius(e.size);
        break;
      }
      default:
        this.isCustomShape(e.shape) ? (o.attr("d", e.shape.d), n.setCircleRadius(15)) : (o.attr("r", e.size), n.setCircleRadius(e.size));
        break;
    }
    if (e.iconUnicode || e.iconClass) {
      const c = e.iconClass ? Hr(e.iconClass) : void 0, u = !!c && c.glyph !== "", p = e.iconUnicode ?? (c == null ? void 0 : c.glyph);
      if (p) {
        const g = t.append("text").attr("fill", e.textColor).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", e.size * 1.2).attr("class", "node-content icon icon-unicode").text(p);
        u && g.style("font-family", c.fontFamily).style("font-weight", c.fontWeight).style("font-style", c.fontStyle);
      }
    } else if (e.svgIcon) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      c.appendChild(Fs(e.svgIcon)), ((a = c.children[0]) == null ? void 0 : a.nodeName) === "svg" && (c.children[0].removeAttribute("width"), c.children[0].removeAttribute("height")), t.append(() => c).attr("class", "node-content").attr("x", -e.size * 0.7).attr("y", -e.size * 0.7).attr("width", e.size * 1.4).attr("height", e.size * 1.4).attr("color", e.strokeColor);
    } else if (e.imagePath) {
      const c = e.imageFit ?? "icon";
      if (c === "frame") {
        const u = e.size * 2, p = t.append("image").attr("class", "node-content").attr("xlink:href", e.imagePath).attr("preserveAspectRatio", "xMidYMid meet").attr("x", -e.size).attr("y", -e.size).attr("width", u).attr("height", u);
        p.on("error", () => this.renderImageFallback(t, p, e));
        const g = new Image();
        g.onload = () => {
          if (!g.naturalWidth || !g.naturalHeight) return;
          const f = g.naturalWidth / g.naturalHeight, v = f >= 1 ? u : u * f, y = f >= 1 ? u / f : u;
          p.attr("x", -v / 2).attr("y", -y / 2).attr("width", v).attr("height", y), o.attr("x", -v / 2).attr("y", -y / 2).attr("width", v).attr("height", y), n.setCircleRadius(0.5 * Math.max(v, y));
        }, g.src = e.imagePath;
      } else {
        const u = c === "icon" ? e.size * 1.2 : e.size * 2, p = c === "cover" ? "xMidYMid slice" : "xMidYMid meet", g = t.append("image").attr("class", "node-content").attr("xlink:href", e.imagePath).attr("x", -u / 2).attr("y", -u / 2).attr("width", u).attr("height", u).attr("preserveAspectRatio", p);
        g.on("error", () => this.renderImageFallback(t, g, e));
      }
    } else if (e.html) {
      const c = t.append("foreignObject").attr("class", "node-content"), u = e.html(n);
      c.attr("width", e.size * 2).attr("height", e.size * 2).attr("x", -e.size).attr("y", -e.size), typeof u == "string" ? c.text(u) : u instanceof HTMLElement && ((l = c.node()) == null || l.append(u));
    }
    if (e.text) {
      const c = t.append("g").classed("pvt-node-label-group", !0), u = Math.abs(e.textVerticalShift) >= 1 || Math.abs(e.textHorizontalShift) >= 1, [p, g] = this.computeTextLayout(e.text, e.size, u), f = e.textHorizontalShift * (e.size + p / 2 * 1.2), v = -e.textVerticalShift * (e.size + p / 2 * 1.2), b = (d = c.append("text").attr("class", "pvt-node-label").attr("text-anchor", e.textAnchorPosition).attr("x", f).attr("y", v).attr("dominant-baseline", "central").attr("font-size", p).attr("font-family", e.fontFamily).attr("fill", u ? Wn.color : e.textColor).text(g).node()) == null ? void 0 : d.getBBox();
      u && b && c.insert("rect", "text").attr("x", b.x - 4).attr("y", b.y - 2).attr("width", b.width + 8).attr("height", b.height + 4).attr("fill", Wn.backgroundColor).attr("rx", 2).attr("ry", 2), c.attr("data-pvt-label-outside", u ? "1" : "0").attr("data-pvt-label-x", f).attr("data-pvt-label-y", v).attr("data-pvt-label-rotate", e.textRotateDegree).attr("transform", `rotate(${e.textRotateDegree}, ${f}, ${v})`);
    }
  }
  /**
   * This method is called on every node
   * Each node takes care of its own state, otherwise each node gets set multiple times
   * Each node takes care only of edges out, to avoid setting twice the same edge (for from and to nodes)
   */
  checkForHighlight(t, e) {
    var o, a, l;
    const n = this.isNodeSelected(e), i = this.isNodeAdjacentToSelection(e), s = this.getSelectedNodeIDs().length !== 0;
    (o = e.getGraphElement()) == null || o.classList.toggle("pvt-node-selected-highlight", n), this.rendererOptions.enableFocusMode && s ? (a = e.getGraphElement()) == null || a.classList.toggle("pvt-node-selected-highlight-shadow", !n && !i) : (l = e.getGraphElement()) == null || l.classList.toggle("pvt-node-selected-highlight-shadow", !1), e.getEdgesOut().forEach((d) => {
      var u, p;
      const c = this.isEdgeAdjacentToSelection(d);
      this.rendererOptions.enableFocusMode && s ? (u = d.getGraphElement()) == null || u.classList.toggle("pvt-edge-selected-highlight-shadow", !c) : (p = d.getGraphElement()) == null || p.classList.toggle("pvt-edge-selected-highlight-shadow", !1);
    });
  }
  getSelectedNodeIDs() {
    const e = this.graphSvgRenderer.getGraphInteraction().getSelectedNodeIDs();
    return Array.isArray(e) ? e : [];
  }
  isNodeSelected(t) {
    return this.getSelectedNodeIDs().includes(t.id);
  }
  isNodeAdjacentToSelection(t) {
    return t.getEdgesOut().some((e) => this.isNodeSelected(e.to)) || t.getEdgesIn().some((e) => this.isNodeSelected(e.from));
  }
  isEdgeAdjacentToSelection(t) {
    return this.isNodeSelected(t.from) || this.isNodeSelected(t.to);
  }
  computeTextLayout(t, e, n = !1) {
    const i = e * 0.9, s = n ? i * 5 : i * 2, o = Math.max(12, i * 0.5), a = o * 0.55, l = Math.floor(s / a) - 1;
    if (t.length > l && t.length > 7) {
      const d = Math.max(6, s / a) - 1, c = 3, u = d - c, p = t.slice(0, u) + "…" + t.slice(t.length - c);
      p.length < t.length && (t = p);
    }
    return [o, t];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addExpandCollapseIcons(t, e) {
    const s = (o, a) => {
      this.graph.UIManager.tooltip && this.graph.UIManager.tooltip.hide(o), this.graph.toggleExpandNode(o), a || (this.graph.simulation.reheat(0.05), this.graph.simulation.isFitViewOnExpandCollapse() && this.graph.renderer.fitAndCenterWhenSettled());
    };
    t.each((o, a, l) => {
      const d = Z(l[a]);
      d.selectAll(":scope > .node-icon").remove();
      const c = (o.getCircleRadius() + 2) / Math.sqrt(2), u = d.append("g").classed("node-icon", !0).classed(o.expanded ? "collapse-icon" : "expand-icon", !0).attr("transform", o.expanded ? `translate(${c}, ${c})` : `translate(${c}, ${-c})`);
      u.append("title").text(o.expanded ? "Collapse nodes" : "Expand node"), u.append("circle").attr("r", 8).style("cursor", "pointer").on("click", (p) => {
        p.stopPropagation(), s(o, !o.expanded);
      }), d.select(o.expanded ? ":scope > .collapse-icon" : ":scope > .expand-icon").append("text").text(o.expanded ? "-" : "+");
    });
  }
  static handleChildrenExpanded(t, e, n) {
    t.simulation.reheat(0.1);
    const i = Number(n.attr("_final_r")), o = (i + 2) / Math.sqrt(2), a = e.getGraphElement(), l = a == null ? void 0 : a.querySelector("& > .node");
    l && Z(l).transition().duration(250).on("end", () => {
      t.simulation.isFitViewOnExpandCollapse() && t.renderer.fitAndCenterWhenSettled();
    }).attr("transform", `translate(${-o}, ${-o})`), a == null || a.querySelectorAll(":scope > .node-content").forEach((p) => {
      Z(p).transition().duration(250).attr("transform", `translate(${-o}, ${-o})`);
    });
    const d = a == null ? void 0 : a.querySelector(":scope > .pvt-node-label-group");
    if (d) {
      const p = d.getAttribute("data-pvt-label-outside") === "1", g = Number(d.getAttribute("data-pvt-label-x")) || 0, f = Number(d.getAttribute("data-pvt-label-y")) || 0, v = Number(d.getAttribute("data-pvt-label-rotate")) || 0;
      let y;
      if (p) {
        const b = -o - Math.abs(g), k = -o - Math.abs(f);
        y = `translate(${b - g}, ${k - f})`;
      } else
        y = `translate(${-o}, ${-o})`;
      Z(d).transition().duration(250).attr("transform", `${y} rotate(${v}, ${g}, ${f})`);
    }
    const c = a == null ? void 0 : a.querySelector("& > .node-icon");
    c && Z(c).transition().duration(250).attr("transform", e.expanded ? `translate(${o}, ${o})` : `translate(${o}, ${-o})`);
    const u = e.getSubgraph();
    u && u.simulation.getSimulation().force("constrainParent", Vn(Number(i), 10));
  }
}
function ma(r) {
  return r * Math.PI / 180;
}
function kt(r) {
  for (; r < 0; ) r += 2 * Math.PI;
  for (; r >= 2 * Math.PI; ) r -= 2 * Math.PI;
  return r;
}
function va(r) {
  let { rx: t, ry: e } = r;
  const { xAxisRotation: n, from: i, to: s } = r, o = ma(n), a = Math.cos(o), l = Math.sin(o), d = (i.x - s.x) / 2, c = (i.y - s.y) / 2, u = a * d + l * c, p = -l * d + a * c;
  let g = t * t, f = e * e;
  const v = u * u, y = p * p, b = v / g + y / f;
  if (b > 1) {
    const ce = Math.sqrt(b);
    t *= ce, e *= ce, g = t * t, f = e * e;
  }
  const k = 1, C = g * f - g * y - f * v, T = g * y + f * v, I = k * Math.sqrt(Math.max(0, C / T)), N = I * (t * p / e), O = I * (-(e * u) / t), re = a * N - l * O + (i.x + s.x) / 2, Ne = l * N + a * O + (i.y + s.y) / 2;
  function Me(ce, Ue, je, qe) {
    const It = ce * je + Ue * qe, fn = Math.sqrt(ce * ce + Ue * Ue) * Math.sqrt(je * je + qe * qe);
    let We = Math.acos(Math.min(Math.max(It / fn, -1), 1));
    return ce * qe - Ue * je < 0 && (We = -We), We;
  }
  const Re = (u - N) / t, _t = (p - O) / e, gn = (-u - N) / t, j = (-p - O) / e;
  let Ae = Me(1, 0, Re, _t), ye = Me(Re, _t, gn, j);
  return ye < 0 && (ye += 2 * Math.PI), Ae = kt(Ae), ye = kt(ye), {
    cx: re,
    cy: Ne,
    startAngle: Ae,
    deltaAngle: ye,
    rx: t,
    ry: e,
    xAxisRotation: n
  };
}
function ya(r, t, e, n, i, s) {
  const o = n - r, a = i - t, l = Math.sqrt(o * o + a * a);
  if (l > e + s) return [];
  if (l < Math.abs(e - s)) return [];
  if (l === 0 && e === s) return [];
  const d = (e * e - s * s + l * l) / (2 * l), c = Math.sqrt(e * e - d * d), u = r + d * o / l, p = t + d * a / l, g = u + c * a / l, f = p - c * o / l, v = u - c * a / l, y = p + c * o / l;
  return c === 0 ? [{ x: g, y: f }] : [
    { x: g, y: f },
    { x: v, y }
  ];
}
function ba(r, t, e) {
  r = kt(r), t = kt(t);
  const n = kt(t + e);
  return e >= 0 ? t <= n ? r >= t && r <= n : r >= t || r <= n : n <= t ? r <= t && r >= n : r <= t || r >= n;
}
function wa(r, t) {
  const { cx: e, cy: n, startAngle: i, deltaAngle: s } = t;
  for (const o of r) {
    const a = Math.atan2(o.y - n, o.x - e);
    if (ba(a, i, s))
      return o;
  }
  return null;
}
function ds(r, t) {
  const e = va(r);
  if (e.rx === e.ry && e.xAxisRotation === 0) {
    const n = ya(
      e.cx,
      e.cy,
      e.rx,
      t.cx,
      t.cy,
      t.r
    ), i = wa(n, e);
    return i || null;
  } else
    return console.log("Arc is elliptical or rotated, numerical methods needed for intersection."), null;
}
function xa(r) {
  if (!r) return null;
  const t = r.getAttribute("d");
  if (!t) return null;
  const e = Ta(t);
  if (!e) return null;
  const { x0: n, y0: i, x1: s, y1: o } = e, a = s - n, l = o - i, d = {
    x: n + a / 2,
    y: i + l / 2
  };
  return {
    length: Math.sqrt(a * a + l * l),
    midpoint: d
  };
}
function ka(r) {
  if (!r) return null;
  const t = r.getAttribute("d");
  if (!t) return null;
  const e = Ca(t);
  if (!e) return null;
  const n = e.to.x - e.from.x, i = e.to.y - e.from.y, s = Math.hypot(n, i), o = e.rx, a = 2 * Math.asin(Math.min(s / (2 * o), 1)), l = o * a, d = (e.from.x + e.to.x) / 2, c = (e.from.y + e.to.y) / 2, u = Math.sqrt(Math.max(0, o * o - (s / 2) ** 2)), p = -i / s, g = n / s, f = e.sweepFlag !== e.largeArcFlag ? 1 : -1, v = d + f * u * p, y = c + f * u * g, b = Math.atan2(e.from.y - y, e.from.x - v);
  let C = Math.atan2(e.to.y - y, e.to.x - v) - b;
  for (; C > Math.PI; ) C -= 2 * Math.PI;
  for (; C < -Math.PI; ) C += 2 * Math.PI;
  e.sweepFlag && C < 0 && (C += 2 * Math.PI), !e.sweepFlag && C > 0 && (C -= 2 * Math.PI);
  const T = b + C / 2, I = {
    x: v + o * Math.cos(T),
    y: y + o * Math.sin(T)
  };
  return {
    length: l,
    midpoint: I
  };
}
function Sa(r) {
  if (!r) return null;
  const t = r.getAttribute("d");
  if (!t) return null;
  const e = Ea(t);
  if (!e) return null;
  const n = 0.5, i = Math.pow(1 - n, 3) * e.x0 + 3 * Math.pow(1 - n, 2) * n * e.px0 + 3 * (1 - n) * n * n * e.px1 + n * n * n * e.x1, s = Math.pow(1 - n, 3) * e.y0 + 3 * Math.pow(1 - n, 2) * n * e.py0 + 3 * (1 - n) * n * n * e.py1 + n * n * n * e.y1;
  return { length: Math.hypot(i, s), midpoint: { x: i, y: s } };
}
function Ca(r) {
  if (!r) return null;
  const t = ci(r);
  return t.length !== 9 || t[0][0] !== "M" || t[2][0] !== "A" ? null : {
    from: { x: parseFloat(t[0].slice(1)), y: parseFloat(t[1]) },
    to: { x: parseFloat(t[7]), y: parseFloat(t[8]) },
    rx: parseFloat(t[2].slice(1)),
    ry: parseFloat(t[3]),
    xAxisRotation: 0,
    largeArcFlag: !1,
    sweepFlag: !0
  };
}
function Ea(r) {
  if (!r) return null;
  const t = ci(r);
  return t.length !== 10 || t[0][0] !== "M" || t[3][0] !== "C" ? null : {
    x0: parseFloat(t[1]),
    y0: parseFloat(t[2]),
    x1: parseFloat(t[8]),
    y1: parseFloat(t[9]),
    px0: parseFloat(t[4]),
    py0: parseFloat(t[5]),
    px1: parseFloat(t[6]),
    py1: parseFloat(t[7])
  };
}
function Ta(r) {
  if (!r) return null;
  const t = ci(r);
  return t.length !== 6 || t[0] !== "M" || t[3] !== "L" ? null : {
    x0: parseFloat(t[1]),
    y0: parseFloat(t[2]),
    x1: parseFloat(t[4]),
    y1: parseFloat(t[5])
  };
}
function ci(r) {
  const t = [];
  let e = "", n = 0, i = r.length - 1;
  for (; n <= i && (r[n] === " " || r[n] === `
` || r[n] === "	" || r[n] === ","); ) n++;
  for (; i >= n && (r[i] === " " || r[i] === `
` || r[i] === "	" || r[i] === ","); ) i--;
  for (let s = n; s <= i; s++) {
    const o = r[s];
    o === " " || o === "," || o === `
` || o === "	" ? e && (t.push(e), e = "") : e += o;
  }
  return e && t.push(e), t;
}
function Na(r, t, e) {
  let n = !1;
  for (let i = 0, s = e.length - 1; i < e.length; s = i++) {
    const o = e[i].x, a = e[i].y, l = e[s].x, d = e[s].y;
    a > t != d > t && r < (l - o) * (t - a) / (d - a) + o && (n = !n);
  }
  return n;
}
function se(r, t) {
  var n;
  if (t.nodeHeaderMap.title)
    return K(t.nodeHeaderMap.title, r) || "Could not resolve title";
  const e = (n = r.getData()) == null ? void 0 : n.label;
  return typeof e == "string" ? e : "Optional name or label";
}
function hi(r, t) {
  var n;
  if (t.nodeHeaderMap.subtitle)
    return K(t.nodeHeaderMap.subtitle, r) || null;
  const e = (n = r.getData()) == null ? void 0 : n.description;
  return typeof e == "string" ? e : "Optional subtitle or description";
}
function St(r, t) {
  var n;
  if (t.edgeHeaderMap.title)
    return K(t.edgeHeaderMap.title, r) || "";
  const e = (n = r.getData()) == null ? void 0 : n.label;
  return typeof e == "string" ? e : "Optional name or label";
}
function Ys(r, t) {
  var n;
  if (t.edgeHeaderMap.subtitle)
    return K(t.edgeHeaderMap.subtitle, r) || null;
  const e = (n = r.getData()) == null ? void 0 : n.label;
  return typeof e == "string" ? e : "Optional subtitle or description";
}
function Xs(r) {
  var e;
  const t = (e = r.getData()) == null ? void 0 : e.label;
  return typeof t == "string" ? t : "";
}
function Ct(r, t) {
  const e = r.getData(), n = [];
  if (t.nodePropertiesMap)
    return Ds(t.nodePropertiesMap, r);
  n.push({
    name: "id",
    value: r.id
  });
  for (const [i, s] of Object.entries(e))
    i && s && n.push({
      name: i,
      value: s
    });
  return n;
}
function Yn(r, t) {
  const e = r.getData(), n = [];
  if (t.edgePropertiesMap)
    return Ds(t.edgePropertiesMap, r);
  n.push({
    name: "id",
    value: r.id
  });
  for (const [i, s] of Object.entries(e))
    i && s && n.push({
      name: i,
      value: s
    });
  return n;
}
function Ma(r, t, e) {
  const n = r.trim().toLowerCase();
  return t.find((i) => {
    if (i.id.toLowerCase() === n)
      return !0;
    const s = se(i, e);
    return typeof s == "string" && s.trim().toLowerCase() === n;
  });
}
class Aa {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "rendererOptions");
    h(this, "graphSvgRenderer");
    h(this, "renderLabelCB");
    var i;
    this.graphSvgRenderer = n, this.graph = e, this.rendererOptions = t, this.renderLabelCB = (i = this.rendererOptions) == null ? void 0 : i.renderLabel;
  }
  render(t, e) {
    this.defaultEdgeRender(t, e);
  }
  defaultEdgeRender(t, e) {
    var o, a;
    const n = this.getEdgeStyle(e), i = this.getLabelStyle(e), s = this.genericEdgeRender(t, n);
    if ((this.graph.getOptions().isDirected || e.directed) && this.drawEdgeMarker(s, n, e), this.renderLabelCB) {
      const l = t.append("g").classed("label-container", !0).append("foreignObject"), d = (o = this == null ? void 0 : this.renderLabelCB) == null ? void 0 : o.call(this, e);
      l.attr("width", 200).attr("height", 100), typeof d == "string" ? l.text(d) : d instanceof HTMLElement && ((a = l.node()) == null || a.append(d)), requestAnimationFrame(() => {
        const c = l.node();
        if (!c) return;
        const u = c.firstElementChild;
        if (!u) return;
        const p = u.getBoundingClientRect(), g = Math.ceil(p.width), f = Math.ceil(p.height);
        l.attr("width", g).attr("height", f), l.attr("x", -g / 2).attr("y", -f / 2), this.highlightSelection(t, e);
      });
    } else
      this.defaultLabelRender(t, e, i), this.highlightSelection(t, e);
  }
  getLabelStyle(t) {
    var i, s, o, a;
    let e;
    const n = t.getLabelStyle();
    return n && n.styleCb ? e = n.styleCb(t) : e = {
      backgroundColor: (i = t.getLabelStyle()) == null ? void 0 : i.backgroundColor,
      fontSize: (s = t.getLabelStyle()) == null ? void 0 : s.fontSize,
      fontFamily: (o = t.getLabelStyle()) == null ? void 0 : o.fontFamily,
      color: (a = t.getLabelStyle()) == null ? void 0 : a.color
    }, this.mergeLabelStylingOptions(e);
  }
  mergeLabelStylingOptions(t) {
    return {
      backgroundColor: (t == null ? void 0 : t.backgroundColor) ?? this.rendererOptions.defaultLabelStyle.backgroundColor,
      fontSize: (t == null ? void 0 : t.fontSize) ?? this.rendererOptions.defaultLabelStyle.fontSize,
      fontFamily: (t == null ? void 0 : t.fontFamily) ?? this.rendererOptions.defaultLabelStyle.fontFamily,
      color: (t == null ? void 0 : t.color) ?? this.rendererOptions.defaultLabelStyle.color
    };
  }
  getEdgeStyle(t) {
    var s;
    let e;
    const n = t.getEdgeStyle();
    n && n.styleCb ? e = n.styleCb(t) : e = {
      strokeColor: n == null ? void 0 : n.strokeColor,
      strokeWidth: n == null ? void 0 : n.strokeWidth,
      opacity: n == null ? void 0 : n.opacity,
      curveStyle: n == null ? void 0 : n.curveStyle,
      dashed: n == null ? void 0 : n.dashed,
      animateDash: n == null ? void 0 : n.animateDash,
      rotateLabel: n == null ? void 0 : n.rotateLabel,
      markerEnd: n == null ? void 0 : n.markerEnd,
      markerStart: n == null ? void 0 : n.markerStart
    };
    const i = this.mergeEdgeStylingOptions(e);
    if (i.strokeColor = i.strokeColor !== void 0 ? K(i.strokeColor, t) ?? "var(--pvt-edge-stroke, #999)" : "var(--pvt-edge-stroke, #999)", i.strokeWidth = i.strokeWidth !== void 0 ? it(i.strokeWidth, t) ?? 2 : 2, i.opacity = i.opacity !== void 0 ? it(i.opacity, t) ?? 1 : 1, i.curveStyle = i.curveStyle !== void 0 ? K(i.curveStyle, t) : "bidirectional", i.markerEnd = i.markerEnd !== void 0 ? K(i.markerEnd, t) : void 0, i.markerStart = i.markerStart !== void 0 ? K(i.markerStart, t) : void 0, i.dashed = i.dashed !== void 0 ? Yt(i.dashed, t) : void 0, i.animateDash = i.animateDash !== void 0 ? Yt(i.animateDash, t) : void 0, t.to.parentNode && t.to.parentNode === t.from) {
      i.curveStyle = "straight";
      const a = (s = (t.getSubgraphFromNode() ?? t.from).getGraphElement()) == null ? void 0 : s.querySelector(".node");
      a && (i.strokeColor = getComputedStyle(a).fill, i.markerStart = "bigcircle", i.markerEnd = "arrow");
    }
    return i;
  }
  mergeEdgeStylingOptions(t) {
    return {
      strokeColor: (t == null ? void 0 : t.strokeColor) ?? this.rendererOptions.defaultEdgeStyle.strokeColor,
      strokeWidth: (t == null ? void 0 : t.strokeWidth) ?? this.rendererOptions.defaultEdgeStyle.strokeWidth,
      opacity: (t == null ? void 0 : t.opacity) ?? this.rendererOptions.defaultEdgeStyle.opacity,
      curveStyle: (t == null ? void 0 : t.curveStyle) ?? this.rendererOptions.defaultEdgeStyle.curveStyle,
      dashed: (t == null ? void 0 : t.dashed) ?? this.rendererOptions.defaultEdgeStyle.dashed,
      animateDash: (t == null ? void 0 : t.animateDash) ?? this.rendererOptions.defaultEdgeStyle.animateDash,
      rotateLabel: (t == null ? void 0 : t.rotateLabel) ?? this.rendererOptions.defaultEdgeStyle.rotateLabel,
      markerEnd: (t == null ? void 0 : t.markerEnd) ?? this.rendererOptions.defaultEdgeStyle.markerEnd,
      markerStart: (t == null ? void 0 : t.markerStart) ?? this.rendererOptions.defaultEdgeStyle.markerStart
    };
  }
  genericEdgeRender(t, e) {
    const n = t.append("path").attr("stroke", e.strokeColor ?? "var(--pvt-edge-stroke)").attr("stroke-width", e.strokeWidth ?? "var(--pvt-edge-stroke-width)").attr("stroke-opacity", e.opacity);
    return e.dashed && (n.classed("dashed", !0), e.animateDash && n.classed("animated", !0)), n;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawEdgeMarker(t, e, n) {
    if (!this.rendererOptions.markerStyleMap)
      return;
    const i = e.markerEnd, s = e.markerStart;
    i && this.rendererOptions.markerStyleMap[i] && t.attr("marker-end", `url(#${i})`), s && this.rendererOptions.markerStyleMap[s] && t.attr("marker-start", `url(#${s})`);
  }
  updatePositions(t) {
    const e = t.selectAll("path"), n = t.selectAll("g.label-container");
    e.attr("d", (i) => this.linkPathRouter(i)), n.attr("transform", (i, s, o) => {
      const { from: a, to: l } = i, d = this.getEdgeStyle(i), c = o[s].parentNode;
      let u = null;
      c && c instanceof Element && (u = Z(c).select("path").node());
      let p, g, f = { x: 0, y: 0 }, v = 0;
      if (a === l) {
        const y = u ? Sa(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      } else if (d.curveStyle === "straight") {
        const y = u ? xa(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      } else {
        const y = u ? ka(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      }
      if (u && v > 0)
        p = f.x, g = f.y, a === l && (p += 12, g -= 4);
      else {
        const y = i.source.x ?? 0, b = i.source.y ?? 0, k = i.target.x ?? 0, C = i.target.y ?? 0;
        p = (y + k) / 2, g = (b + C) / 2;
      }
      if (p = isFinite(p) ? p : 0, g = isFinite(g) ? g : 0, d.rotateLabel) {
        const y = (i.target.x ?? 0) - (i.source.x ?? 0), b = (i.target.y ?? 0) - (i.source.y ?? 0), k = Math.atan2(b, y) * 180 / Math.PI, C = k > 90 || k < -90 ? k + 180 : k;
        return `translate(${p}, ${g}) rotate(${C})`;
      } else
        return `translate(${p}, ${g})`;
    });
  }
  linkPathRouter(t) {
    const { from: e, to: n } = t;
    if (e.x === void 0 || e.y === void 0 || n.x === void 0 || n.y === void 0)
      return null;
    if (e === n)
      return this.linkSelfLoop(t);
    const i = n.getConnectedNodes(), s = this.getEdgeStyle(t);
    return s.curveStyle === "straight" ? this.linkStraight(t) : s.curveStyle === "curved" ? this.linkArc(t) : i.filter((o) => o.id === e.id).length > 0 ? (t.updateStyle({ edge: { curveStyle: "curved" } }), this.linkArc(t)) : (t.updateStyle({ edge: { curveStyle: "straight" } }), this.linkStraight(t));
  }
  linkSelfLoop(t) {
    var O;
    const { from: e, to: n } = t, i = ((O = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : O.edge.id) === t.id;
    if (e.x === void 0 || e.y === void 0 || n.x === void 0 || n.y === void 0)
      return null;
    const s = 4 + (i ? 2 : 0), o = 4 + (i ? 2 : 0), a = e.x ?? 0, l = e.y ?? 0, d = e.getCircleRadius() ? e.getCircleRadius() : this.graphSvgRenderer.nodeDrawer.getNodeStyle(e).size, c = d + 16 * Math.log(d + 1), u = Math.max(10, 110 / Math.sqrt(d)), p = 45, g = (p + u) * Math.PI / 180, f = a + c * Math.cos(g), v = l - c * Math.sin(g), y = (p - u) * Math.PI / 180, b = a + c * Math.cos(y), k = l - c * Math.sin(y), C = a + (d + s) * Math.cos(g), T = l - (d + s) * Math.sin(g), I = a + (d + o) * Math.cos(y), N = l - (d + o) * Math.sin(y);
    return `M ${C} ${T} C ${f} ${v}, ${b} ${k}, ${I} ${N}`;
  }
  linkStraight(t) {
    var re;
    const { from: e, to: n } = t, i = ((re = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : re.edge.id) === t.id;
    if (e.x === void 0 || e.y === void 0 || n.x === void 0 || n.y === void 0)
      return null;
    const s = this.graphSvgRenderer.edgeDrawer.getEdgeStyle(t), o = this.graph.getOptions().isDirected || t.directed, a = o && s.markerEnd !== void 0, l = o && s.markerStart !== void 0, d = 4, c = 4 + (a ? 4 : 0) + (i ? 2 : 0);
    let u = n.x - e.x, p = n.y - e.y, g = Math.sqrt(u * u + p * p), f = u / g, v = p / g;
    const y = e.getCircleRadius() ? e.getCircleRadius() : this.graphSvgRenderer.nodeDrawer.getNodeStyle(e).size, b = t.getSubgraphToNode() ?? t.to, k = b.getCircleRadius() ? b.getCircleRadius() : this.graphSvgRenderer.nodeDrawer.getNodeStyle(b).size;
    g === 0 && (f = -Math.SQRT1_2, v = -Math.SQRT1_2, u = f * y, p = v * y, g = y);
    const C = g <= y;
    let T, I, N, O;
    return C ? (T = e.x + y * f, I = e.y + y * v, N = n.x + (k + c) * f, O = n.y + (k + c) * v) : (T = e.x + (y + d) * f, I = e.y + (y + d) * v, N = n.x - (k + c) * f, O = n.y - (k + c) * v), `M ${T},${I} L ${N},${O}`;
  }
  linkArc(t) {
    var c;
    const { from: e, to: n } = t, i = ((c = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : c.edge.id) === t.id;
    if (e.x === void 0 || e.y === void 0 || n.x === void 0 || n.y === void 0)
      return null;
    const s = this.graphSvgRenderer.edgeDrawer.getEdgeStyle(t), o = 4 + (s.markerStart !== void 0, 0) + (i ? 2 : 0), a = 4 + (s.markerStart !== void 0 ? 2 : 0) + (i ? 2 : 0), l = t.source.getCircleRadius() ? t.source.getCircleRadius() : this.graphSvgRenderer.nodeDrawer.getNodeStyle(e).size, d = t.target.getCircleRadius() ? t.target.getCircleRadius() : this.graphSvgRenderer.nodeDrawer.getNodeStyle(n).size;
    return this.buildArcPath({
      fromX: e.x,
      fromY: e.y,
      toX: n.x,
      toY: n.y,
      fromRadius: l,
      toRadius: d,
      drawOffsetStart: o,
      drawOffsetEnd: a
    });
  }
  buildArcPath(t) {
    const {
      fromX: e,
      fromY: n,
      toX: i,
      toY: s,
      fromRadius: o,
      toRadius: a,
      drawOffsetStart: l = 4,
      drawOffsetEnd: d = 8
    } = t, c = Math.hypot(i - e, s - n), u = {
      from: { x: e, y: n },
      to: { x: i, y: s },
      rx: c,
      ry: c,
      xAxisRotation: 0
    }, p = {
      cx: e,
      cy: n,
      r: o + l
    }, g = {
      cx: i,
      cy: s,
      r: a + d
    }, f = ds(u, p), v = ds(u, g);
    return f && v ? `
            M${f.x},${f.y}
            A${c},${c} 0 0,1
            ${v.x},${v.y}
        ` : null;
  }
  defaultLabelRender(t, e, n) {
    var l;
    const i = t.append("g").classed("label-container", !0), s = Xs(e);
    if (!s || s === "") return;
    const a = (l = i.append("text").text(s).attr("class", "pvt-edge-label").attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("font-size", n.fontSize).style("font-family", n.fontFamily).style("pointer-events", "none").style("fill", n.color).node()) == null ? void 0 : l.getBBox();
    a && i.insert("rect", "text").attr("x", a.x - 4).attr("y", a.y - 2).attr("width", a.width + 8).attr("height", a.height + 4).attr("fill", n.backgroundColor).attr("rx", 2).attr("ry", 2);
  }
  renderDefinitions() {
    this.renderMarkers();
  }
  renderMarkers() {
    if (this.rendererOptions.markerStyleMap)
      for (const t in this.rendererOptions.markerStyleMap)
        this.renderMarker(this.rendererOptions.markerStyleMap[t], t);
  }
  renderMarker(t, e) {
    var a, l, d, c, u, p, g, f, v;
    const n = this.graphSvgRenderer.defs;
    if (!n.select(`#${e}`).empty()) return;
    n.append("marker").attr("id", e).attr("viewBox", t.viewBox).attr("refX", t.refX).attr("refY", t.refY).attr("markerWidth", t.markerWidth).attr("markerHeight", t.markerHeight).attr("markerUnits", t.markerUnits || "userSpaceOnUse").attr("orient", t.orient ?? "auto").append("path").attr("d", t.pathD).attr("fill", t.fill ?? "context-stroke");
    const s = e + "_selected";
    if (!n.select(`#${s}`).empty()) return;
    n.append("marker").attr("id", s).attr("viewBox", ((a = t.selected) == null ? void 0 : a.viewBox) ?? t.viewBox).attr("refX", ((l = t.selected) == null ? void 0 : l.refX) ?? t.refX).attr("refY", ((d = t.selected) == null ? void 0 : d.refY) ?? t.refY).attr("markerWidth", ((c = t.selected) == null ? void 0 : c.markerWidth) ?? t.markerWidth).attr("markerHeight", ((u = t.selected) == null ? void 0 : u.markerHeight) ?? t.markerHeight).attr("markerUnits", (((p = t.selected) == null ? void 0 : p.markerUnits) ?? t.markerUnits) || "userSpaceOnUse").attr("orient", ((g = t.selected) == null ? void 0 : g.orient) ?? t.orient ?? "auto").append("path").attr("d", ((f = t.selected) == null ? void 0 : f.pathD) ?? t.pathD).attr("fill", ((v = t.selected) == null ? void 0 : v.fill) ?? t.fill ?? "context-stroke");
  }
  highlightSelection(t, e) {
    var n, i, s;
    if (t.classed("selected", !1), ((n = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : n.edge.id) === e.id) {
      t.classed("selected", !0);
      const o = t.selectAll("path"), a = (i = o.attr("marker-start")) == null ? void 0 : i.match(/#.*(?=\))/);
      a && o.attr("marker-start", `url(${a[0]}_selected)`);
      const l = (s = o.attr("marker-end")) == null ? void 0 : s.match(/#.*(?=\))/);
      l && o.attr("marker-end", `url(${l[0]}_selected)`);
    }
  }
}
class _a {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "rendererOptions");
    h(this, "graphSvgRenderer");
    h(this, "zoomLayer");
    h(this, "svg");
    h(this, "overlayGroup");
    h(this, "polyline");
    h(this, "enabled", !1);
    h(this, "drawing", !1);
    h(this, "points", []);
    this.graphSvgRenderer = n, this.graph = e, this.rendererOptions = t, this.zoomLayer = n.zoomGroup, this.svg = n.svg, this.overlayGroup = this.zoomLayer.append("g").attr("class", "pvt-lasso-overlay"), this.polyline = this.overlayGroup.append("polyline").style("display", "none"), this.attachEvents();
  }
  setEnabled(t) {
    this.enabled = t, t || this.clear();
  }
  attachEvents() {
    this.svg.on("pointerdown.lasso", (t) => {
      this.enabled && t.button === 0 && (this.drawing = !0, this.points = [], this.polyline.style("display", "block"), this.addPoint(t));
    }), this.svg.on("pointermove.lasso", (t) => {
      !this.enabled || !this.drawing || this.addPoint(t);
    }), this.svg.on("pointerup.lasso", () => {
      this.drawing && (this.drawing = !1, this.points.length > 2 && this.points.push(this.points[0]), this.render(), this.selectNodesInsideLasso(), this.clear());
    });
  }
  addPoint(t) {
    const e = this.graphSvgRenderer.screenToGraphCoordinates(t.clientX, t.clientY);
    this.points.push(e), this.render();
  }
  render() {
    const t = this.points.map((e) => `${e.x},${e.y}`).join(" ");
    this.polyline.attr("points", t);
  }
  clear() {
    this.points = [], this.polyline.attr("points", "").style("display", "none"), this.drawing = !1;
  }
  selectNodesInsideLasso() {
    const t = this.graph.getMutableNodes().filter((e) => Na(
      e.x ?? 0,
      e.y ?? 0,
      this.points
    )).map((e) => ({
      node: e,
      element: e.getGraphElement()
    }));
    this.graph.renderer.getGraphInteraction().selectNodes(t);
  }
}
class Ia {
  constructor(t) {
    h(this, "graph");
    h(this, "renderer");
    h(this, "graphInteraction");
    this.graph = t;
  }
  init(t, e) {
    this.renderer = t, this.graphInteraction = e, this.registerListeners();
  }
  update() {
    this.registerListeners();
  }
  registerListeners() {
    this.renderer.getOptions().dragEnabled && this.renderer.getNodeSelection().call(this.graph.simulation.createDragBehavior()), this.renderer.getOptions().interactionEnabled && (this.renderer.getNodeSelection().on("dblclick.node", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodeDbclick(n, t, e);
    }).on("click.node", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodeClick(n, t, e);
    }).on("pointerdown.node", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodePointerDown(n, t, e);
    }).on("pointerup.node", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodePointerUp(n, t, e);
    }).on("contextmenu.node", (t, e) => {
      var i;
      t.preventDefault(), t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodeContextmenu(n, t, e);
    }).on("mouseenter.node", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodeHoverIn(n, t, e);
    }).on("mouseleave.node", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.nodeHoverOut(n, t, e);
    }).on("dragging.node", (t, e) => {
      var n;
      (n = this.graphInteraction) == null || n.dragging(t, e);
    }), this.renderer.getEdgeSelection().on("dblclick.edge", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.edgeDbclick(n, t, e);
    }).on("click.edge", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.edgeClick(n, t, e);
    }).on("contextmenu.edge", (t, e) => {
      var i;
      t.preventDefault(), t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.edgeContextmenu(n, t, e);
    }).on("mouseenter.edge", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.edgeHoverIn(n, t, e);
    }).on("mouseleave.edge", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.edgeHoverOut(n, t, e);
    }), this.renderer.getNoteSelection().on("dblclick.note", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.noteDbclick(n, t, e);
    }).on("click.note", (t, e) => {
      var i;
      t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.noteClick(n, t, e);
    }).on("pointerdown.note", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.notePointerDown(n, t, e);
    }).on("pointerup.note", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.notePointerUp(n, t, e);
    }).on("contextmenu.note", (t, e) => {
      var i;
      t.preventDefault(), t.stopPropagation();
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.noteContextmenu(n, t, e);
    }).on("mouseenter.note", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.noteHoverIn(n, t, e);
    }).on("mouseleave.note", (t, e) => {
      var i;
      const n = t.currentTarget;
      (i = this.graphInteraction) == null || i.noteHoverOut(n, t, e);
    }).on("dragging.note", (t, e) => {
      var n;
      (n = this.graphInteraction) == null || n.noteDragging(t, e);
    }), this.renderer.getNoteSelection().selectAll(".pvt-note-link-placeholder-icon").on("click.note-handle", (t) => {
      var s;
      const e = t.currentTarget, n = e.closest("g.pvt-note");
      if (!n) return;
      const i = Z(n).datum();
      t.stopPropagation(), (s = this.graphInteraction) == null || s.noteHandleClick(e, t, i);
    }).on("pointerdown.note-handle", (t) => {
      var s;
      const e = t.currentTarget, n = e.closest("g.pvt-note");
      if (!n) return;
      const i = Z(n).datum();
      t.stopPropagation(), (s = this.graphInteraction) == null || s.noteHandlePointerDown(e, t, i);
    }), this.renderer.getCanvasSelection().on("click.canvas", (t) => {
      var e;
      (e = this.graphInteraction) == null || e.canvasClick(t);
    }).on("pointerdown.canvas", (t) => {
      var e;
      (e = this.graphInteraction) == null || e.canvasPointerDown(t);
    }).on("pointerup.canvas", (t) => {
      var e;
      (e = this.graphInteraction) == null || e.canvasPointerUp(t);
    }).on("contextmenu.canvas", (t) => {
      var e;
      t.preventDefault(), (e = this.graphInteraction) == null || e.canvasContextmenu(t);
    }).on("mousemove.canvas", (t) => {
      var e;
      (e = this.graphInteraction) == null || e.canvasMousemove(t);
    }));
  }
}
class La {
  constructor(t) {
    h(this, "graph");
    h(this, "callbacks");
    h(this, "listeners");
    h(this, "lastPointerEvent", null);
    h(this, "selectedNode", null);
    h(this, "selectedEdge", null);
    h(this, "selectedNodes", []);
    h(this, "selectedEdges", []);
    h(this, "nodePointerDown", (t, e, n) => {
      const i = {
        cancelled: !1,
        cancel() {
          this.cancelled = !0;
        }
      };
      this.emit("nodePointerDown", e, n, t, i), this.callbacks.onNodePointerDown && typeof this.callbacks.onNodePointerDown == "function" && this.callbacks.onNodePointerDown(e, n, t);
    });
    h(this, "nodePointerUp", (t, e, n) => {
      this.emit("nodePointerUp", e, n, t), this.callbacks.onNodePointerUp && typeof this.callbacks.onNodePointerUp == "function" && this.callbacks.onNodePointerUp(e, n, t);
    });
    h(this, "nodeHoverIn", (t, e, n) => {
      this.emit("nodeHoverIn", e, n, t), this.callbacks.onNodeHoverIn && typeof this.callbacks.onNodeHoverIn == "function" && this.callbacks.onNodeHoverIn(e, n, t);
    });
    h(this, "nodeHoverOut", (t, e, n) => {
      this.emit("nodeHoverOut", e, n, t), this.callbacks.onNodeHoverOut && typeof this.callbacks.onNodeHoverOut == "function" && this.callbacks.onNodeHoverOut(e, n, t);
    });
    h(this, "dragging", (t, e) => {
      this.emit("dragging", t, e), this.callbacks.onNodeDragging && typeof this.callbacks.onNodeDragging == "function" && this.callbacks.onNodeDragging(t, e);
    });
    h(this, "dragended", (t, e) => {
      this.emit("dragended", t, e), this.callbacks.onNodeDragended && typeof this.callbacks.onNodeDragended == "function" && this.callbacks.onNodeDragended(t, e);
    });
    h(this, "noteHoverIn", (t, e, n) => {
      this.emit("noteHoverIn", e, n, t), this.callbacks.onNoteHoverIn && typeof this.callbacks.onNoteHoverIn == "function" && this.callbacks.onNoteHoverIn(e, n, t);
    });
    h(this, "noteHoverOut", (t, e, n) => {
      this.emit("noteHoverOut", e, n, t), this.callbacks.onNoteHoverOut && typeof this.callbacks.onNoteHoverOut == "function" && this.callbacks.onNoteHoverOut(e, n, t);
    });
    h(this, "notePointerDown", (t, e, n) => {
      this.emit("notePointerDown", e, n, t), this.callbacks.onNotePointerDown && typeof this.callbacks.onNotePointerDown == "function" && this.callbacks.onNotePointerDown(e, n, t);
    });
    h(this, "notePointerUp", (t, e, n) => {
      this.emit("notePointerUp", e, n, t), this.callbacks.onNotePointerUp && typeof this.callbacks.onNotePointerUp == "function" && this.callbacks.onNotePointerUp(e, n, t);
    });
    h(this, "noteHandlePointerDown", (t, e, n) => {
      this.emit("noteHandlePointerDown", e, n, t), this.callbacks.onNoteHandlePointerDown && typeof this.callbacks.onNoteHandlePointerDown == "function" && this.callbacks.onNoteHandlePointerDown(e, n, t);
    });
    h(this, "noteDragging", (t, e) => {
      this.emit("noteDragging", t, e), this.callbacks.onNoteDragging && typeof this.callbacks.onNoteDragging == "function" && this.callbacks.onNoteDragging(t, e);
    });
    h(this, "canvasPointerDown", (t) => {
      this.emit("canvasPointerDown", t), this.callbacks.onCanvasPointerDown && typeof this.callbacks.onCanvasPointerDown == "function" && this.callbacks.onCanvasPointerDown(t);
    });
    h(this, "canvasPointerUp", (t) => {
      this.emit("canvasPointerUp", t), this.callbacks.onCanvasPointerUp && typeof this.callbacks.onCanvasPointerUp == "function" && this.callbacks.onCanvasPointerUp(t);
    });
    this.graph = t, this.callbacks = this.graph.getCallbacks() ?? {}, this.listeners = {
      nodeClick: [],
      nodeDbclick: [],
      nodeHoverIn: [],
      nodeHoverOut: [],
      nodePointerDown: [],
      nodePointerUp: [],
      nodeSelect: [],
      nodeBlur: [],
      dragging: [],
      dragended: [],
      nodeContextmenu: [],
      edgeClick: [],
      edgeDbclick: [],
      edgeHoverIn: [],
      edgeHoverOut: [],
      edgeSelect: [],
      edgeBlur: [],
      edgeContextmenu: [],
      noteClick: [],
      noteDbclick: [],
      notePointerDown: [],
      notePointerUp: [],
      noteContextmenu: [],
      noteHoverIn: [],
      noteHoverOut: [],
      noteHandleClick: [],
      noteHandlePointerDown: [],
      noteDragging: [],
      canvasClick: [],
      canvasMousemove: [],
      canvasPointerDown: [],
      canvasPointerUp: [],
      canvasContextmenu: [],
      canvasBeforeZoom: [],
      canvasZoom: [],
      simulationTick: [],
      simulationSlowTick: [],
      selectNode: [],
      unselectNode: [],
      selectEdge: [],
      unselectEdge: [],
      selectNodes: [],
      unselectNodes: [],
      selectEdges: [],
      unselectEdges: []
    }, this.graph.UIManager.keyManager.register({ key: "Enter", callback: () => {
      this.expandNodeSelection();
    } });
  }
  on(t, e) {
    this.listeners[t].push(e);
  }
  off(t, e) {
    this.listeners[t] = this.listeners[t].filter((n) => n !== e);
  }
  getGraph() {
    return this.graph;
  }
  emit(t, ...e) {
    for (const n of this.listeners[t])
      n(...e);
  }
  nodeClick(t, e, n) {
    var s;
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeClick", e, n, t, i), !i.cancelled && (e.shiftKey ? this.addNodesToSelection([{ node: n, element: t }]) : e.altKey ? this.selectNodes([{ node: n, element: t }]) : e.ctrlKey ? this.removeNodesFromSelection([{ node: n, element: t }]) : ((s = this.getSelectedNode()) == null ? void 0 : s.node) !== n && this.selectNode(t, n), this.callbacks.onNodeClick && typeof this.callbacks.onNodeClick == "function" && this.callbacks.onNodeClick(e, n, t));
  }
  nodeDbclick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeDbclick", e, n, t, i), !i.cancelled && this.callbacks.onNodeDbclick && typeof this.callbacks.onNodeDbclick == "function" && this.callbacks.onNodeDbclick(e, n, t);
  }
  nodeContextmenu(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeContextmenu", e, n, t, i), !i.cancelled && this.callbacks.onNodeContextmenu && typeof this.callbacks.onNodeContextmenu == "function" && this.callbacks.onNodeContextmenu(e, n, t);
  }
  edgeClick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeClick", e, n, t, i), !i.cancelled && (this.selectEdge(t, n), this.callbacks.onEdgeClick && typeof this.callbacks.onEdgeClick == "function" && this.callbacks.onEdgeClick(e, n, t));
  }
  edgeDbclick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeDbclick", e, n, t, i), !i.cancelled && this.callbacks.onEdgeDbclick && typeof this.callbacks.onEdgeDbclick == "function" && this.callbacks.onEdgeDbclick(e, n, t);
  }
  edgeContextmenu(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeContextmenu", e, n, t, i), !i.cancelled && this.callbacks.onEdgeContextmenu && typeof this.callbacks.onEdgeContextmenu == "function" && this.callbacks.onEdgeContextmenu(e, n, t);
  }
  edgeHoverIn(t, e, n) {
    this.emit("edgeHoverIn", e, n, t), this.callbacks.onEdgeHoverIn && typeof this.callbacks.onEdgeHoverIn == "function" && this.callbacks.onEdgeHoverIn(e, n, t);
  }
  edgeHoverOut(t, e, n) {
    this.emit("edgeHoverOut", e, n, t), this.callbacks.onEdgeHoverOut && typeof this.callbacks.onEdgeHoverOut == "function" && this.callbacks.onEdgeHoverOut(e, n, t);
  }
  noteClick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteClick", e, n, t, i), !i.cancelled && this.callbacks.onNoteClick && typeof this.callbacks.onNoteClick == "function" && this.callbacks.onNoteClick(e, n, t);
  }
  noteDbclick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteDbclick", e, n, t, i), !i.cancelled && this.callbacks.onNoteDbclick && typeof this.callbacks.onNoteDbclick == "function" && this.callbacks.onNoteDbclick(e, n, t);
  }
  noteContextmenu(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteContextmenu", e, n, t, i), !i.cancelled && this.callbacks.onNoteContextmenu && typeof this.callbacks.onNoteContextmenu == "function" && this.callbacks.onNoteContextmenu(e, n, t);
  }
  noteHandleClick(t, e, n) {
    const i = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteHandleClick", e, n, t, i), !i.cancelled && this.callbacks.onNoteHandleClick && typeof this.callbacks.onNoteHandleClick == "function" && this.callbacks.onNoteHandleClick(e, n, t);
  }
  canvasClick(t) {
    const e = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("canvasClick", t, e), !e.cancelled && (this.unselectAll(), this.callbacks.onCanvasClick && typeof this.callbacks.onCanvasClick == "function" && this.callbacks.onCanvasClick(t));
  }
  canvasBeforeZoom(t) {
    const e = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    return this.emit("canvasBeforeZoom", t, e), e.cancelled ? !1 : (this.callbacks.onCanvasBeforeZoom && typeof this.callbacks.onCanvasBeforeZoom == "function" && this.callbacks.onCanvasBeforeZoom(t), !0);
  }
  canvasZoom(t) {
    this.emit("canvasZoom", t), this.callbacks.onCanvasZoom && typeof this.callbacks.onCanvasZoom == "function" && this.callbacks.onCanvasZoom(t);
  }
  canvasContextmenu(t) {
    const e = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("canvasContextmenu", t, e), !e.cancelled && this.callbacks.onCanvasContextmenu && typeof this.callbacks.onCanvasContextmenu == "function" && this.callbacks.onCanvasContextmenu(t);
  }
  canvasMousemove(t) {
    this.lastPointerEvent = t, this.emit("canvasMousemove", t), this.callbacks.onCanvasMousemove && typeof this.callbacks.onCanvasMousemove == "function" && this.callbacks.onCanvasMousemove(t);
  }
  simulationTick() {
    this.emit("simulationTick"), this.callbacks.onSimulationTick && typeof this.callbacks.onSimulationTick == "function" && this.callbacks.onSimulationTick();
  }
  simulationSlowTick() {
    this.emit("simulationSlowTick"), this.callbacks.onSimulationSlowTick && typeof this.callbacks.onSimulationSlowTick == "function" && this.callbacks.onSimulationSlowTick();
  }
  selectNode(t, e) {
    this.unselectAll(), this.selectedNode = {
      node: e,
      element: t
    }, this.selectedNodes = [this.selectedNode], this.emit("selectNode", e, t), this.callbacks.onNodeSelect && typeof this.callbacks.onNodeSelect == "function" && this.callbacks.onNodeSelect(e, t), this.refreshRendering();
  }
  unselectNode() {
    if (this.selectedNode === null)
      return;
    const t = this.selectedNode.node, e = this.selectedNode.element;
    this.selectedNode = null, this.selectedNodes = [], this.emit("unselectNode", t, e), this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(t, e), this.unselectFromDirectSubgraph(t), this.refreshRendering();
  }
  unselectFromAncestorSubgraphs(t) {
    var a, l;
    const e = this.buildAncestorStack(t);
    let n = this.findOutermostSubgraph(e);
    if (!n) return;
    let i;
    for (; e.length > 0 && n; ) {
      const d = e.pop();
      i = n, d && (n = (a = n.getMutableNode(d.id)) == null ? void 0 : a.getSubgraph());
    }
    if (!i) return;
    const s = i.renderer.getGraphInteraction();
    ((l = s.getSelectedNode()) == null ? void 0 : l.node.id) === t.id && s.unselectNode();
  }
  unselectFromDirectSubgraph(t) {
    var n, i;
    const e = (n = t.parentNode) == null ? void 0 : n.getSubgraph();
    if (e) {
      const s = e.renderer.getGraphInteraction();
      ((i = s.getSelectedNode()) == null ? void 0 : i.node.id) === t.id && s.unselectNode();
    }
    this.refreshRendering();
  }
  buildAncestorStack(t) {
    const e = [];
    let n = t.parentNode;
    for (; n; )
      e.push(n), n = n.parentNode;
    return e;
  }
  findOutermostSubgraph(t) {
    var e;
    for (let n = t.length - 1; n >= 0; n--) {
      const i = (e = t[n]) == null ? void 0 : e.getSubgraph();
      if (i) return i;
    }
  }
  selectNodes(t) {
    if (t.length === 1)
      return this.selectNode(t[0].element, t[0].node);
    this.unselectAll(), this.selectedNodes = t, this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, this.emit("selectNodes", this.selectedNodes), this.callbacks.onNodesSelect && typeof this.callbacks.onNodesSelect == "function" && this.callbacks.onNodesSelect(t), this.refreshRendering();
  }
  addNodesToSelection(t) {
    if (t.length == 0) return;
    if (this.selectedNodes.length === 0 && t.length === 1)
      return this.selectNode(t[0].element, t[0].node);
    const e = this.getSelectedNodeIDs() ?? [];
    t = t.filter((n) => !e.includes(n.node.id)), this.selectedNodes = this.selectedNodes.concat(t), this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, this.callbacks.onNodesSelect && typeof this.callbacks.onNodesSelect == "function" && this.callbacks.onNodesSelect(t), this.emit("selectNodes", t), this.refreshRendering();
  }
  removeNodesFromSelection(t) {
    const e = t.map((n) => n.node.id);
    this.selectedNodes = this.selectedNodes.filter((n) => !e.includes(n.node.id)), this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, t.forEach(({ node: n, element: i }) => {
      this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(n, i);
    }), this.emit("unselectNodes", t), this.refreshRendering();
  }
  selectEdge(t, e) {
    this.unselectAll(), this.selectedEdge = {
      edge: e,
      element: t
    }, this.emit("selectEdge", e, t), this.callbacks.onEdgeSelect && typeof this.callbacks.onEdgeSelect == "function" && this.callbacks.onEdgeSelect(e, t), this.refreshRendering();
  }
  selectEdges(t) {
    this.unselectAll(), this.selectedEdges = t.map((e) => ({
      edge: e[0],
      element: e[1]
    })), this.selectedEdge = this.selectedEdges.length === 1 ? this.selectedEdges[0] : null, this.emit("selectEdges", this.selectedEdges), this.selectedEdges.forEach(({ edge: e, element: n }) => {
      this.callbacks.onEdgeSelect && typeof this.callbacks.onEdgeSelect == "function" && this.callbacks.onEdgeSelect(e, n);
    }), this.refreshRendering();
  }
  unselectEdge() {
    if (this.selectedEdge === null)
      return;
    const t = this.selectedEdge.edge, e = this.selectedEdge.element;
    this.selectedEdge = null, this.emit("unselectEdge", t, e), this.callbacks.onEdgeBlur && typeof this.callbacks.onEdgeBlur == "function" && this.callbacks.onEdgeBlur(t, e), this.refreshRendering();
  }
  unselectAll() {
    this.unselectNode(), this.unselectEdge(), this.clearNodeSelectionList(), this.clearEdgeSelectionList(), this.refreshRendering();
  }
  clearNodeSelectionList() {
    const t = this.selectedNodes;
    this.selectedNodes = [], this.selectedNode = null, this.emit("unselectNodes", t), t.forEach(({ node: e, element: n }) => {
      this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(e, n);
    }), t.length && this.refreshRendering();
  }
  clearEdgeSelectionList() {
    const t = this.selectedEdges;
    this.selectedEdges = [], this.selectedEdge = null, this.emit("unselectEdges", t), t.forEach(({ edge: e, element: n }) => {
      this.callbacks.onEdgeBlur && typeof this.callbacks.onEdgeBlur == "function" && this.callbacks.onEdgeBlur(e, n);
    }), t.length && this.refreshRendering();
  }
  hasActiveMultiselection() {
    return this.selectedNodes.length > 1 || this.selectedEdges.length > 1;
  }
  refreshRendering() {
    this.graph.renderer.update(!1), this.graph.renderer.nextTick();
  }
  getSelectedNode() {
    return this.selectedNode;
  }
  getSelectedEdge() {
    return this.selectedEdge;
  }
  getSelectedNodeIDs() {
    var t;
    return ((t = this.selectedNodes) == null ? void 0 : t.map((e) => e.node.id)) ?? null;
  }
  getSelectedNodes() {
    return this.selectedNodes;
  }
  getSelectedEdgeIDs() {
    var t;
    return ((t = this.selectedEdges) == null ? void 0 : t.map((e) => e.edge.id)) ?? null;
  }
  getSelectedEdges() {
    return this.selectedEdges;
  }
  expandNodeSelection() {
    this.selectedNodes.length > 1 ? this.graph.toggleExpandNodes(this.selectedNodes.map((t) => t.node)) : this.selectedNode && this.graph.toggleExpandNode(this.selectedNode.node);
  }
  getLastPointerEvent() {
    return this.lastPointerEvent;
  }
}
class Da {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "container");
    h(this, "options");
    h(this, "layoutProgress", 0);
    h(this, "layoutProgressType", "done");
    h(this, "progressBar", null);
    h(this, "timerLabel", null);
    h(this, "textLabel", null);
    h(this, "loadingPb", null);
    this.graph = t, this.container = e, this.options = n;
  }
  /**
   * Fit-and-centre once the content has stopped resizing. Renderers that lay
   * out over several frames after the sim stops (e.g. expanded clusters)
   * override this to wait for a stable bbox; the default fits immediately.
   */
  fitAndCenterWhenSettled(t) {
    this.fitAndCenter(t);
  }
  /**
   * Release renderer-owned resources (observers, listeners) on teardown.
   * No-op by default; renderers that hold such resources override this.
   */
  destroy() {
  }
  getCanvas() {
    return this.container.querySelector(".pvt-canvas");
  }
  updateLayoutProgress(t, e, n) {
    this.layoutProgress = t, this.layoutProgressType = n, !(!this.progressBar || !this.timerLabel || !this.textLabel) && (this.progressBar.style.width = `${t * 100}%`, this.timerLabel.textContent = `Elapsed time: ${(e / 1e3).toFixed(1)} sec`, this.layoutProgressType === "simulation" ? this.textLabel.textContent = "Optimizing node positions..." : this.layoutProgressType === "rendering" ? (this.progressBar.style.width = "100%", this.textLabel.textContent = "Rendering in progress") : this.layoutProgressType === "done" && (this.progressBar.style.width = "100%", this.timerLabel.textContent = "All done"), this.toggleLayoutProgressVisibility());
  }
  toggleLayoutProgressVisibility() {
    const t = this.getZoomGroup();
    t && t.classList.toggle("hidden", this.layoutProgressType !== "done"), this.loadingPb && this.loadingPb.classList.toggle("hidden", this.layoutProgressType === "done");
  }
  setupRendering() {
    this.createHtmlProgressBar();
  }
  createHtmlProgressBar() {
    const t = this.getCanvas();
    if (!t)
      throw new Error("Canvas element is not defined in the graph renderer.");
    const e = document.createElement("div");
    e.classList.add("pvt-loading-progress-bar"), e.style.position = "absolute", e.style.left = "50%", e.style.top = "50%", e.style.transform = "translate(-50%, -50%)";
    const n = document.createElement("div");
    n.classList.add("background"), n.style.width = "100%";
    const i = document.createElement("div");
    i.classList.add("track"), n.style.width = "100%";
    const s = document.createElement("div");
    s.classList.add("fill"), s.style.width = "0px";
    const o = document.createElement("span");
    o.classList.add("label"), o.textContent = "Optimizing node positions...";
    const a = document.createElement("span");
    a.classList.add("label"), a.textContent = "Elapsed time: 0 sec", i.appendChild(s), n.appendChild(i), e.append(n, o, a), t.appendChild(e), this.progressBar = s, this.timerLabel = a, this.textLabel = o, this.loadingPb = e;
  }
}
class Ra {
}
class Oa extends Ra {
  constructor(e, n, i) {
    super();
    h(this, "renderer");
    h(this, "svg");
    h(this, "selectionBoxGroup");
    h(this, "rect", null);
    h(this, "startX", 0);
    h(this, "startY", 0);
    h(this, "isSelecting", !1);
    h(this, "selectionMode", "start");
    h(this, "onSvgMouseLeave", () => {
      this.isSelecting && this.onMouseUp();
    });
    h(this, "onMouseDown", (e) => {
      if (!this.selectionBoxGroup) return;
      if (e.shiftKey)
        this.selectionMode = "add";
      else if (e.altKey)
        this.selectionMode = "start";
      else if (e.ctrlKey) {
        if (this.selectionMode = "remove", !this.renderer.getGraphInteraction().hasActiveMultiselection())
          return;
      } else {
        this.selectionMode = "start";
        return;
      }
      e.preventDefault(), this.svg.querySelectorAll(".pvt-selection-rectangle").forEach((s) => s.remove()), this.isSelecting = !0;
      const { x: n, y: i } = this.getSvgPoint(e);
      this.startX = n, this.startY = i, this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect"), this.rect.setAttribute("x", n.toString()), this.rect.setAttribute("y", i.toString()), this.rect.setAttribute("width", "0"), this.rect.setAttribute("height", "0"), this.rect.setAttribute("class", "pvt-selection-rectangle"), this.selectionBoxGroup.appendChild(this.rect), this.svg.addEventListener("mouseleave", this.onSvgMouseLeave);
    });
    h(this, "onMouseMove", (e) => {
      if (!this.isSelecting || !this.rect) return;
      const { x: n, y: i } = this.getSvgPoint(e), s = Math.min(this.startX, n), o = Math.min(this.startY, i), a = Math.abs(n - this.startX), l = Math.abs(i - this.startY);
      this.rect.setAttribute("x", s.toString()), this.rect.setAttribute("y", o.toString()), this.rect.setAttribute("width", a.toString()), this.rect.setAttribute("height", l.toString());
    });
    h(this, "onMouseUp", () => {
      if (!this.selectionBoxGroup || !this.isSelecting || !this.rect) return;
      this.isSelecting = !1;
      const e = this.rect.getBoundingClientRect(), n = this.getNodesInRect(e).map((i) => ({
        node: i[0],
        element: i[1]
      }));
      this.selectionMode == "start" ? this.renderer.getGraphInteraction().selectNodes(n) : this.selectionMode == "add" ? this.renderer.getGraphInteraction().addNodesToSelection(n) : this.selectionMode == "remove" && this.renderer.getGraphInteraction().removeNodesFromSelection(n), this.selectionBoxGroup.removeChild(this.rect), this.rect = null, this.svg.removeEventListener("mouseleave", this.onSvgMouseLeave);
    });
    this.renderer = e, this.svg = n, this.selectionBoxGroup = i, this.init();
  }
  selectionInProgress() {
    return this.isSelecting;
  }
  init() {
    this.svg.addEventListener("mousedown", this.onMouseDown), this.svg.addEventListener("mousemove", this.onMouseMove), this.svg.addEventListener("mouseup", this.onMouseUp);
  }
  getSvgPoint(e) {
    var i;
    const n = this.svg.createSVGPoint();
    return n.x = e.clientX, n.y = e.clientY, n.matrixTransform((i = this.svg.getScreenCTM()) == null ? void 0 : i.inverse());
  }
  getNodesInRect(e) {
    const n = this.renderer.getGraphInteraction().getGraph().getMutableNodes(), i = [];
    return n.forEach((s) => {
      if (!s.x || !s.y) return;
      const o = s.getGraphElement();
      if (!o || !(o instanceof SVGGElement)) return;
      const a = o.getBoundingClientRect();
      a.x < e.x + e.width && a.x + a.width > e.x && a.y < e.y + e.height && a.y + a.height > e.y && i.push([s, o]);
    }), i;
  }
}
class ve {
  constructor(t = {}, e = ct()) {
    h(this, "id");
    h(this, "x");
    h(this, "y");
    h(this, "width");
    h(this, "height");
    h(this, "content");
    h(this, "color");
    h(this, "surface");
    h(this, "visible");
    h(this, "graphElement");
    h(this, "attachedElement");
    h(this, "editing");
    h(this, "dirty", !1);
    h(this, "attachmentDirty", !1);
    h(this, "domID");
    this.id = t.id ?? crypto.randomUUID(), this.domID = e, this.x = t.x ?? 0, this.y = t.y ?? 0, this.width = t.width ?? 220, this.height = t.height ?? 160, this.content = t.content ?? "", this.color = t.color ?? "#FDE68A", this.surface = t.surface ?? "jewel", this.visible = !0, this.attachedElement = t.attachedElement, this.editing = !1;
  }
  setPosition(t, e) {
    this.x = t, this.y = e;
  }
  setSize(t, e) {
    this.width = t, this.height = e;
  }
  setContent(t) {
    this.content = t, this.markDirty();
  }
  setColor(t) {
    this.color = t, this.markDirty();
  }
  setSurface(t) {
    this.surface = t, this.markDirty();
  }
  setGraphElement(t) {
    this.graphElement = t;
  }
  getGraphElement() {
    return document ? (this.graphElement || (this.graphElement = document.getElementById(`note-${this.domID}`)), this.graphElement) : null;
  }
  isEditing() {
    return this.editing;
  }
  setEditing(t) {
    this.editing = t;
  }
  getAttachedElement() {
    return this.attachedElement;
  }
  setAttachedElement(t) {
    this.attachedElement = t, this.markAttachmentDirty();
  }
  markDirty() {
    this.dirty = !0;
  }
  clearDirty() {
    this.dirty = !1;
  }
  isDirty() {
    return this.dirty;
  }
  markAttachmentDirty() {
    this.attachmentDirty = !0;
  }
  clearAttachmentDirty() {
    this.attachmentDirty = !1;
  }
  isAttachmentDirty() {
    return this.attachmentDirty;
  }
}
function di() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var Ge = di();
function Ks(r) {
  Ge = r;
}
var Be = { exec: () => null };
function tt(r) {
  let t = [];
  return (e) => {
    let n = Math.max(0, Math.min(3, e - 1)), i = t[n];
    return i || (i = r(n), t[n] = i), i;
  };
}
function L(r, t = "") {
  let e = typeof r == "string" ? r : r.source, n = { replace: (i, s) => {
    let o = typeof s == "string" ? s : s.source;
    return o = o.replace(ie.caret, "$1"), e = e.replace(i, o), n;
  }, getRegex: () => new RegExp(e, t) };
  return n;
}
var Pa = ((r = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + r);
  } catch {
    return !1;
  }
})(), ie = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: tt((r) => new RegExp(`^ {0,${r}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: tt((r) => new RegExp(`^ {0,${r}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)), fencesBeginRegex: tt((r) => new RegExp(`^ {0,${r}}(?:\`\`\`|~~~)`)), headingBeginRegex: tt((r) => new RegExp(`^ {0,${r}}#`)), htmlBeginRegex: tt((r) => new RegExp(`^ {0,${r}}<(?:[a-z].*>|!--)`, "i")), blockquoteBeginRegex: tt((r) => new RegExp(`^ {0,${r}}>`)) }, Fa = /^(?:[ \t]*(?:\n|$))+/, Ba = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, za = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, At = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ha = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ui = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Zs = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Qs = L(Zs).replace(/bull/g, ui).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ga = L(Zs).replace(/bull/g, ui).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), pi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, $a = /^[^\n]+/, gi = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ua = L(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", gi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ja = L(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ui).getRegex(), hn = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", fi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, qa = L("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", fi).replace("tag", hn).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Js = L(pi).replace("hr", At).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", hn).getRegex(), Wa = L(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Js).getRegex(), mi = { blockquote: Wa, code: Ba, def: Ua, fences: za, heading: Ha, hr: At, html: qa, lheading: Qs, list: ja, newline: Fa, paragraph: Js, table: Be, text: $a }, us = L("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", At).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", hn).getRegex(), Va = { ...mi, lheading: Ga, table: us, paragraph: L(pi).replace("hr", At).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", us).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", hn).getRegex() }, Ya = { ...mi, html: L(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", fi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Be, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: L(pi).replace("hr", At).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Qs).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Xa = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ka = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, er = /^( {2,}|\\)\n(?!\s*$)/, Za = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ht = /[\p{P}\p{S}]/u, dn = /[\s\p{P}\p{S}]/u, vi = /[^\s\p{P}\p{S}]/u, Qa = L(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, dn).getRegex(), tr = /(?!~)[\p{P}\p{S}]/u, Ja = /(?!~)[\s\p{P}\p{S}]/u, el = /(?:[^\s\p{P}\p{S}]|~)/u, tl = L(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Pa ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), nr = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, nl = L(nr, "u").replace(/punct/g, ht).getRegex(), il = L(nr, "u").replace(/punct/g, tr).getRegex(), ir = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", sl = L(ir, "gu").replace(/notPunctSpace/g, vi).replace(/punctSpace/g, dn).replace(/punct/g, ht).getRegex(), rl = L(ir, "gu").replace(/notPunctSpace/g, el).replace(/punctSpace/g, Ja).replace(/punct/g, tr).getRegex(), ol = L("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, vi).replace(/punctSpace/g, dn).replace(/punct/g, ht).getRegex(), al = L(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, ht).getRegex(), ll = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", cl = L(ll, "gu").replace(/notPunctSpace/g, vi).replace(/punctSpace/g, dn).replace(/punct/g, ht).getRegex(), hl = L(/\\(punct)/, "gu").replace(/punct/g, ht).getRegex(), dl = L(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ul = L(fi).replace("(?:-->|$)", "-->").getRegex(), pl = L("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ul).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Qt = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, gl = L(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", Qt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), sr = L(/^!?\[(label)\]\[(ref)\]/).replace("label", Qt).replace("ref", gi).getRegex(), rr = L(/^!?\[(ref)\](?:\[\])?/).replace("ref", gi).getRegex(), fl = L("reflink|nolink(?!\\()", "g").replace("reflink", sr).replace("nolink", rr).getRegex(), ps = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, yi = { _backpedal: Be, anyPunctuation: hl, autolink: dl, blockSkip: tl, br: er, code: Ka, del: Be, delLDelim: Be, delRDelim: Be, emStrongLDelim: nl, emStrongRDelimAst: sl, emStrongRDelimUnd: ol, escape: Xa, link: gl, nolink: rr, punctuation: Qa, reflink: sr, reflinkSearch: fl, tag: pl, text: Za, url: Be }, ml = { ...yi, link: L(/^!?\[(label)\]\((.*?)\)/).replace("label", Qt).getRegex(), reflink: L(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Qt).getRegex() }, Xn = { ...yi, emStrongRDelimAst: rl, emStrongLDelim: il, delLDelim: al, delRDelim: cl, url: L(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ps).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: L(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ps).getRegex() }, vl = { ...Xn, br: L(er).replace("{2,}", "*").getRegex(), text: L(Xn.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Ut = { normal: mi, gfm: Va, pedantic: Ya }, yt = { normal: yi, gfm: Xn, breaks: vl, pedantic: ml }, yl = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, gs = (r) => yl[r];
function Ce(r, t) {
  if (t) {
    if (ie.escapeTest.test(r)) return r.replace(ie.escapeReplace, gs);
  } else if (ie.escapeTestNoEncode.test(r)) return r.replace(ie.escapeReplaceNoEncode, gs);
  return r;
}
function fs(r) {
  try {
    r = encodeURI(r).replace(ie.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function ms(r, t) {
  var s;
  let e = r.replace(ie.findPipe, (o, a, l) => {
    let d = !1, c = a;
    for (; --c >= 0 && l[c] === "\\"; ) d = !d;
    return d ? "|" : " |";
  }), n = e.split(ie.splitPipe), i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((s = n.at(-1)) != null && s.trim()) && n.pop(), t) if (n.length > t) n.splice(t);
  else for (; n.length < t; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(ie.slashPipe, "|");
  return n;
}
function Le(r, t, e) {
  let n = r.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n && r.charAt(n - i - 1) === t; )
    i++;
  return r.slice(0, n - i);
}
function vs(r) {
  let t = r.split(`
`), e = t.length - 1;
  for (; e >= 0 && ie.blankLine.test(t[e]); ) e--;
  return t.length - e <= 2 ? r : t.slice(0, e + 1).join(`
`);
}
function bl(r, t) {
  if (r.indexOf(t[1]) === -1) return -1;
  let e = 0;
  for (let n = 0; n < r.length; n++) if (r[n] === "\\") n++;
  else if (r[n] === t[0]) e++;
  else if (r[n] === t[1] && (e--, e < 0)) return n;
  return e > 0 ? -2 : -1;
}
function wl(r, t = 0) {
  let e = t, n = "";
  for (let i of r) if (i === "	") {
    let s = 4 - e % 4;
    n += " ".repeat(s), e += s;
  } else n += i, e++;
  return n;
}
function ys(r, t, e, n, i) {
  let s = t.href, o = t.title || null, a = r[1].replace(i.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  let l = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: e, href: s, title: o, text: a, tokens: n.inlineTokens(a) };
  return n.state.inLink = !1, l;
}
function xl(r, t, e) {
  let n = r.match(e.other.indentCodeCompensation);
  if (n === null) return t;
  let i = n[1];
  return t.split(`
`).map((s) => {
    let o = s.match(e.other.beginningSpace);
    if (o === null) return s;
    let [a] = o;
    return a.length >= i.length ? s.slice(i.length) : s;
  }).join(`
`);
}
var Jt = class {
  constructor(r) {
    h(this, "options");
    h(this, "rules");
    h(this, "lexer");
    this.options = r || Ge;
  }
  space(r) {
    let t = this.rules.block.newline.exec(r);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(r) {
    let t = this.rules.block.code.exec(r);
    if (t) {
      let e = this.options.pedantic ? t[0] : vs(t[0]), n = e.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e, codeBlockStyle: "indented", text: n };
    }
  }
  fences(r) {
    let t = this.rules.block.fences.exec(r);
    if (t) {
      let e = t[0], n = xl(e, t[3] || "", this.rules);
      return { type: "code", raw: e, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: n };
    }
  }
  heading(r) {
    let t = this.rules.block.heading.exec(r);
    if (t) {
      let e = t[2].trim();
      if (this.rules.other.endingHash.test(e)) {
        let n = Le(e, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (e = n.trim());
      }
      return { type: "heading", raw: Le(t[0], `
`), depth: t[1].length, text: e, tokens: this.lexer.inline(e) };
    }
  }
  hr(r) {
    let t = this.rules.block.hr.exec(r);
    if (t) return { type: "hr", raw: Le(t[0], `
`) };
  }
  blockquote(r) {
    let t = this.rules.block.blockquote.exec(r);
    if (t) {
      let e = Le(t[0], `
`).split(`
`), n = "", i = "", s = [];
      for (; e.length > 0; ) {
        let o = !1, a = [], l;
        for (l = 0; l < e.length; l++) if (this.rules.other.blockquoteStart.test(e[l])) a.push(e[l]), o = !0;
        else if (!o) a.push(e[l]);
        else break;
        e = e.slice(l);
        let d = a.join(`
`), c = d.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${d}` : d, i = i ? `${i}
${c}` : c;
        let u = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, s, !0), this.lexer.state.top = u, e.length === 0) break;
        let p = s.at(-1);
        if ((p == null ? void 0 : p.type) === "code") break;
        if ((p == null ? void 0 : p.type) === "blockquote") {
          let g = p, f = g.raw + `
` + e.join(`
`), v = this.blockquote(f);
          s[s.length - 1] = v, n = n.substring(0, n.length - g.raw.length) + v.raw, i = i.substring(0, i.length - g.text.length) + v.text;
          break;
        } else if ((p == null ? void 0 : p.type) === "list") {
          let g = p, f = g.raw + `
` + e.join(`
`), v = this.list(f);
          s[s.length - 1] = v, n = n.substring(0, n.length - p.raw.length) + v.raw, i = i.substring(0, i.length - g.raw.length) + v.raw, e = f.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: s, text: i };
    }
  }
  list(r) {
    let t = this.rules.block.list.exec(r);
    if (t) {
      let e = t[1].trim(), n = e.length > 1, i = { type: "list", raw: "", ordered: n, start: n ? +e.slice(0, -1) : "", loose: !1, items: [] };
      e = n ? `\\d{1,9}\\${e.slice(-1)}` : `\\${e}`, this.options.pedantic && (e = n ? e : "[*+-]");
      let s = this.rules.other.listItemRegex(e), o = !1;
      for (; r; ) {
        let l = !1, d = "", c = "";
        if (!(t = s.exec(r)) || this.rules.block.hr.test(r)) break;
        d = t[0], r = r.substring(d.length);
        let u = wl(t[2].split(`
`, 1)[0], t[1].length), p = r.split(`
`, 1)[0], g = !u.trim(), f = 0;
        if (this.options.pedantic ? (f = 2, c = u.trimStart()) : g ? f = t[1].length + 1 : (f = u.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = u.slice(f), f += t[1].length), g && this.rules.other.blankLine.test(p) && (d += p + `
`, r = r.substring(p.length + 1), l = !0), !l) {
          let v = this.rules.other.nextBulletRegex(f), y = this.rules.other.hrRegex(f), b = this.rules.other.fencesBeginRegex(f), k = this.rules.other.headingBeginRegex(f), C = this.rules.other.htmlBeginRegex(f), T = this.rules.other.blockquoteBeginRegex(f);
          for (; r; ) {
            let I = r.split(`
`, 1)[0], N;
            if (p = I, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), N = p) : N = p.replace(this.rules.other.tabCharGlobal, "    "), b.test(p) || k.test(p) || C.test(p) || T.test(p) || v.test(p) || y.test(p)) break;
            if (N.search(this.rules.other.nonSpaceChar) >= f || !p.trim()) c += `
` + N.slice(f);
            else {
              if (g || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || b.test(u) || k.test(u) || y.test(u)) break;
              c += `
` + p;
            }
            g = !p.trim(), d += I + `
`, r = r.substring(I.length + 1), u = N.slice(f);
          }
        }
        i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (o = !0)), i.items.push({ type: "list_item", raw: d, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: !1, text: c, tokens: [] }), i.raw += d;
      }
      let a = i.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let l of i.items) {
        this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []);
        let d = l.tokens[0];
        if (l.task && ((d == null ? void 0 : d.type) === "text" || (d == null ? void 0 : d.type) === "paragraph")) {
          l.text = l.text.replace(this.rules.other.listReplaceTask, ""), d.raw = d.raw.replace(this.rules.other.listReplaceTask, ""), d.text = d.text.replace(this.rules.other.listReplaceTask, "");
          for (let u = this.lexer.inlineQueue.length - 1; u >= 0; u--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)) {
            this.lexer.inlineQueue[u].src = this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let c = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (c) {
            let u = { type: "checkbox", raw: c[0] + " ", checked: c[0] !== "[ ]" };
            l.checked = u.checked, i.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = u.raw + l.tokens[0].raw, l.tokens[0].text = u.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(u)) : l.tokens.unshift({ type: "paragraph", raw: u.raw, text: u.raw, tokens: [u] }) : l.tokens.unshift(u);
          }
        } else l.task && (l.task = !1);
        if (!i.loose) {
          let c = l.tokens.filter((p) => p.type === "space"), u = c.length > 0 && c.some((p) => this.rules.other.anyLine.test(p.raw));
          i.loose = u;
        }
      }
      if (i.loose) for (let l of i.items) {
        l.loose = !0;
        for (let d of l.tokens) d.type === "text" && (d.type = "paragraph");
      }
      return i;
    }
  }
  html(r) {
    let t = this.rules.block.html.exec(r);
    if (t) {
      let e = vs(t[0]);
      return { type: "html", block: !0, raw: e, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: e };
    }
  }
  def(r) {
    let t = this.rules.block.def.exec(r);
    if (t) {
      let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: e, raw: Le(t[0], `
`), href: n, title: i };
    }
  }
  table(r) {
    var o;
    let t = this.rules.block.table.exec(r);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let e = ms(t[1]), n = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: Le(t[0], `
`), header: [], align: [], rows: [] };
    if (e.length === n.length) {
      for (let a of n) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < e.length; a++) s.header.push({ text: e[a], tokens: this.lexer.inline(e[a]), header: !0, align: s.align[a] });
      for (let a of i) s.rows.push(ms(a, s.header.length).map((l, d) => ({ text: l, tokens: this.lexer.inline(l), header: !1, align: s.align[d] })));
      return s;
    }
  }
  lheading(r) {
    let t = this.rules.block.lheading.exec(r);
    if (t) {
      let e = t[1].trim();
      return { type: "heading", raw: Le(t[0], `
`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: e, tokens: this.lexer.inline(e) };
    }
  }
  paragraph(r) {
    let t = this.rules.block.paragraph.exec(r);
    if (t) {
      let e = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: e, tokens: this.lexer.inline(e) };
    }
  }
  text(r) {
    let t = this.rules.block.text.exec(r);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(r) {
    let t = this.rules.inline.escape.exec(r);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(r) {
    let t = this.rules.inline.tag.exec(r);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: t[0] };
  }
  link(r) {
    let t = this.rules.inline.link.exec(r);
    if (t) {
      let e = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
        if (!this.rules.other.endAngleBracket.test(e)) return;
        let s = Le(e.slice(0, -1), "\\");
        if ((e.length - s.length) % 2 === 0) return;
      } else {
        let s = bl(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, o).trim(), t[3] = "";
        }
      }
      let n = t[2], i = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(n);
        s && (n = s[1], i = s[3]);
      } else i = t[3] ? t[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n = n.slice(1) : n = n.slice(1, -1)), ys(t, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(r, t) {
    let e;
    if ((e = this.rules.inline.reflink.exec(r)) || (e = this.rules.inline.nolink.exec(r))) {
      let n = (e[2] || e[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[n.toLowerCase()];
      if (!i) {
        let s = e[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return ys(e, i, e[0], this.lexer, this.rules);
    }
  }
  emStrong(r, t, e = "") {
    let n = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!n || !n[1] && !n[2] && !n[3] && !n[4] || n[4] && e.match(this.rules.other.unicodeAlphaNumeric)) && (!(n[1] || n[3]) || !e || this.rules.inline.punctuation.exec(e))) {
      let i = [...n[0]].length - 1, s, o, a = i, l = 0, d = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * r.length + i); (n = d.exec(t)) !== null; ) {
        if (s = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !s) continue;
        if (o = [...s].length, n[3] || n[4]) {
          a += o;
          continue;
        } else if ((n[5] || n[6]) && i % 3 && !((i + o) % 3)) {
          l += o;
          continue;
        }
        if (a -= o, a > 0) continue;
        o = Math.min(o, o + a + l);
        let c = [...n[0]][0].length, u = r.slice(0, i + n.index + c + o);
        if (Math.min(i, o) % 2) {
          let g = u.slice(1, -1);
          return { type: "em", raw: u, text: g, tokens: this.lexer.inlineTokens(g) };
        }
        let p = u.slice(2, -2);
        return { type: "strong", raw: u, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  codespan(r) {
    let t = this.rules.inline.code.exec(r);
    if (t) {
      let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), i = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
      return n && i && (e = e.substring(1, e.length - 1)), { type: "codespan", raw: t[0], text: e };
    }
  }
  br(r) {
    let t = this.rules.inline.br.exec(r);
    if (t) return { type: "br", raw: t[0] };
  }
  del(r, t, e = "") {
    let n = this.rules.inline.delLDelim.exec(r);
    if (n && (!n[1] || !e || this.rules.inline.punctuation.exec(e))) {
      let i = [...n[0]].length - 1, s, o, a = i, l = this.rules.inline.delRDelim;
      for (l.lastIndex = 0, t = t.slice(-1 * r.length + i); (n = l.exec(t)) !== null; ) {
        if (s = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !s || (o = [...s].length, o !== i)) continue;
        if (n[3] || n[4]) {
          a += o;
          continue;
        }
        if (a -= o, a > 0) continue;
        o = Math.min(o, o + a);
        let d = [...n[0]][0].length, c = r.slice(0, i + n.index + d + o), u = c.slice(i, -i);
        return { type: "del", raw: c, text: u, tokens: this.lexer.inlineTokens(u) };
      }
    }
  }
  autolink(r) {
    let t = this.rules.inline.autolink.exec(r);
    if (t) {
      let e, n;
      return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), { type: "link", raw: t[0], text: e, href: n, tokens: [{ type: "text", raw: e, text: e }] };
    }
  }
  url(r) {
    var e;
    let t;
    if (t = this.rules.inline.url.exec(r)) {
      let n, i;
      if (t[2] === "@") n = t[0], i = "mailto:" + n;
      else {
        let s;
        do
          s = t[0], t[0] = ((e = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : e[0]) ?? "";
        while (s !== t[0]);
        n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: i, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(r) {
    let t = this.rules.inline.text.exec(r);
    if (t) {
      let e = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: e };
    }
  }
}, ge = class Kn {
  constructor(t) {
    h(this, "tokens");
    h(this, "options");
    h(this, "state");
    h(this, "inlineQueue");
    h(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || Ge, this.options.tokenizer = this.options.tokenizer || new Jt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let e = { other: ie, block: Ut.normal, inline: yt.normal };
    this.options.pedantic ? (e.block = Ut.pedantic, e.inline = yt.pedantic) : this.options.gfm && (e.block = Ut.gfm, this.options.breaks ? e.inline = yt.breaks : e.inline = yt.gfm), this.tokenizer.rules = e;
  }
  static get rules() {
    return { block: Ut, inline: yt };
  }
  static lex(t, e) {
    return new Kn(e).lex(t);
  }
  static lexInline(t, e) {
    return new Kn(e).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(ie.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let e = 0; e < this.inlineQueue.length; e++) {
      let n = this.inlineQueue[e];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, e = [], n = !1) {
    var s, o, a;
    this.tokenizer.lexer = this, this.options.pedantic && (t = t.replace(ie.tabCharGlobal, "    ").replace(ie.spaceLine, ""));
    let i = 1 / 0;
    for (; t; ) {
      if (t.length < i) i = t.length;
      else {
        this.infiniteLoopError(t.charCodeAt(0));
        break;
      }
      let l;
      if ((o = (s = this.options.extensions) == null ? void 0 : s.block) != null && o.some((c) => (l = c.call({ lexer: this }, t, e)) ? (t = t.substring(l.raw.length), e.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.space(t)) {
        t = t.substring(l.raw.length);
        let c = e.at(-1);
        l.raw.length === 1 && c !== void 0 ? c.raw += `
` : e.push(l);
        continue;
      }
      if (l = this.tokenizer.code(t)) {
        t = t.substring(l.raw.length);
        let c = e.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + l.raw, c.text += `
` + l.text, this.inlineQueue.at(-1).src = c.text) : e.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.list(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.html(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.def(t)) {
        t = t.substring(l.raw.length);
        let c = e.at(-1);
        (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + l.raw, c.text += `
` + l.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = { href: l.href, title: l.title }, e.push(l));
        continue;
      }
      if (l = this.tokenizer.table(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(t)) {
        t = t.substring(l.raw.length), e.push(l);
        continue;
      }
      let d = t;
      if ((a = this.options.extensions) != null && a.startBlock) {
        let c = 1 / 0, u = t.slice(1), p;
        this.options.extensions.startBlock.forEach((g) => {
          p = g.call({ lexer: this }, u), typeof p == "number" && p >= 0 && (c = Math.min(c, p));
        }), c < 1 / 0 && c >= 0 && (d = t.substring(0, c + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(d))) {
        let c = e.at(-1);
        n && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + l.raw, c.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : e.push(l), n = d.length !== t.length, t = t.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(t)) {
        t = t.substring(l.raw.length);
        let c = e.at(-1);
        (c == null ? void 0 : c.type) === "text" ? (c.raw += (c.raw.endsWith(`
`) ? "" : `
`) + l.raw, c.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : e.push(l);
        continue;
      }
      if (t) {
        this.infiniteLoopError(t.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, e;
  }
  inline(t, e = []) {
    return this.inlineQueue.push({ src: t, tokens: e }), e;
  }
  inlineTokens(t, e = []) {
    var d, c, u, p, g;
    this.tokenizer.lexer = this;
    let n = t, i = null;
    if (this.tokens.links) {
      let f = Object.keys(this.tokens.links);
      if (f.length > 0) for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(n)) !== null; ) f.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(n)) !== null; ) n = n.slice(0, i.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let s;
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(n)) !== null; ) s = i[2] ? i[2].length : 0, n = n.slice(0, i.index + s) + "[" + "a".repeat(i[0].length - s - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = ((c = (d = this.options.hooks) == null ? void 0 : d.emStrongMask) == null ? void 0 : c.call({ lexer: this }, n)) ?? n;
    let o = !1, a = "", l = 1 / 0;
    for (; t; ) {
      if (t.length < l) l = t.length;
      else {
        this.infiniteLoopError(t.charCodeAt(0));
        break;
      }
      o || (a = ""), o = !1;
      let f;
      if ((p = (u = this.options.extensions) == null ? void 0 : u.inline) != null && p.some((y) => (f = y.call({ lexer: this }, t, e)) ? (t = t.substring(f.raw.length), e.push(f), !0) : !1)) continue;
      if (f = this.tokenizer.escape(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.tag(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.link(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(f.raw.length);
        let y = e.at(-1);
        f.type === "text" && (y == null ? void 0 : y.type) === "text" ? (y.raw += f.raw, y.text += f.text) : e.push(f);
        continue;
      }
      if (f = this.tokenizer.emStrong(t, n, a)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.codespan(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.br(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.del(t, n, a)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (f = this.tokenizer.autolink(t)) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      if (!this.state.inLink && (f = this.tokenizer.url(t))) {
        t = t.substring(f.raw.length), e.push(f);
        continue;
      }
      let v = t;
      if ((g = this.options.extensions) != null && g.startInline) {
        let y = 1 / 0, b = t.slice(1), k;
        this.options.extensions.startInline.forEach((C) => {
          k = C.call({ lexer: this }, b), typeof k == "number" && k >= 0 && (y = Math.min(y, k));
        }), y < 1 / 0 && y >= 0 && (v = t.substring(0, y + 1));
      }
      if (f = this.tokenizer.inlineText(v)) {
        t = t.substring(f.raw.length), f.raw.slice(-1) !== "_" && (a = f.raw.slice(-1)), o = !0;
        let y = e.at(-1);
        (y == null ? void 0 : y.type) === "text" ? (y.raw += f.raw, y.text += f.text) : e.push(f);
        continue;
      }
      if (t) {
        this.infiniteLoopError(t.charCodeAt(0));
        break;
      }
    }
    return e;
  }
  infiniteLoopError(t) {
    let e = "Infinite loop on byte: " + t;
    if (this.options.silent) console.error(e);
    else throw new Error(e);
  }
}, en = class {
  constructor(r) {
    h(this, "options");
    h(this, "parser");
    this.options = r || Ge;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: t, escaped: e }) {
    var s;
    let n = (s = (t || "").match(ie.notSpaceStart)) == null ? void 0 : s[0], i = r.replace(ie.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + Ce(n) + '">' + (e ? i : Ce(i, !0)) + `</code></pre>
` : "<pre><code>" + (e ? i : Ce(i, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  def(r) {
    return "";
  }
  heading({ tokens: r, depth: t }) {
    return `<h${t}>${this.parser.parseInline(r)}</h${t}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let t = r.ordered, e = r.start, n = "";
    for (let o = 0; o < r.items.length; o++) {
      let a = r.items[o];
      n += this.listitem(a);
    }
    let i = t ? "ol" : "ul", s = t && e !== 1 ? ' start="' + e + '"' : "";
    return "<" + i + s + `>
` + n + "</" + i + `>
`;
  }
  listitem(r) {
    return `<li>${this.parser.parse(r.tokens)}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let t = "", e = "";
    for (let i = 0; i < r.header.length; i++) e += this.tablecell(r.header[i]);
    t += this.tablerow({ text: e });
    let n = "";
    for (let i = 0; i < r.rows.length; i++) {
      let s = r.rows[i];
      e = "";
      for (let o = 0; o < s.length; o++) e += this.tablecell(s[o]);
      n += this.tablerow({ text: e });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + n + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let t = this.parser.parseInline(r.tokens), e = r.header ? "th" : "td";
    return (r.align ? `<${e} align="${r.align}">` : `<${e}>`) + t + `</${e}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${Ce(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: t, tokens: e }) {
    let n = this.parser.parseInline(e), i = fs(r);
    if (i === null) return n;
    r = i;
    let s = '<a href="' + r + '"';
    return t && (s += ' title="' + Ce(t) + '"'), s += ">" + n + "</a>", s;
  }
  image({ href: r, title: t, text: e, tokens: n }) {
    n && (e = this.parser.parseInline(n, this.parser.textRenderer));
    let i = fs(r);
    if (i === null) return Ce(e);
    r = i;
    let s = `<img src="${r}" alt="${Ce(e)}"`;
    return t && (s += ` title="${Ce(t)}"`), s += ">", s;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : Ce(r.text);
  }
}, bi = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
  checkbox({ raw: r }) {
    return r;
  }
}, fe = class Zn {
  constructor(t) {
    h(this, "options");
    h(this, "renderer");
    h(this, "textRenderer");
    this.options = t || Ge, this.options.renderer = this.options.renderer || new en(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new bi();
  }
  static parse(t, e) {
    return new Zn(e).parse(t);
  }
  static parseInline(t, e) {
    return new Zn(e).parseInline(t);
  }
  parse(t) {
    var n, i;
    this.renderer.parser = this;
    let e = "";
    for (let s = 0; s < t.length; s++) {
      let o = t[s];
      if ((i = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && i[o.type]) {
        let l = o, d = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (d !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(l.type)) {
          e += d || "";
          continue;
        }
      }
      let a = o;
      switch (a.type) {
        case "space": {
          e += this.renderer.space(a);
          break;
        }
        case "hr": {
          e += this.renderer.hr(a);
          break;
        }
        case "heading": {
          e += this.renderer.heading(a);
          break;
        }
        case "code": {
          e += this.renderer.code(a);
          break;
        }
        case "table": {
          e += this.renderer.table(a);
          break;
        }
        case "blockquote": {
          e += this.renderer.blockquote(a);
          break;
        }
        case "list": {
          e += this.renderer.list(a);
          break;
        }
        case "checkbox": {
          e += this.renderer.checkbox(a);
          break;
        }
        case "html": {
          e += this.renderer.html(a);
          break;
        }
        case "def": {
          e += this.renderer.def(a);
          break;
        }
        case "paragraph": {
          e += this.renderer.paragraph(a);
          break;
        }
        case "text": {
          e += this.renderer.text(a);
          break;
        }
        default: {
          let l = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return e;
  }
  parseInline(t, e = this.renderer) {
    var i, s;
    this.renderer.parser = this;
    let n = "";
    for (let o = 0; o < t.length; o++) {
      let a = t[o];
      if ((s = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && s[a.type]) {
        let d = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (d !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          n += d || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "escape": {
          n += e.text(l);
          break;
        }
        case "html": {
          n += e.html(l);
          break;
        }
        case "link": {
          n += e.link(l);
          break;
        }
        case "image": {
          n += e.image(l);
          break;
        }
        case "checkbox": {
          n += e.checkbox(l);
          break;
        }
        case "strong": {
          n += e.strong(l);
          break;
        }
        case "em": {
          n += e.em(l);
          break;
        }
        case "codespan": {
          n += e.codespan(l);
          break;
        }
        case "br": {
          n += e.br(l);
          break;
        }
        case "del": {
          n += e.del(l);
          break;
        }
        case "text": {
          n += e.text(l);
          break;
        }
        default: {
          let d = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(d), "";
          throw new Error(d);
        }
      }
    }
    return n;
  }
}, Wt, xt = (Wt = class {
  constructor(r) {
    h(this, "options");
    h(this, "block");
    this.options = r || Ge;
  }
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  emStrongMask(r) {
    return r;
  }
  provideLexer(r = this.block) {
    return r ? ge.lex : ge.lexInline;
  }
  provideParser(r = this.block) {
    return r ? fe.parse : fe.parseInline;
  }
}, h(Wt, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), h(Wt, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Wt), kl = class {
  constructor(...r) {
    h(this, "defaults", di());
    h(this, "options", this.setOptions);
    h(this, "parse", this.parseMarkdown(!0));
    h(this, "parseInline", this.parseMarkdown(!1));
    h(this, "Parser", fe);
    h(this, "Renderer", en);
    h(this, "TextRenderer", bi);
    h(this, "Lexer", ge);
    h(this, "Tokenizer", Jt);
    h(this, "Hooks", xt);
    this.use(...r);
  }
  walkTokens(r, t) {
    var n, i;
    let e = [];
    for (let s of r) switch (e = e.concat(t.call(this, s)), s.type) {
      case "table": {
        let o = s;
        for (let a of o.header) e = e.concat(this.walkTokens(a.tokens, t));
        for (let a of o.rows) for (let l of a) e = e.concat(this.walkTokens(l.tokens, t));
        break;
      }
      case "list": {
        let o = s;
        e = e.concat(this.walkTokens(o.items, t));
        break;
      }
      default: {
        let o = s;
        (i = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && i[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
          let l = o[a].flat(1 / 0);
          e = e.concat(this.walkTokens(l, t));
        }) : o.tokens && (e = e.concat(this.walkTokens(o.tokens, t)));
      }
    }
    return e;
  }
  use(...r) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((e) => {
      let n = { ...e };
      if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let s = t.renderers[i.name];
          s ? t.renderers[i.name] = function(...o) {
            let a = i.renderer.apply(this, o);
            return a === !1 && (a = s.apply(this, o)), a;
          } : t.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t[i.level];
          s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
      }), n.extensions = t), e.renderer) {
        let i = this.defaults.renderer || new en(this.defaults);
        for (let s in e.renderer) {
          if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let o = s, a = e.renderer[o], l = i[o];
          i[o] = (...d) => {
            let c = a.apply(i, d);
            return c === !1 && (c = l.apply(i, d)), c || "";
          };
        }
        n.renderer = i;
      }
      if (e.tokenizer) {
        let i = this.defaults.tokenizer || new Jt(this.defaults);
        for (let s in e.tokenizer) {
          if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let o = s, a = e.tokenizer[o], l = i[o];
          i[o] = (...d) => {
            let c = a.apply(i, d);
            return c === !1 && (c = l.apply(i, d)), c;
          };
        }
        n.tokenizer = i;
      }
      if (e.hooks) {
        let i = this.defaults.hooks || new xt();
        for (let s in e.hooks) {
          if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let o = s, a = e.hooks[o], l = i[o];
          xt.passThroughHooks.has(s) ? i[o] = (d) => {
            if (this.defaults.async && xt.passThroughHooksRespectAsync.has(s)) return (async () => {
              let u = await a.call(i, d);
              return l.call(i, u);
            })();
            let c = a.call(i, d);
            return l.call(i, c);
          } : i[o] = (...d) => {
            if (this.defaults.async) return (async () => {
              let u = await a.apply(i, d);
              return u === !1 && (u = await l.apply(i, d)), u;
            })();
            let c = a.apply(i, d);
            return c === !1 && (c = l.apply(i, d)), c;
          };
        }
        n.hooks = i;
      }
      if (e.walkTokens) {
        let i = this.defaults.walkTokens, s = e.walkTokens;
        n.walkTokens = function(o) {
          let a = [];
          return a.push(s.call(this, o)), i && (a = a.concat(i.call(this, o))), a;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, t) {
    return ge.lex(r, t ?? this.defaults);
  }
  parser(r, t) {
    return fe.parse(r, t ?? this.defaults);
  }
  parseMarkdown(r) {
    return (t, e) => {
      let n = { ...e }, i = { ...this.defaults, ...n }, s = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && n.async === !1) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      if (i.hooks && (i.hooks.options = i, i.hooks.block = r), i.async) return (async () => {
        let o = i.hooks ? await i.hooks.preprocess(t) : t, a = await (i.hooks ? await i.hooks.provideLexer(r) : r ? ge.lex : ge.lexInline)(o, i), l = i.hooks ? await i.hooks.processAllTokens(a) : a;
        i.walkTokens && await Promise.all(this.walkTokens(l, i.walkTokens));
        let d = await (i.hooks ? await i.hooks.provideParser(r) : r ? fe.parse : fe.parseInline)(l, i);
        return i.hooks ? await i.hooks.postprocess(d) : d;
      })().catch(s);
      try {
        i.hooks && (t = i.hooks.preprocess(t));
        let o = (i.hooks ? i.hooks.provideLexer(r) : r ? ge.lex : ge.lexInline)(t, i);
        i.hooks && (o = i.hooks.processAllTokens(o)), i.walkTokens && this.walkTokens(o, i.walkTokens);
        let a = (i.hooks ? i.hooks.provideParser(r) : r ? fe.parse : fe.parseInline)(o, i);
        return i.hooks && (a = i.hooks.postprocess(a)), a;
      } catch (o) {
        return s(o);
      }
    };
  }
  onError(r, t) {
    return (e) => {
      if (e.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let n = "<p>An error occurred:</p><pre>" + Ce(e.message + "", !0) + "</pre>";
        return t ? Promise.resolve(n) : n;
      }
      if (t) return Promise.reject(e);
      throw e;
    };
  }
}, He = new kl();
function D(r, t) {
  return He.parse(r, t);
}
D.options = D.setOptions = function(r) {
  return He.setOptions(r), D.defaults = He.defaults, Ks(D.defaults), D;
};
D.getDefaults = di;
D.defaults = Ge;
D.use = function(...r) {
  return He.use(...r), D.defaults = He.defaults, Ks(D.defaults), D;
};
D.walkTokens = function(r, t) {
  return He.walkTokens(r, t);
};
D.parseInline = He.parseInline;
D.Parser = fe;
D.parser = fe.parse;
D.Renderer = en;
D.TextRenderer = bi;
D.Lexer = ge;
D.lexer = ge.lex;
D.Tokenizer = Jt;
D.Hooks = xt;
D.parse = D;
D.options;
D.setOptions;
D.use;
D.walkTokens;
D.parseInline;
fe.parse;
ge.lex;
function st(r, t) {
  if (Array.isArray(r) && Array.isArray(t))
    return [...r, ...t];
  if (typeof r == "object" && typeof t == "object" && r && t) {
    const e = { ...r };
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (n in r ? e[n] = st(r[n], t[n]) : e[n] = t[n]);
    return e;
  }
  return t;
}
function Nt(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const Sl = {
  extensions: [
    {
      name: "node-reference",
      level: "inline",
      start(r) {
        var t;
        return (t = r.match(/\[\[/)) == null ? void 0 : t.index;
      },
      tokenizer(r) {
        const t = /^\[\[([^[\]]+)\]\]/.exec(r);
        if (t)
          return {
            type: "node-reference",
            raw: t[0],
            nodeName: t[1].trim()
          };
      },
      renderer(r) {
        const { nodeName: t } = r, e = Nt(t);
        return `
                    <span
                        class="pvt-node-reference"
                        data-node-name="${e}"
                    >
                        ${e}
                    </span>
                `;
      }
    }
  ]
};
D.use(Sl);
function Cl(r) {
  const t = D.parse(r);
  return ii.sanitize(t);
}
function El(r) {
  const t = D.parseInline(r);
  return ii.sanitize(t);
}
function Tl(r, t) {
  r.addEventListener("click", (e) => {
    const i = e.target.closest(".pvt-node-reference.resolved");
    if (!i) return;
    const s = i.dataset.nodeId;
    if (!s) return;
    const o = t.getMutableNode(s);
    o && t.selectElement(o);
  }), r.addEventListener("mouseover", (e) => {
    const i = e.target.closest(".pvt-node-reference.resolved");
    if (!i) return;
    const s = i.dataset.nodeId;
    if (!s) return;
    const o = t.getMutableNode(s);
    o && t.highlightElement(o);
  }), r.addEventListener("mouseout", (e) => {
    e.target.closest(".pvt-node-reference.resolved") && t.clearHighlightedElements();
  });
}
function or(r, t) {
  t && (r.style.setProperty("--pvt-note-node-reference-dot", t), r.style.setProperty("--pvt-note-node-reference-bg", `color-mix(in oklab, ${t} 30%, white)`), r.style.setProperty("border-color", `color-mix(in srgb, ${t} 45%, transparent)`));
}
function ar(r, t) {
  r.querySelectorAll(".pvt-node-reference").forEach((n) => {
    const i = n.dataset.nodeName;
    if (!i) return;
    const s = Ma(i, t.getMutableNodes(), t.UIManager.getOptions().mainHeader);
    if (!s) {
      n.classList.add("unresolved"), n.title = "Could not resolve node";
      return;
    }
    const o = se(s, t.UIManager.getOptions().mainHeader).trim();
    n.textContent = o, n.dataset.nodeId = s.id, n.classList.add("resolved");
    const a = t.renderer.getNodeStyle(s).color;
    or(n, a);
  });
}
class Nl {
  constructor(t) {
    h(this, "graph");
    this.graph = t;
  }
  render(t, e) {
    const n = Cl(t.content);
    e.innerHTML = n, ar(
      e,
      this.graph
    ), Tl(
      e,
      this.graph
    );
  }
}
class X {
  constructor(t) {
    h(this, "uiManager");
    h(this, "children", []);
    h(this, "disposables", []);
    this.uiManager = t;
  }
  /* ---------- subclass hooks (override as needed) ---------- */
  /** Build DOM and append it to `container`. Runs during {@link mount}. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMount(t) {
  }
  /** Post-mount wiring (query slots, mount children, add listeners). */
  onAfterMount() {
  }
  /** Run once the graph data is ready and the simulation has settled. */
  onGraphReady() {
  }
  /** Extra teardown beyond children + tracked disposables. */
  onDestroy() {
  }
  /* ---------- lifecycle (driven by the parent / UIManager) ---------- */
  mount(t) {
    this.onMount(t);
  }
  afterMount() {
    this.onAfterMount();
    for (const t of this.children) t.afterMount();
  }
  graphReady() {
    this.onGraphReady();
    for (const t of this.children) t.graphReady();
  }
  destroy() {
    for (const t of [...this.children].reverse()) t.destroy();
    for (this.children.length = 0; this.disposables.length; ) this.disposables.pop()();
    this.onDestroy();
  }
  /* ---------- helpers for subclasses ---------- */
  /**
   * Register a child component. When `slot` is provided the child is mounted
   * into it immediately; its remaining phases are then driven by this
   * component's own {@link afterMount} / {@link graphReady} / {@link destroy}.
   */
  addChild(t, e) {
    return this.children.push(t), e !== void 0 && t.mount(e), t;
  }
  /** Register a teardown fn run (LIFO) on {@link destroy}. */
  track(t) {
    this.disposables.push(t);
  }
  /**
   * Subscribe to the graph interaction bus and auto-unsubscribe on
   * {@link destroy}. Use instead of `getGraphInteraction().on(...)` so the
   * handler doesn't outlive the component.
   */
  trackInteraction(t, e) {
    const n = this.uiManager.graph.renderer.getGraphInteraction();
    n.on(t, e), this.track(() => n.off(t, e));
  }
  /** Add a DOM listener that is automatically removed on {@link destroy}. */
  listen(t, e, n, i) {
    t.addEventListener(e, n, i), this.track(() => t.removeEventListener(e, n, i));
  }
}
const wi = "http://www.w3.org/2000/svg", lr = "http://www.w3.org/1999/xlink", Ml = 32, Al = "pvt-node-preview-icon", _l = "image.node-content", Il = "circle.pvt-node-selected-highlight", Ll = "text.pvt-node-label";
function Dl(r, t) {
  const e = t.ownerSVGElement;
  if (!e) return r.getBBox();
  e.appendChild(r);
  const n = r.getBBox();
  return e.removeChild(r), n;
}
function Rl(r, t, e) {
  var o, a, l;
  const n = r.cloneNode(!0);
  e && ((o = n.querySelector(Il)) == null || o.remove()), (l = (a = n.querySelector(Ll)) == null ? void 0 : a.parentElement) == null || l.remove();
  const i = Dl(n, r), s = t / Math.max(i.width, i.height);
  return n.setAttribute(
    "transform",
    `translate(${(t - i.width * s) / 2 - i.x * s}, ${(t - i.height * s) / 2 - i.y * s}) scale(${s})`
  ), n;
}
function tn(r) {
  var n;
  const t = r instanceof SVGGElement ? r : (r == null ? void 0 : r.getGraphElement()) ?? null;
  if (!(t instanceof SVGGElement)) return null;
  const e = t.querySelector(_l);
  return e ? e.getAttributeNS(lr, "href") ?? e.getAttribute("href") ?? ((n = e.href) == null ? void 0 : n.baseVal) ?? null : null;
}
function Ol(r) {
  const t = document.createElement("div");
  return t.innerHTML = r, t.querySelector("svg");
}
function Pl() {
  const r = x("div", { class: "pvt-image-unavailable__icon" });
  r.innerHTML = li;
  const t = x("div", { class: "pvt-image-unavailable__label" }, ["Image unavailable"]);
  return x("div", { class: "pvt-image-unavailable" }, [r, t]);
}
function cr(r) {
  r.addEventListener("error", () => r.replaceWith(Pl()), { once: !0 });
}
function Fl(r) {
  const t = document.createElementNS(wi, "g");
  t.setAttribute("class", "pvt-node-preview-image-fallback");
  const e = Ol(li);
  if (e) {
    const n = r * 0.6, i = (r - n) / 2;
    e.setAttribute("x", i.toString()), e.setAttribute("y", i.toString()), e.setAttribute("width", n.toString()), e.setAttribute("height", n.toString()), t.appendChild(e);
  }
  return t;
}
function Bl(r, t) {
  const e = document.createElementNS(wi, "image");
  return e.setAttribute("class", "pvt-node-preview-image"), e.setAttribute("x", "0"), e.setAttribute("y", "0"), e.setAttribute("width", t.toString()), e.setAttribute("height", t.toString()), e.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.setAttributeNS(lr, "href", r), e.setAttribute("href", r), e.addEventListener("error", () => e.replaceWith(Fl(t)), { once: !0 }), e;
}
function $e(r, t = {}) {
  const e = t.size ?? Ml, n = t.className ?? Al, i = t.removeSelectionHighlight ?? !1, s = document.createElementNS(wi, "svg");
  s.setAttribute("class", n), s.setAttribute("width", e.toString()), s.setAttribute("height", e.toString()), s.setAttribute("viewBox", `0 0 ${e} ${e}`), s.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const o = r instanceof SVGGElement ? r : (r == null ? void 0 : r.getGraphElement()) ?? null;
  if (o instanceof SVGGElement) {
    const a = tn(o);
    s.appendChild(a ? Bl(a, e) : Rl(o, e, i));
  }
  return s;
}
class zl extends X {
  constructor(e, n) {
    super(e);
    h(this, "title");
    h(this, "searchBox");
    h(this, "searchInput");
    h(this, "searchResultsContainer");
    h(this, "searchSummaryContainer");
    h(this, "results");
    h(this, "highlightedIndex", 0);
    h(this, "MAX_RESULT_COUNT", 12);
    this.title = n;
  }
  onMount(e) {
    e && (this.searchBox = this.build(), e.appendChild(this.searchBox));
  }
  build() {
    var i, s;
    const e = document.createElement("template");
    e.innerHTML = `
  <div id="pvt-searchbox" class="pvt-searchbox">
    <div class="search-container">
        <div class="pvt-title-container"></div>
        <div class="input-container">
            <span class="icon-container">${si}</span>
            <input id="pvt-search-input" type="text" name="pvt-search" placeholder="Search" class="search-text" autocomplete="off" />
        </div>
    </div>
    <div class="pvt-search-results"></div>
    <div class="pvt-search-summary"></div>
    <div class="pvt-search-hints">
        <span>
            <span class="pvt-search-icon">${Go}</span>
            <span class="pvt-search-icon">${$o}</span>
            <span class="pvt-search-text">to navigate</span>
        </span>
        <span>
            <span class="pvt-search-icon">${qo}</span>
            <span class="pvt-search-text">to select</span>
        </span>
        <span>
            <span class="pvt-search-icon">esc</span>
            <span class="pvt-search-text">to close</span>
        </span>
    </div>
  </div>
`, this.searchBox = e.content.firstElementChild, this.searchInput = this.searchBox.querySelector("#pvt-search-input") ?? void 0, this.searchResultsContainer = this.searchBox.querySelector(".pvt-search-results") ?? void 0, this.searchSummaryContainer = this.searchBox.querySelector(".pvt-search-summary") ?? void 0;
    const n = this.searchBox.querySelector(".pvt-title-container");
    return this.title && n && (this.title instanceof HTMLElement ? n.appendChild(this.title) : n.textContent = this.title), (i = this.searchInput) == null || i.addEventListener("input", () => {
      this.searchAndShowResults(this.searchInput.value), this.updateHighlight();
    }), (s = this.searchInput) == null || s.addEventListener("keydown", (o) => {
      var l;
      if (o.key == "Escape") {
        this.dispatchEvent("pvt-searchbox-close");
        return;
      }
      if (!this.results || this.results.length < 1) return;
      const a = Math.min(this.MAX_RESULT_COUNT, this.results.length);
      switch (o.key) {
        case "ArrowDown":
          o.preventDefault(), this.highlightedIndex = (this.highlightedIndex + 1) % a, this.updateHighlight();
          break;
        case "ArrowUp":
          o.preventDefault(), this.highlightedIndex = (this.highlightedIndex - 1 + a) % a, this.updateHighlight();
          break;
        case "Enter":
          if (o.preventDefault(), this.highlightedIndex >= 0) {
            const d = (l = this.searchResultsContainer) == null ? void 0 : l.children[this.highlightedIndex];
            d == null || d.click();
          }
          break;
      }
    }), this.searchBox;
  }
  onDestroy() {
    var e;
    (e = this.searchBox) == null || e.remove(), this.searchBox = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  buildResult(e) {
    const i = document.createElement("template");
    i.innerHTML = `
  <div class="pvt-search-result">
    <div>
        <div class="pvt-search-result__nodepreview"></div>
        <div class="pvt-search-result__name"></div>
    </div>
    <div class="pvt-search-result__info">
        <div class="pvt-search-result__info_key"></div>
        <div class="pvt-search-result__info_value"></div>
    </div>
  </div>
`;
    const s = e[0], o = e[1], a = i.content.firstElementChild, l = a.querySelector(".pvt-search-result__nodepreview") ?? void 0, d = a.querySelector(".pvt-search-result__name") ?? void 0, c = a.querySelector(".pvt-search-result__info_key") ?? void 0, u = a.querySelector(".pvt-search-result__info_value") ?? void 0;
    return a.addEventListener("click", () => {
      this.clickHandler(s);
    }), l == null || l.appendChild($e(s, { size: 30 })), d.textContent = se(s, this.uiManager.getOptions().mainHeader), c.textContent = `.${o.key}: `, u.textContent = o.value, a;
  }
  updateHighlight() {
    !this.results || !this.searchResultsContainer || this.results.forEach((e, n) => {
      var s;
      const i = (s = this.searchResultsContainer) == null ? void 0 : s.children[n];
      i && (n === this.highlightedIndex ? i.classList.add("active") : i.classList.remove("active"));
    });
  }
  search(e) {
    const n = [], i = e.trim().toLowerCase();
    if (!(!i || i.length < 2)) {
      for (const s of this.uiManager.graph.getMutableNodes()) {
        const o = s.getData();
        for (const a in o) {
          const l = o[a];
          if (l == null) continue;
          const d = String(l).toLowerCase();
          let c = i.startsWith('"') ? i.slice(1) : i;
          const u = i.startsWith('"') && i.endsWith('"');
          if (u && (c = c.slice(0, -1).trim()), u ? d === c : d.includes(c)) {
            const g = { key: a, value: String(l) };
            n.push([s, g]);
            break;
          }
        }
      }
      return n;
    }
  }
  clickHandler(e) {
    this.dispatchEvent("pvt-searchbox-select", e);
  }
  searchAndShowResults(e) {
    if (!(!this.searchResultsContainer || !this.searchSummaryContainer) && (this.results = void 0, this.searchResultsContainer.innerHTML = "", this.searchSummaryContainer.innerHTML = "", this.results = this.search(e), this.results)) {
      const n = [];
      for (const i of this.results) {
        if (n.length >= this.MAX_RESULT_COUNT) break;
        n.push(this.buildResult(i));
      }
      n.forEach((i) => {
        var s;
        (s = this.searchResultsContainer) == null || s.appendChild(i);
      }), this.searchSummaryContainer.appendChild(this.createSummary());
    }
  }
  createSummary() {
    if (!this.results) return document.createElement("div");
    let e = "";
    this.results.length === 0 ? e = "No results found" : this.results.length > this.MAX_RESULT_COUNT ? e = `Showing top ${this.MAX_RESULT_COUNT} of ${this.results.length} results` : e = `${this.results.length} results`;
    const n = document.createElement("template");
    return n.innerHTML = `
  <div>
    ${e}
  </div>
`, n.content.firstElementChild;
  }
  dispatchEvent(e, n) {
    if (!this.searchBox) return;
    const i = new CustomEvent(e, {
      detail: n,
      bubbles: !0,
      cancelable: !0
    });
    this.searchBox.dispatchEvent(i);
  }
}
function xi(r, t) {
  return new Promise((e) => {
    var i, s;
    const n = r.createModal({
      body: "",
      buttons: null,
      position: "top",
      size: "xl",
      noBodyPadding: !0
    });
    if (!n) {
      e(null);
      return;
    }
    (i = n.modal) == null || i.addEventListener("pvt-modal-show", () => {
      var a, l, d;
      const o = new zl(r, t);
      n.setBody(o.build()), (a = o.searchInput) == null || a.focus(), (l = o.searchBox) == null || l.addEventListener(
        "pvt-searchbox-select",
        (c) => {
          e(c.detail), n.destroy();
        }
      ), (d = o.searchBox) == null || d.addEventListener(
        "pvt-searchbox-close",
        () => {
          e(null), n.destroy();
        }
      );
    }), (s = n.modal) == null || s.addEventListener(
      "pvt-modal-hidden",
      () => {
        e(null);
      }
    );
  });
}
class Hl {
  constructor(t, e) {
    h(this, "field");
    h(this, "config");
    h(this, "dropdown");
    h(this, "isOpen", !1);
    h(this, "items", []);
    h(this, "highlightedIndex", 0);
    /** Index in the field value right after the trigger — the start of the replaceable query. */
    h(this, "queryStart", -1);
    /** Guards async source results against a newer keystroke landing first. */
    h(this, "requestToken", 0);
    // -------------------------------------------------------------------------
    // Field events
    // -------------------------------------------------------------------------
    h(this, "onInput", () => {
      const t = this.findActiveQuery();
      if (!t || t.query.length < this.config.minQueryLength) {
        this.close();
        return;
      }
      this.queryStart = t.start;
      const e = ++this.requestToken;
      Promise.resolve(this.config.source(t.query)).then((n) => {
        if (e === this.requestToken) {
          if (!this.findActiveQuery()) {
            this.close();
            return;
          }
          if (this.items = n.slice(0, this.config.maxResults), this.items.length === 0) {
            this.close();
            return;
          }
          this.highlightedIndex = 0, this.renderItems(t.query), this.open();
        }
      });
    });
    h(this, "onBlur", () => {
      this.close();
    });
    h(this, "onKeyDown", (t) => {
      if (!(!this.isOpen || document.activeElement !== this.field))
        switch (t.key) {
          case "ArrowDown":
            t.preventDefault(), t.stopPropagation(), this.move(1);
            break;
          case "ArrowUp":
            t.preventDefault(), t.stopPropagation(), this.move(-1);
            break;
          case "Enter":
          case "Tab":
            t.preventDefault(), t.stopPropagation(), this.select(this.highlightedIndex);
            break;
          case "Escape":
            t.preventDefault(), t.stopPropagation(), this.close();
            break;
        }
    });
    h(this, "onOutsidePointerDown", (t) => {
      const e = t.target;
      !this.dropdown.contains(e) && e !== this.field && this.close();
    });
    /** Anchor the dropdown just under the caret, in screen space, flipping up near the viewport edge. */
    h(this, "reposition", () => {
      if (!this.isOpen) return;
      const t = this.field.getBoundingClientRect(), e = this.field.offsetWidth ? t.width / this.field.offsetWidth : 1, n = this.field.offsetHeight ? t.height / this.field.offsetHeight : 1, i = $l(this.field, this.field.selectionStart ?? 0), s = t.left + (i.left - this.field.scrollLeft) * e, o = t.top + (i.top - this.field.scrollTop) * n, a = o + i.height * n;
      this.dropdown.style.position = "fixed", this.dropdown.style.left = "0", this.dropdown.style.top = "0", this.dropdown.style.visibility = "hidden", this.dropdown.style.display = "block";
      const l = this.dropdown.offsetWidth, d = this.dropdown.offsetHeight, c = 8;
      let u = s;
      u + l > window.innerWidth - c && (u = window.innerWidth - l - c), u < c && (u = c);
      let p = a + 4;
      if (p + d > window.innerHeight - c) {
        const g = o - d - 4;
        p = g >= c ? g : Math.max(c, window.innerHeight - d - c);
      }
      this.dropdown.style.left = `${u}px`, this.dropdown.style.top = `${p}px`, this.dropdown.style.visibility = "";
    });
    this.field = t, this.config = {
      minQueryLength: 0,
      maxResults: 8,
      ...e
    }, this.dropdown = document.createElement("div"), this.dropdown.className = "pvt-typeahead", this.dropdown.addEventListener("mousedown", (n) => n.preventDefault()), this.field.addEventListener("input", this.onInput), this.field.addEventListener("blur", this.onBlur), this.field.addEventListener("scroll", this.reposition);
  }
  /** Tear down all listeners and remove the dropdown from the DOM. */
  destroy() {
    this.close(), this.field.removeEventListener("input", this.onInput), this.field.removeEventListener("blur", this.onBlur), this.field.removeEventListener("scroll", this.reposition);
  }
  // -------------------------------------------------------------------------
  // Trigger detection
  // -------------------------------------------------------------------------
  /**
   * Find the active query: the text between the last {@link TypeaheadConfig.trigger} before the
   * caret and the caret itself. Returns `null` when there is no open trigger (no trigger found,
   * or the run was already closed / spans a line break).
   */
  findActiveQuery() {
    const t = this.field.selectionStart ?? 0;
    if ((this.field.selectionEnd ?? 0) !== t) return null;
    const e = this.field.value.slice(0, t), n = e.lastIndexOf(this.config.trigger);
    if (n === -1) return null;
    const i = e.slice(n + this.config.trigger.length);
    return i.includes(`
`) || i.includes(this.config.trigger) || this.config.closing && i.includes(this.config.closing) ? null : { start: n + this.config.trigger.length, query: i };
  }
  // -------------------------------------------------------------------------
  // Selection
  // -------------------------------------------------------------------------
  move(t) {
    const e = this.items.length;
    this.highlightedIndex = (this.highlightedIndex + t + e) % e, this.updateHighlight();
  }
  select(t) {
    var p, g;
    const e = this.items[t];
    if (!e) return;
    const n = this.field.selectionStart ?? 0, i = this.field.value, s = i.slice(n), { closing: o } = this.config;
    let a = "", l = 0;
    o && (s.startsWith(o) ? l = o.length : a = o);
    const d = e.value + a, c = i.slice(0, this.queryStart) + d + s, u = this.queryStart + d.length + l;
    this.field.value = c, this.field.setSelectionRange(u, u), this.field.dispatchEvent(new Event("input", { bubbles: !0 })), (g = (p = this.config).onSelect) == null || g.call(p, e), this.close(), this.field.focus();
  }
  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------
  renderItems(t) {
    this.dropdown.replaceChildren(), this.items.forEach((e, n) => {
      const i = document.createElement("div");
      i.className = "pvt-typeahead__item", i.setAttribute("role", "option"), this.config.renderItem ? i.appendChild(this.config.renderItem(e, t)) : i.textContent = e.label, i.addEventListener("mouseenter", () => {
        this.highlightedIndex = n, this.updateHighlight();
      }), i.addEventListener("click", () => this.select(n)), this.dropdown.appendChild(i);
    }), this.updateHighlight();
  }
  updateHighlight() {
    const t = this.dropdown.children;
    for (let e = 0; e < t.length; e++) {
      const n = t[e], i = e === this.highlightedIndex;
      n.classList.toggle("active", i), i && n.scrollIntoView({ block: "nearest" });
    }
  }
  // -------------------------------------------------------------------------
  // Open / close / position
  // -------------------------------------------------------------------------
  open() {
    this.isOpen || (document.body.appendChild(this.dropdown), document.addEventListener("keydown", this.onKeyDown, !0), document.addEventListener("pointerdown", this.onOutsidePointerDown, !0), window.addEventListener("scroll", this.reposition, !0), window.addEventListener("resize", this.reposition), this.isOpen = !0), this.reposition();
  }
  close() {
    this.isOpen && (this.isOpen = !1, this.requestToken++, this.dropdown.remove(), document.removeEventListener("keydown", this.onKeyDown, !0), document.removeEventListener("pointerdown", this.onOutsidePointerDown, !0), window.removeEventListener("scroll", this.reposition, !0), window.removeEventListener("resize", this.reposition));
  }
}
const Gl = [
  "boxSizing",
  "width",
  "height",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",
  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration",
  "letterSpacing",
  "wordSpacing",
  "tabSize"
];
function $l(r, t) {
  const e = r.nodeName === "INPUT", n = window.getComputedStyle(r), i = document.createElement("div");
  i.className = "pvt-typeahead-mirror";
  const s = i.style;
  s.position = "absolute", s.visibility = "hidden", s.whiteSpace = e ? "nowrap" : "pre-wrap", s.setProperty("word-wrap", e ? "normal" : "break-word"), s.overflow = "hidden";
  const o = s, a = n;
  for (const p of Gl)
    o[p] = a[p];
  e && (s.height = "auto"), document.body.appendChild(i), i.textContent = r.value.slice(0, t), e && (i.textContent = i.textContent.replace(/\s/g, " "));
  const l = document.createElement("span");
  l.textContent = r.value.slice(t) || ".", i.appendChild(l);
  const d = l.offsetTop + parseInt(n.borderTopWidth || "0", 10), c = l.offsetLeft + parseInt(n.borderLeftWidth || "0", 10), u = parseInt(n.lineHeight || "0", 10) || l.offsetHeight;
  return document.body.removeChild(i), { top: d, left: c, height: u };
}
Z.prototype.transition = ni;
const Ul = [
  "#FDE68A",
  "#FCA5A5",
  "#93C5FD",
  "#86EFAC",
  "#C4B5FD"
];
class jl {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "graphSvgRenderer");
    h(this, "rendererOptions");
    h(this, "noteContentRenderer");
    h(this, "originalContentMap", /* @__PURE__ */ new WeakMap());
    h(this, "noteReferenceTypeaheads", /* @__PURE__ */ new WeakMap());
    this.rendererOptions = t, this.graph = e, this.graphSvgRenderer = n, this.noteContentRenderer = new Nl(this.graph);
  }
  render(t, e) {
    const n = t.node();
    if (!n) return;
    e.setGraphElement(n);
    const i = this.createNoteForeignObject(e);
    n.appendChild(i), this.makeDraggable(t, e), this.makeResizable(t, e);
    const s = n.querySelector(".pvt-note-content");
    this.bindEditing(s, e);
  }
  createNoteForeignObject(t) {
    const e = Bs("foreignObject", {
      class: "pvt-note-fo",
      width: t.width,
      height: t.height
    }), n = document.createElement("div");
    return n.classList.add("pvt-note"), n.style.setProperty("--note-color", t.color), n.classList.toggle("pvt-note--terminal", t.surface === "terminal"), t.isEditing() && n.classList.add("editing"), n.appendChild(this.createHeader(n, t)), n.appendChild(this.createLink(t)), n.appendChild(this.createContent(t)), n.appendChild(this.createResizeHandle()), e.appendChild(n), requestAnimationFrame(() => {
      this.refreshLink(t);
    }), e;
  }
  createHeader(t, e) {
    const n = x("div", {
      class: "pvt-note-header"
    }), i = x("div", { class: "pvt-note-head-left" });
    return i.appendChild(this.createColorPills(t, e)), i.appendChild(this.createSurfaceToggle(t, e)), n.appendChild(i), n.appendChild(this.createActionButtons(e)), n;
  }
  /** Small toggle beside the colour pills: switches jewel ↔ terminal surface. */
  createSurfaceToggle(t, e) {
    const n = P({
      title: "Toggle terminal look",
      svgIcon: la,
      class: ["pvt-note-surface-toggle"],
      variant: "outline-secondary",
      size: "xs",
      onClick: () => {
        const i = e.surface === "terminal" ? "jewel" : "terminal";
        e.setSurface(i), t.classList.toggle("pvt-note--terminal", i === "terminal"), n.classList.toggle("is-active", i === "terminal"), this.graph.noteManager.editNote(e);
      }
    });
    return n.classList.toggle("is-active", e.surface === "terminal"), n;
  }
  createLink(t) {
    const e = x("div", {
      class: "pvt-note-link-container"
    }), n = document.createElement("div");
    n.classList.add("pvt-note-link-subcontainer");
    const i = B({ svgIcon: Xo });
    i.classList.add("pvt-note-link-placeholder-icon"), n.appendChild(i);
    const s = P({
      title: "Search for a note",
      svgIcon: si,
      class: ["pvt-node-search-button"],
      variant: "outline-secondary",
      size: "xs",
      onClick: async (a) => {
        const l = a.target;
        if (!l.closest(".editing") || l.closest(".unlink-note") || l.closest(".pvt-node-reference"))
          return;
        a.stopPropagation();
        const d = await xi(
          this.graph.UIManager,
          "Select a node to link to this note"
        );
        d && (t.setAttachedElement({ type: "node", id: d.id }), this.graph.noteManager.editNote(t), this.refreshLink(t));
      }
    });
    n.appendChild(s);
    const o = document.createElement("div");
    return o.classList.add("pvt-note-link-content"), n.appendChild(o), e.appendChild(n), e;
  }
  refreshLink(t) {
    const e = t.getGraphElement();
    if (!e) return;
    const n = e.querySelector(".pvt-note-link-container");
    if (!n) return;
    const i = e.querySelector(".pvt-note-link-content");
    if (!i) return;
    i.replaceChildren();
    const s = t.getAttachedElement();
    if (s && s.type === "node") {
      n.classList.add("has-link");
      const o = this.graph.getMutableNode(s.id);
      if (o) {
        const a = document.createElement("div");
        a.classList.add("pvt-note-link-row");
        const l = document.createElement("span");
        l.classList.add(
          "pvt-node-reference",
          "resolved"
        ), l.dataset.nodeId = o.id;
        const d = this.graphSvgRenderer.nodeDrawer.getNodeStyle(o);
        or(l, d.color);
        const c = se(o, this.graph.UIManager.getOptions().mainHeader).trim();
        l.textContent = c, a.appendChild(l);
        const u = P({
          variant: "outline-danger",
          svgIcon: oi,
          size: "xs",
          class: ["ms-auto", "unlink-note"],
          onClick: () => {
            t.setAttachedElement(void 0), this.graph.noteManager.editNote(t), this.refreshLink(t);
          }
        });
        a.appendChild(u), i.appendChild(a);
      } else {
        const a = document.createElement("span");
        a.classList.add("pvt-node-reference", "unresolved"), a.textContent = `Missing node: ${s.id}`, i.appendChild(a);
      }
    } else {
      n.classList.remove("has-link");
      const o = document.createElement("div");
      o.classList.add("pvt-note-link-placeholder");
      const a = document.createElement("span");
      a.textContent = "Link this note to a node", o.appendChild(a), i.appendChild(o);
    }
  }
  createContent(t) {
    const e = document.createElement("div");
    e.classList.add("pvt-note-content");
    const n = document.createElement("div");
    n.classList.add("pvt-note-content-rendered", "pvt-markdown"), this.noteContentRenderer.render(t, n);
    const i = document.createElement("textarea");
    return i.classList.add("pvt-note-editor"), i.value = t.content, e.appendChild(n), e.appendChild(i), e;
  }
  createColorPills(t, e) {
    const n = x("span", {
      class: "pvt-note-color-pills"
    });
    return Ul.forEach((i) => {
      const s = x("span", {
        style: `background: ${i}`,
        class: ["pvt-note-color-pill", e.color === i ? "pill-active" : ""]
      });
      s.addEventListener("click", () => {
        t.querySelectorAll(".pvt-note-color-pill").forEach((a) => a.classList.remove("pill-active")), s.classList.add("pill-active"), t.style.setProperty("--note-color", i), e.setColor(i), this.graph.noteManager.editNote(e);
      }), n.appendChild(s);
    }), n;
  }
  createResizeHandle() {
    return x("span", {
      class: "pvt-note-resize-handle"
    });
  }
  createActionButtons(t) {
    const e = x("div", {
      class: "pvt-note-actions"
    }), n = P({
      title: "Edit the note",
      svgIcon: Kt,
      class: ["pvt-note-edit-button"],
      variant: "outline-secondary",
      size: "xs",
      onClick: () => {
        t.isEditing() ? this.saveEditMode(t) : this.enterEditMode(t);
      }
    }), i = P({
      title: "Remove the note",
      svgIcon: ln,
      class: ["pvt-node-remove-button"],
      variant: "outline-danger",
      size: "xs",
      onClick: () => {
        this.graph.noteManager.removeNote(t);
      }
    });
    return e.appendChild(n), e.appendChild(i), e;
  }
  updateEditButtonState(t, e) {
    const n = e.getGraphElement();
    if (!n) return;
    const i = n.querySelector(".pvt-note-edit-button");
    if (!i) return;
    const s = i.querySelector(".pvt-note-edit-button .pvt-icon");
    if (!s) return;
    s.replaceChildren();
    const o = V(
      t ? Ws : Kt
    );
    t ? (i.classList.add("pivotick-button-success"), i.classList.remove("pivotick-button-outline-secondary"), s.setAttribute("title", "Edit the note")) : (i.classList.add("pivotick-button-outline-secondary"), i.classList.remove("pivotick-button-success"), s.setAttribute("title", "Save changes")), s.appendChild(o);
  }
  updatePositions(t) {
    t.attr("transform", (e) => {
      const n = isFinite(e.x) ? e.x : 0, i = isFinite(e.y) ? e.y : 0;
      return `translate(${n},${i})`;
    });
  }
  updateNoteSize(t, e) {
    t.select("foreignObject").attr("width", e.width).attr("height", e.height);
  }
  enterEditMode(t) {
    const e = t.getGraphElement();
    if (!e) return;
    const n = e.querySelector(".pvt-note-content-rendered"), i = e.querySelector(".pvt-note-editor");
    !n || !i || (this.originalContentMap.set(t, t.content), t.setEditing(!0), e.classList.add("editing"), i.value = t.content, n.style.display = "none", i.style.display = "block", this.updateEditButtonState(!0, t), this.graph.editing.connectManager.startNoteClickConnection(), requestAnimationFrame(() => {
      i.focus(), i.setSelectionRange(
        i.value.length,
        i.value.length
      );
    }));
  }
  saveEditMode(t) {
    const e = t.getGraphElement();
    if (!e) return;
    const n = e.querySelector(".pvt-note-content-rendered"), i = e.querySelector(".pvt-note-editor");
    !n || !i || (t.setEditing(!1), e.classList.remove("editing"), t.setContent(i.value), this.noteContentRenderer.render(t, n), n.style.display = "block", i.style.display = "none", this.graph.editing.connectManager.cancel(), this.updateEditButtonState(!1, t), this.graph.noteManager.editNote(t), this.graphSvgRenderer.dataUpdate());
  }
  cancelEditMode(t) {
    const e = t.getGraphElement();
    if (!e) return;
    const n = e.querySelector(".pvt-note-content-rendered"), i = e.querySelector(".pvt-note-editor");
    if (!n || !i) return;
    t.setEditing(!1), e.classList.remove("editing");
    const s = this.originalContentMap.get(t);
    s !== void 0 && (i.value = s), n.style.display = "block", i.style.display = "none", this.graph.editing.connectManager.cancel(), this.graphSvgRenderer.dataUpdate();
  }
  bindEditing(t, e) {
    const n = t.querySelector(".pvt-note-content-rendered"), i = t.querySelector(".pvt-note-editor");
    !n || !i || (this.attachNodeReferenceTypeahead(i), n.addEventListener("dblclick", () => {
      this.enterEditMode(e);
    }), i.addEventListener("keydown", (s) => {
      s.key === "Escape" && this.cancelEditMode(e), (s.metaKey || s.ctrlKey) && s.key === "Enter" && this.saveEditMode(e);
    }));
  }
  /**
   * Wire `[[…]]` node-name autocomplete onto a note's editor textarea. Typing `[[` opens a
   * caret-anchored list of graph nodes filtered by the text after it (by display name or id);
   * choosing one inserts the node's name and the closing `]]`, which the markdown renderer then
   * resolves to a live node reference (see nodeReferenceExtension / markdownResolvers).
   *
   * The typeahead swallows its own navigation keys while open, so ↑/↓/Enter/Esc drive the list
   * rather than the note editor (Esc closes the list instead of cancelling the edit).
   */
  attachNodeReferenceTypeahead(t) {
    if (this.noteReferenceTypeaheads.has(t)) return;
    const e = new Hl(t, {
      trigger: "[[",
      closing: "]]",
      maxResults: 8,
      source: (n) => {
        const i = n.trim().toLowerCase(), s = this.graph.UIManager.getOptions().mainHeader, o = [];
        for (const a of this.graph.getMutableNodes()) {
          const l = se(a, s).trim(), d = l && l !== "Optional name or label" ? l : a.id;
          if (!(i && !d.toLowerCase().includes(i) && !a.id.toLowerCase().includes(i)) && (o.push({ value: d, label: d, data: a }), o.length >= 20))
            break;
        }
        return o;
      },
      renderItem: (n) => {
        const i = n.data, s = x("div", { class: "pvt-typeahead__node-preview" });
        s.appendChild($e(i, { size: 22 }));
        const o = x("div", { class: "pvt-typeahead__node-name" }, [n.label]);
        return x("div", { class: "pvt-typeahead__node" }, [s, o]);
      }
    });
    this.noteReferenceTypeaheads.set(t, e);
  }
  makeDraggable(t, e) {
    const n = t.select(".pvt-note");
    let i = !1, s = 0, o = 0, a = 0, l = 0;
    n.on("mousedown", (d) => {
      const c = d.target;
      if (c.closest("button, a, .pvt-note-resize-handle, .pvt-node-reference, .pvt-note-color-pill, .pvt-note-editor") || e.isEditing() && !c.closest(".pvt-note-header")) return;
      d.preventDefault(), d.stopPropagation(), i = !0, s = d.clientX, o = d.clientY, a = e.x, l = e.y;
      const u = (g) => {
        var T;
        if (!i) return;
        const f = this.graphSvgRenderer, v = f.screenToGraphCoordinates(s, o), y = f.screenToGraphCoordinates(g.clientX, g.clientY), b = y.x - v.x, k = y.y - v.y, C = this.graph.simulation;
        e.setPosition(C.snapToGrid(a + b), C.snapToGrid(l + k)), t.attr("transform", `translate(${e.x},${e.y})`), t.classed("dragging", !0), (T = window.getSelection()) == null || T.removeAllRanges(), document.body.classList.add("pvt-disable-selection"), this.graphSvgRenderer.updateNoteEdgePositions();
      }, p = () => {
        i = !1, document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p), t.style("user-select", "all"), t.classed("dragging", !1), document.body.classList.remove("pvt-disable-selection");
      };
      document.addEventListener("mousemove", u), document.addEventListener("mouseup", p);
    });
  }
  makeResizable(t, e) {
    var d;
    const n = (d = t.node()) == null ? void 0 : d.querySelector(".pvt-note-resize-handle");
    if (!n) return;
    let i = !1, s = 0, o = 0, a = 0, l = 0;
    n.addEventListener("mousedown", (c) => {
      c.preventDefault(), c.stopPropagation(), i = !0, s = c.clientX, o = c.clientY, a = e.width, l = e.height;
      const u = (g) => {
        if (!i) return;
        const f = this.graphSvgRenderer, v = f.screenToGraphCoordinates(
          s,
          o
        ), y = f.screenToGraphCoordinates(
          g.clientX,
          g.clientY
        ), b = y.x - v.x, k = y.y - v.y;
        e.width = Math.max(180, a + b), e.height = Math.max(80, l + k), this.updateNoteSize(t, e), this.graphSvgRenderer.updateNoteEdgePositions();
      }, p = () => {
        i = !1, document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p);
      };
      document.addEventListener("mousemove", u), document.addEventListener("mouseup", p);
    });
  }
}
Z.prototype.transition = ni;
const ql = {
  type: "svg",
  enableFocusMode: !0,
  enableNodeExpansion: !0,
  beforeRender: () => {
  },
  zoomEnabled: !0,
  dragEnabled: !0,
  interactionEnabled: !0,
  minZoom: 0.05,
  maxZoom: 10,
  zoomAnimation: !0,
  zoomAnimationDuration: 300,
  defaultNodeStyle: Eo,
  defaultEdgeStyle: To,
  defaultLabelStyle: Wn,
  markerStyleMap: Co,
  selectionBox: {
    enabled: !0
  }
};
class Wl extends Da {
  constructor(e, n, i, s) {
    super(e, n, s);
    h(this, "options");
    h(this, "zoom");
    h(this, "eventHandler");
    h(this, "selectionBox", null);
    h(this, "graphInteraction");
    h(this, "nodeDrawer");
    h(this, "edgeDrawer");
    h(this, "noteDrawer");
    h(this, "lassoOverlay");
    h(this, "svgCanvas");
    // private progressBar: SVGRectElement
    h(this, "svg");
    h(this, "zoomGroup");
    h(this, "edgeGroup");
    h(this, "nodeGroup");
    h(this, "noteGroup");
    h(this, "noteEdgeGroup");
    h(this, "selectionBoxGroup");
    h(this, "defs");
    h(this, "shadowEdgeGroup");
    h(this, "shadowEdgePath");
    h(this, "handleLayer");
    h(this, "connectionHandle", null);
    h(this, "connectionHandleNode", null);
    h(this, "nodeGroupSelection");
    h(this, "edgeGroupSelection");
    h(this, "noteGroupSelection");
    h(this, "noteEdgeSelection");
    h(this, "nodeSelection");
    h(this, "edgeSelection");
    h(this, "noteSelection");
    h(this, "lassoModeActive", !1);
    /** Fires when the canvas becomes visible, to re-measure node sizes. */
    h(this, "sizeObserver", null);
    this.options = rt({}, ql, s), this.graphInteraction = i, this.eventHandler = new Ia(this.graph), this.nodeDrawer = new cn(this.options, this.graph, this), this.edgeDrawer = new Aa(this.options, this.graph, this), this.noteDrawer = new jl(this.options, this.graph, this), this.svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svgCanvas.setAttribute("width", "100%"), this.svgCanvas.setAttribute("height", "100%"), this.svgCanvas.setAttribute("fill", "none"), this.svgCanvas.setAttribute("class", "pvt-canvas-element"), this.svgCanvas.setAttribute("data-renderer-drag-enabled", this.options.dragEnabled ? "1" : "0"), this.getCanvas().appendChild(this.svgCanvas), this.svg = Z(this.svgCanvas), this.zoomGroup = this.svg.append("g").attr("class", "zoom-layer hidden"), this.edgeGroup = this.zoomGroup.append("g").attr("class", "edges"), this.shadowEdgeGroup = this.zoomGroup.append("g").attr("class", "shadow-edges").style("pointer-events", "none"), this.shadowEdgePath = this.shadowEdgeGroup.append("path").attr("class", "pvt-shadow-edge").style("display", "none"), this.noteEdgeGroup = this.zoomGroup.append("g").attr("class", "note-edges"), this.selectionBoxGroup = this.svg.append("g").attr("class", "selection-box"), this.nodeGroup = this.zoomGroup.append("g").attr("class", "nodes"), this.noteGroup = this.zoomGroup.append("g").attr("class", "notes"), this.handleLayer = this.zoomGroup.append("g").attr("class", "connection-handle-layer"), this.defs = this.svg.append("defs"), this.edgeDrawer.renderDefinitions(), this.lassoOverlay = new _a(this.options, this.graph, this), this.zoom = Lr(), this.zoom = this.zoom.filter((o) => {
      if (!this.options.zoomEnabled || o.ctrlKey || o.shiftKey || o.altKey)
        return !1;
      const a = o.target;
      return a.tagName === "INPUT" || a.tagName === "SELECT" || a.tagName === "TEXTAREA" || a.closest('[contenteditable="true"]') ? !1 : this.graph.editing.connectManager.isActiveAndNotIdle() ? o.type === "wheel" || o.button === 1 : !!this.graphInteraction.canvasBeforeZoom(o);
    }).scaleExtent([this.options.minZoom, this.options.maxZoom]).on("zoom", (o) => {
      this.zoomGroup.attr("transform", o.transform), this.graphInteraction.canvasZoom(o);
    }), this.svg.call(this.zoom), this.svg.on("dblclick.zoom", null), this.options.selectionBox.enabled && (this.selectionBox = new Oa(this, this.svgCanvas, this.selectionBoxGroup.node())), this.sizeObserver = new IntersectionObserver((o) => {
      o.some((a) => a.isIntersecting) && this.remeasureVisibleNodes();
    }, { threshold: 0 }), this.sizeObserver.observe(this.svgCanvas);
  }
  /**
   * Re-measure nodes still at the placeholder radius now the canvas is visible.
   * A node rendered while the canvas was hidden has no layout box, so it keeps
   * the default radius (25); once visible we can read its real bbox.
   *
   * No-op until the first render has assigned `nodeSelection` — the visibility
   * observer can fire before any data has been rendered (data-less construction
   * or a failed `init()`), where dereferencing `nodeSelection` would throw.
   */
  remeasureVisibleNodes() {
    this.nodeSelection && this.nodeSelection.each((e, n, i) => {
      if (e.getCircleRadius() !== 25) return;
      const s = i[n].querySelector(".node");
      if (!s) return;
      const o = s.getBBox();
      e.setCircleRadius(0.5 * Math.max(o.width, o.height));
    });
  }
  setupRendering() {
    this.createHtmlProgressBar();
  }
  /** Release renderer-owned resources so observers can't fire on a removed canvas. */
  destroy() {
    var e;
    (e = this.sizeObserver) == null || e.disconnect(), this.sizeObserver = null;
  }
  getZoomBehavior() {
    return this.zoom;
  }
  getZoomTransform() {
    return Dr(this.svgCanvas);
  }
  screenToGraphCoordinates(e, n) {
    const i = this.svgCanvas.getBoundingClientRect(), s = e - i.left, o = n - i.top, a = this.getZoomTransform();
    return {
      x: a.invertX(s),
      y: a.invertY(o)
    };
  }
  graphToScreenCoordinates(e, n) {
    const i = this.svgCanvas.getBoundingClientRect(), s = this.getZoomTransform(), o = s.applyX(e), a = s.applyY(n);
    return {
      x: o + i.left,
      y: a + i.top
    };
  }
  getSelectionBox() {
    return this.selectionBox;
  }
  getOptions() {
    return this.options;
  }
  getNodeStyle(e) {
    return this.nodeDrawer.getNodeStyle(e);
  }
  init() {
    this.options.beforeRender && this.options.beforeRender(this.graph), this.dataUpdate(), this.eventHandler.init(this, this.graphInteraction);
  }
  update(e = !1) {
    this.dataUpdate(), e && this.eventHandler.update();
  }
  dataUpdate() {
    const e = this.graph.getMutableNodes().filter((a) => a.visible), n = this.nodeGroup.node();
    this.nodeGroupSelection = this.nodeGroup.selectAll("g.pvt-node").filter(function() {
      return this.parentNode === n;
    }), this.nodeSelection = this.nodeGroupSelection.data(e, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-node", !0).classed("pvt-node-has-children", (l) => l.hasChildren()).classed("pvt-node-expanded", (l) => l.expanded === !0).each((l, d, c) => {
        l.clearDirty();
        const u = Z(c[d]);
        u.attr("id", `node-${l.domID}`), this.nodeDrawer.render(u, l);
      }),
      (a) => a.classed("pvt-node-expanded", (l) => l.expanded === !0).each((l, d, c) => {
        const u = Z(c[d]);
        if (l.isDirty()) {
          if (l.clearDirty(), !l.expanded) {
            H.collapseAllOpenedClusters(l), H.toggleSyntheticEdges(l), H.resolveCrossClusterEdges(this.nodeDrawer.graph);
            const p = this.nodeDrawer.graph.getParentGraph();
            let g = p;
            for (; g; )
              g.renderer.update(!1), g = g.getParentGraph();
            p && H.updateToNewRadiusCollapsed(l, !0, p);
          }
          u.selectChildren().remove(), this.nodeDrawer.render(u, l);
        }
        this.nodeDrawer.checkForHighlight(u, l);
      }),
      (a) => a.remove()
    );
    const i = this.graph.getMutableEdges().filter((a) => a.visible);
    this.edgeGroupSelection = this.edgeGroup.selectAll("g.pvt-edge-group"), this.edgeSelection = this.edgeGroupSelection.data(i, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-edge-group", !0).classed("pvt-edge-synthetic", (l) => l.isSynthetic === !0).each((l, d, c) => {
        l.clearDirty();
        const u = Z(c[d]);
        u.attr("id", `edge-${l.domID}`), this.edgeDrawer.render(u, l);
      }),
      (a) => a.each((l, d, c) => {
        if (l.isDirty()) {
          l.clearDirty();
          const u = Z(c[d]);
          u.selectChildren().remove(), this.edgeDrawer.render(u, l);
        }
      }),
      (a) => a.remove()
    );
    const s = this.graph.noteManager.getVisibleNotes();
    this.noteGroupSelection = this.noteGroup.selectAll("g.pvt-note"), this.noteSelection = this.noteGroupSelection.data(s, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-note", !0).each((l, d, c) => {
        const u = Z(c[d]);
        u.attr("id", `note-${l.domID}`), this.noteDrawer.render(u, l);
      }),
      (a) => a.each((l, d, c) => {
        if (!l.isDirty() && !l.isAttachmentDirty())
          return;
        const u = Z(c[d]);
        l.isAttachmentDirty() ? (this.noteDrawer.refreshLink(l), l.clearAttachmentDirty()) : l.isEditing() || (l.clearDirty(), u.selectChildren().remove(), this.noteDrawer.render(u, l));
      }),
      (a) => a.remove()
    );
    const o = [];
    for (const a of this.graph.noteManager.getVisibleNotes()) {
      const l = a.getAttachedElement();
      if (!l || l.type !== "node") continue;
      const d = this.graph.getMutableNode(l.id);
      !d || !d.visible || o.push({ note: a, target: d });
    }
    this.noteEdgeSelection = this.noteEdgeGroup.selectAll("path").data(o, (a) => a.note.id).join(
      (a) => a.append("path").attr("class", "pvt-note-edge").attr("d", (l) => this.noteEdgePath(l.note, l.target)),
      (a) => a.attr("d", (l) => this.noteEdgePath(l.note, l.target)),
      (a) => a.remove()
    );
  }
  getCanvasSelection() {
    return this.svg;
  }
  getZoomGroup() {
    return this.zoomGroup.node();
  }
  nextTick() {
    this.updateEdgePositions(), this.updateNoteEdgePositions(), this.updateNotePositions(), this.updateNodePositions();
  }
  nextTickFor(e) {
    this.updateEdgePositions(e), this.updateNodePositions(e);
  }
  zoomIn() {
    const e = this.getZoomBehavior(), n = this.getCanvasSelection();
    !e || !n || (this.options.zoomAnimation ? n.transition().duration(300).call(e.scaleBy, 1.5) : n.call(e.scaleBy, 1.5));
  }
  zoomOut() {
    const e = this.getZoomBehavior(), n = this.getCanvasSelection();
    !e || !n || (this.options.zoomAnimation ? n.transition().duration(300).call(e.scaleBy, 0.667) : n.call(e.scaleBy, 0.667));
  }
  fitAndCenter(e) {
    const n = this.getZoomBehavior(), i = this.getCanvasSelection(), s = i.node(), o = i.select(".zoom-layer").node();
    if (!n || !s || !o || !s.isConnected || s.clientWidth === 0 || s.clientHeight === 0) return;
    const a = o.getBBox();
    if (a.width == 0 || a.height == 0) return;
    const l = s.clientWidth, d = s.clientHeight, c = a.width, u = a.height, p = a.x + c / 2, g = a.y + u / 2;
    let f;
    e ? f = e : (f = Math.min(
      l / c,
      d / u
    ) * 0.8, f = Math.min(f, 3));
    const v = l / 2 - f * p, y = d / 2 - f * g, b = qi.translate(v, y).scale(f);
    this.options.zoomAnimation ? i.transition().duration(this.options.zoomAnimationDuration).call(n.transform, b) : i.call(n.transform, b);
  }
  /**
   * Fit-and-centre once the zoom layer has stopped resizing.
   *
   * Some content lays out over several animation frames + d3 transitions
   * *after* the main sim stops (i.e. after `waitForSimulationStop()`
   * resolves) — e.g. an expanded cluster drawing its bubble/badges and its
   * nested subgraph. Fitting right then measures a transient bbox and locks in
   * a wrong, off-centre transform that is never corrected. So poll `getBBox()`
   * until it holds steady for a few frames (hard-capped so it can never hang),
   * then fit. This is cause-agnostic: a static layout is already steady and
   * resolves in a few frames; anything still moving is waited out.
   */
  fitAndCenterWhenSettled(e) {
    const n = this.zoomGroup.node();
    if (!n) {
      this.fitAndCenter(e);
      return;
    }
    const i = 180, s = 3, o = 0.5;
    let a = null, l = 0, d = 0;
    const c = () => {
      const u = n.getBBox();
      if (l = a !== null && Math.abs(u.width - a.width) < o && Math.abs(u.height - a.height) < o && Math.abs(u.x - a.x) < o && Math.abs(u.y - a.y) < o ? l + 1 : 0, a = u, d++, l >= s || d >= i) {
        this.fitAndCenter(e);
        return;
      }
      requestAnimationFrame(c);
    };
    requestAnimationFrame(c);
  }
  focusElement(e) {
    const n = e.getGraphElement(), i = this.getZoomBehavior(), s = this.getCanvasSelection(), o = s.node(), a = s.select(".zoom-layer").node();
    if (!i || !o || !a || !n) return;
    const l = a.getBBox(), d = o.clientWidth, c = o.clientHeight, u = l.width, p = l.height;
    let g = 0, f = 0;
    e instanceof ae ? (g = ((e.from.x ?? 0) + (e.to.x ?? 0)) / 2, f = ((e.from.y ?? 0) + (e.to.y ?? 0)) / 2) : (g = e.x ?? 0, f = e.y ?? 0);
    const v = Math.min(
      d / u,
      c / p
    ) * 1.5, y = d / 2 - v * g, b = c / 2 - v * f, k = qi.translate(y, b).scale(v);
    s.transition().duration(300).call(i.transform, k);
  }
  highlightElement(e) {
    const n = e.getGraphElement();
    e instanceof ae ? (this.edgeSelection.classed("pvt-edge-highlighted", !1), n == null || n.classList.add("pvt-edge-highlighted")) : e instanceof W && (this.nodeSelection.classed("pvt-node-highlighted", !1), n == null || n.classList.add("pvt-node-highlighted"));
  }
  unHighlightElement(e) {
    const n = e.getGraphElement();
    e instanceof ae ? n == null || n.classList.remove("pvt-edge-highlighted") : e instanceof W && (n == null || n.classList.remove("pvt-node-highlighted"));
  }
  clearHighlightedElements() {
    this.edgeSelection.classed("pvt-edge-highlighted", !1), this.nodeSelection.classed("pvt-node-highlighted", !1);
  }
  updateNodePositions(e) {
    if (e) {
      const n = new Set(e == null ? void 0 : e.map((s) => s.id)), i = this.nodeSelection.filter((s) => n.has(s.id));
      this.nodeDrawer.updatePositions(i);
    } else
      this.nodeDrawer.updatePositions(this.nodeSelection);
  }
  updateEdgePositions(e) {
    if (e) {
      const n = e.flatMap((o) => [...o.getEdgesOut(), ...o.getEdgesIn()]), i = new Set(n == null ? void 0 : n.map((o) => o.id)), s = this.edgeSelection.filter((o) => i.has(o.id));
      this.edgeDrawer.updatePositions(s);
    } else
      this.edgeDrawer.updatePositions(this.edgeSelection);
  }
  updateNoteEdgePositions() {
    this.noteEdgeSelection && this.noteEdgeSelection.attr("d", (e) => this.noteEdgePath(e.note, e.target));
  }
  noteEdgePath(e, n) {
    const i = e.x + e.width / 2, s = e.y + e.height / 2, o = n.x ?? 0, a = n.y ?? 0, l = o - i, d = a - s, c = Math.hypot(l, d);
    if (c === 0) return null;
    const u = l / c, p = d / c, g = 4, f = i + u * g, v = s + p * g, y = n.getCircleRadius() || this.nodeDrawer.getNodeStyle(n).size, b = 8, k = o - u * (y + b), C = a - p * (y + b);
    return `M ${f},${v} L ${k},${C}`;
  }
  updateNotePositions() {
    this.noteDrawer.updatePositions(this.noteSelection);
  }
  getNodeSelection() {
    return this.nodeSelection;
  }
  getEdgeSelection() {
    return this.edgeSelection;
  }
  getNoteSelection() {
    return this.noteSelection;
  }
  // @ts-expect-error fixme: Don't really understand the typescript error below
  getGraphInteraction() {
    return this.graphInteraction;
  }
  getEventHandler() {
    return this.eventHandler;
  }
  toggleLassoMode(e) {
    this.lassoModeActive = e, this.lassoOverlay.setEnabled(e);
  }
  enterNoteEditMode(e) {
    this.noteDrawer.enterEditMode(e);
  }
  getNodeClosestToCursor(e) {
    e = e ?? 1 / 0;
    const n = this.graphInteraction.getLastPointerEvent();
    if (!n)
      return null;
    const i = this.svgCanvas.getBoundingClientRect(), s = n.clientX - i.left, o = n.clientY - i.top, a = this.getZoomTransform(), l = a.invertX(s), d = a.invertY(o);
    let c = null, u = 1 / 0;
    const p = this.graph.getMutableNodes().filter((g) => g.visible);
    for (const g of p) {
      const f = (g.x ?? 0) - l, v = (g.y ?? 0) - d, y = Math.sqrt(f * f + v * v);
      y < u && y <= e && (u = y, c = g);
    }
    return c;
  }
  getClosestElementToCursor(e) {
    e = e ?? 1 / 0;
    const n = this.graphInteraction.getLastPointerEvent();
    if (!n)
      return null;
    const i = this.svgCanvas.getBoundingClientRect(), s = n.clientX - i.left, o = n.clientY - i.top, a = this.getZoomTransform(), l = a.invertX(s), d = a.invertY(o);
    let c = null, u = 1 / 0;
    const p = (g, f, v) => {
      const y = f - l, b = v - d, k = g instanceof ve ? this.getDistanceToNote(g, l, d) : Math.sqrt(y * y + b * b);
      k < u && k <= e && (u = k, c = g);
    };
    for (const g of this.graph.getMutableNodes())
      g.visible && p(g, g.x ?? 0, g.y ?? 0);
    for (const g of this.graph.getNotes())
      g.visible && p(g, g.x ?? 0, g.y ?? 0);
    return c;
  }
  getDistanceToNote(e, n, i) {
    const s = e.x, o = e.x + e.width, a = e.y, l = e.y + e.height;
    if (n >= s && n <= o && i >= a && i <= l)
      return 0;
    const d = Math.max(s, Math.min(n, o)), c = Math.max(a, Math.min(i, l));
    return Math.hypot(n - d, i - c);
  }
  showShadowEdge(e) {
    const { source: n, targetNode: i, targetPosition: s, invalid: o = !1 } = e;
    if (n.x == null || n.y == null)
      return;
    let a, l, d = 0;
    if (i) {
      if (i.x == null || i.y == null)
        return;
      a = i.x, l = i.y, d = i.getCircleRadius() || this.nodeDrawer.getNodeStyle(i).size;
    } else if (s)
      a = s.x, l = s.y;
    else
      return;
    let c, u = n.x, p = n.y;
    n instanceof W ? c = n.getCircleRadius() || this.nodeDrawer.getNodeStyle(n).size : n instanceof ve ? (u += n.width / 2, p += n.height / 2, c = 0) : c = 12;
    const g = a - u, f = l - p, v = Math.sqrt(g * g + f * f);
    if (v === 0)
      return;
    const y = g / v, b = f / v, k = u + y * (c + 4), C = p + b * (c + 4), T = a - y * (d + 8), I = l - b * (d + 8);
    let N;
    i ? N = this.edgeDrawer.buildArcPath({
      fromX: u,
      fromY: p,
      toX: a,
      toY: l,
      fromRadius: c,
      toRadius: d,
      drawOffsetStart: 4,
      drawOffsetEnd: 8
    }) : N = `M ${k},${C} L ${T},${I}`, this.shadowEdgePath.attr("d", N).attr("marker-end", o ? null : "url(#arrow)").classed("pvt-shadow-edge--invalid", o).style("display", null);
  }
  hideShadowEdge() {
    this.shadowEdgePath.style("display", "none");
  }
}
function Vl(r, t, e) {
  const n = e.type ?? "svg";
  if (n === "svg") {
    const i = new La(r);
    return new Wl(r, t, i, e);
  }
  throw new Error(`\`${n}\` renderer is not implemented yet.`);
}
function Yl(r = 0, t = 0, e = 1e-3) {
  let n = [], i;
  function s() {
    i = typeof e == "function" ? e : () => e;
  }
  function o(a) {
    for (let l = 0, d = n.length; l < d; ++l) {
      const c = n[l], u = i(c, l, n);
      c.vx && c.x && (c.vx -= (c.x - r) * u * a), c.vy && c.y && (c.vy -= (c.y - t) * u * a);
    }
  }
  return o.initialize = (a) => {
    n = a, s();
  }, o.x = function(a) {
    return arguments.length ? (r = a, o) : r;
  }, o.y = function(a) {
    return arguments.length ? (t = a, o) : t;
  }, o.strength = function(a) {
    return arguments.length ? (e = a, s(), o) : e;
  }, o;
}
const hr = 'var bl=Object.defineProperty;var Sl=(Jt,Nt,le)=>Nt in Jt?bl(Jt,Nt,{enumerable:!0,configurable:!0,writable:!0,value:le}):Jt[Nt]=le;var x=(Jt,Nt,le)=>Sl(Jt,typeof Nt!="symbol"?Nt+"":Nt,le);(function(){"use strict";function Jt(e){const t=+this._x.call(null,e),n=+this._y.call(null,e);return Nt(this.cover(t,n),t,n,e)}function Nt(e,t,n,i){if(isNaN(t)||isNaN(n))return e;var r,o=e._root,a={data:i},l=e._x0,h=e._y0,s=e._x1,f=e._y1,b,m,p,A,y,_,T,v;if(!o)return e._root=a,e;for(;o.length;)if((y=t>=(b=(l+s)/2))?l=b:s=b,(_=n>=(m=(h+f)/2))?h=m:f=m,r=o,!(o=o[T=_<<1|y]))return r[T]=a,e;if(p=+e._x.call(null,o.data),A=+e._y.call(null,o.data),t===p&&n===A)return a.next=o,r?r[T]=a:e._root=a,e;do r=r?r[T]=new Array(4):e._root=new Array(4),(y=t>=(b=(l+s)/2))?l=b:s=b,(_=n>=(m=(h+f)/2))?h=m:f=m;while((T=_<<1|y)===(v=(A>=m)<<1|p>=b));return r[v]=o,r[T]=a,e}function le(e){var t,n,i=e.length,r,o,a=new Array(i),l=new Array(i),h=1/0,s=1/0,f=-1/0,b=-1/0;for(n=0;n<i;++n)isNaN(r=+this._x.call(null,t=e[n]))||isNaN(o=+this._y.call(null,t))||(a[n]=r,l[n]=o,r<h&&(h=r),r>f&&(f=r),o<s&&(s=o),o>b&&(b=o));if(h>f||s>b)return this;for(this.cover(h,s).cover(f,b),n=0;n<i;++n)Nt(this,a[n],l[n],e[n]);return this}function dr(e,t){if(isNaN(e=+e)||isNaN(t=+t))return this;var n=this._x0,i=this._y0,r=this._x1,o=this._y1;if(isNaN(n))r=(n=Math.floor(e))+1,o=(i=Math.floor(t))+1;else{for(var a=r-n||1,l=this._root,h,s;n>e||e>=r||i>t||t>=o;)switch(s=(t<i)<<1|e<n,h=new Array(4),h[s]=l,l=h,a*=2,s){case 0:r=n+a,o=i+a;break;case 1:n=r-a,o=i+a;break;case 2:r=n+a,i=o-a;break;case 3:n=r-a,i=o-a;break}this._root&&this._root.length&&(this._root=l)}return this._x0=n,this._y0=i,this._x1=r,this._y1=o,this}function pr(){var e=[];return this.visit(function(t){if(!t.length)do e.push(t.data);while(t=t.next)}),e}function gr(e){return arguments.length?this.cover(+e[0][0],+e[0][1]).cover(+e[1][0],+e[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function at(e,t,n,i,r){this.node=e,this.x0=t,this.y0=n,this.x1=i,this.y1=r}function mr(e,t,n){var i,r=this._x0,o=this._y0,a,l,h,s,f=this._x1,b=this._y1,m=[],p=this._root,A,y;for(p&&m.push(new at(p,r,o,f,b)),n==null?n=1/0:(r=e-n,o=t-n,f=e+n,b=t+n,n*=n);A=m.pop();)if(!(!(p=A.node)||(a=A.x0)>f||(l=A.y0)>b||(h=A.x1)<r||(s=A.y1)<o))if(p.length){var _=(a+h)/2,T=(l+s)/2;m.push(new at(p[3],_,T,h,s),new at(p[2],a,T,_,s),new at(p[1],_,l,h,T),new at(p[0],a,l,_,T)),(y=(t>=T)<<1|e>=_)&&(A=m[m.length-1],m[m.length-1]=m[m.length-1-y],m[m.length-1-y]=A)}else{var v=e-+this._x.call(null,p.data),E=t-+this._y.call(null,p.data),g=v*v+E*E;if(g<n){var R=Math.sqrt(n=g);r=e-R,o=t-R,f=e+R,b=t+R,i=p.data}}return i}function yr(e){if(isNaN(f=+this._x.call(null,e))||isNaN(b=+this._y.call(null,e)))return this;var t,n=this._root,i,r,o,a=this._x0,l=this._y0,h=this._x1,s=this._y1,f,b,m,p,A,y,_,T;if(!n)return this;if(n.length)for(;;){if((A=f>=(m=(a+h)/2))?a=m:h=m,(y=b>=(p=(l+s)/2))?l=p:s=p,t=n,!(n=n[_=y<<1|A]))return this;if(!n.length)break;(t[_+1&3]||t[_+2&3]||t[_+3&3])&&(i=t,T=_)}for(;n.data!==e;)if(r=n,!(n=n.next))return this;return(o=n.next)&&delete n.next,r?(o?r.next=o:delete r.next,this):t?(o?t[_]=o:delete t[_],(n=t[0]||t[1]||t[2]||t[3])&&n===(t[3]||t[2]||t[1]||t[0])&&!n.length&&(i?i[T]=n:this._root=n),this):(this._root=o,this)}function _r(e){for(var t=0,n=e.length;t<n;++t)this.remove(e[t]);return this}function Tr(){return this._root}function wr(){var e=0;return this.visit(function(t){if(!t.length)do++e;while(t=t.next)}),e}function br(e){var t=[],n,i=this._root,r,o,a,l,h;for(i&&t.push(new at(i,this._x0,this._y0,this._x1,this._y1));n=t.pop();)if(!e(i=n.node,o=n.x0,a=n.y0,l=n.x1,h=n.y1)&&i.length){var s=(o+l)/2,f=(a+h)/2;(r=i[3])&&t.push(new at(r,s,f,l,h)),(r=i[2])&&t.push(new at(r,o,f,s,h)),(r=i[1])&&t.push(new at(r,s,a,l,f)),(r=i[0])&&t.push(new at(r,o,a,s,f))}return this}function Sr(e){var t=[],n=[],i;for(this._root&&t.push(new at(this._root,this._x0,this._y0,this._x1,this._y1));i=t.pop();){var r=i.node;if(r.length){var o,a=i.x0,l=i.y0,h=i.x1,s=i.y1,f=(a+h)/2,b=(l+s)/2;(o=r[0])&&t.push(new at(o,a,l,f,b)),(o=r[1])&&t.push(new at(o,f,l,h,b)),(o=r[2])&&t.push(new at(o,a,b,f,s)),(o=r[3])&&t.push(new at(o,f,b,h,s))}n.push(i)}for(;i=n.pop();)e(i.node,i.x0,i.y0,i.x1,i.y1);return this}function vr(e){return e[0]}function Ar(e){return arguments.length?(this._x=e,this):this._x}function Er(e){return e[1]}function xr(e){return arguments.length?(this._y=e,this):this._y}function Rn(e,t,n){var i=new Cn(t??vr,n??Er,NaN,NaN,NaN,NaN);return e==null?i:i.addAll(e)}function Cn(e,t,n,i,r,o){this._x=e,this._y=t,this._x0=n,this._y0=i,this._x1=r,this._y1=o,this._root=void 0}function ui(e){for(var t={data:e.data},n=t;e=e.next;)n=n.next={data:e.data};return t}var lt=Rn.prototype=Cn.prototype;lt.copy=function(){var e=new Cn(this._x,this._y,this._x0,this._y0,this._x1,this._y1),t=this._root,n,i;if(!t)return e;if(!t.length)return e._root=ui(t),e;for(n=[{source:t,target:e._root=new Array(4)}];t=n.pop();)for(var r=0;r<4;++r)(i=t.source[r])&&(i.length?n.push({source:i,target:t.target[r]=new Array(4)}):t.target[r]=ui(i));return e},lt.add=Jt,lt.addAll=le,lt.cover=dr,lt.data=pr,lt.extent=gr,lt.find=mr,lt.remove=yr,lt.removeAll=_r,lt.root=Tr,lt.size=wr,lt.visit=br,lt.visitAfter=Sr,lt.x=Ar,lt.y=xr;function nt(e){return function(){return e}}function Wt(e){return(e()-.5)*1e-6}function Nr(e){return e.x+e.vx}function Dr(e){return e.y+e.vy}function Ir(e){var t,n,i,r=1,o=1;typeof e!="function"&&(e=nt(e==null?1:+e));function a(){for(var s,f=t.length,b,m,p,A,y,_,T=0;T<o;++T)for(b=Rn(t,Nr,Dr).visitAfter(l),s=0;s<f;++s)m=t[s],y=n[m.index],_=y*y,p=m.x+m.vx,A=m.y+m.vy,b.visit(v);function v(E,g,R,C,k){var F=E.data,$=E.r,G=y+$;if(F){if(F.index>m.index){var Q=p-F.x-F.vx,ht=A-F.y-F.vy,st=Q*Q+ht*ht;st<G*G&&(Q===0&&(Q=Wt(i),st+=Q*Q),ht===0&&(ht=Wt(i),st+=ht*ht),st=(G-(st=Math.sqrt(st)))/st*r,m.vx+=(Q*=st)*(G=($*=$)/(_+$)),m.vy+=(ht*=st)*G,F.vx-=Q*(G=1-G),F.vy-=ht*G)}return}return g>p+G||C<p-G||R>A+G||k<A-G}}function l(s){if(s.data)return s.r=n[s.data.index];for(var f=s.r=0;f<4;++f)s[f]&&s[f].r>s.r&&(s.r=s[f].r)}function h(){if(t){var s,f=t.length,b;for(n=new Array(f),s=0;s<f;++s)b=t[s],n[b.index]=+e(b,s,t)}}return a.initialize=function(s,f){t=s,i=f,h()},a.iterations=function(s){return arguments.length?(o=+s,a):o},a.strength=function(s){return arguments.length?(r=+s,a):r},a.radius=function(s){return arguments.length?(e=typeof s=="function"?s:nt(+s),h(),a):e},a}function Rr(e){return e.index}function hi(e,t){var n=e.get(t);if(!n)throw new Error("node not found: "+t);return n}function Cr(e){var t=Rr,n=b,i,r=nt(30),o,a,l,h,s,f=1;e==null&&(e=[]);function b(_){return 1/Math.min(l[_.source.index],l[_.target.index])}function m(_){for(var T=0,v=e.length;T<f;++T)for(var E=0,g,R,C,k,F,$,G;E<v;++E)g=e[E],R=g.source,C=g.target,k=C.x+C.vx-R.x-R.vx||Wt(s),F=C.y+C.vy-R.y-R.vy||Wt(s),$=Math.sqrt(k*k+F*F),$=($-o[E])/$*_*i[E],k*=$,F*=$,C.vx-=k*(G=h[E]),C.vy-=F*G,R.vx+=k*(G=1-G),R.vy+=F*G}function p(){if(a){var _,T=a.length,v=e.length,E=new Map(a.map((R,C)=>[t(R,C,a),R])),g;for(_=0,l=new Array(T);_<v;++_)g=e[_],g.index=_,typeof g.source!="object"&&(g.source=hi(E,g.source)),typeof g.target!="object"&&(g.target=hi(E,g.target)),l[g.source.index]=(l[g.source.index]||0)+1,l[g.target.index]=(l[g.target.index]||0)+1;for(_=0,h=new Array(v);_<v;++_)g=e[_],h[_]=l[g.source.index]/(l[g.source.index]+l[g.target.index]);i=new Array(v),A(),o=new Array(v),y()}}function A(){if(a)for(var _=0,T=e.length;_<T;++_)i[_]=+n(e[_],_,e)}function y(){if(a)for(var _=0,T=e.length;_<T;++_)o[_]=+r(e[_],_,e)}return m.initialize=function(_,T){a=_,s=T,p()},m.links=function(_){return arguments.length?(e=_,p(),m):e},m.id=function(_){return arguments.length?(t=_,m):t},m.iterations=function(_){return arguments.length?(f=+_,m):f},m.strength=function(_){return arguments.length?(n=typeof _=="function"?_:nt(+_),A(),m):n},m.distance=function(_){return arguments.length?(r=typeof _=="function"?_:nt(+_),y(),m):r},m}var Or={value:()=>{}};function On(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new Xe(n)}function Xe(e){this._=e}function Mr(e,t){return e.trim().split(/^|\\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}Xe.prototype=On.prototype={constructor:Xe,on:function(e,t){var n=this._,i=Mr(e+"",n),r,o=-1,a=i.length;if(arguments.length<2){for(;++o<a;)if((r=(e=i[o]).type)&&(r=Lr(n[r],e.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<a;)if(r=(e=i[o]).type)n[r]=fi(n[r],e.name,t);else if(t==null)for(r in n)n[r]=fi(n[r],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Xe(e)},call:function(e,t){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,o;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],i=0,r=o.length;i<r;++i)o[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],r=0,o=i.length;r<o;++r)i[r].value.apply(t,n)}};function Lr(e,t){for(var n=0,i=e.length,r;n<i;++n)if((r=e[n]).name===t)return r.value}function fi(e,t,n){for(var i=0,r=e.length;i<r;++i)if(e[i].name===t){e[i]=Or,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var ce=0,Se=0,ve=0,di=1e3,qe,Ae,Ze=0,te=0,Qe=0,Ee=typeof performance=="object"&&performance.now?performance:Date,pi=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function gi(){return te||(pi(kr),te=Ee.now()+Qe)}function kr(){te=0}function Mn(){this._call=this._time=this._next=null}Mn.prototype=mi.prototype={constructor:Mn,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?gi():+n)+(t==null?0:+t),!this._next&&Ae!==this&&(Ae?Ae._next=this:qe=this,Ae=this),this._call=e,this._time=n,Ln()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ln())}};function mi(e,t,n){var i=new Mn;return i.restart(e,t,n),i}function Fr(){gi(),++ce;for(var e=qe,t;e;)(t=te-e._time)>=0&&e._call.call(void 0,t),e=e._next;--ce}function yi(){te=(Ze=Ee.now())+Qe,ce=Se=0;try{Fr()}finally{ce=0,zr(),te=0}}function Pr(){var e=Ee.now(),t=e-Ze;t>di&&(Qe-=t,Ze=e)}function zr(){for(var e,t=qe,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:qe=n);Ae=e,Ln(i)}function Ln(e){if(!ce){Se&&(Se=clearTimeout(Se));var t=e-te;t>24?(e<1/0&&(Se=setTimeout(yi,e-Ee.now()-Qe)),ve&&(ve=clearInterval(ve))):(ve||(Ze=Ee.now(),ve=setInterval(Pr,di)),ce=1,pi(yi))}}const Br=1664525,Ur=1013904223,_i=4294967296;function Gr(){let e=1;return()=>(e=(Br*e+Ur)%_i)/_i}function Hr(e){return e.x}function jr(e){return e.y}var Wr=10,Vr=Math.PI*(3-Math.sqrt(5));function $r(e){var t,n=1,i=.001,r=1-Math.pow(i,1/300),o=0,a=.6,l=new Map,h=mi(b),s=On("tick","end"),f=Gr();e==null&&(e=[]);function b(){m(),s.call("tick",t),n<i&&(h.stop(),s.call("end",t))}function m(y){var _,T=e.length,v;y===void 0&&(y=1);for(var E=0;E<y;++E)for(n+=(o-n)*r,l.forEach(function(g){g(n)}),_=0;_<T;++_)v=e[_],v.fx==null?v.x+=v.vx*=a:(v.x=v.fx,v.vx=0),v.fy==null?v.y+=v.vy*=a:(v.y=v.fy,v.vy=0);return t}function p(){for(var y=0,_=e.length,T;y<_;++y){if(T=e[y],T.index=y,T.fx!=null&&(T.x=T.fx),T.fy!=null&&(T.y=T.fy),isNaN(T.x)||isNaN(T.y)){var v=Wr*Math.sqrt(.5+y),E=y*Vr;T.x=v*Math.cos(E),T.y=v*Math.sin(E)}(isNaN(T.vx)||isNaN(T.vy))&&(T.vx=T.vy=0)}}function A(y){return y.initialize&&y.initialize(e,f),y}return p(),t={tick:m,restart:function(){return h.restart(b),t},stop:function(){return h.stop(),t},nodes:function(y){return arguments.length?(e=y,p(),l.forEach(A),t):e},alpha:function(y){return arguments.length?(n=+y,t):n},alphaMin:function(y){return arguments.length?(i=+y,t):i},alphaDecay:function(y){return arguments.length?(r=+y,t):+r},alphaTarget:function(y){return arguments.length?(o=+y,t):o},velocityDecay:function(y){return arguments.length?(a=1-y,t):1-a},randomSource:function(y){return arguments.length?(f=y,l.forEach(A),t):f},force:function(y,_){return arguments.length>1?(_==null?l.delete(y):l.set(y,A(_)),t):l.get(y)},find:function(y,_,T){var v=0,E=e.length,g,R,C,k,F;for(T==null?T=1/0:T*=T,v=0;v<E;++v)k=e[v],g=y-k.x,R=_-k.y,C=g*g+R*R,C<T&&(F=k,T=C);return F},on:function(y,_){return arguments.length>1?(s.on(y,_),t):s.on(y)}}}function Yr(){var e,t,n,i,r=nt(-30),o,a=1,l=1/0,h=.81;function s(p){var A,y=e.length,_=Rn(e,Hr,jr).visitAfter(b);for(i=p,A=0;A<y;++A)t=e[A],_.visit(m)}function f(){if(e){var p,A=e.length,y;for(o=new Array(A),p=0;p<A;++p)y=e[p],o[y.index]=+r(y,p,e)}}function b(p){var A=0,y,_,T=0,v,E,g;if(p.length){for(v=E=g=0;g<4;++g)(y=p[g])&&(_=Math.abs(y.value))&&(A+=y.value,T+=_,v+=_*y.x,E+=_*y.y);p.x=v/T,p.y=E/T}else{y=p,y.x=y.data.x,y.y=y.data.y;do A+=o[y.data.index];while(y=y.next)}p.value=A}function m(p,A,y,_){if(!p.value)return!0;var T=p.x-t.x,v=p.y-t.y,E=_-A,g=T*T+v*v;if(E*E/h<g)return g<l&&(T===0&&(T=Wt(n),g+=T*T),v===0&&(v=Wt(n),g+=v*v),g<a&&(g=Math.sqrt(a*g)),t.vx+=T*p.value*i/g,t.vy+=v*p.value*i/g),!0;if(p.length||g>=l)return;(p.data!==t||p.next)&&(T===0&&(T=Wt(n),g+=T*T),v===0&&(v=Wt(n),g+=v*v),g<a&&(g=Math.sqrt(a*g)));do p.data!==t&&(E=o[p.data.index]*i/g,t.vx+=T*E,t.vy+=v*E);while(p=p.next)}return s.initialize=function(p,A){e=p,n=A,f()},s.strength=function(p){return arguments.length?(r=typeof p=="function"?p:nt(+p),f(),s):r},s.distanceMin=function(p){return arguments.length?(a=p*p,s):Math.sqrt(a)},s.distanceMax=function(p){return arguments.length?(l=p*p,s):Math.sqrt(l)},s.theta=function(p){return arguments.length?(h=p*p,s):Math.sqrt(h)},s}function Ti(e,t,n){var i,r=nt(.1),o,a;typeof e!="function"&&(e=nt(+e)),t==null&&(t=0),n==null&&(n=0);function l(s){for(var f=0,b=i.length;f<b;++f){var m=i[f],p=m.x-t||1e-6,A=m.y-n||1e-6,y=Math.sqrt(p*p+A*A),_=(a[f]-y)*o[f]*s/y;m.vx+=p*_,m.vy+=A*_}}function h(){if(i){var s,f=i.length;for(o=new Array(f),a=new Array(f),s=0;s<f;++s)a[s]=+e(i[s],s,i),o[s]=isNaN(a[s])?0:+r(i[s],s,i)}}return l.initialize=function(s){i=s,h()},l.strength=function(s){return arguments.length?(r=typeof s=="function"?s:nt(+s),h(),l):r},l.radius=function(s){return arguments.length?(e=typeof s=="function"?s:nt(+s),h(),l):e},l.x=function(s){return arguments.length?(t=+s,l):t},l.y=function(s){return arguments.length?(n=+s,l):n},l}function wi(e){var t=nt(.1),n,i,r;typeof e!="function"&&(e=nt(e==null?0:+e));function o(l){for(var h=0,s=n.length,f;h<s;++h)f=n[h],f.vx+=(r[h]-f.x)*i[h]*l}function a(){if(n){var l,h=n.length;for(i=new Array(h),r=new Array(h),l=0;l<h;++l)i[l]=isNaN(r[l]=+e(n[l],l,n))?0:+t(n[l],l,n)}}return o.initialize=function(l){n=l,a()},o.strength=function(l){return arguments.length?(t=typeof l=="function"?l:nt(+l),a(),o):t},o.x=function(l){return arguments.length?(e=typeof l=="function"?l:nt(+l),a(),o):e},o}function bi(e){var t=nt(.1),n,i,r;typeof e!="function"&&(e=nt(e==null?0:+e));function o(l){for(var h=0,s=n.length,f;h<s;++h)f=n[h],f.vy+=(r[h]-f.y)*i[h]*l}function a(){if(n){var l,h=n.length;for(i=new Array(h),r=new Array(h),l=0;l<h;++l)i[l]=isNaN(r[l]=+e(n[l],l,n))?0:+t(n[l],l,n)}}return o.initialize=function(l){n=l,a()},o.strength=function(l){return arguments.length?(t=typeof l=="function"?l:nt(+l),a(),o):t},o.y=function(l){return arguments.length?(e=typeof l=="function"?l:nt(+l),a(),o):e},o}function Kr(e=0,t=0,n=.001){let i=[],r;function o(){r=typeof n=="function"?n:()=>n}function a(l){for(let h=0,s=i.length;h<s;++h){const f=i[h],b=r(f,h,i);f.vx&&f.x&&(f.vx-=(f.x-e)*b*l),f.vy&&f.y&&(f.vy-=(f.y-t)*b*l)}}return a.initialize=l=>{i=l,o()},a.x=function(l){return arguments.length?(e=l,a):e},a.y=function(l){return arguments.length?(t=l,a):t},a.strength=function(l){return arguments.length?(n=l,o(),a):n},a}var kn="http://www.w3.org/1999/xhtml",Si={svg:"http://www.w3.org/2000/svg",xhtml:kn,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function vi(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Si.hasOwnProperty(t)?{space:Si[t],local:e}:e}function Xr(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===kn&&t.documentElement.namespaceURI===kn?t.createElement(e):t.createElementNS(n,e)}}function qr(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Ai(e){var t=vi(e);return(t.local?qr:Xr)(t)}function Zr(){}function Ei(e){return e==null?Zr:function(){return this.querySelector(e)}}function Qr(e){typeof e!="function"&&(e=Ei(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],a=o.length,l=i[r]=new Array(a),h,s,f=0;f<a;++f)(h=o[f])&&(s=e.call(h,h.__data__,f,o))&&("__data__"in h&&(s.__data__=h.__data__),l[f]=s);return new wt(i,this._parents)}function Jr(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function to(){return[]}function eo(e){return e==null?to:function(){return this.querySelectorAll(e)}}function no(e){return function(){return Jr(e.apply(this,arguments))}}function io(e){typeof e=="function"?e=no(e):e=eo(e);for(var t=this._groups,n=t.length,i=[],r=[],o=0;o<n;++o)for(var a=t[o],l=a.length,h,s=0;s<l;++s)(h=a[s])&&(i.push(e.call(h,h.__data__,s,a)),r.push(h));return new wt(i,r)}function ro(e){return function(){return this.matches(e)}}function xi(e){return function(t){return t.matches(e)}}var oo=Array.prototype.find;function so(e){return function(){return oo.call(this.children,e)}}function ao(){return this.firstElementChild}function lo(e){return this.select(e==null?ao:so(typeof e=="function"?e:xi(e)))}var co=Array.prototype.filter;function uo(){return Array.from(this.children)}function ho(e){return function(){return co.call(this.children,e)}}function fo(e){return this.selectAll(e==null?uo:ho(typeof e=="function"?e:xi(e)))}function po(e){typeof e!="function"&&(e=ro(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],a=o.length,l=i[r]=[],h,s=0;s<a;++s)(h=o[s])&&e.call(h,h.__data__,s,o)&&l.push(h);return new wt(i,this._parents)}function Ni(e){return new Array(e.length)}function go(){return new wt(this._enter||this._groups.map(Ni),this._parents)}function Je(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Je.prototype={constructor:Je,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function mo(e){return function(){return e}}function yo(e,t,n,i,r,o){for(var a=0,l,h=t.length,s=o.length;a<s;++a)(l=t[a])?(l.__data__=o[a],i[a]=l):n[a]=new Je(e,o[a]);for(;a<h;++a)(l=t[a])&&(r[a]=l)}function _o(e,t,n,i,r,o,a){var l,h,s=new Map,f=t.length,b=o.length,m=new Array(f),p;for(l=0;l<f;++l)(h=t[l])&&(m[l]=p=a.call(h,h.__data__,l,t)+"",s.has(p)?r[l]=h:s.set(p,h));for(l=0;l<b;++l)p=a.call(e,o[l],l,o)+"",(h=s.get(p))?(i[l]=h,h.__data__=o[l],s.delete(p)):n[l]=new Je(e,o[l]);for(l=0;l<f;++l)(h=t[l])&&s.get(m[l])===h&&(r[l]=h)}function To(e){return e.__data__}function wo(e,t){if(!arguments.length)return Array.from(this,To);var n=t?_o:yo,i=this._parents,r=this._groups;typeof e!="function"&&(e=mo(e));for(var o=r.length,a=new Array(o),l=new Array(o),h=new Array(o),s=0;s<o;++s){var f=i[s],b=r[s],m=b.length,p=bo(e.call(f,f&&f.__data__,s,i)),A=p.length,y=l[s]=new Array(A),_=a[s]=new Array(A),T=h[s]=new Array(m);n(f,b,y,_,T,p,t);for(var v=0,E=0,g,R;v<A;++v)if(g=y[v]){for(v>=E&&(E=v+1);!(R=_[E])&&++E<A;);g._next=R||null}}return a=new wt(a,i),a._enter=l,a._exit=h,a}function bo(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function So(){return new wt(this._exit||this._groups.map(Ni),this._parents)}function vo(e,t,n){var i=this.enter(),r=this,o=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(r=t(r),r&&(r=r.selection())),n==null?o.remove():n(o),i&&r?i.merge(r).order():r}function Ao(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,r=n.length,o=i.length,a=Math.min(r,o),l=new Array(r),h=0;h<a;++h)for(var s=n[h],f=i[h],b=s.length,m=l[h]=new Array(b),p,A=0;A<b;++A)(p=s[A]||f[A])&&(m[A]=p);for(;h<r;++h)l[h]=n[h];return new wt(l,this._parents)}function Eo(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],r=i.length-1,o=i[r],a;--r>=0;)(a=i[r])&&(o&&a.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(a,o),o=a);return this}function xo(e){e||(e=No);function t(b,m){return b&&m?e(b.__data__,m.__data__):!b-!m}for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var a=n[o],l=a.length,h=r[o]=new Array(l),s,f=0;f<l;++f)(s=a[f])&&(h[f]=s);h.sort(t)}return new wt(r,this._parents).order()}function No(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Do(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Io(){return Array.from(this)}function Ro(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length;r<o;++r){var a=i[r];if(a)return a}return null}function Co(){let e=0;for(const t of this)++e;return e}function Oo(){return!this.node()}function Mo(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r=t[n],o=0,a=r.length,l;o<a;++o)(l=r[o])&&e.call(l,l.__data__,o,r);return this}function Lo(e){return function(){this.removeAttribute(e)}}function ko(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Fo(e,t){return function(){this.setAttribute(e,t)}}function Po(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function zo(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Bo(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Uo(e,t){var n=vi(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?ko:Lo:typeof t=="function"?n.local?Bo:zo:n.local?Po:Fo)(n,t))}function Di(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Go(e){return function(){this.style.removeProperty(e)}}function Ho(e,t,n){return function(){this.style.setProperty(e,t,n)}}function jo(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function Wo(e,t,n){return arguments.length>1?this.each((t==null?Go:typeof t=="function"?jo:Ho)(e,t,n??"")):Vo(this.node(),e)}function Vo(e,t){return e.style.getPropertyValue(t)||Di(e).getComputedStyle(e,null).getPropertyValue(t)}function $o(e){return function(){delete this[e]}}function Yo(e,t){return function(){this[e]=t}}function Ko(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Xo(e,t){return arguments.length>1?this.each((t==null?$o:typeof t=="function"?Ko:Yo)(e,t)):this.node()[e]}function Ii(e){return e.trim().split(/^|\\s+/)}function Fn(e){return e.classList||new Ri(e)}function Ri(e){this._node=e,this._names=Ii(e.getAttribute("class")||"")}Ri.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Ci(e,t){for(var n=Fn(e),i=-1,r=t.length;++i<r;)n.add(t[i])}function Oi(e,t){for(var n=Fn(e),i=-1,r=t.length;++i<r;)n.remove(t[i])}function qo(e){return function(){Ci(this,e)}}function Zo(e){return function(){Oi(this,e)}}function Qo(e,t){return function(){(t.apply(this,arguments)?Ci:Oi)(this,e)}}function Jo(e,t){var n=Ii(e+"");if(arguments.length<2){for(var i=Fn(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof t=="function"?Qo:t?qo:Zo)(n,t))}function ts(){this.textContent=""}function es(e){return function(){this.textContent=e}}function ns(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function is(e){return arguments.length?this.each(e==null?ts:(typeof e=="function"?ns:es)(e)):this.node().textContent}function rs(){this.innerHTML=""}function os(e){return function(){this.innerHTML=e}}function ss(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function as(e){return arguments.length?this.each(e==null?rs:(typeof e=="function"?ss:os)(e)):this.node().innerHTML}function ls(){this.nextSibling&&this.parentNode.appendChild(this)}function cs(){return this.each(ls)}function us(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function hs(){return this.each(us)}function fs(e){var t=typeof e=="function"?e:Ai(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function ds(){return null}function ps(e,t){var n=typeof e=="function"?e:Ai(e),i=t==null?ds:typeof t=="function"?t:Ei(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function gs(){var e=this.parentNode;e&&e.removeChild(this)}function ms(){return this.each(gs)}function ys(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function _s(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Ts(e){return this.select(e?_s:ys)}function ws(e){return arguments.length?this.property("__data__",e):this.node().__data__}function bs(e){return function(t){e.call(this,t,this.__data__)}}function Ss(e){return e.trim().split(/^|\\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function vs(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,r=t.length,o;n<r;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++i]=o;++i?t.length=i:delete this.__on}}}function As(e,t,n){return function(){var i=this.__on,r,o=bs(t);if(i){for(var a=0,l=i.length;a<l;++a)if((r=i[a]).type===e.type&&r.name===e.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=n),r.value=t;return}}this.addEventListener(e.type,o,n),r={type:e.type,name:e.name,value:t,listener:o,options:n},i?i.push(r):this.__on=[r]}}function Es(e,t,n){var i=Ss(e+""),r,o=i.length,a;if(arguments.length<2){var l=this.node().__on;if(l){for(var h=0,s=l.length,f;h<s;++h)for(r=0,f=l[h];r<o;++r)if((a=i[r]).type===f.type&&a.name===f.name)return f.value}return}for(l=t?As:vs,r=0;r<o;++r)this.each(l(i[r],t,n));return this}function Mi(e,t,n){var i=Di(e),r=i.CustomEvent;typeof r=="function"?r=new r(t,n):(r=i.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function xs(e,t){return function(){return Mi(this,e,t)}}function Ns(e,t){return function(){return Mi(this,e,t.apply(this,arguments))}}function Ds(e,t){return this.each((typeof t=="function"?Ns:xs)(e,t))}function*Is(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length,a;r<o;++r)(a=i[r])&&(yield a)}var Rs=[null];function wt(e,t){this._groups=e,this._parents=t}function Cs(){return this}wt.prototype={constructor:wt,select:Qr,selectAll:io,selectChild:lo,selectChildren:fo,filter:po,data:wo,enter:go,exit:So,join:vo,merge:Ao,selection:Cs,order:Eo,sort:xo,call:Do,nodes:Io,node:Ro,size:Co,empty:Oo,each:Mo,attr:Uo,style:Wo,property:Xo,classed:Jo,text:is,html:as,raise:cs,lower:hs,append:fs,insert:ps,remove:ms,clone:Ts,datum:ws,on:Es,dispatch:Ds,[Symbol.iterator]:Is};function tn(e){return typeof e=="string"?new wt([[document.querySelector(e)]],[document.documentElement]):new wt([[e]],Rs)}function Os(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Li(e,t){if(e=Os(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[e.clientX-r.left-t.clientLeft,e.clientY-r.top-t.clientTop]}}return[e.pageX,e.pageY]}const Ms={passive:!1},xe={capture:!0,passive:!1};function Pn(e){e.stopImmediatePropagation()}function ue(e){e.preventDefault(),e.stopImmediatePropagation()}function Ls(e){var t=e.document.documentElement,n=tn(e).on("dragstart.drag",ue,xe);"onselectstart"in t?n.on("selectstart.drag",ue,xe):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function ks(e,t){var n=e.document.documentElement,i=tn(e).on("dragstart.drag",null);t&&(i.on("click.drag",ue,xe),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in n?i.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var en=e=>()=>e;function zn(e,{sourceEvent:t,subject:n,target:i,identifier:r,active:o,x:a,y:l,dx:h,dy:s,dispatch:f}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},identifier:{value:r,enumerable:!0,configurable:!0},active:{value:o,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:l,enumerable:!0,configurable:!0},dx:{value:h,enumerable:!0,configurable:!0},dy:{value:s,enumerable:!0,configurable:!0},_:{value:f}})}zn.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};function Fs(e){return!e.ctrlKey&&!e.button}function Ps(){return this.parentNode}function zs(e,t){return t??{x:e.x,y:e.y}}function Bs(){return navigator.maxTouchPoints||"ontouchstart"in this}function Us(){var e=Fs,t=Ps,n=zs,i=Bs,r={},o=On("start","drag","end"),a=0,l,h,s,f,b=0;function m(g){g.on("mousedown.drag",p).filter(i).on("touchstart.drag",_).on("touchmove.drag",T,Ms).on("touchend.drag touchcancel.drag",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function p(g,R){if(!(f||!e.call(this,g,R))){var C=E(this,t.call(this,g,R),g,R,"mouse");C&&(tn(g.view).on("mousemove.drag",A,xe).on("mouseup.drag",y,xe),Ls(g.view),Pn(g),s=!1,l=g.clientX,h=g.clientY,C("start",g))}}function A(g){if(ue(g),!s){var R=g.clientX-l,C=g.clientY-h;s=R*R+C*C>b}r.mouse("drag",g)}function y(g){tn(g.view).on("mousemove.drag mouseup.drag",null),ks(g.view,s),ue(g),r.mouse("end",g)}function _(g,R){if(e.call(this,g,R)){var C=g.changedTouches,k=t.call(this,g,R),F=C.length,$,G;for($=0;$<F;++$)(G=E(this,k,g,R,C[$].identifier,C[$]))&&(Pn(g),G("start",g,C[$]))}}function T(g){var R=g.changedTouches,C=R.length,k,F;for(k=0;k<C;++k)(F=r[R[k].identifier])&&(ue(g),F("drag",g,R[k]))}function v(g){var R=g.changedTouches,C=R.length,k,F;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),k=0;k<C;++k)(F=r[R[k].identifier])&&(Pn(g),F("end",g,R[k]))}function E(g,R,C,k,F,$){var G=o.copy(),Q=Li($||C,R),ht,st,K;if((K=n.call(g,new zn("beforestart",{sourceEvent:C,target:m,identifier:F,active:a,x:Q[0],y:Q[1],dx:0,dy:0,dispatch:G}),k))!=null)return ht=K.x-Q[0]||0,st=K.y-Q[1]||0,function Vt(Rt,kt,Me){var ge=Q,ne;switch(Rt){case"start":r[F]=Vt,ne=a++;break;case"end":delete r[F],--a;case"drag":Q=Li(Me||kt,R),ne=a;break}G.call(Rt,g,new zn(Rt,{sourceEvent:kt,subject:K,target:m,identifier:F,active:ne,x:Q[0]+ht,y:Q[1]+st,dx:Q[0]-ge[0],dy:Q[1]-ge[1],dispatch:G}),k)}}return m.filter=function(g){return arguments.length?(e=typeof g=="function"?g:en(!!g),m):e},m.container=function(g){return arguments.length?(t=typeof g=="function"?g:en(g),m):t},m.subject=function(g){return arguments.length?(n=typeof g=="function"?g:en(g),m):n},m.touchable=function(g){return arguments.length?(i=typeof g=="function"?g:en(!!g),m):i},m.on=function(){var g=o.on.apply(o,arguments);return g===o?m:g},m.clickDistance=function(g){return arguments.length?(b=(g=+g)*g,m):Math.sqrt(b)},m}/*! @license DOMPurify 3.4.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.7/LICENSE */function ki(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}function Gs(e){if(Array.isArray(e))return e}function Hs(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var i,r,o,a,l=[],h=!0,s=!1;try{if(o=(n=n.call(e)).next,t!==0)for(;!(h=(i=o.call(n)).done)&&(l.push(i.value),l.length!==t);h=!0);}catch(f){s=!0,r=f}finally{try{if(!h&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return l}}function js(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ws(e,t){return Gs(e)||Hs(e,t)||Vs(e,t)||js()}function Vs(e,t){if(e){if(typeof e=="string")return ki(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ki(e,t):void 0}}const Fi=Object.entries,Pi=Object.setPrototypeOf,$s=Object.isFrozen,Ys=Object.getPrototypeOf,Ks=Object.getOwnPropertyDescriptor;let ct=Object.freeze,bt=Object.seal,he=Object.create,zi=typeof Reflect<"u"&&Reflect,Bn=zi.apply,Un=zi.construct;ct||(ct=function(t){return t}),bt||(bt=function(t){return t}),Bn||(Bn=function(t,n){for(var i=arguments.length,r=new Array(i>2?i-2:0),o=2;o<i;o++)r[o-2]=arguments[o];return t.apply(n,r)}),Un||(Un=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return new t(...i)});const fe=tt(Array.prototype.forEach),Xs=tt(Array.prototype.lastIndexOf),Bi=tt(Array.prototype.pop),de=tt(Array.prototype.push),qs=tt(Array.prototype.splice),ut=Array.isArray,Ne=tt(String.prototype.toLowerCase),Gn=tt(String.prototype.toString),Ui=tt(String.prototype.match),pe=tt(String.prototype.replace),Gi=tt(String.prototype.indexOf),Zs=tt(String.prototype.trim),Qs=tt(Number.prototype.toString),Js=tt(Boolean.prototype.toString),Hi=typeof BigInt>"u"?null:tt(BigInt.prototype.toString),ji=typeof Symbol>"u"?null:tt(Symbol.prototype.toString),J=tt(Object.prototype.hasOwnProperty),De=tt(Object.prototype.toString),rt=tt(RegExp.prototype.test),Ie=ta(TypeError);function tt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return Bn(e,t,i)}}function ta(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Un(e,n)}}function M(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ne;if(Pi&&Pi(e,null),!ut(t))return e;let i=t.length;for(;i--;){let r=t[i];if(typeof r=="string"){const o=n(r);o!==r&&($s(t)||(t[i]=o),r=o)}e[r]=!0}return e}function ea(e){for(let t=0;t<e.length;t++)J(e,t)||(e[t]=null);return e}function ot(e){const t=he(null);for(const i of Fi(e)){var n=Ws(i,2);const r=n[0],o=n[1];J(e,r)&&(ut(o)?t[r]=ea(o):o&&typeof o=="object"&&o.constructor===Object?t[r]=ot(o):t[r]=o)}return t}function na(e){switch(typeof e){case"string":return e;case"number":return Qs(e);case"boolean":return Js(e);case"bigint":return Hi?Hi(e):"0";case"symbol":return ji?ji(e):"Symbol()";case"undefined":return De(e);case"function":case"object":{if(e===null)return De(e);const t=e,n=Dt(t,"toString");if(typeof n=="function"){const i=n(t);return typeof i=="string"?i:De(i)}return De(e)}default:return De(e)}}function Dt(e,t){for(;e!==null;){const i=Ks(e,t);if(i){if(i.get)return tt(i.get);if(typeof i.value=="function")return tt(i.value)}e=Ys(e)}function n(){return null}return n}function ia(e){try{return rt(e,""),!0}catch{return!1}}const Wi=ct(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hn=ct(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jn=ct(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ra=ct(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wn=ct(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),oa=ct(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Vi=ct(["#text"]),$i=ct(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Vn=ct(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Yi=ct(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),nn=ct(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sa=bt(/{{[\\w\\W]*|^[\\w\\W]*}}/g),aa=bt(/<%[\\w\\W]*|^[\\w\\W]*%>/g),la=bt(/\\${[\\w\\W]*/g),ca=bt(/^data-[\\-\\w.\\u00B7-\\uFFFF]+$/),ua=bt(/^aria-[\\-\\w]+$/),Ki=bt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\\-]+(?:[^a-z+.\\-:]|$))/i),ha=bt(/^(?:\\w+script|data):/i),fa=bt(/[\\u0000-\\u0020\\u00A0\\u1680\\u180E\\u2000-\\u2029\\u205F\\u3000]/g),da=bt(/^html$/i),pa=bt(/^[a-z][.\\w]*(-[.\\w]+)+$/i),It={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ga=function(){return typeof window>"u"?null:window},ma=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const r="data-tt-policy-suffix";n&&n.hasAttribute(r)&&(i=n.getAttribute(r));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Xi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ga();const t=D=>qi(D);if(t.version="3.4.7",t.removed=[],!e||!e.document||e.document.nodeType!==It.document||!e.Element)return t.isSupported=!1,t;let n=e.document;const i=n,r=i.currentScript;e.DocumentFragment;const o=e.HTMLTemplateElement,a=e.Node,l=e.Element,h=e.NodeFilter,s=e.NamedNodeMap;s===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const f=e.DOMParser,b=e.trustedTypes,m=l.prototype,p=Dt(m,"cloneNode"),A=Dt(m,"remove"),y=Dt(m,"nextSibling"),_=Dt(m,"childNodes"),T=Dt(m,"parentNode"),v=Dt(m,"shadowRoot"),E=Dt(m,"attributes"),g=a&&a.prototype?Dt(a.prototype,"nodeType"):null,R=a&&a.prototype?Dt(a.prototype,"nodeName"):null;if(typeof o=="function"){const D=n.createElement("template");D.content&&D.content.ownerDocument&&(n=D.content.ownerDocument)}let C,k="";const F=n,$=F.implementation,G=F.createNodeIterator,Q=F.createDocumentFragment,ht=F.getElementsByTagName,st=i.importNode;let K=Xi();t.isSupported=typeof Fi=="function"&&typeof T=="function"&&$&&$.createHTMLDocument!==void 0;const Vt=sa,Rt=aa,kt=la,Me=ca,ge=ua,ne=ha,pn=fa,Xn=pa;let H=Ki,X=null;const Le=M({},[...Wi,...Hn,...jn,...Wn,...Vi]);let Y=null;const me=M({},[...$i,...Vn,...Yi,...nn]);let j=Object.seal(he(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$t=null,Yt=null;const vt=Object.seal(he(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ke=!0,Fe=!0,gn=!1,mn=!0,Ct=!1,ie=!0,Ft=!1,Pe=!1,Kt=!1,Ot=!1,Pt=!1,pt=!1,ze=!0,Be=!1;const yn="user-content-";let Ue=!0,Mt=!1,zt={},gt=null;const ye=M({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ge=null;const _n=M({},["audio","video","img","source","image","track"]);let He=null;const Lt=M({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Bt="http://www.w3.org/1998/Math/MathML",_e="http://www.w3.org/2000/svg",mt="http://www.w3.org/1999/xhtml";let Xt=mt,Te=!1,Ut=null;const qn=M({},[Bt,_e,mt],Gn);let At=M({},["mi","mo","mn","ms","mtext"]),je=M({},["annotation-xml"]);const Zn=M({},["title","style","font","a","script"]);let re=null;const Qn=["application/xhtml+xml","text/html"],Jn="text/html";let B=null,qt=null;const ti=n.createElement("form"),Tn=function(u){return u instanceof RegExp||u instanceof Function},We=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(qt&&qt===u)return;(!u||typeof u!="object")&&(u={}),u=ot(u),re=Qn.indexOf(u.PARSER_MEDIA_TYPE)===-1?Jn:u.PARSER_MEDIA_TYPE,B=re==="application/xhtml+xml"?Gn:Ne,X=J(u,"ALLOWED_TAGS")&&ut(u.ALLOWED_TAGS)?M({},u.ALLOWED_TAGS,B):Le,Y=J(u,"ALLOWED_ATTR")&&ut(u.ALLOWED_ATTR)?M({},u.ALLOWED_ATTR,B):me,Ut=J(u,"ALLOWED_NAMESPACES")&&ut(u.ALLOWED_NAMESPACES)?M({},u.ALLOWED_NAMESPACES,Gn):qn,He=J(u,"ADD_URI_SAFE_ATTR")&&ut(u.ADD_URI_SAFE_ATTR)?M(ot(Lt),u.ADD_URI_SAFE_ATTR,B):Lt,Ge=J(u,"ADD_DATA_URI_TAGS")&&ut(u.ADD_DATA_URI_TAGS)?M(ot(_n),u.ADD_DATA_URI_TAGS,B):_n,gt=J(u,"FORBID_CONTENTS")&&ut(u.FORBID_CONTENTS)?M({},u.FORBID_CONTENTS,B):ye,$t=J(u,"FORBID_TAGS")&&ut(u.FORBID_TAGS)?M({},u.FORBID_TAGS,B):ot({}),Yt=J(u,"FORBID_ATTR")&&ut(u.FORBID_ATTR)?M({},u.FORBID_ATTR,B):ot({}),zt=J(u,"USE_PROFILES")?u.USE_PROFILES&&typeof u.USE_PROFILES=="object"?ot(u.USE_PROFILES):u.USE_PROFILES:!1,ke=u.ALLOW_ARIA_ATTR!==!1,Fe=u.ALLOW_DATA_ATTR!==!1,gn=u.ALLOW_UNKNOWN_PROTOCOLS||!1,mn=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ct=u.SAFE_FOR_TEMPLATES||!1,ie=u.SAFE_FOR_XML!==!1,Ft=u.WHOLE_DOCUMENT||!1,Ot=u.RETURN_DOM||!1,Pt=u.RETURN_DOM_FRAGMENT||!1,pt=u.RETURN_TRUSTED_TYPE||!1,Kt=u.FORCE_BODY||!1,ze=u.SANITIZE_DOM!==!1,Be=u.SANITIZE_NAMED_PROPS||!1,Ue=u.KEEP_CONTENT!==!1,Mt=u.IN_PLACE||!1,H=ia(u.ALLOWED_URI_REGEXP)?u.ALLOWED_URI_REGEXP:Ki,Xt=typeof u.NAMESPACE=="string"?u.NAMESPACE:mt,At=J(u,"MATHML_TEXT_INTEGRATION_POINTS")&&u.MATHML_TEXT_INTEGRATION_POINTS&&typeof u.MATHML_TEXT_INTEGRATION_POINTS=="object"?ot(u.MATHML_TEXT_INTEGRATION_POINTS):M({},["mi","mo","mn","ms","mtext"]),je=J(u,"HTML_INTEGRATION_POINTS")&&u.HTML_INTEGRATION_POINTS&&typeof u.HTML_INTEGRATION_POINTS=="object"?ot(u.HTML_INTEGRATION_POINTS):M({},["annotation-xml"]);const S=J(u,"CUSTOM_ELEMENT_HANDLING")&&u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING=="object"?ot(u.CUSTOM_ELEMENT_HANDLING):he(null);if(j=he(null),J(S,"tagNameCheck")&&Tn(S.tagNameCheck)&&(j.tagNameCheck=S.tagNameCheck),J(S,"attributeNameCheck")&&Tn(S.attributeNameCheck)&&(j.attributeNameCheck=S.attributeNameCheck),J(S,"allowCustomizedBuiltInElements")&&typeof S.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=S.allowCustomizedBuiltInElements),Ct&&(Fe=!1),Pt&&(Ot=!0),zt&&(X=M({},Vi),Y=he(null),zt.html===!0&&(M(X,Wi),M(Y,$i)),zt.svg===!0&&(M(X,Hn),M(Y,Vn),M(Y,nn)),zt.svgFilters===!0&&(M(X,jn),M(Y,Vn),M(Y,nn)),zt.mathMl===!0&&(M(X,Wn),M(Y,Yi),M(Y,nn))),vt.tagCheck=null,vt.attributeCheck=null,J(u,"ADD_TAGS")&&(typeof u.ADD_TAGS=="function"?vt.tagCheck=u.ADD_TAGS:ut(u.ADD_TAGS)&&(X===Le&&(X=ot(X)),M(X,u.ADD_TAGS,B))),J(u,"ADD_ATTR")&&(typeof u.ADD_ATTR=="function"?vt.attributeCheck=u.ADD_ATTR:ut(u.ADD_ATTR)&&(Y===me&&(Y=ot(Y)),M(Y,u.ADD_ATTR,B))),J(u,"ADD_URI_SAFE_ATTR")&&ut(u.ADD_URI_SAFE_ATTR)&&M(He,u.ADD_URI_SAFE_ATTR,B),J(u,"FORBID_CONTENTS")&&ut(u.FORBID_CONTENTS)&&(gt===ye&&(gt=ot(gt)),M(gt,u.FORBID_CONTENTS,B)),J(u,"ADD_FORBID_CONTENTS")&&ut(u.ADD_FORBID_CONTENTS)&&(gt===ye&&(gt=ot(gt)),M(gt,u.ADD_FORBID_CONTENTS,B)),Ue&&(X["#text"]=!0),Ft&&M(X,["html","head","body"]),X.table&&(M(X,["tbody"]),delete $t.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ie(\'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.\');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ie(\'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.\');C=u.TRUSTED_TYPES_POLICY,k=C.createHTML("")}else C===void 0&&(C=ma(b,r)),C!==null&&typeof k=="string"&&(k=C.createHTML(""));(K.uponSanitizeElement.length>0||K.uponSanitizeAttribute.length>0)&&X===Le&&(X=ot(X)),K.uponSanitizeAttribute.length>0&&Y===me&&(Y=ot(Y)),ct&&ct(u),qt=u},wn=M({},[...Hn,...jn,...ra]),Gt=M({},[...Wn,...oa]),ei=function(u){let S=T(u);(!S||!S.tagName)&&(S={namespaceURI:Xt,tagName:"template"});const N=Ne(u.tagName),z=Ne(S.tagName);return Ut[u.namespaceURI]?u.namespaceURI===_e?S.namespaceURI===mt?N==="svg":S.namespaceURI===Bt?N==="svg"&&(z==="annotation-xml"||At[z]):!!wn[N]:u.namespaceURI===Bt?S.namespaceURI===mt?N==="math":S.namespaceURI===_e?N==="math"&&je[z]:!!Gt[N]:u.namespaceURI===mt?S.namespaceURI===_e&&!je[z]||S.namespaceURI===Bt&&!At[z]?!1:!Gt[N]&&(Zn[N]||!wn[N]):!!(re==="application/xhtml+xml"&&Ut[u.namespaceURI]):!1},yt=function(u){de(t.removed,{element:u});try{T(u).removeChild(u)}catch{A(u)}},Ht=function(u,S){try{de(t.removed,{attribute:S.getAttributeNode(u),from:S})}catch{de(t.removed,{attribute:null,from:S})}if(S.removeAttribute(u),u==="is")if(Ot||Pt)try{yt(S)}catch{}else try{S.setAttribute(u,"")}catch{}},bn=function(u){let S=null,N=null;if(Kt)u="<remove></remove>"+u;else{const W=Ui(u,/^[\\r\\n\\t ]+/);N=W&&W[0]}re==="application/xhtml+xml"&&Xt===mt&&(u=\'<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>\'+u+"</body></html>");const z=C?C.createHTML(u):u;if(Xt===mt)try{S=new f().parseFromString(z,re)}catch{}if(!S||!S.documentElement){S=$.createDocument(Xt,"template",null);try{S.documentElement.innerHTML=Te?k:z}catch{}}const L=S.body||S.documentElement;return u&&N&&L.insertBefore(n.createTextNode(N),L.childNodes[0]||null),Xt===mt?ht.call(S,Ft?"html":"body")[0]:Ft?S.documentElement:L},Sn=function(u){return G.call(u.ownerDocument||u,u,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},jt=function(u){u.normalize();const S=G.call(u.ownerDocument||u,u,h.SHOW_TEXT|h.SHOW_COMMENT|h.SHOW_CDATA_SECTION|h.SHOW_PROCESSING_INSTRUCTION,null);let N=S.nextNode();for(;N;){let z=N.data;fe([Vt,Rt,kt],L=>{z=pe(z,L," ")}),N.data=z,N=S.nextNode()}},we=function(u){const S=R?R(u):null;return typeof S!="string"||B(S)!=="form"?!1:typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||u.attributes!==E(u)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function"||u.nodeType!==g(u)||u.childNodes!==_(u)},oe=function(u){if(!g||typeof u!="object"||u===null)return!1;try{return g(u)===It.documentFragment}catch{return!1}},be=function(u){if(!g||typeof u!="object"||u===null)return!1;try{return typeof g(u)=="number"}catch{return!1}};function Et(D,u,S){fe(D,N=>{N.call(t,u,S,qt)})}const vn=function(u){let S=null;if(Et(K.beforeSanitizeElements,u,null),we(u))return yt(u),!0;const N=B(u.nodeName);if(Et(K.uponSanitizeElement,u,{tagName:N,allowedTags:X}),ie&&u.hasChildNodes()&&!be(u.firstElementChild)&&rt(/<[/\\w!]/g,u.innerHTML)&&rt(/<[/\\w!]/g,u.textContent)||ie&&u.namespaceURI===mt&&N==="style"&&be(u.firstElementChild)||u.nodeType===It.progressingInstruction||ie&&u.nodeType===It.comment&&rt(/<[/\\w]/g,u.data))return yt(u),!0;if($t[N]||!(vt.tagCheck instanceof Function&&vt.tagCheck(N))&&!X[N]){if(!$t[N]&&En(N)&&(j.tagNameCheck instanceof RegExp&&rt(j.tagNameCheck,N)||j.tagNameCheck instanceof Function&&j.tagNameCheck(N)))return!1;if(Ue&&!gt[N]){const L=T(u),W=_(u);if(W&&L){const dt=W.length;for(let St=dt-1;St>=0;--St){const _t=p(W[St],!0);L.insertBefore(_t,y(u))}}}return yt(u),!0}return(g?g(u):u.nodeType)===It.element&&!ei(u)||(N==="noscript"||N==="noembed"||N==="noframes")&&rt(/<\\/no(script|embed|frames)/i,u.innerHTML)?(yt(u),!0):(Ct&&u.nodeType===It.text&&(S=u.textContent,fe([Vt,Rt,kt],L=>{S=pe(S,L," ")}),u.textContent!==S&&(de(t.removed,{element:u.cloneNode()}),u.textContent=S)),Et(K.afterSanitizeElements,u,null),!1)},An=function(u,S,N){if(Yt[S]||ze&&(S==="id"||S==="name")&&(N in n||N in ti))return!1;const z=Y[S]||vt.attributeCheck instanceof Function&&vt.attributeCheck(S,u);if(!(Fe&&!Yt[S]&&rt(Me,S))){if(!(ke&&rt(ge,S))){if(!z||Yt[S]){if(!(En(u)&&(j.tagNameCheck instanceof RegExp&&rt(j.tagNameCheck,u)||j.tagNameCheck instanceof Function&&j.tagNameCheck(u))&&(j.attributeNameCheck instanceof RegExp&&rt(j.attributeNameCheck,S)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(S,u))||S==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&rt(j.tagNameCheck,N)||j.tagNameCheck instanceof Function&&j.tagNameCheck(N))))return!1}else if(!He[S]){if(!rt(H,pe(N,pn,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&u!=="script"&&Gi(N,"data:")===0&&Ge[u])){if(!(gn&&!rt(ne,pe(N,pn,"")))){if(N)return!1}}}}}}return!0},Ve=M({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),En=function(u){return!Ve[Ne(u)]&&rt(Xn,u)},se=function(u){Et(K.beforeSanitizeAttributes,u,null);const S=u.attributes;if(!S||we(u))return;const N={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Y,forceKeepAttr:void 0};let z=S.length;for(;z--;){const L=S[z],W=L.name,dt=L.namespaceURI,St=L.value,_t=B(W),$e=St;let et=W==="value"?$e:Zs($e);if(N.attrName=_t,N.attrValue=et,N.keepAttr=!0,N.forceKeepAttr=void 0,Et(K.uponSanitizeAttribute,u,N),et=N.attrValue,Be&&(_t==="id"||_t==="name")&&Gi(et,yn)!==0&&(Ht(W,u),et=yn+et),ie&&rt(/((--!?|])>)|<\\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,et)){Ht(W,u);continue}if(_t==="attributename"&&Ui(et,"href")){Ht(W,u);continue}if(N.forceKeepAttr)continue;if(!N.keepAttr){Ht(W,u);continue}if(!mn&&rt(/\\/>/i,et)){Ht(W,u);continue}Ct&&fe([Vt,Rt,kt],Nn=>{et=pe(et,Nn," ")});const xn=B(u.nodeName);if(!An(xn,_t,et)){Ht(W,u);continue}if(C&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!dt)switch(b.getAttributeType(xn,_t)){case"TrustedHTML":{et=C.createHTML(et);break}case"TrustedScriptURL":{et=C.createScriptURL(et);break}}if(et!==$e)try{dt?u.setAttributeNS(dt,W,et):u.setAttribute(W,et),we(u)?yt(u):Bi(t.removed)}catch{Ht(W,u)}}Et(K.afterSanitizeAttributes,u,null)},Zt=function(u){let S=null;const N=Sn(u);for(Et(K.beforeSanitizeShadowDOM,u,null);S=N.nextNode();)if(Et(K.uponSanitizeShadowNode,S,null),vn(S),se(S),oe(S.content)&&Zt(S.content),(g?g(S):S.nodeType)===It.element){const L=v?v(S):S.shadowRoot;oe(L)&&(Qt(L),Zt(L))}Et(K.afterSanitizeShadowDOM,u,null)},Qt=function(u){const S=g?g(u):u.nodeType;if(S===It.element){const L=v?v(u):u.shadowRoot;oe(L)&&(Qt(L),Zt(L))}const N=_?_(u):u.childNodes;if(!N)return;const z=[];fe(N,L=>{de(z,L)});for(const L of z)Qt(L);if(S===It.element){const L=R?R(u):null;if(typeof L=="string"&&B(L)==="template"){const W=u.content;oe(W)&&Qt(W)}}};return t.sanitize=function(D){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,N=null,z=null,L=null;if(Te=!D,Te&&(D="<!-->"),typeof D!="string"&&!be(D)&&(D=na(D),typeof D!="string"))throw Ie("dirty is not a string, aborting");if(!t.isSupported)return D;if(Pe||We(u),t.removed=[],typeof D=="string"&&(Mt=!1),Mt){const St=R?R(D):D.nodeName;if(typeof St=="string"){const _t=B(St);if(!X[_t]||$t[_t])throw Ie("root node is forbidden and cannot be sanitized in-place")}if(we(D))throw Ie("root node is clobbered and cannot be sanitized in-place");Qt(D)}else if(be(D))S=bn("<!---->"),N=S.ownerDocument.importNode(D,!0),N.nodeType===It.element&&N.nodeName==="BODY"||N.nodeName==="HTML"?S=N:S.appendChild(N),Qt(N);else{if(!Ot&&!Ct&&!Ft&&D.indexOf("<")===-1)return C&&pt?C.createHTML(D):D;if(S=bn(D),!S)return Ot?null:pt?k:""}S&&Kt&&yt(S.firstChild);const W=Sn(Mt?D:S);for(;z=W.nextNode();)vn(z),se(z),oe(z.content)&&Zt(z.content);if(Mt)return Ct&&jt(D),D;if(Ot){if(Ct&&jt(S),Pt)for(L=Q.call(S.ownerDocument);S.firstChild;)L.appendChild(S.firstChild);else L=S;return(Y.shadowroot||Y.shadowrootmode)&&(L=st.call(i,L,!0)),L}let dt=Ft?S.outerHTML:S.innerHTML;return Ft&&X["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&rt(da,S.ownerDocument.doctype.name)&&(dt="<!DOCTYPE "+S.ownerDocument.doctype.name+`>\n`+dt),Ct&&fe([Vt,Rt,kt],St=>{dt=pe(dt,St," ")}),C&&pt?C.createHTML(dt):dt},t.setConfig=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};We(D),Pe=!0},t.clearConfig=function(){qt=null,Pe=!1},t.isValidAttribute=function(D,u,S){qt||We({});const N=B(D),z=B(u);return An(N,z,S)},t.addHook=function(D,u){typeof u=="function"&&de(K[D],u)},t.removeHook=function(D,u){if(u!==void 0){const S=Xs(K[D],u);return S===-1?void 0:qs(K[D],S,1)[0]}return Bi(K[D])},t.removeHooks=function(D){K[D]=[]},t.removeAllHooks=function(){K=Xi()},t}qi();function Zi(e=8,t="id-"){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",i=n+"0123456789-_";let r=n.charAt(Math.floor(Math.random()*n.length));for(let o=1;o<e;o++)r+=i.charAt(Math.floor(Math.random()*i.length));return`${t}${r}`}let Qi=class fr{constructor(t,n,i,r=Zi(),o=[]){x(this,"id");x(this,"data");x(this,"children");x(this,"style");x(this,"edgesOut");x(this,"edgesIn");x(this,"defaultCircleRadius",10);x(this,"x");x(this,"y");x(this,"vx");x(this,"vy");x(this,"fx");x(this,"fy");x(this,"weight");x(this,"frozen");x(this,"visible");x(this,"expanded");x(this,"isChild");x(this,"childrenDepth");x(this,"isParent");x(this,"parentNode");x(this,"_original_object");x(this,"_deepest_node_clone");x(this,"_subgraph");x(this,"_circleRadius",this.defaultCircleRadius);x(this,"_circleRadiusCollapsed",this.defaultCircleRadius);x(this,"_dirty");x(this,"domID");this.id=t,this.domID=r,this.data=n??{},this.style=i??{},this.children=[],this.isParent=!1,this.setChildren(o),this._dirty=!0,this.frozen=!1,this.visible=!0,this.expanded=!1,this.isChild=!1,this.childrenDepth=0,this.edgesOut=new Set,this.edgesIn=new Set}getData(){return this.data}setData(t){this.data=t,this.markDirty()}updateData(t){this.data={...this.data,...t},this.markDirty()}registerEdgeOut(t){this.edgesOut.add(t)}registerEdgeIn(t){this.edgesIn.add(t)}emptyEdges(){this.edgesOut.clear(),this.edgesIn.clear()}getConnectedNodes(){return[...this.edgesOut].map(t=>t.to)}getConnectingNodes(){return[...this.edgesIn].map(t=>t.from)}getEdgesOut(){return[...this.edgesOut]}getEdgesIn(){return[...this.edgesIn]}getStyle(){return this.style}setStyle(t){this.style=t,this.markDirty()}updateStyle(t){this.style={...this.style,...t},this.markDirty()}getGraphElement(){return document?document.getElementById(`node-${this.domID}`):null}toDict(t=!1){const n={id:this.id,data:this.data,style:this.style,weight:this.weight};return t||(n.x=this.x,n.y=this.y,n.vx=this.vx,n.vy=this.vy,n.fx=this.fx,n.fy=this.fy),this.hasChildren()&&(n.children=this.children.map(i=>i.toDict(t))),n}toSimulationDTO(){return{id:this.id,data:this.data,style:this.style,weight:this.weight,_circleRadius:this._circleRadius,x:this.x,y:this.y,vx:this.vx,vy:this.vy,fx:this.fx,fy:this.fy}}clone(){const t={...this.data},n={...this.style},i=new fr(this.id,t,n);return i.x=this.x,i.y=this.y,i.vx=this.vx,i.vy=this.vy,i.fx=this.fx,i.fy=this.fy,i.weight=this.weight,i.frozen=this.frozen,i.visible=this.visible,i.expanded=this.expanded,i.isChild=this.isChild,i.childrenDepth=this.childrenDepth,i.isParent=this.isParent,i.parentNode=this.parentNode,i._circleRadius=this._circleRadius,i.children=this.children.map(r=>r.clone()),i}markDirty(){this._dirty=!0}clearDirty(){this._dirty=!1}isDirty(){return this._dirty}freeze(){this.frozen=!0,this.fx=this.x,this.fy=this.y}unfreeze(){this.frozen=!1,this.fx=void 0,this.fy=void 0}toggleVisibility(t){t?this.show():this.hide(),this.markDirty()}show(){this.visible=!0}hide(){this.visible=!1}toggleExpand(t){t===void 0?this.expanded?this.collapse():this.expand():t?this.expand():this.collapse(),this.markDirty()}expand(){this.expanded=!0,this._original_object&&(this._original_object.expanded=!0)}collapse(){this.expanded=!1,this._original_object&&(this._original_object.expanded=!1)}degree(){return this.edgesOut.size+this.edgesIn.size}setCircleRadius(t){this._circleRadius=t}getCircleRadius(){return this._circleRadius}setCircleRadiusCollapsed(t){this._circleRadiusCollapsed=t}getCircleRadiusCollapsed(){return this._circleRadiusCollapsed}setChildren(t){this.children=t,this.hasChildren()?this.isParent=!0:this.isParent=!1}hasChildren(){return this.children.length>0}markAsChild(t,n){this.isChild=!0,this.childrenDepth=n,this.parentNode=t}markAsParent(){this.isParent=!0}setSubgraph(t){this._subgraph=t}getSubgraph(){return this._subgraph}setOriginalObject(t){this._original_object=t}getOriginalObject(){return this._original_object}setDeepestNodeClone(t){this._deepest_node_clone=t}getDeepestNodeClone(){return this._deepest_node_clone}};class rn{constructor(t,n,i,r,o,a=null,l){x(this,"id");x(this,"from");x(this,"to");x(this,"directed");x(this,"data");x(this,"style");x(this,"visible");x(this,"isSynthetic");x(this,"isCrossCluster");x(this,"syntheticTerminalNode");x(this,"syntheticSourceNode");x(this,"_original_object");x(this,"_subgraphFromNode");x(this,"_subgraphToNode");x(this,"_dirty");x(this,"domID");this.id=t,this.domID=Zi(),this.from=n,this.to=i,this.directed=a,this.data=r??{},this.style=o??{},this.visible=!0,this._dirty=!0,this.isSynthetic=l!==void 0,this.syntheticTerminalNode=l,this.from.registerEdgeOut(this),this.to.registerEdgeIn(this)}get source(){return this.from}get target(){return this.to}getData(){return this.data}setData(t){this.data=t,this.markDirty()}updateData(t){this.data={...this.data,...t},this.markDirty()}getStyle(){return this.style}getEdgeStyle(){var t;return((t=this.style)==null?void 0:t.edge)??{}}getLabelStyle(){var t;return((t=this.style)==null?void 0:t.label)??{}}setStyle(t){this.style=t,this.markDirty()}updateStyle(t){const n=this.style,i=t;this.style={...n,...i,edge:{...n.edge,...i.edge},label:{...n.label,...i.label}},this.markDirty()}getGraphElement(){return document?document.getElementById(`edge-${this.domID}`):null}setFrom(t){this.from=t}setTo(t){this.to=t}toDict(){return{id:this.id,from:this.from.id,to:this.to.id,data:this.data,style:this.style}}toSimulationDTO(){return{id:this.id,from:{id:this.from.id},to:{id:this.to.id},data:this.data,style:this.style,directed:this.directed}}clone(){const t={...this.data},n={...this.style},i=new rn(this.id,this.from.clone(),this.to.clone(),t,n,this.directed);return i.visible=this.visible,i}markDirty(){this._dirty=!0}clearDirty(){this._dirty=!1}isDirty(){return this._dirty}toggleVisibility(t){t?this.show():this.hide(),this.markDirty()}show(){this.visible=!0}hide(){this.visible=!1}setOriginalObject(t){this._original_object=t}getOriginalObject(){return this._original_object}setSubgraphFromNode(t){this._subgraphFromNode=t}setSubgraphToNode(t){this._subgraphToNode=t}getSubgraphFromNode(){return this._subgraphFromNode}getSubgraphToNode(){return this._subgraphToNode}}function ya(e){return new Worker(self.location.href,{name:e==null?void 0:e.name})}function _a(){return new ya}const Ta=(e,t,n,i,r)=>new Promise((o,a)=>{const l=_a();l.postMessage({source:"simulation-worker-wrapper",nodes:e,edges:t,options:n,canvasBCR:i}),l.onmessage=h=>{const{type:s,progress:f,nodes:b,edges:m,elapsedTime:p}=h.data;if(s==="tick"&&typeof f=="number"){r==null||r(f,p);return}s==="done"&&(o({nodes:b,edges:m}),l.terminate())},l.onerror=a});var on=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function wa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Re={exports:{}};Re.exports;var Ji;function ba(){return Ji||(Ji=1,(function(e,t){var n=200,i="__lodash_hash_undefined__",r=800,o=16,a=9007199254740991,l="[object Arguments]",h="[object Array]",s="[object AsyncFunction]",f="[object Boolean]",b="[object Date]",m="[object Error]",p="[object Function]",A="[object GeneratorFunction]",y="[object Map]",_="[object Number]",T="[object Null]",v="[object Object]",E="[object Proxy]",g="[object RegExp]",R="[object Set]",C="[object String]",k="[object Undefined]",F="[object WeakMap]",$="[object ArrayBuffer]",G="[object DataView]",Q="[object Float32Array]",ht="[object Float64Array]",st="[object Int8Array]",K="[object Int16Array]",Vt="[object Int32Array]",Rt="[object Uint8Array]",kt="[object Uint8ClampedArray]",Me="[object Uint16Array]",ge="[object Uint32Array]",ne=/[\\\\^$.*+?()[\\]{}|]/g,pn=/^\\[object .+?Constructor\\]$/,Xn=/^(?:0|[1-9]\\d*)$/,H={};H[Q]=H[ht]=H[st]=H[K]=H[Vt]=H[Rt]=H[kt]=H[Me]=H[ge]=!0,H[l]=H[h]=H[$]=H[f]=H[G]=H[b]=H[m]=H[p]=H[y]=H[_]=H[v]=H[g]=H[R]=H[C]=H[F]=!1;var X=typeof on=="object"&&on&&on.Object===Object&&on,Le=typeof self=="object"&&self&&self.Object===Object&&self,Y=X||Le||Function("return this")(),me=t&&!t.nodeType&&t,j=me&&!0&&e&&!e.nodeType&&e,$t=j&&j.exports===me,Yt=$t&&X.process,vt=(function(){try{var c=j&&j.require&&j.require("util").types;return c||Yt&&Yt.binding&&Yt.binding("util")}catch{}})(),ke=vt&&vt.isTypedArray;function Fe(c,d,w){switch(w.length){case 0:return c.call(d);case 1:return c.call(d,w[0]);case 2:return c.call(d,w[0],w[1]);case 3:return c.call(d,w[0],w[1],w[2])}return c.apply(d,w)}function gn(c,d){for(var w=-1,I=Array(c);++w<c;)I[w]=d(w);return I}function mn(c){return function(d){return c(d)}}function Ct(c,d){return c==null?void 0:c[d]}function ie(c,d){return function(w){return c(d(w))}}var Ft=Array.prototype,Pe=Function.prototype,Kt=Object.prototype,Ot=Y["__core-js_shared__"],Pt=Pe.toString,pt=Kt.hasOwnProperty,ze=(function(){var c=/[^.]+$/.exec(Ot&&Ot.keys&&Ot.keys.IE_PROTO||"");return c?"Symbol(src)_1."+c:""})(),Be=Kt.toString,yn=Pt.call(Object),Ue=RegExp("^"+Pt.call(pt).replace(ne,"\\\\$&").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g,"$1.*?")+"$"),Mt=$t?Y.Buffer:void 0,zt=Y.Symbol,gt=Y.Uint8Array;Mt&&Mt.allocUnsafe;var ye=ie(Object.getPrototypeOf,Object),Ge=Object.create,_n=Kt.propertyIsEnumerable,He=Ft.splice,Lt=zt?zt.toStringTag:void 0,Bt=(function(){try{var c=ni(Object,"defineProperty");return c({},"",{}),c}catch{}})(),_e=Mt?Mt.isBuffer:void 0,mt=Math.max,Xt=Date.now,Te=ni(Y,"Map"),Ut=ni(Object,"create"),qn=(function(){function c(){}return function(d){if(!ae(d))return{};if(Ge)return Ge(d);c.prototype=d;var w=new c;return c.prototype=void 0,w}})();function At(c){var d=-1,w=c==null?0:c.length;for(this.clear();++d<w;){var I=c[d];this.set(I[0],I[1])}}function je(){this.__data__=Ut?Ut(null):{},this.size=0}function Zn(c){var d=this.has(c)&&delete this.__data__[c];return this.size-=d?1:0,d}function re(c){var d=this.__data__;if(Ut){var w=d[c];return w===i?void 0:w}return pt.call(d,c)?d[c]:void 0}function Qn(c){var d=this.__data__;return Ut?d[c]!==void 0:pt.call(d,c)}function Jn(c,d){var w=this.__data__;return this.size+=this.has(c)?0:1,w[c]=Ut&&d===void 0?i:d,this}At.prototype.clear=je,At.prototype.delete=Zn,At.prototype.get=re,At.prototype.has=Qn,At.prototype.set=Jn;function B(c){var d=-1,w=c==null?0:c.length;for(this.clear();++d<w;){var I=c[d];this.set(I[0],I[1])}}function qt(){this.__data__=[],this.size=0}function ti(c){var d=this.__data__,w=se(d,c);if(w<0)return!1;var I=d.length-1;return w==I?d.pop():He.call(d,w,1),--this.size,!0}function Tn(c){var d=this.__data__,w=se(d,c);return w<0?void 0:d[w][1]}function We(c){return se(this.__data__,c)>-1}function wn(c,d){var w=this.__data__,I=se(w,c);return I<0?(++this.size,w.push([c,d])):w[I][1]=d,this}B.prototype.clear=qt,B.prototype.delete=ti,B.prototype.get=Tn,B.prototype.has=We,B.prototype.set=wn;function Gt(c){var d=-1,w=c==null?0:c.length;for(this.clear();++d<w;){var I=c[d];this.set(I[0],I[1])}}function ei(){this.size=0,this.__data__={hash:new At,map:new(Te||B),string:new At}}function yt(c){var d=Dn(this,c).delete(c);return this.size-=d?1:0,d}function Ht(c){return Dn(this,c).get(c)}function bn(c){return Dn(this,c).has(c)}function Sn(c,d){var w=Dn(this,c),I=w.size;return w.set(c,d),this.size+=w.size==I?0:1,this}Gt.prototype.clear=ei,Gt.prototype.delete=yt,Gt.prototype.get=Ht,Gt.prototype.has=bn,Gt.prototype.set=Sn;function jt(c){var d=this.__data__=new B(c);this.size=d.size}function we(){this.__data__=new B,this.size=0}function oe(c){var d=this.__data__,w=d.delete(c);return this.size=d.size,w}function be(c){return this.__data__.get(c)}function Et(c){return this.__data__.has(c)}function vn(c,d){var w=this.__data__;if(w instanceof B){var I=w.__data__;if(!Te||I.length<n-1)return I.push([c,d]),this.size=++w.size,this;w=this.__data__=new Gt(I)}return w.set(c,d),this.size=w.size,this}jt.prototype.clear=we,jt.prototype.delete=oe,jt.prototype.get=be,jt.prototype.has=Et,jt.prototype.set=vn;function An(c,d){var w=oi(c),I=!w&&ri(c),P=!w&&!I&&sr(c),V=!w&&!I&&!P&&lr(c),q=w||I||P||V,U=q?gn(c.length,String):[],Z=U.length;for(var xt in c)q&&(xt=="length"||P&&(xt=="offset"||xt=="parent")||V&&(xt=="buffer"||xt=="byteLength"||xt=="byteOffset")||rr(xt,Z))||U.push(xt);return U}function Ve(c,d,w){(w!==void 0&&!In(c[d],w)||w===void 0&&!(d in c))&&Zt(c,d,w)}function En(c,d,w){var I=c[d];(!(pt.call(c,d)&&In(I,w))||w===void 0&&!(d in c))&&Zt(c,d,w)}function se(c,d){for(var w=c.length;w--;)if(In(c[w][0],d))return w;return-1}function Zt(c,d,w){d=="__proto__"&&Bt?Bt(c,d,{configurable:!0,enumerable:!0,value:w,writable:!0}):c[d]=w}var Qt=il();function D(c){return c==null?c===void 0?k:T:Lt&&Lt in Object(c)?rl(c):ul(c)}function u(c){return Ye(c)&&D(c)==l}function S(c){if(!ae(c)||ll(c))return!1;var d=ai(c)?Ue:pn;return d.test(pl(c))}function N(c){return Ye(c)&&ar(c.length)&&!!H[D(c)]}function z(c){if(!ae(c))return cl(c);var d=or(c),w=[];for(var I in c)I=="constructor"&&(d||!pt.call(c,I))||w.push(I);return w}function L(c,d,w,I,P){c!==d&&Qt(d,function(V,q){if(P||(P=new jt),ae(V))W(c,d,q,w,L,I,P);else{var U=I?I(ii(c,q),V,q+"",c,d,P):void 0;U===void 0&&(U=V),Ve(c,q,U)}},cr)}function W(c,d,w,I,P,V,q){var U=ii(c,w),Z=ii(d,w),xt=q.get(Z);if(xt){Ve(c,w,xt);return}var Tt=V?V(U,Z,w+"",c,d,q):void 0,Ke=Tt===void 0;if(Ke){var li=oi(Z),ci=!li&&sr(Z),hr=!li&&!ci&&lr(Z);Tt=Z,li||ci||hr?oi(U)?Tt=U:gl(U)?Tt=xn(U):ci?(Ke=!1,Tt=_t(Z)):hr?(Ke=!1,Tt=et(Z)):Tt=[]:ml(Z)||ri(Z)?(Tt=U,ri(U)?Tt=yl(U):(!ae(U)||ai(U))&&(Tt=ol(Z))):Ke=!1}Ke&&(q.set(Z,Tt),P(Tt,Z,I,V,q),q.delete(Z)),Ve(c,w,Tt)}function dt(c,d){return fl(hl(c,d,ur),c+"")}var St=Bt?function(c,d){return Bt(c,"toString",{configurable:!0,enumerable:!1,value:Tl(d),writable:!0})}:ur;function _t(c,d){return c.slice()}function $e(c){var d=new c.constructor(c.byteLength);return new gt(d).set(new gt(c)),d}function et(c,d){var w=$e(c.buffer);return new c.constructor(w,c.byteOffset,c.length)}function xn(c,d){var w=-1,I=c.length;for(d||(d=Array(I));++w<I;)d[w]=c[w];return d}function Nn(c,d,w,I){var P=!w;w||(w={});for(var V=-1,q=d.length;++V<q;){var U=d[V],Z=void 0;Z===void 0&&(Z=c[U]),P?Zt(w,U,Z):En(w,U,Z)}return w}function nl(c){return dt(function(d,w){var I=-1,P=w.length,V=P>1?w[P-1]:void 0,q=P>2?w[2]:void 0;for(V=c.length>3&&typeof V=="function"?(P--,V):void 0,q&&sl(w[0],w[1],q)&&(V=P<3?void 0:V,P=1),d=Object(d);++I<P;){var U=w[I];U&&c(d,U,I,V)}return d})}function il(c){return function(d,w,I){for(var P=-1,V=Object(d),q=I(d),U=q.length;U--;){var Z=q[++P];if(w(V[Z],Z,V)===!1)break}return d}}function Dn(c,d){var w=c.__data__;return al(d)?w[typeof d=="string"?"string":"hash"]:w.map}function ni(c,d){var w=Ct(c,d);return S(w)?w:void 0}function rl(c){var d=pt.call(c,Lt),w=c[Lt];try{c[Lt]=void 0;var I=!0}catch{}var P=Be.call(c);return I&&(d?c[Lt]=w:delete c[Lt]),P}function ol(c){return typeof c.constructor=="function"&&!or(c)?qn(ye(c)):{}}function rr(c,d){var w=typeof c;return d=d??a,!!d&&(w=="number"||w!="symbol"&&Xn.test(c))&&c>-1&&c%1==0&&c<d}function sl(c,d,w){if(!ae(w))return!1;var I=typeof d;return(I=="number"?si(w)&&rr(d,w.length):I=="string"&&d in w)?In(w[d],c):!1}function al(c){var d=typeof c;return d=="string"||d=="number"||d=="symbol"||d=="boolean"?c!=="__proto__":c===null}function ll(c){return!!ze&&ze in c}function or(c){var d=c&&c.constructor,w=typeof d=="function"&&d.prototype||Kt;return c===w}function cl(c){var d=[];if(c!=null)for(var w in Object(c))d.push(w);return d}function ul(c){return Be.call(c)}function hl(c,d,w){return d=mt(d===void 0?c.length-1:d,0),function(){for(var I=arguments,P=-1,V=mt(I.length-d,0),q=Array(V);++P<V;)q[P]=I[d+P];P=-1;for(var U=Array(d+1);++P<d;)U[P]=I[P];return U[d]=w(q),Fe(c,this,U)}}function ii(c,d){if(!(d==="constructor"&&typeof c[d]=="function")&&d!="__proto__")return c[d]}var fl=dl(St);function dl(c){var d=0,w=0;return function(){var I=Xt(),P=o-(I-w);if(w=I,P>0){if(++d>=r)return arguments[0]}else d=0;return c.apply(void 0,arguments)}}function pl(c){if(c!=null){try{return Pt.call(c)}catch{}try{return c+""}catch{}}return""}function In(c,d){return c===d||c!==c&&d!==d}var ri=u((function(){return arguments})())?u:function(c){return Ye(c)&&pt.call(c,"callee")&&!_n.call(c,"callee")},oi=Array.isArray;function si(c){return c!=null&&ar(c.length)&&!ai(c)}function gl(c){return Ye(c)&&si(c)}var sr=_e||wl;function ai(c){if(!ae(c))return!1;var d=D(c);return d==p||d==A||d==s||d==E}function ar(c){return typeof c=="number"&&c>-1&&c%1==0&&c<=a}function ae(c){var d=typeof c;return c!=null&&(d=="object"||d=="function")}function Ye(c){return c!=null&&typeof c=="object"}function ml(c){if(!Ye(c)||D(c)!=v)return!1;var d=ye(c);if(d===null)return!0;var w=pt.call(d,"constructor")&&d.constructor;return typeof w=="function"&&w instanceof w&&Pt.call(w)==yn}var lr=ke?mn(ke):N;function yl(c){return Nn(c,cr(c))}function cr(c){return si(c)?An(c):z(c)}var _l=nl(function(c,d,w){L(c,d,w)});function Tl(c){return function(){return c}}function ur(c){return c}function wl(){return!1}e.exports=_l})(Re,Re.exports)),Re.exports}var Sa=ba(),sn=wa(Sa);function va(e){var t=0,n=e.children,i=n&&n.length;if(!i)t=1;else for(;--i>=0;)t+=n[i].value;e.value=t}function Aa(){return this.eachAfter(va)}function Ea(e,t){let n=-1;for(const i of this)e.call(t,i,++n,this);return this}function xa(e,t){for(var n=this,i=[n],r,o,a=-1;n=i.pop();)if(e.call(t,n,++a,this),r=n.children)for(o=r.length-1;o>=0;--o)i.push(r[o]);return this}function Na(e,t){for(var n=this,i=[n],r=[],o,a,l,h=-1;n=i.pop();)if(r.push(n),o=n.children)for(a=0,l=o.length;a<l;++a)i.push(o[a]);for(;n=r.pop();)e.call(t,n,++h,this);return this}function Da(e,t){let n=-1;for(const i of this)if(e.call(t,i,++n,this))return i}function Ia(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,i=t.children,r=i&&i.length;--r>=0;)n+=i[r].value;t.value=n})}function Ra(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function Ca(e){for(var t=this,n=Oa(t,e),i=[t];t!==n;)t=t.parent,i.push(t);for(var r=i.length;e!==n;)i.splice(r,0,e),e=e.parent;return i}function Oa(e,t){if(e===t)return e;var n=e.ancestors(),i=t.ancestors(),r=null;for(e=n.pop(),t=i.pop();e===t;)r=e,e=n.pop(),t=i.pop();return r}function Ma(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function La(){return Array.from(this)}function ka(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function Fa(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*Pa(){var e=this,t,n=[e],i,r,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,i=e.children)for(r=0,o=i.length;r<o;++r)n.push(i[r]);while(n.length)}function an(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=Ua)):t===void 0&&(t=Ba);for(var n=new Ce(e),i,r=[n],o,a,l,h;i=r.pop();)if((a=t(i.data))&&(h=(a=Array.from(a)).length))for(i.children=a,l=h-1;l>=0;--l)r.push(o=a[l]=new Ce(a[l])),o.parent=i,o.depth=i.depth+1;return n.eachBefore(Ha)}function za(){return an(this).eachBefore(Ga)}function Ba(e){return e.children}function Ua(e){return Array.isArray(e)?e[1]:null}function Ga(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Ha(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function Ce(e){this.data=e,this.depth=this.height=0,this.parent=null}Ce.prototype=an.prototype={constructor:Ce,count:Aa,each:Ea,eachAfter:Na,eachBefore:xa,find:Da,sum:Ia,sort:Ra,path:Ca,ancestors:Ma,descendants:La,leaves:ka,links:Fa,copy:za,[Symbol.iterator]:Pa};function ja(e,t){return e.parent===t.parent?1:2}function $n(e){var t=e.children;return t?t[0]:e.t}function Yn(e){var t=e.children;return t?t[t.length-1]:e.t}function Wa(e,t,n){var i=n/(t.i-e.i);t.c-=i,t.s+=n,e.c+=i,t.z+=n,t.m+=n}function Va(e){for(var t=0,n=0,i=e.children,r=i.length,o;--r>=0;)o=i[r],o.z+=t,o.m+=t,t+=o.s+(n+=o.c)}function $a(e,t,n){return e.a.parent===t.parent?e.a:n}function ln(e,t){this._=e,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}ln.prototype=Object.create(Ce.prototype);function Ya(e){for(var t=new ln(e,0),n,i=[t],r,o,a,l;n=i.pop();)if(o=n._.children)for(n.children=new Array(l=o.length),a=l-1;a>=0;--a)i.push(r=n.children[a]=new ln(o[a],a)),r.parent=n;return(t.parent=new ln(null,0)).children=[t],t}function tr(){var e=ja,t=1,n=1,i=null;function r(s){var f=Ya(s);if(f.eachAfter(o),f.parent.m=-f.z,f.eachBefore(a),i)s.eachBefore(h);else{var b=s,m=s,p=s;s.eachBefore(function(v){v.x<b.x&&(b=v),v.x>m.x&&(m=v),v.depth>p.depth&&(p=v)});var A=b===m?1:e(b,m)/2,y=A-b.x,_=t/(m.x+A+y),T=n/(p.depth||1);s.eachBefore(function(v){v.x=(v.x+y)*_,v.y=v.depth*T})}return s}function o(s){var f=s.children,b=s.parent.children,m=s.i?b[s.i-1]:null;if(f){Va(s);var p=(f[0].z+f[f.length-1].z)/2;m?(s.z=m.z+e(s._,m._),s.m=s.z-p):s.z=p}else m&&(s.z=m.z+e(s._,m._));s.parent.A=l(s,m,s.parent.A||b[0])}function a(s){s._.x=s.z+s.parent.m,s.m+=s.parent.m}function l(s,f,b){if(f){for(var m=s,p=s,A=f,y=m.parent.children[0],_=m.m,T=p.m,v=A.m,E=y.m,g;A=Yn(A),m=$n(m),A&&m;)y=$n(y),p=Yn(p),p.a=s,g=A.z+v-m.z-_+e(A._,m._),g>0&&(Wa($a(A,s,b),s,g),_+=g,T+=g),v+=A.m,_+=m.m,E+=y.m,T+=p.m;A&&!Yn(p)&&(p.t=A,p.m+=v-T),m&&!$n(y)&&(y.t=m,y.m+=_-E,b=s)}return b}function h(s){s.x*=t,s.y=s.depth*n}return r.separation=function(s){return arguments.length?(e=s,r):e},r.size=function(s){return arguments.length?(i=!1,t=+s[0],n=+s[1],r):i?null:[t,n]},r.nodeSize=function(s){return arguments.length?(i=!0,t=+s[0],n=+s[1],r):i?[t,n]:null},r}function cn(e,t){const n=new Map;for(const a of e)n.set(a.id,[]);for(const{source:a,target:l}of t){const h=n.get(a.id);h?h.push(l.id):n.set(a.id,[l.id])}const i=new Set,r=new Set,o=[];for(const a of e)if(!i.has(a.id))for(i.add(a.id),r.add(a.id),o.push({id:a.id,next:0});o.length>0;){const l=o[o.length-1],h=n.get(l.id)??[];if(l.next>=h.length){r.delete(l.id),o.pop();continue}const s=h[l.next++];if(r.has(s))return!0;i.has(s)||(i.add(s),r.add(s),o.push({id:s,next:0}))}return!1}function er(e,t){const n=new Set(t.map(i=>i.target.id));for(const i of e)if(!n.has(i.id))return i;return e[0]}const Ka=1e6;function Xa(e,t){var l;const n=new Map;for(const h of e)n.set(h.id,[]);for(const h of t)(l=n.get(h.from.id))==null||l.push(h.to);let i=0,r=!1,o=null,a=-1;for(const h of e){const s=new Set([h.id]),f=[h];for(;f.length>0&&!r;){const m=f.pop();for(const p of n.get(m.id)??[]){if(++i>Ka){r=!0;break}s.has(p.id)||(s.add(p.id),f.push(p))}}const b=s.size-1;if(b>a&&(a=b,o=h),r)break}return r&&console.warn("Pivotick: reachability search hit its traversal cap, using the best root found so far."),o??e[0]}function qa(e,t){const n=new Map,i=new Map;for(const s of e)n.set(s.id,[]),i.set(s.id,0);for(const s of t)s.directed!==!1&&(n.get(s.from.id).push(s.to),i.set(s.to.id,(i.get(s.to.id)||0)+1));const r=[],o=e.filter(s=>i.get(s.id)===0);for(;o.length;){const s=o.shift();r.push(s);for(const f of n.get(s.id))i.set(f.id,i.get(f.id)-1),i.get(f.id)===0&&o.push(f)}if(r.length!==e.length)return console.warn("Graph has a cycle! Min-max distance root undefined."),e[0];const a=new Map;for(let s=r.length-1;s>=0;s--){const f=r[s];let b=0;for(const m of n.get(f.id))b=Math.max(b,1+(a.get(m.id)||0));a.set(f.id,b)}let l=null,h=1/0;for(const s of e){const f=a.get(s.id);f<h&&(h=f,l=s)}return l??e[0]}function Za(e,t){const n=new Map,i=new Map;for(const s of e)n.set(s.id,[]),i.set(s.id,0);for(const s of t)s.directed!==!1&&(n.get(s.from.id).push(s.to),i.set(s.to.id,(i.get(s.to.id)||0)+1));const r=[],o=e.filter(s=>i.get(s.id)===0);for(;o.length;){const s=o.shift();r.push(s);for(const f of n.get(s.id))i.set(f.id,i.get(f.id)-1),i.get(f.id)===0&&o.push(f)}if(r.length!==e.length)return console.warn("Graph has a cycle! Cannot minimize DAG height."),e[0];const a=new Map;for(let s=r.length-1;s>=0;s--){const f=r[s];let b=0;for(const m of n.get(f.id))b=Math.max(b,1+(a.get(m.id)??0));a.set(f.id,b)}let l=null,h=1/0;for(const s of e){const f=a.get(s.id);f<h&&(h=f,l=s)}return l??e[0]}const Kn={type:"tree",rootId:void 0,rootIdAlgorithmFinder:"MaxReachability",strength:.25,radial:!1,radialGap:750,horizontal:!1,flipEdgeDirection:!1};class it{constructor(t,n,i,r={}){x(this,"graph");x(this,"simulation");x(this,"simulationForces");x(this,"options");x(this,"originalForceStrength");x(this,"canvasBCR");x(this,"levels");x(this,"positionedNodesByID");this.graph=t,this.simulation=n,this.simulationForces=i,this.options=sn({},Kn,r),this.originalForceStrength={link:this.simulationForces.link.strength(),charge:this.simulationForces.charge.strength(),gravity:this.simulationForces.gravity.strength()},this.positionedNodesByID=new Map,this.levels=new Map;const o=this.graph.getNodes(),a=this.options.flipEdgeDirection?this.flipEdgeDirection(this.graph.getEdges()):this.graph.getEdges();if(cn(o,a)){this.graph.notifier.warning("Tree layout unavailable","The graph contains a cycle, so it cannot be displayed as a tree.");return}this.setSizes(),this.update(),this.registerForces()}update(){const t=this.graph.getNodes(),n=this.options.flipEdgeDirection?this.flipEdgeDirection(this.graph.getEdges()):this.graph.getEdges(),{levels:i}=this.buildLevels(t,n,void 0,this.options.rootIdAlgorithmFinder),{nodes:r,nodeById:o}=this.buildTree(t,n,this.options,this.canvasBCR);this.positionedNodesByID=o,this.levels=i,r&&this.setNodePositions(r,this.options)}flipEdgeDirection(t){return t.forEach(n=>{const i=n.from;n.setFrom(n.to),n.setTo(i)}),t}setSizes(){const t=this.graph.renderer.getCanvas();if(!t)throw new Error("Canvas element is not defined in the graph renderer.");this.canvasBCR=t.getBoundingClientRect()}setNodePositions(t,n){for(const i of t){const r=this.graph.getMutableNode(i.data.id);if(r)if(n.radial){const o=i.x??0,a=i.y??0;r.x=a*Math.cos(o-Math.PI/2),r.y=a*Math.sin(o-Math.PI/2),r.fx=r.x,r.fy=r.y}else n.horizontal?(r.x=i.y,r.fx=i.y,r.y=i.x,delete r.fy):(r.x=i.x,r.y=i.y,r.fy=i.y,delete r.fx)}}unsetNodePositions(){this.graph.getMutableNodes().forEach(t=>{delete t.fy,delete t.fx})}registerForces(){const t=this.options.strength??.1;if(this.options.radial){const n=Ti(i=>(this.levels.get(i.id)??1)*100,0,0).strength(t);this.simulation.force("tree-radial",n)}else this.simulation.force("tree-y",bi(n=>{var i,r;return this.options.horizontal?((i=this.positionedNodesByID.get(n.id))==null?void 0:i.x)??0:((r=this.positionedNodesByID.get(n.id))==null?void 0:r.y)??0}).strength(t)),this.simulation.force("tree-x",wi(n=>{var i,r;return this.options.horizontal?((i=this.positionedNodesByID.get(n.id))==null?void 0:i.y)??0:((r=this.positionedNodesByID.get(n.id))==null?void 0:r.x)??0}).strength(t));it.adjustOtherSimulationForces(this.simulationForces,this.options)}unregisterLayout(){this.unregisterForces(),this.unsetNodePositions()}unregisterForces(){this.simulation.force("tree-radial",null),this.simulation.force("tree-y",null),this.simulation.force("tree-x",null),it.resetOtherSimulationForces(this.simulationForces,this.originalForceStrength)}static registerForcesOnSimulation(t,n,i,r,o,a,l=this){const h=sn({},Kn,o),s=h.strength??.1,f=a.width,b=a.height,m=[f/2,b/2];if(cn(t,n))return;const{levels:p}=l.buildLevelsStatic(t,n,void 0,h.rootIdAlgorithmFinder),{nodeById:A}=l.buildTreeStatic(t,n,h,a);if(h.radial){const y=Ti(_=>(p.get(_.id)??1)*100,m[0],m[1]).strength(s);i.force("tree-radial",y)}else i.force("tree-y",bi(y=>{var _,T;return h.horizontal?((_=A.get(y.id))==null?void 0:_.x)??0:((T=A.get(y.id))==null?void 0:T.y)??0}).strength(s)),i.force("tree-x",wi(y=>{var _,T;return h.horizontal?((_=A.get(y.id))==null?void 0:_.y)??0:((T=A.get(y.id))==null?void 0:T.x)??0}).strength(s));l.adjustOtherSimulationForces(r,h)}static adjustOtherSimulationForces(t,n){n!=null&&n.radial?(t.link.strength(0),t.charge.strength(0),t.gravity.strength(0)):(t.link.strength(0),t.charge.strength(0),t.gravity.strength(1e-5))}static resetOtherSimulationForces(t,n){t.link.strength(n.link),t.charge.strength(n.charge),t.gravity.strength(n.gravity)}static simulationDone(t,n,i,r){const o=sn({},Kn,r);for(const a of t)o.radial?(a.fx=a.x,a.fy=a.y):o.horizontal?(a.fx=a.x,delete a.fy):(a.fy=a.y,delete a.fx)}buildTree(t,n,i,r){return it.buildTreeStatic(t,n,i,r)}static buildTreeStatic(t,n,i,r){if(!t.length)return{root:null,nodes:[],nodeById:new Map};if(cn(t,n))return console.warn("Cycle detected in graph. Tree layout will not be computed."),{root:null,nodes:[],nodeById:new Map};const o=new Map;for(const y of t){const _=y;_.children=[],o.set(y.id,_)}for(const y of n){const _=o.get(y.source.id),T=o.get(y.target.id);_&&T&&(_.children.push(T),T.parent=_)}const a=i.rootId||it.findRootId(t,n,i.rootIdAlgorithmFinder),l=o.get(a);if(!l)throw new Error(`Root node with id "${a}" not found.`);const h=i.radialGap,s=i.radial?2*Math.PI:r.width,f=i.radial?h:r.height,b=tr();i.radial?b.size([s,f]):b.size([s,f]).separation((y,_)=>{var v,E;const T=((E=(v=y.parent)==null?void 0:v.children)==null?void 0:E.length)??1;return y.parent===_.parent?1.5/T:1.5});const m=an(l),p=b(m),A=new Map;return p.descendants().forEach(y=>{A.set(y.data.id,y)}),{root:p,nodes:p.descendants(),nodeById:A}}buildLevels(t,n,i,r){return it.buildLevelsStatic(t,n,i,r)}static buildLevelsStatic(t,n,i,r){var m;if(!t.length)return{levels:new Map,maxDepth:0,nodeCountPerLevel:{}};const o=i||it.findRootId(t,n,r),a=new Map([[o,0]]),l=new Map;for(const p of t)l.set(p.id,[]);for(const{source:p,target:A}of n)(m=l.get(p.id))==null||m.push(A.id);const h=[o];let s=0;for(;s<h.length;){const p=h[s++],A=a.get(p)??0;for(const y of l.get(p)??[])a.has(y)||(a.set(y,A+1),h.push(y))}let f=0;const b={};for(const p of a.values())p>f&&(f=p),b[p]=(b[p]||0)+1;return{levels:a,maxDepth:f,nodeCountPerLevel:b}}static findRootId(t,n,i){switch(i){case"FirstZeroInDegree":return er(t,n).id;case"MaxReachability":return Xa(t,n).id;case"MinMaxDistance":return qa(t,n).id;case"MinHeight":return Za(t,n).id;default:return er(t,n).id}}}class Oe extends it{constructor(t,n,i,r){super(t,n,i,{...r,type:"tree"})}static registerForcesOnSimulation(t,n,i,r,o,a){it.registerForcesOnSimulation(t,n,i,r,o,a,Oe)}buildTree(t,n,i,r){return Oe.buildTreeStatic(t,n,i,r)}static buildTreeStatic(t,n,i,r){if(!t.length)return{root:null,nodes:[],nodeById:new Map};if(cn(t,n))return console.warn("Cycle detected in graph. Tree layout will not be computed."),{root:null,nodes:[],nodeById:new Map};const o=new Map;for(const y of t){const _=y;_.children=[],o.set(y.id,_)}if(!i.rootId||!o.get(i.rootId))throw new Error("Ego Tree can only be created with a rootId");const a=i.rootId,l=o.get(a);if(l.children=[],!l)throw new Error(`Root node with id "${a}" not found.`);for(const y of n){const _=o.get(y.source.id),T=o.get(y.target.id);_&&T&&(y.source.id===l.id?(l.children.push(T),T.parent=l):y.target.id===l.id&&(l.children.push(_),_.parent=l))}const h=i.radialGap,s=i.radial?2*Math.PI:r.width,f=i.radial?h:r.height,b=tr();i.radial?b.size([s,f]):b.size([s,f]).separation((y,_)=>{var v,E;const T=((E=(v=y.parent)==null?void 0:v.children)==null?void 0:E.length)??1;return y.parent===_.parent?1.5/T:1.5});const m=an(l),p=b(m),A=new Map;return p.descendants().forEach(y=>{A.set(y.data.id,y)}),{root:p,nodes:p.descendants(),nodeById:A}}}function Qa(e){var n;const t=(n=e.getData())==null?void 0:n.label;return typeof t=="string"?t:""}const ee={d3Alpha:1,d3AlphaMin:.001,d3AlphaDecay:.05,d3AlphaTarget:0,d3VelocityDecay:.45,d3LinkDistance:40,d3LinkStrength:null,d3ManyBodyStrength:-150,d3ManyBodyTheta:.9,d3CollideRadius:12,d3CollideRadiusMultiplier:1.2,d3CollideStrength:1,d3CollideIterations:1,d3GravityStrength:.1,d3GravityStrengthConnected:.001,enabled:!0,cooldownTime:2e3,useWorker:!0,warmupTicks:"auto",freezeNodesOnDrag:!0,gridSnappingEnabled:!1,gridSize:50,fitViewOnExpandCollapse:!1,layout:{type:"force"},callbacks:{onInit:()=>{},onStart:()=>{},onStop:()=>{},onTick:()=>{}}},ft={repulsion:[0,100],linkDistance:[40,260],collisionRadius:[4,60],friction:[0,100]},Ja={tight:{repulsion:32,linkDistance:70,collisionRadius:16,friction:58},loose:{repulsion:70,linkDistance:150,collisionRadius:26,friction:28},default:{repulsion:70,linkDistance:150,collisionRadius:26,friction:28}},O=class O{constructor(t,n={}){x(this,"simulation");x(this,"graph");x(this,"canvas");x(this,"graphInteraction");x(this,"layout");x(this,"canvasBCR");x(this,"animationFrameId",null);x(this,"startSimulationTime",0);x(this,"engineRunning",!1);x(this,"slowTickThresholdReached",!1);x(this,"avgTickDuration",0);x(this,"SLOW_TICK_THRESHOLD",33);x(this,"dragInProgress",!1);x(this,"dragSelection",[]);x(this,"totalTickCount",0);x(this,"options");x(this,"callbacks");x(this,"simulationForces");x(this,"scaledForces",{d3ManyBodyStrength:ee.d3ManyBodyStrength,d3CollideStrength:ee.d3CollideStrength});x(this,"physicsKnobs");if(this.graph=t,this.options=sn({},ee,n),this.callbacks=this.options.callbacks??{},this.physicsKnobs=O.knobsFromOptions(this.options),this.canvas=this.graph.renderer.getCanvas(),!this.canvas)throw new Error("Canvas element is not defined in the graph renderer.");if(this.canvasBCR=this.canvas.getBoundingClientRect(),this.graphInteraction=this.graph.renderer.getGraphInteraction(),!this.graphInteraction)throw new Error("Graph interaction is not available.");const i=O.initSimulationForces(this.options,this.canvasBCR);this.simulation=i.simulation,this.simulationForces=i.simulationForces,this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength||ee.d3ManyBodyStrength,this.scaledForces.d3CollideStrength=this.options.d3CollideStrength||ee.d3CollideStrength,this.options.layout.type==="tree"?this.layout=new it(this.graph,this.simulation,this.simulationForces,this.options.layout):this.options.layout.type==="egoTree"&&(this.layout=new Oe(this.graph,this.simulation,this.simulationForces,this.options.layout)),this.callbacks.onInit&&this.callbacks.onInit(this)}static initSimulationForces(t,n){const i={link:Cr(),charge:Yr(),collide:Ir(),gravity:Kr()},r=$r().force("link",i.link).force("charge",i.charge).force("collide",i.collide).force("gravity",i.gravity);return this.initSimulationForceGravity(i.gravity,t,n),this.initSimulationForceLink(i.link,t),this.initSimulationForceCharge(i.charge,t),this.initSimulationForceCollide(i.collide,t),r.alphaMin(t.d3AlphaMin),r.alphaDecay(t.d3AlphaDecay),r.alphaTarget(0),r.velocityDecay(t.d3VelocityDecay),{simulation:r,simulationForces:i}}static initSimulationForceGravity(t,n,i){t.x(i.width/2).y(i.height/2).strength(r=>(r.degree()??0)===0?n.d3GravityStrength:n.d3GravityStrengthConnected)}static initSimulationForceLink(t,n){t.distance(i=>{const r=i.__clusterAnchorDistance;if(r!=null)return r;const o=Qa(i);if(!o||o==="")return n.d3LinkDistance;const a=o.length*10;return Math.max(n.d3LinkDistance,a)}),n.d3LinkStrength&&t.strength(n.d3LinkStrength)}static initSimulationForceCharge(t,n){t.theta(n.d3ManyBodyTheta).strength(i=>{const r=i,o=n.d3ManyBodyStrength,a=r.expanded?r.getCircleRadiusCollapsed():r.getCircleRadius(),l=10+Math.sqrt(Math.max(0,a-10));let h=r.weight??1;return h*=r.isParent?10:1,o*(l*l)/100*h})}static initSimulationForceCollide(t,n){const i=n.d3CollideRadiusMultiplier;t.radius(r=>{const o=r;return o.expanded?i*o.getCircleRadius()+20:o.getCircleRadius()?i*o.getCircleRadius():n.d3CollideRadius}).strength(n.d3CollideStrength)}static initSimulationForceClusterRadialConstraint(t,n){t.strength(n.d3CollideStrength)}update(){this.layout&&this.layout.update();const t=this.graph.getMutableNodes().filter(i=>i.visible);this.simulation.nodes(t);const n=this.simulation.force("link");n&&n.id(i=>i.id).links(this.getActiveEdges()),this.restart()}getActiveEdges(){const t=new Set(this.graph.getMutableNodes().filter(a=>a.visible).map(a=>a.id)),n=a=>{let l=a;for(;l&&!t.has(l.id);)l=l.parentNode;return l},i=(a,l)=>a<l?`${a}|${l}`:`${l}|${a}`,r=[],o=new Set;for(const a of this.graph.getMutableEdges()){if(!a.visible)continue;const l=a.source,h=a.target;if(!l.isChild&&!h.isChild){r.push(a),o.add(i(l.id,h.id));continue}if(l.isChild&&h.isChild)continue;const s=l.isChild?h:l,f=n(l.isChild?l:h);if(!f||f.id===s.id)continue;const b=i(s.id,f.id);o.has(b)||(o.add(b),r.push(this.clusterAnchorLink(s,f)))}return r}clusterAnchorLink(t,n){return{id:`cluster-anchor-${t.id}-${n.id}`,source:t,target:n,__clusterAnchorDistance:n.getCircleRadius()+this.options.d3LinkDistance}}scaleSimulationOptions(){const t=O.scaleSimulationOptions(this.options,this.canvasBCR,this.graph.getNodeCount());this.scaledForces.d3ManyBodyStrength=t.d3ManyBodyStrength??ee.d3ManyBodyStrength,this.scaledForces.d3CollideStrength=t.d3CollideStrength??ee.d3CollideStrength}static scaleSimulationOptions(t,n,i){const r=i/(n.width*n.height),o=Math.min(2,75e-6/r);return{d3ManyBodyStrength:t.d3ManyBodyStrength*o,d3CollideStrength:t.d3ManyBodyStrength*o}}applyScalledSimulationOptions(){O.initSimulationForceCharge(this.simulationForces.charge,this.options),O.initSimulationForceCollide(this.simulationForces.collide,this.options)}enable(){this.avgTickDuration=0,this.options.enabled=!0,this.start(!1)}disable(){this.options.enabled=!1,this.stop()}pause(){this.engineRunning=!1,this.slowTickThresholdReached=!1}restart(){this.startSimulationTime=new Date().getTime(),this.engineRunning=!0,this.slowTickThresholdReached=!1}async start(t=!0){if(t&&await this.runSimulationWorkerRouter(),!this.options.enabled){this.engineRunning=!1;return}this.engineRunning=!0,this.slowTickThresholdReached=!1,this.callbacks.onStart&&this.callbacks.onStart(this),this.animationFrameId===null&&this.startAnimationLoop()}stop(){this.engineRunning=!1,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.simulation.stop(),this.callbacks.onStop&&this.callbacks.onStop(this)}startAnimationLoop(){const t=()=>{this.animationFrameId=requestAnimationFrame(t),this.simulationTick()};this.engineRunning=!0,this.simulation.alpha(.01).restart(),this.animationFrameId=requestAnimationFrame(t)}simulationTick(){if(this.engineRunning){!this.dragInProgress&&(new Date().getTime()-this.startSimulationTime>this.options.cooldownTime||this.options.d3AlphaMin>0&&this.simulation.alpha()<this.options.d3AlphaMin)&&(this.engineRunning=!1,this.simulation.stop(),this.callbacks.onStop&&this.callbacks.onStop(this)),this.totalTickCount++;const t=performance.now();this.simulation.tick(),this.graph.nextTick(),this.updateTickMetrics(performance.now()-t),this.callbacks.onTick&&this.callbacks.onTick(this),this.graphInteraction.simulationTick(),this.totalTickCount%10===0&&this.graphInteraction.simulationSlowTick()}}updateTickMetrics(t){var n;this.avgTickDuration=this.avgTickDuration*.9+t*.1,this.avgTickDuration>this.SLOW_TICK_THRESHOLD&&(this.slowTickThresholdReached=!0,this.disable(),this.graph.UIManager.showNotification({level:"warning",title:"Physics engine running slow",message:"The physic has been disabled."}),(n=this.graph.UIManager.viewFlyout)==null||n.syncRunState())}async waitForSimulationStop(){if(this.engineRunning)return new Promise(t=>{const n=this.callbacks.onStop;this.callbacks.onStop=i=>{n==null||n(i),this.callbacks.onStop=n,t()}})}isEnabled(){return this.options.enabled}applyComputedPositions(t){const n=new Map(t.map(i=>[i.id,i]));for(const i of this.graph.getMutableNodes()){const r=n.get(i.id);r&&(i.x=r.x,i.y=r.y,i.fx=typeof r.fx=="number"?r.fx:void 0,i.fy=typeof r.fy=="number"?r.fy:void 0)}}async computeGraph(t={}){var f;const{runSimulation:n}=await Promise.resolve().then(function(){return el}),i=(f=this.canvas)==null?void 0:f.getBoundingClientRect();if(!i)return;const r=this.graph.getMutableNodes(),o=this.graph.getNodes(),a=this.graph.getEdges(),{callbacks:l,...h}=this.options;Object.assign(h,t);const{nodes:s}=n(o,a,h,i);this.applyComputedPositions(s),this.graph.updateData(r,void 0,!1)}async runSimulationWorkerRouter(t={}){if(this.options.useWorker)try{await this.runSimulationWorker(t);return}catch(n){this.options.useWorker=!1,console.warn("[Pivotick] Simulation Web Worker unavailable (often a CSP blocking blob workers); falling back to the main thread. Set `simulation.useWorker: false` to silence this.",n)}await this.computeGraph(t),this.graph.updateLayoutProgress(100,0,"done")}async runSimulationWorker(t={}){var f;const n=(f=this.canvas)==null?void 0:f.getBoundingClientRect();if(!n)return;const i=this.graph.getMutableNodes(),r=this.graph.getNodes().map(b=>b.toSimulationDTO()),o=this.graph.getEdges().map(b=>b.toSimulationDTO()),a=(b,m)=>{this.graph.updateLayoutProgress(b,m,"simulation")},{callbacks:l,...h}=this.options;Object.assign(h,t);const{nodes:s}=await Ta(r,o,h,n,a);this.graph.updateLayoutProgress(100,0,"rendering"),this.applyComputedPositions(s),this.graph.updateData(i,void 0,!1),this.graph.updateLayoutProgress(100,0,"done")}reheat(t=.7){this.restart(),this.simulation.alpha(t).restart()}refreshForcesAndReheat(t=.5){if(!this.options.enabled)return;const n=this.graph.getMutableNodes().filter(i=>i.visible);this.simulation.nodes(n),this.reheat(t)}setRepulsion(t){const n=O.clamp(t,ft.repulsion);this.physicsKnobs.repulsion=n,this.options.d3ManyBodyStrength=O.mapLinear(n,ft.repulsion,O.REPULSION_STRENGTH_RANGE),this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength,O.initSimulationForceCharge(this.simulationForces.charge,this.options),this.reheatIfEnabled()}setLinkDistance(t){const n=O.clamp(t,ft.linkDistance);this.physicsKnobs.linkDistance=n,this.options.d3LinkDistance=O.mapLinear(n,ft.linkDistance,O.LINK_DISTANCE_RANGE),O.initSimulationForceLink(this.simulationForces.link,this.options),this.reheatIfEnabled()}setCollisionRadius(t){const n=O.clamp(t,ft.collisionRadius);this.physicsKnobs.collisionRadius=n,this.options.d3CollideRadiusMultiplier=O.mapLinear(n,ft.collisionRadius,O.COLLIDE_MULTIPLIER_RANGE),O.initSimulationForceCollide(this.simulationForces.collide,this.options),this.reheatIfEnabled()}setFriction(t){const n=O.clamp(t,ft.friction);this.physicsKnobs.friction=n,this.options.d3VelocityDecay=O.mapLinear(n,ft.friction,O.FRICTION_DECAY_RANGE),this.simulation.velocityDecay(this.options.d3VelocityDecay)}applyPhysicsPreset(t){const n=Ja[t];this.physicsKnobs={...n},this.options.d3ManyBodyStrength=O.mapLinear(n.repulsion,ft.repulsion,O.REPULSION_STRENGTH_RANGE),this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength,this.options.d3LinkDistance=O.mapLinear(n.linkDistance,ft.linkDistance,O.LINK_DISTANCE_RANGE),this.options.d3CollideRadiusMultiplier=O.mapLinear(n.collisionRadius,ft.collisionRadius,O.COLLIDE_MULTIPLIER_RANGE),this.options.d3VelocityDecay=O.mapLinear(n.friction,ft.friction,O.FRICTION_DECAY_RANGE),O.initSimulationForceCharge(this.simulationForces.charge,this.options),O.initSimulationForceLink(this.simulationForces.link,this.options),O.initSimulationForceCollide(this.simulationForces.collide,this.options),this.simulation.velocityDecay(this.options.d3VelocityDecay),this.reheatIfEnabled()}getPhysicsKnobs(){return{...this.physicsKnobs}}getLayoutType(){return this.options.layout.type}reheatIfEnabled(t=.5){this.options.enabled&&this.reheat(t)}static clamp(t,[n,i]){return Math.max(n,Math.min(i,t))}static mapLinear(t,n,i){const r=(t-n[0])/(n[1]-n[0]);return i[0]+r*(i[1]-i[0])}static knobsFromOptions(t){const n=(i,r,o)=>Math.round(O.clamp(O.mapLinear(i,r,ft[o]),ft[o]));return{repulsion:n(t.d3ManyBodyStrength,O.REPULSION_STRENGTH_RANGE,"repulsion"),linkDistance:n(t.d3LinkDistance,O.LINK_DISTANCE_RANGE,"linkDistance"),collisionRadius:n(t.d3CollideRadiusMultiplier,O.COLLIDE_MULTIPLIER_RANGE,"collisionRadius"),friction:n(t.d3VelocityDecay,O.FRICTION_DECAY_RANGE,"friction")}}createDragBehavior(){return Us().filter(()=>!this.graph.editing.connectManager.isActiveAndNotIdle()).on("start.draggedelement",(t,n)=>{this.graphInteraction.hasActiveMultiselection()?this.dragSelection=this.graphInteraction.getSelectedNodes().map(i=>{const{node:r}=i;return r.freeze(),{node:r,dx:r.x-n.x,dy:r.y-n.y}}):(this.dragSelection=[],n.freeze())}).on("drag.draggedelement",(t,n)=>{if(!this.dragInProgress&&this.isEnabled()&&(this.dragInProgress=!0,this.restart(),this.simulation.alphaTarget(.3).restart()),this.graphInteraction.hasActiveMultiselection())this.dragSelection.forEach(({node:i,dx:r,dy:o})=>{const a=this.applySnap(t.x+r),l=this.applySnap(t.y+o);i.fx=a,i.fy=l,i.x=a,i.y=l});else{const i=this.applySnap(t.x),r=this.applySnap(t.y);n.fx=i,n.fy=r,n.x=i,n.y=r}if(this.graphInteraction.dragging(t.sourceEvent,t.subject),!this.engineRunning||!this.isEnabled()){const i=this.graphInteraction.hasActiveMultiselection()?this.dragSelection.map(r=>r.node):[n];this.graph.nextTickFor(i)}}).on("end.draggedelement",(t,n)=>{!t.active&&this.dragInProgress&&(this.dragInProgress=!1,this.restart(),this.simulation.alphaTarget(this.options.d3AlphaTarget).restart()),this.options.freezeNodesOnDrag||(this.graphInteraction.hasActiveMultiselection()?(this.dragSelection.forEach(({node:i})=>i.unfreeze()),this.dragSelection=[]):n.unfreeze()),this.graphInteraction.dragended(t.sourceEvent,t.subject)})}isDragging(){return this.dragInProgress}toggleGridSnapping(){this.options.gridSnappingEnabled=!this.options.gridSnappingEnabled}toggleFreezeNodesOnDrag(){this.options.freezeNodesOnDrag=!this.options.freezeNodesOnDrag}isFreezeNodesOnDrag(){return this.options.freezeNodesOnDrag}isGridSnappingEnabled(){return this.options.gridSnappingEnabled}toggleFitViewOnExpandCollapse(){this.options.fitViewOnExpandCollapse=!this.options.fitViewOnExpandCollapse}isFitViewOnExpandCollapse(){return this.options.fitViewOnExpandCollapse}applySnap(t){return this.options.gridSnappingEnabled?Math.round(t/this.options.gridSize)*this.options.gridSize:t}snapToGrid(t){return this.applySnap(t)}getForceSimulation(){return this.simulationForces}getSimulation(){return this.simulation}async changeLayout(t,n={}){var i;this.layout&&((i=this.layout)==null||i.unregisterLayout(),this.layout=void 0),n=n??{},n.layout=n.layout??{},n.layout.type=t,t==="force"?this.applyScalledSimulationOptions():t==="tree"&&(this.layout=new it(this.graph,this.simulation,this.simulationForces,n.layout)),this.options.layout.type=t,this.update(),this.pause(),await this.runSimulationWorkerRouter(n),this.restart(),await this.waitForSimulationStop(),this.graph.renderer.fitAndCenterWhenSettled()}};x(O,"REPULSION_STRENGTH_RANGE",[0,-400]),x(O,"LINK_DISTANCE_RANGE",[40,260]),x(O,"COLLIDE_MULTIPLIER_RANGE",[.6,2.4]),x(O,"FRICTION_DECAY_RANGE",[0,1]);let un=O;const nr=1e4,hn=2e4,fn=.15*hn;self.onmessage=e=>{var y,_,T,v;if(e.data.source!=="simulation-worker-wrapper")return;const{nodes:t,edges:n,options:i,canvasBCR:r}=e.data,o=t.map(E=>{const g=new Qi(E.id,E.data,E.style);return g.setCircleRadius(E._circleRadius??10),typeof E.x=="number"&&(g.x=E.x),typeof E.y=="number"&&(g.y=E.y),typeof E.fx=="number"&&(g.fx=E.fx),typeof E.fy=="number"&&(g.fy=E.fy),g}),a=new Map(o.map(E=>[E.id,E]));(y=i.layout)==null||y.type;const{simulation:l,simulationForces:h}=un.initSimulationForces(i,r),s=[];for(const E of n){const g=a.get(E.from.id),R=a.get(E.to.id);if(g&&R){const C=E.style??{};s.push(new rn(E.id,g,R,E.data,C,E.directed))}}l.nodes(o);const f=l.force("link");f&&f.id(E=>E.id).links(s),((_=i.layout)==null?void 0:_.type)==="tree"?it.registerForcesOnSimulation(o,s,l,h,i.layout,r,it):((T=i.layout)==null?void 0:T.type)==="egoTree"&&it.registerForcesOnSimulation(o,s,l,h,i.layout,r,Oe);let b=i.warmupTicks||hn;b=b==="auto"?hn:b,b=b-fn;let m=.3;l.alphaTarget(m);const p=new Date().getTime();let A;for(let E=0;E<b&&!(new Date().getTime()-p>nr||new Date().getTime()-p>i.cooldownTime||dn(i,l,m)&&new Date().getTime()-p>i.cooldownTime*.15);++E)E%5===0&&(A=ir(E,new Date().getTime()-p,i),postMessage({type:"tick",progress:A,elapsedTime:new Date().getTime()-p})),l.tick();m=0,l.alphaTarget(m),l.alpha(1);for(let E=0;E<fn&&!(dn(i,l,m)&&new Date().getTime()-p>i.cooldownTime*.15);++E)l.tick(),E%5===0&&(A=ir(b+E,new Date().getTime()-p,i),postMessage({type:"tick",progress:A,elapsedTime:new Date().getTime()-p}));postMessage({type:"tick",progress:1,elapsedTime:new Date().getTime()-p}),((v=i.layout)==null?void 0:v.type)==="tree"&&it.simulationDone(o,s,l,i.layout),postMessage({type:"done",nodes:o.map(E=>E.toDict()),edges:s.map(E=>E.toDict())})};function tl(e,t,n,i){var p,A,y,_;const r=e.map(T=>{const v=new Qi(T.id,T.getData(),T.getStyle());return v.weight=T.weight||1,v.setCircleRadius(T.getCircleRadius()),typeof T.x=="number"&&(v.x=T.x),typeof T.y=="number"&&(v.y=T.y),typeof T.fx=="number"&&(v.fx=T.fx),typeof T.fy=="number"&&(v.fy=T.fy),v}),o=new Map(r.map(T=>[T.id,T]));(p=n.layout)==null||p.type;const{simulation:a,simulationForces:l}=un.initSimulationForces(n,i),h=[];for(const T of t){const v=o.get(T.from.id),E=o.get(T.to.id);if(v&&E){const g=T.getStyle()??{};h.push(new rn(T.id,v,E,T.getData(),g,T.directed))}}a.nodes(r);const s=a.force("link");s&&s.id(T=>T.id).links(h),(((A=n.layout)==null?void 0:A.type)==="tree"||((y=n.layout)==null?void 0:y.type)==="egoTree")&&it.registerForcesOnSimulation(r,h,a,l,n.layout,i,it);let f;n.warmupTicks==="auto"||n.warmupTicks==null?f=hn:f=n.warmupTicks,f=f-fn;let b=.3;a.alphaTarget(b);const m=new Date().getTime();for(let T=0;T<f&&!(new Date().getTime()-m>nr||new Date().getTime()-m>n.cooldownTime||dn(n,a,b)&&new Date().getTime()-m>n.cooldownTime*.15);++T)a.tick();b=0,a.alphaTarget(b),a.alpha(1);for(let T=0;T<fn&&!(dn(n,a,b)&&new Date().getTime()-m>n.cooldownTime*.15);++T)a.tick();return((_=n.layout)==null?void 0:_.type)==="tree"&&it.simulationDone(r,h,a,n.layout),{nodes:r,edges:h}}function ir(e,t,n){return t/n.cooldownTime}function dn(e,t,n){return e.d3AlphaMin>0&&t.alpha()-n<e.d3AlphaMin}var el=Object.freeze({__proto__:null,runSimulation:tl})})();\n', bs = typeof self < "u" && self.Blob && new Blob([hr], { type: "text/javascript;charset=utf-8" });
function Xl(r) {
  let t;
  try {
    if (t = bs && (self.URL || self.webkitURL).createObjectURL(bs), !t) throw "";
    const e = new Worker(t, {
      name: r == null ? void 0 : r.name
    });
    return e.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(hr),
      {
        name: r == null ? void 0 : r.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
function Kl() {
  return new Xl();
}
const Zl = (r, t, e, n, i) => new Promise((s, o) => {
  const a = Kl();
  a.postMessage({ source: "simulation-worker-wrapper", nodes: r, edges: t, options: e, canvasBCR: n }), a.onmessage = (l) => {
    const { type: d, progress: c, nodes: u, edges: p, elapsedTime: g } = l.data;
    if (d === "tick" && typeof c == "number") {
      i == null || i(c, g);
      return;
    }
    d === "done" && (s({ nodes: u, edges: p }), a.terminate());
  }, a.onerror = o;
});
function Et(r, t) {
  const e = /* @__PURE__ */ new Map();
  for (const o of r)
    e.set(o.id, []);
  for (const { source: o, target: a } of t) {
    const l = e.get(o.id);
    l ? l.push(a.id) : e.set(o.id, [a.id]);
  }
  const n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = [];
  for (const o of r)
    if (!n.has(o.id))
      for (n.add(o.id), i.add(o.id), s.push({ id: o.id, next: 0 }); s.length > 0; ) {
        const a = s[s.length - 1], l = e.get(a.id) ?? [];
        if (a.next >= l.length) {
          i.delete(a.id), s.pop();
          continue;
        }
        const d = l[a.next++];
        if (i.has(d)) return !0;
        n.has(d) || (n.add(d), i.add(d), s.push({ id: d, next: 0 }));
      }
  return !1;
}
function ws(r, t) {
  const e = new Set(t.map((n) => n.target.id));
  for (const n of r)
    if (!e.has(n.id)) return n;
  return r[0];
}
const Ql = 1e6;
function Jl(r, t) {
  var a;
  const e = /* @__PURE__ */ new Map();
  for (const l of r)
    e.set(l.id, []);
  for (const l of t)
    (a = e.get(l.from.id)) == null || a.push(l.to);
  let n = 0, i = !1, s = null, o = -1;
  for (const l of r) {
    const d = /* @__PURE__ */ new Set([l.id]), c = [l];
    for (; c.length > 0 && !i; ) {
      const p = c.pop();
      for (const g of e.get(p.id) ?? []) {
        if (++n > Ql) {
          i = !0;
          break;
        }
        d.has(g.id) || (d.add(g.id), c.push(g));
      }
    }
    const u = d.size - 1;
    if (u > o && (o = u, s = l), i) break;
  }
  return i && console.warn("Pivotick: reachability search hit its traversal cap, using the best root found so far."), s ?? r[0];
}
function ec(r, t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const d of r)
    e.set(d.id, []), n.set(d.id, 0);
  for (const d of t)
    d.directed !== !1 && (e.get(d.from.id).push(d.to), n.set(d.to.id, (n.get(d.to.id) || 0) + 1));
  const i = [], s = r.filter((d) => n.get(d.id) === 0);
  for (; s.length; ) {
    const d = s.shift();
    i.push(d);
    for (const c of e.get(d.id))
      n.set(c.id, n.get(c.id) - 1), n.get(c.id) === 0 && s.push(c);
  }
  if (i.length !== r.length)
    return console.warn("Graph has a cycle! Min-max distance root undefined."), r[0];
  const o = /* @__PURE__ */ new Map();
  for (let d = i.length - 1; d >= 0; d--) {
    const c = i[d];
    let u = 0;
    for (const p of e.get(c.id))
      u = Math.max(u, 1 + (o.get(p.id) || 0));
    o.set(c.id, u);
  }
  let a = null, l = 1 / 0;
  for (const d of r) {
    const c = o.get(d.id);
    c < l && (l = c, a = d);
  }
  return a ?? r[0];
}
function tc(r, t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const d of r)
    e.set(d.id, []), n.set(d.id, 0);
  for (const d of t)
    d.directed !== !1 && (e.get(d.from.id).push(d.to), n.set(d.to.id, (n.get(d.to.id) || 0) + 1));
  const i = [], s = r.filter((d) => n.get(d.id) === 0);
  for (; s.length; ) {
    const d = s.shift();
    i.push(d);
    for (const c of e.get(d.id))
      n.set(c.id, n.get(c.id) - 1), n.get(c.id) === 0 && s.push(c);
  }
  if (i.length !== r.length)
    return console.warn("Graph has a cycle! Cannot minimize DAG height."), r[0];
  const o = /* @__PURE__ */ new Map();
  for (let d = i.length - 1; d >= 0; d--) {
    const c = i[d];
    let u = 0;
    for (const p of e.get(c.id))
      u = Math.max(u, 1 + (o.get(p.id) ?? 0));
    o.set(c.id, u);
  }
  let a = null, l = 1 / 0;
  for (const d of r) {
    const c = o.get(d.id);
    c < l && (l = c, a = d);
  }
  return a ?? r[0];
}
const Pn = {
  type: "tree",
  rootId: void 0,
  rootIdAlgorithmFinder: "MaxReachability",
  strength: 0.25,
  radial: !1,
  radialGap: 750,
  horizontal: !1,
  flipEdgeDirection: !1
};
class me {
  constructor(t, e, n, i = {}) {
    h(this, "graph");
    h(this, "simulation");
    h(this, "simulationForces");
    h(this, "options");
    h(this, "originalForceStrength");
    h(this, "canvasBCR");
    h(this, "levels");
    h(this, "positionedNodesByID");
    this.graph = t, this.simulation = e, this.simulationForces = n, this.options = rt({}, Pn, i), this.originalForceStrength = {
      link: this.simulationForces.link.strength(),
      charge: this.simulationForces.charge.strength(),
      gravity: this.simulationForces.gravity.strength()
    }, this.positionedNodesByID = /* @__PURE__ */ new Map(), this.levels = /* @__PURE__ */ new Map();
    const s = this.graph.getNodes(), o = this.options.flipEdgeDirection ? this.flipEdgeDirection(this.graph.getEdges()) : this.graph.getEdges();
    if (Et(s, o)) {
      this.graph.notifier.warning("Tree layout unavailable", "The graph contains a cycle, so it cannot be displayed as a tree.");
      return;
    }
    this.setSizes(), this.update(), this.registerForces();
  }
  update() {
    const t = this.graph.getNodes(), e = this.options.flipEdgeDirection ? this.flipEdgeDirection(this.graph.getEdges()) : this.graph.getEdges(), { levels: n } = this.buildLevels(t, e, void 0, this.options.rootIdAlgorithmFinder), { nodes: i, nodeById: s } = this.buildTree(t, e, this.options, this.canvasBCR);
    this.positionedNodesByID = s, this.levels = n, i && this.setNodePositions(i, this.options);
  }
  flipEdgeDirection(t) {
    return t.forEach((e) => {
      const n = e.from;
      e.setFrom(e.to), e.setTo(n);
    }), t;
  }
  setSizes() {
    const t = this.graph.renderer.getCanvas();
    if (!t)
      throw new Error("Canvas element is not defined in the graph renderer.");
    this.canvasBCR = t.getBoundingClientRect();
  }
  setNodePositions(t, e) {
    for (const n of t) {
      const i = this.graph.getMutableNode(n.data.id);
      if (i)
        if (e.radial) {
          const s = n.x ?? 0, o = n.y ?? 0;
          i.x = o * Math.cos(s - Math.PI / 2), i.y = o * Math.sin(s - Math.PI / 2), i.fx = i.x, i.fy = i.y;
        } else e.horizontal ? (i.x = n.y, i.fx = n.y, i.y = n.x, delete i.fy) : (i.x = n.x, i.y = n.y, i.fy = n.y, delete i.fx);
    }
  }
  unsetNodePositions() {
    this.graph.getMutableNodes().forEach((t) => {
      delete t.fy, delete t.fx;
    });
  }
  registerForces() {
    const t = this.options.strength ?? 0.1;
    if (this.options.radial) {
      const e = Wi(
        (n) => (this.levels.get(n.id) ?? 1) * 100,
        0,
        0
      ).strength(t);
      this.simulation.force("tree-radial", e);
    } else
      this.simulation.force("tree-y", Vi((e) => {
        var n, i;
        return this.options.horizontal ? ((n = this.positionedNodesByID.get(e.id)) == null ? void 0 : n.x) ?? 0 : ((i = this.positionedNodesByID.get(e.id)) == null ? void 0 : i.y) ?? 0;
      }).strength(t)), this.simulation.force("tree-x", Yi((e) => {
        var n, i;
        return this.options.horizontal ? ((n = this.positionedNodesByID.get(e.id)) == null ? void 0 : n.y) ?? 0 : ((i = this.positionedNodesByID.get(e.id)) == null ? void 0 : i.x) ?? 0;
      }).strength(t));
    me.adjustOtherSimulationForces(this.simulationForces, this.options);
  }
  unregisterLayout() {
    this.unregisterForces(), this.unsetNodePositions();
  }
  unregisterForces() {
    this.simulation.force("tree-radial", null), this.simulation.force("tree-y", null), this.simulation.force("tree-x", null), me.resetOtherSimulationForces(this.simulationForces, this.originalForceStrength);
  }
  static registerForcesOnSimulation(t, e, n, i, s, o, a = this) {
    const l = rt({}, Pn, s), d = l.strength ?? 0.1, c = o.width, u = o.height, p = [c / 2, u / 2];
    if (Et(t, e))
      return;
    const { levels: g } = a.buildLevelsStatic(t, e, void 0, l.rootIdAlgorithmFinder), { nodeById: f } = a.buildTreeStatic(t, e, l, o);
    if (l.radial) {
      const v = Wi(
        (y) => (g.get(y.id) ?? 1) * 100,
        p[0],
        p[1]
      ).strength(d);
      n.force("tree-radial", v);
    } else
      n.force("tree-y", Vi((v) => {
        var y, b;
        return l.horizontal ? ((y = f.get(v.id)) == null ? void 0 : y.x) ?? 0 : ((b = f.get(v.id)) == null ? void 0 : b.y) ?? 0;
      }).strength(d)), n.force("tree-x", Yi((v) => {
        var y, b;
        return l.horizontal ? ((y = f.get(v.id)) == null ? void 0 : y.y) ?? 0 : ((b = f.get(v.id)) == null ? void 0 : b.x) ?? 0;
      }).strength(d));
    a.adjustOtherSimulationForces(i, l);
  }
  static adjustOtherSimulationForces(t, e) {
    e != null && e.radial ? (t.link.strength(0), t.charge.strength(0), t.gravity.strength(0)) : (t.link.strength(0), t.charge.strength(0), t.gravity.strength(1e-5));
  }
  static resetOtherSimulationForces(t, e) {
    t.link.strength(e.link), t.charge.strength(e.charge), t.gravity.strength(e.gravity);
  }
  static simulationDone(t, e, n, i) {
    const s = rt({}, Pn, i);
    for (const o of t)
      s.radial ? (o.fx = o.x, o.fy = o.y) : s.horizontal ? (o.fx = o.x, delete o.fy) : (o.fy = o.y, delete o.fx);
  }
  buildTree(t, e, n, i) {
    return me.buildTreeStatic(t, e, n, i);
  }
  static buildTreeStatic(t, e, n, i) {
    if (!t.length)
      return {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    if (Et(t, e))
      return console.warn("Cycle detected in graph. Tree layout will not be computed."), {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    const s = /* @__PURE__ */ new Map();
    for (const v of t) {
      const y = v;
      y.children = [], s.set(v.id, y);
    }
    for (const v of e) {
      const y = s.get(v.source.id), b = s.get(v.target.id);
      y && b && (y.children.push(b), b.parent = y);
    }
    const o = n.rootId || me.findRootId(t, e, n.rootIdAlgorithmFinder), a = s.get(o);
    if (!a)
      throw new Error(`Root node with id "${o}" not found.`);
    const l = n.radialGap, d = n.radial ? 2 * Math.PI : i.width, c = n.radial ? l : i.height, u = Is();
    n.radial ? u.size([d, c]) : u.size([d, c]).separation((v, y) => {
      var k, C;
      const b = ((C = (k = v.parent) == null ? void 0 : k.children) == null ? void 0 : C.length) ?? 1;
      return v.parent === y.parent ? 1.5 / b : 1.5;
    });
    const p = Ls(a), g = u(p), f = /* @__PURE__ */ new Map();
    return g.descendants().forEach((v) => {
      f.set(v.data.id, v);
    }), {
      root: g,
      nodes: g.descendants(),
      nodeById: f
    };
  }
  buildLevels(t, e, n, i) {
    return me.buildLevelsStatic(t, e, n, i);
  }
  /**
   * Builds a mapping from node ID to its level (distance from the root),
   * by traversing the graph in BFS manner. If the graph contains cycles,
   * each node is assigned the shortest level found first.
   *
   * @param nodes - The list of graph nodes.
   * @param edges - The list of graph edges (assumed to be directed).
   * @param passedRootId - The ID of the node considered as the root.
   * @param rootIdAlgorithmFinder - The algorithm to use to find the root ID.
   * @returns A mapping of each node's ID to its depth level in the tree and the maximum depth
   */
  static buildLevelsStatic(t, e, n, i) {
    var p;
    if (!t.length)
      return {
        levels: /* @__PURE__ */ new Map(),
        maxDepth: 0,
        nodeCountPerLevel: {}
      };
    const s = n || me.findRootId(t, e, i), o = /* @__PURE__ */ new Map([[s, 0]]), a = /* @__PURE__ */ new Map();
    for (const g of t)
      a.set(g.id, []);
    for (const { source: g, target: f } of e)
      (p = a.get(g.id)) == null || p.push(f.id);
    const l = [s];
    let d = 0;
    for (; d < l.length; ) {
      const g = l[d++], f = o.get(g) ?? 0;
      for (const v of a.get(g) ?? [])
        o.has(v) || (o.set(v, f + 1), l.push(v));
    }
    let c = 0;
    const u = {};
    for (const g of o.values())
      g > c && (c = g), u[g] = (u[g] || 0) + 1;
    return {
      levels: o,
      maxDepth: c,
      nodeCountPerLevel: u
    };
  }
  /**
   * Attempts to infer the root node of a directed graph.
   *
   * This function looks for a node that is never a target in the list of links,
   * assuming such a node is a likely root (i.e., has no incoming edges).
   * If no such node is found, it falls back to the first node in the list.
   *
   * @param nodes - The list of graph nodes.
   * @param edges - The list of graph edges (assumed to be directed).
   * @returns The ID of the inferred root node.
   */
  static findRootId(t, e, n) {
    switch (n) {
      case "FirstZeroInDegree":
        return ws(t, e).id;
      case "MaxReachability":
        return Jl(t, e).id;
      case "MinMaxDistance":
        return ec(t, e).id;
      case "MinHeight":
        return tc(t, e).id;
      default:
        return ws(t, e).id;
    }
  }
}
class nn extends me {
  constructor(t, e, n, i) {
    super(t, e, n, {
      ...i,
      type: "tree"
    });
  }
  static registerForcesOnSimulation(t, e, n, i, s, o) {
    me.registerForcesOnSimulation(
      t,
      e,
      n,
      i,
      s,
      o,
      nn
    );
  }
  buildTree(t, e, n, i) {
    return nn.buildTreeStatic(t, e, n, i);
  }
  static buildTreeStatic(t, e, n, i) {
    if (!t.length)
      return {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    if (Et(t, e))
      return console.warn("Cycle detected in graph. Tree layout will not be computed."), {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    const s = /* @__PURE__ */ new Map();
    for (const v of t) {
      const y = v;
      y.children = [], s.set(v.id, y);
    }
    if (!n.rootId || !s.get(n.rootId))
      throw new Error("Ego Tree can only be created with a rootId");
    const o = n.rootId, a = s.get(o);
    if (a.children = [], !a)
      throw new Error(`Root node with id "${o}" not found.`);
    for (const v of e) {
      const y = s.get(v.source.id), b = s.get(v.target.id);
      y && b && (v.source.id === a.id ? (a.children.push(b), b.parent = a) : v.target.id === a.id && (a.children.push(y), y.parent = a));
    }
    const l = n.radialGap, d = n.radial ? 2 * Math.PI : i.width, c = n.radial ? l : i.height, u = Is();
    n.radial ? u.size([d, c]) : u.size([d, c]).separation((v, y) => {
      var k, C;
      const b = ((C = (k = v.parent) == null ? void 0 : k.children) == null ? void 0 : C.length) ?? 1;
      return v.parent === y.parent ? 1.5 / b : 1.5;
    });
    const p = Ls(a), g = u(p), f = /* @__PURE__ */ new Map();
    return g.descendants().forEach((v) => {
      f.set(v.data.id, v);
    }), {
      root: g,
      nodes: g.descendants(),
      nodeById: f
    };
  }
}
const Fe = {
  d3Alpha: 1,
  d3AlphaMin: 1e-3,
  d3AlphaDecay: 0.05,
  d3AlphaTarget: 0,
  d3VelocityDecay: 0.45,
  d3LinkDistance: 40,
  d3LinkStrength: null,
  d3ManyBodyStrength: -150,
  d3ManyBodyTheta: 0.9,
  d3CollideRadius: 12,
  d3CollideRadiusMultiplier: 1.2,
  d3CollideStrength: 1,
  d3CollideIterations: 1,
  d3GravityStrength: 0.1,
  d3GravityStrengthConnected: 1e-3,
  enabled: !0,
  cooldownTime: 2e3,
  useWorker: !0,
  warmupTicks: "auto",
  freezeNodesOnDrag: !0,
  gridSnappingEnabled: !1,
  gridSize: 50,
  fitViewOnExpandCollapse: !1,
  layout: {
    type: "force"
  },
  callbacks: {
    onInit: () => {
    },
    onStart: () => {
    },
    onStop: () => {
    },
    onTick: () => {
    }
  }
}, ne = {
  repulsion: [0, 100],
  linkDistance: [40, 260],
  collisionRadius: [4, 60],
  friction: [0, 100]
}, nc = {
  tight: { repulsion: 32, linkDistance: 70, collisionRadius: 16, friction: 58 },
  loose: { repulsion: 70, linkDistance: 150, collisionRadius: 26, friction: 28 },
  default: { repulsion: 70, linkDistance: 150, collisionRadius: 26, friction: 28 }
}, M = class M {
  // friction 0..100 → velocityDecay
  constructor(t, e = {}) {
    h(this, "simulation");
    h(this, "graph");
    h(this, "canvas");
    h(this, "graphInteraction");
    h(this, "layout");
    h(this, "canvasBCR");
    h(this, "animationFrameId", null);
    h(this, "startSimulationTime", 0);
    h(this, "engineRunning", !1);
    h(this, "slowTickThresholdReached", !1);
    h(this, "avgTickDuration", 0);
    h(this, "SLOW_TICK_THRESHOLD", 33);
    // ms of tick compute+render (≈30fps budget)
    h(this, "dragInProgress", !1);
    h(this, "dragSelection", []);
    h(this, "totalTickCount", 0);
    h(this, "options");
    h(this, "callbacks");
    h(this, "simulationForces");
    h(this, "scaledForces", {
      d3ManyBodyStrength: Fe.d3ManyBodyStrength,
      d3CollideStrength: Fe.d3CollideStrength
    });
    /** Current abstract physics-knob values (what the View flyout renders). */
    h(this, "physicsKnobs");
    if (this.graph = t, this.options = rt({}, Fe, e), this.callbacks = this.options.callbacks ?? {}, this.physicsKnobs = M.knobsFromOptions(this.options), this.canvas = this.graph.renderer.getCanvas(), !this.canvas) throw new Error("Canvas element is not defined in the graph renderer.");
    if (this.canvasBCR = this.canvas.getBoundingClientRect(), this.graphInteraction = this.graph.renderer.getGraphInteraction(), !this.graphInteraction) throw new Error("Graph interaction is not available.");
    const n = M.initSimulationForces(this.options, this.canvasBCR);
    this.simulation = n.simulation, this.simulationForces = n.simulationForces, this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength || Fe.d3ManyBodyStrength, this.scaledForces.d3CollideStrength = this.options.d3CollideStrength || Fe.d3CollideStrength, this.options.layout.type === "tree" ? this.layout = new me(
      this.graph,
      this.simulation,
      this.simulationForces,
      this.options.layout
    ) : this.options.layout.type === "egoTree" && (this.layout = new nn(
      this.graph,
      this.simulation,
      this.simulationForces,
      this.options.layout
    )), this.callbacks.onInit && this.callbacks.onInit(this);
  }
  /** @private */
  static initSimulationForces(t, e) {
    const n = {
      link: Fr(),
      charge: Pr(),
      collide: Or(),
      gravity: Yl()
      // clusterRadialConstraint: ForceClusterRadial(),
    }, i = Br().force("link", n.link).force("charge", n.charge).force("collide", n.collide).force("gravity", n.gravity);
    return this.initSimulationForceGravity(n.gravity, t, e), this.initSimulationForceLink(n.link, t), this.initSimulationForceCharge(n.charge, t), this.initSimulationForceCollide(n.collide, t), i.alphaMin(t.d3AlphaMin), i.alphaDecay(t.d3AlphaDecay), i.alphaTarget(0), i.velocityDecay(t.d3VelocityDecay), {
      simulation: i,
      simulationForces: n
    };
  }
  static initSimulationForceGravity(t, e, n) {
    t.x(n.width / 2).y(n.height / 2).strength((i) => (i.degree() ?? 0) === 0 ? e.d3GravityStrength : e.d3GravityStrengthConnected);
  }
  static initSimulationForceLink(t, e) {
    t.distance((n) => {
      const i = n.__clusterAnchorDistance;
      if (i != null) return i;
      const s = Xs(n);
      if (!s || s === "")
        return e.d3LinkDistance;
      const o = s.length * 10;
      return Math.max(e.d3LinkDistance, o);
    }), e.d3LinkStrength && t.strength(e.d3LinkStrength);
  }
  static initSimulationForceCharge(t, e) {
    t.theta(e.d3ManyBodyTheta).strength((n) => {
      const i = n, s = e.d3ManyBodyStrength, o = i.expanded ? i.getCircleRadiusCollapsed() : i.getCircleRadius(), a = 10 + Math.sqrt(Math.max(0, o - 10));
      let l = i.weight ?? 1;
      return l *= i.isParent ? 10 : 1, s * (a * a) / 100 * l;
    });
  }
  static initSimulationForceCollide(t, e) {
    const n = e.d3CollideRadiusMultiplier;
    t.radius((i) => {
      const s = i;
      return s.expanded ? n * s.getCircleRadius() + 20 : s.getCircleRadius() ? n * s.getCircleRadius() : e.d3CollideRadius;
    }).strength(e.d3CollideStrength);
  }
  static initSimulationForceClusterRadialConstraint(t, e) {
    t.strength(e.d3CollideStrength);
  }
  update() {
    this.layout && this.layout.update();
    const t = this.graph.getMutableNodes().filter((n) => n.visible);
    this.simulation.nodes(t);
    const e = this.simulation.force("link");
    e && e.id((n) => n.id).links(this.getActiveEdges()), this.restart();
  }
  /** @private */
  getActiveEdges() {
    const t = new Set(
      this.graph.getMutableNodes().filter((o) => o.visible).map((o) => o.id)
    ), e = (o) => {
      let a = o;
      for (; a && !t.has(a.id); ) a = a.parentNode;
      return a;
    }, n = (o, a) => o < a ? `${o}|${a}` : `${a}|${o}`, i = [], s = /* @__PURE__ */ new Set();
    for (const o of this.graph.getMutableEdges()) {
      if (!o.visible) continue;
      const a = o.source, l = o.target;
      if (!a.isChild && !l.isChild) {
        i.push(o), s.add(n(a.id, l.id));
        continue;
      }
      if (a.isChild && l.isChild) continue;
      const d = a.isChild ? l : a, c = e(a.isChild ? a : l);
      if (!c || c.id === d.id) continue;
      const u = n(d.id, c.id);
      s.has(u) || (s.add(u), i.push(this.clusterAnchorLink(d, c)));
    }
    return i;
  }
  /**
   * A force-only link tying an external node to an expanded cluster it connects
   * into. Not a real Edge — never rendered, never registered on the nodes — just
   * the `{source, target, distance}` the link force needs. Its distance is the
   * cluster radius (plus the base link distance) so the node rests outside the bubble.
   * @private
   */
  clusterAnchorLink(t, e) {
    return {
      id: `cluster-anchor-${t.id}-${e.id}`,
      source: t,
      target: e,
      __clusterAnchorDistance: e.getCircleRadius() + this.options.d3LinkDistance
    };
  }
  /** @private */
  scaleSimulationOptions() {
    const t = M.scaleSimulationOptions(this.options, this.canvasBCR, this.graph.getNodeCount());
    this.scaledForces.d3ManyBodyStrength = t.d3ManyBodyStrength ?? Fe.d3ManyBodyStrength, this.scaledForces.d3CollideStrength = t.d3CollideStrength ?? Fe.d3CollideStrength;
  }
  /** @private */
  static scaleSimulationOptions(t, e, n) {
    const i = n / (e.width * e.height), s = Math.min(2, 75e-6 / i);
    return {
      d3ManyBodyStrength: t.d3ManyBodyStrength * s,
      d3CollideStrength: t.d3ManyBodyStrength * s
    };
  }
  /** @private */
  applyScalledSimulationOptions() {
    M.initSimulationForceCharge(this.simulationForces.charge, this.options), M.initSimulationForceCollide(this.simulationForces.collide, this.options);
  }
  enable() {
    this.avgTickDuration = 0, this.options.enabled = !0, this.start(!1);
  }
  disable() {
    this.options.enabled = !1, this.stop();
  }
  /**
   * Pause the simulation
   */
  pause() {
    this.engineRunning = !1, this.slowTickThresholdReached = !1;
  }
  /**
   * Restart the simulation with rendering on each animation frame.
   */
  restart() {
    this.startSimulationTime = (/* @__PURE__ */ new Date()).getTime(), this.engineRunning = !0, this.slowTickThresholdReached = !1;
  }
  /**
   * Start the simulation with rendering on each animation frame.
   */
  async start(t = !0) {
    if (t && await this.runSimulationWorkerRouter(), !this.options.enabled) {
      this.engineRunning = !1;
      return;
    }
    this.engineRunning = !0, this.slowTickThresholdReached = !1, this.callbacks.onStart && this.callbacks.onStart(this), this.animationFrameId === null && this.startAnimationLoop();
  }
  /**
   * Manually stop the simulation and cancel animation frame.
   */
  stop() {
    this.engineRunning = !1, this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.simulation.stop(), this.callbacks.onStop && this.callbacks.onStop(this);
  }
  /**
   * Start the simulation loop with rendering on each animation frame.
   */
  startAnimationLoop() {
    const t = () => {
      this.animationFrameId = requestAnimationFrame(t), this.simulationTick();
    };
    this.engineRunning = !0, this.simulation.alpha(0.01).restart(), this.animationFrameId = requestAnimationFrame(t);
  }
  /**
   * Evaluate at each tick to update the simulation state and request rendering
   */
  simulationTick() {
    if (this.engineRunning) {
      !this.dragInProgress && ((/* @__PURE__ */ new Date()).getTime() - this.startSimulationTime > this.options.cooldownTime || this.options.d3AlphaMin > 0 && this.simulation.alpha() < this.options.d3AlphaMin) && (this.engineRunning = !1, this.simulation.stop(), this.callbacks.onStop && this.callbacks.onStop(this)), this.totalTickCount++;
      const t = performance.now();
      this.simulation.tick(), this.graph.nextTick(), this.updateTickMetrics(performance.now() - t), this.callbacks.onTick && this.callbacks.onTick(this), this.graphInteraction.simulationTick(), this.totalTickCount % 10 === 0 && this.graphInteraction.simulationSlowTick();
    }
  }
  updateTickMetrics(t) {
    var e;
    this.avgTickDuration = this.avgTickDuration * 0.9 + t * 0.1, this.avgTickDuration > this.SLOW_TICK_THRESHOLD && (this.slowTickThresholdReached = !0, this.disable(), this.graph.UIManager.showNotification({
      level: "warning",
      title: "Physics engine running slow",
      message: "The physic has been disabled."
    }), (e = this.graph.UIManager.viewFlyout) == null || e.syncRunState());
  }
  /**
   * Returns a promise that resolves when the simulation stops naturally.
   * Useful for performing actions (like fitAndCenter) after stabilization.
   */
  async waitForSimulationStop() {
    if (this.engineRunning)
      return new Promise((t) => {
        const e = this.callbacks.onStop;
        this.callbacks.onStop = (n) => {
          e == null || e(n), this.callbacks.onStop = e, t();
        };
      });
  }
  isEnabled() {
    return this.options.enabled;
  }
  // Match computed positions to live nodes by id: the layout is handed a
  // different (and differently ordered) node set than the full node map, so
  // they can't be aligned by array index.
  applyComputedPositions(t) {
    const e = new Map(t.map((n) => [n.id, n]));
    for (const n of this.graph.getMutableNodes()) {
      const i = e.get(n.id);
      i && (n.x = i.x, n.y = i.y, n.fx = typeof i.fx == "number" ? i.fx : void 0, n.fy = typeof i.fy == "number" ? i.fy : void 0);
    }
  }
  async computeGraph(t = {}) {
    var c;
    const { runSimulation: e } = await import("./SimulationWorker-B46OdSE7.js"), n = (c = this.canvas) == null ? void 0 : c.getBoundingClientRect();
    if (!n) return;
    const i = this.graph.getMutableNodes(), s = this.graph.getNodes(), o = this.graph.getEdges(), { callbacks: a, ...l } = this.options;
    Object.assign(l, t);
    const { nodes: d } = e(
      s,
      o,
      l,
      n
    );
    this.applyComputedPositions(d), this.graph.updateData(i, void 0, !1);
  }
  async runSimulationWorkerRouter(t = {}) {
    if (this.options.useWorker)
      try {
        await this.runSimulationWorker(t);
        return;
      } catch (e) {
        this.options.useWorker = !1, console.warn(
          "[Pivotick] Simulation Web Worker unavailable (often a CSP blocking blob workers); falling back to the main thread. Set `simulation.useWorker: false` to silence this.",
          e
        );
      }
    await this.computeGraph(t), this.graph.updateLayoutProgress(100, 0, "done");
  }
  async runSimulationWorker(t = {}) {
    var c;
    const e = (c = this.canvas) == null ? void 0 : c.getBoundingClientRect();
    if (!e) return;
    const n = this.graph.getMutableNodes(), i = this.graph.getNodes().map((u) => u.toSimulationDTO()), s = this.graph.getEdges().map((u) => u.toSimulationDTO()), o = (u, p) => {
      this.graph.updateLayoutProgress(u, p, "simulation");
    }, { callbacks: a, ...l } = this.options;
    Object.assign(l, t);
    const { nodes: d } = await Zl(
      i,
      s,
      l,
      e,
      o
    );
    this.graph.updateLayoutProgress(100, 0, "rendering"), this.applyComputedPositions(d), this.graph.updateData(n, void 0, !1), this.graph.updateLayoutProgress(100, 0, "done");
  }
  /**
   * Restart the simulation with a bit of heat
   */
  reheat(t = 0.7) {
    this.restart(), this.simulation.alpha(t).restart();
  }
  /**
   * Re-read the node-dependent force accessors and reheat.
   *
   * d3-force caches per-node radius/strength when a force is initialised (i.e.
   * when nodes are set), not on every tick — so mutating a node's radius after
   * the sim is running has no effect until the forces are re-initialised.
   * Re-setting the nodes does that; the reheat then lets collision/charge
   * re-lay-out with the new sizes. Used when a custom node measures its size
   * after the initial layout has already cooled. No-op when disabled.
   */
  refreshForcesAndReheat(t = 0.5) {
    if (!this.options.enabled) return;
    const e = this.graph.getMutableNodes().filter((n) => n.visible);
    this.simulation.nodes(e), this.reheat(t);
  }
  // ─── Physics knobs (View flyout) ────────────────────────────────────────────
  // Each setter takes an abstract knob value (range in PHYSICS_KNOB_RANGES), maps
  // it onto a d3-force domain, re-initialises the affected force so d3 re-reads its
  // cached per-node array, then reheats. Reheat is skipped while physics is disabled;
  // the value is still stored so it takes effect once physics is re-enabled.
  /** Push-apart strength. Knob 0–100 → d3ManyBodyStrength. */
  setRepulsion(t) {
    const e = M.clamp(t, ne.repulsion);
    this.physicsKnobs.repulsion = e, this.options.d3ManyBodyStrength = M.mapLinear(e, ne.repulsion, M.REPULSION_STRENGTH_RANGE), this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength, M.initSimulationForceCharge(this.simulationForces.charge, this.options), this.reheatIfEnabled();
  }
  /** Preferred edge length. Knob 40–260 (px) → d3LinkDistance. */
  setLinkDistance(t) {
    const e = M.clamp(t, ne.linkDistance);
    this.physicsKnobs.linkDistance = e, this.options.d3LinkDistance = M.mapLinear(e, ne.linkDistance, M.LINK_DISTANCE_RANGE), M.initSimulationForceLink(this.simulationForces.link, this.options), this.reheatIfEnabled();
  }
  /** Node spacing. Knob 4–60 → d3CollideRadiusMultiplier (scales each node's collision radius). */
  setCollisionRadius(t) {
    const e = M.clamp(t, ne.collisionRadius);
    this.physicsKnobs.collisionRadius = e, this.options.d3CollideRadiusMultiplier = M.mapLinear(e, ne.collisionRadius, M.COLLIDE_MULTIPLIER_RANGE), M.initSimulationForceCollide(this.simulationForces.collide, this.options), this.reheatIfEnabled();
  }
  /** Motion damping. Knob 0–100 → d3VelocityDecay (÷100). Applied live each tick — no reheat. */
  setFriction(t) {
    const e = M.clamp(t, ne.friction);
    this.physicsKnobs.friction = e, this.options.d3VelocityDecay = M.mapLinear(e, ne.friction, M.FRICTION_DECAY_RANGE), this.simulation.velocityDecay(this.options.d3VelocityDecay);
  }
  /** Apply a named preset ({@link PHYSICS_PRESETS}): sets all four knobs and reheats once. */
  applyPhysicsPreset(t) {
    const e = nc[t];
    this.physicsKnobs = { ...e }, this.options.d3ManyBodyStrength = M.mapLinear(e.repulsion, ne.repulsion, M.REPULSION_STRENGTH_RANGE), this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength, this.options.d3LinkDistance = M.mapLinear(e.linkDistance, ne.linkDistance, M.LINK_DISTANCE_RANGE), this.options.d3CollideRadiusMultiplier = M.mapLinear(e.collisionRadius, ne.collisionRadius, M.COLLIDE_MULTIPLIER_RANGE), this.options.d3VelocityDecay = M.mapLinear(e.friction, ne.friction, M.FRICTION_DECAY_RANGE), M.initSimulationForceCharge(this.simulationForces.charge, this.options), M.initSimulationForceLink(this.simulationForces.link, this.options), M.initSimulationForceCollide(this.simulationForces.collide, this.options), this.simulation.velocityDecay(this.options.d3VelocityDecay), this.reheatIfEnabled();
  }
  /** Current knob values, for seeding the View-flyout sliders. */
  getPhysicsKnobs() {
    return { ...this.physicsKnobs };
  }
  /** The active layout type — the View flyout greys out physics under non-`force` layouts. */
  getLayoutType() {
    return this.options.layout.type;
  }
  reheatIfEnabled(t = 0.5) {
    this.options.enabled && this.reheat(t);
  }
  static clamp(t, [e, n]) {
    return Math.max(e, Math.min(n, t));
  }
  static mapLinear(t, e, n) {
    const i = (t - e[0]) / (e[1] - e[0]);
    return n[0] + i * (n[1] - n[0]);
  }
  /** Recover the abstract knob values from a set of d3-force options (inverse of the setters). */
  static knobsFromOptions(t) {
    const e = (n, i, s) => Math.round(M.clamp(M.mapLinear(n, i, ne[s]), ne[s]));
    return {
      repulsion: e(t.d3ManyBodyStrength, M.REPULSION_STRENGTH_RANGE, "repulsion"),
      linkDistance: e(t.d3LinkDistance, M.LINK_DISTANCE_RANGE, "linkDistance"),
      collisionRadius: e(t.d3CollideRadiusMultiplier, M.COLLIDE_MULTIPLIER_RANGE, "collisionRadius"),
      friction: e(t.d3VelocityDecay, M.FRICTION_DECAY_RANGE, "friction")
    };
  }
  /**
   * @private
   */
  createDragBehavior() {
    return zr().filter(() => !this.graph.editing.connectManager.isActiveAndNotIdle()).on("start.draggedelement", (t, e) => {
      this.graphInteraction.hasActiveMultiselection() ? this.dragSelection = this.graphInteraction.getSelectedNodes().map((n) => {
        const { node: i } = n;
        return i.freeze(), {
          node: i,
          dx: i.x - e.x,
          dy: i.y - e.y
        };
      }) : (this.dragSelection = [], e.freeze());
    }).on("drag.draggedelement", (t, e) => {
      if (!this.dragInProgress && this.isEnabled() && (this.dragInProgress = !0, this.restart(), this.simulation.alphaTarget(0.3).restart()), this.graphInteraction.hasActiveMultiselection())
        this.dragSelection.forEach(({ node: n, dx: i, dy: s }) => {
          const o = this.applySnap(t.x + i), a = this.applySnap(t.y + s);
          n.fx = o, n.fy = a, n.x = o, n.y = a;
        });
      else {
        const n = this.applySnap(t.x), i = this.applySnap(t.y);
        e.fx = n, e.fy = i, e.x = n, e.y = i;
      }
      if (this.graphInteraction.dragging(t.sourceEvent, t.subject), !this.engineRunning || !this.isEnabled()) {
        const n = this.graphInteraction.hasActiveMultiselection() ? this.dragSelection.map((i) => i.node) : [e];
        this.graph.nextTickFor(n);
      }
    }).on("end.draggedelement", (t, e) => {
      !t.active && this.dragInProgress && (this.dragInProgress = !1, this.restart(), this.simulation.alphaTarget(this.options.d3AlphaTarget).restart()), this.options.freezeNodesOnDrag || (this.graphInteraction.hasActiveMultiselection() ? (this.dragSelection.forEach(({ node: n }) => n.unfreeze()), this.dragSelection = []) : e.unfreeze()), this.graphInteraction.dragended(t.sourceEvent, t.subject);
    });
  }
  isDragging() {
    return this.dragInProgress;
  }
  toggleGridSnapping() {
    this.options.gridSnappingEnabled = !this.options.gridSnappingEnabled;
  }
  toggleFreezeNodesOnDrag() {
    this.options.freezeNodesOnDrag = !this.options.freezeNodesOnDrag;
  }
  isFreezeNodesOnDrag() {
    return this.options.freezeNodesOnDrag;
  }
  isGridSnappingEnabled() {
    return this.options.gridSnappingEnabled;
  }
  toggleFitViewOnExpandCollapse() {
    this.options.fitViewOnExpandCollapse = !this.options.fitViewOnExpandCollapse;
  }
  isFitViewOnExpandCollapse() {
    return this.options.fitViewOnExpandCollapse;
  }
  applySnap(t) {
    return this.options.gridSnappingEnabled ? Math.round(t / this.options.gridSize) * this.options.gridSize : t;
  }
  /**
   * Snap a graph-space coordinate to the grid when grid-snapping is enabled
   * (a no-op otherwise). Public so non-simulation draggables (e.g. notes) can
   * snap on the same grid as nodes.
   */
  snapToGrid(t) {
    return this.applySnap(t);
  }
  getForceSimulation() {
    return this.simulationForces;
  }
  getSimulation() {
    return this.simulation;
  }
  /**
   * Allows to change the layout of the graph
   * 
   * @example
   * ```ts
   * changeLayout('tree', {
   *     layout: {
   *          horizontal: false,
   *          rootIdAlgorithmFinder: 'FirstZeroInDegree'
   *     }
   * })
   * ```
   */
  async changeLayout(t, e = {}) {
    var n;
    this.layout && ((n = this.layout) == null || n.unregisterLayout(), this.layout = void 0), e = e ?? {}, e.layout = e.layout ?? {}, e.layout.type = t, t === "force" ? this.applyScalledSimulationOptions() : t === "tree" && (this.layout = new me(this.graph, this.simulation, this.simulationForces, e.layout)), this.options.layout.type = t, this.update(), this.pause(), await this.runSimulationWorkerRouter(e), this.restart(), await this.waitForSimulationStop(), this.graph.renderer.fitAndCenterWhenSettled();
  }
};
// d3-force domains each knob maps onto; the knob's own range is in PHYSICS_KNOB_RANGES.
h(M, "REPULSION_STRENGTH_RANGE", [0, -400]), // repulsion 0..100 (more negative = stronger)
h(M, "LINK_DISTANCE_RANGE", [40, 260]), // linkDistance 40..260 (identity, px)
h(M, "COLLIDE_MULTIPLIER_RANGE", [0.6, 2.4]), // collisionRadius 4..60
h(M, "FRICTION_DECAY_RANGE", [0, 1]);
let Qn = M;
class ic extends X {
  constructor(e) {
    super(e);
    h(this, "navigation");
    h(this, "handleFullscreenChange", () => {
      var n;
      const e = (n = this.navigation) == null ? void 0 : n.querySelector(
        "#pvt-graphnavigation-fullscreen"
      );
      e && this.updateFullscreenIcon(e);
    });
  }
  onMount(e) {
    if (!e) return;
    const n = document.createElement("template");
    n.innerHTML = `
  <div class="pvt-graphnavigation-elements">
    <button id="pvt-graphnavigation-reset" class="pvt-graphnavigation-button" title="Fit and center">
        ${Us}
    </button>
    <button id="pvt-graphnavigation-zoom-in" class="pvt-graphnavigation-button" title="Zoom In">
        ${Oo}
    </button>
    <button id="pvt-graphnavigation-zoom-out" class="pvt-graphnavigation-button" title="Zoom Out">
        ${Po}
    </button>
    <button id="pvt-graphnavigation-fullscreen" class="pvt-graphnavigation-button pvt-graphnavigation-fullscreen-button" title="Toggle Fullscreen" aria-pressed="false">
        <span>${Hs}</span>
        <span style="display: none">${Do}</span>
    </button>
  </div>
`, this.navigation = n.content.firstElementChild, e.appendChild(this.navigation);
  }
  onDestroy() {
    var e;
    (e = this.navigation) == null || e.remove(), this.navigation = void 0, document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
  }
  onAfterMount() {
    if (!this.navigation) return;
    const e = this.navigation.querySelector("#pvt-graphnavigation-zoom-in"), n = this.navigation.querySelector("#pvt-graphnavigation-zoom-out"), i = this.navigation.querySelector("#pvt-graphnavigation-reset"), s = this.navigation.querySelector("#pvt-graphnavigation-fullscreen");
    e == null || e.addEventListener("click", () => {
      this.uiManager.graph.renderer.zoomIn();
    }), n == null || n.addEventListener("click", () => {
      this.uiManager.graph.renderer.zoomOut();
    }), i == null || i.addEventListener("click", () => {
      this.uiManager.graph.renderer.fitAndCenter();
    }), s == null || s.addEventListener("click", () => {
      this.uiManager.toggleFullscreen();
    }), s && this.updateFullscreenIcon(s), document.addEventListener("fullscreenchange", this.handleFullscreenChange), s && this.updateFullscreenIcon(s);
  }
  updateFullscreenIcon(e) {
    const n = e.querySelectorAll("span"), i = n[0], s = n[1], o = this.uiManager.isFullscreenOn();
    i.style.display = o ? "none" : "", s.style.display = o ? "" : "none", e.setAttribute("aria-pressed", String(o));
  }
}
class sc extends X {
  constructor() {
    super(...arguments);
    h(this, "layout");
    h(this, "canvas");
    h(this, "sidebar");
    h(this, "mainheader");
    h(this, "notification");
    h(this, "modal");
    h(this, "slidePanel");
    h(this, "graphnavigation");
    /** B3 mode rail + contextual tool panel + View flyout slots. */
    h(this, "moderail");
    h(this, "toolpanel");
    h(this, "viewflyout");
  }
  onMount(e) {
    if (!e) return;
    const n = this.uiManager.getOptions().mode ?? "full";
    this.layout = document.createElement("div"), this.layout.className = `pvt-layout mode-${n}`, this.canvas = document.createElement("div"), this.canvas.className = "pvt-canvas", this.layout.appendChild(this.canvas), this.notification = document.createElement("div"), this.notification.className = "pvt-notification", this.canvas.appendChild(this.notification), n === "full" && (this.sidebar = document.createElement("div"), this.sidebar.className = "pvt-sidebar", this.layout.appendChild(this.sidebar)), (n === "light" || n === "full") && (this.mainheader = document.createElement("div"), this.mainheader.className = "pvt-mainheader", this.layout.appendChild(this.mainheader), this.modal = document.createElement("div"), this.modal.className = "pvt-modalcontainer", e.appendChild(this.modal), this.slidePanel = document.createElement("div"), this.slidePanel.className = "pvt-slidepanel-container", this.canvas.appendChild(this.slidePanel)), n !== "static" && (this.graphnavigation = document.createElement("div"), this.graphnavigation.className = "pvt-graphnavigation", this.canvas.appendChild(this.graphnavigation)), (n === "full" || n === "light") && (this.moderail = document.createElement("div"), this.moderail.className = "pvt-moderail", this.canvas.appendChild(this.moderail), this.toolpanel = document.createElement("div"), this.toolpanel.className = "pvt-toolpanel", this.canvas.appendChild(this.toolpanel), this.viewflyout = document.createElement("div"), this.viewflyout.className = "pvt-viewflyout", this.canvas.appendChild(this.viewflyout)), e.appendChild(this.layout);
  }
  onDestroy() {
    var e, n;
    (e = this.layout) == null || e.remove(), this.layout = void 0, (n = this.modal) == null || n.remove(), this.modal = void 0;
  }
}
const rc = 64;
function dr(r) {
  return typeof r == "string" ? `<span class="json-string">"${Nt(r)}"</span>` : typeof r == "number" ? `<span class="json-number">${r}</span>` : typeof r == "boolean" ? `<span class="json-boolean">${r}</span>` : '<span class="json-null">null</span>';
}
function oc(r) {
  const t = document.createElement("div");
  return t.className = "pvt-json-viewer__line-number", t.textContent = String(r), t;
}
function Fn(r, t, e = 0) {
  const n = document.createElement("div");
  n.className = "pvt-json-viewer__line", n.appendChild(oc(t));
  const i = document.createElement("div");
  return i.className = "pvt-json-viewer__line-content", i.style.paddingLeft = `${12 + e * 18}px`, i.appendChild(r), n.appendChild(i), n;
}
function ur(r, t, e, n = 0, i, s = !0, o = /* @__PURE__ */ new WeakSet()) {
  const a = document.createElement("div");
  a.className = "pvt-json-viewer__node", a.style.setProperty("--json-depth", String(n));
  const l = s ? "" : ",", d = r === null || typeof r == "string" || typeof r == "number" || typeof r == "boolean", c = d ? null : o.has(r) ? '<span class="json-null">[Circular]</span>' : n >= rc ? '<span class="json-null">[…]</span>' : null;
  if (d || c) {
    const k = document.createElement("div");
    i !== void 0 && (k.innerHTML += `
                <span class="json-key">"${Nt(i)}"</span>:
            `), k.innerHTML += (c ?? dr(r)) + l, a.appendChild(Fn(k, e.value++, n)), t.appendChild(a);
    return;
  }
  const u = Array.isArray(r), p = u ? r.map((k, C) => [String(C), k]) : Object.entries(r), g = document.createElement("details");
  g.className = "pvt-json-viewer__details", g.open = !0;
  const f = document.createElement("div");
  i !== void 0 && (f.innerHTML += `
            <span class="json-key">"${Nt(i)}"</span>: 
        `), f.innerHTML += `
        <span class="json-bracket">${u ? "[" : "{"}</span>
        <span class="pvt-json-viewer__meta">
            ${p.length} ${u ? "items" : "properties"}
        </span>
    `;
  const v = document.createElement("summary");
  v.className = "pvt-json-viewer__summary", v.appendChild(
    Fn(f, e.value++, n)
  ), g.appendChild(v);
  const y = document.createElement("div");
  y.className = "pvt-json-viewer__children", o.add(r), p.forEach(([k, C], T) => {
    ur(
      C,
      y,
      e,
      n + 1,
      u ? void 0 : k,
      T === p.length - 1,
      o
    );
  }), o.delete(r), g.appendChild(y);
  const b = document.createElement("div");
  b.innerHTML = `
        <span class="json-bracket">${u ? "]" : "}"}</span>${l}
    `, g.appendChild(
    Fn(b, e.value++, n)
  ), a.appendChild(g), t.appendChild(a);
}
function ac(r) {
  try {
    return JSON.stringify(r, null, 2);
  } catch {
    const t = /* @__PURE__ */ new WeakSet();
    return JSON.stringify(r, (e, n) => {
      if (n !== null && typeof n == "object") {
        if (t.has(n)) return "[Circular]";
        t.add(n);
      }
      return n;
    }, 2);
  }
}
function lc(r) {
  const t = document.createElement("div");
  t.className = "pvt-json-viewer";
  const e = document.createElement("div");
  e.className = "pvt-json-viewer__toolbar";
  const n = P({
    text: "Copy JSON",
    variant: "secondary",
    size: "sm",
    onClick: async () => {
      try {
        await navigator.clipboard.writeText(ac(r));
      } catch {
        return;
      }
      const s = n.textContent;
      n.textContent = "Copied!", setTimeout(() => {
        n.textContent = s;
      }, 1200);
    }
  });
  e.appendChild(n);
  const i = document.createElement("div");
  return i.className = "pvt-json-viewer__body", ur(r, i, { value: 1 }), t.appendChild(e), t.appendChild(i), t;
}
const cc = /* @__PURE__ */ new Set(["url", "uri", "href", "link", "website", "homepage"]), pr = /^(https?:|mailto:|ftp:|tel:)/i;
function hc(r, t) {
  var e;
  return typeof r == "string" ? r : ((e = Ee(r, t)) == null ? void 0 : e.textContent) ?? "";
}
function dc(r, t) {
  return zs(t, Mo) ? pr.test(t) ? !0 : cc.has(r.toLowerCase()) && t.length > 0 : !1;
}
const uc = 12;
function gr(r, t, e = /* @__PURE__ */ new WeakSet()) {
  if (r === null || typeof r != "object") return dr(r);
  if (e.has(r)) return '<span class="json-null">[Circular]</span>';
  if (t >= uc) return '<span class="json-null">[…]</span>';
  const n = Array.isArray(r), i = n ? "[" : "{", s = n ? "]" : "}", o = n ? r.map((c, u) => [String(u), c]) : Object.entries(r);
  if (o.length === 0) return `<span class="json-bracket">${i}${s}</span>`;
  e.add(r);
  const a = "  ".repeat(t + 1), l = "  ".repeat(t), d = o.map(([c, u], p) => {
    const g = p < o.length - 1 ? '<span class="json-bracket">,</span>' : "", f = n ? "" : `<span class="json-key">"${Nt(c)}"</span><span class="json-bracket">: </span>`;
    return `${a}${f}${gr(u, t + 1, e)}${g}`;
  });
  return e.delete(r), `<span class="json-bracket">${i}</span>
${d.join(`
`)}
${l}<span class="json-bracket">${s}</span>`;
}
function pc(r) {
  if (Array.isArray(r))
    return `[ ] ${r.length} ${r.length === 1 ? "item" : "items"}`;
  const t = Object.keys(r).length;
  return `{ } ${t} ${t === 1 ? "key" : "keys"}`;
}
function ki(r) {
  const t = x("span", { class: "pvt-prop-copy", title: "Copy", role: "button", tabindex: "0", "data-copy-text": r }, [
    B({ svgIcon: cs })
  ]), e = async () => {
    try {
      await navigator.clipboard.writeText(r);
    } catch {
      return;
    }
    t.classList.add("pvt-prop-copy--done"), t.replaceChildren(B({ svgIcon: Ws })), window.setTimeout(() => {
      t.classList.remove("pvt-prop-copy--done"), t.replaceChildren(B({ svgIcon: cs }));
    }, 1200);
  };
  return t.addEventListener("click", e), t.addEventListener("keydown", (n) => {
    (n.key === "Enter" || n.key === " ") && (n.preventDefault(), e());
  }), t;
}
function gc(r) {
  const t = pr.test(r);
  return x(
    "a",
    {
      class: "pvt-prop-value pvt-prop-value--link",
      href: r,
      title: r,
      ...t ? { target: "_blank", rel: "noopener noreferrer" } : {}
    },
    [
      x("span", { class: "pvt-prop-link-text" }, [r]),
      B({ svgIcon: Ko })
    ]
  );
}
function fc(r, t) {
  return x("div", { class: `pvt-prop-value pvt-prop-value--text${t ? " pvt-prop-value--mono" : ""}` }, [r]);
}
function mc(r, t) {
  const e = hc(r.name, t);
  let n = r.value;
  typeof n == "function" && (n = n(t));
  const i = x("div", { class: "pvt-prop" }, [
    x("span", { class: "pvt-prop-key", title: e }, [e])
  ]);
  if (n instanceof HTMLElement)
    return n.classList.add("pvt-prop-value"), i.appendChild(n), i;
  if (n !== null && typeof n == "object") {
    i.appendChild(x("span", { class: "pvt-prop-affordance pvt-prop-badge" }, [pc(n)]));
    const a = x("div", { class: "pvt-prop-value pvt-prop-value--json" }, [
      x("pre", { class: "pvt-prop-json" }, [])
    ]);
    return a.firstElementChild.innerHTML = gr(n, 0), i.appendChild(a), i;
  }
  const s = String(n);
  if (typeof n == "string" && dc(e, n))
    return i.appendChild(gc(n)), i;
  const o = ki(s);
  return o.classList.add("pvt-prop-affordance"), i.appendChild(o), i.appendChild(fc(s, e.toLowerCase() === "id")), i;
}
function Mt(r, t, { label: e = "PROPERTIES", layout: n = "stacked" } = {}) {
  const i = x("div", {
    class: n === "columns" ? "pvt-node-props pvt-node-props--columns" : "pvt-node-props"
  }), s = x("div", { class: "pvt-node-props-header" }, [
    x("span", { class: "pvt-node-props-label" }, [
      x("span", { class: "pvt-node-props-label-dot" }, ["."]),
      x("span", { class: "pvt-node-props-label-name" }, [e])
    ]),
    x("span", { class: "pvt-node-props-count" }, [
      `${r.length} ${r.length === 1 ? "field" : "fields"}`
    ])
  ]);
  i.appendChild(s);
  for (const o of r)
    i.appendChild(mc(o, t));
  return i;
}
const vc = 16, yc = 12, bc = 1.3, wc = 2, xc = "pvt-mainheader-nodeinfo-name";
let bt = null;
function xs(r, t) {
  return bt || (bt = document.createElement("canvas").getContext("2d")), bt ? (bt.font = t, bt.measureText(r).width) : r.length * 8;
}
function kc(r) {
  const t = getComputedStyle(r);
  return `${t.fontWeight} ${t.fontSize} ${t.fontFamily}`;
}
function Sc(r) {
  return !/\s/.test(r.trim());
}
function Cc(r, t, e) {
  if (t <= 0 || xs(r, e) <= t) return r;
  const n = "…", i = Array.from(r);
  let s = 1, o = i.length - 1, a = n;
  for (; s <= o; ) {
    const l = s + o >> 1, d = Math.ceil(l / 2), c = Math.floor(l / 2), u = i.slice(0, d).join("") + n + i.slice(i.length - c).join("");
    xs(u, e) <= t ? (a = u, s = l + 1) : o = l - 1;
  }
  return a;
}
function Ec(r, t, e) {
  if (r.className = xc, r.style.fontSize = "", r.removeAttribute("title"), r.textContent = e, t == null || t.replaceChildren(), !(r.clientWidth <= 0)) {
    for (let i = vc; i >= yc; i--)
      if (r.style.fontSize = `${i}px`, r.scrollHeight <= Math.ceil(i * bc * wc) + 1) return;
    r.style.fontSize = "", r.title = e, Sc(e) ? (r.classList.add("is-identifier"), t == null || t.appendChild(ki(e)), r.textContent = Cc(e, r.clientWidth, kc(r))) : r.classList.add("is-clamp");
  }
}
class Jn {
  constructor(t) {
    h(this, "slot");
    h(this, "fit");
    h(this, "lastWidth", -1);
    h(this, "observer");
    this.slot = t, typeof ResizeObserver < "u" && (this.observer = new ResizeObserver(() => this.refit()), this.observer.observe(t));
  }
  /** Render `text` into `nameElem` and fit it to the slot's current width. */
  render(t, e, n) {
    t.dataset.titleText = n, this.fit = () => Ec(t, e, n), this.lastWidth = -1, requestAnimationFrame(() => this.refit());
  }
  /** Forget the current title (e.g. the header switched to a count overview). */
  clear() {
    this.fit = void 0, this.lastWidth = -1;
  }
  destroy() {
    var t;
    (t = this.observer) == null || t.disconnect(), this.observer = void 0, this.fit = void 0;
  }
  refit() {
    if (!this.fit) return;
    const t = this.slot.clientWidth;
    t !== this.lastWidth && (this.lastWidth = t, this.fit());
  }
}
class Tc extends X {
  constructor(e) {
    super(e);
    h(this, "panel");
    h(this, "renderCb");
    // Re-fits the current title whenever the sidebar width changes.
    h(this, "titleFit");
    this.renderCb = typeof this.uiManager.getOptions().mainHeader.render == "function" ? this.uiManager.getOptions().mainHeader.render : void 0;
  }
  onMount(e) {
    e && (this.panel = e, this.titleFit = new Jn(this.panel), this.track(() => {
      var n;
      return (n = this.titleFit) == null ? void 0 : n.destroy();
    }));
  }
  onDestroy() {
    var e;
    (e = this.panel) == null || e.remove(), this.panel = void 0;
  }
  onAfterMount() {
    this.clearOverview();
  }
  onGraphReady() {
    this.clearOverview();
  }
  renderCustomContent(e) {
    var i;
    if (!this.panel || !this.renderCb) return;
    this.panel.innerHTML = "";
    const n = Ee(this.renderCb, e);
    n && ((i = this.panel) == null || i.appendChild(n));
  }
  clearOverview() {
    var e;
    if (this.panel) {
      if ((e = this.titleFit) == null || e.clear(), this.renderCb) {
        this.renderCustomContent(null);
        return;
      }
      this.panel.innerHTML = "", this.showTotalNodeCount();
    }
  }
  /* Single selection */
  updateNodeOverview(e, n) {
    if (!this.panel) return;
    if (this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
    this.panel.innerHTML = "";
    const i = 42, o = V(`
<div class="enter-ready">
    <div class="pvt-mainheader-nodepreview"></div>
    <div class="pvt-mainheader-nodeinfo">
        <div class="pvt-mainheader-nodeinfo-name"></div>
        <div class="pvt-mainheader-nodeinfo-subtitle"></div>
    </div>
    <div class="pvt-mainheader-nodeinfo-action">
    </div>
</div>`), a = o.querySelector(".pvt-mainheader-nodepreview"), l = o.querySelector(".pvt-mainheader-nodeinfo-name"), d = o.querySelector(".pvt-mainheader-nodeinfo-subtitle"), c = o.querySelector(".pvt-mainheader-nodeinfo-action");
    if (a == null || a.appendChild($e(n instanceof SVGGElement ? n : e, { size: i })), l && this.renderTitle(
      l,
      c,
      se(e, this.uiManager.getOptions().mainHeader)
    ), d) {
      const u = hi(e, this.uiManager.getOptions().mainHeader);
      d.textContent = u ?? "";
    }
    this.panel.appendChild(o), requestAnimationFrame(() => {
      var u, p;
      (p = (u = this.panel) == null ? void 0 : u.firstElementChild) == null || p.classList.add("enter-active");
    });
  }
  updateEdgeOverview(e) {
    if (!this.panel) return;
    if (this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
    this.panel.innerHTML = "";
    const i = `<div class="enter-ready">
<div class="pvt-mainheader-nodepreview">
    ${ze(42)}
</div>
<div class="pvt-mainheader-nodeinfo">
    <div class="pvt-mainheader-nodeinfo-name"></div>
    <div class="pvt-mainheader-nodeinfo-subtitle"></div>
</div>
<div class="pvt-mainheader-nodeinfo-action">
</div>
</div>`, s = V(i), o = s.querySelector(".pvt-mainheader-nodeinfo-name"), a = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), l = s.querySelector(".pvt-mainheader-nodeinfo-action");
    o && this.renderTitle(
      o,
      l,
      St(e, this.uiManager.getOptions().mainHeader)
    ), a && (a.textContent = Ys(e, this.uiManager.getOptions().mainHeader)), this.panel.appendChild(s), requestAnimationFrame(() => {
      var d, c;
      (c = (d = this.panel) == null ? void 0 : d.firstElementChild) == null || c.classList.add("enter-active");
    });
  }
  /* Multi selection */
  updateNodesOverview(e) {
    var d;
    if (!this.panel) return;
    if ((d = this.titleFit) == null || d.clear(), this.renderCb) {
      this.renderCustomContent(e.map((c) => c.node));
      return;
    }
    this.panel.innerHTML = "";
    const n = 42, i = `<div class="enter-ready">
    <div class="pvt-mainheader-nodepreview">
        <svg class="pvt-node-preview-icon" width="${n}" height="${n}" viewBox="0 0 ${n} ${n}" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
    <div class="pvt-mainheader-nodeinfo">
        <div class="pvt-mainheader-nodeinfo-name"></div>
        <div class="pvt-mainheader-nodeinfo-subtitle"></div>
    </div>
    <div class="pvt-mainheader-nodeinfo-action">
    </div>
</div>`, s = V(i), o = s.querySelector(".pvt-node-preview-icon"), a = s.querySelector(".pvt-mainheader-nodeinfo-name"), l = s.querySelector(".pvt-mainheader-nodeinfo-subtitle");
    if (o) {
      const c = js(n), u = V(c);
      o.appendChild(u);
    }
    a && (a.textContent = `${e.length} nodes selected`), l && (l.textContent = `Out of ${this.uiManager.graph.getNodeCount()} total`), this.panel.appendChild(s), requestAnimationFrame(() => {
      var c, u;
      (u = (c = this.panel) == null ? void 0 : c.firstElementChild) == null || u.classList.add("enter-active");
    });
  }
  updateEdgesOverview(e) {
    var l;
    if (!this.panel) return;
    if ((l = this.titleFit) == null || l.clear(), this.renderCb) {
      this.renderCustomContent(e.map((d) => d.edge));
      return;
    }
    this.panel.innerHTML = "";
    const i = `<div class="enter-ready">
<div class="pvt-mainheader-nodepreview">
    ${ze(42)}
</div>
<div class="pvt-mainheader-nodeinfo">
    <div class="pvt-mainheader-nodeinfo-name"></div>
    <div class="pvt-mainheader-nodeinfo-subtitle"></div>
</div>
<div class="pvt-mainheader-nodeinfo-action">
</div>
</div>`, s = V(i), o = s.querySelector(".pvt-mainheader-nodeinfo-name"), a = s.querySelector(".pvt-mainheader-nodeinfo-subtitle");
    o && (o.textContent = `${e.length} edges selected`), a && (a.textContent = `Out of ${this.uiManager.graph.getEdgeCount()} total`), this.panel.appendChild(s), requestAnimationFrame(() => {
      var d, c;
      (c = (d = this.panel) == null ? void 0 : d.firstElementChild) == null || c.classList.add("enter-active");
    });
  }
  /* Title rendering */
  /**
   * Render a (possibly long) entity title into the header name slot.
   *
   * Strategy: first try to **auto-fit** — shrink the font from 16px down to
   * 12px so the whole title fits across up to two lines. If it still doesn't
   * fit at the floor size, fall back to a **type-aware** treatment: prose
   * titles get a clean two-line clamp with an ellipsis; identifier-like titles
   * (ids, URLs, hashes) get a monospace, middle-elided form (`abc…xyz`, both
   * ends kept) plus a copy button, since middle-elision replaces the text.
   */
  renderTitle(e, n, i) {
    var s;
    (s = this.titleFit) == null || s.render(e, n, i);
  }
  /* Private methods */
  showTotalNodeCount() {
    if (!this.panel) return;
    const e = this.uiManager.graph.getMutableVisibleNodes().length, n = this.uiManager.graph.getMutableVisibleEdges().length;
    this.panel.textContent = `Showing ${e} nodes and ${n} edges`;
  }
}
const ks = "4dfd89de5d25fc9cc4b66c23d84b443af631c7dc", Nc = 6, Bn = 16, Ss = 10, zn = [210, 45, 280, 350, 165, 130, 25, 300, 190, 90, 60, 320];
function Mc(r) {
  const t = zn[r % zn.length], e = Math.floor(r / zn.length), n = Math.max(38, 58 - e * 9);
  return `hsl(${t} 62% ${n}%)`;
}
function Ac(r) {
  if (r.size <= 1) return "shared";
  for (const t of r.values())
    if (t > 1) return "values";
  return "unique";
}
const fr = "Click to keep only · Alt-click to exclude";
function mr(r, t, e, n) {
  r.classList.add("pvt-facet-filterable"), r.addEventListener("click", (i) => {
    const s = i.altKey || i.ctrlKey || i.metaKey ? "exclude" : "keep";
    n(t, e, s);
  });
}
function ei(r, t, e, n) {
  const i = Pc(r, !1), s = x("div", { class: "pvt-facets" });
  for (const [o, a] of i)
    s.appendChild(
      _c(o, a, t, e, n)
    );
  return s;
}
function _c(r, t, e, n, i) {
  const s = Ac(t), o = t.size;
  let a;
  s === "unique" ? a = `${o} unique` : s === "values" ? a = `${o} values` : a = (t.values().next().value ?? 0) === e ? "shared" : "1 value";
  const l = x("div", { class: "pvt-facet-header" }, [
    x("div", { class: "pvt-facet-label" }, [
      x("span", { class: "pvt-facet-label-dot" }, ["."]),
      x("span", { class: "pvt-facet-label-name" }, [r])
    ]),
    x("span", { class: ["pvt-facet-badge", `pvt-facet-badge--${s}`] }, [a])
  ]), d = s === "unique" ? Rc(r, t, i) : Ic(r, t, e, s, n, i);
  return x("div", { class: "pvt-facet-card" }, [l, d]);
}
function Ic(r, t, e, n, i, s) {
  const o = Array.from(t.entries()), a = o.slice(0, Ss), l = o.slice(Ss), d = l.reduce((p, [, g]) => p + g, 0), c = x("div", { class: "pvt-facet-bar" });
  if (a.forEach(([p, g], f) => {
    const v = e > 0 ? g / e * 100 : 0, y = x("div", { class: "pvt-facet-bar-seg" });
    y.style.width = `${v}%`, y.style.background = vr(p, f, n), y.title = `${sn(p)} — ${g} (${Math.round(v)}%)`, s && !un(p) && (y.title += `
${fr}`, mr(y, r, p, s)), c.appendChild(y);
  }), l.length > 0) {
    const p = e > 0 ? d / e * 100 : 0, g = x("div", { class: "pvt-facet-bar-seg pvt-facet-bar-seg--other" });
    g.style.width = `${p}%`, g.style.background = "var(--pvt-text-color-3)", g.title = `${l.length} other values — ${d} (${Math.round(p)}%)`, c.appendChild(g);
  }
  const u = x("div", { class: "pvt-facet-rows" });
  if (a.forEach(([p, g], f) => {
    const v = e > 0 ? Math.round(g / e * 100) : 0;
    u.appendChild(
      Lc(r, p, g, v, f, e, n, i)
    );
  }), l.length > 0) {
    const p = e > 0 ? Math.round(d / e * 100) : 0;
    u.appendChild(Dc(l.length, d, p));
  }
  return x("div", { class: "pvt-facet-body" }, [c, u]);
}
function Lc(r, t, e, n, i, s, o, a) {
  const l = x("span", { class: "pvt-facet-dot" });
  l.style.background = vr(t, i, o);
  const d = un(t), c = x("span", {
    class: ["pvt-facet-value", d ? "pvt-facet-value--empty" : "code-container"]
  }, [d ? "— empty —" : sn(t)]), u = [l, c];
  if (o === "shared") {
    const g = e === s ? `all ${e} nodes` : `${e} of ${s}`;
    u.push(x("span", { class: "pvt-facet-caption" }, [g]));
  } else
    u.push(x("span", { class: "pvt-facet-count" }, [String(e)]));
  u.push(x("span", { class: "pvt-facet-percent" }, [`${n}%`]));
  const p = x("div", { class: "pvt-facet-row" }, u);
  return o === "values" && !d && a && p.appendChild(a(r, t)), p;
}
function Dc(r, t, e) {
  const n = x("span", { class: "pvt-facet-dot" });
  return n.style.background = "var(--pvt-text-color-3)", x("div", { class: "pvt-facet-row pvt-facet-row--more" }, [
    n,
    x("span", { class: "pvt-facet-value" }, [`+${r} more values`]),
    x("span", { class: "pvt-facet-count" }, [String(t)]),
    x("span", { class: "pvt-facet-percent" }, [`${e}%`])
  ]);
}
function Rc(r, t, e) {
  const n = x("div", { class: "pvt-facet-caption pvt-facet-caption--block" }, [
    "no repeated values"
  ]), i = x("div", { class: "pvt-facet-chips" }), s = Array.from(t.keys());
  return s.slice(0, Bn).forEach((o) => {
    const a = un(o), l = x("span", {
      class: ["pvt-facet-chip", a ? "pvt-facet-value--empty" : ""]
    }, [a ? "— empty —" : sn(o)]);
    e && !a && (l.title = `${sn(o)}
${fr}`, mr(l, r, o, e)), i.appendChild(l);
  }), s.length > Bn && i.appendChild(
    x("span", { class: "pvt-facet-chip pvt-facet-chip--more" }, [
      `+${s.length - Bn} more`
    ])
  ), x("div", { class: "pvt-facet-body" }, [n, i]);
}
const Oc = "hsl(165 45% 52%)";
function vr(r, t, e) {
  return un(r) ? "var(--pvt-text-color-3)" : e === "shared" ? Oc : Mc(t);
}
function sn(r) {
  return typeof r == "string" ? r : JSON.stringify(r);
}
function un(r) {
  return r.length === 0;
}
function Cs(r) {
  const t = /* @__PURE__ */ new Map();
  return r.forEach((e) => {
    e.forEach((n) => {
      if ((typeof n.name == "string" || typeof n.name == "number" || typeof n.name == "boolean") && (typeof n.value == "string" || typeof n.value == "number" || typeof n.value == "boolean")) {
        t.has(n.name) || t.set(n.name, /* @__PURE__ */ new Map());
        const i = t.get(n.name), s = i.get(n.value) || 0;
        i.set(n.value, s + 1);
      }
    });
  }), t;
}
function Pc(r, t = !0) {
  const e = /* @__PURE__ */ new Map();
  for (const [o, a] of r.entries()) {
    const l = Array.from(a.entries()).sort(
      (d, c) => c[1] - d[1]
      // high count first
    );
    e.set(o, new Map(l));
  }
  const n = Array.from(e.entries()).sort(
    (o, a) => o[1].size - a[1].size
  ), i = new Map(n);
  if (!t)
    return i;
  const s = /* @__PURE__ */ new Map();
  for (const [o, a] of i)
    for (const [l, d] of a) {
      s.has(o) || s.set(o, /* @__PURE__ */ new Map());
      const c = s.get(o);
      if (a.size > Nc && d === 1) {
        const u = c.get(ks) || 0;
        c.set(ks, u + 1);
      } else
        c.set(l, d);
    }
  return s;
}
class Fc extends X {
  constructor(e) {
    super(e);
    h(this, "panel");
    h(this, "header");
    h(this, "body");
    h(this, "renderCb");
    this.renderCb = typeof this.uiManager.getOptions().propertiesPanel.render == "function" ? this.uiManager.getOptions().propertiesPanel.render : void 0;
  }
  onMount(e) {
    if (!e) return;
    const n = `
<div class="enter-ready">
    <div class="pvt-properties-header-panel pvt-sidebar-header-panel"></div>
    <div class="pvt-properties-body-panel pvt-sidebar-body-panel"></div>
</div>`;
    this.panel = V(n), this.header = this.panel.querySelector(".pvt-properties-header-panel"), this.body = this.panel.querySelector(".pvt-properties-body-panel"), e.appendChild(this.panel);
  }
  onDestroy() {
    var e;
    (e = this.panel) == null || e.remove(), this.panel = void 0;
  }
  onAfterMount() {
    this.clearProperties();
  }
  clearProperties() {
    if (this.body) {
      if (this.renderCb) {
        this.renderCustomContent(null);
        return;
      }
      this.body.innerHTML = "", this.hidePanel();
    }
  }
  onGraphReady() {
  }
  renderCustomContent(e) {
    var i;
    if (!this.body || !this.renderCb) return;
    this.body.innerHTML = "";
    const n = Ee(this.renderCb, e);
    n && ((i = this.body) == null || i.appendChild(n));
  }
  setHeaderBasicNode() {
    this.header.textContent = "Basic Node Properties";
  }
  setHeaderBasicEdge() {
    this.header.textContent = "Basic Edge Properties";
  }
  setHeaderMultiSelectNode() {
    this.header.textContent = "Aggregated Node Properties";
  }
  setHeaderMultiSelectEdge() {
    this.header.textContent = "Aggregated Edge Properties";
  }
  showPanel() {
    this.panel.classList.add("enter-active");
  }
  hidePanel() {
    this.panel.classList.remove("enter-active");
  }
  /* Single selection */
  updateNodeProperties(e) {
    if (!this.body) return;
    if (this.setHeaderBasicNode(), this.showPanel(), this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
    const n = Ct(e, this.uiManager.getOptions().propertiesPanel), i = x("div", { class: "pvt-properties-container" }, [
      Mt(n, e)
    ]);
    this.body.innerHTML = "", this.body.appendChild(i);
  }
  updateEdgeProperties(e) {
    if (!this.body) return;
    if (this.setHeaderBasicEdge(), this.showPanel(), this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
    const n = Yn(e, this.uiManager.getOptions().propertiesPanel), i = x("div", { class: "pvt-properties-container" }, [
      Mt(n, e)
    ]);
    this.body.innerHTML = "", this.body.appendChild(i);
  }
  /* Multiple selection */
  updateNodesProperties(e) {
    if (!this.body) return;
    if (this.setHeaderMultiSelectNode(), this.showPanel(), this.renderCb) {
      this.renderCustomContent(e.map((o) => o.node));
      return;
    }
    const i = V(`
<div class="pvt-properties-container">
    <div class="">
        <div class="pvt-aggregated-properties"></div>
    </div>
</div>`), s = i.querySelector("div.pvt-aggregated-properties");
    if (s) {
      const o = [];
      e.forEach((d) => {
        const { node: c } = d, u = Ct(c, this.uiManager.getOptions().propertiesPanel);
        o.push(u);
      });
      const a = Cs(o), l = ei(
        a,
        e.length,
        this.genActionButtons.bind(this),
        this.applyNodeFacetFilter.bind(this)
      );
      s.appendChild(l);
    }
    this.body.innerHTML = "", this.body.appendChild(i);
  }
  updateEdgesProperties(e) {
    if (!this.body) return;
    if (this.setHeaderMultiSelectEdge(), this.showPanel(), this.renderCb) {
      this.renderCustomContent(e.map((o) => o.edge));
      return;
    }
    const i = V(`
<div class="pvt-properties-container">
    <div class="">
        <div class="pvt-aggregated-properties"></div>
    </div>
</div>`), s = i.querySelector("div.pvt-aggregated-properties");
    if (s) {
      const o = [];
      e.forEach((d) => {
        const { edge: c } = d, u = Yn(c, this.uiManager.getOptions().propertiesPanel);
        o.push(u);
      });
      const a = Cs(o), l = ei(a, e.length, this.genActionButtons.bind(this));
      s.appendChild(l);
    }
    this.body.innerHTML = "", this.body.appendChild(i);
  }
  /**
   * Narrows the current node selection by a single facet value: `keep` drops
   * every node that does not carry the value, `exclude` drops those that do.
   * Shared by the row icons and by clicking a distribution bar / value chip.
   *
   * The value is read through `nodePropertiesGetter` — the same source the
   * facet was built from — rather than raw `getData()`, so getter-derived
   * fields (e.g. `id`, which lives on `node.id`) match instead of missing.
   */
  applyNodeFacetFilter(e, n, i) {
    const s = this.uiManager.getOptions().propertiesPanel, o = this.uiManager.graph.renderer.getGraphInteraction(), a = o.getSelectedNodes().filter((l) => {
      var c;
      const d = (c = Ct(l.node, s).find((u) => u.name === e)) == null ? void 0 : c.value;
      return i === "keep" ? d !== n : d === n;
    });
    o.removeNodesFromSelection(a);
  }
  genActionButtons(e, n) {
    const i = x("button", {
      title: "Keep only nodes with this value",
      class: "pvt-facet-action-select"
    }, [B({ svgIcon: $s })]);
    i.addEventListener("click", () => this.applyNodeFacetFilter(e, n, "keep"));
    const s = x("button", {
      title: "Exclude nodes with this value",
      class: "pvt-facet-action-exclude"
    }, [B({ svgIcon: Gs })]);
    return s.addEventListener("click", () => this.applyNodeFacetFilter(e, n, "exclude")), x("div", { class: "pvt-aggregated-property-actions" }, [
      i,
      s
    ]);
  }
}
class Bc extends X {
  constructor(e) {
    super(e);
    h(this, "row");
  }
  onMount(e) {
    e && (this.row = document.createElement("div"), this.row.className = "pvt-sidebar-bulkactions", this.buildRow(), this.hide(), e.appendChild(this.row));
  }
  onDestroy() {
    var e;
    (e = this.row) == null || e.remove(), this.row = void 0;
  }
  /** Reveal the row (a node selection is active). */
  show() {
    this.row && (this.row.style.display = "flex");
  }
  /** Hide the row (no node selection). */
  hide() {
    this.row && (this.row.style.display = "none");
  }
  specs() {
    return [
      { id: "pin", label: "Pin", icon: ot, kind: "action", run: () => this.pinSelection() },
      { id: "unpin", label: "Unpin", icon: ri, kind: "action", run: () => this.unpinSelection() },
      { id: "hide", label: "Hide", icon: at, kind: "action", run: () => this.hideSelection() },
      { id: "isolate", label: "Isolate", icon: ai, kind: "soon" },
      { id: "group", label: "Group", icon: oa, kind: "soon", divider: !0 },
      { id: "ungroup", label: "Ungroup", icon: aa, kind: "soon" },
      { id: "bulk-edit", label: "Bulk edit", icon: ra, kind: "soon" },
      { id: "delete", label: "Delete", icon: ln, kind: "danger", divider: !0, run: () => this.deleteSelection() }
    ];
  }
  buildRow() {
    if (this.row) {
      this.row.innerHTML = "";
      for (const e of this.specs()) {
        if (e.divider) {
          const i = document.createElement("span");
          i.className = "pvt-sidebar-bulkactions-divider", this.row.appendChild(i);
        }
        const n = document.createElement("button");
        n.type = "button", n.className = "pvt-sidebar-bulkaction", n.dataset.action = e.id, n.setAttribute("aria-label", e.label), n.title = e.kind === "soon" ? `${e.label} — coming soon` : e.label, n.innerHTML = `<span class="pvt-sidebar-bulkaction-icon">${e.icon}</span>`, e.kind === "soon" ? (n.disabled = !0, n.classList.add("pvt-sidebar-bulkaction-soon")) : (e.kind === "danger" && n.classList.add("pvt-sidebar-bulkaction-danger"), this.listen(n, "click", () => {
          var i;
          return (i = e.run) == null ? void 0 : i.call(e);
        })), this.row.appendChild(n);
      }
    }
  }
  /* ---------- functional actions (operate on the live selection) ---------- */
  selection() {
    return this.uiManager.graph.renderer.getGraphInteraction().getSelectedNodes();
  }
  selectedNodes() {
    return this.selection().map((e) => e.node);
  }
  pinSelection() {
    for (const e of this.selectedNodes()) e.freeze();
  }
  unpinSelection() {
    for (const n of this.selectedNodes()) n.unfreeze();
    const e = this.uiManager.graph.simulation;
    e.isEnabled() && e.reheat();
  }
  hideSelection() {
    const e = this.uiManager.graph.queryEngine;
    for (const n of this.selectedNodes()) e.excludeNode(n);
    this.clearSelection();
  }
  deleteSelection() {
    const e = this.selectedNodes().map((n) => n.id);
    for (const n of e) this.uiManager.graph.removeNode(n);
    this.clearSelection();
  }
  clearSelection() {
    this.uiManager.graph.renderer.getGraphInteraction().clearNodeSelectionList();
  }
}
class zc extends X {
  constructor(e) {
    super(e);
    h(this, "panelContainer");
    h(this, "panels");
    h(this, "allPanels", []);
    this.panels = this.uiManager.getOptions().extraPanels;
  }
  onMount(e) {
    e && (this.panelContainer = e);
  }
  onDestroy() {
    var e;
    (e = this.panelContainer) == null || e.remove(), this.panelContainer = void 0, this.allPanels = [];
  }
  onAfterMount() {
    this.mountPanels(), this.panels.forEach((e, n) => {
      e.alwaysVisible === !0 && this.showPanel(this.allPanels[n]);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNode(e) {
    this.showAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateEdge(e) {
    this.showAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNodes(e) {
    this.showAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateEdges(e) {
    this.showAll();
  }
  clear() {
    this.hideAll();
  }
  showAll() {
    this.allPanels.forEach((e) => {
      this.showPanel(e);
    });
  }
  hideAll() {
    this.allPanels.forEach((e, n) => {
      this.panels[n].alwaysVisible !== !0 && this.hidePanel(e);
    });
  }
  showPanel(e) {
    e.classList.add("enter-active");
  }
  hidePanel(e) {
    e.classList.remove("enter-active");
  }
  mountPanels() {
    this.panelContainer && this.panels.forEach((e) => [
      this.mountPanel(e)
    ]);
  }
  mountPanel(e) {
    if (!this.panelContainer) return;
    const i = V(`
            <div class="enter-ready">
                <div class="pivotick-extrapanel-header-panel pvt-sidebar-header-panel"></div>
                <div class="pivotick-extrapanel-body-panel pvt-sidebar-body-panel"></div>
            </div>`), s = i.querySelector(".pivotick-extrapanel-header-panel"), o = i.querySelector(".pivotick-extrapanel-body-panel"), a = Ee(e.title, null);
    a && s.appendChild(a);
    const l = Ee(e.render, null);
    l && o.appendChild(l), this.allPanels.push(i), this.panelContainer.appendChild(i);
  }
  onGraphReady() {
  }
}
function yr(r, t, e, n) {
  const i = document.createElement("div");
  i.className = "pivotick-tabs";
  const s = document.createElement("div");
  s.className = "pivotick-tab-controls";
  const o = document.createElement("div");
  o.className = "pivotick-tab-panels", n && e ? (n.appendChild(s), e.appendChild(o)) : e ? e.appendChild(i) : i.append(s, o);
  function a(d) {
    const c = d.id;
    o.querySelectorAll("[data-tab-panel]").forEach((g) => g.style.display = "none"), s.querySelectorAll(".pivotick-button").forEach((g) => {
      g.classList.toggle("pivotick-button-primary", !1), g.classList.toggle("pivotick-button-outline-secondary", !0);
    });
    const u = o.querySelector(`[data-tab-panel="${c}"]`), p = s.querySelector(`[data-tab-control="${c}"]`);
    u && (u.style.display = "block"), p && (p.classList.remove("pivotick-button-outline-secondary"), p.classList.add("pivotick-button-primary")), requestAnimationFrame(() => {
      d.onShown && (d == null || d.onShown());
    });
  }
  r.forEach((d) => {
    const c = P({
      text: d.label,
      variant: "outline-secondary",
      "data-tab-control": d.id,
      onclick: () => a(d)
    });
    s.appendChild(c);
    const u = document.createElement("div");
    u.dataset.tabPanel = d.id, u.style.display = "none", u.appendChild(d.content), o.appendChild(u);
  });
  const l = t ? r.find((d) => d.id === t) ?? r[0] : r[0];
  return a(l), n && e ? o : i;
}
const rn = class rn extends X {
  constructor(e) {
    super(e);
    h(this, "panel");
    h(this, "header");
    h(this, "body");
    h(this, "neighborCount");
    h(this, "egographContainer");
    h(this, "statContainer");
    h(this, "listContainer");
    h(this, "tabContainer");
    h(this, "egoGraph");
    h(this, "renderCb");
    this.renderCb = typeof this.uiManager.getOptions().neighborsPanel.render == "function" ? this.uiManager.getOptions().neighborsPanel.render : void 0;
  }
  onMount(e) {
    if (!e) return;
    const n = `
<div class="enter-ready">
    <div class="pvt-neighbors-header-panel pvt-sidebar-header-panel"></div>
    <div class="pvt-neighbors-body-panel pvt-sidebar-body-panel"></div>
</div>`;
    this.panel = V(n), this.header = this.panel.querySelector(".pvt-neighbors-header-panel"), this.body = this.panel.querySelector(".pvt-neighbors-body-panel"), this.neighborCount = x("div", { class: "pvt-neighbors-count" }), e.appendChild(this.panel), this.egographContainer = x("div", { class: "main-egograph-container" }, ["Egograph here"]), this.statContainer = x("div", { class: "main-stats-container" }, ["Stats here"]), this.listContainer = x("div", { class: "main-list-container" }, ["List here"]), this.tabContainer = yr(
      [
        {
          id: "egograph",
          label: "Neighbor Graph",
          content: this.egographContainer,
          onShown: () => {
            requestAnimationFrame(async () => {
              this.egoGraph && (await this.egoGraph.simulation.start(), await this.egoGraph.simulation.waitForSimulationStop(), this.egoGraph.renderer.fitAndCenter());
            });
          }
        },
        {
          id: "stats",
          label: "Stats",
          content: this.statContainer
        },
        {
          id: "list",
          label: "List",
          content: this.listContainer
        }
      ],
      void 0,
      this.body,
      this.header
    ), this.body.insertBefore(this.neighborCount, this.body.firstChild);
  }
  onDestroy() {
    var e, n;
    (e = this.egoGraph) == null || e.destroy(), this.egoGraph = void 0, (n = this.panel) == null || n.remove(), this.panel = void 0;
  }
  onAfterMount() {
    this.clearNeighbors();
  }
  clearNeighbors() {
    if (this.body) {
      if (this.renderCb) {
        this.renderCustomContent(null);
        return;
      }
      this.renderCb ? this.body.innerHTML = "" : this.egographContainer && this.statContainer && this.listContainer && (this.egographContainer.innerHTML = "", this.statContainer.innerHTML = "", this.listContainer.innerHTML = ""), this.hidePanel();
    }
  }
  onGraphReady() {
  }
  renderCustomContent(e) {
    var i;
    if (!this.body || !this.renderCb) return;
    this.body.innerHTML = "";
    const n = Ee(this.renderCb, e);
    n && ((i = this.body) == null || i.appendChild(n));
  }
  showPanel() {
    this.panel.classList.add("enter-active");
  }
  hidePanel() {
    this.panel.classList.remove("enter-active");
  }
  /* Single selection */
  updateNodeNeighbors(e) {
    if (this.showPanel(), !this.neighborCount) return;
    if (this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
    this.buildEgoGraph(e), this.buildList(e), this.buildStats(e);
    const n = e.degree(), i = n > 1 ? `${n} connections` : "1 connection";
    this.neighborCount.textContent = i;
  }
  updateEdgeNeighbors(e) {
    if (this.showPanel(), this.renderCb) {
      this.renderCustomContent(e);
      return;
    }
  }
  /* Multiple selection */
  updateNodesNeighbors(e) {
    if (this.showPanel(), !this.neighborCount) return;
    if (this.renderCb) {
      this.renderCustomContent(e.map((o) => o.node));
      return;
    }
    if (e.length <= 1) return;
    const n = this.mergeNodesIntoNode(e.map((o) => o.node));
    this.buildEgoGraph(n, !1), this.buildList(n), this.buildStats(n);
    const i = n.degree(), s = i > 1 ? `${i} connections` : "1 connection";
    this.neighborCount.textContent = s;
  }
  updateEdgesNeighbors(e) {
    if (this.showPanel(), this.renderCb) {
      this.renderCustomContent(e.map((n) => n.edge));
      return;
    }
  }
  buildEgoGraph(e, n = !0) {
    if (!this.egographContainer) return;
    this.egographContainer.innerHTML = "", this.egoGraph && this.egoGraph.destroy(), this.egographContainer.style.visibility = "hidden";
    const i = /* @__PURE__ */ new Map();
    for (const b of [
      e,
      ...e.getConnectedNodes(),
      ...e.getConnectingNodes()
    ])
      i.set(b.id.toString(), b);
    const s = [
      ...e.getEdgesOut(),
      ...e.getEdgesIn()
    ], o = /* @__PURE__ */ new Map();
    s.forEach((b) => {
      !b || b.id == null || o.set(b.id.toString(), b);
    }), i.forEach((b) => {
      b.getEdgesOut().forEach((k) => {
        const C = k.to;
        i.has(C.id.toString()) && C.id !== e.id && o.set(k.id.toString(), k);
      });
    });
    const a = [...i.values()].filter((b) => {
      var k;
      return b.getDeepestNodeClone() === void 0 ? !0 : ((k = b.getDeepestNodeClone()) == null ? void 0 : k.visible) ?? !1;
    }), l = e.id.toString(), d = a.filter((b) => b.id.toString() !== l), c = d.slice(0, rn.MAX_EGO_NEIGHBORS), u = d.length - c.length, p = /* @__PURE__ */ new Set([l, ...c.map((b) => b.id.toString())]), g = [e, ...c].map((b) => b.toDict(!0)), f = [...o.values()].filter((b) => p.has(b.from.id.toString()) && p.has(b.to.id.toString())).map((b) => b.toDict());
    if (u > 0) {
      const b = `__ego_more__${l}`, k = new W(b, { label: `${u} more`, aggregated_node_count: u }, this.aggregatedNodeStyle());
      k.weight = 10, g.push(k.toDict(!0)), f.push({ id: `${b}__edge`, from: l, to: b, data: {} });
    }
    const v = {
      nodes: g,
      edges: f
    }, y = {
      isDirected: this.uiManager.graph.getOptions().isDirected,
      UI: {
        mode: "viewer",
        tooltip: {
          enabled: !0,
          allowPinning: !1,
          setPosition: (b, k, C) => {
            b.style.left = `${C.x + C.width + 15}px`, b.style.top = `${C.y}px`;
          }
        },
        contextMenu: {
          enabled: !1
        },
        navigation: {
          enabled: !1
        }
      },
      layout: {
        type: "egoTree",
        radial: !0,
        radialGap: 120,
        rootId: e.id
      },
      render: {
        ...this.uiManager.graph.getOptions().render,
        dragEnabled: !1,
        enableFocusMode: !1,
        enableNodeExpansion: !1,
        interactionEnabled: !0,
        zoomEnabled: !1,
        zoomAnimationDuration: 100
      },
      simulation: {
        useWorker: !1,
        warmupTicks: 0,
        cooldownTime: 0
      },
      callbacks: {
        onNodeClick: (b, k) => {
          var T, I;
          const C = this.uiManager.graph.getMutableNode(k.id);
          C && ((T = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode()) == null ? void 0 : T.node) != C && (this.uiManager.graph.unHighlightElement(C), (I = this.egoGraph) == null || I.unHighlightElement(k), this.uiManager.graph.selectElement(C));
        },
        onNodeHoverIn: (b, k) => {
          var T, I, N;
          const C = this.uiManager.graph.getMutableNode(k.id);
          C && (this.uiManager.graph.highlightElement(C), (T = this.egoGraph) == null || T.highlightElement(k), (N = (I = this.egoGraph) == null ? void 0 : I.UIManager.tooltip) == null || N.nodeHovered(b, k));
        },
        onNodeHoverOut: (b, k) => {
          var T;
          const C = this.uiManager.graph.getMutableNode(k.id);
          C && (this.uiManager.graph.unHighlightElement(C), (T = this.egoGraph) == null || T.unHighlightElement(k));
        }
      }
    };
    this.egoGraph = new ee(this.egographContainer, v, y), this.egoGraph.on("ready", () => {
      setTimeout(() => {
        this.egographContainer.style.visibility = "visible";
      }, 20), n && this.egoGraph.selectElement(this.egoGraph.getMutableNode(e.id));
    }), this.egoGraph.renderer.getGraphInteraction().canvasClick = () => {
    };
  }
  buildList(e) {
    if (!this.listContainer) return;
    this.listContainer.innerHTML = "";
    const n = 22, i = this.uiManager.getOptions().mainHeader, s = [
      ...e.getEdgesOut(),
      ...e.getEdgesIn()
    ];
    s.sort((a, l) => {
      const d = a.from.id === e.id ? a.to : a.from, c = l.from.id === e.id ? l.to : l.from, u = se(d, i), p = se(c, i);
      return u.localeCompare(p);
    });
    const o = x("div", { class: "pvt-neighbor-list" });
    for (const a of s) {
      const l = a.from.id === e.id, d = l ? a.to : a.from, c = St(a, i) || "", u = this.uiManager.graph.getOptions().isDirected || a.directed, p = u ? l ? jo : Uo : Wo, g = u ? l ? "edge-out" : "edge-in" : "edge-undirected", f = u ? l ? "Outgoing connection" : "Incoming connection" : "Connection", v = x("span", {
        class: ["pvt-neighbor-row__dir", g]
      }, [B({ svgIcon: p })]), y = x("span", { class: "pvt-neighbor-row__preview" });
      y.appendChild($e(d, { size: n }));
      const b = se(d, i), k = x("span", { class: "pvt-neighbor-row__name" }, [b]), C = [v, y, k];
      c && C.push(x("span", {
        class: "pvt-neighbor-row__label",
        title: c
      }, [c]));
      const T = c ? `${f} — ${b} · ${c}` : `${f} — ${b}`, I = x("div", {
        class: "pvt-neighbor-row",
        "data-node-id": d.id,
        title: T
      }, C), N = () => this.uiManager.graph.getMutableNode(d.id);
      I.addEventListener("mouseenter", (O) => {
        var Ne, Me, Re;
        const re = N();
        re && (this.uiManager.graph.highlightElement(re), (Ne = this.egoGraph) == null || Ne.highlightElement(e), (Re = (Me = this.egoGraph) == null ? void 0 : Me.UIManager.tooltip) == null || Re.nodeHovered(O, e));
      }), I.addEventListener("mouseleave", () => {
        var re;
        const O = N();
        O && (this.uiManager.graph.unHighlightElement(O), (re = this.egoGraph) == null || re.unHighlightElement(e));
      }), I.addEventListener("click", () => {
        const O = N();
        O && (this.uiManager.graph.unHighlightElement(O), this.uiManager.graph.selectElement(O));
      }), o.appendChild(I);
    }
    this.listContainer.appendChild(o);
  }
  buildStats(e) {
    if (!this.statContainer) return;
    this.statContainer.innerHTML = "";
    const n = x("dl", { class: "pvt-property-list" }), i = x(
      "dl",
      {
        class: "pvt-property-row"
      },
      [
        x("dt", { class: "pvt-property-name", title: "Total connections", style: "font-size: 1em;" }, ["Degree"]),
        x("dd", { class: "pvt-property-value", style: "display: flex; align-items: center; font-size: 1em;" }, [
          x("span", { style: "margin-right: 8px;" }, [e.degree().toString()]),
          x("span", {
            style: "display: inline-flex; align-items: center; margin-right: 8px; color: var(--pvt-text-color-secondary)",
            title: "Outgoing edges"
          }, [B({ svgIcon: Jo }), e.getEdgesOut().length.toString()]),
          x("span", {
            style: "display: inline-flex; align-items: center; color: var(--pvt-text-color-secondary)",
            title: "Incoming edges"
          }, [B({ svgIcon: ea }), e.getEdgesIn().length.toString()])
        ])
      ]
    );
    n.append(i);
    const s = x("div", { class: "core-stats" }, [n]), o = /* @__PURE__ */ new Map();
    [
      ...e.getEdgesOut(),
      ...e.getEdgesIn()
    ].forEach((u) => {
      const p = St(u, this.uiManager.getOptions().mainHeader) || "", g = o.get(p) || 0;
      o.set(p, g + 1);
    });
    const l = /* @__PURE__ */ new Map();
    l.set("Label", o);
    const d = ei(
      l,
      e.degree(),
      this.genActionButtonsSingleSelection.bind(this),
      this.applyEdgeLabelFacetFilter.bind(this)
    ), c = x("div", { class: "aggregated-labels" }, [d]);
    this.statContainer.appendChild(s), this.statContainer.appendChild(c);
  }
  /**
   * Reselects the neighbours reached by a single edge label: `keep` selects the
   * nodes linked through that label, `exclude` selects those linked through any
   * other label. Shared by the row icons and by clicking a distribution bar /
   * value chip, mirroring the node-properties facet filter.
   */
  applyEdgeLabelFacetFilter(e, n, i) {
    const s = this.getNodesMatchingFilteredEdgeName(n, i === "exclude");
    if (!s || s.length === 0) return;
    const o = this.uiManager.graph.renderer.getGraphInteraction();
    o.clearNodeSelectionList(), s.length > 1 ? o.selectNodes(s) : o.selectNode(s[0].element, s[0].node);
  }
  genActionButtonsSingleSelection(e, n) {
    const i = x("button", {
      title: "Select nodes linked with this label",
      class: "pvt-facet-action-select"
    }, [B({ svgIcon: $s })]);
    i.addEventListener("click", () => this.applyEdgeLabelFacetFilter(e, n, "keep"));
    const s = x("button", {
      title: "Exclude nodes linked with this label",
      class: "pvt-facet-action-exclude"
    }, [B({ svgIcon: Gs })]);
    return s.addEventListener("click", () => this.applyEdgeLabelFacetFilter(e, n, "exclude")), x("div", { class: "pvt-aggregated-property-actions" }, [
      i,
      s
    ]);
  }
  getNodesMatchingFilteredEdgeName(e, n = !1) {
    const i = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode();
    if (!i) return;
    const s = i.node, o = [...s.getEdgesOut(), ...s.getEdgesIn()], a = /* @__PURE__ */ new Map();
    return o.filter((l) => {
      const d = St(l, this.uiManager.getOptions().mainHeader);
      return n ? d !== e : d === e;
    }).forEach((l) => {
      const d = s === l.from ? l.to : l.from;
      a.set(d.id.toString(), d);
    }), [...a.values()].map((l) => ({
      node: l,
      element: l.getGraphElement()
    }));
  }
  /**
   * Style for an aggregate "+N Group" node: a transparent square carrying the
   * multi-select icon and a "+N" / "Group" badge, with the count read from the
   * node's `aggregated_node_count` data field. Shared by the multi-selection
   * merge and the capped ego graph's overflow node so both read identically.
   */
  aggregatedNodeStyle() {
    return {
      size: 50,
      shape: "square",
      color: "transparent",
      strokeColor: "transparent",
      html: (e) => {
        const i = e.getData().aggregated_node_count, s = B({ svgIcon: js(28) });
        return s.style = "position: absolute;", V(`<div style="display: flex; flex-direction: column; position: relative; align-items: center;">
                    ${s.outerHTML}
                    <div style="
    height: 65%;
    width: 65%;
    margin-top: 18%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: var(--pvt-bg-color-5);">
                        <div style="height: auto; font-weight: 600; font-size: 1.5em;">+${i}</div>
                        <div style="height: auto;">Group</div>
                    </div>
                </div>`);
      }
    };
  }
  mergeNodesIntoNode(e) {
    const n = this.aggregatedNodeStyle(), i = { label: `${e.length} nodes`, aggregated_node_count: e.length }, s = new W("aggregated-node", i, n);
    s.weight = 10;
    const o = new Set(e.map((c) => c.id.toString())), a = e.flatMap((c) => [
      ...c.getEdgesOut(),
      ...c.getEdgesIn()
    ]), l = [], d = [];
    for (const c of a) {
      const u = o.has(c.from.id), p = o.has(c.to.id);
      u !== p && (u ? l.push(c) : d.push(c));
    }
    return l.forEach((c, u) => {
      const p = c.to.clone();
      new ae(`outgoing-${u}`, s, p, c.getData(), c.getStyle());
    }), d.forEach((c, u) => {
      const p = c.from.clone();
      new ae(`incoming-${u}`, p, s, c.getData(), c.getStyle());
    }), s;
  }
};
// Cap the neighbour graph: a very high-degree node otherwise builds an ego
// graph of thousands of SVG elements that re-lays-out on every main-graph
// frame (drag/zoom), dominating frame time. Stats/List tabs still show all.
h(rn, "MAX_EGO_NEIGHBORS", 50);
let ti = rn;
class Hc extends X {
  constructor(e) {
    super(e);
    h(this, "sidebar");
    h(this, "sidebarOpen", !0);
    h(this, "sidebarMainHeader");
    h(this, "sidebarProperties");
    h(this, "sidebarNeighbors");
    h(this, "bulkActions");
    h(this, "extraPanelManager");
    h(this, "mainHeaderPanel");
    h(this, "mainBodyPanel");
    h(this, "neighborPanel");
    h(this, "extraPanelContainer");
    h(this, "collapse");
    h(this, "clearSelectionButton");
    this.sidebarMainHeader = new Tc(this.uiManager), this.sidebarProperties = new Fc(this.uiManager), this.sidebarNeighbors = new ti(this.uiManager), this.bulkActions = new Bc(this.uiManager), this.extraPanelManager = new zc(this.uiManager);
  }
  onMount(e) {
    if (!e) return;
    const n = `
<div class="pvt-sidebar-elements">
    <div class="pvt-mainheader-panel"></div>
    <div class="pvt-sidebar-bulkactions-slot"></div>
    <div class="pvt-sidebar-separator"></div>
    <div class="pvt-properties-panel pvt-sidebar-panel"></div>
    <div class="pvt-sidebar-separator"></div>
    <div class="pvt-neighbor-panel pvt-sidebar-panel"></div>
    <div class="pvt-sidebar-separator"></div>
    <div class="pvt-extra-panel pvt-sidebar-panel"></div>
</div>`;
    this.sidebar = V(n), e.appendChild(this.sidebar);
  }
  onDestroy() {
    var e, n;
    (e = this.collapse) == null || e.remove(), this.collapse = void 0, (n = this.sidebar) == null || n.remove(), this.sidebar = void 0;
  }
  onAfterMount() {
    var n, i;
    if (!this.sidebar) return;
    this.mainHeaderPanel = this.sidebar.querySelector(".pvt-mainheader-panel") ?? void 0, this.addChild(this.sidebarMainHeader, this.mainHeaderPanel);
    const e = this.sidebar.querySelector(".pvt-sidebar-bulkactions-slot") ?? void 0;
    this.addChild(this.bulkActions, e), this.mainBodyPanel = this.sidebar.querySelector(".pvt-properties-panel") ?? void 0, this.addChild(this.sidebarProperties, this.mainBodyPanel), this.neighborPanel = this.sidebar.querySelector(".pvt-neighbor-panel") ?? void 0, this.addChild(this.sidebarNeighbors, this.neighborPanel), this.extraPanelContainer = this.sidebar.querySelector(".pvt-extra-panel") ?? void 0, this.addChild(this.extraPanelManager, this.extraPanelContainer), this.collapse = x("span", {
      class: "pvt-sidebar-collapse-container",
      role: "button",
      tabindex: "0",
      "aria-label": "Collapse sidebar",
      "aria-expanded": "true"
    }, [
      x("span", { class: "pvt-sidebar-collapse-button pvt-sidebar-collapse-button-collapse" }, [B({ svgIcon: Lo })]),
      x("span", { class: "pvt-sidebar-collapse-button pvt-sidebar-collapse-button-expand" }, [B({ svgIcon: Io })])
    ]), this.sidebar.parentElement.appendChild(this.collapse), this.clearSelectionButton = x("button", {
      class: "pvt-sidebar-clear",
      type: "button",
      title: "Clear selection",
      "aria-label": "Clear selection"
    }, [B({ svgIcon: oi })]), this.sidebar.appendChild(this.clearSelectionButton), ((i = (n = this.uiManager.getOptions()) == null ? void 0 : n.sidebar) == null ? void 0 : i.collapsed) === !0 ? this.hideSidebar() : this.showSidebar();
  }
  onGraphReady() {
    this.trackInteraction("selectNode", (e, n) => {
      this.renderSingleNodeSelection(e, n);
    }), this.trackInteraction("unselectNode", () => {
      this.clearSelection();
    }), this.trackInteraction("selectEdge", (e) => {
      this.sidebarMainHeader.updateEdgeOverview(e), this.sidebarProperties.updateEdgeProperties(e), this.sidebarNeighbors.updateEdgeNeighbors(e), this.extraPanelManager.updateEdge(e), this.showSelectionActions("edge");
    }), this.trackInteraction("unselectEdge", () => {
      this.clearSelection();
    }), this.trackInteraction("selectNodes", (e) => {
      this.renderNodeSelection();
    }), this.trackInteraction("unselectNodes", () => {
      this.renderNodeSelection();
    }), this.trackInteraction("selectEdges", (e) => {
      this.sidebarMainHeader.updateEdgesOverview(e), this.sidebarProperties.updateEdgesProperties(e), this.sidebarNeighbors.updateEdgesNeighbors(e), this.extraPanelManager.updateEdges(e), this.showSelectionActions("edge");
    }), this.trackInteraction("unselectEdges", () => {
      this.clearSelection();
    }), this.collapse && (this.listen(this.collapse, "click", () => this.toggleSidebar()), this.listen(this.collapse, "keydown", (e) => {
      const n = e;
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.toggleSidebar());
    })), this.clearSelectionButton && this.listen(this.clearSelectionButton, "click", () => this.clearActiveSelection());
  }
  /**
   * Renders the sidebar for the current node selection, dispatching by size:
   * 0 → cleared, 1 → the single-node view (so a filtered-down selection reads
   * like a fresh click), 2+ → the aggregated multi-selection view.
   */
  renderNodeSelection() {
    const e = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNodes();
    if (e.length === 0)
      this.clearSelection();
    else if (e.length === 1) {
      const { node: n, element: i } = e[0];
      this.renderSingleNodeSelection(n, i);
    } else
      this.renderMultiNodeSelection(e);
  }
  renderSingleNodeSelection(e, n) {
    this.sidebarMainHeader.updateNodeOverview(e, n), this.sidebarProperties.updateNodeProperties(e), this.sidebarNeighbors.updateNodeNeighbors(e), this.extraPanelManager.updateNode(e), this.hideSelectionActions();
  }
  renderMultiNodeSelection(e) {
    this.sidebarMainHeader.updateNodesOverview(e), this.sidebarProperties.updateNodesProperties(e), this.sidebarNeighbors.updateNodesNeighbors(e), this.extraPanelManager.updateNodes(e), this.showSelectionActions("node");
  }
  clearSelection() {
    this.sidebarMainHeader.clearOverview(), this.sidebarProperties.clearProperties(), this.sidebarNeighbors.clearNeighbors(), this.extraPanelManager.clear(), this.hideSelectionActions();
  }
  /**
   * Reveal the clear-selection X (and, for a multi-node selection, the
   * bulk-action row). Called for 2+ nodes and for edge selections; the bulk row
   * is node-only, so an edge selection shows only the X. Single-node selections
   * show neither (handled by {@link hideSelectionActions}).
   */
  showSelectionActions(e) {
    var n;
    (n = this.clearSelectionButton) == null || n.classList.add("pvt-visible"), e === "node" ? this.bulkActions.show() : this.bulkActions.hide();
  }
  hideSelectionActions() {
    var e;
    (e = this.clearSelectionButton) == null || e.classList.remove("pvt-visible"), this.bulkActions.hide();
  }
  /** Clear whatever is currently selected (nodes and/or edges). */
  clearActiveSelection() {
    const e = this.uiManager.graph.renderer.getGraphInteraction();
    e.clearNodeSelectionList(), e.clearEdgeSelectionList();
  }
  toggleSidebar() {
    this.sidebar.closest(".pvt-sidebar").classList.toggle("pvt-sidebar-collapsed", this.sidebarOpen), this.sidebarOpen = !this.sidebarOpen, this.syncCollapseA11y();
  }
  showSidebar() {
    this.sidebar.closest(".pvt-sidebar").classList.remove("pvt-sidebar-collapsed"), this.sidebarOpen = !0, this.syncCollapseA11y();
  }
  hideSidebar() {
    this.sidebar.closest(".pvt-sidebar").classList.add("pvt-sidebar-collapsed"), this.sidebarOpen = !1, this.syncCollapseA11y();
  }
  /** Reflect open/closed state on the collapse control for AT + keyboard users. */
  syncCollapseA11y() {
    this.collapse && (this.collapse.setAttribute("aria-expanded", String(this.sidebarOpen)), this.collapse.setAttribute("aria-label", this.sidebarOpen ? "Collapse sidebar" : "Expand sidebar"));
  }
}
class Gc extends X {
  constructor(e, n = {}) {
    super(e);
    h(this, "options");
    h(this, "slidePanel");
    h(this, "header");
    h(this, "body");
    h(this, "isOpen", !1);
    h(this, "DEFAULT_HEADER", null);
    h(this, "DEFAULT_BODY", "- empty panel -");
    this.options = n, this.options.header || (this.options.header = this.DEFAULT_HEADER), this.options.body || (this.options.body = this.DEFAULT_BODY);
  }
  onMount(e) {
    if (!e) return;
    const n = document.createElement("template");
    if (n.innerHTML = `
  <div class="pvt-slide-panel" id="pvt-side-panel">
  </div>
`, this.slidePanel = n.content.firstElementChild, this.slidePanel.innerHTML = "", this.options.header != null) {
      this.header = document.createElement("div"), this.header.className = "pvt-slide-panel__header", this.setHeader(this.options.header), this.slidePanel.appendChild(this.header);
      const i = P({
        text: "×",
        onClick: () => {
          this.close();
        },
        id: "pvt-sidePanel-close",
        class: "pvt-close-button",
        style: "margin-left: auto;"
      });
      this.header.appendChild(i);
    }
    this.body = document.createElement("div"), this.body.className = "pvt-slide-panel__content", this.setBody(this.options.body), this.slidePanel.appendChild(this.body), this.options.noBodyPadding ? this.body.style.padding = "0" : this.body.style.padding = "", e.appendChild(this.slidePanel);
  }
  onDestroy() {
    var e;
    (e = this.slidePanel) == null || e.remove(), this.slidePanel = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  open() {
    var e;
    this.isOpen = !0, (e = this.slidePanel) == null || e.classList.add("open");
  }
  close() {
    var e;
    this.isOpen = !1, (e = this.slidePanel) == null || e.classList.remove("open");
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  setHeader(e) {
    this.header && (this.header.innerHTML = "", e && (this.options.header instanceof HTMLElement ? this.header.appendChild(this.options.header) : this.options.rawHeader ? this.header.innerHTML = this.options.header : this.header.textContent = this.options.header));
  }
  setBody(e) {
    this.body && (this.body.innerHTML = "", e && (e instanceof HTMLElement ? this.body.appendChild(e) : this.options.rawBody ? this.body.innerHTML = e : this.body.textContent = e));
  }
}
class Es {
  constructor(t, e = {}) {
    h(this, "root");
    h(this, "select");
    h(this, "options", []);
    h(this, "selected", /* @__PURE__ */ new Set());
    h(this, "mode");
    h(this, "searchable");
    h(this, "dropdown");
    h(this, "input");
    h(this, "chipsContainer");
    h(this, "listContainer");
    h(this, "clearButton");
    h(this, "singleCloseButton");
    h(this, "inputWrap");
    h(this, "searchWrap");
    h(this, "searchInput");
    h(this, "focusedIndex", -1);
    this.select = t, this.root = document.createElement("div"), this.root.className = "pvt-picker", this.mode = e.mode ?? (t.multiple ? "multi" : "single"), this.searchable = e.searchable ?? !0, this.parseOptions(), this.build(), this.syncFromSelect(), this.attach();
  }
  parseOptions() {
    this.options = Array.from(this.select.options).filter((t) => t.value).map((t) => ({
      value: t.value,
      label: t.text,
      disabled: t.disabled
    }));
  }
  build() {
    var e;
    this.select.style.display = "none", (e = this.select.parentElement) == null || e.insertBefore(this.root, this.select);
    const t = document.createElement("div");
    t.className = "pvt-picker__control", this.chipsContainer = document.createElement("div"), this.chipsContainer.className = "pvt-picker__chips", this.clearButton = document.createElement("button"), this.clearButton.className = "pvt-picker__clear", this.clearButton.textContent = "×", this.clearButton.tabIndex = -1, this.clearButton.style.display = "none", this.clearButton.type = "button", this.inputWrap = document.createElement("div"), this.inputWrap.className = "pvt-picker__input-wrap", this.input = document.createElement("input"), this.input.className = "pvt-picker__input", this.input.placeholder = this.select.getAttribute("placeholder") || "Select...", this.input.type = "text", this.singleCloseButton = document.createElement("button"), this.singleCloseButton.className = "pvt-picker__single-close", this.singleCloseButton.textContent = "×", this.singleCloseButton.type = "button", this.singleCloseButton.style.display = "none", this.inputWrap.appendChild(this.input), this.inputWrap.appendChild(this.singleCloseButton), this.dropdown = document.createElement("div"), this.dropdown.className = "pvt-picker__dropdown", this.listContainer = document.createElement("div"), this.listContainer.className = "pvt-picker__list", this.dropdown.appendChild(this.listContainer), this.mode === "multi" ? (t.appendChild(this.chipsContainer), t.appendChild(this.clearButton)) : t.appendChild(this.inputWrap), this.mode === "multi" && (this.searchWrap = document.createElement("div"), this.searchWrap.className = "pvt-picker__search", this.searchInput = document.createElement("input"), this.searchInput.className = "pvt-picker__search-input", this.searchInput.placeholder = this.select.getAttribute("placeholder") || "Search...", this.searchWrap.appendChild(this.searchInput), this.dropdown.insertBefore(this.searchWrap, this.listContainer)), this.root.appendChild(t), this.root.appendChild(this.dropdown), this.renderList(), this.renderChips();
  }
  attach() {
    const t = this.root.querySelector(".pvt-picker__control");
    t == null || t.addEventListener("click", (i) => {
      if (this.mode === "single") {
        if (this.dropdown.classList.toggle("open"), this.focusedIndex = -1, this.dropdown.classList.contains("open")) {
          if (this.selected.size === 0) {
            const s = this.select.getAttribute("placeholder") || "Select...";
            this.input.placeholder = s, this.input.value = "";
          }
          this.renderList(), this.focusedIndex === -1 && (this.focusedIndex = 0, this.updateFocusedOption());
        }
        return;
      }
      i.target.tagName !== "BUTTON" && !i.target.classList.contains("pvt-picker__chip-remove") && (this.dropdown.classList.toggle("open"), this.focusedIndex = -1, this.dropdown.classList.contains("open") && (this.searchInput.focus(), this.focusedIndex === -1 && (this.focusedIndex = 0, this.updateFocusedOption())));
    });
    const e = (i) => this.handleKeyDown(i);
    this.searchInput ? (this.searchInput.addEventListener("input", () => {
      this.focusedIndex = -1, this.renderList(this.searchInput.value);
    }), this.searchInput.addEventListener("focus", (i) => {
      i.stopPropagation(), this.dropdown.classList.add("open");
    }), this.searchInput.addEventListener("keydown", e)) : (this.input.addEventListener("keydown", e), this.input.addEventListener("input", () => {
      this.focusedIndex = -1, this.renderList(this.input.value);
    }), this.input.addEventListener("keydown", (i) => {
      i.key === "Backspace" && this.input.value && this.selected.size === 1 && (i.preventDefault(), this.selected.clear(), this.input.value = "", this.syncToSelect(), this.syncFromSelect());
    })), document.addEventListener("pointerdown", (i) => {
      this.root.contains(i.target) || this.dropdown.classList.remove("open");
    }), this.clearButton.addEventListener("click", () => this.clear()), this.singleCloseButton.addEventListener("click", (i) => {
      i.stopPropagation(), this.selected.clear(), this.syncToSelect(), this.syncFromSelect(), this.dropdown.classList.remove("open");
    }), new MutationObserver((i) => {
      let s = !1;
      for (const o of i) {
        for (const a of o.addedNodes)
          if (a.tagName === "OPTION") {
            s = !0;
            break;
          }
        for (const a of o.removedNodes)
          if (a.tagName === "OPTION") {
            s = !0;
            break;
          }
        if (s) break;
      }
      s && this.syncFromSelect();
    }).observe(this.select, { childList: !0, subtree: !0 });
  }
  renderList(t = "") {
    this.listContainer.innerHTML = "";
    const e = this.searchable ? this.options.filter(
      (n) => t ? n.label.toLowerCase().includes(t.toLowerCase()) : !0
    ) : this.options;
    if (e.length === 0) {
      const n = document.createElement("div");
      n.className = "pvt-picker__no-options", n.textContent = "No options available", this.listContainer.appendChild(n);
    }
    e.forEach((n, i) => {
      const s = document.createElement("div");
      s.className = "pvt-picker__option", n.disabled && s.classList.add("disabled"), this.selected.has(n.value) && s.classList.add("selected"), i === this.focusedIndex && (s.classList.add("focused"), this.selected.has(n.value) && s.classList.add("focused-selected")), s.textContent = n.label, s.addEventListener("click", (o) => {
        if (o.stopPropagation(), !n.disabled) {
          if (this.mode === "single") {
            this.selected.clear(), this.selected.add(n.value);
            const a = this.options.find((l) => l.value === n.value);
            this.input.value = a ? a.label : "", this.input.placeholder = "", this.focusedIndex = -1, this.dropdown.classList.remove("open"), this.syncToSelect(), this.syncFromSelect();
            return;
          } else
            this.selected.has(n.value) ? this.selected.delete(n.value) : this.selected.add(n.value);
          this.focusedIndex = i, this.syncToSelect(), this.renderList(this.mode === "multi" ? this.searchInput.value : this.input.value), this.renderChips();
        }
      }), this.listContainer.appendChild(s);
    });
  }
  handleKeyDown(t) {
    var i;
    if (!this.dropdown.classList.contains("open")) return;
    const e = this.searchable ? this.options.filter(
      (s) => {
        var o;
        return (o = this.searchInput) != null && o.value ? s.label.toLowerCase().includes(this.searchInput.value.toLowerCase()) : !0;
      }
    ) : this.options, n = e.length;
    switch (t.key) {
      case "ArrowDown":
        if (t.preventDefault(), this.mode === "multi")
          for (let s = 0; s < n; s++) {
            const o = (this.focusedIndex + 1 + s) % n;
            if (!this.selected.has(e[o].value)) {
              this.focusedIndex = o, this.updateFocusedOption();
              break;
            }
          }
        else
          this.focusedIndex = (this.focusedIndex + 1) % n, this.updateFocusedOption();
        break;
      case "ArrowUp":
        if (t.preventDefault(), this.mode === "multi")
          for (let s = 0; s < n; s++) {
            const o = this.focusedIndex - 1 - s < 0 ? n + this.focusedIndex - 1 - s : this.focusedIndex - 1 - s;
            if (!this.selected.has(e[o].value)) {
              this.focusedIndex = o, this.updateFocusedOption();
              break;
            }
          }
        else
          this.focusedIndex = this.focusedIndex <= 0 ? n - 1 : this.focusedIndex - 1, this.updateFocusedOption();
        break;
      case "Enter":
        if (this.focusedIndex >= 0 && this.focusedIndex < n) {
          t.preventDefault();
          const s = e[this.focusedIndex];
          if (!s.disabled) {
            if (this.mode === "multi" && this.selected.has(s.value)) return;
            if (this.mode === "single" && this.selected.has(s.value)) {
              this.focusedIndex = -1, this.dropdown.classList.remove("open");
              return;
            }
            if (this.mode === "single") {
              this.selected.clear(), this.selected.add(s.value);
              const o = this.options.find((a) => a.value === s.value);
              this.input.value = o ? o.label : "", this.input.placeholder = "", this.focusedIndex = -1, this.dropdown.classList.remove("open"), this.syncToSelect(), this.syncFromSelect();
            } else
              this.selected.has(s.value) ? this.selected.delete(s.value) : this.selected.add(s.value), this.focusedIndex = -1, this.syncToSelect(), this.renderList(((i = this.searchInput) == null ? void 0 : i.value) || ""), this.renderChips();
          }
        }
        break;
      case "Escape":
        t.preventDefault(), this.dropdown.classList.remove("open");
        break;
    }
  }
  updateFocusedOption() {
    const t = this.listContainer.querySelectorAll(".pvt-picker__option");
    if (t.forEach((e, n) => {
      const i = n === this.focusedIndex;
      e.classList.toggle("focused", i), e.classList.toggle("focused-selected", i && e.classList.contains("selected"));
    }), this.focusedIndex >= t.length) {
      this.focusedIndex = -1;
      return;
    }
    if (this.focusedIndex >= 0) {
      const e = this.listContainer.children[this.focusedIndex];
      e == null || e.scrollIntoView({ block: "nearest" });
    }
  }
  renderChips() {
    if (this.mode !== "single") {
      if (this.chipsContainer.innerHTML = "", this.selected.size > 0)
        this.selected.forEach((t) => {
          const e = this.options.find((o) => o.value === t);
          if (!e) return;
          const n = document.createElement("span");
          n.className = "pvt-picker__chip";
          const i = document.createElement("span");
          i.className = "pvt-picker__chip-label", i.textContent = e.label;
          const s = document.createElement("button");
          s.className = "pvt-picker__chip-remove", s.textContent = "×", s.setAttribute("aria-label", `Remove ${e.label}`), s.addEventListener("click", (o) => {
            o.stopPropagation(), this.selected.delete(t), this.syncToSelect(), this.renderChips(), this.renderList(this.searchInput.value);
          }), n.appendChild(i), n.appendChild(s), this.chipsContainer.appendChild(n);
        });
      else {
        const t = document.createElement("span");
        t.className = "pvt-picker__placeholder", t.textContent = this.select.getAttribute("placeholder") || "Select...", this.chipsContainer.appendChild(t);
      }
      this.clearButton.style.display = this.selected.size > 0 ? "" : "none";
    }
  }
  syncToSelect() {
    Array.from(this.select.options).forEach((t) => {
      t.selected = this.selected.has(t.value);
    }), this.select.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  syncFromSelect() {
    if (this.selected.clear(), Array.from(this.select.selectedOptions).forEach((t) => {
      if (!t.value) return;
      this.options.find((n) => n.value === t.value) && this.selected.add(t.value);
    }), this.mode === "single") {
      if (this.selected.size === 1) {
        const t = this.selected.values().next().value, e = this.options.find((n) => n.value === t);
        e && (this.input.value = e.label, this.input.placeholder = "");
      } else {
        const t = this.select.getAttribute("placeholder") || "Select...";
        this.input.value = "", this.input.placeholder = t;
      }
      this.mode === "single" && (this.singleCloseButton.style.display = this.selected.size > 0 ? "" : "none");
    }
    this.renderChips(), this.renderList(this.input.value);
  }
  /**
   * Manual sync — call after programmatically changing options on the original <select>.
   * Also watches DOM mutations automatically, but this is useful for JS-driven changes
   * that don't touch the DOM (e.g., adding/removing <option> elements via framework).
   */
  sync() {
    this.syncFromSelect();
  }
  clear() {
    this.selected.clear(), this.syncToSelect(), this.syncFromSelect(), this.renderList(this.searchInput.value), this.dropdown.classList.remove("open");
  }
  /**
   * Get the currently selected values.
   */
  getValues() {
    return Array.from(this.selected);
  }
  /**
   * Programmatically set selected values.
   */
  setValues(t) {
    if (this.selected = new Set(t), this.syncToSelect(), this.mode === "single" && this.selected.size === 1) {
      const e = this.selected.values().next().value, n = this.options.find((i) => i.value === e);
      n && (this.input.value = n.label, this.input.placeholder = "");
    }
    this.renderChips(), this.renderList(this.input.value);
  }
  /**
   * Access the underlying PivotickPicker from the original <select> element.
   * Usage: (element as HTMLSelectElement)._picker
   */
  get picker() {
    return this;
  }
}
class De {
  static createForm(t) {
    const e = document.createElement("form");
    return e.className = "pvt-form", t.fields.forEach((n) => {
      e.appendChild(this.createField(n));
    }), e;
  }
  static getValues(t) {
    const e = {};
    return t.querySelectorAll("[data-field-key]").forEach((i) => {
      const s = i.getAttribute("data-field-key");
      switch (i.getAttribute("data-field-type")) {
        case "text":
          e[s] = i.value || void 0;
          break;
        case "select": {
          const a = i;
          e[s] = a.value || void 0, a.dataset.fieldValuesAreBoolean === "yes" && e[s] !== void 0 && e[s] === "true" && (e[s] = !0);
          break;
        }
        case "multiselect": {
          const a = i;
          e[s] = Array.from(
            a.selectedOptions
          ).map((l) => l.value).filter((l) => l.length > 0), a.dataset.fieldValuesAreBoolean === "yes" && e[s].map((l) => l !== void 0 && l === "true" ? !0 : l);
          break;
        }
        case "checkbox":
          e[s] = i.checked;
          break;
        case "numberRange": {
          const a = i.querySelector(".min").value, l = i.querySelector(".max").value;
          e[s] = {
            min: a ? Number(a) : void 0,
            max: l ? Number(l) : void 0
          };
          break;
        }
      }
    }), e;
  }
  static clear(t) {
    t.reset();
  }
  // Push values back into the form controls (inverse of getValues). Used to reflect
  // filters set programmatically. Fields absent from `values` are cleared/deselected.
  static setValues(t, e) {
    t.querySelectorAll("[data-field-key]").forEach((i) => {
      var l;
      const s = i.getAttribute("data-field-key"), o = i.getAttribute("data-field-type"), a = e[s];
      switch (o) {
        case "text": {
          const d = i;
          d.value = a != null ? String(a) : "";
          break;
        }
        case "select":
        case "multiselect": {
          const d = i, c = new Set(
            (Array.isArray(a) ? a : a != null ? [a] : []).map(String)
          );
          Array.from(d.options).forEach((u) => {
            u.selected = u.value !== "" && c.has(u.value);
          }), (l = d._picker) == null || l.sync();
          break;
        }
        case "checkbox": {
          const d = i;
          d.checked = a === !0;
          break;
        }
        case "numberRange": {
          const d = a && typeof a == "object" && !Array.isArray(a) ? a : {}, c = i.querySelector(".min"), u = i.querySelector(".max");
          c.value = d.min != null ? String(d.min) : "", u.value = d.max != null ? String(d.max) : "";
          break;
        }
      }
    });
  }
  static createField(t) {
    const e = document.createElement("div");
    e.className = "pvt-form-element";
    const n = document.createElement("label");
    switch (n.htmlFor = `pvt-form-element-${t.key}`, n.textContent = this.niceLabelFromKey(t.label), e.appendChild(n), t.type) {
      case "select":
        e.appendChild(this.createSelect(t));
        break;
      case "multiselect":
        e.appendChild(this.createMultiSelect(t));
        break;
      case "checkbox":
        e.appendChild(this.createCheckbox(t));
        break;
      case "text":
        e.appendChild(this.createText(t));
        break;
      case "numberRange":
        e.appendChild(this.createNumberRange(t));
        break;
    }
    return e;
  }
  static baseAttrs(t, e) {
    t.id = `pvt-form-element-${e.key}`, t.setAttribute("data-field-key", e.key), t.setAttribute("data-field-type", e.type);
  }
  static buildSelect(t) {
    var n;
    const e = document.createElement("select");
    if (this.baseAttrs(e, t), t.allowEmpty) {
      const i = document.createElement("option");
      i.value = "", i.textContent = "", i.selected = !0, e.appendChild(i);
    }
    return t.valuesAreBoolean && e.setAttribute("data-field-values-are-boolean", "yes"), (n = t.options) == null || n.forEach((i) => {
      const s = document.createElement("option");
      s.value = i.value, s.textContent = i.label, t.defaultValue && (Array.isArray(t.defaultValue) ? t.defaultValue.includes(i.value) : t.defaultValue === i.value) && (s.selected = !0), e.appendChild(s);
    }), e;
  }
  static createSelect(t) {
    const e = this.buildSelect(t);
    return requestAnimationFrame(() => {
      e._picker = new Es(e, {});
    }), e;
  }
  static createMultiSelect(t) {
    const e = this.buildSelect(t);
    return e.multiple = !0, requestAnimationFrame(() => {
      e._picker = new Es(e, {});
    }), e;
  }
  static createCheckbox(t) {
    const e = document.createElement("input");
    return e.type = "checkbox", t.defaultValue === !0 && (e.checked = !0), this.baseAttrs(e, t), e;
  }
  static createText(t) {
    const e = document.createElement("input");
    return e.type = "text", e.placeholder = t.placeholder ?? "", this.baseAttrs(e, t), t.defaultValue && (e.value = String(t.defaultValue)), e;
  }
  static createNumberRange(t) {
    const e = document.createElement("div");
    e.className = "pvt-number-range", this.baseAttrs(e, t);
    const n = document.createElement("input");
    n.type = "number", n.placeholder = "Min", n.className = "min";
    const i = document.createElement("input");
    i.type = "number", i.placeholder = "Max", i.className = "max";
    const s = typeof t.defaultValue == "object" && t.defaultValue !== null ? t.defaultValue : void 0;
    return (s == null ? void 0 : s.min) != null && (n.value = String(s.min)), (s == null ? void 0 : s.max) != null && (i.value = String(s.max)), e.append(n, i), e;
  }
  static niceLabelFromKey(t) {
    return t.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ").trim().split(" ").map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(" ");
  }
}
function Si(r, t) {
  var l, d;
  const n = V(`
        <div class="main-container">
            <div class="icon-container"></div>
            <div class="nodeinfo-container">
                <div class="nodeinfo-name"></div>
                <div class="nodeinfo-subtitle"></div>
            </div>
        </div>
    `), i = n.querySelector(".nodeinfo-name"), s = n.querySelector(".nodeinfo-subtitle");
  i && (i.textContent = se(r, t.getOptions().mainHeader)), s && (s.textContent = hi(r, t.getOptions().mainHeader) ?? ""), (l = n.querySelector(".icon-container")) == null || l.appendChild($e(r, { size: 42, className: "icon" }));
  const o = jc(r, t), a = document.querySelector("#inspect-node-modal");
  a && ((d = a.__modalInstance) == null || d.destroy()), t.createModal({
    id: "inspect-node-modal",
    rawHeader: !0,
    header: n,
    body: o,
    rawBody: !0,
    buttons: null,
    position: "top",
    size: "xl",
    noBodyPadding: !0
  });
}
function $c(r, t) {
  const e = V('<div class="inspect-node-properties-tab"></div>'), n = Ct(r, t.getOptions().propertiesPanel);
  return e.appendChild(Mt(n, r, { layout: "columns" })), e;
}
function Uc(r) {
  const t = document.createElement("div");
  t.classList.add("inspect-node-json-tab");
  let e = r.getData();
  try {
    e = JSON.parse(JSON.stringify(e));
  } catch {
  }
  return t.appendChild(lc(e)), t;
}
function jc(r, t) {
  const e = document.createElement("div");
  e.classList.add("inspect-node-modal-body");
  const n = yr(
    [
      {
        id: "properties",
        label: "Properties",
        content: $c(r, t)
      },
      {
        id: "json",
        label: "JSON",
        content: Uc(r)
      }
    ],
    "properties"
  );
  return e.appendChild(n), e;
}
const qc = "Filter Graph";
class Wc extends X {
  constructor(e) {
    super(e);
    h(this, "graphFilter");
    h(this, "formOptions");
    h(this, "filteringForm");
    h(this, "manuallyFilteredContainer");
    this.formOptions = [];
  }
  onMount(e) {
    e && (this.build(), this.graphFilter && e.appendChild(this.graphFilter));
  }
  onDestroy() {
    var e;
    (e = this.graphFilter) == null || e.remove(), this.graphFilter = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  build() {
    return this.graphFilter = document.createElement("div"), this.graphFilter.classList.add("pvt-graph-filter-container"), this.uiManager.graph.on("dataBatchChanged", () => {
      this.rebuild();
    }), this.uiManager.graph.queryEngine.on("filterChange", (e) => {
      this.updateUIFilterButtonContent(e), this.updateUIFilterHiddenNodes(), this.syncFormFromActiveFilters(e);
    }), requestAnimationFrame(() => {
      this.updateUIFilterButtonContent({}), this.updateUIFilterHiddenNodes();
    }), this.graphFilter;
  }
  rebuild() {
    var d;
    if (!this.graphFilter) return;
    const e = P({
      variant: "secondary",
      text: "Reset",
      size: "xs",
      svgIcon: Bo,
      title: "Clear all attribute filters",
      onClick: () => {
        De.clear(i);
        const c = {};
        this.filterGraph(c);
      }
    }), n = this.getAvailableNodeAttributes();
    this.formOptions = Object.entries(n).map(([c, u]) => {
      let p = "text", g = "exact", f = !1;
      u.values ? u.values && u.values.every((y) => typeof y == "string" && y.length < 64) ? u.values.length > 2 ? (p = "multiselect", g = "partial") : p = "select" : u.values.every((y) => typeof y == "boolean") && (p = "select", u.values = ["true", "false"], f = !0) : p = "numberRange";
      const v = {
        key: c,
        label: c,
        type: p,
        matchMode: g,
        valuesAreBoolean: f
      };
      return (v.type == "select" || v.type == "multiselect") && u.values && (v.options = u.values.map((y) => ({
        label: y,
        value: y
      })), v.allowEmpty = !0), v;
    });
    const i = De.createForm({
      fields: this.formOptions
    });
    this.filteringForm = i;
    const s = P({
      variant: "primary",
      text: "Filter Graph",
      size: "block",
      svgIcon: qs,
      onClick: () => {
        const c = De.getValues(i);
        this.filterGraph(c);
      }
    }), o = x("div", { class: "pvt-filter-section" }), a = x("div", { class: "pvt-filter-section-head" }, [
      x("span", { class: "pvt-filter-section-label" }, ["Attributes"]),
      e
    ]);
    o.appendChild(a), o.appendChild(i), o.appendChild(s), this.manuallyFilteredContainer = V(`<div class="pvt-hidden-nodes-container">
                <div class="pvt-filter-section-head">
                    <span class="pvt-filter-section-label">Hidden nodes</span>
                </div>
                <div class="pvt-hidden-nodes-container-list"></div>
            </div>`);
    const l = P({
      variant: "secondary",
      text: "Show all",
      size: "xs",
      svgIcon: lt,
      onClick: () => {
        this.uiManager.graph.queryEngine.clearNodeExclusions();
      },
      title: "Restore manually hidden nodes"
    });
    (d = this.manuallyFilteredContainer.querySelector(".pvt-filter-section-head")) == null || d.appendChild(l), this.graphFilter.appendChild(o), this.graphFilter.appendChild(this.manuallyFilteredContainer);
  }
  // Reflect the active filters (e.g. set via queryEngine.setFilter from code) back into the
  // form controls; without this the panel only updates on dataBatchChanged and stays empty.
  syncFormFromActiveFilters(e) {
    if (!this.filteringForm) return;
    const n = {};
    for (const [i, s] of Object.entries(e))
      i === "manuallyHidden" || s === void 0 || (n[i] = s.value);
    De.setValues(this.filteringForm, n);
  }
  updateUIFilterButtonContent(e) {
    var a, l;
    const n = (a = this.uiManager.mainHeader) == null ? void 0 : a.filterButton, i = n == null ? void 0 : n.querySelector(".action-text");
    if (!i) return;
    i.innerHTML = "";
    let s = Object.keys(e).length;
    const o = (l = e.manuallyHidden) == null ? void 0 : l.value;
    if (Array.isArray(o) && o.length == 0 && s--, n == null || n.classList.toggle("pvt-filter-on", s > 0), s > 0) {
      const d = this.uiManager.graph.queryEngine.getHiddenNodeCount(), c = x("span", { class: "pvt-filter-status" }, [
        x("span", { class: "pvt-filter-count" }, [`${s}`]),
        x("span", { class: "pvt-filter-word" }, [s > 1 ? "active filters" : "active filter"])
      ]);
      d > 0 && c.appendChild(x("span", { class: "pvt-filter-hidden" }, [`${d} hidden`])), i.appendChild(c);
    } else
      i.textContent = qc;
  }
  updateUIFilterHiddenNodes() {
    if (!this.manuallyFilteredContainer) return;
    const e = this.manuallyFilteredContainer.querySelector(".pvt-hidden-nodes-container-list");
    e && (this.uiManager.graph.queryEngine.getExcludedNodeCount() > 0 ? (this.manuallyFilteredContainer.classList.remove("hidden"), e.innerHTML = "", this.uiManager.graph.queryEngine.getExcludedNodes().forEach((n) => {
      const i = Object.keys(n.getData()).length, s = n.getEdgesIn().length + n.getEdgesOut().length, o = P({
        variant: "secondary",
        text: "Show node",
        size: "sm",
        title: "Restore manually hidden node",
        svgIcon: lt,
        onClick: () => {
          this.uiManager.graph.queryEngine.includeNode(n);
        }
      }), a = x(
        "span",
        {
          class: "subtext"
        },
        [
          x("span", { class: "nodeinfo" }, [i.toString(), B({ svgIcon: Qo })]),
          "·",
          x("span", { class: "nodeinfo" }, [s.toString(), B({ svgIcon: ze(24) })])
        ]
      ), l = se(n, this.uiManager.getOptions().mainHeader), d = x(
        "div",
        {
          class: "hidden-node",
          role: "button",
          tabindex: "0",
          "aria-label": `Inspect ${l}`
        },
        [
          l,
          a,
          o
        ]
      );
      d.addEventListener("mouseenter", (u) => {
        var p;
        (p = this.uiManager.tooltip) == null || p.openForNodeOnElement(u, n);
      }), d.addEventListener("mouseleave", () => {
        var u;
        (u = this.uiManager.tooltip) == null || u.hide();
      });
      const c = () => {
        var u;
        (u = this.uiManager.tooltip) == null || u.hide(), Si(n, this.uiManager);
      };
      d.addEventListener("click", (u) => {
        u.target.closest("button") || c();
      }), d.addEventListener("keydown", (u) => {
        (u.key === "Enter" || u.key === " ") && (u.preventDefault(), c());
      }), e == null || e.appendChild(d);
    })) : this.manuallyFilteredContainer.classList.add("hidden"));
  }
  getAvailableNodeAttributes() {
    const e = /* @__PURE__ */ new Map();
    this.uiManager.graph.getMutableNodes().forEach((s) => {
      Object.entries(s.getData()).forEach(([o, a]) => {
        if (a == null) return;
        let l = e.get(o);
        l || (l = {
          numbers: /* @__PURE__ */ new Set(),
          values: /* @__PURE__ */ new Set()
        }), Number.isInteger(a) ? l.numbers.add(a) : l.values.add(a), e.set(o, l);
      });
    });
    const i = /* @__PURE__ */ new Map();
    return e.forEach((s, o) => {
      const a = {};
      s.values ? a.values = [.../* @__PURE__ */ new Set([...s.values, ...s.numbers])] : s.number && (a.range = [Math.min(...s.numbers), Math.max(...s.numbers)]), i.set(o, a);
    }), Object.fromEntries(i);
  }
  filterGraph(e) {
    const n = this.getActiveFilters(e), i = {}, s = Object.fromEntries(this.formOptions.map((o) => [o.key, o]));
    for (const [o, a] of Object.entries(n)) {
      const l = {
        value: a,
        matchMode: s[o].matchMode
      };
      a !== void 0 && (i[o] = l);
    }
    this.uiManager.graph.queryEngine.resetFilters(), this.uiManager.graph.queryEngine.setFilters(i);
  }
  getActiveFilters(e) {
    const n = {};
    for (const [i, s] of Object.entries(e))
      this.isFilterActive(s) ? n[i] = s : n[i] = void 0;
    return n;
  }
  isFilterActive(e) {
    return e === void 0 ? !1 : typeof e == "string" ? e.trim() !== "" : typeof e == "number" || typeof e == "boolean" ? !0 : Array.isArray(e) ? e.length > 0 : typeof e == "object" ? e.min !== void 0 || e.max !== void 0 : !1;
  }
}
class Vc extends X {
  constructor(e) {
    super(e);
    h(this, "graph");
    h(this, "noteManager");
    h(this, "rootElement", null);
    h(this, "listElement", null);
    h(this, "hiddenContainer", null);
    h(this, "refreshCb", () => {
      this.refresh();
    });
    this.graph = this.uiManager.graph, this.noteManager = this.graph.noteManager;
  }
  onMount(e) {
    e && (this.build(), this.rootElement && e.appendChild(this.rootElement));
  }
  onAfterMount() {
    this.bindEvents(), requestAnimationFrame(() => {
      this.refresh();
    });
  }
  onGraphReady() {
  }
  onDestroy() {
    this.rootElement && (this.unbindEvents(), this.rootElement.remove(), this.rootElement = null, this.listElement = null);
  }
  build() {
    return this.rootElement = this.createRoot(), this.refresh(), this.rootElement;
  }
  refresh() {
    this.rootElement && (this.rootElement.innerHTML = "", this.listElement = this.createList(), this.hiddenContainer = this.createHiddenContainer(), this.rootElement.appendChild(this.createHeader()), this.rootElement.appendChild(this.listElement), this.rootElement.appendChild(this.hiddenContainer));
  }
  renderNotes(e, n) {
    if (n.length === 0) {
      const i = document.createElement("div");
      i.classList.add("pvt-note-sidebar-empty"), i.textContent = "No notes yet", e.appendChild(i);
      return;
    }
    n.forEach((i) => {
      const s = this.renderNote(i);
      e == null || e.appendChild(s);
    });
  }
  renderNote(e) {
    var p;
    const n = document.createElement("div");
    n.classList.add("pvt-note-sidebar-item");
    const i = document.createElement("div");
    i.classList.add("pvt-note-sidebar-content");
    const s = document.createElement("span");
    s.classList.add("pvt-note-color-pill"), s.style.backgroundColor = e.color;
    const o = document.createElement("span");
    o.classList.add("pvt-note-sidebar-text"), o.classList.add("pvt-markdown");
    const a = ((p = e.content) == null ? void 0 : p.split(`
`).find((g) => g.trim().length > 0)) ?? "Untitled note", l = El(a);
    o.innerHTML = l, ar(o, this.graph);
    const d = document.createElement("div");
    d.classList.add("pvt-note-sidebar-button-wrapper"), i.appendChild(s), i.appendChild(o);
    let c;
    this.noteManager.isVisible(e) ? c = P({
      variant: "outline-secondary",
      size: "sm",
      title: "Hide note",
      svgIcon: at,
      onClick: () => {
        this.noteManager.hideNote(e);
      }
    }) : c = P({
      variant: "outline-secondary",
      size: "sm",
      title: "Restore hidden note",
      svgIcon: lt,
      onClick: () => {
        this.noteManager.showNote(e);
      }
    });
    const u = P({
      variant: "outline-danger",
      size: "sm",
      title: "Remove note",
      svgIcon: ln,
      onClick: () => {
        this.noteManager.removeNote(e);
      }
    });
    return d.appendChild(c), d.appendChild(u), n.appendChild(i), n.appendChild(d), n;
  }
  bindEvents() {
    this.graph.on("noteAdd", this.refreshCb), this.graph.on("noteRemove", this.refreshCb), this.graph.on("noteChange", this.refreshCb);
  }
  unbindEvents() {
    this.graph.off("noteAdd", this.refreshCb), this.graph.off("noteRemove", this.refreshCb), this.graph.off("noteChange", this.refreshCb);
  }
  // -------------------------------------------------------------------------
  // Element creation
  // -------------------------------------------------------------------------
  createRoot() {
    const e = document.createElement("div");
    return e.classList.add("pvt-note-sidebar"), e;
  }
  createHeader() {
    const e = document.createElement("div");
    return e.classList.add("pvt-note-sidebar-header"), e.appendChild(P({
      variant: "secondary",
      text: "Add Note",
      size: "sm",
      svgIcon: an,
      onClick: () => {
        const n = this.uiManager.graph.renderer, i = this.uiManager.layout.canvas.getBoundingClientRect(), { x: s, y: o } = n.screenToGraphCoordinates(
          i.x + i.width / 2 - 200,
          i.y + i.height / 2 - 170
        ), a = new ve({
          content: "This is not a note.",
          x: s,
          y: o
        });
        this.uiManager.graph.noteManager.addNote(a);
      }
    })), e.appendChild(P({
      variant: "secondary",
      text: "Hide all",
      size: "sm",
      title: "Hide all notes",
      svgIcon: at,
      onClick: () => {
        this.noteManager.hideAll();
      }
    })), e;
  }
  createList() {
    const e = document.createElement("div");
    e.classList.add("pvt-note-sidebar-list");
    const n = this.noteManager.getVisibleNotes();
    return this.renderNotes(e, n), e;
  }
  createHiddenContainer() {
    var o;
    const e = V(`<div class="pvt-hidden-nodes-container">
                <h4>Hidden notes</h4>
                <div class="pvt-hidden-nodes-container-list"></div>
            </div>`), n = P({
      variant: "secondary",
      text: "Show all notes",
      size: "sm",
      style: "align-self: end;",
      svgIcon: lt,
      onClick: () => {
        this.noteManager.showAll();
      },
      title: "Restore hidden notes"
    });
    (o = e.querySelector("h4")) == null || o.appendChild(n), this.noteManager.getHiddenNotes().length == 0 && e.classList.add("hidden");
    const i = this.noteManager.getHiddenNotes(), s = e.querySelector(".pvt-hidden-nodes-container-list");
    return this.renderNotes(s, i), e;
  }
}
class Yc extends X {
  constructor(e) {
    super(e);
    h(this, "mainheader");
    h(this, "searchBoxButton");
    h(this, "filterButton");
    h(this, "noteButton");
    h(this, "undoButton");
    h(this, "redoButton");
    h(this, "filteringSlidepanel");
    h(this, "noteSlidepanel");
    h(this, "searchModal");
    h(this, "noteSidebar");
  }
  onMount(e) {
    if (!e) return;
    this.mainheader = document.createElement("div"), this.mainheader.className = "pvt-mainheader-elements";
    const n = document.createElement("template");
    n.innerHTML = `
  <div id="pvt-searchbox-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Search for a node">
    <div class="action-container">
        <span class="icon-container">${si}</span>
        <span class="action-text">Search</span>
        ${Vt("Shift+J").outerHTML}
    </div>
  </div>`, this.searchBoxButton = n.content.firstElementChild, this.mainheader.appendChild(this.searchBoxButton);
    const i = document.createElement("template");
    i.innerHTML = `
  <div id="pvt-filter-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Filter the graph">
    <div class="action-container">
        <span class="icon-container">${qs}</span>
        <span class="action-text">Filter Graph</span>
        ${Vt("Shift+K").outerHTML}
    </div>
  </div>`, this.filterButton = i.content.firstElementChild, this.mainheader.appendChild(this.filterButton);
    const s = document.createElement("template");
    s.innerHTML = `
  <div id="pvt-notes-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Notes">
    <div class="action-container">
        <span class="icon-container">${an}</span>
        <span class="action-text">Notes</span>
        ${Vt("Shift+N").outerHTML}
    </div>
  </div>`, this.noteButton = s.content.firstElementChild, this.mainheader.appendChild(this.noteButton);
    const o = document.createElement("template");
    o.innerHTML = `
  <div class="pvt-right">
    <div class="pvt-undoredo-group">
        <button id="pvt-undo-button" class="pvt-button-undo" disabled>
            ${zo}
        </button>
        <button id="pvt-redo-button" class="pvt-button-redo" disabled>
            ${Ho}
        </button>
    </div>
  </div>`;
    const a = o.content.firstElementChild;
    this.undoButton = a.querySelector("#pvt-undo-button") ?? void 0, this.redoButton = a.querySelector("#pvt-redo-button") ?? void 0, this.mainheader.appendChild(a), e.appendChild(this.mainheader);
  }
  onDestroy() {
    var e;
    (e = this.mainheader) == null || e.remove(), this.mainheader = void 0;
  }
  onAfterMount() {
    const { filterButton: e, noteButton: n, searchBoxButton: i } = this;
    if (!e || !n) return;
    this.track(this.uiManager.keyManager.register({ key: "Shift+J", callback: () => {
      var o;
      return (o = this.searchBoxButton) == null ? void 0 : o.click();
    } })), this.track(this.uiManager.keyManager.register({ key: "Shift+K", callback: () => {
      var o;
      return (o = this.filterButton) == null ? void 0 : o.click();
    } })), this.track(this.uiManager.keyManager.register({ key: "Shift+N", callback: () => {
      var o;
      return (o = this.noteButton) == null ? void 0 : o.click();
    } }));
    const s = new Wc(this.uiManager);
    this.filteringSlidepanel = this.uiManager.createSlidepanel({
      header: "Graph Filters",
      body: s.build()
    }), this.listen(e, "click", () => {
      var o;
      (o = this.noteSlidepanel) == null || o.close(), this.filteringSlidepanel.toggle();
    }), this.noteSidebar = new Vc(this.uiManager), this.noteSlidepanel = this.uiManager.createSlidepanel({
      header: "Notes",
      body: this.noteSidebar.build()
    }), this.listen(n, "click", () => {
      var o;
      (o = this.filteringSlidepanel) == null || o.close(), this.noteSlidepanel.toggle();
    }), this.addChild(this.noteSidebar), i && this.listen(i, "click", async () => {
      const o = await xi(this.uiManager);
      o && this.uiManager.graph.selectElement(o);
    });
    for (const o of [i, e, n])
      o && this.listen(o, "keydown", (a) => {
        const l = a;
        (l.key === "Enter" || l.key === " ") && (l.preventDefault(), o.click());
      });
  }
}
class Xc extends X {
  constructor(e, n) {
    super(e);
    h(this, "options");
    h(this, "overlay");
    h(this, "modal");
    h(this, "header");
    h(this, "body");
    h(this, "footer");
    h(this, "DEFAULT_HEADER", null);
    h(this, "DEFAULT_BODY", "");
    h(this, "DEFAULT_BUTTON_CONFIG", {
      text: "Ok",
      variant: "primary",
      onClick: (e, n) => {
        n();
      }
    });
    this.options = n, this.options.header || (this.options.header = this.DEFAULT_HEADER), this.options.body || (this.options.body = this.DEFAULT_BODY), !this.options.buttons && this.options.buttons !== null && (this.options.buttons = [this.DEFAULT_BUTTON_CONFIG]), this.options.position = n.position ?? "center";
  }
  onMount(e) {
    if (!e) return;
    this.overlay = document.createElement("div"), this.overlay.className = "pvt-modal-overlay", this.overlay.classList.add(
      this.options.position === "center" ? "pvt-modal-overlay-center" : "pvt-modal-overlay-top"
    ), this.overlay.addEventListener("click", (i) => {
      i.target === this.overlay && this.destroy();
    }), this.modal = document.createElement("div"), this.modal.className = "pvt-modal", this.modal.__modalInstance = this, this.options.id && (this.modal.id = this.options.id);
    const n = this.options.size ?? "md";
    if (this.modal.classList.add(`pvt-modal-${n}`), this.options.header != null) {
      this.header = document.createElement("div"), this.header.className = "pvt-modal__header", this.setHeader(this.options.header), this.modal.appendChild(this.header);
      const i = P({
        text: "×",
        variant: "outline-primary",
        size: "sm",
        onClick: () => {
          this.hide();
        },
        style: "margin-left: auto;"
      });
      this.header.appendChild(i);
    }
    this.body = document.createElement("div"), this.body.className = "pvt-modal__body", this.setBody(this.options.body), this.options.noBodyPadding ? this.body.style.padding = "0" : this.body.style.padding = "", this.modal.appendChild(this.body), this.options.buttons != null && (this.footer = document.createElement("div"), this.footer.className = "pvt-modal__footer", this.setButtons(this.options.buttons), this.modal.appendChild(this.footer)), this.overlay.appendChild(this.modal), e.appendChild(this.overlay);
  }
  onDestroy() {
    this.hide();
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  setButtons(e) {
    !this.modal || !this.footer || (this.footer.innerHTML = "", e.forEach((n) => {
      if (typeof n.onClick == "function") {
        const s = n.onClick;
        n.onClick = (o, a) => {
          s && s(o, a);
        }, n.onClickArgs = [this.hide.bind(this)];
      }
      const i = P(n);
      this.footer.appendChild(i);
    }));
  }
  setHeader(e) {
    this.header && (this.header.innerHTML = "", e && (this.options.header instanceof HTMLElement ? this.header.appendChild(this.options.header) : this.options.rawHeader ? this.header.innerHTML = this.options.header : this.header.textContent = this.options.header));
  }
  setBody(e) {
    this.body && (this.body.innerHTML = "", e && (e instanceof HTMLElement ? this.body.appendChild(e) : this.options.rawBody ? this.body.innerHTML = e : this.body.textContent = e));
  }
  show() {
    if (!this.modal || !this.overlay) return;
    this.dispatchEvent("show"), this.modal.classList.add("pvt-modal-open");
    const e = (n) => {
      var i;
      n.target === this.modal && ((i = this.modal) == null || i.removeEventListener("animationend", e), this.dispatchEvent("shown"));
    };
    this.modal.addEventListener("animationend", e);
  }
  hide() {
    var e;
    !this.modal || !this.overlay || (this.dispatchEvent("hide"), this.modal.classList.remove("pvt-modal-open"), (e = this.overlay) == null || e.remove(), requestAnimationFrame(() => {
      this.dispatchEvent("hidden");
    }));
  }
  dispatchEvent(e) {
    if (!this.modal) return;
    const n = `pvt-modal-${e}`, i = new CustomEvent(n, { bubbles: !0, cancelable: !0 });
    this.modal.dispatchEvent(i);
    const s = `on${e.charAt(0).toUpperCase()}${e.slice(1)}`, o = this.options[s];
    typeof o == "function" && o();
  }
}
class Kc {
  constructor(t) {
    h(this, "shadowlinkMap", /* @__PURE__ */ new WeakMap());
    h(this, "shadowlinkBoundingBoxesMap", /* @__PURE__ */ new WeakMap());
    h(this, "shadowLinkContainer");
    this.shadowLinkContainer = t;
  }
  setBoundingBox(t, e) {
    this.shadowlinkBoundingBoxesMap.set(t, e);
  }
  addShadowLink(t) {
    var n;
    const e = Bs("path", {
      class: "pivotick-shadowlink"
    });
    this.shadowlinkMap.set(t, e), (n = this.shadowLinkContainer) == null || n.appendChild(e);
  }
  updateShadowLink(t, e, n = !0) {
    const i = this.shadowlinkBoundingBoxesMap.get(t);
    if (!i) return;
    const { width: s, height: o } = i.source, { x: a, y: l, width: d, height: c } = i.target, u = this.shadowlinkMap.get(t);
    let p, g;
    if (e ? (p = e.x, g = e.y) : (p = parseFloat(t.style.left), g = parseFloat(t.style.top)), !!u)
      if (n)
        u.setAttribute("d", `M ${p + s / 2} ${g + o / 2} L ${a + d / 2} ${l + c / 2}`);
      else {
        let f = p;
        const v = g, y = a + d / 2;
        y > p + s / 2 && (f = p + (s - (f - p))), u.setAttribute(
          "d",
          `M ${f} ${v} L ${y} ${l + c / 2}`
        );
      }
  }
  removeShadowLink(t) {
    const e = this.shadowlinkMap.get(t);
    e && e.remove();
  }
}
const Ts = "pvt-image-lightbox-modal";
function br(r, t, e) {
  var o;
  if (!t) return;
  const n = document.querySelector(`#${Ts}`);
  (o = n == null ? void 0 : n.__modalInstance) == null || o.destroy();
  const i = x("img", { class: "pvt-image-lightbox__img", src: t, alt: e ?? "" });
  cr(i);
  const s = x("div", { class: "pvt-image-lightbox" }, [i]);
  r.createModal({
    id: Ts,
    header: e ?? null,
    body: s,
    rawBody: !0,
    buttons: null,
    position: "center",
    noBodyPadding: !0
  });
}
const Zc = {
  enabled: !0,
  allowPinning: !0
};
class Qc extends X {
  constructor(e) {
    super(e);
    h(this, "options");
    h(this, "shadowLinkManager", null);
    h(this, "tooltip");
    h(this, "parentContainer");
    h(this, "shadowLinkContainer");
    // True only when this instance created the shared tooltip/shadowlink singletons.
    h(this, "ownsSharedElements", !1);
    h(this, "mouseX", 0);
    h(this, "mouseY", 0);
    h(this, "x", 0);
    h(this, "y", 0);
    h(this, "triggerX", 0);
    h(this, "triggerY", 0);
    h(this, "hoveredElementID", null);
    h(this, "hoveredElement", null);
    h(this, "showDelay", 400);
    h(this, "hideDelay", 100);
    h(this, "tooltipTimeout", null);
    h(this, "hideTimeout", null);
    h(this, "tooltipDataMap", /* @__PURE__ */ new Map());
    // Auto-fits the live tooltip's title on resize; each pinned copy gets its own.
    h(this, "titleFit");
    h(this, "pinnedTitleFits", /* @__PURE__ */ new Set());
    this.options = st(Zc, this.uiManager.getOptions().tooltip);
  }
  // The tooltip honours its own header/property maps, falling back to the
  // sidebar's mainHeader / propertiesPanel (and then to data defaults).
  headerOptions() {
    const e = this.uiManager.getOptions().mainHeader;
    return {
      ...e,
      nodeHeaderMap: { ...e.nodeHeaderMap, ...this.options.nodeHeaderMap },
      edgeHeaderMap: { ...e.edgeHeaderMap, ...this.options.edgeHeaderMap }
    };
  }
  propertiesOptions() {
    const e = this.uiManager.getOptions().propertiesPanel;
    return {
      ...e,
      nodePropertiesMap: this.options.nodePropertiesMap ?? e.nodePropertiesMap,
      edgePropertiesMap: this.options.edgePropertiesMap ?? e.edgePropertiesMap
    };
  }
  onMount(e) {
    if (!e) return;
    this.parentContainer = document.querySelector("body");
    const n = this.parentContainer.querySelector(".pvt-tooltip"), i = this.parentContainer.querySelector(".pivotick-shadowlink-container");
    if (n && i) {
      this.tooltip = n, this.shadowLinkContainer = i;
      return;
    }
    const s = document.createElement("template");
    s.innerHTML = '<div class="pvt-tooltip"></div>', this.tooltip = s.content.firstElementChild, this.shadowLinkContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.shadowLinkContainer.setAttribute("class", "pivotick-shadowlink-container"), this.parentContainer.appendChild(this.tooltip), this.parentContainer.appendChild(this.shadowLinkContainer), this.shadowLinkManager = new Kc(this.shadowLinkContainer), this.ownsSharedElements = !0;
  }
  onDestroy() {
    var e, n, i;
    (e = this.titleFit) == null || e.destroy(), this.titleFit = void 0, this.pinnedTitleFits.forEach((s) => s.destroy()), this.pinnedTitleFits.clear(), this.ownsSharedElements && ((n = this.tooltip) == null || n.remove(), (i = this.shadowLinkContainer) == null || i.remove()), this.tooltip = void 0, this.shadowLinkContainer = void 0, this.shadowLinkManager = null;
  }
  onAfterMount() {
    this.tooltip && (this.titleFit = new Jn(this.tooltip));
  }
  // Render an entity title into the header name slot with the sidebar's
  // auto-fit / type-aware treatment (fit runs once the slot has a width).
  renderTitle(e, n, i) {
    var s;
    (s = this.titleFit) == null || s.render(e, n, i);
  }
  onGraphReady() {
    this.tooltip && (this.trackInteraction("nodeHoverIn", this.nodeHovered.bind(this)), this.trackInteraction("nodeHoverOut", this.delayedHide.bind(this)), this.trackInteraction("canvasMousemove", this.updateMousePosition.bind(this)), this.trackInteraction("dragging", (e, n) => {
      this.hoveredElementID === n.id && this.hide(n);
    }), this.trackInteraction("canvasZoom", this.canvasZoomed.bind(this)), this.trackInteraction("simulationSlowTick", this.simulationSlowTick.bind(this)), this.tooltip.addEventListener("mouseenter", () => {
      this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null);
    }), this.tooltip.addEventListener("mouseleave", () => this.hide()), this.tooltip.addEventListener("click", (e) => this.handleLightboxClick(e)));
  }
  updateMousePosition(e) {
    this.mouseX = e.pageX, this.mouseY = e.pageY;
  }
  tooltipCanBeShown() {
    if (!this.tooltip || this.uiManager.graph.simulation.isDragging()) return !1;
    const e = this.uiManager.graph.renderer.getSelectionBox();
    return !(e !== null && e.selectionInProgress() || Math.abs(this.triggerX - this.mouseX) >= 50 || Math.abs(this.triggerY - this.mouseY) >= 50);
  }
  openForNodeOnElement(e, n) {
    this.triggerX = e.pageX, this.triggerY = e.pageY, this.mouseY = e.pageY, this.mouseX = e.pageX, this.hoveredElementID = n.id, this.hoveredElement = n, this.tooltipCanBeShown() && this.show(() => {
      this.createNodeTooltip(n);
    });
  }
  nodeHovered(e, n) {
    this.hoveredElementID !== n.id && (this.triggerX = e.pageX, this.triggerY = e.pageY, this.hoveredElementID = n.id, this.hoveredElement = n, this.tooltipCanBeShown() && this.show(() => {
      this.createNodeTooltip(n);
    }));
  }
  edgeHovered(e, n) {
    this.hoveredElementID !== n.id && (this.triggerX = e.pageX, this.triggerY = e.pageY, this.hoveredElementID = n.id, this.hoveredElement = n, this.tooltipCanBeShown() && this.show(() => {
      if (this.uiManager.graph.simulation.isDragging()) {
        this.hide();
        return;
      }
      this.createEdgeTooltip(n);
    }));
  }
  canvasZoomed() {
    this.updateShadowLinks(!0);
  }
  simulationSlowTick() {
    this.updateShadowLinks(!0);
  }
  buildNodeTooltip(e) {
    const s = V(`
<div class="pvt-tooltip-container">
    <div class="pvt-mainheader-container">
        <div class="pvt-mainheader-nodepreview">
            <span class="pvt-mainheader-topright"></span>
        </div>
        <div class="pvt-mainheader-nodeinfo">
            <div class="pvt-mainheader-nodeinfo-name"></div>
            <div class="pvt-mainheader-nodeinfo-subtitle"></div>
        </div>
        <div class="pvt-mainheader-nodeinfo-action">
        </div>
    </div>
</div>`), o = s.querySelector(".pvt-mainheader-container"), a = s.querySelector(".pvt-mainheader-nodepreview"), l = s.querySelector(".pvt-mainheader-nodeinfo-name"), d = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), c = s.querySelector(".pvt-mainheader-topright"), u = s.querySelector(".pvt-mainheader-nodeinfo-action"), p = Ct(e, this.propertiesOptions());
    if (a.prepend($e(e, { size: 32, removeSelectionHighlight: !0 })), this.renderTitle(l, u, se(e, this.headerOptions())), d.textContent = hi(e, this.headerOptions()), this.options.allowPinning) {
      const b = P({
        title: "Pin Tooltip",
        variant: "outline-primary",
        size: "sm",
        class: "pin-button",
        svgIcon: ot,
        onClick: () => {
          this.pinTooltip(), this.hide();
        }
      });
      c.appendChild(b);
    }
    const g = this.uiManager.getOptions().tooltip.render;
    if (g && typeof g == "function") {
      const b = Ee(g, e);
      if (b) {
        const k = x("div", { class: "pivotick-extra-content-container" }, [
          b
        ]);
        s.appendChild(k);
      }
      return s;
    }
    const f = x("div", { class: "pvt-properties-container" }, [
      Mt(p, e)
    ]);
    s.appendChild(o);
    const v = tn(e);
    v && s.appendChild(this.buildTooltipImage(v, se(e, this.headerOptions()))), s.appendChild(f);
    const y = this.uiManager.getOptions().tooltip.renderNodeExtra;
    if (y && typeof y == "function") {
      const b = Ee(y, e);
      if (b) {
        const k = x("div", { class: "pivotick-extra-content-container" }, [
          b
        ]);
        s.appendChild(k);
      }
    }
    return s;
  }
  // The large in-tooltip picture for an image node. The `data-pvt-lightbox-src` marker lets
  // the delegated click handler open the full-resolution lightbox — and survives the
  // `cloneNode` a pinned tooltip goes through (a direct listener would not).
  buildTooltipImage(e, n) {
    const i = x("img", {
      class: "pvt-tooltip-image",
      src: e,
      alt: n ?? "",
      title: "Click to view full size",
      "data-pvt-lightbox-src": e
    });
    return cr(i), x("div", { class: "pvt-tooltip-image-container" }, [i]);
  }
  // Open the lightbox when a picture carrying `data-pvt-lightbox-src` is clicked, in the live
  // tooltip or a pinned copy (both route here — the copy is wired in `pinTooltip`).
  handleLightboxClick(e) {
    var s;
    const n = (s = e.target) == null ? void 0 : s.closest("[data-pvt-lightbox-src]");
    if (!n) return;
    const i = n.getAttribute("data-pvt-lightbox-src");
    i && br(this.uiManager, i, n.getAttribute("alt") || void 0);
  }
  createNodeTooltip(e) {
    if (!this.tooltip) return !1;
    this.tooltip.innerHTML = "";
    const n = this.buildNodeTooltip(e);
    this.tooltip.appendChild(n);
  }
  createEdgeTooltip(e) {
    if (!this.tooltip) return !1;
    this.tooltip.innerHTML = "";
    const i = `
<div class="pvt-tooltip-container">
    <div class="pvt-mainheader-container">
        <div class="pvt-mainheader-nodepreview">
            ${ze(32)}
            <span class="pvt-mainheader-topright"></span>
        </div>
        <div class="pvt-mainheader-nodeinfo">
            <div class="pvt-mainheader-nodeinfo-name"></div>
            <div class="pvt-mainheader-nodeinfo-subtitle"></div>
        </div>
        <div class="pvt-mainheader-nodeinfo-action">
        </div>
    </div>
</div>`, s = V(i), o = s.querySelector(".pvt-mainheader-container"), a = s.querySelector(".pvt-mainheader-nodeinfo-name"), l = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), d = s.querySelector(".pvt-mainheader-topright"), c = s.querySelector(".pvt-mainheader-nodeinfo-action"), u = P({
      title: "Pin Tooltip",
      variant: "outline-primary",
      size: "sm",
      class: "pin-button",
      svgIcon: ot,
      onClick: () => {
        this.pinTooltip();
      }
    });
    d.appendChild(u);
    const p = this.uiManager.getOptions().tooltip.render;
    if (p && typeof p == "function") {
      const y = Ee(p, e);
      if (y) {
        const b = x("div", { class: "pivotick-extra-content-container" }, [
          y
        ]);
        s.appendChild(b);
      }
      this.tooltip.appendChild(s);
      return;
    }
    const g = Yn(e, this.propertiesOptions());
    this.renderTitle(a, c, St(e, this.headerOptions())), l.textContent = Ys(e, this.headerOptions());
    const f = x("div", { class: "pvt-properties-container" }, [Mt(g, e)]);
    s.appendChild(o), s.appendChild(f);
    const v = this.uiManager.getOptions().tooltip.renderEdgeExtra;
    if (v && typeof v == "function") {
      const y = Ee(v, e);
      if (y) {
        const b = x("div", { class: "pivotick-extra-content-container" }, [
          y
        ]);
        s.appendChild(b);
      }
    }
    this.tooltip.appendChild(s);
  }
  setPosition() {
    var g, f, v, y;
    if (!this.tooltip) return;
    const e = (f = (g = this.hoveredElement) == null ? void 0 : g.getGraphElement()) == null ? void 0 : f.getBoundingClientRect();
    if (!e) return;
    const n = (y = (v = this.uiManager.layout) == null ? void 0 : v.canvas) == null ? void 0 : y.getBoundingClientRect();
    if (!n) return;
    const i = this.uiManager.getOptions().tooltip.setPosition;
    if (i && typeof i == "function") {
      i(this.tooltip, e, n);
      return;
    }
    const s = 20, o = 15, a = n.left + window.scrollX, l = n.top + window.scrollY, d = n.width, c = n.height, u = this.tooltip.offsetWidth, p = this.tooltip.offsetHeight;
    this.x = e.x + e.width + o, this.y = e.y, this.x + u + s > a + d && (this.x = e.x - u - o), this.x < a + o && (this.x = a + o), this.y + p + s > l + c && (this.y -= p), this.y < l + s && (this.y = l + s), this.tooltip.style.left = `${this.x}px`, this.tooltip.style.top = `${this.y}px`;
  }
  delayedHide(e, n) {
    this.hideTimeout && clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => this.hide(n), this.hideDelay);
  }
  hide(e) {
    var n;
    this.tooltip && (this.hideTimeout && clearTimeout(this.hideTimeout), (this.hoveredElement === e || e === void 0) && (this.tooltipTimeout && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = null), this.hoveredElementID = null, this.hoveredElement = null, this.triggerX = -2e3, this.triggerY = -2e3, this.tooltip.classList.remove("shown"), this.tooltip.style.left = "-10000px", (n = this.titleFit) == null || n.clear()));
  }
  show(e) {
    var n;
    (n = this.uiManager.contextMenu) != null && n.visible || (this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(() => {
      var i;
      e && e(), (i = this.tooltip) == null || i.classList.add("shown"), requestAnimationFrame(() => {
        this.setPosition();
      });
    }, this.showDelay));
  }
  pinTooltip() {
    var p, g;
    if (!this.tooltip || !this.parentContainer || !this.hoveredElement) return;
    const e = this.tooltip.cloneNode(!0);
    this.tooltipDataMap.set(e, this.hoveredElement);
    let n;
    e.classList.add("pvt-tooltip-floating"), e.addEventListener("click", (f) => this.handleLightboxClick(f)), e.querySelectorAll(".pvt-prop-copy").forEach((f) => {
      const v = ki(f.dataset.copyText ?? "");
      v.className = f.className, f.replaceWith(v);
    }), (p = e.querySelector(".pin-button")) == null || p.remove();
    const i = P({
      title: "Close Tooltip",
      variant: "outline-danger",
      size: "sm",
      class: ["close-button"],
      svgIcon: oi,
      onClick: () => {
        var f;
        this.tooltipDataMap.delete(e), (f = this.shadowLinkManager) == null || f.removeShadowLink(e), n && (n.destroy(), this.pinnedTitleFits.delete(n)), e.remove();
      }
    }), s = P({
      title: "Focus Element in Graph",
      variant: "outline-primary",
      size: "sm",
      class: ["focus-element"],
      svgIcon: ai,
      onClick: () => {
        const f = this.tooltipDataMap.get(e);
        f && this.uiManager.graph.focusElement(f);
      }
    }), o = P({
      title: "Select Element in Graph",
      variant: "outline-primary",
      size: "sm",
      class: ["select-element"],
      svgIcon: Vo,
      onClick: () => {
        const f = this.tooltipDataMap.get(e);
        f && this.uiManager.graph.selectElement(f);
      }
    }), a = x("div", {
      class: "pvt-tooltip-topbar"
    }, [
      s,
      o,
      i
    ]);
    e.prepend(a);
    const l = this.uiManager.getAppContainer();
    So(e, a, l, {
      onDragStart: (f, v) => {
        var y;
        (y = this.shadowLinkManager) == null || y.setBoundingBox(v, {
          source: v.getBoundingClientRect(),
          target: this.tooltipDataMap.get(v).getGraphElement().getBoundingClientRect()
        });
      },
      onDrag: (f, v) => {
        var y;
        (y = this.shadowLinkManager) == null || y.updateShadowLink(v);
      }
    }), this.parentContainer.appendChild(e), (g = this.shadowLinkManager) == null || g.addShadowLink(e);
    const d = e.querySelector(".pvt-mainheader-nodeinfo-name"), c = e.querySelector(".pvt-mainheader-nodeinfo-action"), u = d == null ? void 0 : d.dataset.titleText;
    d && u !== void 0 && (n = new Jn(e), this.pinnedTitleFits.add(n), n.render(d, c, u));
  }
  updateShadowLinks(e = !1) {
    var n, i;
    for (const [s, o] of this.tooltipDataMap.entries())
      e && ((n = this.shadowLinkManager) == null || n.setBoundingBox(s, {
        source: s.getBoundingClientRect(),
        target: o.getGraphElement().getBoundingClientRect()
      })), (i = this.shadowLinkManager) == null || i.updateShadowLink(s);
  }
}
const Jc = {
  topbar: [
    {
      title: "Pin Node",
      svgIcon: ot,
      variant: "outline-primary",
      visible: (r) => !r.frozen,
      onclick(r, t) {
        t.freeze();
      }
    },
    {
      title: "Unpin Node",
      svgIcon: ri,
      variant: "outline-primary",
      visible: (r) => r.frozen,
      onclick(r, t) {
        t.unfreeze();
      }
    },
    {
      title: "Focus Node",
      svgIcon: ai,
      variant: "outline-primary",
      onclick(r, t) {
        this.uiManager.graph.focusElement(t);
      }
    },
    {
      title: "Hide Node",
      svgIcon: at,
      variant: "outline-danger",
      flushRight: !0,
      visible: (r) => r.visible,
      onclick(r, t) {
        this.uiManager.graph.queryEngine.excludeNode(t);
      }
    }
  ],
  menu: [
    {
      text: "View Image",
      title: "View Image",
      svgIcon: Hs,
      variant: "outline-primary",
      // Only for picture nodes: read the resolved src straight off the rendered node.
      visible: (r) => !!tn(r),
      onclick(r, t) {
        const e = tn(t);
        e && br(this.uiManager, e, se(t, this.uiManager.getOptions().mainHeader));
      }
    },
    {
      text: "Select Neighbors",
      title: "Select Neighbors",
      svgIcon: Fo,
      variant: "outline-primary",
      onclick(r, t) {
        const e = [
          ...t.getConnectedNodes(),
          ...t.getConnectingNodes()
        ].map((n) => ({
          node: n,
          element: n.getGraphElement()
        }));
        this.uiManager.graph.renderer.getGraphInteraction().selectNodes(e);
      }
    },
    {
      text: "Hide Children",
      title: "Hide Children",
      svgIcon: at,
      variant: "outline-primary",
      visible: (r) => r.visible,
      onclick(r, t) {
        t.hide();
      }
    },
    {
      text: "Connect to...",
      title: "Connect to...",
      svgIcon: ze(24),
      variant: "outline-primary",
      visible: (r) => r.visible,
      async onclick(r, t) {
        const e = se(t, this.uiManager.graph.UIManager.getOptions().mainHeader).trim(), n = document.createElement("div");
        n.textContent = "Select the target node to link with";
        const i = document.createElement("b");
        i.textContent = `"${e}"`, i.classList.add("pvt-ms-1"), n.appendChild(i);
        const s = await xi(this.uiManager.graph.UIManager, n);
        if (!s) return;
        const o = ct(8, "edge-"), a = new ae(o, t, s, {});
        this.uiManager.graph.addEdge(a);
      }
    },
    {
      text: "Expand Node",
      title: "Expand Node",
      svgIcon: Yo,
      variant: "outline-primary",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      visible: (r) => !1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r, t) {
      }
    },
    {
      text: "Inspect Properties",
      title: "Inspect Properties",
      svgIcon: Zo,
      variant: "outline-primary",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      visible: (r) => !0,
      onclick(r, t) {
        Si(t, this.uiManager);
      },
      shortcut: "I"
    }
  ]
}, eh = {
  topbar: [],
  menu: []
}, th = {
  topbar: [
    {
      title: "Pin All",
      svgIcon: ot,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        (this.uiManager.graph.getMutableNodes() ?? []).forEach((e) => {
          e.freeze();
        });
      }
    },
    {
      title: "Unpin All",
      svgIcon: ri,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        var e;
        (this.uiManager.graph.getMutableNodes() ?? []).forEach((n) => {
          n.unfreeze();
        }), (e = this.uiManager.graph.simulation) == null || e.reheat();
      }
    }
  ],
  menu: [
    {
      title: "Add Note",
      text: "Add Note",
      svgIcon: an,
      variant: "outline-primary",
      visible: !0,
      onclick(r) {
        const t = this.uiManager.graph.renderer, { x: e, y: n } = t.screenToGraphCoordinates(
          r.clientX,
          r.clientY
        ), i = new ve({
          content: "This is not a note.",
          x: e,
          y: n
        });
        this.uiManager.graph.noteManager.addNote(i);
      },
      shortcut: "n"
    }
  ]
}, nh = {
  topbar: [
    {
      title: "Hide Note",
      svgIcon: at,
      variant: "outline-danger",
      flushRight: !0,
      visible: (r) => r.visible,
      onclick(r, t) {
        this.uiManager.graph.noteManager.hideNote(t);
      }
    }
  ],
  menu: [
    {
      title: "Remove Note",
      text: "Remove Note",
      svgIcon: ln,
      variant: "outline-danger",
      visible: !0,
      onclick(r, t) {
        this.uiManager.graph.noteManager.removeNote(t);
      },
      shortcut: "n"
    }
  ]
};
class ih extends X {
  constructor(e) {
    super(e);
    h(this, "menu");
    h(this, "visible");
    h(this, "parentContainer");
    h(this, "element", null);
    h(this, "menuNode");
    h(this, "menuEdge");
    h(this, "menuNote");
    h(this, "menuCanvas");
    this.visible = !1, this.menuNode = st(Jc, this.uiManager.getOptions().contextMenu.menuNode ?? {}), this.menuEdge = st(eh, this.uiManager.getOptions().contextMenu.menuEdge ?? {}), this.menuNote = st(nh, this.uiManager.getOptions().contextMenu.menuCanvas ?? {}), this.menuCanvas = st(th, this.uiManager.getOptions().contextMenu.menuCanvas ?? {}), this.wrapOnclickActions();
  }
  onMount(e) {
    if (!e) return;
    this.parentContainer = document.querySelector("body");
    const n = this.parentContainer.querySelector(".pvt-contextmenu");
    if (n) {
      this.menu = n;
      return;
    }
    const i = document.createElement("template");
    i.innerHTML = `
        <div class="pvt-contextmenu">
            <div class="pvt-contextmenu-topbar"></div>
            <div class="pvt-contextmenu-mainmenu"></div>
        </div>
        `, this.menu = i.content.firstElementChild, this.parentContainer.appendChild(this.menu);
  }
  onDestroy() {
    var e;
    (e = this.menu) == null || e.remove(), this.menu = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
    this.trackInteraction("nodeContextmenu", this.nodeClicked.bind(this)), this.trackInteraction("edgeContextmenu", this.edgeClicked.bind(this)), this.trackInteraction("noteContextmenu", this.noteClicked.bind(this)), this.trackInteraction("canvasContextmenu", this.canvasClicked.bind(this)), this.trackInteraction("canvasClick", () => {
      this.hide();
    }), this.trackInteraction("canvasZoom", () => {
      this.hide();
    });
  }
  nodeClicked(e, n) {
    this.menu && (this.element = n, this.createNodeMenu(n), this.setPosition(e), this.show());
  }
  edgeClicked(e, n) {
    this.menu && (this.element = n, this.createEdgeMenu(n), this.setPosition(e), this.show());
  }
  noteClicked(e, n) {
    this.menu && (this.element = n, this.createNoteMenu(n), this.setPosition(e), this.show());
  }
  canvasClicked(e) {
    this.menu && (this.element = null, this.createCanvasMenu(), this.setPosition(e), this.show());
  }
  wrapOnclickActions() {
    [
      this.menuNode.menu,
      this.menuNode.topbar,
      this.menuEdge.menu,
      this.menuEdge.topbar,
      this.menuNote.menu,
      this.menuNote.topbar,
      this.menuCanvas.menu,
      this.menuCanvas.topbar
    ].forEach((e) => {
      e.forEach((n) => {
        this.wrapOnclickAction(n);
      });
    });
  }
  wrapOnclickAction(e) {
    if (e.onclick) {
      const n = e.onclick, i = this;
      e.onclick = function(s, o) {
        var a;
        n.apply(this, [s, o]), (a = i.hide) == null || a.call(i);
      };
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNodeMenu(e) {
    if (!this.menu) return;
    const n = this.menu.querySelector(".pvt-contextmenu-topbar"), i = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    n.innerHTML = "", i.innerHTML = "", n.appendChild(Gt(this, this.menuNode.topbar, this.element)), i.appendChild($t(this, this.menuNode.menu, this.element));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEdgeMenu(e) {
    if (!this.menu) return;
    const n = this.menu.querySelector(".pvt-contextmenu-topbar"), i = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    n.innerHTML = "", i.innerHTML = "", n.appendChild(Gt(this, this.menuEdge.topbar, this.element)), i.appendChild($t(this, this.menuEdge.menu, this.element));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNoteMenu(e) {
    if (!this.menu) return;
    const n = this.menu.querySelector(".pvt-contextmenu-topbar"), i = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    n.innerHTML = "", i.innerHTML = "", n.appendChild(Gt(this, this.menuNote.topbar, this.element)), i.appendChild($t(this, this.menuNote.menu, this.element));
  }
  createCanvasMenu() {
    if (!this.menu) return;
    const e = this.menu.querySelector(".pvt-contextmenu-topbar"), n = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    e.innerHTML = "", n.innerHTML = "", e.appendChild(Gt(this, this.menuCanvas.topbar, this.element)), n.appendChild($t(this, this.menuCanvas.menu, this.element));
  }
  show() {
    var e;
    this.visible || this.menu && ((e = this.uiManager.tooltip) == null || e.hide(), this.menu.classList.add("shown"), this.visible = !0);
  }
  hide() {
    this.visible && this.menu && (this.element = null, this.menu.classList.remove("shown"), this.menu.style.left = "-10000px", this.visible = !1);
  }
  setPosition(e) {
    if (!this.menu) return;
    const n = 10, i = e.pageX, s = e.pageY;
    this.menu.style.left = `${i + n}px`, this.menu.style.top = `${s + n}px`;
  }
}
class sh {
  constructor(t) {
    // A stack per key: the most recent binding wins, and disposing it restores the
    // one underneath — so a plugin binding e.g. Escape shadows the built-in only
    // while it's alive, instead of clobbering it for the lifetime of the UI.
    h(this, "bindings", /* @__PURE__ */ new Map());
    h(this, "container");
    this.container = t;
  }
  /** Register a keybinding (most recent wins). Returns a disposer that restores the previous binding. */
  register(t) {
    const e = this.bindings.get(t.key) ?? [];
    return e.length > 0 && console.warn(`Pivotick: keybinding "${t.key}" is already bound; the new handler shadows it until disposed.`), e.push(t.callback), this.bindings.set(t.key, e), () => {
      const n = this.bindings.get(t.key);
      if (!n) return;
      const i = n.lastIndexOf(t.callback);
      i !== -1 && n.splice(i, 1), n.length === 0 && this.bindings.delete(t.key);
    };
  }
  handleKeyPress(t) {
    const e = t.target, n = document.activeElement;
    if (!this.container.contains(n) || this.isEditableTarget(e))
      return;
    const i = this.getKeyCombo(t), s = this.bindings.get(i), o = s == null ? void 0 : s[s.length - 1];
    o && (t.preventDefault(), o(t));
  }
  isEditableTarget(t) {
    return t ? t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || t.isContentEditable : !1;
  }
  getKeyCombo(t) {
    const e = [];
    return t.ctrlKey && e.push("Ctrl"), t.shiftKey && e.push("Shift"), t.altKey && e.push("Alt"), e.push(t.key), e.join("+");
  }
}
const rh = { select: "pointer", create: null }, oh = { select: !1, create: !0 };
class ah {
  constructor() {
    h(this, "state", {
      mode: "select",
      armedTool: { ...rh },
      panelOpen: { ...oh }
    });
    // Last pointer-mode, so toggling View off returns to Select/Create rather
    // than stranding the rail with nothing active.
    h(this, "lastPointerMode", "select");
    h(this, "listeners", /* @__PURE__ */ new Set());
  }
  getMode() {
    return this.state.mode;
  }
  /** Whether the View flyout is open (i.e. View is the active mode). */
  isViewActive() {
    return this.state.mode === "view";
  }
  /** The armed tool for a pointer-mode (`'pointer'`/`null` = default). */
  getArmedTool(t) {
    return this.state.armedTool[t];
  }
  /** Whether a pointer-mode's tool panel is currently expanded. */
  isPanelOpen(t) {
    return this.state.panelOpen[t];
  }
  /** A copy of the current state (safe to read; mutations don't leak back). */
  getState() {
    return {
      mode: this.state.mode,
      armedTool: { ...this.state.armedTool },
      panelOpen: { ...this.state.panelOpen }
    };
  }
  setMode(t) {
    this.state.mode !== t && (t !== "view" && (this.lastPointerMode = t), this.state.mode = t, this.emit());
  }
  /** Enter View mode, or leave it back to the last pointer-mode. */
  toggleView() {
    this.setMode(this.state.mode === "view" ? this.lastPointerMode : "view");
  }
  /** Arm a tool in a pointer-mode (the rail slot reflects it). Idempotent. */
  armTool(t, e) {
    this.state.armedTool[t] !== e && (this.state.armedTool[t] = e, this.emit());
  }
  /** Expand / collapse a pointer-mode's tool panel. Idempotent. */
  setPanelOpen(t, e) {
    this.state.panelOpen[t] !== e && (this.state.panelOpen[t] = e, this.emit());
  }
  /** Toggle a pointer-mode's tool panel open/closed. */
  toggleToolPanel(t) {
    this.setPanelOpen(t, !this.state.panelOpen[t]);
  }
  /** Subscribe to state changes. Returns an unsubscribe fn (pass to `UIComponent.track`). */
  subscribe(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
  /** Drop every subscriber (called on UI teardown). */
  dispose() {
    this.listeners.clear();
  }
  emit() {
    const t = this.getState();
    for (const e of [...this.listeners]) e(t);
  }
}
class lh extends X {
  constructor(e) {
    super(e);
    h(this, "rail");
    h(this, "buttons", /* @__PURE__ */ new Map());
  }
  onMount(e) {
    if (!e) return;
    this.rail = document.createElement("div"), this.rail.className = "pvt-moderail-rail", this.rail.appendChild(this.makeButton("select", "Select", Zt, "V")), this.rail.appendChild(this.makeButton("create", "Create", Xt, "C")), this.rail.appendChild(this.makeButton("view", "View", lt));
    const n = this.uiManager.getOptions().modeRail, i = !!(n != null && n.explore), s = !!(n != null && n.enrich);
    if (i || s) {
      const o = document.createElement("div");
      o.className = "pvt-moderail-divider", this.rail.appendChild(o), i && this.rail.appendChild(this.makeSoonButton("explore", "Explore", ha)), s && this.rail.appendChild(this.makeSoonButton("enrich", "Enrich", ca));
    }
    e.appendChild(this.rail);
  }
  onAfterMount() {
    var e, n, i;
    (e = this.buttons.get("select")) == null || e.addEventListener("click", () => this.activateOrToggle("select")), (n = this.buttons.get("create")) == null || n.addEventListener("click", () => this.activateOrToggle("create")), (i = this.buttons.get("view")) == null || i.addEventListener("click", () => this.uiManager.modeStore.toggleView()), this.track(this.uiManager.keyManager.register({ key: "v", callback: () => this.activateOrToggle("select"), description: "Select mode / toggle its tools" })), this.track(this.uiManager.keyManager.register({ key: "c", callback: () => this.activateOrToggle("create"), description: "Create mode / toggle its tools" })), this.render(this.uiManager.modeStore.getState()), this.track(this.uiManager.modeStore.subscribe((s) => this.render(s)));
  }
  onDestroy() {
    var e;
    (e = this.rail) == null || e.remove(), this.rail = void 0, this.buttons.clear();
  }
  /** Click the active mode to toggle its panel; click another to switch to it. */
  activateOrToggle(e) {
    const n = this.uiManager.modeStore;
    n.getMode() === e ? n.toggleToolPanel(e) : n.setMode(e);
  }
  /** Highlight the active mode and reflect each pointer-mode's armed tool. */
  render(e) {
    for (const [n, i] of this.buttons) {
      const s = n === e.mode;
      i.classList.toggle("active", s), i.setAttribute("aria-pressed", String(s));
    }
    this.applyFace("select", e.armedTool.select), this.applyFace("create", e.armedTool.create);
  }
  /** Set a mode slot's icon + label to match its armed tool (mode name at rest). */
  applyFace(e, n) {
    const i = this.buttons.get(e);
    if (!i) return;
    const { icon: s, label: o } = this.railFace(e, n), a = i.querySelector(".pvt-moderail-icon"), l = i.querySelector(".pvt-moderail-label");
    a && (a.innerHTML = s), l && (l.textContent = o);
  }
  railFace(e, n) {
    return e === "select" ? n === "lasso" ? { icon: Vs, label: "Lasso" } : { icon: Zt, label: "Select" } : n === "add-edge" ? { icon: ze(20), label: "Edge" } : { icon: Xt, label: "Create" };
  }
  makeButton(e, n, i, s) {
    const o = document.createElement("button");
    return o.type = "button", o.className = "pvt-moderail-button", o.dataset.mode = e, o.title = s ? `${n} (${s})` : n, o.innerHTML = `<span class="pvt-moderail-icon">${i}</span><span class="pvt-moderail-label">${n}</span>`, this.buttons.set(e, o), o;
  }
  makeSoonButton(e, n, i) {
    const s = this.makeButton(e, n, i);
    return s.classList.add("pvt-moderail-soon"), s.disabled = !0, s.title = `${n} — coming soon`, s.innerHTML += '<span class="pvt-moderail-badge">SOON</span>', s;
  }
}
const ch = { select: "V", create: "C" };
class hh extends X {
  constructor(e) {
    super(e);
    h(this, "panel");
    /** The last mode seen, so disarm-on-leave runs only on real mode changes. */
    h(this, "prevMode", null);
    /** Which pointer-mode's tool-set is currently rendered (avoids needless rebuilds). */
    h(this, "renderedMode", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h(this, "cancelPan", (e, n) => {
      (e == null ? void 0 : e.type) === "wheel" || (e == null ? void 0 : e.button) === 1 || n.cancel();
    });
    h(this, "cancelClick", (e, n) => n.cancel());
    // Disarm the lasso once it has produced a selection (see toggleLasso).
    // Deferred to a microtask so it runs *after* the whole pointer gesture has
    // settled — disarming synchronously would clear() the overlay mid-gesture
    // (resetting `drawing`) and cancel the very selection that triggered it.
    // Disarm the lasso once it has produced a selection (see toggleLasso).
    // Deferred past the current gesture: disarming synchronously would drop the
    // cancelClick guard, so the trailing canvas click that follows the drag would
    // clear the selection we just made. A macrotask lets that click be swallowed
    // by the still-armed guard first, then the lasso reverts to Select.
    h(this, "onLassoComplete", () => {
      setTimeout(() => this.disarmLasso(), 0);
    });
  }
  onMount(e) {
    e && (this.panel = document.createElement("div"), this.panel.className = "pvt-toolpanel-panel", e.appendChild(this.panel));
  }
  onAfterMount() {
    this.onState(this.uiManager.modeStore.getState()), this.track(this.uiManager.modeStore.subscribe((s) => this.onState(s)));
    const e = this.uiManager.graph.editing.connectManager, n = (s) => {
      s.getMode() === "node-edge" && this.uiManager.modeStore.armTool("create", "add-edge");
    }, i = (s) => {
      s.getMode() === "node-edge" && this.uiManager.modeStore.armTool("create", null);
    };
    e.on("start", n), e.on("stop", i), this.track(() => {
      e.off("start", n), e.off("stop", i);
    }), this.track(this.uiManager.keyManager.register({
      key: "Escape",
      callback: () => this.cancelActive()
    }));
  }
  onGraphReady() {
    const e = () => this.refreshEnabled();
    this.trackInteraction("selectNode", e), this.trackInteraction("unselectNode", e), this.trackInteraction("selectNodes", e), this.trackInteraction("unselectNodes", e), this.refreshEnabled();
  }
  /** Cancel whatever tool is currently armed (edge-connect / lasso). Panel state is left as-is. */
  cancelActive() {
    const e = this.uiManager.graph.editing.connectManager;
    e.isActive() && e.exitClickConnectionMode(), this.disarmLasso();
  }
  onDestroy() {
    var e;
    this.disarmLasso(), (e = this.panel) == null || e.remove(), this.panel = void 0, this.renderedMode = null, this.prevMode = null;
  }
  /**
   * React to a store change: disarm the tool of any left mode, then render the
   * active pointer-mode's tool-set and reflect its armed tool + open/collapsed
   * state. View has no pointer tools, so the panel is collapsed in View mode.
   * All operations are idempotent — a re-entrant emit (from disarming) converges.
   */
  onState(e) {
    const n = e.mode;
    if (n !== this.prevMode && (this.prevMode = n, n !== "select" && this.disarmLasso(), n !== "create")) {
      const i = this.uiManager.graph.editing.connectManager;
      i.isActive() && i.exitClickConnectionMode();
    }
    if (n === "view") {
      this.setCollapsed(!0);
      return;
    }
    this.renderedMode !== n && this.render(n), this.reflectArmed(e.armedTool[n]), this.setCollapsed(!e.panelOpen[n]);
  }
  /** Show/hide the panel with a short animation (see `.pvt-collapsed` in scss). */
  setCollapsed(e) {
    var n;
    (n = this.panel) == null || n.classList.toggle("pvt-collapsed", e);
  }
  specsFor(e) {
    return e === "select" ? [
      { id: "pointer", label: "Pointer", icon: Zt, kind: "default", run: () => this.disarmLasso() },
      { id: "lasso", label: "Lasso", icon: Vs, kind: "toggle", run: (n) => this.toggleLasso(n) },
      { id: "path", label: "Path select", icon: na, kind: "soon" },
      { id: "invert", label: "Invert selection", icon: ta, kind: "action", run: () => this.invertSelection() }
    ] : [
      { id: "add-node", label: "Add node", icon: Xt, kind: "soon" },
      { id: "add-edge", label: "Add edge", icon: ze(18), kind: "toggle", run: (n) => this.toggleAddEdge(n) },
      { id: "add-note", label: "Add note", icon: an, kind: "action", run: () => this.addNote() },
      { id: "edit", label: "Edit node", icon: Kt, kind: "action", run: () => this.editSelectedNode(), enabled: () => this.hasEditableSelection() }
    ];
  }
  render(e) {
    if (!this.panel) return;
    this.renderedMode = e;
    const n = this.specsFor(e), i = e === "select" ? "Select" : "Create", s = e === "select" ? Zt : Xt;
    this.panel.innerHTML = `<div class="pvt-toolpanel-header"><span class="pvt-toolpanel-icon">${s}</span><span class="pvt-toolpanel-title">${i}</span>` + Vt(ch[e]).outerHTML + "</div>";
    for (const o of n) {
      const a = document.createElement("button");
      a.type = "button", a.className = "pvt-toolpanel-tool", a.dataset.tool = o.id, a.dataset.kind = o.kind, o.kind === "toggle" && a.setAttribute("aria-pressed", "false"), a.innerHTML = `<span class="pvt-toolpanel-icon">${o.icon}</span><span class="pvt-toolpanel-tool-label">${o.label}</span>`, o.kind === "soon" ? (a.disabled = !0, a.classList.add("pvt-toolpanel-soon"), a.title = `${o.label} — coming soon`, a.innerHTML += '<span class="pvt-toolpanel-badge">SOON</span>') : a.addEventListener("click", () => this.onToolClick(e, o)), this.panel.appendChild(a);
    }
    this.refreshEnabled();
  }
  /** Apply each tool's `enabled` predicate to its row (disable + dim when false). */
  refreshEnabled() {
    if (!(!this.panel || !this.renderedMode))
      for (const e of this.specsFor(this.renderedMode)) {
        if (e.kind === "soon" || !e.enabled) continue;
        const n = this.panel.querySelector(`.pvt-toolpanel-tool[data-tool="${e.id}"]`);
        if (!n) continue;
        const i = e.enabled();
        n.disabled = !i, n.classList.toggle("pvt-toolpanel-disabled", !i);
      }
  }
  /** Edit acts on a single selected node, so it's usable only when exactly one is selected. */
  hasEditableSelection() {
    return !!this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode();
  }
  /**
   * Modal picks (Pointer / Lasso / Add-edge) arm the tool and collapse the
   * panel — the rail slot then reflects the choice. One-shot actions just run.
   */
  onToolClick(e, n) {
    var s, o, a;
    const i = this.uiManager.modeStore;
    if (n.kind === "toggle") {
      const l = i.getArmedTool(e) !== n.id;
      (s = n.run) == null || s.call(n, l), i.armTool(e, l ? n.id : this.defaultTool(e)), i.setPanelOpen(e, !1);
    } else n.kind === "default" ? ((o = n.run) == null || o.call(n, !0), i.armTool(e, n.id), i.setPanelOpen(e, !1)) : (a = n.run) == null || a.call(n, !0);
  }
  /** The tool a pointer-mode rests on when nothing special is armed. */
  defaultTool(e) {
    return e === "select" ? "pointer" : null;
  }
  /** Highlight the armed tool row. */
  reflectArmed(e) {
    if (this.panel)
      for (const n of this.panel.querySelectorAll(".pvt-toolpanel-tool")) {
        const i = n.dataset.tool === e;
        n.classList.toggle("active", i), n.dataset.kind === "toggle" && n.setAttribute("aria-pressed", String(i));
      }
  }
  /* ---------- leaf logic (reused from the classic toolbar) ---------- */
  toggleLasso(e) {
    var s;
    const n = (s = this.uiManager.layout) == null ? void 0 : s.canvas, i = this.uiManager.graph.renderer.getGraphInteraction();
    n == null || n.classList.toggle("canvas--lasso-mode", e), this.uiManager.graph.renderer.toggleLassoMode(e), e ? (i.on("canvasBeforeZoom", this.cancelPan), i.on("canvasClick", this.cancelClick), i.on("selectNode", this.onLassoComplete), i.on("selectNodes", this.onLassoComplete)) : (i.off("canvasBeforeZoom", this.cancelPan), i.off("canvasClick", this.cancelClick), i.off("selectNode", this.onLassoComplete), i.off("selectNodes", this.onLassoComplete));
  }
  disarmLasso() {
    this.uiManager.modeStore.getArmedTool("select") === "lasso" && (this.toggleLasso(!1), this.uiManager.modeStore.armTool("select", "pointer"));
  }
  invertSelection() {
    const e = this.uiManager.graph.renderer.getGraphInteraction(), n = new Set(e.getSelectedNodeIDs()), i = this.uiManager.graph.getMutableNodes().filter((s) => !n.has(s.id)).map((s) => ({ node: s, element: s.getGraphElement() }));
    e.selectNodes(i);
  }
  toggleAddEdge(e) {
    const n = this.uiManager.graph.editing.connectManager;
    e && !n.isActive() ? n.startNodeClickConnection() : !e && n.isActive() && n.exitClickConnectionMode();
  }
  addNote() {
    var a;
    const e = this.uiManager.graph.renderer, n = (a = this.uiManager.layout) == null ? void 0 : a.canvas;
    if (!n) return;
    const i = n.getBoundingClientRect(), { x: s, y: o } = e.screenToGraphCoordinates(i.x + i.width / 2, i.y + i.height / 2);
    this.uiManager.graph.noteManager.addNote(new ve({ content: "This is not a note.", x: s, y: o }));
  }
  editSelectedNode() {
    const e = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode();
    e && this.uiManager.graph.editing.openNodeSession(e.node);
  }
}
const jt = [
  { key: "repulsion", label: "Repulsion", desc: "How strongly nodes push each other apart. Higher values spread the graph out.", icon: ua, set: (r, t) => r.setRepulsion(t) },
  { key: "linkDistance", label: "Link distance", desc: "The resting length of edges, in pixels. Higher values place connected nodes further apart.", icon: pa, set: (r, t) => r.setLinkDistance(t) },
  { key: "collisionRadius", label: "Collision radius", desc: "The clear space kept around each node to prevent overlap. Higher values keep nodes further apart.", icon: ga, set: (r, t) => r.setCollisionRadius(t) },
  { key: "friction", label: "Friction", desc: "How quickly node motion is damped. Higher values calm the layout and settle it faster.", icon: fa, set: (r, t) => r.setFriction(t) }
], Hn = ["tight", "loose", "default"], dh = {
  tight: "Compact layout with nodes packed closely together.",
  loose: "Spacious layout with nodes spread further apart.",
  default: "Reset the physics sliders to their default balance."
}, Gn = [
  { id: "force", label: "Force", tree: !1, desc: "Positions nodes freely using the physics simulation." },
  { id: "tree-v", label: "Tree — Vertical", tree: !0, desc: "Hierarchical tree flowing from top to bottom." },
  { id: "tree-h", label: "Tree — Horizontal", tree: !0, desc: "Hierarchical tree flowing from left to right." },
  { id: "tree-r", label: "Tree — Radial", tree: !0, desc: "Hierarchical tree radiating out from a central root." }
];
class uh extends X {
  constructor(e) {
    super(e);
    h(this, "flyout");
    h(this, "layoutSelect");
    h(this, "runButton");
    h(this, "physicsCard");
    h(this, "sliders", /* @__PURE__ */ new Map());
    h(this, "sliderValues", /* @__PURE__ */ new Map());
    h(this, "presetButtons", /* @__PURE__ */ new Map());
    /** Closures that push each toggle's live state onto its button — run once the simulation exists. */
    h(this, "toggleSync", []);
  }
  get sim() {
    return this.uiManager.graph.simulation;
  }
  onMount(e) {
    e && (this.flyout = document.createElement("div"), this.flyout.className = "pvt-viewflyout-panel", this.flyout.innerHTML = this.template(), e.appendChild(this.flyout));
  }
  onAfterMount() {
    if (this.flyout) {
      this.layoutSelect = this.flyout.querySelector(".pvt-viewflyout-layout-select"), this.runButton = this.flyout.querySelector(".pvt-viewflyout-run"), this.physicsCard = this.flyout.querySelector(".pvt-viewflyout-physics");
      for (const e of jt)
        this.sliders.set(e.key, this.flyout.querySelector(`.pvt-viewflyout-range[data-slider="${e.key}"]`)), this.sliderValues.set(e.key, this.flyout.querySelector(`.pvt-viewflyout-slider-value[data-value="${e.key}"]`));
      for (const e of Hn)
        this.presetButtons.set(e, this.flyout.querySelector(`.pvt-viewflyout-preset[data-preset="${e}"]`));
      this.wireLayout(), this.wirePhysics(), this.wireToggles(), this.applyOpen(this.uiManager.modeStore.isViewActive()), this.track(this.uiManager.modeStore.subscribe((e) => this.applyOpen(e.mode === "view")));
    }
  }
  onGraphReady() {
    if (Et(this.uiManager.graph.getNodes(), this.uiManager.graph.getEdges()) && this.layoutSelect)
      for (const n of Array.from(this.layoutSelect.options)) {
        const i = Gn.find((s) => s.id === n.value);
        i != null && i.tree && (n.disabled = !0, n.title = "The graph contains a cycle, so it cannot be displayed as a tree.");
      }
    this.refreshSliders(this.sim.getPhysicsKnobs()), this.updateRunButton(), this.updatePhysicsEnabled();
    for (const n of this.toggleSync) n();
    this.layoutSelect && (this.layoutSelect.value = this.sim.getLayoutType() === "force" ? "force" : "tree-v");
  }
  onDestroy() {
    var e;
    (e = this.flyout) == null || e.remove(), this.flyout = void 0, this.sliders.clear(), this.sliderValues.clear(), this.presetButtons.clear();
  }
  /* ---------- open / close ---------- */
  applyOpen(e) {
    var n;
    (n = this.flyout) == null || n.classList.toggle("open", e);
  }
  /* ---------- layout ---------- */
  wireLayout() {
    var e;
    (e = this.layoutSelect) == null || e.addEventListener("change", () => {
      const n = Gn.find((i) => i.id === this.layoutSelect.value);
      n && (n.id === "force" ? this.sim.changeLayout("force") : n.id === "tree-v" ? this.sim.changeLayout("tree", { layout: { horizontal: !1 } }) : n.id === "tree-h" ? this.sim.changeLayout("tree", { layout: { horizontal: !0 } }) : n.id === "tree-r" && this.sim.changeLayout("tree", { layout: { radial: !0 } }), this.updatePhysicsEnabled(n.tree));
    });
  }
  /* ---------- physics ---------- */
  wirePhysics() {
    var e, n;
    (e = this.runButton) == null || e.addEventListener("click", () => {
      this.sim.isEnabled() ? this.sim.disable() : this.sim.enable(), this.updateRunButton();
    });
    for (const i of Hn)
      (n = this.presetButtons.get(i)) == null || n.addEventListener("click", () => {
        this.sim.applyPhysicsPreset(i), this.refreshSliders(this.sim.getPhysicsKnobs()), this.highlightPreset(i);
      });
    for (const i of jt) {
      const s = this.sliders.get(i.key);
      s == null || s.addEventListener("input", () => {
        const o = Number(s.value);
        i.set(this.sim, o), this.sliderValues.get(i.key).textContent = String(o), this.highlightPreset(null);
      });
    }
  }
  refreshSliders(e) {
    for (const n of jt) {
      const i = e[n.key], s = this.sliders.get(n.key);
      s && (s.value = String(i));
      const o = this.sliderValues.get(n.key);
      o && (o.textContent = String(i));
    }
  }
  highlightPreset(e) {
    for (const [n, i] of this.presetButtons)
      i.classList.toggle("active", n === e);
  }
  /** Re-sync the run/pause button with the live simulation state — e.g. after the
   *  slow-tick watchdog disables physics without going through the button. */
  syncRunState() {
    this.uiManager.graph.simulation && this.updateRunButton();
  }
  updateRunButton() {
    if (!this.runButton) return;
    const e = this.sim.isEnabled();
    this.runButton.innerHTML = e ? hs : da, this.runButton.title = e ? "Pause physics" : "Resume physics", this.runButton.setAttribute("aria-pressed", String(e));
  }
  /** Grey out presets + sliders when the layout isn't force-directed. */
  updatePhysicsEnabled(e = this.sim.getLayoutType() !== "force") {
    var n;
    (n = this.physicsCard) == null || n.classList.toggle("pvt-viewflyout-disabled", e);
    for (const i of this.sliders.values()) i.disabled = e;
    for (const i of this.presetButtons.values()) i.disabled = e;
  }
  /* ---------- grid / freeze toggles ---------- */
  wireToggles() {
    var n;
    const e = (n = this.uiManager.layout) == null ? void 0 : n.layout;
    this.wireToggle("snap", () => this.sim.toggleGridSnapping(), () => this.sim.isGridSnappingEnabled()), this.wireToggle(
      "highlight",
      () => e == null ? void 0 : e.classList.toggle("grid-highlighted"),
      () => (e == null ? void 0 : e.classList.contains("grid-highlighted")) ?? !1
    ), this.wireToggle("freeze", () => this.sim.toggleFreezeNodesOnDrag(), () => this.sim.isFreezeNodesOnDrag()), this.wireToggle("fit", () => this.sim.toggleFitViewOnExpandCollapse(), () => this.sim.isFitViewOnExpandCollapse());
  }
  // Attaches the click handler now; `read()` touches the simulation, so the
  // initial state is pushed later (via toggleSync) once graph.simulation exists.
  wireToggle(e, n, i) {
    var a;
    const s = (a = this.flyout) == null ? void 0 : a.querySelector(`.pvt-viewflyout-toggle[data-toggle="${e}"]`);
    if (!s) return;
    const o = () => s.setAttribute("aria-pressed", String(i()));
    this.toggleSync.push(o), s.addEventListener("click", () => {
      n(), o();
    });
  }
  /* ---------- template ---------- */
  template() {
    const e = Gn.map((o) => `<option value="${o.id}" title="${o.desc}">${o.label}</option>`).join(""), n = Hn.map(
      (o) => `<button type="button" class="pvt-viewflyout-preset" data-preset="${o}" title="${dh[o]}">${o[0].toUpperCase()}${o.slice(1)}</button>`
    ).join(""), i = jt.map((o) => `
            <div class="pvt-viewflyout-slider" title="${o.desc}">
                <div class="pvt-viewflyout-slider-head">
                    <span class="pvt-viewflyout-slider-label"><span class="pvt-viewflyout-icon">${o.icon}</span>${o.label}</span>
                    <span class="pvt-viewflyout-slider-value" data-value="${o.key}">0</span>
                </div>
                <input type="range" class="pvt-viewflyout-range" data-slider="${o.key}"
                    min="${ne[o.key][0]}" max="${ne[o.key][1]}" step="1" value="0" />
            </div>`).join(""), s = (o, a, l, d) => `
            <button type="button" class="pvt-viewflyout-toggle" data-toggle="${o}" role="switch" aria-pressed="false" title="${d}">
                <span class="pvt-viewflyout-icon">${a}</span>${l}
                <span class="pvt-viewflyout-switch"></span>
            </button>`;
    return `
            <div class="pvt-viewflyout-header"><span class="pvt-viewflyout-icon">${lt}</span>View</div>
            <div class="pvt-viewflyout-section-label">LAYOUT &amp; SIMULATION</div>
            <label class="pvt-viewflyout-layout">Layout
                <select class="pvt-viewflyout-layout-select" title="Choose how nodes are arranged on the canvas.">${e}</select>
            </label>
            <div class="pvt-viewflyout-physics">
                <div class="pvt-viewflyout-physics-head">
                    <span class="pvt-viewflyout-physics-title"><span class="pvt-viewflyout-icon">${Ro}</span>Physics</span>
                    <button type="button" class="pvt-viewflyout-run" title="Pause physics">${hs}</button>
                </div>
                <div class="pvt-viewflyout-presets">${n}</div>
                <div class="pvt-viewflyout-sliders">${i}</div>
            </div>
            ${s("snap", sa, "Snap to grid", "Align nodes to the grid while you drag them.")}
            ${s("highlight", ia, "Highlight grid", "Make the background grid lines more visible.")}
            ${s("freeze", ot, "Freeze on drag", "Keep nodes pinned where you drop them instead of letting physics move them again.")}
            ${s("fit", Us, "Fit on expand/collapse", "Zoom and re-center to fit the graph when clusters are expanded or collapsed.")}
        `;
  }
}
const wr = (r) => {
  const t = [];
  t.push({
    name: "id",
    value: r.id
  });
  for (const [e, n] of Object.entries(r.getData()))
    e && n && t.push({
      name: e,
      value: n
    });
  return t;
}, pn = (r, t, e = "") => {
  var i;
  const n = (i = r.getData()) == null ? void 0 : i[t];
  return typeof n == "string" ? n : e;
}, ph = (r) => pn(r, "label", "Could not resolve title"), gh = (r) => pn(r, "description"), fh = (r) => pn(r, "label", ""), mh = (r) => pn(r, "description"), Ns = (r) => wr(r), Ms = (r) => wr(r), As = {
  nodeHeaderMap: {
    title: ph,
    subtitle: gh
  },
  edgeHeaderMap: {
    title: fh,
    subtitle: mh
  },
  render: void 0
}, vh = {
  mode: "viewer",
  mainHeader: As,
  sidebar: {
    collapsed: "auto"
  },
  propertiesPanel: {
    nodePropertiesMap: Ns,
    edgePropertiesMap: Ms
  },
  neighborsPanel: {},
  tooltip: {
    enabled: !0,
    allowPinning: !0,
    nodePropertiesMap: Ns,
    edgePropertiesMap: Ms,
    ...As
  },
  navigation: {
    enabled: !0
  },
  contextMenu: {
    enabled: !0,
    menuNode: {
      topbar: [],
      menu: []
    },
    menuEdge: {
      topbar: [],
      menu: []
    },
    menuCanvas: {
      topbar: [],
      menu: []
    }
  },
  extraPanels: [],
  editors: {
    nodeEditor: {
      enabled: !0
    }
  },
  // Coming-soon rail modes are hidden unless the integrator opts in.
  modeRail: {
    explore: !1,
    enrich: !1
  }
}, yh = [
  {
    key: "layout",
    modes: "*",
    make: (r) => new sc(r),
    slot: (r) => r.getRootContainer()
  },
  {
    key: "navigation",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var t;
      return !!((t = r.navigation) != null && t.enabled);
    },
    make: (r) => new ic(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.graphnavigation;
    }
  },
  {
    key: "tooltip",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var t;
      return !!((t = r.tooltip) != null && t.enabled);
    },
    make: (r) => new Qc(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.canvas;
    }
  },
  {
    key: "contextMenu",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var t;
      return !!((t = r.contextMenu) != null && t.enabled);
    },
    make: (r) => new ih(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.canvas;
    }
  },
  {
    key: "modeRail",
    modes: ["full", "light"],
    make: (r) => new lh(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.moderail;
    }
  },
  {
    key: "toolPanel",
    modes: ["full", "light"],
    make: (r) => new hh(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.toolpanel;
    }
  },
  {
    // viewer-mode View flyout is an open question (§9.4); full/light for now.
    key: "viewFlyout",
    modes: ["full", "light"],
    make: (r) => new uh(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.viewflyout;
    }
  },
  {
    key: "mainHeader",
    modes: ["full", "light"],
    make: (r) => new Yc(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.mainheader;
    }
  },
  {
    key: "sidebar",
    modes: ["full"],
    make: (r) => new Hc(r),
    slot: (r) => {
      var t;
      return (t = r.layout) == null ? void 0 : t.sidebar;
    }
  }
];
class bh {
  constructor(t, e, n) {
    h(this, "graph");
    h(this, "container");
    h(this, "options");
    h(this, "keyManager");
    /**
     * Mode-rail state (Select / Create pointer-mode + View flyout). The rail,
     * contextual panels, View flyout and canvas cursor subscribe to it. Lives on
     * the manager (not per-component) so it survives element rebuilds and is
     * reachable from the interaction layer via `graph.UIManager.modeStore`.
     */
    h(this, "modeStore", new ah());
    /** Lifecycle-managed elements, in registration order. */
    h(this, "elements", []);
    h(this, "byKey", /* @__PURE__ */ new Map());
    /** Phase callbacks contributed by plugins / cross-cutting hooks. */
    h(this, "phaseHandlers", { afterMount: [], graphReady: [], destroy: [] });
    h(this, "emittedPhases", /* @__PURE__ */ new Set());
    /** UIManager-level teardown (global keybindings, container listeners). */
    h(this, "uiDisposables", []);
    /** True after `destroy()`; late registrations are refused until `setup()` reruns. */
    h(this, "destroyed", !1);
    /** Names of installed plugins, for de-duplication. Reset on `destroy()`. */
    h(this, "installedPlugins", /* @__PURE__ */ new Set());
    this.graph = t, this.container = e, this.options = rt({}, vh, n), this.keyManager = new sh(this.container), this.setup();
  }
  /* ---------- typed accessors (public API, backed by the registry) ---------- */
  get layout() {
    return this.byKey.get("layout");
  }
  get sidebar() {
    return this.byKey.get("sidebar");
  }
  get mainHeader() {
    return this.byKey.get("mainHeader");
  }
  get graphNavigation() {
    return this.byKey.get("navigation");
  }
  get modeRail() {
    return this.byKey.get("modeRail");
  }
  get toolPanel() {
    return this.byKey.get("toolPanel");
  }
  get viewFlyout() {
    return this.byKey.get("viewFlyout");
  }
  get tooltip() {
    return this.byKey.get("tooltip");
  }
  get contextMenu() {
    return this.byKey.get("contextMenu");
  }
  getRootContainer() {
    return this.container;
  }
  setup() {
    this.destroy(), this.destroyed = !1, this.options.theme && this.container.setAttribute("data-theme", this.options.theme.toString()), this.resolveMode(), this.build(), this.emitPhase("afterMount"), this.setupGlobalInteractions();
  }
  /** Downgrade / adjust the mode when the container can't fit the chosen UI. */
  resolveMode() {
    var e, n;
    ["viewer", "full", "light", "static"].includes(this.options.mode) || (console.warn(`Unknown mode: ${this.options.mode}. Defaulting to 'viewer'.`), this.options.mode = "viewer"), this.options.mode === "light" && !this.hasEnoughSpaceForLightMode() && (console.warn("Not enough space for light mode UI. Switching to viewer mode."), this.options.mode = "viewer"), this.options.mode === "full" && ((n = (e = this.options) == null ? void 0 : e.sidebar) == null ? void 0 : n.collapsed) === "auto" && !this.hasEnoughSpaceForFullMode() && (console.debug("Not enough space for full mode UI. Collapsing sidebar"), this.options.sidebar.collapsed = !0);
  }
  /** Construct + mount every element declared for the current mode. */
  build() {
    const t = this.options.mode;
    for (const e of yh)
      e.modes !== "*" && !e.modes.includes(t) || e.enabled && !e.enabled(this.options) || this.register(e);
  }
  register(t) {
    const e = t.make(this);
    this.byKey.set(t.key, e), this.elements.push(e), e.mount(t.slot(this));
  }
  hasEnoughSpaceForFullMode() {
    const t = this.container.getBoundingClientRect();
    return t.width > 1200 && t.height > 800;
  }
  hasEnoughSpaceForLightMode() {
    const t = this.container.getBoundingClientRect();
    return t.width > 600 && t.height > 600;
  }
  /* ---------- lifecycle phases ---------- */
  /**
   * Broadcast a lifecycle phase to every element (in registration order,
   * reversed for `destroy`) and every phase hook.
   */
  emitPhase(t) {
    if (!(t !== "destroy" && this.emittedPhases.has(t)))
      if (this.emittedPhases.add(t), t === "destroy") {
        for (const e of [...this.phaseHandlers.destroy].reverse()) e();
        for (const e of [...this.elements].reverse()) e.destroy();
      } else {
        for (const e of [...this.elements]) e[t]();
        for (const e of [...this.phaseHandlers[t]]) e();
      }
  }
  /**
   * Subscribe to a lifecycle phase. If the phase has already fired (a late
   * registration, e.g. a plugin installed after the graph is live), the
   * callback runs immediately to catch up. Returns an unsubscribe function.
   */
  onPhase(t, e) {
    return this.destroyed ? (console.warn("Cannot register a phase handler after the UI is destroyed."), () => {
    }) : (this.phaseHandlers[t].push(e), t !== "destroy" && this.emittedPhases.has(t) && e(), () => {
      this.phaseHandlers[t] = this.phaseHandlers[t].filter((n) => n !== e);
    });
  }
  setupGlobalInteractions() {
    const t = (e) => this.keyManager.handleKeyPress(e);
    this.container.addEventListener("keydown", t), this.uiDisposables.push(() => this.container.removeEventListener("keydown", t)), this.container.setAttribute("tabindex", "0"), this.uiDisposables.push(this.keyManager.register({
      key: "i",
      callback: () => {
        const e = this.graph.renderer.getNodeClosestToCursor(100);
        e && Si(e, this);
      }
    })), this.uiDisposables.push(this.keyManager.register({
      key: "Shift+E",
      callback: () => {
        const e = this.graph.renderer.getClosestElementToCursor(100);
        e && (e instanceof W ? (this.graph.renderer.getGraphInteraction().selectNode(e.getGraphElement(), e), requestAnimationFrame(() => {
          this.graph.editing.openNodeSession(e);
        })) : e instanceof ve && this.graph.renderer.enterNoteEditMode(e));
      }
    })), this.uiDisposables.push(this.keyManager.register({
      key: "n",
      callback: () => {
        const e = this.graph.renderer, n = this.graph.renderer.getGraphInteraction().getLastPointerEvent();
        if (!n) return;
        const { x: i, y: s } = e.screenToGraphCoordinates(
          n.clientX,
          n.clientY
        ), o = new ve({
          content: "This is not a note.",
          x: i,
          y: s
        });
        this.graph.noteManager.addNote(o);
      }
    }));
  }
  /* ---------- plugins ---------- */
  /**
   * Install a plugin, handing it a {@link PluginContext} to register UI
   * elements, keybindings and lifecycle hooks. Called for each entry in
   * `GraphOptions.plugins` and by {@link Graph.use}.
   */
  installPlugin(t) {
    if (this.destroyed) {
      console.warn(`Cannot install plugin "${t.name}" after the UI is destroyed.`);
      return;
    }
    if (this.installedPlugins.has(t.name)) {
      console.warn(`Plugin "${t.name}" is already installed; skipping the duplicate.`);
      return;
    }
    this.installedPlugins.add(t.name);
    const e = {
      graph: this.graph,
      ui: this,
      // Live view, not an install-time snapshot: the layout is rebuilt on
      // setup() and its slots vary by mode, so read it on access.
      get layout() {
        return this.ui.layout;
      },
      keyManager: this.keyManager,
      addElement: (n, i) => this.addElement(n, i),
      onPhase: (n, i) => this.onPhase(n, i),
      addKeybinding: (n) => {
        this.uiDisposables.push(this.keyManager.register(n));
      }
    };
    t.install(e);
  }
  /**
   * Add a UI element into the lifecycle after the initial build (e.g. from a
   * plugin). The element is mounted, then caught up to whatever phase the UI
   * has already reached.
   */
  addElement(t, e) {
    if (this.destroyed) {
      console.warn("Cannot add a UI element after the UI is destroyed.");
      return;
    }
    this.elements.push(t), t.mount(e), this.emittedPhases.has("afterMount") && t.afterMount(), this.emittedPhases.has("graphReady") && t.graphReady();
  }
  destroy() {
    this.destroyed = !0, this.emitPhase("destroy"), this.elements = [], this.byKey.clear(), this.phaseHandlers = { afterMount: [], graphReady: [], destroy: [] }, this.emittedPhases.clear(), this.installedPlugins.clear(), this.modeStore.dispose();
    for (const t of this.uiDisposables.splice(0)) t();
  }
  async toggleFullscreen(t) {
    (t !== void 0 ? t : !document.fullscreenElement) ? document.fullscreenElement || await this.container.requestFullscreen() : document.fullscreenElement && await document.exitFullscreen();
  }
  isFullscreenOn() {
    return !!document.fullscreenElement;
  }
  getOptions() {
    return this.options;
  }
  getAppContainer() {
    const t = this.graph.getAppID();
    return document.getElementById(t);
  }
  callGraphReady() {
    this.emitPhase("graphReady");
  }
  /**
  * Show a notification in the UI.
  *
  * @param notification - The notification to display
  */
  showNotification(t) {
    var c;
    const { level: e, title: n, message: i } = t, s = (c = this.layout) == null ? void 0 : c.notification;
    if (!s) return;
    const o = document.createElement("template");
    o.innerHTML = `
  <div class="pivotick-toast pivotick-toast-${e}">
    <div class="pivotick-toast-title">
    </div>
    <div class="pivotick-toast-body">
    </div>
  </div>
`;
    const a = o.content.firstElementChild, l = a.querySelector(".pivotick-toast-title"), d = a.querySelector(".pivotick-toast-body");
    l && (l.textContent = n), d && (d.textContent = i ?? ""), s.appendChild(a), requestAnimationFrame(() => {
      a.classList.add("show");
    }), setTimeout(() => {
      a.classList.remove("show"), a.addEventListener("transitionend", () => {
        a.remove();
      }, { once: !0 });
    }, 4e3);
  }
  /**
  * Show a modal in the UI.
  *
  * @param modalOption - The option for the modal
  */
  createModal(t) {
    var i, s;
    if (!((i = this.layout) == null ? void 0 : i.modal)) return;
    const n = new Xc(this, t);
    return n.mount((s = this.layout) == null ? void 0 : s.modal), requestAnimationFrame(() => {
      n.show();
    }), n;
  }
  /**
  * Show a sidepanel in the UI.
  *
  * @param slidepanelOption - The notification to display
  */
  createSlidepanel(t) {
    var i, s;
    if (!((i = this.layout) == null ? void 0 : i.slidePanel)) return;
    const n = new Gc(this, t);
    return n.mount((s = this.layout) == null ? void 0 : s.slidePanel), n;
  }
}
const qt = {
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info"
};
class wh {
  constructor(t) {
    h(this, "graph");
    h(this, "UIManager");
    this.graph = t, this.UIManager = this.graph.UIManager;
  }
  /**
   * Dispatch a notification to the UIManager.
   * 
   * @param level - The severity level of the notification.
   * @param title - The title to display in the notification.
   * @param message - Optional detailed message for the notification.
   */
  notify(t, e, n) {
    const i = { level: t, title: e, message: n };
    this.UIManager.showNotification(i);
  }
  success(t, e) {
    this.notify(qt.Success, t, e);
  }
  warning(t, e) {
    this.notify(qt.Warning, t, e);
  }
  error(t, e) {
    this.notify(qt.Danger, t, e);
  }
  info(t, e) {
    this.notify(qt.Info, t, e);
  }
}
const $n = "manually_hidden";
class xh {
  constructor(t) {
    h(this, "graph");
    h(this, "listeners");
    h(this, "filters", {});
    h(this, "excludedNodeIds", /* @__PURE__ */ new Set());
    h(this, "hiddenNodeCount", 0);
    this.graph = t, this.listeners = {
      filterAdd: [],
      filterRemove: [],
      filterReset: [],
      filterChange: []
    };
  }
  on(t, e) {
    this.listeners[t].push(e);
  }
  off(t, e) {
    this.listeners[t] = this.listeners[t].filter((n) => n !== e);
  }
  emit(t, ...e) {
    for (const n of this.listeners[t])
      n(...e);
  }
  getFilters() {
    const t = {
      value: [...this.excludedNodeIds],
      matchMode: "exact"
    };
    return { ...this.filters, manuallyHidden: t };
  }
  setFilters(t) {
    for (const [e, n] of Object.entries(t)) {
      if (n === void 0) {
        this.removeFilter(e);
        return;
      }
      this.filters[e] = n;
    }
    this.apply(), this.emit("filterChange", this.getFilters());
  }
  setFilter(t, e) {
    if (e === void 0) {
      this.removeFilter(t);
      return;
    }
    this.filters[t] = e, this.apply(), this.emit("filterAdd", t, e), this.emit("filterChange", this.getFilters());
  }
  removeFilter(t) {
    t in this.filters && (delete this.filters[t], this.apply(), this.emit("filterRemove", t), this.emit("filterChange", this.getFilters()));
  }
  resetFilters() {
    this.filters = {}, this.apply(), this.emit("filterReset"), this.emit("filterChange", this.getFilters());
  }
  excludeNode(t) {
    const e = this.graph.getMutableNode(t);
    if (e === void 0) return;
    this.excludedNodeIds.add(e.id);
    const n = {
      value: e.id,
      matchMode: "exact"
    };
    this.apply(), this.emit("filterAdd", $n, n), this.emit("filterChange", this.getFilters());
  }
  includeNode(t) {
    const e = this.graph.getMutableNode(t);
    e !== void 0 && (this.excludedNodeIds.delete(e.id), this.apply(), this.emit("filterRemove", $n), this.emit("filterChange", this.getFilters()));
  }
  clearNodeExclusions() {
    this.hiddenNodeCount += this.excludedNodeIds.size, this.excludedNodeIds.clear(), this.apply(), this.emit("filterRemove", $n), this.emit("filterChange", this.getFilters());
  }
  getExcludedNodeCount() {
    return this.excludedNodeIds.size;
  }
  getExcludedNodes() {
    return [...this.excludedNodeIds].map((t) => this.graph.getMutableNode(t)).filter((t) => t !== void 0);
  }
  getHiddenNodeCount() {
    return this.hiddenNodeCount;
  }
  apply() {
    const t = this.graph.getMutableNodes(), n = t.filter((i) => this.nodeMatchesFilters(i)).filter((i) => i.childrenDepth === 0);
    this.hiddenNodeCount = t.length - n.length, this.applyFiltersOnSubgraph(), this.graph.setVisibleNodes(n);
  }
  applyFiltersOnSubgraph() {
    const t = this.getFilters();
    this.graph.getMutableNodes().filter((e) => e.childrenDepth === 0).forEach((e) => {
      const n = e.getSubgraph();
      e.isParent && n && (n.queryEngine.resetFilters(), n.queryEngine.setFilters(t));
    });
  }
  nodeMatchesFilters(t) {
    if (this.excludedNodeIds.has(t.id))
      return !1;
    for (const [e, n] of Object.entries(this.filters)) {
      if (e === "manuallyHidden") continue;
      const i = t.getData()[e];
      if (!this.matches(i, n)) return !1;
    }
    return !0;
  }
  matches(t, e) {
    if (e === void 0) return !0;
    if (t === void 0) return !1;
    const n = e.value, i = (e == null ? void 0 : e.matchMode) ?? "partial";
    if (typeof n == "string")
      return i === "partial" ? String(t).includes(n) : t === n;
    if (typeof n == "number" || typeof n == "boolean")
      return t === n;
    if (Array.isArray(n))
      return i === "partial" ? n.includes(t) : t === n;
    if (typeof n == "object" && n !== null) {
      const { min: s, max: o } = n;
      return !(typeof t != "number" || s !== void 0 && t < s || o !== void 0 && t > o);
    }
    return !1;
  }
}
function kh(r, t, e, n) {
  var d, c;
  const s = V(`
        <div class="main-container">
            <div class="icon-container"></div>
            <div class="nodeinfo-container">
                <div>Editing node: </div>
                <div class="nodeinfo-name"></div>
            </div>
        </div>
    `), o = s.querySelector(".nodeinfo-name");
  o && (o.textContent = se(r, e.getOptions().mainHeader)), (d = s.querySelector(".icon-container")) == null || d.appendChild($e(r, { size: 42, className: "icon" }));
  let a, l;
  if (n)
    a = n(t);
  else {
    const u = Sh(r);
    a = u.body, l = u.form;
    const p = document.querySelector("#inspect-node-modal");
    p && ((c = p.__modalInstance) == null || c.destroy());
  }
  e.createModal({
    id: "edit-node-modal",
    rawHeader: !0,
    header: s,
    body: a,
    rawBody: !0,
    // Any dismissal that isn't a commit (×, Cancel, backdrop) must end the
    // session — otherwise it stays `active` and openNodeSession short-circuits,
    // so a second Edit on the same node never reopens. A commit already
    // deactivated it, hence the guard.
    onHide: () => {
      t.active && t.cancel();
    },
    buttons: [
      {
        variant: "secondary",
        text: "Cancel",
        iconUnicode: "×",
        onClick: (u, p) => {
          p();
        }
      },
      {
        variant: "primary",
        text: "Edit Node",
        svgIcon: Kt,
        onClick: async (u, p) => {
          const g = De.getValues(l);
          t.setDraft(g), await t.commit() && p();
        }
      }
    ],
    position: "top",
    size: "xl",
    noBodyPadding: !0
  });
}
function Sh(r) {
  const t = document.createElement("div");
  t.classList.add("edit-node-modal-body");
  const e = [];
  Object.entries(r.getData()).forEach(([i, s]) => {
    const o = {
      key: i,
      label: i,
      type: "text",
      defaultValue: s.toString()
    };
    e.push(o);
  });
  const n = De.createForm({
    fields: e
  });
  return t.append(n), { body: t, form: n };
}
function Ch(r, t, e = {}) {
  var n;
  return e.mode === "modal" ? (n = r.UIManager.layout) != null && n.modal ? Th(r, e) : (console.warn("Pivotick: modal label prompt unavailable in this UI mode; using the inline prompt instead."), _s(r, t, e)) : _s(r, t, e);
}
function Eh(r, t) {
  let e = null;
  return kr(r, {
    title: t.title ?? "Edge details",
    submitLabel: t.submitLabel,
    cancelLabel: t.cancelLabel,
    populate: (n) => {
      var i;
      if (t.render) {
        t.render(n);
        return;
      }
      (i = t.fields) != null && i.length && (e = De.createForm({ fields: t.fields }), n.appendChild(e));
    },
    collect: () => t.render ? t.getValues ? t.getValues() : {} : e ? De.getValues(e) : {}
  });
}
function xr(r) {
  const t = document.createElement("input");
  return t.type = "text", t.className = "pvt-edge-label-input", t.value = r.initial ?? "", t.placeholder = r.placeholder ?? "Label…", t;
}
function _s(r, t, e) {
  return new Promise((n) => {
    var g;
    const i = (g = r.UIManager.layout) == null ? void 0 : g.canvas;
    if (!i) return n(null);
    const s = xr(e), o = i.getBoundingClientRect(), a = ((t == null ? void 0 : t.x) ?? o.left + o.width / 2) - o.left, l = ((t == null ? void 0 : t.y) ?? o.top + o.height / 2) - o.top;
    s.style.left = `${a}px`, s.style.top = `${l}px`;
    let d = !1;
    const c = (f) => {
      d || (d = !0, s.removeEventListener("keydown", u), s.removeEventListener("blur", p), s.remove(), n(f));
    }, u = (f) => {
      f.stopPropagation(), f.key === "Enter" ? (f.preventDefault(), c(s.value)) : f.key === "Escape" && (f.preventDefault(), c(null));
    }, p = () => c(null);
    s.addEventListener("keydown", u), s.addEventListener("blur", p), i.appendChild(s), requestAnimationFrame(() => {
      s.focus(), s.select();
    });
  });
}
function Th(r, t) {
  const e = xr(t);
  return kr(r, {
    title: t.title ?? "Edge label",
    populate: (n) => n.appendChild(e),
    collect: () => e.value
  });
}
function kr(r, t) {
  return new Promise((e) => {
    var a;
    const n = document.createElement("div");
    n.className = "pvt-edge-prompt-modal-body", t.populate(n);
    let i = !1;
    const s = (l) => {
      i || (i = !0, e(l), o == null || o.hide());
    }, o = r.UIManager.createModal({
      header: t.title ?? "Edge details",
      body: n,
      rawBody: !0,
      buttons: [
        { variant: "secondary", text: t.cancelLabel ?? "Cancel", onClick: () => s(null) },
        { variant: "primary", text: t.submitLabel ?? "Add", onClick: () => s(t.collect()) }
      ],
      // Any other close path (×, overlay click, Esc) resolves as a cancel.
      onHidden: () => s(null)
    });
    if (!o)
      return console.warn("Pivotick: modal prompt unavailable in this UI mode; the prompt was cancelled."), e(null);
    n.addEventListener("keydown", (l) => {
      var d;
      l.stopPropagation(), l.key === "Escape" ? (l.preventDefault(), s(null)) : l.key === "Enter" && ((d = l.target) == null ? void 0 : d.tagName) === "INPUT" && (l.preventDefault(), s(t.collect()));
    }), (a = n.querySelector("form")) == null || a.addEventListener("submit", (l) => {
      l.preventDefault(), s(t.collect());
    }), requestAnimationFrame(() => {
      const l = n.querySelector("input, select, textarea");
      l == null || l.focus(), l instanceof HTMLInputElement && l.select();
    });
  });
}
const on = class on {
  constructor(t, e, n, i = !0) {
    h(this, "graph");
    h(this, "connectManager");
    h(this, "canvas");
    h(this, "activateImmediately");
    h(this, "mode");
    h(this, "sourceElement", null);
    h(this, "hoveredNode", null);
    h(this, "pointerPosition", null);
    h(this, "dragStartPosition", null);
    h(this, "state", "idle");
    /** True while an async `onBeforeEdgeCreate` decision is in flight — locks out new gestures. */
    h(this, "deciding", !1);
    h(this, "handlePointerMove", (t) => {
      this.deciding || (this.updateDragState(t), !(this.state !== "dragging" && this.state !== "click-connect") && (this.updatePointerPosition(t), this.updateHoveredNode(), this.updateShadowEdge()));
    });
    h(this, "handleContextMenu", (t) => {
      if (t.preventDefault(), t.stopPropagation(), !this.deciding) {
        if (this.sourceElement) {
          this.clearSource(), this.hoveredNode = null, this.updateCanvasState(), this.graph.renderer.hideShadowEdge();
          return;
        }
        this.connectManager.finishInteraction();
      }
    });
    h(this, "handlePointerUp", () => {
      if (this.deciding) return;
      if (this.state === "pending-drag") {
        this.clearSource(), this.state = "idle", this.dragStartPosition = null;
        return;
      }
      if (this.state !== "dragging")
        return;
      const t = this.graph.renderer.getNodeClosestToCursor(30);
      if (t && this.sourceElement) {
        if (this.sourceElement === t) {
          this.connectManager.finishInteraction();
          return;
        }
        const e = this.sourceElement;
        this.dragStartPosition = null, this.settleDecision(
          () => this.attemptConnection(e, t, "drag"),
          () => this.connectManager.restart()
        );
        return;
      }
      this.dragStartPosition = null, this.connectManager.restart();
    });
    this.graph = t, this.connectManager = e, this.canvas = this.graph.UIManager.layout.canvas, this.mode = n, this.activateImmediately = i;
  }
  start() {
    this.activateImmediately && this.activateInteractionUI(), window.addEventListener("contextmenu", this.handleContextMenu), window.addEventListener("pointermove", this.handlePointerMove), window.addEventListener("pointerup", this.handlePointerUp);
  }
  activateInteractionUI() {
    this.canvas.classList.add("pvt-connect-mode-active"), this.updateCanvasState();
  }
  deactivateInteractionUI() {
    this.canvas.classList.remove("pvt-connect-mode-active", "select-first", "pick-second");
  }
  cancel() {
    this.clearSource(), this.hoveredNode = null, this.pointerPosition = null, this.dragStartPosition = null, this.state = "idle", this.updateCanvasState(), this.deactivateInteractionUI(), window.removeEventListener("pointermove", this.handlePointerMove), window.removeEventListener("contextmenu", this.handleContextMenu), window.removeEventListener("pointerup", this.handlePointerUp), this.graph.renderer.hideShadowEdge();
  }
  selectOrConnectNode(t) {
    if (this.deciding) return !0;
    if (this.state === "idle")
      return this.sourceElement = t, this.graph.highlightElement(t), this.state = "click-connect", this.activateInteractionUI(), !0;
    if (this.sourceElement === t)
      return this.connectManager.finishInteraction(), !0;
    if (this.sourceElement) {
      const e = this.sourceElement;
      return this.settleDecision(
        () => this.attemptConnection(e, t, "click"),
        () => this.connectManager.finishInteraction(!0)
      ), !0;
    }
    return this.connectManager.finishInteraction(!0), !0;
  }
  handleNoteClick(t) {
    return this.deciding ? !0 : this.state === "idle" ? (this.sourceElement = t, this.state = "click-connect", this.activateInteractionUI(), this.updateCanvasState(), !0) : !1;
  }
  updateDragState(t) {
    if (!this.dragStartPosition)
      return;
    const e = t.clientX - this.dragStartPosition.x, n = t.clientY - this.dragStartPosition.y;
    this.state === "pending-drag" && Math.hypot(e, n) > on.DRAG_THRESHOLD && (this.state = "dragging", this.activateInteractionUI(), this.sourceElement instanceof W && this.graph.highlightElement(this.sourceElement), this.updateCanvasState());
  }
  updatePointerPosition(t) {
    this.pointerPosition = this.graph.renderer.screenToGraphCoordinates(
      t.clientX,
      t.clientY
    );
  }
  updateHoveredNode() {
    this.hoveredNode = this.graph.renderer.getNodeClosestToCursor(30);
  }
  updateShadowEdge() {
    if (!this.sourceElement || !this.pointerPosition) return;
    const t = this.isTargetInvalid(this.sourceElement, this.hoveredNode);
    this.graph.renderer.showShadowEdge({
      source: this.sourceElement,
      targetNode: this.hoveredNode ?? void 0,
      targetPosition: this.hoveredNode ? void 0 : this.pointerPosition,
      invalid: t
    });
  }
  /**
   * Attempt to turn a resolved source→target gesture into an edge (or note-link).
   *
   * Order: the live {@link InterractionCallbacks.isValidConnection} predicate is
   * enforced first (an invalid target is refused outright, without consulting the
   * before-create hook); then the async {@link InterractionCallbacks.onBeforeEdgeCreate}
   * decision is awaited; only on acceptance is the edge/note-link created.
   */
  async attemptConnection(t, e, n) {
    var a;
    if (this.isTargetInvalid(t, e)) return;
    const i = (a = this.graph.getOptions().callbacks) == null ? void 0 : a.onBeforeEdgeCreate, s = this.getStaticLabelPromptMode(), o = i ? await this.resolveDecision(i, t, e, n) : await this.resolveStaticDecision(t, e, s);
    if (o.accept) {
      if (t instanceof W) {
        const l = !!i;
        this.connectManager.createEdge(t, e, o, { allowDuplicate: l });
        return;
      }
      t instanceof ve && this.connectManager.createNoteLink(t, e);
    }
  }
  /** Invoke the before-create hook (if any) and normalise its return value. */
  async resolveDecision(t, e, n, i) {
    if (!t) return { accept: !0 };
    const s = e instanceof ve ? "note-link" : "edge", a = await t({
      source: e,
      target: n,
      origin: i,
      kind: s,
      promptLabel: (l) => this.promptEdgeLabel(e, n, l),
      promptData: (l) => Eh(this.graph, l)
    });
    return a === !0 ? { accept: !0 } : a ? {
      accept: a.accept,
      data: a.data,
      style: a.style,
      id: a.id,
      directed: a.directed
    } : { accept: !1 };
  }
  /**
   * Hook-less path for the static `editors.edgeEditor.labelPrompt` option: prompt
   * for a label and stamp it onto the edge's data. A cancel vetoes the create.
   * Note-links carry no data, so they always accept with defaults here.
   */
  async resolveStaticDecision(t, e, n) {
    if (!n || !(t instanceof W)) return { accept: !0 };
    const i = await this.promptEdgeLabel(t, e, { mode: n });
    return i === null ? { accept: !1 } : { accept: !0, data: { label: i } };
  }
  getStaticLabelPromptMode() {
    var t, e;
    return (e = (t = this.graph.UIManager.getOptions().editors) == null ? void 0 : t.edgeEditor) == null ? void 0 : e.labelPrompt;
  }
  /** Open the label prompt anchored at the (source→target) edge midpoint. */
  promptEdgeLabel(t, e, n) {
    const i = e.x ?? 0, s = e.y ?? 0;
    let o = i, a = s;
    t instanceof W && t.x != null && t.y != null && (o = (t.x + i) / 2, a = (t.y + s) / 2);
    const l = this.graph.renderer.graphToScreenCoordinates(o, a);
    return Ch(this.graph, l, n);
  }
  /** True when a live `isValidConnection` predicate rejects the hovered target. */
  isTargetInvalid(t, e) {
    var i;
    if (!e || t === e) return !1;
    const n = (i = this.graph.getOptions().callbacks) == null ? void 0 : i.isValidConnection;
    return n ? !n(t, e) : !1;
  }
  /** Run an async decision under the `deciding` lock (keeps the preview up, blocks new gestures). */
  async runDecision(t) {
    this.deciding = !0;
    try {
      await t();
    } finally {
      this.deciding = !1;
    }
  }
  /**
   * Await a connect decision, then re-arm for the next gesture — but only if this
   * session still owns the active connect mode. If the user exited (Escape) or
   * re-entered the mode while the decision was in flight, re-arming would
   * resurrect a handler-less zombie mode / disturb the new session, so skip it.
   * A rejecting hook is logged (not left unhandled with a wedged preview); either
   * way the re-arm — which cancels this session — clears any stuck preview.
   */
  async settleDecision(t, e) {
    try {
      await this.runDecision(t);
    } catch (n) {
      console.warn("Pivotick: onBeforeEdgeCreate decision failed", n);
    }
    this.connectManager.ownsSession(this) && e();
  }
  beginDragConnection(t, e) {
    this.deciding || this.state === "dragging" || this.state === "click-connect" || (this.state = "pending-drag", this.sourceElement = t, this.dragStartPosition = {
      x: e.clientX,
      y: e.clientY
    });
  }
  clearSource() {
    var t, e;
    this.sourceElement instanceof W && ((e = (t = this.graph).unHighlightElement) == null || e.call(t, this.sourceElement)), this.sourceElement = null;
  }
  updateCanvasState() {
    if (this.canvas.classList.remove("select-first", "pick-second"), this.state === "idle") {
      this.canvas.classList.add("select-first");
      return;
    }
    this.canvas.classList.add("pick-second");
  }
  getState() {
    return this.state;
  }
};
h(on, "DRAG_THRESHOLD", 4);
let Tt = on;
class Nh {
  constructor(t) {
    h(this, "graph");
    h(this, "activeSession", null);
    h(this, "modeActive", !1);
    h(this, "deferUIActivation", !1);
    h(this, "currentMode", null);
    h(this, "listeners", {
      start: /* @__PURE__ */ new Set(),
      stop: /* @__PURE__ */ new Set()
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h(this, "nodeClickCB", (t, e, n, i) => {
      if (!this.activeSession || this.currentMode === "note-link" && this.activeSession.getState() === "idle")
        return !1;
      i.cancel(), this.selectOrConnectNode(e);
    });
    h(this, "nodePointerDownCB", (t, e) => {
      this.activeSession && (this.currentMode === "note-link" && this.activeSession.getState() === "idle" || this.activeSession.beginDragConnection(e, t));
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h(this, "noteHandleClickCB", (t, e, n, i) => {
      if (!this.activeSession)
        return !1;
      i.cancel(), this.noteClick(e);
    });
    h(this, "noteHandlePointerDownCB", (t, e) => {
      this.activeSession && this.activeSession.beginDragConnection(e, t);
    });
    this.graph = t;
  }
  on(t, e) {
    this.listeners[t].add(e);
  }
  off(t, e) {
    this.listeners[t].delete(e);
  }
  startClickConnection(t = !1) {
    this.deferUIActivation = t, !this.modeActive && (this.modeActive = !0, this.activeSession = new Tt(
      this.graph,
      this,
      this.currentMode,
      !this.deferUIActivation
    ), this.activeSession.start(), this.currentMode === "node-edge" && this.graph.simulation.disable(), this.listeners.start.forEach((e) => e(this)));
  }
  startNodeClickConnection() {
    this.currentMode = "node-edge", this.exitClickConnectionMode(), this.startClickConnection(), this.graph.renderer.getGraphInteraction().on("nodeClick", this.nodeClickCB), this.graph.renderer.getGraphInteraction().on("nodePointerDown", this.nodePointerDownCB);
  }
  startNoteClickConnection() {
    this.currentMode = "note-link", this.exitClickConnectionMode(), this.startClickConnection(!0), this.graph.renderer.getGraphInteraction().on("nodeClick", this.nodeClickCB), this.graph.renderer.getGraphInteraction().on("noteHandleClick", this.noteHandleClickCB), this.graph.renderer.getGraphInteraction().on("noteHandlePointerDown", this.noteHandlePointerDownCB);
  }
  cancel() {
    this.exitClickConnectionMode();
  }
  restart() {
    if (!this.modeActive) {
      this.startClickConnection();
      return;
    }
    this.finishInteraction(!0);
  }
  finishInteraction(t = !1) {
    var e;
    if ((e = this.activeSession) == null || e.cancel(), !t) {
      this.activeSession = null;
      return;
    }
    this.activeSession = new Tt(
      this.graph,
      this,
      this.currentMode,
      !this.deferUIActivation
    ), this.activeSession.start();
  }
  exitClickConnectionMode() {
    var t;
    this.modeActive = !1, this.currentMode === "node-edge" && this.graph.simulation.enable(), (t = this.activeSession) == null || t.cancel(), this.activeSession = null, this.listeners.stop.forEach((e) => e(this)), this.graph.renderer.getGraphInteraction().off("nodeClick", this.nodeClickCB), this.graph.renderer.getGraphInteraction().off("nodePointerDown", this.nodePointerDownCB), this.graph.renderer.getGraphInteraction().off("noteHandleClick", this.noteHandleClickCB), this.graph.renderer.getGraphInteraction().off("noteHandlePointerDown", this.noteHandlePointerDownCB);
  }
  resetSession() {
    var t;
    (t = this.activeSession) == null || t.cancel(), this.activeSession = new Tt(
      this.graph,
      this,
      this.currentMode,
      !this.deferUIActivation
    ), this.activeSession.start();
  }
  isActive() {
    return this.activeSession !== null;
  }
  /**
   * True while `session` is still the live session of an active connect mode.
   * Async settle callbacks guard on this so a mode exited (Escape) or re-entered
   * while an `onBeforeEdgeCreate` decision was in flight isn't resurrected/disturbed.
   */
  ownsSession(t) {
    return this.modeActive && this.activeSession === t;
  }
  isActiveAndNotIdle() {
    return this.activeSession !== null && this.activeSession.getState() !== "idle";
  }
  getMode() {
    return this.currentMode;
  }
  selectOrConnectNode(t) {
    return this.activeSession ? this.activeSession.selectOrConnectNode(t) : !1;
  }
  /** True if a source→target edge already exists. Exposed so an `onBeforeEdgeCreate` hook can run its own duplicate policy. */
  edgeExists(t, e) {
    return this.graph.getEdges().some(
      (n) => n.source.id === t.id && n.target.id === e.id
    );
  }
  /**
   * Create a source→target edge.
   *
   * `decision` carries the (optional) data/style/id/direction resolved by the
   * `onBeforeEdgeCreate` hook in {@link EdgeCreationSession}; omitted on the
   * programmatic path, where the edge is created with defaults.
   *
   * By default a same-pair edge is treated as a duplicate and skipped — right
   * for the hook-less flow, where every connect yields an identical empty edge.
   * With `allowDuplicate` set (the session passes this when a hook is present)
   * the check is skipped, because once the consumer supplies data/labels a
   * second A→B edge is a legitimately distinct edge, not a duplicate — the
   * consumer owns that policy (see {@link edgeExists}).
   */
  createEdge(t, e, n, { allowDuplicate: i = !1 } = {}) {
    if (!i && this.edgeExists(t, e)) return;
    const s = (n == null ? void 0 : n.id) ?? ct(8, "edge-"), o = new ae(s, t, e, (n == null ? void 0 : n.data) ?? {}, void 0, (n == null ? void 0 : n.directed) ?? null);
    n != null && n.style && o.updateStyle(n.style), this.graph.addEdge(o);
  }
  createNoteLink(t, e) {
    t.setAttachedElement({ type: "node", id: e.id }), this.graph.renderer.update(!0);
  }
  noteClick(t) {
    return this.activeSession ? this.activeSession.handleNoteClick(t) : !1;
  }
}
class Mh {
  constructor(t, e) {
    /**
     * The node being edited.
     */
    h(this, "node");
    /**
     * Snapshot of the original node data when the session started.
     */
    h(this, "originalData");
    /**
     * Mutable draft data.
     *
     * Consumers can either mutate this object directly
     * or replace it via `setDraft`.
     */
    h(this, "draft");
    /**
     * Whether the session is still active.
     */
    h(this, "active", !0);
    h(this, "manager");
    this.manager = t, this.node = e;
    const n = e.getData();
    this.originalData = { ...n }, this.draft = { ...n };
  }
  /**
   * Replaces the current draft.
   */
  setDraft(t) {
    this.ensureActive(), this.draft = t;
  }
  /**
   * Commits the draft data to the node.
   */
  async commit() {
    var s;
    this.ensureActive();
    const t = this.node.getData(), e = this.draft, n = (s = this.manager.graph.getOptions().callbacks) == null ? void 0 : s.onBeforeNodeEditCommit;
    return n ? await n({
      node: this.node,
      previousData: t,
      nextData: e,
      session: this
    }) === !1 ? !1 : (this.node.setData(e), this.manager.graph.renderer.update(!0), this.manager.graph.nextTickFor([this.node]), this.manager.graph.renderer.getGraphInteraction().selectNode(this.node.getGraphElement(), this.node), this.active = !1, this.manager.closeSession(this.node.id), !0) : (this.node.setData(e), this.manager.graph.renderer.update(!0), this.manager.graph.nextTickFor([this.node]), this.manager.graph.renderer.getGraphInteraction().selectNode(this.node.getGraphElement(), this.node), this.active = !1, this.manager.closeSession(this.node.id), !0);
  }
  /**
   * Cancels the edit session.
   *
   * No data is written to the node.
   */
  cancel() {
    var t, e;
    this.ensureActive(), (e = (t = this.manager.graph.getOptions().callbacks) == null ? void 0 : t.onNodeEditCancel) == null || e.call(t, this.node), this.active = !1, this.manager.closeSession(this.node.id);
  }
  ensureActive() {
    if (!this.active)
      throw new Error("This edit session is no longer active.");
  }
}
class Ah {
  constructor(t) {
    h(this, "graph");
    h(this, "connectManager");
    /**
     * Active node edit sessions indexed by node id.
     */
    h(this, "nodeSessions", /* @__PURE__ */ new Map());
    this.graph = t, this.connectManager = new Nh(this.graph);
  }
  /**
   * Opens an edit session for a node.
   *
   * If a session already exists for this node,
   * the existing session is returned.
   */
  openNodeSession(t) {
    var o, a, l;
    const e = t.id, n = this.nodeSessions.get(e);
    if (n && n.active)
      return n;
    const i = new Mh(this, t);
    this.nodeSessions.set(e, i);
    const s = (o = this.graph.getOptions().callbacks) == null ? void 0 : o.onNodeEdit;
    return (l = (a = this.graph.getOptions().callbacks) == null ? void 0 : a.onNodeEdit) == null || l.call(a, i), kh(t, i, this.graph.UIManager, s), i;
  }
  /**
   * Returns the active session for a node.
   */
  getNodeSession(t) {
    return this.nodeSessions.get(t);
  }
  /**
   * Closes and removes a session.
   *
   * Internal lifecycle method.
   */
  closeSession(t) {
    this.nodeSessions.delete(t);
  }
  /**
   * Closes all active sessions.
   */
  closeAllSessions() {
    for (const t of this.nodeSessions.values())
      t.active = !1;
    this.nodeSessions.clear();
  }
}
class _h {
  constructor(t) {
    h(this, "notes", /* @__PURE__ */ new Map());
    h(this, "hiddenNotes", /* @__PURE__ */ new Set());
    h(this, "graph");
    this.graph = t;
  }
  addNote(t, e = !1) {
    this.notes.set(t.id, t), e || (this.graph.noteAdd(t), this.graph.onChange());
  }
  removeNote(t) {
    const e = typeof t == "string" ? t : t.id, n = this.getNote(e);
    n && (this.hiddenNotes.delete(n), this.notes.delete(e), this.graph.noteRemove(n), this.graph.onChange());
  }
  editNote(t) {
    this.notes.has(t.id) && (this.notes.set(t.id, t), this.graph.noteChange(t), this.graph.onChange());
  }
  getNote(t) {
    return this.notes.get(t);
  }
  getNotes() {
    return Array.from(this.notes.values());
  }
  getHiddenNotes() {
    return Array.from(this.hiddenNotes);
  }
  getVisibleNotes() {
    return this.getNotes().filter((t) => !this.hiddenNotes.has(t));
  }
  clear() {
    this.notes.clear(), this.hiddenNotes.clear(), this.graph.onChange();
  }
  hideAll() {
    this.getNotes().forEach((t) => {
      t.visible = !1, this.hiddenNotes.add(t), this.graph.noteChange(t);
    }), this.graph.onChange();
  }
  showAll() {
    this.hiddenNotes.forEach((t) => {
      t.visible = !0, this.hiddenNotes.delete(t), this.graph.noteChange(t);
    }), this.graph.onChange();
  }
  hasNote(t) {
    return this.notes.has(t);
  }
  isVisible(t) {
    return !this.hiddenNotes.has(t);
  }
  isHidden(t) {
    return this.hiddenNotes.has(t);
  }
  count() {
    return this.notes.size;
  }
  hideNote(t) {
    this.hiddenNotes.add(t), t.visible = !1, this.graph.noteChange(t), this.graph.onChange();
  }
  showNote(t) {
    this.hiddenNotes.delete(t), t.visible = !0, this.graph.noteChange(t), this.graph.onChange();
  }
}
class ee {
  /**
   * Initializes a graph inside the specified container using the provided data and options.
   *
   * @param container - The HTMLElement that will serve as the main container for the graph.
   * @param data - The graph data, including nodes and edges, to render.
   * @param options - Optional configuration for the graph's behavior, UI, styling, simulation, etc.
   */
  constructor(t, e, n) {
    h(this, "nodes", /* @__PURE__ */ new Map());
    h(this, "edges", /* @__PURE__ */ new Map());
    /** @private */
    h(this, "UIManager");
    h(this, "noteManager");
    h(this, "notifier");
    h(this, "renderer");
    h(this, "simulation");
    h(this, "queryEngine");
    /** @private */
    h(this, "options");
    h(this, "app_id");
    h(this, "parentGraph");
    h(this, "graphDepth");
    h(this, "editing");
    h(this, "listeners");
    var l, d, c, u;
    if (this.listeners = {
      ready: [],
      nodeAdd: [],
      nodeRemove: [],
      nodeChange: [],
      edgeAdd: [],
      edgeRemove: [],
      edgeChange: [],
      noteAdd: [],
      noteRemove: [],
      noteChange: [],
      dataBatchChanged: []
    }, this.options = {
      isDirected: !0,
      ...n
    }, ((l = this.options.UI) == null ? void 0 : l.mode) === "static" && (this.options.simulation || (this.options.simulation = {}), this.options.simulation.enabled = !1, this.options.simulation.useWorker = !1, this.options.render || (this.options.render = {}), this.options.render.zoomEnabled = !1, this.options.render.zoomAnimation = !1, this.options.render.dragEnabled = !1, this.options.render.selectionBox || (this.options.render.selectionBox = {}), this.options.render.selectionBox.enabled = !1, this.options.UI.tooltip || (this.options.UI.tooltip = {}), this.options.UI.tooltip.enabled = !1, this.options.UI.contextMenu || (this.options.UI.contextMenu = {}), this.options.UI.contextMenu.enabled = !1), this.graphDepth = 0, this.options.parentGraph) {
      this.setParentGraph(this.options.parentGraph);
      let p = this.parentGraph;
      for (; p; )
        p = p.parentGraph, this.graphDepth++;
    }
    const i = {
      ...this.options.render
    }, s = this.options.UI, o = document.createElement("div");
    this.app_id = ct(8, "pivotick-app-"), o.id = this.app_id, o.classList.add("pivotick"), t.appendChild(o), this.noteManager = new _h(this), this.queryEngine = new xh(this), this.editing = new Ah(this), this.UIManager = new bh(this, o, s), this.notifier = new wh(this), this.renderer = Vl(this, o, i), this.renderer.setupRendering();
    const a = {
      ...this.options.simulation,
      layout: (d = this.options) == null ? void 0 : d.layout
    };
    if (this.simulation = new Qn(this, a), e) {
      const p = ee.normalizeGraphData(e);
      this._setData(p == null ? void 0 : p.nodes, p == null ? void 0 : p.edges, p == null ? void 0 : p.notes), (c = this.simulation) == null || c.update(), this.renderer.init(), this.renderer.fitAndCenter(1);
    }
    (u = this.options.plugins) == null || u.forEach((p) => this.use(p)), this.startAndRender();
  }
  /**
   * Install a {@link PivotickPlugin}. Can be called at any time — the plugin's
   * UI elements are caught up to the current lifecycle phase. Returns `this`
   * for chaining.
   */
  use(t) {
    return this.UIManager.installPlugin(t), this;
  }
  on(t, e) {
    this.listeners[t].push(e);
  }
  off(t, e) {
    this.listeners[t] = this.listeners[t].filter((n) => n !== e);
  }
  emit(t, ...e) {
    for (const n of this.listeners[t])
      n(...e);
  }
  async startAndRender() {
    await this.simulation.start(), await this.simulation.waitForSimulationStop(), this.renderer.nextTick(), this.renderer.fitAndCenterWhenSettled(), this.UIManager.callGraphReady(), this.ready();
  }
  /**
   * Normalizes graph data by:
   * 1. Building a hierarchy of nodes (including nested children)
   * 2. Creating synthetic edges for edges that point to collapsed children
   * 3. Hiding edges that connect to invisible child nodes
   *
   * Synthetic edges are placeholder edges created when an edge would point to a
   * node inside a collapsed cluster. Instead of pointing to the invisible child,
   * a synthetic edge is created pointing to the parent cluster node. When the
   * cluster is expanded, synthetic edges are hidden and actual edges are shown.
   *
   * Two shapes are synthesised:
   * - **external → collapsed child:** a synthetic edge to each ancestor cluster
   *   of the child (so it re-anchors as clusters expand).
   * - **collapsed child → collapsed child in a *different* cluster:** a single
   *   synthetic edge between the two outermost clusters, so a "collapse every
   *   group into a box" view still shows (and force-links) the box→box
   *   dependency instead of the edge vanishing. It is only shown while both
   *   clusters are collapsed; expanding either hides it (see
   *   {@link ClusterDrawer.toggleSyntheticEdges}). The re-anchored per-child edge
   *   for the partially-expanded case is not synthesised.
   *
   * @param data - The raw graph data to normalize
   * @returns Normalized graph data with synthetic edges added
   * @private
   */
  static normalizeGraphData(t) {
    const e = t.nodes.map((p) => ee.normalizeNode(p)), n = /* @__PURE__ */ new Map(), i = (p) => {
      p.children.forEach((g) => {
        n.set(g.id, g), g.hasChildren() && i(g);
      });
    };
    e.forEach((p) => {
      i(p);
    });
    const s = new Map(e.map((p) => [p.id, p])), o = new Map([...s, ...n]), a = t.edges.map((p) => ee.normalizeEdge(p, o)).filter((p) => p !== null), l = (p) => {
      const g = [];
      let f = p.parentNode;
      for (; f; )
        g.push(f), f = f.parentNode;
      return g;
    }, d = [], c = /* @__PURE__ */ new Set();
    for (const p of a)
      if (!p.from.isChild && p.to.isChild && p.to.parentNode) {
        let g = p.to.parentNode;
        const f = /* @__PURE__ */ new Set();
        for (; g && !f.has(g.id); ) {
          f.add(g.id);
          const v = `synthetic-${p.from.id}-${g.id}`, y = new ae(
            v,
            p.from,
            g,
            // { 'label': `${edge.from.id}-${currentParent.id}` },
            {},
            {},
            null,
            p.to
          );
          if (y.to.isChild && y.hide(), d.push(y), !g.parentNode) break;
          g = g.parentNode;
        }
      } else if (p.from.isChild && p.to.isChild) {
        const g = [p.from, ...l(p.from)], f = [p.to, ...l(p.to)], v = g[g.length - 1], y = f[f.length - 1];
        if (v.id === y.id) continue;
        p.isCrossCluster = !0, p.syntheticSourceNode = p.from, p.syntheticTerminalNode = p.to;
        for (const b of g)
          for (const k of f) {
            if (b === p.from && k === p.to) continue;
            const C = `synthetic-${b.id}-${k.id}`;
            if (c.has(C)) continue;
            c.add(C);
            const T = new ae(C, b, k, {}, {}, p.directed, p.to);
            T.isCrossCluster = !0, T.syntheticSourceNode = p.from, d.push(T);
          }
      }
    a.push(...d), ee.resolveCrossClusterEdges(a);
    const u = (t.notes ?? []).map((p) => ee.normalizeNote(p)).filter((p) => p !== null);
    return {
      nodes: e,
      edges: a,
      notes: u
    };
  }
  /**
   * Shows exactly the cross-cluster stand-in edge that matches the current collapse
   * state, and hides the rest. For a real child→child edge across two clusters we
   * pre-create one synthetic edge per (from-representative, to-representative) pair
   * (see {@link normalizeGraphData}); this picks the one whose endpoints are the
   * nodes actually rendered right now — each endpoint's *deepest visible ancestor*
   * (itself if every ancestor is expanded, otherwise the outermost collapsed box).
   * When both clusters are fully expanded no stand-in matches and the real edge is
   * drawn by the subgraphs instead. Called on load and on every expand/collapse.
   * @private
   */
  static resolveCrossClusterEdges(t) {
    const e = (n) => {
      const i = [];
      let s = n.parentNode;
      for (; s; )
        i.push(s), s = s.parentNode;
      for (let o = i.length - 1; o >= 0; o--)
        if (!i[o].expanded) return i[o];
      return n;
    };
    for (const n of t) {
      if (!n.isCrossCluster || !n.syntheticSourceNode || !n.syntheticTerminalNode) continue;
      const i = n.from === e(n.syntheticSourceNode) && n.to === e(n.syntheticTerminalNode);
      n.visible !== i && (i ? n.show() : n.hide());
    }
  }
  /**
   * Normalizes a node, marking its children and hiding them.
   * @private
   */
  static normalizeNode(t, e = 0) {
    let n = [];
    !(t instanceof W) && t.children && (n = t.children.map((s) => ee.normalizeNode(s, e + 1)));
    const i = t instanceof W ? t : new W(t.id.toString(), t.data, t.style, t.domID, n);
    return t instanceof W || (typeof t.x == "number" && (i.x = t.x), typeof t.y == "number" && (i.y = t.y), typeof t.fx == "number" && (i.fx = t.fx), typeof t.fy == "number" && (i.fy = t.fy)), i.children.forEach((s) => {
      s.markAsChild(i, e + 1), s.hide();
    }), i.weight = t.weight, i.expanded = t.expanded, i;
  }
  /**
   * Normalizes an edge, hiding it if it connects to a child node in a collapsed cluster.
   * @private
   */
  static normalizeEdge(t, e) {
    var a;
    if (t instanceof ae) return t;
    const n = e, i = n.get(t.from.toString()), s = n.get(t.to.toString());
    if (!i || !s) return null;
    const o = new ae(
      ((a = t.id) == null ? void 0 : a.toString()) ?? `${t.from}-${t.to}`,
      i,
      s,
      t.data,
      t.style
    );
    return (i.isChild || s.isChild) && o.hide(), o;
  }
  static normalizeNote(t) {
    return t instanceof ve ? t : new ve(t);
  }
  ready() {
    this.emit("ready");
  }
  nodeAdd(t) {
    this.emit("nodeAdd", t);
  }
  nodeRemove(t) {
    this.emit("nodeRemove", t);
  }
  nodeChange(t, e, n) {
    this.emit("nodeChange", t, e, n);
  }
  edgeAdd(t) {
    this.emit("edgeAdd", t);
  }
  edgeRemove(t) {
    this.emit("edgeRemove", t);
  }
  edgeChange(t, e, n) {
    this.emit("edgeChange", t, e, n);
  }
  noteAdd(t) {
    this.emit("noteAdd", t);
  }
  noteChange(t) {
    this.emit("noteChange", t);
  }
  noteRemove(t) {
    this.emit("noteRemove", t);
  }
  dataBatchChanged(t) {
    t && (this.emit("dataBatchChanged", t), t.forEach((e) => {
      switch (e.type) {
        case "node:add":
          this.nodeAdd(e.node);
          break;
        case "node:change":
          this.nodeChange(e.node, e.previousData, e.nextData);
          break;
        case "node:remove":
          this.nodeRemove(e.node);
          break;
        case "edge:add":
          this.edgeAdd(e.edge);
          break;
        case "edge:change":
          this.edgeChange(e.edge, e.previousData, e.nextData);
          break;
        case "edge:remove":
          this.edgeRemove(e.edge);
          break;
        case "note:add":
          this.noteAdd(e.note);
          break;
        case "note:change":
          this.noteChange(e.note);
          break;
        case "note:remove":
          this.noteRemove(e.note);
          break;
      }
    }));
  }
  /**
   * Returns the current configuration options of the graph.
   */
  getOptions() {
    return this.options;
  }
  /**
   * @private
   * Retrieves the callbacks defined in the options for graph interactions.
   * 
   * @returns A partial `InteractionCallbacks` object, or `undefined` if no callbacks are set.
   */
  getCallbacks() {
    var t;
    return (t = this.options) == null ? void 0 : t.callbacks;
  }
  /**
   * @private
   */
  onChange() {
    var t, e, n;
    (t = this.renderer) == null || t.update(!0), (e = this.simulation) == null || e.update(), (n = this.renderer) == null || n.nextTick();
  }
  /**
   * Updates the graph with new nodes and/or edges.
   * 
   * Existing nodes or edges with matching IDs are replaced; new ones are added.
   * Triggers the `onChange` callback if any updates were applied.
   * 
   * @param newNodes Optional array of nodes to update or add.
   * @param newEdges Optional array of edges to update or add.
   * Triggers `onChange`
   */
  updateData(t, e, n = !0) {
    const i = [];
    t && t.forEach((s) => {
      var o;
      this.nodes.has(s.id) ? (i.push({
        type: "node:change",
        node: s,
        previousData: (o = this.nodes.get(s.id)) == null ? void 0 : o.getData(),
        nextData: s.getData()
      }), this.nodes.set(s.id, s)) : (this.addNode(s), i.push({
        type: "node:add",
        node: s
      }));
    }), e && e.forEach((s) => {
      var o;
      this.edges.has(s.id) ? (i.push({
        type: "edge:change",
        edge: s,
        previousData: (o = this.nodes.get(s.id)) == null ? void 0 : o.getData(),
        nextData: s.getData()
      }), this.edges.set(s.id, s)) : (this.addEdge(s), i.push({
        type: "edge:add",
        edge: s
      }));
    }), (t || e) && this.onChange(), n && this.dataBatchChanged(i);
  }
  /**
   * Replaces all current nodes and edges in the graph with the provided data.
   * Clears existing nodes and edges before setting the new ones.
   * Triggers the `onChange` callback after the update.
   * 
   * @param nodes Array of nodes to set. Defaults to an empty array.
   * @param edges Array of edges to set. Defaults to an empty array.
   */
  setData(t = [], e = [], n = []) {
    this.nodes.clear(), this.edges.clear(), this.noteManager.clear();
    const i = ee.normalizeGraphData({ nodes: t, edges: e, notes: n });
    this._setData(i == null ? void 0 : i.nodes, i == null ? void 0 : i.edges, i == null ? void 0 : i.notes), this.onChange(), this.startAndRender();
  }
  /** 
   * @private
   */
  _setData(t, e, n) {
    const i = (o) => {
      o.children.forEach((a) => {
        this.nodes.set(a.id, a), a.hasChildren() && i(a);
      });
    }, s = [];
    t.forEach((o) => {
      this.nodes.set(o.id, o), s.push({
        type: "node:add",
        node: o
      }), i(o);
    }), e.forEach((o) => {
      if (!this.nodes.has(o.from.id) || !this.nodes.has(o.to.id)) {
        console.warn(`Edge is pointing a node that doesn't exist. (${this.nodes.get(o.from.id)}) -> (${this.nodes.get(o.to.id)}). It has been skipped`);
        return;
      }
      this.edges.set(o.id, o), s.push({
        type: "edge:add",
        edge: o
      });
    }), this.dataBatchChanged(s), n.forEach((o) => {
      this.noteManager.addNote(o, !0);
    });
  }
  /**
   * Adds a node to the graph.
   * 
   * @throws Error if a node with the same `id` already exists.
   * Triggers `onChange` after the node is successfully added.
   */
  addNode(t) {
    const e = ee.normalizeNode(t);
    if (this.nodes.has(e.id))
      throw new Error(`Node with id ${e.id} already exists.`);
    return this.nodes.set(e.id, e), this.dataBatchChanged([{
      type: "node:add",
      node: e
    }]), this.onChange(), e;
  }
  /**
   * Retrieves a node from the graph by its ID.
   * 
   * Returns a deep clone of the node to prevent external mutations.
   * 
   * @param id The ID of the node or a Node object.
   * @returns A cloned `Node` if found, otherwise `undefined`.
   */
  getNode(t) {
    const e = this._getNode(t);
    return e ? structuredClone(e) : void 0;
  }
  /**
   * Retrieves a node from the graph by its ID.
   * 
   * Returns the actual node instance, allowing direct modifications.
   * 
   * **Warning:** Directly modifying nodes using this method may lead to unexpected behavior.
   * It is generally safer to use `getNode` which returns a cloned instance.
   * 
   * @param id The ID of the node or a Node object.
   * @returns The `Node` if found, otherwise `undefined`.
   */
  getMutableNode(t) {
    return this._getNode(t);
  }
  _getNode(t) {
    if (typeof t == "string") {
      const e = this.nodes.get(t);
      return e || void 0;
    } else return t instanceof W ? t : void 0;
  }
  /**
   * Removes a node from the graph by its ID.
   * 
   * Also removes any edges connected to the node.
   * 
   * @param id The ID of the node to remove.
   * Triggers `onChange` after the node and its edges are removed.
   */
  removeNode(t) {
    if (this.nodes.has(t)) {
      this.dataBatchChanged([{
        type: "node:remove",
        node: this.nodes.get(t)
      }]), this.nodes.delete(t);
      for (const [e, n] of this.edges)
        (n.from.id === t || n.to.id === t) && (this.dataBatchChanged([{
          type: "edge:remove",
          edge: this.edges.get(e)
        }]), this.edges.delete(e));
      this.onChange();
    }
  }
  /**
   * Adds an edge to the graph.
   * 
   * Both the source (`from`) and target (`to`) nodes must already exist in the graph.
   * Throws an error if an edge with the same ID already exists.
   * 
   * @param e The edge to add.
   * @throws Error if the edge ID already exists or if either node does not exist.
   * Triggers `onChange` after the edge is successfully added.
   */
  addEdge(t) {
    const e = ee.normalizeEdge(t, this.nodes);
    if (!e)
      throw new Error("Either of the from or to nodes do not exist");
    if (this.edges.has(e.id))
      throw new Error(`Edge with id ${e.id} already exists.`);
    if (!this.nodes.has(e.from.id) || !this.nodes.has(e.to.id))
      throw new Error("Both nodes must exist in the graph before adding an edge.");
    return this.edges.set(e.id, e), this.dataBatchChanged([{
      type: "edge:add",
      edge: e
    }]), this.onChange(), e;
  }
  /**
   * Retrieves an edge from the graph by its ID.
   * 
   * Returns a deep clone of the edge to prevent external mutations.
   * 
   * @param id The ID of the edge.
   * @returns A cloned `Edge` if found, otherwise `undefined`.
   */
  getEdge(t) {
    const e = this.edges.get(t);
    return e ? structuredClone(e) : void 0;
  }
  /**
   * Retrieves an edge from the graph by its ID.
   * 
   * Returns the actual edge instance, allowing direct modifications.
   * 
   * **Warning:** Directly modifying edges using this method may lead to unexpected behavior.
   * It is generally safer to use `getEdge` which returns a cloned instance.
   * 
   * @param id The ID of the edge.
   * @returns The `Edge` if found, otherwise `undefined`.
   */
  getMutableEdge(t) {
    return this.edges.get(t);
  }
  /**
   * Removes an edge from the graph by its ID.
   * 
   * @param id The ID of the edge to remove.
   * Triggers `onChange` after the edge is removed.
   */
  removeEdge(t) {
    this.edges.has(t) && (this.dataBatchChanged([{
      type: "edge:remove",
      edge: this.edges.get(t)
    }]), this.edges.delete(t), this.onChange());
  }
  /**
   * Returns the number of nodes currently in the graph.
   * 
   * @returns The total node count.
   */
  getNodeCount() {
    return this.nodes.size;
  }
  /**
   * Returns the number of edges currently in the graph.
   * 
   * @returns The total edge count.
   */
  getEdgeCount() {
    return this.edges.size;
  }
  /**
   * Retrieves all nodes in the graph.
   * 
   * Returns clones of the nodes to prevent external modifications.
   * 
   * @returns An array of cloned `Node` objects.
   */
  getNodes() {
    return Array.from(this.nodes.values()).filter((t) => !t.isChild).map((t) => t.clone());
  }
  /**
   * Retrieves all nodes in the graph.
   * 
   * Returns the actual node instances, allowing direct modifications.
   * 
   * @remarks
   * ⚠️ **Warning:** Modifying nodes directly may lead to unexpected behavior.
   * It is generally safer to use `getNodes`, which returns cloned instances.
   * 
   * @returns An array of `Node` objects.
   */
  getMutableNodes() {
    return Array.from(this.nodes.values());
  }
  /**
   * Retrieves all visible nodes in the graph. Recursively adding visible children
   * 
   * Returns the actual node instances, allowing direct modifications.
   * 
   * @remarks
   * ⚠️ **Warning:** Modifying nodes directly may lead to unexpected behavior.
   * It is generally safer to use `getNodes`, which returns cloned instances.
   * 
   * @returns An array of `Node` objects.
   */
  getMutableVisibleNodes() {
    return this.getMutableNodes().filter((t) => t.visible);
  }
  /**
   * Retrieves all edges in the graph.
   * 
   * Returns clones of the edges to prevent external modifications.
   * 
   * @returns An array of cloned `Edge` objects.
   */
  getEdges() {
    return Array.from(this.edges.values()).map((t) => t.clone());
  }
  /**
   * Retrieves all edges in the graph.
   * 
   * Returns the actual edge instances, allowing direct modifications.
   * 
   * @remarks
   * ⚠️ **Warning:** Modifying edges directly may lead to unexpected behavior.
   * Use {@link getEdges} instead to work with safe clones.
   * 
   * @returns An array of `Edge` objects.
   */
  getMutableEdges() {
    return Array.from(this.edges.values());
  }
  /**
   * Retrieves all visible edges in the graph.
   * 
   * Returns the actual edge instances, allowing direct modifications.
   * 
   * @remarks
   * ⚠️ **Warning:** Modifying edges directly may lead to unexpected behavior.
   * Use {@link getEdges} instead to work with safe clones.
   * 
   * @returns An array of `Edge` objects.
   */
  getMutableVisibleEdges() {
    return this.getMutableEdges().filter((t) => t.visible);
  }
  /**
   * Finds all edges originating from a given node.
   * 
   * Returns cloned edges to prevent external modifications.
   * 
   * @param node The node or node ID to find outgoing edges from.
   * @returns An array of `Edge` objects whose `from` node matches the query.
   */
  getEdgesFromNode(t) {
    const e = this._getNode(t);
    return e ? this.getEdges().filter((n) => n.from.id === e.id) : [];
  }
  /**
   * Finds all edges pointing to a given node.
   * 
   * Returns cloned edges to prevent external modifications.
   * 
   * @param node The node or node ID to find incoming edges to.
   * @returns An array of `Edge` objects whose `to` node matches the query.
   */
  getEdgesToNode(t) {
    const e = this._getNode(t);
    return e ? this.getEdges().filter((n) => n.to.id === e.id) : [];
  }
  /**
   * Retrieves all nodes directly connected from the given node.
   * 
   * Returns cloned nodes to prevent external modifications.
   * 
   * @param node The node or node ID to find connections from.
   * @returns An array of `Node` objects directly connected from the given node.
   */
  getConnectedNodes(t) {
    const e = this._getNode(t);
    return e ? this.getEdgesFromNode(e.id).map((s) => s.to) : [];
  }
  getNotes() {
    return this.noteManager.getNotes();
  }
  getNote(t) {
    return this.noteManager.getNote(t);
  }
  setVisibleNodes(t) {
    const e = new Set(t.map((i) => i.id));
    let n = !1;
    this.nodes.forEach((i) => {
      const s = e.has(i.id);
      i.visible !== s && (i.toggleVisibility(s), n = !0);
    }), this.edges.forEach((i) => {
      var l, d;
      if (i.isCrossCluster) return;
      const s = (((l = i.getSubgraphFromNode()) == null ? void 0 : l.visible) ?? i.from.visible) && (((d = i.getSubgraphToNode()) == null ? void 0 : d.visible) ?? i.to.visible), o = !i.isSynthetic || !i.to.expanded, a = s && o;
      i.visible !== a && (i.toggleVisibility(a), n = !0);
    }), n && this.onChange();
  }
  hideNode(t) {
    t.hide(), t.getEdgesOut().forEach((e) => {
      e.hide();
    }), t.getEdgesIn().forEach((e) => {
      e.hide();
    }), this.onChange();
  }
  showNode(t) {
    t.show(), t.getEdgesOut().forEach((e) => {
      e.target.visible && e.show();
    }), t.getEdgesIn().forEach((e) => {
      e.from.visible && e.show();
    }), this.onChange();
  }
  toggleExpandNode(t) {
    t.toggleExpand(), this.onChange();
  }
  toggleExpandNodes(t) {
    t.forEach((e) => {
      e.toggleExpand();
    }), this.onChange();
  }
  /**
   * Trigger the next render update of the graph.
   */
  nextTick() {
    var t;
    (t = this.renderer) == null || t.nextTick();
  }
  /**
   * Trigger the next render update of the graph for the passed subjects.
   */
  nextTickFor(t) {
    var e;
    (e = this.renderer) == null || e.nextTickFor(t);
  }
  /**
   * Destroy all UI components.
   */
  destroy() {
    this.UIManager.destroy(), this.renderer.destroy();
  }
  /**
   * The ID of the app
   */
  getAppID() {
    return this.app_id;
  }
  /**
   * @private
   * Set the parent graph instance if this instance is nested as a subgraph
   */
  setParentGraph(t) {
    this.parentGraph = t;
  }
  /**
   * @private
   * Set the parent graph instance if this instance is nested as a subgraph
   */
  getParentGraph() {
    return this.parentGraph;
  }
  getGraphDepth() {
    return this.graphDepth;
  }
  /**
   * @private
   */
  updateLayoutProgress(t, e, n) {
    var i;
    (i = this.renderer) == null || i.updateLayoutProgress(t, e, n);
  }
  /**
   * Brings the specified node or edge into focus within the graph view.
   * 
   * @param element The `Node` or `Edge` to focus.
   */
  focusElement(t) {
    this.renderer.focusElement(t);
  }
  /**
   * Selects a given node or edge in the graph.
   * 
   * @param element The `Node` or `Edge` to select.
   */
  selectElement(t) {
    t instanceof ae ? this.renderer.getGraphInteraction().selectEdge(t.getGraphElement(), t) : t instanceof W && this.renderer.getGraphInteraction().selectNode(t.getGraphElement(), t);
  }
  /**
   * Deselect all
   */
  deselectAll() {
    this.renderer.getGraphInteraction().unselectAll();
  }
  /**
   * Add a highligh class to the given node or edge
   * 
   * @param element The `Node` or `Edge` to highligh.
   */
  highlightElement(t) {
    this.renderer.highlightElement(t);
  }
  /**
   * Remove a highligh class to the given node or edge
   * 
   * @param element The `Node` or `Edge` to select.
   */
  unHighlightElement(t) {
    this.renderer.unHighlightElement(t);
  }
  /**
   * Remove any highligh class from any nodes or edges
   * 
   */
  clearHighlightedElements() {
    this.renderer.clearHighlightedElements();
  }
}
const Un = {
  pivotick: {
    colors: [
      "#7EA2FB",
      // vibrant-blue
      "#A666F4",
      // vibrant-indigo
      "#85CB33",
      // vibrant-green
      "#FFB74D",
      // amber-orange
      "#4DD0E1",
      // cyan-light
      "#FFD54F",
      // yellowish accent
      "#BA68C8",
      // purple accent
      "#81C784",
      // green-light
      "#00BCD4",
      // cyan-light
      "#FFA726"
      // orange accent
    ],
    maxColors: 10,
    colorblindSafe: !1,
    description: "Official Pivotick palette"
  },
  "d3-category10": {
    colors: [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf"
    ],
    maxColors: 10,
    colorblindSafe: !1,
    description: "Classic D3 categorical palette"
  },
  "d3-tableau10": {
    colors: [
      "#4E79A7",
      "#F28E2B",
      "#E15759",
      "#76B7B2",
      "#59A14F",
      "#EDC948",
      "#B07AA1",
      "#FF9DA7",
      "#9C755F",
      "#BAB0AC"
    ],
    maxColors: 10,
    colorblindSafe: !1,
    description: "Modern Tableau 10 palette"
  },
  "okabe-ito": {
    colors: [
      "#E69F00",
      "#56B4E9",
      "#009E73",
      "#F0E442",
      "#0072B2",
      "#D55E00",
      "#CC79A7",
      "#000000"
    ],
    maxColors: 8,
    colorblindSafe: !0,
    description: "Colorblind-safe Okabe-Ito palette"
  },
  "brewer-set3": {
    colors: [
      "#8DD3C7",
      "#FFFFB3",
      "#BEBADA",
      "#FB8072",
      "#80B1D3",
      "#FDB462",
      "#B3DE69",
      "#FCCDE5",
      "#D9D9D9",
      "#BC80BD",
      "#CCEBC5",
      "#FFED6F"
    ],
    maxColors: 12,
    colorblindSafe: !1,
    description: "Large ColorBrewer Set3 palette"
  },
  "tol-bright": {
    colors: [
      "#4477AA",
      "#EE6677",
      "#228833",
      "#CCBB44",
      "#66CCEE",
      "#AA3377",
      "#BBBBBB"
    ],
    maxColors: 7,
    colorblindSafe: !0,
    description: "Paul Tol bright palette"
  },
  "kelly-22": {
    colors: [
      "#F2F3F4",
      "#222222",
      "#F3C300",
      "#875692",
      "#F38400",
      "#A1CAF1",
      "#BE0032",
      "#C2B280",
      "#848482",
      "#008856",
      "#E68FAC",
      "#0067A5",
      "#F99379",
      "#604E97",
      "#F6A600",
      "#B3446C",
      "#DCD300",
      "#882D17",
      "#8DB600",
      "#654522",
      "#E25822",
      "#2B3D26"
    ],
    maxColors: 22,
    colorblindSafe: !1,
    description: "Kelly's 22 colors of maximum contrast"
  },
  "tableau-40": {
    colors: [
      "#4E79A7",
      "#A0CBE8",
      "#F28E2B",
      "#FFBE7D",
      "#59A14F",
      "#8CD17D",
      "#B6992D",
      "#F1CE63",
      "#499894",
      "#86BCB6",
      "#E15759",
      "#FF9D9A",
      "#79706E",
      "#BAB0AC",
      "#D37295",
      "#FABFD2",
      "#B07AA1",
      "#D4A6C8",
      "#9D7660",
      "#D7B5A6"
    ],
    maxColors: 40,
    colorblindSafe: !1,
    description: "Tableau extended palette, 40 colors"
  }
};
class Ih {
  constructor(t) {
    h(this, "palette");
    h(this, "valueToColor", /* @__PURE__ */ new Map());
    h(this, "nextIndex", 0);
    this.palette = this.resolvePalette(t);
  }
  resolvePalette(t) {
    var n;
    if (!t)
      return ((n = Un.pivotick) == null ? void 0 : n.colors) ?? Object.values(Un)[0].colors;
    if (Array.isArray(t)) {
      if (t.length === 0)
        throw new Error("Custom palette array cannot be empty.");
      return t;
    }
    const e = Un[t];
    if (!e)
      throw new Error(`Palette "${t}" not found in PALETTE_REGISTRY.`);
    return e.colors;
  }
  /**
   * Returns a color for the given value.
   * - If the value was already mapped, returns the same color.
   * - If not, assigns the next palette color (cycles if needed).
   */
  getColor(t) {
    if (t == null)
      return this.palette[0];
    const e = this.valueToColor.get(t);
    if (e)
      return e;
    const n = this.palette[this.nextIndex % this.palette.length];
    return this.valueToColor.set(t, n), this.nextIndex++, n;
  }
  /**
   * Clears all mappings and restarts from the beginning of the palette.
   */
  reset() {
    this.valueToColor.clear(), this.nextIndex = 0;
  }
  /**
   * Returns current internal mapping (read-only snapshot).
   */
  getMapping() {
    return new Map(this.valueToColor);
  }
}
ee.Node = W;
ee.Edge = ae;
ee.ColorPaletteMapper = Ih;
ee.UIComponent = X;
export {
  Ih as C,
  ae as E,
  ee as G,
  W as N,
  Qn as S,
  me as T,
  X as U,
  nn as a
};
