var xa = Object.defineProperty;
var Ma = (r, e, t) => e in r ? xa(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => Ma(r, typeof e != "symbol" ? e + "" : e, t);
import { select as ht } from "d3-selection";
import { transition as Ln } from "d3-transition";
import { zoom as Ta, zoomTransform as Aa, zoomIdentity as Ms } from "d3-zoom";
import { forceCenter as Na, forceRadial as Ts, forceY as As, forceX as Ns, forceCollide as Ia, forceManyBody as _a, forceLink as Ra, forceSimulation as La } from "d3-force";
import ye from "lodash.merge";
import { drag as Da } from "d3-drag";
import { tree as Oa, hierarchy as Xr } from "d3-hierarchy";
function gt(r, ...e) {
  if (typeof r == "string")
    return r;
  if (typeof r == "function") {
    const t = r(...e);
    return typeof t == "string" ? t : void 0;
  }
}
function We(r, ...e) {
  if (typeof r == "boolean")
    return r;
  if (typeof r == "function") {
    const t = r(...e);
    return typeof t == "boolean" ? t : void 0;
  }
}
function Qt(r, ...e) {
  if (typeof r == "number")
    return r;
  if (typeof r == "function") {
    const t = r(...e);
    return typeof t == "number" ? t : void 0;
  }
}
function Xi(r) {
  const e = document.createElement("span");
  return e.textContent = r, e;
}
function Ze(r) {
  return typeof (r == null ? void 0 : r.then) == "function";
}
function mi(r) {
  if (r instanceof Element)
    return r;
  if (typeof r == "string")
    return Xi(r.trim());
  if (typeof r == "boolean")
    return Xi(String(r));
  if (Ze(r)) {
    console.warn("[pivotick] a synchronous content hook returned a Promise — this surface renders sync content only.");
    return;
  } else if (typeof r == "object")
    return Xi(JSON.stringify(r, void 0, 2));
}
function Fa(r, ...e) {
  return mi(typeof r == "function" ? r(...e) : r);
}
const Is = /* @__PURE__ */ new Map();
function Zr(r) {
  const e = r.trim();
  if (!e) return { glyph: "", fontFamily: "", fontWeight: "", fontStyle: "" };
  const t = Is.get(e);
  if (t) return t;
  const i = document.createElement("i");
  i.className = e, i.style.position = "absolute", i.style.left = "-9999px", i.style.top = "-9999px", i.style.visibility = "hidden", document.body.appendChild(i);
  const n = getComputedStyle(i, "::before"), s = {
    glyph: Pa(n.content),
    fontFamily: n.fontFamily,
    fontWeight: n.fontWeight,
    fontStyle: n.fontStyle
  };
  return document.body.removeChild(i), Is.set(e, s), s;
}
function Pa(r) {
  if (!r || r === "none" || r === "normal" || /counter\(|counters\(|attr\(|url\(/.test(r)) return "";
  const e = r.match(/(['"])((?:\\.|(?!\1).)*)\1/);
  return e ? e[2] : "";
}
/*! @license DOMPurify 3.4.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.7/LICENSE */
function _s(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var t = 0, i = Array(e); t < e; t++) i[t] = r[t];
  return i;
}
function Ba(r) {
  if (Array.isArray(r)) return r;
}
function Ha(r, e) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var i, n, s, o, a = [], l = !0, h = !1;
    try {
      if (s = (t = t.call(r)).next, e !== 0) for (; !(l = (i = s.call(t)).done) && (a.push(i.value), a.length !== e); l = !0) ;
    } catch (d) {
      h = !0, n = d;
    } finally {
      try {
        if (!l && t.return != null && (o = t.return(), Object(o) !== o)) return;
      } finally {
        if (h) throw n;
      }
    }
    return a;
  }
}
function za() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $a(r, e) {
  return Ba(r) || Ha(r, e) || Ga(r, e) || za();
}
function Ga(r, e) {
  if (r) {
    if (typeof r == "string") return _s(r, e);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _s(r, e) : void 0;
  }
}
const Qr = Object.entries, Rs = Object.setPrototypeOf, Ua = Object.isFrozen, qa = Object.getPrototypeOf, ja = Object.getOwnPropertyDescriptor;
let xt = Object.freeze, _t = Object.seal, fe = Object.create, Jr = typeof Reflect < "u" && Reflect, kn = Jr.apply, Cn = Jr.construct;
xt || (xt = function(e) {
  return e;
});
_t || (_t = function(e) {
  return e;
});
kn || (kn = function(e, t) {
  for (var i = arguments.length, n = new Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++)
    n[s - 2] = arguments[s];
  return e.apply(t, n);
});
Cn || (Cn = function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  return new e(...i);
});
const de = ut(Array.prototype.forEach), Wa = ut(Array.prototype.lastIndexOf), Ls = ut(Array.prototype.pop), ue = ut(Array.prototype.push), Va = ut(Array.prototype.splice), St = Array.isArray, $e = ut(String.prototype.toLowerCase), Zi = ut(String.prototype.toString), Ds = ut(String.prototype.match), pe = ut(String.prototype.replace), Os = ut(String.prototype.indexOf), Ka = ut(String.prototype.trim), Ya = ut(Number.prototype.toString), Xa = ut(Boolean.prototype.toString), Fs = typeof BigInt > "u" ? null : ut(BigInt.prototype.toString), Ps = typeof Symbol > "u" ? null : ut(Symbol.prototype.toString), st = ut(Object.prototype.hasOwnProperty), Re = ut(Object.prototype.toString), bt = ut(RegExp.prototype.test), Le = Za(TypeError);
function ut(r) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      i[n - 1] = arguments[n];
    return kn(r, e, i);
  };
}
function Za(r) {
  return function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return Cn(r, t);
  };
}
function O(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $e;
  if (Rs && Rs(r, null), !St(e))
    return r;
  let i = e.length;
  for (; i--; ) {
    let n = e[i];
    if (typeof n == "string") {
      const s = t(n);
      s !== n && (Ua(e) || (e[i] = s), n = s);
    }
    r[n] = !0;
  }
  return r;
}
function Qa(r) {
  for (let e = 0; e < r.length; e++)
    st(r, e) || (r[e] = null);
  return r;
}
function kt(r) {
  const e = fe(null);
  for (const i of Qr(r)) {
    var t = $a(i, 2);
    const n = t[0], s = t[1];
    st(r, n) && (St(s) ? e[n] = Qa(s) : s && typeof s == "object" && s.constructor === Object ? e[n] = kt(s) : e[n] = s);
  }
  return e;
}
function Ja(r) {
  switch (typeof r) {
    case "string":
      return r;
    case "number":
      return Ya(r);
    case "boolean":
      return Xa(r);
    case "bigint":
      return Fs ? Fs(r) : "0";
    case "symbol":
      return Ps ? Ps(r) : "Symbol()";
    case "undefined":
      return Re(r);
    case "function":
    case "object": {
      if (r === null)
        return Re(r);
      const e = r, t = $t(e, "toString");
      if (typeof t == "function") {
        const i = t(e);
        return typeof i == "string" ? i : Re(i);
      }
      return Re(r);
    }
    default:
      return Re(r);
  }
}
function $t(r, e) {
  for (; r !== null; ) {
    const i = ja(r, e);
    if (i) {
      if (i.get)
        return ut(i.get);
      if (typeof i.value == "function")
        return ut(i.value);
    }
    r = qa(r);
  }
  function t() {
    return null;
  }
  return t;
}
function tl(r) {
  try {
    return bt(r, ""), !0;
  } catch {
    return !1;
  }
}
const Bs = xt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Qi = xt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ji = xt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), el = xt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), tn = xt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), il = xt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Hs = xt(["#text"]), zs = xt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), en = xt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), $s = xt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ai = xt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), nl = _t(/{{[\w\W]*|^[\w\W]*}}/g), sl = _t(/<%[\w\W]*|^[\w\W]*%>/g), rl = _t(/\${[\w\W]*/g), ol = _t(/^data-[\-\w.\u00B7-\uFFFF]+$/), al = _t(/^aria-[\-\w]+$/), Gs = _t(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), ll = _t(/^(?:\w+script|data):/i), cl = _t(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), hl = _t(/^html$/i), dl = _t(/^[a-z][.\w]*(-[.\w]+)+$/i), zt = {
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
}, ul = function() {
  return typeof window > "u" ? null : window;
}, pl = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let i = null;
  const n = "data-tt-policy-suffix";
  t && t.hasAttribute(n) && (i = t.getAttribute(n));
  const s = "dompurify" + (i ? "#" + i : "");
  try {
    return e.createPolicy(s, {
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
}, Us = function() {
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
function to() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ul();
  const e = (_) => to(_);
  if (e.version = "3.4.7", e.removed = [], !r || !r.document || r.document.nodeType !== zt.document || !r.Element)
    return e.isSupported = !1, e;
  let t = r.document;
  const i = t, n = i.currentScript;
  r.DocumentFragment;
  const s = r.HTMLTemplateElement, o = r.Node, a = r.Element, l = r.NodeFilter, h = r.NamedNodeMap;
  h === void 0 && (r.NamedNodeMap || r.MozNamedAttrMap), r.HTMLFormElement;
  const d = r.DOMParser, u = r.trustedTypes, p = a.prototype, g = $t(p, "cloneNode"), f = $t(p, "remove"), v = $t(p, "nextSibling"), y = $t(p, "childNodes"), b = $t(p, "parentNode"), k = $t(p, "shadowRoot"), S = $t(p, "attributes"), N = o && o.prototype ? $t(o.prototype, "nodeType") : null, L = o && o.prototype ? $t(o.prototype, "nodeName") : null;
  if (typeof s == "function") {
    const _ = t.createElement("template");
    _.content && _.content.ownerDocument && (t = _.content.ownerDocument);
  }
  let I, q = "";
  const F = t, R = F.implementation, Y = F.createNodeIterator, nt = F.createDocumentFragment, yt = F.getElementsByTagName, T = i.importNode;
  let A = Us();
  e.isSupported = typeof Qr == "function" && typeof b == "function" && R && R.createHTMLDocument !== void 0;
  const P = nl, H = sl, x = rl, D = ol, $ = al, at = ll, pt = cl, W = dl;
  let mt = Gs, U = null;
  const Ft = O({}, [...Bs, ...Qi, ...Ji, ...tn, ...Hs]);
  let Q = null;
  const Te = O({}, [...zs, ...en, ...$s, ...ai]);
  let B = Object.seal(fe(null, {
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
  })), Mt = null, Je = null;
  const Vt = Object.seal(fe(null, {
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
  let rs = !0, Bi = !0, os = !1, as = !0, Kt = !1, Ae = !0, Xt = !1, Hi = !1, zi = !1, oe = !1, ti = !1, ei = !1, ls = !0, cs = !1;
  const hs = "user-content-";
  let $i = !0, Ne = !1, ae = {}, Pt = null;
  const Gi = O({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let ds = null;
  const us = O({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ui = null;
  const ps = O({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ii = "http://www.w3.org/1998/Math/MathML", ni = "http://www.w3.org/2000/svg", Bt = "http://www.w3.org/1999/xhtml";
  let le = Bt, qi = !1, ji = null;
  const ya = O({}, [ii, ni, Bt], Zi);
  let Wi = O({}, ["mi", "mo", "mn", "ms", "mtext"]), Vi = O({}, ["annotation-xml"]);
  const ba = O({}, ["title", "style", "font", "a", "script"]);
  let Ie = null;
  const wa = ["application/xhtml+xml", "text/html"], ka = "text/html";
  let lt = null, ce = null;
  const Ca = t.createElement("form"), gs = function(m) {
    return m instanceof RegExp || m instanceof Function;
  }, Ki = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ce && ce === m)
      return;
    (!m || typeof m != "object") && (m = {}), m = kt(m), Ie = // eslint-disable-next-line unicorn/prefer-includes
    wa.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? ka : m.PARSER_MEDIA_TYPE, lt = Ie === "application/xhtml+xml" ? Zi : $e, U = st(m, "ALLOWED_TAGS") && St(m.ALLOWED_TAGS) ? O({}, m.ALLOWED_TAGS, lt) : Ft, Q = st(m, "ALLOWED_ATTR") && St(m.ALLOWED_ATTR) ? O({}, m.ALLOWED_ATTR, lt) : Te, ji = st(m, "ALLOWED_NAMESPACES") && St(m.ALLOWED_NAMESPACES) ? O({}, m.ALLOWED_NAMESPACES, Zi) : ya, Ui = st(m, "ADD_URI_SAFE_ATTR") && St(m.ADD_URI_SAFE_ATTR) ? O(kt(ps), m.ADD_URI_SAFE_ATTR, lt) : ps, ds = st(m, "ADD_DATA_URI_TAGS") && St(m.ADD_DATA_URI_TAGS) ? O(kt(us), m.ADD_DATA_URI_TAGS, lt) : us, Pt = st(m, "FORBID_CONTENTS") && St(m.FORBID_CONTENTS) ? O({}, m.FORBID_CONTENTS, lt) : Gi, Mt = st(m, "FORBID_TAGS") && St(m.FORBID_TAGS) ? O({}, m.FORBID_TAGS, lt) : kt({}), Je = st(m, "FORBID_ATTR") && St(m.FORBID_ATTR) ? O({}, m.FORBID_ATTR, lt) : kt({}), ae = st(m, "USE_PROFILES") ? m.USE_PROFILES && typeof m.USE_PROFILES == "object" ? kt(m.USE_PROFILES) : m.USE_PROFILES : !1, rs = m.ALLOW_ARIA_ATTR !== !1, Bi = m.ALLOW_DATA_ATTR !== !1, os = m.ALLOW_UNKNOWN_PROTOCOLS || !1, as = m.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Kt = m.SAFE_FOR_TEMPLATES || !1, Ae = m.SAFE_FOR_XML !== !1, Xt = m.WHOLE_DOCUMENT || !1, oe = m.RETURN_DOM || !1, ti = m.RETURN_DOM_FRAGMENT || !1, ei = m.RETURN_TRUSTED_TYPE || !1, zi = m.FORCE_BODY || !1, ls = m.SANITIZE_DOM !== !1, cs = m.SANITIZE_NAMED_PROPS || !1, $i = m.KEEP_CONTENT !== !1, Ne = m.IN_PLACE || !1, mt = tl(m.ALLOWED_URI_REGEXP) ? m.ALLOWED_URI_REGEXP : Gs, le = typeof m.NAMESPACE == "string" ? m.NAMESPACE : Bt, Wi = st(m, "MATHML_TEXT_INTEGRATION_POINTS") && m.MATHML_TEXT_INTEGRATION_POINTS && typeof m.MATHML_TEXT_INTEGRATION_POINTS == "object" ? kt(m.MATHML_TEXT_INTEGRATION_POINTS) : O({}, ["mi", "mo", "mn", "ms", "mtext"]), Vi = st(m, "HTML_INTEGRATION_POINTS") && m.HTML_INTEGRATION_POINTS && typeof m.HTML_INTEGRATION_POINTS == "object" ? kt(m.HTML_INTEGRATION_POINTS) : O({}, ["annotation-xml"]);
    const C = st(m, "CUSTOM_ELEMENT_HANDLING") && m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING == "object" ? kt(m.CUSTOM_ELEMENT_HANDLING) : fe(null);
    if (B = fe(null), st(C, "tagNameCheck") && gs(C.tagNameCheck) && (B.tagNameCheck = C.tagNameCheck), st(C, "attributeNameCheck") && gs(C.attributeNameCheck) && (B.attributeNameCheck = C.attributeNameCheck), st(C, "allowCustomizedBuiltInElements") && typeof C.allowCustomizedBuiltInElements == "boolean" && (B.allowCustomizedBuiltInElements = C.allowCustomizedBuiltInElements), Kt && (Bi = !1), ti && (oe = !0), ae && (U = O({}, Hs), Q = fe(null), ae.html === !0 && (O(U, Bs), O(Q, zs)), ae.svg === !0 && (O(U, Qi), O(Q, en), O(Q, ai)), ae.svgFilters === !0 && (O(U, Ji), O(Q, en), O(Q, ai)), ae.mathMl === !0 && (O(U, tn), O(Q, $s), O(Q, ai))), Vt.tagCheck = null, Vt.attributeCheck = null, st(m, "ADD_TAGS") && (typeof m.ADD_TAGS == "function" ? Vt.tagCheck = m.ADD_TAGS : St(m.ADD_TAGS) && (U === Ft && (U = kt(U)), O(U, m.ADD_TAGS, lt))), st(m, "ADD_ATTR") && (typeof m.ADD_ATTR == "function" ? Vt.attributeCheck = m.ADD_ATTR : St(m.ADD_ATTR) && (Q === Te && (Q = kt(Q)), O(Q, m.ADD_ATTR, lt))), st(m, "ADD_URI_SAFE_ATTR") && St(m.ADD_URI_SAFE_ATTR) && O(Ui, m.ADD_URI_SAFE_ATTR, lt), st(m, "FORBID_CONTENTS") && St(m.FORBID_CONTENTS) && (Pt === Gi && (Pt = kt(Pt)), O(Pt, m.FORBID_CONTENTS, lt)), st(m, "ADD_FORBID_CONTENTS") && St(m.ADD_FORBID_CONTENTS) && (Pt === Gi && (Pt = kt(Pt)), O(Pt, m.ADD_FORBID_CONTENTS, lt)), $i && (U["#text"] = !0), Xt && O(U, ["html", "head", "body"]), U.table && (O(U, ["tbody"]), delete Mt.tbody), m.TRUSTED_TYPES_POLICY) {
      if (typeof m.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw Le('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof m.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw Le('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      I = m.TRUSTED_TYPES_POLICY, q = I.createHTML("");
    } else
      I === void 0 && (I = pl(u, n)), I !== null && typeof q == "string" && (q = I.createHTML(""));
    (A.uponSanitizeElement.length > 0 || A.uponSanitizeAttribute.length > 0) && U === Ft && (U = kt(U)), A.uponSanitizeAttribute.length > 0 && Q === Te && (Q = kt(Q)), xt && xt(m), ce = m;
  }, fs = O({}, [...Qi, ...Ji, ...el]), ms = O({}, [...tn, ...il]), Ea = function(m) {
    let C = b(m);
    (!C || !C.tagName) && (C = {
      namespaceURI: le,
      tagName: "template"
    });
    const M = $e(m.tagName), V = $e(C.tagName);
    return ji[m.namespaceURI] ? m.namespaceURI === ni ? C.namespaceURI === Bt ? M === "svg" : C.namespaceURI === ii ? M === "svg" && (V === "annotation-xml" || Wi[V]) : !!fs[M] : m.namespaceURI === ii ? C.namespaceURI === Bt ? M === "math" : C.namespaceURI === ni ? M === "math" && Vi[V] : !!ms[M] : m.namespaceURI === Bt ? C.namespaceURI === ni && !Vi[V] || C.namespaceURI === ii && !Wi[V] ? !1 : !ms[M] && (ba[M] || !fs[M]) : !!(Ie === "application/xhtml+xml" && ji[m.namespaceURI]) : !1;
  }, Rt = function(m) {
    ue(e.removed, {
      element: m
    });
    try {
      b(m).removeChild(m);
    } catch {
      f(m);
    }
  }, Zt = function(m, C) {
    try {
      ue(e.removed, {
        attribute: C.getAttributeNode(m),
        from: C
      });
    } catch {
      ue(e.removed, {
        attribute: null,
        from: C
      });
    }
    if (C.removeAttribute(m), m === "is")
      if (oe || ti)
        try {
          Rt(C);
        } catch {
        }
      else
        try {
          C.setAttribute(m, "");
        } catch {
        }
  }, vs = function(m) {
    let C = null, M = null;
    if (zi)
      m = "<remove></remove>" + m;
    else {
      const J = Ds(m, /^[\r\n\t ]+/);
      M = J && J[0];
    }
    Ie === "application/xhtml+xml" && le === Bt && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
    const V = I ? I.createHTML(m) : m;
    if (le === Bt)
      try {
        C = new d().parseFromString(V, Ie);
      } catch {
      }
    if (!C || !C.documentElement) {
      C = R.createDocument(le, "template", null);
      try {
        C.documentElement.innerHTML = qi ? q : V;
      } catch {
      }
    }
    const z = C.body || C.documentElement;
    return m && M && z.insertBefore(t.createTextNode(M), z.childNodes[0] || null), le === Bt ? yt.call(C, Xt ? "html" : "body")[0] : Xt ? C.documentElement : z;
  }, ys = function(m) {
    return Y.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, bs = function(m) {
    m.normalize();
    const C = Y.call(
      m.ownerDocument || m,
      m,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let M = C.nextNode();
    for (; M; ) {
      let V = M.data;
      de([P, H, x], (z) => {
        V = pe(V, z, " ");
      }), M.data = V, M = C.nextNode();
    }
  }, si = function(m) {
    const C = L ? L(m) : null;
    return typeof C != "string" || lt(C) !== "form" ? !1 : typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    m.attributes !== S(m) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    m.nodeType !== N(m) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
  }, _e = function(m) {
    if (!N || typeof m != "object" || m === null)
      return !1;
    try {
      return N(m) === zt.documentFragment;
    } catch {
      return !1;
    }
  }, ri = function(m) {
    if (!N || typeof m != "object" || m === null)
      return !1;
    try {
      return typeof N(m) == "number";
    } catch {
      return !1;
    }
  };
  function jt(_, m, C) {
    de(_, (M) => {
      M.call(e, m, C, ce);
    });
  }
  const ws = function(m) {
    let C = null;
    if (jt(A.beforeSanitizeElements, m, null), si(m))
      return Rt(m), !0;
    const M = lt(m.nodeName);
    if (jt(A.uponSanitizeElement, m, {
      tagName: M,
      allowedTags: U
    }), Ae && m.hasChildNodes() && !ri(m.firstElementChild) && bt(/<[/\w!]/g, m.innerHTML) && bt(/<[/\w!]/g, m.textContent) || Ae && m.namespaceURI === Bt && M === "style" && ri(m.firstElementChild) || m.nodeType === zt.progressingInstruction || Ae && m.nodeType === zt.comment && bt(/<[/\w]/g, m.data))
      return Rt(m), !0;
    if (Mt[M] || !(Vt.tagCheck instanceof Function && Vt.tagCheck(M)) && !U[M]) {
      if (!Mt[M] && Cs(M) && (B.tagNameCheck instanceof RegExp && bt(B.tagNameCheck, M) || B.tagNameCheck instanceof Function && B.tagNameCheck(M)))
        return !1;
      if ($i && !Pt[M]) {
        const z = b(m), J = y(m);
        if (J && z) {
          const Tt = J.length;
          for (let Ht = Tt - 1; Ht >= 0; --Ht) {
            const Lt = g(J[Ht], !0);
            z.insertBefore(Lt, v(m));
          }
        }
      }
      return Rt(m), !0;
    }
    return (N ? N(m) : m.nodeType) === zt.element && !Ea(m) || (M === "noscript" || M === "noembed" || M === "noframes") && bt(/<\/no(script|embed|frames)/i, m.innerHTML) ? (Rt(m), !0) : (Kt && m.nodeType === zt.text && (C = m.textContent, de([P, H, x], (z) => {
      C = pe(C, z, " ");
    }), m.textContent !== C && (ue(e.removed, {
      element: m.cloneNode()
    }), m.textContent = C)), jt(A.afterSanitizeElements, m, null), !1);
  }, ks = function(m, C, M) {
    if (Je[C] || ls && (C === "id" || C === "name") && (M in t || M in Ca))
      return !1;
    const V = Q[C] || Vt.attributeCheck instanceof Function && Vt.attributeCheck(C, m);
    if (!(Bi && !Je[C] && bt(D, C))) {
      if (!(rs && bt($, C))) {
        if (!V || Je[C]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Cs(m) && (B.tagNameCheck instanceof RegExp && bt(B.tagNameCheck, m) || B.tagNameCheck instanceof Function && B.tagNameCheck(m)) && (B.attributeNameCheck instanceof RegExp && bt(B.attributeNameCheck, C) || B.attributeNameCheck instanceof Function && B.attributeNameCheck(C, m)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            C === "is" && B.allowCustomizedBuiltInElements && (B.tagNameCheck instanceof RegExp && bt(B.tagNameCheck, M) || B.tagNameCheck instanceof Function && B.tagNameCheck(M)))
          ) return !1;
        } else if (!Ui[C]) {
          if (!bt(mt, pe(M, pt, ""))) {
            if (!((C === "src" || C === "xlink:href" || C === "href") && m !== "script" && Os(M, "data:") === 0 && ds[m])) {
              if (!(os && !bt(at, pe(M, pt, "")))) {
                if (M)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Sa = O({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Cs = function(m) {
    return !Sa[$e(m)] && bt(W, m);
  }, Es = function(m) {
    jt(A.beforeSanitizeAttributes, m, null);
    const C = m.attributes;
    if (!C || si(m))
      return;
    const M = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: Q,
      forceKeepAttr: void 0
    };
    let V = C.length;
    for (; V--; ) {
      const z = C[V], J = z.name, Tt = z.namespaceURI, Ht = z.value, Lt = lt(J), Yi = Ht;
      let vt = J === "value" ? Yi : Ka(Yi);
      if (M.attrName = Lt, M.attrValue = vt, M.keepAttr = !0, M.forceKeepAttr = void 0, jt(A.uponSanitizeAttribute, m, M), vt = M.attrValue, cs && (Lt === "id" || Lt === "name") && Os(vt, hs) !== 0 && (Zt(J, m), vt = hs + vt), Ae && bt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, vt)) {
        Zt(J, m);
        continue;
      }
      if (Lt === "attributename" && Ds(vt, "href")) {
        Zt(J, m);
        continue;
      }
      if (M.forceKeepAttr)
        continue;
      if (!M.keepAttr) {
        Zt(J, m);
        continue;
      }
      if (!as && bt(/\/>/i, vt)) {
        Zt(J, m);
        continue;
      }
      Kt && de([P, H, x], (xs) => {
        vt = pe(vt, xs, " ");
      });
      const Ss = lt(m.nodeName);
      if (!ks(Ss, Lt, vt)) {
        Zt(J, m);
        continue;
      }
      if (I && typeof u == "object" && typeof u.getAttributeType == "function" && !Tt)
        switch (u.getAttributeType(Ss, Lt)) {
          case "TrustedHTML": {
            vt = I.createHTML(vt);
            break;
          }
          case "TrustedScriptURL": {
            vt = I.createScriptURL(vt);
            break;
          }
        }
      if (vt !== Yi)
        try {
          Tt ? m.setAttributeNS(Tt, J, vt) : m.setAttribute(J, vt), si(m) ? Rt(m) : Ls(e.removed);
        } catch {
          Zt(J, m);
        }
    }
    jt(A.afterSanitizeAttributes, m, null);
  }, oi = function(m) {
    let C = null;
    const M = ys(m);
    for (jt(A.beforeSanitizeShadowDOM, m, null); C = M.nextNode(); )
      if (jt(A.uponSanitizeShadowNode, C, null), ws(C), Es(C), _e(C.content) && oi(C.content), (N ? N(C) : C.nodeType) === zt.element) {
        const z = k ? k(C) : C.shadowRoot;
        _e(z) && (he(z), oi(z));
      }
    jt(A.afterSanitizeShadowDOM, m, null);
  }, he = function(m) {
    const C = N ? N(m) : m.nodeType;
    if (C === zt.element) {
      const z = k ? k(m) : m.shadowRoot;
      _e(z) && (he(z), oi(z));
    }
    const M = y ? y(m) : m.childNodes;
    if (!M)
      return;
    const V = [];
    de(M, (z) => {
      ue(V, z);
    });
    for (const z of V)
      he(z);
    if (C === zt.element) {
      const z = L ? L(m) : null;
      if (typeof z == "string" && lt(z) === "template") {
        const J = m.content;
        _e(J) && he(J);
      }
    }
  };
  return e.sanitize = function(_) {
    let m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = null, M = null, V = null, z = null;
    if (qi = !_, qi && (_ = "<!-->"), typeof _ != "string" && !ri(_) && (_ = Ja(_), typeof _ != "string"))
      throw Le("dirty is not a string, aborting");
    if (!e.isSupported)
      return _;
    if (Hi || Ki(m), e.removed = [], typeof _ == "string" && (Ne = !1), Ne) {
      const Ht = L ? L(_) : _.nodeName;
      if (typeof Ht == "string") {
        const Lt = lt(Ht);
        if (!U[Lt] || Mt[Lt])
          throw Le("root node is forbidden and cannot be sanitized in-place");
      }
      if (si(_))
        throw Le("root node is clobbered and cannot be sanitized in-place");
      he(_);
    } else if (ri(_))
      C = vs("<!---->"), M = C.ownerDocument.importNode(_, !0), M.nodeType === zt.element && M.nodeName === "BODY" || M.nodeName === "HTML" ? C = M : C.appendChild(M), he(M);
    else {
      if (!oe && !Kt && !Xt && // eslint-disable-next-line unicorn/prefer-includes
      _.indexOf("<") === -1)
        return I && ei ? I.createHTML(_) : _;
      if (C = vs(_), !C)
        return oe ? null : ei ? q : "";
    }
    C && zi && Rt(C.firstChild);
    const J = ys(Ne ? _ : C);
    for (; V = J.nextNode(); )
      ws(V), Es(V), _e(V.content) && oi(V.content);
    if (Ne)
      return Kt && bs(_), _;
    if (oe) {
      if (Kt && bs(C), ti)
        for (z = nt.call(C.ownerDocument); C.firstChild; )
          z.appendChild(C.firstChild);
      else
        z = C;
      return (Q.shadowroot || Q.shadowrootmode) && (z = T.call(i, z, !0)), z;
    }
    let Tt = Xt ? C.outerHTML : C.innerHTML;
    return Xt && U["!doctype"] && C.ownerDocument && C.ownerDocument.doctype && C.ownerDocument.doctype.name && bt(hl, C.ownerDocument.doctype.name) && (Tt = "<!DOCTYPE " + C.ownerDocument.doctype.name + `>
` + Tt), Kt && de([P, H, x], (Ht) => {
      Tt = pe(Tt, Ht, " ");
    }), I && ei ? I.createHTML(Tt) : Tt;
  }, e.setConfig = function() {
    let _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ki(_), Hi = !0;
  }, e.clearConfig = function() {
    ce = null, Hi = !1;
  }, e.isValidAttribute = function(_, m, C) {
    ce || Ki({});
    const M = lt(_), V = lt(m);
    return ks(M, V, C);
  }, e.addHook = function(_, m) {
    typeof m == "function" && ue(A[_], m);
  }, e.removeHook = function(_, m) {
    if (m !== void 0) {
      const C = Wa(A[_], m);
      return C === -1 ? void 0 : Va(A[_], C, 1)[0];
    }
    return Ls(A[_]);
  }, e.removeHooks = function(_) {
    A[_] = [];
  }, e.removeAllHooks = function() {
    A = Us();
  }, e;
}
var Dn = to();
function On(r) {
  const e = r.trim(), t = /^<svg[\s>]/i.test(e), i = Dn.sanitize(t ? e : `<svg>${e}</svg>`, {
    USE_PROFILES: { svg: !0, svgFilters: !0 },
    RETURN_DOM_FRAGMENT: !0
  });
  if (t) return i;
  const n = i.firstElementChild, s = document.createDocumentFragment();
  for (; n != null && n.firstChild; )
    s.appendChild(n.firstChild);
  return s;
}
function X(r) {
  r.variant = r.variant ?? "primary";
  const {
    variant: e,
    size: t,
    onClick: i,
    onClickArgs: n,
    iconUnicode: s,
    iconClass: o,
    svgIcon: a,
    imagePath: l,
    disabled: h,
    text: d,
    childElement: u,
    ...p
  } = r, g = document.createElement("button");
  g.classList.add("pivotick-button"), g.classList.add(`pivotick-button-${e}`), t && g.classList.add(`pivotick-button-${t}`);
  for (const [v, y] of Object.entries(p))
    v === "class" ? Array.isArray(y) ? g.classList.add(...y) : g.classList.add(String(y)) : v in g ? g[v] = y : g.setAttribute(v, String(y));
  let f;
  if (s && (f = Z({ iconUnicode: s })), o && (f = Z({ iconClass: o })), a && (f = Z({ svgIcon: a })), l && (f = Z({ imagePath: l })), f && g.append(f), h !== void 0 && (g.disabled = h), d) {
    const v = document.createElement("text");
    v.textContent = d, g.append(v);
  }
  if (u && g.append(u), typeof i == "function") {
    const v = n ?? [];
    g.addEventListener("click", (y) => {
      i(y, ...v);
    });
  }
  return g;
}
const gl = "outline-primary";
function eo(r, e = {}, t = []) {
  const i = document.createElementNS("http://www.w3.org/2000/svg", r);
  for (const [n, s] of Object.entries(e))
    Array.isArray(s) ? i.setAttribute(n, s.join(" ")) : i.setAttribute(n, s.toString());
  for (const n of t)
    typeof n == "string" ? i.appendChild(document.createTextNode(n)) : i.appendChild(n);
  return i;
}
function w(r, e = {}, t = []) {
  const i = document.createElement(r);
  for (const [n, s] of Object.entries(e))
    Array.isArray(s) ? i.setAttribute(n, s.join(" ")) : i.setAttribute(n, s.toString());
  for (const n of t)
    typeof n == "string" ? i.appendChild(document.createTextNode(n)) : i.appendChild(n);
  return i;
}
function dt(r) {
  const e = document.createElement("template");
  return e.innerHTML = r.trim(), e.content.firstElementChild;
}
function vi(r, e) {
  const t = {
    ctrl: "⌃",
    shift: "⇧",
    alt: "⌥",
    cmd: "⌘"
  }, i = document.createElement("span");
  i.classList.add("pvt-keyboard-shortcut");
  const n = r.split("+").map((s) => s.trim()).filter(Boolean).map((s) => {
    const o = s.toLowerCase();
    return t[o] ?? s.toUpperCase();
  }).join(" ");
  return i.textContent = n, i;
}
function li(r, e, t) {
  const i = w("div", { class: "pvt-action-list" }), n = Array.isArray(t) ? t[0] : t;
  return e.forEach((s) => {
    if (s.visible = s.visible ?? !0, We(s.visible, n) ?? !0) {
      const a = fl(r, s, t);
      i.appendChild(a);
    }
  }), i;
}
function ci(r, e, t) {
  const i = w("div", { class: "pvt-action-list" }), n = Array.isArray(t) ? t[0] : t;
  return e.forEach((s) => {
    if (s.visible = s.visible ?? !0, We(s.visible, n) ?? !0) {
      const a = ml(r, s, t);
      i.appendChild(a);
    }
  }), i;
}
function fl(r, e, t) {
  e.variant = e.variant ?? gl;
  const { onclick: i, ...n } = e, s = w(
    "span",
    {
      class: ["pvt-action-item", `pvt-action-item-${e.variant}`],
      style: `${e.flushRight ? "margin-left: auto;" : ""}`
    },
    [
      X({
        size: "sm",
        ...n
      })
    ]
  );
  return typeof i == "function" && s.addEventListener("click", (o) => {
    i.call(r, o, t);
  }), s;
}
function ml(r, e, t) {
  const i = vl(e.shortcut);
  i instanceof HTMLSpanElement && (i.classList.add("pvt-ms-auto"), i.style.borderColor = "var(--pvt-bg-color-8)");
  const n = w(
    "div",
    {
      class: ["pvt-action-item", `pvt-action-item-${e.variant}`]
    },
    [
      Z({ fixedWidth: !0, ...e }),
      w("span", {
        class: "pvt-action-text",
        title: e.title ?? ""
      }, [e.text ?? ""]),
      i
    ]
  );
  return typeof e.onclick == "function" && n.addEventListener("click", (s) => {
    e.onclick.call(r, s, t);
  }), n;
}
function ne(r = 8, e = "id-") {
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", i = t + "0123456789-_";
  let n = t.charAt(Math.floor(Math.random() * t.length));
  for (let s = 1; s < r; s++)
    n += i.charAt(Math.floor(Math.random() * i.length));
  return `${e}${n}`;
}
function Z(r) {
  const e = document.createElement("span");
  if (e.classList.add("pvt-icon"), r.fixedWidth && e.classList.add("fixed-width"), r.iconUnicode || r.iconClass) {
    const t = document.createElement("text");
    r.iconUnicode && (t.className = "icon icon-unicode"), r.iconClass && (t.className = `icon ${r.iconClass ?? ""}`), r.iconUnicode && (t.textContent = r.iconUnicode), e.append(t);
  } else if (r.svgIcon) {
    const t = On(r.svgIcon).firstElementChild;
    t && (t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), e.append(t)), e.style.display = "inline-flex", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.width = "1em";
  } else if (r.imagePath) {
    const t = document.createElement("img");
    t.src = r.imagePath, e.style.display = "inline-flex", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.width = "1em", e.append(t);
  }
  return e;
}
function vl(r) {
  if (!r) return "";
  const e = document.createElement("span");
  return e.classList.add("pvt-keyboard-shortcut"), e.textContent = r, e;
}
function yl(r, e, t, i = {}) {
  let n = !1, s = 0, o = 0, a = 0, l = 0, h = null, d = null;
  e.classList.add("draggable"), e.addEventListener("mousedown", (g) => {
    var y, b;
    const f = new AbortController(), { signal: v } = f;
    n = !0, e.style.transition = "none", s = g.clientX, o = g.clientY, a = r.offsetLeft, l = r.offsetTop, h = r.getBoundingClientRect(), d = t.getBoundingClientRect(), (y = i.onDragStart) == null || y.call(i, g, r), (b = window.getSelection()) == null || b.removeAllRanges(), document.addEventListener("mousemove", u, { signal: v }), document.addEventListener("mouseup", (k) => {
      f.abort(), p(k);
    }, { signal: v });
  });
  function u(g) {
    var N;
    if (!n || !d || !h) return;
    const f = g.clientX - s, v = g.clientY - o;
    let y = a + f, b = l + v;
    const k = h.width, S = h.height;
    y = Math.max(d.left, Math.min(y, d.right - k)), b = Math.max(d.top, Math.min(b, d.bottom - S)), r.style.left = y + "px", r.style.top = b + "px", (N = i.onDrag) == null || N.call(i, g, r);
  }
  function p(g) {
    var f;
    n = !1, r.style.transition = "", (f = i.onDragStop) == null || f.call(i, g, r);
  }
}
function bl(r) {
  return r * Math.PI / 180;
}
function Ue(r) {
  for (; r < 0; ) r += 2 * Math.PI;
  for (; r >= 2 * Math.PI; ) r -= 2 * Math.PI;
  return r;
}
function io(r) {
  let { rx: e, ry: t } = r;
  const { xAxisRotation: i, largeArcFlag: n, sweepFlag: s, from: o, to: a } = r, l = bl(i), h = Math.cos(l), d = Math.sin(l), u = (o.x - a.x) / 2, p = (o.y - a.y) / 2, g = h * u + d * p, f = -d * u + h * p;
  let v = e * e, y = t * t;
  const b = g * g, k = f * f, S = b / v + k / y;
  if (S > 1) {
    const $ = Math.sqrt(S);
    e *= $, t *= $, v = e * e, y = t * t;
  }
  const N = n !== s ? 1 : -1, L = v * y - v * k - y * b, I = v * k + y * b, q = N * Math.sqrt(Math.max(0, L / I)), F = q * (e * f / t), R = q * (-(t * g) / e), Y = h * F - d * R + (o.x + a.x) / 2, nt = d * F + h * R + (o.y + a.y) / 2;
  function yt($, at, pt, W) {
    const mt = $ * pt + at * W, U = Math.sqrt($ * $ + at * at) * Math.sqrt(pt * pt + W * W);
    let Ft = Math.acos(Math.min(Math.max(mt / U, -1), 1));
    return $ * W - at * pt < 0 && (Ft = -Ft), Ft;
  }
  const T = (g - F) / e, A = (f - R) / t, P = (-g - F) / e, H = (-f - R) / t;
  let x = yt(1, 0, T, A), D = yt(T, A, P, H);
  return !s && D > 0 ? D -= 2 * Math.PI : s && D < 0 && (D += 2 * Math.PI), x = Ue(x), D = Ue(D), {
    cx: Y,
    cy: nt,
    startAngle: x,
    deltaAngle: D,
    rx: e,
    ry: t,
    xAxisRotation: i
  };
}
function wl(r, e, t, i) {
  const n = Math.max(Math.abs(t) / r, Math.abs(i) / e);
  return n === 0 ? r : 1 / n;
}
function kl(r, e, t) {
  const i = r.x - e, n = r.x + e, s = r.y - t, o = r.y + t;
  return [
    { x0: i, y0: s, x1: n, y1: s },
    { x0: n, y0: s, x1: n, y1: o },
    { x0: n, y0: o, x1: i, y1: o },
    { x0: i, y0: o, x1: i, y1: s }
  ];
}
function Cl(r, e) {
  const t = e.x1 - e.x0, i = e.y1 - e.y0, n = e.x0 - r.cx, s = e.y0 - r.cy, o = t * t + i * i;
  if (o === 0) return [];
  const a = 2 * (n * t + s * i), l = n * n + s * s - r.r * r.r, h = a * a - 4 * o * l;
  if (h < 0) return [];
  const d = Math.sqrt(h), u = [];
  for (const p of [(-a - d) / (2 * o), (-a + d) / (2 * o)])
    p < 0 || p > 1 || u.push({ x: e.x0 + p * t, y: e.y0 + p * i });
  return u;
}
function qs(r, e, t, i, n) {
  const s = io(r);
  if (s.rx !== s.ry || s.xAxisRotation !== 0) return null;
  const o = { cx: s.cx, cy: s.cy, r: s.rx }, a = n === "from" ? r.from : r.to;
  let l = null, h = 1 / 0;
  for (const d of kl(e, t, i))
    for (const u of Cl(o, d)) {
      const p = Math.atan2(u.y - s.cy, u.x - s.cx);
      if (!no(p, s.startAngle, s.deltaAngle)) continue;
      const g = Math.hypot(u.x - a.x, u.y - a.y);
      g < h && (h = g, l = u);
    }
  return l;
}
function El(r, e, t, i, n, s) {
  const o = i - r, a = n - e, l = Math.sqrt(o * o + a * a);
  if (l > t + s) return [];
  if (l < Math.abs(t - s)) return [];
  if (l === 0 && t === s) return [];
  const h = (t * t - s * s + l * l) / (2 * l), d = Math.sqrt(t * t - h * h), u = r + h * o / l, p = e + h * a / l, g = u + d * a / l, f = p - d * o / l, v = u - d * a / l, y = p + d * o / l;
  return d === 0 ? [{ x: g, y: f }] : [
    { x: g, y: f },
    { x: v, y }
  ];
}
function no(r, e, t) {
  r = Ue(r), e = Ue(e);
  const i = Ue(e + t);
  return t >= 0 ? e <= i ? r >= e && r <= i : r >= e || r <= i : i <= e ? r <= e && r >= i : r <= e || r >= i;
}
function Sl(r, e) {
  const { cx: t, cy: i, startAngle: n, deltaAngle: s } = e;
  for (const o of r) {
    const a = Math.atan2(o.y - i, o.x - t);
    if (no(a, n, s))
      return o;
  }
  return null;
}
function js(r, e) {
  const t = io(r);
  if (t.rx === t.ry && t.xAxisRotation === 0) {
    const i = El(
      t.cx,
      t.cy,
      t.rx,
      e.cx,
      e.cy,
      e.r
    ), n = Sl(i, t);
    return n || null;
  } else
    return console.log("Arc is elliptical or rotated, numerical methods needed for intersection."), null;
}
function xl(r) {
  if (!r) return null;
  const e = r.getAttribute("d");
  if (!e) return null;
  const t = Il(e);
  if (!t) return null;
  const { x0: i, y0: n, x1: s, y1: o } = t, a = s - i, l = o - n, h = {
    x: i + a / 2,
    y: n + l / 2
  };
  return {
    length: Math.sqrt(a * a + l * l),
    midpoint: h
  };
}
function Ml(r) {
  if (!r) return null;
  const e = r.getAttribute("d");
  if (!e) return null;
  const t = Al(e);
  if (!t) return null;
  const i = t.to.x - t.from.x, n = t.to.y - t.from.y, s = Math.hypot(i, n), o = t.rx, a = 2 * Math.asin(Math.min(s / (2 * o), 1)), l = o * a, h = (t.from.x + t.to.x) / 2, d = (t.from.y + t.to.y) / 2, u = Math.sqrt(Math.max(0, o * o - (s / 2) ** 2)), p = -n / s, g = i / s, f = t.sweepFlag !== t.largeArcFlag ? 1 : -1, v = h + f * u * p, y = d + f * u * g, b = Math.atan2(t.from.y - y, t.from.x - v);
  let S = Math.atan2(t.to.y - y, t.to.x - v) - b;
  for (; S > Math.PI; ) S -= 2 * Math.PI;
  for (; S < -Math.PI; ) S += 2 * Math.PI;
  t.sweepFlag && S < 0 && (S += 2 * Math.PI), !t.sweepFlag && S > 0 && (S -= 2 * Math.PI);
  const N = b + S / 2, L = {
    x: v + o * Math.cos(N),
    y: y + o * Math.sin(N)
  };
  return {
    length: l,
    midpoint: L
  };
}
function Tl(r) {
  if (!r) return null;
  const e = r.getAttribute("d");
  if (!e) return null;
  const t = Nl(e);
  if (!t) return null;
  const i = 0.5, n = Math.pow(1 - i, 3) * t.x0 + 3 * Math.pow(1 - i, 2) * i * t.px0 + 3 * (1 - i) * i * i * t.px1 + i * i * i * t.x1, s = Math.pow(1 - i, 3) * t.y0 + 3 * Math.pow(1 - i, 2) * i * t.py0 + 3 * (1 - i) * i * i * t.py1 + i * i * i * t.y1;
  return { length: Math.hypot(n, s), midpoint: { x: n, y: s } };
}
function Al(r) {
  if (!r) return null;
  const e = Fn(r);
  return e.length !== 9 || e[0][0] !== "M" || e[2][0] !== "A" ? null : {
    from: { x: parseFloat(e[0].slice(1)), y: parseFloat(e[1]) },
    to: { x: parseFloat(e[7]), y: parseFloat(e[8]) },
    rx: parseFloat(e[2].slice(1)),
    ry: parseFloat(e[3]),
    xAxisRotation: 0,
    largeArcFlag: !1,
    sweepFlag: !0
  };
}
function Nl(r) {
  if (!r) return null;
  const e = Fn(r);
  return e.length !== 10 || e[0][0] !== "M" || e[3][0] !== "C" ? null : {
    x0: parseFloat(e[1]),
    y0: parseFloat(e[2]),
    x1: parseFloat(e[8]),
    y1: parseFloat(e[9]),
    px0: parseFloat(e[4]),
    py0: parseFloat(e[5]),
    px1: parseFloat(e[6]),
    py1: parseFloat(e[7])
  };
}
function Il(r) {
  if (!r) return null;
  const e = Fn(r);
  return e.length !== 6 || e[0] !== "M" || e[3] !== "L" ? null : {
    x0: parseFloat(e[1]),
    y0: parseFloat(e[2]),
    x1: parseFloat(e[4]),
    y1: parseFloat(e[5])
  };
}
function Fn(r) {
  const e = [];
  let t = "", i = 0, n = r.length - 1;
  for (; i <= n && (r[i] === " " || r[i] === `
` || r[i] === "	" || r[i] === ","); ) i++;
  for (; n >= i && (r[n] === " " || r[n] === `
` || r[n] === "	" || r[n] === ","); ) n--;
  for (let s = i; s <= n; s++) {
    const o = r[s];
    o === " " || o === "," || o === `
` || o === "	" ? t && (e.push(t), t = "") : t += o;
  }
  return t && e.push(t), e;
}
function _l(r, e, t) {
  let i = !1;
  for (let n = 0, s = t.length - 1; n < t.length; s = n++) {
    const o = t[n].x, a = t[n].y, l = t[s].x, h = t[s].y;
    a > e != h > e && r < (l - o) * (e - a) / (h - a) + o && (i = !i);
  }
  return i;
}
function me(r, e) {
  if (Array.isArray(r) && Array.isArray(e))
    return [...r, ...e];
  if (typeof r == "object" && typeof e == "object" && r && e) {
    const t = { ...r };
    for (const i in e)
      Object.prototype.hasOwnProperty.call(e, i) && (i in r ? t[i] = me(r[i], e[i]) : t[i] = e[i]);
    return t;
  }
  return e;
}
function wi(r, e = /* @__PURE__ */ new WeakSet()) {
  if (typeof r == "function") return;
  if (r === null || typeof r != "object") return r;
  const t = r;
  if (e.has(t)) return;
  if (e.add(t), Array.isArray(r))
    return r.map((n) => wi(n, e));
  if (Object.getPrototypeOf(r) !== Object.prototype) return r;
  const i = {};
  for (const [n, s] of Object.entries(r))
    typeof s != "function" && (i[n] = wi(s, e));
  return i;
}
function Ve(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function so(r) {
  if (!r) return !0;
  const e = r.trim().toLowerCase();
  return e === "none" || e === "transparent" || /,\s*0(\.0+)?\s*\)$/.test(e);
}
class et {
  /**
   * Create a new Node instance.
   * @param id - Unique identifier for the node
   * @param data - Optional data payload associated with the node
   */
  constructor(e, t, i, n = ne(), s = []) {
    c(this, "id");
    c(this, "data");
    c(this, "children");
    c(this, "style");
    c(this, "edgesOut");
    c(this, "edgesIn");
    c(this, "defaultCircleRadius", 10);
    // Layout/physics properties
    c(this, "x");
    c(this, "y");
    c(this, "vx");
    c(this, "vy");
    c(this, "fx");
    c(this, "fy");
    c(this, "weight");
    c(this, "frozen");
    c(this, "visible");
    c(this, "expanded");
    /** True if this node is a child within a collapsed cluster */
    c(this, "isChild");
    c(this, "childrenDepth");
    /** True if this node has child nodes */
    c(this, "isParent");
    /** Reference to the parent cluster node (if this node is a child) */
    c(this, "parentNode");
    /**
     * Reference to the main graph node when this node is a clone in a subgraph.
     * Used for syncing position updates from subgraph back to main graph.
     */
    c(this, "_original_object");
    /**
     * Reference to the deepest sub graph node.
     * Used for checking state of this node in its subgraph
     */
    c(this, "_deepest_node_clone");
    /** The subgraph graph instance created when expanding this node */
    c(this, "_subgraph");
    c(this, "_circleRadius", this.defaultCircleRadius);
    c(this, "_circleRadiusCollapsed", this.defaultCircleRadius);
    /** Measured rectangular border; unset means the node is anchored as a circle. */
    c(this, "_border");
    c(this, "_dirty");
    c(this, "domID");
    this.id = e, this.domID = n, this.data = t ?? {}, this.style = i ?? {}, this.children = [], this.isParent = !1, this.setChildren(s), this._dirty = !0, this.frozen = !1, this.visible = !0, this.expanded = !1, this.isChild = !1, this.childrenDepth = 0, this.edgesOut = /* @__PURE__ */ new Set(), this.edgesIn = /* @__PURE__ */ new Set();
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
  setData(e) {
    this.data = e, this.markDirty();
  }
  /**
   * Merge partial data into the current node data.
   * Useful for updating only parts of the data.
   * @param partialData - Partial data object to merge
   */
  updateData(e) {
    this.data = { ...this.data, ...e }, this.markDirty();
  }
  /**
   * @private
   */
  registerEdgeOut(e) {
    this.edgesOut.add(e);
  }
  /**
   * @private
   */
  registerEdgeIn(e) {
    this.edgesIn.add(e);
  }
  /**
   * @private
   */
  emptyEdges() {
    this.edgesOut.clear(), this.edgesIn.clear();
  }
  getConnectedNodes() {
    return [...this.edgesOut].map((e) => e.to);
  }
  getConnectingNodes() {
    return [...this.edgesIn].map((e) => e.from);
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
  setStyle(e) {
    this.style = e, this.markDirty();
  }
  /**
   * Merge partial data into the current node data.
   * Useful for updating only parts of the data.
   * @param partialStyle - Partial data object to merge
   */
  updateStyle(e) {
    this.style = { ...this.style, ...e }, this.markDirty();
  }
  getGraphElement() {
    return document ? document.getElementById(`node-${this.domID}`) : null;
  }
  /**
   * Convert node to a simple JSON object representation.
   * @param dataOnly - default: false
   */
  toDict(e = !1) {
    const t = {
      id: this.id,
      data: this.data,
      style: this.style,
      weight: this.weight
      // expanded: this.expanded,
    };
    return e || (t.x = this.x, t.y = this.y, t.vx = this.vx, t.vy = this.vy, t.fx = this.fx, t.fy = this.fy), this.hasChildren() && (t.children = this.children.map((i) => i.toDict(e))), t;
  }
  /**
   * Structured-cloneable payload for the simulation worker (no live parent/children/_subgraph
   * refs, unlike `clone()`). The style is stripped of functions: every resolvable channel may
   * hold one, and no force reads them, so sending them only risks a `DataCloneError`.
   */
  toSimulationDTO() {
    return {
      id: this.id,
      data: this.data,
      style: wi(this.style),
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
    const e = { ...this.data }, t = { ...this.style }, i = new et(this.id, e, t);
    return i.x = this.x, i.y = this.y, i.vx = this.vx, i.vy = this.vy, i.fx = this.fx, i.fy = this.fy, i.weight = this.weight, i.frozen = this.frozen, i.visible = this.visible, i.expanded = this.expanded, i.isChild = this.isChild, i.childrenDepth = this.childrenDepth, i.isParent = this.isParent, i.parentNode = this.parentNode, i._circleRadius = this._circleRadius, i.children = this.children.map((n) => n.clone()), i;
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
  toggleVisibility(e) {
    e ? this.show() : this.hide(), this.markDirty();
  }
  show() {
    this.visible = !0;
  }
  hide() {
    this.visible = !1;
  }
  toggleExpand(e) {
    e === void 0 ? this.expanded ? this.collapse() : this.expand() : e ? this.expand() : this.collapse(), this.markDirty();
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
  /** The node's clusters, outermost first — empty for a node of the root graph. */
  ancestorChain() {
    const e = [];
    let t = this.parentNode;
    for (; t; )
      e.unshift(t), t = t.parentNode;
    return e;
  }
  /**
   * The node the canvas actually draws for this one: itself when every cluster above it
   * is expanded, otherwise the outermost collapsed cluster — the box hiding it.
   *
   * This answers "which dot on screen stands for this node", not "is it visible": an
   * expanded cluster renders a *separate* subgraph built from `toDict()` data, so a
   * nested node is never drawn by this graph even when its cluster is open.
   */
  canvasRepresentative() {
    for (const e of this.ancestorChain())
      if (!e.expanded) return e;
    return this;
  }
  /**
   * Set the node's circle radius. Also drops any measured rectangular border:
   * the radius is the coarser fact, so every caller that resizes a node keeps
   * anchoring correct by default, and only the drawers that know the rendered
   * shape opt back in through {@link setBorderBox}.
   */
  setCircleRadius(e) {
    this._circleRadius = e, this._border = void 0;
  }
  getCircleRadius() {
    return this._circleRadius;
  }
  setCircleRadiusCollapsed(e) {
    this._circleRadiusCollapsed = e;
  }
  getCircleRadiusCollapsed() {
    return this._circleRadiusCollapsed;
  }
  /**
   * Declare that the node's border is the centred `width`×`height` rectangle it
   * actually renders as, so edges stop on it instead of on the bounding circle.
   * Call it *after* {@link setCircleRadius}, which clears it.
   */
  setBorderBox(e, t) {
    this._border = { halfWidth: e / 2, halfHeight: t / 2 };
  }
  /**
   * The node's rectangular border grown by `outset`, or `undefined` when the
   * node is anchored as a circle.
   */
  getBorderBox(e = 0) {
    if (this._border)
      return { halfWidth: this._border.halfWidth + e, halfHeight: this._border.halfHeight + e };
  }
  /**
   * Distance from the node's centre to its border along the unit direction
   * `(dirX, dirY)`, grown by `outset` — where an edge leaving in that direction
   * should start. Rectangular for a measured node, the circle radius otherwise.
   * Deliberately free of style resolution: this runs for both ends of every
   * edge on every tick.
   */
  getBorderDistance(e, t, i = 0) {
    const n = this._border;
    return n ? wl(n.halfWidth + i, n.halfHeight + i, e, t) : this._circleRadius + i;
  }
  setChildren(e) {
    this.children = e, this.hasChildren() ? this.isParent = !0 : this.isParent = !1;
  }
  hasChildren() {
    return this.children.length > 0;
  }
  markAsChild(e, t) {
    this.isChild = !0, this.childrenDepth = t, this.parentNode = e;
  }
  markAsParent() {
    this.isParent = !0;
  }
  /**
   * Sets the subgraph instance (when opening a cluster).
   * @private
   */
  setSubgraph(e) {
    this._subgraph = e;
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
  setOriginalObject(e) {
    this._original_object = e;
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
  setDeepestNodeClone(e) {
    this._deepest_node_clone = e;
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
class Ct {
  /**
   * Create a new Edge instance.
   * @param id - Unique identifier for the edge
   * @param from - Source node
   * @param to - Target node
   * @param data - Optional data payload for the edge
   * @param style - Optional style for the edge
   */
  constructor(e, t, i, n, s, o = null, a) {
    c(this, "id");
    c(this, "from");
    c(this, "to");
    c(this, "directed");
    c(this, "data");
    c(this, "style");
    c(this, "visible");
    /**
     * Whether this edge's layer is switched on. A veto over {@link visible}: every
     * other reason an edge is hidden (endpoints filtered out, a collapsed cluster,
     * a manual hide) is asserted through {@link show} / {@link hide}, and `show`
     * cannot bring an edge back while its layer is off.
     */
    c(this, "layerVisible");
    /**
     * What {@link visible} would be if every layer were on — i.e. visibility from
     * the endpoint, collapse and manual reasons alone. The simulation gates on this
     * rather than on `visible`, so switching a layer off never changes the layout.
     */
    c(this, "visibleIgnoringLayer");
    /**
     * For a cross-cluster stand-in: the real edges it speaks for. Stand-ins are
     * deduped by node *pair*, so one can cover several relations of several kinds;
     * it is filtered out only once every one of them is.
     */
    c(this, "representedEdges");
    /** True if this is a synthetic edge (placeholder for collapsed cluster child) */
    c(this, "isSynthetic");
    /**
     * True for the subclass of synthetic edges that stand in for a real edge whose
     * *both* endpoints are children of different clusters. Unlike the external→cluster
     * synthetic edges, these are resolved as a set (one per collapse state) by
     * {@link ClusterDrawer.resolveCrossClusterEdges} rather than the per-node toggle.
     */
    c(this, "isCrossCluster");
    /** The actual child node this synthetic edge points to (for expansion logic) */
    c(this, "syntheticTerminalNode");
    /** For a cross-cluster synthetic edge: the real child the `from` side stands in for. */
    c(this, "syntheticSourceNode");
    c(this, "_original_object");
    c(this, "_subgraphFromNode");
    c(this, "_subgraphToNode");
    c(this, "_dirty");
    c(this, "domID");
    this.id = e, this.domID = ne(), this.from = t, this.to = i, this.directed = o, this.data = n ?? {}, this.style = s ?? {}, this.visible = !0, this.layerVisible = !0, this.visibleIgnoringLayer = !0, this._dirty = !0, this.isSynthetic = a !== void 0, this.syntheticTerminalNode = a, this.from.registerEdgeOut(this), this.to.registerEdgeIn(this);
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
  setData(e) {
    this.data = e, this.markDirty();
  }
  /**
   * Merge partial data into the current edge data.
   * @param partialData - Partial data object to merge
   */
  updateData(e) {
    this.data = { ...this.data, ...e }, this.markDirty();
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
    var e;
    return ((e = this.style) == null ? void 0 : e.edge) ?? {};
  }
  /**
   * Get the edge's label style if available.
   */
  getLabelStyle() {
    var e;
    return ((e = this.style) == null ? void 0 : e.label) ?? {};
  }
  /**
   * Update the edge's style.
   * @param newStyle - New style to set
   */
  setStyle(e) {
    this.style = e, this.markDirty();
  }
  /**
   * Merge partial style into the current edge style.
   * Useful for updating only parts of the style.
   * @param partialStyle - Partial style object to merge
   */
  updateStyle(e) {
    const t = this.style, i = e;
    this.style = {
      ...t,
      ...i,
      edge: { ...t.edge, ...i.edge },
      label: { ...t.label, ...i.label }
    }, this.markDirty();
  }
  getGraphElement() {
    return document ? document.getElementById(`edge-${this.domID}`) : null;
  }
  setFrom(e) {
    this.from = e;
  }
  setTo(e) {
    this.to = e;
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
  /**
   * Structured-cloneable payload for the simulation worker; endpoints reduced to ids, keeps
   * `directed`. The style is stripped of functions — see {@link Node.toSimulationDTO}.
   */
  toSimulationDTO() {
    return {
      id: this.id,
      from: { id: this.from.id },
      to: { id: this.to.id },
      data: this.data,
      style: wi(this.style),
      directed: this.directed
    };
  }
  clone() {
    const e = { ...this.data }, t = { ...this.style }, i = new Ct(
      this.id,
      this.from.clone(),
      this.to.clone(),
      e,
      t,
      this.directed
    );
    return i.visible = this.visible, i.layerVisible = this.layerVisible, i.visibleIgnoringLayer = this.visibleIgnoringLayer, i;
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
  toggleVisibility(e) {
    e ? this.show() : this.hide(), this.markDirty();
  }
  show() {
    this.visibleIgnoringLayer = !0, this.visible = this.layerVisible;
  }
  hide() {
    this.visibleIgnoringLayer = !1, this.visible = !1;
  }
  /**
   * Switch this edge's layer on or off, re-deriving {@link visible} from the other
   * reasons it may already be hidden for. Returns whether anything changed.
   */
  setLayerVisible(e) {
    if (this.layerVisible === e) return !1;
    this.layerVisible = e;
    const t = e && this.visibleIgnoringLayer;
    return this.visible !== t && (this.visible = t, this.markDirty()), !0;
  }
  /**
   * Sets a reference to the original node from the main graph.
   * Used when this node is a clone in a subgraph to enable position syncing.
   * @private
   */
  setOriginalObject(e) {
    this._original_object = e;
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
  setSubgraphFromNode(e) {
    this._subgraphFromNode = e;
  }
  /**
   * Sets a reference to the subgraph node from the main graph.
   * Used when the TO node has a clone in a subgraph
   * @private
   */
  setSubgraphToNode(e) {
    this._subgraphToNode = e;
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
const Rl = {
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
}, Ll = {
  shape: "circle",
  size: 10,
  strokeWidth: "var(--pvt-node-stroke-width, 2)",
  color: "var(--pvt-node-color, #007acc)",
  strokeColor: "var(--pvt-node-stroke, #fff)",
  fontFamily: "var(--pvt-font-family)",
  textColor: "var(--pvt-node-text-color, #fff)",
  textAnchorPosition: "middle",
  textHorizontalShift: 0,
  textVerticalShift: 0,
  textRotateDegree: 0,
  textTruncate: !0,
  iconUnicode: void 0,
  iconClass: void 0,
  svgIcon: void 0,
  imagePath: void 0,
  text: void 0,
  html: void 0
}, Dl = {
  strokeWidth: 2,
  opacity: 1,
  curveStyle: "bidirectional",
  dashed: !1,
  animateDash: !0,
  rotateLabel: !1,
  markerEnd: "arrow",
  markerStart: void 0,
  strokeColor: "var(--pvt-edge-stroke, #999)"
}, yi = {
  fontSize: 12,
  fontFamily: "var(--pvt-font-family)",
  color: "var(--pvt-edge-label-color, #333)",
  backgroundColor: "var(--pvt-edge-label-bg, #ffffffa0)"
};
function Ol(r) {
  const e = r.replace(/[\x00-\x20]+/g, ""), t = /^([a-z][a-z0-9+.-]*):/i.exec(e);
  return t ? t[1].toLowerCase() : null;
}
const Fl = ["http", "https", "mailto", "ftp", "tel"], Pl = ["http", "https", "data", "blob"];
function ro(r, e) {
  const t = Ol(r);
  return t === null || e.includes(t);
}
function En(r, e) {
  let t = [];
  function i() {
    if (!t) return;
    const n = (r - e) * 0.9;
    for (const s of t) {
      if (s.x == null || s.y == null) continue;
      const o = s.x, a = s.y, l = s.getCircleRadius() ?? 10, h = Math.sqrt(o * o + a * a) + l;
      if (h > n) {
        const d = n / h, u = o * d, p = a * d;
        s.x = u, s.y = p;
      }
    }
  }
  return i.initialize = (n) => {
    t = n;
  }, i;
}
class Bl {
  /**
   * Convert global coordinates to local coordinates relative to a parent cluster.
   *
   * Used when reading positions from the main graph and applying them to subgraph nodes.
   *
   * @param globalX Global X coordinate
   * @param globalY Global Y coordinate  * @param parentNode The parent cluster node (whose position defines the local origin)
   * @returns Local coordinates relative to parent center
   */
  static globalToLocal(e, t, i) {
    const n = i.x ?? 0, s = i.y ?? 0;
    return {
      x: e - n,
      y: t - s
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
  static localToGlobal(e, t, i) {
    const n = i.x ?? 0, s = i.y ?? 0;
    return {
      x: e + n,
      y: t + s
    };
  }
}
class rt {
  constructor(e) {
    c(this, "nodeDrawer");
    c(this, "edgeDrawer");
    this.nodeDrawer = e;
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
  render(e, t, i) {
    this.edgeDrawer || (this.edgeDrawer = this.nodeDrawer.graphSvgRenderer.edgeDrawer);
    let n = e.select(".pvt-cluster-area");
    if (n.empty()) {
      n = e.append("circle").classed("pvt-cluster-area", !0).lower();
      const u = rt.buildGradientForNode(
        e.node().querySelector(".node"),
        n,
        t
      );
      u && n.style("stroke", `color-mix(in srgb, ${u} 70%, transparent)`);
    }
    const s = rt.updateToNewRadiusExpanded(this.nodeDrawer.graph, t);
    n.attr("r", 0).attr("_final_r", s).attr("cx", 0).attr("cy", 0), n.transition().duration(250).attr("r", s);
    const o = /* @__PURE__ */ new Set(), a = t.children.flatMap((u) => [
      ...u.getEdgesOut() ?? [],
      ...u.getEdgesIn() ?? []
    ]).filter((u) => o.has(u.id) ? !1 : (o.add(u.id), !0)), l = e.node(), h = this.createSubgraph(
      t.children,
      a,
      l,
      t,
      this.nodeDrawer.graph
    );
    t.setSubgraph(h), e.select(":scope > .zoom-layer").attr("opacity", 0).transition().duration(250).attr("opacity", 1), rt.toggleSyntheticEdges(t), rt.resolveCrossClusterEdges(this.nodeDrawer.graph);
    let d = this.nodeDrawer.graph.getParentGraph();
    for (; d; )
      d.renderer.update(!1), d = d.getParentGraph();
    return i && requestAnimationFrame(() => {
      i(s);
    }), n;
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
  createSubgraph(e, t, i, n, s) {
    const o = (p) => {
      p.getMutableNodes().forEach((g) => {
        let f = s.getMutableNode(g.id);
        f = f.getOriginalObject() ?? f, g.setOriginalObject(f), f.setDeepestNodeClone(g), g.isChild = !0;
      }), p.getMutableEdges().forEach((g) => {
        let f = s.getMutableEdge(g.id);
        f && (f = f.getOriginalObject() ?? f, g.setOriginalObject(f));
      }), e.forEach((g) => {
        var f;
        if (((f = g.parentNode) == null ? void 0 : f.id) === n.id) {
          const v = p.getMutableNode(g.id);
          v && (v.parentNode = n);
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
          const p = d.renderer.getGraphInteraction().getSelectedNodeIDs();
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
      nodes: [...e].map((p) => p.toDict(!0)),
      edges: [...t].map((p) => p.toDict())
    }, h = document.createElement("div"), d = new ft(h, l, a), u = h.querySelector(".zoom-layer");
    return i.appendChild(u), d.getMutableNodes().forEach((p) => {
      rt.toggleSyntheticEdges(p);
    }), d.on("ready", () => {
      d.simulation.getSimulation().force("center", Na(0, 0)).force("constrainParent", En(n.getCircleRadius(), 10)), d.simulation.restart();
    }), d.renderer.getGraphInteraction().on("dragended", () => {
    }), d.renderer.getGraphInteraction().on("simulationTick", () => {
      d.getMutableNodes().filter((g) => g.visible).forEach((g) => {
        const f = g.x ?? 0, v = g.y ?? 0;
        this.updatePositionOnRealChild(f, v, g.id);
      });
    }), s.renderer.getGraphInteraction().on("dragging", () => {
      this.updatePositionOnAllRealChildren(s);
    }), s.renderer.getGraphInteraction().on("simulationTick", () => {
      this.updatePositionOnAllRealChildren(s);
    }), s.renderer.getGraphInteraction().on("canvasClick", () => {
      d.deselectAll();
    }), d;
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
  updatePositionOnAllRealChildren(e) {
    e.getMutableNodes().filter((t) => t.isParent && t.expanded).forEach((t) => {
      const i = t.children, n = t.getSubgraph(), s = /* @__PURE__ */ new Map();
      n && (n.getMutableNodes().forEach((o) => {
        s.set(o.id, o);
      }), this.updatePositionOnAllRealChildren(n)), i.forEach((o) => {
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
  updatePositionOnRealChild(e, t, i) {
    const n = this.nodeDrawer.graph.getMutableNode(i), s = n == null ? void 0 : n.parentNode;
    if (n && s) {
      const o = Bl.localToGlobal(e, t, s);
      n.x = o.x, n.y = o.y, this.nodeDrawer.graph.renderer.nextTickFor([n]);
      const a = this.nodeDrawer.graph.getParentGraph();
      a && a.renderer.nodeDrawer.clusterDrawer.updatePositionOnRealChild(e, t, i);
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
  static toggleSyntheticEdges(e) {
    const t = (i) => i.isSynthetic === !0 && i.isCrossCluster !== !0;
    if (e.expanded) {
      e.getEdgesIn().filter(t).forEach((n) => {
        n.hide();
      });
      const i = e.getOriginalObject() ?? e;
      i.getEdgesIn().filter(t).forEach((n) => {
        n.hide();
      }), i.children.forEach((n) => {
        n.getEdgesIn().filter((s) => !i.children.includes(s.from)).filter((s) => s.isCrossCluster !== !0).forEach((s) => {
          s.show();
        });
      });
    } else {
      e.getEdgesIn().filter(t).forEach((n) => {
        n.show();
      });
      const i = e.getOriginalObject() ?? e;
      i.getEdgesIn().filter(t).forEach((n) => {
        e.visible && n.show();
      }), rt.hideNestedEdges(i);
    }
  }
  /**
   * Re-resolve which cross-cluster (child↔child) stand-in edges are visible after an
   * expand/collapse, walking to the root graph so a nested toggle updates the whole
   * set. Delegates the per-edge decision to {@link Graph.resolveCrossClusterEdges}.
   *
   * @param graph - Any graph in the hierarchy that just changed expansion state
   */
  static resolveCrossClusterEdges(e) {
    let t = e, i = t.getParentGraph();
    for (; i; )
      t = i, i = t.getParentGraph();
    ft.resolveCrossClusterEdges(t.getMutableEdges());
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
  static hideNestedEdges(e) {
    e.children.forEach((t) => {
      rt.hideNestedEdges(t), t.getEdgesIn().filter((i) => !e.children.includes(i.from)).forEach((i) => {
        i.hide();
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
  static collapseAllOpenedClusters(e) {
    e.children.forEach((t) => {
      rt.collapseAllOpenedClusters(t), t.collapse(), t.setCircleRadius(t.getCircleRadiusCollapsed());
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
  static updateToNewRadiusExpanded(e, t) {
    const i = rt.getRadiusForClusterNode(t);
    t.expanded || t.setCircleRadiusCollapsed(t.getCircleRadius()), t.setCircleRadius(i);
    const n = e.getParentGraph();
    if (n) {
      const s = rt.updateParentGraph(n, t, i);
      s && e.simulation.getSimulation().force("link", null).force("constrainParent", En(s, 10)), n.getParentGraph() && t.parentNode && rt.updateToNewRadiusExpanded(n, t.parentNode);
    }
    return i;
  }
  /**
   * Updates the radius of a node when it is collapsed, propagating changes up the parent hierarchy.
   *
   * @param node - The node being collapsed
   * @param restoreR - Whether to restore the original collapsed radius
   * @param graph - The graph containing the node (optional, used for propagation)
   */
  static updateToNewRadiusCollapsed(e, t, i) {
    const n = t ? e.getCircleRadiusCollapsed() : rt.getRadiusForClusterNode(e);
    if (e.setCircleRadius(n), i) {
      rt.updateParentGraph(i, e, n);
      const s = i.getParentGraph();
      e.parentNode && rt.updateToNewRadiusCollapsed(e.parentNode, !1, s);
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
  static getRadiusForClusterNode(e) {
    if (!e.expanded)
      return e.getCircleRadius() + 4;
    const t = 50, i = 16, s = e.children.reduce((a, l) => {
      const h = l.getCircleRadius();
      return a + h + i;
    }, 0) / e.children.length, o = Math.sqrt(e.children.length) * (2 * s) + t;
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
  static updateParentGraph(e, t, i) {
    var a;
    const n = e.getMutableNode(t.id);
    n == null || n.setCircleRadius(i);
    const s = t.getOriginalObject();
    s && s.setCircleRadius(i);
    const o = t.parentNode;
    if (o) {
      const l = rt.getRadiusForClusterNode(o);
      o.setCircleRadius(l), e.onChange(), e.simulation.reheat(0.1);
      const h = (a = o.getGraphElement()) == null ? void 0 : a.querySelector("& > .pvt-cluster-area");
      if (h) {
        const d = ht(h);
        d.attr("_final_r", l).transition().duration(250).attr("r", l), Ri.handleChildrenExpanded(e, o, d);
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
  static buildGradientForNode(e, t, i) {
    if (e) {
      const n = getComputedStyle(e).fill;
      if (so(n)) return;
      const s = `color-mix(in srgb, ${n} 40%, transparent)`, o = `pvt-cluster-area-${i.id}`, a = e.closest(".pvt-canvas-element"), l = a == null ? void 0 : a.querySelector("defs");
      if (!l) return;
      const h = l.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "radialGradient"));
      h.setAttribute("id", o);
      const d = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      d.setAttribute("offset", "90%"), d.setAttribute("stop-color", "#ffffff00"), h.appendChild(d);
      const u = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      return u.setAttribute("offset", "100%"), u.setAttribute("stop-color", s), h.appendChild(u), t.style("fill", `url(#${o})`), n;
    }
  }
}
const oo = 2, Hl = ["ne", "se", "sw", "nw"], zl = 6, $l = 14, Gl = 0.45, Ul = 3;
function ao(r, e) {
  const t = e.getCircleRadius() || 10, i = r.querySelector(":scope > .node");
  if (i) {
    const s = i.tagName.toLowerCase();
    if (s === "rect") {
      const o = Number(i.getAttribute("width")) || 0, a = Number(i.getAttribute("height")) || 0;
      if (o > 0 && a > 0) return { hx: o / 2, hy: a / 2, round: !1 };
    } else if (s === "circle") {
      const o = Number(i.getAttribute("r")) || 0;
      if (o > 0) return { hx: o, hy: o, round: !0 };
    }
    return { hx: t, hy: t, round: !0 };
  }
  const n = r.querySelector(":scope > foreignObject");
  if (n) {
    const s = Number(n.getAttribute("width")) || 0, o = Number(n.getAttribute("height")) || 0;
    if (s > 0 && o > 0) return { hx: s / 2, hy: o / 2, round: !1 };
  }
  return { hx: t, hy: t, round: !0 };
}
function lo(r, e, t, i = oo) {
  const { hx: n, hy: s, round: o } = ao(r, e), a = t === "ne" || t === "se" ? 1 : -1, l = t === "ne" || t === "nw" ? -1 : 1;
  if (o)
    return { x: a * (n + i) / Math.SQRT2, y: l * (s + i) / Math.SQRT2 };
  const h = i / Math.SQRT2;
  return { x: a * (n + h), y: l * (s + h) };
}
function ql(r, e) {
  const t = typeof r.badges == "function" ? r.badges(e) : r.badges;
  return Array.isArray(t) ? t.filter(Boolean) : [];
}
class jl {
  constructor(e) {
    c(this, "graph");
    /** What each node is currently wearing, so a re-anchor can redraw without re-resolving the style. */
    c(this, "drawn", /* @__PURE__ */ new WeakMap());
    this.graph = e;
  }
  /**
   * Draw `badges` on the node's rim, replacing whatever was there.
   *
   * Idempotent, because it is also how a re-anchor repaints: badge size is derived from the
   * node's extents, which land late for framed images, custom shapes and measured cards.
   */
  render(e, t, i) {
    if (this.drawn.set(t, i), e.selectAll(":scope > .pvt-node-badges").remove(), i.length === 0) return;
    const n = e.node();
    if (!n) return;
    const s = e.append("g").classed("pvt-node-badges", !0), { hx: o, hy: a } = ao(n, t), l = Math.min($l, Math.max(zl, Gl * Math.max(o, a)));
    for (const h of this.place(t, i)) {
      const d = lo(n, t, h.corner);
      this.drawBadge(s, t, h, d, l);
    }
  }
  /**
   * Repaint a node's badges against its current extents.
   *
   * Called wherever the node's size is settled after the fact — the `imageFit: 'frame'` probe,
   * the custom-shape measure and the `renderNode` measure loop — so a badge never stays pinned
   * to the guessed radius it was first drawn against.
   */
  reanchor(e) {
    const t = this.drawn.get(e);
    if (!t || t.length === 0) return;
    const i = e.getGraphElement();
    i && this.render(ht(i), e, t);
  }
  /**
   * Hand out corners: explicit requests first and verbatim, then auto-placement clockwise
   * through whatever is left.
   *
   * The expand affordance sits `ne` when collapsed and `se` when expanded, so on a node with
   * children **both** are reserved whatever its current state — otherwise every badge would
   * change corner the moment the cluster opened.
   */
  place(e, t) {
    const i = !!this.graph.renderer.getOptions().enableNodeExpansion && e.hasChildren(), n = new Set(i ? ["ne", "se"] : []), s = [], o = [];
    for (const u of t)
      u.position ? (s.push({ badge: u, corner: u.position }), n.add(u.position)) : o.push(u);
    const a = Hl.filter((u) => !n.has(u));
    if (o.length <= a.length)
      return o.forEach((u, p) => s.push({ badge: u, corner: a[p] })), s;
    const l = a.slice(0, Math.max(0, a.length - 1));
    l.forEach((u, p) => s.push({ badge: o[p], corner: u }));
    const h = o.slice(l.length), d = a[a.length - 1];
    return d && s.push({
      badge: {
        text: `+${h.length}`,
        title: h.map((u) => u.title).filter(Boolean).join(`
`) || void 0
      },
      corner: d,
      overflow: !0
    }), s;
  }
  drawBadge(e, t, i, n, s) {
    var y;
    const { badge: o, corner: a, overflow: l } = i, h = e.append("g").classed("pvt-node-badge", !0).attr("data-pvt-badge-position", a).attr("transform", `translate(${n.x}, ${n.y})`);
    l && h.classed("pvt-node-badge-overflow", !0), o.title && h.append("title").text(o.title);
    const d = o.text ? this.labelFor(o.text) : void 0, u = (d == null ? void 0 : d.length) ?? 1, p = s * (u >= 3 ? 0.9 : u === 2 ? 1.05 : 1.25), g = d ? Math.max(2 * s, u * p * 0.64 + s * 0.7) : 2 * s, f = h.append("rect").attr("class", "pvt-node-badge-shape").attr("x", -g / 2).attr("y", -s).attr("width", g).attr("height", 2 * s).attr("rx", s).attr("ry", s);
    if (o.color && f.style("fill", o.color), d !== void 0 ? h.append("text").attr("class", "pvt-node-badge-text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", p).text(d) : this.drawIcon(h, o, s), l) return;
    const v = !!o.onClick || typeof ((y = this.graph.getCallbacks()) == null ? void 0 : y.onBadgeClick) == "function";
    h.classed("pvt-node-badge-interactive", v), h.on("click", (b) => {
      var S;
      v && b.stopPropagation();
      const k = t.getGraphElement();
      (S = this.graph.renderer.getGraphInteraction()) == null || S.badgeClick(k, b, t, o);
    });
  }
  /** Text a badge can actually wear: three characters, then it just reports "lots". */
  labelFor(e) {
    return e.length > Ul ? "99+" : e;
  }
  drawIcon(e, t, i) {
    var n;
    if (t.iconClass || t.iconUnicode) {
      const s = t.iconClass ? Zr(t.iconClass) : void 0, o = t.iconUnicode ?? (s == null ? void 0 : s.glyph);
      if (!o) return;
      const a = e.append("text").attr("class", "pvt-node-badge-text icon icon-unicode").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", i * 1.1).text(o);
      s && s.glyph !== "" && a.style("font-family", s.fontFamily).style("font-weight", s.fontWeight).style("font-style", s.fontStyle);
      return;
    }
    if (t.svgIcon) {
      const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.appendChild(On(t.svgIcon)), ((n = s.children[0]) == null ? void 0 : n.nodeName) === "svg" && (s.children[0].removeAttribute("width"), s.children[0].removeAttribute("height"));
      const o = i * 1.3;
      e.append(() => s).attr("class", "pvt-node-badge-icon").attr("x", -o / 2).attr("y", -o / 2).attr("width", o).attr("height", o);
    }
  }
}
const Wl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm0 2H9v14h9a1 1 0 0 0 .993-.883L19 18V6a1 1 0 0 0-.883-.993zm-4.387 4.21l.094.083l2 2a1 1 0 0 1 .083 1.32l-.083.094l-2 2a1 1 0 0 1-1.497-1.32l.083-.094L13.585 12l-1.292-1.293a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083"/></svg>', Vl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3a3 3 0 0 1 2.995 2.824L21 6v12a3 3 0 0 1-2.824 2.995L18 21H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3zm-3 2H6a1 1 0 0 0-.993.883L5 6v12a1 1 0 0 0 .883.993L6 19h9zm-3.293 4.293a1 1 0 0 1 .083 1.32l-.083.094L10.415 12l1.292 1.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083l-2-2a1 1 0 0 1-.083-1.32l.083-.094l2-2a1 1 0 0 1 1.414 0"/></svg>', co = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M13 3.5v3a.5.5 0 0 1-1 0V4.71L9.85 6.86a.5.5 0 0 1-.707-.707l2.15-2.15h-1.79a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .351.144l.004.004a.5.5 0 0 1 .144.348v.004zM3.5 9a.5.5 0 0 1 .5.5v1.79l2.15-2.15a.5.5 0 0 1 .707.707l-2.15 2.15h1.79a.5.5 0 0 1 0 1H3.494a.5.5 0 0 1-.497-.499v-3a.5.5 0 0 1 .5-.5z"/><path fill="currentColor" fill-rule="evenodd" d="M0 4.8c0-1.68 0-2.52.327-3.16A3.02 3.02 0 0 1 1.637.33c.642-.327 1.48-.327 3.16-.327h6.4c1.68 0 2.52 0 3.16.327a3.02 3.02 0 0 1 1.31 1.31c.327.642.327 1.48.327 3.16v6.4c0 1.68 0 2.52-.327 3.16a3 3 0 0 1-1.31 1.31c-.642.327-1.48.327-3.16.327h-6.4c-1.68 0-2.52 0-3.16-.327a3 3 0 0 1-1.31-1.31C0 13.718 0 12.88 0 11.2zM4.8 1h6.4c.857 0 1.44 0 1.89.038c.438.035.663.1.819.18c.376.192.682.498.874.874c.08.156.145.38.18.819c.037.45.038 1.03.038 1.89v6.4c0 .857-.001 1.44-.038 1.89c-.036.438-.101.663-.18.819a2 2 0 0 1-.874.874c-.156.08-.381.145-.819.18c-.45.036-1.03.037-1.89.037H4.8c-.857 0-1.44 0-1.89-.037c-.438-.036-.663-.101-.819-.18a2 2 0 0 1-.874-.874c-.08-.156-.145-.381-.18-.82C1 12.64.999 12.06.999 11.2V4.8c0-.856.001-1.44.038-1.89c.036-.437.101-.662.18-.818c.192-.376.498-.682.874-.874c.156-.08.381-.145.819-.18C3.36 1 3.94 1 4.8 1" clip-rule="evenodd"/></svg>', Kl = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1.5a.5.5 0 0 0-.5-.5H4.2c-1.12 0-1.68 0-2.11.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.11v3.3a.5.5 0 0 0 1 0v-3.3c0-.577 0-.949.024-1.23c.022-.272.06-.372.085-.422c.096-.188.249-.341.437-.437c.05-.025.15-.063.422-.085c.283-.023.656-.024 1.23-.024h3.3a.5.5 0 0 0 .5-.5zm7 10.3V8.5a.5.5 0 0 0-1 0v3.3c0 .577 0 .949-.024 1.23c-.022.272-.06.372-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085c-.283.023-.656.024-1.23.024h-3.3a.5.5 0 0 0 0 1h3.3c1.12 0 1.68 0 2.11-.218c.376-.192.682-.498.874-.874c.218-.428.218-.988.218-2.11zM6.85 9.15a.5.5 0 0 1 .147.35v3.003a.5.5 0 0 1-1 0v-1.79l-4.15 4.15a.5.5 0 0 1-.707-.707l4.15-4.15H3.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .191.038q.09.036.162.11zM10.7 6l4.15-4.15a.5.5 0 0 0-.707-.707l-4.15 4.15v-1.79a.5.5 0 0 0-1 0v3.003a.5.5 0 0 0 .309.46a.5.5 0 0 0 .19.037h3a.5.5 0 0 0 0-1h-1.79z"/></svg>', Yl = '<svg width="4.2333331mm" height="3.96875mm" viewBox="0 0 4.2333331 3.96875" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1" /> <g id="layer1" transform="translate(-132.29166,-106.89167)"> <path fill="currentColor" fill-rule="evenodd" d="m 132.57451,108.09552 a 0.66066458,0.66066458 0 0 0 1.04007,-0.54239 0.66145833,0.66145833 0 1 0 -1.04007,0.54239 m 0.37861,-0.27781 a 0.264585,0.264585 0 1 0 0,-0.52917 0.264585,0.264585 0 0 0 0,0.52917 m 2.91042,0.39687 a 0.66066458,0.66066458 0 0 1 -0.66146,-0.66145 0.66145833,0.66145833 0 1 1 0.66146,0.66145 m 0.26458,-0.66145 a 0.26458333,0.26458333 0 1 1 -0.52916,0 0.26458333,0.26458333 0 0 1 0.52916,0 m -2.2307,1.33614 a 0.66066458,0.66066458 0 0 0 1.04008,-0.54239 0.66145833,0.66145833 0 1 0 -1.04008,0.54239 m 0.37862,-0.27781 a 0.264585,0.264585 0 1 0 0,-0.52917 0.264585,0.264585 0 0 0 0,0.52917 m 1.19063,1.71979 a 0.66066458,0.66066458 0 0 1 -0.66146,-0.66146 0.66145833,0.66145833 0 1 1 0.66146,0.66146 m 0.26458,-0.66146 a 0.264585,0.264585 0 1 1 -0.52917,0 0.264585,0.264585 0 0 1 0.52917,0 m -2.24896,1.19063 a 0.66066458,0.66066458 0 0 1 -0.66146,-0.66146 0.66145833,0.66145833 0 1 1 0.66146,0.66146 m 0.26458,-0.66146 a 0.26458333,0.26458333 0 1 1 -0.52916,0 0.26458333,0.26458333 0 0 1 0.52916,0" clip-rule="evenodd" id="path1" style="stroke-width:0.264583" /> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.529167" d="m 133.06292,108.11741 0.25132,1.51998 m 0.7969,-0.73919 -0.3281,0.80361 m 1.57769,-1.87938 -0.59147,0.26106 m 0.35159,1.16811 -0.45978,-0.53433" id="path1-6" /> </g> </svg>', Xl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 20a2 2 0 1 0-4 0a2 2 0 0 0 4 0M16 4a2 2 0 1 0-4 0a2 2 0 0 0 4 0m0 16a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-5-8a2 2 0 1 0-4 0a2 2 0 0 0 4 0m10 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0M5.058 18.306l2.88-4.606m2.123-3.397l2.877-4.604m-2.873 8.006l2.876 4.6M15.063 5.7l2.881 4.61" />
</svg>`, Zl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(-90deg);">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 20a2 2 0 1 0-4 0a2 2 0 0 0 4 0M16 4a2 2 0 1 0-4 0a2 2 0 0 0 4 0m0 16a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-5-8a2 2 0 1 0-4 0a2 2 0 0 0 4 0m10 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0M5.058 18.306l2.88-4.606m2.123-3.397l2.877-4.604m-2.873 8.006l2.876 4.6M15.063 5.7l2.881 4.61" />
</svg>`, Ql = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19a2 2 0 1 0-4 0a2 2 0 0 0 4 0m8-14a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-8 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-4 7a2 2 0 1 0-4 0a2 2 0 0 0 4 0m12 7a2 2 0 1 0-4 0a2 2 0 0 0 4 0m-4-7a2 2 0 1 0-4 0a2 2 0 0 0 4 0m8 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0M6 12h4m4 0h4m-3-5l-2 3M9 7l2 3m0 4l-2 3m4-3l2 3" />
</svg>`, Jl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9v6m3-4v2a2 2 0 1 0 4 0v-2a2 2 0 1 0-4 0m-9 1v.01M21 12v.01M12 21v.01M7.5 4.2v.01m9 15.59v.01m-9-.01v.01M4.2 16.5v.01m15.6-.01v.01M4.2 7.5v.01m15.61.017A9 9 0 0 0 12 3"/></svg>', tc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="M15.72 2.22a.75.75 0 1 1 1.06 1.06l-.97.97l.97.97a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06zM3.75 3.5h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5m12.5 10a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1 0-1.5zM3.75 10h12.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5"/></svg>', ec = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M10 15h12v2H10zM8.7 6.285A3 3 0 0 0 9 5a3 3 0 1 0-3 3a2.96 2.96 0 0 0 1.285-.3L10 10.413V13h2V9.586zM6 6a1 1 0 1 1 1-1a1 1 0 0 1-1 1m13-1a3 3 0 1 0-4 2.815V13h2V7.816A3 3 0 0 0 19 5m-3 1a1 1 0 1 1 1-1a1 1 0 0 1-1 1m10-4a3.003 3.003 0 0 0-3 3a3 3 0 0 0 .3 1.285l-3.3 3.3V13h2v-2.586L24.715 7.7A2.96 2.96 0 0 0 26 8a3 3 0 0 0 0-6m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1M12 19h-2v2.586L7.285 24.3A2.96 2.96 0 0 0 6 24a3 3 0 1 0 3 3a3 3 0 0 0-.3-1.285l3.3-3.3zm-6 9a1 1 0 1 1 1-1a1 1 0 0 1-1 1m11-3.816V19h-2v5.184a3 3 0 1 0 2 0M16 28a1 1 0 1 1 1-1a1 1 0 0 1-1 1m10-4a2.96 2.96 0 0 0-1.285.3L22 21.587V19h-2v3.414l3.3 3.3A3 3 0 0 0 23 27a3 3 0 1 0 3-3m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1"/></svg>', ic = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m16.957 10.207l2.5-2.5a1 1 0 0 0-1.414-1.414l-.793.793V4a1 1 0 1 0-2 0v3.086l-.793-.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0M4 6.5A2.5 2.5 0 0 1 6.5 4h4a1 1 0 1 1 0 2h-4a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h4a1 1 0 1 1 0 2h-4A2.5 2.5 0 0 1 4 17.5zm15.457 9.793l-2.5-2.5a1 1 0 0 0-1.414 0l-2.5 2.5a1 1 0 0 0 1.414 1.414l.793-.793V20a1 1 0 1 0 2 0v-3.086l.793.793a1 1 0 0 0 1.414-1.414"/></svg>', ho = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="currentColor" d="M24.23 11.71a39 39 0 0 0-4.57-3.92a23 23 0 0 1 3.48-1.72c.32-.12.62-.21.92-.3a2.28 2.28 0 0 0 3.81-.46a3.3 3.3 0 0 1 1.92.84c1.19 1.19 1.22 3.59.1 6.58c.49.65.94 1.31 1.35 2c.17-.4.35-.79.49-1.18c1.47-3.85 1.28-7-.53-8.78a5.3 5.3 0 0 0-3.33-1.44a2.29 2.29 0 0 0-4.31.54c-.37.11-.74.22-1.13.37a26 26 0 0 0-4.57 2.35a26 26 0 0 0-4.58-2.39c-3.85-1.46-7-1.28-8.77.53c-1.66 1.67-1.93 4.44-.83 7.86a2.28 2.28 0 0 0 1.59 3.67c.32.61.67 1.22 1.06 1.82A25.5 25.5 0 0 0 4 22.66c-1.47 3.84-1.28 7 .53 8.77a5.63 5.63 0 0 0 4.12 1.51a13.3 13.3 0 0 0 4.65-1a26 26 0 0 0 4.58-2.35A26 26 0 0 0 22.43 32a14.2 14.2 0 0 0 3.65.9a2.3 2.3 0 0 0 4.38-.9a4.6 4.6 0 0 0 .74-.57c1.81-1.81 2-4.93.53-8.77a32.7 32.7 0 0 0-7.5-10.95M12.57 30.09c-3 1.15-5.45 1.13-6.65-.08s-1.23-3.62-.07-6.64a23 23 0 0 1 1.71-3.48a40 40 0 0 0 3.92 4.56c.43.43.87.85 1.31 1.25q.9-.46 1.83-1.05c-.58-.52-1.16-1-1.72-1.61a34 34 0 0 1-5.74-7.47a2.29 2.29 0 0 0-1.66-3.88c-.75-2.5-.62-4.49.43-5.54a3.72 3.72 0 0 1 2.72-.92a11.4 11.4 0 0 1 3.93.84a23 23 0 0 1 3.48 1.72a39 39 0 0 0-4.57 3.92c-.44.44-.87.9-1.29 1.36a20 20 0 0 0 1 1.85c.54-.61 1.09-1.21 1.68-1.8a36.3 36.3 0 0 1 5-4.17a37 37 0 0 1 4.95 4.17a36.3 36.3 0 0 1 4.17 5a37 37 0 0 1-4.17 5a30.7 30.7 0 0 1-10.26 6.97M29.79 30l-.16.13a2.27 2.27 0 0 0-3.5.72a12.6 12.6 0 0 1-3-.77a22 22 0 0 1-3.48-1.72a39 39 0 0 0 4.57-3.92a38 38 0 0 0 3.92-4.56a23 23 0 0 1 1.72 3.48C31 26.39 31 28.81 29.79 30" class="clr-i-solid clr-i-solid-path-1"/><circle cx="17.99" cy="18.07" r="3.3" fill="currentColor" transform="rotate(-9.22 17.955 18.05)"/><path fill="none" d="M0 0h36v36H0z"/></svg>', uo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.76 20.83L17.6 18l-2.84-2.83l1.41-1.41L19 16.57l2.83-2.81l1.41 1.41L20.43 18l2.81 2.83l-1.41 1.41L19 19.4l-2.83 2.84zM12 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L8.29 18.7a.99.99 0 0 1-.29-.83V12h-.03L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 12z"/></svg>', po = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L8.29 18.7a.99.99 0 0 1-.29-.83V12h-.03L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 12zm3 5h3v-3h2v3h3v2h-3v3h-2v-3h-3z"/></svg>', go = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" d="M5.655 2.639a.5.5 0 0 0 .69.723l1.313-1.254a.5.5 0 0 1 .691.001l1.305 1.252a.5.5 0 0 0 .692-.721L9.042 1.388a1.5 1.5 0 0 0-2.075-.003zM3.362 6.346a.5.5 0 1 0-.723-.69L1.388 6.963a1.5 1.5 0 0 0 0 2.073l1.251 1.31a.5.5 0 0 0 .723-.691l-1.251-1.31a.5.5 0 0 1 0-.69zm2.984 6.293a.5.5 0 0 0-.691.723l1.314 1.256a1.5 1.5 0 0 0 2.077-.004l1.301-1.254a.5.5 0 1 0-.694-.72l-1.3 1.254a.5.5 0 0 1-.693.001zm7.015-6.985a.5.5 0 1 0-.722.693l1.258 1.31a.5.5 0 0 1 0 .693L12.64 9.654a.5.5 0 1 0 .72.694l1.257-1.304a1.5 1.5 0 0 0 .001-2.08zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z" />
</svg>`, nc = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4" />
</svg>`, sc = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" fill-rule="evenodd" d="M2 8a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1" clip-rule="evenodd" />
</svg>`, te = (r) => `<svg xmlns="http://www.w3.org/2000/svg" width="${r ?? 24}" height="${r ?? 24}" viewBox="0 0 24 24" style="filter: drop-shadow(0px 2px 1px #00000033);">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linejoin="round" d="M8 6h1.78c2.017 0 3.025 0 3.534.241a2.5 2.5 0 0 1 1.211 3.276c-.229.515-.994 1.17-2.525 2.483c-1.53 1.312-2.296 1.968-2.525 2.483a2.5 2.5 0 0 0 1.211 3.276c.51.241 1.517.241 3.534.241H16" />
        <path d="M2 6a3 3 0 1 0 6 0a3 3 0 0 0-6 0Zm14 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0Z" />
    </g>
</svg>`, fo = (r) => `<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${r}" viewBox="0 0 256 256" ><g fill="currentColor"><path d="M216 40v176H40V40Z" opacity="0.2"/><path d="M152 40a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8m-8 168h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16m64-176h-24a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0V48a16 16 0 0 0-16-16m8 72a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8m0 72a8 8 0 0 0-8 8v24h-24a8 8 0 0 0 0 16h24a16 16 0 0 0 16-16v-24a8 8 0 0 0-8-8M40 152a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8m32 56H48v-24a8 8 0 0 0-16 0v24a16 16 0 0 0 16 16h24a8 8 0 0 0 0-16m0-176H48a16 16 0 0 0-16 16v24a8 8 0 0 0 16 0V48h24a8 8 0 0 0 0-16"/></g></svg>`, rc = '<svg width="16" height="16"viewBox="0 0 3.4393651 3.7032704" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs1" /> <g id="layer1" transform="translate(-128.32315,-97.896729)" fill="currentColor"> <path id="path1" d="m 130.91707,97.898417 a 0.79375,0.79375 0 0 0 -0.71416,0.999939 l -0.51729,0.296106 a 0.79375,0.79375 0 1 0 0,1.107428 l 0.51729,0.29559 a 0.79454375,0.79454375 0 0 0 0.76584,1.00252 0.79375,0.79375 0 1 0 -0.56896,-1.3472 l -0.51728,-0.296111 a 0.79375,0.79375 0 0 0 0,-0.417545 l 0.51728,-0.296106 a 0.79375,0.79375 0 0 0 1.36271,-0.553455 0.79375,0.79375 0 0 0 -0.84543,-0.791166 z m 0.0517,0.394291 a 0.396875,0.396875 0 0 1 0,0.79375 0.396875,0.396875 0 1 1 0,-0.79375 z m 0,2.116662 a 0.396875,0.396875 0 0 1 0,0.79375 0.396875,0.396875 0 0 1 0,-0.79375 z" /> </g> </svg> ', Pn = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
</svg>`, mo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path fill="currentColor" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
</svg>`, vo = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M227.73 66.85L160 139.17v55.49a16 16 0 0 1-7.13 13.34l-32 21.34A16 16 0 0 1 96 216v-76.83L28.27 66.85l-.08-.09A16 16 0 0 1 40 40h176a16 16 0 0 1 11.84 26.76ZM227.31 192l18.35-18.34a8 8 0 0 0-11.32-11.32L216 180.69l-18.34-18.35a8 8 0 0 0-11.32 11.32L204.69 192l-18.35 18.34a8 8 0 0 0 11.32 11.32L216 203.31l18.34 18.35a8 8 0 0 0 11.32-11.32Z"/></svg>', oc = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <path d="M11.272 36.728A17.94 17.94 0 0 0 24 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17" />
        <path d="M6 9v8h8" />
    </g>
</svg>`, ac = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" style="transform: scaleX(-1); transform-origin: center;">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        <path d="M11.272 36.728A17.94 17.94 0 0 0 24 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17" />
        <path d="M6 9v8h8" />
    </g>
</svg>`, yo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"/></svg>', Ni = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4h2v12l5.5-5.5l1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5L11 16z"/></svg>', lc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4"/></svg>', cc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0l-4 4m4-4l-4-4"/></svg>', hc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.75 5.623V9.52a4 4 0 0 1-4 4H3.871m4.236 4.857L4.31 14.58a1.5 1.5 0 0 1-.44-1.061m4.236-4.857L4.31 12.46c-.293.293-.44.677-.44 1.061"/></svg>', dc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75"/></svg>', we = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m15.113 3.21l.094.083l5.5 5.5a1 1 0 0 1-1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1-.158.277l-.07.08l-1.5 1.5a1 1 0 0 1-1.32.082l-.095-.083L9 16.415l-3.793 3.792a1 1 0 0 1-1.497-1.32l.083-.094L7.585 15l-2.792-2.793a1 1 0 0 1-.083-1.32l.083-.094l1.5-1.5a1 1 0 0 1 .258-.187l.098-.042l3.796-1.425l3.171-3.17a1 1 0 0 1 1.497-1.26z"/></svg>', Bn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20.971 17.172l-1.414 1.414l-3.535-3.535l-.073.074l-.707 3.535l-1.415 1.415l-4.242-4.243l-4.95 4.95l-1.414-1.414l4.95-4.95l-4.243-4.243l1.414-1.414l3.536-.707l.073-.074l-3.536-3.536l1.414-1.415zm-2.12-4.95l1.34-1.34l.707.707l1.415-1.414l-8.486-8.485l-1.414 1.414l.707.707l-1.34 1.34z"/></svg>', Hn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m7 7l10 10M7 17L17 7"/></svg>', Ii = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6H8a2 2 0 0 0-2 2v8m10 26H8a2 2 0 0 1-2-2v-8m26 10h8a2 2 0 0 0 2-2v-8M32 6h8a2 2 0 0 1 2 2v8"/><circle cx="24" cy="24" r="6"/></svg>', bo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" ><g fill="currentColor"><path d="M216 40v176H40V40Z" opacity="0.2"/><path d="M152 40a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8m-8 168h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16m64-176h-24a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0V48a16 16 0 0 0-16-16m8 72a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8m0 72a8 8 0 0 0-8 8v24h-24a8 8 0 0 0 0 16h24a16 16 0 0 0 16-16v-24a8 8 0 0 0-8-8M40 152a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8m32 56H48v-24a8 8 0 0 0-16 0v24a16 16 0 0 0 16 16h24a8 8 0 0 0 0-16m0-176H48a16 16 0 0 0-16 16v24a8 8 0 0 0 16 0V48h24a8 8 0 0 0 0-16"/></g></svg>', ee = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>', Wt = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>', zn = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425z"/></svg>', uc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><circle cx="21" cy="26" r="2" fill="currentColor"/><circle cx="21" cy="6" r="2" fill="currentColor"/><circle cx="4" cy="16" r="2" fill="currentColor"/><path fill="currentColor" d="M28 12a3.996 3.996 0 0 0-3.858 3h-4.284a3.966 3.966 0 0 0-5.491-2.643l-3.177-3.97A3.96 3.96 0 0 0 12 6a4 4 0 1 0-4 4a4 4 0 0 0 1.634-.357l3.176 3.97a3.924 3.924 0 0 0 0 4.774l-3.176 3.97A4 4 0 0 0 8 22a4 4 0 1 0 4 4a3.96 3.96 0 0 0-.81-2.387l3.176-3.97A3.966 3.966 0 0 0 19.858 17h4.284A3.993 3.993 0 1 0 28 12M6 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m8-10a2 2 0 1 1 2-2a2 2 0 0 1-2 2m12 0a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg>', pc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.172 14.829l5.657-5.657M7.05 11.293l-1.414 1.414a4 4 0 1 0 5.657 5.657l1.412-1.414m-1.413-9.9l1.414-1.414a4 4 0 1 1 5.657 5.657l-1.414 1.414"/></svg>', Ws = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></g></svg>', gc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></g></svg>', fc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="round" d="M17.5 17.5L22 22"/><path d="M20 11a9 9 0 1 0-18 0a9 9 0 0 0 18 0Z"/><path stroke-linecap="round" d="m14.5 9.5l.92.793c.387.333.58.5.58.707s-.193.374-.58.707l-.92.793m-7-3l-.92.793c-.387.333-.58.5-.58.707s.193.374.58.707l.92.793m4.5-4l-2 5"/></g></svg>', mc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1M4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm2 5h2v2H6zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-3 4H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-2 3H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1" clip-rule="evenodd"/></svg>', vc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m11.852 2.011l.058-.007L12 2l.075.003l.126.017l.111.03l.111.044l.098.052l.104.074l.082.073l3 3a1 1 0 1 1-1.414 1.414L13 5.415V13a1 1 0 0 1-2 0V5.415L9.707 6.707a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414l3-3q.053-.054.112-.097l.11-.071l.114-.054l.105-.035zM12 16a3 3 0 1 1 0 6a3 3 0 0 1 0-6"/></svg>', yc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a1 1 0 0 1 1 1v7.584l1.293-1.291a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-.112.097l-.11.071l-.114.054l-.105.035l-.149.03L12 22l-.075-.003l-.126-.017l-.111-.03l-.111-.044l-.098-.052l-.096-.067l-.09-.08l-3-3a1 1 0 0 1 1.414-1.414L11 18.586V11a1 1 0 0 1 1-1m0-8a3 3 0 1 1-3 3l.005-.176A3 3 0 0 1 12 2"/></svg>', Ke = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">< path d = "M0 0h24v24H0z" fill = "none" /><path fill="currentColor" d = "M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>', _i = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">< path d = "M0 0h24v24H0z" fill = "none" /><path fill="currentColor" d = "m14 19l5-5h-4q-.425 0-.712.288T14 15zm-9 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v9.175q0 .4-.15.763t-.425.637l-4.85 4.85q-.275.275-.637.425t-.763.15zm3-7h3q.425 0 .713-.288T12 13t-.288-.712T11 12H8q-.425 0-.712.288T7 13t.288.713T8 14m0-4h8q.425 0 .713-.288T17 9t-.288-.712T16 8H8q-.425 0-.712.288T7 9t.288.713T8 10" /></svg>', wo = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">< path d = "M0 0h14v14H0z" fill = "none" /><g fill="none" stroke = "currentColor" stroke - linecap="round" stroke - linejoin="round" ><path d="M4.123 12.709c1.518 0 1.897-1.073 1.897-1.61c0-.535-.38-1.608-1.897-1.608c-1.518 0-1.897 1.073-1.897 1.609s.38 1.609 1.897 1.609" /><path d="M7 9.806C1.8 9.806.5 6.744.5 5.213C.5 3.683 1.8.621 7 .621s6.5 3.062 6.5 4.592c0 1.531-1.3 4.593-6.5 4.593m-1.414.226c1.01 1.147 1.683 1.912 1.68 3.345" /></g></svg>', ko = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">< path d = "M0 0h256v256H0z" fill = "none" /><path fill="currentColor" d = "M156 216a12 12 0 0 1-12 12h-32a12 12 0 0 1 0-24h32a12 12 0 0 1 12 12M40 156a12 12 0 0 0 12-12v-32a12 12 0 0 0-24 0v32a12 12 0 0 0 12 12m32 48H52v-20a12 12 0 0 0-24 0v24a20 20 0 0 0 20 20h24a12 12 0 0 0 0-24M228 48v160a20 20 0 0 1-20 20h-24a12 12 0 0 1 0-24h3L52 69v3a12 12 0 0 1-24 0V48a20 20 0 0 1 20-20h160a20 20 0 0 1 20 20m-24 4H69l135 135Z" /></svg>', bc = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" fill-rule="evenodd" d="M8.145 2.75a2 2 0 1 1-.13 1H5a1.5 1.5 0 1 0 0 3h7a2.5 2.5 0 0 1 0 5H6.485a2 2 0 1 1-.13-1H12a1.5 1.5 0 0 0 0-3H5a2.5 2.5 0 0 1 0-5z" clip-rule="evenodd" /></svg>', wc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="currentColor"><path d="M4 2h16v2H4zM2 2h2v20H2zm2 9h16v2H4zm16-9h2v20h-2z"/><path d="M11 4h2v18h-2z"/><path d="M4 20h16v2H4z"/></g></svg>', kc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M207 50.25A87.46 87.46 0 0 0 144.6 24h-.33A87.48 87.48 0 0 0 82 49.81L20.61 112a16 16 0 0 0 .06 22.56l28.66 28.66a15.92 15.92 0 0 0 11.32 4.69h.09a16 16 0 0 0 11.36-4.82l60.9-62.4a16.08 16.08 0 0 1 22.41-.21a15.6 15.6 0 0 1 4.73 11.19a16.9 16.9 0 0 1-4.85 12L93 183.88a16 16 0 0 0-.17 22.79l28.66 28.66a16.06 16.06 0 0 0 22.52.12l61.8-60.45c34.45-34.5 34.98-90.44 1.19-124.75M60.65 151.89L32 123.24l29.42-29.81l28.48 28.48ZM132.79 224l-28.68-28.65l30.13-29.13l28.49 28.48Z"/></svg>', ke = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 640 640"><path d="M0 0h640v640H0z" fill="none" /><path fill="currentColor" d="M535.6 85.7c-21.9-21.9-57.3-21.9-79.2 0L432 110.1l97.9 97.9l24.4-24.4c21.9-21.9 21.9-57.3 0-79.2zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L496 241.9L398.1 144zM160 128c-53 0-96 43-96 96v256c0 53 43 96 96 96h256c53 0 96-43 96-96v-96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32z" /></svg>', Cc = '<svg width="48mm" height="48mm" viewBox="0 0 48 48" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs1" /><g id="layer1"><path id="path2" fill="currentColor" style="stroke-width:2.3195" d="m 20.890715,15.528251 -0.166399,0.0088 -0.129707,0.0088 -0.255282,0.04392 -0.199471,0.05219 -0.02997,0.01757 -0.02532,0.0047 -0.180867,0.07028 -0.04186,0.02636 -0.02584,0.0088 -18.5559738,9.277987 a 2.3195042,2.3195042 0 0 0 0,4.147033 l 18.5559738,9.277987 a 2.3195042,2.3195042 0 0 0 2.073775,0 L 40.465747,29.1946 a 2.3195042,2.3195042 0 0 0 0,-4.147033 l -5.209501,-2.604492 -4.774902,4.780586 c -0.61342,0.60353 -1.355493,1.068182 -2.166793,1.335319 l -8.786027,2.928504 c -0.860773,0.286923 -1.800232,0.0695 -2.433443,-0.573609 -0.633208,-0.643104 -0.861048,-1.58308 -0.574126,-2.43396 l 2.928504,-8.78551 c 0.267138,-0.821195 0.732308,-1.563265 1.335836,-2.166793 l 1.546675,-1.546675 -0.422196,-0.211357 -0.02791,-0.0088 -0.03721,-0.01757 -0.115755,-0.04393 -0.0677,-0.03514 -0.02791,-0.0047 -0.02791,-0.01757 -0.199471,-0.05219 -0.257349,-0.04392 c -0.08504,-0.01169 -0.171251,-0.01757 -0.257865,-0.01757 z M 39.569678,34.087325 A 2.3195042,2.3195042 0 0 0 38.394039,34.32762 L 20.872111,43.083675 3.3532837,34.330204 a 2.3195042,2.3195042 0 0 0 -2.0737752,4.147034 l 18.5559735,9.277987 a 2.3195042,2.3195042 0 0 0 2.073775,0 L 40.46523,38.477238 a 2.3195042,2.3195042 0 0 0 1.03663,-3.110405 l 0.0026,-0.0021 a 2.3195042,2.3195042 0 0 0 -1.934765,-1.277441 z" /><path fill="currentColor" d="m 45.219806,1.3000621 c -1.733413,-1.73341614 -4.535371,-1.73341614 -6.268788,0 l -1.931292,1.9312921 7.74892,7.7489198 1.931291,-1.931295 c 1.733417,-1.7334133 1.733417,-4.5353728 0,-6.268789 z M 21.537721,18.713361 c -0.482823,0.482823 -0.854834,1.076457 -1.068544,1.733413 l -2.34288,7.02864 c -0.229538,0.680704 -0.04749,1.432641 0.459078,1.947124 0.506569,0.514484 1.258506,0.688615 1.947124,0.459077 l 7.02864,-2.342879 c 0.64904,-0.21371 1.242677,-0.58572 1.733413,-1.068544 L 42.085412,13.663503 34.336494,5.9145853 Z" id="path2-6" style="stroke-width:0.0791513" /></g></svg>', Ec = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M21 18.3V5.7c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H5.7c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7v12.6c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1h12.6c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7m-2 0c-.3.2-.5.4-.7.7H5.7c-.2-.3-.4-.5-.7-.7V5.7c.3-.2.5-.4.7-.7h12.6c.2.3.4.5.7.7zM14 9V8c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h1v-3c0-1.1.9-2 2-2zm2 1h-5c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1" /></svg>', Sc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18.3v-6.6c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H15V5.7c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2c-.7 0-1.4.4-1.7 1H5.7c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7v6.6c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1H9v3.3c-.6.3-1 1-1 1.7c0 1.1.9 2 2 2c.7 0 1.4-.4 1.7-1h6.6c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7M5.7 13c-.2-.3-.4-.5-.7-.7V5.7c.3-.2.5-.4.7-.7h6.6c.2.3.4.5.7.7V9h-1.3c-.3-.6-1-1-1.7-1c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7V13zm7.3-.7c-.3.2-.5.4-.7.7H11v-1.3c.3-.2.5-.4.7-.7H13zm-.7 2.7c.3.6 1 1 1.7 1c1.1 0 2-.9 2-2c0-.7-.4-1.4-1-1.7V11h3.3c.2.3.4.5.7.7v6.6c-.3.2-.5.4-.7.7h-6.6c-.2-.3-.4-.5-.7-.7V15z"/></svg>', Ee = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>', xc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 13c-1.86 0-3.41 1.28-3.86 3H2v2h2.14c.45 1.72 2 3 3.86 3s3.41-1.28 3.86-3H22v-2H11.86c-.45-1.72-2-3-3.86-3m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2M19.86 6c-.45-1.72-2-3-3.86-3s-3.41 1.28-3.86 3H2v2h10.14c.45 1.72 2 3 3.86 3s3.41-1.28 3.86-3H22V6zM16 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"/></svg>', Mc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10s10-4.49 10-10S17.51 2 12 2m0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8"/></svg>', $n = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" y1="13.5" x2="6" y2="21"/><line x1="18" y1="12" x2="21" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.05-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/></svg>', ki = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.36z"/></svg>', Gn = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l2.09 5.91L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-2.09z"/><path fill="currentColor" d="M18 14l.94 2.56L21.5 17.5l-2.56.94L18 21l-.94-2.56L14.5 17.5l2.56-.94z"/></svg>', Tc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/><path fill="currentColor" d="M15.5 8.5l-2 5l-5 2l2-5z"/></svg>', Ac = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z"/></svg>', Vs = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"/></svg>', Nc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3v6a6 6 0 1 0 12 0V3M6 7h4m4 0h4"/></svg>', Co = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8l-4 4l4 4m8-8l4 4l-4 4M4 12h16"/></svg>', Ic = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8l4-4l4 4m-8 8l4 4l4-4M12 4v16"/></svg>', _c = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.56 3.69a9 9 0 0 0-2.92 1.95m-1.95 2.92a9 9 0 0 0-.69 3.44m.69 3.44a9 9 0 0 0 1.95 2.92m2.92 1.95a9 9 0 0 0 3.44.69m3.44-.69a9 9 0 0 0 2.92-1.95m1.95-2.92a9 9 0 0 0 .69-3.44m-.69-3.44a9 9 0 0 0-1.95-2.92m-2.92-1.95A9 9 0 0 0 12 3"/></svg>', Rc = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5M3 16h7a2 2 0 1 1-2 2"/></svg>', Lc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 9h16M4 14h16M10 9v11"/></svg>';
ht.prototype.transition = Ln;
class Ri {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "rendererOptions");
    c(this, "graphSvgRenderer");
    c(this, "clusterDrawer");
    c(this, "badgeDrawer");
    c(this, "renderCB");
    /** Pending frame for the debounced collision reheat, if any. */
    c(this, "collisionReheatFrame", null);
    var n;
    this.graphSvgRenderer = i, this.graph = t, this.rendererOptions = e, this.renderCB = (n = this.rendererOptions) == null ? void 0 : n.renderNode, this.clusterDrawer = new rt(this), this.badgeDrawer = new jl(t);
  }
  render(e, t) {
    var s;
    const i = this.getNodeStyle(t), n = Ks((s = this.renderCB) == null ? void 0 : s.call(this, t));
    if (n !== void 0) {
      Fc(e, 10);
      const o = e.append("foreignObject").attr("width", 20).attr("height", 20);
      Ys(o, n), this.fitCardToContent(o, t, 0);
    } else
      this.genericNodeRender(e, i, t), i.shape !== "none" && requestAnimationFrame(() => {
        const o = e.node();
        if (!o) return;
        let a = 50, l = 50;
        const h = o.querySelector(".node"), d = h == null ? void 0 : h.getBBox();
        d && d.width > 0 && d.height > 0 && (a = Math.ceil(d.width), l = Math.ceil(d.height)), this.rendererOptions.enableNodeExpansion && (!t.hasChildren() || !t.expanded) && (i.shape == "square" ? t.setCircleRadius(Math.SQRT1_2 * Math.max(a, l)) : t.setCircleRadius(0.5 * Math.max(a, l)), this.isCustomShape(i.shape) && this.badgeDrawer.reanchor(t)), this.applyShapeBorder(t, i.shape, d);
      });
    if (this.badgeDrawer.render(e, t, ql(i, t)), this.rendererOptions.enableNodeExpansion && t.hasChildren()) {
      if (t.expanded) {
        const o = this.clusterDrawer.render(e, t, () => {
          Ri.handleChildrenExpanded(this.graph, t, o);
        });
        requestAnimationFrame(() => {
          rt.updateToNewRadiusExpanded(this.graph, t);
        });
      }
      requestAnimationFrame(() => {
        this.addExpandCollapseIcons(e, t);
      });
    }
  }
  /**
   * How far from `node`'s centre an edge leaving along the unit vector
   * `(dirX, dirY)` should start: its real border, grown by `outset`. Shared by
   * every drawer that lands something on a node's rim.
   *
   * The node caches its own geometry, so this stays pure arithmetic — resolving
   * a style here would run for both ends of every edge on every tick.
   */
  borderReach(e, t, i, n = 0) {
    return e.getCircleRadius() || e.getBorderBox() ? e.getBorderDistance(t, i, n) : Qt(this.getNodeStyle(e).size, e) + n;
  }
  /**
   * Size a `foreignObject` card to the HTML it holds, then let that box drive
   * the node's collision radius and where edges land on it. HTML-in-SVG is the
   * common way to get a styled node, so the card — not a bounding circle — is
   * the node's real border.
   *
   * `shapeHalfExtent` is the half-size of any shape still drawn behind the card
   * (0 when the card *is* the node): the node never shrinks below it, so edges
   * cannot end up inside a shape that is still visible.
   */
  fitCardToContent(e, t, i) {
    const s = (o) => {
      var g, f;
      const a = e.node();
      if (!a || !a.isConnected) return;
      const l = a.firstElementChild;
      if (!l) return;
      const h = l.getBoundingClientRect();
      if ((h.width === 0 || h.height === 0) && o < 300) {
        requestAnimationFrame(() => s(o + 1));
        return;
      }
      const d = ((g = a.getScreenCTM()) == null ? void 0 : g.a) || 1, u = Math.ceil(h.width / d), p = Math.ceil(h.height / d);
      if (!(u === 0 || p === 0)) {
        if (e.attr("width", u).attr("height", p).attr("x", -u / 2).attr("y", -p / 2), !t.hasChildren() || !t.expanded) {
          const v = Math.max(u / 2, i), y = Math.max(p / 2, i), b = Math.max(v, y);
          t.getCircleRadius() !== b && (t.setCircleRadius(b), this.scheduleCollisionReheat()), (u / 2 > i || p / 2 > i) && t.setBorderBox(v * 2, y * 2);
        }
        if (i === 0) {
          const v = (f = a.parentElement) == null ? void 0 : f.querySelector(":scope > rect.node");
          v && Oc(v, l, u, p);
        }
        this.badgeDrawer.reanchor(t);
      }
    };
    requestAnimationFrame(() => s(0));
  }
  /**
   * Anchor edges on the node's rectangular border when that is what it renders
   * as. Circle, triangle and hexagon keep the circle radius: their bounding box
   * is a worse fit than it, most of all on the diagonals.
   *
   * A custom path is only trusted when its box is centred on the node's origin,
   * since a border is stored as half-extents around the centre.
   */
  applyShapeBorder(e, t, i) {
    !i || i.width <= 0 || i.height <= 0 || !(Math.abs(i.x + i.width / 2) <= 0.5 && Math.abs(i.y + i.height / 2) <= 0.5) || t !== "square" && !this.isCustomShape(t) || e.setBorderBox(i.width, i.height);
  }
  /**
   * Reheat the sim once so collision re-spaces custom nodes whose radius was
   * just set from their measured size. Custom nodes measure asynchronously (and
   * on different frames), so this is debounced to one reheat after the last
   * measurement lands, and is a no-op when the simulation is disabled.
   */
  scheduleCollisionReheat() {
    this.collisionReheatFrame !== null && cancelAnimationFrame(this.collisionReheatFrame), this.collisionReheatFrame = requestAnimationFrame(() => {
      var e;
      this.collisionReheatFrame = null, (e = this.graph.simulation) == null || e.refreshForcesAndReheat();
    });
  }
  updatePositions(e) {
    e.attr("transform", (t) => {
      const i = t.x && isFinite(t.x) ? t.x : 0, n = t.y && isFinite(t.y) ? t.y : 0;
      return `translate(${i},${n})`;
    });
  }
  /**
   * Fill whatever the node and the style map left unset from `defaultNodeStyle` —
   * from its `styleCb` first, then its literals. The default callback is the computed
   * form of the default slot, so it yields to anything that names this node more
   * narrowly and fills what a per-node `styleCb` left out.
   */
  mergeNodeStylingOptions(e, t) {
    var o;
    const i = this.rendererOptions.defaultNodeStyle, n = ((o = i.styleCb) == null ? void 0 : o.call(i, t)) ?? {};
    return {
      shape: (e == null ? void 0 : e.shape) ?? n.shape ?? i.shape,
      strokeColor: (e == null ? void 0 : e.strokeColor) ?? n.strokeColor ?? i.strokeColor,
      strokeWidth: (e == null ? void 0 : e.strokeWidth) ?? n.strokeWidth ?? i.strokeWidth,
      fontFamily: (e == null ? void 0 : e.fontFamily) ?? n.fontFamily ?? i.fontFamily,
      size: (e == null ? void 0 : e.size) ?? n.size ?? i.size,
      color: (e == null ? void 0 : e.color) ?? n.color ?? i.color,
      textColor: (e == null ? void 0 : e.textColor) ?? n.textColor ?? i.textColor,
      textAnchorPosition: (e == null ? void 0 : e.textAnchorPosition) ?? n.textAnchorPosition ?? i.textAnchorPosition,
      textHorizontalShift: (e == null ? void 0 : e.textHorizontalShift) ?? n.textHorizontalShift ?? i.textHorizontalShift,
      textVerticalShift: (e == null ? void 0 : e.textVerticalShift) ?? n.textVerticalShift ?? i.textVerticalShift,
      textRotateDegree: (e == null ? void 0 : e.textRotateDegree) ?? n.textRotateDegree ?? i.textRotateDegree,
      textTruncate: (e == null ? void 0 : e.textTruncate) ?? n.textTruncate ?? i.textTruncate,
      iconUnicode: (e == null ? void 0 : e.iconUnicode) ?? n.iconUnicode ?? i.iconUnicode,
      iconClass: (e == null ? void 0 : e.iconClass) ?? n.iconClass ?? i.iconClass,
      svgIcon: (e == null ? void 0 : e.svgIcon) ?? n.svgIcon ?? i.svgIcon,
      imagePath: (e == null ? void 0 : e.imagePath) ?? n.imagePath ?? i.imagePath,
      imageFit: (e == null ? void 0 : e.imageFit) ?? n.imageFit ?? i.imageFit,
      text: (e == null ? void 0 : e.text) ?? n.text ?? i.text,
      html: (e == null ? void 0 : e.html) ?? n.html ?? i.html,
      badges: (e == null ? void 0 : e.badges) ?? n.badges ?? i.badges
    };
  }
  computeNodeStyle(e) {
    let t = {};
    if (this.rendererOptions.nodeStyleMap && typeof this.rendererOptions.nodeTypeAccessor == "function") {
      const s = this.rendererOptions.nodeTypeAccessor(e);
      s && (t = this.rendererOptions.nodeStyleMap[s] ?? {});
    }
    const i = e.getStyle();
    let n = {};
    return i.styleCb ? n = i.styleCb(e) : n = {
      shape: (i == null ? void 0 : i.shape) ?? (t == null ? void 0 : t.shape),
      strokeColor: (i == null ? void 0 : i.strokeColor) ?? (t == null ? void 0 : t.strokeColor),
      strokeWidth: (i == null ? void 0 : i.strokeWidth) ?? (t == null ? void 0 : t.strokeWidth),
      fontFamily: (i == null ? void 0 : i.fontFamily) ?? (t == null ? void 0 : t.fontFamily),
      size: (i == null ? void 0 : i.size) ?? (t == null ? void 0 : t.size),
      color: (i == null ? void 0 : i.color) ?? (t == null ? void 0 : t.color),
      textColor: (i == null ? void 0 : i.textColor) ?? (t == null ? void 0 : t.textColor),
      textAnchorPosition: (i == null ? void 0 : i.textAnchorPosition) ?? (t == null ? void 0 : t.textAnchorPosition),
      textHorizontalShift: (i == null ? void 0 : i.textHorizontalShift) ?? (t == null ? void 0 : t.textHorizontalShift),
      textVerticalShift: (i == null ? void 0 : i.textVerticalShift) ?? (t == null ? void 0 : t.textVerticalShift),
      textRotateDegree: (i == null ? void 0 : i.textRotateDegree) ?? (t == null ? void 0 : t.textRotateDegree),
      textTruncate: (i == null ? void 0 : i.textTruncate) ?? (t == null ? void 0 : t.textTruncate),
      iconUnicode: (i == null ? void 0 : i.iconUnicode) ?? (t == null ? void 0 : t.iconUnicode),
      iconClass: (i == null ? void 0 : i.iconClass) ?? (t == null ? void 0 : t.iconClass),
      svgIcon: (i == null ? void 0 : i.svgIcon) ?? (t == null ? void 0 : t.svgIcon),
      imagePath: (i == null ? void 0 : i.imagePath) ?? (t == null ? void 0 : t.imagePath),
      imageFit: (i == null ? void 0 : i.imageFit) ?? (t == null ? void 0 : t.imageFit),
      text: (i == null ? void 0 : i.text) ?? (t == null ? void 0 : t.text),
      html: (i == null ? void 0 : i.html) ?? (t == null ? void 0 : t.html),
      badges: (i == null ? void 0 : i.badges) ?? (t == null ? void 0 : t.badges)
    }, this.mergeNodeStylingOptions(n, e);
  }
  getNodeStyle(e) {
    const t = this.computeNodeStyle(e);
    return typeof t.shape == "function" && (t.shape = t.shape(e)), t.strokeWidth = t.strokeWidth !== void 0 ? gt(t.strokeWidth.toString(), e) ?? "var(--pvt-node-stroke-width, 2)" : "var(--pvt-node-stroke-width, 2)", t.strokeColor = t.strokeColor !== void 0 ? gt(t.strokeColor, e) ?? "var(--pvt-node-stroke, #fff)" : "var(--pvt-node-stroke, #fff)", t.size = t.size !== void 0 ? Qt(t.size, e) ?? 10 : 10, t.color = t.color !== void 0 ? gt(t.color, e) ?? "var(--pvt-node-color, #007acc)" : "var(--pvt-node-color, #007acc)", t.textColor = t.textColor !== void 0 ? gt(t.textColor, e) ?? "var(--pvt-node-text-color, #fff)" : "var(--pvt-node-text-color, #fff)", t.textAnchorPosition = t.textAnchorPosition !== void 0 ? gt(t.textAnchorPosition, e) : "middle", t.textHorizontalShift = t.textHorizontalShift !== void 0 ? Qt(t.textHorizontalShift, e) ?? 0 : 0, t.textVerticalShift = t.textVerticalShift !== void 0 ? Qt(t.textVerticalShift, e) ?? 0 : 0, t.textRotateDegree = t.textRotateDegree !== void 0 ? Qt(t.textRotateDegree, e) ?? 0 : 0, t.textTruncate = t.textTruncate !== void 0 ? We(t.textTruncate, e) ?? !0 : !0, t.text = t.text !== void 0 ? gt(t.text, e) : void 0, t.iconUnicode = t.iconUnicode !== void 0 ? gt(t.iconUnicode, e) : void 0, t.iconClass = t.iconClass !== void 0 ? gt(t.iconClass, e) : void 0, t.svgIcon = t.svgIcon !== void 0 ? gt(t.svgIcon, e) : void 0, t.imagePath = t.imagePath !== void 0 ? gt(t.imagePath, e) : void 0, t.imagePath !== void 0 && !ro(t.imagePath, Pl) && (t.imagePath = void 0), t.imageFit = t.imageFit !== void 0 ? gt(t.imageFit, e) : void 0, t;
  }
  isCustomShape(e) {
    return typeof e == "object" && e !== null && "d" in e;
  }
  // Draw the "image unavailable" glyph for a picture whose source failed to load, so the
  // node shows its shape + a crossed-out-picture icon rather than the browser's broken-image
  // placeholder. The broken `<image>` is hidden (not removed) so it still carries the src for
  // getNodeImageHref — keeping the preview / tooltip / lightbox fallbacks consistent.
  renderImageFallback(e, t, i) {
    var a;
    t.style("display", "none");
    const n = i.size, s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.innerHTML = $n, ((a = s.children[0]) == null ? void 0 : a.nodeName) === "svg" && (s.children[0].removeAttribute("width"), s.children[0].removeAttribute("height"));
    const o = n * 1.1;
    e.append(() => s).attr("class", "node-content pvt-node-image-fallback").attr("x", -o / 2).attr("y", -o / 2).attr("width", o).attr("height", o).attr("color", i.textColor);
  }
  genericNodeRender(e, t, i) {
    var l, h;
    t.size = t.size, t.shape = t.shape, t.text = t.text, t.textAnchorPosition = t.textAnchorPosition, t.textHorizontalShift = t.textHorizontalShift, t.textVerticalShift = t.textVerticalShift, t.textRotateDegree = t.textRotateDegree;
    const n = t.shape === "none";
    !!t.imagePath && t.imageFit === "frame" && !n && (t.shape = "square");
    let o = t.shape;
    t.shape == "square" || n ? o = "rect" : (this.isCustomShape(t.shape) || ["triangle", "hexagon"].includes(t.shape)) && (o = "path");
    const a = e.append(o).attr("stroke", n ? "none" : t.strokeColor).attr("stroke-width", n ? 0 : t.strokeWidth).style("--pvt-node-own-stroke-width", n ? "0" : String(t.strokeWidth)).attr("fill", n ? "transparent" : t.color).classed("node", !0);
    switch (t.shape) {
      case "circle":
        a.attr("r", t.size), i.setCircleRadius(t.size);
        break;
      case "square":
        a.attr("width", t.size * 2).attr("height", t.size * 2).attr("x", -t.size).attr("y", -t.size), i.setCircleRadius(Math.SQRT1_2 * t.size);
        break;
      case "triangle": {
        const d = [
          [0, -t.size],
          [t.size, t.size],
          [-t.size, t.size]
        ].map((u) => u.join(",")).join(" ");
        a.attr("d", `M${d}Z`), i.setCircleRadius(t.size);
        break;
      }
      case "none":
        a.attr("width", t.size * 2).attr("height", t.size * 2).attr("x", -t.size).attr("y", -t.size);
        break;
      case "hexagon": {
        const d = Math.PI / 3, u = Array.from({ length: 6 }, (p, g) => {
          const f = d * g;
          return [Math.cos(f) * t.size, Math.sin(f) * t.size];
        }).map((p) => p.join(",")).join(" ");
        a.attr("d", `M${u}Z`), i.setCircleRadius(t.size);
        break;
      }
      default:
        this.isCustomShape(t.shape) ? (a.attr("d", t.shape.d), i.setCircleRadius(15)) : (a.attr("r", t.size), i.setCircleRadius(t.size));
        break;
    }
    if (t.iconUnicode || t.iconClass) {
      const d = t.iconClass ? Zr(t.iconClass) : void 0, u = !!d && d.glyph !== "", p = t.iconUnicode ?? (d == null ? void 0 : d.glyph);
      if (p) {
        const g = e.append("text").attr("fill", t.textColor).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", t.size * 1.2).attr("class", "node-content icon icon-unicode").text(p);
        u && g.style("font-family", d.fontFamily).style("font-weight", d.fontWeight).style("font-style", d.fontStyle);
      }
    } else if (t.svgIcon) {
      const d = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      d.appendChild(On(t.svgIcon)), ((l = d.children[0]) == null ? void 0 : l.nodeName) === "svg" && (d.children[0].removeAttribute("width"), d.children[0].removeAttribute("height")), e.append(() => d).attr("class", "node-content").attr("x", -t.size * 0.7).attr("y", -t.size * 0.7).attr("width", t.size * 1.4).attr("height", t.size * 1.4).attr("color", t.strokeColor);
    } else if (t.imagePath) {
      const d = t.imageFit ?? "icon";
      if (d === "frame") {
        const u = t.size * 2, p = e.append("image").attr("class", "node-content").attr("xlink:href", t.imagePath).attr("preserveAspectRatio", "xMidYMid meet").attr("x", -t.size).attr("y", -t.size).attr("width", u).attr("height", u);
        p.on("error", () => this.renderImageFallback(e, p, t));
        const g = new Image();
        g.onload = () => {
          if (!g.naturalWidth || !g.naturalHeight) return;
          const f = g.naturalWidth / g.naturalHeight, v = f >= 1 ? u : u * f, y = f >= 1 ? u / f : u;
          p.attr("x", -v / 2).attr("y", -y / 2).attr("width", v).attr("height", y), a.attr("x", -v / 2).attr("y", -y / 2).attr("width", v).attr("height", y), i.setCircleRadius(0.5 * Math.max(v, y)), i.setBorderBox(v, y), this.badgeDrawer.reanchor(i), this.rendererOptions.enableNodeExpansion && i.hasChildren() && this.addExpandCollapseIcons(e, i);
        }, g.src = t.imagePath;
      } else {
        const u = d === "icon" ? t.size * 1.2 : t.size * 2, p = d === "cover" ? "xMidYMid slice" : "xMidYMid meet", g = e.append("image").attr("class", "node-content").attr("xlink:href", t.imagePath).attr("x", -u / 2).attr("y", -u / 2).attr("width", u).attr("height", u).attr("preserveAspectRatio", p);
        g.on("error", () => this.renderImageFallback(e, g, t));
      }
    } else if (t.html) {
      const d = Ks(t.html(i));
      if (d !== void 0) {
        const u = e.append("foreignObject").attr("class", "node-content").attr("width", t.size * 2).attr("height", t.size * 2).attr("x", -t.size).attr("y", -t.size);
        Ys(u, d), this.fitCardToContent(u, i, n ? 0 : t.size);
      }
    }
    if (t.text) {
      const d = e.append("g").classed("pvt-node-label-group", !0), u = Math.abs(t.textVerticalShift) >= 1 || Math.abs(t.textHorizontalShift) >= 1, p = u || n, [g, f] = this.computeTextLayout(t.text, t.size, u, t.textTruncate), v = t.textHorizontalShift * (t.size + g / 2 * 1.2), y = -t.textVerticalShift * (t.size + g / 2 * 1.2), b = d.append("text").attr("class", "pvt-node-label").attr("text-anchor", t.textAnchorPosition).attr("x", v).attr("y", y).attr("dominant-baseline", "central").attr("font-size", g).attr("font-family", t.fontFamily).attr("fill", p ? yi.color : t.textColor).text(f), k = (h = b.node()) == null ? void 0 : h.getBBox(), S = !p && t.textTruncate === !1 && !!k && k.width > t.size * 2;
      S && b.attr("fill", yi.color), (p || S) && k && d.insert("rect", "text").attr("x", k.x - 4).attr("y", k.y - 2).attr("width", k.width + 8).attr("height", k.height + 4).attr("fill", yi.backgroundColor).attr("rx", 2).attr("ry", 2), d.attr("data-pvt-label-outside", p ? "1" : "0").attr("data-pvt-label-x", v).attr("data-pvt-label-y", y).attr("data-pvt-label-rotate", t.textRotateDegree).attr("transform", `rotate(${t.textRotateDegree}, ${v}, ${y})`);
    }
  }
  /**
   * This method is called on every node
   * Each node takes care of its own state, otherwise each node gets set multiple times
   * Each node takes care only of edges out, to avoid setting twice the same edge (for from and to nodes)
   */
  checkForHighlight(e, t) {
    var o, a, l;
    const i = this.isNodeSelected(t), n = this.isNodeAdjacentToSelection(t), s = this.hasVisibleSelection();
    (o = t.getGraphElement()) == null || o.classList.toggle("pvt-node-selected-highlight", i), this.rendererOptions.enableFocusMode && s ? (a = t.getGraphElement()) == null || a.classList.toggle("pvt-node-selected-highlight-shadow", !i && !n) : (l = t.getGraphElement()) == null || l.classList.toggle("pvt-node-selected-highlight-shadow", !1), t.getEdgesOut().forEach((h) => {
      var u, p;
      const d = this.isEdgeAdjacentToSelection(h);
      this.rendererOptions.enableFocusMode && s ? (u = h.getGraphElement()) == null || u.classList.toggle("pvt-edge-selected-highlight-shadow", !d) : (p = h.getGraphElement()) == null || p.classList.toggle("pvt-edge-selected-highlight-shadow", !1);
    });
  }
  getSelectedNodeIDs() {
    const t = this.graphSvgRenderer.getGraphInteraction().getSelectedNodeIDs();
    return Array.isArray(t) ? t : [];
  }
  /**
   * Whether the selection contains anything that is actually on screen — the gate for
   * focus-mode dimming.
   *
   * A hidden node can be selected without ever being drawn (a filtered-out search
   * result, or a row in the data dock), and its element is gone from the DOM entirely.
   * Dimming on the strength of a selection like that would grey out the whole canvas
   * with nothing highlighted, which reads as a broken graph.
   *
   * Short-circuits on the first visible node, so the usual case costs one check.
   */
  hasVisibleSelection() {
    return this.graphSvgRenderer.getGraphInteraction().getSelectedNodes().some((t) => t.node.visible);
  }
  isNodeSelected(e) {
    return this.getSelectedNodeIDs().includes(e.id);
  }
  isNodeAdjacentToSelection(e) {
    return e.getEdgesOut().some((t) => this.isNodeSelected(t.to)) || e.getEdgesIn().some((t) => this.isNodeSelected(t.from));
  }
  isEdgeAdjacentToSelection(e) {
    return this.isNodeSelected(e.from) || this.isNodeSelected(e.to);
  }
  computeTextLayout(e, t, i = !1, n = !0) {
    const s = t * 0.9, o = i ? s * 5 : s * 2, a = Math.max(12, s * 0.5), l = a * 0.55, h = Math.floor(o / l) - 1;
    if (n && e.length > h && e.length > 7) {
      const d = Math.max(6, o / l) - 1, u = 3, p = d - u, g = e.slice(0, p) + "…" + e.slice(e.length - u);
      g.length < e.length && (e = g);
    }
    return [a, e];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addExpandCollapseIcons(e, t) {
    const n = (s, o) => {
      this.graph.UIManager.tooltip && this.graph.UIManager.tooltip.hide(s), this.graph.toggleExpandNode(s), o || (this.graph.simulation.reheat(0.05), this.graph.simulation.isFitViewOnExpandCollapse() && this.graph.renderer.fitAndCenterWhenSettled());
    };
    e.each((s, o, a) => {
      const l = ht(a[o]);
      l.selectAll(":scope > .node-icon").remove();
      const h = a[o].querySelector(":scope > .pvt-cluster-area"), d = s.expanded && Number(h == null ? void 0 : h.getAttribute("_final_r")) || 0, u = d > 0 ? { x: nn(d), y: nn(d) } : lo(a[o], s, s.expanded ? "se" : "ne"), p = l.append("g").classed("node-icon", !0).classed(s.expanded ? "collapse-icon" : "expand-icon", !0).attr("transform", `translate(${u.x}, ${u.y})`);
      p.append("title").text(s.expanded ? "Collapse nodes" : "Expand node"), p.append("circle").attr("r", 8).style("cursor", "pointer").on("click", (g) => {
        g.stopPropagation(), n(s, !s.expanded);
      }), l.select(s.expanded ? ":scope > .collapse-icon" : ":scope > .expand-icon").append("text").text(s.expanded ? "-" : "+");
    });
  }
  static handleChildrenExpanded(e, t, i) {
    e.simulation.reheat(0.1);
    const n = Number(i.attr("_final_r")), s = nn(n), o = t.getGraphElement(), a = o == null ? void 0 : o.querySelector("& > .node");
    a && ht(a).transition().duration(250).on("end", () => {
      e.simulation.isFitViewOnExpandCollapse() && e.renderer.fitAndCenterWhenSettled();
    }).attr("transform", `translate(${-s}, ${-s})`), o == null || o.querySelectorAll(":scope > .node-content").forEach((p) => {
      ht(p).transition().duration(250).attr("transform", `translate(${-s}, ${-s})`);
    });
    const l = o == null ? void 0 : o.querySelector(":scope > .pvt-node-badges");
    l && ht(l).transition().duration(250).attr("transform", `translate(${-s}, ${-s})`);
    const h = o == null ? void 0 : o.querySelector(":scope > .pvt-node-label-group");
    if (h) {
      const p = h.getAttribute("data-pvt-label-outside") === "1", g = Number(h.getAttribute("data-pvt-label-x")) || 0, f = Number(h.getAttribute("data-pvt-label-y")) || 0, v = Number(h.getAttribute("data-pvt-label-rotate")) || 0;
      let y;
      if (p) {
        const b = -s - Math.abs(g), k = -s - Math.abs(f);
        y = `translate(${b - g}, ${k - f})`;
      } else
        y = `translate(${-s}, ${-s})`;
      ht(h).transition().duration(250).attr("transform", `${y} rotate(${v}, ${g}, ${f})`);
    }
    const d = o == null ? void 0 : o.querySelector("& > .node-icon");
    d && ht(d).transition().duration(250).attr("transform", t.expanded ? `translate(${s}, ${s})` : `translate(${s}, ${-s})`);
    const u = t.getSubgraph();
    u && u.simulation.getSimulation().force("constrainParent", En(Number(n), 10));
  }
}
function nn(r) {
  return (r + oo) / Math.SQRT2;
}
function Ks(r) {
  return typeof r == "string" ? r === "" ? void 0 : r : r instanceof HTMLElement ? r : void 0;
}
function Ys(r, e) {
  var i;
  const t = document.createElement("div");
  t.className = "pvt-node-card", t.style.cssText = "display:flex;width:max-content;height:max-content", typeof e == "string" ? t.textContent = e : t.append(e), (i = r.node()) == null || i.append(t);
}
function Dc(r, e, t) {
  const i = getComputedStyle(r).borderTopLeftRadius, n = parseFloat(i);
  return !Number.isFinite(n) || n <= 0 ? 0 : i.endsWith("%") ? n / 100 * Math.min(e, t) : n;
}
function Oc(r, e, t, i) {
  r.setAttribute("width", String(t)), r.setAttribute("height", String(i)), r.setAttribute("x", String(-t / 2)), r.setAttribute("y", String(-i / 2));
  const n = e.firstElementChild;
  r.setAttribute("rx", String(n ? Dc(n, t, i) : 0));
}
function Fc(r, e) {
  r.append("rect").attr("stroke", "none").attr("stroke-width", 0).attr("fill", "transparent").attr("width", e * 2).attr("height", e * 2).attr("x", -e).attr("y", -e).classed("node", !0);
}
const sn = "data-pvt-async-slot";
let Pc = 0;
function Bc() {
  const r = document.createElement("div");
  r.className = "pvt-async-skeleton", r.setAttribute("aria-busy", "true");
  for (let e = 0; e < 3; e++) r.appendChild(document.createElement("span"));
  return r;
}
function Hc() {
  const r = document.createElement("div");
  return r.className = "pvt-async-error", r.textContent = "Content could not be loaded", r;
}
function zc(r) {
  return (r == null ? void 0 : r.name) === "AbortError";
}
let $c;
const Eo = {
  get signal() {
    return $c ?? ($c = new AbortController().signal);
  },
  isStale: () => !1
};
class Se {
  /**
   * @param surface - Which surface this scope renders, reported to the consumer's
   *                  placeholder / error factories.
   * @param options - Read lazily, so a scope built at construction time still sees
   *                  options merged later.
   * @param onSettle - Run after content lands in a slot, for surfaces whose geometry
   *                   depends on their content (the tooltip repositions itself).
   */
  constructor(e, t, i) {
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "surface");
    c(this, "options");
    c(this, "onSettle");
    this.surface = e, this.options = t, this.onSettle = i;
  }
  /**
   * Abandon every render in flight: abort their signals and release their
   * slots, so a late resolution can no longer commit.
   *
   * Call it at the top of a render pass (and on teardown), before the old
   * content is cleared.
   */
  supersede() {
    var e;
    for (const t of this.pending)
      t.stale = !0, (e = t.controller) == null || e.abort(), t.slot.removeAttribute(sn);
    this.pending.clear();
  }
  /**
   * Resolve a maybe-async value and build an element from it.
   *
   * @param produce - Runs the consumer's hook. Receives the {@link RenderContext}
   *                  to forward to it.
   * @param build - Turns the resolved value into the element to mount. Runs on the
   *                sync path immediately, on the async path once the promise settles.
   * @returns The built element when `produce` was synchronous, otherwise a
   *          placeholder slot that fills itself in.
   */
  resolve(e, t) {
    const i = { slotId: "", slot: void 0, stale: !1 }, n = {
      // Lazy: a sync hook that never touches `signal` costs no controller.
      get signal() {
        return i.controller ?? (i.controller = new AbortController()), i.stale && i.controller.abort(), i.controller.signal;
      },
      isStale: () => i.stale
    };
    let s;
    try {
      s = e(n);
    } catch (o) {
      return this.report(o), this.errorElement(o);
    }
    return Ze(s) ? (i.slotId = `pvt-async-${++Pc}`, i.slot = this.placeholderSlot(i.slotId), this.pending.add(i), Promise.resolve(s).then(
      (o) => {
        this.pending.delete(i), this.commit(i, () => t(o));
      },
      (o) => {
        this.pending.delete(i), !(i.stale || zc(o)) && (this.report(o), this.commit(i, () => this.errorElement(o)));
      }
    ), i.slot) : t(s);
  }
  /**
   * Resolve a consumer content hook — static content, or a function of the
   * surface's own arguments plus a trailing {@link RenderContext}.
   */
  content(e, ...t) {
    if (e !== void 0)
      return this.resolve(
        (i) => typeof e == "function" ? e(...t, i) : e,
        mi
      );
  }
  /* ---------- internals ---------- */
  /**
   * Put the settled content in place of every slot still carrying this render's
   * id — the live one, plus any copy made while it was pending (a tooltip pinned
   * mid-fetch). No slots left means the render was superseded: drop it.
   *
   * The slot is *replaced*, not filled, so once content lands the DOM is exactly
   * what a synchronous hook would have produced — no leftover wrapper for the
   * host's own layout rules (or a consumer's CSS) to trip over.
   */
  commit(e, t) {
    var s;
    const i = document.querySelectorAll(`[${sn}="${e.slotId}"]`);
    if (i.length === 0) return;
    const n = t();
    i.forEach((o, a) => {
      const l = a === 0 ? n : n == null ? void 0 : n.cloneNode(!0);
      l ? o.replaceWith(l) : o.remove();
    }), (s = this.onSettle) == null || s.call(this);
  }
  placeholderSlot(e) {
    var s;
    const t = document.createElement("div");
    t.className = "pvt-async-slot pvt-async-pending", t.setAttribute(sn, e);
    const i = (s = this.options()) == null ? void 0 : s.placeholder, n = typeof i == "function" ? i(this.surface) : i;
    return t.appendChild(mi(n) ?? Bc()), t;
  }
  errorElement(e) {
    var n;
    const t = (n = this.options()) == null ? void 0 : n.error, i = typeof t == "function" ? t(this.surface, e) : t;
    return mi(i) ?? Hc();
  }
  report(e) {
    console.error(`[pivotick] async ${this.surface} content failed to render.`, e);
  }
}
function ot(r, e) {
  var i;
  if (e.nodeHeaderMap.title)
    return gt(e.nodeHeaderMap.title, r) || "Could not resolve title";
  const t = (i = r.getData()) == null ? void 0 : i.label;
  return typeof t == "string" ? t : "Optional name or label";
}
function Un(r, e) {
  var i;
  if (e.nodeHeaderMap.subtitle)
    return gt(e.nodeHeaderMap.subtitle, r) || null;
  const t = (i = r.getData()) == null ? void 0 : i.description;
  return typeof t == "string" ? t : "Optional subtitle or description";
}
function be(r, e) {
  var i;
  if (e.edgeHeaderMap.title)
    return gt(e.edgeHeaderMap.title, r) || "";
  const t = (i = r.getData()) == null ? void 0 : i.label;
  return typeof t == "string" ? t : "Optional name or label";
}
function So(r, e) {
  var i;
  if (e.edgeHeaderMap.subtitle)
    return gt(e.edgeHeaderMap.subtitle, r) || null;
  const t = (i = r.getData()) == null ? void 0 : i.label;
  return typeof t == "string" ? t : "Optional subtitle or description";
}
function xo(r) {
  var t;
  const e = (t = r.getData()) == null ? void 0 : t.label;
  return typeof e == "string" ? e : "";
}
function Mo(r) {
  return Ze(r) ? Promise.resolve(r).then((e) => Array.isArray(e) ? e : []) : Array.isArray(r) ? r : [];
}
function qe(r, e, t = Eo) {
  const i = r.getData(), n = [];
  if (e.nodePropertiesMap)
    return Mo(e.nodePropertiesMap(r, t));
  n.push({
    name: "id",
    value: r.id
  });
  for (const [s, o] of Object.entries(i))
    s && o && n.push({
      name: s,
      value: o
    });
  return n;
}
function rn(r, e) {
  const t = r.map(e);
  return t.some(Ze) ? Promise.all(t) : t;
}
function Sn(r, e, t = Eo) {
  const i = r.getData(), n = [];
  if (e.edgePropertiesMap)
    return Mo(e.edgePropertiesMap(r, t));
  n.push({
    name: "id",
    value: r.id
  });
  for (const [s, o] of Object.entries(i))
    s && o && n.push({
      name: s,
      value: o
    });
  return n;
}
function Gc(r, e, t) {
  const i = r.trim().toLowerCase();
  return e.find((n) => {
    if (n.id.toLowerCase() === i)
      return !0;
    const s = ot(n, t);
    return typeof s == "string" && s.trim().toLowerCase() === i;
  });
}
function Uc(r, e) {
  if (typeof e != "function") return;
  const t = r.representedEdges;
  if (!(t != null && t.length)) return e(r);
  let i;
  for (const n of t) {
    const s = e(n);
    if (s !== void 0) {
      if (i === void 0) i = s;
      else if (i !== s) return;
    }
  }
  return i;
}
class qc {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "rendererOptions");
    c(this, "graphSvgRenderer");
    c(this, "renderLabelCB");
    var n;
    this.graphSvgRenderer = i, this.graph = t, this.rendererOptions = e, this.renderLabelCB = (n = this.rendererOptions) == null ? void 0 : n.renderLabel;
  }
  render(e, t) {
    this.defaultEdgeRender(e, t);
  }
  defaultEdgeRender(e, t) {
    var o, a;
    const i = this.getEdgeStyle(t), n = this.getLabelStyle(t), s = this.genericEdgeRender(e, i);
    if ((this.graph.getOptions().isDirected || t.directed) && this.drawEdgeMarker(s, i, t), this.renderLabelCB) {
      const l = e.append("g").classed("label-container", !0).append("foreignObject"), h = (o = this == null ? void 0 : this.renderLabelCB) == null ? void 0 : o.call(this, t);
      l.attr("width", 200).attr("height", 100), typeof h == "string" ? l.text(h) : h instanceof HTMLElement && ((a = l.node()) == null || a.append(h)), requestAnimationFrame(() => {
        const d = l.node();
        if (!d) return;
        const u = d.firstElementChild;
        if (!u) return;
        const p = u.getBoundingClientRect(), g = Math.ceil(p.width), f = Math.ceil(p.height);
        l.attr("width", g).attr("height", f), l.attr("x", -g / 2).attr("y", -f / 2);
      });
    } else
      this.defaultLabelRender(e, t, n);
  }
  getLabelStyle(e) {
    var n, s, o, a;
    let t;
    const i = e.getLabelStyle();
    return i && i.styleCb ? t = i.styleCb(e) : t = {
      backgroundColor: (n = e.getLabelStyle()) == null ? void 0 : n.backgroundColor,
      fontSize: (s = e.getLabelStyle()) == null ? void 0 : s.fontSize,
      fontFamily: (o = e.getLabelStyle()) == null ? void 0 : o.fontFamily,
      color: (a = e.getLabelStyle()) == null ? void 0 : a.color
    }, this.mergeLabelStylingOptions(t, e);
  }
  /** As {@link mergeEdgeStylingOptions}, for the edge's label. */
  mergeLabelStylingOptions(e, t) {
    var o;
    const i = this.rendererOptions.defaultLabelStyle, n = ((o = i.styleCb) == null ? void 0 : o.call(i, t)) ?? {};
    return {
      backgroundColor: (e == null ? void 0 : e.backgroundColor) ?? n.backgroundColor ?? i.backgroundColor,
      fontSize: (e == null ? void 0 : e.fontSize) ?? n.fontSize ?? i.fontSize,
      fontFamily: (e == null ? void 0 : e.fontFamily) ?? n.fontFamily ?? i.fontFamily,
      color: (e == null ? void 0 : e.color) ?? n.color ?? i.color
    };
  }
  /**
   * The style this renderer actually paints an edge with, every property resolved.
   * Public so the legend can key on it — it is descriptive, and never assigns a style.
   */
  getEdgeStyle(e) {
    var o;
    let t;
    const i = e.getEdgeStyle(), n = this.styleFromKindMap(e);
    i && i.styleCb ? t = i.styleCb(e) : t = {
      strokeColor: (i == null ? void 0 : i.strokeColor) ?? n.strokeColor,
      strokeWidth: (i == null ? void 0 : i.strokeWidth) ?? n.strokeWidth,
      opacity: (i == null ? void 0 : i.opacity) ?? n.opacity,
      curveStyle: (i == null ? void 0 : i.curveStyle) ?? n.curveStyle,
      dashed: (i == null ? void 0 : i.dashed) ?? n.dashed,
      animateDash: (i == null ? void 0 : i.animateDash) ?? n.animateDash,
      rotateLabel: (i == null ? void 0 : i.rotateLabel) ?? n.rotateLabel,
      markerEnd: (i == null ? void 0 : i.markerEnd) ?? n.markerEnd,
      markerStart: (i == null ? void 0 : i.markerStart) ?? n.markerStart
    };
    const s = this.mergeEdgeStylingOptions(t, e);
    if (s.strokeColor = s.strokeColor !== void 0 ? gt(s.strokeColor, e) ?? "var(--pvt-edge-stroke, #999)" : "var(--pvt-edge-stroke, #999)", s.strokeWidth = s.strokeWidth !== void 0 ? Qt(s.strokeWidth, e) ?? 2 : 2, s.opacity = s.opacity !== void 0 ? Qt(s.opacity, e) ?? 1 : 1, s.curveStyle = s.curveStyle !== void 0 ? gt(s.curveStyle, e) : "bidirectional", s.markerEnd = s.markerEnd !== void 0 ? gt(s.markerEnd, e) : void 0, s.markerStart = s.markerStart !== void 0 ? gt(s.markerStart, e) : void 0, s.dashed = s.dashed !== void 0 ? We(s.dashed, e) : void 0, s.animateDash = s.animateDash !== void 0 ? We(s.animateDash, e) : void 0, e.to.parentNode && e.to.parentNode === e.from) {
      s.curveStyle = "straight";
      const l = (o = (e.getSubgraphFromNode() ?? e.from).getGraphElement()) == null ? void 0 : o.querySelector(".node"), h = l ? getComputedStyle(l).fill : void 0;
      h && !so(h) && (s.strokeColor = h, s.markerStart = "bigcircle", s.markerEnd = "arrow");
    }
    return s;
  }
  /** `render.edgeStyleMap`'s entry for this edge's kind, empty when it declares none. */
  styleFromKindMap(e) {
    const { edgeStyleMap: t, edgeTypeAccessor: i } = this.rendererOptions;
    if (!t) return {};
    const n = Uc(e, i);
    return n !== void 0 ? t[n] ?? {} : {};
  }
  /**
   * Fill whatever the edge and the style map left unset from `defaultEdgeStyle` —
   * from its `styleCb` first, then its literals. The default callback is the computed
   * form of the default slot, so it yields to anything that names this edge more
   * narrowly and fills what a per-edge `styleCb` left out.
   */
  mergeEdgeStylingOptions(e, t) {
    var o;
    const i = this.rendererOptions.defaultEdgeStyle, n = ((o = i.styleCb) == null ? void 0 : o.call(i, t)) ?? {};
    return {
      strokeColor: (e == null ? void 0 : e.strokeColor) ?? n.strokeColor ?? i.strokeColor,
      strokeWidth: (e == null ? void 0 : e.strokeWidth) ?? n.strokeWidth ?? i.strokeWidth,
      opacity: (e == null ? void 0 : e.opacity) ?? n.opacity ?? i.opacity,
      curveStyle: (e == null ? void 0 : e.curveStyle) ?? n.curveStyle ?? i.curveStyle,
      dashed: (e == null ? void 0 : e.dashed) ?? n.dashed ?? i.dashed,
      animateDash: (e == null ? void 0 : e.animateDash) ?? n.animateDash ?? i.animateDash,
      rotateLabel: (e == null ? void 0 : e.rotateLabel) ?? n.rotateLabel ?? i.rotateLabel,
      markerEnd: (e == null ? void 0 : e.markerEnd) ?? n.markerEnd ?? i.markerEnd,
      markerStart: (e == null ? void 0 : e.markerStart) ?? n.markerStart ?? i.markerStart
    };
  }
  genericEdgeRender(e, t) {
    const i = e.append("path").attr("stroke", t.strokeColor ?? "var(--pvt-edge-stroke)").attr("stroke-width", t.strokeWidth ?? "var(--pvt-edge-stroke-width)").style("--pvt-edge-own-stroke-width", String(t.strokeWidth ?? "var(--pvt-edge-stroke-width)")).attr("stroke-opacity", t.opacity);
    return t.dashed && (i.classed("dashed", !0), t.animateDash && i.classed("animated", !0)), i;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawEdgeMarker(e, t, i) {
    if (!this.rendererOptions.markerStyleMap)
      return;
    const n = t.markerEnd, s = t.markerStart;
    n && this.rendererOptions.markerStyleMap[n] && e.attr("marker-end", `url(#${n})`), s && this.rendererOptions.markerStyleMap[s] && e.attr("marker-start", `url(#${s})`);
  }
  updatePositions(e) {
    const t = e.selectAll("path"), i = e.selectAll("g.label-container");
    t.attr("d", (n) => this.linkPathRouter(n)), i.attr("transform", (n, s, o) => {
      const { from: a, to: l } = n, h = this.getEdgeStyle(n), d = o[s].parentNode;
      let u = null;
      d && d instanceof Element && (u = ht(d).select("path").node());
      let p, g, f = { x: 0, y: 0 }, v = 0;
      if (a === l) {
        const y = u ? Tl(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      } else if (h.curveStyle === "straight") {
        const y = u ? xl(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      } else {
        const y = u ? Ml(u) : void 0, { length: b = 0, midpoint: k = { x: 0, y: 0 } } = y ?? {};
        v = b, f = k;
      }
      if (u && v > 0)
        p = f.x, g = f.y, a === l && (p += 12, g -= 4);
      else {
        const y = n.source.x ?? 0, b = n.source.y ?? 0, k = n.target.x ?? 0, S = n.target.y ?? 0;
        p = (y + k) / 2, g = (b + S) / 2;
      }
      if (p = isFinite(p) ? p : 0, g = isFinite(g) ? g : 0, h.rotateLabel) {
        const y = (n.target.x ?? 0) - (n.source.x ?? 0), b = (n.target.y ?? 0) - (n.source.y ?? 0), k = Math.atan2(b, y) * 180 / Math.PI, S = k > 90 || k < -90 ? k + 180 : k;
        return `translate(${p}, ${g}) rotate(${S})`;
      } else
        return `translate(${p}, ${g})`;
    });
  }
  linkPathRouter(e) {
    const { from: t, to: i } = e;
    if (t.x === void 0 || t.y === void 0 || i.x === void 0 || i.y === void 0)
      return null;
    if (t === i)
      return this.linkSelfLoop(e);
    const n = i.getConnectedNodes(), s = this.getEdgeStyle(e);
    return s.curveStyle === "straight" ? this.linkStraight(e) : s.curveStyle === "curved" ? this.linkArc(e) : n.filter((o) => o.id === t.id).length > 0 ? (e.updateStyle({ edge: { curveStyle: "curved" } }), this.linkArc(e)) : (e.updateStyle({ edge: { curveStyle: "straight" } }), this.linkStraight(e));
  }
  linkSelfLoop(e) {
    var R;
    const { from: t, to: i } = e, n = ((R = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : R.edge.id) === e.id;
    if (t.x === void 0 || t.y === void 0 || i.x === void 0 || i.y === void 0)
      return null;
    const s = 4 + (n ? 2 : 0), o = 4 + (n ? 2 : 0), a = t.x ?? 0, l = t.y ?? 0, h = this.borderReach(t, Math.SQRT1_2, -Math.SQRT1_2), d = h + 16 * Math.log(h + 1), u = Math.max(10, 110 / Math.sqrt(h)), p = 45, g = (p + u) * Math.PI / 180, f = a + d * Math.cos(g), v = l - d * Math.sin(g), y = (p - u) * Math.PI / 180, b = a + d * Math.cos(y), k = l - d * Math.sin(y), S = this.borderReach(t, Math.cos(g), -Math.sin(g), s), N = a + S * Math.cos(g), L = l - S * Math.sin(g), I = this.borderReach(t, Math.cos(y), -Math.sin(y), o), q = a + I * Math.cos(y), F = l - I * Math.sin(y);
    return `M ${N} ${L} C ${f} ${v}, ${b} ${k}, ${q} ${F}`;
  }
  /** See {@link NodeDrawer.borderReach} — where an edge should meet this node. */
  borderReach(e, t, i, n = 0) {
    return this.graphSvgRenderer.nodeDrawer.borderReach(e, t, i, n);
  }
  linkStraight(e) {
    var nt;
    const { from: t, to: i } = e, n = ((nt = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : nt.edge.id) === e.id;
    if (t.x === void 0 || t.y === void 0 || i.x === void 0 || i.y === void 0)
      return null;
    const s = this.graphSvgRenderer.edgeDrawer.getEdgeStyle(e), o = this.graph.getOptions().isDirected || e.directed, a = o && s.markerEnd !== void 0, l = o && s.markerStart !== void 0, h = 4, d = 4 + (a ? 4 : 0) + (n ? 2 : 0);
    let u = i.x - t.x, p = i.y - t.y, g = Math.sqrt(u * u + p * p);
    const f = g === 0 ? -Math.SQRT1_2 : u / g, v = g === 0 ? -Math.SQRT1_2 : p / g, y = e.getSubgraphToNode() ?? e.to, b = this.borderReach(t, f, v);
    g === 0 && (u = f * b, p = v * b, g = b);
    const k = g <= b, S = k ? f : -f, N = k ? v : -v, L = k ? b : this.borderReach(t, f, v, h), I = this.borderReach(y, S, N, d), q = t.x + L * f, F = t.y + L * v, R = k ? i.x + I * f : i.x - I * f, Y = k ? i.y + I * v : i.y - I * v;
    return `M ${q},${F} L ${R},${Y}`;
  }
  linkArc(e) {
    var g;
    const { from: t, to: i } = e, n = ((g = this.graphSvgRenderer.getGraphInteraction().getSelectedEdge()) == null ? void 0 : g.edge.id) === e.id;
    if (t.x === void 0 || t.y === void 0 || i.x === void 0 || i.y === void 0)
      return null;
    const s = this.graphSvgRenderer.edgeDrawer.getEdgeStyle(e), o = 4 + (s.markerStart !== void 0, 0) + (n ? 2 : 0), a = 4 + (s.markerStart !== void 0 ? 2 : 0) + (n ? 2 : 0), l = Math.hypot(i.x - t.x, i.y - t.y) || 1, h = (i.x - t.x) / l, d = (i.y - t.y) / l, u = this.borderReach(t, h, d), p = this.borderReach(i, -h, -d);
    return this.buildArcPath({
      fromX: t.x,
      fromY: t.y,
      toX: i.x,
      toY: i.y,
      fromRadius: u,
      toRadius: p,
      fromBox: t.getBorderBox(o),
      toBox: i.getBorderBox(a),
      drawOffsetStart: o,
      drawOffsetEnd: a
    });
  }
  buildArcPath(e) {
    const {
      fromX: t,
      fromY: i,
      toX: n,
      toY: s,
      fromRadius: o,
      toRadius: a,
      fromBox: l,
      toBox: h,
      drawOffsetStart: d = 4,
      drawOffsetEnd: u = 8
    } = e, p = Math.hypot(n - t, s - i), g = {
      from: { x: t, y: i },
      to: { x: n, y: s },
      rx: p,
      ry: p,
      xAxisRotation: 0,
      largeArcFlag: !1,
      sweepFlag: !0
    }, f = {
      cx: t,
      cy: i,
      r: o + d
    }, v = {
      cx: n,
      cy: s,
      r: a + u
    }, y = l && qs(g, { x: t, y: i }, l.halfWidth, l.halfHeight, "from") || js(g, f), b = h && qs(g, { x: n, y: s }, h.halfWidth, h.halfHeight, "to") || js(g, v);
    return y && b ? `
            M${y.x},${y.y}
            A${p},${p} 0 0,1
            ${b.x},${b.y}
        ` : null;
  }
  defaultLabelRender(e, t, i) {
    var l;
    const n = e.append("g").classed("label-container", !0), s = xo(t);
    if (!s || s === "") return;
    const a = (l = n.append("text").text(s).attr("class", "pvt-edge-label").attr("text-anchor", "middle").attr("alignment-baseline", "middle").style("font-size", i.fontSize).style("font-family", i.fontFamily).style("pointer-events", "none").style("fill", i.color).node()) == null ? void 0 : l.getBBox();
    a && n.insert("rect", "text").attr("x", a.x - 4).attr("y", a.y - 2).attr("width", a.width + 8).attr("height", a.height + 4).attr("fill", i.backgroundColor).attr("rx", 2).attr("ry", 2);
  }
  renderDefinitions() {
    this.renderMarkers();
  }
  renderMarkers() {
    if (this.rendererOptions.markerStyleMap)
      for (const e in this.rendererOptions.markerStyleMap)
        this.renderMarker(this.rendererOptions.markerStyleMap[e], e);
  }
  renderMarker(e, t) {
    var a, l, h, d, u, p, g, f, v;
    const i = this.graphSvgRenderer.defs;
    if (!i.select(`#${t}`).empty()) return;
    i.append("marker").attr("id", t).attr("viewBox", e.viewBox).attr("refX", e.refX).attr("refY", e.refY).attr("markerWidth", e.markerWidth).attr("markerHeight", e.markerHeight).attr("markerUnits", e.markerUnits || "userSpaceOnUse").attr("orient", e.orient ?? "auto").append("path").attr("d", e.pathD).attr("fill", e.fill ?? "context-stroke");
    const s = t + "_selected";
    if (!i.select(`#${s}`).empty()) return;
    i.append("marker").attr("id", s).attr("viewBox", ((a = e.selected) == null ? void 0 : a.viewBox) ?? e.viewBox).attr("refX", ((l = e.selected) == null ? void 0 : l.refX) ?? e.refX).attr("refY", ((h = e.selected) == null ? void 0 : h.refY) ?? e.refY).attr("markerWidth", ((d = e.selected) == null ? void 0 : d.markerWidth) ?? e.markerWidth).attr("markerHeight", ((u = e.selected) == null ? void 0 : u.markerHeight) ?? e.markerHeight).attr("markerUnits", (((p = e.selected) == null ? void 0 : p.markerUnits) ?? e.markerUnits) || "userSpaceOnUse").attr("orient", ((g = e.selected) == null ? void 0 : g.orient) ?? e.orient ?? "auto").append("path").attr("d", ((f = e.selected) == null ? void 0 : f.pathD) ?? e.pathD).attr("fill", ((v = e.selected) == null ? void 0 : v.fill) ?? e.fill ?? "context-stroke");
  }
  /**
   * Put the selected look on an edge, or take it off again.
   *
   * Called on every render pass rather than only when the edge is redrawn: selecting an
   * edge does not mark it dirty (a full redraw recreates the label and loses the listeners
   * hung off it), so nothing else would ever add or remove the class. This is the edge's
   * counterpart to `NodeDrawer.checkForHighlight`, and like it, it only touches attributes.
   */
  checkForSelection(e, t) {
    var s;
    const i = this.graphSvgRenderer.getGraphInteraction(), n = ((s = i.getSelectedEdge()) == null ? void 0 : s.edge.id) === t.id || i.getSelectedEdges().some(({ edge: o }) => o.id === t.id);
    e.classed("selected", n), this.pointMarkersAtSelectedVariant(e, n);
  }
  /**
   * Swap an edge's end markers between their plain and `_selected` variants.
   *
   * Resolved from the base id each time rather than by appending to whatever is there:
   * running on every pass, appending would grow `#m_selected_selected…` and never come
   * back when the edge is deselected.
   */
  pointMarkersAtSelectedVariant(e, t) {
    var n;
    const i = e.selectAll("path");
    for (const s of ["marker-start", "marker-end"]) {
      const o = (n = i.attr(s)) == null ? void 0 : n.match(/#.*(?=\))/);
      if (!o) continue;
      const a = o[0].replace(/_selected$/, "");
      i.attr(s, `url(${t ? `${a}_selected` : a})`);
    }
  }
}
class jc {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "rendererOptions");
    c(this, "graphSvgRenderer");
    c(this, "zoomLayer");
    c(this, "svg");
    c(this, "overlayGroup");
    c(this, "polyline");
    c(this, "enabled", !1);
    c(this, "drawing", !1);
    c(this, "points", []);
    this.graphSvgRenderer = i, this.graph = t, this.rendererOptions = e, this.zoomLayer = i.zoomGroup, this.svg = i.svg, this.overlayGroup = this.zoomLayer.append("g").attr("class", "pvt-lasso-overlay"), this.polyline = this.overlayGroup.append("polyline").style("display", "none"), this.attachEvents();
  }
  setEnabled(e) {
    this.enabled = e, e || this.clear();
  }
  attachEvents() {
    this.svg.on("pointerdown.lasso", (e) => {
      this.enabled && e.button === 0 && (this.drawing = !0, this.points = [], this.polyline.style("display", "block"), this.addPoint(e));
    }), this.svg.on("pointermove.lasso", (e) => {
      !this.enabled || !this.drawing || this.addPoint(e);
    }), this.svg.on("pointerup.lasso", () => {
      this.drawing && (this.drawing = !1, this.points.length > 2 && this.points.push(this.points[0]), this.render(), this.selectNodesInsideLasso(), this.clear());
    });
  }
  addPoint(e) {
    const t = this.graphSvgRenderer.screenToGraphCoordinates(e.clientX, e.clientY);
    this.points.push(t), this.render();
  }
  render() {
    const e = this.points.map((t) => `${t.x},${t.y}`).join(" ");
    this.polyline.attr("points", e);
  }
  clear() {
    this.points = [], this.polyline.attr("points", "").style("display", "none"), this.drawing = !1;
  }
  selectNodesInsideLasso() {
    const e = this.graph.getMutableNodes().filter((t) => _l(
      t.x ?? 0,
      t.y ?? 0,
      this.points
    )).map((t) => ({
      node: t,
      element: t.getGraphElement()
    }));
    this.graph.renderer.getGraphInteraction().selectNodes(e);
  }
}
class Wc {
  constructor(e) {
    c(this, "graph");
    c(this, "renderer");
    c(this, "graphInteraction");
    this.graph = e;
  }
  init(e, t) {
    this.renderer = e, this.graphInteraction = t, this.registerListeners();
  }
  update() {
    this.registerListeners();
  }
  registerListeners() {
    this.renderer.getOptions().dragEnabled && this.renderer.getNodeSelection().call(this.graph.simulation.createDragBehavior()), this.renderer.getOptions().interactionEnabled && (this.renderer.getNodeSelection().on("dblclick.node", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodeDbclick(i, e, t);
    }).on("click.node", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodeClick(i, e, t);
    }).on("pointerdown.node", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodePointerDown(i, e, t);
    }).on("pointerup.node", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodePointerUp(i, e, t);
    }).on("contextmenu.node", (e, t) => {
      var n;
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodeContextmenu(i, e, t);
    }).on("mouseenter.node", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodeHoverIn(i, e, t);
    }).on("mouseleave.node", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.nodeHoverOut(i, e, t);
    }).on("dragging.node", (e, t) => {
      var i;
      (i = this.graphInteraction) == null || i.dragging(e, t);
    }), this.renderer.getEdgeSelection().on("dblclick.edge", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.edgeDbclick(i, e, t);
    }).on("click.edge", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.edgeClick(i, e, t);
    }).on("contextmenu.edge", (e, t) => {
      var n;
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.edgeContextmenu(i, e, t);
    }).on("mouseenter.edge", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.edgeHoverIn(i, e, t);
    }).on("mouseleave.edge", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.edgeHoverOut(i, e, t);
    }), this.renderer.getNoteSelection().on("dblclick.note", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.noteDbclick(i, e, t);
    }).on("click.note", (e, t) => {
      var n;
      e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.noteClick(i, e, t);
    }).on("pointerdown.note", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.notePointerDown(i, e, t);
    }).on("pointerup.note", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.notePointerUp(i, e, t);
    }).on("contextmenu.note", (e, t) => {
      var n;
      e.preventDefault(), e.stopPropagation();
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.noteContextmenu(i, e, t);
    }).on("mouseenter.note", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.noteHoverIn(i, e, t);
    }).on("mouseleave.note", (e, t) => {
      var n;
      const i = e.currentTarget;
      (n = this.graphInteraction) == null || n.noteHoverOut(i, e, t);
    }).on("dragging.note", (e, t) => {
      var i;
      (i = this.graphInteraction) == null || i.noteDragging(e, t);
    }), this.renderer.getNoteSelection().selectAll(".pvt-note-link-placeholder-icon").on("click.note-handle", (e) => {
      var s;
      const t = e.currentTarget, i = t.closest("g.pvt-note");
      if (!i) return;
      const n = ht(i).datum();
      e.stopPropagation(), (s = this.graphInteraction) == null || s.noteHandleClick(t, e, n);
    }).on("pointerdown.note-handle", (e) => {
      var s;
      const t = e.currentTarget, i = t.closest("g.pvt-note");
      if (!i) return;
      const n = ht(i).datum();
      e.stopPropagation(), (s = this.graphInteraction) == null || s.noteHandlePointerDown(t, e, n);
    }), this.renderer.getCanvasSelection().on("click.canvas", (e) => {
      var t;
      (t = this.graphInteraction) == null || t.canvasClick(e);
    }).on("pointerdown.canvas", (e) => {
      var t;
      (t = this.graphInteraction) == null || t.canvasPointerDown(e);
    }).on("pointerup.canvas", (e) => {
      var t;
      (t = this.graphInteraction) == null || t.canvasPointerUp(e);
    }).on("contextmenu.canvas", (e) => {
      var t;
      e.preventDefault(), (t = this.graphInteraction) == null || t.canvasContextmenu(e);
    }).on("mousemove.canvas", (e) => {
      var t;
      (t = this.graphInteraction) == null || t.canvasMousemove(e);
    }));
  }
}
class Vc {
  constructor(e) {
    c(this, "graph");
    c(this, "callbacks");
    c(this, "listeners");
    c(this, "lastPointerEvent", null);
    c(this, "selectedNode", null);
    c(this, "selectedEdge", null);
    c(this, "selectedNodes", []);
    c(this, "selectedEdges", []);
    c(this, "nodePointerDown", (e, t, i) => {
      const n = {
        cancelled: !1,
        cancel() {
          this.cancelled = !0;
        }
      };
      this.emit("nodePointerDown", t, i, e, n), this.callbacks.onNodePointerDown && typeof this.callbacks.onNodePointerDown == "function" && this.callbacks.onNodePointerDown(t, i, e);
    });
    c(this, "nodePointerUp", (e, t, i) => {
      this.emit("nodePointerUp", t, i, e), this.callbacks.onNodePointerUp && typeof this.callbacks.onNodePointerUp == "function" && this.callbacks.onNodePointerUp(t, i, e);
    });
    c(this, "nodeHoverIn", (e, t, i) => {
      this.emit("nodeHoverIn", t, i, e), this.callbacks.onNodeHoverIn && typeof this.callbacks.onNodeHoverIn == "function" && this.callbacks.onNodeHoverIn(t, i, e);
    });
    c(this, "nodeHoverOut", (e, t, i) => {
      this.emit("nodeHoverOut", t, i, e), this.callbacks.onNodeHoverOut && typeof this.callbacks.onNodeHoverOut == "function" && this.callbacks.onNodeHoverOut(t, i, e);
    });
    c(this, "dragging", (e, t) => {
      this.emit("dragging", e, t), this.callbacks.onNodeDragging && typeof this.callbacks.onNodeDragging == "function" && this.callbacks.onNodeDragging(e, t);
    });
    c(this, "dragended", (e, t) => {
      this.emit("dragended", e, t), this.callbacks.onNodeDragended && typeof this.callbacks.onNodeDragended == "function" && this.callbacks.onNodeDragended(e, t);
    });
    c(this, "noteHoverIn", (e, t, i) => {
      this.emit("noteHoverIn", t, i, e), this.callbacks.onNoteHoverIn && typeof this.callbacks.onNoteHoverIn == "function" && this.callbacks.onNoteHoverIn(t, i, e);
    });
    c(this, "noteHoverOut", (e, t, i) => {
      this.emit("noteHoverOut", t, i, e), this.callbacks.onNoteHoverOut && typeof this.callbacks.onNoteHoverOut == "function" && this.callbacks.onNoteHoverOut(t, i, e);
    });
    c(this, "notePointerDown", (e, t, i) => {
      this.emit("notePointerDown", t, i, e), this.callbacks.onNotePointerDown && typeof this.callbacks.onNotePointerDown == "function" && this.callbacks.onNotePointerDown(t, i, e);
    });
    c(this, "notePointerUp", (e, t, i) => {
      this.emit("notePointerUp", t, i, e), this.callbacks.onNotePointerUp && typeof this.callbacks.onNotePointerUp == "function" && this.callbacks.onNotePointerUp(t, i, e);
    });
    c(this, "noteHandlePointerDown", (e, t, i) => {
      this.emit("noteHandlePointerDown", t, i, e), this.callbacks.onNoteHandlePointerDown && typeof this.callbacks.onNoteHandlePointerDown == "function" && this.callbacks.onNoteHandlePointerDown(t, i, e);
    });
    c(this, "noteDragging", (e, t) => {
      this.emit("noteDragging", e, t), this.callbacks.onNoteDragging && typeof this.callbacks.onNoteDragging == "function" && this.callbacks.onNoteDragging(e, t);
    });
    c(this, "canvasPointerDown", (e) => {
      this.emit("canvasPointerDown", e), this.callbacks.onCanvasPointerDown && typeof this.callbacks.onCanvasPointerDown == "function" && this.callbacks.onCanvasPointerDown(e);
    });
    c(this, "canvasPointerUp", (e) => {
      this.emit("canvasPointerUp", e), this.callbacks.onCanvasPointerUp && typeof this.callbacks.onCanvasPointerUp == "function" && this.callbacks.onCanvasPointerUp(e);
    });
    this.graph = e, this.callbacks = this.graph.getCallbacks() ?? {}, this.listeners = {
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
      badgeClick: [],
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
  on(e, t) {
    this.listeners[e].push(t);
  }
  off(e, t) {
    this.listeners[e] = this.listeners[e].filter((i) => i !== t);
  }
  getGraph() {
    return this.graph;
  }
  emit(e, ...t) {
    for (const i of this.listeners[e])
      i(...t);
  }
  nodeClick(e, t, i) {
    var s;
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeClick", t, i, e, n), !n.cancelled && (t.shiftKey ? this.addNodesToSelection([{ node: i, element: e }]) : t.altKey ? this.selectNodes([{ node: i, element: e }]) : t.ctrlKey ? this.removeNodesFromSelection([{ node: i, element: e }]) : ((s = this.getSelectedNode()) == null ? void 0 : s.node) !== i && this.selectNode(e, i), this.callbacks.onNodeClick && typeof this.callbacks.onNodeClick == "function" && this.callbacks.onNodeClick(t, i, e));
  }
  /**
   * A rim badge was clicked. Specific before general: the badge's own `onClick` runs first,
   * then the graph-wide `onBadgeClick`. Neither can suppress the other — a bus listener
   * calling `cancel()` is the one way to stop both.
   */
  badgeClick(e, t, i, n) {
    var o;
    const s = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("badgeClick", t, i, n, e, s), !s.cancelled && ((o = n.onClick) == null || o.call(n, t, i, n), typeof this.callbacks.onBadgeClick == "function" && this.callbacks.onBadgeClick(t, i, n, e));
  }
  nodeDbclick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeDbclick", t, i, e, n), !n.cancelled && this.callbacks.onNodeDbclick && typeof this.callbacks.onNodeDbclick == "function" && this.callbacks.onNodeDbclick(t, i, e);
  }
  nodeContextmenu(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("nodeContextmenu", t, i, e, n), !n.cancelled && this.callbacks.onNodeContextmenu && typeof this.callbacks.onNodeContextmenu == "function" && this.callbacks.onNodeContextmenu(t, i, e);
  }
  edgeClick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeClick", t, i, e, n), !n.cancelled && (this.selectEdge(e, i), this.callbacks.onEdgeClick && typeof this.callbacks.onEdgeClick == "function" && this.callbacks.onEdgeClick(t, i, e));
  }
  edgeDbclick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeDbclick", t, i, e, n), !n.cancelled && this.callbacks.onEdgeDbclick && typeof this.callbacks.onEdgeDbclick == "function" && this.callbacks.onEdgeDbclick(t, i, e);
  }
  edgeContextmenu(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("edgeContextmenu", t, i, e, n), !n.cancelled && this.callbacks.onEdgeContextmenu && typeof this.callbacks.onEdgeContextmenu == "function" && this.callbacks.onEdgeContextmenu(t, i, e);
  }
  edgeHoverIn(e, t, i) {
    this.emit("edgeHoverIn", t, i, e), this.callbacks.onEdgeHoverIn && typeof this.callbacks.onEdgeHoverIn == "function" && this.callbacks.onEdgeHoverIn(t, i, e);
  }
  edgeHoverOut(e, t, i) {
    this.emit("edgeHoverOut", t, i, e), this.callbacks.onEdgeHoverOut && typeof this.callbacks.onEdgeHoverOut == "function" && this.callbacks.onEdgeHoverOut(t, i, e);
  }
  noteClick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteClick", t, i, e, n), !n.cancelled && this.callbacks.onNoteClick && typeof this.callbacks.onNoteClick == "function" && this.callbacks.onNoteClick(t, i, e);
  }
  noteDbclick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteDbclick", t, i, e, n), !n.cancelled && this.callbacks.onNoteDbclick && typeof this.callbacks.onNoteDbclick == "function" && this.callbacks.onNoteDbclick(t, i, e);
  }
  noteContextmenu(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteContextmenu", t, i, e, n), !n.cancelled && this.callbacks.onNoteContextmenu && typeof this.callbacks.onNoteContextmenu == "function" && this.callbacks.onNoteContextmenu(t, i, e);
  }
  noteHandleClick(e, t, i) {
    const n = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("noteHandleClick", t, i, e, n), !n.cancelled && this.callbacks.onNoteHandleClick && typeof this.callbacks.onNoteHandleClick == "function" && this.callbacks.onNoteHandleClick(t, i, e);
  }
  canvasClick(e) {
    const t = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("canvasClick", e, t), !t.cancelled && (this.unselectAll(), this.callbacks.onCanvasClick && typeof this.callbacks.onCanvasClick == "function" && this.callbacks.onCanvasClick(e));
  }
  canvasBeforeZoom(e) {
    const t = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    return this.emit("canvasBeforeZoom", e, t), t.cancelled ? !1 : (this.callbacks.onCanvasBeforeZoom && typeof this.callbacks.onCanvasBeforeZoom == "function" && this.callbacks.onCanvasBeforeZoom(e), !0);
  }
  canvasZoom(e) {
    this.emit("canvasZoom", e), this.callbacks.onCanvasZoom && typeof this.callbacks.onCanvasZoom == "function" && this.callbacks.onCanvasZoom(e);
  }
  canvasContextmenu(e) {
    const t = {
      cancelled: !1,
      cancel() {
        this.cancelled = !0;
      }
    };
    this.emit("canvasContextmenu", e, t), !t.cancelled && this.callbacks.onCanvasContextmenu && typeof this.callbacks.onCanvasContextmenu == "function" && this.callbacks.onCanvasContextmenu(e);
  }
  canvasMousemove(e) {
    this.lastPointerEvent = e, this.emit("canvasMousemove", e), this.callbacks.onCanvasMousemove && typeof this.callbacks.onCanvasMousemove == "function" && this.callbacks.onCanvasMousemove(e);
  }
  simulationTick() {
    this.emit("simulationTick"), this.callbacks.onSimulationTick && typeof this.callbacks.onSimulationTick == "function" && this.callbacks.onSimulationTick();
  }
  simulationSlowTick() {
    this.emit("simulationSlowTick"), this.callbacks.onSimulationSlowTick && typeof this.callbacks.onSimulationSlowTick == "function" && this.callbacks.onSimulationSlowTick();
  }
  selectNode(e, t) {
    this.unselectAll(), this.selectedNode = {
      node: t,
      element: e
    }, this.selectedNodes = [this.selectedNode], this.emit("selectNode", t, e), this.callbacks.onNodeSelect && typeof this.callbacks.onNodeSelect == "function" && this.callbacks.onNodeSelect(t, e), this.refreshRendering();
  }
  unselectNode() {
    if (this.selectedNode === null)
      return;
    const e = this.selectedNode.node, t = this.selectedNode.element;
    this.selectedNode = null, this.selectedNodes = [], this.emit("unselectNode", e, t), this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(e, t), this.unselectFromDirectSubgraph(e), this.refreshRendering();
  }
  unselectFromAncestorSubgraphs(e) {
    var a, l;
    const t = this.buildAncestorStack(e);
    let i = this.findOutermostSubgraph(t);
    if (!i) return;
    let n;
    for (; t.length > 0 && i; ) {
      const h = t.pop();
      n = i, h && (i = (a = i.getMutableNode(h.id)) == null ? void 0 : a.getSubgraph());
    }
    if (!n) return;
    const s = n.renderer.getGraphInteraction();
    ((l = s.getSelectedNode()) == null ? void 0 : l.node.id) === e.id && s.unselectNode();
  }
  unselectFromDirectSubgraph(e) {
    var i, n;
    const t = (i = e.parentNode) == null ? void 0 : i.getSubgraph();
    if (t) {
      const s = t.renderer.getGraphInteraction();
      ((n = s.getSelectedNode()) == null ? void 0 : n.node.id) === e.id && s.unselectNode();
    }
    this.refreshRendering();
  }
  buildAncestorStack(e) {
    const t = [];
    let i = e.parentNode;
    for (; i; )
      t.push(i), i = i.parentNode;
    return t;
  }
  findOutermostSubgraph(e) {
    var t;
    for (let i = e.length - 1; i >= 0; i--) {
      const n = (t = e[i]) == null ? void 0 : t.getSubgraph();
      if (n) return n;
    }
  }
  selectNodes(e) {
    if (e.length === 1)
      return this.selectNode(e[0].element, e[0].node);
    this.unselectAll(), this.selectedNodes = e, this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, this.emit("selectNodes", this.selectedNodes), this.callbacks.onNodesSelect && typeof this.callbacks.onNodesSelect == "function" && this.callbacks.onNodesSelect(e), this.refreshRendering();
  }
  addNodesToSelection(e) {
    if (e.length == 0) return;
    if (this.selectedNodes.length === 0 && e.length === 1)
      return this.selectNode(e[0].element, e[0].node);
    const t = this.getSelectedNodeIDs() ?? [];
    e = e.filter((i) => !t.includes(i.node.id)), this.selectedNodes = this.selectedNodes.concat(e), this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, this.callbacks.onNodesSelect && typeof this.callbacks.onNodesSelect == "function" && this.callbacks.onNodesSelect(e), this.emit("selectNodes", e), this.refreshRendering();
  }
  removeNodesFromSelection(e) {
    const t = e.map((i) => i.node.id);
    this.selectedNodes = this.selectedNodes.filter((i) => !t.includes(i.node.id)), this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null, e.forEach(({ node: i, element: n }) => {
      this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(i, n);
    }), this.emit("unselectNodes", e), this.refreshRendering();
  }
  selectEdge(e, t) {
    this.unselectAll(), this.selectedEdge = {
      edge: t,
      element: e
    }, this.emit("selectEdge", t, e), this.callbacks.onEdgeSelect && typeof this.callbacks.onEdgeSelect == "function" && this.callbacks.onEdgeSelect(t, e), this.refreshRendering();
  }
  selectEdges(e) {
    this.unselectAll(), this.selectedEdges = e.map((t) => ({
      edge: t[0],
      element: t[1]
    })), this.selectedEdge = this.selectedEdges.length === 1 ? this.selectedEdges[0] : null, this.emit("selectEdges", this.selectedEdges), this.selectedEdges.forEach(({ edge: t, element: i }) => {
      this.callbacks.onEdgeSelect && typeof this.callbacks.onEdgeSelect == "function" && this.callbacks.onEdgeSelect(t, i);
    }), this.refreshRendering();
  }
  unselectEdge() {
    if (this.selectedEdge === null)
      return;
    const e = this.selectedEdge.edge, t = this.selectedEdge.element;
    this.selectedEdge = null, this.emit("unselectEdge", e, t), this.callbacks.onEdgeBlur && typeof this.callbacks.onEdgeBlur == "function" && this.callbacks.onEdgeBlur(e, t), this.refreshRendering();
  }
  unselectAll() {
    this.unselectNode(), this.unselectEdge(), this.clearNodeSelectionList(), this.clearEdgeSelectionList(), this.refreshRendering();
  }
  clearNodeSelectionList() {
    const e = this.selectedNodes;
    this.selectedNodes = [], this.selectedNode = null, this.emit("unselectNodes", e), e.forEach(({ node: t, element: i }) => {
      this.callbacks.onNodeBlur && typeof this.callbacks.onNodeBlur == "function" && this.callbacks.onNodeBlur(t, i);
    }), e.length && this.refreshRendering();
  }
  clearEdgeSelectionList() {
    const e = this.selectedEdges;
    this.selectedEdges = [], this.selectedEdge = null, this.emit("unselectEdges", e), e.forEach(({ edge: t, element: i }) => {
      this.callbacks.onEdgeBlur && typeof this.callbacks.onEdgeBlur == "function" && this.callbacks.onEdgeBlur(t, i);
    }), e.length && this.refreshRendering();
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
    var e;
    return ((e = this.selectedNodes) == null ? void 0 : e.map((t) => t.node.id)) ?? null;
  }
  getSelectedNodes() {
    return this.selectedNodes;
  }
  getSelectedEdgeIDs() {
    var e;
    return ((e = this.selectedEdges) == null ? void 0 : e.map((t) => t.edge.id)) ?? null;
  }
  getSelectedEdges() {
    return this.selectedEdges;
  }
  expandNodeSelection() {
    this.selectedNodes.length > 1 ? this.graph.toggleExpandNodes(this.selectedNodes.map((e) => e.node)) : this.selectedNode && this.graph.toggleExpandNode(this.selectedNode.node);
  }
  getLastPointerEvent() {
    return this.lastPointerEvent;
  }
}
class Kc {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "container");
    c(this, "options");
    c(this, "layoutProgress", 0);
    c(this, "layoutProgressType", "done");
    c(this, "progressBar", null);
    c(this, "timerLabel", null);
    c(this, "textLabel", null);
    c(this, "loadingPb", null);
    this.graph = e, this.container = t, this.options = i;
  }
  /**
   * Fit-and-centre once the content has stopped resizing. Renderers that lay
   * out over several frames after the sim stops (e.g. expanded clusters)
   * override this to wait for a stable bbox; the default fits immediately.
   */
  fitAndCenterWhenSettled(e) {
    this.fitAndCenter(e);
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
  /**
   * The graph's root container — everything, chrome included. Deliberately distinct
   * from {@link getCanvas}: the canvas shrinks whenever chrome opens (a sidebar, the
   * data dock), the container only changes when the page around it does. Anything
   * that must not react to chrome measures this instead.
   */
  getRootContainer() {
    return this.container;
  }
  updateLayoutProgress(e, t, i) {
    this.layoutProgress = e, this.layoutProgressType = i, !(!this.progressBar || !this.timerLabel || !this.textLabel) && (this.progressBar.style.width = `${e * 100}%`, this.timerLabel.textContent = `Elapsed time: ${(t / 1e3).toFixed(1)} sec`, this.layoutProgressType === "simulation" ? this.textLabel.textContent = "Optimizing node positions..." : this.layoutProgressType === "rendering" ? (this.progressBar.style.width = "100%", this.textLabel.textContent = "Rendering in progress") : this.layoutProgressType === "done" && (this.progressBar.style.width = "100%", this.timerLabel.textContent = "All done"), this.toggleLayoutProgressVisibility());
  }
  toggleLayoutProgressVisibility() {
    const e = this.getZoomGroup();
    e && e.classList.toggle("hidden", this.layoutProgressType !== "done"), this.loadingPb && this.loadingPb.classList.toggle("hidden", this.layoutProgressType === "done");
  }
  setupRendering() {
    this.createHtmlProgressBar();
  }
  createHtmlProgressBar() {
    const e = this.getCanvas();
    if (!e)
      throw new Error("Canvas element is not defined in the graph renderer.");
    const t = document.createElement("div");
    t.classList.add("pvt-loading-progress-bar"), t.style.position = "absolute", t.style.left = "50%", t.style.top = "50%", t.style.transform = "translate(-50%, -50%)";
    const i = document.createElement("div");
    i.classList.add("background"), i.style.width = "100%";
    const n = document.createElement("div");
    n.classList.add("track"), i.style.width = "100%";
    const s = document.createElement("div");
    s.classList.add("fill"), s.style.width = "0px";
    const o = document.createElement("span");
    o.classList.add("label"), o.textContent = "Optimizing node positions...";
    const a = document.createElement("span");
    a.classList.add("label"), a.textContent = "Elapsed time: 0 sec", n.appendChild(s), i.appendChild(n), t.append(i, o, a), e.appendChild(t), this.progressBar = s, this.timerLabel = a, this.textLabel = o, this.loadingPb = t;
  }
}
class Yc {
}
class Xc extends Yc {
  constructor(t, i, n) {
    super();
    c(this, "renderer");
    c(this, "svg");
    c(this, "selectionBoxGroup");
    c(this, "rect", null);
    c(this, "startX", 0);
    c(this, "startY", 0);
    c(this, "isSelecting", !1);
    c(this, "selectionMode", "start");
    c(this, "onSvgMouseLeave", () => {
      this.isSelecting && this.onMouseUp();
    });
    c(this, "onMouseDown", (t) => {
      if (!this.selectionBoxGroup) return;
      if (t.shiftKey)
        this.selectionMode = "add";
      else if (t.altKey)
        this.selectionMode = "start";
      else if (t.ctrlKey) {
        if (this.selectionMode = "remove", !this.renderer.getGraphInteraction().hasActiveMultiselection())
          return;
      } else {
        this.selectionMode = "start";
        return;
      }
      t.preventDefault(), this.svg.querySelectorAll(".pvt-selection-rectangle").forEach((s) => s.remove()), this.isSelecting = !0;
      const { x: i, y: n } = this.getSvgPoint(t);
      this.startX = i, this.startY = n, this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect"), this.rect.setAttribute("x", i.toString()), this.rect.setAttribute("y", n.toString()), this.rect.setAttribute("width", "0"), this.rect.setAttribute("height", "0"), this.rect.setAttribute("class", "pvt-selection-rectangle"), this.selectionBoxGroup.appendChild(this.rect), this.svg.addEventListener("mouseleave", this.onSvgMouseLeave);
    });
    c(this, "onMouseMove", (t) => {
      if (!this.isSelecting || !this.rect) return;
      const { x: i, y: n } = this.getSvgPoint(t), s = Math.min(this.startX, i), o = Math.min(this.startY, n), a = Math.abs(i - this.startX), l = Math.abs(n - this.startY);
      this.rect.setAttribute("x", s.toString()), this.rect.setAttribute("y", o.toString()), this.rect.setAttribute("width", a.toString()), this.rect.setAttribute("height", l.toString());
    });
    c(this, "onMouseUp", () => {
      if (!this.selectionBoxGroup || !this.isSelecting || !this.rect) return;
      this.isSelecting = !1;
      const t = this.rect.getBoundingClientRect(), i = this.getNodesInRect(t).map((n) => ({
        node: n[0],
        element: n[1]
      }));
      this.selectionMode == "start" ? this.renderer.getGraphInteraction().selectNodes(i) : this.selectionMode == "add" ? this.renderer.getGraphInteraction().addNodesToSelection(i) : this.selectionMode == "remove" && this.renderer.getGraphInteraction().removeNodesFromSelection(i), this.selectionBoxGroup.removeChild(this.rect), this.rect = null, this.svg.removeEventListener("mouseleave", this.onSvgMouseLeave);
    });
    this.renderer = t, this.svg = i, this.selectionBoxGroup = n, this.init();
  }
  selectionInProgress() {
    return this.isSelecting;
  }
  init() {
    this.svg.addEventListener("mousedown", this.onMouseDown), this.svg.addEventListener("mousemove", this.onMouseMove), this.svg.addEventListener("mouseup", this.onMouseUp);
  }
  getSvgPoint(t) {
    var n;
    const i = this.svg.createSVGPoint();
    return i.x = t.clientX, i.y = t.clientY, i.matrixTransform((n = this.svg.getScreenCTM()) == null ? void 0 : n.inverse());
  }
  getNodesInRect(t) {
    const i = this.renderer.getGraphInteraction().getGraph().getMutableNodes(), n = [];
    return i.forEach((s) => {
      if (!s.x || !s.y) return;
      const o = s.getGraphElement();
      if (!o || !(o instanceof SVGGElement)) return;
      const a = o.getBoundingClientRect();
      a.x < t.x + t.width && a.x + a.width > t.x && a.y < t.y + t.height && a.y + a.height > t.y && n.push([s, o]);
    }), n;
  }
}
class It {
  constructor(e = {}, t = ne()) {
    c(this, "id");
    c(this, "x");
    c(this, "y");
    c(this, "width");
    c(this, "height");
    c(this, "content");
    c(this, "color");
    c(this, "surface");
    c(this, "visible");
    c(this, "graphElement");
    c(this, "attachedElement");
    c(this, "editing");
    c(this, "dirty", !1);
    c(this, "attachmentDirty", !1);
    c(this, "domID");
    this.id = e.id ?? crypto.randomUUID(), this.domID = t, this.x = e.x ?? 0, this.y = e.y ?? 0, this.width = e.width ?? 220, this.height = e.height ?? 160, this.content = e.content ?? "", this.color = e.color ?? "#FDE68A", this.surface = e.surface ?? "jewel", this.visible = !0, this.attachedElement = e.attachedElement, this.editing = !1;
  }
  setPosition(e, t) {
    this.x = e, this.y = t;
  }
  setSize(e, t) {
    this.width = e, this.height = t;
  }
  setContent(e) {
    this.content = e, this.markDirty();
  }
  setColor(e) {
    this.color = e, this.markDirty();
  }
  setSurface(e) {
    this.surface = e, this.markDirty();
  }
  setGraphElement(e) {
    this.graphElement = e;
  }
  getGraphElement() {
    return document ? (this.graphElement || (this.graphElement = document.getElementById(`note-${this.domID}`)), this.graphElement) : null;
  }
  isEditing() {
    return this.editing;
  }
  setEditing(e) {
    this.editing = e;
  }
  getAttachedElement() {
    return this.attachedElement;
  }
  setAttachedElement(e) {
    this.attachedElement = e, this.markAttachmentDirty();
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
function qn() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var se = qn();
function To(r) {
  se = r;
}
var Jt = { exec: () => null };
function ge(r) {
  let e = [];
  return (t) => {
    let i = Math.max(0, Math.min(3, t - 1)), n = e[i];
    return n || (n = r(i), e[i] = n), n;
  };
}
function G(r, e = "") {
  let t = typeof r == "string" ? r : r.source, i = { replace: (n, s) => {
    let o = typeof s == "string" ? s : s.source;
    return o = o.replace(Et.caret, "$1"), t = t.replace(n, o), i;
  }, getRegex: () => new RegExp(t, e) };
  return i;
}
var Zc = ((r = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + r);
  } catch {
    return !1;
  }
})(), Et = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: ge((r) => new RegExp(`^ {0,${r}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: ge((r) => new RegExp(`^ {0,${r}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)), fencesBeginRegex: ge((r) => new RegExp(`^ {0,${r}}(?:\`\`\`|~~~)`)), headingBeginRegex: ge((r) => new RegExp(`^ {0,${r}}#`)), htmlBeginRegex: ge((r) => new RegExp(`^ {0,${r}}<(?:[a-z].*>|!--)`, "i")), blockquoteBeginRegex: ge((r) => new RegExp(`^ {0,${r}}>`)) }, Qc = /^(?:[ \t]*(?:\n|$))+/, Jc = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, th = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Qe = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, eh = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, jn = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Ao = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, No = G(Ao).replace(/bull/g, jn).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), ih = G(Ao).replace(/bull/g, jn).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Wn = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, nh = /^[^\n]+/, Vn = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, sh = G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Vn).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), rh = G(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, jn).getRegex(), Li = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Kn = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, oh = G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Kn).replace("tag", Li).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Io = G(Wn).replace("hr", Qe).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex(), ah = G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Io).getRegex(), Yn = { blockquote: ah, code: Jc, def: sh, fences: th, heading: eh, hr: Qe, html: oh, lheading: No, list: rh, newline: Qc, paragraph: Io, table: Jt, text: nh }, Xs = G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Qe).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex(), lh = { ...Yn, lheading: ih, table: Xs, paragraph: G(Wn).replace("hr", Qe).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Xs).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Li).getRegex() }, ch = { ...Yn, html: G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Kn).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Jt, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: G(Wn).replace("hr", Qe).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", No).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, hh = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, dh = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _o = /^( {2,}|\\)\n(?!\s*$)/, uh = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, xe = /[\p{P}\p{S}]/u, Di = /[\s\p{P}\p{S}]/u, Xn = /[^\s\p{P}\p{S}]/u, ph = G(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Di).getRegex(), Ro = /(?!~)[\p{P}\p{S}]/u, gh = /(?!~)[\s\p{P}\p{S}]/u, fh = /(?:[^\s\p{P}\p{S}]|~)/u, mh = G(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Zc ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Lo = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, vh = G(Lo, "u").replace(/punct/g, xe).getRegex(), yh = G(Lo, "u").replace(/punct/g, Ro).getRegex(), Do = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", bh = G(Do, "gu").replace(/notPunctSpace/g, Xn).replace(/punctSpace/g, Di).replace(/punct/g, xe).getRegex(), wh = G(Do, "gu").replace(/notPunctSpace/g, fh).replace(/punctSpace/g, gh).replace(/punct/g, Ro).getRegex(), kh = G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Xn).replace(/punctSpace/g, Di).replace(/punct/g, xe).getRegex(), Ch = G(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, xe).getRegex(), Eh = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", Sh = G(Eh, "gu").replace(/notPunctSpace/g, Xn).replace(/punctSpace/g, Di).replace(/punct/g, xe).getRegex(), xh = G(/\\(punct)/, "gu").replace(/punct/g, xe).getRegex(), Mh = G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Th = G(Kn).replace("(?:-->|$)", "-->").getRegex(), Ah = G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Th).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ci = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, Nh = G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", Ci).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Oo = G(/^!?\[(label)\]\[(ref)\]/).replace("label", Ci).replace("ref", Vn).getRegex(), Fo = G(/^!?\[(ref)\](?:\[\])?/).replace("ref", Vn).getRegex(), Ih = G("reflink|nolink(?!\\()", "g").replace("reflink", Oo).replace("nolink", Fo).getRegex(), Zs = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Zn = { _backpedal: Jt, anyPunctuation: xh, autolink: Mh, blockSkip: mh, br: _o, code: dh, del: Jt, delLDelim: Jt, delRDelim: Jt, emStrongLDelim: vh, emStrongRDelimAst: bh, emStrongRDelimUnd: kh, escape: hh, link: Nh, nolink: Fo, punctuation: ph, reflink: Oo, reflinkSearch: Ih, tag: Ah, text: uh, url: Jt }, _h = { ...Zn, link: G(/^!?\[(label)\]\((.*?)\)/).replace("label", Ci).getRegex(), reflink: G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ci).getRegex() }, xn = { ...Zn, emStrongRDelimAst: wh, emStrongLDelim: yh, delLDelim: Ch, delRDelim: Sh, url: G(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Zs).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: G(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Zs).getRegex() }, Rh = { ...xn, br: G(_o).replace("{2,}", "*").getRegex(), text: G(xn.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, hi = { normal: Yn, gfm: lh, pedantic: ch }, De = { normal: Zn, gfm: xn, breaks: Rh, pedantic: _h }, Lh = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Qs = (r) => Lh[r];
function Gt(r, e) {
  if (e) {
    if (Et.escapeTest.test(r)) return r.replace(Et.escapeReplace, Qs);
  } else if (Et.escapeTestNoEncode.test(r)) return r.replace(Et.escapeReplaceNoEncode, Qs);
  return r;
}
function Js(r) {
  try {
    r = encodeURI(r).replace(Et.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function tr(r, e) {
  var s;
  let t = r.replace(Et.findPipe, (o, a, l) => {
    let h = !1, d = a;
    for (; --d >= 0 && l[d] === "\\"; ) h = !h;
    return h ? "|" : " |";
  }), i = t.split(Et.splitPipe), n = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !((s = i.at(-1)) != null && s.trim()) && i.pop(), e) if (i.length > e) i.splice(e);
  else for (; i.length < e; ) i.push("");
  for (; n < i.length; n++) i[n] = i[n].trim().replace(Et.slashPipe, "|");
  return i;
}
function Yt(r, e, t) {
  let i = r.length;
  if (i === 0) return "";
  let n = 0;
  for (; n < i && r.charAt(i - n - 1) === e; )
    n++;
  return r.slice(0, i - n);
}
function er(r) {
  let e = r.split(`
`), t = e.length - 1;
  for (; t >= 0 && Et.blankLine.test(e[t]); ) t--;
  return e.length - t <= 2 ? r : e.slice(0, t + 1).join(`
`);
}
function Dh(r, e) {
  if (r.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let i = 0; i < r.length; i++) if (r[i] === "\\") i++;
  else if (r[i] === e[0]) t++;
  else if (r[i] === e[1] && (t--, t < 0)) return i;
  return t > 0 ? -2 : -1;
}
function Oh(r, e = 0) {
  let t = e, i = "";
  for (let n of r) if (n === "	") {
    let s = 4 - t % 4;
    i += " ".repeat(s), t += s;
  } else i += n, t++;
  return i;
}
function ir(r, e, t, i, n) {
  let s = e.href, o = e.title || null, a = r[1].replace(n.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let l = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: t, href: s, title: o, text: a, tokens: i.inlineTokens(a) };
  return i.state.inLink = !1, l;
}
function Fh(r, e, t) {
  let i = r.match(t.other.indentCodeCompensation);
  if (i === null) return e;
  let n = i[1];
  return e.split(`
`).map((s) => {
    let o = s.match(t.other.beginningSpace);
    if (o === null) return s;
    let [a] = o;
    return a.length >= n.length ? s.slice(n.length) : s;
  }).join(`
`);
}
var Ei = class {
  constructor(r) {
    c(this, "options");
    c(this, "rules");
    c(this, "lexer");
    this.options = r || se;
  }
  space(r) {
    let e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    let e = this.rules.block.code.exec(r);
    if (e) {
      let t = this.options.pedantic ? e[0] : er(e[0]), i = t.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t, codeBlockStyle: "indented", text: i };
    }
  }
  fences(r) {
    let e = this.rules.block.fences.exec(r);
    if (e) {
      let t = e[0], i = Fh(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: i };
    }
  }
  heading(r) {
    let e = this.rules.block.heading.exec(r);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let i = Yt(t, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (t = i.trim());
      }
      return { type: "heading", raw: Yt(e[0], `
`), depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(r) {
    let e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: Yt(e[0], `
`) };
  }
  blockquote(r) {
    let e = this.rules.block.blockquote.exec(r);
    if (e) {
      let t = Yt(e[0], `
`).split(`
`), i = "", n = "", s = [];
      for (; t.length > 0; ) {
        let o = !1, a = [], l;
        for (l = 0; l < t.length; l++) if (this.rules.other.blockquoteStart.test(t[l])) a.push(t[l]), o = !0;
        else if (!o) a.push(t[l]);
        else break;
        t = t.slice(l);
        let h = a.join(`
`), d = h.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${h}` : h, n = n ? `${n}
${d}` : d;
        let u = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, s, !0), this.lexer.state.top = u, t.length === 0) break;
        let p = s.at(-1);
        if ((p == null ? void 0 : p.type) === "code") break;
        if ((p == null ? void 0 : p.type) === "blockquote") {
          let g = p, f = g.raw + `
` + t.join(`
`), v = this.blockquote(f);
          s[s.length - 1] = v, i = i.substring(0, i.length - g.raw.length) + v.raw, n = n.substring(0, n.length - g.text.length) + v.text;
          break;
        } else if ((p == null ? void 0 : p.type) === "list") {
          let g = p, f = g.raw + `
` + t.join(`
`), v = this.list(f);
          s[s.length - 1] = v, i = i.substring(0, i.length - p.raw.length) + v.raw, n = n.substring(0, n.length - g.raw.length) + v.raw, t = f.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: s, text: n };
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let t = e[1].trim(), i = t.length > 1, n = { type: "list", raw: "", ordered: i, start: i ? +t.slice(0, -1) : "", loose: !1, items: [] };
      t = i ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = i ? t : "[*+-]");
      let s = this.rules.other.listItemRegex(t), o = !1;
      for (; r; ) {
        let l = !1, h = "", d = "";
        if (!(e = s.exec(r)) || this.rules.block.hr.test(r)) break;
        h = e[0], r = r.substring(h.length);
        let u = Oh(e[2].split(`
`, 1)[0], e[1].length), p = r.split(`
`, 1)[0], g = !u.trim(), f = 0;
        if (this.options.pedantic ? (f = 2, d = u.trimStart()) : g ? f = e[1].length + 1 : (f = u.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, d = u.slice(f), f += e[1].length), g && this.rules.other.blankLine.test(p) && (h += p + `
`, r = r.substring(p.length + 1), l = !0), !l) {
          let v = this.rules.other.nextBulletRegex(f), y = this.rules.other.hrRegex(f), b = this.rules.other.fencesBeginRegex(f), k = this.rules.other.headingBeginRegex(f), S = this.rules.other.htmlBeginRegex(f), N = this.rules.other.blockquoteBeginRegex(f);
          for (; r; ) {
            let L = r.split(`
`, 1)[0], I;
            if (p = L, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), I = p) : I = p.replace(this.rules.other.tabCharGlobal, "    "), b.test(p) || k.test(p) || S.test(p) || N.test(p) || v.test(p) || y.test(p)) break;
            if (I.search(this.rules.other.nonSpaceChar) >= f || !p.trim()) d += `
` + I.slice(f);
            else {
              if (g || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || b.test(u) || k.test(u) || y.test(u)) break;
              d += `
` + p;
            }
            g = !p.trim(), h += L + `
`, r = r.substring(L.length + 1), u = I.slice(f);
          }
        }
        n.loose || (o ? n.loose = !0 : this.rules.other.doubleBlankLine.test(h) && (o = !0)), n.items.push({ type: "list_item", raw: h, task: !!this.options.gfm && this.rules.other.listIsTask.test(d), loose: !1, text: d, tokens: [] }), n.raw += h;
      }
      let a = n.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      n.raw = n.raw.trimEnd();
      for (let l of n.items) {
        this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []);
        let h = l.tokens[0];
        if (l.task && ((h == null ? void 0 : h.type) === "text" || (h == null ? void 0 : h.type) === "paragraph")) {
          l.text = l.text.replace(this.rules.other.listReplaceTask, ""), h.raw = h.raw.replace(this.rules.other.listReplaceTask, ""), h.text = h.text.replace(this.rules.other.listReplaceTask, "");
          for (let u = this.lexer.inlineQueue.length - 1; u >= 0; u--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)) {
            this.lexer.inlineQueue[u].src = this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let d = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (d) {
            let u = { type: "checkbox", raw: d[0] + " ", checked: d[0] !== "[ ]" };
            l.checked = u.checked, n.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = u.raw + l.tokens[0].raw, l.tokens[0].text = u.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(u)) : l.tokens.unshift({ type: "paragraph", raw: u.raw, text: u.raw, tokens: [u] }) : l.tokens.unshift(u);
          }
        } else l.task && (l.task = !1);
        if (!n.loose) {
          let d = l.tokens.filter((p) => p.type === "space"), u = d.length > 0 && d.some((p) => this.rules.other.anyLine.test(p.raw));
          n.loose = u;
        }
      }
      if (n.loose) for (let l of n.items) {
        l.loose = !0;
        for (let h of l.tokens) h.type === "text" && (h.type = "paragraph");
      }
      return n;
    }
  }
  html(r) {
    let e = this.rules.block.html.exec(r);
    if (e) {
      let t = er(e[0]);
      return { type: "html", block: !0, raw: t, pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: t };
    }
  }
  def(r) {
    let e = this.rules.block.def.exec(r);
    if (e) {
      let t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: Yt(e[0], `
`), href: i, title: n };
    }
  }
  table(r) {
    var o;
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = tr(e[1]), i = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (o = e[3]) != null && o.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: Yt(e[0], `
`), header: [], align: [], rows: [] };
    if (t.length === i.length) {
      for (let a of i) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < t.length; a++) s.header.push({ text: t[a], tokens: this.lexer.inline(t[a]), header: !0, align: s.align[a] });
      for (let a of n) s.rows.push(tr(a, s.header.length).map((l, h) => ({ text: l, tokens: this.lexer.inline(l), header: !1, align: s.align[h] })));
      return s;
    }
  }
  lheading(r) {
    let e = this.rules.block.lheading.exec(r);
    if (e) {
      let t = e[1].trim();
      return { type: "heading", raw: Yt(e[0], `
`), depth: e[2].charAt(0) === "=" ? 1 : 2, text: t, tokens: this.lexer.inline(t) };
    }
  }
  paragraph(r) {
    let e = this.rules.block.paragraph.exec(r);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(r) {
    let e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    let e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    let e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(r) {
    let e = this.rules.inline.link.exec(r);
    if (e) {
      let t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        let s = Yt(t.slice(0, -1), "\\");
        if ((t.length - s.length) % 2 === 0) return;
      } else {
        let s = Dh(e[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let o = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + s;
          e[2] = e[2].substring(0, s), e[0] = e[0].substring(0, o).trim(), e[3] = "";
        }
      }
      let i = e[2], n = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(i);
        s && (i = s[1], n = s[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? i = i.slice(1) : i = i.slice(1, -1)), ir(e, { href: i && i.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(r)) || (t = this.rules.inline.nolink.exec(r))) {
      let i = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = e[i.toLowerCase()];
      if (!n) {
        let s = t[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return ir(t, n, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let i = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(i[1] || i[3]) || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...i[0]].length - 1, s, o, a = n, l = 0, h = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (h.lastIndex = 0, e = e.slice(-1 * r.length + n); (i = h.exec(e)) !== null; ) {
        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s) continue;
        if (o = [...s].length, i[3] || i[4]) {
          a += o;
          continue;
        } else if ((i[5] || i[6]) && n % 3 && !((n + o) % 3)) {
          l += o;
          continue;
        }
        if (a -= o, a > 0) continue;
        o = Math.min(o, o + a + l);
        let d = [...i[0]][0].length, u = r.slice(0, n + i.index + d + o);
        if (Math.min(n, o) % 2) {
          let g = u.slice(1, -1);
          return { type: "em", raw: u, text: g, tokens: this.lexer.inlineTokens(g) };
        }
        let p = u.slice(2, -2);
        return { type: "strong", raw: u, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  codespan(r) {
    let e = this.rules.inline.code.exec(r);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(t), n = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return i && n && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(r) {
    let e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r, e, t = "") {
    let i = this.rules.inline.delLDelim.exec(r);
    if (i && (!i[1] || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...i[0]].length - 1, s, o, a = n, l = this.rules.inline.delRDelim;
      for (l.lastIndex = 0, e = e.slice(-1 * r.length + n); (i = l.exec(e)) !== null; ) {
        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s || (o = [...s].length, o !== n)) continue;
        if (i[3] || i[4]) {
          a += o;
          continue;
        }
        if (a -= o, a > 0) continue;
        o = Math.min(o, o + a);
        let h = [...i[0]][0].length, d = r.slice(0, n + i.index + h + o), u = d.slice(n, -n);
        return { type: "del", raw: d, text: u, tokens: this.lexer.inlineTokens(u) };
      }
    }
  }
  autolink(r) {
    let e = this.rules.inline.autolink.exec(r);
    if (e) {
      let t, i;
      return e[2] === "@" ? (t = e[1], i = "mailto:" + t) : (t = e[1], i = t), { type: "link", raw: e[0], text: t, href: i, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(r) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let i, n;
      if (e[2] === "@") i = e[0], n = "mailto:" + i;
      else {
        let s;
        do
          s = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (s !== e[0]);
        i = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: i, href: n, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  inlineText(r) {
    let e = this.rules.inline.text.exec(r);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, Dt = class Mn {
  constructor(e) {
    c(this, "tokens");
    c(this, "options");
    c(this, "state");
    c(this, "inlineQueue");
    c(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || se, this.options.tokenizer = this.options.tokenizer || new Ei(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: Et, block: hi.normal, inline: De.normal };
    this.options.pedantic ? (t.block = hi.pedantic, t.inline = De.pedantic) : this.options.gfm && (t.block = hi.gfm, this.options.breaks ? t.inline = De.breaks : t.inline = De.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: hi, inline: De };
  }
  static lex(e, t) {
    return new Mn(t).lex(e);
  }
  static lexInline(e, t) {
    return new Mn(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(Et.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let i = this.inlineQueue[t];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], i = !1) {
    var s, o, a;
    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(Et.tabCharGlobal, "    ").replace(Et.spaceLine, ""));
    let n = 1 / 0;
    for (; e; ) {
      if (e.length < n) n = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      let l;
      if ((o = (s = this.options.extensions) == null ? void 0 : s.block) != null && o.some((d) => (l = d.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        let d = t.at(-1);
        l.raw.length === 1 && d !== void 0 ? d.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        let d = t.at(-1);
        (d == null ? void 0 : d.type) === "paragraph" || (d == null ? void 0 : d.type) === "text" ? (d.raw += (d.raw.endsWith(`
`) ? "" : `
`) + l.raw, d.text += `
` + l.text, this.inlineQueue.at(-1).src = d.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        let d = t.at(-1);
        (d == null ? void 0 : d.type) === "paragraph" || (d == null ? void 0 : d.type) === "text" ? (d.raw += (d.raw.endsWith(`
`) ? "" : `
`) + l.raw, d.text += `
` + l.raw, this.inlineQueue.at(-1).src = d.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = { href: l.href, title: l.title }, t.push(l));
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let h = e;
      if ((a = this.options.extensions) != null && a.startBlock) {
        let d = 1 / 0, u = e.slice(1), p;
        this.options.extensions.startBlock.forEach((g) => {
          p = g.call({ lexer: this }, u), typeof p == "number" && p >= 0 && (d = Math.min(d, p));
        }), d < 1 / 0 && d >= 0 && (h = e.substring(0, d + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(h))) {
        let d = t.at(-1);
        i && (d == null ? void 0 : d.type) === "paragraph" ? (d.raw += (d.raw.endsWith(`
`) ? "" : `
`) + l.raw, d.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = d.text) : t.push(l), i = h.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        let d = t.at(-1);
        (d == null ? void 0 : d.type) === "text" ? (d.raw += (d.raw.endsWith(`
`) ? "" : `
`) + l.raw, d.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = d.text) : t.push(l);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var h, d, u, p, g;
    this.tokenizer.lexer = this;
    let i = e, n = null;
    if (this.tokens.links) {
      let f = Object.keys(this.tokens.links);
      if (f.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(i)) !== null; ) f.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(i)) !== null; ) i = i.slice(0, n.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let s;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(i)) !== null; ) s = n[2] ? n[2].length : 0, i = i.slice(0, n.index + s) + "[" + "a".repeat(n[0].length - s - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    i = ((d = (h = this.options.hooks) == null ? void 0 : h.emStrongMask) == null ? void 0 : d.call({ lexer: this }, i)) ?? i;
    let o = !1, a = "", l = 1 / 0;
    for (; e; ) {
      if (e.length < l) l = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      o || (a = ""), o = !1;
      let f;
      if ((p = (u = this.options.extensions) == null ? void 0 : u.inline) != null && p.some((y) => (f = y.call({ lexer: this }, e, t)) ? (e = e.substring(f.raw.length), t.push(f), !0) : !1)) continue;
      if (f = this.tokenizer.escape(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.tag(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.link(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(f.raw.length);
        let y = t.at(-1);
        f.type === "text" && (y == null ? void 0 : y.type) === "text" ? (y.raw += f.raw, y.text += f.text) : t.push(f);
        continue;
      }
      if (f = this.tokenizer.emStrong(e, i, a)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.codespan(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.br(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.del(e, i, a)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (f = this.tokenizer.autolink(e)) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      if (!this.state.inLink && (f = this.tokenizer.url(e))) {
        e = e.substring(f.raw.length), t.push(f);
        continue;
      }
      let v = e;
      if ((g = this.options.extensions) != null && g.startInline) {
        let y = 1 / 0, b = e.slice(1), k;
        this.options.extensions.startInline.forEach((S) => {
          k = S.call({ lexer: this }, b), typeof k == "number" && k >= 0 && (y = Math.min(y, k));
        }), y < 1 / 0 && y >= 0 && (v = e.substring(0, y + 1));
      }
      if (f = this.tokenizer.inlineText(v)) {
        e = e.substring(f.raw.length), f.raw.slice(-1) !== "_" && (a = f.raw.slice(-1)), o = !0;
        let y = t.at(-1);
        (y == null ? void 0 : y.type) === "text" ? (y.raw += f.raw, y.text += f.text) : t.push(f);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return t;
  }
  infiniteLoopError(e) {
    let t = "Infinite loop on byte: " + e;
    if (this.options.silent) console.error(t);
    else throw new Error(t);
  }
}, Si = class {
  constructor(r) {
    c(this, "options");
    c(this, "parser");
    this.options = r || se;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    var s;
    let i = (s = (e || "").match(Et.notSpaceStart)) == null ? void 0 : s[0], n = r.replace(Et.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + Gt(i) + '">' + (t ? n : Gt(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : Gt(n, !0)) + `</code></pre>
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
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let e = r.ordered, t = r.start, i = "";
    for (let o = 0; o < r.items.length; o++) {
      let a = r.items[o];
      i += this.listitem(a);
    }
    let n = e ? "ol" : "ul", s = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + n + s + `>
` + i + "</" + n + `>
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
    let e = "", t = "";
    for (let n = 0; n < r.header.length; n++) t += this.tablecell(r.header[n]);
    e += this.tablerow({ text: t });
    let i = "";
    for (let n = 0; n < r.rows.length; n++) {
      let s = r.rows[n];
      t = "";
      for (let o = 0; o < s.length; o++) t += this.tablecell(s[o]);
      i += this.tablerow({ text: t });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let e = this.parser.parseInline(r.tokens), t = r.header ? "th" : "td";
    return (r.align ? `<${t} align="${r.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${Gt(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: t }) {
    let i = this.parser.parseInline(t), n = Js(r);
    if (n === null) return i;
    r = n;
    let s = '<a href="' + r + '"';
    return e && (s += ' title="' + Gt(e) + '"'), s += ">" + i + "</a>", s;
  }
  image({ href: r, title: e, text: t, tokens: i }) {
    i && (t = this.parser.parseInline(i, this.parser.textRenderer));
    let n = Js(r);
    if (n === null) return Gt(t);
    r = n;
    let s = `<img src="${r}" alt="${Gt(t)}"`;
    return e && (s += ` title="${Gt(e)}"`), s += ">", s;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : Gt(r.text);
  }
}, Qn = class {
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
}, Ot = class Tn {
  constructor(e) {
    c(this, "options");
    c(this, "renderer");
    c(this, "textRenderer");
    this.options = e || se, this.options.renderer = this.options.renderer || new Si(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Qn();
  }
  static parse(e, t) {
    return new Tn(t).parse(e);
  }
  static parseInline(e, t) {
    return new Tn(t).parseInline(e);
  }
  parse(e) {
    var i, n;
    this.renderer.parser = this;
    let t = "";
    for (let s = 0; s < e.length; s++) {
      let o = e[s];
      if ((n = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && n[o.type]) {
        let l = o, h = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (h !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(l.type)) {
          t += h || "";
          continue;
        }
      }
      let a = o;
      switch (a.type) {
        case "space": {
          t += this.renderer.space(a);
          break;
        }
        case "hr": {
          t += this.renderer.hr(a);
          break;
        }
        case "heading": {
          t += this.renderer.heading(a);
          break;
        }
        case "code": {
          t += this.renderer.code(a);
          break;
        }
        case "table": {
          t += this.renderer.table(a);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(a);
          break;
        }
        case "list": {
          t += this.renderer.list(a);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(a);
          break;
        }
        case "html": {
          t += this.renderer.html(a);
          break;
        }
        case "def": {
          t += this.renderer.def(a);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(a);
          break;
        }
        case "text": {
          t += this.renderer.text(a);
          break;
        }
        default: {
          let l = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    var n, s;
    this.renderer.parser = this;
    let i = "";
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      if ((s = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && s[a.type]) {
        let h = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (h !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          i += h || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "escape": {
          i += t.text(l);
          break;
        }
        case "html": {
          i += t.html(l);
          break;
        }
        case "link": {
          i += t.link(l);
          break;
        }
        case "image": {
          i += t.image(l);
          break;
        }
        case "checkbox": {
          i += t.checkbox(l);
          break;
        }
        case "strong": {
          i += t.strong(l);
          break;
        }
        case "em": {
          i += t.em(l);
          break;
        }
        case "codespan": {
          i += t.codespan(l);
          break;
        }
        case "br": {
          i += t.br(l);
          break;
        }
        case "del": {
          i += t.del(l);
          break;
        }
        case "text": {
          i += t.text(l);
          break;
        }
        default: {
          let h = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(h), "";
          throw new Error(h);
        }
      }
    }
    return i;
  }
}, fi, Ge = (fi = class {
  constructor(r) {
    c(this, "options");
    c(this, "block");
    this.options = r || se;
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
    return r ? Dt.lex : Dt.lexInline;
  }
  provideParser(r = this.block) {
    return r ? Ot.parse : Ot.parseInline;
  }
}, c(fi, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), c(fi, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), fi), Ph = class {
  constructor(...r) {
    c(this, "defaults", qn());
    c(this, "options", this.setOptions);
    c(this, "parse", this.parseMarkdown(!0));
    c(this, "parseInline", this.parseMarkdown(!1));
    c(this, "Parser", Ot);
    c(this, "Renderer", Si);
    c(this, "TextRenderer", Qn);
    c(this, "Lexer", Dt);
    c(this, "Tokenizer", Ei);
    c(this, "Hooks", Ge);
    this.use(...r);
  }
  walkTokens(r, e) {
    var i, n;
    let t = [];
    for (let s of r) switch (t = t.concat(e.call(this, s)), s.type) {
      case "table": {
        let o = s;
        for (let a of o.header) t = t.concat(this.walkTokens(a.tokens, e));
        for (let a of o.rows) for (let l of a) t = t.concat(this.walkTokens(l.tokens, e));
        break;
      }
      case "list": {
        let o = s;
        t = t.concat(this.walkTokens(o.items, e));
        break;
      }
      default: {
        let o = s;
        (n = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && n[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
          let l = o[a].flat(1 / 0);
          t = t.concat(this.walkTokens(l, e));
        }) : o.tokens && (t = t.concat(this.walkTokens(o.tokens, e)));
      }
    }
    return t;
  }
  use(...r) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((t) => {
      let i = { ...t };
      if (i.async = this.defaults.async || i.async || !1, t.extensions && (t.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let s = e.renderers[n.name];
          s ? e.renderers[n.name] = function(...o) {
            let a = n.renderer.apply(this, o);
            return a === !1 && (a = s.apply(this, o)), a;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = e[n.level];
          s ? s.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), i.extensions = e), t.renderer) {
        let n = this.defaults.renderer || new Si(this.defaults);
        for (let s in t.renderer) {
          if (!(s in n)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let o = s, a = t.renderer[o], l = n[o];
          n[o] = (...h) => {
            let d = a.apply(n, h);
            return d === !1 && (d = l.apply(n, h)), d || "";
          };
        }
        i.renderer = n;
      }
      if (t.tokenizer) {
        let n = this.defaults.tokenizer || new Ei(this.defaults);
        for (let s in t.tokenizer) {
          if (!(s in n)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let o = s, a = t.tokenizer[o], l = n[o];
          n[o] = (...h) => {
            let d = a.apply(n, h);
            return d === !1 && (d = l.apply(n, h)), d;
          };
        }
        i.tokenizer = n;
      }
      if (t.hooks) {
        let n = this.defaults.hooks || new Ge();
        for (let s in t.hooks) {
          if (!(s in n)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let o = s, a = t.hooks[o], l = n[o];
          Ge.passThroughHooks.has(s) ? n[o] = (h) => {
            if (this.defaults.async && Ge.passThroughHooksRespectAsync.has(s)) return (async () => {
              let u = await a.call(n, h);
              return l.call(n, u);
            })();
            let d = a.call(n, h);
            return l.call(n, d);
          } : n[o] = (...h) => {
            if (this.defaults.async) return (async () => {
              let u = await a.apply(n, h);
              return u === !1 && (u = await l.apply(n, h)), u;
            })();
            let d = a.apply(n, h);
            return d === !1 && (d = l.apply(n, h)), d;
          };
        }
        i.hooks = n;
      }
      if (t.walkTokens) {
        let n = this.defaults.walkTokens, s = t.walkTokens;
        i.walkTokens = function(o) {
          let a = [];
          return a.push(s.call(this, o)), n && (a = a.concat(n.call(this, o))), a;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return Dt.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return Ot.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, t) => {
      let i = { ...t }, n = { ...this.defaults, ...i }, s = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && i.async === !1) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = r), n.async) return (async () => {
        let o = n.hooks ? await n.hooks.preprocess(e) : e, a = await (n.hooks ? await n.hooks.provideLexer(r) : r ? Dt.lex : Dt.lexInline)(o, n), l = n.hooks ? await n.hooks.processAllTokens(a) : a;
        n.walkTokens && await Promise.all(this.walkTokens(l, n.walkTokens));
        let h = await (n.hooks ? await n.hooks.provideParser(r) : r ? Ot.parse : Ot.parseInline)(l, n);
        return n.hooks ? await n.hooks.postprocess(h) : h;
      })().catch(s);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let o = (n.hooks ? n.hooks.provideLexer(r) : r ? Dt.lex : Dt.lexInline)(e, n);
        n.hooks && (o = n.hooks.processAllTokens(o)), n.walkTokens && this.walkTokens(o, n.walkTokens);
        let a = (n.hooks ? n.hooks.provideParser(r) : r ? Ot.parse : Ot.parseInline)(o, n);
        return n.hooks && (a = n.hooks.postprocess(a)), a;
      } catch (o) {
        return s(o);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let i = "<p>An error occurred:</p><pre>" + Gt(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(i) : i;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, ie = new Ph();
function j(r, e) {
  return ie.parse(r, e);
}
j.options = j.setOptions = function(r) {
  return ie.setOptions(r), j.defaults = ie.defaults, To(j.defaults), j;
};
j.getDefaults = qn;
j.defaults = se;
j.use = function(...r) {
  return ie.use(...r), j.defaults = ie.defaults, To(j.defaults), j;
};
j.walkTokens = function(r, e) {
  return ie.walkTokens(r, e);
};
j.parseInline = ie.parseInline;
j.Parser = Ot;
j.parser = Ot.parse;
j.Renderer = Si;
j.TextRenderer = Qn;
j.Lexer = Dt;
j.lexer = Dt.lex;
j.Tokenizer = Ei;
j.Hooks = Ge;
j.parse = j;
j.options;
j.setOptions;
j.use;
j.walkTokens;
j.parseInline;
Ot.parse;
Dt.lex;
const Bh = {
  extensions: [
    {
      name: "node-reference",
      level: "inline",
      start(r) {
        var e;
        return (e = r.match(/\[\[/)) == null ? void 0 : e.index;
      },
      tokenizer(r) {
        const e = /^\[\[([^[\]]+)\]\]/.exec(r);
        if (e)
          return {
            type: "node-reference",
            raw: e[0],
            nodeName: e[1].trim()
          };
      },
      renderer(r) {
        const { nodeName: e } = r, t = Ve(e);
        return `
                    <span
                        class="pvt-node-reference"
                        data-node-name="${t}"
                    >
                        ${t}
                    </span>
                `;
      }
    }
  ]
};
j.use(Bh);
function Hh(r) {
  const e = j.parse(r);
  return Dn.sanitize(e);
}
function zh(r) {
  const e = j.parseInline(r);
  return Dn.sanitize(e);
}
function $h(r, e) {
  r.addEventListener("click", (t) => {
    const n = t.target.closest(".pvt-node-reference.resolved");
    if (!n) return;
    const s = n.dataset.nodeId;
    if (!s) return;
    const o = e.getMutableNode(s);
    o && e.selectElement(o);
  }), r.addEventListener("mouseover", (t) => {
    const n = t.target.closest(".pvt-node-reference.resolved");
    if (!n) return;
    const s = n.dataset.nodeId;
    if (!s) return;
    const o = e.getMutableNode(s);
    o && e.highlightElement(o);
  }), r.addEventListener("mouseout", (t) => {
    t.target.closest(".pvt-node-reference.resolved") && e.clearHighlightedElements();
  });
}
function Po(r, e) {
  e && (r.style.setProperty("--pvt-note-node-reference-dot", e), r.style.setProperty("--pvt-note-node-reference-bg", `color-mix(in oklab, ${e} 30%, white)`), r.style.setProperty("border-color", `color-mix(in srgb, ${e} 45%, transparent)`));
}
function Bo(r, e) {
  r.querySelectorAll(".pvt-node-reference").forEach((i) => {
    const n = i.dataset.nodeName;
    if (!n) return;
    const s = Gc(n, e.getMutableNodes(), e.UIManager.getOptions().mainHeader);
    if (!s) {
      i.classList.add("unresolved"), i.title = "Could not resolve node";
      return;
    }
    const o = ot(s, e.UIManager.getOptions().mainHeader).trim();
    i.textContent = o, i.dataset.nodeId = s.id, i.classList.add("resolved");
    const a = e.renderer.getNodeStyle(s).color;
    Po(i, a);
  });
}
class Gh {
  constructor(e) {
    c(this, "graph");
    this.graph = e;
  }
  render(e, t) {
    const i = Hh(e.content);
    t.innerHTML = i, Bo(
      t,
      this.graph
    ), $h(
      t,
      this.graph
    );
  }
}
class it {
  constructor(e) {
    c(this, "uiManager");
    c(this, "children", []);
    c(this, "disposables", []);
    this.uiManager = e;
  }
  /* ---------- subclass hooks (override as needed) ---------- */
  /** Build DOM and append it to `container`. Runs during {@link mount}. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMount(e) {
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
  mount(e) {
    this.onMount(e);
  }
  afterMount() {
    this.onAfterMount();
    for (const e of this.children) e.afterMount();
  }
  graphReady() {
    this.onGraphReady();
    for (const e of this.children) e.graphReady();
  }
  destroy() {
    for (const e of [...this.children].reverse()) e.destroy();
    for (this.children.length = 0; this.disposables.length; ) this.disposables.pop()();
    this.onDestroy();
  }
  /* ---------- helpers for subclasses ---------- */
  /**
   * Register a child component. When `slot` is provided the child is mounted
   * into it immediately; its remaining phases are then driven by this
   * component's own {@link afterMount} / {@link graphReady} / {@link destroy}.
   */
  addChild(e, t) {
    return this.children.push(e), t !== void 0 && e.mount(t), e;
  }
  /** Register a teardown fn run (LIFO) on {@link destroy}. */
  track(e) {
    this.disposables.push(e);
  }
  /**
   * Subscribe to the graph interaction bus and auto-unsubscribe on
   * {@link destroy}. Use instead of `getGraphInteraction().on(...)` so the
   * handler doesn't outlive the component.
   */
  trackInteraction(e, t) {
    const i = this.uiManager.graph.renderer.getGraphInteraction();
    i.on(e, t), this.track(() => i.off(e, t));
  }
  /** Add a DOM listener that is automatically removed on {@link destroy}. */
  listen(e, t, i, n) {
    e.addEventListener(t, i, n), this.track(() => e.removeEventListener(t, i, n));
  }
}
const Jn = "http://www.w3.org/2000/svg", Ho = "http://www.w3.org/1999/xlink", Uh = 32, qh = "pvt-node-preview-icon", jh = "image.node-content", Wh = [
  "pvt-node-selected-highlight",
  "pvt-node-selected-highlight-shadow",
  "pvt-node-highlighted"
], Vh = "text.pvt-node-label";
function Kh(r, e) {
  const t = e.ownerSVGElement;
  if (!t) return r.getBBox();
  t.appendChild(r);
  const i = r.getBBox();
  return t.removeChild(r), i;
}
function Yh(r, e, t) {
  var o, a;
  const i = r.cloneNode(!0);
  t && i.classList.remove(...Wh), (a = (o = i.querySelector(Vh)) == null ? void 0 : o.parentElement) == null || a.remove();
  const n = Kh(i, r), s = e / Math.max(n.width, n.height);
  return i.setAttribute(
    "transform",
    `translate(${(e - n.width * s) / 2 - n.x * s}, ${(e - n.height * s) / 2 - n.y * s}) scale(${s})`
  ), i;
}
function xi(r) {
  var i;
  const e = r instanceof SVGGElement ? r : (r == null ? void 0 : r.getGraphElement()) ?? null;
  if (!(e instanceof SVGGElement)) return null;
  const t = e.querySelector(jh);
  return t ? t.getAttributeNS(Ho, "href") ?? t.getAttribute("href") ?? ((i = t.href) == null ? void 0 : i.baseVal) ?? null : null;
}
function Xh(r) {
  const e = document.createElement("div");
  return e.innerHTML = r, e.querySelector("svg");
}
function Zh() {
  const r = w("div", { class: "pvt-image-unavailable__icon" });
  r.innerHTML = $n;
  const e = w("div", { class: "pvt-image-unavailable__label" }, ["Image unavailable"]);
  return w("div", { class: "pvt-image-unavailable" }, [r, e]);
}
function zo(r) {
  r.addEventListener("error", () => r.replaceWith(Zh()), { once: !0 });
}
function Qh(r) {
  const e = document.createElementNS(Jn, "g");
  e.setAttribute("class", "pvt-node-preview-image-fallback");
  const t = Xh($n);
  if (t) {
    const i = r * 0.6, n = (r - i) / 2;
    t.setAttribute("x", n.toString()), t.setAttribute("y", n.toString()), t.setAttribute("width", i.toString()), t.setAttribute("height", i.toString()), e.appendChild(t);
  }
  return e;
}
function Jh(r, e) {
  const t = document.createElementNS(Jn, "image");
  return t.setAttribute("class", "pvt-node-preview-image"), t.setAttribute("x", "0"), t.setAttribute("y", "0"), t.setAttribute("width", e.toString()), t.setAttribute("height", e.toString()), t.setAttribute("preserveAspectRatio", "xMidYMid meet"), t.setAttributeNS(Ho, "href", r), t.setAttribute("href", r), t.addEventListener("error", () => t.replaceWith(Qh(e)), { once: !0 }), t;
}
function re(r, e = {}) {
  const t = e.size ?? Uh, i = e.className ?? qh, n = e.removeSelectionHighlight ?? !1, s = document.createElementNS(Jn, "svg");
  s.setAttribute("class", i), s.setAttribute("width", t.toString()), s.setAttribute("height", t.toString()), s.setAttribute("viewBox", `0 0 ${t} ${t}`), s.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const o = r instanceof SVGGElement ? r : (r == null ? void 0 : r.getGraphElement()) ?? null;
  if (o instanceof SVGGElement) {
    const a = xi(o);
    s.appendChild(a ? Jh(a, t) : Yh(o, t, n));
  }
  return s;
}
class td extends it {
  constructor(t, i) {
    super(t);
    c(this, "title");
    c(this, "searchBox");
    c(this, "searchInput");
    c(this, "searchResultsContainer");
    c(this, "searchSummaryContainer");
    c(this, "results");
    c(this, "highlightedIndex", 0);
    c(this, "MAX_RESULT_COUNT", 12);
    this.title = i;
  }
  onMount(t) {
    t && (this.searchBox = this.build(), t.appendChild(this.searchBox));
  }
  build() {
    var n, s;
    const t = document.createElement("template");
    t.innerHTML = `
  <div id="pvt-searchbox" class="pvt-searchbox">
    <div class="search-container">
        <div class="pvt-title-container"></div>
        <div class="input-container">
            <span class="icon-container">${Pn}</span>
            <input id="pvt-search-input" type="text" name="pvt-search" placeholder="Search" class="search-text" autocomplete="off" />
        </div>
    </div>
    <div class="pvt-search-results"></div>
    <div class="pvt-search-summary"></div>
    <div class="pvt-search-hints">
        <span>
            <span class="pvt-search-icon">${yo}</span>
            <span class="pvt-search-icon">${Ni}</span>
            <span class="pvt-search-text">to navigate</span>
        </span>
        <span>
            <span class="pvt-search-icon">${hc}</span>
            <span class="pvt-search-text">to select</span>
        </span>
        <span>
            <span class="pvt-search-icon">esc</span>
            <span class="pvt-search-text">to close</span>
        </span>
    </div>
  </div>
`, this.searchBox = t.content.firstElementChild, this.searchInput = this.searchBox.querySelector("#pvt-search-input") ?? void 0, this.searchResultsContainer = this.searchBox.querySelector(".pvt-search-results") ?? void 0, this.searchSummaryContainer = this.searchBox.querySelector(".pvt-search-summary") ?? void 0;
    const i = this.searchBox.querySelector(".pvt-title-container");
    return this.title && i && (this.title instanceof HTMLElement ? i.appendChild(this.title) : i.textContent = this.title), (n = this.searchInput) == null || n.addEventListener("input", () => {
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
            const h = (l = this.searchResultsContainer) == null ? void 0 : l.children[this.highlightedIndex];
            h == null || h.click();
          }
          break;
      }
    }), this.searchBox;
  }
  onDestroy() {
    var t;
    (t = this.searchBox) == null || t.remove(), this.searchBox = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  buildResult(t) {
    const n = document.createElement("template");
    n.innerHTML = `
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
    const s = t[0], o = t[1], a = n.content.firstElementChild, l = a.querySelector(".pvt-search-result__nodepreview") ?? void 0, h = a.querySelector(".pvt-search-result__name") ?? void 0, d = a.querySelector(".pvt-search-result__info_key") ?? void 0, u = a.querySelector(".pvt-search-result__info_value") ?? void 0;
    return a.addEventListener("click", () => {
      this.clickHandler(s);
    }), l == null || l.appendChild(re(s, { size: 30 })), h.textContent = ot(s, this.uiManager.getOptions().mainHeader), d.textContent = `.${o.key}: `, u.textContent = o.value, a;
  }
  updateHighlight() {
    !this.results || !this.searchResultsContainer || this.results.forEach((t, i) => {
      var s;
      const n = (s = this.searchResultsContainer) == null ? void 0 : s.children[i];
      n && (i === this.highlightedIndex ? n.classList.add("active") : n.classList.remove("active"));
    });
  }
  search(t) {
    const i = [], n = t.trim().toLowerCase();
    if (!(!n || n.length < 2)) {
      for (const s of this.uiManager.graph.getMutableNodes()) {
        const o = s.getData();
        for (const a in o) {
          const l = o[a];
          if (l == null) continue;
          const h = String(l).toLowerCase();
          let d = n.startsWith('"') ? n.slice(1) : n;
          const u = n.startsWith('"') && n.endsWith('"');
          if (u && (d = d.slice(0, -1).trim()), u ? h === d : h.includes(d)) {
            const g = { key: a, value: String(l) };
            i.push([s, g]);
            break;
          }
        }
      }
      return i;
    }
  }
  clickHandler(t) {
    this.dispatchEvent("pvt-searchbox-select", t);
  }
  searchAndShowResults(t) {
    if (!(!this.searchResultsContainer || !this.searchSummaryContainer) && (this.results = void 0, this.searchResultsContainer.innerHTML = "", this.searchSummaryContainer.innerHTML = "", this.results = this.search(t), this.results)) {
      const i = [];
      for (const n of this.results) {
        if (i.length >= this.MAX_RESULT_COUNT) break;
        i.push(this.buildResult(n));
      }
      i.forEach((n) => {
        var s;
        (s = this.searchResultsContainer) == null || s.appendChild(n);
      }), this.searchSummaryContainer.appendChild(this.createSummary());
    }
  }
  createSummary() {
    if (!this.results) return document.createElement("div");
    let t = "";
    this.results.length === 0 ? t = "No results found" : this.results.length > this.MAX_RESULT_COUNT ? t = `Showing top ${this.MAX_RESULT_COUNT} of ${this.results.length} results` : t = `${this.results.length} results`;
    const i = document.createElement("template");
    return i.innerHTML = `
  <div>
    ${t}
  </div>
`, i.content.firstElementChild;
  }
  dispatchEvent(t, i) {
    if (!this.searchBox) return;
    const n = new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      cancelable: !0
    });
    this.searchBox.dispatchEvent(n);
  }
}
function ts(r, e) {
  return new Promise((t) => {
    var n, s;
    const i = r.createModal({
      body: "",
      buttons: null,
      position: "top",
      size: "xl",
      noBodyPadding: !0
    });
    if (!i) {
      t(null);
      return;
    }
    (n = i.modal) == null || n.addEventListener("pvt-modal-show", () => {
      var a, l, h;
      const o = new td(r, e);
      i.setBody(o.build()), (a = o.searchInput) == null || a.focus(), (l = o.searchBox) == null || l.addEventListener(
        "pvt-searchbox-select",
        (d) => {
          t(d.detail), i.destroy();
        }
      ), (h = o.searchBox) == null || h.addEventListener(
        "pvt-searchbox-close",
        () => {
          t(null), i.destroy();
        }
      );
    }), (s = i.modal) == null || s.addEventListener(
      "pvt-modal-hidden",
      () => {
        t(null);
      }
    );
  });
}
class ed {
  constructor(e, t) {
    c(this, "field");
    c(this, "config");
    c(this, "dropdown");
    c(this, "isOpen", !1);
    c(this, "items", []);
    c(this, "highlightedIndex", 0);
    /** Index in the field value right after the trigger — the start of the replaceable query. */
    c(this, "queryStart", -1);
    /** Guards async source results against a newer keystroke landing first. */
    c(this, "requestToken", 0);
    // -------------------------------------------------------------------------
    // Field events
    // -------------------------------------------------------------------------
    c(this, "onInput", () => {
      const e = this.findActiveQuery();
      if (!e || e.query.length < this.config.minQueryLength) {
        this.close();
        return;
      }
      this.queryStart = e.start;
      const t = ++this.requestToken;
      Promise.resolve(this.config.source(e.query)).then((i) => {
        if (t === this.requestToken) {
          if (!this.findActiveQuery()) {
            this.close();
            return;
          }
          if (this.items = i.slice(0, this.config.maxResults), this.items.length === 0) {
            this.close();
            return;
          }
          this.highlightedIndex = 0, this.renderItems(e.query), this.open();
        }
      });
    });
    c(this, "onBlur", () => {
      this.close();
    });
    c(this, "onKeyDown", (e) => {
      if (!(!this.isOpen || document.activeElement !== this.field))
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault(), e.stopPropagation(), this.move(1);
            break;
          case "ArrowUp":
            e.preventDefault(), e.stopPropagation(), this.move(-1);
            break;
          case "Enter":
          case "Tab":
            e.preventDefault(), e.stopPropagation(), this.select(this.highlightedIndex);
            break;
          case "Escape":
            e.preventDefault(), e.stopPropagation(), this.close();
            break;
        }
    });
    c(this, "onOutsidePointerDown", (e) => {
      const t = e.target;
      !this.dropdown.contains(t) && t !== this.field && this.close();
    });
    /** Anchor the dropdown just under the caret, in screen space, flipping up near the viewport edge. */
    c(this, "reposition", () => {
      if (!this.isOpen) return;
      const e = this.field.getBoundingClientRect(), t = this.field.offsetWidth ? e.width / this.field.offsetWidth : 1, i = this.field.offsetHeight ? e.height / this.field.offsetHeight : 1, n = nd(this.field, this.field.selectionStart ?? 0), s = e.left + (n.left - this.field.scrollLeft) * t, o = e.top + (n.top - this.field.scrollTop) * i, a = o + n.height * i;
      this.dropdown.style.position = "fixed", this.dropdown.style.left = "0", this.dropdown.style.top = "0", this.dropdown.style.visibility = "hidden", this.dropdown.style.display = "block";
      const l = this.dropdown.offsetWidth, h = this.dropdown.offsetHeight, d = 8;
      let u = s;
      u + l > window.innerWidth - d && (u = window.innerWidth - l - d), u < d && (u = d);
      let p = a + 4;
      if (p + h > window.innerHeight - d) {
        const g = o - h - 4;
        p = g >= d ? g : Math.max(d, window.innerHeight - h - d);
      }
      this.dropdown.style.left = `${u}px`, this.dropdown.style.top = `${p}px`, this.dropdown.style.visibility = "";
    });
    this.field = e, this.config = {
      minQueryLength: 0,
      maxResults: 8,
      ...t
    }, this.dropdown = document.createElement("div"), this.dropdown.className = "pvt-typeahead", this.dropdown.addEventListener("mousedown", (i) => i.preventDefault()), this.field.addEventListener("input", this.onInput), this.field.addEventListener("blur", this.onBlur), this.field.addEventListener("scroll", this.reposition);
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
    const e = this.field.selectionStart ?? 0;
    if ((this.field.selectionEnd ?? 0) !== e) return null;
    const t = this.field.value.slice(0, e), i = t.lastIndexOf(this.config.trigger);
    if (i === -1) return null;
    const n = t.slice(i + this.config.trigger.length);
    return n.includes(`
`) || n.includes(this.config.trigger) || this.config.closing && n.includes(this.config.closing) ? null : { start: i + this.config.trigger.length, query: n };
  }
  // -------------------------------------------------------------------------
  // Selection
  // -------------------------------------------------------------------------
  move(e) {
    const t = this.items.length;
    this.highlightedIndex = (this.highlightedIndex + e + t) % t, this.updateHighlight();
  }
  select(e) {
    var p, g;
    const t = this.items[e];
    if (!t) return;
    const i = this.field.selectionStart ?? 0, n = this.field.value, s = n.slice(i), { closing: o } = this.config;
    let a = "", l = 0;
    o && (s.startsWith(o) ? l = o.length : a = o);
    const h = t.value + a, d = n.slice(0, this.queryStart) + h + s, u = this.queryStart + h.length + l;
    this.field.value = d, this.field.setSelectionRange(u, u), this.field.dispatchEvent(new Event("input", { bubbles: !0 })), (g = (p = this.config).onSelect) == null || g.call(p, t), this.close(), this.field.focus();
  }
  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------
  renderItems(e) {
    this.dropdown.replaceChildren(), this.items.forEach((t, i) => {
      const n = document.createElement("div");
      n.className = "pvt-typeahead__item", n.setAttribute("role", "option"), this.config.renderItem ? n.appendChild(this.config.renderItem(t, e)) : n.textContent = t.label, n.addEventListener("mouseenter", () => {
        this.highlightedIndex = i, this.updateHighlight();
      }), n.addEventListener("click", () => this.select(i)), this.dropdown.appendChild(n);
    }), this.updateHighlight();
  }
  updateHighlight() {
    const e = this.dropdown.children;
    for (let t = 0; t < e.length; t++) {
      const i = e[t], n = t === this.highlightedIndex;
      i.classList.toggle("active", n), n && i.scrollIntoView({ block: "nearest" });
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
const id = [
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
function nd(r, e) {
  const t = r.nodeName === "INPUT", i = window.getComputedStyle(r), n = document.createElement("div");
  n.className = "pvt-typeahead-mirror";
  const s = n.style;
  s.position = "absolute", s.visibility = "hidden", s.whiteSpace = t ? "nowrap" : "pre-wrap", s.setProperty("word-wrap", t ? "normal" : "break-word"), s.overflow = "hidden";
  const o = s, a = i;
  for (const p of id)
    o[p] = a[p];
  t && (s.height = "auto"), document.body.appendChild(n), n.textContent = r.value.slice(0, e), t && (n.textContent = n.textContent.replace(/\s/g, " "));
  const l = document.createElement("span");
  l.textContent = r.value.slice(e) || ".", n.appendChild(l);
  const h = l.offsetTop + parseInt(i.borderTopWidth || "0", 10), d = l.offsetLeft + parseInt(i.borderLeftWidth || "0", 10), u = parseInt(i.lineHeight || "0", 10) || l.offsetHeight;
  return document.body.removeChild(n), { top: h, left: d, height: u };
}
ht.prototype.transition = Ln;
const sd = [
  "#FDE68A",
  "#FCA5A5",
  "#93C5FD",
  "#86EFAC",
  "#C4B5FD"
];
class rd {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "graphSvgRenderer");
    c(this, "rendererOptions");
    c(this, "noteContentRenderer");
    c(this, "originalContentMap", /* @__PURE__ */ new WeakMap());
    c(this, "noteReferenceTypeaheads", /* @__PURE__ */ new WeakMap());
    this.rendererOptions = e, this.graph = t, this.graphSvgRenderer = i, this.noteContentRenderer = new Gh(this.graph);
  }
  render(e, t) {
    const i = e.node();
    if (!i) return;
    t.setGraphElement(i);
    const n = this.createNoteForeignObject(t);
    i.appendChild(n), this.makeDraggable(e, t), this.makeResizable(e, t);
    const s = i.querySelector(".pvt-note-content");
    this.bindEditing(s, t);
  }
  createNoteForeignObject(e) {
    const t = eo("foreignObject", {
      class: "pvt-note-fo",
      width: e.width,
      height: e.height
    }), i = document.createElement("div");
    return i.classList.add("pvt-note"), i.style.setProperty("--note-color", e.color), i.classList.toggle("pvt-note--terminal", e.surface === "terminal"), e.isEditing() && i.classList.add("editing"), i.appendChild(this.createHeader(i, e)), i.appendChild(this.createLink(e)), i.appendChild(this.createContent(e)), i.appendChild(this.createResizeHandle()), t.appendChild(i), requestAnimationFrame(() => {
      this.refreshLink(e);
    }), t;
  }
  createHeader(e, t) {
    const i = w("div", {
      class: "pvt-note-header"
    }), n = w("div", { class: "pvt-note-head-left" });
    return n.appendChild(this.createColorPills(e, t)), n.appendChild(this.createSurfaceToggle(e, t)), i.appendChild(n), i.appendChild(this.createActionButtons(t)), i;
  }
  /** Small toggle beside the colour pills: switches jewel ↔ terminal surface. */
  createSurfaceToggle(e, t) {
    const i = X({
      title: "Toggle terminal look",
      svgIcon: Mc,
      class: ["pvt-note-surface-toggle"],
      variant: "outline-secondary",
      size: "xs",
      onClick: () => {
        const n = t.surface === "terminal" ? "jewel" : "terminal";
        t.setSurface(n), e.classList.toggle("pvt-note--terminal", n === "terminal"), i.classList.toggle("is-active", n === "terminal"), this.graph.noteManager.editNote(t);
      }
    });
    return i.classList.toggle("is-active", t.surface === "terminal"), i;
  }
  createLink(e) {
    const t = w("div", {
      class: "pvt-note-link-container"
    }), i = document.createElement("div");
    i.classList.add("pvt-note-link-subcontainer");
    const n = Z({ svgIcon: pc });
    n.classList.add("pvt-note-link-placeholder-icon"), i.appendChild(n);
    const s = X({
      title: "Search for a note",
      svgIcon: Pn,
      class: ["pvt-node-search-button"],
      variant: "outline-secondary",
      size: "xs",
      onClick: async (a) => {
        const l = a.target;
        if (!l.closest(".editing") || l.closest(".unlink-note") || l.closest(".pvt-node-reference"))
          return;
        a.stopPropagation();
        const h = await ts(
          this.graph.UIManager,
          "Select a node to link to this note"
        );
        h && (e.setAttachedElement({ type: "node", id: h.id }), this.graph.noteManager.editNote(e), this.refreshLink(e));
      }
    });
    i.appendChild(s);
    const o = document.createElement("div");
    return o.classList.add("pvt-note-link-content"), i.appendChild(o), t.appendChild(i), t;
  }
  refreshLink(e) {
    const t = e.getGraphElement();
    if (!t) return;
    const i = t.querySelector(".pvt-note-link-container");
    if (!i) return;
    const n = t.querySelector(".pvt-note-link-content");
    if (!n) return;
    n.replaceChildren();
    const s = e.getAttachedElement();
    if (s && s.type === "node") {
      i.classList.add("has-link");
      const o = this.graph.getMutableNode(s.id);
      if (o) {
        const a = document.createElement("div");
        a.classList.add("pvt-note-link-row");
        const l = document.createElement("span");
        l.classList.add(
          "pvt-node-reference",
          "resolved"
        ), l.dataset.nodeId = o.id;
        const h = this.graphSvgRenderer.nodeDrawer.getNodeStyle(o);
        Po(l, h.color);
        const d = ot(o, this.graph.UIManager.getOptions().mainHeader).trim();
        l.textContent = d, a.appendChild(l);
        const u = X({
          variant: "outline-danger",
          svgIcon: Hn,
          size: "xs",
          class: ["ms-auto", "unlink-note"],
          onClick: () => {
            e.setAttachedElement(void 0), this.graph.noteManager.editNote(e), this.refreshLink(e);
          }
        });
        a.appendChild(u), n.appendChild(a);
      } else {
        const a = document.createElement("span");
        a.classList.add("pvt-node-reference", "unresolved"), a.textContent = `Missing node: ${s.id}`, n.appendChild(a);
      }
    } else {
      i.classList.remove("has-link");
      const o = document.createElement("div");
      o.classList.add("pvt-note-link-placeholder");
      const a = document.createElement("span");
      a.textContent = "Link this note to a node", o.appendChild(a), n.appendChild(o);
    }
  }
  createContent(e) {
    const t = document.createElement("div");
    t.classList.add("pvt-note-content");
    const i = document.createElement("div");
    i.classList.add("pvt-note-content-rendered", "pvt-markdown"), this.noteContentRenderer.render(e, i);
    const n = document.createElement("textarea");
    return n.classList.add("pvt-note-editor"), n.value = e.content, t.appendChild(i), t.appendChild(n), t;
  }
  createColorPills(e, t) {
    const i = w("span", {
      class: "pvt-note-color-pills"
    });
    return sd.forEach((n) => {
      const s = w("span", {
        style: `background: ${n}`,
        class: ["pvt-note-color-pill", t.color === n ? "pill-active" : ""]
      });
      s.addEventListener("click", () => {
        e.querySelectorAll(".pvt-note-color-pill").forEach((a) => a.classList.remove("pill-active")), s.classList.add("pill-active"), e.style.setProperty("--note-color", n), t.setColor(n), this.graph.noteManager.editNote(t);
      }), i.appendChild(s);
    }), i;
  }
  createResizeHandle() {
    return w("span", {
      class: "pvt-note-resize-handle"
    });
  }
  createActionButtons(e) {
    const t = w("div", {
      class: "pvt-note-actions"
    }), i = X({
      title: "Edit the note",
      svgIcon: ke,
      class: ["pvt-note-edit-button"],
      variant: "outline-secondary",
      size: "xs",
      onClick: () => {
        e.isEditing() ? this.saveEditMode(e) : this.enterEditMode(e);
      }
    }), n = X({
      title: "Remove the note",
      svgIcon: Ee,
      class: ["pvt-node-remove-button"],
      variant: "outline-danger",
      size: "xs",
      onClick: () => {
        this.graph.noteManager.removeNote(e);
      }
    });
    return t.appendChild(i), t.appendChild(n), t;
  }
  updateEditButtonState(e, t) {
    const i = t.getGraphElement();
    if (!i) return;
    const n = i.querySelector(".pvt-note-edit-button");
    if (!n) return;
    const s = n.querySelector(".pvt-note-edit-button .pvt-icon");
    if (!s) return;
    s.replaceChildren();
    const o = dt(
      e ? zn : ke
    );
    e ? (n.classList.add("pivotick-button-success"), n.classList.remove("pivotick-button-outline-secondary"), s.setAttribute("title", "Edit the note")) : (n.classList.add("pivotick-button-outline-secondary"), n.classList.remove("pivotick-button-success"), s.setAttribute("title", "Save changes")), s.appendChild(o);
  }
  updatePositions(e) {
    e.attr("transform", (t) => {
      const i = isFinite(t.x) ? t.x : 0, n = isFinite(t.y) ? t.y : 0;
      return `translate(${i},${n})`;
    });
  }
  updateNoteSize(e, t) {
    e.select("foreignObject").attr("width", t.width).attr("height", t.height);
  }
  enterEditMode(e) {
    const t = e.getGraphElement();
    if (!t) return;
    const i = t.querySelector(".pvt-note-content-rendered"), n = t.querySelector(".pvt-note-editor");
    !i || !n || (this.originalContentMap.set(e, e.content), e.setEditing(!0), t.classList.add("editing"), n.value = e.content, i.style.display = "none", n.style.display = "block", this.updateEditButtonState(!0, e), this.graph.editing.connectManager.startNoteClickConnection(), requestAnimationFrame(() => {
      n.focus(), n.setSelectionRange(
        n.value.length,
        n.value.length
      );
    }));
  }
  saveEditMode(e) {
    const t = e.getGraphElement();
    if (!t) return;
    const i = t.querySelector(".pvt-note-content-rendered"), n = t.querySelector(".pvt-note-editor");
    !i || !n || (e.setEditing(!1), t.classList.remove("editing"), e.setContent(n.value), this.noteContentRenderer.render(e, i), i.style.display = "block", n.style.display = "none", this.graph.editing.connectManager.cancel(), this.updateEditButtonState(!1, e), this.graph.noteManager.editNote(e), this.graphSvgRenderer.dataUpdate());
  }
  cancelEditMode(e) {
    const t = e.getGraphElement();
    if (!t) return;
    const i = t.querySelector(".pvt-note-content-rendered"), n = t.querySelector(".pvt-note-editor");
    if (!i || !n) return;
    e.setEditing(!1), t.classList.remove("editing");
    const s = this.originalContentMap.get(e);
    s !== void 0 && (n.value = s), i.style.display = "block", n.style.display = "none", this.graph.editing.connectManager.cancel(), this.graphSvgRenderer.dataUpdate();
  }
  bindEditing(e, t) {
    const i = e.querySelector(".pvt-note-content-rendered"), n = e.querySelector(".pvt-note-editor");
    !i || !n || (this.attachNodeReferenceTypeahead(n), i.addEventListener("dblclick", () => {
      this.enterEditMode(t);
    }), n.addEventListener("keydown", (s) => {
      s.key === "Escape" && this.cancelEditMode(t), (s.metaKey || s.ctrlKey) && s.key === "Enter" && this.saveEditMode(t);
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
  attachNodeReferenceTypeahead(e) {
    if (this.noteReferenceTypeaheads.has(e)) return;
    const t = new ed(e, {
      trigger: "[[",
      closing: "]]",
      maxResults: 8,
      source: (i) => {
        const n = i.trim().toLowerCase(), s = this.graph.UIManager.getOptions().mainHeader, o = [];
        for (const a of this.graph.getMutableNodes()) {
          const l = ot(a, s).trim(), h = l && l !== "Optional name or label" ? l : a.id;
          if (!(n && !h.toLowerCase().includes(n) && !a.id.toLowerCase().includes(n)) && (o.push({ value: h, label: h, data: a }), o.length >= 20))
            break;
        }
        return o;
      },
      renderItem: (i) => {
        const n = i.data, s = w("div", { class: "pvt-typeahead__node-preview" });
        s.appendChild(re(n, { size: 22 }));
        const o = w("div", { class: "pvt-typeahead__node-name" }, [i.label]);
        return w("div", { class: "pvt-typeahead__node" }, [s, o]);
      }
    });
    this.noteReferenceTypeaheads.set(e, t);
  }
  makeDraggable(e, t) {
    const i = e.select(".pvt-note");
    let n = !1, s = 0, o = 0, a = 0, l = 0;
    i.on("mousedown", (h) => {
      const d = h.target;
      if (d.closest("button, a, .pvt-note-resize-handle, .pvt-node-reference, .pvt-note-color-pill, .pvt-note-editor") || t.isEditing() && !d.closest(".pvt-note-header")) return;
      h.preventDefault(), h.stopPropagation(), n = !0, s = h.clientX, o = h.clientY, a = t.x, l = t.y;
      const u = (g) => {
        var N;
        if (!n) return;
        const f = this.graphSvgRenderer, v = f.screenToGraphCoordinates(s, o), y = f.screenToGraphCoordinates(g.clientX, g.clientY), b = y.x - v.x, k = y.y - v.y, S = this.graph.simulation;
        t.setPosition(S.snapToGrid(a + b), S.snapToGrid(l + k)), e.attr("transform", `translate(${t.x},${t.y})`), e.classed("dragging", !0), (N = window.getSelection()) == null || N.removeAllRanges(), document.body.classList.add("pvt-disable-selection"), this.graphSvgRenderer.updateNoteEdgePositions();
      }, p = () => {
        n = !1, document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p), e.style("user-select", "all"), e.classed("dragging", !1), document.body.classList.remove("pvt-disable-selection");
      };
      document.addEventListener("mousemove", u), document.addEventListener("mouseup", p);
    });
  }
  makeResizable(e, t) {
    var h;
    const i = (h = e.node()) == null ? void 0 : h.querySelector(".pvt-note-resize-handle");
    if (!i) return;
    let n = !1, s = 0, o = 0, a = 0, l = 0;
    i.addEventListener("mousedown", (d) => {
      d.preventDefault(), d.stopPropagation(), n = !0, s = d.clientX, o = d.clientY, a = t.width, l = t.height;
      const u = (g) => {
        if (!n) return;
        const f = this.graphSvgRenderer, v = f.screenToGraphCoordinates(
          s,
          o
        ), y = f.screenToGraphCoordinates(
          g.clientX,
          g.clientY
        ), b = y.x - v.x, k = y.y - v.y;
        t.width = Math.max(180, a + b), t.height = Math.max(80, l + k), this.updateNoteSize(e, t), this.graphSvgRenderer.updateNoteEdgePositions();
      }, p = () => {
        n = !1, document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p);
      };
      document.addEventListener("mousemove", u), document.addEventListener("mouseup", p);
    });
  }
}
ht.prototype.transition = Ln;
const od = {
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
  defaultNodeStyle: Ll,
  defaultEdgeStyle: Dl,
  defaultLabelStyle: yi,
  markerStyleMap: Rl,
  selectionBox: {
    enabled: !0
  }
};
class ad extends Kc {
  constructor(t, i, n, s) {
    super(t, i, s);
    c(this, "options");
    c(this, "zoom");
    c(this, "eventHandler");
    c(this, "selectionBox", null);
    c(this, "graphInteraction");
    c(this, "nodeDrawer");
    c(this, "edgeDrawer");
    c(this, "noteDrawer");
    c(this, "lassoOverlay");
    c(this, "svgCanvas");
    // private progressBar: SVGRectElement
    c(this, "svg");
    c(this, "zoomGroup");
    c(this, "edgeGroup");
    c(this, "nodeGroup");
    c(this, "noteGroup");
    c(this, "noteEdgeGroup");
    c(this, "selectionBoxGroup");
    c(this, "defs");
    c(this, "shadowEdgeGroup");
    c(this, "shadowEdgePath");
    c(this, "handleLayer");
    c(this, "connectionHandle", null);
    c(this, "connectionHandleNode", null);
    c(this, "nodeGroupSelection");
    c(this, "edgeGroupSelection");
    c(this, "noteGroupSelection");
    c(this, "noteEdgeSelection");
    c(this, "nodeSelection");
    c(this, "edgeSelection");
    c(this, "noteSelection");
    c(this, "lassoModeActive", !1);
    /** Fires when the canvas becomes visible, to re-measure node sizes. */
    c(this, "sizeObserver", null);
    this.options = ye({}, od, s), this.graphInteraction = n, this.eventHandler = new Wc(this.graph), this.nodeDrawer = new Ri(this.options, this.graph, this), this.edgeDrawer = new qc(this.options, this.graph, this), this.noteDrawer = new rd(this.options, this.graph, this), this.svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svgCanvas.setAttribute("width", "100%"), this.svgCanvas.setAttribute("height", "100%"), this.svgCanvas.setAttribute("fill", "none"), this.svgCanvas.setAttribute("class", "pvt-canvas-element"), this.svgCanvas.setAttribute("data-renderer-drag-enabled", this.options.dragEnabled ? "1" : "0"), this.getCanvas().appendChild(this.svgCanvas), this.svg = ht(this.svgCanvas), this.zoomGroup = this.svg.append("g").attr("class", "zoom-layer hidden"), this.edgeGroup = this.zoomGroup.append("g").attr("class", "edges"), this.shadowEdgeGroup = this.zoomGroup.append("g").attr("class", "shadow-edges").style("pointer-events", "none"), this.shadowEdgePath = this.shadowEdgeGroup.append("path").attr("class", "pvt-shadow-edge").style("display", "none"), this.noteEdgeGroup = this.zoomGroup.append("g").attr("class", "note-edges"), this.selectionBoxGroup = this.svg.append("g").attr("class", "selection-box"), this.nodeGroup = this.zoomGroup.append("g").attr("class", "nodes"), this.noteGroup = this.zoomGroup.append("g").attr("class", "notes"), this.handleLayer = this.zoomGroup.append("g").attr("class", "connection-handle-layer"), this.defs = this.svg.append("defs"), this.edgeDrawer.renderDefinitions(), this.lassoOverlay = new jc(this.options, this.graph, this), this.zoom = Ta(), this.zoom = this.zoom.filter((o) => {
      if (!this.options.zoomEnabled || o.ctrlKey || o.shiftKey || o.altKey)
        return !1;
      const a = o.target;
      return a.tagName === "INPUT" || a.tagName === "SELECT" || a.tagName === "TEXTAREA" || a.closest('[contenteditable="true"]') ? !1 : this.graph.editing.connectManager.isActiveAndNotIdle() ? o.type === "wheel" || o.button === 1 : !!this.graphInteraction.canvasBeforeZoom(o);
    }).scaleExtent([this.options.minZoom, this.options.maxZoom]).on("zoom", (o) => {
      this.zoomGroup.attr("transform", o.transform), this.graphInteraction.canvasZoom(o);
    }), this.svg.call(this.zoom), this.svg.on("dblclick.zoom", null), this.options.selectionBox.enabled && (this.selectionBox = new Xc(this, this.svgCanvas, this.selectionBoxGroup.node())), this.sizeObserver = new IntersectionObserver((o) => {
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
    this.nodeSelection && this.nodeSelection.each((t, i, n) => {
      if (t.getCircleRadius() !== 25) return;
      const s = n[i].querySelector(".node");
      if (!s) return;
      const o = s.getBBox();
      t.setCircleRadius(0.5 * Math.max(o.width, o.height));
    });
  }
  setupRendering() {
    this.createHtmlProgressBar();
  }
  /** Release renderer-owned resources so observers can't fire on a removed canvas. */
  destroy() {
    var t;
    (t = this.sizeObserver) == null || t.disconnect(), this.sizeObserver = null;
  }
  getZoomBehavior() {
    return this.zoom;
  }
  getZoomTransform() {
    return Aa(this.svgCanvas);
  }
  screenToGraphCoordinates(t, i) {
    const n = this.svgCanvas.getBoundingClientRect(), s = t - n.left, o = i - n.top, a = this.getZoomTransform();
    return {
      x: a.invertX(s),
      y: a.invertY(o)
    };
  }
  graphToScreenCoordinates(t, i) {
    const n = this.svgCanvas.getBoundingClientRect(), s = this.getZoomTransform(), o = s.applyX(t), a = s.applyY(i);
    return {
      x: o + n.left,
      y: a + n.top
    };
  }
  /**
   * The extent of everything drawn, in graph coordinates. Read off the zoom layer's
   * bbox — so it includes labels, cluster bubbles and notes, not just node centres —
   * and `null` whenever there is nothing measurable: no content, or a canvas that is
   * detached or zero-sized (where d3-zoom would throw on a relative length).
   */
  getContentBounds() {
    var n, s;
    const t = (n = this.zoomGroup) == null ? void 0 : n.node();
    if (!t || !((s = this.svgCanvas) != null && s.isConnected)) return null;
    const i = t.getBBox();
    return i.width === 0 || i.height === 0 ? null : { x: i.x, y: i.y, width: i.width, height: i.height };
  }
  /**
   * Centre the view on a graph-space point, optionally at a new scale. The single
   * place a viewport transform is written — {@link fitAndCenter} computes its own
   * bounds and scale, then ends here.
   */
  setViewport(t) {
    const i = this.getZoomBehavior(), n = this.getCanvasSelection(), s = n.node();
    if (!i || !s || !s.isConnected || s.clientWidth === 0 || s.clientHeight === 0) return;
    const o = t.scale ?? this.getZoomTransform().k, a = Ms.translate(s.clientWidth / 2 - o * t.x, s.clientHeight / 2 - o * t.y).scale(o);
    t.animate ? n.transition().duration(this.options.zoomAnimationDuration).call(i.transform, a) : n.call(i.transform, a);
  }
  getSelectionBox() {
    return this.selectionBox;
  }
  getOptions() {
    return this.options;
  }
  getNodeStyle(t) {
    return this.nodeDrawer.getNodeStyle(t);
  }
  getEdgeStyle(t) {
    return this.edgeDrawer.getEdgeStyle(t);
  }
  init() {
    this.options.beforeRender && this.options.beforeRender(this.graph), this.dataUpdate(), this.eventHandler.init(this, this.graphInteraction);
  }
  update(t = !1) {
    this.dataUpdate(), t && this.eventHandler.update();
  }
  dataUpdate() {
    const t = this.graph.getMutableNodes().filter((a) => a.visible), i = this.nodeGroup.node();
    this.nodeGroupSelection = this.nodeGroup.selectAll("g.pvt-node").filter(function() {
      return this.parentNode === i;
    }), this.nodeSelection = this.nodeGroupSelection.data(t, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-node", !0).classed("pvt-node-has-children", (l) => l.hasChildren()).classed("pvt-node-expanded", (l) => l.expanded === !0).each((l, h, d) => {
        l.clearDirty();
        const u = ht(d[h]);
        u.attr("id", `node-${l.domID}`), this.nodeDrawer.render(u, l);
      }),
      (a) => a.classed("pvt-node-expanded", (l) => l.expanded === !0).each((l, h, d) => {
        const u = ht(d[h]);
        if (l.isDirty()) {
          if (l.clearDirty(), !l.expanded) {
            rt.collapseAllOpenedClusters(l), rt.toggleSyntheticEdges(l), rt.resolveCrossClusterEdges(this.nodeDrawer.graph);
            const p = this.nodeDrawer.graph.getParentGraph();
            let g = p;
            for (; g; )
              g.renderer.update(!1), g = g.getParentGraph();
            p && rt.updateToNewRadiusCollapsed(l, !0, p);
          }
          u.selectChildren().remove(), this.nodeDrawer.render(u, l);
        }
        this.nodeDrawer.checkForHighlight(u, l);
      }),
      (a) => a.remove()
    );
    const n = this.graph.getMutableEdges().filter((a) => a.visible);
    this.edgeGroupSelection = this.edgeGroup.selectAll("g.pvt-edge-group"), this.edgeSelection = this.edgeGroupSelection.data(n, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-edge-group", !0).classed("pvt-edge-synthetic", (l) => l.isSynthetic === !0).each((l, h, d) => {
        l.clearDirty();
        const u = ht(d[h]);
        u.attr("id", `edge-${l.domID}`), this.edgeDrawer.render(u, l), this.edgeDrawer.checkForSelection(u, l);
      }),
      (a) => a.each((l, h, d) => {
        const u = ht(d[h]);
        l.isDirty() && (l.clearDirty(), u.selectChildren().remove(), this.edgeDrawer.render(u, l)), this.edgeDrawer.checkForSelection(u, l);
      }),
      (a) => a.remove()
    );
    const s = this.graph.noteManager.getVisibleNotes();
    this.noteGroupSelection = this.noteGroup.selectAll("g.pvt-note"), this.noteSelection = this.noteGroupSelection.data(s, (a) => a.id).join(
      (a) => a.append("g").classed("pvt-note", !0).each((l, h, d) => {
        const u = ht(d[h]);
        u.attr("id", `note-${l.domID}`), this.noteDrawer.render(u, l);
      }),
      (a) => a.each((l, h, d) => {
        if (!l.isDirty() && !l.isAttachmentDirty())
          return;
        const u = ht(d[h]);
        l.isAttachmentDirty() ? (this.noteDrawer.refreshLink(l), l.clearAttachmentDirty()) : l.isEditing() || (l.clearDirty(), u.selectChildren().remove(), this.noteDrawer.render(u, l));
      }),
      (a) => a.remove()
    );
    const o = [];
    for (const a of this.graph.noteManager.getVisibleNotes()) {
      const l = a.getAttachedElement();
      if (!l || l.type !== "node") continue;
      const h = this.graph.getMutableNode(l.id);
      !h || !h.visible || o.push({ note: a, target: h });
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
  nextTickFor(t) {
    this.updateEdgePositions(t), this.updateNodePositions(t);
  }
  zoomIn() {
    const t = this.getZoomBehavior(), i = this.getCanvasSelection();
    !t || !i || (this.options.zoomAnimation ? i.transition().duration(300).call(t.scaleBy, 1.5) : i.call(t.scaleBy, 1.5));
  }
  zoomOut() {
    const t = this.getZoomBehavior(), i = this.getCanvasSelection();
    !t || !i || (this.options.zoomAnimation ? i.transition().duration(300).call(t.scaleBy, 0.667) : i.call(t.scaleBy, 0.667));
  }
  fitAndCenter(t) {
    const i = this.getZoomBehavior(), n = this.getCanvasSelection(), s = n.node(), o = n.select(".zoom-layer").node();
    if (!i || !s || !o || !s.isConnected || s.clientWidth === 0 || s.clientHeight === 0) return;
    const a = o.getBBox();
    if (a.width == 0 || a.height == 0) return;
    const l = s.clientWidth, h = s.clientHeight, d = a.width, u = a.height, p = a.x + d / 2, g = a.y + u / 2;
    let f;
    t ? f = t : (f = Math.min(
      l / d,
      h / u
    ) * 0.8, f = Math.min(f, 3)), this.setViewport({ x: p, y: g, scale: f, animate: this.options.zoomAnimation });
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
  fitAndCenterWhenSettled(t) {
    const i = this.zoomGroup.node();
    if (!i) {
      this.fitAndCenter(t);
      return;
    }
    const n = 180, s = 3, o = 0.5;
    let a = null, l = 0, h = 0;
    const d = () => {
      const u = i.getBBox();
      if (l = a !== null && Math.abs(u.width - a.width) < o && Math.abs(u.height - a.height) < o && Math.abs(u.x - a.x) < o && Math.abs(u.y - a.y) < o ? l + 1 : 0, a = u, h++, l >= s || h >= n) {
        this.fitAndCenter(t);
        return;
      }
      requestAnimationFrame(d);
    };
    requestAnimationFrame(d);
  }
  focusElement(t) {
    const i = t.getGraphElement(), n = this.getZoomBehavior(), s = this.getCanvasSelection(), o = s.node(), a = s.select(".zoom-layer").node();
    if (!n || !o || !a || !i) return;
    const l = a.getBBox(), h = o.clientWidth, d = o.clientHeight, u = l.width, p = l.height;
    let g = 0, f = 0;
    t instanceof Ct ? (g = ((t.from.x ?? 0) + (t.to.x ?? 0)) / 2, f = ((t.from.y ?? 0) + (t.to.y ?? 0)) / 2) : (g = t.x ?? 0, f = t.y ?? 0);
    const v = Math.min(
      h / u,
      d / p
    ) * 1.5, y = h / 2 - v * g, b = d / 2 - v * f, k = Ms.translate(y, b).scale(v);
    s.transition().duration(300).call(n.transform, k);
  }
  highlightElement(t) {
    const i = t.getGraphElement();
    t instanceof Ct ? (this.edgeSelection.classed("pvt-edge-highlighted", !1), i == null || i.classList.add("pvt-edge-highlighted")) : t instanceof et && (this.nodeSelection.classed("pvt-node-highlighted", !1), i == null || i.classList.add("pvt-node-highlighted"));
  }
  unHighlightElement(t) {
    const i = t.getGraphElement();
    t instanceof Ct ? i == null || i.classList.remove("pvt-edge-highlighted") : t instanceof et && (i == null || i.classList.remove("pvt-node-highlighted"));
  }
  clearHighlightedElements() {
    this.edgeSelection.classed("pvt-edge-highlighted", !1), this.nodeSelection.classed("pvt-node-highlighted", !1);
  }
  updateNodePositions(t) {
    if (t) {
      const i = new Set(t == null ? void 0 : t.map((s) => s.id)), n = this.nodeSelection.filter((s) => i.has(s.id));
      this.nodeDrawer.updatePositions(n);
    } else
      this.nodeDrawer.updatePositions(this.nodeSelection);
  }
  updateEdgePositions(t) {
    if (t) {
      const i = t.flatMap((o) => [...o.getEdgesOut(), ...o.getEdgesIn()]), n = new Set(i == null ? void 0 : i.map((o) => o.id)), s = this.edgeSelection.filter((o) => n.has(o.id));
      this.edgeDrawer.updatePositions(s);
    } else
      this.edgeDrawer.updatePositions(this.edgeSelection);
  }
  updateNoteEdgePositions() {
    this.noteEdgeSelection && this.noteEdgeSelection.attr("d", (t) => this.noteEdgePath(t.note, t.target));
  }
  noteEdgePath(t, i) {
    const n = t.x + t.width / 2, s = t.y + t.height / 2, o = i.x ?? 0, a = i.y ?? 0, l = o - n, h = a - s, d = Math.hypot(l, h);
    if (d === 0) return null;
    const u = l / d, p = h / d, g = 4, f = n + u * g, v = s + p * g, y = this.nodeDrawer.borderReach(i, -u, -p, 8), b = o - u * y, k = a - p * y;
    return `M ${f},${v} L ${b},${k}`;
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
  toggleLassoMode(t) {
    this.lassoModeActive = t, this.lassoOverlay.setEnabled(t);
  }
  enterNoteEditMode(t) {
    this.noteDrawer.enterEditMode(t);
  }
  getNodeClosestToCursor(t) {
    t = t ?? 1 / 0;
    const i = this.graphInteraction.getLastPointerEvent();
    if (!i)
      return null;
    const n = this.svgCanvas.getBoundingClientRect(), s = i.clientX - n.left, o = i.clientY - n.top, a = this.getZoomTransform(), l = a.invertX(s), h = a.invertY(o);
    let d = null, u = 1 / 0;
    const p = this.graph.getMutableNodes().filter((g) => g.visible);
    for (const g of p) {
      const f = (g.x ?? 0) - l, v = (g.y ?? 0) - h, y = Math.sqrt(f * f + v * v);
      y < u && y <= t && (u = y, d = g);
    }
    return d;
  }
  getClosestElementToCursor(t) {
    t = t ?? 1 / 0;
    const i = this.graphInteraction.getLastPointerEvent();
    if (!i)
      return null;
    const n = this.svgCanvas.getBoundingClientRect(), s = i.clientX - n.left, o = i.clientY - n.top, a = this.getZoomTransform(), l = a.invertX(s), h = a.invertY(o);
    let d = null, u = 1 / 0;
    const p = (g, f, v) => {
      const y = f - l, b = v - h, k = g instanceof It ? this.getDistanceToNote(g, l, h) : Math.sqrt(y * y + b * b);
      k < u && k <= t && (u = k, d = g);
    };
    for (const g of this.graph.getMutableNodes())
      g.visible && p(g, g.x ?? 0, g.y ?? 0);
    for (const g of this.graph.getNotes())
      g.visible && p(g, g.x ?? 0, g.y ?? 0);
    return d;
  }
  getDistanceToNote(t, i, n) {
    const s = t.x, o = t.x + t.width, a = t.y, l = t.y + t.height;
    if (i >= s && i <= o && n >= a && n <= l)
      return 0;
    const h = Math.max(s, Math.min(i, o)), d = Math.max(a, Math.min(n, l));
    return Math.hypot(i - h, n - d);
  }
  showShadowEdge(t) {
    const { source: i, targetNode: n, targetPosition: s, invalid: o = !1 } = t;
    if (i.x == null || i.y == null)
      return;
    let a, l;
    if (n) {
      if (n.x == null || n.y == null)
        return;
      a = n.x, l = n.y;
    } else if (s)
      a = s.x, l = s.y;
    else
      return;
    let h = i.x, d = i.y;
    i instanceof It && (h += i.width / 2, d += i.height / 2);
    const u = a - h, p = l - d, g = Math.sqrt(u * u + p * p);
    if (g === 0)
      return;
    const f = u / g, v = p / g;
    let y;
    i instanceof et ? y = this.nodeDrawer.borderReach(i, f, v) : i instanceof It ? y = 0 : y = 12;
    const b = n ? this.nodeDrawer.borderReach(n, -f, -v) : 0, k = i instanceof et ? this.nodeDrawer.borderReach(i, f, v, 4) : y + 4, S = n ? this.nodeDrawer.borderReach(n, -f, -v, 8) : b + 8, N = h + f * k, L = d + v * k, I = a - f * S, q = l - v * S;
    let F;
    n ? F = this.edgeDrawer.buildArcPath({
      fromX: h,
      fromY: d,
      toX: a,
      toY: l,
      fromRadius: y,
      toRadius: b,
      fromBox: i instanceof et ? i.getBorderBox(4) : void 0,
      toBox: n.getBorderBox(8),
      drawOffsetStart: 4,
      drawOffsetEnd: 8
    }) : F = `M ${N},${L} L ${I},${q}`, this.shadowEdgePath.attr("d", F).attr("marker-end", o ? null : "url(#arrow)").classed("pvt-shadow-edge--invalid", o).style("display", null);
  }
  hideShadowEdge() {
    this.shadowEdgePath.style("display", "none");
  }
}
function ld(r, e, t) {
  const i = t.type ?? "svg";
  if (i === "svg") {
    const n = new Vc(r);
    return new ad(r, e, n, t);
  }
  throw new Error(`\`${i}\` renderer is not implemented yet.`);
}
function cd(r = 0, e = 0, t = 1e-3) {
  let i = [], n;
  function s() {
    n = typeof t == "function" ? t : () => t;
  }
  function o(a) {
    for (let l = 0, h = i.length; l < h; ++l) {
      const d = i[l], u = n(d, l, i);
      d.vx != null && d.x != null && (d.vx -= (d.x - r) * u * a), d.vy != null && d.y != null && (d.vy -= (d.y - e) * u * a);
    }
  }
  return o.initialize = (a) => {
    i = a, s();
  }, o.x = function(a) {
    return arguments.length ? (r = a, o) : r;
  }, o.y = function(a) {
    return arguments.length ? (e = a, o) : e;
  }, o.strength = function(a) {
    return arguments.length ? (t = a, s(), o) : t;
  }, o;
}
const $o = 'var Lc=Object.defineProperty;var Fc=(se,kt,pe)=>kt in se?Lc(se,kt,{enumerable:!0,configurable:!0,writable:!0,value:pe}):se[kt]=pe;var E=(se,kt,pe)=>Fc(se,typeof kt!="symbol"?kt+"":kt,pe);(function(){"use strict";function se(e){const t=+this._x.call(null,e),n=+this._y.call(null,e);return kt(this.cover(t,n),t,n,e)}function kt(e,t,n,i){if(isNaN(t)||isNaN(n))return e;var r,o=e._root,a={data:i},s=e._x0,c=e._y0,l=e._x1,f=e._y1,T,d,m,A,b,g,w,_;if(!o)return e._root=a,e;for(;o.length;)if((b=t>=(T=(s+l)/2))?s=T:l=T,(g=n>=(d=(c+f)/2))?c=d:f=d,r=o,!(o=o[w=g<<1|b]))return r[w]=a,e;if(m=+e._x.call(null,o.data),A=+e._y.call(null,o.data),t===m&&n===A)return a.next=o,r?r[w]=a:e._root=a,e;do r=r?r[w]=new Array(4):e._root=new Array(4),(b=t>=(T=(s+l)/2))?s=T:l=T,(g=n>=(d=(c+f)/2))?c=d:f=d;while((w=g<<1|b)===(_=(A>=d)<<1|m>=T));return r[_]=o,r[w]=a,e}function pe(e){var t,n,i=e.length,r,o,a=new Array(i),s=new Array(i),c=1/0,l=1/0,f=-1/0,T=-1/0;for(n=0;n<i;++n)isNaN(r=+this._x.call(null,t=e[n]))||isNaN(o=+this._y.call(null,t))||(a[n]=r,s[n]=o,r<c&&(c=r),r>f&&(f=r),o<l&&(l=o),o>T&&(T=o));if(c>f||l>T)return this;for(this.cover(c,l).cover(f,T),n=0;n<i;++n)kt(this,a[n],s[n],e[n]);return this}function Fr(e,t){if(isNaN(e=+e)||isNaN(t=+t))return this;var n=this._x0,i=this._y0,r=this._x1,o=this._y1;if(isNaN(n))r=(n=Math.floor(e))+1,o=(i=Math.floor(t))+1;else{for(var a=r-n||1,s=this._root,c,l;n>e||e>=r||i>t||t>=o;)switch(l=(t<i)<<1|e<n,c=new Array(4),c[l]=s,s=c,a*=2,l){case 0:r=n+a,o=i+a;break;case 1:n=r-a,o=i+a;break;case 2:r=n+a,i=o-a;break;case 3:n=r-a,i=o-a;break}this._root&&this._root.length&&(this._root=s)}return this._x0=n,this._y0=i,this._x1=r,this._y1=o,this}function kr(){var e=[];return this.visit(function(t){if(!t.length)do e.push(t.data);while(t=t.next)}),e}function Pr(e){return arguments.length?this.cover(+e[0][0],+e[0][1]).cover(+e[1][0],+e[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function yt(e,t,n,i,r){this.node=e,this.x0=t,this.y0=n,this.x1=i,this.y1=r}function zr(e,t,n){var i,r=this._x0,o=this._y0,a,s,c,l,f=this._x1,T=this._y1,d=[],m=this._root,A,b;for(m&&d.push(new yt(m,r,o,f,T)),n==null?n=1/0:(r=e-n,o=t-n,f=e+n,T=t+n,n*=n);A=d.pop();)if(!(!(m=A.node)||(a=A.x0)>f||(s=A.y0)>T||(c=A.x1)<r||(l=A.y1)<o))if(m.length){var g=(a+c)/2,w=(s+l)/2;d.push(new yt(m[3],g,w,c,l),new yt(m[2],a,w,g,l),new yt(m[1],g,s,c,w),new yt(m[0],a,s,g,w)),(b=(t>=w)<<1|e>=g)&&(A=d[d.length-1],d[d.length-1]=d[d.length-1-b],d[d.length-1-b]=A)}else{var _=e-+this._x.call(null,m.data),R=t-+this._y.call(null,m.data),y=_*_+R*R;if(y<n){var C=Math.sqrt(n=y);r=e-C,o=t-C,f=e+C,T=t+C,i=m.data}}return i}function Gr(e){if(isNaN(f=+this._x.call(null,e))||isNaN(T=+this._y.call(null,e)))return this;var t,n=this._root,i,r,o,a=this._x0,s=this._y0,c=this._x1,l=this._y1,f,T,d,m,A,b,g,w;if(!n)return this;if(n.length)for(;;){if((A=f>=(d=(a+c)/2))?a=d:c=d,(b=T>=(m=(s+l)/2))?s=m:l=m,t=n,!(n=n[g=b<<1|A]))return this;if(!n.length)break;(t[g+1&3]||t[g+2&3]||t[g+3&3])&&(i=t,w=g)}for(;n.data!==e;)if(r=n,!(n=n.next))return this;return(o=n.next)&&delete n.next,r?(o?r.next=o:delete r.next,this):t?(o?t[g]=o:delete t[g],(n=t[0]||t[1]||t[2]||t[3])&&n===(t[3]||t[2]||t[1]||t[0])&&!n.length&&(i?i[w]=n:this._root=n),this):(this._root=o,this)}function Br(e){for(var t=0,n=e.length;t<n;++t)this.remove(e[t]);return this}function Ur(){return this._root}function Hr(){var e=0;return this.visit(function(t){if(!t.length)do++e;while(t=t.next)}),e}function Wr(e){var t=[],n,i=this._root,r,o,a,s,c;for(i&&t.push(new yt(i,this._x0,this._y0,this._x1,this._y1));n=t.pop();)if(!e(i=n.node,o=n.x0,a=n.y0,s=n.x1,c=n.y1)&&i.length){var l=(o+s)/2,f=(a+c)/2;(r=i[3])&&t.push(new yt(r,l,f,s,c)),(r=i[2])&&t.push(new yt(r,o,f,l,c)),(r=i[1])&&t.push(new yt(r,l,a,s,f)),(r=i[0])&&t.push(new yt(r,o,a,l,f))}return this}function jr(e){var t=[],n=[],i;for(this._root&&t.push(new yt(this._root,this._x0,this._y0,this._x1,this._y1));i=t.pop();){var r=i.node;if(r.length){var o,a=i.x0,s=i.y0,c=i.x1,l=i.y1,f=(a+c)/2,T=(s+l)/2;(o=r[0])&&t.push(new yt(o,a,s,f,T)),(o=r[1])&&t.push(new yt(o,f,s,c,T)),(o=r[2])&&t.push(new yt(o,a,T,f,l)),(o=r[3])&&t.push(new yt(o,f,T,c,l))}n.push(i)}for(;i=n.pop();)e(i.node,i.x0,i.y0,i.x1,i.y1);return this}function Kr(e){return e[0]}function Vr(e){return arguments.length?(this._x=e,this):this._x}function $r(e){return e[1]}function Xr(e){return arguments.length?(this._y=e,this):this._y}function kn(e,t,n){var i=new Pn(t??Kr,n??$r,NaN,NaN,NaN,NaN);return e==null?i:i.addAll(e)}function Pn(e,t,n,i,r,o){this._x=e,this._y=t,this._x0=n,this._y0=i,this._x1=r,this._y1=o,this._root=void 0}function _i(e){for(var t={data:e.data},n=t;e=e.next;)n=n.next={data:e.data};return t}var _t=kn.prototype=Pn.prototype;_t.copy=function(){var e=new Pn(this._x,this._y,this._x0,this._y0,this._x1,this._y1),t=this._root,n,i;if(!t)return e;if(!t.length)return e._root=_i(t),e;for(n=[{source:t,target:e._root=new Array(4)}];t=n.pop();)for(var r=0;r<4;++r)(i=t.source[r])&&(i.length?n.push({source:i,target:t.target[r]=new Array(4)}):t.target[r]=_i(i));return e},_t.add=se,_t.addAll=pe,_t.cover=Fr,_t.data=kr,_t.extent=Pr,_t.find=zr,_t.remove=Gr,_t.removeAll=Br,_t.root=Ur,_t.size=Hr,_t.visit=Wr,_t.visitAfter=jr,_t.x=Vr,_t.y=Xr;function dt(e){return function(){return e}}function Zt(e){return(e()-.5)*1e-6}function Yr(e){return e.x+e.vx}function qr(e){return e.y+e.vy}function Zr(e){var t,n,i,r=1,o=1;typeof e!="function"&&(e=dt(e==null?1:+e));function a(){for(var l,f=t.length,T,d,m,A,b,g,w=0;w<o;++w)for(T=kn(t,Yr,qr).visitAfter(s),l=0;l<f;++l)d=t[l],b=n[d.index],g=b*b,m=d.x+d.vx,A=d.y+d.vy,T.visit(_);function _(R,y,C,O,G){var P=R.data,F=R.r,z=b+F;if(P){if(P.index>d.index){var X=m-P.x-P.vx,nt=A-P.y-P.vy,N=X*X+nt*nt;N<z*z&&(X===0&&(X=Zt(i),N+=X*X),nt===0&&(nt=Zt(i),N+=nt*nt),N=(z-(N=Math.sqrt(N)))/N*r,d.vx+=(X*=N)*(z=(F*=F)/(g+F)),d.vy+=(nt*=N)*z,P.vx-=X*(z=1-z),P.vy-=nt*z)}return}return y>m+z||O<m-z||C>A+z||G<A-z}}function s(l){if(l.data)return l.r=n[l.data.index];for(var f=l.r=0;f<4;++f)l[f]&&l[f].r>l.r&&(l.r=l[f].r)}function c(){if(t){var l,f=t.length,T;for(n=new Array(f),l=0;l<f;++l)T=t[l],n[T.index]=+e(T,l,t)}}return a.initialize=function(l,f){t=l,i=f,c()},a.iterations=function(l){return arguments.length?(o=+l,a):o},a.strength=function(l){return arguments.length?(r=+l,a):r},a.radius=function(l){return arguments.length?(e=typeof l=="function"?l:dt(+l),c(),a):e},a}function Qr(e){return e.index}function Ti(e,t){var n=e.get(t);if(!n)throw new Error("node not found: "+t);return n}function Jr(e){var t=Qr,n=T,i,r=dt(30),o,a,s,c,l,f=1;e==null&&(e=[]);function T(g){return 1/Math.min(s[g.source.index],s[g.target.index])}function d(g){for(var w=0,_=e.length;w<f;++w)for(var R=0,y,C,O,G,P,F,z;R<_;++R)y=e[R],C=y.source,O=y.target,G=O.x+O.vx-C.x-C.vx||Zt(l),P=O.y+O.vy-C.y-C.vy||Zt(l),F=Math.sqrt(G*G+P*P),F=(F-o[R])/F*g*i[R],G*=F,P*=F,O.vx-=G*(z=c[R]),O.vy-=P*z,C.vx+=G*(z=1-z),C.vy+=P*z}function m(){if(a){var g,w=a.length,_=e.length,R=new Map(a.map((C,O)=>[t(C,O,a),C])),y;for(g=0,s=new Array(w);g<_;++g)y=e[g],y.index=g,typeof y.source!="object"&&(y.source=Ti(R,y.source)),typeof y.target!="object"&&(y.target=Ti(R,y.target)),s[y.source.index]=(s[y.source.index]||0)+1,s[y.target.index]=(s[y.target.index]||0)+1;for(g=0,c=new Array(_);g<_;++g)y=e[g],c[g]=s[y.source.index]/(s[y.source.index]+s[y.target.index]);i=new Array(_),A(),o=new Array(_),b()}}function A(){if(a)for(var g=0,w=e.length;g<w;++g)i[g]=+n(e[g],g,e)}function b(){if(a)for(var g=0,w=e.length;g<w;++g)o[g]=+r(e[g],g,e)}return d.initialize=function(g,w){a=g,l=w,m()},d.links=function(g){return arguments.length?(e=g,m(),d):e},d.id=function(g){return arguments.length?(t=g,d):t},d.iterations=function(g){return arguments.length?(f=+g,d):f},d.strength=function(g){return arguments.length?(n=typeof g=="function"?g:dt(+g),A(),d):n},d.distance=function(g){return arguments.length?(r=typeof g=="function"?g:dt(+g),b(),d):r},d}var to={value:()=>{}};function zn(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new Je(n)}function Je(e){this._=e}function eo(e,t){return e.trim().split(/^|\\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}Je.prototype=zn.prototype={constructor:Je,on:function(e,t){var n=this._,i=eo(e+"",n),r,o=-1,a=i.length;if(arguments.length<2){for(;++o<a;)if((r=(e=i[o]).type)&&(r=no(n[r],e.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<a;)if(r=(e=i[o]).type)n[r]=bi(n[r],e.name,t);else if(t==null)for(r in n)n[r]=bi(n[r],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Je(e)},call:function(e,t){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,o;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],i=0,r=o.length;i<r;++i)o[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],r=0,o=i.length;r<o;++r)i[r].value.apply(t,n)}};function no(e,t){for(var n=0,i=e.length,r;n<i;++n)if((r=e[n]).name===t)return r.value}function bi(e,t,n){for(var i=0,r=e.length;i<r;++i)if(e[i].name===t){e[i]=to,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var ge=0,Ne=0,Re=0,Si=1e3,tn,Ie,en=0,ae=0,nn=0,Me=typeof performance=="object"&&performance.now?performance:Date,wi=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ai(){return ae||(wi(io),ae=Me.now()+nn)}function io(){ae=0}function Gn(){this._call=this._time=this._next=null}Gn.prototype=vi.prototype={constructor:Gn,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?Ai():+n)+(t==null?0:+t),!this._next&&Ie!==this&&(Ie?Ie._next=this:tn=this,Ie=this),this._call=e,this._time=n,Bn()},stop:function(){this._call&&(this._call=null,this._time=1/0,Bn())}};function vi(e,t,n){var i=new Gn;return i.restart(e,t,n),i}function ro(){Ai(),++ge;for(var e=tn,t;e;)(t=ae-e._time)>=0&&e._call.call(void 0,t),e=e._next;--ge}function Ei(){ae=(en=Me.now())+nn,ge=Ne=0;try{ro()}finally{ge=0,so(),ae=0}}function oo(){var e=Me.now(),t=e-en;t>Si&&(nn-=t,en=e)}function so(){for(var e,t=tn,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:tn=n);Ie=e,Bn(i)}function Bn(e){if(!ge){Ne&&(Ne=clearTimeout(Ne));var t=e-ae;t>24?(e<1/0&&(Ne=setTimeout(Ei,e-Me.now()-nn)),Re&&(Re=clearInterval(Re))):(Re||(en=Me.now(),Re=setInterval(oo,Si)),ge=1,wi(Ei))}}const ao=1664525,lo=1013904223,xi=4294967296;function co(){let e=1;return()=>(e=(ao*e+lo)%xi)/xi}function uo(e){return e.x}function ho(e){return e.y}var fo=10,po=Math.PI*(3-Math.sqrt(5));function go(e){var t,n=1,i=.001,r=1-Math.pow(i,1/300),o=0,a=.6,s=new Map,c=vi(T),l=zn("tick","end"),f=co();e==null&&(e=[]);function T(){d(),l.call("tick",t),n<i&&(c.stop(),l.call("end",t))}function d(b){var g,w=e.length,_;b===void 0&&(b=1);for(var R=0;R<b;++R)for(n+=(o-n)*r,s.forEach(function(y){y(n)}),g=0;g<w;++g)_=e[g],_.fx==null?_.x+=_.vx*=a:(_.x=_.fx,_.vx=0),_.fy==null?_.y+=_.vy*=a:(_.y=_.fy,_.vy=0);return t}function m(){for(var b=0,g=e.length,w;b<g;++b){if(w=e[b],w.index=b,w.fx!=null&&(w.x=w.fx),w.fy!=null&&(w.y=w.fy),isNaN(w.x)||isNaN(w.y)){var _=fo*Math.sqrt(.5+b),R=b*po;w.x=_*Math.cos(R),w.y=_*Math.sin(R)}(isNaN(w.vx)||isNaN(w.vy))&&(w.vx=w.vy=0)}}function A(b){return b.initialize&&b.initialize(e,f),b}return m(),t={tick:d,restart:function(){return c.restart(T),t},stop:function(){return c.stop(),t},nodes:function(b){return arguments.length?(e=b,m(),s.forEach(A),t):e},alpha:function(b){return arguments.length?(n=+b,t):n},alphaMin:function(b){return arguments.length?(i=+b,t):i},alphaDecay:function(b){return arguments.length?(r=+b,t):+r},alphaTarget:function(b){return arguments.length?(o=+b,t):o},velocityDecay:function(b){return arguments.length?(a=1-b,t):1-a},randomSource:function(b){return arguments.length?(f=b,s.forEach(A),t):f},force:function(b,g){return arguments.length>1?(g==null?s.delete(b):s.set(b,A(g)),t):s.get(b)},find:function(b,g,w){var _=0,R=e.length,y,C,O,G,P;for(w==null?w=1/0:w*=w,_=0;_<R;++_)G=e[_],y=b-G.x,C=g-G.y,O=y*y+C*C,O<w&&(P=G,w=O);return P},on:function(b,g){return arguments.length>1?(l.on(b,g),t):l.on(b)}}}function mo(){var e,t,n,i,r=dt(-30),o,a=1,s=1/0,c=.81;function l(m){var A,b=e.length,g=kn(e,uo,ho).visitAfter(T);for(i=m,A=0;A<b;++A)t=e[A],g.visit(d)}function f(){if(e){var m,A=e.length,b;for(o=new Array(A),m=0;m<A;++m)b=e[m],o[b.index]=+r(b,m,e)}}function T(m){var A=0,b,g,w=0,_,R,y;if(m.length){for(_=R=y=0;y<4;++y)(b=m[y])&&(g=Math.abs(b.value))&&(A+=b.value,w+=g,_+=g*b.x,R+=g*b.y);m.x=_/w,m.y=R/w}else{b=m,b.x=b.data.x,b.y=b.data.y;do A+=o[b.data.index];while(b=b.next)}m.value=A}function d(m,A,b,g){if(!m.value)return!0;var w=m.x-t.x,_=m.y-t.y,R=g-A,y=w*w+_*_;if(R*R/c<y)return y<s&&(w===0&&(w=Zt(n),y+=w*w),_===0&&(_=Zt(n),y+=_*_),y<a&&(y=Math.sqrt(a*y)),t.vx+=w*m.value*i/y,t.vy+=_*m.value*i/y),!0;if(m.length||y>=s)return;(m.data!==t||m.next)&&(w===0&&(w=Zt(n),y+=w*w),_===0&&(_=Zt(n),y+=_*_),y<a&&(y=Math.sqrt(a*y)));do m.data!==t&&(R=o[m.data.index]*i/y,t.vx+=w*R,t.vy+=_*R);while(m=m.next)}return l.initialize=function(m,A){e=m,n=A,f()},l.strength=function(m){return arguments.length?(r=typeof m=="function"?m:dt(+m),f(),l):r},l.distanceMin=function(m){return arguments.length?(a=m*m,l):Math.sqrt(a)},l.distanceMax=function(m){return arguments.length?(s=m*m,l):Math.sqrt(s)},l.theta=function(m){return arguments.length?(c=m*m,l):Math.sqrt(c)},l}function Ni(e,t,n){var i,r=dt(.1),o,a;typeof e!="function"&&(e=dt(+e)),t==null&&(t=0),n==null&&(n=0);function s(l){for(var f=0,T=i.length;f<T;++f){var d=i[f],m=d.x-t||1e-6,A=d.y-n||1e-6,b=Math.sqrt(m*m+A*A),g=(a[f]-b)*o[f]*l/b;d.vx+=m*g,d.vy+=A*g}}function c(){if(i){var l,f=i.length;for(o=new Array(f),a=new Array(f),l=0;l<f;++l)a[l]=+e(i[l],l,i),o[l]=isNaN(a[l])?0:+r(i[l],l,i)}}return s.initialize=function(l){i=l,c()},s.strength=function(l){return arguments.length?(r=typeof l=="function"?l:dt(+l),c(),s):r},s.radius=function(l){return arguments.length?(e=typeof l=="function"?l:dt(+l),c(),s):e},s.x=function(l){return arguments.length?(t=+l,s):t},s.y=function(l){return arguments.length?(n=+l,s):n},s}function Ri(e){var t=dt(.1),n,i,r;typeof e!="function"&&(e=dt(e==null?0:+e));function o(s){for(var c=0,l=n.length,f;c<l;++c)f=n[c],f.vx+=(r[c]-f.x)*i[c]*s}function a(){if(n){var s,c=n.length;for(i=new Array(c),r=new Array(c),s=0;s<c;++s)i[s]=isNaN(r[s]=+e(n[s],s,n))?0:+t(n[s],s,n)}}return o.initialize=function(s){n=s,a()},o.strength=function(s){return arguments.length?(t=typeof s=="function"?s:dt(+s),a(),o):t},o.x=function(s){return arguments.length?(e=typeof s=="function"?s:dt(+s),a(),o):e},o}function Ii(e){var t=dt(.1),n,i,r;typeof e!="function"&&(e=dt(e==null?0:+e));function o(s){for(var c=0,l=n.length,f;c<l;++c)f=n[c],f.vy+=(r[c]-f.y)*i[c]*s}function a(){if(n){var s,c=n.length;for(i=new Array(c),r=new Array(c),s=0;s<c;++s)i[s]=isNaN(r[s]=+e(n[s],s,n))?0:+t(n[s],s,n)}}return o.initialize=function(s){n=s,a()},o.strength=function(s){return arguments.length?(t=typeof s=="function"?s:dt(+s),a(),o):t},o.y=function(s){return arguments.length?(e=typeof s=="function"?s:dt(+s),a(),o):e},o}function yo(e=0,t=0,n=.001){let i=[],r;function o(){r=typeof n=="function"?n:()=>n}function a(s){for(let c=0,l=i.length;c<l;++c){const f=i[c],T=r(f,c,i);f.vx!=null&&f.x!=null&&(f.vx-=(f.x-e)*T*s),f.vy!=null&&f.y!=null&&(f.vy-=(f.y-t)*T*s)}}return a.initialize=s=>{i=s,o()},a.x=function(s){return arguments.length?(e=s,a):e},a.y=function(s){return arguments.length?(t=s,a):t},a.strength=function(s){return arguments.length?(n=s,o(),a):n},a}var Un="http://www.w3.org/1999/xhtml",Mi={svg:"http://www.w3.org/2000/svg",xhtml:Un,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Ci(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Mi.hasOwnProperty(t)?{space:Mi[t],local:e}:e}function _o(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Un&&t.documentElement.namespaceURI===Un?t.createElement(e):t.createElementNS(n,e)}}function To(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Di(e){var t=Ci(e);return(t.local?To:_o)(t)}function bo(){}function Oi(e){return e==null?bo:function(){return this.querySelector(e)}}function So(e){typeof e!="function"&&(e=Oi(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],a=o.length,s=i[r]=new Array(a),c,l,f=0;f<a;++f)(c=o[f])&&(l=e.call(c,c.__data__,f,o))&&("__data__"in c&&(l.__data__=c.__data__),s[f]=l);return new It(i,this._parents)}function wo(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Ao(){return[]}function vo(e){return e==null?Ao:function(){return this.querySelectorAll(e)}}function Eo(e){return function(){return wo(e.apply(this,arguments))}}function xo(e){typeof e=="function"?e=Eo(e):e=vo(e);for(var t=this._groups,n=t.length,i=[],r=[],o=0;o<n;++o)for(var a=t[o],s=a.length,c,l=0;l<s;++l)(c=a[l])&&(i.push(e.call(c,c.__data__,l,a)),r.push(c));return new It(i,r)}function No(e){return function(){return this.matches(e)}}function Li(e){return function(t){return t.matches(e)}}var Ro=Array.prototype.find;function Io(e){return function(){return Ro.call(this.children,e)}}function Mo(){return this.firstElementChild}function Co(e){return this.select(e==null?Mo:Io(typeof e=="function"?e:Li(e)))}var Do=Array.prototype.filter;function Oo(){return Array.from(this.children)}function Lo(e){return function(){return Do.call(this.children,e)}}function Fo(e){return this.selectAll(e==null?Oo:Lo(typeof e=="function"?e:Li(e)))}function ko(e){typeof e!="function"&&(e=No(e));for(var t=this._groups,n=t.length,i=new Array(n),r=0;r<n;++r)for(var o=t[r],a=o.length,s=i[r]=[],c,l=0;l<a;++l)(c=o[l])&&e.call(c,c.__data__,l,o)&&s.push(c);return new It(i,this._parents)}function Fi(e){return new Array(e.length)}function Po(){return new It(this._enter||this._groups.map(Fi),this._parents)}function rn(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}rn.prototype={constructor:rn,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function zo(e){return function(){return e}}function Go(e,t,n,i,r,o){for(var a=0,s,c=t.length,l=o.length;a<l;++a)(s=t[a])?(s.__data__=o[a],i[a]=s):n[a]=new rn(e,o[a]);for(;a<c;++a)(s=t[a])&&(r[a]=s)}function Bo(e,t,n,i,r,o,a){var s,c,l=new Map,f=t.length,T=o.length,d=new Array(f),m;for(s=0;s<f;++s)(c=t[s])&&(d[s]=m=a.call(c,c.__data__,s,t)+"",l.has(m)?r[s]=c:l.set(m,c));for(s=0;s<T;++s)m=a.call(e,o[s],s,o)+"",(c=l.get(m))?(i[s]=c,c.__data__=o[s],l.delete(m)):n[s]=new rn(e,o[s]);for(s=0;s<f;++s)(c=t[s])&&l.get(d[s])===c&&(r[s]=c)}function Uo(e){return e.__data__}function Ho(e,t){if(!arguments.length)return Array.from(this,Uo);var n=t?Bo:Go,i=this._parents,r=this._groups;typeof e!="function"&&(e=zo(e));for(var o=r.length,a=new Array(o),s=new Array(o),c=new Array(o),l=0;l<o;++l){var f=i[l],T=r[l],d=T.length,m=Wo(e.call(f,f&&f.__data__,l,i)),A=m.length,b=s[l]=new Array(A),g=a[l]=new Array(A),w=c[l]=new Array(d);n(f,T,b,g,w,m,t);for(var _=0,R=0,y,C;_<A;++_)if(y=b[_]){for(_>=R&&(R=_+1);!(C=g[R])&&++R<A;);y._next=C||null}}return a=new It(a,i),a._enter=s,a._exit=c,a}function Wo(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function jo(){return new It(this._exit||this._groups.map(Fi),this._parents)}function Ko(e,t,n){var i=this.enter(),r=this,o=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(r=t(r),r&&(r=r.selection())),n==null?o.remove():n(o),i&&r?i.merge(r).order():r}function Vo(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,r=n.length,o=i.length,a=Math.min(r,o),s=new Array(r),c=0;c<a;++c)for(var l=n[c],f=i[c],T=l.length,d=s[c]=new Array(T),m,A=0;A<T;++A)(m=l[A]||f[A])&&(d[A]=m);for(;c<r;++c)s[c]=n[c];return new It(s,this._parents)}function $o(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],r=i.length-1,o=i[r],a;--r>=0;)(a=i[r])&&(o&&a.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(a,o),o=a);return this}function Xo(e){e||(e=Yo);function t(T,d){return T&&d?e(T.__data__,d.__data__):!T-!d}for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var a=n[o],s=a.length,c=r[o]=new Array(s),l,f=0;f<s;++f)(l=a[f])&&(c[f]=l);c.sort(t)}return new It(r,this._parents).order()}function Yo(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function qo(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Zo(){return Array.from(this)}function Qo(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length;r<o;++r){var a=i[r];if(a)return a}return null}function Jo(){let e=0;for(const t of this)++e;return e}function ts(){return!this.node()}function es(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var r=t[n],o=0,a=r.length,s;o<a;++o)(s=r[o])&&e.call(s,s.__data__,o,r);return this}function ns(e){return function(){this.removeAttribute(e)}}function is(e){return function(){this.removeAttributeNS(e.space,e.local)}}function rs(e,t){return function(){this.setAttribute(e,t)}}function os(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function ss(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function as(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function ls(e,t){var n=Ci(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?is:ns:typeof t=="function"?n.local?as:ss:n.local?os:rs)(n,t))}function ki(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function cs(e){return function(){this.style.removeProperty(e)}}function us(e,t,n){return function(){this.style.setProperty(e,t,n)}}function hs(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function fs(e,t,n){return arguments.length>1?this.each((t==null?cs:typeof t=="function"?hs:us)(e,t,n??"")):ds(this.node(),e)}function ds(e,t){return e.style.getPropertyValue(t)||ki(e).getComputedStyle(e,null).getPropertyValue(t)}function ps(e){return function(){delete this[e]}}function gs(e,t){return function(){this[e]=t}}function ms(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function ys(e,t){return arguments.length>1?this.each((t==null?ps:typeof t=="function"?ms:gs)(e,t)):this.node()[e]}function Pi(e){return e.trim().split(/^|\\s+/)}function Hn(e){return e.classList||new zi(e)}function zi(e){this._node=e,this._names=Pi(e.getAttribute("class")||"")}zi.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Gi(e,t){for(var n=Hn(e),i=-1,r=t.length;++i<r;)n.add(t[i])}function Bi(e,t){for(var n=Hn(e),i=-1,r=t.length;++i<r;)n.remove(t[i])}function _s(e){return function(){Gi(this,e)}}function Ts(e){return function(){Bi(this,e)}}function bs(e,t){return function(){(t.apply(this,arguments)?Gi:Bi)(this,e)}}function Ss(e,t){var n=Pi(e+"");if(arguments.length<2){for(var i=Hn(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof t=="function"?bs:t?_s:Ts)(n,t))}function ws(){this.textContent=""}function As(e){return function(){this.textContent=e}}function vs(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Es(e){return arguments.length?this.each(e==null?ws:(typeof e=="function"?vs:As)(e)):this.node().textContent}function xs(){this.innerHTML=""}function Ns(e){return function(){this.innerHTML=e}}function Rs(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Is(e){return arguments.length?this.each(e==null?xs:(typeof e=="function"?Rs:Ns)(e)):this.node().innerHTML}function Ms(){this.nextSibling&&this.parentNode.appendChild(this)}function Cs(){return this.each(Ms)}function Ds(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Os(){return this.each(Ds)}function Ls(e){var t=typeof e=="function"?e:Di(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Fs(){return null}function ks(e,t){var n=typeof e=="function"?e:Di(e),i=t==null?Fs:typeof t=="function"?t:Oi(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function Ps(){var e=this.parentNode;e&&e.removeChild(this)}function zs(){return this.each(Ps)}function Gs(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Bs(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Us(e){return this.select(e?Bs:Gs)}function Hs(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Ws(e){return function(t){e.call(this,t,this.__data__)}}function js(e){return e.trim().split(/^|\\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function Ks(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,r=t.length,o;n<r;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++i]=o;++i?t.length=i:delete this.__on}}}function Vs(e,t,n){return function(){var i=this.__on,r,o=Ws(t);if(i){for(var a=0,s=i.length;a<s;++a)if((r=i[a]).type===e.type&&r.name===e.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=n),r.value=t;return}}this.addEventListener(e.type,o,n),r={type:e.type,name:e.name,value:t,listener:o,options:n},i?i.push(r):this.__on=[r]}}function $s(e,t,n){var i=js(e+""),r,o=i.length,a;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,f;c<l;++c)for(r=0,f=s[c];r<o;++r)if((a=i[r]).type===f.type&&a.name===f.name)return f.value}return}for(s=t?Vs:Ks,r=0;r<o;++r)this.each(s(i[r],t,n));return this}function Ui(e,t,n){var i=ki(e),r=i.CustomEvent;typeof r=="function"?r=new r(t,n):(r=i.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function Xs(e,t){return function(){return Ui(this,e,t)}}function Ys(e,t){return function(){return Ui(this,e,t.apply(this,arguments))}}function qs(e,t){return this.each((typeof t=="function"?Ys:Xs)(e,t))}function*Zs(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],r=0,o=i.length,a;r<o;++r)(a=i[r])&&(yield a)}var Qs=[null];function It(e,t){this._groups=e,this._parents=t}function Js(){return this}It.prototype={constructor:It,select:So,selectAll:xo,selectChild:Co,selectChildren:Fo,filter:ko,data:Ho,enter:Po,exit:jo,join:Ko,merge:Vo,selection:Js,order:$o,sort:Xo,call:qo,nodes:Zo,node:Qo,size:Jo,empty:ts,each:es,attr:ls,style:fs,property:ys,classed:Ss,text:Es,html:Is,raise:Cs,lower:Os,append:Ls,insert:ks,remove:zs,clone:Us,datum:Hs,on:$s,dispatch:qs,[Symbol.iterator]:Zs};function on(e){return typeof e=="string"?new It([[document.querySelector(e)]],[document.documentElement]):new It([[e]],Qs)}function ta(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Hi(e,t){if(e=ta(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[e.clientX-r.left-t.clientLeft,e.clientY-r.top-t.clientTop]}}return[e.pageX,e.pageY]}const ea={passive:!1},Ce={capture:!0,passive:!1};function Wn(e){e.stopImmediatePropagation()}function me(e){e.preventDefault(),e.stopImmediatePropagation()}function na(e){var t=e.document.documentElement,n=on(e).on("dragstart.drag",me,Ce);"onselectstart"in t?n.on("selectstart.drag",me,Ce):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function ia(e,t){var n=e.document.documentElement,i=on(e).on("dragstart.drag",null);t&&(i.on("click.drag",me,Ce),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in n?i.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var sn=e=>()=>e;function jn(e,{sourceEvent:t,subject:n,target:i,identifier:r,active:o,x:a,y:s,dx:c,dy:l,dispatch:f}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},identifier:{value:r,enumerable:!0,configurable:!0},active:{value:o,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:s,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:f}})}jn.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};function ra(e){return!e.ctrlKey&&!e.button}function oa(){return this.parentNode}function sa(e,t){return t??{x:e.x,y:e.y}}function aa(){return navigator.maxTouchPoints||"ontouchstart"in this}function la(){var e=ra,t=oa,n=sa,i=aa,r={},o=zn("start","drag","end"),a=0,s,c,l,f,T=0;function d(y){y.on("mousedown.drag",m).filter(i).on("touchstart.drag",g).on("touchmove.drag",w,ea).on("touchend.drag touchcancel.drag",_).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function m(y,C){if(!(f||!e.call(this,y,C))){var O=R(this,t.call(this,y,C),y,C,"mouse");O&&(on(y.view).on("mousemove.drag",A,Ce).on("mouseup.drag",b,Ce),na(y.view),Wn(y),l=!1,s=y.clientX,c=y.clientY,O("start",y))}}function A(y){if(me(y),!l){var C=y.clientX-s,O=y.clientY-c;l=C*C+O*O>T}r.mouse("drag",y)}function b(y){on(y.view).on("mousemove.drag mouseup.drag",null),ia(y.view,l),me(y),r.mouse("end",y)}function g(y,C){if(e.call(this,y,C)){var O=y.changedTouches,G=t.call(this,y,C),P=O.length,F,z;for(F=0;F<P;++F)(z=R(this,G,y,C,O[F].identifier,O[F]))&&(Wn(y),z("start",y,O[F]))}}function w(y){var C=y.changedTouches,O=C.length,G,P;for(G=0;G<O;++G)(P=r[C[G].identifier])&&(me(y),P("drag",y,C[G]))}function _(y){var C=y.changedTouches,O=C.length,G,P;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),G=0;G<O;++G)(P=r[C[G].identifier])&&(Wn(y),P("end",y,C[G]))}function R(y,C,O,G,P,F){var z=o.copy(),X=Hi(F||O,C),nt,N,D;if((D=n.call(y,new jn("beforestart",{sourceEvent:O,target:d,identifier:P,active:a,x:X[0],y:X[1],dx:0,dy:0,dispatch:z}),G))!=null)return nt=D.x-X[0]||0,N=D.y-X[1]||0,function K(j,I,B){var Z=X,ut;switch(j){case"start":r[P]=K,ut=a++;break;case"end":delete r[P],--a;case"drag":X=Hi(B||I,C),ut=a;break}z.call(j,y,new jn(j,{sourceEvent:I,subject:D,target:d,identifier:P,active:ut,x:X[0]+nt,y:X[1]+N,dx:X[0]-Z[0],dy:X[1]-Z[1],dispatch:z}),G)}}return d.filter=function(y){return arguments.length?(e=typeof y=="function"?y:sn(!!y),d):e},d.container=function(y){return arguments.length?(t=typeof y=="function"?y:sn(y),d):t},d.subject=function(y){return arguments.length?(n=typeof y=="function"?y:sn(y),d):n},d.touchable=function(y){return arguments.length?(i=typeof y=="function"?y:sn(!!y),d):i},d.on=function(){var y=o.on.apply(o,arguments);return y===o?d:y},d.clickDistance=function(y){return arguments.length?(T=(y=+y)*y,d):Math.sqrt(T)},d}/*! @license DOMPurify 3.4.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.7/LICENSE */function Wi(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}function ca(e){if(Array.isArray(e))return e}function ua(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var i,r,o,a,s=[],c=!0,l=!1;try{if(o=(n=n.call(e)).next,t!==0)for(;!(c=(i=o.call(n)).done)&&(s.push(i.value),s.length!==t);c=!0);}catch(f){l=!0,r=f}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return s}}function ha(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function fa(e,t){return ca(e)||ua(e,t)||da(e,t)||ha()}function da(e,t){if(e){if(typeof e=="string")return Wi(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Wi(e,t):void 0}}const ji=Object.entries,Ki=Object.setPrototypeOf,pa=Object.isFrozen,ga=Object.getPrototypeOf,ma=Object.getOwnPropertyDescriptor;let Tt=Object.freeze,Mt=Object.seal,ye=Object.create,Vi=typeof Reflect<"u"&&Reflect,Kn=Vi.apply,Vn=Vi.construct;Tt||(Tt=function(t){return t}),Mt||(Mt=function(t){return t}),Kn||(Kn=function(t,n){for(var i=arguments.length,r=new Array(i>2?i-2:0),o=2;o<i;o++)r[o-2]=arguments[o];return t.apply(n,r)}),Vn||(Vn=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return new t(...i)});const _e=ht(Array.prototype.forEach),ya=ht(Array.prototype.lastIndexOf),$i=ht(Array.prototype.pop),Te=ht(Array.prototype.push),_a=ht(Array.prototype.splice),bt=Array.isArray,De=ht(String.prototype.toLowerCase),$n=ht(String.prototype.toString),Xi=ht(String.prototype.match),be=ht(String.prototype.replace),Yi=ht(String.prototype.indexOf),Ta=ht(String.prototype.trim),ba=ht(Number.prototype.toString),Sa=ht(Boolean.prototype.toString),qi=typeof BigInt>"u"?null:ht(BigInt.prototype.toString),Zi=typeof Symbol>"u"?null:ht(Symbol.prototype.toString),ct=ht(Object.prototype.hasOwnProperty),Oe=ht(Object.prototype.toString),pt=ht(RegExp.prototype.test),Le=wa(TypeError);function ht(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return Kn(e,t,i)}}function wa(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Vn(e,n)}}function W(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:De;if(Ki&&Ki(e,null),!bt(t))return e;let i=t.length;for(;i--;){let r=t[i];if(typeof r=="string"){const o=n(r);o!==r&&(pa(t)||(t[i]=o),r=o)}e[r]=!0}return e}function Aa(e){for(let t=0;t<e.length;t++)ct(e,t)||(e[t]=null);return e}function gt(e){const t=ye(null);for(const i of ji(e)){var n=fa(i,2);const r=n[0],o=n[1];ct(e,r)&&(bt(o)?t[r]=Aa(o):o&&typeof o=="object"&&o.constructor===Object?t[r]=gt(o):t[r]=o)}return t}function va(e){switch(typeof e){case"string":return e;case"number":return ba(e);case"boolean":return Sa(e);case"bigint":return qi?qi(e):"0";case"symbol":return Zi?Zi(e):"Symbol()";case"undefined":return Oe(e);case"function":case"object":{if(e===null)return Oe(e);const t=e,n=Pt(t,"toString");if(typeof n=="function"){const i=n(t);return typeof i=="string"?i:Oe(i)}return Oe(e)}default:return Oe(e)}}function Pt(e,t){for(;e!==null;){const i=ma(e,t);if(i){if(i.get)return ht(i.get);if(typeof i.value=="function")return ht(i.value)}e=ga(e)}function n(){return null}return n}function Ea(e){try{return pt(e,""),!0}catch{return!1}}const Qi=Tt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Xn=Tt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yn=Tt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xa=Tt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qn=Tt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Na=Tt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ji=Tt(["#text"]),tr=Tt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Zn=Tt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),er=Tt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),an=Tt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ra=Mt(/{{[\\w\\W]*|^[\\w\\W]*}}/g),Ia=Mt(/<%[\\w\\W]*|^[\\w\\W]*%>/g),Ma=Mt(/\\${[\\w\\W]*/g),Ca=Mt(/^data-[\\-\\w.\\u00B7-\\uFFFF]+$/),Da=Mt(/^aria-[\\-\\w]+$/),nr=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\\-]+(?:[^a-z+.\\-:]|$))/i),Oa=Mt(/^(?:\\w+script|data):/i),La=Mt(/[\\u0000-\\u0020\\u00A0\\u1680\\u180E\\u2000-\\u2029\\u205F\\u3000]/g),Fa=Mt(/^html$/i),ka=Mt(/^[a-z][.\\w]*(-[.\\w]+)+$/i),zt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Pa=function(){return typeof window>"u"?null:window},za=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const r="data-tt-policy-suffix";n&&n.hasAttribute(r)&&(i=n.getAttribute(r));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ir=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function rr(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pa();const t=L=>rr(L);if(t.version="3.4.7",t.removed=[],!e||!e.document||e.document.nodeType!==zt.document||!e.Element)return t.isSupported=!1,t;let n=e.document;const i=n,r=i.currentScript;e.DocumentFragment;const o=e.HTMLTemplateElement,a=e.Node,s=e.Element,c=e.NodeFilter,l=e.NamedNodeMap;l===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const f=e.DOMParser,T=e.trustedTypes,d=s.prototype,m=Pt(d,"cloneNode"),A=Pt(d,"remove"),b=Pt(d,"nextSibling"),g=Pt(d,"childNodes"),w=Pt(d,"parentNode"),_=Pt(d,"shadowRoot"),R=Pt(d,"attributes"),y=a&&a.prototype?Pt(a.prototype,"nodeType"):null,C=a&&a.prototype?Pt(a.prototype,"nodeName"):null;if(typeof o=="function"){const L=n.createElement("template");L.content&&L.content.ownerDocument&&(n=L.content.ownerDocument)}let O,G="";const P=n,F=P.implementation,z=P.createNodeIterator,X=P.createDocumentFragment,nt=P.getElementsByTagName,N=i.importNode;let D=ir();t.isSupported=typeof ji=="function"&&typeof w=="function"&&F&&F.createHTMLDocument!==void 0;const K=Ra,j=Ia,I=Ma,B=Ca,Z=Da,ut=Oa,mt=La,it=ka;let H=nr,q=null;const Qt=W({},[...Qi,...Xn,...Yn,...qn,...Ji]);let J=null;const Jt=W({},[...tr,...Zn,...er,...an]);let U=Object.seal(ye(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),St=null,te=null;const Dt=Object.seal(ye(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ge=!0,Be=!0,Sn=!1,wn=!0,Gt=!1,ce=!0,Wt=!1,Ue=!1,ee=!1,Bt=!1,jt=!1,At=!1,He=!0,We=!1;const An="user-content-";let je=!0,Ut=!1,Kt={},vt=null;const we=W({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ke=null;const vn=W({},["audio","video","img","source","image","track"]);let Ve=null;const Ht=W({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vt="http://www.w3.org/1998/Math/MathML",Ae="http://www.w3.org/2000/svg",Et="http://www.w3.org/1999/xhtml";let ne=Et,ve=!1,$t=null;const ri=W({},[Vt,Ae,Et],$n);let Ot=W({},["mi","mo","mn","ms","mtext"]),$e=W({},["annotation-xml"]);const oi=W({},["title","style","font","a","script"]);let ue=null;const si=["application/xhtml+xml","text/html"],ai="text/html";let tt=null,ie=null;const li=n.createElement("form"),En=function(h){return h instanceof RegExp||h instanceof Function},Xe=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ie&&ie===h)return;(!h||typeof h!="object")&&(h={}),h=gt(h),ue=si.indexOf(h.PARSER_MEDIA_TYPE)===-1?ai:h.PARSER_MEDIA_TYPE,tt=ue==="application/xhtml+xml"?$n:De,q=ct(h,"ALLOWED_TAGS")&&bt(h.ALLOWED_TAGS)?W({},h.ALLOWED_TAGS,tt):Qt,J=ct(h,"ALLOWED_ATTR")&&bt(h.ALLOWED_ATTR)?W({},h.ALLOWED_ATTR,tt):Jt,$t=ct(h,"ALLOWED_NAMESPACES")&&bt(h.ALLOWED_NAMESPACES)?W({},h.ALLOWED_NAMESPACES,$n):ri,Ve=ct(h,"ADD_URI_SAFE_ATTR")&&bt(h.ADD_URI_SAFE_ATTR)?W(gt(Ht),h.ADD_URI_SAFE_ATTR,tt):Ht,Ke=ct(h,"ADD_DATA_URI_TAGS")&&bt(h.ADD_DATA_URI_TAGS)?W(gt(vn),h.ADD_DATA_URI_TAGS,tt):vn,vt=ct(h,"FORBID_CONTENTS")&&bt(h.FORBID_CONTENTS)?W({},h.FORBID_CONTENTS,tt):we,St=ct(h,"FORBID_TAGS")&&bt(h.FORBID_TAGS)?W({},h.FORBID_TAGS,tt):gt({}),te=ct(h,"FORBID_ATTR")&&bt(h.FORBID_ATTR)?W({},h.FORBID_ATTR,tt):gt({}),Kt=ct(h,"USE_PROFILES")?h.USE_PROFILES&&typeof h.USE_PROFILES=="object"?gt(h.USE_PROFILES):h.USE_PROFILES:!1,Ge=h.ALLOW_ARIA_ATTR!==!1,Be=h.ALLOW_DATA_ATTR!==!1,Sn=h.ALLOW_UNKNOWN_PROTOCOLS||!1,wn=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Gt=h.SAFE_FOR_TEMPLATES||!1,ce=h.SAFE_FOR_XML!==!1,Wt=h.WHOLE_DOCUMENT||!1,Bt=h.RETURN_DOM||!1,jt=h.RETURN_DOM_FRAGMENT||!1,At=h.RETURN_TRUSTED_TYPE||!1,ee=h.FORCE_BODY||!1,He=h.SANITIZE_DOM!==!1,We=h.SANITIZE_NAMED_PROPS||!1,je=h.KEEP_CONTENT!==!1,Ut=h.IN_PLACE||!1,H=Ea(h.ALLOWED_URI_REGEXP)?h.ALLOWED_URI_REGEXP:nr,ne=typeof h.NAMESPACE=="string"?h.NAMESPACE:Et,Ot=ct(h,"MATHML_TEXT_INTEGRATION_POINTS")&&h.MATHML_TEXT_INTEGRATION_POINTS&&typeof h.MATHML_TEXT_INTEGRATION_POINTS=="object"?gt(h.MATHML_TEXT_INTEGRATION_POINTS):W({},["mi","mo","mn","ms","mtext"]),$e=ct(h,"HTML_INTEGRATION_POINTS")&&h.HTML_INTEGRATION_POINTS&&typeof h.HTML_INTEGRATION_POINTS=="object"?gt(h.HTML_INTEGRATION_POINTS):W({},["annotation-xml"]);const v=ct(h,"CUSTOM_ELEMENT_HANDLING")&&h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING=="object"?gt(h.CUSTOM_ELEMENT_HANDLING):ye(null);if(U=ye(null),ct(v,"tagNameCheck")&&En(v.tagNameCheck)&&(U.tagNameCheck=v.tagNameCheck),ct(v,"attributeNameCheck")&&En(v.attributeNameCheck)&&(U.attributeNameCheck=v.attributeNameCheck),ct(v,"allowCustomizedBuiltInElements")&&typeof v.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=v.allowCustomizedBuiltInElements),Gt&&(Be=!1),jt&&(Bt=!0),Kt&&(q=W({},Ji),J=ye(null),Kt.html===!0&&(W(q,Qi),W(J,tr)),Kt.svg===!0&&(W(q,Xn),W(J,Zn),W(J,an)),Kt.svgFilters===!0&&(W(q,Yn),W(J,Zn),W(J,an)),Kt.mathMl===!0&&(W(q,qn),W(J,er),W(J,an))),Dt.tagCheck=null,Dt.attributeCheck=null,ct(h,"ADD_TAGS")&&(typeof h.ADD_TAGS=="function"?Dt.tagCheck=h.ADD_TAGS:bt(h.ADD_TAGS)&&(q===Qt&&(q=gt(q)),W(q,h.ADD_TAGS,tt))),ct(h,"ADD_ATTR")&&(typeof h.ADD_ATTR=="function"?Dt.attributeCheck=h.ADD_ATTR:bt(h.ADD_ATTR)&&(J===Jt&&(J=gt(J)),W(J,h.ADD_ATTR,tt))),ct(h,"ADD_URI_SAFE_ATTR")&&bt(h.ADD_URI_SAFE_ATTR)&&W(Ve,h.ADD_URI_SAFE_ATTR,tt),ct(h,"FORBID_CONTENTS")&&bt(h.FORBID_CONTENTS)&&(vt===we&&(vt=gt(vt)),W(vt,h.FORBID_CONTENTS,tt)),ct(h,"ADD_FORBID_CONTENTS")&&bt(h.ADD_FORBID_CONTENTS)&&(vt===we&&(vt=gt(vt)),W(vt,h.ADD_FORBID_CONTENTS,tt)),je&&(q["#text"]=!0),Wt&&W(q,["html","head","body"]),q.table&&(W(q,["tbody"]),delete St.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Le(\'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.\');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Le(\'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.\');O=h.TRUSTED_TYPES_POLICY,G=O.createHTML("")}else O===void 0&&(O=za(T,r)),O!==null&&typeof G=="string"&&(G=O.createHTML(""));(D.uponSanitizeElement.length>0||D.uponSanitizeAttribute.length>0)&&q===Qt&&(q=gt(q)),D.uponSanitizeAttribute.length>0&&J===Jt&&(J=gt(J)),Tt&&Tt(h),ie=h},xn=W({},[...Xn,...Yn,...xa]),Xt=W({},[...qn,...Na]),ci=function(h){let v=w(h);(!v||!v.tagName)&&(v={namespaceURI:ne,tagName:"template"});const M=De(h.tagName),Q=De(v.tagName);return $t[h.namespaceURI]?h.namespaceURI===Ae?v.namespaceURI===Et?M==="svg":v.namespaceURI===Vt?M==="svg"&&(Q==="annotation-xml"||Ot[Q]):!!xn[M]:h.namespaceURI===Vt?v.namespaceURI===Et?M==="math":v.namespaceURI===Ae?M==="math"&&$e[Q]:!!Xt[M]:h.namespaceURI===Et?v.namespaceURI===Ae&&!$e[Q]||v.namespaceURI===Vt&&!Ot[Q]?!1:!Xt[M]&&(oi[M]||!xn[M]):!!(ue==="application/xhtml+xml"&&$t[h.namespaceURI]):!1},xt=function(h){Te(t.removed,{element:h});try{w(h).removeChild(h)}catch{A(h)}},Yt=function(h,v){try{Te(t.removed,{attribute:v.getAttributeNode(h),from:v})}catch{Te(t.removed,{attribute:null,from:v})}if(v.removeAttribute(h),h==="is")if(Bt||jt)try{xt(v)}catch{}else try{v.setAttribute(h,"")}catch{}},Nn=function(h){let v=null,M=null;if(ee)h="<remove></remove>"+h;else{const rt=Xi(h,/^[\\r\\n\\t ]+/);M=rt&&rt[0]}ue==="application/xhtml+xml"&&ne===Et&&(h=\'<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>\'+h+"</body></html>");const Q=O?O.createHTML(h):h;if(ne===Et)try{v=new f().parseFromString(Q,ue)}catch{}if(!v||!v.documentElement){v=F.createDocument(ne,"template",null);try{v.documentElement.innerHTML=ve?G:Q}catch{}}const V=v.body||v.documentElement;return h&&M&&V.insertBefore(n.createTextNode(M),V.childNodes[0]||null),ne===Et?nt.call(v,Wt?"html":"body")[0]:Wt?v.documentElement:V},Rn=function(h){return z.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},qt=function(h){h.normalize();const v=z.call(h.ownerDocument||h,h,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let M=v.nextNode();for(;M;){let Q=M.data;_e([K,j,I],V=>{Q=be(Q,V," ")}),M.data=Q,M=v.nextNode()}},Ee=function(h){const v=C?C(h):null;return typeof v!="string"||tt(v)!=="form"?!1:typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||h.attributes!==R(h)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function"||h.nodeType!==y(h)||h.childNodes!==g(h)},he=function(h){if(!y||typeof h!="object"||h===null)return!1;try{return y(h)===zt.documentFragment}catch{return!1}},xe=function(h){if(!y||typeof h!="object"||h===null)return!1;try{return typeof y(h)=="number"}catch{return!1}};function Lt(L,h,v){_e(L,M=>{M.call(t,h,v,ie)})}const In=function(h){let v=null;if(Lt(D.beforeSanitizeElements,h,null),Ee(h))return xt(h),!0;const M=tt(h.nodeName);if(Lt(D.uponSanitizeElement,h,{tagName:M,allowedTags:q}),ce&&h.hasChildNodes()&&!xe(h.firstElementChild)&&pt(/<[/\\w!]/g,h.innerHTML)&&pt(/<[/\\w!]/g,h.textContent)||ce&&h.namespaceURI===Et&&M==="style"&&xe(h.firstElementChild)||h.nodeType===zt.progressingInstruction||ce&&h.nodeType===zt.comment&&pt(/<[/\\w]/g,h.data))return xt(h),!0;if(St[M]||!(Dt.tagCheck instanceof Function&&Dt.tagCheck(M))&&!q[M]){if(!St[M]&&Cn(M)&&(U.tagNameCheck instanceof RegExp&&pt(U.tagNameCheck,M)||U.tagNameCheck instanceof Function&&U.tagNameCheck(M)))return!1;if(je&&!vt[M]){const V=w(h),rt=g(h);if(rt&&V){const wt=rt.length;for(let Ct=wt-1;Ct>=0;--Ct){const Nt=m(rt[Ct],!0);V.insertBefore(Nt,b(h))}}}return xt(h),!0}return(y?y(h):h.nodeType)===zt.element&&!ci(h)||(M==="noscript"||M==="noembed"||M==="noframes")&&pt(/<\\/no(script|embed|frames)/i,h.innerHTML)?(xt(h),!0):(Gt&&h.nodeType===zt.text&&(v=h.textContent,_e([K,j,I],V=>{v=be(v,V," ")}),h.textContent!==v&&(Te(t.removed,{element:h.cloneNode()}),h.textContent=v)),Lt(D.afterSanitizeElements,h,null),!1)},Mn=function(h,v,M){if(te[v]||He&&(v==="id"||v==="name")&&(M in n||M in li))return!1;const Q=J[v]||Dt.attributeCheck instanceof Function&&Dt.attributeCheck(v,h);if(!(Be&&!te[v]&&pt(B,v))){if(!(Ge&&pt(Z,v))){if(!Q||te[v]){if(!(Cn(h)&&(U.tagNameCheck instanceof RegExp&&pt(U.tagNameCheck,h)||U.tagNameCheck instanceof Function&&U.tagNameCheck(h))&&(U.attributeNameCheck instanceof RegExp&&pt(U.attributeNameCheck,v)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(v,h))||v==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&pt(U.tagNameCheck,M)||U.tagNameCheck instanceof Function&&U.tagNameCheck(M))))return!1}else if(!Ve[v]){if(!pt(H,be(M,mt,""))){if(!((v==="src"||v==="xlink:href"||v==="href")&&h!=="script"&&Yi(M,"data:")===0&&Ke[h])){if(!(Sn&&!pt(ut,be(M,mt,"")))){if(M)return!1}}}}}}return!0},Ye=W({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Cn=function(h){return!Ye[De(h)]&&pt(it,h)},fe=function(h){Lt(D.beforeSanitizeAttributes,h,null);const v=h.attributes;if(!v||Ee(h))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:J,forceKeepAttr:void 0};let Q=v.length;for(;Q--;){const V=v[Q],rt=V.name,wt=V.namespaceURI,Ct=V.value,Nt=tt(rt),qe=Ct;let ft=rt==="value"?qe:Ta(qe);if(M.attrName=Nt,M.attrValue=ft,M.keepAttr=!0,M.forceKeepAttr=void 0,Lt(D.uponSanitizeAttribute,h,M),ft=M.attrValue,We&&(Nt==="id"||Nt==="name")&&Yi(ft,An)!==0&&(Yt(rt,h),ft=An+ft),ce&&pt(/((--!?|])>)|<\\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ft)){Yt(rt,h);continue}if(Nt==="attributename"&&Xi(ft,"href")){Yt(rt,h);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){Yt(rt,h);continue}if(!wn&&pt(/\\/>/i,ft)){Yt(rt,h);continue}Gt&&_e([K,j,I],On=>{ft=be(ft,On," ")});const Dn=tt(h.nodeName);if(!Mn(Dn,Nt,ft)){Yt(rt,h);continue}if(O&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!wt)switch(T.getAttributeType(Dn,Nt)){case"TrustedHTML":{ft=O.createHTML(ft);break}case"TrustedScriptURL":{ft=O.createScriptURL(ft);break}}if(ft!==qe)try{wt?h.setAttributeNS(wt,rt,ft):h.setAttribute(rt,ft),Ee(h)?xt(h):$i(t.removed)}catch{Yt(rt,h)}}Lt(D.afterSanitizeAttributes,h,null)},re=function(h){let v=null;const M=Rn(h);for(Lt(D.beforeSanitizeShadowDOM,h,null);v=M.nextNode();)if(Lt(D.uponSanitizeShadowNode,v,null),In(v),fe(v),he(v.content)&&re(v.content),(y?y(v):v.nodeType)===zt.element){const V=_?_(v):v.shadowRoot;he(V)&&(oe(V),re(V))}Lt(D.afterSanitizeShadowDOM,h,null)},oe=function(h){const v=y?y(h):h.nodeType;if(v===zt.element){const V=_?_(h):h.shadowRoot;he(V)&&(oe(V),re(V))}const M=g?g(h):h.childNodes;if(!M)return;const Q=[];_e(M,V=>{Te(Q,V)});for(const V of Q)oe(V);if(v===zt.element){const V=C?C(h):null;if(typeof V=="string"&&tt(V)==="template"){const rt=h.content;he(rt)&&oe(rt)}}};return t.sanitize=function(L){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},v=null,M=null,Q=null,V=null;if(ve=!L,ve&&(L="<!-->"),typeof L!="string"&&!xe(L)&&(L=va(L),typeof L!="string"))throw Le("dirty is not a string, aborting");if(!t.isSupported)return L;if(Ue||Xe(h),t.removed=[],typeof L=="string"&&(Ut=!1),Ut){const Ct=C?C(L):L.nodeName;if(typeof Ct=="string"){const Nt=tt(Ct);if(!q[Nt]||St[Nt])throw Le("root node is forbidden and cannot be sanitized in-place")}if(Ee(L))throw Le("root node is clobbered and cannot be sanitized in-place");oe(L)}else if(xe(L))v=Nn("<!---->"),M=v.ownerDocument.importNode(L,!0),M.nodeType===zt.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?v=M:v.appendChild(M),oe(M);else{if(!Bt&&!Gt&&!Wt&&L.indexOf("<")===-1)return O&&At?O.createHTML(L):L;if(v=Nn(L),!v)return Bt?null:At?G:""}v&&ee&&xt(v.firstChild);const rt=Rn(Ut?L:v);for(;Q=rt.nextNode();)In(Q),fe(Q),he(Q.content)&&re(Q.content);if(Ut)return Gt&&qt(L),L;if(Bt){if(Gt&&qt(v),jt)for(V=X.call(v.ownerDocument);v.firstChild;)V.appendChild(v.firstChild);else V=v;return(J.shadowroot||J.shadowrootmode)&&(V=N.call(i,V,!0)),V}let wt=Wt?v.outerHTML:v.innerHTML;return Wt&&q["!doctype"]&&v.ownerDocument&&v.ownerDocument.doctype&&v.ownerDocument.doctype.name&&pt(Fa,v.ownerDocument.doctype.name)&&(wt="<!DOCTYPE "+v.ownerDocument.doctype.name+`>\n`+wt),Gt&&_e([K,j,I],Ct=>{wt=be(wt,Ct," ")}),O&&At?O.createHTML(wt):wt},t.setConfig=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Xe(L),Ue=!0},t.clearConfig=function(){ie=null,Ue=!1},t.isValidAttribute=function(L,h,v){ie||Xe({});const M=tt(L),Q=tt(h);return Mn(M,Q,v)},t.addHook=function(L,h){typeof h=="function"&&Te(D[L],h)},t.removeHook=function(L,h){if(h!==void 0){const v=ya(D[L],h);return v===-1?void 0:_a(D[L],v,1)[0]}return $i(D[L])},t.removeHooks=function(L){D[L]=[]},t.removeAllHooks=function(){D=ir()},t}rr();function or(e=8,t="id-"){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",i=n+"0123456789-_";let r=n.charAt(Math.floor(Math.random()*n.length));for(let o=1;o<e;o++)r+=i.charAt(Math.floor(Math.random()*i.length));return`${t}${r}`}function Ga(e,t,n,i){const r=Math.max(Math.abs(n)/e,Math.abs(i)/t);return r===0?e:1/r}function ln(e,t=new WeakSet){if(typeof e=="function")return;if(e===null||typeof e!="object")return e;const n=e;if(t.has(n))return;if(t.add(n),Array.isArray(e))return e.map(r=>ln(r,t));if(Object.getPrototypeOf(e)!==Object.prototype)return e;const i={};for(const[r,o]of Object.entries(e))typeof o!="function"&&(i[r]=ln(o,t));return i}let sr=class Lr{constructor(t,n,i,r=or(),o=[]){E(this,"id");E(this,"data");E(this,"children");E(this,"style");E(this,"edgesOut");E(this,"edgesIn");E(this,"defaultCircleRadius",10);E(this,"x");E(this,"y");E(this,"vx");E(this,"vy");E(this,"fx");E(this,"fy");E(this,"weight");E(this,"frozen");E(this,"visible");E(this,"expanded");E(this,"isChild");E(this,"childrenDepth");E(this,"isParent");E(this,"parentNode");E(this,"_original_object");E(this,"_deepest_node_clone");E(this,"_subgraph");E(this,"_circleRadius",this.defaultCircleRadius);E(this,"_circleRadiusCollapsed",this.defaultCircleRadius);E(this,"_border");E(this,"_dirty");E(this,"domID");this.id=t,this.domID=r,this.data=n??{},this.style=i??{},this.children=[],this.isParent=!1,this.setChildren(o),this._dirty=!0,this.frozen=!1,this.visible=!0,this.expanded=!1,this.isChild=!1,this.childrenDepth=0,this.edgesOut=new Set,this.edgesIn=new Set}getData(){return this.data}setData(t){this.data=t,this.markDirty()}updateData(t){this.data={...this.data,...t},this.markDirty()}registerEdgeOut(t){this.edgesOut.add(t)}registerEdgeIn(t){this.edgesIn.add(t)}emptyEdges(){this.edgesOut.clear(),this.edgesIn.clear()}getConnectedNodes(){return[...this.edgesOut].map(t=>t.to)}getConnectingNodes(){return[...this.edgesIn].map(t=>t.from)}getEdgesOut(){return[...this.edgesOut]}getEdgesIn(){return[...this.edgesIn]}getStyle(){return this.style}setStyle(t){this.style=t,this.markDirty()}updateStyle(t){this.style={...this.style,...t},this.markDirty()}getGraphElement(){return document?document.getElementById(`node-${this.domID}`):null}toDict(t=!1){const n={id:this.id,data:this.data,style:this.style,weight:this.weight};return t||(n.x=this.x,n.y=this.y,n.vx=this.vx,n.vy=this.vy,n.fx=this.fx,n.fy=this.fy),this.hasChildren()&&(n.children=this.children.map(i=>i.toDict(t))),n}toSimulationDTO(){return{id:this.id,data:this.data,style:ln(this.style),weight:this.weight,_circleRadius:this._circleRadius,x:this.x,y:this.y,vx:this.vx,vy:this.vy,fx:this.fx,fy:this.fy}}clone(){const t={...this.data},n={...this.style},i=new Lr(this.id,t,n);return i.x=this.x,i.y=this.y,i.vx=this.vx,i.vy=this.vy,i.fx=this.fx,i.fy=this.fy,i.weight=this.weight,i.frozen=this.frozen,i.visible=this.visible,i.expanded=this.expanded,i.isChild=this.isChild,i.childrenDepth=this.childrenDepth,i.isParent=this.isParent,i.parentNode=this.parentNode,i._circleRadius=this._circleRadius,i.children=this.children.map(r=>r.clone()),i}markDirty(){this._dirty=!0}clearDirty(){this._dirty=!1}isDirty(){return this._dirty}freeze(){this.frozen=!0,this.fx=this.x,this.fy=this.y}unfreeze(){this.frozen=!1,this.fx=void 0,this.fy=void 0}toggleVisibility(t){t?this.show():this.hide(),this.markDirty()}show(){this.visible=!0}hide(){this.visible=!1}toggleExpand(t){t===void 0?this.expanded?this.collapse():this.expand():t?this.expand():this.collapse(),this.markDirty()}expand(){this.expanded=!0,this._original_object&&(this._original_object.expanded=!0)}collapse(){this.expanded=!1,this._original_object&&(this._original_object.expanded=!1)}degree(){return this.edgesOut.size+this.edgesIn.size}ancestorChain(){const t=[];let n=this.parentNode;for(;n;)t.unshift(n),n=n.parentNode;return t}canvasRepresentative(){for(const t of this.ancestorChain())if(!t.expanded)return t;return this}setCircleRadius(t){this._circleRadius=t,this._border=void 0}getCircleRadius(){return this._circleRadius}setCircleRadiusCollapsed(t){this._circleRadiusCollapsed=t}getCircleRadiusCollapsed(){return this._circleRadiusCollapsed}setBorderBox(t,n){this._border={halfWidth:t/2,halfHeight:n/2}}getBorderBox(t=0){if(this._border)return{halfWidth:this._border.halfWidth+t,halfHeight:this._border.halfHeight+t}}getBorderDistance(t,n,i=0){const r=this._border;return r?Ga(r.halfWidth+i,r.halfHeight+i,t,n):this._circleRadius+i}setChildren(t){this.children=t,this.hasChildren()?this.isParent=!0:this.isParent=!1}hasChildren(){return this.children.length>0}markAsChild(t,n){this.isChild=!0,this.childrenDepth=n,this.parentNode=t}markAsParent(){this.isParent=!0}setSubgraph(t){this._subgraph=t}getSubgraph(){return this._subgraph}setOriginalObject(t){this._original_object=t}getOriginalObject(){return this._original_object}setDeepestNodeClone(t){this._deepest_node_clone=t}getDeepestNodeClone(){return this._deepest_node_clone}};class cn{constructor(t,n,i,r,o,a=null,s){E(this,"id");E(this,"from");E(this,"to");E(this,"directed");E(this,"data");E(this,"style");E(this,"visible");E(this,"layerVisible");E(this,"visibleIgnoringLayer");E(this,"representedEdges");E(this,"isSynthetic");E(this,"isCrossCluster");E(this,"syntheticTerminalNode");E(this,"syntheticSourceNode");E(this,"_original_object");E(this,"_subgraphFromNode");E(this,"_subgraphToNode");E(this,"_dirty");E(this,"domID");this.id=t,this.domID=or(),this.from=n,this.to=i,this.directed=a,this.data=r??{},this.style=o??{},this.visible=!0,this.layerVisible=!0,this.visibleIgnoringLayer=!0,this._dirty=!0,this.isSynthetic=s!==void 0,this.syntheticTerminalNode=s,this.from.registerEdgeOut(this),this.to.registerEdgeIn(this)}get source(){return this.from}get target(){return this.to}getData(){return this.data}setData(t){this.data=t,this.markDirty()}updateData(t){this.data={...this.data,...t},this.markDirty()}getStyle(){return this.style}getEdgeStyle(){var t;return((t=this.style)==null?void 0:t.edge)??{}}getLabelStyle(){var t;return((t=this.style)==null?void 0:t.label)??{}}setStyle(t){this.style=t,this.markDirty()}updateStyle(t){const n=this.style,i=t;this.style={...n,...i,edge:{...n.edge,...i.edge},label:{...n.label,...i.label}},this.markDirty()}getGraphElement(){return document?document.getElementById(`edge-${this.domID}`):null}setFrom(t){this.from=t}setTo(t){this.to=t}toDict(){return{id:this.id,from:this.from.id,to:this.to.id,data:this.data,style:this.style}}toSimulationDTO(){return{id:this.id,from:{id:this.from.id},to:{id:this.to.id},data:this.data,style:ln(this.style),directed:this.directed}}clone(){const t={...this.data},n={...this.style},i=new cn(this.id,this.from.clone(),this.to.clone(),t,n,this.directed);return i.visible=this.visible,i.layerVisible=this.layerVisible,i.visibleIgnoringLayer=this.visibleIgnoringLayer,i}markDirty(){this._dirty=!0}clearDirty(){this._dirty=!1}isDirty(){return this._dirty}toggleVisibility(t){t?this.show():this.hide(),this.markDirty()}show(){this.visibleIgnoringLayer=!0,this.visible=this.layerVisible}hide(){this.visibleIgnoringLayer=!1,this.visible=!1}setLayerVisible(t){if(this.layerVisible===t)return!1;this.layerVisible=t;const n=t&&this.visibleIgnoringLayer;return this.visible!==n&&(this.visible=n,this.markDirty()),!0}setOriginalObject(t){this._original_object=t}getOriginalObject(){return this._original_object}setSubgraphFromNode(t){this._subgraphFromNode=t}setSubgraphToNode(t){this._subgraphToNode=t}getSubgraphFromNode(){return this._subgraphFromNode}getSubgraphToNode(){return this._subgraphToNode}}function Ba(e){return new Worker(self.location.href,{name:e==null?void 0:e.name})}function Ua(){return new Ba}const Ha=(e,t,n,i,r)=>new Promise((o,a)=>{const s=Ua();s.postMessage({source:"simulation-worker-wrapper",nodes:e,edges:t,options:n,canvasBCR:i}),s.onmessage=c=>{const{type:l,progress:f,nodes:T,edges:d,elapsedTime:m}=c.data;if(l==="tick"&&typeof f=="number"){r==null||r(f,m);return}l==="done"&&(o({nodes:T,edges:d}),s.terminate())},s.onerror=a});var un=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Fe={exports:{}};Fe.exports;var ar;function ja(){return ar||(ar=1,(function(e,t){var n=200,i="__lodash_hash_undefined__",r=800,o=16,a=9007199254740991,s="[object Arguments]",c="[object Array]",l="[object AsyncFunction]",f="[object Boolean]",T="[object Date]",d="[object Error]",m="[object Function]",A="[object GeneratorFunction]",b="[object Map]",g="[object Number]",w="[object Null]",_="[object Object]",R="[object Proxy]",y="[object RegExp]",C="[object Set]",O="[object String]",G="[object Undefined]",P="[object WeakMap]",F="[object ArrayBuffer]",z="[object DataView]",X="[object Float32Array]",nt="[object Float64Array]",N="[object Int8Array]",D="[object Int16Array]",K="[object Int32Array]",j="[object Uint8Array]",I="[object Uint8ClampedArray]",B="[object Uint16Array]",Z="[object Uint32Array]",ut=/[\\\\^$.*+?()[\\]{}|]/g,mt=/^\\[object .+?Constructor\\]$/,it=/^(?:0|[1-9]\\d*)$/,H={};H[X]=H[nt]=H[N]=H[D]=H[K]=H[j]=H[I]=H[B]=H[Z]=!0,H[s]=H[c]=H[F]=H[f]=H[z]=H[T]=H[d]=H[m]=H[b]=H[g]=H[_]=H[y]=H[C]=H[O]=H[P]=!1;var q=typeof un=="object"&&un&&un.Object===Object&&un,Qt=typeof self=="object"&&self&&self.Object===Object&&self,J=q||Qt||Function("return this")(),Jt=t&&!t.nodeType&&t,U=Jt&&!0&&e&&!e.nodeType&&e,St=U&&U.exports===Jt,te=St&&q.process,Dt=(function(){try{var u=U&&U.require&&U.require("util").types;return u||te&&te.binding&&te.binding("util")}catch{}})(),Ge=Dt&&Dt.isTypedArray;function Be(u,p,S){switch(S.length){case 0:return u.call(p);case 1:return u.call(p,S[0]);case 2:return u.call(p,S[0],S[1]);case 3:return u.call(p,S[0],S[1],S[2])}return u.apply(p,S)}function Sn(u,p){for(var S=-1,k=Array(u);++S<u;)k[S]=p(S);return k}function wn(u){return function(p){return u(p)}}function Gt(u,p){return u==null?void 0:u[p]}function ce(u,p){return function(S){return u(p(S))}}var Wt=Array.prototype,Ue=Function.prototype,ee=Object.prototype,Bt=J["__core-js_shared__"],jt=Ue.toString,At=ee.hasOwnProperty,He=(function(){var u=/[^.]+$/.exec(Bt&&Bt.keys&&Bt.keys.IE_PROTO||"");return u?"Symbol(src)_1."+u:""})(),We=ee.toString,An=jt.call(Object),je=RegExp("^"+jt.call(At).replace(ut,"\\\\$&").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g,"$1.*?")+"$"),Ut=St?J.Buffer:void 0,Kt=J.Symbol,vt=J.Uint8Array;Ut&&Ut.allocUnsafe;var we=ce(Object.getPrototypeOf,Object),Ke=Object.create,vn=ee.propertyIsEnumerable,Ve=Wt.splice,Ht=Kt?Kt.toStringTag:void 0,Vt=(function(){try{var u=ui(Object,"defineProperty");return u({},"",{}),u}catch{}})(),Ae=Ut?Ut.isBuffer:void 0,Et=Math.max,ne=Date.now,ve=ui(J,"Map"),$t=ui(Object,"create"),ri=(function(){function u(){}return function(p){if(!de(p))return{};if(Ke)return Ke(p);u.prototype=p;var S=new u;return u.prototype=void 0,S}})();function Ot(u){var p=-1,S=u==null?0:u.length;for(this.clear();++p<S;){var k=u[p];this.set(k[0],k[1])}}function $e(){this.__data__=$t?$t(null):{},this.size=0}function oi(u){var p=this.has(u)&&delete this.__data__[u];return this.size-=p?1:0,p}function ue(u){var p=this.__data__;if($t){var S=p[u];return S===i?void 0:S}return At.call(p,u)?p[u]:void 0}function si(u){var p=this.__data__;return $t?p[u]!==void 0:At.call(p,u)}function ai(u,p){var S=this.__data__;return this.size+=this.has(u)?0:1,S[u]=$t&&p===void 0?i:p,this}Ot.prototype.clear=$e,Ot.prototype.delete=oi,Ot.prototype.get=ue,Ot.prototype.has=si,Ot.prototype.set=ai;function tt(u){var p=-1,S=u==null?0:u.length;for(this.clear();++p<S;){var k=u[p];this.set(k[0],k[1])}}function ie(){this.__data__=[],this.size=0}function li(u){var p=this.__data__,S=fe(p,u);if(S<0)return!1;var k=p.length-1;return S==k?p.pop():Ve.call(p,S,1),--this.size,!0}function En(u){var p=this.__data__,S=fe(p,u);return S<0?void 0:p[S][1]}function Xe(u){return fe(this.__data__,u)>-1}function xn(u,p){var S=this.__data__,k=fe(S,u);return k<0?(++this.size,S.push([u,p])):S[k][1]=p,this}tt.prototype.clear=ie,tt.prototype.delete=li,tt.prototype.get=En,tt.prototype.has=Xe,tt.prototype.set=xn;function Xt(u){var p=-1,S=u==null?0:u.length;for(this.clear();++p<S;){var k=u[p];this.set(k[0],k[1])}}function ci(){this.size=0,this.__data__={hash:new Ot,map:new(ve||tt),string:new Ot}}function xt(u){var p=Ln(this,u).delete(u);return this.size-=p?1:0,p}function Yt(u){return Ln(this,u).get(u)}function Nn(u){return Ln(this,u).has(u)}function Rn(u,p){var S=Ln(this,u),k=S.size;return S.set(u,p),this.size+=S.size==k?0:1,this}Xt.prototype.clear=ci,Xt.prototype.delete=xt,Xt.prototype.get=Yt,Xt.prototype.has=Nn,Xt.prototype.set=Rn;function qt(u){var p=this.__data__=new tt(u);this.size=p.size}function Ee(){this.__data__=new tt,this.size=0}function he(u){var p=this.__data__,S=p.delete(u);return this.size=p.size,S}function xe(u){return this.__data__.get(u)}function Lt(u){return this.__data__.has(u)}function In(u,p){var S=this.__data__;if(S instanceof tt){var k=S.__data__;if(!ve||k.length<n-1)return k.push([u,p]),this.size=++S.size,this;S=this.__data__=new Xt(k)}return S.set(u,p),this.size=S.size,this}qt.prototype.clear=Ee,qt.prototype.delete=he,qt.prototype.get=xe,qt.prototype.has=Lt,qt.prototype.set=In;function Mn(u,p){var S=di(u),k=!S&&fi(u),Y=!S&&!k&&Rr(u),ot=!S&&!k&&!Y&&Mr(u),st=S||k||Y||ot,et=st?Sn(u.length,String):[],at=et.length;for(var Ft in u)st&&(Ft=="length"||Y&&(Ft=="offset"||Ft=="parent")||ot&&(Ft=="buffer"||Ft=="byteLength"||Ft=="byteOffset")||xr(Ft,at))||et.push(Ft);return et}function Ye(u,p,S){(S!==void 0&&!Fn(u[p],S)||S===void 0&&!(p in u))&&re(u,p,S)}function Cn(u,p,S){var k=u[p];(!(At.call(u,p)&&Fn(k,S))||S===void 0&&!(p in u))&&re(u,p,S)}function fe(u,p){for(var S=u.length;S--;)if(Fn(u[S][0],p))return S;return-1}function re(u,p,S){p=="__proto__"&&Vt?Vt(u,p,{configurable:!0,enumerable:!0,value:S,writable:!0}):u[p]=S}var oe=mc();function L(u){return u==null?u===void 0?G:w:Ht&&Ht in Object(u)?yc(u):Ac(u)}function h(u){return Ze(u)&&L(u)==s}function v(u){if(!de(u)||Sc(u))return!1;var p=gi(u)?je:mt;return p.test(Nc(u))}function M(u){return Ze(u)&&Ir(u.length)&&!!H[L(u)]}function Q(u){if(!de(u))return wc(u);var p=Nr(u),S=[];for(var k in u)k=="constructor"&&(p||!At.call(u,k))||S.push(k);return S}function V(u,p,S,k,Y){u!==p&&oe(p,function(ot,st){if(Y||(Y=new qt),de(ot))rt(u,p,st,S,V,k,Y);else{var et=k?k(hi(u,st),ot,st+"",u,p,Y):void 0;et===void 0&&(et=ot),Ye(u,st,et)}},Cr)}function rt(u,p,S,k,Y,ot,st){var et=hi(u,S),at=hi(p,S),Ft=st.get(at);if(Ft){Ye(u,S,Ft);return}var Rt=ot?ot(et,at,S+"",u,p,st):void 0,Qe=Rt===void 0;if(Qe){var mi=di(at),yi=!mi&&Rr(at),Or=!mi&&!yi&&Mr(at);Rt=at,mi||yi||Or?di(et)?Rt=et:Rc(et)?Rt=Dn(et):yi?(Qe=!1,Rt=Nt(at)):Or?(Qe=!1,Rt=ft(at)):Rt=[]:Ic(at)||fi(at)?(Rt=et,fi(et)?Rt=Mc(et):(!de(et)||gi(et))&&(Rt=_c(at))):Qe=!1}Qe&&(st.set(at,Rt),Y(Rt,at,k,ot,st),st.delete(at)),Ye(u,S,Rt)}function wt(u,p){return Ec(vc(u,p,Dr),u+"")}var Ct=Vt?function(u,p){return Vt(u,"toString",{configurable:!0,enumerable:!1,value:Dc(p),writable:!0})}:Dr;function Nt(u,p){return u.slice()}function qe(u){var p=new u.constructor(u.byteLength);return new vt(p).set(new vt(u)),p}function ft(u,p){var S=qe(u.buffer);return new u.constructor(S,u.byteOffset,u.length)}function Dn(u,p){var S=-1,k=u.length;for(p||(p=Array(k));++S<k;)p[S]=u[S];return p}function On(u,p,S,k){var Y=!S;S||(S={});for(var ot=-1,st=p.length;++ot<st;){var et=p[ot],at=void 0;at===void 0&&(at=u[et]),Y?re(S,et,at):Cn(S,et,at)}return S}function gc(u){return wt(function(p,S){var k=-1,Y=S.length,ot=Y>1?S[Y-1]:void 0,st=Y>2?S[2]:void 0;for(ot=u.length>3&&typeof ot=="function"?(Y--,ot):void 0,st&&Tc(S[0],S[1],st)&&(ot=Y<3?void 0:ot,Y=1),p=Object(p);++k<Y;){var et=S[k];et&&u(p,et,k,ot)}return p})}function mc(u){return function(p,S,k){for(var Y=-1,ot=Object(p),st=k(p),et=st.length;et--;){var at=st[++Y];if(S(ot[at],at,ot)===!1)break}return p}}function Ln(u,p){var S=u.__data__;return bc(p)?S[typeof p=="string"?"string":"hash"]:S.map}function ui(u,p){var S=Gt(u,p);return v(S)?S:void 0}function yc(u){var p=At.call(u,Ht),S=u[Ht];try{u[Ht]=void 0;var k=!0}catch{}var Y=We.call(u);return k&&(p?u[Ht]=S:delete u[Ht]),Y}function _c(u){return typeof u.constructor=="function"&&!Nr(u)?ri(we(u)):{}}function xr(u,p){var S=typeof u;return p=p??a,!!p&&(S=="number"||S!="symbol"&&it.test(u))&&u>-1&&u%1==0&&u<p}function Tc(u,p,S){if(!de(S))return!1;var k=typeof p;return(k=="number"?pi(S)&&xr(p,S.length):k=="string"&&p in S)?Fn(S[p],u):!1}function bc(u){var p=typeof u;return p=="string"||p=="number"||p=="symbol"||p=="boolean"?u!=="__proto__":u===null}function Sc(u){return!!He&&He in u}function Nr(u){var p=u&&u.constructor,S=typeof p=="function"&&p.prototype||ee;return u===S}function wc(u){var p=[];if(u!=null)for(var S in Object(u))p.push(S);return p}function Ac(u){return We.call(u)}function vc(u,p,S){return p=Et(p===void 0?u.length-1:p,0),function(){for(var k=arguments,Y=-1,ot=Et(k.length-p,0),st=Array(ot);++Y<ot;)st[Y]=k[p+Y];Y=-1;for(var et=Array(p+1);++Y<p;)et[Y]=k[Y];return et[p]=S(st),Be(u,this,et)}}function hi(u,p){if(!(p==="constructor"&&typeof u[p]=="function")&&p!="__proto__")return u[p]}var Ec=xc(Ct);function xc(u){var p=0,S=0;return function(){var k=ne(),Y=o-(k-S);if(S=k,Y>0){if(++p>=r)return arguments[0]}else p=0;return u.apply(void 0,arguments)}}function Nc(u){if(u!=null){try{return jt.call(u)}catch{}try{return u+""}catch{}}return""}function Fn(u,p){return u===p||u!==u&&p!==p}var fi=h((function(){return arguments})())?h:function(u){return Ze(u)&&At.call(u,"callee")&&!vn.call(u,"callee")},di=Array.isArray;function pi(u){return u!=null&&Ir(u.length)&&!gi(u)}function Rc(u){return Ze(u)&&pi(u)}var Rr=Ae||Oc;function gi(u){if(!de(u))return!1;var p=L(u);return p==m||p==A||p==l||p==R}function Ir(u){return typeof u=="number"&&u>-1&&u%1==0&&u<=a}function de(u){var p=typeof u;return u!=null&&(p=="object"||p=="function")}function Ze(u){return u!=null&&typeof u=="object"}function Ic(u){if(!Ze(u)||L(u)!=_)return!1;var p=we(u);if(p===null)return!0;var S=At.call(p,"constructor")&&p.constructor;return typeof S=="function"&&S instanceof S&&jt.call(S)==An}var Mr=Ge?wn(Ge):M;function Mc(u){return On(u,Cr(u))}function Cr(u){return pi(u)?Mn(u):Q(u)}var Cc=gc(function(u,p,S){V(u,p,S)});function Dc(u){return function(){return u}}function Dr(u){return u}function Oc(){return!1}e.exports=Cc})(Fe,Fe.exports)),Fe.exports}var Ka=ja(),hn=Wa(Ka);function Va(e){var t=0,n=e.children,i=n&&n.length;if(!i)t=1;else for(;--i>=0;)t+=n[i].value;e.value=t}function $a(){return this.eachAfter(Va)}function Xa(e,t){let n=-1;for(const i of this)e.call(t,i,++n,this);return this}function Ya(e,t){for(var n=this,i=[n],r,o,a=-1;n=i.pop();)if(e.call(t,n,++a,this),r=n.children)for(o=r.length-1;o>=0;--o)i.push(r[o]);return this}function qa(e,t){for(var n=this,i=[n],r=[],o,a,s,c=-1;n=i.pop();)if(r.push(n),o=n.children)for(a=0,s=o.length;a<s;++a)i.push(o[a]);for(;n=r.pop();)e.call(t,n,++c,this);return this}function Za(e,t){let n=-1;for(const i of this)if(e.call(t,i,++n,this))return i}function Qa(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,i=t.children,r=i&&i.length;--r>=0;)n+=i[r].value;t.value=n})}function Ja(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function tl(e){for(var t=this,n=el(t,e),i=[t];t!==n;)t=t.parent,i.push(t);for(var r=i.length;e!==n;)i.splice(r,0,e),e=e.parent;return i}function el(e,t){if(e===t)return e;var n=e.ancestors(),i=t.ancestors(),r=null;for(e=n.pop(),t=i.pop();e===t;)r=e,e=n.pop(),t=i.pop();return r}function nl(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function il(){return Array.from(this)}function rl(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function ol(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*sl(){var e=this,t,n=[e],i,r,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,i=e.children)for(r=0,o=i.length;r<o;++r)n.push(i[r]);while(n.length)}function fn(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=cl)):t===void 0&&(t=ll);for(var n=new ke(e),i,r=[n],o,a,s,c;i=r.pop();)if((a=t(i.data))&&(c=(a=Array.from(a)).length))for(i.children=a,s=c-1;s>=0;--s)r.push(o=a[s]=new ke(a[s])),o.parent=i,o.depth=i.depth+1;return n.eachBefore(hl)}function al(){return fn(this).eachBefore(ul)}function ll(e){return e.children}function cl(e){return Array.isArray(e)?e[1]:null}function ul(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function hl(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function ke(e){this.data=e,this.depth=this.height=0,this.parent=null}ke.prototype=fn.prototype={constructor:ke,count:$a,each:Xa,eachAfter:qa,eachBefore:Ya,find:Za,sum:Qa,sort:Ja,path:tl,ancestors:nl,descendants:il,leaves:rl,links:ol,copy:al,[Symbol.iterator]:sl};function fl(e,t){return e.parent===t.parent?1:2}function Qn(e){var t=e.children;return t?t[0]:e.t}function Jn(e){var t=e.children;return t?t[t.length-1]:e.t}function dl(e,t,n){var i=n/(t.i-e.i);t.c-=i,t.s+=n,e.c+=i,t.z+=n,t.m+=n}function pl(e){for(var t=0,n=0,i=e.children,r=i.length,o;--r>=0;)o=i[r],o.z+=t,o.m+=t,t+=o.s+(n+=o.c)}function gl(e,t,n){return e.a.parent===t.parent?e.a:n}function dn(e,t){this._=e,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}dn.prototype=Object.create(ke.prototype);function ml(e){for(var t=new dn(e,0),n,i=[t],r,o,a,s;n=i.pop();)if(o=n._.children)for(n.children=new Array(s=o.length),a=s-1;a>=0;--a)i.push(r=n.children[a]=new dn(o[a],a)),r.parent=n;return(t.parent=new dn(null,0)).children=[t],t}function yl(){var e=fl,t=1,n=1,i=null;function r(l){var f=ml(l);if(f.eachAfter(o),f.parent.m=-f.z,f.eachBefore(a),i)l.eachBefore(c);else{var T=l,d=l,m=l;l.eachBefore(function(_){_.x<T.x&&(T=_),_.x>d.x&&(d=_),_.depth>m.depth&&(m=_)});var A=T===d?1:e(T,d)/2,b=A-T.x,g=t/(d.x+A+b),w=n/(m.depth||1);l.eachBefore(function(_){_.x=(_.x+b)*g,_.y=_.depth*w})}return l}function o(l){var f=l.children,T=l.parent.children,d=l.i?T[l.i-1]:null;if(f){pl(l);var m=(f[0].z+f[f.length-1].z)/2;d?(l.z=d.z+e(l._,d._),l.m=l.z-m):l.z=m}else d&&(l.z=d.z+e(l._,d._));l.parent.A=s(l,d,l.parent.A||T[0])}function a(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function s(l,f,T){if(f){for(var d=l,m=l,A=f,b=d.parent.children[0],g=d.m,w=m.m,_=A.m,R=b.m,y;A=Jn(A),d=Qn(d),A&&d;)b=Qn(b),m=Jn(m),m.a=l,y=A.z+_-d.z-g+e(A._,d._),y>0&&(dl(gl(A,l,T),l,y),g+=y,w+=y),_+=A.m,g+=d.m,R+=b.m,w+=m.m;A&&!Jn(m)&&(m.t=A,m.m+=_-w),d&&!Qn(b)&&(b.t=d,b.m+=g-R,T=l)}return T}function c(l){l.x*=t,l.y=l.depth*n}return r.separation=function(l){return arguments.length?(e=l,r):e},r.size=function(l){return arguments.length?(i=!1,t=+l[0],n=+l[1],r):i?null:[t,n]},r.nodeSize=function(l){return arguments.length?(i=!0,t=+l[0],n=+l[1],r):i?[t,n]:null},r}function lr(e,t){const n=new Set(t.map(i=>i.target.id));for(const i of e)if(!n.has(i.id))return i;return e[0]}const _l=1e6;function cr(e,t){var s;const n=new Map;for(const c of e)n.set(c.id,[]);for(const c of t)(s=n.get(c.from.id))==null||s.push(c.to);let i=0,r=!1,o=null,a=-1;for(const c of e){const l=new Set([c.id]),f=[c];for(;f.length>0&&!r;){const d=f.pop();for(const m of n.get(d.id)??[]){if(++i>_l){r=!0;break}l.has(m.id)||(l.add(m.id),f.push(m))}}const T=l.size-1;if(T>a&&(a=T,o=c),r)break}return r&&console.warn("Pivotick: reachability search hit its traversal cap, using the best root found so far."),o??e[0]}function Tl(e,t){return ur(e,t)}function ur(e,t){const n=new Map,i=new Map;for(const l of e)n.set(l.id,[]),i.set(l.id,0);for(const l of t)l.directed!==!1&&(n.get(l.from.id).push(l.to),i.set(l.to.id,(i.get(l.to.id)||0)+1));const r=[],o=e.filter(l=>i.get(l.id)===0);for(;o.length;){const l=o.shift();r.push(l);for(const f of n.get(l.id))i.set(f.id,i.get(f.id)-1),i.get(f.id)===0&&o.push(f)}if(r.length!==e.length)return console.warn("Pivotick: the graph has a cycle, so no shallowest root is defined — using the first node."),e[0];const a=new Map;for(let l=r.length-1;l>=0;l--){const f=r[l];let T=0;for(const d of n.get(f.id))T=Math.max(T,1+(a.get(d.id)??0));a.set(f.id,T)}let s=null,c=1/0;for(const l of e){const f=a.get(l.id);f<c&&(c=f,s=l)}return s??e[0]}function bl(e,t,n){var T;const i=new Map(e.map(d=>[d.id,d])),r=new Map(e.map(d=>[d.id,[]]));for(const d of t)!r.has(d.from.id)||!r.has(d.to.id)||(r.get(d.from.id).push(d.to.id),r.get(d.to.id).push(d.from.id));const o=d=>{const m=new Map([[d,0]]),A=new Map,b=[d];for(let g=0;g<b.length;g++){const w=b[g];for(const _ of r.get(w)??[])m.has(_)||(m.set(_,m.get(w)+1),A.set(_,w),b.push(_))}return{levels:m,parentOf:A,farthest:b[b.length-1]}},a=n!==void 0&&r.has(n)?n:(T=e[0])==null?void 0:T.id;if(a===void 0)return e[0];const s=o(a).farthest,{parentOf:c,farthest:l}=o(s),f=[];for(let d=l;d!==void 0;d=c.get(d))f.push(d);return i.get(f[Math.floor(f.length/2)])??e[0]}const Sl=24,wl=16,ti=1,hr=.1;function ei(e,t){return e?e.measured<=0?mn[1]:e.needed/e.measured*t:ti}function ni(e){if(!Number.isFinite(e))return ti;const t=Math.ceil(e/hr)*hr;return Math.min(mn[1],Math.max(ti,Math.round(t*10)/10))}function Al(e){const t=ei(e.level,e.current.levelSpacing);if(e.radial){const n=ei(e.sibling,e.current.levelSpacing);return{levelSpacing:ni(Math.max(t,n)),siblingSpacing:e.current.siblingSpacing}}return{levelSpacing:ni(t),siblingSpacing:ni(ei(e.sibling,e.current.siblingSpacing))}}function vl(e,t){return e+t+Sl}function El(e,t){return e+t+wl}const xl=20,fr="__pivotick_forest_root__",dr="__pivotick_tree_spacer__",pr=4096,Nl=5e4,gr=.5;let mr="";const ii={type:"tree",rootId:void 0,parentKey:void 0,depthKey:void 0,rootIdAlgorithmFinder:"MaxReachability",strength:.25,radial:!1,radialGap:750,spacing:"auto",levelSpacing:1,siblingSpacing:1,horizontal:!1};class ${constructor(t,n,i,r={}){E(this,"graph");E(this,"simulation");E(this,"simulationForces");E(this,"options");E(this,"originalForceStrength");E(this,"canvasBCR");E(this,"levels");E(this,"maxDepth",0);E(this,"autoSpacing");E(this,"parkedIds",new Set);E(this,"positionedNodesByID");this.graph=t,this.simulation=n,this.simulationForces=i,this.options=hn({},ii,r),this.originalForceStrength={link:this.simulationForces.link.strength(),charge:this.simulationForces.charge.strength(),gravity:this.simulationForces.gravity.strength()},this.autoSpacing=r.spacing==="auto"||r.spacing!=="manual"&&r.levelSpacing===void 0&&r.siblingSpacing===void 0,this.positionedNodesByID=new Map,this.levels=new Map,this.setSizes(),this.update(),this.registerForces()}update(){var n,i;if(this.layoutOnce(),!this.autoSpacing||this.positionedNodesByID.size===0)return;const t=Al(this.measureAutoContext());t.levelSpacing===this.options.levelSpacing&&t.siblingSpacing===this.options.siblingSpacing||(this.options.levelSpacing=t.levelSpacing,this.options.siblingSpacing=t.siblingSpacing,this.layoutOnce(),(i=(n=this.graph.UIManager)==null?void 0:n.physicsFlyout)==null||i.syncAutoSpacing(t))}layoutOnce(){const t=this.graph.getNodes(),n=this.graph.getEdges(),i=this.buildLevels(t,n,this.options),{levels:r,maxDepth:o,parked:a}=i;this.parkedIds=new Set(a);const{nodes:s,nodeById:c}=this.buildTree(t,n,this.options,this.canvasBCR,i);this.positionedNodesByID=c,this.levels=r,this.maxDepth=o,s&&this.setNodePositions(s,this.options)}measureAutoContext(){const t=new Map;for(const[o,a]of this.positionedNodesByID){const s=this.graph.getMutableNode(o);if(!s||this.parkedIds.has(o))continue;const c=s.expanded?s.getCircleRadiusCollapsed():s.getCircleRadius(),l=Number.isFinite(c)?c:0,f=t.get(a.depth)??[];f.push({node:a,radius:l}),t.set(a.depth,f)}const n=[...t.keys()].sort((o,a)=>o-a);let i=null,r=null;for(let o=0;o<n.length;o++){const a=t.get(n[o]),s=o+1<n.length?t.get(n[o+1]):void 0;if(s){const l=Math.max(n[o+1]-n[o],1),f=Math.abs((s[0].node.y??0)-(a[0].node.y??0))/l,T=vl($.widestOf(a),$.widestOf(s));i=$.tighter(i,{measured:f,needed:T})}const c=[...a].sort((l,f)=>(l.node.x??0)-(f.node.x??0));for(let l=1;l<c.length;l++){const[f,T]=[c[l-1],c[l]],d=this.options.radial?2*(T.node.y??0)*Math.sin(Math.abs((T.node.x??0)-(f.node.x??0))/2):(T.node.x??0)-(f.node.x??0),m=El(f.radius,T.radius);r=$.tighter(r,{measured:d,needed:m})}}return{level:i,sibling:r,radial:this.options.radial,current:this.getSpacing()}}static tighter(t,n){if(!t)return n;const i=r=>r.needed/Math.max(r.measured,1e-6);return i(n)>i(t)?n:t}static widestOf(t){return t.reduce((n,i)=>Math.max(n,i.radius),0)}setSizes(){const t=this.graph.renderer.getCanvas();if(!t)throw new Error("Canvas element is not defined in the graph renderer.");this.canvasBCR=t.getBoundingClientRect()}setNodePositions(t,n){for(const i of t){const r=this.graph.getMutableNode(i.data.id);if(r)if(n.radial){const o=i.x??0,a=i.y??0;r.x=a*Math.cos(o-Math.PI/2),r.y=a*Math.sin(o-Math.PI/2),r.fx=r.x,r.fy=r.y}else n.horizontal?(r.x=i.y,r.fx=i.y,r.y=i.x,delete r.fy):(r.x=i.x,r.y=i.y,r.fy=i.y,delete r.fx)}}unsetNodePositions(){this.graph.getMutableNodes().forEach(t=>{delete t.fy,delete t.fx})}registerForces(){const t=this.options.strength??.1;if(this.options.radial){const n=$.radialRingGap(this.options,this.maxDepth),i=Ni(r=>(this.levels.get(r.id)??1)*n,0,0).strength(t);this.simulation.force("tree-radial",i)}else this.simulation.force("tree-y",Ii(n=>{var i,r;return this.options.horizontal?((i=this.positionedNodesByID.get(n.id))==null?void 0:i.x)??0:((r=this.positionedNodesByID.get(n.id))==null?void 0:r.y)??0}).strength(t)),this.simulation.force("tree-x",Ri(n=>{var i,r;return this.options.horizontal?((i=this.positionedNodesByID.get(n.id))==null?void 0:i.y)??0:((r=this.positionedNodesByID.get(n.id))==null?void 0:r.x)??0}).strength(t));$.adjustOtherSimulationForces(this.simulationForces,this.options)}unregisterLayout(){this.unregisterForces(),this.unsetNodePositions()}unregisterForces(){this.simulation.force("tree-radial",null),this.simulation.force("tree-y",null),this.simulation.force("tree-x",null),$.resetOtherSimulationForces(this.simulationForces,this.originalForceStrength)}static registerForcesOnSimulation(t,n,i,r,o,a,s=this){const c=hn({},ii,o),l=c.strength??.1,f=a.width,T=a.height,d=[f/2,T/2],m=s.buildLevelsStatic(t,n,c),{levels:A,maxDepth:b}=m,{nodeById:g}=s.buildTreeStatic(t,n,c,a,m);if(c.radial){const w=s.radialRingGap(c,b),_=Ni(R=>(A.get(R.id)??1)*w,d[0],d[1]).strength(l);i.force("tree-radial",_)}else i.force("tree-y",Ii(w=>{var _,R;return c.horizontal?((_=g.get(w.id))==null?void 0:_.x)??0:((R=g.get(w.id))==null?void 0:R.y)??0}).strength(l)),i.force("tree-x",Ri(w=>{var _,R;return c.horizontal?((_=g.get(w.id))==null?void 0:_.y)??0:((R=g.get(w.id))==null?void 0:R.x)??0}).strength(l));s.adjustOtherSimulationForces(r,c)}static adjustOtherSimulationForces(t,n){n!=null&&n.radial?(t.link.strength(0),t.charge.strength(0),t.gravity.strength(0)):(t.link.strength(0),t.charge.strength(0),t.gravity.strength(1e-5))}static resetOtherSimulationForces(t,n){t.link.strength(n.link),t.charge.strength(n.charge),t.gravity.strength(n.gravity)}static simulationDone(t,n,i,r){const o=hn({},ii,r);for(const a of t)o.radial?(a.fx=a.x,a.fy=a.y):o.horizontal?(a.fx=a.x,delete a.fy):(a.fy=a.y,delete a.fx)}static radialRingGap(t,n){const i=t.radialGap*$.spacingOf(t).level;return n>0?i/n:i}static spacingOf(t){const n=i=>Number.isFinite(i)?i:1;return{level:n(t.levelSpacing),sibling:n(t.siblingSpacing)}}getSpacing(){const{level:t,sibling:n}=$.spacingOf(this.options);return{levelSpacing:t,siblingSpacing:n}}setSpacing(t){this.autoSpacing=!1,this.options.spacing="manual",t.levelSpacing!==void 0&&(this.options.levelSpacing=t.levelSpacing),t.siblingSpacing!==void 0&&(this.options.siblingSpacing=t.siblingSpacing),this.relayout()}isAutoSpacing(){return this.autoSpacing}getRoot(){return{rootId:this.options.rootId,algorithm:this.options.rootIdAlgorithmFinder}}setRoot(t){"rootId"in t?this.options.rootId=t.rootId:(this.options.rootId=void 0,this.options.rootIdAlgorithmFinder=t.algorithm),this.relayout()}enableAutoSpacing(){this.autoSpacing=!0,this.options.spacing="auto",this.relayout()}relayout(){this.setSizes(),this.update(),this.positionedNodesByID.size!==0&&this.registerForces()}static sizedTreeLayout(t,n){const i=$.spacingOf(t),r=yl();if(t.radial)return r.size([2*Math.PI,t.radialGap*i.level]),{treeLayout:r,offset:{x:0,y:0}};const o=t.horizontal?n.width:n.height,a=t.horizontal?n.height:n.width,s=a*i.sibling,c=o*i.level;return r.size([s,c]).separation((l,f)=>{var d,m;const T=((m=(d=l.parent)==null?void 0:d.children)==null?void 0:m.length)??1;return l.parent===f.parent?1.5/T:1.5}),{treeLayout:r,offset:{x:-(s-a)/2,y:-(c-o)/2}}}static packParked(t,n,i,r,o=new Map){if(!t.length)return[];const a=I=>{const B=I.getCircleRadius();return Number.isFinite(B)?B:0},s=2*t.reduce((I,B)=>Math.max(I,a(B)),0)+xl,c=(I,B,Z,ut)=>({data:I,depth:ut,x:B,y:Z,height:0}),l=n.map(I=>I.x??0),f=n.map(I=>I.y??0),T=t.filter(I=>o.has(I.id)),d=t.filter(I=>!o.has(I.id)),m=I=>o.get(I.id)??0,A=[...new Set(n.map(I=>I.depth))].sort((I,B)=>I-B),b=new Map;for(const I of n)b.set(I.depth,I.y??0);const g=A[0]??0,w=A[A.length-1]??0,_=w>g?((b.get(w)??0)-(b.get(g)??0))/(w-g):s,R=I=>b.get(I)??(A.length?(b.get(g)??0)+(I-g)*_:I*s);if(i.radial){const I=[],B=new Map;for(const it of T){const H=m(it);B.set(H,[...B.get(H)??[],it])}for(const[it,H]of B){const q=n.filter(U=>U.depth===it).map(U=>U.x??0).sort((U,St)=>U-St);let Qt=0,J=2*Math.PI;if(q.length){J=0;for(let U=0;U<q.length;U++){const St=U+1<q.length?q[U+1]:q[0]+2*Math.PI;St-q[U]>J&&(J=St-q[U],Qt=q[U])}}const Jt=J/(H.length+1);H.forEach((U,St)=>I.push(c(U,Qt+Jt*(St+1),R(it),it)))}const Z=new Set(f).size,ut=f.length?Math.max(...f):i.radialGap,mt=Z>0?ut/Z:ut;return d.forEach((it,H)=>I.push(c(it,H*2*Math.PI/d.length,ut+mt,Z+1))),I}if(!n.length){const I=Math.max(1,Math.floor(r.width/s)),B=[],Z=new Map;for(const mt of T){const it=m(mt),H=Z.get(it)??0;Z.set(it,H+1),B.push(c(mt,H*s,it*s,it))}const ut=Z.size?Math.max(...Z.keys())+1:0;return d.forEach((mt,it)=>{const H=ut+Math.floor(it/I);B.push(c(mt,it%I*s,H*s,H))}),B}const y=new Map,C=new Map;for(const I of n){const B=I.y??0,Z=I.x??0;y.set(B,Math.max(y.get(B)??Z,Z)),C.set(I.depth,Math.max(C.get(I.depth)??Z,Z))}const O=[...y.keys()].sort((I,B)=>I-B),G=Math.min(...l),P=Math.max(...l),F=O.length>1?O[1]-O[0]:s,z=[],X=[],nt=new Map;for(const I of T){const B=m(I),Z=R(B),ut=nt.get(Z)??0,mt=P-ut*s,it=C.get(B);if(it!==void 0&&mt-s<=it){X.push(I);continue}nt.set(Z,ut+1),z.push(c(I,mt,Z,B))}const N=[...d,...X];let D=0;for(const[I,B]of O.entries()){if(D>=N.length)break;const Z=nt.get(B)??0,ut=P-Z*s-((y.get(B)??P)+s),mt=Math.floor(ut/s);for(let it=0;it<mt&&D<N.length;it++)z.push(c(N[D++],P-(Z+it)*s,B,I))}const K=Math.max(1,Math.floor((P-G)/s)),j=O[O.length-1];for(let I=0;D<N.length;I++)z.push(c(N[D++],P-I%K*s,j+F*(1+Math.floor(I/K)),O.length));return z}static offsetTree(t,n){if(!(!n.x&&!n.y))for(const i of t)i.x=(i.x??0)+n.x,i.y=(i.y??0)+n.y}buildTree(t,n,i,r,o){return $.buildTreeStatic(t,n,i,r,o)}static isScaffolding(t){return t===fr||t.startsWith(dr)}static buildTreeStatic(t,n,i,r,o){if(!t.length)return{root:null,nodes:[],nodeById:new Map};const a=new Map;for(const F of t){const z=F;z.children=[],a.set(F.id,z)}const{parentOf:s,roots:c,parked:l,levels:f,declaredRows:T}=o??$.buildLevelsStatic(t,n,i);let d=0;const m=()=>({id:`${dr}${d++}`,children:[]}),A=F=>f.get(F)??0,b=(F,z,X,nt)=>{let N=F;for(let D=z+1;D<nt&&d<Nl;D++){const K=m();N.children.push(K),N=K}N.children.push(X)};for(const[F,z]of s){const X=a.get(F),nt=a.get(z);!X||!nt||(b(nt,A(z),X,A(F)),X.parent=nt)}const g=l.map(F=>a.get(F)).filter(F=>!!F),w=$.hierarchyRootFor(c,a,A,b,m);if(!w){if(!c.length&&g.length){const F=$.packParked(g,[],i,r,T);return{root:null,nodes:F,nodeById:new Map(F.map(z=>[z.data.id,z]))}}throw new Error(`Root node with id "${c[0]}" not found.`)}const{treeLayout:_,offset:R}=$.sizedTreeLayout(i,r),y=fn(w),C=_(y);$.offsetTree(C.descendants(),R);const O=C.descendants().filter(F=>!$.isScaffolding(F.data.id)),G=$.packParked(g,O,i,r,T),P=new Map;for(const F of G)P.set(F.data.id,F);return C.descendants().forEach(F=>{$.isScaffolding(F.data.id)||P.set(F.data.id,F)}),{root:C,nodes:[...O,...G],nodeById:P}}static hierarchyRootFor(t,n,i,r,o){if(t.length===1){const c=n.get(t[0]);if(!c||i(t[0])<=0)return c;const l=o();return r(l,0,c,i(t[0])),l}const a=t.map(c=>n.get(c)).filter(c=>!!c);if(!a.length)return;const s={id:fr,children:[]};for(const c of a)r(s,0,c,i(c.id));return s}buildLevels(t,n,i){return $.buildLevelsStatic(t,n,i)}static readDeclaredHierarchy(t,n,i){const r=new Map,o=new Map,a=new Map,s=d=>a.set(d,(a.get(d)??0)+1),c=i?n.parentKey:void 0,l=n.depthKey;if(!c&&!l)return{parentOf:r,rowOf:o,complaints:a};const f=new Set(t.map(d=>d.id));for(const d of t){const m=d.getData();if(l){const g=m[l];if(g!=null&&g!==""){const w=Math.floor(Number(g));Number.isFinite(w)&&w>=0&&w<=pr?o.set(d.id,w):s(`declared depths that are not a row between 0 and ${pr}`)}}if(!c)continue;const A=m[c];if(A==null||A==="")continue;const b=String(A);b===d.id?s("declared parents pointing at their own node"):f.has(b)?r.set(d.id,b):s("declared parents not in the layout")}const T=new Set;for(const d of[...r.keys()]){if(T.has(d))continue;const m=[],A=new Set;let b=d;for(;b!==void 0&&!T.has(b);){if(A.has(b)){r.delete(b),s("declared parent cycles broken");break}A.add(b),m.push(b),b=r.get(b)}for(const g of m)T.add(g)}return{parentOf:r,rowOf:o,complaints:a}}static warnAboutDeclared(t){if(!t.size)return;const n="[Pivotick] Tree layout ignored part of the declared hierarchy: "+[...t].map(([i,r])=>`${r} ${i}`).join(", ")+".";n!==mr&&(mr=n,console.warn(n))}static buildLevelsStatic(t,n,i={}){var nt;if(!t.length)return{levels:new Map,maxDepth:0,nodeCountPerLevel:{},parentOf:new Map,roots:[],parked:[],declaredRows:new Map};const r=i.rootId!==void 0&&t.some(N=>N.id===i.rootId)?i.rootId:void 0,o=$.readDeclaredHierarchy(t,i,r===void 0);let a=r!==void 0;const s=new Map,c=new Map(o.parentOf),l=new Map,f=new Set,T=new Set;for(const N of t)l.set(N.id,[]);for(const{source:N,target:D}of n)(nt=l.get(N.id))==null||nt.push(D.id),f.add(D.id),T.add(N.id),T.add(D.id);for(const[N,D]of o.parentOf)T.add(N),T.add(D),f.add(N);const d=()=>{var N;for(const{source:D,target:K}of n)(N=l.get(K.id))==null||N.push(D.id);a=!0};a&&d();const m=N=>T.has(N)||N===r,A=t.filter(N=>m(N.id)),b=t.filter(N=>!m(N.id)).map(N=>N.id),g=o.parentOf.size>0,w=(N,D)=>{const K=new Set;let j=D;for(;j!==void 0&&!K.has(j);){if(j===N)return!0;K.add(j),j=c.get(j)}return!1},_=new Set,R=N=>{if(_.has(N))return;_.add(N);const D=[N];let K=0;for(;K<D.length;){const j=D[K++];for(const I of l.get(j)??[])_.has(I)||(_.add(I),!c.has(I)&&!(g&&w(I,j))&&c.set(I,j),D.push(I))}},y=[];if(A.length){const N=g?A.filter(j=>!c.has(j.id)):A,D=N.length?N:A;let K=r??$.findRootId(D,n,i.rootIdAlgorithmFinder);if(r===void 0&&$.directedCoverage(K,l,n)<gr){const j=cr(D,n).id;$.directedCoverage(j,l,n)<gr&&(d(),K=bl(D,n,j).id)}R(K);for(const j of A){if(_.has(j.id))continue;const I=A.find(B=>!_.has(B.id)&&!f.has(B.id))??j;R(I.id)}c.has(K)||y.push(K);for(const j of A)j.id!==K&&!c.has(j.id)&&y.push(j.id)}const C=new Map;for(const[N,D]of c){const K=C.get(D)??[];K.push(N),C.set(D,K)}let O=0;const G=(N,D)=>{const K=[[N,D]];for(;K.length;){const[j,I]=K.pop();if(s.has(j))continue;const B=o.rowOf.get(j);B!==void 0&&B<I&&O++;const Z=B!==void 0&&B>I?B:I;s.set(j,Z);for(const ut of C.get(j)??[])K.push([ut,Z+1])}};for(const N of y)G(N,0);for(const N of A)s.has(N.id)||G(N.id,0);O&&o.complaints.set("declared depths clamped to just below their parent",O),$.warnAboutDeclared(o.complaints);const P=y.length>1?1:0;if(P)for(const[N,D]of s)s.set(N,D+P);let F=0;for(const N of s.values())N>F&&(F=N);if(b.length){const N=F+1;for(const D of b){const K=o.rowOf.get(D);s.set(D,K===void 0?N:K+P)}for(const D of s.values())D>F&&(F=D)}const z=new Map;for(const[N,D]of o.rowOf)z.set(N,D+P);const X={};for(const N of s.values())X[N]=(X[N]||0)+1;return{levels:s,maxDepth:F,nodeCountPerLevel:X,parentOf:c,roots:y,parked:b,declaredRows:z}}static directedCoverage(t,n,i){var s,c;const r=l=>{const f=new Set([t]),T=[t];for(let d=0;d<T.length;d++)for(const m of l.get(T[d])??[])f.has(m)||(f.add(m),T.push(m));return f.size},o=new Map;for(const l of n.keys())o.set(l,[]);for(const{source:l,target:f}of i)(s=o.get(l.id))==null||s.push(f.id),(c=o.get(f.id))==null||c.push(l.id);const a=r(o);return a===0?1:r(n)/a}static findRootId(t,n,i){switch(i){case"FirstZeroInDegree":return lr(t,n).id;case"MaxReachability":return cr(t,n).id;case"MinMaxDistance":return Tl(t,n).id;case"MinHeight":return ur(t,n).id;default:return lr(t,n).id}}}class le extends ${constructor(t,n,i,r){super(t,n,i,{...r,type:"tree"})}static registerForcesOnSimulation(t,n,i,r,o,a){$.registerForcesOnSimulation(t,n,i,r,o,a,le)}buildTree(t,n,i,r){return le.buildTreeStatic(t,n,i,r)}static buildTreeStatic(t,n,i,r){if(!t.length)return{root:null,nodes:[],nodeById:new Map};const o=new Map;for(const A of t){const b=A;b.children=[],o.set(A.id,b)}if(!i.rootId||!o.get(i.rootId))throw new Error("Ego Tree can only be created with a rootId");const a=i.rootId,s=o.get(a);if(s.children=[],!s)throw new Error(`Root node with id "${a}" not found.`);const c=new Set([s.id]);for(const A of n){const b=o.get(A.source.id),g=o.get(A.target.id);if(!b||!g)continue;const w=A.source.id===s.id?g:A.target.id===s.id?b:void 0;!w||c.has(w.id)||(c.add(w.id),s.children.push(w),w.parent=s)}const{treeLayout:l,offset:f}=le.sizedTreeLayout(i,r),T=fn(s),d=l(T);le.offsetTree(d.descendants(),f);const m=new Map;return d.descendants().forEach(A=>{m.set(A.data.id,A)}),{root:d,nodes:d.descendants(),nodeById:m}}}function Rl(e){var n;const t=(n=e.getData())==null?void 0:n.label;return typeof t=="string"?t:""}const yr=.3,Il=1,_r=4,Ml=400,Cl=24,Dl=6.5,Ol=10,Ll=140,Fl=1.15,kl=.35,Pl=.35,zl=.0058,Gl=38,Tr=95,Bl=300,Ul=.35,Hl=8,Wl=10,jl=.54,br=24,Kl=62,Vl=.2,$l=240,Xl=.9,pn=.001,Yl=.06,ql=.03,Zl=8,Sr=.002;function Se(e,t,n){return Math.max(t,Math.min(n,e))}function Pe(e){return Se(e,0,1)}function gn(e,t){const[n,i]=lt[t];return Se(e,n,i)}function Ql(e){return yr+(Il-yr)*wr(e)}function wr(e){return Pe(Math.log10(Math.max(e,1)/_r)/Math.log10(Ml/_r))}function Ar(e){const t=10+Math.sqrt(Math.max(0,e-10));return t*t/100}function Jl(e,t){const n=Math.pow(Math.max(1,t)/Wl,jl),i=Gl*Math.pow(Bl/Math.max(1,e),Ul);return Se(i*n,Hl,Tr)}function tc(e,t,n){const i=e/Ar(t);return Se(i/400*100,Jl(n,t),Tr)}function ec(e,t){return e/100*400*Ar(t)}function nc(e){const t=(e-.6)/1.7999999999999998;return gn(4+t*56,"collisionRadius")}function ic(e,t,n,i){const r=Math.max(1,Xl*.5*Math.min(t.width,t.height)),o=$l*n*e/(r*r*r),a=pn+(ql-pn)*Math.pow(1-wr(n),3),s=pn+(Yl-pn)*Pe(i),c=Math.max(a,s),l=Se(o,Sr,Math.max(Sr,c));return gn(100*Math.sqrt(Pe(l/Vl)),"centering")}function rc(e){return gn(1.2+.8*Math.log10(Math.max(e,1)),"settleTime")}function oc(e){const t=Pe(Math.log10(Math.max(e,1)/4)/Math.log10(125));return br+(Kl-br)*t}function sc(e){return{repulsion:Math.round(e.repulsion),linkDistance:Math.round(e.linkDistance),collisionRadius:Math.round(e.collisionRadius),friction:Math.round(e.friction),centering:Math.round(e.centering),settleTime:Math.round(e.settleTime*10)/10}}function ac(e){const t=Ql(e.nodeCount)*e.canvas.width*e.canvas.height;return{targetArea:t,spacing:Math.sqrt(t/Math.max(1,e.nodeCount))}}function lc(e){const{spacing:t}=ac(e),n=Math.max(1,e.radii.mean),i=Math.max(.8*t,Dl*n),r=2*n+Cl,o=Math.min(lt.linkDistance[1],Ol*n+Ll),a=gn(Se(i,r,Math.max(r,o)),"linkDistance"),s=zl*t*t,c=e.radii.totalArea/Math.max(1,e.nodeCount*a*a),l=Fl+kl*Pe(c/Pl),f=tc(s,n,e.nodeCount);return sc({repulsion:f,linkDistance:a,collisionRadius:nc(l),friction:oc(e.nodeCount),centering:ic(ec(f,n),e.canvas,e.nodeCount,e.looseNodeFraction),settleTime:rc(e.nodeCount)})}function cc(e,t){const n=new Map;for(const a of e)n.set(a,a);const i=a=>{let s=a;for(;n.get(s)!==s;)s=n.get(s);let c=a;for(;n.get(c)!==s;){const l=n.get(c);n.set(c,s),c=l}return s};let r=e.length;for(const[a,s]of t){if(!n.has(a)||!n.has(s))continue;const c=i(a),l=i(s);c!==l&&(n.set(c,l),r--)}let o=0;if(r>1){const a=new Map;for(const s of e){const c=i(s);a.set(c,(a.get(c)??0)+1)}for(const s of a.values())s<Zl&&(o+=s)}return{count:r,looseNodeFraction:e.length?o/e.length:0}}const ze={d3Alpha:1,d3AlphaMin:.001,d3AlphaDecay:.05,d3AlphaTarget:0,d3VelocityDecay:.45,d3LinkDistance:40,d3LinkStrength:null,d3ManyBodyStrength:-150,d3ManyBodyTheta:.9,d3CollideRadius:12,d3CollideRadiusMultiplier:1.2,d3CollideStrength:1,d3CollideIterations:1,d3GravityStrength:.1,d3GravityStrengthConnected:.001,enabled:!0,cooldownTime:2e3,useWorker:!0,warmupTicks:"auto",freezeNodesOnDrag:!0,gridSnappingEnabled:!1,gridSize:50,fitViewOnExpandCollapse:!1,layout:{type:"force"},callbacks:{onInit:()=>{},onStart:()=>{},onStop:()=>{},onTick:()=>{}}},lt={repulsion:[0,100],linkDistance:[40,600],collisionRadius:[4,60],friction:[0,100],centering:[0,100],settleTime:[.5,8]},mn=[.5,10],uc="MaxReachability",hc={levelSpacing:1,siblingSpacing:1},fc={tight:{repulsion:32,linkDistance:70,collisionRadius:16,friction:45,centering:7,settleTime:3},loose:{repulsion:70,linkDistance:150,collisionRadius:26,friction:28,centering:7,settleTime:2.25}},x=class x{constructor(t,n={}){E(this,"simulation");E(this,"graph");E(this,"container");E(this,"graphInteraction");E(this,"layout");E(this,"containerBCR");E(this,"containerObserver");E(this,"animationFrameId",null);E(this,"startSimulationTime",0);E(this,"engineRunning",!1);E(this,"slowTickThresholdReached",!1);E(this,"avgTickDuration",0);E(this,"SLOW_TICK_THRESHOLD",33);E(this,"dragInProgress",!1);E(this,"dragSelection",[]);E(this,"totalTickCount",0);E(this,"runTickCount",0);E(this,"options");E(this,"callbacks");E(this,"simulationForces");E(this,"scaledForces",{d3ManyBodyStrength:ze.d3ManyBodyStrength,d3CollideStrength:ze.d3CollideStrength});E(this,"physicsKnobs");E(this,"autoEnabled");E(this,"autoTuneTimer",null);E(this,"applyingAutoKnobs",!1);E(this,"suppressReheat",!1);E(this,"autoLastRun",null);if(this.graph=t,this.autoEnabled=x.shouldAutoTune(n),this.options=hn({},ze,n),this.callbacks=this.options.callbacks??{},this.physicsKnobs=x.knobsFromOptions(this.options),this.container=this.graph.renderer.getRootContainer(),!this.container)throw new Error("Root container is not defined in the graph renderer.");if(this.containerBCR=x.measureContainer(this.container),this.graphInteraction=this.graph.renderer.getGraphInteraction(),!this.graphInteraction)throw new Error("Graph interaction is not available.");const i=x.initSimulationForces(this.options,this.containerBCR);this.simulation=i.simulation,this.simulationForces=i.simulationForces,this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength||ze.d3ManyBodyStrength,this.scaledForces.d3CollideStrength=this.options.d3CollideStrength||ze.d3CollideStrength,this.options.layout.type==="tree"?this.layout=new $(this.graph,this.simulation,this.simulationForces,this.options.layout):this.options.layout.type==="egoTree"&&(this.layout=new le(this.graph,this.simulation,this.simulationForces,this.options.layout)),this.layout&&Object.assign(this.options.layout,this.layout.getSpacing()),this.observeContainer(),this.callbacks.onInit&&this.callbacks.onInit(this)}static measureContainer(t){const n=t.getBoundingClientRect();if(n.width>0&&n.height>0)return n;const{width:i,height:r}=x.FALLBACK_CONTAINER_SIZE;return new DOMRect(n.x,n.y,i,r)}observeContainer(){!this.container||typeof ResizeObserver>"u"||(this.containerObserver=new ResizeObserver(()=>{if(!this.container)return;const t=x.measureContainer(this.container);t.width===this.containerBCR.width&&t.height===this.containerBCR.height||(this.containerBCR=t,x.initSimulationForceGravity(this.simulationForces.gravity,this.options,t),this.scheduleTune())}),this.containerObserver.observe(this.container))}destroy(){var t;this.stop(),(t=this.containerObserver)==null||t.disconnect(),this.containerObserver=void 0,this.container=void 0}static initSimulationForces(t,n){const i={link:Jr(),charge:mo(),collide:Zr(),gravity:yo()},r=go().force("link",i.link).force("charge",i.charge).force("collide",i.collide).force("gravity",i.gravity);return this.initSimulationForceGravity(i.gravity,t,n),this.initSimulationForceLink(i.link,t),this.initSimulationForceCharge(i.charge,t),this.initSimulationForceCollide(i.collide,t),r.alphaMin(t.d3AlphaMin),r.alphaDecay(t.d3AlphaDecay),r.alphaTarget(0),r.velocityDecay(t.d3VelocityDecay),{simulation:r,simulationForces:i}}static initSimulationForceGravity(t,n,i){t.x(i.width/2).y(i.height/2).strength(r=>(r.degree()??0)===0?n.d3GravityStrength:n.d3GravityStrengthConnected)}static initSimulationForceLink(t,n){t.distance(i=>{const r=i.__clusterAnchorDistance;if(r!=null)return r;const o=Rl(i);if(!o||o==="")return n.d3LinkDistance;const a=o.length*10;return Math.max(n.d3LinkDistance,a)}),n.d3LinkStrength&&t.strength(n.d3LinkStrength)}static initSimulationForceCharge(t,n){t.theta(n.d3ManyBodyTheta).strength(i=>{const r=i,o=n.d3ManyBodyStrength,a=r.expanded?r.getCircleRadiusCollapsed():r.getCircleRadius(),s=10+Math.sqrt(Math.max(0,a-10));let c=r.weight??1;return c*=r.isParent?10:1,o*(s*s)/100*c})}static initSimulationForceCollide(t,n){const i=n.d3CollideRadiusMultiplier;t.radius(r=>{const o=r;return o.expanded?i*o.getCircleRadius()+20:o.getCircleRadius()?i*o.getCircleRadius():n.d3CollideRadius}).strength(n.d3CollideStrength)}static initSimulationForceClusterRadialConstraint(t,n){t.strength(n.d3CollideStrength)}update(){this.layout?(this.layout.update(),Object.assign(this.options.layout,this.layout.getSpacing())):this.scheduleTune();const t=this.graph.getMutableNodes().filter(i=>i.visible);this.simulation.nodes(t);const n=this.simulation.force("link");n&&n.id(i=>i.id).links(this.getActiveEdges()),this.restart()}getActiveEdges(){const t=new Set(this.graph.getMutableNodes().filter(a=>a.visible).map(a=>a.id)),n=a=>{let s=a;for(;s&&!t.has(s.id);)s=s.parentNode;return s},i=(a,s)=>a<s?`${a}|${s}`:`${s}|${a}`,r=[],o=new Set;for(const a of this.graph.getMutableEdges()){if(!a.visibleIgnoringLayer)continue;const s=a.source,c=a.target;if(!s.isChild&&!c.isChild){r.push(a),o.add(i(s.id,c.id));continue}if(s.isChild&&c.isChild)continue;const l=s.isChild?c:s,f=n(s.isChild?s:c);if(!f||f.id===l.id)continue;const T=i(l.id,f.id);o.has(T)||(o.add(T),r.push(this.clusterAnchorLink(l,f)))}return r}clusterAnchorLink(t,n){return{id:`cluster-anchor-${t.id}-${n.id}`,source:t,target:n,__clusterAnchorDistance:n.getCircleRadius()+this.options.d3LinkDistance}}enable(){this.avgTickDuration=0,this.options.enabled=!0,this.start(!1)}disable(){this.options.enabled=!1,this.stop()}pause(){this.engineRunning=!1,this.slowTickThresholdReached=!1}restart(){this.startSimulationTime=new Date().getTime(),this.runTickCount=0,this.engineRunning=!0,this.slowTickThresholdReached=!1}async start(t=!0){if(t&&(this.tuneNow({reheat:!1}),await this.runSimulationWorkerRouter()),!this.options.enabled){this.engineRunning=!1;return}this.engineRunning=!0,this.slowTickThresholdReached=!1,this.callbacks.onStart&&this.callbacks.onStart(this),this.animationFrameId===null&&this.startAnimationLoop()}stop(){this.engineRunning=!1,this.autoTuneTimer!==null&&(clearTimeout(this.autoTuneTimer),this.autoTuneTimer=null),this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.simulation.stop(),this.callbacks.onStop&&this.callbacks.onStop(this)}startAnimationLoop(){const t=()=>{this.animationFrameId=requestAnimationFrame(t),this.simulationTick()};this.engineRunning=!0,this.simulation.alpha(.01).restart(),this.animationFrameId=requestAnimationFrame(t)}simulationTick(){if(this.engineRunning){!this.dragInProgress&&this.cooledDown()&&(this.engineRunning=!1,this.simulation.stop(),this.callbacks.onStop&&this.callbacks.onStop(this)),this.totalTickCount++,this.runTickCount++;const t=performance.now();this.simulation.tick(),this.graph.nextTick(),this.updateTickMetrics(performance.now()-t),this.callbacks.onTick&&this.callbacks.onTick(this),this.graphInteraction.simulationTick(),this.totalTickCount%10===0&&this.graphInteraction.simulationSlowTick()}}cooledDown(){const t=this.options.cooldownTime/1e3*x.NOMINAL_FPS;return this.runTickCount>=t||this.options.d3AlphaMin>0&&this.simulation.alpha()<this.options.d3AlphaMin?!0:new Date().getTime()-this.startSimulationTime>this.options.cooldownTime*x.COOLDOWN_WALL_GRACE}updateTickMetrics(t){var n;this.avgTickDuration=this.avgTickDuration*.9+t*.1,this.avgTickDuration>this.SLOW_TICK_THRESHOLD&&(this.slowTickThresholdReached=!0,this.disable(),this.graph.UIManager.showNotification({level:"warning",title:"Physics engine running slow",message:"The physic has been disabled."}),(n=this.graph.UIManager.physicsFlyout)==null||n.syncRunState())}async waitForSimulationStop(){if(this.engineRunning)return new Promise(t=>{const n=this.callbacks.onStop;this.callbacks.onStop=i=>{n==null||n(i),this.callbacks.onStop=n,t()}})}isEnabled(){return this.options.enabled}applyComputedPositions(t){const n=new Map(t.map(i=>[i.id,i]));for(const i of this.graph.getMutableNodes()){const r=n.get(i.id);r&&(i.x=r.x,i.y=r.y,i.fx=typeof r.fx=="number"?r.fx:void 0,i.fy=typeof r.fy=="number"?r.fy:void 0)}}async computeGraph(t={}){const{runSimulation:n}=await Promise.resolve().then(function(){return pc}),i=this.containerBCR,r=this.graph.getMutableNodes(),o=this.graph.getNodes(),a=this.graph.getEdges(),{callbacks:s,...c}=this.options;Object.assign(c,t);const{nodes:l}=n(o,a,c,i);this.applyComputedPositions(l),this.graph.updateData(r,void 0,!1)}async runSimulationWorkerRouter(t={}){if(this.options.useWorker)try{await this.runSimulationWorker(t);return}catch(n){this.options.useWorker=!1,console.warn("[Pivotick] Simulation Web Worker unavailable (often a CSP blocking blob workers); falling back to the main thread. Set `simulation.useWorker: false` to silence this.",n)}await this.computeGraph(t),this.graph.updateLayoutProgress(100,0,"done")}async runSimulationWorker(t={}){const n=this.containerBCR,i=this.graph.getMutableNodes(),r=this.graph.getNodes().map(f=>f.toSimulationDTO()),o=this.graph.getEdges().map(f=>f.toSimulationDTO()),a=(f,T)=>{this.graph.updateLayoutProgress(f,T,"simulation")},{callbacks:s,...c}=this.options;Object.assign(c,t);const{nodes:l}=await Ha(r,o,c,n,a);this.graph.updateLayoutProgress(100,0,"rendering"),this.applyComputedPositions(l),this.graph.updateData(i,void 0,!1),this.graph.updateLayoutProgress(100,0,"done")}reheat(t=.7){this.restart(),this.simulation.alpha(t).restart()}refreshForcesAndReheat(t=.5){if(!this.options.enabled)return;this.tuneNow({reheat:!1});const n=this.graph.getMutableNodes().filter(i=>i.visible);this.simulation.nodes(n),this.reheat(t)}setRepulsion(t){const n=x.clamp(t,lt.repulsion);this.physicsKnobs.repulsion=n,this.options.d3ManyBodyStrength=x.mapLinear(n,lt.repulsion,x.REPULSION_STRENGTH_RANGE),this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength,x.initSimulationForceCharge(this.simulationForces.charge,this.options),this.noteManualKnobEdit(),this.reheatIfEnabled()}setLinkDistance(t){const n=x.clamp(t,lt.linkDistance);this.physicsKnobs.linkDistance=n,this.options.d3LinkDistance=x.mapLinear(n,lt.linkDistance,x.LINK_DISTANCE_RANGE),x.initSimulationForceLink(this.simulationForces.link,this.options),this.noteManualKnobEdit(),this.reheatIfEnabled()}setCollisionRadius(t){const n=x.clamp(t,lt.collisionRadius);this.physicsKnobs.collisionRadius=n,this.options.d3CollideRadiusMultiplier=x.mapLinear(n,lt.collisionRadius,x.COLLIDE_MULTIPLIER_RANGE),x.initSimulationForceCollide(this.simulationForces.collide,this.options),this.noteManualKnobEdit(),this.reheatIfEnabled()}setFriction(t){const n=x.clamp(t,lt.friction);this.physicsKnobs.friction=n,this.options.d3VelocityDecay=x.mapLinear(n,lt.friction,x.FRICTION_DECAY_RANGE),this.simulation.velocityDecay(this.options.d3VelocityDecay),this.noteManualKnobEdit()}setCentering(t){const n=x.clamp(t,lt.centering);this.physicsKnobs.centering=n,this.options.d3GravityStrengthConnected=x.gravityForCentering(n),this.options.d3GravityStrength=x.isolatedGravityFor(this.options.d3GravityStrengthConnected),x.initSimulationForceGravity(this.simulationForces.gravity,this.options,this.containerBCR),this.noteManualKnobEdit(),this.reheatIfEnabled()}setSettleTime(t){const n=x.clamp(t,lt.settleTime);this.physicsKnobs.settleTime=n,this.options.d3AlphaDecay=x.alphaDecayForSettleTime(n,this.options.d3AlphaMin),this.options.cooldownTime=n*1e3,this.simulation.alphaDecay(this.options.d3AlphaDecay),this.noteManualKnobEdit()}applyPhysicsPreset(t){this.disableAutoPhysics(),this.writeKnobs(fc[t]),this.reheatIfEnabled(x.CLICK_REHEAT_ALPHA)}writeKnobs(t){this.physicsKnobs={...t},this.options.d3ManyBodyStrength=x.mapLinear(t.repulsion,lt.repulsion,x.REPULSION_STRENGTH_RANGE),this.scaledForces.d3ManyBodyStrength=this.options.d3ManyBodyStrength,this.options.d3LinkDistance=x.mapLinear(t.linkDistance,lt.linkDistance,x.LINK_DISTANCE_RANGE),this.options.d3CollideRadiusMultiplier=x.mapLinear(t.collisionRadius,lt.collisionRadius,x.COLLIDE_MULTIPLIER_RANGE),this.options.d3VelocityDecay=x.mapLinear(t.friction,lt.friction,x.FRICTION_DECAY_RANGE),this.options.d3GravityStrengthConnected=x.gravityForCentering(t.centering),this.options.d3GravityStrength=x.isolatedGravityFor(this.options.d3GravityStrengthConnected),this.options.d3AlphaDecay=x.alphaDecayForSettleTime(t.settleTime,this.options.d3AlphaMin),this.options.cooldownTime=t.settleTime*1e3,x.initSimulationForceCharge(this.simulationForces.charge,this.options),x.initSimulationForceLink(this.simulationForces.link,this.options),x.initSimulationForceCollide(this.simulationForces.collide,this.options),x.initSimulationForceGravity(this.simulationForces.gravity,this.options,this.containerBCR),this.simulation.velocityDecay(this.options.d3VelocityDecay),this.simulation.alphaDecay(this.options.d3AlphaDecay)}getPhysicsKnobs(){return{...this.physicsKnobs}}getLayoutType(){return this.options.layout.type}getTreeSpacing(){var t;return((t=this.layout)==null?void 0:t.getSpacing())??{...hc}}setTreeSpacing(t){if(!this.layout)return;const n={};t.levelSpacing!==void 0&&(n.levelSpacing=x.clamp(t.levelSpacing,mn)),t.siblingSpacing!==void 0&&(n.siblingSpacing=x.clamp(t.siblingSpacing,mn)),this.layout.setSpacing(n),Object.assign(this.options.layout,n,{spacing:"manual"}),this.graph.nextTick(),this.reheatIfEnabled()}getTreeRoot(){var t;return((t=this.layout)==null?void 0:t.getRoot())??{algorithm:uc}}setTreeRoot(t){if(!this.layout)return;this.layout.setRoot(t);const n=this.layout.getRoot();Object.assign(this.options.layout,{rootId:n.rootId,rootIdAlgorithmFinder:n.algorithm}),this.graph.nextTick(),this.reheatIfEnabled()}isAutoTreeSpacingEnabled(){var t;return((t=this.layout)==null?void 0:t.isAutoSpacing())??!1}enableAutoTreeSpacing(){this.layout&&(this.layout.enableAutoSpacing(),Object.assign(this.options.layout,{spacing:"auto"}),this.graph.nextTick(),this.reheatIfEnabled())}reheatIfEnabled(t=.5){this.suppressReheat||this.options.enabled&&this.reheat(t)}static clamp(t,[n,i]){return Math.max(n,Math.min(i,t))}static mapLinear(t,n,i){const r=(t-n[0])/(n[1]-n[0]);return i[0]+r*(i[1]-i[0])}static knobsFromOptions(t){const n=(r,o,a)=>Math.round(x.clamp(x.mapLinear(r,o,lt[a]),lt[a])),i=x.settleTimeFromAlphaDecay(t.d3AlphaDecay,t.d3AlphaMin);return{repulsion:n(t.d3ManyBodyStrength,x.REPULSION_STRENGTH_RANGE,"repulsion"),linkDistance:n(t.d3LinkDistance,x.LINK_DISTANCE_RANGE,"linkDistance"),collisionRadius:n(t.d3CollideRadiusMultiplier,x.COLLIDE_MULTIPLIER_RANGE,"collisionRadius"),friction:n(t.d3VelocityDecay,x.FRICTION_DECAY_RANGE,"friction"),centering:Math.round(x.clamp(x.centeringFromGravity(t.d3GravityStrengthConnected),lt.centering)),settleTime:Math.round(x.clamp(i,lt.settleTime)*10)/10}}static gravityForCentering(t){const n=t/lt.centering[1];return x.CENTERING_STRENGTH_MAX*n*n}static centeringFromGravity(t){const n=Math.sqrt(Math.max(0,t)/x.CENTERING_STRENGTH_MAX);return lt.centering[1]*n}static isolatedGravityFor(t){const[n,i]=x.CENTERING_ISOLATED_RANGE;return Math.max(n,Math.min(i,t*x.CENTERING_ISOLATED_MULTIPLE))}static alphaDecayForSettleTime(t,n){const i=Math.max(1,t*x.NOMINAL_FPS),r=Math.min(.999,Math.max(1e-6,n));return 1-Math.pow(r,1/i)}static settleTimeFromAlphaDecay(t,n){const i=Math.min(.999,Math.max(1e-6,n)),r=Math.min(.999,Math.max(1e-6,t));return Math.log(i)/Math.log(1-r)/x.NOMINAL_FPS}static shouldAutoTune(t){return t.physics==="auto"?!0:t.physics==="manual"?!1:!x.AUTO_OWNED_OPTIONS.some(n=>t[n]!==void 0)}isAutoPhysicsEnabled(){return this.autoEnabled}enableAutoPhysics(){this.autoEnabled=!0,this.tuneNow({alpha:x.CLICK_REHEAT_ALPHA,force:!0})}disableAutoPhysics(){this.autoEnabled=!1,this.autoTuneTimer!==null&&(clearTimeout(this.autoTuneTimer),this.autoTuneTimer=null)}getAutoRun(){return this.autoLastRun}noteManualKnobEdit(){this.applyingAutoKnobs||this.disableAutoPhysics()}scheduleTune(){this.autoEnabled&&(this.autoTuneTimer!==null&&clearTimeout(this.autoTuneTimer),this.autoTuneTimer=setTimeout(()=>{this.autoTuneTimer=null,this.tuneNow()},x.AUTO_DEBOUNCE_MS))}tuneNow(t={}){var l;const{reheat:n=!0,alpha:i=x.AUTO_REHEAT_ALPHA,force:r=!1}=t;if(!this.autoEnabled||this.options.layout.type!=="force")return;const o=this.buildAutoContext();if(o.nodeCount===0)return;const a=lc(o),c=Object.keys(a).every(f=>{const[T,d]=lt[f];return Math.abs(a[f]-this.physicsKnobs[f])<=(d-T)*x.AUTO_DEADBAND})&&!r;if(this.autoLastRun={context:o,knobs:c?this.getPhysicsKnobs():a,skipped:c},!c){this.applyingAutoKnobs=!0,this.suppressReheat=!0;try{this.writeKnobs(a)}finally{this.suppressReheat=!1,this.applyingAutoKnobs=!1}n&&this.reheatIfEnabled(i),(l=this.graph.UIManager.physicsFlyout)==null||l.syncAutoKnobs(this.getPhysicsKnobs())}}buildAutoContext(){const t=this.containerBCR,n=this.graph.getMutableNodes().filter(c=>c.visible),i=this.getActiveEdges();let r=0,o=0,a=0;for(const c of n){const l=c.expanded?c.getCircleRadiusCollapsed():c.getCircleRadius();r+=l,o=Math.max(o,l),a+=Math.PI*l*l}const s=cc(n.map(c=>c.id),i.map(c=>[c.source.id,c.target.id]));return{canvas:{width:t.width,height:t.height},nodeCount:n.length,radii:{mean:n.length?r/n.length:0,max:o,totalArea:a},edgeCount:i.length,componentCount:s.count,looseNodeFraction:s.looseNodeFraction,current:this.getPhysicsKnobs()}}createDragBehavior(){return la().filter(()=>!this.graph.editing.connectManager.isActiveAndNotIdle()).on("start.draggedelement",(t,n)=>{this.graphInteraction.hasActiveMultiselection()?this.dragSelection=this.graphInteraction.getSelectedNodes().map(i=>{const{node:r}=i;return r.freeze(),{node:r,dx:r.x-n.x,dy:r.y-n.y}}):(this.dragSelection=[],n.freeze())}).on("drag.draggedelement",(t,n)=>{if(!this.dragInProgress&&this.isEnabled()&&(this.dragInProgress=!0,this.restart(),this.simulation.alphaTarget(.3).restart()),this.graphInteraction.hasActiveMultiselection())this.dragSelection.forEach(({node:i,dx:r,dy:o})=>{const a=this.applySnap(t.x+r),s=this.applySnap(t.y+o);i.fx=a,i.fy=s,i.x=a,i.y=s});else{const i=this.applySnap(t.x),r=this.applySnap(t.y);n.fx=i,n.fy=r,n.x=i,n.y=r}if(this.graphInteraction.dragging(t.sourceEvent,t.subject),!this.engineRunning||!this.isEnabled()){const i=this.graphInteraction.hasActiveMultiselection()?this.dragSelection.map(r=>r.node):[n];this.graph.nextTickFor(i)}}).on("end.draggedelement",(t,n)=>{!t.active&&this.dragInProgress&&(this.dragInProgress=!1,this.restart(),this.simulation.alphaTarget(this.options.d3AlphaTarget).restart()),this.options.freezeNodesOnDrag||(this.graphInteraction.hasActiveMultiselection()?(this.dragSelection.forEach(({node:i})=>i.unfreeze()),this.dragSelection=[]):n.unfreeze()),this.graphInteraction.dragended(t.sourceEvent,t.subject)})}isDragging(){return this.dragInProgress}toggleGridSnapping(){this.options.gridSnappingEnabled=!this.options.gridSnappingEnabled}toggleFreezeNodesOnDrag(){this.options.freezeNodesOnDrag=!this.options.freezeNodesOnDrag}isFreezeNodesOnDrag(){return this.options.freezeNodesOnDrag}isGridSnappingEnabled(){return this.options.gridSnappingEnabled}toggleFitViewOnExpandCollapse(){this.options.fitViewOnExpandCollapse=!this.options.fitViewOnExpandCollapse}isFitViewOnExpandCollapse(){return this.options.fitViewOnExpandCollapse}applySnap(t){return this.options.gridSnappingEnabled?Math.round(t/this.options.gridSize)*this.options.gridSize:t}snapToGrid(t){return this.applySnap(t)}getForceSimulation(){return this.simulationForces}getSimulation(){return this.simulation}async changeLayout(t,n={}){var i;this.layout&&((i=this.layout)==null||i.unregisterLayout(),this.layout=void 0),n=n??{},n.layout=n.layout??{},n.layout.type=t,t==="force"?(x.initSimulationForceCharge(this.simulationForces.charge,this.options),x.initSimulationForceCollide(this.simulationForces.collide,this.options)):t==="tree"&&(this.layout=new $(this.graph,this.simulation,this.simulationForces,n.layout)),this.options.layout.type=t,this.update(),this.pause(),await this.runSimulationWorkerRouter(n),this.restart(),await this.waitForSimulationStop(),this.graph.renderer.fitAndCenterWhenSettled()}};E(x,"REPULSION_STRENGTH_RANGE",[0,-400]),E(x,"LINK_DISTANCE_RANGE",[40,600]),E(x,"COLLIDE_MULTIPLIER_RANGE",[.6,2.4]),E(x,"FRICTION_DECAY_RANGE",[0,1]),E(x,"CENTERING_STRENGTH_MAX",.2),E(x,"CENTERING_ISOLATED_MULTIPLE",4),E(x,"CENTERING_ISOLATED_RANGE",[.1,.3]),E(x,"AUTO_OWNED_OPTIONS",["d3LinkDistance","d3ManyBodyStrength","d3CollideRadiusMultiplier","d3VelocityDecay","d3GravityStrength","d3GravityStrengthConnected","d3AlphaDecay","cooldownTime"]),E(x,"AUTO_DEBOUNCE_MS",150),E(x,"AUTO_DEADBAND",.04),E(x,"AUTO_REHEAT_ALPHA",.3),E(x,"CLICK_REHEAT_ALPHA",1),E(x,"NOMINAL_FPS",60),E(x,"COOLDOWN_WALL_GRACE",4),E(x,"FALLBACK_CONTAINER_SIZE",{width:1e3,height:800});let yn=x;const vr=1e4,_n=2e4,Tn=.15*_n;self.onmessage=e=>{var b,g,w;if(e.data.source!=="simulation-worker-wrapper")return;const{nodes:t,edges:n,options:i,canvasBCR:r}=e.data,o=t.map(_=>{const R=new sr(_.id,_.data,_.style);return R.setCircleRadius(_._circleRadius??10),typeof _.x=="number"&&(R.x=_.x),typeof _.y=="number"&&(R.y=_.y),typeof _.fx=="number"&&(R.fx=_.fx),typeof _.fy=="number"&&(R.fy=_.fy),R}),a=new Map(o.map(_=>[_.id,_])),{simulation:s,simulationForces:c}=yn.initSimulationForces(i,r),l=[];for(const _ of n){const R=a.get(_.from.id),y=a.get(_.to.id);if(R&&y){const C=_.style??{};l.push(new cn(_.id,R,y,_.data,C,_.directed))}}s.nodes(o);const f=s.force("link");f&&f.id(_=>_.id).links(l),((b=i.layout)==null?void 0:b.type)==="tree"?$.registerForcesOnSimulation(o,l,s,c,i.layout,r,$):((g=i.layout)==null?void 0:g.type)==="egoTree"&&$.registerForcesOnSimulation(o,l,s,c,i.layout,r,le);let T=i.warmupTicks||_n;T=T==="auto"?_n:T,T=T-Tn;let d=.3;s.alphaTarget(d);const m=new Date().getTime();let A;for(let _=0;_<T&&!(new Date().getTime()-m>vr||new Date().getTime()-m>i.cooldownTime||bn(i,s,d)&&new Date().getTime()-m>i.cooldownTime*.15);++_)_%5===0&&(A=Er(_,new Date().getTime()-m,i),postMessage({type:"tick",progress:A,elapsedTime:new Date().getTime()-m})),s.tick();d=0,s.alphaTarget(d),s.alpha(1);for(let _=0;_<Tn&&!(bn(i,s,d)&&new Date().getTime()-m>i.cooldownTime*.15);++_)s.tick(),_%5===0&&(A=Er(T+_,new Date().getTime()-m,i),postMessage({type:"tick",progress:A,elapsedTime:new Date().getTime()-m}));postMessage({type:"tick",progress:1,elapsedTime:new Date().getTime()-m}),((w=i.layout)==null?void 0:w.type)==="tree"&&$.simulationDone(o,l,s,i.layout),postMessage({type:"done",nodes:o.map(_=>_.toDict()),edges:l.map(_=>_.toDict())})};function dc(e,t,n,i){var m,A,b;const r=e.map(g=>{const w=new sr(g.id,g.getData(),g.getStyle());return w.weight=g.weight||1,w.setCircleRadius(g.getCircleRadius()),typeof g.x=="number"&&(w.x=g.x),typeof g.y=="number"&&(w.y=g.y),typeof g.fx=="number"&&(w.fx=g.fx),typeof g.fy=="number"&&(w.fy=g.fy),w}),o=new Map(r.map(g=>[g.id,g])),{simulation:a,simulationForces:s}=yn.initSimulationForces(n,i),c=[];for(const g of t){const w=o.get(g.from.id),_=o.get(g.to.id);if(w&&_){const R=g.getStyle()??{};c.push(new cn(g.id,w,_,g.getData(),R,g.directed))}}a.nodes(r);const l=a.force("link");l&&l.id(g=>g.id).links(c),(((m=n.layout)==null?void 0:m.type)==="tree"||((A=n.layout)==null?void 0:A.type)==="egoTree")&&$.registerForcesOnSimulation(r,c,a,s,n.layout,i,$);let f;n.warmupTicks==="auto"||n.warmupTicks==null?f=_n:f=n.warmupTicks,f=f-Tn;let T=.3;a.alphaTarget(T);const d=new Date().getTime();for(let g=0;g<f&&!(new Date().getTime()-d>vr||new Date().getTime()-d>n.cooldownTime||bn(n,a,T)&&new Date().getTime()-d>n.cooldownTime*.15);++g)a.tick();T=0,a.alphaTarget(T),a.alpha(1);for(let g=0;g<Tn&&!(bn(n,a,T)&&new Date().getTime()-d>n.cooldownTime*.15);++g)a.tick();return((b=n.layout)==null?void 0:b.type)==="tree"&&$.simulationDone(r,c,a,n.layout),{nodes:r,edges:c}}function Er(e,t,n){return t/n.cooldownTime}function bn(e,t,n){return e.d3AlphaMin>0&&t.alpha()-n<e.d3AlphaMin}var pc=Object.freeze({__proto__:null,runSimulation:dc})})();\n', nr = typeof self < "u" && self.Blob && new Blob([$o], { type: "text/javascript;charset=utf-8" });
function hd(r) {
  let e;
  try {
    if (e = nr && (self.URL || self.webkitURL).createObjectURL(nr), !e) throw "";
    const t = new Worker(e, {
      name: r == null ? void 0 : r.name
    });
    return t.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), t;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent($o),
      {
        name: r == null ? void 0 : r.name
      }
    );
  } finally {
    e && (self.URL || self.webkitURL).revokeObjectURL(e);
  }
}
function dd() {
  return new hd();
}
const ud = (r, e, t, i, n) => new Promise((s, o) => {
  const a = dd();
  a.postMessage({ source: "simulation-worker-wrapper", nodes: r, edges: e, options: t, canvasBCR: i }), a.onmessage = (l) => {
    const { type: h, progress: d, nodes: u, edges: p, elapsedTime: g } = l.data;
    if (h === "tick" && typeof d == "number") {
      n == null || n(d, g);
      return;
    }
    h === "done" && (s({ nodes: u, edges: p }), a.terminate());
  }, a.onerror = o;
});
function sr(r, e) {
  const t = new Set(e.map((i) => i.target.id));
  for (const i of r)
    if (!t.has(i.id)) return i;
  return r[0];
}
const pd = 1e6;
function rr(r, e) {
  var a;
  const t = /* @__PURE__ */ new Map();
  for (const l of r)
    t.set(l.id, []);
  for (const l of e)
    (a = t.get(l.from.id)) == null || a.push(l.to);
  let i = 0, n = !1, s = null, o = -1;
  for (const l of r) {
    const h = /* @__PURE__ */ new Set([l.id]), d = [l];
    for (; d.length > 0 && !n; ) {
      const p = d.pop();
      for (const g of t.get(p.id) ?? []) {
        if (++i > pd) {
          n = !0;
          break;
        }
        h.has(g.id) || (h.add(g.id), d.push(g));
      }
    }
    const u = h.size - 1;
    if (u > o && (o = u, s = l), n) break;
  }
  return n && console.warn("Pivotick: reachability search hit its traversal cap, using the best root found so far."), s ?? r[0];
}
function gd(r, e) {
  return Go(r, e);
}
function Go(r, e) {
  const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const h of r)
    t.set(h.id, []), i.set(h.id, 0);
  for (const h of e)
    h.directed !== !1 && (t.get(h.from.id).push(h.to), i.set(h.to.id, (i.get(h.to.id) || 0) + 1));
  const n = [], s = r.filter((h) => i.get(h.id) === 0);
  for (; s.length; ) {
    const h = s.shift();
    n.push(h);
    for (const d of t.get(h.id))
      i.set(d.id, i.get(d.id) - 1), i.get(d.id) === 0 && s.push(d);
  }
  if (n.length !== r.length)
    return console.warn("Pivotick: the graph has a cycle, so no shallowest root is defined — using the first node."), r[0];
  const o = /* @__PURE__ */ new Map();
  for (let h = n.length - 1; h >= 0; h--) {
    const d = n[h];
    let u = 0;
    for (const p of t.get(d.id))
      u = Math.max(u, 1 + (o.get(p.id) ?? 0));
    o.set(d.id, u);
  }
  let a = null, l = 1 / 0;
  for (const h of r) {
    const d = o.get(h.id);
    d < l && (l = d, a = h);
  }
  return a ?? r[0];
}
function fd(r, e, t) {
  var u;
  const i = new Map(r.map((p) => [p.id, p])), n = new Map(r.map((p) => [p.id, []]));
  for (const p of e)
    !n.has(p.from.id) || !n.has(p.to.id) || (n.get(p.from.id).push(p.to.id), n.get(p.to.id).push(p.from.id));
  const s = (p) => {
    const g = /* @__PURE__ */ new Map([[p, 0]]), f = /* @__PURE__ */ new Map(), v = [p];
    for (let y = 0; y < v.length; y++) {
      const b = v[y];
      for (const k of n.get(b) ?? [])
        g.has(k) || (g.set(k, g.get(b) + 1), f.set(k, b), v.push(k));
    }
    return { levels: g, parentOf: f, farthest: v[v.length - 1] };
  }, o = t !== void 0 && n.has(t) ? t : (u = r[0]) == null ? void 0 : u.id;
  if (o === void 0) return r[0];
  const a = s(o).farthest, { parentOf: l, farthest: h } = s(a), d = [];
  for (let p = h; p !== void 0; p = l.get(p))
    d.push(p);
  return i.get(d[Math.floor(d.length / 2)]) ?? r[0];
}
const md = 24, vd = 16, An = 1, or = 0.1;
function on(r, e) {
  return r ? r.measured <= 0 ? Ce[1] : r.needed / r.measured * e : An;
}
function an(r) {
  if (!Number.isFinite(r)) return An;
  const e = Math.ceil(r / or) * or;
  return Math.min(Ce[1], Math.max(An, Math.round(e * 10) / 10));
}
function yd(r) {
  const e = on(r.level, r.current.levelSpacing);
  if (r.radial) {
    const t = on(r.sibling, r.current.levelSpacing);
    return { levelSpacing: an(Math.max(e, t)), siblingSpacing: r.current.siblingSpacing };
  }
  return {
    levelSpacing: an(e),
    siblingSpacing: an(on(r.sibling, r.current.siblingSpacing))
  };
}
function bd(r, e) {
  return r + e + md;
}
function wd(r, e) {
  return r + e + vd;
}
const kd = 20, ar = "__pivotick_forest_root__", lr = "__pivotick_tree_spacer__", cr = 4096, Cd = 5e4, hr = 0.5;
let dr = "";
const ln = {
  type: "tree",
  rootId: void 0,
  parentKey: void 0,
  depthKey: void 0,
  rootIdAlgorithmFinder: "MaxReachability",
  strength: 0.25,
  radial: !1,
  radialGap: 750,
  spacing: "auto",
  levelSpacing: 1,
  siblingSpacing: 1,
  horizontal: !1
};
class K {
  constructor(e, t, i, n = {}) {
    c(this, "graph");
    c(this, "simulation");
    c(this, "simulationForces");
    c(this, "options");
    c(this, "originalForceStrength");
    c(this, "canvasBCR");
    c(this, "levels");
    /** Deepest level in {@link levels}; the divisor turning `radialGap` into a ring gap. */
    c(this, "maxDepth", 0);
    /** Whether {@link update} re-derives the spacing multipliers; see {@link setSpacing}. */
    c(this, "autoSpacing");
    /** Nodes no edge touches, placed by {@link packParked} rather than by the hierarchy. */
    c(this, "parkedIds", /* @__PURE__ */ new Set());
    c(this, "positionedNodesByID");
    this.graph = e, this.simulation = t, this.simulationForces = i, this.options = ye({}, ln, n), this.originalForceStrength = {
      link: this.simulationForces.link.strength(),
      charge: this.simulationForces.charge.strength(),
      gravity: this.simulationForces.gravity.strength()
    }, this.autoSpacing = n.spacing === "auto" || n.spacing !== "manual" && n.levelSpacing === void 0 && n.siblingSpacing === void 0, this.positionedNodesByID = /* @__PURE__ */ new Map(), this.levels = /* @__PURE__ */ new Map(), this.setSizes(), this.update(), this.registerForces();
  }
  /**
   * Lay the tree out — and, while `spacing: 'auto'`, re-derive the multipliers from what the
   * nodes need and lay it out once more. Two passes rather than a loop: a gap scales linearly
   * with its multiplier, so the correction is exact. The second pass is skipped when it would
   * change nothing.
   */
  update() {
    var t, i;
    if (this.layoutOnce(), !this.autoSpacing || this.positionedNodesByID.size === 0) return;
    const e = yd(this.measureAutoContext());
    e.levelSpacing === this.options.levelSpacing && e.siblingSpacing === this.options.siblingSpacing || (this.options.levelSpacing = e.levelSpacing, this.options.siblingSpacing = e.siblingSpacing, this.layoutOnce(), (i = (t = this.graph.UIManager) == null ? void 0 : t.physicsFlyout) == null || i.syncAutoSpacing(e));
  }
  layoutOnce() {
    const e = this.graph.getNodes(), t = this.graph.getEdges(), i = this.buildLevels(e, t, this.options), { levels: n, maxDepth: s, parked: o } = i;
    this.parkedIds = new Set(o);
    const { nodes: a, nodeById: l } = this.buildTree(e, t, this.options, this.canvasBCR, i);
    this.positionedNodesByID = l, this.levels = n, this.maxDepth = s, a && this.setNodePositions(a, this.options);
  }
  /**
   * The tightest pair on each axis of the tree as currently laid out, for
   * {@link tuneTreeSpacing}. Measured in *hierarchy* space (`x` = breadth or angle,
   * `y` = depth or radius), which is the layout's own answer, unpolluted by whatever
   * the force relaxation has since done to the free axis.
   */
  measureAutoContext() {
    const e = /* @__PURE__ */ new Map();
    for (const [s, o] of this.positionedNodesByID) {
      const a = this.graph.getMutableNode(s);
      if (!a || this.parkedIds.has(s)) continue;
      const l = a.expanded ? a.getCircleRadiusCollapsed() : a.getCircleRadius(), h = Number.isFinite(l) ? l : 0, d = e.get(o.depth) ?? [];
      d.push({ node: o, radius: h }), e.set(o.depth, d);
    }
    const t = [...e.keys()].sort((s, o) => s - o);
    let i = null, n = null;
    for (let s = 0; s < t.length; s++) {
      const o = e.get(t[s]), a = s + 1 < t.length ? e.get(t[s + 1]) : void 0;
      if (a) {
        const h = Math.max(t[s + 1] - t[s], 1), d = Math.abs((a[0].node.y ?? 0) - (o[0].node.y ?? 0)) / h, u = bd(K.widestOf(o), K.widestOf(a));
        i = K.tighter(i, { measured: d, needed: u });
      }
      const l = [...o].sort((h, d) => (h.node.x ?? 0) - (d.node.x ?? 0));
      for (let h = 1; h < l.length; h++) {
        const [d, u] = [l[h - 1], l[h]], p = this.options.radial ? 2 * (u.node.y ?? 0) * Math.sin(Math.abs((u.node.x ?? 0) - (d.node.x ?? 0)) / 2) : (u.node.x ?? 0) - (d.node.x ?? 0), g = wd(d.radius, u.radius);
        n = K.tighter(n, { measured: p, needed: g });
      }
    }
    return { level: i, sibling: n, radial: this.options.radial, current: this.getSpacing() };
  }
  /** The pair in the worse shape — the biggest shortfall relative to what it needs. */
  static tighter(e, t) {
    if (!e) return t;
    const i = (n) => n.needed / Math.max(n.measured, 1e-6);
    return i(t) > i(e) ? t : e;
  }
  static widestOf(e) {
    return e.reduce((t, i) => Math.max(t, i.radius), 0);
  }
  setSizes() {
    const e = this.graph.renderer.getCanvas();
    if (!e)
      throw new Error("Canvas element is not defined in the graph renderer.");
    this.canvasBCR = e.getBoundingClientRect();
  }
  setNodePositions(e, t) {
    for (const i of e) {
      const n = this.graph.getMutableNode(i.data.id);
      if (n)
        if (t.radial) {
          const s = i.x ?? 0, o = i.y ?? 0;
          n.x = o * Math.cos(s - Math.PI / 2), n.y = o * Math.sin(s - Math.PI / 2), n.fx = n.x, n.fy = n.y;
        } else t.horizontal ? (n.x = i.y, n.fx = i.y, n.y = i.x, delete n.fy) : (n.x = i.x, n.y = i.y, n.fy = i.y, delete n.fx);
    }
  }
  unsetNodePositions() {
    this.graph.getMutableNodes().forEach((e) => {
      delete e.fy, delete e.fx;
    });
  }
  registerForces() {
    const e = this.options.strength ?? 0.1;
    if (this.options.radial) {
      const t = K.radialRingGap(this.options, this.maxDepth), i = Ts(
        (n) => (this.levels.get(n.id) ?? 1) * t,
        0,
        0
      ).strength(e);
      this.simulation.force("tree-radial", i);
    } else
      this.simulation.force("tree-y", As((t) => {
        var i, n;
        return this.options.horizontal ? ((i = this.positionedNodesByID.get(t.id)) == null ? void 0 : i.x) ?? 0 : ((n = this.positionedNodesByID.get(t.id)) == null ? void 0 : n.y) ?? 0;
      }).strength(e)), this.simulation.force("tree-x", Ns((t) => {
        var i, n;
        return this.options.horizontal ? ((i = this.positionedNodesByID.get(t.id)) == null ? void 0 : i.y) ?? 0 : ((n = this.positionedNodesByID.get(t.id)) == null ? void 0 : n.x) ?? 0;
      }).strength(e));
    K.adjustOtherSimulationForces(this.simulationForces, this.options);
  }
  unregisterLayout() {
    this.unregisterForces(), this.unsetNodePositions();
  }
  unregisterForces() {
    this.simulation.force("tree-radial", null), this.simulation.force("tree-y", null), this.simulation.force("tree-x", null), K.resetOtherSimulationForces(this.simulationForces, this.originalForceStrength);
  }
  static registerForcesOnSimulation(e, t, i, n, s, o, a = this) {
    const l = ye({}, ln, s), h = l.strength ?? 0.1, d = o.width, u = o.height, p = [d / 2, u / 2], g = a.buildLevelsStatic(e, t, l), { levels: f, maxDepth: v } = g, { nodeById: y } = a.buildTreeStatic(e, t, l, o, g);
    if (l.radial) {
      const b = a.radialRingGap(l, v), k = Ts(
        (S) => (f.get(S.id) ?? 1) * b,
        p[0],
        p[1]
      ).strength(h);
      i.force("tree-radial", k);
    } else
      i.force("tree-y", As((b) => {
        var k, S;
        return l.horizontal ? ((k = y.get(b.id)) == null ? void 0 : k.x) ?? 0 : ((S = y.get(b.id)) == null ? void 0 : S.y) ?? 0;
      }).strength(h)), i.force("tree-x", Ns((b) => {
        var k, S;
        return l.horizontal ? ((k = y.get(b.id)) == null ? void 0 : k.y) ?? 0 : ((S = y.get(b.id)) == null ? void 0 : S.x) ?? 0;
      }).strength(h));
    a.adjustOtherSimulationForces(n, l);
  }
  static adjustOtherSimulationForces(e, t) {
    t != null && t.radial ? (e.link.strength(0), e.charge.strength(0), e.gravity.strength(0)) : (e.link.strength(0), e.charge.strength(0), e.gravity.strength(1e-5));
  }
  static resetOtherSimulationForces(e, t) {
    e.link.strength(t.link), e.charge.strength(t.charge), e.gravity.strength(t.gravity);
  }
  static simulationDone(e, t, i, n) {
    const s = ye({}, ln, n);
    for (const o of e)
      s.radial ? (o.fx = o.x, o.fy = o.y) : s.horizontal ? (o.fx = o.x, delete o.fy) : (o.fy = o.y, delete o.fx);
  }
  /**
   * Distance between two consecutive rings in the radial layout. The layout sizes the tree to
   * `radialGap` and lets d3 spread `maxDepth` levels across it, so this must be the same
   * division or the radial *force* and the radial *positions* describe two different pictures
   * — invisible on the main thread, where pinned `fx`/`fy` outrank the force, but the worker
   * path is driven by the force alone.
   */
  static radialRingGap(e, t) {
    const i = e.radialGap * K.spacingOf(e).level;
    return t > 0 ? i / t : i;
  }
  /** The spacing multipliers in force, defaulted for a partially-specified options object. */
  static spacingOf(e) {
    const t = (i) => Number.isFinite(i) ? i : 1;
    return { level: t(e.levelSpacing), sibling: t(e.siblingSpacing) };
  }
  /** The spacing multipliers currently laid out. */
  getSpacing() {
    const { level: e, sibling: t } = K.spacingOf(this.options);
    return { levelSpacing: e, siblingSpacing: t };
  }
  /**
   * Re-lay-out at new spacing multipliers, keeping the root and orientation. The canvas is
   * re-measured first, being the length scale both multipliers work against.
   *
   * Re-registering the forces is not optional: `forceX`/`forceY`/`forceRadial` read their
   * per-node target once at initialize time, so recomputed positions alone leave every force
   * still pulling nodes to their old slots — levels spread, siblings snap back.
   */
  setSpacing(e) {
    this.autoSpacing = !1, this.options.spacing = "manual", e.levelSpacing !== void 0 && (this.options.levelSpacing = e.levelSpacing), e.siblingSpacing !== void 0 && (this.options.siblingSpacing = e.siblingSpacing), this.relayout();
  }
  /** Is the spacing tuning itself? */
  isAutoSpacing() {
    return this.autoSpacing;
  }
  /** The root the tree hangs from: a pinned node id, or the finder that picks one. */
  getRoot() {
    return { rootId: this.options.rootId, algorithm: this.options.rootIdAlgorithmFinder };
  }
  /**
   * Re-hang the tree from another root, keeping the orientation and the spacing. A `rootId`
   * pins the tree to that node and is walked ignoring edge direction, so any node gives a
   * whole tree; an `algorithm` drops the pin and lets the finder choose again. Goes through
   * {@link relayout} for the force-caching reason {@link setSpacing} gives.
   */
  setRoot(e) {
    "rootId" in e ? this.options.rootId = e.rootId : (this.options.rootId = void 0, this.options.rootIdAlgorithmFinder = e.algorithm), this.relayout();
  }
  /** Hand the multipliers back to the tuner and re-lay-out at what it picks. */
  enableAutoSpacing() {
    this.autoSpacing = !0, this.options.spacing = "auto", this.relayout();
  }
  relayout() {
    this.setSizes(), this.update(), this.positionedNodesByID.size !== 0 && this.registerForces();
  }
  /**
   * The d3 tree generator, sized for the canvas and the spacing multipliers, plus the offset
   * that re-centres the result on the box it would have filled at `1×`. A `size`d d3 tree is
   * normalised onto the whole box and grows from the top-left, so without the offset raising
   * a multiplier would push the tree off the bottom-right instead of expanding it in place.
   */
  static sizedTreeLayout(e, t) {
    const i = K.spacingOf(e), n = Oa();
    if (e.radial)
      return n.size([2 * Math.PI, e.radialGap * i.level]), { treeLayout: n, offset: { x: 0, y: 0 } };
    const s = e.horizontal ? t.width : t.height, o = e.horizontal ? t.height : t.width, a = o * i.sibling, l = s * i.level;
    return n.size([a, l]).separation((h, d) => {
      var p, g;
      const u = ((g = (p = h.parent) == null ? void 0 : p.children) == null ? void 0 : g.length) ?? 1;
      return h.parent === d.parent ? 1.5 / u : 1.5;
    }), {
      treeLayout: n,
      offset: {
        x: -(a - o) / 2,
        y: -(l - s) / 2
      }
    };
  }
  /**
   * Where to put the nodes with no relations at all. They have no place in a hierarchy, so
   * they go in the dead space a tree always leaves beside its shallow levels, one cell clear
   * of its silhouette.
   *
   * The *trailing* end, because the mode rail and its flyouts live down the left of the
   * canvas and nodes parked there would sit behind a panel. Inside the bounding box, because
   * the view is fitted and a stray dot outside it would zoom the whole tree out.
   *
   * Positions are in hierarchy space (`x` breadth, `y` depth — angle and radius when radial),
   * as everything `buildTreeStatic` returns.
   */
  static packParked(e, t, i, n, s = /* @__PURE__ */ new Map()) {
    if (!e.length) return [];
    const o = (x) => {
      const D = x.getCircleRadius();
      return Number.isFinite(D) ? D : 0;
    }, a = 2 * e.reduce((x, D) => Math.max(x, o(D)), 0) + kd, l = (x, D, $, at) => ({ data: x, depth: at, x: D, y: $, height: 0 }), h = t.map((x) => x.x ?? 0), d = t.map((x) => x.y ?? 0), u = e.filter((x) => s.has(x.id)), p = e.filter((x) => !s.has(x.id)), g = (x) => s.get(x.id) ?? 0, f = [...new Set(t.map((x) => x.depth))].sort((x, D) => x - D), v = /* @__PURE__ */ new Map();
    for (const x of t) v.set(x.depth, x.y ?? 0);
    const y = f[0] ?? 0, b = f[f.length - 1] ?? 0, k = b > y ? ((v.get(b) ?? 0) - (v.get(y) ?? 0)) / (b - y) : a, S = (x) => v.get(x) ?? (f.length ? (v.get(y) ?? 0) + (x - y) * k : x * a);
    if (i.radial) {
      const x = [], D = /* @__PURE__ */ new Map();
      for (const W of u) {
        const mt = g(W);
        D.set(mt, [...D.get(mt) ?? [], W]);
      }
      for (const [W, mt] of D) {
        const U = t.filter((B) => B.depth === W).map((B) => B.x ?? 0).sort((B, Mt) => B - Mt);
        let Ft = 0, Q = 2 * Math.PI;
        if (U.length) {
          Q = 0;
          for (let B = 0; B < U.length; B++) {
            const Mt = B + 1 < U.length ? U[B + 1] : U[0] + 2 * Math.PI;
            Mt - U[B] > Q && (Q = Mt - U[B], Ft = U[B]);
          }
        }
        const Te = Q / (mt.length + 1);
        mt.forEach((B, Mt) => x.push(
          l(B, Ft + Te * (Mt + 1), S(W), W)
        ));
      }
      const $ = new Set(d).size, at = d.length ? Math.max(...d) : i.radialGap, pt = $ > 0 ? at / $ : at;
      return p.forEach((W, mt) => x.push(l(
        W,
        mt * 2 * Math.PI / p.length,
        at + pt,
        $ + 1
      ))), x;
    }
    if (!t.length) {
      const x = Math.max(1, Math.floor(n.width / a)), D = [], $ = /* @__PURE__ */ new Map();
      for (const pt of u) {
        const W = g(pt), mt = $.get(W) ?? 0;
        $.set(W, mt + 1), D.push(l(pt, mt * a, W * a, W));
      }
      const at = $.size ? Math.max(...$.keys()) + 1 : 0;
      return p.forEach((pt, W) => {
        const mt = at + Math.floor(W / x);
        D.push(l(pt, W % x * a, mt * a, mt));
      }), D;
    }
    const N = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
    for (const x of t) {
      const D = x.y ?? 0, $ = x.x ?? 0;
      N.set(D, Math.max(N.get(D) ?? $, $)), L.set(x.depth, Math.max(L.get(x.depth) ?? $, $));
    }
    const I = [...N.keys()].sort((x, D) => x - D), q = Math.min(...h), F = Math.max(...h), R = I.length > 1 ? I[1] - I[0] : a, Y = [], nt = [], yt = /* @__PURE__ */ new Map();
    for (const x of u) {
      const D = g(x), $ = S(D), at = yt.get($) ?? 0, pt = F - at * a, W = L.get(D);
      if (W !== void 0 && pt - a <= W) {
        nt.push(x);
        continue;
      }
      yt.set($, at + 1), Y.push(l(x, pt, $, D));
    }
    const T = [...p, ...nt];
    let A = 0;
    for (const [x, D] of I.entries()) {
      if (A >= T.length) break;
      const $ = yt.get(D) ?? 0, at = F - $ * a - ((N.get(D) ?? F) + a), pt = Math.floor(at / a);
      for (let W = 0; W < pt && A < T.length; W++)
        Y.push(l(T[A++], F - ($ + W) * a, D, x));
    }
    const P = Math.max(1, Math.floor((F - q) / a)), H = I[I.length - 1];
    for (let x = 0; A < T.length; x++)
      Y.push(l(
        T[A++],
        F - x % P * a,
        H + R * (1 + Math.floor(x / P)),
        I.length
      ));
    return Y;
  }
  /** Shift a laid-out tree in hierarchy space; see {@link sizedTreeLayout}. */
  static offsetTree(e, t) {
    if (!(!t.x && !t.y))
      for (const i of e)
        i.x = (i.x ?? 0) + t.x, i.y = (i.y ?? 0) + t.y;
  }
  buildTree(e, t, i, n, s) {
    return K.buildTreeStatic(e, t, i, n, s);
  }
  /** Is this one of the layout's own scaffolding nodes rather than a node of the graph? */
  static isScaffolding(e) {
    return e === ar || e.startsWith(lr);
  }
  static buildTreeStatic(e, t, i, n, s) {
    if (!e.length)
      return {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    const o = /* @__PURE__ */ new Map();
    for (const R of e) {
      const Y = R;
      Y.children = [], o.set(R.id, Y);
    }
    const { parentOf: a, roots: l, parked: h, levels: d, declaredRows: u } = s ?? K.buildLevelsStatic(e, t, i);
    let p = 0;
    const g = () => ({ id: `${lr}${p++}`, children: [] }), f = (R) => d.get(R) ?? 0, v = (R, Y, nt, yt) => {
      let T = R;
      for (let A = Y + 1; A < yt && p < Cd; A++) {
        const P = g();
        T.children.push(P), T = P;
      }
      T.children.push(nt);
    };
    for (const [R, Y] of a) {
      const nt = o.get(R), yt = o.get(Y);
      !nt || !yt || (v(yt, f(Y), nt, f(R)), nt.parent = yt);
    }
    const y = h.map((R) => o.get(R)).filter((R) => !!R), b = K.hierarchyRootFor(l, o, f, v, g);
    if (!b) {
      if (!l.length && y.length) {
        const R = K.packParked(y, [], i, n, u);
        return {
          root: null,
          nodes: R,
          nodeById: new Map(R.map((Y) => [Y.data.id, Y]))
        };
      }
      throw new Error(`Root node with id "${l[0]}" not found.`);
    }
    const { treeLayout: k, offset: S } = K.sizedTreeLayout(i, n), N = Xr(b), L = k(N);
    K.offsetTree(L.descendants(), S);
    const I = L.descendants().filter((R) => !K.isScaffolding(R.data.id)), q = K.packParked(y, I, i, n, u), F = /* @__PURE__ */ new Map();
    for (const R of q) F.set(R.data.id, R);
    return L.descendants().forEach((R) => {
      K.isScaffolding(R.data.id) || F.set(R.data.id, R);
    }), {
      root: L,
      nodes: [...I, ...q],
      nodeById: F
    };
  }
  /**
   * The node to hang the hierarchy off. One component roots the tree at its own root; several
   * make a *forest*, which gets a synthetic root holding one component per child so they lay
   * out side by side. That root is dropped from everything returned.
   *
   * A root starting further down needs the rows above it, so it gets a spacer chain too — in
   * a forest hanging off the synthetic root (the `forestShift` in `buildLevelsStatic`), and
   * otherwise with the top of its own chain standing in as the hierarchy root.
   */
  static hierarchyRootFor(e, t, i, n, s) {
    if (e.length === 1) {
      const l = t.get(e[0]);
      if (!l || i(e[0]) <= 0) return l;
      const h = s();
      return n(h, 0, l, i(e[0])), h;
    }
    const o = e.map((l) => t.get(l)).filter((l) => !!l);
    if (!o.length) return;
    const a = { id: ar, children: [] };
    for (const l of o) n(a, 0, l, i(l.id));
    return a;
  }
  buildLevels(e, t, i) {
    return K.buildLevelsStatic(e, t, i);
  }
  /**
   * What the caller stated about the hierarchy, read off `node.data` per `parentKey` and
   * `depthKey`, with everything unusable already dropped.
   */
  static readDeclaredHierarchy(e, t, i) {
    const n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = (p) => o.set(p, (o.get(p) ?? 0) + 1), l = i ? t.parentKey : void 0, h = t.depthKey;
    if (!l && !h) return { parentOf: n, rowOf: s, complaints: o };
    const d = new Set(e.map((p) => p.id));
    for (const p of e) {
      const g = p.getData();
      if (h) {
        const y = g[h];
        if (y != null && y !== "") {
          const b = Math.floor(Number(y));
          Number.isFinite(b) && b >= 0 && b <= cr ? s.set(p.id, b) : a(`declared depths that are not a row between 0 and ${cr}`);
        }
      }
      if (!l) continue;
      const f = g[l];
      if (f == null || f === "") continue;
      const v = String(f);
      v === p.id ? a("declared parents pointing at their own node") : d.has(v) ? n.set(p.id, v) : a("declared parents not in the layout");
    }
    const u = /* @__PURE__ */ new Set();
    for (const p of [...n.keys()]) {
      if (u.has(p)) continue;
      const g = [], f = /* @__PURE__ */ new Set();
      let v = p;
      for (; v !== void 0 && !u.has(v); ) {
        if (f.has(v)) {
          n.delete(v), a("declared parent cycles broken");
          break;
        }
        f.add(v), g.push(v), v = n.get(v);
      }
      for (const y of g) u.add(y);
    }
    return { parentOf: n, rowOf: s, complaints: o };
  }
  /** One line per layout pass, however many things the declared hierarchy got wrong. */
  static warnAboutDeclared(e) {
    if (!e.size) return;
    const t = "[Pivotick] Tree layout ignored part of the declared hierarchy: " + [...e].map(([i, n]) => `${n} ${i}`).join(", ") + ".";
    t !== dr && (dr = t, console.warn(t));
  }
  /**
   * The hierarchy the layout will draw: one parent per node, the row each sits on, and the
   * roots it all hangs from.
   *
   * Parenthood comes from a BFS over the edges — the first edge to reach a node is its
   * parent — except where the caller stated it through `parentKey`, honoured whether or not
   * an edge joins the pair. Rows are one-below-the-parent unless `depthKey` asks for a lower
   * one; a row above the parent's is clamped, since detaching the node instead would let one
   * bad number shatter the tree into extra components.
   *
   * If the graph contains cycles, each node is assigned the shortest level found first.
   *
   * @param nodes - The list of graph nodes.
   * @param edges - The list of graph edges (assumed to be directed).
   * @param options - The layout options. `rootId` is ignored when no such node is in
   *   `nodes`; when it is, the walk follows edges in either direction — as it also does for
   *   a *found* root whose arrows cannot cover the graph, see {@link MIN_DIRECTED_COVERAGE}
   *   — and `parentKey` is dropped with it, because pinning a root is a request to re-hang
   *   the tree from there.
   * @returns A mapping of each node's ID to its depth level in the tree and the maximum depth
   */
  static buildLevelsStatic(e, t, i = {}) {
    var yt;
    if (!e.length)
      return {
        levels: /* @__PURE__ */ new Map(),
        maxDepth: 0,
        nodeCountPerLevel: {},
        parentOf: /* @__PURE__ */ new Map(),
        roots: [],
        parked: [],
        declaredRows: /* @__PURE__ */ new Map()
      };
    const n = i.rootId !== void 0 && e.some((T) => T.id === i.rootId) ? i.rootId : void 0, s = K.readDeclaredHierarchy(e, i, n === void 0);
    let o = n !== void 0;
    const a = /* @__PURE__ */ new Map(), l = new Map(s.parentOf), h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
    for (const T of e)
      h.set(T.id, []);
    for (const { source: T, target: A } of t)
      (yt = h.get(T.id)) == null || yt.push(A.id), d.add(A.id), u.add(T.id), u.add(A.id);
    for (const [T, A] of s.parentOf)
      u.add(T), u.add(A), d.add(T);
    const p = () => {
      var T;
      for (const { source: A, target: P } of t) (T = h.get(P.id)) == null || T.push(A.id);
      o = !0;
    };
    o && p();
    const g = (T) => u.has(T) || T === n, f = e.filter((T) => g(T.id)), v = e.filter((T) => !g(T.id)).map((T) => T.id), y = s.parentOf.size > 0, b = (T, A) => {
      const P = /* @__PURE__ */ new Set();
      let H = A;
      for (; H !== void 0 && !P.has(H); ) {
        if (H === T) return !0;
        P.add(H), H = l.get(H);
      }
      return !1;
    }, k = /* @__PURE__ */ new Set(), S = (T) => {
      if (k.has(T)) return;
      k.add(T);
      const A = [T];
      let P = 0;
      for (; P < A.length; ) {
        const H = A[P++];
        for (const x of h.get(H) ?? [])
          k.has(x) || (k.add(x), !l.has(x) && !(y && b(x, H)) && l.set(x, H), A.push(x));
      }
    }, N = [];
    if (f.length) {
      const T = y ? f.filter((H) => !l.has(H.id)) : f, A = T.length ? T : f;
      let P = n ?? K.findRootId(A, t, i.rootIdAlgorithmFinder);
      if (n === void 0 && K.directedCoverage(P, h, t) < hr) {
        const H = rr(A, t).id;
        K.directedCoverage(H, h, t) < hr && (p(), P = fd(A, t, H).id);
      }
      S(P);
      for (const H of f) {
        if (k.has(H.id)) continue;
        const x = f.find((D) => !k.has(D.id) && !d.has(D.id)) ?? H;
        S(x.id);
      }
      l.has(P) || N.push(P);
      for (const H of f)
        H.id !== P && !l.has(H.id) && N.push(H.id);
    }
    const L = /* @__PURE__ */ new Map();
    for (const [T, A] of l) {
      const P = L.get(A) ?? [];
      P.push(T), L.set(A, P);
    }
    let I = 0;
    const q = (T, A) => {
      const P = [[T, A]];
      for (; P.length; ) {
        const [H, x] = P.pop();
        if (a.has(H)) continue;
        const D = s.rowOf.get(H);
        D !== void 0 && D < x && I++;
        const $ = D !== void 0 && D > x ? D : x;
        a.set(H, $);
        for (const at of L.get(H) ?? []) P.push([at, $ + 1]);
      }
    };
    for (const T of N) q(T, 0);
    for (const T of f)
      a.has(T.id) || q(T.id, 0);
    I && s.complaints.set("declared depths clamped to just below their parent", I), K.warnAboutDeclared(s.complaints);
    const F = N.length > 1 ? 1 : 0;
    if (F)
      for (const [T, A] of a) a.set(T, A + F);
    let R = 0;
    for (const T of a.values())
      T > R && (R = T);
    if (v.length) {
      const T = R + 1;
      for (const A of v) {
        const P = s.rowOf.get(A);
        a.set(A, P === void 0 ? T : P + F);
      }
      for (const A of a.values())
        A > R && (R = A);
    }
    const Y = /* @__PURE__ */ new Map();
    for (const [T, A] of s.rowOf) Y.set(T, A + F);
    const nt = {};
    for (const T of a.values())
      nt[T] = (nt[T] || 0) + 1;
    return {
      levels: a,
      maxDepth: R,
      nodeCountPerLevel: nt,
      parentOf: l,
      roots: N,
      parked: v,
      declaredRows: Y
    };
  }
  /**
   * The share of `root`'s own component that `root` reaches by following the arrows — the test
   * behind {@link MIN_DIRECTED_COVERAGE}. Scored against the component, not the whole graph:
   * several separate hierarchies are *supposed* to come out as a forest, and scoring against
   * every node would read that as a failure and throw away perfectly good arrows.
   *
   * @param adj - Adjacency in its **directed** reading, before any reverse links.
   */
  static directedCoverage(e, t, i) {
    var a, l;
    const n = (h) => {
      const d = /* @__PURE__ */ new Set([e]), u = [e];
      for (let p = 0; p < u.length; p++)
        for (const g of h.get(u[p]) ?? [])
          d.has(g) || (d.add(g), u.push(g));
      return d.size;
    }, s = /* @__PURE__ */ new Map();
    for (const h of t.keys()) s.set(h, []);
    for (const { source: h, target: d } of i)
      (a = s.get(h.id)) == null || a.push(d.id), (l = s.get(d.id)) == null || l.push(h.id);
    const o = n(s);
    return o === 0 ? 1 : n(t) / o;
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
  static findRootId(e, t, i) {
    switch (i) {
      case "FirstZeroInDegree":
        return sr(e, t).id;
      case "MaxReachability":
        return rr(e, t).id;
      case "MinMaxDistance":
        return gd(e, t).id;
      case "MinHeight":
        return Go(e, t).id;
      default:
        return sr(e, t).id;
    }
  }
}
class ve extends K {
  constructor(e, t, i, n) {
    super(e, t, i, {
      ...n,
      type: "tree"
    });
  }
  static registerForcesOnSimulation(e, t, i, n, s, o) {
    K.registerForcesOnSimulation(
      e,
      t,
      i,
      n,
      s,
      o,
      ve
    );
  }
  buildTree(e, t, i, n) {
    return ve.buildTreeStatic(e, t, i, n);
  }
  static buildTreeStatic(e, t, i, n) {
    if (!e.length)
      return {
        root: null,
        nodes: [],
        nodeById: /* @__PURE__ */ new Map()
      };
    const s = /* @__PURE__ */ new Map();
    for (const f of e) {
      const v = f;
      v.children = [], s.set(f.id, v);
    }
    if (!i.rootId || !s.get(i.rootId))
      throw new Error("Ego Tree can only be created with a rootId");
    const o = i.rootId, a = s.get(o);
    if (a.children = [], !a)
      throw new Error(`Root node with id "${o}" not found.`);
    const l = /* @__PURE__ */ new Set([a.id]);
    for (const f of t) {
      const v = s.get(f.source.id), y = s.get(f.target.id);
      if (!v || !y) continue;
      const b = f.source.id === a.id ? y : f.target.id === a.id ? v : void 0;
      !b || l.has(b.id) || (l.add(b.id), a.children.push(b), b.parent = a);
    }
    const { treeLayout: h, offset: d } = ve.sizedTreeLayout(i, n), u = Xr(a), p = h(u);
    ve.offsetTree(p.descendants(), d);
    const g = /* @__PURE__ */ new Map();
    return p.descendants().forEach((f) => {
      g.set(f.data.id, f);
    }), {
      root: p,
      nodes: p.descendants(),
      nodeById: g
    };
  }
}
const ur = 0.3, Ed = 1, pr = 4, Sd = 400, xd = 24, Md = 6.5, Td = 10, Ad = 140, Nd = 1.15, Id = 0.35, _d = 0.35, Rd = 58e-4, Ld = 38, Uo = 95, Dd = 300, Od = 0.35, Fd = 8, Pd = 10, Bd = 0.54, gr = 24, Hd = 62, zd = 0.2, $d = 240, Gd = 0.9, di = 1e-3, Ud = 0.06, qd = 0.03, jd = 8, fr = 2e-3;
function Me(r, e, t) {
  return Math.max(e, Math.min(t, r));
}
function Ye(r) {
  return Me(r, 0, 1);
}
function Oi(r, e) {
  const [t, i] = tt[e];
  return Me(r, t, i);
}
function Wd(r) {
  return ur + (Ed - ur) * qo(r);
}
function qo(r) {
  return Ye(
    Math.log10(Math.max(r, 1) / pr) / Math.log10(Sd / pr)
  );
}
function jo(r) {
  const e = 10 + Math.sqrt(Math.max(0, r - 10));
  return e * e / 100;
}
function Vd(r, e) {
  const t = Math.pow(Math.max(1, e) / Pd, Bd), i = Ld * Math.pow(Dd / Math.max(1, r), Od);
  return Me(i * t, Fd, Uo);
}
function Kd(r, e, t) {
  const i = r / jo(e);
  return Me(i / 400 * 100, Vd(t, e), Uo);
}
function Yd(r, e) {
  return r / 100 * 400 * jo(e);
}
function Xd(r) {
  const e = (r - 0.6) / 1.7999999999999998;
  return Oi(4 + e * 56, "collisionRadius");
}
function Zd(r, e, t, i) {
  const n = Math.max(1, Gd * 0.5 * Math.min(e.width, e.height)), s = $d * t * r / (n * n * n), o = di + (qd - di) * Math.pow(1 - qo(t), 3), a = di + (Ud - di) * Ye(i), l = Math.max(o, a), h = Me(s, fr, Math.max(fr, l));
  return Oi(100 * Math.sqrt(Ye(h / zd)), "centering");
}
function Qd(r) {
  return Oi(1.2 + 0.8 * Math.log10(Math.max(r, 1)), "settleTime");
}
function Jd(r) {
  const e = Ye(Math.log10(Math.max(r, 1) / 4) / Math.log10(125));
  return gr + (Hd - gr) * e;
}
function tu(r) {
  return {
    repulsion: Math.round(r.repulsion),
    linkDistance: Math.round(r.linkDistance),
    collisionRadius: Math.round(r.collisionRadius),
    friction: Math.round(r.friction),
    centering: Math.round(r.centering),
    settleTime: Math.round(r.settleTime * 10) / 10
  };
}
function eu(r) {
  const e = Wd(r.nodeCount) * r.canvas.width * r.canvas.height;
  return { targetArea: e, spacing: Math.sqrt(e / Math.max(1, r.nodeCount)) };
}
function iu(r) {
  const { spacing: e } = eu(r), t = Math.max(1, r.radii.mean), i = Math.max(0.8 * e, Md * t), n = 2 * t + xd, s = Math.min(tt.linkDistance[1], Td * t + Ad), o = Oi(Me(i, n, Math.max(n, s)), "linkDistance"), a = Rd * e * e, l = r.radii.totalArea / Math.max(1, r.nodeCount * o * o), h = Nd + Id * Ye(l / _d), d = Kd(a, t, r.nodeCount);
  return tu({
    repulsion: d,
    linkDistance: o,
    collisionRadius: Xd(h),
    friction: Jd(r.nodeCount),
    centering: Zd(Yd(d, t), r.canvas, r.nodeCount, r.looseNodeFraction),
    settleTime: Qd(r.nodeCount)
  });
}
function nu(r, e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of r) t.set(o, o);
  const i = (o) => {
    let a = o;
    for (; t.get(a) !== a; ) a = t.get(a);
    let l = o;
    for (; t.get(l) !== a; ) {
      const h = t.get(l);
      t.set(l, a), l = h;
    }
    return a;
  };
  let n = r.length;
  for (const [o, a] of e) {
    if (!t.has(o) || !t.has(a)) continue;
    const l = i(o), h = i(a);
    l !== h && (t.set(l, h), n--);
  }
  let s = 0;
  if (n > 1) {
    const o = /* @__PURE__ */ new Map();
    for (const a of r) {
      const l = i(a);
      o.set(l, (o.get(l) ?? 0) + 1);
    }
    for (const a of o.values())
      a < jd && (s += a);
  }
  return { count: n, looseNodeFraction: r.length ? s / r.length : 0 };
}
const Oe = {
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
}, tt = {
  repulsion: [0, 100],
  linkDistance: [40, 600],
  collisionRadius: [4, 60],
  friction: [0, 100],
  centering: [0, 100],
  settleTime: [0.5, 8]
}, Ce = [0.5, 10], su = "MaxReachability", ru = { levelSpacing: 1, siblingSpacing: 1 }, ou = {
  tight: { repulsion: 32, linkDistance: 70, collisionRadius: 16, friction: 45, centering: 7, settleTime: 3 },
  loose: { repulsion: 70, linkDistance: 150, collisionRadius: 26, friction: 28, centering: 7, settleTime: 2.25 }
}, E = class E {
  constructor(e, t = {}) {
    c(this, "simulation");
    c(this, "graph");
    c(this, "container");
    c(this, "graphInteraction");
    c(this, "layout");
    /**
     * The area the physics tunes itself against: the **root container**, never the canvas.
     * Chrome opening or closing (a sidebar, the data dock) resizes the canvas, and a layout
     * has to come out the same either way. Every site reads this one snapshot, kept in step
     * with real container resizes by {@link observeContainer}.
     */
    c(this, "containerBCR");
    c(this, "containerObserver");
    c(this, "animationFrameId", null);
    c(this, "startSimulationTime", 0);
    c(this, "engineRunning", !1);
    c(this, "slowTickThresholdReached", !1);
    c(this, "avgTickDuration", 0);
    c(this, "SLOW_TICK_THRESHOLD", 33);
    // ms of tick compute+render (≈30fps budget)
    c(this, "dragInProgress", !1);
    c(this, "dragSelection", []);
    c(this, "totalTickCount", 0);
    /** Ticks since the current run started ({@link restart}); the cooldown budget. */
    c(this, "runTickCount", 0);
    c(this, "options");
    c(this, "callbacks");
    c(this, "simulationForces");
    c(this, "scaledForces", {
      d3ManyBodyStrength: Oe.d3ManyBodyStrength,
      d3CollideStrength: Oe.d3CollideStrength
    });
    /** Current abstract physics-knob values (what the View flyout renders). */
    c(this, "physicsKnobs");
    // ─── Auto tuner ─────────────────────────────────────────────────────────
    /** Whether the `Auto` preset is driving the knobs (see the constructor for how this is decided). */
    c(this, "autoEnabled");
    c(this, "autoTuneTimer", null);
    /** Set while auto writes knobs, so its own setter calls don't read as a manual edit. */
    c(this, "applyingAutoKnobs", !1);
    /** Set while auto writes knobs, so six setters produce one reheat rather than six. */
    c(this, "suppressReheat", !1);
    /** Last context + knobs auto computed. */
    c(this, "autoLastRun", null);
    if (this.graph = e, this.autoEnabled = E.shouldAutoTune(t), this.options = ye({}, Oe, t), this.callbacks = this.options.callbacks ?? {}, this.physicsKnobs = E.knobsFromOptions(this.options), this.container = this.graph.renderer.getRootContainer(), !this.container) throw new Error("Root container is not defined in the graph renderer.");
    if (this.containerBCR = E.measureContainer(this.container), this.graphInteraction = this.graph.renderer.getGraphInteraction(), !this.graphInteraction) throw new Error("Graph interaction is not available.");
    const i = E.initSimulationForces(this.options, this.containerBCR);
    this.simulation = i.simulation, this.simulationForces = i.simulationForces, this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength || Oe.d3ManyBodyStrength, this.scaledForces.d3CollideStrength = this.options.d3CollideStrength || Oe.d3CollideStrength, this.options.layout.type === "tree" ? this.layout = new K(
      this.graph,
      this.simulation,
      this.simulationForces,
      this.options.layout
    ) : this.options.layout.type === "egoTree" && (this.layout = new ve(
      this.graph,
      this.simulation,
      this.simulationForces,
      this.options.layout
    )), this.layout && Object.assign(this.options.layout, this.layout.getSpacing()), this.observeContainer(), this.callbacks.onInit && this.callbacks.onInit(this);
  }
  /** Measure a container, substituting {@link FALLBACK_CONTAINER_SIZE} for a zero area. */
  static measureContainer(e) {
    const t = e.getBoundingClientRect();
    if (t.width > 0 && t.height > 0) return t;
    const { width: i, height: n } = E.FALLBACK_CONTAINER_SIZE;
    return new DOMRect(t.x, t.y, i, n);
  }
  /**
   * Keep {@link containerBCR} in step with genuine container resizes — a window resize,
   * a responsive parent, or the container getting its first real size after being built
   * hidden — and re-aim the forces derived from it. Chrome resizes the *canvas*, not the
   * container, so opening the data dock or collapsing the sidebar never reaches here.
   */
  observeContainer() {
    !this.container || typeof ResizeObserver > "u" || (this.containerObserver = new ResizeObserver(() => {
      if (!this.container) return;
      const e = E.measureContainer(this.container);
      e.width === this.containerBCR.width && e.height === this.containerBCR.height || (this.containerBCR = e, E.initSimulationForceGravity(this.simulationForces.gravity, this.options, e), this.scheduleTune());
    }), this.containerObserver.observe(this.container));
  }
  /** Stop the engine and release the container observer. */
  destroy() {
    var e;
    this.stop(), (e = this.containerObserver) == null || e.disconnect(), this.containerObserver = void 0, this.container = void 0;
  }
  /** @private */
  static initSimulationForces(e, t) {
    const i = {
      link: Ra(),
      charge: _a(),
      collide: Ia(),
      gravity: cd()
      // clusterRadialConstraint: ForceClusterRadial(),
    }, n = La().force("link", i.link).force("charge", i.charge).force("collide", i.collide).force("gravity", i.gravity);
    return this.initSimulationForceGravity(i.gravity, e, t), this.initSimulationForceLink(i.link, e), this.initSimulationForceCharge(i.charge, e), this.initSimulationForceCollide(i.collide, e), n.alphaMin(e.d3AlphaMin), n.alphaDecay(e.d3AlphaDecay), n.alphaTarget(0), n.velocityDecay(e.d3VelocityDecay), {
      simulation: n,
      simulationForces: i
    };
  }
  static initSimulationForceGravity(e, t, i) {
    e.x(i.width / 2).y(i.height / 2).strength((n) => (n.degree() ?? 0) === 0 ? t.d3GravityStrength : t.d3GravityStrengthConnected);
  }
  static initSimulationForceLink(e, t) {
    e.distance((i) => {
      const n = i.__clusterAnchorDistance;
      if (n != null) return n;
      const s = xo(i);
      if (!s || s === "")
        return t.d3LinkDistance;
      const o = s.length * 10;
      return Math.max(t.d3LinkDistance, o);
    }), t.d3LinkStrength && e.strength(t.d3LinkStrength);
  }
  static initSimulationForceCharge(e, t) {
    e.theta(t.d3ManyBodyTheta).strength((i) => {
      const n = i, s = t.d3ManyBodyStrength, o = n.expanded ? n.getCircleRadiusCollapsed() : n.getCircleRadius(), a = 10 + Math.sqrt(Math.max(0, o - 10));
      let l = n.weight ?? 1;
      return l *= n.isParent ? 10 : 1, s * (a * a) / 100 * l;
    });
  }
  static initSimulationForceCollide(e, t) {
    const i = t.d3CollideRadiusMultiplier;
    e.radius((n) => {
      const s = n;
      return s.expanded ? i * s.getCircleRadius() + 20 : s.getCircleRadius() ? i * s.getCircleRadius() : t.d3CollideRadius;
    }).strength(t.d3CollideStrength);
  }
  static initSimulationForceClusterRadialConstraint(e, t) {
    e.strength(t.d3CollideStrength);
  }
  update() {
    this.layout ? (this.layout.update(), Object.assign(this.options.layout, this.layout.getSpacing())) : this.scheduleTune();
    const e = this.graph.getMutableNodes().filter((i) => i.visible);
    this.simulation.nodes(e);
    const t = this.simulation.force("link");
    t && t.id((i) => i.id).links(this.getActiveEdges()), this.restart();
  }
  /** @private */
  getActiveEdges() {
    const e = new Set(
      this.graph.getMutableNodes().filter((o) => o.visible).map((o) => o.id)
    ), t = (o) => {
      let a = o;
      for (; a && !e.has(a.id); ) a = a.parentNode;
      return a;
    }, i = (o, a) => o < a ? `${o}|${a}` : `${a}|${o}`, n = [], s = /* @__PURE__ */ new Set();
    for (const o of this.graph.getMutableEdges()) {
      if (!o.visibleIgnoringLayer) continue;
      const a = o.source, l = o.target;
      if (!a.isChild && !l.isChild) {
        n.push(o), s.add(i(a.id, l.id));
        continue;
      }
      if (a.isChild && l.isChild) continue;
      const h = a.isChild ? l : a, d = t(a.isChild ? a : l);
      if (!d || d.id === h.id) continue;
      const u = i(h.id, d.id);
      s.has(u) || (s.add(u), n.push(this.clusterAnchorLink(h, d)));
    }
    return n;
  }
  /**
   * A force-only link tying an external node to an expanded cluster it connects
   * into. Not a real Edge — never rendered, never registered on the nodes — just
   * the `{source, target, distance}` the link force needs. Its distance is the
   * cluster radius (plus the base link distance) so the node rests outside the bubble.
   * @private
   */
  clusterAnchorLink(e, t) {
    return {
      id: `cluster-anchor-${e.id}-${t.id}`,
      source: e,
      target: t,
      __clusterAnchorDistance: t.getCircleRadius() + this.options.d3LinkDistance
    };
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
    this.startSimulationTime = (/* @__PURE__ */ new Date()).getTime(), this.runTickCount = 0, this.engineRunning = !0, this.slowTickThresholdReached = !1;
  }
  /**
   * Start the simulation with rendering on each animation frame.
   */
  async start(e = !0) {
    if (e && (this.tuneNow({ reheat: !1 }), await this.runSimulationWorkerRouter()), !this.options.enabled) {
      this.engineRunning = !1;
      return;
    }
    this.engineRunning = !0, this.slowTickThresholdReached = !1, this.callbacks.onStart && this.callbacks.onStart(this), this.animationFrameId === null && this.startAnimationLoop();
  }
  /**
   * Manually stop the simulation and cancel animation frame.
   */
  stop() {
    this.engineRunning = !1, this.autoTuneTimer !== null && (clearTimeout(this.autoTuneTimer), this.autoTuneTimer = null), this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.simulation.stop(), this.callbacks.onStop && this.callbacks.onStop(this);
  }
  /**
   * Start the simulation loop with rendering on each animation frame.
   */
  startAnimationLoop() {
    const e = () => {
      this.animationFrameId = requestAnimationFrame(e), this.simulationTick();
    };
    this.engineRunning = !0, this.simulation.alpha(0.01).restart(), this.animationFrameId = requestAnimationFrame(e);
  }
  /**
   * Evaluate at each tick to update the simulation state and request rendering
   */
  simulationTick() {
    if (this.engineRunning) {
      !this.dragInProgress && this.cooledDown() && (this.engineRunning = !1, this.simulation.stop(), this.callbacks.onStop && this.callbacks.onStop(this)), this.totalTickCount++, this.runTickCount++;
      const e = performance.now();
      this.simulation.tick(), this.graph.nextTick(), this.updateTickMetrics(performance.now() - e), this.callbacks.onTick && this.callbacks.onTick(this), this.graphInteraction.simulationTick(), this.totalTickCount % 10 === 0 && this.graphInteraction.simulationSlowTick();
    }
  }
  /**
   * Is the current run finished? The tick budget is the real wall: `d3AlphaDecay` is
   * per *tick*, so a wall-clock budget would truncate every graph ticking below 60fps —
   * the heavy ones, which need the settling most.
   *
   * The ms budget stays as a backstop, times {@link COOLDOWN_WALL_GRACE}, for a hidden
   * tab where rAF drops to ~1fps and a pure tick budget would run on for minutes.
   */
  cooledDown() {
    const e = this.options.cooldownTime / 1e3 * E.NOMINAL_FPS;
    return this.runTickCount >= e || this.options.d3AlphaMin > 0 && this.simulation.alpha() < this.options.d3AlphaMin ? !0 : (/* @__PURE__ */ new Date()).getTime() - this.startSimulationTime > this.options.cooldownTime * E.COOLDOWN_WALL_GRACE;
  }
  updateTickMetrics(e) {
    var t;
    this.avgTickDuration = this.avgTickDuration * 0.9 + e * 0.1, this.avgTickDuration > this.SLOW_TICK_THRESHOLD && (this.slowTickThresholdReached = !0, this.disable(), this.graph.UIManager.showNotification({
      level: "warning",
      title: "Physics engine running slow",
      message: "The physic has been disabled."
    }), (t = this.graph.UIManager.physicsFlyout) == null || t.syncRunState());
  }
  /**
   * Returns a promise that resolves when the simulation stops naturally.
   * Useful for performing actions (like fitAndCenter) after stabilization.
   */
  async waitForSimulationStop() {
    if (this.engineRunning)
      return new Promise((e) => {
        const t = this.callbacks.onStop;
        this.callbacks.onStop = (i) => {
          t == null || t(i), this.callbacks.onStop = t, e();
        };
      });
  }
  isEnabled() {
    return this.options.enabled;
  }
  // Match computed positions to live nodes by id: the layout is handed a
  // different (and differently ordered) node set than the full node map, so
  // they can't be aligned by array index.
  applyComputedPositions(e) {
    const t = new Map(e.map((i) => [i.id, i]));
    for (const i of this.graph.getMutableNodes()) {
      const n = t.get(i.id);
      n && (i.x = n.x, i.y = n.y, i.fx = typeof n.fx == "number" ? n.fx : void 0, i.fy = typeof n.fy == "number" ? n.fy : void 0);
    }
  }
  async computeGraph(e = {}) {
    const { runSimulation: t } = await import("./SimulationWorker-d1GzCwfa.js"), i = this.containerBCR, n = this.graph.getMutableNodes(), s = this.graph.getNodes(), o = this.graph.getEdges(), { callbacks: a, ...l } = this.options;
    Object.assign(l, e);
    const { nodes: h } = t(
      s,
      o,
      l,
      i
    );
    this.applyComputedPositions(h), this.graph.updateData(n, void 0, !1);
  }
  async runSimulationWorkerRouter(e = {}) {
    if (this.options.useWorker)
      try {
        await this.runSimulationWorker(e);
        return;
      } catch (t) {
        this.options.useWorker = !1, console.warn(
          "[Pivotick] Simulation Web Worker unavailable (often a CSP blocking blob workers); falling back to the main thread. Set `simulation.useWorker: false` to silence this.",
          t
        );
      }
    await this.computeGraph(e), this.graph.updateLayoutProgress(100, 0, "done");
  }
  async runSimulationWorker(e = {}) {
    const t = this.containerBCR, i = this.graph.getMutableNodes(), n = this.graph.getNodes().map((d) => d.toSimulationDTO()), s = this.graph.getEdges().map((d) => d.toSimulationDTO()), o = (d, u) => {
      this.graph.updateLayoutProgress(d, u, "simulation");
    }, { callbacks: a, ...l } = this.options;
    Object.assign(l, e);
    const { nodes: h } = await ud(
      n,
      s,
      l,
      t,
      o
    );
    this.graph.updateLayoutProgress(100, 0, "rendering"), this.applyComputedPositions(h), this.graph.updateData(i, void 0, !1), this.graph.updateLayoutProgress(100, 0, "done");
  }
  /**
   * Restart the simulation with a bit of heat
   */
  reheat(e = 0.7) {
    this.restart(), this.simulation.alpha(e).restart();
  }
  /**
   * Re-read the node-dependent force accessors and reheat. d3-force caches per-node
   * radius/strength when a force is initialised, not per tick, so a radius mutated mid-run
   * has no effect until the nodes are re-set. For a custom node that measures itself after
   * the opening layout has cooled. No-op when disabled.
   */
  refreshForcesAndReheat(e = 0.5) {
    if (!this.options.enabled) return;
    this.tuneNow({ reheat: !1 });
    const t = this.graph.getMutableNodes().filter((i) => i.visible);
    this.simulation.nodes(t), this.reheat(e);
  }
  // ─── Physics knobs (Physics flyout) ─────────────────────────────────────────
  // Each setter maps an abstract knob (range in PHYSICS_KNOB_RANGES) onto a d3-force
  // domain, re-initialises that force so d3 re-reads its cached per-node array, then
  // reheats. While physics is disabled the value is stored but not reheated.
  //
  // Also auto's only way of expressing itself: a call that does *not* come from auto
  // switches auto off, so a re-tune cannot overwrite a deliberate choice.
  /** Push-apart strength. Knob 0–100 → d3ManyBodyStrength. */
  setRepulsion(e) {
    const t = E.clamp(e, tt.repulsion);
    this.physicsKnobs.repulsion = t, this.options.d3ManyBodyStrength = E.mapLinear(t, tt.repulsion, E.REPULSION_STRENGTH_RANGE), this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength, E.initSimulationForceCharge(this.simulationForces.charge, this.options), this.noteManualKnobEdit(), this.reheatIfEnabled();
  }
  /** Preferred edge length. Knob 40–600 (px) → d3LinkDistance. */
  setLinkDistance(e) {
    const t = E.clamp(e, tt.linkDistance);
    this.physicsKnobs.linkDistance = t, this.options.d3LinkDistance = E.mapLinear(t, tt.linkDistance, E.LINK_DISTANCE_RANGE), E.initSimulationForceLink(this.simulationForces.link, this.options), this.noteManualKnobEdit(), this.reheatIfEnabled();
  }
  /** Node spacing. Knob 4–60 → d3CollideRadiusMultiplier (scales each node's collision radius). */
  setCollisionRadius(e) {
    const t = E.clamp(e, tt.collisionRadius);
    this.physicsKnobs.collisionRadius = t, this.options.d3CollideRadiusMultiplier = E.mapLinear(t, tt.collisionRadius, E.COLLIDE_MULTIPLIER_RANGE), E.initSimulationForceCollide(this.simulationForces.collide, this.options), this.noteManualKnobEdit(), this.reheatIfEnabled();
  }
  /** Motion damping. Knob 0–100 → d3VelocityDecay (÷100). Applied live each tick — no reheat. */
  setFriction(e) {
    const t = E.clamp(e, tt.friction);
    this.physicsKnobs.friction = t, this.options.d3VelocityDecay = E.mapLinear(t, tt.friction, E.FRICTION_DECAY_RANGE), this.simulation.velocityDecay(this.options.d3VelocityDecay), this.noteManualKnobEdit();
  }
  /**
   * Pull toward the canvas centre. Knob 0–100 → d3GravityStrengthConnected, with
   * d3GravityStrength (isolated nodes) following as a fixed multiple. Separate components
   * only repel each other, so this is the only thing keeping them in frame.
   */
  setCentering(e) {
    const t = E.clamp(e, tt.centering);
    this.physicsKnobs.centering = t, this.options.d3GravityStrengthConnected = E.gravityForCentering(t), this.options.d3GravityStrength = E.isolatedGravityFor(this.options.d3GravityStrengthConnected), E.initSimulationForceGravity(this.simulationForces.gravity, this.options, this.containerBCR), this.noteManualKnobEdit(), this.reheatIfEnabled();
  }
  /**
   * How long the layout is given to settle, in seconds. Knob 0.5–8 → d3AlphaDecay
   * *and* cooldownTime together: alpha decay sets how fast the sim cools, cooldown
   * is the wall-clock wall that stops it. Moving either alone does nothing — raise
   * the cooldown and the sim is already cold; slow the decay and the wall truncates it.
   */
  setSettleTime(e) {
    const t = E.clamp(e, tt.settleTime);
    this.physicsKnobs.settleTime = t, this.options.d3AlphaDecay = E.alphaDecayForSettleTime(t, this.options.d3AlphaMin), this.options.cooldownTime = t * 1e3, this.simulation.alphaDecay(this.options.d3AlphaDecay), this.noteManualKnobEdit();
  }
  /**
   * Apply a named preset ({@link PHYSICS_PRESETS}): sets every knob and reheats once, at
   * {@link CLICK_REHEAT_ALPHA} rather than the slider default — a preset describes a whole
   * layout, and reaching it from a settled graph takes a fresh layout's worth of travel.
   */
  applyPhysicsPreset(e) {
    this.disableAutoPhysics(), this.writeKnobs(ou[e]), this.reheatIfEnabled(E.CLICK_REHEAT_ALPHA);
  }
  /**
   * Write a whole knob bundle onto the options + forces, without reheating.
   * Shared by {@link applyPhysicsPreset} and the auto tuner, which each decide
   * their own reheat: one setter per knob would re-init six forces and reheat
   * six times for what is a single logical change.
   */
  writeKnobs(e) {
    this.physicsKnobs = { ...e }, this.options.d3ManyBodyStrength = E.mapLinear(e.repulsion, tt.repulsion, E.REPULSION_STRENGTH_RANGE), this.scaledForces.d3ManyBodyStrength = this.options.d3ManyBodyStrength, this.options.d3LinkDistance = E.mapLinear(e.linkDistance, tt.linkDistance, E.LINK_DISTANCE_RANGE), this.options.d3CollideRadiusMultiplier = E.mapLinear(e.collisionRadius, tt.collisionRadius, E.COLLIDE_MULTIPLIER_RANGE), this.options.d3VelocityDecay = E.mapLinear(e.friction, tt.friction, E.FRICTION_DECAY_RANGE), this.options.d3GravityStrengthConnected = E.gravityForCentering(e.centering), this.options.d3GravityStrength = E.isolatedGravityFor(this.options.d3GravityStrengthConnected), this.options.d3AlphaDecay = E.alphaDecayForSettleTime(e.settleTime, this.options.d3AlphaMin), this.options.cooldownTime = e.settleTime * 1e3, E.initSimulationForceCharge(this.simulationForces.charge, this.options), E.initSimulationForceLink(this.simulationForces.link, this.options), E.initSimulationForceCollide(this.simulationForces.collide, this.options), E.initSimulationForceGravity(this.simulationForces.gravity, this.options, this.containerBCR), this.simulation.velocityDecay(this.options.d3VelocityDecay), this.simulation.alphaDecay(this.options.d3AlphaDecay);
  }
  /** Current knob values, for seeding the Physics-flyout sliders. */
  getPhysicsKnobs() {
    return { ...this.physicsKnobs };
  }
  /** The active layout type — the Physics flyout greys out physics under non-`force` layouts. */
  getLayoutType() {
    return this.options.layout.type;
  }
  /** The active tree layout's spacing multipliers; `1×` under the force layout. */
  getTreeSpacing() {
    var e;
    return ((e = this.layout) == null ? void 0 : e.getSpacing()) ?? { ...ru };
  }
  /**
   * Re-lay-out the tree at new spacing multipliers ({@link TREE_SPACING_RANGE}). No-op
   * under the force layout, where spacing is the physics knobs' job.
   *
   * A redraw *and* a reheat: the pinned axis moves immediately, so the change shows even
   * with physics paused, while the free axis still settles into its new sibling slots.
   */
  setTreeSpacing(e) {
    if (!this.layout) return;
    const t = {};
    e.levelSpacing !== void 0 && (t.levelSpacing = E.clamp(e.levelSpacing, Ce)), e.siblingSpacing !== void 0 && (t.siblingSpacing = E.clamp(e.siblingSpacing, Ce)), this.layout.setSpacing(t), Object.assign(this.options.layout, t, { spacing: "manual" }), this.graph.nextTick(), this.reheatIfEnabled();
  }
  /**
   * Where the active tree hangs from. Under the force layout there is no tree, so this
   * reports the finder a tree would start with and no pin.
   */
  getTreeRoot() {
    var e;
    return ((e = this.layout) == null ? void 0 : e.getRoot()) ?? { algorithm: su };
  }
  /**
   * Re-hang the tree from another root: `{ rootId }` pins it to that node, `{ algorithm }`
   * drops the pin and lets the finder choose. No-op under the force layout, which has no
   * hierarchy to root.
   *
   * A pinned root is walked ignoring edge direction, so any node — a leaf included — gives
   * a whole tree rather than a stump beside the old one. See {@link TreeLayout.setRoot}.
   */
  setTreeRoot(e) {
    if (!this.layout) return;
    this.layout.setRoot(e);
    const t = this.layout.getRoot();
    Object.assign(this.options.layout, { rootId: t.rootId, rootIdAlgorithmFinder: t.algorithm }), this.graph.nextTick(), this.reheatIfEnabled();
  }
  /** Is the tree spacing tuning itself? `false` under the force layout. */
  isAutoTreeSpacingEnabled() {
    var e;
    return ((e = this.layout) == null ? void 0 : e.isAutoSpacing()) ?? !1;
  }
  /**
   * Hand the tree spacing back to the tuner, which re-derives both multipliers from the
   * node sizes and tree shape and keeps doing so as the graph changes. The counterpart of
   * {@link setTreeSpacing}. No-op under the force layout, where `Auto` is
   * {@link enableAutoPhysics}.
   */
  enableAutoTreeSpacing() {
    this.layout && (this.layout.enableAutoSpacing(), Object.assign(this.options.layout, { spacing: "auto" }), this.graph.nextTick(), this.reheatIfEnabled());
  }
  reheatIfEnabled(e = 0.5) {
    this.suppressReheat || this.options.enabled && this.reheat(e);
  }
  static clamp(e, [t, i]) {
    return Math.max(t, Math.min(i, e));
  }
  static mapLinear(e, t, i) {
    const n = (e - t[0]) / (t[1] - t[0]);
    return i[0] + n * (i[1] - i[0]);
  }
  /** Recover the abstract knob values from a set of d3-force options (inverse of the setters). */
  static knobsFromOptions(e) {
    const t = (n, s, o) => Math.round(E.clamp(E.mapLinear(n, s, tt[o]), tt[o])), i = E.settleTimeFromAlphaDecay(e.d3AlphaDecay, e.d3AlphaMin);
    return {
      repulsion: t(e.d3ManyBodyStrength, E.REPULSION_STRENGTH_RANGE, "repulsion"),
      linkDistance: t(e.d3LinkDistance, E.LINK_DISTANCE_RANGE, "linkDistance"),
      collisionRadius: t(e.d3CollideRadiusMultiplier, E.COLLIDE_MULTIPLIER_RANGE, "collisionRadius"),
      friction: t(e.d3VelocityDecay, E.FRICTION_DECAY_RANGE, "friction"),
      centering: Math.round(E.clamp(
        E.centeringFromGravity(e.d3GravityStrengthConnected),
        tt.centering
      )),
      settleTime: Math.round(E.clamp(i, tt.settleTime) * 10) / 10
    };
  }
  /** `centering` knob → connected-node gravity strength. Quadratic; see CENTERING_STRENGTH_MAX. */
  static gravityForCentering(e) {
    const t = e / tt.centering[1];
    return E.CENTERING_STRENGTH_MAX * t * t;
  }
  static centeringFromGravity(e) {
    const t = Math.sqrt(Math.max(0, e) / E.CENTERING_STRENGTH_MAX);
    return tt.centering[1] * t;
  }
  /**
   * Isolated (degree-0) nodes have no links holding them, only charge pushing them
   * away, so they need a much firmer pull than connected ones — and they need *some*
   * pull even at `centering: 0`, or they leave the canvas entirely.
   */
  static isolatedGravityFor(e) {
    const [t, i] = E.CENTERING_ISOLATED_RANGE;
    return Math.max(t, Math.min(i, e * E.CENTERING_ISOLATED_MULTIPLE));
  }
  /**
   * `settleTime` (s) → the per-tick alpha decay that lands alpha on `alphaMin` after roughly
   * `t · 60` ticks.
   */
  static alphaDecayForSettleTime(e, t) {
    const i = Math.max(1, e * E.NOMINAL_FPS), n = Math.min(0.999, Math.max(1e-6, t));
    return 1 - Math.pow(n, 1 / i);
  }
  static settleTimeFromAlphaDecay(e, t) {
    const i = Math.min(0.999, Math.max(1e-6, t)), n = Math.min(0.999, Math.max(1e-6, e));
    return Math.log(i) / Math.log(1 - n) / E.NOMINAL_FPS;
  }
  // ─── Auto physics ───────────────────────────────────────────────────────────
  /**
   * Whether a graph gets the `Auto` preset. `simulation.physics` forces it either way;
   * otherwise auto is on unless the consumer configured something auto drives, so existing
   * tuning is never quietly taken over. `physics: 'auto'` alongside explicit d3 options is
   * legal — they seed the opening frame and auto takes it from there.
   */
  static shouldAutoTune(e) {
    return e.physics === "auto" ? !0 : e.physics === "manual" ? !1 : !E.AUTO_OWNED_OPTIONS.some((t) => e[t] !== void 0);
  }
  /** Is the `Auto` preset currently driving the knobs? */
  isAutoPhysicsEnabled() {
    return this.autoEnabled;
  }
  /**
   * Turn `Auto` on and tune immediately. `force` because this is the Auto *button*: an
   * answer inside the deadband would otherwise make the click do nothing visible.
   */
  enableAutoPhysics() {
    this.autoEnabled = !0, this.tuneNow({ alpha: E.CLICK_REHEAT_ALPHA, force: !0 });
  }
  /** Turn `Auto` off, leaving the knobs wherever they currently sit. */
  disableAutoPhysics() {
    this.autoEnabled = !1, this.autoTuneTimer !== null && (clearTimeout(this.autoTuneTimer), this.autoTuneTimer = null);
  }
  /** The last tuning pass — what auto saw and what it decided. @private */
  getAutoRun() {
    return this.autoLastRun;
  }
  /** A user (or a consumer) turning a knob themselves takes auto out of the loop. */
  noteManualKnobEdit() {
    this.applyingAutoKnobs || this.disableAutoPhysics();
  }
  /** Collapse the triggers that arrive together — a pivot fires one per node. */
  scheduleTune() {
    this.autoEnabled && (this.autoTuneTimer !== null && clearTimeout(this.autoTuneTimer), this.autoTuneTimer = setTimeout(() => {
      this.autoTuneTimer = null, this.tuneNow();
    }, E.AUTO_DEBOUNCE_MS));
  }
  /**
   * Run the active strategy and apply what it decided. `reheat: false` is for callers
   * about to reheat anyway, so one logical change stays one reheat; `alpha` and `force`
   * are for the Auto button — see {@link enableAutoPhysics}.
   */
  tuneNow(e = {}) {
    var h;
    const { reheat: t = !0, alpha: i = E.AUTO_REHEAT_ALPHA, force: n = !1 } = e;
    if (!this.autoEnabled || this.options.layout.type !== "force") return;
    const s = this.buildAutoContext();
    if (s.nodeCount === 0) return;
    const o = iu(s), l = Object.keys(o).every((d) => {
      const [u, p] = tt[d];
      return Math.abs(o[d] - this.physicsKnobs[d]) <= (p - u) * E.AUTO_DEADBAND;
    }) && !n;
    if (this.autoLastRun = { context: s, knobs: l ? this.getPhysicsKnobs() : o, skipped: l }, !l) {
      this.applyingAutoKnobs = !0, this.suppressReheat = !0;
      try {
        this.writeKnobs(o);
      } finally {
        this.suppressReheat = !1, this.applyingAutoKnobs = !1;
      }
      t && this.reheatIfEnabled(i), (h = this.graph.UIManager.physicsFlyout) == null || h.syncAutoKnobs(this.getPhysicsKnobs());
    }
  }
  /**
   * What auto is allowed to see: the container at zoom 1, the nodes the sim holds and their
   * radii. The zoom transform is never read — the *zoomed* viewport would loop against
   * `fitAndCenter` (zoom out → more apparent space → spread → re-fit). The container rather
   * than the canvas, for the reason {@link containerBCR} gives.
   */
  buildAutoContext() {
    const e = this.containerBCR, t = this.graph.getMutableNodes().filter((l) => l.visible), i = this.getActiveEdges();
    let n = 0, s = 0, o = 0;
    for (const l of t) {
      const h = l.expanded ? l.getCircleRadiusCollapsed() : l.getCircleRadius();
      n += h, s = Math.max(s, h), o += Math.PI * h * h;
    }
    const a = nu(
      t.map((l) => l.id),
      i.map((l) => [l.source.id, l.target.id])
    );
    return {
      canvas: { width: e.width, height: e.height },
      nodeCount: t.length,
      radii: { mean: t.length ? n / t.length : 0, max: s, totalArea: o },
      edgeCount: i.length,
      componentCount: a.count,
      looseNodeFraction: a.looseNodeFraction,
      current: this.getPhysicsKnobs()
    };
  }
  /**
   * @private
   */
  createDragBehavior() {
    return Da().filter(() => !this.graph.editing.connectManager.isActiveAndNotIdle()).on("start.draggedelement", (e, t) => {
      this.graphInteraction.hasActiveMultiselection() ? this.dragSelection = this.graphInteraction.getSelectedNodes().map((i) => {
        const { node: n } = i;
        return n.freeze(), {
          node: n,
          dx: n.x - t.x,
          dy: n.y - t.y
        };
      }) : (this.dragSelection = [], t.freeze());
    }).on("drag.draggedelement", (e, t) => {
      if (!this.dragInProgress && this.isEnabled() && (this.dragInProgress = !0, this.restart(), this.simulation.alphaTarget(0.3).restart()), this.graphInteraction.hasActiveMultiselection())
        this.dragSelection.forEach(({ node: i, dx: n, dy: s }) => {
          const o = this.applySnap(e.x + n), a = this.applySnap(e.y + s);
          i.fx = o, i.fy = a, i.x = o, i.y = a;
        });
      else {
        const i = this.applySnap(e.x), n = this.applySnap(e.y);
        t.fx = i, t.fy = n, t.x = i, t.y = n;
      }
      if (this.graphInteraction.dragging(e.sourceEvent, e.subject), !this.engineRunning || !this.isEnabled()) {
        const i = this.graphInteraction.hasActiveMultiselection() ? this.dragSelection.map((n) => n.node) : [t];
        this.graph.nextTickFor(i);
      }
    }).on("end.draggedelement", (e, t) => {
      !e.active && this.dragInProgress && (this.dragInProgress = !1, this.restart(), this.simulation.alphaTarget(this.options.d3AlphaTarget).restart()), this.options.freezeNodesOnDrag || (this.graphInteraction.hasActiveMultiselection() ? (this.dragSelection.forEach(({ node: i }) => i.unfreeze()), this.dragSelection = []) : t.unfreeze()), this.graphInteraction.dragended(e.sourceEvent, e.subject);
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
  applySnap(e) {
    return this.options.gridSnappingEnabled ? Math.round(e / this.options.gridSize) * this.options.gridSize : e;
  }
  /**
   * Snap a graph-space coordinate to the grid when grid-snapping is enabled
   * (a no-op otherwise). Public so non-simulation draggables (e.g. notes) can
   * snap on the same grid as nodes.
   */
  snapToGrid(e) {
    return this.applySnap(e);
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
  async changeLayout(e, t = {}) {
    var i;
    this.layout && ((i = this.layout) == null || i.unregisterLayout(), this.layout = void 0), t = t ?? {}, t.layout = t.layout ?? {}, t.layout.type = e, e === "force" ? (E.initSimulationForceCharge(this.simulationForces.charge, this.options), E.initSimulationForceCollide(this.simulationForces.collide, this.options)) : e === "tree" && (this.layout = new K(this.graph, this.simulation, this.simulationForces, t.layout)), this.options.layout.type = e, this.update(), this.pause(), await this.runSimulationWorkerRouter(t), this.restart(), await this.waitForSimulationStop(), this.graph.renderer.fitAndCenterWhenSettled();
  }
};
// d3-force domains each knob maps onto; the knob's own range is in PHYSICS_KNOB_RANGES.
c(E, "REPULSION_STRENGTH_RANGE", [0, -400]), // repulsion 0..100 (more negative = stronger)
c(E, "LINK_DISTANCE_RANGE", [40, 600]), // linkDistance 40..600 (identity, px)
c(E, "COLLIDE_MULTIPLIER_RANGE", [0.6, 2.4]), // collisionRadius 4..60
c(E, "FRICTION_DECAY_RANGE", [0, 1]), // friction 0..100 → velocityDecay
// `centering` is the odd one out: measured against real layouts, gravity does
// nothing below ~0.005 and crushes the graph above ~0.2, so a linear knob would
// spend most of its travel on values that make no difference. The map is
// quadratic instead, so the useful band sits mid-slider.
c(E, "CENTERING_STRENGTH_MAX", 0.2), /** Isolated nodes get a fixed multiple of the connected strength… */
c(E, "CENTERING_ISOLATED_MULTIPLE", 4), /** …clamped, so they never fly off at `centering: 0` nor snap to a point at 100. */
c(E, "CENTERING_ISOLATED_RANGE", [0.1, 0.3]), /** Simulation options auto derives; setting any of them opts a graph out of auto. */
c(E, "AUTO_OWNED_OPTIONS", [
  "d3LinkDistance",
  "d3ManyBodyStrength",
  "d3CollideRadiusMultiplier",
  "d3VelocityDecay",
  "d3GravityStrength",
  "d3GravityStrengthConnected",
  "d3AlphaDecay",
  "cooldownTime"
]), /** Triggers inside this window collapse into a single tune. */
c(E, "AUTO_DEBOUNCE_MS", 150), /** A knob has to move by this fraction of its range before auto bothers applying it. */
c(E, "AUTO_DEADBAND", 0.04), /** Auto relaxes the layout from where it is; it never restarts it. */
c(E, "AUTO_REHEAT_ALPHA", 0.3), /**
 * Heat for an *explicit* preset or `Auto` click. A click means "lay this graph
 * out like that", so it gets what a fresh layout gets — a slider drag keeps the
 * gentler {@link reheatIfEnabled} default, and auto's own background re-tune
 * keeps {@link AUTO_REHEAT_ALPHA}.
 */
c(E, "CLICK_REHEAT_ALPHA", 1), /** Ticks per second the alpha schedule is written against (rAF at full speed). */
c(E, "NOMINAL_FPS", 60), /**
 * How far past `cooldownTime` the wall-clock backstop lets a run go. Only ever
 * binding on a throttled tab; see {@link cooledDown}.
 */
c(E, "COOLDOWN_WALL_GRACE", 4), /**
 * Stand-in size used until the container has a real one. A graph can be built while
 * hidden, where `getBoundingClientRect()` reads 0×0 — and a zero area would have the
 * auto tuner fit the layout into no space at all, collapsing every node onto the
 * gravity point.
 */
c(E, "FALLBACK_CONTAINER_SIZE", { width: 1e3, height: 800 });
let Nn = E;
class au extends it {
  constructor(t) {
    super(t);
    c(this, "navigation");
    c(this, "handleFullscreenChange", () => {
      var i;
      const t = (i = this.navigation) == null ? void 0 : i.querySelector(
        "#pvt-graphnavigation-fullscreen"
      );
      t && this.updateFullscreenIcon(t);
    });
  }
  onMount(t) {
    if (!t) return;
    const i = document.createElement("template");
    i.innerHTML = `
  <div class="pvt-graphnavigation-elements">
    <button id="pvt-graphnavigation-reset" class="pvt-graphnavigation-button" title="Fit and center">
        ${go}
    </button>
    <button id="pvt-graphnavigation-zoom-in" class="pvt-graphnavigation-button" title="Zoom In">
        ${nc}
    </button>
    <button id="pvt-graphnavigation-zoom-out" class="pvt-graphnavigation-button" title="Zoom Out">
        ${sc}
    </button>
    <button id="pvt-graphnavigation-fullscreen" class="pvt-graphnavigation-button pvt-graphnavigation-fullscreen-button" title="Toggle Fullscreen" aria-pressed="false">
        <span>${co}</span>
        <span style="display: none">${Kl}</span>
    </button>
  </div>
`, this.navigation = i.content.firstElementChild, t.appendChild(this.navigation);
  }
  onDestroy() {
    var t;
    (t = this.navigation) == null || t.remove(), this.navigation = void 0, document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
  }
  onAfterMount() {
    if (!this.navigation) return;
    const t = this.navigation.querySelector("#pvt-graphnavigation-zoom-in"), i = this.navigation.querySelector("#pvt-graphnavigation-zoom-out"), n = this.navigation.querySelector("#pvt-graphnavigation-reset"), s = this.navigation.querySelector("#pvt-graphnavigation-fullscreen");
    t == null || t.addEventListener("click", () => {
      this.uiManager.graph.renderer.zoomIn();
    }), i == null || i.addEventListener("click", () => {
      this.uiManager.graph.renderer.zoomOut();
    }), n == null || n.addEventListener("click", () => {
      this.uiManager.graph.renderer.fitAndCenter();
    }), s == null || s.addEventListener("click", () => {
      this.uiManager.toggleFullscreen();
    }), s && this.updateFullscreenIcon(s), document.addEventListener("fullscreenchange", this.handleFullscreenChange), s && this.updateFullscreenIcon(s);
  }
  updateFullscreenIcon(t) {
    const i = t.querySelectorAll("span"), n = i[0], s = i[1], o = this.uiManager.isFullscreenOn();
    n.style.display = o ? "none" : "", s.style.display = o ? "" : "none", t.setAttribute("aria-pressed", String(o));
  }
}
class lu extends it {
  constructor() {
    super(...arguments);
    c(this, "layout");
    c(this, "canvas");
    c(this, "sidebar");
    c(this, "mainheader");
    c(this, "notification");
    c(this, "modal");
    c(this, "slidePanel");
    c(this, "graphnavigation");
    /** Mode rail + contextual tool panel + settings-flyout slots. */
    c(this, "moderail");
    c(this, "toolpanel");
    c(this, "flyout");
    /** Canvas-docked legend slot (its corner is set by the legend itself). */
    c(this, "legend");
    /**
     * The bottom dock: a grid row under the canvas, spanning the canvas column only so
     * the sidebar stays full height beside it. `full` mode only.
     */
    c(this, "dock");
  }
  onMount(t) {
    if (!t) return;
    const i = this.uiManager.getOptions().mode ?? "full";
    this.layout = document.createElement("div"), this.layout.className = `pvt-layout mode-${i}`, this.canvas = document.createElement("div"), this.canvas.className = "pvt-canvas", this.layout.appendChild(this.canvas), this.notification = document.createElement("div"), this.notification.className = "pvt-notification", this.canvas.appendChild(this.notification), i === "full" && (this.sidebar = document.createElement("div"), this.sidebar.className = "pvt-sidebar", this.layout.appendChild(this.sidebar), this.dock = document.createElement("div"), this.dock.className = "pvt-dock-slot", this.layout.appendChild(this.dock)), (i === "light" || i === "full") && (this.mainheader = document.createElement("div"), this.mainheader.className = "pvt-mainheader", this.layout.appendChild(this.mainheader), this.modal = document.createElement("div"), this.modal.className = "pvt-modalcontainer", t.appendChild(this.modal), this.slidePanel = document.createElement("div"), this.slidePanel.className = "pvt-slidepanel-container", this.canvas.appendChild(this.slidePanel)), i !== "static" && (this.graphnavigation = document.createElement("div"), this.graphnavigation.className = "pvt-graphnavigation", this.canvas.appendChild(this.graphnavigation)), (i === "full" || i === "light") && (this.moderail = document.createElement("div"), this.moderail.className = "pvt-moderail", this.canvas.appendChild(this.moderail), this.toolpanel = document.createElement("div"), this.toolpanel.className = "pvt-toolpanel", this.canvas.appendChild(this.toolpanel), this.flyout = document.createElement("div"), this.flyout.className = "pvt-flyout", this.canvas.appendChild(this.flyout), this.legend = document.createElement("div"), this.legend.className = "pvt-legend", this.canvas.appendChild(this.legend)), t.appendChild(this.layout);
  }
  onDestroy() {
    var t, i;
    (t = this.layout) == null || t.remove(), this.layout = void 0, (i = this.modal) == null || i.remove(), this.modal = void 0;
  }
}
const cu = 64;
function Wo(r) {
  return typeof r == "string" ? `<span class="json-string">"${Ve(r)}"</span>` : typeof r == "number" ? `<span class="json-number">${r}</span>` : typeof r == "boolean" ? `<span class="json-boolean">${r}</span>` : '<span class="json-null">null</span>';
}
function hu(r) {
  const e = document.createElement("div");
  return e.className = "pvt-json-viewer__line-number", e.textContent = String(r), e;
}
function cn(r, e, t = 0) {
  const i = document.createElement("div");
  i.className = "pvt-json-viewer__line", i.appendChild(hu(e));
  const n = document.createElement("div");
  return n.className = "pvt-json-viewer__line-content", n.style.paddingLeft = `${12 + t * 18}px`, n.appendChild(r), i.appendChild(n), i;
}
function Vo(r, e, t, i = 0, n, s = !0, o = /* @__PURE__ */ new WeakSet()) {
  const a = document.createElement("div");
  a.className = "pvt-json-viewer__node", a.style.setProperty("--json-depth", String(i));
  const l = s ? "" : ",", h = r === null || typeof r == "string" || typeof r == "number" || typeof r == "boolean", d = h ? null : o.has(r) ? '<span class="json-null">[Circular]</span>' : i >= cu ? '<span class="json-null">[…]</span>' : null;
  if (h || d) {
    const k = document.createElement("div");
    n !== void 0 && (k.innerHTML += `
                <span class="json-key">"${Ve(n)}"</span>:
            `), k.innerHTML += (d ?? Wo(r)) + l, a.appendChild(cn(k, t.value++, i)), e.appendChild(a);
    return;
  }
  const u = Array.isArray(r), p = u ? r.map((k, S) => [String(S), k]) : Object.entries(r), g = document.createElement("details");
  g.className = "pvt-json-viewer__details", g.open = !0;
  const f = document.createElement("div");
  n !== void 0 && (f.innerHTML += `
            <span class="json-key">"${Ve(n)}"</span>: 
        `), f.innerHTML += `
        <span class="json-bracket">${u ? "[" : "{"}</span>
        <span class="pvt-json-viewer__meta">
            ${p.length} ${u ? "items" : "properties"}
        </span>
    `;
  const v = document.createElement("summary");
  v.className = "pvt-json-viewer__summary", v.appendChild(
    cn(f, t.value++, i)
  ), g.appendChild(v);
  const y = document.createElement("div");
  y.className = "pvt-json-viewer__children", o.add(r), p.forEach(([k, S], N) => {
    Vo(
      S,
      y,
      t,
      i + 1,
      u ? void 0 : k,
      N === p.length - 1,
      o
    );
  }), o.delete(r), g.appendChild(y);
  const b = document.createElement("div");
  b.innerHTML = `
        <span class="json-bracket">${u ? "]" : "}"}</span>${l}
    `, g.appendChild(
    cn(b, t.value++, i)
  ), a.appendChild(g), e.appendChild(a);
}
function du(r) {
  try {
    return JSON.stringify(r, null, 2);
  } catch {
    const e = /* @__PURE__ */ new WeakSet();
    return JSON.stringify(r, (t, i) => {
      if (i !== null && typeof i == "object") {
        if (e.has(i)) return "[Circular]";
        e.add(i);
      }
      return i;
    }, 2);
  }
}
function uu(r) {
  const e = document.createElement("div");
  e.className = "pvt-json-viewer";
  const t = document.createElement("div");
  t.className = "pvt-json-viewer__toolbar";
  const i = X({
    text: "Copy JSON",
    variant: "secondary",
    size: "sm",
    onClick: async () => {
      try {
        await navigator.clipboard.writeText(du(r));
      } catch {
        return;
      }
      const s = i.textContent;
      i.textContent = "Copied!", setTimeout(() => {
        i.textContent = s;
      }, 1200);
    }
  });
  t.appendChild(i);
  const n = document.createElement("div");
  return n.className = "pvt-json-viewer__body", Vo(r, n, { value: 1 }), e.appendChild(t), e.appendChild(n), e;
}
const pu = /* @__PURE__ */ new Set(["url", "uri", "href", "link", "website", "homepage"]), Ko = /^(https?:|mailto:|ftp:|tel:)/i;
function gu(r, e) {
  var t;
  return typeof r == "string" ? r : ((t = Fa(r, e)) == null ? void 0 : t.textContent) ?? "";
}
function fu(r, e) {
  return ro(e, Fl) ? Ko.test(e) ? !0 : pu.has(r.toLowerCase()) && e.length > 0 : !1;
}
const mu = 12;
function Yo(r, e, t = /* @__PURE__ */ new WeakSet()) {
  if (r === null || typeof r != "object") return Wo(r);
  if (t.has(r)) return '<span class="json-null">[Circular]</span>';
  if (e >= mu) return '<span class="json-null">[…]</span>';
  const i = Array.isArray(r), n = i ? "[" : "{", s = i ? "]" : "}", o = i ? r.map((d, u) => [String(u), d]) : Object.entries(r);
  if (o.length === 0) return `<span class="json-bracket">${n}${s}</span>`;
  t.add(r);
  const a = "  ".repeat(e + 1), l = "  ".repeat(e), h = o.map(([d, u], p) => {
    const g = p < o.length - 1 ? '<span class="json-bracket">,</span>' : "", f = i ? "" : `<span class="json-key">"${Ve(d)}"</span><span class="json-bracket">: </span>`;
    return `${a}${f}${Yo(u, e + 1, t)}${g}`;
  });
  return t.delete(r), `<span class="json-bracket">${n}</span>
${h.join(`
`)}
${l}<span class="json-bracket">${s}</span>`;
}
function vu(r) {
  if (Array.isArray(r))
    return `[ ] ${r.length} ${r.length === 1 ? "item" : "items"}`;
  const e = Object.keys(r).length;
  return `{ } ${e} ${e === 1 ? "key" : "keys"}`;
}
function es(r) {
  const e = w("span", { class: "pvt-prop-copy", title: "Copy", role: "button", tabindex: "0", "data-copy-text": r }, [
    Z({ svgIcon: Ws })
  ]), t = async () => {
    try {
      await navigator.clipboard.writeText(r);
    } catch {
      return;
    }
    e.classList.add("pvt-prop-copy--done"), e.replaceChildren(Z({ svgIcon: zn })), window.setTimeout(() => {
      e.classList.remove("pvt-prop-copy--done"), e.replaceChildren(Z({ svgIcon: Ws }));
    }, 1200);
  };
  return e.addEventListener("click", t), e.addEventListener("keydown", (i) => {
    (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
  }), e;
}
function yu(r) {
  const e = Ko.test(r);
  return w(
    "a",
    {
      class: "pvt-prop-value pvt-prop-value--link",
      href: r,
      title: r,
      ...e ? { target: "_blank", rel: "noopener noreferrer" } : {}
    },
    [
      w("span", { class: "pvt-prop-link-text" }, [r]),
      Z({ svgIcon: gc })
    ]
  );
}
function bu(r, e) {
  return w("div", { class: `pvt-prop-value pvt-prop-value--text${e ? " pvt-prop-value--mono" : ""}` }, [r]);
}
function wu(r, e) {
  const t = gu(r.name, e);
  let i = r.value;
  typeof i == "function" && (i = i(e));
  const n = w("div", { class: "pvt-prop" }, [
    w("span", { class: "pvt-prop-key", title: t }, [t])
  ]);
  if (i instanceof HTMLElement)
    return i.classList.add("pvt-prop-value"), n.appendChild(i), n;
  if (i !== null && typeof i == "object") {
    n.appendChild(w("span", { class: "pvt-prop-affordance pvt-prop-badge" }, [vu(i)]));
    const a = w("div", { class: "pvt-prop-value pvt-prop-value--json" }, [
      w("pre", { class: "pvt-prop-json" }, [])
    ]);
    return a.firstElementChild.innerHTML = Yo(i, 0), n.appendChild(a), n;
  }
  const s = String(i);
  if (typeof i == "string" && fu(t, i))
    return n.appendChild(yu(i)), n;
  const o = es(s);
  return o.classList.add("pvt-prop-affordance"), n.appendChild(o), n.appendChild(bu(s, t.toLowerCase() === "id")), n;
}
function Xe(r, e, { label: t = "PROPERTIES", layout: i = "stacked" } = {}) {
  const n = w("div", {
    class: i === "columns" ? "pvt-node-props pvt-node-props--columns" : "pvt-node-props"
  }), s = w("div", { class: "pvt-node-props-header" }, [
    w("span", { class: "pvt-node-props-label" }, [
      w("span", { class: "pvt-node-props-label-dot" }, ["."]),
      w("span", { class: "pvt-node-props-label-name" }, [t])
    ]),
    w("span", { class: "pvt-node-props-count" }, [
      `${r.length} ${r.length === 1 ? "field" : "fields"}`
    ])
  ]);
  n.appendChild(s);
  for (const o of r)
    n.appendChild(wu(o, e));
  return n;
}
const ku = 16, Cu = 12, Eu = 1.3, Su = 2, xu = "pvt-mainheader-nodeinfo-name";
let Fe = null;
function mr(r, e) {
  return Fe || (Fe = document.createElement("canvas").getContext("2d")), Fe ? (Fe.font = e, Fe.measureText(r).width) : r.length * 8;
}
function Mu(r) {
  const e = getComputedStyle(r);
  return `${e.fontWeight} ${e.fontSize} ${e.fontFamily}`;
}
function Tu(r) {
  return !/\s/.test(r.trim());
}
function Au(r, e, t) {
  if (e <= 0 || mr(r, t) <= e) return r;
  const i = "…", n = Array.from(r);
  let s = 1, o = n.length - 1, a = i;
  for (; s <= o; ) {
    const l = s + o >> 1, h = Math.ceil(l / 2), d = Math.floor(l / 2), u = n.slice(0, h).join("") + i + n.slice(n.length - d).join("");
    mr(u, t) <= e ? (a = u, s = l + 1) : o = l - 1;
  }
  return a;
}
function Nu(r, e, t) {
  if (r.className = xu, r.style.fontSize = "", r.removeAttribute("title"), r.textContent = t, e == null || e.replaceChildren(), !(r.clientWidth <= 0)) {
    for (let n = ku; n >= Cu; n--)
      if (r.style.fontSize = `${n}px`, r.scrollHeight <= Math.ceil(n * Eu * Su) + 1) return;
    r.style.fontSize = "", r.title = t, Tu(t) ? (r.classList.add("is-identifier"), e == null || e.appendChild(es(t)), r.textContent = Au(t, r.clientWidth, Mu(r))) : r.classList.add("is-clamp");
  }
}
class In {
  constructor(e) {
    c(this, "slot");
    c(this, "fit");
    c(this, "lastWidth", -1);
    c(this, "observer");
    this.slot = e, typeof ResizeObserver < "u" && (this.observer = new ResizeObserver(() => this.refit()), this.observer.observe(e));
  }
  /** Render `text` into `nameElem` and fit it to the slot's current width. */
  render(e, t, i) {
    e.dataset.titleText = i, this.fit = () => Nu(e, t, i), this.lastWidth = -1, requestAnimationFrame(() => this.refit());
  }
  /** Forget the current title (e.g. the header switched to a count overview). */
  clear() {
    this.fit = void 0, this.lastWidth = -1;
  }
  destroy() {
    var e;
    (e = this.observer) == null || e.disconnect(), this.observer = void 0, this.fit = void 0;
  }
  refit() {
    if (!this.fit) return;
    const e = this.slot.clientWidth;
    e !== this.lastWidth && (this.lastWidth = e, this.fit());
  }
}
class Iu extends it {
  constructor(t) {
    super(t);
    c(this, "panel");
    c(this, "renderCb");
    // Re-fits the current title whenever the sidebar width changes.
    c(this, "titleFit");
    // Placeholder / staleness for an async `render`; superseded on every selection.
    c(this, "renderScope");
    this.renderCb = typeof this.uiManager.getOptions().mainHeader.render == "function" ? this.uiManager.getOptions().mainHeader.render : void 0, this.renderScope = new Se("mainHeader", () => this.uiManager.getOptions().asyncContent), this.track(() => this.renderScope.supersede());
  }
  onMount(t) {
    t && (this.panel = t, this.titleFit = new In(this.panel), this.track(() => {
      var i;
      return (i = this.titleFit) == null ? void 0 : i.destroy();
    }));
  }
  onDestroy() {
    var t;
    (t = this.panel) == null || t.remove(), this.panel = void 0;
  }
  onAfterMount() {
    this.clearOverview();
  }
  onGraphReady() {
    this.clearOverview();
  }
  renderCustomContent(t) {
    var n;
    if (!this.panel || !this.renderCb) return;
    this.renderScope.supersede(), this.panel.innerHTML = "";
    const i = this.renderScope.content(this.renderCb, t);
    i && ((n = this.panel) == null || n.appendChild(i));
  }
  clearOverview() {
    var t;
    if (this.panel) {
      if ((t = this.titleFit) == null || t.clear(), this.renderCb) {
        this.renderCustomContent(null);
        return;
      }
      this.panel.innerHTML = "", this.showTotalNodeCount();
    }
  }
  /* Single selection */
  updateNodeOverview(t, i) {
    if (!this.panel) return;
    if (this.renderCb) {
      this.renderCustomContent(t);
      return;
    }
    this.panel.innerHTML = "";
    const n = 42, o = dt(`
<div class="enter-ready">
    <div class="pvt-mainheader-nodepreview"></div>
    <div class="pvt-mainheader-nodeinfo">
        <div class="pvt-mainheader-nodeinfo-name"></div>
        <div class="pvt-mainheader-nodeinfo-subtitle"></div>
    </div>
    <div class="pvt-mainheader-nodeinfo-action">
    </div>
</div>`), a = o.querySelector(".pvt-mainheader-nodepreview"), l = o.querySelector(".pvt-mainheader-nodeinfo-name"), h = o.querySelector(".pvt-mainheader-nodeinfo-subtitle"), d = o.querySelector(".pvt-mainheader-nodeinfo-action");
    if (a == null || a.appendChild(re(i instanceof SVGGElement ? i : t, { size: n })), l && this.renderTitle(
      l,
      d,
      ot(t, this.uiManager.getOptions().mainHeader)
    ), h) {
      const u = Un(t, this.uiManager.getOptions().mainHeader);
      h.textContent = u ?? "";
    }
    this.panel.appendChild(o), requestAnimationFrame(() => {
      var u, p;
      (p = (u = this.panel) == null ? void 0 : u.firstElementChild) == null || p.classList.add("enter-active");
    });
  }
  updateEdgeOverview(t) {
    if (!this.panel) return;
    if (this.renderCb) {
      this.renderCustomContent(t);
      return;
    }
    this.panel.innerHTML = "";
    const n = `<div class="enter-ready">
<div class="pvt-mainheader-nodepreview">
    ${te(42)}
</div>
<div class="pvt-mainheader-nodeinfo">
    <div class="pvt-mainheader-nodeinfo-name"></div>
    <div class="pvt-mainheader-nodeinfo-subtitle"></div>
</div>
<div class="pvt-mainheader-nodeinfo-action">
</div>
</div>`, s = dt(n), o = s.querySelector(".pvt-mainheader-nodeinfo-name"), a = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), l = s.querySelector(".pvt-mainheader-nodeinfo-action");
    o && this.renderTitle(
      o,
      l,
      be(t, this.uiManager.getOptions().mainHeader)
    ), a && (a.textContent = So(t, this.uiManager.getOptions().mainHeader)), this.panel.appendChild(s), requestAnimationFrame(() => {
      var h, d;
      (d = (h = this.panel) == null ? void 0 : h.firstElementChild) == null || d.classList.add("enter-active");
    });
  }
  /* Multi selection */
  updateNodesOverview(t) {
    var h;
    if (!this.panel) return;
    if ((h = this.titleFit) == null || h.clear(), this.renderCb) {
      this.renderCustomContent(t.map((d) => d.node));
      return;
    }
    this.panel.innerHTML = "";
    const i = 42, n = `<div class="enter-ready">
    <div class="pvt-mainheader-nodepreview">
        <svg class="pvt-node-preview-icon" width="${i}" height="${i}" viewBox="0 0 ${i} ${i}" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
    <div class="pvt-mainheader-nodeinfo">
        <div class="pvt-mainheader-nodeinfo-name"></div>
        <div class="pvt-mainheader-nodeinfo-subtitle"></div>
    </div>
    <div class="pvt-mainheader-nodeinfo-action">
    </div>
</div>`, s = dt(n), o = s.querySelector(".pvt-node-preview-icon"), a = s.querySelector(".pvt-mainheader-nodeinfo-name"), l = s.querySelector(".pvt-mainheader-nodeinfo-subtitle");
    if (o) {
      const d = fo(i), u = dt(d);
      o.appendChild(u);
    }
    a && (a.textContent = `${t.length} nodes selected`), l && (l.textContent = `Out of ${this.uiManager.graph.getNodeCount()} total`), this.panel.appendChild(s), requestAnimationFrame(() => {
      var d, u;
      (u = (d = this.panel) == null ? void 0 : d.firstElementChild) == null || u.classList.add("enter-active");
    });
  }
  updateEdgesOverview(t) {
    var l;
    if (!this.panel) return;
    if ((l = this.titleFit) == null || l.clear(), this.renderCb) {
      this.renderCustomContent(t.map((h) => h.edge));
      return;
    }
    this.panel.innerHTML = "";
    const n = `<div class="enter-ready">
<div class="pvt-mainheader-nodepreview">
    ${te(42)}
</div>
<div class="pvt-mainheader-nodeinfo">
    <div class="pvt-mainheader-nodeinfo-name"></div>
    <div class="pvt-mainheader-nodeinfo-subtitle"></div>
</div>
<div class="pvt-mainheader-nodeinfo-action">
</div>
</div>`, s = dt(n), o = s.querySelector(".pvt-mainheader-nodeinfo-name"), a = s.querySelector(".pvt-mainheader-nodeinfo-subtitle");
    o && (o.textContent = `${t.length} edges selected`), a && (a.textContent = `Out of ${this.uiManager.graph.getEdgeCount()} total`), this.panel.appendChild(s), requestAnimationFrame(() => {
      var h, d;
      (d = (h = this.panel) == null ? void 0 : h.firstElementChild) == null || d.classList.add("enter-active");
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
  renderTitle(t, i, n) {
    var s;
    (s = this.titleFit) == null || s.render(t, i, n);
  }
  /* Private methods */
  showTotalNodeCount() {
    if (!this.panel) return;
    const t = this.uiManager.graph.getMutableVisibleNodes().length, i = this.uiManager.graph.getMutableVisibleEdges().length;
    this.panel.textContent = `Showing ${t} nodes and ${i} edges`;
  }
}
const vr = "4dfd89de5d25fc9cc4b66c23d84b443af631c7dc", _u = 6, hn = 16, yr = 10, dn = [210, 45, 280, 350, 165, 130, 25, 300, 190, 90, 60, 320];
function Ru(r) {
  const e = dn[r % dn.length], t = Math.floor(r / dn.length), i = Math.max(38, 58 - t * 9);
  return `hsl(${e} 62% ${i}%)`;
}
function Lu(r) {
  if (r.size <= 1) return "shared";
  for (const e of r.values())
    if (e > 1) return "values";
  return "unique";
}
const Xo = "Click to keep only · Alt-click to exclude";
function Zo(r, e, t, i) {
  r.classList.add("pvt-facet-filterable"), r.addEventListener("click", (n) => {
    const s = n.altKey || n.ctrlKey || n.metaKey ? "exclude" : "keep";
    i(e, t, s);
  });
}
function Qo(r, e, t, i) {
  const n = $u(r, !1), s = w("div", { class: "pvt-facets" });
  for (const [o, a] of n)
    s.appendChild(
      Du(o, a, e, t, i)
    );
  return s;
}
function Du(r, e, t, i, n) {
  const s = Lu(e), o = e.size;
  let a;
  s === "unique" ? a = `${o} unique` : s === "values" ? a = `${o} values` : a = (e.values().next().value ?? 0) === t ? "shared" : "1 value";
  const l = w("div", { class: "pvt-facet-header" }, [
    w("div", { class: "pvt-facet-label" }, [
      w("span", { class: "pvt-facet-label-dot" }, ["."]),
      w("span", { class: "pvt-facet-label-name" }, [r])
    ]),
    w("span", { class: ["pvt-facet-badge", `pvt-facet-badge--${s}`] }, [a])
  ]), h = s === "unique" ? Bu(r, e, n) : Ou(r, e, t, s, i, n);
  return w("div", { class: "pvt-facet-card" }, [l, h]);
}
function Ou(r, e, t, i, n, s) {
  const o = Array.from(e.entries()), a = o.slice(0, yr), l = o.slice(yr), h = l.reduce((p, [, g]) => p + g, 0), d = w("div", { class: "pvt-facet-bar" });
  if (a.forEach(([p, g], f) => {
    const v = t > 0 ? g / t * 100 : 0, y = w("div", { class: "pvt-facet-bar-seg" });
    y.style.width = `${v}%`, y.style.background = Jo(p, f, i), y.title = `${Mi(p)} — ${g} (${Math.round(v)}%)`, s && !Fi(p) && (y.title += `
${Xo}`, Zo(y, r, p, s)), d.appendChild(y);
  }), l.length > 0) {
    const p = t > 0 ? h / t * 100 : 0, g = w("div", { class: "pvt-facet-bar-seg pvt-facet-bar-seg--other" });
    g.style.width = `${p}%`, g.style.background = "var(--pvt-text-color-3)", g.title = `${l.length} other values — ${h} (${Math.round(p)}%)`, d.appendChild(g);
  }
  const u = w("div", { class: "pvt-facet-rows" });
  if (a.forEach(([p, g], f) => {
    const v = t > 0 ? Math.round(g / t * 100) : 0;
    u.appendChild(
      Fu(r, p, g, v, f, t, i, n)
    );
  }), l.length > 0) {
    const p = t > 0 ? Math.round(h / t * 100) : 0;
    u.appendChild(Pu(l.length, h, p));
  }
  return w("div", { class: "pvt-facet-body" }, [d, u]);
}
function Fu(r, e, t, i, n, s, o, a) {
  const l = w("span", { class: "pvt-facet-dot" });
  l.style.background = Jo(e, n, o);
  const h = Fi(e), d = w("span", {
    class: ["pvt-facet-value", h ? "pvt-facet-value--empty" : "code-container"]
  }, [h ? "— empty —" : Mi(e)]), u = [l, d];
  if (o === "shared") {
    const g = t === s ? `all ${t} nodes` : `${t} of ${s}`;
    u.push(w("span", { class: "pvt-facet-caption" }, [g]));
  } else
    u.push(w("span", { class: "pvt-facet-count" }, [String(t)]));
  u.push(w("span", { class: "pvt-facet-percent" }, [`${i}%`]));
  const p = w("div", { class: "pvt-facet-row" }, u);
  return o === "values" && !h && a && p.appendChild(a(r, e)), p;
}
function Pu(r, e, t) {
  const i = w("span", { class: "pvt-facet-dot" });
  return i.style.background = "var(--pvt-text-color-3)", w("div", { class: "pvt-facet-row pvt-facet-row--more" }, [
    i,
    w("span", { class: "pvt-facet-value" }, [`+${r} more values`]),
    w("span", { class: "pvt-facet-count" }, [String(e)]),
    w("span", { class: "pvt-facet-percent" }, [`${t}%`])
  ]);
}
function Bu(r, e, t) {
  const i = w("div", { class: "pvt-facet-caption pvt-facet-caption--block" }, [
    "no repeated values"
  ]), n = w("div", { class: "pvt-facet-chips" }), s = Array.from(e.keys());
  return s.slice(0, hn).forEach((o) => {
    const a = Fi(o), l = w("span", {
      class: ["pvt-facet-chip", a ? "pvt-facet-value--empty" : ""]
    }, [a ? "— empty —" : Mi(o)]);
    t && !a && (l.title = `${Mi(o)}
${Xo}`, Zo(l, r, o, t)), n.appendChild(l);
  }), s.length > hn && n.appendChild(
    w("span", { class: "pvt-facet-chip pvt-facet-chip--more" }, [
      `+${s.length - hn} more`
    ])
  ), w("div", { class: "pvt-facet-body" }, [i, n]);
}
const Hu = "hsl(165 45% 52%)";
function Jo(r, e, t) {
  return Fi(r) ? "var(--pvt-text-color-3)" : t === "shared" ? Hu : Ru(e);
}
function Mi(r) {
  return typeof r == "string" ? r : JSON.stringify(r);
}
function Fi(r) {
  return r.length === 0;
}
function zu(r) {
  const e = /* @__PURE__ */ new Map();
  return r.forEach((t) => {
    t.forEach((i) => {
      if ((typeof i.name == "string" || typeof i.name == "number" || typeof i.name == "boolean") && (typeof i.value == "string" || typeof i.value == "number" || typeof i.value == "boolean")) {
        e.has(i.name) || e.set(i.name, /* @__PURE__ */ new Map());
        const n = e.get(i.name), s = n.get(i.value) || 0;
        n.set(i.value, s + 1);
      }
    });
  }), e;
}
function $u(r, e = !0) {
  const t = /* @__PURE__ */ new Map();
  for (const [o, a] of r.entries()) {
    const l = Array.from(a.entries()).sort(
      (h, d) => d[1] - h[1]
      // high count first
    );
    t.set(o, new Map(l));
  }
  const i = Array.from(t.entries()).sort(
    (o, a) => o[1].size - a[1].size
  ), n = new Map(i);
  if (!e)
    return n;
  const s = /* @__PURE__ */ new Map();
  for (const [o, a] of n)
    for (const [l, h] of a) {
      s.has(o) || s.set(o, /* @__PURE__ */ new Map());
      const d = s.get(o);
      if (a.size > _u && h === 1) {
        const u = d.get(vr) || 0;
        d.set(vr, u + 1);
      } else
        d.set(l, h);
    }
  return s;
}
class Gu extends it {
  constructor(t) {
    super(t);
    c(this, "panel");
    c(this, "header");
    c(this, "body");
    c(this, "renderCb");
    // Placeholder / staleness for an async `render` or properties map; superseded
    // on every selection change.
    c(this, "renderScope");
    this.renderCb = typeof this.uiManager.getOptions().propertiesPanel.render == "function" ? this.uiManager.getOptions().propertiesPanel.render : void 0, this.renderScope = new Se("properties", () => this.uiManager.getOptions().asyncContent), this.track(() => this.renderScope.supersede());
  }
  onMount(t) {
    if (!t) return;
    const i = `
<div class="enter-ready">
    <div class="pvt-properties-header-panel pvt-sidebar-header-panel"></div>
    <div class="pvt-properties-body-panel pvt-sidebar-body-panel"></div>
</div>`;
    this.panel = dt(i), this.header = this.panel.querySelector(".pvt-properties-header-panel"), this.body = this.panel.querySelector(".pvt-properties-body-panel"), t.appendChild(this.panel);
  }
  onDestroy() {
    var t;
    (t = this.panel) == null || t.remove(), this.panel = void 0;
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
  renderCustomContent(t) {
    var n;
    if (!this.body || !this.renderCb) return;
    this.renderScope.supersede(), this.body.innerHTML = "";
    const i = this.renderScope.content(this.renderCb, t);
    i && ((n = this.body) == null || n.appendChild(i));
  }
  /**
   * Replace the panel body with the outcome of a render pass.
   *
   * Everything the panel draws goes through here so the staleness guard is in
   * one place: whatever the last pass was still fetching is abandoned before
   * its slot leaves the DOM.
   */
  renderBody(t, i) {
    if (!this.body) return;
    this.renderScope.supersede();
    const n = this.renderScope.resolve(t, i);
    this.body.innerHTML = "", n && this.body.appendChild(n);
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
  updateNodeProperties(t) {
    if (this.body) {
      if (this.setHeaderBasicNode(), this.showPanel(), this.renderCb) {
        this.renderCustomContent(t);
        return;
      }
      this.renderBody(
        (i) => qe(t, this.uiManager.getOptions().propertiesPanel, i),
        (i) => w("div", { class: "pvt-properties-container" }, [
          Xe(i, t)
        ])
      );
    }
  }
  updateEdgeProperties(t) {
    if (this.body) {
      if (this.setHeaderBasicEdge(), this.showPanel(), this.renderCb) {
        this.renderCustomContent(t);
        return;
      }
      this.renderBody(
        (i) => Sn(t, this.uiManager.getOptions().propertiesPanel, i),
        (i) => w("div", { class: "pvt-properties-container" }, [
          Xe(i, t)
        ])
      );
    }
  }
  /* Multiple selection */
  updateNodesProperties(t) {
    if (this.body) {
      if (this.setHeaderMultiSelectNode(), this.showPanel(), this.renderCb) {
        this.renderCustomContent(t.map((i) => i.node));
        return;
      }
      this.renderBody(
        (i) => rn(
          t.map((n) => n.node),
          (n) => qe(n, this.uiManager.getOptions().propertiesPanel, i)
        ),
        (i) => this.buildAggregatedTable(i, t.length, this.applyNodeFacetFilter.bind(this))
      );
    }
  }
  /**
   * The aggregated table for a multi-selection. `onFacetFilter` is node-only:
   * edge selection filtering runs on nodes, so an edge table's bars and chips
   * stay non-clickable.
   */
  buildAggregatedTable(t, i, n) {
    const o = dt(`
<div class="pvt-properties-container">
    <div class="">
        <div class="pvt-aggregated-properties"></div>
    </div>
</div>`), a = o.querySelector("div.pvt-aggregated-properties");
    return a && a.appendChild(Qo(
      zu(t),
      i,
      this.genActionButtons.bind(this),
      n
    )), o;
  }
  updateEdgesProperties(t) {
    if (this.body) {
      if (this.setHeaderMultiSelectEdge(), this.showPanel(), this.renderCb) {
        this.renderCustomContent(t.map((i) => i.edge));
        return;
      }
      this.renderBody(
        (i) => rn(
          t.map((n) => n.edge),
          (n) => Sn(n, this.uiManager.getOptions().propertiesPanel, i)
        ),
        (i) => this.buildAggregatedTable(i, t.length)
      );
    }
  }
  /**
   * Narrows the current node selection by a single facet value: `keep` drops
   * every node that does not carry the value, `exclude` drops those that do.
   * Shared by the row icons and by clicking a distribution bar / value chip.
   *
   * The value is read through `nodePropertiesGetter` — the same source the
   * facet was built from — rather than raw `getData()`, so getter-derived
   * fields (e.g. `id`, which lives on `node.id`) match instead of missing.
   *
   * A declared map may be async, in which case the narrowing waits for it.
   * A synchronous map still narrows in the same tick as the click.
   */
  applyNodeFacetFilter(t, i, n) {
    const s = this.uiManager.getOptions().propertiesPanel, o = this.uiManager.graph.renderer.getGraphInteraction(), a = o.getSelectedNodes(), l = (d) => {
      const u = a.filter((p, g) => {
        var v;
        const f = (v = d[g].find((y) => y.name === t)) == null ? void 0 : v.value;
        return n === "keep" ? f !== i : f === i;
      });
      o.removeNodesFromSelection(u);
    }, h = rn(
      a.map((d) => d.node),
      (d) => qe(d, s)
    );
    Ze(h) ? h.then(l) : l(h);
  }
  genActionButtons(t, i) {
    const n = w("button", {
      title: "Keep only nodes with this value",
      class: "pvt-facet-action-select"
    }, [Z({ svgIcon: po })]);
    n.addEventListener("click", () => this.applyNodeFacetFilter(t, i, "keep"));
    const s = w("button", {
      title: "Exclude nodes with this value",
      class: "pvt-facet-action-exclude"
    }, [Z({ svgIcon: uo })]);
    return s.addEventListener("click", () => this.applyNodeFacetFilter(t, i, "exclude")), w("div", { class: "pvt-aggregated-property-actions" }, [
      n,
      s
    ]);
  }
}
class Uu extends it {
  constructor(t) {
    super(t);
    c(this, "row");
  }
  onMount(t) {
    t && (this.row = document.createElement("div"), this.row.className = "pvt-sidebar-bulkactions", this.buildRow(), this.hide(), t.appendChild(this.row));
  }
  onDestroy() {
    var t;
    (t = this.row) == null || t.remove(), this.row = void 0;
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
      { id: "pin", label: "Pin", icon: we, kind: "action", run: () => this.pinSelection() },
      { id: "unpin", label: "Unpin", icon: Bn, kind: "action", run: () => this.unpinSelection() },
      { id: "hide", label: "Hide", icon: ee, kind: "action", run: () => this.hideSelection() },
      { id: "isolate", label: "Isolate", icon: Ii, kind: "soon" },
      { id: "group", label: "Group", icon: Ec, kind: "soon", divider: !0 },
      { id: "ungroup", label: "Ungroup", icon: Sc, kind: "soon" },
      { id: "bulk-edit", label: "Bulk edit", icon: Cc, kind: "soon" },
      // Dropped entirely when deletion is disabled — a read-only integration
      // wants no Delete button, not one that always refuses.
      ...this.uiManager.isEditorEnabled("deletion") ? [{ id: "delete", label: "Delete", icon: Ee, kind: "danger", divider: !0, run: () => void this.deleteSelection() }] : []
    ];
  }
  buildRow() {
    if (this.row) {
      this.row.innerHTML = "";
      for (const t of this.specs()) {
        if (t.divider) {
          const n = document.createElement("span");
          n.className = "pvt-sidebar-bulkactions-divider", this.row.appendChild(n);
        }
        const i = document.createElement("button");
        i.type = "button", i.className = "pvt-sidebar-bulkaction", i.dataset.action = t.id, i.setAttribute("aria-label", t.label), i.title = t.kind === "soon" ? `${t.label} — coming soon` : t.label, i.innerHTML = `<span class="pvt-sidebar-bulkaction-icon">${t.icon}</span>`, t.kind === "soon" ? (i.disabled = !0, i.classList.add("pvt-sidebar-bulkaction-soon")) : (t.kind === "danger" && i.classList.add("pvt-sidebar-bulkaction-danger"), this.listen(i, "click", () => {
          var n;
          return (n = t.run) == null ? void 0 : n.call(t);
        })), this.row.appendChild(i);
      }
    }
  }
  /* ---------- functional actions (operate on the live selection) ---------- */
  selection() {
    return this.uiManager.graph.renderer.getGraphInteraction().getSelectedNodes();
  }
  selectedNodes() {
    return this.selection().map((t) => t.node);
  }
  pinSelection() {
    for (const t of this.selectedNodes()) t.freeze();
  }
  unpinSelection() {
    for (const i of this.selectedNodes()) i.unfreeze();
    const t = this.uiManager.graph.simulation;
    t.isEnabled() && t.reheat();
  }
  hideSelection() {
    const t = this.uiManager.graph.queryEngine;
    for (const i of this.selectedNodes()) t.excludeNode(i);
    this.clearSelection();
  }
  /**
   * Route the selection through the before-delete hook. A veto keeps the selection
   * (and the row) exactly as it was, so the user can act on it again; only a delete
   * that actually happened clears it.
   */
  async deleteSelection() {
    (await this.uiManager.graph.editing.requestDelete({
      nodes: this.selectedNodes(),
      origin: "bulk-action"
    })).accepted && this.clearSelection();
  }
  clearSelection() {
    this.uiManager.graph.renderer.getGraphInteraction().clearNodeSelectionList();
  }
}
function qu(r, e) {
  return r === e ? !0 : !Array.isArray(r) || !Array.isArray(e) ? !1 : r.length === e.length && r.every((t, i) => t === e[i]);
}
class ju extends it {
  constructor() {
    super(...arguments);
    c(this, "panelContainer");
    /** Mounted panels, in display order (mirrors `UIManager.getPanels()`). */
    c(this, "mounted", []);
    /** The selection the panels currently describe; replayed onto panels mounted later. */
    c(this, "selection", null);
  }
  onMount(t) {
    t && (this.panelContainer = t);
  }
  onDestroy() {
    var t;
    for (const i of this.mounted) i.scope.supersede();
    this.mounted = [], (t = this.panelContainer) == null || t.remove(), this.panelContainer = void 0;
  }
  onAfterMount() {
    this.track(this.uiManager.onPanelsChanged((t) => this.applyChange(t)));
    for (const t of this.uiManager.getPanels())
      this.mountPanel(t, this.mounted.length);
  }
  onGraphReady() {
  }
  /* ---------- selection ---------- */
  updateNode(t) {
    this.setSelection(t);
  }
  updateEdge(t) {
    this.setSelection(t);
  }
  updateNodes(t) {
    this.setSelection(t.map((i) => i.node));
  }
  updateEdges(t) {
    this.setSelection(t.map((i) => i.edge));
  }
  clear() {
    this.setSelection(null);
  }
  /** Re-render every panel against the new selection, then re-apply visibility. */
  setSelection(t) {
    const i = Array.isArray(t) && t.length === 0 ? null : t;
    if (!qu(this.selection, i)) {
      this.selection = i;
      for (const n of this.mounted)
        this.renderPanel(n), this.applyVisibility(n);
    }
  }
  /* ---------- registry changes ---------- */
  applyChange(t) {
    t.type === "add" ? this.mountPanel(t.panel, t.index) : t.type === "remove" ? this.unmountPanel(t.id) : this.refresh(t.id);
  }
  /** Forced re-render of one panel (or all): applies to `reactive: false` panels too. */
  refresh(t) {
    for (const i of this.mounted)
      t !== void 0 && i.panel.id !== t || (this.renderPanel(i, !0), this.applyVisibility(i));
  }
  mountPanel(t, i) {
    if (!this.panelContainer) return;
    const s = dt(`
            <div class="enter-ready">
                <div class="pivotick-extrapanel-header-panel pvt-sidebar-header-panel"></div>
                <div class="pivotick-extrapanel-body-panel pvt-sidebar-body-panel"></div>
            </div>`);
    s.dataset.panelId = t.id;
    const o = s.querySelector(".pivotick-extrapanel-header-panel"), a = s.querySelector(".pivotick-extrapanel-body-panel"), l = {
      panel: t,
      root: s,
      header: o,
      body: a,
      handle: {
        id: t.id,
        refresh: () => this.uiManager.refreshPanel(t.id),
        remove: () => this.uiManager.removePanel(t.id)
      },
      scope: new Se("extraPanel", () => this.uiManager.getOptions().asyncContent),
      rendered: !1
    };
    this.mounted.splice(i, 0, l), this.panelContainer.insertBefore(s, this.panelContainer.children[i] ?? null), this.renderPanel(l), this.applyVisibility(l);
  }
  unmountPanel(t) {
    const i = this.mounted.findIndex((s) => s.panel.id === t);
    if (i === -1) return;
    const [n] = this.mounted.splice(i, 1);
    n.scope.supersede(), n.root.remove();
  }
  /* ---------- rendering ---------- */
  renderPanel(t, i = !1) {
    const { panel: n, header: s, body: o, handle: a, scope: l } = t;
    t.rendered && n.reactive === !1 && !i || (l.supersede(), this.setContent(s, this.resolveTitle(t)), this.setContent(o, l.content(n.render, this.selection, a)), t.rendered = !0);
  }
  /**
   * A panel with no title — or one that resolved to blank text — leaves its
   * header element empty, which is what keeps the header row collapsed.
   */
  resolveTitle({ panel: t, handle: i, scope: n }) {
    if (t.title === void 0) return;
    const s = n.content(t.title, this.selection, i);
    return s ? s.childElementCount === 0 && (s.textContent ?? "").trim() === "" ? void 0 : s : void 0;
  }
  /**
   * Replace a slot's content wholesale — the same contract as the properties
   * panel. A panel that caches and returns *its own* element keeps it in
   * place: detaching and re-appending it would drop focus and scroll position
   * inside it.
   */
  setContent(t, i) {
    i && t.firstChild === i && t.childNodes.length === 1 || (t.replaceChildren(), i && t.appendChild(i));
  }
  /** Panels are selection-scoped unless `alwaysVisible`; the class drives the CSS. */
  applyVisibility(t) {
    const i = t.panel.alwaysVisible === !0 || this.selection !== null;
    t.root.classList.toggle("enter-active", i);
  }
}
function ta(r, e, t, i) {
  const n = document.createElement("div");
  n.className = "pivotick-tabs";
  const s = document.createElement("div");
  s.className = "pivotick-tab-controls";
  const o = document.createElement("div");
  o.className = "pivotick-tab-panels", i && t ? (i.appendChild(s), t.appendChild(o)) : t ? t.appendChild(n) : n.append(s, o);
  function a(h) {
    const d = h.id;
    o.querySelectorAll("[data-tab-panel]").forEach((g) => g.style.display = "none"), s.querySelectorAll(".pivotick-button").forEach((g) => {
      g.classList.toggle("pivotick-button-primary", !1), g.classList.toggle("pivotick-button-outline-secondary", !0);
    });
    const u = o.querySelector(`[data-tab-panel="${d}"]`), p = s.querySelector(`[data-tab-control="${d}"]`);
    u && (u.style.display = "block"), p && (p.classList.remove("pivotick-button-outline-secondary"), p.classList.add("pivotick-button-primary")), requestAnimationFrame(() => {
      h.onShown && (h == null || h.onShown());
    });
  }
  r.forEach((h) => {
    const d = X({
      text: h.label,
      variant: "outline-secondary",
      "data-tab-control": h.id,
      onclick: () => a(h)
    });
    s.appendChild(d);
    const u = document.createElement("div");
    u.dataset.tabPanel = h.id, u.style.display = "none", u.appendChild(h.content), o.appendChild(u);
  });
  const l = e ? r.find((h) => h.id === e) ?? r[0] : r[0];
  return a(l), i && t ? o : n;
}
const Ti = class Ti extends it {
  constructor(t) {
    super(t);
    c(this, "panel");
    c(this, "header");
    c(this, "body");
    c(this, "neighborCount");
    c(this, "egographContainer");
    c(this, "statContainer");
    c(this, "listContainer");
    c(this, "tabContainer");
    c(this, "egoGraph");
    c(this, "renderCb");
    // Placeholder / staleness for an async `render`; superseded on every selection.
    c(this, "renderScope");
    this.renderCb = typeof this.uiManager.getOptions().neighborsPanel.render == "function" ? this.uiManager.getOptions().neighborsPanel.render : void 0, this.renderScope = new Se("neighbors", () => this.uiManager.getOptions().asyncContent), this.track(() => this.renderScope.supersede());
  }
  onMount(t) {
    if (!t) return;
    const i = `
<div class="enter-ready">
    <div class="pvt-neighbors-header-panel pvt-sidebar-header-panel"></div>
    <div class="pvt-neighbors-body-panel pvt-sidebar-body-panel"></div>
</div>`;
    this.panel = dt(i), this.header = this.panel.querySelector(".pvt-neighbors-header-panel"), this.body = this.panel.querySelector(".pvt-neighbors-body-panel"), this.neighborCount = w("div", { class: "pvt-neighbors-count" }), t.appendChild(this.panel), this.egographContainer = w("div", { class: "main-egograph-container" }, ["Egograph here"]), this.statContainer = w("div", { class: "main-stats-container" }, ["Stats here"]), this.listContainer = w("div", { class: "main-list-container" }, ["List here"]), this.tabContainer = ta(
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
    var t, i;
    (t = this.egoGraph) == null || t.destroy(), this.egoGraph = void 0, (i = this.panel) == null || i.remove(), this.panel = void 0;
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
  renderCustomContent(t) {
    var n;
    if (!this.body || !this.renderCb) return;
    this.renderScope.supersede(), this.body.innerHTML = "";
    const i = this.renderScope.content(this.renderCb, t);
    i && ((n = this.body) == null || n.appendChild(i));
  }
  showPanel() {
    this.panel.classList.add("enter-active");
  }
  hidePanel() {
    this.panel.classList.remove("enter-active");
  }
  /* Single selection */
  updateNodeNeighbors(t) {
    if (this.showPanel(), !this.neighborCount) return;
    if (this.renderCb) {
      this.renderCustomContent(t);
      return;
    }
    this.buildEgoGraph(t), this.buildList(t), this.buildStats(t);
    const i = t.degree(), n = i > 1 ? `${i} connections` : "1 connection";
    this.neighborCount.textContent = n;
  }
  updateEdgeNeighbors(t) {
    if (this.showPanel(), this.renderCb) {
      this.renderCustomContent(t);
      return;
    }
  }
  /* Multiple selection */
  updateNodesNeighbors(t) {
    if (this.showPanel(), !this.neighborCount) return;
    if (this.renderCb) {
      this.renderCustomContent(t.map((o) => o.node));
      return;
    }
    if (t.length <= 1) return;
    const i = this.mergeNodesIntoNode(t.map((o) => o.node));
    this.buildEgoGraph(i, !1), this.buildList(i), this.buildStats(i);
    const n = i.degree(), s = n > 1 ? `${n} connections` : "1 connection";
    this.neighborCount.textContent = s;
  }
  updateEdgesNeighbors(t) {
    if (this.showPanel(), this.renderCb) {
      this.renderCustomContent(t.map((i) => i.edge));
      return;
    }
  }
  buildEgoGraph(t, i = !0) {
    if (!this.egographContainer) return;
    this.egographContainer.innerHTML = "", this.egoGraph && this.egoGraph.destroy(), this.egographContainer.style.visibility = "hidden";
    const n = /* @__PURE__ */ new Map();
    for (const b of [
      t,
      ...t.getConnectedNodes(),
      ...t.getConnectingNodes()
    ])
      n.set(b.id.toString(), b);
    const s = [
      ...t.getEdgesOut(),
      ...t.getEdgesIn()
    ], o = /* @__PURE__ */ new Map();
    s.forEach((b) => {
      !b || b.id == null || o.set(b.id.toString(), b);
    }), n.forEach((b) => {
      b.getEdgesOut().forEach((k) => {
        const S = k.to;
        n.has(S.id.toString()) && S.id !== t.id && o.set(k.id.toString(), k);
      });
    });
    const a = [...n.values()].filter((b) => {
      var k;
      return b.getDeepestNodeClone() === void 0 ? !0 : ((k = b.getDeepestNodeClone()) == null ? void 0 : k.visible) ?? !1;
    }), l = t.id.toString(), h = a.filter((b) => b.id.toString() !== l), d = h.slice(0, Ti.MAX_EGO_NEIGHBORS), u = h.length - d.length, p = /* @__PURE__ */ new Set([l, ...d.map((b) => b.id.toString())]), g = [t, ...d].map((b) => b.toDict(!0)), f = [...o.values()].filter((b) => p.has(b.from.id.toString()) && p.has(b.to.id.toString())).map((b) => b.toDict());
    if (u > 0) {
      const b = `__ego_more__${l}`, k = new et(b, { label: `${u} more`, aggregated_node_count: u }, this.aggregatedNodeStyle());
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
          setPosition: (b, k, S) => {
            b.style.left = `${S.x + S.width + 15}px`, b.style.top = `${S.y}px`;
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
        rootId: t.id
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
          var N, L;
          const S = this.uiManager.graph.getMutableNode(k.id);
          S && ((N = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode()) == null ? void 0 : N.node) != S && (this.uiManager.graph.unHighlightElement(S), (L = this.egoGraph) == null || L.unHighlightElement(k), this.uiManager.graph.selectElement(S));
        },
        onNodeHoverIn: (b, k) => {
          var N, L, I;
          const S = this.uiManager.graph.getMutableNode(k.id);
          S && (this.uiManager.graph.highlightElement(S), (N = this.egoGraph) == null || N.highlightElement(k), (I = (L = this.egoGraph) == null ? void 0 : L.UIManager.tooltip) == null || I.nodeHovered(b, k));
        },
        onNodeHoverOut: (b, k) => {
          var N;
          const S = this.uiManager.graph.getMutableNode(k.id);
          S && (this.uiManager.graph.unHighlightElement(S), (N = this.egoGraph) == null || N.unHighlightElement(k));
        }
      }
    };
    this.egoGraph = new ft(this.egographContainer, v, y), this.egoGraph.on("ready", () => {
      setTimeout(() => {
        this.egographContainer.style.visibility = "visible";
      }, 20), i && this.egoGraph.selectElement(this.egoGraph.getMutableNode(t.id));
    }), this.egoGraph.renderer.getGraphInteraction().canvasClick = () => {
    };
  }
  buildList(t) {
    if (!this.listContainer) return;
    this.listContainer.innerHTML = "";
    const i = 22, n = this.uiManager.getOptions().mainHeader, s = [
      ...t.getEdgesOut(),
      ...t.getEdgesIn()
    ];
    s.sort((a, l) => {
      const h = a.from.id === t.id ? a.to : a.from, d = l.from.id === t.id ? l.to : l.from, u = ot(h, n), p = ot(d, n);
      return u.localeCompare(p);
    });
    const o = w("div", { class: "pvt-neighbor-list" });
    for (const a of s) {
      const l = a.from.id === t.id, h = l ? a.to : a.from, d = be(a, n) || "", u = this.uiManager.graph.getOptions().isDirected || a.directed, p = u ? l ? cc : lc : dc, g = u ? l ? "edge-out" : "edge-in" : "edge-undirected", f = u ? l ? "Outgoing connection" : "Incoming connection" : "Connection", v = w("span", {
        class: ["pvt-neighbor-row__dir", g]
      }, [Z({ svgIcon: p })]), y = w("span", { class: "pvt-neighbor-row__preview" });
      y.appendChild(re(h, { size: i }));
      const b = ot(h, n), k = w("span", { class: "pvt-neighbor-row__name" }, [b]), S = [v, y, k];
      d && S.push(w("span", {
        class: "pvt-neighbor-row__label",
        title: d
      }, [d]));
      const N = d ? `${f} — ${b} · ${d}` : `${f} — ${b}`, L = w("div", {
        class: "pvt-neighbor-row",
        "data-node-id": h.id,
        title: N
      }, S), I = () => this.uiManager.graph.getMutableNode(h.id);
      L.addEventListener("mouseenter", (q) => {
        var R, Y, nt;
        const F = I();
        F && (this.uiManager.graph.highlightElement(F), (R = this.egoGraph) == null || R.highlightElement(t), (nt = (Y = this.egoGraph) == null ? void 0 : Y.UIManager.tooltip) == null || nt.nodeHovered(q, t));
      }), L.addEventListener("mouseleave", () => {
        var F;
        const q = I();
        q && (this.uiManager.graph.unHighlightElement(q), (F = this.egoGraph) == null || F.unHighlightElement(t));
      }), L.addEventListener("click", () => {
        const q = I();
        q && (this.uiManager.graph.unHighlightElement(q), this.uiManager.graph.selectElement(q));
      }), o.appendChild(L);
    }
    this.listContainer.appendChild(o);
  }
  buildStats(t) {
    if (!this.statContainer) return;
    this.statContainer.innerHTML = "";
    const i = w("dl", { class: "pvt-property-list" }), n = w(
      "dl",
      {
        class: "pvt-property-row"
      },
      [
        w("dt", { class: "pvt-property-name", title: "Total connections", style: "font-size: 1em;" }, ["Degree"]),
        w("dd", { class: "pvt-property-value", style: "display: flex; align-items: center; font-size: 1em;" }, [
          w("span", { style: "margin-right: 8px;" }, [t.degree().toString()]),
          w("span", {
            style: "display: inline-flex; align-items: center; margin-right: 8px; color: var(--pvt-text-color-secondary)",
            title: "Outgoing edges"
          }, [Z({ svgIcon: vc }), t.getEdgesOut().length.toString()]),
          w("span", {
            style: "display: inline-flex; align-items: center; color: var(--pvt-text-color-secondary)",
            title: "Incoming edges"
          }, [Z({ svgIcon: yc }), t.getEdgesIn().length.toString()])
        ])
      ]
    );
    i.append(n);
    const s = w("div", { class: "core-stats" }, [i]), o = /* @__PURE__ */ new Map();
    [
      ...t.getEdgesOut(),
      ...t.getEdgesIn()
    ].forEach((u) => {
      const p = be(u, this.uiManager.getOptions().mainHeader) || "", g = o.get(p) || 0;
      o.set(p, g + 1);
    });
    const l = /* @__PURE__ */ new Map();
    l.set("Label", o);
    const h = Qo(
      l,
      t.degree(),
      this.genActionButtonsSingleSelection.bind(this),
      this.applyEdgeLabelFacetFilter.bind(this)
    ), d = w("div", { class: "aggregated-labels" }, [h]);
    this.statContainer.appendChild(s), this.statContainer.appendChild(d);
  }
  /**
   * Reselects the neighbours reached by a single edge label: `keep` selects the
   * nodes linked through that label, `exclude` selects those linked through any
   * other label. Shared by the row icons and by clicking a distribution bar /
   * value chip, mirroring the node-properties facet filter.
   */
  applyEdgeLabelFacetFilter(t, i, n) {
    const s = this.getNodesMatchingFilteredEdgeName(i, n === "exclude");
    if (!s || s.length === 0) return;
    const o = this.uiManager.graph.renderer.getGraphInteraction();
    o.clearNodeSelectionList(), s.length > 1 ? o.selectNodes(s) : o.selectNode(s[0].element, s[0].node);
  }
  genActionButtonsSingleSelection(t, i) {
    const n = w("button", {
      title: "Select nodes linked with this label",
      class: "pvt-facet-action-select"
    }, [Z({ svgIcon: po })]);
    n.addEventListener("click", () => this.applyEdgeLabelFacetFilter(t, i, "keep"));
    const s = w("button", {
      title: "Exclude nodes linked with this label",
      class: "pvt-facet-action-exclude"
    }, [Z({ svgIcon: uo })]);
    return s.addEventListener("click", () => this.applyEdgeLabelFacetFilter(t, i, "exclude")), w("div", { class: "pvt-aggregated-property-actions" }, [
      n,
      s
    ]);
  }
  getNodesMatchingFilteredEdgeName(t, i = !1) {
    const n = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode();
    if (!n) return;
    const s = n.node, o = [...s.getEdgesOut(), ...s.getEdgesIn()], a = /* @__PURE__ */ new Map();
    return o.filter((l) => {
      const h = be(l, this.uiManager.getOptions().mainHeader);
      return i ? h !== t : h === t;
    }).forEach((l) => {
      const h = s === l.from ? l.to : l.from;
      a.set(h.id.toString(), h);
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
      html: (t) => {
        const n = t.getData().aggregated_node_count, s = Z({ svgIcon: fo(28) });
        return s.style = "position: absolute;", dt(`<div style="display: flex; flex-direction: column; position: relative; align-items: center;">
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
                        <div style="height: auto; font-weight: 600; font-size: 1.5em;">+${n}</div>
                        <div style="height: auto;">Group</div>
                    </div>
                </div>`);
      }
    };
  }
  mergeNodesIntoNode(t) {
    const i = this.aggregatedNodeStyle(), n = { label: `${t.length} nodes`, aggregated_node_count: t.length }, s = new et("aggregated-node", n, i);
    s.weight = 10;
    const o = new Set(t.map((d) => d.id.toString())), a = t.flatMap((d) => [
      ...d.getEdgesOut(),
      ...d.getEdgesIn()
    ]), l = [], h = [];
    for (const d of a) {
      const u = o.has(d.from.id), p = o.has(d.to.id);
      u !== p && (u ? l.push(d) : h.push(d));
    }
    return l.forEach((d, u) => {
      const p = d.to.clone();
      new Ct(`outgoing-${u}`, s, p, d.getData(), d.getStyle());
    }), h.forEach((d, u) => {
      const p = d.from.clone();
      new Ct(`incoming-${u}`, p, s, d.getData(), d.getStyle());
    }), s;
  }
};
// Cap the neighbour graph: a very high-degree node otherwise builds an ego
// graph of thousands of SVG elements that re-lays-out on every main-graph
// frame (drag/zoom), dominating frame time. Stats/List tabs still show all.
c(Ti, "MAX_EGO_NEIGHBORS", 50);
let _n = Ti;
class Wu extends it {
  constructor(t) {
    super(t);
    c(this, "sidebar");
    c(this, "sidebarOpen", !0);
    c(this, "sidebarMainHeader");
    c(this, "sidebarProperties");
    c(this, "sidebarNeighbors");
    c(this, "bulkActions");
    c(this, "extraPanelManager");
    c(this, "mainHeaderPanel");
    c(this, "mainBodyPanel");
    c(this, "neighborPanel");
    c(this, "extraPanelContainer");
    c(this, "collapse");
    c(this, "clearSelectionButton");
    this.sidebarMainHeader = new Iu(this.uiManager), this.sidebarProperties = new Gu(this.uiManager), this.sidebarNeighbors = new _n(this.uiManager), this.bulkActions = new Uu(this.uiManager), this.extraPanelManager = new ju(this.uiManager);
  }
  onMount(t) {
    if (!t) return;
    const i = `
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
    this.sidebar = dt(i), t.appendChild(this.sidebar);
  }
  onDestroy() {
    var t, i;
    (t = this.collapse) == null || t.remove(), this.collapse = void 0, (i = this.sidebar) == null || i.remove(), this.sidebar = void 0;
  }
  onAfterMount() {
    var i, n;
    if (!this.sidebar) return;
    this.mainHeaderPanel = this.sidebar.querySelector(".pvt-mainheader-panel") ?? void 0, this.addChild(this.sidebarMainHeader, this.mainHeaderPanel);
    const t = this.sidebar.querySelector(".pvt-sidebar-bulkactions-slot") ?? void 0;
    this.addChild(this.bulkActions, t), this.mainBodyPanel = this.sidebar.querySelector(".pvt-properties-panel") ?? void 0, this.addChild(this.sidebarProperties, this.mainBodyPanel), this.neighborPanel = this.sidebar.querySelector(".pvt-neighbor-panel") ?? void 0, this.addChild(this.sidebarNeighbors, this.neighborPanel), this.extraPanelContainer = this.sidebar.querySelector(".pvt-extra-panel") ?? void 0, this.addChild(this.extraPanelManager, this.extraPanelContainer), this.collapse = w("span", {
      class: "pvt-sidebar-collapse-container",
      role: "button",
      tabindex: "0",
      "aria-label": "Collapse sidebar",
      "aria-expanded": "true"
    }, [
      w("span", { class: "pvt-sidebar-collapse-button pvt-sidebar-collapse-button-collapse" }, [Z({ svgIcon: Vl })]),
      w("span", { class: "pvt-sidebar-collapse-button pvt-sidebar-collapse-button-expand" }, [Z({ svgIcon: Wl })])
    ]), this.sidebar.parentElement.appendChild(this.collapse), this.clearSelectionButton = w("button", {
      class: "pvt-sidebar-clear",
      type: "button",
      title: "Clear selection",
      "aria-label": "Clear selection"
    }, [Z({ svgIcon: Hn })]), this.sidebar.appendChild(this.clearSelectionButton), ((n = (i = this.uiManager.getOptions()) == null ? void 0 : i.sidebar) == null ? void 0 : n.collapsed) === !0 ? this.hideSidebar() : this.showSidebar();
  }
  onGraphReady() {
    this.trackInteraction("selectNode", (t, i) => {
      this.renderSingleNodeSelection(t, i);
    }), this.trackInteraction("unselectNode", () => {
      this.clearSelection();
    }), this.trackInteraction("selectEdge", (t) => {
      this.sidebarMainHeader.updateEdgeOverview(t), this.sidebarProperties.updateEdgeProperties(t), this.sidebarNeighbors.updateEdgeNeighbors(t), this.extraPanelManager.updateEdge(t), this.showSelectionActions("edge");
    }), this.trackInteraction("unselectEdge", () => {
      this.clearSelection();
    }), this.trackInteraction("selectNodes", (t) => {
      this.renderNodeSelection();
    }), this.trackInteraction("unselectNodes", () => {
      this.renderNodeSelection();
    }), this.trackInteraction("selectEdges", (t) => {
      this.sidebarMainHeader.updateEdgesOverview(t), this.sidebarProperties.updateEdgesProperties(t), this.sidebarNeighbors.updateEdgesNeighbors(t), this.extraPanelManager.updateEdges(t), this.showSelectionActions("edge");
    }), this.trackInteraction("unselectEdges", () => {
      this.clearSelection();
    }), this.collapse && (this.listen(this.collapse, "click", () => this.toggleSidebar()), this.listen(this.collapse, "keydown", (t) => {
      const i = t;
      (i.key === "Enter" || i.key === " ") && (i.preventDefault(), this.toggleSidebar());
    })), this.clearSelectionButton && this.listen(this.clearSelectionButton, "click", () => this.clearActiveSelection());
  }
  /**
   * Renders the sidebar for the current node selection, dispatching by size:
   * 0 → cleared, 1 → the single-node view (so a filtered-down selection reads
   * like a fresh click), 2+ → the aggregated multi-selection view.
   */
  renderNodeSelection() {
    const t = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNodes();
    if (t.length === 0)
      this.clearSelection();
    else if (t.length === 1) {
      const { node: i, element: n } = t[0];
      this.renderSingleNodeSelection(i, n);
    } else
      this.renderMultiNodeSelection(t);
  }
  renderSingleNodeSelection(t, i) {
    this.sidebarMainHeader.updateNodeOverview(t, i), this.sidebarProperties.updateNodeProperties(t), this.sidebarNeighbors.updateNodeNeighbors(t), this.extraPanelManager.updateNode(t), this.hideSelectionActions();
  }
  renderMultiNodeSelection(t) {
    this.sidebarMainHeader.updateNodesOverview(t), this.sidebarProperties.updateNodesProperties(t), this.sidebarNeighbors.updateNodesNeighbors(t), this.extraPanelManager.updateNodes(t), this.showSelectionActions("node");
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
  showSelectionActions(t) {
    var i;
    (i = this.clearSelectionButton) == null || i.classList.add("pvt-visible"), t === "node" ? this.bulkActions.show() : this.bulkActions.hide();
  }
  hideSelectionActions() {
    var t;
    (t = this.clearSelectionButton) == null || t.classList.remove("pvt-visible"), this.bulkActions.hide();
  }
  /** Clear whatever is currently selected (nodes and/or edges). */
  clearActiveSelection() {
    const t = this.uiManager.graph.renderer.getGraphInteraction();
    t.clearNodeSelectionList(), t.clearEdgeSelectionList();
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
class Vu extends it {
  constructor(t, i = {}) {
    super(t);
    c(this, "options");
    c(this, "slidePanel");
    c(this, "header");
    c(this, "body");
    c(this, "isOpen", !1);
    c(this, "DEFAULT_HEADER", null);
    c(this, "DEFAULT_BODY", "- empty panel -");
    this.options = i, this.options.header || (this.options.header = this.DEFAULT_HEADER), this.options.body || (this.options.body = this.DEFAULT_BODY);
  }
  onMount(t) {
    if (!t) return;
    const i = document.createElement("template");
    if (i.innerHTML = `
  <div class="pvt-slide-panel" id="pvt-side-panel">
  </div>
`, this.slidePanel = i.content.firstElementChild, this.slidePanel.innerHTML = "", this.options.header != null) {
      this.header = document.createElement("div"), this.header.className = "pvt-slide-panel__header", this.setHeader(this.options.header), this.slidePanel.appendChild(this.header);
      const n = X({
        text: "×",
        onClick: () => {
          this.close();
        },
        id: "pvt-sidePanel-close",
        class: "pvt-close-button",
        style: "margin-left: auto;"
      });
      this.header.appendChild(n);
    }
    this.body = document.createElement("div"), this.body.className = "pvt-slide-panel__content", this.setBody(this.options.body), this.slidePanel.appendChild(this.body), this.options.noBodyPadding ? this.body.style.padding = "0" : this.body.style.padding = "", t.appendChild(this.slidePanel);
  }
  onDestroy() {
    var t;
    (t = this.slidePanel) == null || t.remove(), this.slidePanel = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  open() {
    var t;
    this.isOpen = !0, (t = this.slidePanel) == null || t.classList.add("open");
  }
  close() {
    var t;
    this.isOpen = !1, (t = this.slidePanel) == null || t.classList.remove("open");
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  setHeader(t) {
    this.header && (this.header.innerHTML = "", t && (this.options.header instanceof HTMLElement ? this.header.appendChild(this.options.header) : this.options.rawHeader ? this.header.innerHTML = this.options.header : this.header.textContent = this.options.header));
  }
  setBody(t) {
    this.body && (this.body.innerHTML = "", t && (t instanceof HTMLElement ? this.body.appendChild(t) : this.options.rawBody ? this.body.innerHTML = t : this.body.textContent = t));
  }
}
const un = "manually_hidden", At = "edge:";
class Ku {
  constructor(e) {
    c(this, "graph");
    c(this, "listeners");
    c(this, "filters", {});
    c(this, "excludedNodeIds", /* @__PURE__ */ new Set());
    c(this, "hiddenNodeCount", 0);
    /** Declared facets, by key — how to read and match a filter (see `UI.filter.facets`). */
    c(this, "facets", /* @__PURE__ */ new Map());
    /**
     * Facets owned by the library's own UI (the canvas legend). Kept apart from the
     * declared ones so `setFacets` can't clobber them and they never show up in
     * `getFacets()` — which is the consumer's declaration, not ours.
     */
    c(this, "reservedFacets", /* @__PURE__ */ new Map());
    /** Patterns compiled once per filter application, not once per node (`null` = unusable). */
    c(this, "regexCache", /* @__PURE__ */ new Map());
    /** Facet keys whose accessor/predicate has thrown, so we warn once rather than per node. */
    c(this, "brokenFacets", /* @__PURE__ */ new Set());
    /** Declared edge facets, by bare key — the graph's relation *layers*. */
    c(this, "edgeFacets", /* @__PURE__ */ new Map());
    /** Edge facets owned by the library's own UI (an `edge`-scoped legend section). */
    c(this, "reservedEdgeFacets", /* @__PURE__ */ new Map());
    /** How many edges the active edge filters hide (layer reasons only). */
    c(this, "hiddenEdgeCount", 0);
    /** Whether nodes left with no visible edge are hidden (`UI.filter.hideDisconnected`). */
    c(this, "hideDisconnected", !1);
    /** How many nodes that rule is hiding — what the View flyout's switch reports. */
    c(this, "disconnectedNodeCount", 0);
    this.graph = e, this.listeners = {
      filterAdd: [],
      filterRemove: [],
      filterReset: [],
      filterChange: []
    };
  }
  on(e, t) {
    this.listeners[e].push(t);
  }
  off(e, t) {
    this.listeners[e] = this.listeners[e].filter((i) => i !== t);
  }
  emit(e, ...t) {
    for (const i of this.listeners[e])
      i(...t);
  }
  /**
   * Declare the facets filters are matched with (normally from `UI.filter.facets`).
   * Replaces any previous declaration, and re-applies when filters are already active.
   */
  setFacets(e) {
    this.facets = new Map((e ?? []).map((t) => [t.key, t])), this.brokenFacets.clear(), Object.keys(this.filters).length > 0 && this.apply();
  }
  getFacets() {
    return [...this.facets.values()];
  }
  /**
   * Register a facet the library itself owns — the legend's, so its filter key
   * matches through a predicate instead of a raw data key. Additive: it survives
   * {@link setFacets} and stays out of {@link getFacets}.
   */
  registerFacet(e) {
    this.reservedFacets.set(e.key, e), this.filters[e.key] !== void 0 && this.apply();
  }
  /** Drop a reserved facet, and any filter that was relying on it to match. */
  unregisterFacet(e) {
    this.reservedFacets.delete(e) && this.removeFilter(e);
  }
  /** Declared facets plus the library's own — what filters are actually matched with. */
  allFacets() {
    return [...this.facets.values(), ...this.reservedFacets.values()];
  }
  facetFor(e) {
    return this.facets.get(e) ?? this.reservedFacets.get(e);
  }
  /**
   * Declare the edge facets — the graph's relation layers (normally from
   * `UI.filter.edgeFacets`). Replaces any previous declaration, and re-applies when
   * an edge filter is already active.
   */
  setEdgeFacets(e) {
    this.edgeFacets = new Map((e ?? []).map((t) => [t.key, t])), this.hasEdgeFilters() && this.apply();
  }
  getEdgeFacets() {
    return [...this.edgeFacets.values()];
  }
  /**
   * Register an edge facet the library itself owns — an `edge`-scoped legend
   * section's. Additive: it survives {@link setEdgeFacets} and stays out of
   * {@link getEdgeFacets}.
   */
  registerEdgeFacet(e) {
    this.reservedEdgeFacets.set(e.key, e), this.filters[At + e.key] !== void 0 && this.apply();
  }
  /** Drop a reserved edge facet, and any filter that was relying on it to match. */
  unregisterEdgeFacet(e) {
    this.reservedEdgeFacets.delete(e) && this.removeEdgeFilter(e);
  }
  /** Declared edge facets plus the library's own — what edge filters are matched with. */
  allEdgeFacets() {
    return [...this.edgeFacets.values(), ...this.reservedEdgeFacets.values()];
  }
  edgeFacetFor(e) {
    return this.edgeFacets.get(e) ?? this.reservedEdgeFacets.get(e);
  }
  hasEdgeFilters() {
    return Object.keys(this.filters).some((e) => e.startsWith(At));
  }
  /** Set an edge filter. `key` is the facet's own — the namespacing is internal. */
  setEdgeFilter(e, t) {
    this.setFilter(At + e, t);
  }
  removeEdgeFilter(e) {
    this.removeFilter(At + e);
  }
  /** The active edge filters, keyed by the facet's own key. */
  getEdgeFilters() {
    const e = {};
    for (const [t, i] of Object.entries(this.filters))
      t.startsWith(At) && (e[t.slice(At.length)] = i);
    return e;
  }
  /** How many edges the active edge filters hide. Endpoint-hidden edges don't count. */
  getHiddenEdgeCount() {
    return this.hiddenEdgeCount;
  }
  /**
   * The distinct values an edge facet reads across the graph's real edges, sorted —
   * what a `select` / `multiselect` edge facet is populated with when it declares no
   * options of its own. Synthetic stand-ins are skipped: they carry no data, and the
   * real edges they speak for are read directly.
   */
  getEdgeFacetValues(e) {
    const t = this.edgeFacetFor(e), i = /* @__PURE__ */ new Map();
    for (const n of this.realEdges()) {
      const s = this.readEdgeValue(n, e, t);
      for (const o of Array.isArray(s) ? s : [s]) {
        if (o == null || o === "") continue;
        const a = String(o), l = i.get(a);
        l ? l.count++ : i.set(a, { count: 1, sample: n });
      }
    }
    return [...i].sort(([n], [s]) => n.localeCompare(s)).map(([n, { count: s, sample: o }]) => ({ value: n, count: s, sample: o }));
  }
  /** The graph's real edges — every synthetic stand-in excluded. */
  realEdges() {
    return this.graph.getMutableEdges().filter((e) => {
      var t;
      return !((t = e.representedEdges) != null && t.length);
    });
  }
  getFilters() {
    const e = {
      value: [...this.excludedNodeIds],
      matchMode: "exact"
    };
    return { ...this.filters, manuallyHidden: e };
  }
  setFilters(e) {
    for (const [t, i] of Object.entries(e)) {
      if (i === void 0) {
        this.removeFilter(t);
        return;
      }
      this.filters[t] = i;
    }
    this.apply(), this.emit("filterChange", this.getFilters());
  }
  setFilter(e, t) {
    if (t === void 0) {
      this.removeFilter(e);
      return;
    }
    this.filters[e] = t, this.apply(), this.emit("filterAdd", e, t), this.emit("filterChange", this.getFilters());
  }
  /**
   * Replace the filters `ownedKeys` hold with `filters`, leaving every other key
   * untouched. What the filter panel applies with: a key the panel's form does not
   * own — a legend section's, a live edge layer's — must survive pressing its button.
   */
  replaceFilters(e, t) {
    for (const i of e) delete this.filters[i];
    for (const [i, n] of Object.entries(t))
      n !== void 0 && (this.filters[i] = n);
    this.apply(), this.emit("filterChange", this.getFilters());
  }
  removeFilter(e) {
    e in this.filters && (delete this.filters[e], this.apply(), this.emit("filterRemove", e), this.emit("filterChange", this.getFilters()));
  }
  resetFilters() {
    this.filters = {}, this.apply(), this.emit("filterReset"), this.emit("filterChange", this.getFilters());
  }
  excludeNode(e) {
    const t = this.graph.getMutableNode(e);
    if (t === void 0) return;
    this.excludedNodeIds.add(t.id);
    const i = {
      value: t.id,
      matchMode: "exact"
    };
    this.apply(), this.emit("filterAdd", un, i), this.emit("filterChange", this.getFilters());
  }
  includeNode(e) {
    const t = this.graph.getMutableNode(e);
    t !== void 0 && (this.excludedNodeIds.delete(t.id), this.apply(), this.emit("filterRemove", un), this.emit("filterChange", this.getFilters()));
  }
  clearNodeExclusions() {
    this.excludedNodeIds.clear(), this.apply(), this.emit("filterRemove", un), this.emit("filterChange", this.getFilters());
  }
  getExcludedNodeCount() {
    return this.excludedNodeIds.size;
  }
  getExcludedNodes() {
    return [...this.excludedNodeIds].map((e) => this.graph.getMutableNode(e)).filter((e) => e !== void 0);
  }
  /** How many of *this* graph's nodes the active filters hide (children excluded). */
  getHiddenNodeCount() {
    return this.hiddenNodeCount;
  }
  /**
   * Hide, or stop hiding, the nodes left with no visible edge. Unlike a layer toggle
   * this moves the graph: a hidden node leaves the simulation, so the rest re-settle.
   */
  setHideDisconnected(e) {
    this.hideDisconnected !== e && (this.hideDisconnected = e, this.graph.getMutableNodes().length !== 0 && (this.apply(), this.emit("filterChange", this.getFilters())));
  }
  isHideDisconnected() {
    return this.hideDisconnected;
  }
  /** How many nodes are hidden for having no visible edge. `0` when the rule is off. */
  getDisconnectedNodeCount() {
    return this.disconnectedNodeCount;
  }
  /**
   * Re-derive visibility from the current filters. Filters are otherwise applied only
   * when one changes, so a graph whose nodes or edges moved underneath it can be stale
   * — adding an edge doesn't bring back the node that was hidden for lacking one.
   *
   * Re-deriving also **undoes a manual `graph.hideNode()`**, which nothing remembers;
   * {@link excludeNode} is the hide that survives.
   */
  reapply() {
    this.apply(), this.emit("filterChange", this.getFilters());
  }
  /**
   * The first pass, run by `Graph`'s constructor before the layout and the first paint:
   * with {@link setHideDisconnected} on, a node with no relation must never reach the
   * canvas, nor be in the graph the opening fit frames. Quiet, and a no-op otherwise.
   * @private
   */
  applyInitialVisibility() {
    this.hideDisconnected && this.apply(!1);
  }
  apply(e = !0) {
    this.regexCache.clear();
    const t = this.graph.getMutableNodes().filter((a) => a.childrenDepth === 0), i = t.filter((a) => this.nodeMatchesFilters(a));
    this.hiddenNodeCount = t.length - i.length, this.applyFiltersOnSubgraph();
    const n = this.applyEdgeLayers(), s = this.dropDisconnectedNodes(i), o = this.graph.setVisibleNodes(s, e);
    e && n && !o && this.graph.edgeVisibilityChanged();
  }
  /**
   * Drop the nodes {@link setHideDisconnected} hides: the ones with no visible edge
   * left. Asked of the *candidate* set rather than of `edge.visible`, because the
   * endpoint reason is only committed afterwards, by `setVisibleNodes`.
   *
   * One pass is already the fixed point: a node with no visible edge hides no visible
   * edge when it goes, so removing it can strand nobody.
   */
  dropDisconnectedNodes(e) {
    if (!this.hideDisconnected)
      return this.disconnectedNodeCount = 0, e;
    const t = new Set(e.map((o) => o.id)), i = (o) => {
      let a = o;
      for (; a.childrenDepth > 0 && a.parentNode; ) a = a.parentNode;
      return a;
    }, n = /* @__PURE__ */ new Set();
    for (const o of this.graph.getMutableEdges())
      (o.isCrossCluster ? o.visible && t.has(o.from.id) && t.has(o.to.id) : o.layerVisible && this.graph.edgeWouldBeVisible(o, t)) && (n.add(i(o.from).id), n.add(i(o.to).id));
    const s = e.filter((o) => n.has(o.id));
    return this.disconnectedNodeCount = e.length - s.length, s;
  }
  /**
   * Push the active edge filters onto every edge's layer flag. Returns whether any
   * edge moved, so the caller can repaint without disturbing the simulation — a
   * layer is a lens, and hiding one must not change the layout.
   */
  applyEdgeLayers() {
    const e = this.hasEdgeFilters();
    let t = !1, i = 0;
    for (const n of this.graph.getMutableEdges()) {
      const s = !e || this.edgeMatchesFilters(n);
      n.setLayerVisible(s) && (t = !0), s || i++;
    }
    return this.hiddenEdgeCount = i, t;
  }
  /**
   * Does this edge survive the active edge filters? A synthetic stand-in carries no
   * data of its own — it speaks for real edges, and survives while any of them does.
   */
  edgeMatchesFilters(e) {
    const t = e.representedEdges;
    if (t != null && t.length) return t.some((i) => this.edgeMatchesFilters(i));
    for (const [i, n] of Object.entries(this.filters)) {
      if (!i.startsWith(At)) continue;
      if (Array.isArray(n.value) && n.value.length === 0) return !1;
      const s = i.slice(At.length), o = this.edgeFacetFor(s);
      if (o != null && o.predicate) {
        if (!this.runFacetFn(i, () => o.predicate(e, n.value))) return !1;
        continue;
      }
      const a = this.readEdgeValue(e, s, o), l = {
        key: s,
        // A layer is a multiselect unless the facet says otherwise — the same
        // default the panel builds its control from.
        type: (o == null ? void 0 : o.type) ?? "multiselect",
        matchMode: o == null ? void 0 : o.matchMode
      };
      if (!this.matches(a, n, l)) return !1;
    }
    return !0;
  }
  /** Read an edge facet's dimension off an edge: its `accessor`, else the data key. */
  readEdgeValue(e, t, i) {
    var n;
    return i != null && i.accessor ? this.runFacetFn(At + t, () => i.accessor(e)) : (n = e.getData()) == null ? void 0 : n[t];
  }
  applyFiltersOnSubgraph() {
    const e = this.getFilters(), t = this.allFacets(), i = this.allEdgeFacets();
    this.graph.getMutableNodes().filter((n) => n.childrenDepth === 0).forEach((n) => {
      const s = n.getSubgraph();
      n.isParent && s && (s.queryEngine.resetFilters(), s.queryEngine.setFacets(t), s.queryEngine.setEdgeFacets(i), s.queryEngine.setFilters(e));
    });
  }
  nodeMatchesFilters(e) {
    if (this.excludedNodeIds.has(e.id))
      return !1;
    for (const [t, i] of Object.entries(this.filters)) {
      if (t === "manuallyHidden" || t.startsWith(At)) continue;
      const n = this.facetFor(t);
      if (n != null && n.predicate) {
        if (!this.runFacetFn(t, () => n.predicate(e, i.value))) return !1;
        continue;
      }
      const s = n != null && n.accessor ? this.runFacetFn(t, () => n.accessor(e)) : e.getData()[t];
      if (!this.matches(s, i, n)) return !1;
    }
    return !0;
  }
  /**
   * Run a consumer-supplied accessor/predicate without letting a throw take the
   * whole render down: the facet stops matching and we warn once for that key.
   * Keyed by the *filter* key, so a node and an edge facet of the same name are
   * reported apart.
   */
  runFacetFn(e, t) {
    try {
      return t();
    } catch (i) {
      this.brokenFacets.has(e) || (this.brokenFacets.add(e), console.warn(`Pivotick: filter facet '${e}' threw; it will not match anything.`, i));
      return;
    }
  }
  /** Compile a `regex` facet's pattern (case-insensitive), memoised for this application. */
  compileRegex(e) {
    const t = this.regexCache.get(e);
    if (t !== void 0) return t;
    let i = null;
    try {
      i = new RegExp(e, "i");
    } catch {
      console.warn(`Pivotick: invalid filter pattern '${e}' ignored.`);
    }
    return this.regexCache.set(e, i), i;
  }
  matches(e, t, i) {
    if (t === void 0) return !0;
    if (e == null) return !1;
    const n = t.value, s = (t == null ? void 0 : t.matchMode) ?? (i == null ? void 0 : i.matchMode) ?? "exact";
    if ((i == null ? void 0 : i.type) === "regex" && typeof n == "string") {
      const o = this.compileRegex(n);
      return o ? Array.isArray(e) ? e.some((a) => o.test(String(a))) : o.test(String(e)) : !0;
    }
    if (Array.isArray(e))
      return this.matchesArrayNodeValue(e, n, s);
    if (typeof n == "string")
      return s === "partial" ? String(e).includes(n) : e === n;
    if (typeof n == "number" || typeof n == "boolean")
      return e === n;
    if (Array.isArray(n))
      return n.length === 0 ? !0 : s === "all" ? n.every((o) => o === e) : n.includes(e);
    if (typeof n == "object" && n !== null) {
      const { min: o, max: a } = n;
      return !(typeof e != "number" || o !== void 0 && e < o || a !== void 0 && e > a);
    }
    return !1;
  }
  /**
   * Match an **array** node value: `'all'` requires every selected value to be
   * present, anything else is any-of. `'partial'` compares elements by substring.
   */
  matchesArrayNodeValue(e, t, i) {
    if (t === void 0) return !0;
    const n = (s) => i === "partial" ? e.some((o) => String(o).includes(String(s))) : e.some((o) => o === s);
    if (Array.isArray(t))
      return t.length === 0 ? !0 : i === "all" ? t.every(n) : t.some(n);
    if (typeof t == "object" && t !== null) {
      const { min: s, max: o } = t;
      return e.some((a) => typeof a == "number" && (s === void 0 || a >= s) && (o === void 0 || a <= o));
    }
    return n(t);
  }
}
const Nt = "__table";
class Yu {
  constructor(e) {
    c(this, "uiManager");
    c(this, "claimed", !1);
    /**
     * Id sets, memoised per filter-value array. The predicate runs once per element per
     * application, so building the set inside it would be quadratic; the array identity
     * is stable for the life of a push, including the copy handed to a subgraph.
     */
    c(this, "sets", /* @__PURE__ */ new WeakMap());
    this.uiManager = e;
  }
  /** Register both reserved facets. Idempotent — remounting must not double up. */
  claim() {
    if (this.claimed) return;
    const e = this.uiManager.graph.queryEngine, t = {
      key: Nt,
      label: "From the table",
      type: "multiselect",
      matchMode: "exact"
    };
    e.registerFacet({
      ...t,
      predicate: (i, n) => !this.hidden(n).has(i.id)
    }), e.registerEdgeFacet({
      ...t,
      predicate: (i, n) => !this.hidden(n).has(i.id)
    }), this.claimed = !0;
  }
  /**
   * Drop both facets, and with them whatever they were hiding — `unregisterFacet`
   * removes the filter that was relying on the declaration. So a UI teardown can never
   * leave behind a filter nothing is left to clear.
   */
  release() {
    if (!this.claimed) return;
    const e = this.uiManager.graph.queryEngine;
    e.unregisterFacet(Nt), e.unregisterEdgeFacet(Nt), this.claimed = !1;
  }
  /**
   * Hide these ids on the canvas.
   *
   * An empty list clears the push rather than writing one: `getFilters()` must carry no
   * phantom entry (the header pill counts keys), and on the edge side an empty array is
   * read by `edgeMatchesFilters` as "hide this layer outright" — which would blank every
   * relation in the graph.
   */
  push(e, t) {
    if (t.length === 0) {
      this.clear(e);
      return;
    }
    const i = this.uiManager.graph.queryEngine, n = { value: [...t], matchMode: "exact" };
    e === "edges" ? i.setEdgeFilter(Nt, n) : i.setFilter(Nt, n);
  }
  /** Stop filtering the graph from this tab. */
  clear(e) {
    const t = this.uiManager.graph.queryEngine;
    e === "edges" ? t.removeEdgeFilter(Nt) : t.removeFilter(Nt);
  }
  /**
   * The ids this tab is currently hiding, or `undefined` when nothing is pushed.
   *
   * Read back off the engine rather than remembered here, so the button follows a
   * `resetFilters()` from anywhere — the same way the legend re-derives which of its
   * entries are lit.
   */
  pushed(e) {
    var s;
    const t = this.uiManager.graph.queryEngine, n = (s = (e === "edges" ? t.getEdgeFilters() : t.getFilters())[Nt]) == null ? void 0 : s.value;
    if (n !== void 0)
      return Array.isArray(n) ? n.map(String) : [String(n)];
  }
  hidden(e) {
    if (!Array.isArray(e))
      return new Set(e == null ? [] : [String(e)]);
    const t = this.sets.get(e);
    if (t) return t;
    const i = new Set(e.map(String));
    return this.sets.set(e, i), i;
  }
}
function Xu(r, e) {
  if (r.length !== e.length) return !1;
  const t = new Set(r);
  return e.every((i) => t.has(i));
}
class br {
  constructor(e, t = {}) {
    c(this, "root");
    c(this, "select");
    c(this, "options", []);
    c(this, "selected", /* @__PURE__ */ new Set());
    c(this, "mode");
    c(this, "searchable");
    c(this, "dropdown");
    c(this, "input");
    c(this, "chipsContainer");
    c(this, "listContainer");
    c(this, "clearButton");
    c(this, "singleCloseButton");
    c(this, "inputWrap");
    c(this, "searchWrap");
    c(this, "searchInput");
    c(this, "focusedIndex", -1);
    this.select = e, this.root = document.createElement("div"), this.root.className = "pvt-picker", this.mode = t.mode ?? (e.multiple ? "multi" : "single"), this.searchable = t.searchable ?? !0, this.parseOptions(), this.build(), this.syncFromSelect(), this.attach();
  }
  parseOptions() {
    this.options = Array.from(this.select.options).filter((e) => e.value).map((e) => ({
      value: e.value,
      label: e.text,
      disabled: e.disabled
    }));
  }
  build() {
    var t;
    this.select.style.display = "none", (t = this.select.parentElement) == null || t.insertBefore(this.root, this.select);
    const e = document.createElement("div");
    e.className = "pvt-picker__control", this.chipsContainer = document.createElement("div"), this.chipsContainer.className = "pvt-picker__chips", this.clearButton = document.createElement("button"), this.clearButton.className = "pvt-picker__clear", this.clearButton.textContent = "×", this.clearButton.tabIndex = -1, this.clearButton.style.display = "none", this.clearButton.type = "button", this.inputWrap = document.createElement("div"), this.inputWrap.className = "pvt-picker__input-wrap", this.input = document.createElement("input"), this.input.className = "pvt-picker__input", this.input.placeholder = this.select.getAttribute("placeholder") || "Select...", this.input.type = "text", this.singleCloseButton = document.createElement("button"), this.singleCloseButton.className = "pvt-picker__single-close", this.singleCloseButton.textContent = "×", this.singleCloseButton.type = "button", this.singleCloseButton.style.display = "none", this.inputWrap.appendChild(this.input), this.inputWrap.appendChild(this.singleCloseButton), this.dropdown = document.createElement("div"), this.dropdown.className = "pvt-picker__dropdown", this.listContainer = document.createElement("div"), this.listContainer.className = "pvt-picker__list", this.dropdown.appendChild(this.listContainer), this.mode === "multi" ? (e.appendChild(this.chipsContainer), e.appendChild(this.clearButton)) : e.appendChild(this.inputWrap), this.mode === "multi" && (this.searchWrap = document.createElement("div"), this.searchWrap.className = "pvt-picker__search", this.searchInput = document.createElement("input"), this.searchInput.className = "pvt-picker__search-input", this.searchInput.placeholder = this.select.getAttribute("placeholder") || "Search...", this.searchWrap.appendChild(this.searchInput), this.dropdown.insertBefore(this.searchWrap, this.listContainer)), this.root.appendChild(e), this.root.appendChild(this.dropdown), this.renderList(), this.renderChips();
  }
  attach() {
    const e = this.root.querySelector(".pvt-picker__control");
    e == null || e.addEventListener("click", (n) => {
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
      n.target.tagName !== "BUTTON" && !n.target.classList.contains("pvt-picker__chip-remove") && (this.dropdown.classList.toggle("open"), this.focusedIndex = -1, this.dropdown.classList.contains("open") && (this.searchInput.focus(), this.focusedIndex === -1 && (this.focusedIndex = 0, this.updateFocusedOption())));
    });
    const t = (n) => this.handleKeyDown(n);
    this.searchInput ? (this.searchInput.addEventListener("input", () => {
      this.focusedIndex = -1, this.renderList(this.searchInput.value);
    }), this.searchInput.addEventListener("focus", (n) => {
      n.stopPropagation(), this.dropdown.classList.add("open");
    }), this.searchInput.addEventListener("keydown", t)) : (this.input.addEventListener("keydown", t), this.input.addEventListener("input", () => {
      this.focusedIndex = -1, this.renderList(this.input.value);
    }), this.input.addEventListener("keydown", (n) => {
      n.key === "Backspace" && this.input.value && this.selected.size === 1 && (n.preventDefault(), this.selected.clear(), this.input.value = "", this.syncToSelect(), this.syncFromSelect());
    })), document.addEventListener("pointerdown", (n) => {
      this.root.contains(n.target) || this.dropdown.classList.remove("open");
    }), this.clearButton.addEventListener("click", () => this.clear()), this.singleCloseButton.addEventListener("click", (n) => {
      n.stopPropagation(), this.selected.clear(), this.syncToSelect(), this.syncFromSelect(), this.dropdown.classList.remove("open");
    }), new MutationObserver((n) => {
      let s = !1;
      for (const o of n) {
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
  renderList(e = "") {
    this.listContainer.innerHTML = "";
    const t = this.searchable ? this.options.filter(
      (i) => e ? i.label.toLowerCase().includes(e.toLowerCase()) : !0
    ) : this.options;
    if (t.length === 0) {
      const i = document.createElement("div");
      i.className = "pvt-picker__no-options", i.textContent = "No options available", this.listContainer.appendChild(i);
    }
    t.forEach((i, n) => {
      const s = document.createElement("div");
      s.className = "pvt-picker__option", i.disabled && s.classList.add("disabled"), this.selected.has(i.value) && s.classList.add("selected"), n === this.focusedIndex && (s.classList.add("focused"), this.selected.has(i.value) && s.classList.add("focused-selected")), s.textContent = i.label, s.addEventListener("click", (o) => {
        if (o.stopPropagation(), !i.disabled) {
          if (this.mode === "single") {
            this.selected.clear(), this.selected.add(i.value);
            const a = this.options.find((l) => l.value === i.value);
            this.input.value = a ? a.label : "", this.input.placeholder = "", this.focusedIndex = -1, this.dropdown.classList.remove("open"), this.syncToSelect(), this.syncFromSelect();
            return;
          } else
            this.selected.has(i.value) ? this.selected.delete(i.value) : this.selected.add(i.value);
          this.focusedIndex = n, this.syncToSelect(), this.renderList(this.mode === "multi" ? this.searchInput.value : this.input.value), this.renderChips();
        }
      }), this.listContainer.appendChild(s);
    });
  }
  handleKeyDown(e) {
    var n;
    if (!this.dropdown.classList.contains("open")) return;
    const t = this.searchable ? this.options.filter(
      (s) => {
        var o;
        return (o = this.searchInput) != null && o.value ? s.label.toLowerCase().includes(this.searchInput.value.toLowerCase()) : !0;
      }
    ) : this.options, i = t.length;
    switch (e.key) {
      case "ArrowDown":
        if (e.preventDefault(), this.mode === "multi")
          for (let s = 0; s < i; s++) {
            const o = (this.focusedIndex + 1 + s) % i;
            if (!this.selected.has(t[o].value)) {
              this.focusedIndex = o, this.updateFocusedOption();
              break;
            }
          }
        else
          this.focusedIndex = (this.focusedIndex + 1) % i, this.updateFocusedOption();
        break;
      case "ArrowUp":
        if (e.preventDefault(), this.mode === "multi")
          for (let s = 0; s < i; s++) {
            const o = this.focusedIndex - 1 - s < 0 ? i + this.focusedIndex - 1 - s : this.focusedIndex - 1 - s;
            if (!this.selected.has(t[o].value)) {
              this.focusedIndex = o, this.updateFocusedOption();
              break;
            }
          }
        else
          this.focusedIndex = this.focusedIndex <= 0 ? i - 1 : this.focusedIndex - 1, this.updateFocusedOption();
        break;
      case "Enter":
        if (this.focusedIndex >= 0 && this.focusedIndex < i) {
          e.preventDefault();
          const s = t[this.focusedIndex];
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
              this.selected.has(s.value) ? this.selected.delete(s.value) : this.selected.add(s.value), this.focusedIndex = -1, this.syncToSelect(), this.renderList(((n = this.searchInput) == null ? void 0 : n.value) || ""), this.renderChips();
          }
        }
        break;
      case "Escape":
        e.preventDefault(), this.dropdown.classList.remove("open");
        break;
    }
  }
  updateFocusedOption() {
    const e = this.listContainer.querySelectorAll(".pvt-picker__option");
    if (e.forEach((t, i) => {
      const n = i === this.focusedIndex;
      t.classList.toggle("focused", n), t.classList.toggle("focused-selected", n && t.classList.contains("selected"));
    }), this.focusedIndex >= e.length) {
      this.focusedIndex = -1;
      return;
    }
    if (this.focusedIndex >= 0) {
      const t = this.listContainer.children[this.focusedIndex];
      t == null || t.scrollIntoView({ block: "nearest" });
    }
  }
  renderChips() {
    if (this.mode !== "single") {
      if (this.chipsContainer.innerHTML = "", this.selected.size > 0)
        this.selected.forEach((e) => {
          const t = this.options.find((o) => o.value === e);
          if (!t) return;
          const i = document.createElement("span");
          i.className = "pvt-picker__chip";
          const n = document.createElement("span");
          n.className = "pvt-picker__chip-label", n.textContent = t.label;
          const s = document.createElement("button");
          s.className = "pvt-picker__chip-remove", s.textContent = "×", s.setAttribute("aria-label", `Remove ${t.label}`), s.addEventListener("click", (o) => {
            o.stopPropagation(), this.selected.delete(e), this.syncToSelect(), this.renderChips(), this.renderList(this.searchInput.value);
          }), i.appendChild(n), i.appendChild(s), this.chipsContainer.appendChild(i);
        });
      else {
        const e = document.createElement("span");
        e.className = "pvt-picker__placeholder", e.textContent = this.select.getAttribute("placeholder") || "Select...", this.chipsContainer.appendChild(e);
      }
      this.clearButton.style.display = this.selected.size > 0 ? "" : "none";
    }
  }
  syncToSelect() {
    Array.from(this.select.options).forEach((e) => {
      e.selected = this.selected.has(e.value);
    }), this.select.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
  syncFromSelect() {
    if (this.selected.clear(), Array.from(this.select.selectedOptions).forEach((e) => {
      if (!e.value) return;
      this.options.find((i) => i.value === e.value) && this.selected.add(e.value);
    }), this.mode === "single") {
      if (this.selected.size === 1) {
        const e = this.selected.values().next().value, t = this.options.find((i) => i.value === e);
        t && (this.input.value = t.label, this.input.placeholder = "");
      } else {
        const e = this.select.getAttribute("placeholder") || "Select...";
        this.input.value = "", this.input.placeholder = e;
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
  setValues(e) {
    if (this.selected = new Set(e), this.syncToSelect(), this.mode === "single" && this.selected.size === 1) {
      const t = this.selected.values().next().value, i = this.options.find((n) => n.value === t);
      i && (this.input.value = i.label, this.input.placeholder = "");
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
class ct {
  static createForm(e) {
    const t = document.createElement("form");
    return t.className = "pvt-form", e.fields.forEach((i) => {
      t.appendChild(this.createField(i));
    }), t;
  }
  static getValues(e) {
    const t = {};
    return e.querySelectorAll("[data-field-key]").forEach((n) => {
      const s = n.getAttribute("data-field-key");
      switch (n.getAttribute("data-field-type")) {
        case "text":
        case "regex":
          t[s] = n.value || void 0;
          break;
        case "select": {
          const a = n;
          t[s] = a.value || void 0, a.dataset.fieldValuesAreBoolean === "yes" && (t[s] === "true" ? t[s] = !0 : t[s] === "false" && (t[s] = !1));
          break;
        }
        case "multiselect": {
          const a = n;
          t[s] = Array.from(
            a.selectedOptions
          ).map((l) => l.value).filter((l) => l.length > 0);
          break;
        }
        case "checkbox":
          t[s] = n.checked;
          break;
        case "numberRange": {
          const a = n.querySelector(".min").value, l = n.querySelector(".max").value;
          t[s] = {
            min: a ? Number(a) : void 0,
            max: l ? Number(l) : void 0
          };
          break;
        }
      }
    }), t;
  }
  static clear(e) {
    e.reset();
  }
  // Push values back into the form controls (inverse of getValues). Used to reflect
  // filters set programmatically. Fields absent from `values` are cleared/deselected.
  static setValues(e, t) {
    e.querySelectorAll("[data-field-key]").forEach((n) => {
      var l;
      const s = n.getAttribute("data-field-key"), o = n.getAttribute("data-field-type"), a = t[s];
      switch (o) {
        case "text":
        case "regex": {
          const h = n;
          h.value = a != null ? String(a) : "";
          break;
        }
        case "select":
        case "multiselect": {
          const h = n, d = new Set(
            (Array.isArray(a) ? a : a != null ? [a] : []).map(String)
          );
          Array.from(h.options).forEach((u) => {
            u.selected = u.value !== "" && d.has(u.value);
          }), (l = h._picker) == null || l.sync();
          break;
        }
        case "checkbox": {
          const h = n;
          h.checked = a === !0;
          break;
        }
        case "numberRange": {
          const h = a && typeof a == "object" && !Array.isArray(a) ? a : {}, d = n.querySelector(".min"), u = n.querySelector(".max");
          d.value = h.min != null ? String(h.min) : "", u.value = h.max != null ? String(h.max) : "";
          break;
        }
      }
    });
  }
  static createField(e) {
    const t = document.createElement("div");
    t.className = "pvt-form-element";
    const i = document.createElement("label");
    switch (i.htmlFor = `pvt-form-element-${e.key}`, i.textContent = e.label, t.appendChild(i), e.type) {
      case "select":
        t.appendChild(this.createSelect(e));
        break;
      case "multiselect":
        t.appendChild(this.createMultiSelect(e));
        break;
      case "checkbox":
        t.appendChild(this.createCheckbox(e));
        break;
      case "text":
        t.appendChild(this.createText(e));
        break;
      case "regex":
        t.appendChild(this.createRegex(e));
        break;
      case "numberRange":
        t.appendChild(this.createNumberRange(e));
        break;
    }
    return t;
  }
  /**
   * Mark a field as invalid, showing `message` beneath it. Clears when the user
   * edits the field, or on the next {@link clearFieldErrors}.
   */
  static setFieldError(e, t, i) {
    const n = e.querySelector(`[data-field-key="${t}"]`), s = n == null ? void 0 : n.closest(".pvt-form-element");
    if (!n || !s) return;
    n.classList.add("pvt-invalid"), n.setAttribute("aria-invalid", "true");
    let o = s.querySelector(".pvt-form-error");
    o || (o = document.createElement("span"), o.className = "pvt-form-error", s.appendChild(o)), o.textContent = i, n.addEventListener("input", () => this.clearFieldError(e, t), { once: !0 });
  }
  static clearFieldError(e, t) {
    var n, s;
    const i = e.querySelector(`[data-field-key="${t}"]`);
    i == null || i.classList.remove("pvt-invalid"), i == null || i.removeAttribute("aria-invalid"), (s = (n = i == null ? void 0 : i.closest(".pvt-form-element")) == null ? void 0 : n.querySelector(".pvt-form-error")) == null || s.remove();
  }
  static clearFieldErrors(e) {
    e.querySelectorAll(".pvt-invalid").forEach((t) => {
      t.classList.remove("pvt-invalid"), t.removeAttribute("aria-invalid");
    }), e.querySelectorAll(".pvt-form-error").forEach((t) => t.remove());
  }
  static baseAttrs(e, t) {
    e.id = `pvt-form-element-${t.key}`, e.setAttribute("data-field-key", t.key), e.setAttribute("data-field-type", t.type);
  }
  static buildSelect(e) {
    var i;
    const t = document.createElement("select");
    if (this.baseAttrs(t, e), e.allowEmpty) {
      const n = document.createElement("option");
      n.value = "", n.textContent = "", n.selected = !0, t.appendChild(n);
    }
    return e.valuesAreBoolean && t.setAttribute("data-field-values-are-boolean", "yes"), (i = e.options) == null || i.forEach((n) => {
      const s = document.createElement("option");
      s.value = n.value, s.textContent = n.label, e.defaultValue && (Array.isArray(e.defaultValue) ? e.defaultValue.includes(n.value) : e.defaultValue === n.value) && (s.selected = !0), t.appendChild(s);
    }), t;
  }
  static createSelect(e) {
    const t = this.buildSelect(e);
    return requestAnimationFrame(() => {
      t._picker = new br(t, {});
    }), t;
  }
  static createMultiSelect(e) {
    const t = this.buildSelect(e);
    return t.multiple = !0, requestAnimationFrame(() => {
      t._picker = new br(t, {});
    }), t;
  }
  static createCheckbox(e) {
    const t = document.createElement("input");
    return t.type = "checkbox", e.defaultValue === !0 && (t.checked = !0), this.baseAttrs(t, e), t;
  }
  static createText(e) {
    const t = document.createElement("input");
    return t.type = "text", t.placeholder = e.placeholder ?? "", this.baseAttrs(t, e), e.defaultValue && (t.value = String(e.defaultValue)), t;
  }
  /** A pattern field: a text input that reads as one (monospace, `/…/` placeholder). */
  static createRegex(e) {
    const t = this.createText(e);
    return t.classList.add("pvt-form-regex"), t.placeholder = e.placeholder ?? "pattern…", t.spellcheck = !1, t.autocapitalize = "off", t;
  }
  static createNumberRange(e) {
    const t = document.createElement("div");
    t.className = "pvt-number-range", this.baseAttrs(t, e);
    const i = document.createElement("input");
    i.type = "number", i.placeholder = "Min", i.className = "min";
    const n = document.createElement("input");
    n.type = "number", n.placeholder = "Max", n.className = "max";
    const s = typeof e.defaultValue == "object" && e.defaultValue !== null ? e.defaultValue : void 0;
    return (s == null ? void 0 : s.min) != null && (i.value = String(s.min)), (s == null ? void 0 : s.max) != null && (n.value = String(s.max)), t.append(i, n), t;
  }
  /** `attr-type` / `attrType` / `attr_type` → `Attr Type`. */
  static niceLabelFromKey(e) {
    return e.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ").trim().split(" ").map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(" ");
  }
}
const Pe = 18, pn = 11, Zu = 5, wr = 1, Qu = 3, gn = "http://www.w3.org/2000/svg";
function ea(r, e = "") {
  const t = document.createElementNS(gn, "svg");
  t.setAttribute("width", String(Pe)), t.setAttribute("height", String(pn)), t.setAttribute("viewBox", `0 0 ${Pe} ${pn}`), t.setAttribute("aria-hidden", "true");
  const i = (r == null ? void 0 : r.strokeColor) ?? "var(--pvt-edge-stroke, #999)", n = typeof (r == null ? void 0 : r.markerEnd) == "string" && r.markerEnd !== "", s = Math.min(Qu, Math.max(wr, Number(r == null ? void 0 : r.strokeWidth) || wr)), o = pn / 2, a = n ? Pe - Zu : Pe, l = document.createElementNS(gn, "line");
  if (l.setAttribute("x1", "0"), l.setAttribute("y1", String(o)), l.setAttribute("x2", String(a)), l.setAttribute("y2", String(o)), l.setAttribute("stroke-width", String(s)), (r == null ? void 0 : r.dashed) === !0 && l.setAttribute("stroke-dasharray", "3 2"), l.style.stroke = i, t.appendChild(l), n) {
    const d = document.createElementNS(gn, "path");
    d.setAttribute("d", `M${a} ${o - 3} L${Pe} ${o} L${a} ${o + 3} Z`), d.style.fill = i, t.appendChild(d);
  }
  const h = document.createElement("span");
  return h.className = e ? `pvt-edge-swatch ${e}` : "pvt-edge-swatch", h.appendChild(t), h;
}
function Ju(r, e, t = "") {
  var i;
  return ea((i = r.renderer) == null ? void 0 : i.getEdgeStyle(e), t);
}
function is(r, e) {
  var l, h;
  const i = dt(`
        <div class="main-container">
            <div class="icon-container"></div>
            <div class="nodeinfo-container">
                <div class="nodeinfo-name"></div>
                <div class="nodeinfo-subtitle"></div>
            </div>
        </div>
    `), n = i.querySelector(".nodeinfo-name"), s = i.querySelector(".nodeinfo-subtitle");
  n && (n.textContent = ot(r, e.getOptions().mainHeader)), s && (s.textContent = Un(r, e.getOptions().mainHeader) ?? ""), (l = i.querySelector(".icon-container")) == null || l.appendChild(re(r, { size: 42, className: "icon" }));
  const o = ip(r, e), a = document.querySelector("#inspect-node-modal");
  a && ((h = a.__modalInstance) == null || h.destroy()), e.createModal({
    id: "inspect-node-modal",
    rawHeader: !0,
    header: i,
    body: o,
    rawBody: !0,
    buttons: null,
    position: "top",
    size: "xl",
    noBodyPadding: !0
  });
}
function tp(r, e) {
  const t = dt('<div class="inspect-node-properties-tab"></div>'), n = new Se("properties", () => e.getOptions().asyncContent).resolve(
    (s) => qe(r, e.getOptions().propertiesPanel, s),
    (s) => Xe(s, r, { layout: "columns" })
  );
  return n && t.appendChild(n), t;
}
function ep(r) {
  const e = document.createElement("div");
  e.classList.add("inspect-node-json-tab");
  let t = r.getData();
  try {
    t = JSON.parse(JSON.stringify(t));
  } catch {
  }
  return e.appendChild(uu(t)), e;
}
function ip(r, e) {
  const t = document.createElement("div");
  t.classList.add("inspect-node-modal-body");
  const i = ta(
    [
      {
        id: "properties",
        label: "Properties",
        content: tp(r, e)
      },
      {
        id: "json",
        label: "JSON",
        content: ep(r)
      }
    ],
    "properties"
  );
  return t.appendChild(i), t;
}
function ia(r, e) {
  const t = new Set(e ?? []), i = /* @__PURE__ */ new Map();
  for (const n of r)
    for (const [s, o] of Object.entries(n.getData())) {
      if (o == null || t.has(s)) continue;
      let a = i.get(s);
      a || (a = { numbers: /* @__PURE__ */ new Set(), values: /* @__PURE__ */ new Set(), count: 0 }, i.set(s, a)), a.count++, typeof o == "number" ? a.numbers.add(o) : a.values.add(o);
    }
  return [...i].map(([n, s]) => s.values.size === 0 && s.numbers.size > 0 ? { key: n, count: s.count, range: [Math.min(...s.numbers), Math.max(...s.numbers)] } : { key: n, count: s.count, values: [.../* @__PURE__ */ new Set([...s.values, ...s.numbers])] });
}
function na(r) {
  if (r.range)
    return { type: "numberRange", matchMode: "exact", valuesAreBoolean: !1 };
  const e = r.values;
  if (e && e.length > 0) {
    if (e.every((t) => typeof t == "string" && t.length < 64))
      return e.length > 2 ? { type: "multiselect", matchMode: "partial", valuesAreBoolean: !1, options: e } : { type: "select", matchMode: "exact", valuesAreBoolean: !1, options: e };
    if (e.every((t) => typeof t == "boolean"))
      return { type: "select", matchMode: "exact", valuesAreBoolean: !0, options: ["true", "false"] };
  }
  return { type: "text", matchMode: "exact", valuesAreBoolean: !1 };
}
const np = "Filter Graph", sp = /* @__PURE__ */ new Set(["text", "regex", "numberRange"]), rp = 300;
class op extends it {
  constructor(t) {
    super(t);
    c(this, "graphFilter");
    c(this, "formOptions");
    c(this, "filteringForm");
    c(this, "manuallyFilteredContainer");
    /** The data dock's push, when there is one — see {@link updateUIFilterFromTable}. */
    c(this, "fromTableContainer");
    /** The layer-toggle rows, by `edge:<key>|<value>`, so a filter change can relight them. */
    c(this, "layerRows", /* @__PURE__ */ new Map());
    /** Set while the panel writes a layer filter, so it doesn't read its own echo back. */
    c(this, "applyingLayers", !1);
    /** Same, for the attribute form: pushing values back would rebuild the open picker. */
    c(this, "applyingForm", !1);
    /** The pending commit of a typed field, cleared whenever anything else commits first. */
    c(this, "typedApplyTimer");
    this.formOptions = [];
  }
  onMount(t) {
    t && (this.build(), this.graphFilter && t.appendChild(this.graphFilter));
  }
  onDestroy() {
    var t;
    window.clearTimeout(this.typedApplyTimer), (t = this.graphFilter) == null || t.remove(), this.graphFilter = void 0;
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  build() {
    return this.graphFilter = document.createElement("div"), this.graphFilter.classList.add("pvt-graph-filter-container"), this.uiManager.graph.on("dataBatchChanged", () => {
      this.rebuild();
    }), this.uiManager.graph.queryEngine.on("filterChange", (t) => {
      this.updateUIFilterButtonContent(t), this.updateUIFilterHiddenNodes(), this.updateUIFilterFromTable(), this.syncFormFromActiveFilters(t), this.syncLayerRows();
    }), requestAnimationFrame(() => {
      this.updateUIFilterButtonContent({}), this.updateUIFilterHiddenNodes(), this.updateUIFilterFromTable();
    }), this.graphFilter;
  }
  rebuild() {
    var l;
    if (!this.graphFilter) return;
    window.clearTimeout(this.typedApplyTimer), this.graphFilter.replaceChildren();
    const t = X({
      variant: "secondary",
      text: "Reset",
      size: "xs",
      svgIcon: vo,
      title: "Clear all attribute filters",
      onClick: () => {
        ct.clear(i);
        const h = {};
        this.filterGraph(h);
      }
    });
    this.formOptions = this.buildFormFields();
    const i = ct.createForm({
      fields: this.formOptions
    });
    this.filteringForm = i, this.bindLiveApply(i);
    const n = w("div", { class: "pvt-filter-section" }), s = w("div", { class: "pvt-filter-section-head" }, [
      w("span", { class: "pvt-filter-section-label" }, ["Attributes"]),
      t
    ]);
    n.appendChild(s), n.appendChild(i), this.manuallyFilteredContainer = dt(`<div class="pvt-hidden-nodes-container">
                <div class="pvt-filter-section-head">
                    <span class="pvt-filter-section-label">Hidden nodes</span>
                </div>
                <div class="pvt-hidden-nodes-container-list"></div>
            </div>`);
    const o = X({
      variant: "secondary",
      text: "Show all",
      size: "xs",
      svgIcon: Wt,
      onClick: () => {
        this.uiManager.graph.queryEngine.clearNodeExclusions();
      },
      title: "Restore manually hidden nodes"
    });
    (l = this.manuallyFilteredContainer.querySelector(".pvt-filter-section-head")) == null || l.appendChild(o), this.graphFilter.appendChild(n);
    const a = this.buildLayerSection();
    a && this.graphFilter.appendChild(a), this.fromTableContainer = this.buildFromTableSection(), this.graphFilter.appendChild(this.fromTableContainer), this.graphFilter.appendChild(this.manuallyFilteredContainer), this.updateUIFilterFromTable(), this.syncFormFromActiveFilters(this.uiManager.graph.queryEngine.getFilters());
  }
  /**
   * The attribute form applies itself, like the layer rows and the legend already do:
   * a pick or a tick commits at once, a typed field a beat after the last keystroke.
   * A separate apply button only bought a state where the panel showed one filter and
   * the canvas had another.
   */
  bindLiveApply(t) {
    t.addEventListener("submit", (i) => {
      i.preventDefault(), this.applyForm(t);
    }), t.addEventListener("change", (i) => {
      kr(i.target) !== void 0 && this.applyForm(t);
    }), t.addEventListener("input", (i) => {
      const n = kr(i.target);
      n === void 0 || !sp.has(n) || (window.clearTimeout(this.typedApplyTimer), this.typedApplyTimer = window.setTimeout(() => this.applyForm(t), rp));
    });
  }
  /** Read the form and apply it, without letting the resulting event echo back into it. */
  applyForm(t) {
    window.clearTimeout(this.typedApplyTimer), this.applyingForm = !0;
    try {
      this.filterGraph(ct.getValues(t));
    } finally {
      this.applyingForm = !1;
    }
  }
  /**
   * The data dock's push: what the table's column filters are hiding, and the second
   * place it can be cleared from.
   *
   * Without this a push is unfindable. Its key is reserved, so the Attributes form
   * cannot show it; the header pill counts it but cannot name it; and folding the dock
   * away takes the button that made it off the screen. Empty and hidden until a push
   * exists.
   */
  buildFromTableSection() {
    return w("div", { class: "pvt-filter-section pvt-filter-from-table hidden" }, [
      w("div", { class: "pvt-filter-section-head" }, [
        w("span", { class: "pvt-filter-section-label" }, ["From the table"])
      ]),
      w("div", { class: "pvt-filter-from-table-list" })
    ]);
  }
  updateUIFilterFromTable() {
    var o, a;
    const t = this.fromTableContainer, i = t == null ? void 0 : t.querySelector(".pvt-filter-from-table-list");
    if (!t || !i) return;
    const n = this.uiManager.graph.queryEngine, s = [
      {
        noun: "node",
        count: Cr((o = n.getFilters()[Nt]) == null ? void 0 : o.value),
        clear: () => n.removeFilter(Nt)
      },
      {
        noun: "relation",
        count: Cr((a = n.getEdgeFilters()[Nt]) == null ? void 0 : a.value),
        clear: () => n.removeEdgeFilter(Nt)
      }
    ].filter((l) => l.count > 0);
    t.classList.toggle("hidden", s.length === 0), i.innerHTML = "";
    for (const l of s) {
      const h = X({
        variant: "secondary",
        text: "Clear",
        size: "sm",
        svgIcon: Wt,
        title: `Stop hiding the ${l.noun}s the table's column filters leave out`,
        onClick: l.clear
      });
      i.appendChild(w("div", { class: "pvt-filter-from-table-row" }, [
        w(
          "span",
          { class: "pvt-filter-from-table-count" },
          [`${l.count} ${l.noun}${l.count > 1 ? "s" : ""} hidden`]
        ),
        h
      ]));
    }
  }
  /** The declared edge facets — the graph's relation layers. */
  get edgeFacets() {
    return this.filterOptions.edgeFacets ?? [];
  }
  /**
   * A layer facet is the multiselect kind (the default): a set of relation kinds,
   * each on or off, toggled live. Every other type is a batch control and goes in
   * the attribute form with the node facets.
   */
  isLayerFacet(t) {
    return (t.type ?? "multiselect") === "multiselect";
  }
  /**
   * The Relationships section: one live toggle per relation kind. Clicking applies
   * at once, like the canvas legend — a layer behind an apply button reads wrong when
   * the legend right beside it toggles instantly.
   */
  buildLayerSection() {
    this.layerRows.clear();
    const t = this.edgeFacets.filter((o) => this.isLayerFacet(o)).map((o, a) => ({ facet: o, order: o.order ?? a })).sort((o, a) => o.order - a.order);
    if (t.length === 0) return;
    const i = [];
    for (const { facet: o } of t) {
      const a = this.uiManager.graph.queryEngine.getEdgeFacetValues(o.key);
      if (a.length === 0) continue;
      if (t.length > 1) {
        const h = o.label ?? ct.niceLabelFromKey(o.key);
        i.push(w("span", { class: "pvt-edge-layer-group" }, [h]));
      }
      const l = w("div", { class: "pvt-edge-layer-list" });
      for (const h of a)
        l.appendChild(this.buildLayerRow(o, h));
      i.push(l);
    }
    if (i.length === 0) return;
    const n = X({
      variant: "secondary",
      text: "Show all",
      size: "xs",
      svgIcon: Wt,
      title: "Show every relationship layer",
      onClick: () => {
        for (const { facet: o } of t)
          this.uiManager.graph.queryEngine.removeEdgeFilter(o.key);
      }
    }), s = w("div", { class: "pvt-filter-section pvt-edge-layers" }, [
      w("div", { class: "pvt-filter-section-head" }, [
        w("span", { class: "pvt-filter-section-label" }, ["Relationships"]),
        n
      ]),
      ...i
    ]);
    return this.syncLayerRows(), s;
  }
  buildLayerRow(t, i) {
    const { value: n, count: s, sample: o } = i, a = Array.isArray(t.options) ? t.options.find((h) => h.value === n) : void 0, l = w("button", {
      type: "button",
      class: "pvt-edge-layer",
      "data-key": t.key,
      "data-value": n
    }, [
      Ju(this.uiManager.graph, o),
      // A value is data, so it is shown as it is unless the facet named it.
      w("span", { class: "pvt-edge-layer-label" }, [(a == null ? void 0 : a.label) ?? n]),
      w("span", { class: "pvt-edge-layer-count" }, [String(s)])
    ]);
    return l.addEventListener("click", () => this.toggleLayer(t, n)), this.layerRows.set(`${t.key}|${n}`, l), l;
  }
  /**
   * Flip one layer. The filter value is the list of kinds that stay on, so an empty
   * list means every layer of that facet is off and no filter at all means all on.
   */
  toggleLayer(t, i) {
    var l;
    const n = this.uiManager.graph.queryEngine, s = n.getEdgeFacetValues(t.key).map((h) => h.value), o = (l = n.getEdgeFilters()[t.key]) == null ? void 0 : l.value, a = new Set(Array.isArray(o) ? o.map(String) : s);
    a.has(i) ? a.delete(i) : a.add(i), this.applyingLayers = !0;
    try {
      s.every((h) => a.has(h)) ? n.removeEdgeFilter(t.key) : n.setEdgeFilter(t.key, {
        value: s.filter((h) => a.has(h)),
        matchMode: t.matchMode ?? "exact"
      });
    } finally {
      this.applyingLayers = !1;
    }
    this.syncLayerRows();
  }
  /** Relight the toggle rows from the live filters, so the panel follows the legend. */
  syncLayerRows() {
    var i;
    if (this.applyingLayers || this.layerRows.size === 0) return;
    const t = this.uiManager.graph.queryEngine.getEdgeFilters();
    for (const [n, s] of this.layerRows) {
      const o = n.lastIndexOf("|"), a = n.slice(0, o), l = n.slice(o + 1), h = (i = t[a]) == null ? void 0 : i.value, d = h === void 0 || (Array.isArray(h) ? h.map(String).includes(l) : String(h) === l);
      s.setAttribute("aria-pressed", String(d)), s.classList.toggle("pvt-edge-layer-hidden", !d), s.setAttribute("title", d ? `Hide ${l}` : `Show ${l}`);
    }
  }
  // Reflect the active filters (e.g. set via queryEngine.setFilter from code) back into the
  // form controls; without this the panel only updates on dataBatchChanged and stays empty.
  syncFormFromActiveFilters(t) {
    if (!this.filteringForm || this.applyingForm) return;
    const i = {};
    for (const [n, s] of Object.entries(t))
      n === "manuallyHidden" || s === void 0 || (i[n] = s.value);
    ct.setValues(this.filteringForm, i);
  }
  updateUIFilterButtonContent(t) {
    var a, l;
    const i = (a = this.uiManager.mainHeader) == null ? void 0 : a.filterButton, n = i == null ? void 0 : i.querySelector(".action-text");
    if (!n) return;
    n.innerHTML = "";
    let s = Object.keys(t).length;
    const o = (l = t.manuallyHidden) == null ? void 0 : l.value;
    if (Array.isArray(o) && o.length == 0 && s--, i == null || i.classList.toggle("pvt-filter-on", s > 0), s > 0) {
      const h = this.uiManager.graph.queryEngine.getHiddenNodeCount(), d = w("span", { class: "pvt-filter-status" }, [
        w("span", { class: "pvt-filter-count" }, [`${s}`]),
        w("span", { class: "pvt-filter-word" }, [s > 1 ? "active filters" : "active filter"])
      ]), u = this.uiManager.graph.queryEngine.getHiddenEdgeCount(), p = u === 0 ? h > 0 ? `${h} hidden` : void 0 : [
        h > 0 ? `${h} ${h > 1 ? "nodes" : "node"}` : void 0,
        `${u} ${u > 1 ? "edges" : "edge"}`
      ].filter((g) => g !== void 0).join(", ") + " hidden";
      p !== void 0 && d.appendChild(w("span", { class: "pvt-filter-hidden" }, [p])), n.appendChild(d);
    } else
      n.textContent = np;
  }
  updateUIFilterHiddenNodes() {
    if (!this.manuallyFilteredContainer) return;
    const t = this.manuallyFilteredContainer.querySelector(".pvt-hidden-nodes-container-list");
    t && (this.uiManager.graph.queryEngine.getExcludedNodeCount() > 0 ? (this.manuallyFilteredContainer.classList.remove("hidden"), t.innerHTML = "", this.uiManager.graph.queryEngine.getExcludedNodes().forEach((i) => {
      const n = Object.keys(i.getData()).length, s = i.getEdgesIn().length + i.getEdgesOut().length, o = X({
        variant: "secondary",
        text: "Show node",
        size: "sm",
        title: "Restore manually hidden node",
        svgIcon: Wt,
        onClick: () => {
          this.uiManager.graph.queryEngine.includeNode(i);
        }
      }), a = w(
        "span",
        {
          class: "subtext"
        },
        [
          w("span", { class: "nodeinfo" }, [n.toString(), Z({ svgIcon: mc })]),
          "·",
          w("span", { class: "nodeinfo" }, [s.toString(), Z({ svgIcon: te(24) })])
        ]
      ), l = ot(i, this.uiManager.getOptions().mainHeader), h = w(
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
      h.addEventListener("mouseenter", (u) => {
        var p;
        (p = this.uiManager.tooltip) == null || p.openForNodeOnElement(u, i);
      }), h.addEventListener("mouseleave", () => {
        var u;
        (u = this.uiManager.tooltip) == null || u.hide();
      });
      const d = () => {
        var u;
        (u = this.uiManager.tooltip) == null || u.hide(), is(i, this.uiManager);
      };
      h.addEventListener("click", (u) => {
        u.target.closest("button") || d();
      }), h.addEventListener("keydown", (u) => {
        (u.key === "Enter" || u.key === " ") && (u.preventDefault(), d());
      }), t == null || t.appendChild(h);
    })) : this.manuallyFilteredContainer.classList.add("hidden"));
  }
  get filterOptions() {
    return this.uiManager.getOptions().filter ?? {};
  }
  /**
   * The panel's form fields: generated from `UI.filter.facets` when the consumer
   * declared them, otherwise derived by scanning node data (the default).
   */
  buildFormFields() {
    const t = this.filterOptions.facets;
    return [...t != null && t.length ? this.declaredFields(t) : this.derivedFields(), ...this.batchedEdgeFields()];
  }
  /**
   * Edge facets that aren't layers — a `numberRange` on a weight, a `regex` on a
   * label. They apply with the button like every other batch control, so they sit in
   * this form; only the on/off layers get the live Relationships section.
   */
  batchedEdgeFields() {
    return this.edgeFacets.filter((t) => !this.isLayerFacet(t)).map((t, i) => ({ facet: t, order: t.order ?? i })).sort((t, i) => t.order - i.order).map(({ facet: t }) => this.edgeFacetToField(t));
  }
  /** An edge facet's form field. Its key carries the namespace the engine matches on. */
  edgeFacetToField(t) {
    const i = this.facetToField({
      ...t,
      key: At + t.key,
      label: t.label ?? ct.niceLabelFromKey(t.key),
      type: t.type ?? "multiselect"
    });
    return (i.type === "select" || i.type === "multiselect") && (i.options = this.uiManager.graph.queryEngine.getEdgeFacetValues(t.key).map(({ value: n }) => ({ label: n, value: n })), i.allowEmpty = !0), i;
  }
  declaredFields(t) {
    return t.map((i, n) => ({ facet: i, order: i.order ?? n })).sort((i, n) => i.order - n.order).map(({ facet: i }) => this.facetToField(i));
  }
  facetToField(t) {
    const i = t.label ?? ct.niceLabelFromKey(t.key), n = t.matchMode ?? "exact";
    if (t.type === "boolean")
      return {
        key: t.key,
        label: i,
        type: "select",
        matchMode: n,
        valuesAreBoolean: !0,
        allowEmpty: !0,
        options: [{ label: "true", value: "true" }, { label: "false", value: "false" }]
      };
    const s = { key: t.key, label: i, type: t.type, matchMode: n };
    return (t.type === "select" || t.type === "multiselect") && (s.options = this.resolveFacetOptions(t), s.allowEmpty = !0), s;
  }
  /** Resolve a facet's option list, calling the consumer's function against the live graph. */
  resolveFacetOptions(t) {
    let i = t.options ?? [];
    if (typeof i == "function")
      try {
        i = i(this.uiManager.graph);
      } catch (n) {
        console.warn(`Pivotick: options() for filter facet '${t.key}' threw; the field will be empty.`, n), i = [];
      }
    return i.map(({ label: n, value: s }) => ({ label: n, value: s }));
  }
  /**
   * Zero-config fallback: one field per node-data key, widget inferred from its values.
   *
   * The scan and the inference live in `utils/DataAttributes` because the data dock
   * derives its columns from exactly the same reading — sharing them is what keeps the
   * filter panel's controls and the dock's column types from ever disagreeing.
   */
  derivedFields() {
    return ia(
      this.uiManager.graph.getMutableNodes(),
      this.filterOptions.excludeKeys
    ).map((i) => {
      const n = na(i), s = {
        key: i.key,
        label: ct.niceLabelFromKey(i.key),
        type: n.type,
        matchMode: n.matchMode,
        valuesAreBoolean: n.valuesAreBoolean
      };
      return (s.type === "select" || s.type === "multiselect") && n.options && (s.options = n.options.map((o) => ({ label: String(o), value: String(o) })), s.allowEmpty = !0), s;
    });
  }
  filterGraph(t) {
    var o;
    if (this.filteringForm && ct.clearFieldErrors(this.filteringForm), !this.validatePatternFields(t)) return;
    const i = this.getActiveFilters(t), n = {}, s = Object.fromEntries(this.formOptions.map((a) => [a.key, a]));
    for (const [a, l] of Object.entries(i)) {
      const h = {
        value: l,
        matchMode: (o = s[a]) == null ? void 0 : o.matchMode
      };
      l !== void 0 && (n[a] = h);
    }
    this.uiManager.graph.queryEngine.replaceFilters(
      this.formOptions.map((a) => a.key),
      n
    );
  }
  /** Every `regex` field must hold a compilable pattern; marks the ones that don't. */
  validatePatternFields(t) {
    let i = !0;
    for (const n of this.formOptions) {
      if (n.type !== "regex") continue;
      const s = t[n.key];
      if (!(typeof s != "string" || s.trim() === ""))
        try {
          new RegExp(s);
        } catch {
          i = !1, this.filteringForm && ct.setFieldError(this.filteringForm, n.key, "Invalid pattern");
        }
    }
    return i;
  }
  getActiveFilters(t) {
    const i = {};
    for (const [n, s] of Object.entries(t))
      this.isFilterActive(s) ? i[n] = s : i[n] = void 0;
    return i;
  }
  isFilterActive(t) {
    return t === void 0 ? !1 : typeof t == "string" ? t.trim() !== "" : typeof t == "number" || typeof t == "boolean" ? !0 : Array.isArray(t) ? t.length > 0 : typeof t == "object" ? t.min !== void 0 || t.max !== void 0 : !1;
  }
}
function kr(r) {
  var e;
  if (r instanceof Element)
    return ((e = r.closest("[data-field-type]")) == null ? void 0 : e.getAttribute("data-field-type")) ?? void 0;
}
function Cr(r) {
  return r == null ? 0 : Array.isArray(r) ? r.length : 1;
}
class ap extends it {
  constructor(t) {
    super(t);
    c(this, "graph");
    c(this, "noteManager");
    c(this, "rootElement", null);
    c(this, "listElement", null);
    c(this, "hiddenContainer", null);
    c(this, "refreshCb", () => {
      this.refresh();
    });
    this.graph = this.uiManager.graph, this.noteManager = this.graph.noteManager;
  }
  onMount(t) {
    t && (this.build(), this.rootElement && t.appendChild(this.rootElement));
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
  renderNotes(t, i) {
    if (i.length === 0) {
      const n = document.createElement("div");
      n.classList.add("pvt-note-sidebar-empty"), n.textContent = "No notes yet", t.appendChild(n);
      return;
    }
    i.forEach((n) => {
      const s = this.renderNote(n);
      t == null || t.appendChild(s);
    });
  }
  renderNote(t) {
    var p;
    const i = document.createElement("div");
    i.classList.add("pvt-note-sidebar-item");
    const n = document.createElement("div");
    n.classList.add("pvt-note-sidebar-content");
    const s = document.createElement("span");
    s.classList.add("pvt-note-color-pill"), s.style.backgroundColor = t.color;
    const o = document.createElement("span");
    o.classList.add("pvt-note-sidebar-text"), o.classList.add("pvt-markdown");
    const a = ((p = t.content) == null ? void 0 : p.split(`
`).find((g) => g.trim().length > 0)) ?? "Untitled note", l = zh(a);
    o.innerHTML = l, Bo(o, this.graph);
    const h = document.createElement("div");
    h.classList.add("pvt-note-sidebar-button-wrapper"), n.appendChild(s), n.appendChild(o);
    let d;
    this.noteManager.isVisible(t) ? d = X({
      variant: "outline-secondary",
      size: "sm",
      title: "Hide note",
      svgIcon: ee,
      onClick: () => {
        this.noteManager.hideNote(t);
      }
    }) : d = X({
      variant: "outline-secondary",
      size: "sm",
      title: "Restore hidden note",
      svgIcon: Wt,
      onClick: () => {
        this.noteManager.showNote(t);
      }
    });
    const u = X({
      variant: "outline-danger",
      size: "sm",
      title: "Remove note",
      svgIcon: Ee,
      onClick: () => {
        this.noteManager.removeNote(t);
      }
    });
    return h.appendChild(d), h.appendChild(u), i.appendChild(n), i.appendChild(h), i;
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
    const t = document.createElement("div");
    return t.classList.add("pvt-note-sidebar"), t;
  }
  createHeader() {
    const t = document.createElement("div");
    return t.classList.add("pvt-note-sidebar-header"), t.appendChild(X({
      variant: "secondary",
      text: "Add Note",
      size: "sm",
      svgIcon: _i,
      onClick: () => {
        const i = this.uiManager.graph.renderer, n = this.uiManager.layout.canvas.getBoundingClientRect(), { x: s, y: o } = i.screenToGraphCoordinates(
          n.x + n.width / 2 - 200,
          n.y + n.height / 2 - 170
        ), a = new It({
          content: "This is not a note.",
          x: s,
          y: o
        });
        this.uiManager.graph.noteManager.addNote(a);
      }
    })), t.appendChild(X({
      variant: "secondary",
      text: "Hide all",
      size: "sm",
      title: "Hide all notes",
      svgIcon: ee,
      onClick: () => {
        this.noteManager.hideAll();
      }
    })), t;
  }
  createList() {
    const t = document.createElement("div");
    t.classList.add("pvt-note-sidebar-list");
    const i = this.noteManager.getVisibleNotes();
    return this.renderNotes(t, i), t;
  }
  createHiddenContainer() {
    var o;
    const t = dt(`<div class="pvt-hidden-nodes-container">
                <h4>Hidden notes</h4>
                <div class="pvt-hidden-nodes-container-list"></div>
            </div>`), i = X({
      variant: "secondary",
      text: "Show all notes",
      size: "sm",
      style: "align-self: end;",
      svgIcon: Wt,
      onClick: () => {
        this.noteManager.showAll();
      },
      title: "Restore hidden notes"
    });
    (o = t.querySelector("h4")) == null || o.appendChild(i), this.noteManager.getHiddenNotes().length == 0 && t.classList.add("hidden");
    const n = this.noteManager.getHiddenNotes(), s = t.querySelector(".pvt-hidden-nodes-container-list");
    return this.renderNotes(s, n), t;
  }
}
class lp extends it {
  constructor(t) {
    super(t);
    c(this, "mainheader");
    c(this, "searchBoxButton");
    c(this, "filterButton");
    c(this, "noteButton");
    c(this, "undoButton");
    c(this, "redoButton");
    c(this, "filteringSlidepanel");
    c(this, "noteSlidepanel");
    c(this, "searchModal");
    c(this, "noteSidebar");
  }
  onMount(t) {
    if (!t) return;
    this.mainheader = document.createElement("div"), this.mainheader.className = "pvt-mainheader-elements";
    const i = document.createElement("template");
    i.innerHTML = `
  <div id="pvt-searchbox-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Search for a node">
    <div class="action-container">
        <span class="icon-container">${Pn}</span>
        <span class="action-text">Search</span>
        ${vi("Shift+J").outerHTML}
    </div>
  </div>`, this.searchBoxButton = i.content.firstElementChild, this.mainheader.appendChild(this.searchBoxButton);
    const n = document.createElement("template");
    n.innerHTML = `
  <div id="pvt-filter-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Filter the graph">
    <div class="action-container">
        <span class="icon-container">${mo}</span>
        <span class="action-text">Filter Graph</span>
        ${vi("Shift+K").outerHTML}
    </div>
  </div>`, this.filterButton = n.content.firstElementChild, this.mainheader.appendChild(this.filterButton);
    const s = document.createElement("template");
    s.innerHTML = `
  <div id="pvt-notes-button" class="pvt-action-button" role="button" tabindex="0" aria-label="Notes">
    <div class="action-container">
        <span class="icon-container">${_i}</span>
        <span class="action-text">Notes</span>
        ${vi("Shift+N").outerHTML}
    </div>
  </div>`, this.noteButton = s.content.firstElementChild, this.mainheader.appendChild(this.noteButton);
    const o = document.createElement("template");
    o.innerHTML = `
  <div class="pvt-right">
    <div class="pvt-undoredo-group">
        <button id="pvt-undo-button" class="pvt-button-undo" disabled>
            ${oc}
        </button>
        <button id="pvt-redo-button" class="pvt-button-redo" disabled>
            ${ac}
        </button>
    </div>
  </div>`;
    const a = o.content.firstElementChild;
    this.undoButton = a.querySelector("#pvt-undo-button") ?? void 0, this.redoButton = a.querySelector("#pvt-redo-button") ?? void 0, this.mainheader.appendChild(a), t.appendChild(this.mainheader);
  }
  onDestroy() {
    var t;
    (t = this.mainheader) == null || t.remove(), this.mainheader = void 0;
  }
  onAfterMount() {
    const { filterButton: t, noteButton: i, searchBoxButton: n } = this;
    if (!t || !i) return;
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
    const s = new op(this.uiManager);
    this.filteringSlidepanel = this.uiManager.createSlidepanel({
      header: "Graph Filters",
      body: s.build()
    }), this.listen(t, "click", () => {
      var o;
      (o = this.noteSlidepanel) == null || o.close(), this.filteringSlidepanel.toggle();
    }), this.noteSidebar = new ap(this.uiManager), this.noteSlidepanel = this.uiManager.createSlidepanel({
      header: "Notes",
      body: this.noteSidebar.build()
    }), this.listen(i, "click", () => {
      var o;
      (o = this.filteringSlidepanel) == null || o.close(), this.noteSlidepanel.toggle();
    }), this.addChild(this.noteSidebar), n && this.listen(n, "click", async () => {
      const o = await ts(this.uiManager);
      o && this.uiManager.graph.selectElement(o);
    });
    for (const o of [n, t, i])
      o && this.listen(o, "keydown", (a) => {
        const l = a;
        (l.key === "Enter" || l.key === " ") && (l.preventDefault(), o.click());
      });
  }
}
class cp extends it {
  constructor(t, i) {
    super(t);
    c(this, "options");
    c(this, "overlay");
    c(this, "modal");
    c(this, "header");
    c(this, "body");
    c(this, "footer");
    c(this, "DEFAULT_HEADER", null);
    c(this, "DEFAULT_BODY", "");
    c(this, "DEFAULT_BUTTON_CONFIG", {
      text: "Ok",
      variant: "primary",
      onClick: (t, i) => {
        i();
      }
    });
    this.options = i, this.options.header || (this.options.header = this.DEFAULT_HEADER), this.options.body || (this.options.body = this.DEFAULT_BODY), !this.options.buttons && this.options.buttons !== null && (this.options.buttons = [this.DEFAULT_BUTTON_CONFIG]), this.options.position = i.position ?? "center";
  }
  onMount(t) {
    if (!t) return;
    this.overlay = document.createElement("div"), this.overlay.className = "pvt-modal-overlay", this.overlay.classList.add(
      this.options.position === "center" ? "pvt-modal-overlay-center" : "pvt-modal-overlay-top"
    ), this.overlay.addEventListener("click", (n) => {
      n.target === this.overlay && this.destroy();
    }), this.modal = document.createElement("div"), this.modal.className = "pvt-modal", this.modal.__modalInstance = this, this.options.id && (this.modal.id = this.options.id);
    const i = this.options.size ?? "md";
    if (this.modal.classList.add(`pvt-modal-${i}`), this.options.header != null) {
      this.header = document.createElement("div"), this.header.className = "pvt-modal__header", this.setHeader(this.options.header), this.modal.appendChild(this.header);
      const n = X({
        text: "×",
        variant: "outline-primary",
        size: "sm",
        onClick: () => {
          this.hide();
        },
        style: "margin-left: auto;"
      });
      this.header.appendChild(n);
    }
    this.body = document.createElement("div"), this.body.className = "pvt-modal__body", this.setBody(this.options.body), this.options.noBodyPadding ? this.body.style.padding = "0" : this.body.style.padding = "", this.modal.appendChild(this.body), this.options.buttons != null && (this.footer = document.createElement("div"), this.footer.className = "pvt-modal__footer", this.setButtons(this.options.buttons), this.modal.appendChild(this.footer)), this.overlay.appendChild(this.modal), t.appendChild(this.overlay);
  }
  onDestroy() {
    this.hide();
  }
  onAfterMount() {
  }
  onGraphReady() {
  }
  setButtons(t) {
    !this.modal || !this.footer || (this.footer.innerHTML = "", t.forEach((i) => {
      if (typeof i.onClick == "function") {
        const s = i.onClick;
        i.onClick = (o, a) => {
          s && s(o, a);
        }, i.onClickArgs = [this.hide.bind(this)];
      }
      const n = X(i);
      this.footer.appendChild(n);
    }));
  }
  setHeader(t) {
    this.header && (this.header.innerHTML = "", t && (this.options.header instanceof HTMLElement ? this.header.appendChild(this.options.header) : this.options.rawHeader ? this.header.innerHTML = this.options.header : this.header.textContent = this.options.header));
  }
  setBody(t) {
    this.body && (this.body.innerHTML = "", t && (t instanceof HTMLElement ? this.body.appendChild(t) : this.options.rawBody ? this.body.innerHTML = t : this.body.textContent = t));
  }
  show() {
    if (!this.modal || !this.overlay) return;
    this.dispatchEvent("show"), this.modal.classList.add("pvt-modal-open");
    const t = (i) => {
      var n;
      i.target === this.modal && ((n = this.modal) == null || n.removeEventListener("animationend", t), this.dispatchEvent("shown"));
    };
    this.modal.addEventListener("animationend", t);
  }
  hide() {
    var t;
    !this.modal || !this.overlay || (this.dispatchEvent("hide"), this.modal.classList.remove("pvt-modal-open"), (t = this.overlay) == null || t.remove(), requestAnimationFrame(() => {
      this.dispatchEvent("hidden");
    }));
  }
  dispatchEvent(t) {
    if (!this.modal) return;
    const i = `pvt-modal-${t}`, n = new CustomEvent(i, { bubbles: !0, cancelable: !0 });
    this.modal.dispatchEvent(n);
    const s = `on${t.charAt(0).toUpperCase()}${t.slice(1)}`, o = this.options[s];
    typeof o == "function" && o();
  }
}
class hp {
  constructor(e) {
    c(this, "shadowlinkMap", /* @__PURE__ */ new WeakMap());
    c(this, "shadowlinkBoundingBoxesMap", /* @__PURE__ */ new WeakMap());
    c(this, "shadowLinkContainer");
    this.shadowLinkContainer = e;
  }
  setBoundingBox(e, t) {
    this.shadowlinkBoundingBoxesMap.set(e, t);
  }
  addShadowLink(e) {
    var i;
    const t = eo("path", {
      class: "pivotick-shadowlink"
    });
    this.shadowlinkMap.set(e, t), (i = this.shadowLinkContainer) == null || i.appendChild(t);
  }
  updateShadowLink(e, t, i = !0) {
    const n = this.shadowlinkBoundingBoxesMap.get(e);
    if (!n) return;
    const { width: s, height: o } = n.source, { x: a, y: l, width: h, height: d } = n.target, u = this.shadowlinkMap.get(e);
    let p, g;
    if (t ? (p = t.x, g = t.y) : (p = parseFloat(e.style.left), g = parseFloat(e.style.top)), !!u)
      if (i)
        u.setAttribute("d", `M ${p + s / 2} ${g + o / 2} L ${a + h / 2} ${l + d / 2}`);
      else {
        let f = p;
        const v = g, y = a + h / 2;
        y > p + s / 2 && (f = p + (s - (f - p))), u.setAttribute(
          "d",
          `M ${f} ${v} L ${y} ${l + d / 2}`
        );
      }
  }
  removeShadowLink(e) {
    const t = this.shadowlinkMap.get(e);
    t && t.remove();
  }
}
const Er = "pvt-image-lightbox-modal";
function sa(r, e, t) {
  var o;
  if (!e) return;
  const i = document.querySelector(`#${Er}`);
  (o = i == null ? void 0 : i.__modalInstance) == null || o.destroy();
  const n = w("img", { class: "pvt-image-lightbox__img", src: e, alt: t ?? "" });
  zo(n);
  const s = w("div", { class: "pvt-image-lightbox" }, [n]);
  r.createModal({
    id: Er,
    header: t ?? null,
    body: s,
    rawBody: !0,
    buttons: null,
    position: "center",
    noBodyPadding: !0
  });
}
const dp = {
  enabled: !0,
  allowPinning: !0
};
class up extends it {
  constructor(t) {
    super(t);
    c(this, "options");
    c(this, "shadowLinkManager", null);
    c(this, "tooltip");
    c(this, "parentContainer");
    c(this, "shadowLinkContainer");
    // True only when this instance created the shared tooltip/shadowlink singletons.
    c(this, "ownsSharedElements", !1);
    c(this, "mouseX", 0);
    c(this, "mouseY", 0);
    c(this, "x", 0);
    c(this, "y", 0);
    c(this, "triggerX", 0);
    c(this, "triggerY", 0);
    c(this, "hoveredElementID", null);
    c(this, "hoveredElement", null);
    c(this, "showDelay", 400);
    c(this, "hideDelay", 100);
    c(this, "tooltipTimeout", null);
    c(this, "hideTimeout", null);
    c(this, "tooltipDataMap", /* @__PURE__ */ new Map());
    // Auto-fits the live tooltip's title on resize; each pinned copy gets its own.
    c(this, "titleFit");
    c(this, "pinnedTitleFits", /* @__PURE__ */ new Set());
    /**
     * Placeholder / staleness for the tooltip's async content. The tooltip is a
     * single reused container, so this is the surface that most needs it: a
     * fetch started for one node must never paint into the tooltip once it is
     * describing another. Superseded on every open and on hide.
     */
    c(this, "renderScope");
    this.options = me(dp, this.uiManager.getOptions().tooltip), this.renderScope = new Se(
      "tooltip",
      () => this.uiManager.getOptions().asyncContent,
      // Content that arrives late changes the tooltip's size; keep it on screen.
      () => {
        var i;
        (i = this.tooltip) != null && i.classList.contains("shown") && this.setPosition();
      }
    ), this.track(() => this.renderScope.supersede());
  }
  // The tooltip honours its own header/property maps, falling back to the
  // sidebar's mainHeader / propertiesPanel (and then to data defaults).
  headerOptions() {
    const t = this.uiManager.getOptions().mainHeader;
    return {
      ...t,
      nodeHeaderMap: { ...t.nodeHeaderMap, ...this.options.nodeHeaderMap },
      edgeHeaderMap: { ...t.edgeHeaderMap, ...this.options.edgeHeaderMap }
    };
  }
  propertiesOptions() {
    const t = this.uiManager.getOptions().propertiesPanel;
    return {
      ...t,
      nodePropertiesMap: this.options.nodePropertiesMap ?? t.nodePropertiesMap,
      edgePropertiesMap: this.options.edgePropertiesMap ?? t.edgePropertiesMap
    };
  }
  onMount(t) {
    if (!t) return;
    this.parentContainer = document.querySelector("body");
    const i = this.parentContainer.querySelector(".pvt-tooltip"), n = this.parentContainer.querySelector(".pivotick-shadowlink-container");
    if (i && n) {
      this.tooltip = i, this.shadowLinkContainer = n;
      return;
    }
    const s = document.createElement("template");
    s.innerHTML = '<div class="pvt-tooltip"></div>', this.tooltip = s.content.firstElementChild, this.shadowLinkContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.shadowLinkContainer.setAttribute("class", "pivotick-shadowlink-container"), this.parentContainer.appendChild(this.tooltip), this.parentContainer.appendChild(this.shadowLinkContainer), this.shadowLinkManager = new hp(this.shadowLinkContainer), this.ownsSharedElements = !0;
  }
  onDestroy() {
    var t, i, n;
    (t = this.titleFit) == null || t.destroy(), this.titleFit = void 0, this.pinnedTitleFits.forEach((s) => s.destroy()), this.pinnedTitleFits.clear(), this.ownsSharedElements && ((i = this.tooltip) == null || i.remove(), (n = this.shadowLinkContainer) == null || n.remove()), this.tooltip = void 0, this.shadowLinkContainer = void 0, this.shadowLinkManager = null;
  }
  onAfterMount() {
    this.tooltip && (this.titleFit = new In(this.tooltip));
  }
  // Render an entity title into the header name slot with the sidebar's
  // auto-fit / type-aware treatment (fit runs once the slot has a width).
  renderTitle(t, i, n) {
    var s;
    (s = this.titleFit) == null || s.render(t, i, n);
  }
  onGraphReady() {
    this.tooltip && (this.trackInteraction("nodeHoverIn", this.nodeHovered.bind(this)), this.trackInteraction("nodeHoverOut", this.delayedHide.bind(this)), this.trackInteraction("canvasMousemove", this.updateMousePosition.bind(this)), this.trackInteraction("dragging", (t, i) => {
      this.hoveredElementID === i.id && this.hide(i);
    }), this.trackInteraction("canvasZoom", this.canvasZoomed.bind(this)), this.trackInteraction("simulationSlowTick", this.simulationSlowTick.bind(this)), this.tooltip.addEventListener("mouseenter", () => {
      this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null);
    }), this.tooltip.addEventListener("mouseleave", () => this.hide()), this.tooltip.addEventListener("click", (t) => this.handleLightboxClick(t)));
  }
  updateMousePosition(t) {
    this.mouseX = t.pageX, this.mouseY = t.pageY;
  }
  tooltipCanBeShown() {
    if (!this.tooltip || this.uiManager.graph.simulation.isDragging()) return !1;
    const t = this.uiManager.graph.renderer.getSelectionBox();
    return !(t !== null && t.selectionInProgress() || Math.abs(this.triggerX - this.mouseX) >= 50 || Math.abs(this.triggerY - this.mouseY) >= 50);
  }
  openForNodeOnElement(t, i) {
    this.triggerX = t.pageX, this.triggerY = t.pageY, this.mouseY = t.pageY, this.mouseX = t.pageX, this.hoveredElementID = i.id, this.hoveredElement = i, this.tooltipCanBeShown() && this.show(() => {
      this.createNodeTooltip(i);
    });
  }
  nodeHovered(t, i) {
    this.hoveredElementID !== i.id && (this.triggerX = t.pageX, this.triggerY = t.pageY, this.hoveredElementID = i.id, this.hoveredElement = i, this.tooltipCanBeShown() && this.show(() => {
      this.createNodeTooltip(i);
    }));
  }
  edgeHovered(t, i) {
    this.hoveredElementID !== i.id && (this.triggerX = t.pageX, this.triggerY = t.pageY, this.hoveredElementID = i.id, this.hoveredElement = i, this.tooltipCanBeShown() && this.show(() => {
      if (this.uiManager.graph.simulation.isDragging()) {
        this.hide();
        return;
      }
      this.createEdgeTooltip(i);
    }));
  }
  canvasZoomed() {
    this.updateShadowLinks(!0);
  }
  simulationSlowTick() {
    this.updateShadowLinks(!0);
  }
  buildNodeTooltip(t) {
    const s = dt(`
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
</div>`), o = s.querySelector(".pvt-mainheader-container"), a = s.querySelector(".pvt-mainheader-nodepreview"), l = s.querySelector(".pvt-mainheader-nodeinfo-name"), h = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), d = s.querySelector(".pvt-mainheader-topright"), u = s.querySelector(".pvt-mainheader-nodeinfo-action");
    if (a.prepend(re(t, { size: 32, removeSelectionHighlight: !0 })), this.renderTitle(l, u, ot(t, this.headerOptions())), h.textContent = Un(t, this.headerOptions()), this.options.allowPinning) {
      const y = X({
        title: "Pin Tooltip",
        variant: "outline-primary",
        size: "sm",
        class: "pin-button",
        svgIcon: we,
        onClick: () => {
          this.pinTooltip(), this.hide();
        }
      });
      d.appendChild(y);
    }
    const p = this.uiManager.getOptions().tooltip.render;
    if (p && typeof p == "function") {
      const y = this.renderScope.content(p, t);
      if (y) {
        const b = w("div", { class: "pivotick-extra-content-container" }, [
          y
        ]);
        s.appendChild(b);
      }
      return s;
    }
    const g = this.renderScope.resolve(
      (y) => qe(t, this.propertiesOptions(), y),
      (y) => w("div", { class: "pvt-properties-container" }, [
        Xe(y, t)
      ])
    );
    s.appendChild(o);
    const f = xi(t);
    f && s.appendChild(this.buildTooltipImage(f, ot(t, this.headerOptions()))), g && s.appendChild(g);
    const v = this.uiManager.getOptions().tooltip.renderNodeExtra;
    if (v && typeof v == "function") {
      const y = this.renderScope.content(v, t);
      if (y) {
        const b = w("div", { class: "pivotick-extra-content-container" }, [
          y
        ]);
        s.appendChild(b);
      }
    }
    return s;
  }
  // The large in-tooltip picture for an image node. The `data-pvt-lightbox-src` marker lets
  // the delegated click handler open the full-resolution lightbox — and survives the
  // `cloneNode` a pinned tooltip goes through (a direct listener would not).
  buildTooltipImage(t, i) {
    const n = w("img", {
      class: "pvt-tooltip-image",
      src: t,
      alt: i ?? "",
      title: "Click to view full size",
      "data-pvt-lightbox-src": t
    });
    return zo(n), w("div", { class: "pvt-tooltip-image-container" }, [n]);
  }
  // Open the lightbox when a picture carrying `data-pvt-lightbox-src` is clicked, in the live
  // tooltip or a pinned copy (both route here — the copy is wired in `pinTooltip`).
  handleLightboxClick(t) {
    var s;
    const i = (s = t.target) == null ? void 0 : s.closest("[data-pvt-lightbox-src]");
    if (!i) return;
    const n = i.getAttribute("data-pvt-lightbox-src");
    n && sa(this.uiManager, n, i.getAttribute("alt") || void 0);
  }
  createNodeTooltip(t) {
    if (!this.tooltip) return !1;
    this.renderScope.supersede(), this.tooltip.innerHTML = "";
    const i = this.buildNodeTooltip(t);
    this.tooltip.appendChild(i);
  }
  createEdgeTooltip(t) {
    if (!this.tooltip) return !1;
    this.renderScope.supersede(), this.tooltip.innerHTML = "";
    const n = `
<div class="pvt-tooltip-container">
    <div class="pvt-mainheader-container">
        <div class="pvt-mainheader-nodepreview">
            ${te(32)}
            <span class="pvt-mainheader-topright"></span>
        </div>
        <div class="pvt-mainheader-nodeinfo">
            <div class="pvt-mainheader-nodeinfo-name"></div>
            <div class="pvt-mainheader-nodeinfo-subtitle"></div>
        </div>
        <div class="pvt-mainheader-nodeinfo-action">
        </div>
    </div>
</div>`, s = dt(n), o = s.querySelector(".pvt-mainheader-container"), a = s.querySelector(".pvt-mainheader-nodeinfo-name"), l = s.querySelector(".pvt-mainheader-nodeinfo-subtitle"), h = s.querySelector(".pvt-mainheader-topright"), d = s.querySelector(".pvt-mainheader-nodeinfo-action"), u = X({
      title: "Pin Tooltip",
      variant: "outline-primary",
      size: "sm",
      class: "pin-button",
      svgIcon: we,
      onClick: () => {
        this.pinTooltip();
      }
    });
    h.appendChild(u);
    const p = this.uiManager.getOptions().tooltip.render;
    if (p && typeof p == "function") {
      const v = this.renderScope.content(p, t);
      if (v) {
        const y = w("div", { class: "pivotick-extra-content-container" }, [
          v
        ]);
        s.appendChild(y);
      }
      this.tooltip.appendChild(s);
      return;
    }
    this.renderTitle(a, d, be(t, this.headerOptions())), l.textContent = So(t, this.headerOptions());
    const g = this.renderScope.resolve(
      (v) => Sn(t, this.propertiesOptions(), v),
      (v) => w("div", { class: "pvt-properties-container" }, [
        Xe(v, t)
      ])
    );
    s.appendChild(o), g && s.appendChild(g);
    const f = this.uiManager.getOptions().tooltip.renderEdgeExtra;
    if (f && typeof f == "function") {
      const v = this.renderScope.content(f, t);
      if (v) {
        const y = w("div", { class: "pivotick-extra-content-container" }, [
          v
        ]);
        s.appendChild(y);
      }
    }
    this.tooltip.appendChild(s);
  }
  setPosition() {
    var g, f, v, y;
    if (!this.tooltip) return;
    const t = (f = (g = this.hoveredElement) == null ? void 0 : g.getGraphElement()) == null ? void 0 : f.getBoundingClientRect();
    if (!t) return;
    const i = (y = (v = this.uiManager.layout) == null ? void 0 : v.canvas) == null ? void 0 : y.getBoundingClientRect();
    if (!i) return;
    const n = this.uiManager.getOptions().tooltip.setPosition;
    if (n && typeof n == "function") {
      n(this.tooltip, t, i);
      return;
    }
    const s = 20, o = 15, a = i.left + window.scrollX, l = i.top + window.scrollY, h = i.width, d = i.height, u = this.tooltip.offsetWidth, p = this.tooltip.offsetHeight;
    this.x = t.x + t.width + o, this.y = t.y, this.x + u + s > a + h && (this.x = t.x - u - o), this.x < a + o && (this.x = a + o), this.y + p + s > l + d && (this.y -= p), this.y < l + s && (this.y = l + s), this.tooltip.style.left = `${this.x}px`, this.tooltip.style.top = `${this.y}px`;
  }
  delayedHide(t, i) {
    this.hideTimeout && clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => this.hide(i), this.hideDelay);
  }
  hide(t) {
    var i;
    this.tooltip && (this.hideTimeout && clearTimeout(this.hideTimeout), (this.hoveredElement === t || t === void 0) && (this.tooltipTimeout && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = null), this.renderScope.supersede(), this.hoveredElementID = null, this.hoveredElement = null, this.triggerX = -2e3, this.triggerY = -2e3, this.tooltip.classList.remove("shown"), this.tooltip.style.left = "-10000px", (i = this.titleFit) == null || i.clear()));
  }
  show(t) {
    var i;
    (i = this.uiManager.contextMenu) != null && i.visible || (this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(() => {
      var n;
      t && t(), (n = this.tooltip) == null || n.classList.add("shown"), requestAnimationFrame(() => {
        this.setPosition();
      });
    }, this.showDelay));
  }
  pinTooltip() {
    var p, g;
    if (!this.tooltip || !this.parentContainer || !this.hoveredElement) return;
    const t = this.tooltip.cloneNode(!0);
    this.tooltipDataMap.set(t, this.hoveredElement);
    let i;
    t.classList.add("pvt-tooltip-floating"), t.addEventListener("click", (f) => this.handleLightboxClick(f)), t.querySelectorAll(".pvt-prop-copy").forEach((f) => {
      const v = es(f.dataset.copyText ?? "");
      v.className = f.className, f.replaceWith(v);
    }), (p = t.querySelector(".pin-button")) == null || p.remove();
    const n = X({
      title: "Close Tooltip",
      variant: "outline-danger",
      size: "sm",
      class: ["close-button"],
      svgIcon: Hn,
      onClick: () => {
        var f;
        this.tooltipDataMap.delete(t), (f = this.shadowLinkManager) == null || f.removeShadowLink(t), i && (i.destroy(), this.pinnedTitleFits.delete(i)), t.remove();
      }
    }), s = X({
      title: "Focus Element in Graph",
      variant: "outline-primary",
      size: "sm",
      class: ["focus-element"],
      svgIcon: Ii,
      onClick: () => {
        const f = this.tooltipDataMap.get(t);
        f && this.uiManager.graph.focusElement(f);
      }
    }), o = X({
      title: "Select Element in Graph",
      variant: "outline-primary",
      size: "sm",
      class: ["select-element"],
      svgIcon: bo,
      onClick: () => {
        const f = this.tooltipDataMap.get(t);
        f && this.uiManager.graph.selectElement(f);
      }
    }), a = w("div", {
      class: "pvt-tooltip-topbar"
    }, [
      s,
      o,
      n
    ]);
    t.prepend(a);
    const l = this.uiManager.getAppContainer();
    yl(t, a, l, {
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
    }), this.parentContainer.appendChild(t), (g = this.shadowLinkManager) == null || g.addShadowLink(t);
    const h = t.querySelector(".pvt-mainheader-nodeinfo-name"), d = t.querySelector(".pvt-mainheader-nodeinfo-action"), u = h == null ? void 0 : h.dataset.titleText;
    h && u !== void 0 && (i = new In(t), this.pinnedTitleFits.add(i), i.render(h, d, u));
  }
  updateShadowLinks(t = !1) {
    var i, n;
    for (const [s, o] of this.tooltipDataMap.entries())
      t && ((i = this.shadowLinkManager) == null || i.setBoundingBox(s, {
        source: s.getBoundingClientRect(),
        target: o.getGraphElement().getBoundingClientRect()
      })), (n = this.shadowLinkManager) == null || n.updateShadowLink(s);
  }
}
const pp = {
  topbar: [
    {
      title: "Pin Node",
      svgIcon: we,
      variant: "outline-primary",
      visible: (r) => !r.frozen,
      onclick(r, e) {
        e.freeze();
      }
    },
    {
      title: "Unpin Node",
      svgIcon: Bn,
      variant: "outline-primary",
      visible: (r) => r.frozen,
      onclick(r, e) {
        e.unfreeze();
      }
    },
    {
      title: "Focus Node",
      svgIcon: Ii,
      variant: "outline-primary",
      onclick(r, e) {
        this.uiManager.graph.focusElement(e);
      }
    },
    {
      title: "Hide Node",
      svgIcon: ee,
      variant: "outline-danger",
      flushRight: !0,
      visible: (r) => r.visible,
      onclick(r, e) {
        this.uiManager.graph.queryEngine.excludeNode(e);
      }
    }
  ],
  menu: [
    {
      text: "View Image",
      title: "View Image",
      svgIcon: co,
      variant: "outline-primary",
      // Only for picture nodes: read the resolved src straight off the rendered node.
      visible: (r) => !!xi(r),
      onclick(r, e) {
        const t = xi(e);
        t && sa(this.uiManager, t, ot(e, this.uiManager.getOptions().mainHeader));
      }
    },
    {
      text: "Select Neighbors",
      title: "Select Neighbors",
      svgIcon: rc,
      variant: "outline-primary",
      onclick(r, e) {
        const t = [
          ...e.getConnectedNodes(),
          ...e.getConnectingNodes()
        ].map((i) => ({
          node: i,
          element: i.getGraphElement()
        }));
        this.uiManager.graph.renderer.getGraphInteraction().selectNodes(t);
      }
    },
    {
      text: "Hide Children",
      title: "Hide Children",
      svgIcon: ee,
      variant: "outline-primary",
      visible: (r) => r.visible,
      onclick(r, e) {
        e.hide();
      }
    },
    {
      text: "Connect to...",
      title: "Connect to...",
      svgIcon: te(24),
      variant: "outline-primary",
      visible: (r) => r.visible,
      async onclick(r, e) {
        const t = ot(e, this.uiManager.graph.UIManager.getOptions().mainHeader).trim(), i = document.createElement("div");
        i.textContent = "Select the target node to link with";
        const n = document.createElement("b");
        n.textContent = `"${t}"`, n.classList.add("pvt-ms-1"), i.appendChild(n);
        const s = await ts(this.uiManager.graph.UIManager, i);
        if (!s) return;
        const o = ne(8, "edge-"), a = new Ct(o, e, s, {});
        this.uiManager.graph.addEdge(a);
      }
    },
    {
      text: "Expand Node",
      title: "Expand Node",
      svgIcon: uc,
      variant: "outline-primary",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      visible: (r) => !1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r, e) {
      }
    },
    {
      text: "Inspect Properties",
      title: "Inspect Properties",
      svgIcon: fc,
      variant: "outline-primary",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      visible: (r) => !0,
      onclick(r, e) {
        is(e, this.uiManager);
      },
      shortcut: "I"
    },
    {
      text: "Delete Node",
      title: "Delete Node",
      requires: "deletion",
      svgIcon: Ee,
      variant: "outline-danger",
      onclick(r, e) {
        this.uiManager.graph.editing.requestDelete({ nodes: [e], origin: "context-menu" });
      }
    }
  ]
}, gp = {
  topbar: [],
  menu: [
    {
      text: "Edit Edge",
      title: "Edit Edge",
      requires: "edgeEditor",
      svgIcon: ke,
      variant: "outline-primary",
      onclick(r, e) {
        this.uiManager.graph.editing.openEdgeSession(e);
      }
    },
    {
      text: "Delete Edge",
      title: "Delete Edge",
      requires: "deletion",
      svgIcon: Ee,
      variant: "outline-danger",
      onclick(r, e) {
        this.uiManager.graph.editing.requestDelete({ edges: [e], origin: "context-menu" });
      }
    }
  ]
}, fp = {
  topbar: [
    {
      title: "Pin All",
      svgIcon: we,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        (this.uiManager.graph.getMutableNodes() ?? []).forEach((t) => {
          t.freeze();
        });
      }
    },
    {
      title: "Unpin All",
      svgIcon: Bn,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        var t;
        (this.uiManager.graph.getMutableNodes() ?? []).forEach((i) => {
          i.unfreeze();
        }), (t = this.uiManager.graph.simulation) == null || t.reheat();
      }
    }
  ],
  menu: [
    {
      title: "Add Node Here",
      text: "Add Node Here",
      requires: "nodeCreator",
      svgIcon: Ke,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        this.uiManager.graph.editing.requestNodeCreate({
          position: this.openPoint(),
          origin: "context-menu"
        });
      }
    },
    {
      title: "Add Note",
      text: "Add Note",
      svgIcon: _i,
      variant: "outline-primary",
      visible: !0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onclick(r) {
        const { x: e, y: t } = this.openPoint(), i = new It({
          content: "This is not a note.",
          x: e,
          y: t
        });
        this.uiManager.graph.noteManager.addNote(i);
      },
      shortcut: "n"
    }
  ]
}, mp = {
  topbar: [
    {
      title: "Hide Note",
      svgIcon: ee,
      variant: "outline-danger",
      flushRight: !0,
      visible: (r) => r.visible,
      onclick(r, e) {
        this.uiManager.graph.noteManager.hideNote(e);
      }
    }
  ],
  menu: [
    {
      title: "Remove Note",
      text: "Remove Note",
      requires: "deletion",
      svgIcon: Ee,
      variant: "outline-danger",
      visible: !0,
      onclick(r, e) {
        this.uiManager.graph.editing.requestDelete({ notes: [e], origin: "context-menu" });
      },
      shortcut: "n"
    }
  ]
};
class vp extends it {
  constructor(t) {
    super(t);
    c(this, "menu");
    c(this, "visible");
    c(this, "parentContainer");
    c(this, "element", null);
    /** Page coords the menu was last opened at (see {@link openPoint}). */
    c(this, "openedAt", null);
    c(this, "menuNode");
    c(this, "menuEdge");
    c(this, "menuNote");
    c(this, "menuCanvas");
    this.visible = !1, this.menuNode = me(this.gate(pp), this.uiManager.getOptions().contextMenu.menuNode ?? {}), this.menuEdge = me(this.gate(gp), this.uiManager.getOptions().contextMenu.menuEdge ?? {}), this.menuNote = me(this.gate(mp), this.uiManager.getOptions().contextMenu.menuNote ?? {}), this.menuCanvas = me(this.gate(fp), this.uiManager.getOptions().contextMenu.menuCanvas ?? {}), this.wrapOnclickActions();
  }
  /**
   * Drop the default entries whose editor is disabled, before the consumer's own
   * entries are merged in — those are never gated.
   */
  gate(t) {
    const i = (n) => {
      const s = n.requires;
      return !s || this.uiManager.isEditorEnabled(s);
    };
    return { topbar: t.topbar.filter(i), menu: t.menu.filter(i) };
  }
  onMount(t) {
    if (!t) return;
    this.parentContainer = document.querySelector("body");
    const i = this.parentContainer.querySelector(".pvt-contextmenu");
    if (i) {
      this.menu = i;
      return;
    }
    const n = document.createElement("template");
    n.innerHTML = `
        <div class="pvt-contextmenu">
            <div class="pvt-contextmenu-topbar"></div>
            <div class="pvt-contextmenu-mainmenu"></div>
        </div>
        `, this.menu = n.content.firstElementChild, this.parentContainer.appendChild(this.menu);
  }
  onDestroy() {
    var t;
    (t = this.menu) == null || t.remove(), this.menu = void 0;
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
  nodeClicked(t, i) {
    this.menu && (this.element = i, this.createNodeMenu(i), this.setPosition(t), this.show());
  }
  edgeClicked(t, i) {
    this.menu && (this.element = i, this.createEdgeMenu(i), this.setPosition(t), this.show());
  }
  noteClicked(t, i) {
    this.menu && (this.element = i, this.createNoteMenu(i), this.setPosition(t), this.show());
  }
  canvasClicked(t) {
    this.menu && (this.element = null, this.createCanvasMenu(), this.setPosition(t), this.show());
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
    ].forEach((t) => {
      t.forEach((i) => {
        this.wrapOnclickAction(i);
      });
    });
  }
  wrapOnclickAction(t) {
    if (t.onclick) {
      const i = t.onclick, n = this;
      t.onclick = function(s, o) {
        var a;
        i.apply(this, [s, o]), (a = n.hide) == null || a.call(n);
      };
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNodeMenu(t) {
    if (!this.menu) return;
    const i = this.menu.querySelector(".pvt-contextmenu-topbar"), n = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    i.innerHTML = "", n.innerHTML = "", i.appendChild(li(this, this.menuNode.topbar, this.element)), n.appendChild(ci(this, this.menuNode.menu, this.element));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEdgeMenu(t) {
    if (!this.menu) return;
    const i = this.menu.querySelector(".pvt-contextmenu-topbar"), n = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    i.innerHTML = "", n.innerHTML = "", i.appendChild(li(this, this.menuEdge.topbar, this.element)), n.appendChild(ci(this, this.menuEdge.menu, this.element));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createNoteMenu(t) {
    if (!this.menu) return;
    const i = this.menu.querySelector(".pvt-contextmenu-topbar"), n = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    i.innerHTML = "", n.innerHTML = "", i.appendChild(li(this, this.menuNote.topbar, this.element)), n.appendChild(ci(this, this.menuNote.menu, this.element));
  }
  createCanvasMenu() {
    if (!this.menu) return;
    const t = this.menu.querySelector(".pvt-contextmenu-topbar"), i = this.menu.querySelector(".pvt-contextmenu-mainmenu");
    t.innerHTML = "", i.innerHTML = "", t.appendChild(li(this, this.menuCanvas.topbar, this.element)), i.appendChild(ci(this, this.menuCanvas.menu, this.element));
  }
  show() {
    var t;
    this.visible || this.menu && ((t = this.uiManager.tooltip) == null || t.hide(), this.menu.classList.add("shown"), this.visible = !0);
  }
  hide() {
    this.visible && this.menu && (this.element = null, this.menu.classList.remove("shown"), this.menu.style.left = "-10000px", this.visible = !1);
  }
  /**
   * The graph-space point the menu was opened at — what the "…here" entries act on.
   * Their own `onclick` event is the click on the *menu row*, tens of pixels away
   * from the gesture, so the opening position is captured instead.
   */
  openPoint() {
    var s;
    const t = this.uiManager.graph.renderer, i = (s = this.uiManager.layout) == null ? void 0 : s.canvas;
    if (this.openedAt)
      return t.screenToGraphCoordinates(
        this.openedAt.x - window.scrollX,
        this.openedAt.y - window.scrollY
      );
    const n = i == null ? void 0 : i.getBoundingClientRect();
    return t.screenToGraphCoordinates(
      ((n == null ? void 0 : n.x) ?? 0) + ((n == null ? void 0 : n.width) ?? 0) / 2,
      ((n == null ? void 0 : n.y) ?? 0) + ((n == null ? void 0 : n.height) ?? 0) / 2
    );
  }
  setPosition(t) {
    if (!this.menu) return;
    const i = 10, n = t.pageX, s = t.pageY;
    this.openedAt = { x: n, y: s }, this.menu.style.left = `${n + i}px`, this.menu.style.top = `${s + i}px`;
  }
}
class yp {
  constructor(e) {
    // A stack per key: the most recent binding wins, and disposing it restores the
    // one underneath — so a plugin binding e.g. Escape shadows the built-in only
    // while it's alive, instead of clobbering it for the lifetime of the UI.
    c(this, "bindings", /* @__PURE__ */ new Map());
    c(this, "container");
    this.container = e;
  }
  /** Register a keybinding (most recent wins). Returns a disposer that restores the previous binding. */
  register(e) {
    const t = this.bindings.get(e.key) ?? [];
    return t.length > 0 && console.warn(`Pivotick: keybinding "${e.key}" is already bound; the new handler shadows it until disposed.`), t.push(e.callback), this.bindings.set(e.key, t), () => {
      const i = this.bindings.get(e.key);
      if (!i) return;
      const n = i.lastIndexOf(e.callback);
      n !== -1 && i.splice(n, 1), i.length === 0 && this.bindings.delete(e.key);
    };
  }
  handleKeyPress(e) {
    const t = e.target, i = document.activeElement;
    if (!this.container.contains(i) || this.isEditableTarget(t))
      return;
    const n = this.getKeyCombo(e), s = this.bindings.get(n), o = s == null ? void 0 : s[s.length - 1];
    o && (e.preventDefault(), o(e));
  }
  isEditableTarget(e) {
    return e ? e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement || e.isContentEditable : !1;
  }
  getKeyCombo(e) {
    const t = [];
    return e.ctrlKey && t.push("Ctrl"), e.shiftKey && t.push("Shift"), e.altKey && t.push("Alt"), t.push(e.key), t.join("+");
  }
}
function ra(r) {
  return r === "select" || r === "create";
}
const bp = { select: "pointer", create: null }, wp = { select: !1, create: !0 };
class kp {
  constructor() {
    c(this, "state", {
      mode: "select",
      armedTool: { ...bp },
      panelOpen: { ...wp }
    });
    // Last pointer-mode, so closing a flyout returns to Select/Create rather
    // than stranding the rail with nothing active.
    c(this, "lastPointerMode", "select");
    c(this, "listeners", /* @__PURE__ */ new Set());
  }
  getMode() {
    return this.state.mode;
  }
  /** Whether a flyout is open (i.e. its mode is the active one). */
  isFlyoutActive(e) {
    return this.state.mode === e;
  }
  /** @deprecated use `isFlyoutActive('view')` — the rail has more than one flyout now. */
  isViewActive() {
    return this.isFlyoutActive("view");
  }
  /** The armed tool for a pointer-mode (`'pointer'`/`null` = default). */
  getArmedTool(e) {
    return this.state.armedTool[e];
  }
  /** Whether a pointer-mode's tool panel is currently expanded. */
  isPanelOpen(e) {
    return this.state.panelOpen[e];
  }
  /** A copy of the current state (safe to read; mutations don't leak back). */
  getState() {
    return {
      mode: this.state.mode,
      armedTool: { ...this.state.armedTool },
      panelOpen: { ...this.state.panelOpen }
    };
  }
  setMode(e) {
    this.state.mode !== e && (ra(e) && (this.lastPointerMode = e), this.state.mode = e, this.emit());
  }
  /** Open a flyout mode, or close it back to the last pointer-mode. */
  toggleFlyout(e) {
    this.setMode(this.state.mode === e ? this.lastPointerMode : e);
  }
  /** @deprecated use `toggleFlyout('view')` — the rail has more than one flyout now. */
  toggleView() {
    this.toggleFlyout("view");
  }
  /** Arm a tool in a pointer-mode (the rail slot reflects it). Idempotent. */
  armTool(e, t) {
    this.state.armedTool[e] !== t && (this.state.armedTool[e] = t, this.emit());
  }
  /** Expand / collapse a pointer-mode's tool panel. Idempotent. */
  setPanelOpen(e, t) {
    this.state.panelOpen[e] !== t && (this.state.panelOpen[e] = t, this.emit());
  }
  /** Toggle a pointer-mode's tool panel open/closed. */
  toggleToolPanel(e) {
    this.setPanelOpen(e, !this.state.panelOpen[e]);
  }
  /** Subscribe to state changes. Returns an unsubscribe fn (pass to `UIComponent.track`). */
  subscribe(e) {
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  /** Drop every subscriber (called on UI teardown). */
  dispose() {
    this.listeners.clear();
  }
  emit() {
    const e = this.getState();
    for (const t of [...this.listeners]) t(e);
  }
}
class Cp extends it {
  constructor(t) {
    super(t);
    c(this, "rail");
    c(this, "buttons", /* @__PURE__ */ new Map());
  }
  onMount(t) {
    if (!t) return;
    this.rail = document.createElement("div"), this.rail.className = "pvt-moderail-rail", this.rail.appendChild(this.makeButton("select", "Select", ki, "V")), this.rail.appendChild(this.makeButton("create", "Create", Ke, "C")), this.rail.appendChild(this.makeButton("view", "View", Wt)), this.rail.appendChild(this.makeButton("physics", "Physics", ho));
    const i = this.uiManager.getOptions().modeRail, n = !!(i != null && i.explore), s = !!(i != null && i.enrich);
    if (n || s) {
      const o = document.createElement("div");
      o.className = "pvt-moderail-divider", this.rail.appendChild(o), n && this.rail.appendChild(this.makeSoonButton("explore", "Explore", Tc)), s && this.rail.appendChild(this.makeSoonButton("enrich", "Enrich", Gn));
    }
    t.appendChild(this.rail);
  }
  onAfterMount() {
    var t, i, n, s;
    (t = this.buttons.get("select")) == null || t.addEventListener("click", () => this.activateOrToggle("select")), (i = this.buttons.get("create")) == null || i.addEventListener("click", () => this.activateOrToggle("create")), (n = this.buttons.get("view")) == null || n.addEventListener("click", () => this.uiManager.modeStore.toggleFlyout("view")), (s = this.buttons.get("physics")) == null || s.addEventListener("click", () => this.uiManager.modeStore.toggleFlyout("physics")), this.track(this.uiManager.keyManager.register({ key: "v", callback: () => this.activateOrToggle("select"), description: "Select mode / toggle its tools" })), this.track(this.uiManager.keyManager.register({ key: "c", callback: () => this.activateOrToggle("create"), description: "Create mode / toggle its tools" })), this.render(this.uiManager.modeStore.getState()), this.track(this.uiManager.modeStore.subscribe((o) => this.render(o))), this.publishHeight();
  }
  onDestroy() {
    var t, i;
    (t = this.layoutRoot()) == null || t.style.removeProperty("--pvt-moderail-height"), (i = this.rail) == null || i.remove(), this.rail = void 0, this.buttons.clear();
  }
  /**
   * Publish the rail's height as `--pvt-moderail-height`. The rail grows down the
   * canvas's left column, so anything else docked there (the legend) can size
   * itself against it instead of guessing — see `legend.scss`. Observed rather
   * than computed: the height moves with the opt-in SOON modes and with whatever
   * the label font resolves to.
   */
  publishHeight() {
    const t = this.rail;
    if (!t) return;
    const i = () => {
      var o;
      const s = t.getBoundingClientRect().height;
      (o = this.layoutRoot()) == null || o.style.setProperty("--pvt-moderail-height", `${s}px`);
    };
    if (i(), typeof ResizeObserver > "u") return;
    const n = new ResizeObserver(i);
    n.observe(t), this.track(() => n.disconnect());
  }
  layoutRoot() {
    var t;
    return ((t = this.rail) == null ? void 0 : t.closest(".pvt-layout")) ?? null;
  }
  /** Click the active mode to toggle its panel; click another to switch to it. */
  activateOrToggle(t) {
    const i = this.uiManager.modeStore;
    i.getMode() === t ? i.toggleToolPanel(t) : i.setMode(t);
  }
  /** Highlight the active mode and reflect each pointer-mode's armed tool. */
  render(t) {
    for (const [i, n] of this.buttons) {
      const s = i === t.mode;
      n.classList.toggle("active", s), n.setAttribute("aria-pressed", String(s));
    }
    this.applyFace("select", t.armedTool.select), this.applyFace("create", t.armedTool.create);
  }
  /** Set a mode slot's icon + label to match its armed tool (mode name at rest). */
  applyFace(t, i) {
    const n = this.buttons.get(t);
    if (!n) return;
    const { icon: s, label: o } = this.railFace(t, i), a = n.querySelector(".pvt-moderail-icon"), l = n.querySelector(".pvt-moderail-label");
    a && (a.innerHTML = s), l && (l.textContent = o);
  }
  railFace(t, i) {
    return t === "select" ? i === "lasso" ? { icon: wo, label: "Lasso" } : { icon: ki, label: "Select" } : i === "add-edge" ? { icon: te(20), label: "Edge" } : { icon: Ke, label: "Create" };
  }
  makeButton(t, i, n, s) {
    const o = document.createElement("button");
    return o.type = "button", o.className = "pvt-moderail-button", o.dataset.mode = t, o.title = s ? `${i} (${s})` : i, o.innerHTML = `<span class="pvt-moderail-icon">${n}</span><span class="pvt-moderail-label">${i}</span>`, this.buttons.set(t, o), o;
  }
  makeSoonButton(t, i, n) {
    const s = this.makeButton(t, i, n);
    return s.classList.add("pvt-moderail-soon"), s.disabled = !0, s.title = `${i} — coming soon`, s.innerHTML += '<span class="pvt-moderail-badge">SOON</span>', s;
  }
}
const Ep = { select: "V", create: "C" };
class Sp extends it {
  constructor(t) {
    super(t);
    c(this, "panel");
    /** The last mode seen, so disarm-on-leave runs only on real mode changes. */
    c(this, "prevMode", null);
    /** Which pointer-mode's tool-set is currently rendered (avoids needless rebuilds). */
    c(this, "renderedMode", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    c(this, "cancelPan", (t, i) => {
      (t == null ? void 0 : t.type) === "wheel" || (t == null ? void 0 : t.button) === 1 || i.cancel();
    });
    c(this, "cancelClick", (t, i) => i.cancel());
    // Disarm the lasso once it has produced a selection (see toggleLasso).
    // Deferred to a microtask so it runs *after* the whole pointer gesture has
    // settled — disarming synchronously would clear() the overlay mid-gesture
    // (resetting `drawing`) and cancel the very selection that triggered it.
    // Disarm the lasso once it has produced a selection (see toggleLasso).
    // Deferred past the current gesture: disarming synchronously would drop the
    // cancelClick guard, so the trailing canvas click that follows the drag would
    // clear the selection we just made. A macrotask lets that click be swallowed
    // by the still-armed guard first, then the lasso reverts to Select.
    c(this, "onLassoComplete", () => {
      setTimeout(() => this.disarmLasso(), 0);
    });
  }
  onMount(t) {
    t && (this.panel = document.createElement("div"), this.panel.className = "pvt-toolpanel-panel", t.appendChild(this.panel));
  }
  onAfterMount() {
    this.onState(this.uiManager.modeStore.getState()), this.track(this.uiManager.modeStore.subscribe((s) => this.onState(s)));
    const t = this.uiManager.graph.editing.connectManager, i = (s) => {
      s.getMode() === "node-edge" && this.uiManager.modeStore.armTool("create", "add-edge");
    }, n = (s) => {
      s.getMode() === "node-edge" && this.uiManager.modeStore.armTool("create", null);
    };
    t.on("start", i), t.on("stop", n), this.track(() => {
      t.off("start", i), t.off("stop", n);
    }), this.track(this.uiManager.keyManager.register({
      key: "Escape",
      callback: () => this.cancelActive()
    }));
  }
  onGraphReady() {
    const t = () => this.refreshEnabled();
    this.trackInteraction("selectNode", t), this.trackInteraction("unselectNode", t), this.trackInteraction("selectNodes", t), this.trackInteraction("unselectNodes", t), this.refreshEnabled();
  }
  /** Cancel whatever tool is currently armed (edge-connect / lasso). Panel state is left as-is. */
  cancelActive() {
    const t = this.uiManager.graph.editing.connectManager;
    t.isActive() && t.exitClickConnectionMode(), this.disarmLasso();
  }
  onDestroy() {
    var t;
    this.disarmLasso(), (t = this.panel) == null || t.remove(), this.panel = void 0, this.renderedMode = null, this.prevMode = null;
  }
  /**
   * React to a store change: disarm the tool of any left mode, then render the
   * active pointer-mode's tool-set and reflect its armed tool + open/collapsed
   * state. A flyout mode has no pointer tools, so the panel collapses there.
   * All operations are idempotent — a re-entrant emit (from disarming) converges.
   */
  onState(t) {
    const i = t.mode;
    if (i !== this.prevMode && (this.prevMode = i, i !== "select" && this.disarmLasso(), i !== "create")) {
      const n = this.uiManager.graph.editing.connectManager;
      n.isActive() && n.exitClickConnectionMode();
    }
    if (!ra(i)) {
      this.setCollapsed(!0);
      return;
    }
    this.renderedMode !== i && this.render(i), this.reflectArmed(t.armedTool[i]), this.setCollapsed(!t.panelOpen[i]);
  }
  /** Show/hide the panel with a short animation (see `.pvt-collapsed` in scss). */
  setCollapsed(t) {
    var i;
    (i = this.panel) == null || i.classList.toggle("pvt-collapsed", t);
  }
  specsFor(t) {
    return t === "select" ? [
      { id: "pointer", label: "Pointer", icon: ki, kind: "default", run: () => this.disarmLasso() },
      { id: "lasso", label: "Lasso", icon: wo, kind: "toggle", run: (i) => this.toggleLasso(i) },
      { id: "path", label: "Path select", icon: bc, kind: "soon" },
      { id: "invert", label: "Invert selection", icon: ko, kind: "action", run: () => this.invertSelection() }
    ] : [
      // Both write-path tools are dropped entirely when their editor is disabled —
      // a read-only integration gets no affordance rather than one that refuses.
      ...this.uiManager.isEditorEnabled("nodeCreator") ? [{ id: "add-node", label: "Add node", icon: Ke, kind: "action", run: () => this.addNode() }] : [],
      { id: "add-edge", label: "Add edge", icon: te(18), kind: "toggle", run: (i) => this.toggleAddEdge(i) },
      { id: "add-note", label: "Add note", icon: _i, kind: "action", run: () => this.addNote() },
      ...this.uiManager.isEditorEnabled("nodeEditor") ? [{ id: "edit", label: "Edit node", icon: ke, kind: "action", run: () => this.editSelectedNode(), enabled: () => this.hasEditableSelection() }] : []
    ];
  }
  render(t) {
    if (!this.panel) return;
    this.renderedMode = t;
    const i = this.specsFor(t), n = t === "select" ? "Select" : "Create", s = t === "select" ? ki : Ke;
    this.panel.innerHTML = `<div class="pvt-toolpanel-header"><span class="pvt-toolpanel-icon">${s}</span><span class="pvt-toolpanel-title">${n}</span>` + vi(Ep[t]).outerHTML + "</div>";
    for (const o of i) {
      const a = document.createElement("button");
      a.type = "button", a.className = "pvt-toolpanel-tool", a.dataset.tool = o.id, a.dataset.kind = o.kind, o.kind === "toggle" && a.setAttribute("aria-pressed", "false"), a.innerHTML = `<span class="pvt-toolpanel-icon">${o.icon}</span><span class="pvt-toolpanel-tool-label">${o.label}</span>`, o.kind === "soon" ? (a.disabled = !0, a.classList.add("pvt-toolpanel-soon"), a.title = `${o.label} — coming soon`, a.innerHTML += '<span class="pvt-toolpanel-badge">SOON</span>') : a.addEventListener("click", () => this.onToolClick(t, o)), this.panel.appendChild(a);
    }
    this.refreshEnabled();
  }
  /** Apply each tool's `enabled` predicate to its row (disable + dim when false). */
  refreshEnabled() {
    if (!(!this.panel || !this.renderedMode))
      for (const t of this.specsFor(this.renderedMode)) {
        if (t.kind === "soon" || !t.enabled) continue;
        const i = this.panel.querySelector(`.pvt-toolpanel-tool[data-tool="${t.id}"]`);
        if (!i) continue;
        const n = t.enabled();
        i.disabled = !n, i.classList.toggle("pvt-toolpanel-disabled", !n);
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
  onToolClick(t, i) {
    var s, o, a;
    const n = this.uiManager.modeStore;
    if (i.kind === "toggle") {
      const l = n.getArmedTool(t) !== i.id;
      (s = i.run) == null || s.call(i, l), n.armTool(t, l ? i.id : this.defaultTool(t)), n.setPanelOpen(t, !1);
    } else i.kind === "default" ? ((o = i.run) == null || o.call(i, !0), n.armTool(t, i.id), n.setPanelOpen(t, !1)) : (a = i.run) == null || a.call(i, !0);
  }
  /** The tool a pointer-mode rests on when nothing special is armed. */
  defaultTool(t) {
    return t === "select" ? "pointer" : null;
  }
  /** Highlight the armed tool row. */
  reflectArmed(t) {
    if (this.panel)
      for (const i of this.panel.querySelectorAll(".pvt-toolpanel-tool")) {
        const n = i.dataset.tool === t;
        i.classList.toggle("active", n), i.dataset.kind === "toggle" && i.setAttribute("aria-pressed", String(n));
      }
  }
  /* ---------- leaf logic (reused from the classic toolbar) ---------- */
  toggleLasso(t) {
    var s;
    const i = (s = this.uiManager.layout) == null ? void 0 : s.canvas, n = this.uiManager.graph.renderer.getGraphInteraction();
    i == null || i.classList.toggle("canvas--lasso-mode", t), this.uiManager.graph.renderer.toggleLassoMode(t), t ? (n.on("canvasBeforeZoom", this.cancelPan), n.on("canvasClick", this.cancelClick), n.on("selectNode", this.onLassoComplete), n.on("selectNodes", this.onLassoComplete)) : (n.off("canvasBeforeZoom", this.cancelPan), n.off("canvasClick", this.cancelClick), n.off("selectNode", this.onLassoComplete), n.off("selectNodes", this.onLassoComplete));
  }
  disarmLasso() {
    this.uiManager.modeStore.getArmedTool("select") === "lasso" && (this.toggleLasso(!1), this.uiManager.modeStore.armTool("select", "pointer"));
  }
  invertSelection() {
    const t = this.uiManager.graph.renderer.getGraphInteraction(), i = new Set(t.getSelectedNodeIDs()), n = this.uiManager.graph.getMutableNodes().filter((s) => !i.has(s.id)).map((s) => ({ node: s, element: s.getGraphElement() }));
    t.selectNodes(n);
  }
  toggleAddEdge(t) {
    const i = this.uiManager.graph.editing.connectManager;
    t && !i.isActive() ? i.startNodeClickConnection() : !t && i.isActive() && i.exitClickConnectionMode();
  }
  addNote() {
    const t = this.canvasCentre();
    t && this.uiManager.graph.noteManager.addNote(new It({ content: "This is not a note.", ...t }));
  }
  /**
   * Place a node at the middle of the current view, like Add note — the canvas
   * context-menu's "Add Node Here" covers placing one at a chosen point. The
   * before-create hook owns what it carries.
   */
  addNode() {
    const t = this.canvasCentre();
    t && this.uiManager.graph.editing.requestNodeCreate({ position: t, origin: "tool" });
  }
  /** The middle of the visible canvas, in graph space (so it survives zoom/pan). */
  canvasCentre() {
    var n;
    const t = (n = this.uiManager.layout) == null ? void 0 : n.canvas;
    if (!t) return null;
    const i = t.getBoundingClientRect();
    return this.uiManager.graph.renderer.screenToGraphCoordinates(i.x + i.width / 2, i.y + i.height / 2);
  }
  editSelectedNode() {
    const t = this.uiManager.graph.renderer.getGraphInteraction().getSelectedNode();
    t && this.uiManager.graph.editing.openNodeSession(t.node);
  }
}
class oa extends it {
  constructor() {
    super(...arguments);
    c(this, "panel");
    /** Closures that push each switch row's live state onto its button. */
    c(this, "toggleSync", []);
  }
  get sim() {
    return this.uiManager.graph.simulation;
  }
  onMount(t) {
    t && (this.panel = document.createElement("div"), this.panel.className = `pvt-flyout-panel pvt-flyout-${this.mode}`, this.panel.innerHTML = this.template(), t.appendChild(this.panel));
  }
  onAfterMount() {
    this.panel && (this.wire(), this.applyOpen(this.uiManager.modeStore.isFlyoutActive(this.mode)), this.track(this.uiManager.modeStore.subscribe((t) => this.applyOpen(t.mode === this.mode))));
  }
  onGraphReady() {
    for (const t of this.toggleSync) t();
  }
  onDestroy() {
    var t;
    (t = this.panel) == null || t.remove(), this.panel = void 0, this.toggleSync.length = 0;
  }
  applyOpen(t) {
    var i;
    (i = this.panel) == null || i.classList.toggle("open", t);
  }
  /* ---------- helpers for subclasses ---------- */
  /** `querySelector`, scoped to this flyout's panel. */
  query(t) {
    var i;
    return ((i = this.panel) == null ? void 0 : i.querySelector(t)) ?? null;
  }
  /** `querySelectorAll`, scoped to this flyout's panel. Empty before mount. */
  queryAll(t) {
    var i;
    return [...((i = this.panel) == null ? void 0 : i.querySelectorAll(t)) ?? []];
  }
  /** The flyout's title row. */
  headerRow(t, i) {
    return `<div class="pvt-flyout-header"><span class="pvt-flyout-icon">${t}</span>${i}</div>`;
  }
  /** An all-caps label introducing a group of controls. */
  sectionLabel(t) {
    return `<div class="pvt-flyout-section-label">${t}</div>`;
  }
  /**
   * A labelled switch row; wire it with {@link wireToggle} under the same `id`. The
   * note span is for a row that has something to report about its own effect (how many
   * nodes it is hiding, say) — filled through {@link toggleNote}, and invisible while
   * empty.
   */
  toggleRow(t, i, n, s) {
    return `
            <button type="button" class="pvt-flyout-toggle" data-toggle="${t}" role="switch" aria-pressed="false" title="${s}">
                <span class="pvt-flyout-icon">${i}</span>${n}
                <span class="pvt-flyout-toggle-note" data-note="${t}"></span>
                <span class="pvt-flyout-switch"></span>
            </button>`;
  }
  /**
   * Write a switch row's note, or clear it with an empty string. A note is short enough
   * to sit on the row — a count, not a sentence; `title` is where the sentence goes.
   */
  toggleNote(t, i, n = "") {
    const s = this.query(`.pvt-flyout-toggle-note[data-note="${t}"]`);
    s && (s.textContent = i, s.title = n);
  }
  /**
   * Bind a switch row: `toggle` flips the underlying state, `read` reports it.
   * The click handler is attached now, but `read` usually touches the
   * simulation — so the initial state is pushed at `graphReady` instead.
   */
  wireToggle(t, i, n) {
    const s = this.query(`.pvt-flyout-toggle[data-toggle="${t}"]`);
    if (!s) return;
    const o = () => s.setAttribute("aria-pressed", String(n()));
    this.toggleSync.push(o), this.listen(s, "click", () => {
      i(), o();
    });
  }
}
const xp = [
  { id: "grid", label: "Grid", desc: "Rule the canvas with grid lines." },
  { id: "dots", label: "Dots", desc: "Mark the grid with dots instead of lines." },
  { id: "none", label: "None", desc: "Leave the canvas plain." },
  { id: "image", label: "Image", desc: "Paint an image behind the graph." }
], Mp = ["grid", "dots"], fn = [
  { id: "cover", label: "Cover", desc: "Scale the image to fill the canvas, cropping whatever overflows." },
  { id: "contain", label: "Contain", desc: "Scale the image until all of it fits on the canvas." },
  { id: "repeat", label: "Tile", desc: "Keep the image at its own size and repeat it across the canvas." }
], Tp = [
  { color: "", title: "Theme default", cls: "swatch-default" },
  { color: "#ffffff", title: "White" },
  { color: "#d4d4d4", title: "Light grey" },
  { color: "#525252", title: "Dark grey" },
  { color: "#171717", title: "Black" }
], Ap = /^#[0-9a-f]{6}$/i;
class Np extends oa {
  constructor() {
    super(...arguments);
    c(this, "mode", "view");
  }
  template() {
    const t = xp.map(
      (s) => `<button type="button" class="pvt-flyout-btn-group-btn" data-bg="${s.id}"
                aria-pressed="${s.id === "grid"}" title="${s.desc}">${s.label}</button>`
    ).join(""), i = Tp.map(
      (s) => `<button type="button" class="pvt-viewflyout-swatch ${s.cls ?? ""}" data-color="${s.color}"
                title="${s.title}" style="${s.color ? `--swatch: ${s.color}` : ""}"></button>`
    ).join(""), n = fn.map(
      (s, o) => `<button type="button" class="pvt-flyout-btn-group-btn" data-fit="${s.id}"
                aria-pressed="${o === 0}" title="${s.desc}">${s.label}</button>`
    ).join("");
    return this.headerRow(Wt, "View") + this.sectionLabel("GRID &amp; CANVAS") + `
            <div class="pvt-flyout-card">
                <div class="pvt-flyout-card-head">
                    <span class="pvt-flyout-card-title">Background</span>
                </div>
                <div class="pvt-flyout-btn-group">${t}</div>
                <div class="pvt-viewflyout-swatch-label">Canvas colour</div>
                <div class="pvt-viewflyout-swatches" data-swatches="canvas">${i}
                    <input type="color" class="pvt-viewflyout-color-picker" title="Custom canvas colour">
                </div>
                <div class="pvt-viewflyout-swatch-label" data-pattern-only>Grid colour</div>
                <div class="pvt-viewflyout-swatches" data-swatches="grid" data-pattern-only>${i}
                    <input type="color" class="pvt-viewflyout-color-picker" title="Custom grid colour">
                </div>
                <div class="pvt-viewflyout-bg-toggles" data-pattern-only>
                    ${this.toggleRow("highlight", wc, "Highlight grid", "Make the background grid lines more visible.")}
                </div>
                <div class="pvt-viewflyout-bg-image" hidden>
                    <div class="pvt-viewflyout-bg-image-row">
                        <input type="text" class="pvt-viewflyout-bg-image-url" placeholder="Image URL...">
                        <button type="button" class="pvt-viewflyout-bg-image-pick"
                            title="Pick an image file from this device.">Browse</button>
                        <input type="file" class="pvt-viewflyout-bg-image-file" accept="image/*" hidden>
                    </div>
                    <div class="pvt-flyout-btn-group">${n}</div>
                    <button type="button" class="pvt-viewflyout-bg-image-clear">Remove image</button>
                </div>
            </div>` + this.toggleRow("snap", kc, "Snap to grid", "Align nodes to the grid while you drag them.") + this.toggleRow("freeze", we, "Freeze on drag", "Keep nodes pinned where you drop them instead of letting physics move them again.") + this.toggleRow("fit", go, "Fit on expand/collapse", "Zoom and re-center to fit the graph when clusters are expanded or collapsed.") + this.toggleRow(
      "orphans",
      ee,
      "Hide unconnected",
      "Hide nodes that have no visible relation left. Unlike hiding a relationship layer, this moves the graph."
    );
  }
  onGraphReady() {
    super.onGraphReady(), this.syncOrphanNote();
  }
  wire() {
    var i;
    const t = (i = this.uiManager.layout) == null ? void 0 : i.layout;
    this.wireToggle("snap", () => this.sim.toggleGridSnapping(), () => this.sim.isGridSnappingEnabled()), this.wireToggle(
      "highlight",
      () => t == null ? void 0 : t.classList.toggle("grid-highlighted"),
      () => (t == null ? void 0 : t.classList.contains("grid-highlighted")) ?? !1
    ), this.wireToggle("freeze", () => this.sim.toggleFreezeNodesOnDrag(), () => this.sim.isFreezeNodesOnDrag()), this.wireToggle("fit", () => this.sim.toggleFitViewOnExpandCollapse(), () => this.sim.isFitViewOnExpandCollapse()), this.wireOrphans(), this.wireBackground();
  }
  /**
   * The unconnected-nodes switch, which drives the query engine's own rule
   * (`UI.filter.hideDisconnected`). Its note follows every filter change, not just its
   * own clicks: switching a relationship layer off strands more nodes.
   */
  wireOrphans() {
    const t = this.uiManager.graph.queryEngine, i = () => this.syncOrphanNote();
    this.wireToggle(
      "orphans",
      () => t.setHideDisconnected(!t.isHideDisconnected()),
      () => t.isHideDisconnected()
    ), t.on("filterChange", i), this.track(() => t.off("filterChange", i));
  }
  /**
   * How many nodes the switch is hiding, on the row itself. Blank while it hides none.
   * The bare count is what fits: the row has 238px, and the label plus "1 hidden" needs
   * 253 — so the words go in the note's own tooltip, and the number reads like the
   * filter panel's layer counts.
   */
  syncOrphanNote() {
    const t = this.uiManager.graph.queryEngine.getDisconnectedNodeCount();
    if (t === 0) return this.toggleNote("orphans", "");
    this.toggleNote("orphans", String(t), `${t} unconnected ${t > 1 ? "nodes" : "node"} hidden`);
  }
  /* ---------- background ---------- */
  wireBackground() {
    var i;
    const t = (i = this.uiManager.layout) == null ? void 0 : i.canvas;
    t && (this.wireBackgroundMode(t), this.wireSwatches("canvas", t, "--pvt-bg"), this.wireSwatches("grid", t, "--pvt-graph-grid-color"), this.wireBackgroundImage(t));
  }
  /**
   * The pattern picker. The pattern is a class on the canvas — `grid` is the
   * stylesheet's default, so it is the absence of the other three. Which
   * controls the card shows follows from it: a grid colour and the highlight
   * only mean something under a pattern, the image inputs only under `image`.
   */
  wireBackgroundMode(t) {
    const i = this.queryAll(".pvt-flyout-btn-group-btn[data-bg]"), n = this.queryAll("[data-pattern-only]"), s = this.query(".pvt-viewflyout-bg-image"), o = (a) => {
      t.classList.remove("pvt-bg-dots", "pvt-bg-none", "pvt-bg-image"), a !== "grid" && t.classList.add(`pvt-bg-${a}`);
      for (const l of n) l.hidden = !Mp.includes(a);
      s && (s.hidden = a !== "image");
    };
    for (const a of i)
      this.listen(a, "click", () => {
        for (const l of i) l.setAttribute("aria-pressed", String(l === a));
        o(a.dataset.bg ?? "grid");
      });
  }
  /**
   * One swatch row plus its custom-colour input, both writing `property` on
   * the canvas. The reset swatch carries no colour: it removes the override
   * so the theme's own value shows through again.
   */
  wireSwatches(t, i, n) {
    const s = this.query(`.pvt-viewflyout-swatches[data-swatches="${t}"]`);
    if (!s) return;
    const o = s.querySelectorAll(".pvt-viewflyout-swatch"), a = (d) => {
      for (const u of o) u.classList.toggle("active", u === d);
    };
    for (const d of o)
      this.listen(d, "click", () => {
        a(d);
        const u = d.dataset.color;
        u ? i.style.setProperty(n, u) : i.style.removeProperty(n);
      });
    const l = s.querySelector(".pvt-viewflyout-color-picker");
    if (!l) return;
    const h = this.themeAccent();
    h && (l.value = h), this.listen(l, "input", () => {
      a(null), i.style.setProperty(n, l.value);
    });
  }
  /**
   * `--pvt-theme-primary` as a hex, or `null` if the theme states it in a form
   * a colour input would refuse (a function, a named colour, an alpha).
   */
  themeAccent() {
    if (!this.panel) return null;
    const t = getComputedStyle(this.panel).getPropertyValue("--pvt-theme-primary").trim();
    return Ap.test(t) ? t : null;
  }
  /**
   * The image controls. A URL and a picked file are the same thing to the
   * canvas — a `url()` for `--pvt-bg-image-url` — so setting either clears
   * the other's input.
   */
  wireBackgroundImage(t) {
    const i = this.query(".pvt-viewflyout-bg-image-url"), n = this.query(".pvt-viewflyout-bg-image-file"), s = this.query(".pvt-viewflyout-bg-image-pick"), o = this.query(".pvt-viewflyout-bg-image-clear"), a = this.queryAll(".pvt-flyout-btn-group-btn[data-fit]"), l = (h) => {
      for (const d of a) d.setAttribute("aria-pressed", String(d.dataset.fit === h));
    };
    i && this.listen(i, "input", () => {
      i.value ? t.style.setProperty("--pvt-bg-image-url", `url("${i.value}")`) : t.style.removeProperty("--pvt-bg-image-url"), n && (n.value = "");
    }), s && n && this.listen(s, "click", () => n.click()), n && this.listen(n, "change", () => {
      var u;
      const h = (u = n.files) == null ? void 0 : u[0];
      if (!h) return;
      const d = new FileReader();
      d.onload = () => {
        t.style.setProperty("--pvt-bg-image-url", `url("${d.result}")`), i && (i.value = "");
      }, d.readAsDataURL(h);
    });
    for (const h of a)
      this.listen(h, "click", () => {
        const d = h.dataset.fit ?? fn[0].id;
        l(d);
        const u = d === "repeat";
        t.style.setProperty("--pvt-bg-image-size", u ? "auto" : d), t.style.setProperty("--pvt-bg-image-repeat", u ? "repeat" : "no-repeat");
      });
    o && this.listen(o, "click", () => {
      for (const h of ["--pvt-bg-image-url", "--pvt-bg-image-size", "--pvt-bg-image-repeat"])
        t.style.removeProperty(h);
      l(fn[0].id), i && (i.value = ""), n && (n.value = "");
    });
  }
}
class Ip {
  constructor(e, t, i = {}) {
    c(this, "target");
    c(this, "options");
    c(this, "config");
    c(this, "root");
    c(this, "menu");
    c(this, "opened", !1);
    // Kept as fields so {@link destroy} can take them off again: they live on
    // `document` / `window`, so an anonymous handler would outlive the dropdown and
    // go on measuring a detached element every time the page scrolls.
    c(this, "onTargetClick", (e) => {
      e.stopPropagation(), this.toggle();
    });
    c(this, "onOutsidePointerDown", (e) => {
      const t = e.target;
      !this.root.contains(t) && !this.target.contains(t) && this.close();
    });
    c(this, "onViewportChange", () => {
      this.opened && this.position();
    });
    this.target = e, this.options = t, this.config = {
      closeOnSelect: !0,
      placement: "bottom-start",
      ...i
    }, this.root = document.createElement("div"), this.root.className = "pvt-dropdown", this.menu = document.createElement("div"), this.menu.className = "pvt-dropdown__menu", this.root.appendChild(this.menu), this.build(), this.attach();
  }
  build() {
    document.body.appendChild(this.root), this.renderOptions();
  }
  renderOptions() {
    this.menu.innerHTML = "", this.options.forEach((e) => {
      const t = document.createElement("button"), i = e.variant ?? "outline-primary";
      if (t.type = "button", t.className = "pvt-dropdown__item", t.classList.add(`${i}`), e.disabled && (t.disabled = !0, t.classList.add("disabled")), e.html)
        t.appendChild(e.html);
      else {
        let n;
        if (e.iconUnicode && (n = Z({ iconUnicode: e.iconUnicode })), e.iconClass && (n = Z({ iconClass: e.iconClass })), e.svgIcon && (n = Z({ svgIcon: e.svgIcon })), e.imagePath && (n = Z({ imagePath: e.imagePath })), n && (n.classList.add("pvt-dropdown__icon"), t.appendChild(n)), e.text) {
          const s = document.createElement("span");
          s.className = "pvt-dropdown__label", s.textContent = e.text, t.appendChild(s);
        }
      }
      t.addEventListener("click", (n) => {
        var s;
        n.stopPropagation(), !e.disabled && ((s = e.onClick) == null || s.call(e, e, this, t), this.config.closeOnSelect && this.close());
      }), this.menu.appendChild(t);
    });
  }
  attach() {
    this.target.addEventListener("click", this.onTargetClick), document.addEventListener("pointerdown", this.onOutsidePointerDown), window.addEventListener("resize", this.onViewportChange), window.addEventListener("scroll", this.onViewportChange);
  }
  position() {
    const e = this.target.getBoundingClientRect();
    this.root.style.position = "fixed", this.root.style.zIndex = "9999";
    const t = !this.root.classList.contains("open");
    t && (this.root.style.visibility = "hidden", this.root.style.display = "block");
    const i = this.root.offsetWidth, n = this.root.offsetHeight, s = window.innerWidth, o = window.innerHeight, a = 8;
    let l = this.config.placement === "bottom-end" ? e.right - i : e.left, h = e.bottom + 6;
    l + i > s - a && (l = s - i - 2 * a), l < a && (l = a), h + n > o - a && (h = e.top - n - 6), h < a && (h = a), this.root.style.left = `${l}px`, this.root.style.top = `${h}px`, t && (this.root.style.visibility = "", this.root.style.display = "");
  }
  open() {
    this.opened || (this.opened = !0, this.root.classList.add("open"), this.position());
  }
  close() {
    this.opened = !1, this.root.classList.remove("open");
  }
  toggle() {
    this.opened ? this.close() : this.open();
  }
  setOptions(e) {
    this.options = e, this.renderOptions();
  }
  destroy() {
    this.target.removeEventListener("click", this.onTargetClick), document.removeEventListener("pointerdown", this.onOutsidePointerDown), window.removeEventListener("resize", this.onViewportChange), window.removeEventListener("scroll", this.onViewportChange), this.root.remove();
  }
}
const Be = [
  { key: "repulsion", label: "Repulsion", desc: "How strongly nodes push each other apart. Higher values spread the graph out.", icon: Nc, step: 1, set: (r, e) => r.setRepulsion(e) },
  { key: "linkDistance", label: "Link distance", desc: "The resting length of edges, in pixels. Higher values place connected nodes further apart.", icon: Co, step: 1, set: (r, e) => r.setLinkDistance(e) },
  { key: "collisionRadius", label: "Collision radius", desc: "The clear space kept around each node to prevent overlap. Higher values keep nodes further apart.", icon: _c, step: 1, set: (r, e) => r.setCollisionRadius(e) },
  { key: "friction", label: "Friction", desc: "How quickly node motion is damped. Higher values calm the layout and settle it faster.", icon: Rc, step: 1, set: (r, e) => r.setFriction(e) },
  { key: "centering", label: "Centering", desc: "How strongly the graph is pulled toward the middle of the canvas. Higher values keep disconnected parts in frame.", icon: Ii, step: 1, set: (r, e) => r.setCentering(e) },
  { key: "settleTime", label: "Settle time", desc: "How long the layout is given to settle, in seconds. Higher values let large graphs unfold further before they stop.", icon: Jl, step: 0.1, unit: "s", set: (r, e) => r.setSettleTime(e) }
], mn = ["auto", "tight", "loose"], _p = {
  auto: "Let the layout tune itself from the number of nodes, their size and the canvas — and keep tuning as the graph changes.",
  tight: "Compact layout with nodes packed closely together.",
  loose: "Spacious layout with nodes spread further apart."
}, Sr = { auto: Gn }, vn = [
  { id: "force", label: "Force", icon: Yl, tree: !1, desc: "Force — positions nodes freely using the physics simulation." },
  { id: "tree-v", label: "Vertical", icon: Xl, tree: !0, desc: "Tree — hierarchical layout flowing from top to bottom." },
  { id: "tree-h", label: "Horizontal", icon: Zl, tree: !0, desc: "Tree — hierarchical layout flowing from left to right." },
  { id: "tree-r", label: "Radial", icon: Ql, tree: !0, desc: "Tree — hierarchical layout radiating out from a central root." }
], Rp = "collisionRadius", He = [
  { key: "levelSpacing", label: "Level distance", desc: "How far apart consecutive levels of the tree sit — the gap between rings, in the radial layout.", icon: Ic, radial: !0 },
  { key: "siblingSpacing", label: "Sibling distance", desc: "How far apart nodes on the same level sit. The radial layout spreads a level over the whole circle, so it ignores this one.", icon: Co, radial: !1 }
], Lp = "Hangs the tree from the node you have selected, following edges either way round.", xr = [
  { id: "selected", label: "Selected node", icon: bo, desc: Lp },
  { id: "FirstZeroInDegree", label: "First source", icon: tc, desc: "The first node nothing points at." },
  { id: "MaxReachability", label: "Widest reach", icon: ec, desc: "Reaches the most other nodes." },
  { id: "MinHeight", label: "Shallowest", icon: ic, desc: "Makes the tree as shallow as it can be." }
], Mr = (r) => r === "MinMaxDistance" ? "MinHeight" : r, Dp = "Let the tree work out its own distances from the size of the nodes and the shape of the tree — and keep working them out as the graph changes.", Op = {
  "tree-v": { horizontal: !1 },
  "tree-h": { horizontal: !0 },
  "tree-r": { radial: !0 }
};
class Fp extends oa {
  constructor() {
    super(...arguments);
    c(this, "mode", "physics");
    c(this, "runButton");
    c(this, "simulationCard");
    c(this, "spacingCard");
    c(this, "sliders", /* @__PURE__ */ new Map());
    c(this, "sliderValues", /* @__PURE__ */ new Map());
    c(this, "spacingSliders", /* @__PURE__ */ new Map());
    c(this, "spacingValues", /* @__PURE__ */ new Map());
    c(this, "presetButtons", /* @__PURE__ */ new Map());
    c(this, "layoutButtons", /* @__PURE__ */ new Map());
    c(this, "rootRow");
    c(this, "rootPicker");
    c(this, "rootMenu");
    /** The tile the graph is laid out by; drives which controls are live. */
    c(this, "activeLayout", "force");
    /** The node the tree is pinned to, if the user picked one; the Root card's state. */
    c(this, "pinnedRootId");
    /** The finder in force while nothing is pinned. */
    c(this, "rootFinder", "MaxReachability");
    /** Whether tree spacing is left to the tuner — the Auto button's state. */
    c(this, "autoSpacing", !0);
    c(this, "autoSpacingButton");
  }
  wire() {
    this.runButton = this.query(".pvt-physicsflyout-run") ?? void 0, this.simulationCard = this.query(".pvt-physicsflyout-card") ?? void 0, this.spacingCard = this.query(".pvt-physicsflyout-spacing") ?? void 0, this.autoSpacingButton = this.query(".pvt-physicsflyout-autospacing") ?? void 0;
    for (const t of Be) {
      const i = this.query(`.pvt-physicsflyout-range[data-slider="${t.key}"]`), n = this.query(`.pvt-physicsflyout-slider-value[data-value="${t.key}"]`);
      i && this.sliders.set(t.key, i), n && this.sliderValues.set(t.key, n);
    }
    for (const t of He) {
      const i = this.query(`.pvt-physicsflyout-range[data-spacing="${t.key}"]`), n = this.query(`.pvt-physicsflyout-slider-value[data-value="${t.key}"]`);
      i && this.spacingSliders.set(t.key, i), n && this.spacingValues.set(t.key, n);
    }
    for (const t of mn) {
      const i = this.query(`.pvt-physicsflyout-preset[data-preset="${t}"]`);
      i && this.presetButtons.set(t, i);
    }
    for (const t of vn) {
      const i = this.query(`.pvt-physicsflyout-layout[data-layout="${t.id}"]`);
      i && this.layoutButtons.set(t.id, i);
    }
    this.rootRow = this.query(".pvt-physicsflyout-rootrow") ?? void 0, this.rootPicker = this.query(".pvt-physicsflyout-rootpick") ?? void 0, this.wireLayout(), this.wireRoot(), this.wirePhysics();
  }
  onGraphReady() {
    super.onGraphReady(), this.refreshSliders(this.sim.getPhysicsKnobs()), this.refreshSpacingSliders(this.sim.getTreeSpacing()), this.setAutoSpacing(this.sim.getLayoutType() === "force" || this.sim.isAutoTreeSpacingEnabled()), this.highlightPreset(this.sim.isAutoPhysicsEnabled() ? "auto" : null), this.updateRunButton(), this.highlightLayout(this.sim.getLayoutType() === "force" ? "force" : "tree-v"), this.watchSelection(), this.syncRoot(), this.updateLayoutControls();
  }
  onDestroy() {
    var t;
    super.onDestroy(), this.runButton = void 0, this.simulationCard = void 0, this.spacingCard = void 0, this.autoSpacingButton = void 0, this.sliders.clear(), this.sliderValues.clear(), this.spacingSliders.clear(), this.spacingValues.clear(), this.presetButtons.clear(), this.layoutButtons.clear(), (t = this.rootMenu) == null || t.destroy(), this.rootMenu = void 0, this.rootRow = void 0, this.rootPicker = void 0;
  }
  /* ---------- layout ---------- */
  wireLayout() {
    for (const t of vn) {
      const i = this.layoutButtons.get(t.id);
      i && this.listen(i, "click", () => {
        t.id === "force" ? this.sim.changeLayout("force") : this.sim.changeLayout("tree", { layout: { ...Op[t.id], ...this.spacingOptions(), ...this.rootOptions() } }), this.highlightLayout(t.id), this.updateLayoutControls();
      });
    }
  }
  /** Mark the chosen layout tile as the active one. */
  highlightLayout(t) {
    this.activeLayout = t;
    for (const [i, n] of this.layoutButtons) {
      const s = i === t;
      n.classList.toggle("active", s), n.setAttribute("aria-pressed", String(s));
    }
  }
  /**
   * What to hand `changeLayout` so a rebuilt tree carries on as it was. Under `Auto`
   * that means the *mode*, not the numbers: the new tree may be a different shape
   * (a radial one crowds where a vertical one does not), so it must be free to
   * re-derive its own multipliers rather than inherit the last tree's.
   */
  spacingOptions() {
    if (this.autoSpacing) return { spacing: "auto" };
    const t = (i) => {
      var n;
      return Number(((n = this.spacingSliders.get(i)) == null ? void 0 : n.value) ?? 1);
    };
    return { spacing: "manual", levelSpacing: t("levelSpacing"), siblingSpacing: t("siblingSpacing") };
  }
  /* ---------- root ---------- */
  /**
   * Hang the root menu off the picker row. {@link PivotickDropdown} already does what
   * this needs — it portals to `document.body`, so the menu is never clipped by the
   * flyout's own scroll box; it positions itself against the row, flips upward near the
   * bottom of the window, and closes on an outside click and on select.
   */
  wireRoot() {
    this.rootPicker && (this.rootMenu = new Ip(this.rootPicker, this.rootMenuOptions(), {
      closeOnSelect: !0,
      placement: "bottom-end"
    }));
  }
  /**
   * The menu, rebuilt whenever it can have changed: which item carries the tick, and
   * whether `Selected node` is reachable at all, both follow state the user moves from
   * outside this flyout.
   */
  rootMenuOptions() {
    const t = this.pinnedRootId ? "selected" : Mr(this.rootFinder);
    return xr.map((i) => ({
      id: i.id,
      html: this.rootMenuItem(i, i.id === t),
      disabled: i.id === "selected" && !this.selectedNodeId(),
      onClick: () => this.applyRoot(i.id)
    }));
  }
  /** One menu row: icon, name, and the sentence the name needs. */
  rootMenuItem(t, i) {
    const n = document.createElement("span");
    n.className = "pvt-rootmenu-item", i && n.classList.add("current");
    const s = t.id === "selected" && !this.selectedNodeId() ? "Select a node first." : t.desc;
    return n.innerHTML = `
            <span class="pvt-flyout-icon">${t.icon}</span>
            <span class="pvt-rootmenu-text"><b>${t.label}</b><em>${s}</em></span>
            <span class="pvt-rootmenu-tick">${zn}</span>`, n;
  }
  /** Take a pick from the menu: pin the selected node, or hand back to a finder. */
  applyRoot(t) {
    if (t === "selected") {
      const i = this.selectedNodeId();
      if (!i) return;
      this.pinnedRootId = i, this.sim.setTreeRoot({ rootId: i });
    } else
      this.pinnedRootId = void 0, this.rootFinder = t, this.sim.setTreeRoot({ algorithm: t });
    this.highlightRoot(), this.uiManager.graph.renderer.fitAndCenterWhenSettled();
  }
  /**
   * Keep the menu in step with the selection: `Selected node` is only reachable while
   * there is one node to hang the tree from. Subscribed at `graphReady` rather than in
   * {@link wire}: the interaction bus belongs to the renderer, which does not exist yet
   * when the flyout builds its markup.
   */
  watchSelection() {
    for (const t of ["selectNode", "unselectNode", "selectNodes", "unselectNodes"])
      this.trackInteraction(t, () => {
        var i;
        return (i = this.rootMenu) == null ? void 0 : i.setOptions(this.rootMenuOptions());
      });
  }
  /** Take the row's state from the layout — at `graphReady`, and after a rebuild. */
  syncRoot() {
    const t = this.sim.getTreeRoot();
    this.pinnedRootId = t.rootId, this.rootFinder = t.algorithm, this.highlightRoot();
  }
  /**
   * The one selected node, or nothing — a multi-selection roots nothing in particular.
   *
   * Guarded rather than assumed: the menu is built while the flyout's markup is, which
   * is before the renderer that owns the interaction bus exists.
   */
  selectedNodeId() {
    var t, i, n;
    return (n = (i = (t = this.uiManager.graph.renderer) == null ? void 0 : t.getGraphInteraction()) == null ? void 0 : i.getSelectedNode()) == null ? void 0 : n.node.id;
  }
  /** What to call the pinned node: its label if it has one, else its id. */
  pinnedRootName() {
    var i, n;
    if (!this.pinnedRootId) return "";
    const t = (n = (i = this.uiManager.graph.getMutableNode(this.pinnedRootId)) == null ? void 0 : i.getData()) == null ? void 0 : n.label;
    return typeof t == "string" && t ? t : this.pinnedRootId;
  }
  /** Say on the row what the tree is actually hung from, and move the menu's tick. */
  highlightRoot() {
    var a;
    if ((a = this.rootMenu) == null || a.setOptions(this.rootMenuOptions()), !this.rootPicker) return;
    const t = !!this.pinnedRootId, i = xr.find((l) => l.id === (t ? "selected" : Mr(this.rootFinder))), n = t ? this.pinnedRootName() : (i == null ? void 0 : i.label) ?? "", s = this.query(".pvt-physicsflyout-rootpick-icon"), o = this.query(".pvt-physicsflyout-rootpick-value");
    s && i && (s.innerHTML = i.icon), o && (o.textContent = n), this.rootPicker.title = t ? `The tree is hung from "${n}". Pick again to change it.` : `${i == null ? void 0 : i.label}: ${i == null ? void 0 : i.desc}`;
  }
  /**
   * What to hand `changeLayout` so a rebuilt tree hangs from the same place. A pin
   * travels as the id; otherwise the finder does, since a fresh `TreeLayout` starts from
   * the defaults and would silently go back to `MaxReachability`.
   */
  rootOptions() {
    return this.pinnedRootId ? { rootId: this.pinnedRootId } : { rootIdAlgorithmFinder: this.rootFinder };
  }
  /* ---------- physics ---------- */
  wirePhysics() {
    this.runButton && this.listen(this.runButton, "click", () => {
      this.sim.isEnabled() ? this.sim.disable() : this.sim.enable(), this.updateRunButton();
    });
    for (const t of mn) {
      const i = this.presetButtons.get(t);
      i && this.listen(i, "click", () => {
        t === "auto" ? this.sim.enableAutoPhysics() : this.sim.applyPhysicsPreset(t), this.refreshSliders(this.sim.getPhysicsKnobs()), this.highlightPreset(t);
      });
    }
    for (const t of Be) {
      const i = this.sliders.get(t.key);
      i && this.listen(i, "input", () => {
        const n = Number(i.value);
        t.set(this.sim, n), this.setSliderLabel(t.key, n), this.highlightPreset(null);
      });
    }
    this.autoSpacingButton && this.listen(this.autoSpacingButton, "click", () => {
      this.sim.enableAutoTreeSpacing(), this.refreshSpacingSliders(this.sim.getTreeSpacing()), this.setAutoSpacing(!0);
    });
    for (const t of He) {
      const i = this.spacingSliders.get(t.key);
      i && (this.listen(i, "input", () => {
        const n = Number(i.value);
        this.sim.setTreeSpacing({ [t.key]: n }), this.setSpacingLabel(t.key, n), this.setAutoSpacing(!1);
      }), this.listen(i, "change", () => this.uiManager.graph.renderer.fitAndCenterWhenSettled()));
    }
  }
  /**
   * Follow a tune the `Auto` preset just applied: move the sliders to what it
   * chose and keep the Auto button lit. Called by the simulation, not the user.
   * @private
   */
  syncAutoKnobs(t) {
    this.refreshSliders(t), this.highlightPreset("auto");
  }
  refreshSliders(t) {
    for (const i of Be) {
      const n = t[i.key], s = this.sliders.get(i.key);
      s && (s.value = String(n)), this.setSliderLabel(i.key, n);
    }
  }
  setSliderLabel(t, i) {
    const n = this.sliderValues.get(t);
    if (!n) return;
    const s = Be.find((o) => o.key === t);
    n.textContent = `${i}${(s == null ? void 0 : s.unit) ?? ""}`;
  }
  /**
   * Follow a tune the tree's `Auto` spacing just applied: move the sliders to what it
   * chose and keep the Auto button lit. Called by the layout, not the user.
   * @private
   */
  syncAutoSpacing(t) {
    this.refreshSpacingSliders(t), this.setAutoSpacing(!0);
  }
  setAutoSpacing(t) {
    var i, n;
    this.autoSpacing = t, (i = this.autoSpacingButton) == null || i.classList.toggle("active", t), (n = this.autoSpacingButton) == null || n.setAttribute("aria-pressed", String(t));
  }
  refreshSpacingSliders(t) {
    for (const i of He) {
      const n = t[i.key], s = this.spacingSliders.get(i.key);
      s && (s.value = String(n)), this.setSpacingLabel(i.key, n);
    }
  }
  setSpacingLabel(t, i) {
    const n = this.spacingValues.get(t);
    n && (n.textContent = `${i}×`);
  }
  highlightPreset(t) {
    for (const [i, n] of this.presetButtons)
      n.classList.toggle("active", i === t);
  }
  /** Re-sync the run/pause button with the live simulation state — e.g. after the
   *  slow-tick watchdog disables physics without going through the button. */
  syncRunState() {
    this.uiManager.graph.simulation && this.updateRunButton();
  }
  updateRunButton() {
    if (!this.runButton) return;
    const t = this.sim.isEnabled();
    this.runButton.innerHTML = t ? Vs : Ac, this.runButton.title = t ? "Pause physics" : "Resume physics", this.runButton.setAttribute("aria-pressed", String(t));
  }
  /**
   * Hand the controls to whichever half of the flyout the active layout listens
   * to: the physics presets + sliders grey out under a tree, and the spacing card
   * — which only a tree can honour — takes their place.
   */
  updateLayoutControls() {
    var n, s;
    const t = this.activeLayout !== "force", i = t && this.activeLayout !== "tree-r";
    (n = this.simulationCard) == null || n.classList.toggle("pvt-physicsflyout-disabled", t), (s = this.simulationCard) == null || s.classList.toggle("pvt-physicsflyout-collision-only", i);
    for (const [o, a] of this.sliders)
      a.disabled = t && !(i && o === Rp);
    for (const o of this.presetButtons.values()) o.disabled = t;
    this.rootRow && (this.rootRow.hidden = !t), this.spacingCard && (this.spacingCard.hidden = !t);
    for (const o of He) {
      const a = this.spacingSliders.get(o.key);
      a && (a.disabled = this.activeLayout === "tree-r" && !o.radial);
    }
  }
  /* ---------- template ---------- */
  template() {
    const t = vn.map((o) => `
            <button type="button" class="pvt-physicsflyout-layout" data-layout="${o.id}" aria-pressed="false" title="${o.desc}">
                <span class="pvt-flyout-icon">${o.icon}</span>${o.label}
            </button>`).join(""), i = mn.map((o) => {
      const a = Sr[o] ? `<span class="pvt-flyout-icon">${Sr[o]}</span>` : "";
      return `<button type="button" class="pvt-flyout-btn-group-btn pvt-physicsflyout-preset" data-preset="${o}" title="${_p[o]}">${a}${o[0].toUpperCase()}${o.slice(1)}</button>`;
    }).join(""), n = He.map((o) => `
            <div class="pvt-physicsflyout-slider" title="${o.desc}">
                <div class="pvt-physicsflyout-slider-head">
                    <span class="pvt-physicsflyout-slider-label"><span class="pvt-flyout-icon">${o.icon}</span>${o.label}</span>
                    <span class="pvt-physicsflyout-slider-value" data-value="${o.key}">1&times;</span>
                </div>
                <input type="range" class="pvt-physicsflyout-range" data-spacing="${o.key}"
                    min="${Ce[0]}" max="${Ce[1]}" step="0.1" value="1" />
            </div>`).join(""), s = Be.map((o) => `
            <div class="pvt-physicsflyout-slider" data-row="${o.key}" title="${o.desc}">
                <div class="pvt-physicsflyout-slider-head">
                    <span class="pvt-physicsflyout-slider-label"><span class="pvt-flyout-icon">${o.icon}</span>${o.label}</span>
                    <span class="pvt-physicsflyout-slider-value" data-value="${o.key}">0</span>
                </div>
                <input type="range" class="pvt-physicsflyout-range" data-slider="${o.key}"
                    min="${tt[o.key][0]}" max="${tt[o.key][1]}" step="${o.step}" value="0" />
            </div>`).join("");
    return this.headerRow(ho, "Physics") + this.sectionLabel("LAYOUT &amp; SIMULATION") + `
            <div class="pvt-physicsflyout-layouts">${t}</div>
            <div class="pvt-physicsflyout-rootrow" hidden>
                <span class="pvt-physicsflyout-rootrow-label">Root</span>
                <button type="button" class="pvt-physicsflyout-rootpick" aria-haspopup="menu">
                    <span class="pvt-flyout-icon pvt-physicsflyout-rootpick-icon"></span>
                    <span class="pvt-physicsflyout-rootpick-value"></span>
                    <span class="pvt-flyout-icon pvt-physicsflyout-rootpick-caret">${Ni}</span>
                </button>
            </div>
            <div class="pvt-flyout-card pvt-physicsflyout-spacing" hidden>
                <div class="pvt-flyout-card-head">
                    <span class="pvt-flyout-card-title">Spacing</span>
                    <button type="button" class="pvt-physicsflyout-autospacing active" aria-pressed="true"
                        title="${Dp}"><span class="pvt-flyout-icon">${Gn}</span>Auto</button>
                </div>
                <div class="pvt-physicsflyout-sliders">${n}</div>
            </div>
            <div class="pvt-flyout-card pvt-physicsflyout-card">
                <div class="pvt-flyout-card-head">
                    <span class="pvt-flyout-card-title">Simulation</span>
                    <button type="button" class="pvt-physicsflyout-run" title="Pause physics">${Vs}</button>
                </div>
                <div class="pvt-flyout-btn-group pvt-physicsflyout-presets">${i}</div>
                <div class="pvt-physicsflyout-sliders">${s}</div>
            </div>`;
  }
}
const Pp = 12, Bp = 24, Tr = 5e3, Hp = "Type";
class zp {
  constructor(e, t, i) {
    /** Stable identity: the filter-key suffix and the `legendToggle` section field. */
    c(this, "id");
    c(this, "uiManager");
    c(this, "config", {});
    /** Derive from `nodeTypeAccessor` without vetting the colours first. */
    c(this, "forced", !1);
    c(this, "entries", []);
    c(this, "rows", /* @__PURE__ */ new Map());
    /** Entry ids the user switched off. */
    c(this, "hiddenIds", /* @__PURE__ */ new Set());
    c(this, "collapsed", !1);
    /** Set once `collapsed` has been seeded, so a rebuild doesn't unfold the section. */
    c(this, "collapseSeeded", !1);
    /** Whether alt-clicking this section's chevron folds every section — a stack of one has nothing to offer. */
    c(this, "collapseAllOffered", !1);
    /** This section's own filter key, used unless a declared facet is adopted. */
    c(this, "reservedKey");
    /** The filter key in use: the reserved one, or a declared facet's when adopted. */
    c(this, "filterKey");
    /** The declared facet being driven, when the section's `key` names one. */
    c(this, "adoptedFacet");
    c(this, "facetRegistered", !1);
    /** Set while the section writes its own filter, so it doesn't read the echo back. */
    c(this, "applyingFilter", !1);
    /** Header text when `title` isn't set — depends on where the entries came from. */
    c(this, "titleFallback", "Legend");
    /** Warnings already emitted, so rebuilds don't spam the console. */
    c(this, "warned", /* @__PURE__ */ new Set());
    c(this, "block");
    c(this, "listElement");
    this.uiManager = e, this.id = t, this.reservedKey = i, this.filterKey = i;
  }
  /* ---------- configuration ---------- */
  /**
   * Adopt the section's latest options. `collapsed` seeds the fold state once and
   * then belongs to the user — a `dataBatchChanged` must not pop a folded section
   * back open.
   */
  setConfig(e, t) {
    this.config = e, this.forced = t, this.collapseSeeded || (this.collapsed = e.collapsed === !0, this.collapseSeeded = !0);
  }
  get filterable() {
    return this.config.filterable !== !1;
  }
  /** Which collection this section keys on, and therefore which facets it drives. */
  get scope() {
    return this.config.scope === "edge" ? "edge" : "node";
  }
  /** The key the query engine holds this section's filter under. */
  get engineKey() {
    return this.scope === "edge" ? At + this.filterKey : this.filterKey;
  }
  /**
   * The elements this section lists. A cluster's children live in its own subgraph,
   * and a synthetic stand-in carries no data — so neither is listed here; the real
   * edges a stand-in speaks for are counted directly.
   */
  items() {
    const e = this.uiManager.graph;
    return this.scope === "edge" ? e.getMutableEdges().filter((t) => {
      var i;
      return !((i = t.representedEdges) != null && i.length);
    }) : e.getMutableNodes().filter((t) => !t.isChild);
  }
  /** The header text: declared, else derived from wherever the entries came from. */
  get title() {
    return this.config.title ?? this.titleFallback;
  }
  get isCollapsed() {
    return this.collapsed;
  }
  /* ---------- rebuild ---------- */
  /**
   * Re-resolve the entries against the live graph and claim (or release) the filter
   * facet. Returns how many entries there are: a section with none renders nothing
   * at all rather than an empty box with a title, so the {@link Legend} skips it.
   */
  resolve() {
    this.resolveFilterKey(), this.entries = this.resolveEntries();
    const e = this.hiddenIds.size > 0;
    for (const t of [...this.hiddenIds])
      this.entries.some((i) => i.id === t) || this.hiddenIds.delete(t);
    return this.entries.length === 0 ? (e && this.removeOwnFilter(this.filterKey), this.hiddenIds.clear(), this.releaseFacet(), this.rows.clear(), this.block = void 0, this.listElement = void 0, 0) : (this.filterable ? this.claimFacet() : this.releaseFacet(), this.entries.length);
  }
  /**
   * Refresh the filter *value* so entries that just appeared are part of it. Only
   * when something is hidden: a section with nothing switched off must not clear a
   * filter another party (the panel, in adopted mode) owns.
   */
  refreshFilter() {
    this.filterable && this.hiddenIds.size > 0 && this.applyFilter(!1);
  }
  /** Drop everything this section holds — its facet, and any filter it was driving. */
  dispose() {
    var e;
    this.hiddenIds.size > 0 && this.removeOwnFilter(this.filterKey), this.releaseFacet(), this.hiddenIds.clear(), this.entries = [], this.rows.clear(), (e = this.block) == null || e.remove(), this.block = void 0, this.listElement = void 0;
  }
  /* ---------- entry resolution ---------- */
  resolveEntries() {
    const e = this.declaredEntries();
    if (e != null && e.length)
      return this.titleFallback = "Legend", this.fromDeclared(e, this.items());
    const t = this.config.key;
    return t !== void 0 ? (this.titleFallback = ct.niceLabelFromKey(t), this.derive((i) => Ar(i, t), t, this.items()).entries) : (this.titleFallback = Hp, this.deriveAutomatically());
  }
  /**
   * The section with neither `key` nor `entries`. It keys on
   * `render.nodeTypeAccessor` — the dimension the consumer already declared for
   * `nodeStyleMap`, so it is never a guess about their data.
   *
   * For the legend nobody asked for it then checks that this dimension really *is*
   * the colour dimension (see {@link explainsColors}): a legend that can't be shown
   * truthfully isn't shown at all, and says nothing about it. Inside a declared
   * group — or under `UI.legend: true` — the section was asked for, so the vetting
   * is skipped.
   */
  deriveAutomatically() {
    var l;
    const e = (l = this.uiManager.graph.renderer) == null ? void 0 : l.getOptions(), t = this.scope === "edge", i = t ? "edgeTypeAccessor" : "nodeTypeAccessor", n = t ? e == null ? void 0 : e.edgeTypeAccessor : e == null ? void 0 : e.nodeTypeAccessor;
    if (typeof n != "function")
      return this.forced && this.warnOnce(
        "auto-no-accessor",
        `Pivotick: this legend has nothing to list — declare \`render.${i}\`, or give the section a \`key\` / \`entries\`.`
      ), [];
    const s = this.items();
    if (!this.forced && s.length > Tr)
      return this.warnOnce(
        "auto-too-many-nodes",
        `Pivotick: not deriving a legend for ${s.length} elements (over ${Tr}); declare 'UI.legend' to have one anyway.`
      ), [];
    const o = n, a = this.derive((h) => o(h), i, s, !this.forced);
    return this.forced || this.explainsColors(a) ? a.entries : [];
  }
  /**
   * Does this dimension actually explain what the canvas looks like? Every
   * category must resolve to exactly one colour, there must be at least two
   * colours (or the colours aren't telling the categories apart), and few enough
   * categories to *be* categories — an id-like dimension yields one value per
   * node, each with its own colour, which would sail through the colour test.
   */
  explainsColors(e) {
    if (e.conflicted) return !1;
    const { entries: t } = e;
    return t.length < 2 || t.length > Bp ? !1 : new Set(t.map((i) => i.color)).size >= 2;
  }
  declaredEntries() {
    const { entries: e } = this.config;
    if (typeof e != "function") return e;
    try {
      return e(this.uiManager.graph);
    } catch (t) {
      return this.warnOnce("entries-threw", "Pivotick: the legend's entries function threw; the section is empty.", t), [];
    }
  }
  /** Declared entries: `key` (when given) supplies the predicate they don't carry. */
  fromDeclared(e, t) {
    const i = e.map((n, s) => ({ entry: n, order: n.order ?? s }));
    return i.sort((n, s) => n.order - s.order), i.map(({ entry: n }) => {
      const s = this.config.key, a = n.predicate ?? (s !== void 0 ? (h) => this.matchesValue(Ar(h, s), n.id) : void 0);
      a || this.warnOnce(
        `no-predicate-${n.id}`,
        `Pivotick: legend entry '${n.id}' has no predicate and its section declares no 'key', so it matches nothing.`
      );
      const l = this.guard(n.id, a ?? (() => !1));
      return {
        id: n.id,
        // An id is a data *value*, so it is shown as it is — like the filter
        // panel's own option labels. Only keys get prettified.
        label: n.label ?? n.id,
        color: n.color,
        predicate: l,
        count: t.reduce((h, d) => h + (l(d) ? 1 : 0), 0)
      };
    });
  }
  /**
   * Derived entries: one per distinct value `read` returns, each swatch sampled
   * from the colour the renderer resolved for the first node carrying that value.
   *
   * Blank values (`null` / `undefined` / `''`) get no entry — those nodes are
   * unrepresented, and the legend never hides them. A value rendering more than
   * one colour keeps the first, since the legend can only show one swatch.
   *
   * `label` names the dimension in warnings; `quiet` suppresses them for a section
   * that is only being *considered* (see {@link deriveAutomatically}).
   */
  derive(e, t, i, n = !1) {
    const s = this.guardRead(t, e), o = /* @__PURE__ */ new Map();
    let a = 0, l = !1;
    for (const d of i) {
      const u = s(d), p = Array.isArray(u) ? u : [u];
      let g = !1;
      for (const f of p) {
        if (f == null || f === "") continue;
        g = !0;
        const v = String(f), y = this.sampleColor(d), b = o.get(v);
        if (!b) {
          o.set(v, { color: y, count: 1, sample: this.scope === "edge" ? d : void 0 });
          continue;
        }
        b.count++, y !== b.color && (l = !0, n || this.warnOnce(
          `multi-color-${v}`,
          `Pivotick: legend category '${v}' (${t}) renders more than one colour; the legend shows the first (${b.color}). Declare 'entries' to give this section swatches of its own.`
        ));
      }
      g || a++;
    }
    if (a > 0 && !n) {
      const d = this.scope === "edge" ? "edge" : "node";
      this.warnOnce(
        `blank-${t}`,
        `Pivotick: ${a} ${d}(s) have no '${t}', so they have no legend entry and the legend cannot hide them.`
      );
    }
    return { entries: [...o].map(([d, { color: u, count: p, sample: g }]) => ({
      id: d,
      label: d,
      color: u,
      predicate: (f) => this.matchesValue(s(f), d),
      count: p,
      sample: g
    })), conflicted: l };
  }
  /**
   * The colour the renderer actually paints this element with, as a CSS colour — a
   * node's fill, or an edge's stroke.
   */
  sampleColor(e) {
    var s, o;
    const t = this.uiManager.graph.renderer, i = this.scope === "edge" ? (s = t == null ? void 0 : t.getEdgeStyle(e)) == null ? void 0 : s.strokeColor : (o = t == null ? void 0 : t.getNodeStyle(e)) == null ? void 0 : o.color;
    if (typeof i == "string") return i;
    const n = this.scope === "edge" ? "var(--pvt-edge-stroke, #999)" : "var(--pvt-node-color, #007acc)";
    return this.warnOnce(
      "unresolved-color",
      "Pivotick: the renderer returned an unresolved colour; legend swatches fall back to the theme colour."
    ), n;
  }
  /** Derived matching: a scalar equals the id, an array contains it (stringified). */
  matchesValue(e, t) {
    return Array.isArray(e) ? e.some((i) => String(i) === t) : e != null && String(e) === t;
  }
  /** Read a dimension without letting a consumer accessor's throw take the render down. */
  guardRead(e, t) {
    return (i) => {
      try {
        return t(i);
      } catch (n) {
        this.warnOnce(
          `read-threw-${e}`,
          `Pivotick: reading '${e}' for the legend threw; it lists nothing.`,
          n
        );
        return;
      }
    };
  }
  /** Run a consumer predicate without letting a throw take the render down. */
  guard(e, t) {
    return (i) => {
      try {
        return t(i);
      } catch (n) {
        return this.warnOnce(
          `predicate-threw-${e}`,
          `Pivotick: legend entry '${e}' predicate threw; it will match nothing.`,
          n
        ), !1;
      }
    };
  }
  warnOnce(e, t, i) {
    this.warned.has(e) || (this.warned.add(e), i !== void 0 ? console.warn(t, i) : console.warn(t));
  }
  /* ---------- filter wiring ---------- */
  /**
   * Decide which filter key this section drives. When its `key` names a declared
   * `select` / `multiselect` facet, that facet is adopted so the section and the
   * filter panel are two views of one filter; otherwise the section owns a
   * reserved predicate facet of its own.
   */
  resolveFilterKey() {
    const e = this.filterKey, t = this.config.key, i = this.uiManager.graph.queryEngine, n = t === void 0 ? void 0 : this.scope === "edge" ? i.getEdgeFacets().find((o) => o.key === t) : i.getFacets().find((o) => o.key === t), s = n === void 0 ? void 0 : n.type ?? (this.scope === "edge" ? "multiselect" : void 0);
    n && (s === "select" || s === "multiselect") ? (this.adoptedFacet = n, this.filterKey = n.key) : (n && this.warnOnce(
      `adopt-${n.key}`,
      `Pivotick: the legend's key '${n.key}' is a declared '${s}' facet, which can't hold a list of values; the legend filters on its own instead.`
    ), this.adoptedFacet = void 0, this.filterKey = this.reservedKey), e !== this.filterKey && (this.releaseFacet(e), this.removeOwnFilter(e));
  }
  /** Drop the filter under a bare key, on whichever side of the engine it lives. */
  removeOwnFilter(e) {
    const t = this.uiManager.graph.queryEngine;
    this.scope === "edge" ? t.removeEdgeFilter(e) : t.removeFilter(e);
  }
  /**
   * Register the reserved facet. Its predicate is *negative*: a node is hidden
   * when it matches a hidden entry, so a node no entry covers (a blank value) is
   * never hidden by the legend.
   */
  claimFacet() {
    if (this.adoptedFacet || this.facetRegistered) return;
    const e = this.uiManager.graph.queryEngine, t = (n, s) => {
      const o = new Set(this.toIdArray(s));
      return !this.entries.some((a) => !o.has(a.id) && a.predicate(n));
    }, i = {
      key: this.reservedKey,
      label: this.title,
      type: "multiselect",
      matchMode: "exact"
    };
    this.scope === "edge" ? e.registerEdgeFacet({ ...i, predicate: (n, s) => t(n, s) }) : e.registerFacet({ ...i, predicate: (n, s) => t(n, s) }), this.facetRegistered = !0;
  }
  releaseFacet(e = this.filterKey) {
    if (!this.facetRegistered || e !== this.reservedKey) return;
    const t = this.uiManager.graph.queryEngine;
    this.scope === "edge" ? t.unregisterEdgeFacet(this.reservedKey) : t.unregisterFacet(this.reservedKey), this.facetRegistered = !1;
  }
  toIdArray(e) {
    return Array.isArray(e) ? e.map((t) => String(t)) : e == null ? [] : typeof e == "object" ? [] : [String(e)];
  }
  /**
   * Write the visible ids to the filter. Nothing hidden ⇒ the filter is removed,
   * so `getFilters()` carries no phantom entry and the filter pill stays quiet.
   */
  applyFilter(e = !0) {
    var n;
    const t = this.uiManager.graph.queryEngine, i = this.entries.filter((s) => !this.hiddenIds.has(s.id)).map((s) => s.id);
    this.applyingFilter = !0;
    try {
      const s = { value: i, matchMode: ((n = this.adoptedFacet) == null ? void 0 : n.matchMode) ?? "exact" };
      this.hiddenIds.size === 0 ? this.removeOwnFilter(this.filterKey) : this.scope === "edge" ? t.setEdgeFilter(this.filterKey, s) : t.setFilter(this.filterKey, s);
    } finally {
      this.applyingFilter = !1;
    }
    this.applyEntryStates(), e && this.uiManager.graph.legendToggled({
      section: this.id,
      hidden: [...this.hiddenIds],
      visible: i
    });
  }
  /**
   * Re-derive which entries are lit from the live filters, so the section follows
   * `resetFilters()`, the filter panel, and programmatic `setFilter` calls.
   *
   * An **absent** filter means every entry is lit. An **empty list** means the
   * same in adopted mode (an empty multiselect is how the panel says "no
   * constraint"), but means "everything hidden" for a section's own key.
   */
  syncFromFilters(e) {
    if (this.applyingFilter || !this.filterable || this.entries.length === 0) return;
    const t = e[this.engineKey];
    if (t === void 0) {
      if (this.hiddenIds.size === 0) return;
      this.hiddenIds.clear(), this.applyEntryStates();
      return;
    }
    const i = this.toIdArray(t.value);
    i.length === 0 && this.adoptedFacet && this.scope !== "edge" ? this.hiddenIds.clear() : this.hiddenIds = new Set(this.entries.filter((n) => !i.includes(n.id)).map((n) => n.id)), this.applyEntryStates();
  }
  /* ---------- interaction ---------- */
  /** A click on one of this section's header buttons. */
  onAction(e) {
    e === "show-all" ? this.showAll() : e === "invert" ? this.invert() : e === "collapse" && this.setCollapsed(!this.collapsed);
  }
  /** A click on one of this section's entries; `solo` is the alt-click. */
  onEntryClick(e, t) {
    if (this.filterable) {
      if (t)
        this.hiddenIds = new Set(this.entries.filter((i) => i.id !== e).map((i) => i.id));
      else if (this.hiddenIds.has(e))
        this.hiddenIds.delete(e);
      else {
        if (this.wouldEmptyAdopted(this.visibleCount - 1)) return;
        this.hiddenIds.add(e);
      }
      this.applyFilter();
    }
  }
  showAll() {
    this.hiddenIds.size !== 0 && (this.hiddenIds.clear(), this.applyFilter());
  }
  invert() {
    this.wouldEmptyAdopted(this.hiddenIds.size) || (this.hiddenIds = new Set(this.entries.filter((e) => !this.hiddenIds.has(e.id)).map((e) => e.id)), this.applyFilter());
  }
  get visibleCount() {
    return this.entries.length - this.hiddenIds.size;
  }
  /**
   * An adopted facet cannot express "hide everything": an empty value list is how
   * the filter panel says *no constraint*, so writing it would show the whole graph
   * back. A toggle that would land there is refused instead (and its control
   * disabled) — a section's own key has no such limit.
   */
  wouldEmptyAdopted(e) {
    return this.scope === "edge" ? !1 : this.adoptedFacet !== void 0 && e <= 0;
  }
  setCollapsed(e) {
    this.collapsed !== e && (this.collapsed = e, this.applyCollapsed());
  }
  applyCollapsed() {
    var t, i;
    (t = this.block) == null || t.classList.toggle("pvt-legend-collapsed", this.collapsed);
    const e = (i = this.block) == null ? void 0 : i.querySelector(".pvt-legend-collapse");
    e == null || e.setAttribute("aria-expanded", String(!this.collapsed)), e == null || e.setAttribute("title", this.collapseTitle());
  }
  /* ---------- rendering ---------- */
  /** Build this section's block. Only called when {@link resolve} found entries. */
  render() {
    this.rows.clear();
    const e = w("div", {
      class: "pvt-legend-section",
      "data-section": this.id
    });
    e.classList.toggle("pvt-legend-static", !this.filterable), this.block = e, e.appendChild(this.renderHeader());
    const t = this.config.maxVisibleEntries ?? Pp;
    this.listElement = w("div", {
      class: "pvt-legend-list",
      // Cap the height in rows, then scroll — the canvas must never grow because
      // a category list got long. The half row of slack lets the next entry's
      // swatch peek through, which is what says "there is more below" without
      // slicing a label in half. Half, not a quarter: a row's first 6.5px are
      // the swatch's own leading space, so less than that shows nothing at all.
      style: `max-height: calc(${t + 0.5} * var(--pvt-legend-row-height))`
    });
    for (const i of this.entries) this.listElement.appendChild(this.renderEntry(i));
    return e.appendChild(this.listElement), this.applyCollapsed(), this.applyEntryStates(), e;
  }
  /** Told by the {@link Legend} whether alt-clicking the chevron folds every section. */
  setCollapseAllOffered(e) {
    this.collapseAllOffered = e;
  }
  collapseTitle() {
    const e = this.collapsed ? "Expand this section" : "Collapse this section";
    return this.collapseAllOffered ? `${e} (alt-click for every section)` : e;
  }
  renderHeader() {
    const e = this.title, t = [];
    if (this.filterable && (t.push(this.action("show-all", Wt, "Show every category")), t.push(this.action("invert", ko, "Invert which categories are shown"))), this.config.collapsible !== !1) {
      const i = this.action("collapse", Ni, this.collapseTitle());
      i.classList.add("pvt-legend-collapse"), i.setAttribute("aria-expanded", "true"), t.push(i);
    }
    return w("div", { class: "pvt-legend-header" }, [
      w("span", { class: "pvt-legend-title", title: e }, [e]),
      w("div", { class: "pvt-legend-actions" }, t)
    ]);
  }
  action(e, t, i) {
    const n = w("button", {
      type: "button",
      class: "pvt-legend-action",
      "data-action": e,
      title: i
    });
    return n.innerHTML = t, n;
  }
  /**
   * An entry's key: a dot for a node, a **line** for an edge — stroke colour, dash
   * and marker as the renderer resolved them. Both sit in the same fixed-width slot,
   * so a card stacking node and edge sections keeps its labels on one line.
   */
  renderSwatch(e) {
    var i;
    if (this.scope === "edge") {
      const n = e.sample !== void 0 ? (i = this.uiManager.graph.renderer) == null ? void 0 : i.getEdgeStyle(e.sample) : void 0;
      return ea(n ?? { strokeColor: e.color }, "pvt-legend-swatch-line");
    }
    const t = w("span", { class: "pvt-legend-swatch" });
    return t.style.setProperty("--pvt-legend-swatch-color", e.color), t;
  }
  renderEntry(e) {
    const t = [
      this.renderSwatch(e),
      w("span", { class: "pvt-legend-label" }, [e.label])
    ];
    this.config.showCounts !== !1 && t.push(w("span", { class: "pvt-legend-count" }, [String(e.count)]));
    const i = this.filterable ? w("button", { type: "button", class: "pvt-legend-entry", "data-id": e.id }, t) : w("div", { class: "pvt-legend-entry", "data-id": e.id }, t);
    return i.classList.toggle("pvt-legend-empty", e.count === 0), this.rows.set(e.id, i), i;
  }
  /** Push the hidden/shown state (and what is still clickable) onto the DOM. */
  applyEntryStates() {
    var i, n;
    for (const [s, o] of this.rows) {
      const a = this.entries.find((h) => h.id === s), l = this.hiddenIds.has(s);
      if (this.filterable) {
        o.setAttribute("aria-pressed", String(!l));
        const h = !l && this.wouldEmptyAdopted(this.visibleCount - 1), d = o;
        d.disabled = h, o.setAttribute("title", h ? "The last shown category can't be hidden while the legend drives the filter panel's facet." : l ? `Show ${(a == null ? void 0 : a.label) ?? s}` : `Hide ${(a == null ? void 0 : a.label) ?? s} (alt-click to show only this one)`);
      }
      o.classList.toggle("pvt-legend-hidden", l);
    }
    const e = (i = this.block) == null ? void 0 : i.querySelector('.pvt-legend-action[data-action="invert"]');
    e && (e.disabled = this.wouldEmptyAdopted(this.hiddenIds.size));
    const t = (n = this.block) == null ? void 0 : n.querySelector('.pvt-legend-action[data-action="show-all"]');
    t && (t.disabled = this.hiddenIds.size === 0);
  }
}
function Ar(r, e) {
  var t;
  return (t = r.getData()) == null ? void 0 : t[e];
}
const Nr = "__legend";
class aa extends it {
  constructor(t) {
    super(t);
    c(this, "slot");
    c(this, "panel");
    /** The live sections, in render order, keyed by section id. */
    c(this, "views", /* @__PURE__ */ new Map());
    c(this, "rebuildFrame", null);
    /** Set for the length of a rebuild, so a filter it writes isn't read back mid-flight. */
    c(this, "rebuilding", !1);
    /** Warnings already emitted, so rebuilds don't spam the console. */
    c(this, "warned", /* @__PURE__ */ new Set());
  }
  /* ---------- lifecycle ---------- */
  onMount(t) {
    t && (this.slot = t, this.panel = w("div", { class: "pvt-legend-panel" }), t.appendChild(this.panel), this.listen(this.panel, "click", (i) => this.onPanelClick(i)));
  }
  onPanelClick(t) {
    const i = t.target, n = i.closest(".pvt-legend-section"), s = (n == null ? void 0 : n.dataset.section) !== void 0 ? this.views.get(n.dataset.section) : void 0;
    if (!s) return;
    const o = i.closest(".pvt-legend-action");
    if (o) {
      const l = o.dataset.action;
      if (l === "collapse" && t.altKey && this.views.size > 1) {
        const h = !s.isCollapsed;
        for (const d of this.views.values()) d.setCollapsed(h);
        return;
      }
      (l === "show-all" || l === "invert" || l === "collapse") && s.onAction(l);
      return;
    }
    const a = i.closest(".pvt-legend-entry");
    a != null && a.dataset.id && s.onEntryClick(a.dataset.id, t.altKey);
  }
  onAfterMount() {
    const t = this.uiManager.graph, i = () => this.queueRebuild();
    t.on("dataBatchChanged", i), this.track(() => t.off("dataBatchChanged", i));
    const n = (s) => this.syncFromFilters(s);
    t.queryEngine.on("filterChange", n), this.track(() => t.queryEngine.off("filterChange", n)), this.queueRebuild();
  }
  onGraphReady() {
    this.queueRebuild();
  }
  onDestroy() {
    var t;
    this.rebuildFrame !== null && cancelAnimationFrame(this.rebuildFrame), this.rebuildFrame = null, this.clear(), (t = this.panel) == null || t.remove(), this.panel = void 0;
  }
  /* ---------- public API ---------- */
  /**
   * Re-read `UI.legend` and rebuild. Called by `graph.setLegend`, which has
   * already replaced the options block.
   */
  refresh() {
    this.rebuild();
  }
  /* ---------- configuration ---------- */
  /**
   * `UI.legend` normalised: `false` (or `enabled: false`) means no legend, an
   * object with `sections` is the stacked form, and `true` / absent / an object
   * with no `key` or `entries` all mean "work out what to list".
   */
  get config() {
    const t = this.uiManager.getOptions().legend;
    if (t !== !1) {
      if (t === void 0 || t === !0)
        return { sections: this.identify([{}]), forced: t === !0, grouped: !1 };
      if (t.enabled !== !1) {
        if ("sections" in t) {
          const i = t.sections.filter((n) => n.enabled !== !1);
          return {
            position: t.position,
            sections: this.identify(i),
            forced: !1,
            grouped: !0
          };
        }
        return {
          position: t.position,
          sections: this.identify([t]),
          forced: !1,
          grouped: !1
        };
      }
    }
  }
  /**
   * Give every section a stable id — its own `id`, else its `key`, else its place
   * in the stack. Two sections keying on `nodeTypeAccessor` would be the same list
   * twice, so only the first survives.
   */
  identify(t) {
    const i = /* @__PURE__ */ new Set(), n = [];
    let s = !1;
    return t.forEach((o, a) => {
      if (o.key === void 0 && o.entries === void 0) {
        if (s) {
          this.warnOnce(
            "duplicate-auto",
            "Pivotick: only one legend section can key on `render.nodeTypeAccessor`; give the others a `key` or `entries`. The extra section is dropped."
          );
          return;
        }
        s = !0;
      }
      let l = o.id ?? o.key ?? `section-${a}`;
      i.has(l) && (this.warnOnce(
        `duplicate-id-${l}`,
        `Pivotick: two legend sections resolve to the id '${l}'; the second is renamed '${l}-${a}'. Declare 'id' to choose.`
      ), l = `${l}-${a}`), i.add(l), n.push({ id: l, config: o });
    }), n;
  }
  warnOnce(t, i) {
    this.warned.has(t) || (this.warned.add(t), console.warn(i));
  }
  /* ---------- rebuild ---------- */
  queueRebuild() {
    this.rebuildFrame === null && (this.rebuildFrame = requestAnimationFrame(() => {
      this.rebuildFrame = null, this.rebuild();
    }));
  }
  rebuild() {
    var i;
    if (!this.panel) return;
    const t = this.config;
    if (!t) {
      this.clear();
      return;
    }
    this.rebuilding = !0;
    try {
      (i = this.slot) == null || i.setAttribute("data-position", t.position ?? "bottom-left"), this.syncViews(t);
      const n = [...this.views.values()].filter((s) => s.resolve() > 0);
      this.panel.innerHTML = "";
      for (const s of n)
        s.setCollapseAllOffered(n.length > 1), this.panel.appendChild(s.render());
      this.panel.classList.toggle("pvt-legend-stacked", n.length > 1), this.warnOnTitleCollision(n);
    } finally {
      this.rebuilding = !1;
    }
    for (const n of this.views.values()) n.refreshFilter();
  }
  /**
   * Reconcile the live sections against the config **by id**, so a rebuild keeps
   * what the user did — which categories are off, which sections are folded — and
   * a section that left the config releases its facet and drops its filter.
   */
  syncViews(t) {
    const i = /* @__PURE__ */ new Map();
    for (const { id: n, config: s } of t.sections) {
      const o = t.grouped ? `${Nr}:${n}` : Nr;
      let a = this.views.get(n);
      a && a.reservedKey !== o && (a.dispose(), a = void 0), a || (a = new zp(this.uiManager, n, o)), a.setConfig(s, t.forced), i.set(n, a);
    }
    for (const [n, s] of this.views)
      i.get(n) !== s && s.dispose();
    this.views = i;
  }
  /** Empty the legend without tearing the component down (`setLegend(undefined)`). */
  clear() {
    for (const t of this.views.values()) t.dispose();
    this.views.clear(), this.panel && (this.panel.innerHTML = "", this.panel.classList.remove("pvt-legend-stacked"));
  }
  /**
   * Two sections headed the same thing are unreadable, and it is easy to land on:
   * declared entries fall back to `'Legend'` whatever they list.
   */
  warnOnTitleCollision(t) {
    if (t.length < 2) return;
    const i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const s = i.get(n.title);
      if (s !== void 0) {
        this.warnOnce(
          `title-${n.title}`,
          `Pivotick: legend sections '${s}' and '${n.id}' are both headed '${n.title}'; give one a 'title'.`
        );
        continue;
      }
      i.set(n.title, n.id);
    }
  }
  syncFromFilters(t) {
    if (!this.rebuilding)
      for (const i of this.views.values()) i.syncFromFilters(t);
  }
}
const Ir = 200, yn = 120, $p = 0.35, _r = 2.4, Gp = 2.1, Up = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M2.5 7.5L6 4l3.5 3.5"/></svg>';
class la extends it {
  constructor(t, i = {}) {
    super(t);
    c(this, "options");
    c(this, "root");
    c(this, "divider");
    c(this, "header");
    c(this, "tabStrip");
    c(this, "toolbar");
    c(this, "body");
    c(this, "toggle");
    /** The tab on show, or `null` while the registry is empty. */
    c(this, "activeId", null);
    /**
     * Each tab's body, built on first activation and kept — so a tab holds its own
     * state (its scroll position included) across a detour through another one.
     */
    c(this, "bodies", /* @__PURE__ */ new Map());
    /** One handle per tab, so a tab that stashed its handle keeps a live one. */
    c(this, "handles", /* @__PURE__ */ new Map());
    /**
     * What the *active tab* put in the toolbar, so a swap takes back only what it
     * added. Anything else in the slot belongs to someone else and is left alone.
     */
    c(this, "toolbarItems", []);
    c(this, "open");
    c(this, "collapsed");
    /** Whether the collapsed state follows the available room (`collapsed: 'auto'`). */
    c(this, "autoCollapse");
    /** Latched by the first explicit collapse/expand, which ends {@link autoCollapse}. */
    c(this, "userChose", !1);
    /** Occupants watching the fold, via {@link onCollapsedChange}. */
    c(this, "collapseWatchers", /* @__PURE__ */ new Set());
    /** Expanded height in px, resolved from `options.height` once the layout is measured. */
    c(this, "height", null);
    c(this, "observer");
    /** Pointer id held for the duration of a divider drag. */
    c(this, "dragPointer", null);
    this.options = i, this.open = i.open !== !1;
    const n = i.open === void 0;
    this.autoCollapse = !n && (i.collapsed === void 0 || i.collapsed === "auto"), this.collapsed = n || i.collapsed === !0;
  }
  /** What the region is called on the controls it draws itself. */
  get label() {
    return this.options.label ?? "dock";
  }
  /* ---------- lifecycle ---------- */
  onMount(t) {
    t && (this.root = document.createElement("div"), this.root.className = "pvt-dock", this.divider = document.createElement("div"), this.divider.className = "pvt-dock-divider", this.divider.setAttribute("role", "separator"), this.divider.setAttribute("aria-orientation", "horizontal"), this.divider.setAttribute("aria-label", `Resize the ${this.label}`), this.root.appendChild(this.divider), this.header = document.createElement("div"), this.header.className = "pvt-dock-header", this.root.appendChild(this.header), this.toggle = document.createElement("button"), this.toggle.type = "button", this.toggle.className = "pvt-dock-toggle", this.toggle.innerHTML = Up, this.listen(this.toggle, "click", () => {
      this.userChose = !0, this.setCollapsed(!this.collapsed);
    }), this.header.appendChild(this.toggle), this.tabStrip = document.createElement("div"), this.tabStrip.className = "pvt-dock-tabs", this.tabStrip.setAttribute("role", "tablist"), this.listen(this.tabStrip, "click", (i) => {
      var o;
      const n = i.target, s = (o = n == null ? void 0 : n.closest(".pvt-dock-tab")) == null ? void 0 : o.dataset.tab;
      s && this.setActive(s, !1);
    }), this.header.appendChild(this.tabStrip), this.toolbar = document.createElement("div"), this.toolbar.className = "pvt-dock-toolbar", this.header.appendChild(this.toolbar), this.body = document.createElement("div"), this.body.className = "pvt-dock-body", this.root.appendChild(this.body), t.appendChild(this.root), this.wireDivider(), this.observeRoom(), this.track(this.uiManager.onDockTabsChanged((i) => this.onTabsChanged(i))), this.syncTabs(), this.apply());
  }
  onAfterMount() {
    this.track(this.uiManager.keyManager.register({
      key: "Shift+T",
      callback: () => {
        this.userChose = !0;
        const t = this.open && !this.collapsed;
        this.open || this.setOpen(!0), this.setCollapsed(t);
      }
    }));
  }
  onDestroy() {
    var t, i;
    (t = this.observer) == null || t.disconnect(), this.observer = void 0, this.collapseWatchers.clear(), this.clearToolbar();
    for (const n of this.bodies.values()) n.remove();
    this.bodies.clear(), this.handles.clear(), this.activeId = null, this.writeHeight(0), (i = this.root) == null || i.remove(), this.root = void 0, this.divider = void 0, this.header = void 0, this.tabStrip = void 0, this.toolbar = void 0, this.body = void 0, this.toggle = void 0;
  }
  /* ---------- what the occupant gets ---------- */
  /**
   * Watch the fold. `pvt-dock-collapsed` on the root is what hides the chrome, so an
   * occupant only needs this for what CSS cannot do — dismissing a popover, say.
   * Returns an unsubscribe.
   */
  onCollapsedChange(t) {
    return this.collapseWatchers.add(t), () => this.collapseWatchers.delete(t);
  }
  /* ---------- tabs ---------- */
  /** The registry is the truth; the dock only draws it. */
  tabs() {
    return this.uiManager.getDockTabs();
  }
  /** Which tab is on show, if any. */
  getActiveTabId() {
    return this.activeId;
  }
  onTabsChanged(t) {
    if (t.type === "activate") return this.setActive(t.id, !0);
    if (t.type === "refresh") return this.refreshTab(t.id);
    t.type === "remove" && this.forgetTab(t.tab), this.syncTabs();
  }
  /**
   * Rebuild a tab from its `render` **and** its `toolbar`. This is what lets a pane
   * switch between views of its own — the table's `Nodes` / `Edges` — without the dock
   * being left holding a stale element to re-attach on the next activation.
   *
   * The toolbar goes with it because a pane's controls usually *are* the switch:
   * rebuilding only the body leaves the control showing the view you just left. Same
   * reasoning as `refreshPanel`, which re-resolves a panel's title as well as its body.
   *
   * A tab that is not on show just loses its cached body; it will be rebuilt when it
   * next comes to the front, which is the same work either way.
   */
  refreshTab(t) {
    var o;
    const i = this.tabs().find((a) => a.id === t);
    if (!i) return;
    const n = this.bodies.get(t);
    if (this.bodies.delete(t), this.activeId !== t) return void (n == null ? void 0 : n.remove());
    const s = i.render(this.handleFor(i));
    this.bodies.set(t, s), n == null || n.remove(), (o = this.body) == null || o.appendChild(s), this.clearToolbar(), this.fillToolbar(i);
  }
  /** Redraw the strip, and make sure something is on show if anything can be. */
  syncTabs() {
    const t = this.tabs();
    this.activeId !== null && !t.some((n) => n.id === this.activeId) && (this.activeId = null), this.activeId === null && t.length && this.setActive(t[0].id, !1), this.renderStrip(), this.apply();
  }
  /**
   * Put a tab on show: detach the outgoing body, attach the incoming one, and swap the
   * header controls with it.
   *
   * @param reveal - Also bring the region into view (open it, unfold it). Only an
   * explicit `activateDockTab` does this; auto-selection never does.
   */
  setActive(t, i) {
    var o, a, l;
    const n = this.tabs(), s = n.find((h) => h.id === t);
    if (s && this.body && this.activeId !== t) {
      const h = n.find((u) => u.id === this.activeId);
      h && (this.clearToolbar(), (o = this.bodies.get(h.id)) == null || o.remove(), (a = h.onDeactivate) == null || a.call(h, this.handleFor(h))), this.activeId = t;
      let d = this.bodies.get(t);
      d || (d = s.render(this.handleFor(s)), this.bodies.set(t, d)), this.body.appendChild(d), this.fillToolbar(s), (l = s.onActivate) == null || l.call(s, this.handleFor(s)), this.renderStrip();
    }
    i && (this.open || this.setOpen(!0), this.collapsed && this.setCollapsed(!1));
  }
  /** Drop everything held for a tab that has left the registry. */
  forgetTab(t) {
    var i, n;
    this.activeId === t.id && (this.clearToolbar(), this.activeId = null, (i = t.onDeactivate) == null || i.call(t, this.handleFor(t))), (n = this.bodies.get(t.id)) == null || n.remove(), this.bodies.delete(t.id), this.handles.delete(t.id);
  }
  fillToolbar(t) {
    const i = this.toolbar;
    if (!i || !t.toolbar) return;
    const n = t.toolbar(this.handleFor(t));
    for (const s of Array.isArray(n) ? n : [n])
      i.appendChild(s), this.toolbarItems.push(s);
  }
  /**
   * Take back only what the active tab put in the slot. Anything else there belongs
   * to someone else — and `display: contents` means an emptied slot still costs
   * nothing, not even a flex gap, which is what keeps a swap invisible.
   */
  clearToolbar() {
    for (const t of this.toolbarItems) t.remove();
    this.toolbarItems = [];
  }
  /**
   * One handle per tab, kept — so a tab that stashed the handle its `render` was
   * given still holds a live one on its next activation.
   */
  handleFor(t) {
    const i = this.handles.get(t.id);
    if (i) return i;
    const n = () => this.activeId === t.id, s = {
      id: t.id,
      get active() {
        return n();
      },
      // Through the registry rather than straight to `setActive`, so a tab driving
      // itself takes the same path as everyone else.
      activate: () => this.uiManager.activateDockTab(t.id),
      refresh: () => this.uiManager.refreshDockTab(t.id),
      remove: () => this.uiManager.removeDockTab(t.id)
    };
    return this.handles.set(t.id, s), s;
  }
  renderStrip() {
    const t = this.tabStrip;
    if (!t) return;
    t.innerHTML = "";
    const i = this.tabs();
    if (!(i.length < 2))
      for (const n of i) {
        const s = document.createElement("button");
        s.type = "button", s.className = "pvt-dock-tab", s.dataset.tab = n.id, s.textContent = n.label;
        const o = n.id === this.activeId;
        s.classList.toggle("active", o), s.setAttribute("role", "tab"), s.setAttribute("aria-selected", String(o)), t.appendChild(s);
      }
  }
  /* ---------- open / collapse ---------- */
  /** Whether the dock is showing at all (collapsed still counts as open). */
  isOpen() {
    return this.open;
  }
  isCollapsed() {
    return this.collapsed;
  }
  setOpen(t) {
    if (this.open === t) return;
    this.open = t;
    const i = this.collapsed;
    t && this.autoCollapse && !this.userChose && (this.collapsed = !this.hasRoom(_r)), this.apply(), this.collapsed !== i && this.emitCollapsed();
  }
  toggleOpen() {
    this.setOpen(!this.open);
  }
  setCollapsed(t) {
    this.collapsed !== t && (this.collapsed = t, this.apply(), this.emitCollapsed());
  }
  emitCollapsed() {
    for (const t of [...this.collapseWatchers]) t(this.collapsed);
  }
  /* ---------- geometry ---------- */
  /**
   * Push the current state into the layout. One custom property drives the grid row,
   * so opening, collapsing and resizing are all the same operation.
   */
  apply() {
    var i, n, s, o, a;
    (i = this.root) == null || i.classList.toggle("pvt-dock-collapsed", this.collapsed), (n = this.root) == null || n.classList.toggle("pvt-dock-open", this.open), (s = this.toggle) == null || s.setAttribute("aria-expanded", String(!this.collapsed)), (o = this.toggle) == null || o.setAttribute("title", `${this.collapsed ? "Expand" : "Collapse"} the ${this.label}`);
    const t = this.tabs().length === 0;
    if ((a = this.root) == null || a.classList.toggle("pvt-dock-empty", t), t) return this.writeHeight(0);
    if (!this.open) return this.writeHeight(0);
    if (this.collapsed) return this.writeHeight(this.headerHeight());
    this.writeHeight(this.clampHeight(this.height ?? this.preferredHeight()));
  }
  writeHeight(t) {
    var i;
    (i = this.layoutRoot()) == null || i.style.setProperty("--pvt-dock-height", `${t}px`);
  }
  layoutRoot() {
    var t;
    return (t = this.root) == null ? void 0 : t.closest(".pvt-layout");
  }
  /** Total height the canvas and the dock share. */
  availableHeight() {
    var t;
    return ((t = this.layoutRoot()) == null ? void 0 : t.getBoundingClientRect().height) ?? 0;
  }
  headerHeight() {
    var i;
    const t = ((i = this.header) == null ? void 0 : i.getBoundingClientRect().height) ?? 0;
    return t > 0 ? t : 34;
  }
  /** `options.height` resolved: a fraction of the shared height, or a pixel count. */
  preferredHeight() {
    const t = this.options.height ?? $p;
    return t > 0 && t <= 1 ? this.availableHeight() * t : t;
  }
  /**
   * Keep the dock between its own minimum and whatever leaves the canvas its floor.
   * On a layout too short for both, the canvas wins — it is the one that breaks.
   */
  clampHeight(t) {
    const i = this.availableHeight() - Ir;
    return i <= yn ? Math.max(0, Math.min(t, Math.max(i, 0))) : Math.min(Math.max(t, yn), i);
  }
  /** Whether the layout can spare `ratio` docks' worth of room on top of the canvas floor. */
  hasRoom(t) {
    const i = this.availableHeight();
    return i === 0 ? !0 : i - Ir >= yn * t;
  }
  /**
   * Follow the available room while the collapsed state is still ours to choose. Two
   * thresholds, so a layout hovering on the boundary doesn't flap.
   */
  observeRoom() {
    const t = this.layoutRoot();
    !t || typeof ResizeObserver > "u" || (this.observer = new ResizeObserver(() => {
      if (this.autoCollapse && !this.userChose && this.open) {
        if (!this.collapsed && !this.hasRoom(Gp)) return this.setCollapsed(!0);
        if (this.collapsed && this.hasRoom(_r)) return this.setCollapsed(!1);
      }
      this.open && !this.collapsed && this.apply();
    }), this.observer.observe(t));
  }
  /* ---------- the divider ---------- */
  wireDivider() {
    const t = this.divider;
    if (!t) return;
    this.listen(t, "pointerdown", (n) => {
      const s = n;
      this.userChose = !0, this.collapsed && this.setCollapsed(!1), this.dragPointer = s.pointerId, t.setPointerCapture(s.pointerId), t.classList.add("pvt-dock-divider-dragging"), s.preventDefault();
    }), this.listen(t, "pointermove", (n) => {
      var a;
      const s = n;
      if (this.dragPointer !== s.pointerId) return;
      const o = ((a = this.layoutRoot()) == null ? void 0 : a.getBoundingClientRect().bottom) ?? 0;
      this.height = this.clampHeight(o - s.clientY), this.writeHeight(this.height);
    });
    const i = (n) => {
      const s = n;
      this.dragPointer === s.pointerId && (t.releasePointerCapture(s.pointerId), t.classList.remove("pvt-dock-divider-dragging"), this.dragPointer = null);
    };
    this.listen(t, "pointerup", i), this.listen(t, "pointercancel", i);
  }
}
function ns(r) {
  const e = r.getOptions().table;
  return !e || typeof e != "object" ? !0 : e.nested !== !1;
}
function qp(r, e) {
  var n;
  const t = e.ancestorChain();
  if (t.length === 0) return !1;
  const i = t.find((s) => !s.expanded);
  if (i) {
    const s = ((n = i.parentNode) == null ? void 0 : n.getSubgraph()) ?? r;
    s.toggleExpandNode(s.getMutableNode(i.id) ?? i);
  }
  return r.focusElement(t[0]), i !== void 0;
}
const wt = {
  label: "pvt:label",
  degree: "pvt:degree",
  degreeIn: "pvt:degreeIn",
  degreeOut: "pvt:degreeOut",
  visibility: "pvt:visibility",
  pinned: "pvt:pinned",
  children: "pvt:children",
  cluster: "pvt:cluster",
  source: "pvt:source",
  target: "pvt:target"
}, ui = wt.visibility, jp = wt.label, Wp = /* @__PURE__ */ new Set(["label"]), pi = 96, Ut = {
  /** The element's display name, as the rest of the UI resolves it. */
  label: { key: wt.label, label: "Label", type: "text", sortable: !0 },
  /** Total edges touching the node. */
  degree: { key: wt.degree, label: "Degree", type: "numberRange", align: "right", accessor: (r) => r.degree(), width: pi },
  /** Edges pointing at the node. */
  degreeIn: { key: wt.degreeIn, label: "In", type: "numberRange", align: "right", accessor: (r) => r.getEdgesIn().length, width: pi },
  /** Edges leaving the node. */
  degreeOut: { key: wt.degreeOut, label: "Out", type: "numberRange", align: "right", accessor: (r) => r.getEdgesOut().length, width: pi },
  /**
   * Whether the element is on the canvas, and if not, why — for a node, `filtered` by
   * the filter panel or `excluded` by hand; for an edge, `filtered` when its layer is
   * off or `endpoint` when an end of it has left. The dock lists hidden elements rather
   * than hiding them, so this is how you tell them apart.
   *
   * Narrow and fixed-width: it leads the derived column set as a status gutter, so it
   * should not eat the room the name needs.
   */
  visibility: { key: wt.visibility, label: "Visibility", type: "select", sortable: !0, width: 104 },
  /** Whether the node is pinned in place. */
  pinned: { key: wt.pinned, label: "Pinned", type: "boolean", accessor: (r) => typeof r.fx == "number" && typeof r.fy == "number" },
  /**
   * How many nodes a cluster holds directly — `0` for a leaf.
   *
   * Nothing else in the UI says how big a cluster is: not the label, not the tooltip,
   * not the sidebar. Without this the only way to find out is to expand it, which is
   * the exact "read the value instead of hunting for it" the dock exists for.
   *
   * Direct children, not the whole subtree, so it matches the structure a nested
   * cluster's own row then reports one level down.
   */
  children: { key: wt.children, label: "Children", type: "numberRange", align: "right", accessor: (r) => r.children.length, width: pi },
  /**
   * The clusters a nested node sits inside, outermost first — empty for a node of the
   * root graph. The `flat` nested mode's answer to "where is this row from", since flat
   * rows carry no structure of their own.
   */
  cluster: { key: wt.cluster, label: "Cluster", type: "text" },
  /** An edge's origin, by display name. */
  source: { key: wt.source, label: "Source", type: "text" },
  /** An edge's destination, by display name. */
  target: { key: wt.target, label: "Target", type: "text" }
};
function Vp(r, e) {
  return e.queryEngine.getExcludedNodes().some((t) => t.id === r.id) ? "excluded" : r.isChild ? r.canvasRepresentative() === r ? "visible" : "nested" : r.visible ? "visible" : "filtered";
}
function Kp(r) {
  return r.visible ? "visible" : r.visibleIgnoringLayer ? "filtered" : "endpoint";
}
function Rr(r, e) {
  const t = e.graph, i = e.getOptions().mainHeader;
  return r.map((n) => {
    if (n.accessor) return n;
    switch (n.key) {
      case wt.label:
        return { ...n, accessor: (s) => ze(s) ? be(s, i) : ot(s, i) };
      case wt.visibility:
        return { ...n, accessor: (s) => ze(s) ? Kp(s) : Vp(s, t) };
      case wt.source:
        return { ...n, accessor: (s) => ze(s) ? ot(s.from, i) : "" };
      case wt.target:
        return { ...n, accessor: (s) => ze(s) ? ot(s.to, i) : "" };
      case wt.cluster:
        return { ...n, accessor: (s) => ze(s) ? "" : Xp(s, i) };
      default:
        return n;
    }
  });
}
const Yp = " / ";
function Xp(r, e) {
  return r.ancestorChain().map((t) => ot(t, e)).join(Yp);
}
function ze(r) {
  return r.from !== void 0;
}
function Zp(r, e) {
  const t = r.getOptions(), i = e === "nodes" ? t.table && typeof t.table == "object" ? t.table.columns : void 0 : t.table && typeof t.table == "object" ? t.table.edgeColumns : void 0;
  if (i != null && i.length)
    return Rr(i, r);
  const n = e === "nodes" ? [Ut.visibility, Ut.label] : [Ut.visibility, Ut.source, Ut.label, Ut.target], s = e === "nodes" ? [Ut.degree] : [];
  return e === "nodes" && r.graph.getMutableNodes().some((o) => o.isParent) && (s.push(Ut.children), ns(r) && n.push(Ut.cluster)), Rr([...n, ...Qp(r, e), ...s], r).map((o) => ({ ...o, filterable: !0 }));
}
function Qp(r, e) {
  var a, l;
  const t = r.getOptions(), i = r.graph, n = (a = t.filter) == null ? void 0 : a.facets;
  if (e === "nodes" && (n != null && n.length))
    return [...n].sort((h, d) => (h.order ?? 0) - (d.order ?? 0)).map((h) => ({
      key: h.key,
      label: h.label ?? ct.niceLabelFromKey(h.key),
      type: h.type,
      // A facet carrying only a `predicate` decides membership; it cannot produce
      // a cell. Fall back to the data key and let the reader see what is there.
      accessor: h.accessor
    }));
  const s = ns(r), o = e === "nodes" ? i.getMutableNodes().filter((h) => s || !h.isChild) : i.getMutableEdges();
  return ia(o, (l = t.filter) == null ? void 0 : l.excludeKeys).filter((h) => !Wp.has(h.key)).sort((h, d) => d.count - h.count).map((h) => ({
    key: h.key,
    label: ct.niceLabelFromKey(h.key),
    type: na(h).type,
    align: h.range ? "right" : void 0
  }));
}
function Jp(r, e) {
  var t;
  return r.accessor ? r.accessor(e) : (t = e.getData()) == null ? void 0 : t[r.key];
}
const tg = 50;
function Lr(r) {
  if (!r) return !1;
  switch (r.kind) {
    case "text":
      return r.needle.trim() !== "";
    case "value":
      return r.value !== "";
    case "range":
      return r.min !== null || r.max !== null;
  }
}
function eg(r, e) {
  if (e == null) return !1;
  switch (r.kind) {
    case "text":
      return String(e).toLowerCase().includes(r.needle.trim().toLowerCase());
    case "value":
      return Array.isArray(e) ? e.some((t) => String(t) === r.value) : String(e) === r.value;
    case "range": {
      const t = typeof e == "number" ? e : Number(e);
      return !(!Number.isFinite(t) || r.min !== null && t < r.min || r.max !== null && t > r.max);
    }
  }
}
function ig(r) {
  const e = /* @__PURE__ */ new Set();
  for (const t of r)
    if (t != null) {
      for (const i of Array.isArray(t) ? t : [t]) {
        const n = String(i);
        n !== "" && e.add(n);
      }
      if (e.size > tg) return [];
    }
  return [...e].sort((t, i) => t.localeCompare(i, void 0, { numeric: !0 }));
}
function ng(r, e, t) {
  return r.type === "numberRange" ? "range" : (r.type === "select" || r.type === "multiselect" || r.type === "boolean") && (e.length > 0 || (t == null ? void 0 : t.kind) === "value") ? "choice" : "text";
}
function sg(r, e, t, i) {
  const s = `Narrow the rows by ${r.label ?? r.key}`;
  switch (ng(r, t, e)) {
    case "range":
      return ag(e, s, i);
    case "choice":
      return og(e, t, s, i);
    default:
      return rg(e, s, i);
  }
}
function rg(r, e, t) {
  const i = document.createElement("input");
  return i.type = "text", i.className = "pvt-table-filter", i.dataset.role = "text", i.placeholder = "Filter rows…", i.title = e, i.value = (r == null ? void 0 : r.kind) === "text" ? r.needle : "", i.addEventListener("input", () => {
    t(i.value.trim() === "" ? void 0 : { kind: "text", needle: i.value });
  }), i;
}
function og(r, e, t, i) {
  const n = document.createElement("div");
  n.className = "pvt-table-filter-choice-wrap";
  const s = document.createElement("select");
  s.className = "pvt-table-filter pvt-table-filter-choice", s.dataset.role = "value", s.title = t;
  const o = document.createElement("option");
  o.value = "", o.textContent = "All", s.appendChild(o);
  for (const l of e) {
    const h = document.createElement("option");
    h.value = l, h.textContent = l, s.appendChild(h);
  }
  const a = (r == null ? void 0 : r.kind) === "value" ? r.value : "";
  if (a !== "" && !e.includes(a)) {
    const l = document.createElement("option");
    l.value = a, l.textContent = a, s.appendChild(l);
  }
  return s.value = a, s.addEventListener("change", () => {
    i(s.value === "" ? void 0 : { kind: "value", value: s.value });
  }), n.appendChild(s), n;
}
function ag(r, e, t) {
  const i = (r == null ? void 0 : r.kind) === "range" ? r : { min: null, max: null }, n = document.createElement("div");
  n.className = "pvt-table-filter-range", n.title = e;
  const s = () => {
    const l = Or(o.value), h = Or(a.value);
    t(l === null && h === null ? void 0 : { kind: "range", min: l, max: h });
  }, o = Dr("min", "Min", i.min, e, s), a = Dr("max", "Max", i.max, e, s);
  return n.append(o, a), n;
}
function Dr(r, e, t, i, n) {
  const s = document.createElement("input");
  return s.type = "number", s.className = "pvt-table-filter pvt-table-filter-number", s.dataset.role = r, s.placeholder = e, s.title = i, s.value = t === null ? "" : String(t), s.addEventListener("input", n), s;
}
function Or(r) {
  if (r.trim() === "") return null;
  const e = Number(r);
  return Number.isFinite(e) ? e : null;
}
const qt = class qt {
  constructor(e, t, i, n = "select", s = 200) {
    c(this, "uiManager");
    c(this, "tab");
    c(this, "root");
    c(this, "columns", []);
    /** Column keys the picker has switched off. */
    c(this, "hiddenColumns", /* @__PURE__ */ new Set());
    /** Per-column row filters, by column key. Unset means "no filter". */
    c(this, "rowFilters", /* @__PURE__ */ new Map());
    /** Elements this tab's push is hiding on the canvas — `0` when nothing is pushed. */
    c(this, "graphFilterCount", 0);
    c(this, "sort", null);
    c(this, "rows", []);
    c(this, "visible", []);
    /** Anchor for a shift-click range, as an index into {@link visible}. */
    c(this, "lastClickedIndex", null);
    /** What a row click does, from `UI.table.rowActivate`. */
    c(this, "rowActivate");
    /** Row count above which rows are windowed rather than all rendered. */
    c(this, "virtualizeAbove");
    c(this, "scrollHandler");
    c(this, "windowStart", -1);
    c(this, "windowEnd", -1);
    c(this, "head");
    c(this, "bodyRows");
    c(this, "summary");
    /** Told when a header filter changes, so the table can refresh its push button. */
    c(this, "rowFiltersChanged");
    /**
     * Whether this tab can list nested nodes at all — `UI.table.nested`, and never on the
     * edges tab: a cluster holds nodes, and an edge into one is already represented by the
     * stand-in the `endpoint` state reports.
     */
    c(this, "nestedOffered");
    /** Whether nested nodes are listed right now — the header's switch. */
    c(this, "includeNested");
    /** Told when the nested switch moves, so the toolbar can redraw. */
    c(this, "nestedChanged");
    this.uiManager = e, this.tab = t, this.root = document.createElement("div"), this.root.className = "pvt-table-grid", this.sort = i ?? null, this.rowActivate = n, this.virtualizeAbove = s, this.nestedOffered = t === "nodes" && ns(e), this.includeNested = this.nestedOffered;
  }
  /* ---------- nested rows ---------- */
  /** Whether this tab offers the nested switch at all. */
  offersNested() {
    return this.nestedOffered;
  }
  /** Whether nested nodes are listed right now. */
  getIncludeNested() {
    return this.includeNested;
  }
  setIncludeNested(e) {
    var t;
    this.includeNested !== e && (this.includeNested = e, this.lastClickedIndex = null, this.rebuild(), (t = this.nestedChanged) == null || t.call(this));
  }
  /** Told when the nested switch moves, so the toolbar can redraw. */
  onNestedChange(e) {
    this.nestedChanged = e;
  }
  getRoot() {
    return this.root;
  }
  /**
   * Listen for header-filter changes. A row filter re-renders the rows only, leaving the
   * header standing, so nothing else announces that what a push would hide has moved.
   */
  onRowFiltersChange(e) {
    this.rowFiltersChanged = e;
  }
  /** Rows currently listed, in the order they are shown. Export reads this. */
  getVisibleRows() {
    return this.visible;
  }
  /** Columns currently shown, in order. */
  getVisibleColumns() {
    return this.columns.filter((e) => !this.hiddenColumns.has(e.key));
  }
  /** Every column, shown or not — what the picker lists. */
  getAllColumns() {
    return this.columns;
  }
  isColumnHidden(e) {
    return this.hiddenColumns.has(e);
  }
  setColumnHidden(e, t) {
    t ? this.hiddenColumns.add(e) : this.hiddenColumns.delete(e), this.render();
  }
  /**
   * Re-resolve columns and rows from the graph, then redraw.
   *
   * Columns are resolved once per rebuild rather than per row: the scan behind the
   * derived tier walks every element, so doing it per row would be quadratic.
   */
  rebuild() {
    this.columns = Zp(this.uiManager, this.tab);
    for (const e of this.columns)
      e.hidden && this.hiddenColumns.add(e.key);
    if (!this.sort) {
      const e = this.columns.find((t) => t.key === jp && t.sortable !== !1) ?? this.columns.find((t) => t.sortable !== !1);
      e && (this.sort = { key: e.key, direction: "asc" });
    }
    this.rows = this.collectElements().map((e) => ({
      id: e.id,
      element: e,
      // `nestedOffered` already implies the nodes tab, so this is safe on an edge.
      nested: this.nestedOffered && e.isChild,
      values: new Map(this.columns.map((t) => [t.key, Pr(t, e)]))
    })), this.render();
  }
  collectElements() {
    const e = this.uiManager.graph;
    if (this.tab === "edges") return e.getMutableEdges();
    const t = e.getMutableNodes();
    return this.includeNested ? t : t.filter((i) => !i.isChild);
  }
  /* ---------- narrowing and ordering ---------- */
  /** The filters actually narrowing anything, as `[columnKey, filter]` pairs. */
  activeRowFilters() {
    return [...this.rowFilters].filter(([, e]) => Lr(e));
  }
  rowPasses(e, t) {
    return t.every(([i, n]) => eg(n, e.values.get(i)));
  }
  applyRowFilters() {
    const e = this.activeRowFilters();
    return e.length === 0 ? [...this.rows] : this.rows.filter((t) => this.rowPasses(t, e));
  }
  /**
   * The ids the column filters exclude — what {@link TableGraphFilter} hides when the
   * push button is pressed.
   *
   * The **Visibility** column is deliberately left out of this, though it still narrows
   * rows like any other: its values *are* the graph's filter state, so pushing it would
   * hide whatever is currently on the canvas and then immediately disagree with itself.
   * A consequence worth knowing: with a Visibility filter active the rows listed are
   * narrower than what a push hides, so the two counts are not complements.
   */
  graphFilterIds() {
    const e = this.activeRowFilters().filter(([t]) => t !== ui);
    return e.length === 0 ? [] : this.rows.filter((t) => !this.rowPasses(t, e)).map((t) => t.id);
  }
  /** Whether any column offers a filter at all — no control, no push to make. */
  hasFilterableColumns() {
    return this.columns.some((e) => e.filterable && e.key !== ui);
  }
  applySort(e) {
    const t = this.sort;
    if (!t) return e;
    const i = t.direction === "asc" ? 1 : -1;
    return [...e].sort((n, s) => i * lg(n.values.get(t.key), s.values.get(t.key)));
  }
  /* ---------- rendering ---------- */
  render() {
    this.visible = this.applySort(this.applyRowFilters());
    const e = this.scroller(), t = (e == null ? void 0 : e.scrollTop) ?? 0;
    this.windowStart = -1, this.windowEnd = -1, this.root.innerHTML = "", this.root.appendChild(this.buildHead()), this.root.appendChild(this.buildRows()), this.updateSummary(), e && t > 0 && (e.scrollTop = t), this.syncSelection(!1);
  }
  /**
   * Re-narrow and redraw the rows, leaving the header standing.
   *
   * A row filter changes nothing in the header — not the sort arrow, not the column
   * widths, not the dropdowns' own choices, which are read from every row rather than
   * the narrowed ones. Rebuilding it anyway would blur the control mid-keystroke.
   */
  renderRows() {
    var e;
    this.visible = this.applySort(this.applyRowFilters()), this.windowStart = -1, this.windowEnd = -1, (e = this.bodyRows) == null || e.remove(), this.root.appendChild(this.buildRows()), this.updateSummary(), this.syncSelection(!1);
  }
  /** One grid template shared by the header and every row, so the columns line up. */
  gridTemplate() {
    return this.getVisibleColumns().map((e) => typeof e.width == "number" ? `${e.width}px` : e.width ?? "minmax(120px, 1fr)").join(" ");
  }
  buildHead() {
    const e = document.createElement("div");
    e.className = "pvt-table-head", e.style.gridTemplateColumns = this.gridTemplate(), this.head = e;
    for (const t of this.getVisibleColumns())
      e.appendChild(this.buildHeadCell(t));
    return e;
  }
  buildHeadCell(e) {
    var s;
    const t = document.createElement("div");
    t.className = "pvt-table-th", t.dataset.column = e.key, e.align && (t.dataset.align = e.align);
    const i = document.createElement("button");
    return i.type = "button", i.className = "pvt-table-th-label", i.textContent = e.label ?? e.key, e.sortable !== !1 ? (((s = this.sort) == null ? void 0 : s.key) === e.key && (i.classList.add("pvt-table-sorted"), i.insertAdjacentHTML("beforeend", `<span class="pvt-table-sort-arrow">${this.sort.direction === "asc" ? yo : Ni}</span>`)), i.title = `Sort by ${e.label ?? e.key}`, i.addEventListener("click", () => this.toggleSort(e.key))) : i.disabled = !0, t.appendChild(i), e.filterable && t.appendChild(this.buildFilterControl(e)), t;
  }
  /**
   * The header's row filter, typed off the column's facet `type` — a bounds pair for a
   * `numberRange`, a dropdown of the values present for a `select`, a text box otherwise.
   *
   * Only the rows are re-rendered on a change: rebuilding the header under a control the
   * user is typing into would take the focus and the caret with it.
   */
  buildFilterControl(e) {
    const t = ig(this.rows.map((i) => i.values.get(e.key)));
    return sg(e, this.rowFilters.get(e.key), t, (i) => {
      var n;
      i ? this.rowFilters.set(e.key, i) : this.rowFilters.delete(e.key), this.renderRows(), (n = this.rowFiltersChanged) == null || n.call(this);
    });
  }
  buildRows() {
    const e = document.createElement("div");
    if (e.className = "pvt-table-rows", this.bodyRows = e, this.visible.length === 0)
      return this.detachScrollListener(), e.appendChild(this.buildEmptyState()), e;
    if (this.visible.length <= this.virtualizeAbove) {
      this.detachScrollListener();
      const t = this.gridTemplate(), i = this.getVisibleColumns();
      for (const n of this.visible)
        e.appendChild(this.buildRow(n, i, t));
      return e;
    }
    return e.classList.add("pvt-table-rows-windowed"), e.style.height = `${this.visible.length * qt.ROW_HEIGHT}px`, this.attachScrollListener(), this.renderWindow(e), e;
  }
  /* ---------- windowing ---------- */
  /** The scroll container the dock puts this grid inside. */
  scroller() {
    return this.root.parentElement;
  }
  attachScrollListener() {
    const e = this.scroller();
    !e || this.scrollHandler || (this.scrollHandler = () => this.renderWindow(), e.addEventListener("scroll", this.scrollHandler, { passive: !0 }));
  }
  detachScrollListener() {
    const e = this.scroller();
    e && this.scrollHandler && e.removeEventListener("scroll", this.scrollHandler), this.scrollHandler = void 0;
  }
  /**
   * Draw the slice of rows the viewport can see, plus an overscan margin either side so
   * a fast scroll doesn't show empty space before the next frame lands.
   *
   * Rows are positioned arithmetically from {@link ROW_HEIGHT}, which is why the CSS
   * pins every row to exactly that height.
   */
  renderWindow(e = this.bodyRows) {
    if (!e) return;
    const t = this.scroller(), i = (t == null ? void 0 : t.clientHeight) ?? 0, n = (t == null ? void 0 : t.scrollTop) ?? 0, s = Math.max(0, Math.floor(n / qt.ROW_HEIGHT) - qt.OVERSCAN), o = Math.ceil(i / qt.ROW_HEIGHT) + qt.OVERSCAN * 2, a = Math.min(this.visible.length, s + o);
    if (this.windowStart === s && this.windowEnd === a && e.childElementCount > 0) return;
    this.windowStart = s, this.windowEnd = a, e.innerHTML = "";
    const l = this.gridTemplate(), h = this.getVisibleColumns();
    for (let d = s; d < a; d++) {
      const u = this.buildRow(this.visible[d], h, l);
      u.style.top = `${d * qt.ROW_HEIGHT}px`, e.appendChild(u);
    }
    this.syncSelection(!1);
  }
  /** Release the scroll listener. Called by the dock when it tears the grid down. */
  dispose() {
    this.detachScrollListener();
  }
  buildRow(e, t, i) {
    var s;
    const n = document.createElement("div");
    n.className = "pvt-table-row", n.dataset.id = e.id, n.style.gridTemplateColumns = i, e.nested && (n.dataset.nestedRow = "true"), this.rowActivate !== "none" && this.wireRow(n, e);
    for (const o of t) {
      const a = document.createElement("div");
      a.className = "pvt-table-td", o.align && (a.dataset.align = o.align);
      const l = e.values.get(o.key);
      if (o.key === ui && typeof l == "string" && l !== "") {
        a.dataset.visibility = l;
        const d = document.createElement("span");
        d.className = "pvt-table-visibility", d.textContent = l, a.appendChild(d), n.appendChild(a);
        continue;
      }
      const h = (s = o.format) == null ? void 0 : s.call(o, l, e.element);
      h instanceof HTMLElement ? a.appendChild(h) : a.textContent = h ?? cg(l), n.appendChild(a);
    }
    return n;
  }
  /**
   * Has any row's `Visibility` reading moved since the last rebuild?
   *
   * Visibility changes for reasons nothing announces — a cluster opening or closing, a
   * programmatic `hideNode` — so the dock asks this from `Graph.onVisibleChange`. A
   * read-and-compare pass rather than a patch: a rebuild is what keeps the sort, the row
   * filters and the summary consistent, and it only has to happen when something moved.
   */
  visibilityMoved() {
    const e = this.columns.find((t) => t.key === ui);
    return e ? this.rows.some((t) => t.values.get(e.key) !== Pr(e, t.element)) : !1;
  }
  buildEmptyState() {
    const e = document.createElement("div");
    e.className = "pvt-table-empty";
    const t = [...this.rowFilters.values()].some(Lr);
    e.innerHTML = `<span class="pvt-table-empty-icon">${Lc}</span>`;
    const i = document.createElement("span");
    return i.textContent = t ? "No rows match the column filters." : this.tab === "edges" ? "This graph has no edges." : "This graph has no nodes.", e.appendChild(i), e;
  }
  /* ---------- selection ---------- */
  /**
   * Row gestures, matching what the canvas offers: plain click replaces the selection,
   * Ctrl/Cmd adds or removes one row, Shift takes a range from the last row clicked.
   *
   * The range runs over the rows **as currently listed** — sorted and narrowed — because
   * that is what the user can see. Sorting by degree and shift-clicking the top twenty is
   * the whole point.
   */
  wireRow(e, t) {
    e.addEventListener("mousedown", (i) => {
      i.shiftKey && i.preventDefault();
    }), e.addEventListener("click", (i) => {
      const n = this.visible.findIndex((s) => s.id === t.id);
      if (i.shiftKey && this.lastClickedIndex !== null) {
        const [s, o] = [this.lastClickedIndex, n].sort((a, l) => a - l);
        this.selectRange(s, o);
        return;
      }
      if (this.lastClickedIndex = n, i.ctrlKey || i.metaKey) {
        this.toggleRow(t);
        return;
      }
      this.uiManager.graph.selectElements([t.element]), this.rowActivate === "selectAndCenter" && this.uiManager.graph.focusElement(t.element);
    }), e.addEventListener("dblclick", () => {
      if (this.uiManager.graph.selectElements([t.element]), t.nested) {
        qp(this.uiManager.graph, t.element);
        return;
      }
      this.uiManager.graph.focusElement(t.element);
    }), e.addEventListener("pointerenter", () => this.uiManager.graph.highlightElement(t.element)), e.addEventListener("pointerleave", () => this.uiManager.graph.unHighlightElement(t.element));
  }
  selectRange(e, t) {
    const i = this.visible.slice(e, t + 1).map((n) => n.element);
    this.uiManager.graph.selectElements(i);
  }
  toggleRow(e) {
    var n, s;
    const t = this.uiManager.graph, i = ((s = (n = t.renderer) == null ? void 0 : n.getGraphInteraction()) == null ? void 0 : s.getSelectedNodeIDs()) ?? [];
    if (this.tab === "edges") {
      t.selectElements([e.element]);
      return;
    }
    i.includes(e.id) ? t.removeFromSelection([e.element]) : t.addToSelection([e.element]);
  }
  /** Select every row currently listed — post-sort, post-narrowing. */
  selectAllListed() {
    this.tab !== "edges" && this.uiManager.graph.selectElements(this.visible.map((e) => e.element));
  }
  /**
   * Reflect the graph's selection onto the rows, and bring the first selected row into
   * view. Reads the selection wholesale rather than tracking deltas, so it cannot drift
   * out of step with the canvas.
   */
  syncSelection(e = !0) {
    var s;
    const t = (s = this.uiManager.graph.renderer) == null ? void 0 : s.getGraphInteraction(), i = new Set((t == null ? void 0 : t.getSelectedNodeIDs()) ?? []);
    let n = null;
    for (const o of this.root.querySelectorAll(".pvt-table-row")) {
      const a = i.has(o.dataset.id ?? "");
      o.classList.toggle("pvt-table-row-selected", a), a && !n && (n = o);
    }
    e && n && n.scrollIntoView({ block: "nearest" });
  }
  toggleSort(e) {
    var t;
    ((t = this.sort) == null ? void 0 : t.key) === e ? this.sort = { key: e, direction: this.sort.direction === "asc" ? "desc" : "asc" } : this.sort = { key: e, direction: "asc" }, this.render();
  }
  /**
   * How many elements this tab's push is hiding on the canvas, for the summary to
   * report. Set by the table whenever it refreshes the push button.
   */
  setGraphFilterCount(e) {
    this.graphFilterCount = e;
  }
  /**
   * A one-line count for the dock header — "12 of 40 nodes", plus "· 28 hidden" while a
   * push is filtering the canvas. The lit button beside it is what says the hiding is
   * this table's doing; the exact sentence is in the summary's own title.
   */
  describe() {
    const e = this.tab === "edges" ? "edge" : "node", t = this.rows.length, i = this.visible.length, n = i === t ? `${t} ${e}${t === 1 ? "" : "s"}` : `${i} of ${t} ${e}${t === 1 ? "" : "s"}`;
    return this.graphFilterCount > 0 ? `${n} · ${this.graphFilterCount} hidden` : n;
  }
  setSummaryTarget(e) {
    this.summary = e;
  }
  updateSummary() {
    if (!this.summary) return;
    this.summary.textContent = this.describe();
    const e = this.tab === "edges" ? "relations" : "nodes";
    this.summary.title = this.graphFilterCount > 0 ? `${this.graphFilterCount} ${e} hidden on the canvas by this table's column filters` : "";
  }
};
/**
 * Every row is exactly this tall, in px. Windowed rows are positioned arithmetically
 * from it, so it has to agree with `--pvt-table-row-height` in table.scss.
 */
c(qt, "ROW_HEIGHT", 24), /** Rows drawn beyond each edge of the viewport, so a fast scroll shows no gap. */
c(qt, "OVERSCAN", 6);
let Rn = qt;
const Fr = /* @__PURE__ */ new Set();
function Pr(r, e) {
  try {
    return Jp(r, e);
  } catch (t) {
    Fr.has(r.key) || (Fr.add(r.key), console.warn(`Pivotick: the table column '${r.key}' threw while reading a value; its cells will be blank.`, t));
    return;
  }
}
function lg(r, e) {
  const t = r == null || r === "", i = e == null || e === "";
  return t && i ? 0 : t ? 1 : i ? -1 : typeof r == "number" && typeof e == "number" ? r - e : typeof r == "boolean" && typeof e == "boolean" ? Number(r) - Number(e) : String(r).localeCompare(String(e), void 0, { numeric: !0, sensitivity: "base" });
}
function cg(r) {
  return r == null ? "" : Array.isArray(r) ? r.map((e) => String(e)).join(", ") : typeof r == "object" ? JSON.stringify(r) : String(r);
}
function hg(r, e) {
  const t = r.map((n) => Br(n.label ?? n.key)), i = e.map((n) => r.map((s) => Br(ug(n.values.get(s.key)))));
  return [t, ...i].map((n) => n.join(",")).join(`\r
`);
}
function dg(r, e) {
  const t = e.map((i) => {
    const n = {};
    for (const s of r) n[s.label ?? s.key] = i.values.get(s.key) ?? null;
    return n;
  });
  return JSON.stringify(t, null, 2);
}
function Br(r) {
  return /[",\r\n]/.test(r) || r !== r.trim() ? `"${r.replace(/"/g, '""')}"` : r;
}
function ug(r) {
  return r == null ? "" : Array.isArray(r) ? r.map((e) => String(e)).join("; ") : typeof r == "object" ? JSON.stringify(r) : String(r);
}
function Hr(r, e, t) {
  try {
    const i = new Blob([t], { type: `${e};charset=utf-8` }), n = URL.createObjectURL(i), s = document.createElement("a");
    return s.href = n, s.download = r, s.style.display = "none", document.body.appendChild(s), s.click(), s.remove(), setTimeout(() => URL.revokeObjectURL(n), 0), !0;
  } catch (i) {
    return console.warn("Pivotick: the table export could not start a download.", i), !1;
  }
}
const zr = "table";
class pg extends it {
  constructor(t, i = {}, n) {
    super(t);
    c(this, "options");
    c(this, "dock");
    c(this, "summary");
    c(this, "pickerButton");
    c(this, "picker");
    /** Outside-click / Escape handler, live only while the picker is open. */
    c(this, "dismissPicker");
    c(this, "grid");
    /** Owns the reserved filter the push button writes. Absent when `filterGraph: false`. */
    c(this, "graphFilter");
    /** The push button, rebuilt with the rest of the toolbar on every activation. */
    c(this, "applyButton");
    /** The **Nested nodes** switch, on the same terms. Absent when the tab cannot nest. */
    c(this, "nestedControl");
    /** The pane's own `Nodes` / `Edges` strip, in the dock's header slot. */
    c(this, "tabs");
    /** One grid per inner tab, so each keeps its own sort, columns and row filters. */
    c(this, "grids", /* @__PURE__ */ new Map());
    c(this, "tab", "nodes");
    /**
     * Whether this pane is the one on show. A hidden grid does not rebuild: it would be
     * sorting and windowing rows nobody can see, and losing its scroll position doing it.
     * Activation always rebuilds, which is the catch-up.
     */
    c(this, "active", !1);
    /** Coalescing frame: one rebuild per frame however many events arrive. */
    c(this, "rebuildFrame", null);
    /** The live handle for this pane's dock tab — how an inner switch reaches the dock. */
    c(this, "handle");
    /** Disposer from `addDockTab`. */
    c(this, "disposeTab");
    this.options = i, this.dock = n;
  }
  /* ---------- lifecycle ---------- */
  onMount() {
    this.disposeTab = this.uiManager.addDockTab({
      id: zr,
      label: "Table",
      render: () => this.renderBody(),
      toolbar: () => this.buildToolbar(),
      onActivate: (t) => this.activatePane(t),
      onDeactivate: () => this.deactivatePane()
    });
  }
  onAfterMount() {
    const t = this.uiManager.graph;
    this.options.filterGraph !== !1 && (this.graphFilter = new Yu(this.uiManager), this.graphFilter.claim()), this.dock && this.track(this.dock.onCollapsedChange((n) => {
      n && this.closePicker();
    }));
    const i = () => this.queueRebuild();
    for (const n of ["dataBatchChanged", "nodeAdd", "nodeRemove", "nodeChange", "edgeAdd", "edgeRemove", "edgeChange"])
      t.on(n, i), this.track(() => t.off(n, i));
    for (const n of ["filterAdd", "filterRemove", "filterChange", "filterReset"])
      t.queryEngine.on(n, i), this.track(() => t.queryEngine.off(n, i));
    this.queueRebuild();
  }
  onGraphReady() {
    var i;
    const t = (i = this.uiManager.graph.renderer) == null ? void 0 : i.getGraphInteraction();
    if (t) {
      const n = () => {
        var s;
        return (s = this.grid) == null ? void 0 : s.syncSelection();
      };
      for (const s of ["selectNode", "selectNodes", "unselectNode", "unselectNodes"])
        t.on(s, n), this.track(() => t.off(s, n));
    }
    this.track(this.uiManager.graph.onVisibleChange(() => {
      var n;
      (n = this.grid) != null && n.visibilityMoved() && this.queueRebuild();
    })), this.queueRebuild();
  }
  /** Schedule a rebuild for the next frame, collapsing any already pending. */
  queueRebuild() {
    this.active && this.rebuildFrame === null && (this.rebuildFrame = requestAnimationFrame(() => {
      var t, i;
      this.rebuildFrame = null, (t = this.grid) == null || t.rebuild(), this.refreshApplyButton(), this.refreshNestedControl(), (i = this.grid) == null || i.updateSummary(), this.picker && this.renderPicker();
    }));
  }
  /* ---------- the pane, and its own tabs ---------- */
  /** The inner tabs on offer. A single one renders no strip — nothing to switch. */
  tabsOffered() {
    return this.options.tabs ?? ["nodes", "edges"];
  }
  /**
   * The pane's body: the current inner tab's grid root. Each inner tab gets a grid of
   * its own so its sort, its column choices and its row filters are its own —
   * switching to Edges and back should not have quietly rearranged the node table.
   *
   * Returned **bare**, with no wrapper: `TableGrid` measures its scroller as
   * `root.parentElement`, so the grid has to stay a direct child of the dock's body or
   * windowing silently measures the wrong element.
   */
  renderBody() {
    return this.gridFor(this.tab).getRoot();
  }
  gridFor(t) {
    const i = this.grids.get(t);
    if (i) return i;
    const n = new Rn(this.uiManager, t, this.options.sort, this.options.rowActivate, this.options.virtualizeAbove);
    return n.onRowFiltersChange(() => this.refreshApplyButton()), n.onNestedChange(() => this.refreshBar()), this.grids.set(t, n), n;
  }
  /**
   * Switch inner tab. The dock is holding the element `render` handed it, so the swap
   * has to go through `refresh` rather than being done behind its back — otherwise the
   * dock re-attaches a stale grid on its next activation.
   */
  showTab(t) {
    var i;
    this.tab !== t && (this.tab = t, this.grid = this.gridFor(t), this.closePicker(), (i = this.handle) == null || i.refresh(), this.grid.setSummaryTarget(this.summary), this.queueRebuild());
  }
  /**
   * Take over as the visible pane. Runs after the dock has attached the body and filled
   * the toolbar, so `this.summary` is already the fresh element to bind to.
   */
  activatePane(t) {
    this.handle = t, this.grid = this.gridFor(this.tab), this.grid.setSummaryTarget(this.summary), this.active = !0, this.queueRebuild();
  }
  deactivatePane() {
    this.active = !1, this.rebuildFrame !== null && cancelAnimationFrame(this.rebuildFrame), this.rebuildFrame = null, this.closePicker();
  }
  /**
   * The pane's own `Nodes` / `Edges` strip, in the header slot the dock gave it. These
   * are deliberately *not* dock tabs and are drawn as a segmented control rather than
   * as tabs, so the two levels of switch never read as one flat row.
   */
  renderTabs() {
    const t = this.tabs;
    if (!t) return;
    const i = this.tabsOffered();
    if (t.innerHTML = "", !(i.length < 2))
      for (const n of i) {
        const s = document.createElement("button");
        s.type = "button", s.className = "pvt-dock-view", s.dataset.tab = n, s.textContent = n === "edges" ? "Edges" : "Nodes", s.classList.toggle("active", n === this.tab), s.setAttribute("aria-pressed", String(n === this.tab)), s.addEventListener("click", () => this.showTab(n)), t.appendChild(s);
      }
  }
  /**
   * The header controls for whichever tab is coming to the front. Rebuilt on every
   * activation rather than cached: they are cheap, they read the current tab, and a
   * fresh set cannot hold a stale grid reference.
   *
   * Listeners go on directly rather than through `listen`: these elements are discarded
   * on the next tab switch, and a tracked disposer would outlive them — one more entry
   * per switch, held for the life of the table.
   *
   * `Select all` carries the margin that pushes the right-hand group over, so the bar
   * reads: state · actions · settings.
   */
  buildToolbar() {
    const t = [];
    this.tabs = document.createElement("div"), this.tabs.className = "pvt-dock-views", t.push(this.tabs), this.renderTabs(), this.nestedControl = void 0;
    const i = this.buildNestedControl();
    i && t.push(i), this.summary = document.createElement("span"), this.summary.className = "pvt-table-summary", t.push(this.summary);
    const n = document.createElement("button");
    n.type = "button", n.className = "pvt-table-selectall", n.textContent = "Select all", n.title = "Select every row currently listed", n.addEventListener("click", () => {
      var s;
      return (s = this.grid) == null ? void 0 : s.selectAllListed();
    }), t.push(n), this.options.filterGraph !== !1 && (this.applyButton = document.createElement("button"), this.applyButton.type = "button", this.applyButton.className = "pvt-table-apply", this.applyButton.hidden = !0, this.applyButton.addEventListener("click", () => this.toggleGraphFilter()), t.push(this.applyButton));
    for (const s of this.exportFormats()) {
      const o = document.createElement("button");
      o.type = "button", o.className = "pvt-table-export", o.dataset.format = s, o.textContent = s.toUpperCase(), o.title = `Export the rows and columns currently shown as ${s.toUpperCase()}`, o.addEventListener("click", () => this.exportAs(s)), t.push(o);
    }
    return this.pickerButton = document.createElement("button"), this.pickerButton.type = "button", this.pickerButton.className = "pvt-table-columns-button", this.pickerButton.innerHTML = `${xc}<span>Columns</span>`, this.pickerButton.title = "Choose which columns to show", this.pickerButton.addEventListener("click", () => this.togglePicker()), t.push(this.pickerButton), t;
  }
  /* ---------- nested rows ---------- */
  /**
   * Redraw the header bar. `refresh` replaces every element in it, `summary` included,
   * so the grid has to be pointed at the fresh one — the same dance `showTab` does.
   */
  refreshBar() {
    var t, i, n;
    (t = this.handle) == null || t.refresh(), (i = this.grid) == null || i.setSummaryTarget(this.summary), this.refreshNestedControl(), (n = this.grid) == null || n.updateSummary();
  }
  /**
   * The **Nested nodes** switch. Nested rows are peers of the graph's own and read as
   * ordinary rows, so someone who wants only the top level needs a way to say so —
   * `Children` still says how big each cluster is once they are gone.
   *
   * Never built for a tab that cannot nest — the edges tab, or `nested: false`. Built
   * but **hidden** otherwise, and revealed by the first refresh once the graph turns out
   * to have a cluster: like the push button, the bar is filled before the data has
   * arrived, so "are there clusters" is not yet knowable here.
   */
  buildNestedControl() {
    const t = this.gridFor(this.tab);
    if (!t.offersNested()) return null;
    const i = document.createElement("div");
    i.className = "pvt-table-nested", i.hidden = !0, this.nestedControl = i;
    const n = document.createElement("label");
    n.className = "pvt-table-nested-toggle", n.title = "List the nodes inside clusters alongside the graph's own";
    const s = document.createElement("input");
    s.type = "checkbox", s.checked = t.getIncludeNested(), s.addEventListener("change", () => t.setIncludeNested(s.checked)), n.appendChild(s);
    const o = document.createElement("span");
    return o.textContent = "Nested nodes", n.appendChild(o), i.appendChild(n), i;
  }
  /** Show the switch once the graph has a cluster for it to be about. */
  refreshNestedControl() {
    this.nestedControl && (this.nestedControl.hidden = !this.uiManager.graph.getMutableNodes().some((t) => t.isParent));
  }
  /* ---------- export ---------- */
  exportFormats() {
    return this.options.export === !1 ? [] : this.options.export ?? ["csv", "json"];
  }
  exportAs(t) {
    var l;
    const i = this.grid;
    if (!i) return;
    const n = i.getVisibleColumns(), s = i.getVisibleRows(), o = `${this.uiManager.graph.getAppID()}-${this.tab}`;
    (t === "csv" ? Hr(`${o}.csv`, "text/csv", hg(n, s)) : Hr(`${o}.json`, "application/json", dg(n, s))) || (l = this.uiManager.graph.notifier) == null || l.warning(
      "Export blocked",
      "This page will not let the file download. Try the example outside its frame."
    );
  }
  /* ---------- the push to the graph ---------- */
  /**
   * Whether a press would clear rather than push: either the push already says what the
   * filters say, or the filters have been emptied and the push is all that is left.
   */
  pressClears(t, i) {
    return t !== void 0 && (i.length === 0 || Xu(t, i));
  }
  /**
   * Reflect the push's state onto the button, and tell the grid how much it is hiding.
   *
   * Three states in one control: nothing pushed reads `Apply to graph`; a push that
   * still agrees with the filters reads `Clear`; a push the filters have moved past
   * reads `Apply to graph` again while staying lit — so the accent says the graph is
   * filtered by this table and the label says what a press would do.
   *
   * The pushed ids are read back off the engine every time rather than remembered here,
   * which is what makes a `resetFilters()` from anywhere un-light the button.
   */
  refreshApplyButton() {
    const t = this.applyButton, i = this.grid;
    if (!t || !i || !this.graphFilter) return;
    const n = this.graphFilter.pushed(this.tab), s = i.graphFilterIds(), o = this.pressClears(n, s), a = this.tab === "edges" ? "relations" : "nodes";
    t.hidden = !i.hasFilterableColumns(), i.setGraphFilterCount((n == null ? void 0 : n.length) ?? 0), t.classList.toggle("active", n !== void 0), t.disabled = !o && s.length === 0;
    const l = o ? "clear" : "push";
    t.dataset.action !== l && (t.dataset.action = l, t.innerHTML = o ? `${vo}<span>Clear</span>` : `${mo}<span>Apply to graph</span>`), t.title = o ? `Stop filtering the graph from this table — ${(n == null ? void 0 : n.length) ?? 0} ${a} hidden` : t.disabled ? "Narrow a column first, then apply it to the graph" : `Hide the ${s.length} ${a} the column filters leave out`;
  }
  /** Push the current column filters onto the graph, or clear a push already on it. */
  toggleGraphFilter() {
    const t = this.grid;
    if (!t || !this.graphFilter) return;
    const i = t.graphFilterIds();
    this.pressClears(this.graphFilter.pushed(this.tab), i) ? this.graphFilter.clear(this.tab) : this.graphFilter.push(this.tab, i), this.refreshApplyButton();
  }
  /* ---------- the column picker ---------- */
  togglePicker() {
    var t, i, n;
    if (this.picker) return this.closePicker();
    this.picker = document.createElement("div"), this.picker.className = "pvt-table-columns-picker", (t = this.pickerButton) == null || t.classList.add("active"), (n = (i = this.pickerButton) == null ? void 0 : i.parentElement) == null || n.appendChild(this.picker), this.renderPicker(), this.positionPicker(), this.dismissPicker = (s) => {
      var a, l;
      if (s instanceof KeyboardEvent && s.key !== "Escape") return;
      const o = s.target;
      s.type === "pointerdown" && o && ((a = this.picker) != null && a.contains(o) || (l = this.pickerButton) != null && l.contains(o)) || this.closePicker();
    }, document.addEventListener("pointerdown", this.dismissPicker, !0), document.addEventListener("keydown", this.dismissPicker, !0);
  }
  closePicker() {
    var t, i;
    this.dismissPicker && (document.removeEventListener("pointerdown", this.dismissPicker, !0), document.removeEventListener("keydown", this.dismissPicker, !0), this.dismissPicker = void 0), (t = this.picker) == null || t.remove(), this.picker = void 0, (i = this.pickerButton) == null || i.classList.remove("active");
  }
  /**
   * Anchor the picker to its button in viewport coordinates, opening **upwards**: the
   * dock lives at the bottom of the layout, so there is room above it and none below.
   * Height is capped to the room actually available.
   */
  positionPicker() {
    var s;
    const t = this.picker, i = (s = this.pickerButton) == null ? void 0 : s.getBoundingClientRect();
    if (!t || !i) return;
    const n = 4;
    t.style.bottom = `${Math.max(0, window.innerHeight - i.top + n)}px`, t.style.right = `${Math.max(0, window.innerWidth - i.right)}px`, t.style.maxHeight = `${Math.max(80, i.top - n * 3)}px`;
  }
  /**
   * One checkbox per column. Every column is listed, including the ones switched off —
   * the table shows everything by default, so on property-heavy data this is how you
   * get a grid you can read rather than one you have to scroll sideways through.
   */
  renderPicker() {
    const t = this.picker, i = this.grid;
    if (!(!t || !i)) {
      t.innerHTML = "";
      for (const n of i.getAllColumns()) {
        const s = document.createElement("label");
        s.className = "pvt-table-columns-row";
        const o = document.createElement("input");
        o.type = "checkbox", o.checked = !i.isColumnHidden(n.key), o.addEventListener("change", () => {
          i.setColumnHidden(n.key, !o.checked), i.updateSummary();
        });
        const a = document.createElement("span");
        a.textContent = n.label ?? n.key, s.append(o, a), t.appendChild(s);
      }
    }
  }
  onDestroy() {
    var t, i;
    this.closePicker(), (t = this.graphFilter) == null || t.release(), this.graphFilter = void 0, this.rebuildFrame !== null && cancelAnimationFrame(this.rebuildFrame), this.rebuildFrame = null, this.active = !1, (i = this.disposeTab) == null || i.call(this), this.disposeTab = void 0, this.handle = void 0;
    for (const n of this.grids.values())
      n.getRoot().remove(), n.dispose();
    this.grids.clear(), this.tabs = void 0, this.summary = void 0, this.applyButton = void 0, this.pickerButton = void 0, this.picker = void 0, this.grid = void 0;
  }
  /** The grid, for anything that needs its rows (export, selection sync). */
  getGrid() {
    return this.grid;
  }
  /** The dock-tab id this pane is registered under — what `Graph.openTable()` activates. */
  dockTabId() {
    return zr;
  }
}
const ca = (r) => {
  const e = [];
  e.push({
    name: "id",
    value: r.id
  });
  for (const [t, i] of Object.entries(r.getData()))
    t && i && e.push({
      name: t,
      value: i
    });
  return e;
}, Pi = (r, e, t = "") => {
  var n;
  const i = (n = r.getData()) == null ? void 0 : n[e];
  return typeof i == "string" ? i : t;
}, gg = (r) => Pi(r, "label", "Could not resolve title"), fg = (r) => Pi(r, "description"), mg = (r) => Pi(r, "label", ""), vg = (r) => Pi(r, "description"), $r = (r) => ca(r), Gr = (r) => ca(r), Ur = {
  nodeHeaderMap: {
    title: gg,
    subtitle: fg
  },
  edgeHeaderMap: {
    title: mg,
    subtitle: vg
  },
  render: void 0
}, yg = {
  mode: "viewer",
  mainHeader: Ur,
  sidebar: {
    collapsed: "auto"
  },
  propertiesPanel: {
    nodePropertiesMap: $r,
    edgePropertiesMap: Gr
  },
  neighborsPanel: {},
  tooltip: {
    enabled: !0,
    allowPinning: !0,
    nodePropertiesMap: $r,
    edgePropertiesMap: Gr,
    ...Ur
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
    menuNote: {
      topbar: [],
      menu: []
    },
    menuCanvas: {
      topbar: [],
      menu: []
    }
  },
  extraPanels: [],
  filter: {},
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
};
function ha(r) {
  return !(r === !1 || typeof r == "object" && r.enabled === !1);
}
function qr(r) {
  return !(r === !1 || typeof r == "object" && r.enabled === !1);
}
function da(r) {
  return typeof r == "object" ? r : {};
}
function ua(r) {
  const e = da(r.table), t = r.dock ?? {};
  return {
    open: t.open ?? e.open,
    collapsed: t.collapsed ?? e.collapsed,
    height: t.height ?? e.height
  };
}
const bg = [
  {
    key: "layout",
    modes: "*",
    make: (r) => new lu(r),
    slot: (r) => r.getRootContainer()
  },
  {
    key: "navigation",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var e;
      return !!((e = r.navigation) != null && e.enabled);
    },
    make: (r) => new au(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.graphnavigation;
    }
  },
  {
    key: "tooltip",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var e;
      return !!((e = r.tooltip) != null && e.enabled);
    },
    make: (r) => new up(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.canvas;
    }
  },
  {
    key: "contextMenu",
    modes: ["viewer", "full", "light"],
    enabled: (r) => {
      var e;
      return !!((e = r.contextMenu) != null && e.enabled);
    },
    make: (r) => new vp(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.canvas;
    }
  },
  {
    key: "modeRail",
    modes: ["full", "light"],
    make: (r) => new Cp(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.moderail;
    }
  },
  {
    key: "toolPanel",
    modes: ["full", "light"],
    make: (r) => new Sp(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.toolpanel;
    }
  },
  {
    // viewer-mode flyouts are an open question (§9.4); full/light for now.
    key: "viewFlyout",
    modes: ["full", "light"],
    make: (r) => new Np(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.flyout;
    }
  },
  {
    key: "physicsFlyout",
    modes: ["full", "light"],
    make: (r) => new Fp(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.flyout;
    }
  },
  {
    // Built unless suppressed: with no `UI.legend` the component tries to derive
    // one from `render.nodeTypeAccessor` and renders nothing if that doesn't
    // explain the colours. `setLegend` builds it later if it was suppressed.
    key: "legend",
    modes: ["full", "light"],
    enabled: (r) => ha(r.legend),
    make: (r) => new aa(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.legend;
    }
  },
  {
    // `full` only: the dock is a grid row beside the sidebar, and the other modes
    // promise a canvas without that much chrome. It owns its own toggle and shortcut,
    // so nothing else has to exist first — but it must come before the table, whose
    // tabs it has to be there to receive.
    //
    // A dock is *also* built on demand by `addDockTab` when a tab arrives without one
    // (see `ensureDock`), which is the only way a plugin can get in: plugins install
    // after this whole catalogue has run.
    key: "dock",
    modes: ["full"],
    enabled: (r) => qr(r.table),
    make: (r) => new la(r, ua(r.getOptions())),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.dock;
    }
  },
  {
    // Not an occupant of the dock so much as a contributor to it: the table registers
    // one dock tab per `TableTab` and owns no region of its own, which is why it asks
    // for no slot.
    key: "table",
    modes: ["full"],
    enabled: (r) => qr(r.table),
    make: (r) => new pg(r, da(r.getOptions().table), r.dock),
    slot: () => {
    }
  },
  {
    key: "mainHeader",
    modes: ["full", "light"],
    make: (r) => new lp(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.mainheader;
    }
  },
  {
    key: "sidebar",
    modes: ["full"],
    make: (r) => new Wu(r),
    slot: (r) => {
      var e;
      return (e = r.layout) == null ? void 0 : e.sidebar;
    }
  }
];
class wg {
  constructor(e, t, i) {
    c(this, "graph");
    c(this, "container");
    c(this, "options");
    c(this, "keyManager");
    /**
     * Mode-rail state (Select / Create pointer-modes + the View / Physics
     * flyouts). The rail, contextual panels, both flyouts and the canvas cursor
     * subscribe to it. Lives on
     * the manager (not per-component) so it survives element rebuilds and is
     * reachable from the interaction layer via `graph.UIManager.modeStore`.
     */
    c(this, "modeStore", new kp());
    /** Lifecycle-managed elements, in registration order. */
    c(this, "elements", []);
    c(this, "byKey", /* @__PURE__ */ new Map());
    /** Phase callbacks contributed by plugins / cross-cutting hooks. */
    c(this, "phaseHandlers", { afterMount: [], graphReady: [], destroy: [] });
    c(this, "emittedPhases", /* @__PURE__ */ new Set());
    /** UIManager-level teardown (global keybindings, container listeners). */
    c(this, "uiDisposables", []);
    /**
     * Sidebar extra panels, in display order. Lives here rather than on the
     * sidebar so registration works in any mode and at any point in the graph's
     * life — including before the sidebar is built, or in a mode that has none.
     */
    c(this, "panels", []);
    /** Monotonic counter behind auto-generated panel ids (never reset, so stale disposers can't collide). */
    c(this, "panelSeq", 0);
    /** Hosts subscribed to registry changes (the sidebar's panel manager). */
    c(this, "panelSubscribers", []);
    /**
     * Dock tabs, in display order. Here rather than on the dock for the same reason the
     * panels are here rather than on the sidebar — and for one more: a tab may be the
     * *reason* the region gets built, so the registry has to exist before the dock does.
     */
    c(this, "dockTabs", []);
    /** Monotonic counter behind auto-generated tab ids (never reset, so stale disposers can't collide). */
    c(this, "dockTabSeq", 0);
    /** The mounted dock, subscribed to registry changes. At most one. */
    c(this, "dockTabSubscribers", []);
    /** True after `destroy()`; late registrations are refused until `setup()` reruns. */
    c(this, "destroyed", !1);
    /** Names of installed plugins, for de-duplication. Reset on `destroy()`. */
    c(this, "installedPlugins", /* @__PURE__ */ new Set());
    this.graph = e, this.container = t, this.options = ye({}, yg, i), this.keyManager = new yp(this.container), this.setup();
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
  get physicsFlyout() {
    return this.byKey.get("physicsFlyout");
  }
  get legend() {
    return this.byKey.get("legend");
  }
  get dock() {
    return this.byKey.get("dock");
  }
  get table() {
    return this.byKey.get("table");
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
    this.destroy(), this.destroyed = !1, this.options.theme && this.container.setAttribute("data-theme", this.options.theme.toString()), this.resolveMode();
    for (const e of this.options.extraPanels ?? []) this.addPanel(e);
    this.build(), this.emitPhase("afterMount"), this.setupGlobalInteractions();
  }
  /** Downgrade / adjust the mode when the container can't fit the chosen UI. */
  resolveMode() {
    var t, i;
    ["viewer", "full", "light", "static"].includes(this.options.mode) || (console.warn(`Unknown mode: ${this.options.mode}. Defaulting to 'viewer'.`), this.options.mode = "viewer"), this.options.mode === "light" && !this.hasEnoughSpaceForLightMode() && (console.warn("Not enough space for light mode UI. Switching to viewer mode."), this.options.mode = "viewer"), this.options.mode === "full" && ((i = (t = this.options) == null ? void 0 : t.sidebar) == null ? void 0 : i.collapsed) === "auto" && !this.hasEnoughSpaceForFullMode() && (console.debug("Not enough space for full mode UI. Collapsing sidebar"), this.options.sidebar.collapsed = !0);
  }
  /** Construct + mount every element declared for the current mode. */
  build() {
    const e = this.options.mode;
    for (const t of bg)
      t.modes !== "*" && !t.modes.includes(e) || t.enabled && !t.enabled(this.options) || this.register(t);
  }
  register(e) {
    const t = e.make(this);
    this.byKey.set(e.key, t), this.elements.push(t), t.mount(e.slot(this));
  }
  hasEnoughSpaceForFullMode() {
    const e = this.container.getBoundingClientRect();
    return e.width > 1200 && e.height > 800;
  }
  hasEnoughSpaceForLightMode() {
    const e = this.container.getBoundingClientRect();
    return e.width > 600 && e.height > 600;
  }
  /* ---------- lifecycle phases ---------- */
  /**
   * Broadcast a lifecycle phase to every element (in registration order,
   * reversed for `destroy`) and every phase hook.
   */
  emitPhase(e) {
    if (!(e !== "destroy" && this.emittedPhases.has(e)))
      if (this.emittedPhases.add(e), e === "destroy") {
        for (const t of [...this.phaseHandlers.destroy].reverse()) t();
        for (const t of [...this.elements].reverse()) t.destroy();
      } else {
        for (const t of [...this.elements]) t[e]();
        for (const t of [...this.phaseHandlers[e]]) t();
      }
  }
  /**
   * Subscribe to a lifecycle phase. If the phase has already fired (a late
   * registration, e.g. a plugin installed after the graph is live), the
   * callback runs immediately to catch up. Returns an unsubscribe function.
   */
  onPhase(e, t) {
    return this.destroyed ? (console.warn("Cannot register a phase handler after the UI is destroyed."), () => {
    }) : (this.phaseHandlers[e].push(t), e !== "destroy" && this.emittedPhases.has(e) && t(), () => {
      this.phaseHandlers[e] = this.phaseHandlers[e].filter((i) => i !== t);
    });
  }
  setupGlobalInteractions() {
    const e = (t) => this.keyManager.handleKeyPress(t);
    this.container.addEventListener("keydown", e), this.uiDisposables.push(() => this.container.removeEventListener("keydown", e)), this.container.setAttribute("tabindex", "0"), this.uiDisposables.push(this.keyManager.register({
      key: "i",
      callback: () => {
        const t = this.graph.renderer.getNodeClosestToCursor(100);
        t && is(t, this);
      }
    })), this.uiDisposables.push(this.keyManager.register({
      key: "Shift+E",
      callback: () => {
        const t = this.graph.renderer.getClosestElementToCursor(100);
        t && (t instanceof et ? (this.graph.renderer.getGraphInteraction().selectNode(t.getGraphElement(), t), requestAnimationFrame(() => {
          this.graph.editing.openNodeSession(t);
        })) : t instanceof It && this.graph.renderer.enterNoteEditMode(t));
      }
    })), this.uiDisposables.push(this.keyManager.register({
      key: "n",
      callback: () => {
        const t = this.graph.renderer, i = this.graph.renderer.getGraphInteraction().getLastPointerEvent();
        if (!i) return;
        const { x: n, y: s } = t.screenToGraphCoordinates(
          i.clientX,
          i.clientY
        ), o = new It({
          content: "This is not a note.",
          x: n,
          y: s
        });
        this.graph.noteManager.addNote(o);
      }
    }));
  }
  /* ---------- plugins ---------- */
  /**
   * Whether a plugin of that name is already installed. Lets a mode's default
   * plugins stand aside for a consumer's own configured copy.
   */
  hasPlugin(e) {
    return this.installedPlugins.has(e);
  }
  /**
   * Install a plugin, handing it a {@link PluginContext} to register UI
   * elements, keybindings and lifecycle hooks. Called for each entry in
   * `GraphOptions.plugins` and by {@link Graph.use}.
   */
  installPlugin(e) {
    if (this.destroyed) {
      console.warn(`Cannot install plugin "${e.name}" after the UI is destroyed.`);
      return;
    }
    if (this.installedPlugins.has(e.name)) {
      console.warn(`Plugin "${e.name}" is already installed; skipping the duplicate.`);
      return;
    }
    this.installedPlugins.add(e.name);
    const t = {
      graph: this.graph,
      ui: this,
      // Live view, not an install-time snapshot: the layout is rebuilt on
      // setup() and its slots vary by mode, so read it on access.
      get layout() {
        return this.ui.layout;
      },
      keyManager: this.keyManager,
      addElement: (i, n) => this.addElement(i, n),
      addPanel: (i) => this.addPanel(i),
      removePanel: (i) => this.removePanel(i),
      refreshPanel: (i) => this.refreshPanel(i),
      addDockTab: (i) => this.addDockTab(i),
      removeDockTab: (i) => this.removeDockTab(i),
      refreshDockTab: (i) => this.refreshDockTab(i),
      onPhase: (i, n) => this.onPhase(i, n),
      addKeybinding: (i) => {
        this.uiDisposables.push(this.keyManager.register(i));
      }
    };
    e.install(t);
  }
  /**
   * Add a UI element into the lifecycle after the initial build (e.g. from a
   * plugin). The element is mounted, then caught up to whatever phase the UI
   * has already reached.
   */
  addElement(e, t) {
    if (this.destroyed) {
      console.warn("Cannot add a UI element after the UI is destroyed.");
      return;
    }
    this.elements.push(e), e.mount(t), this.emittedPhases.has("afterMount") && e.afterMount(), this.emittedPhases.has("graphReady") && e.graphReady();
  }
  /* ---------- canvas legend ---------- */
  /**
   * Replace `UI.legend` at runtime. The element is built on first need, so a graph
   * that started without a legend can be given one; an `undefined` config empties
   * the legend and drops its filter.
   */
  setLegend(e) {
    var n;
    if (this.destroyed) {
      console.warn("Cannot set the legend after the UI is destroyed.");
      return;
    }
    this.options.legend = e;
    const t = this.legend;
    if (t) {
      t.refresh();
      return;
    }
    if (!ha(e) || !((n = this.layout) != null && n.legend)) return;
    const i = new aa(this);
    this.byKey.set("legend", i), this.addElement(i, this.layout.legend);
  }
  /* ---------- sidebar extra panels ---------- */
  /**
   * Register a sidebar panel at any point in the graph's life — before or
   * after `graphReady`, and from a plugin's `install`. A panel added late
   * mounts immediately and is rendered against the current selection.
   *
   * Registration succeeds in every mode; the panel is only *shown* in the
   * modes that have a sidebar (`full`), and mounts as soon as one exists.
   *
   * @param panel - The panel. `id` is auto-generated when omitted.
   * @returns A disposer that removes the panel. Calling it twice is a no-op.
   */
  addPanel(e) {
    if (this.destroyed)
      return console.warn("Cannot add a sidebar panel after the UI is destroyed."), () => {
      };
    const t = e.id ?? `pvt-panel-${++this.panelSeq}`;
    if (this.panels.some((o) => o.id === t))
      return console.warn(`A sidebar panel with id "${t}" is already registered; skipping the duplicate.`), () => {
      };
    const i = { ...e, id: t }, n = this.panelInsertIndex(i.order ?? 0);
    this.panels.splice(n, 0, i), this.emitPanelChange({ type: "add", panel: i, index: n });
    let s = !1;
    return () => {
      s || (s = !0, this.removePanel(t));
    };
  }
  /** Remove a registered panel by id: its DOM goes and it stops re-rendering. */
  removePanel(e) {
    const t = this.panels.findIndex((i) => i.id === e);
    if (t === -1) {
      this.destroyed || console.warn(`No sidebar panel with id "${e}" to remove.`);
      return;
    }
    this.panels.splice(t, 1), this.emitPanelChange({ type: "remove", id: e });
  }
  /**
   * Re-resolve a panel's `title` and `render` against the current selection —
   * for when the panel's *own* data changed rather than the selection. Omit
   * `id` to refresh every panel. Refreshes a `reactive: false` panel too.
   */
  refreshPanel(e) {
    if (e !== void 0 && !this.panels.some((t) => t.id === e)) {
      console.warn(`No sidebar panel with id "${e}" to refresh.`);
      return;
    }
    this.emitPanelChange({ type: "refresh", id: e });
  }
  /** The registered panels, in display order (a copy — mutate through addPanel / removePanel). */
  getPanels() {
    return [...this.panels];
  }
  /**
   * Subscribe to registry changes. Used by the sidebar's panel host to keep
   * its DOM in step; returns an unsubscribe function.
   */
  onPanelsChanged(e) {
    return this.panelSubscribers.push(e), () => {
      this.panelSubscribers = this.panelSubscribers.filter((t) => t !== e);
    };
  }
  /** First index whose `order` sorts after `order` — so equal orders keep registration order. */
  panelInsertIndex(e) {
    const t = this.panels.findIndex((i) => (i.order ?? 0) > e);
    return t === -1 ? this.panels.length : t;
  }
  emitPanelChange(e) {
    for (const t of [...this.panelSubscribers]) t(e);
  }
  /* ---------- dock tabs ---------- */
  /**
   * Register a pane in the bottom dock, at any point in the graph's life — before or
   * after `graphReady`, and from a plugin's `install`.
   *
   * **The first tab brings the region with it.** Plugins install after the UI is
   * built (`Graph` constructs the UIManager before it runs `options.plugins`), so a
   * tab always arrives too late for the dock's `UI_ELEMENTS` gate to have said yes on
   * its behalf. Rather than make every consumer turn the dock on separately,
   * registering a tab builds it — the same on-first-need construction
   * {@link setLegend} uses.
   *
   * Registration succeeds in every mode; the tab is only *shown* in the modes that
   * have a dock (`full`).
   *
   * @param tab - The tab. `id` is auto-generated when omitted.
   * @returns A disposer that removes the tab. Calling it twice is a no-op.
   */
  addDockTab(e) {
    if (this.destroyed)
      return console.warn("Cannot add a dock tab after the UI is destroyed."), () => {
      };
    const t = e.id ?? `pvt-dock-tab-${++this.dockTabSeq}`;
    if (this.dockTabs.some((o) => o.id === t))
      return console.warn(`A dock tab with id "${t}" is already registered; skipping the duplicate.`), () => {
      };
    const i = { ...e, id: t }, n = this.dockTabInsertIndex(i.order ?? 0);
    this.dockTabs.splice(n, 0, i), this.emitDockTabChange({ type: "add", tab: i, index: n }), this.ensureDock();
    let s = !1;
    return () => {
      s || (s = !0, this.removeDockTab(t));
    };
  }
  /** Remove a registered dock tab by id: its DOM goes, and the strip closes over it. */
  removeDockTab(e) {
    const t = this.dockTabs.findIndex((n) => n.id === e);
    if (t === -1) {
      this.destroyed || console.warn(`No dock tab with id "${e}" to remove.`);
      return;
    }
    const [i] = this.dockTabs.splice(t, 1);
    this.emitDockTabChange({ type: "remove", tab: i });
  }
  /** Bring a registered tab to the front, unfolding the dock if it is folded. */
  activateDockTab(e) {
    if (!this.dockTabs.some((t) => t.id === e)) {
      console.warn(`No dock tab with id "${e}" to activate.`);
      return;
    }
    this.emitDockTabChange({ type: "activate", id: e });
  }
  /**
   * Rebuild a registered tab's body by calling its `render` again. A pane with its own
   * internal views uses this to switch between them — see {@link DockTabHandle.refresh}.
   */
  refreshDockTab(e) {
    if (!this.dockTabs.some((t) => t.id === e)) {
      this.destroyed || console.warn(`No dock tab with id "${e}" to refresh.`);
      return;
    }
    this.emitDockTabChange({ type: "refresh", id: e });
  }
  /** The registered tabs, in display order (a copy — mutate through addDockTab / removeDockTab). */
  getDockTabs() {
    return [...this.dockTabs];
  }
  /**
   * Subscribe to registry changes. Used by the dock to keep its strip in step;
   * returns an unsubscribe function.
   */
  onDockTabsChanged(e) {
    return this.dockTabSubscribers.push(e), () => {
      this.dockTabSubscribers = this.dockTabSubscribers.filter((t) => t !== e);
    };
  }
  /** First index whose `order` sorts after `order` — so equal orders keep registration order. */
  dockTabInsertIndex(e) {
    const t = this.dockTabs.findIndex((i) => (i.order ?? 0) > e);
    return t === -1 ? this.dockTabs.length : t;
  }
  emitDockTabChange(e) {
    for (const t of [...this.dockTabSubscribers]) t(e);
  }
  /**
   * Build the dock if tabs want one and this mode has a slot for it. A no-op once it
   * exists, so it is safe to call on every registration.
   */
  ensureDock() {
    var t;
    if (this.dock || !this.dockTabs.length || !((t = this.layout) != null && t.dock)) return;
    const e = new la(this, ua(this.options));
    this.byKey.set("dock", e), this.addElement(e, this.layout.dock);
  }
  destroy() {
    this.destroyed = !0, this.emitPhase("destroy"), this.elements = [], this.byKey.clear(), this.phaseHandlers = { afterMount: [], graphReady: [], destroy: [] }, this.emittedPhases.clear(), this.installedPlugins.clear(), this.panels = [], this.panelSubscribers = [], this.dockTabs = [], this.dockTabSubscribers = [], this.modeStore.dispose();
    for (const e of this.uiDisposables.splice(0)) e();
  }
  async toggleFullscreen(e) {
    (e !== void 0 ? e : !document.fullscreenElement) ? document.fullscreenElement || await this.container.requestFullscreen() : document.fullscreenElement && await document.exitFullscreen();
  }
  isFullscreenOn() {
    return !!document.fullscreenElement;
  }
  getOptions() {
    return this.options;
  }
  /**
   * Whether one of the write-path editors is offered at all, per its
   * `editors.<editor>.enabled` flag (on unless explicitly `false`). Affordances ask
   * this before rendering themselves, so an integration whose backend forbids an
   * operation *removes* the button instead of vetoing every click.
   */
  isEditorEnabled(e) {
    var t, i;
    return ((i = (t = this.options.editors) == null ? void 0 : t[e]) == null ? void 0 : i.enabled) !== !1;
  }
  getAppContainer() {
    const e = this.graph.getAppID();
    return document.getElementById(e);
  }
  callGraphReady() {
    this.emitPhase("graphReady");
  }
  /**
  * Show a notification in the UI.
  *
  * @param notification - The notification to display
  */
  showNotification(e) {
    var d;
    const { level: t, title: i, message: n } = e, s = (d = this.layout) == null ? void 0 : d.notification;
    if (!s) return;
    const o = document.createElement("template");
    o.innerHTML = `
  <div class="pivotick-toast pivotick-toast-${t}">
    <div class="pivotick-toast-title">
    </div>
    <div class="pivotick-toast-body">
    </div>
  </div>
`;
    const a = o.content.firstElementChild, l = a.querySelector(".pivotick-toast-title"), h = a.querySelector(".pivotick-toast-body");
    l && (l.textContent = i), h && (h.textContent = n ?? ""), s.appendChild(a), requestAnimationFrame(() => {
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
  createModal(e) {
    var n, s;
    if (!((n = this.layout) == null ? void 0 : n.modal)) return;
    const i = new cp(this, e);
    return i.mount((s = this.layout) == null ? void 0 : s.modal), requestAnimationFrame(() => {
      i.show();
    }), i;
  }
  /**
  * Show a sidepanel in the UI.
  *
  * @param slidepanelOption - The notification to display
  */
  createSlidepanel(e) {
    var n, s;
    if (!((n = this.layout) == null ? void 0 : n.slidePanel)) return;
    const i = new Vu(this, e);
    return i.mount((s = this.layout) == null ? void 0 : s.slidePanel), i;
  }
}
const gi = {
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info"
};
class kg {
  constructor(e) {
    c(this, "graph");
    c(this, "UIManager");
    this.graph = e, this.UIManager = this.graph.UIManager;
  }
  /**
   * Dispatch a notification to the UIManager.
   * 
   * @param level - The severity level of the notification.
   * @param title - The title to display in the notification.
   * @param message - Optional detailed message for the notification.
   */
  notify(e, t, i) {
    const n = { level: e, title: t, message: i };
    this.UIManager.showNotification(n);
  }
  success(e, t) {
    this.notify(gi.Success, e, t);
  }
  warning(e, t) {
    this.notify(gi.Warning, e, t);
  }
  error(e, t) {
    this.notify(gi.Danger, e, t);
  }
  info(e, t) {
    this.notify(gi.Info, e, t);
  }
}
function Cg(r, e, t, i) {
  var l, h;
  const n = dt(`
        <div class="main-container">
            <div class="edgeinfo-container">
                <div>Editing edge: </div>
                <div class="edgeinfo-name"></div>
            </div>
        </div>
    `), s = n.querySelector(".edgeinfo-name");
  s && (s.textContent = Eg(r, t));
  let o = null, a;
  if (i)
    a = i(e);
  else {
    const d = Sg(r, (h = (l = t.getOptions().editors) == null ? void 0 : l.edgeEditor) == null ? void 0 : h.fields);
    a = d.body, o = d.form;
  }
  t.createModal({
    id: "edit-edge-modal",
    rawHeader: !0,
    header: n,
    body: a,
    rawBody: !0,
    // Any dismissal that isn't a commit (×, Cancel, backdrop) must end the session,
    // or it stays `active` and openEdgeSession short-circuits — so a second Edit on
    // the same edge would never reopen. A commit already deactivated it, hence the guard.
    onHide: () => {
      e.active && e.cancel();
    },
    buttons: [
      {
        variant: "secondary",
        text: "Cancel",
        iconUnicode: "×",
        onClick: (d, u) => {
          u();
        }
      },
      {
        variant: "primary",
        text: "Edit Edge",
        svgIcon: ke,
        onClick: async (d, u) => {
          o && e.setDraft(ct.getValues(o)), await e.commit() && u();
        }
      }
    ],
    position: "top",
    size: "lg",
    noBodyPadding: !0
  });
}
function Eg(r, e) {
  const t = e.getOptions().mainHeader, i = ot(r.from, t).trim() || r.from.id, n = ot(r.to, t).trim() || r.to.id;
  return `${i} → ${n}`;
}
function Sg(r, e) {
  const t = document.createElement("div");
  t.classList.add("edit-edge-modal-body");
  const i = ct.createForm({ fields: e ?? xg(r) });
  return t.append(i), { body: t, form: i };
}
function xg(r) {
  const e = Object.entries(r.getData());
  return e.length ? e.map(([t, i]) => ({
    key: t,
    label: ct.niceLabelFromKey(t),
    type: "text",
    defaultValue: i == null ? "" : String(i)
  })) : [{ key: "label", label: "Label", type: "text", defaultValue: "" }];
}
function Mg(r, e, t, i) {
  var h, d;
  const s = dt(`
        <div class="main-container">
            <div class="icon-container"></div>
            <div class="nodeinfo-container">
                <div>Editing node: </div>
                <div class="nodeinfo-name"></div>
            </div>
        </div>
    `), o = s.querySelector(".nodeinfo-name");
  o && (o.textContent = ot(r, t.getOptions().mainHeader)), (h = s.querySelector(".icon-container")) == null || h.appendChild(re(r, { size: 42, className: "icon" }));
  let a, l;
  if (i)
    a = i(e);
  else {
    const u = Tg(r);
    a = u.body, l = u.form;
    const p = document.querySelector("#inspect-node-modal");
    p && ((d = p.__modalInstance) == null || d.destroy());
  }
  t.createModal({
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
      e.active && e.cancel();
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
        svgIcon: ke,
        onClick: async (u, p) => {
          const g = ct.getValues(l);
          e.setDraft(g), await e.commit() && p();
        }
      }
    ],
    position: "top",
    size: "xl",
    noBodyPadding: !0
  });
}
function Tg(r) {
  const e = document.createElement("div");
  e.classList.add("edit-node-modal-body");
  const t = [];
  Object.entries(r.getData()).forEach(([n, s]) => {
    const o = {
      key: n,
      label: ct.niceLabelFromKey(n),
      type: "text",
      defaultValue: s.toString()
    };
    t.push(o);
  });
  const i = ct.createForm({
    fields: t
  });
  return e.append(i), { body: e, form: i };
}
const jr = "pvt-prompt-modal-body";
function ss(r, e) {
  return new Promise((t) => {
    var a;
    const i = document.createElement("div");
    i.className = e.bodyClass ? `${jr} ${e.bodyClass}` : jr, e.populate(i);
    let n = !1;
    const s = (l) => {
      n || (n = !0, t(l), o == null || o.hide());
    }, o = r.UIManager.createModal({
      header: e.title ?? "Details",
      body: i,
      rawBody: !0,
      buttons: [
        { variant: "secondary", text: e.cancelLabel ?? "Cancel", onClick: () => s(null) },
        { variant: e.submitVariant ?? "primary", text: e.submitLabel ?? "Add", onClick: () => s(e.collect()) }
      ],
      // Any other close path (×, overlay click, Esc) resolves as a cancel.
      onHidden: () => s(null)
    });
    if (!o)
      return console.warn("Pivotick: modal prompt unavailable in this UI mode; the prompt was cancelled."), t(null);
    i.addEventListener("keydown", (l) => {
      var h;
      l.stopPropagation(), l.key === "Escape" ? (l.preventDefault(), s(null)) : l.key === "Enter" && ((h = l.target) == null ? void 0 : h.tagName) === "INPUT" && (l.preventDefault(), s(e.collect()));
    }), (a = i.querySelector("form")) == null || a.addEventListener("submit", (l) => {
      l.preventDefault(), s(e.collect());
    }), requestAnimationFrame(() => {
      const l = i.querySelector("input, select, textarea");
      l == null || l.focus(), l instanceof HTMLInputElement && l.select();
    });
  });
}
function pa(r, e, t) {
  let i = null;
  return ss(r, {
    title: e.title ?? t.title,
    submitLabel: e.submitLabel,
    cancelLabel: e.cancelLabel,
    bodyClass: t.bodyClass,
    populate: (n) => {
      var s;
      if (e.render) {
        e.render(n);
        return;
      }
      (s = e.fields) != null && s.length && (i = ct.createForm({ fields: e.fields }), n.appendChild(i));
    },
    collect: () => e.render ? e.getValues ? e.getValues() : {} : i ? ct.getValues(i) : {}
  });
}
function Ag(r, e = {}) {
  return ss(r, {
    title: e.title ?? "Confirm",
    submitLabel: e.confirmLabel ?? "Confirm",
    cancelLabel: e.cancelLabel ?? "Cancel",
    submitVariant: e.variant ?? "danger",
    bodyClass: "pvt-confirm-modal-body",
    populate: (i) => {
      if (e.body) {
        if (typeof e.body == "string") {
          const n = document.createElement("p");
          n.className = "pvt-confirm-modal-text", n.textContent = e.body, i.appendChild(n);
          return;
        }
        i.appendChild(e.body);
      }
    },
    collect: () => !0
  }).then((i) => i === !0);
}
async function Ng(r, e) {
  var o;
  const t = Ig(r, e);
  if (!t.nodes.length && !t.edges.length && !t.notes.length)
    return { accepted: !1, nodes: [], edges: [], notes: [] };
  const i = (o = r.getOptions().callbacks) == null ? void 0 : o.onBeforeDelete;
  if (!i)
    return Wr(r, t.nodes, t.edges, t.notes);
  const n = {
    nodes: t.nodes,
    edges: t.edges,
    notes: t.notes,
    cascadingEdges: t.cascadingEdges,
    origin: e.origin,
    confirm: (a) => Ag(r, a)
  }, s = _g(await i(n));
  return s.accept ? Wr(
    r,
    bn(t.nodes, s.nodes),
    bn(t.edges, s.edges),
    bn(t.notes, s.notes)
  ) : { accepted: !1, nodes: [], edges: [], notes: [] };
}
function ga(r, e) {
  if (!e.length) return [];
  const t = new Set(e.map((i) => i.id));
  return r.getMutableEdges().filter((i) => t.has(i.from.id) || t.has(i.to.id));
}
function Ig(r, e) {
  const t = bi((e.nodes ?? []).filter((a) => !!r.getMutableNode(a.id))), i = bi((e.notes ?? []).filter((a) => r.noteManager.hasNote(a.id))), n = bi((e.edges ?? []).filter((a) => !!r.getMutableEdge(a.id))), s = new Set(n.map((a) => a.id)), o = ga(r, t).filter((a) => !s.has(a.id));
  return { nodes: t, edges: n, notes: i, cascadingEdges: o };
}
function bi(r) {
  const e = /* @__PURE__ */ new Set();
  return r.filter((t) => e.has(t.id) ? !1 : (e.add(t.id), !0));
}
function _g(r) {
  return r === !0 ? { accept: !0 } : r ? { accept: r.accept, nodes: r.nodes, edges: r.edges, notes: r.notes } : { accept: !1 };
}
function bn(r, e) {
  if (!e) return r;
  const t = new Set(r.map((i) => i.id));
  return bi(e.filter((i) => t.has(i.id)));
}
function Wr(r, e, t, i) {
  const n = ga(r, e);
  for (const o of i) r.noteManager.removeNote(o);
  for (const o of e) r.removeNode(o.id);
  const s = [...n];
  for (const o of t)
    r.getMutableEdge(o.id) && (r.removeEdge(o.id), s.push(o));
  return { accepted: !0, nodes: e, edges: s, notes: i };
}
class Rg {
  constructor(e, t) {
    /**
     * The edge being edited.
     */
    c(this, "edge");
    /**
     * Snapshot of the original edge data when the session started.
     */
    c(this, "originalData");
    /**
     * Mutable draft data.
     *
     * Consumers can either mutate this object directly
     * or replace it via `setDraft`.
     */
    c(this, "draft");
    /**
     * Whether the session is still active.
     */
    c(this, "active", !0);
    c(this, "manager");
    this.manager = e, this.edge = t;
    const i = t.getData();
    this.originalData = { ...i }, this.draft = { ...i };
  }
  /**
   * Replaces the current draft.
   */
  setDraft(e) {
    this.ensureActive(), this.draft = e;
  }
  /**
   * Commits the draft data to the edge.
   *
   * With no `onBeforeEdgeEditCommit` hook the draft is written straight through.
   * With one, the hook decides — and a refusal leaves the edge's data untouched so
   * the user can correct the form and retry.
   *
   * @returns whether the commit went through.
   */
  async commit() {
    var o, a;
    this.ensureActive();
    const e = this.manager.graph, t = this.edge.getData(), i = this.draft, n = (o = e.getOptions().callbacks) == null ? void 0 : o.onBeforeEdgeEditCommit;
    if (n && await n({
      edge: this.edge,
      previousData: t,
      nextData: i,
      session: this
    }) === !1)
      return !1;
    this.edge.setData(i), e.edgeDataChanged(this.edge, t, i), e.renderer.update(!0), e.nextTickFor([this.edge.from, this.edge.to]);
    const s = e.renderer.getGraphInteraction();
    return ((a = s.getSelectedEdge()) == null ? void 0 : a.edge.id) === this.edge.id && s.selectEdge(this.edge.getGraphElement(), this.edge), this.active = !1, this.manager.closeEdgeSession(this.edge.id), !0;
  }
  /**
   * Cancels the edit session.
   *
   * No data is written to the edge.
   */
  cancel() {
    var e, t;
    this.ensureActive(), (t = (e = this.manager.graph.getOptions().callbacks) == null ? void 0 : e.onEdgeEditCancel) == null || t.call(e, this.edge), this.active = !1, this.manager.closeEdgeSession(this.edge.id);
  }
  ensureActive() {
    if (!this.active)
      throw new Error("This edit session is no longer active.");
  }
}
const fa = "pvt-edge-prompt-modal-body";
function Lg(r, e, t = {}) {
  var i;
  return t.mode === "modal" ? (i = r.UIManager.layout) != null && i.modal ? Og(r, t) : (console.warn("Pivotick: modal label prompt unavailable in this UI mode; using the inline prompt instead."), Vr(r, e, t)) : Vr(r, e, t);
}
function Dg(r, e) {
  return pa(r, e, { title: "Edge details", bodyClass: fa });
}
function ma(r) {
  const e = document.createElement("input");
  return e.type = "text", e.className = "pvt-edge-label-input", e.value = r.initial ?? "", e.placeholder = r.placeholder ?? "Label…", e;
}
function Vr(r, e, t) {
  return new Promise((i) => {
    var g;
    const n = (g = r.UIManager.layout) == null ? void 0 : g.canvas;
    if (!n) return i(null);
    const s = ma(t), o = n.getBoundingClientRect(), a = ((e == null ? void 0 : e.x) ?? o.left + o.width / 2) - o.left, l = ((e == null ? void 0 : e.y) ?? o.top + o.height / 2) - o.top;
    s.style.left = `${a}px`, s.style.top = `${l}px`;
    let h = !1;
    const d = (f) => {
      h || (h = !0, s.removeEventListener("keydown", u), s.removeEventListener("blur", p), s.remove(), i(f));
    }, u = (f) => {
      f.stopPropagation(), f.key === "Enter" ? (f.preventDefault(), d(s.value)) : f.key === "Escape" && (f.preventDefault(), d(null));
    }, p = () => d(null);
    s.addEventListener("keydown", u), s.addEventListener("blur", p), n.appendChild(s), requestAnimationFrame(() => {
      s.focus(), s.select();
    });
  });
}
function Og(r, e) {
  const t = ma(e);
  return ss(r, {
    title: e.title ?? "Edge label",
    bodyClass: fa,
    populate: (i) => i.appendChild(t),
    collect: () => t.value
  });
}
const Ai = class Ai {
  constructor(e, t, i, n = !0) {
    c(this, "graph");
    c(this, "connectManager");
    c(this, "canvas");
    c(this, "activateImmediately");
    c(this, "mode");
    c(this, "sourceElement", null);
    c(this, "hoveredNode", null);
    c(this, "pointerPosition", null);
    c(this, "dragStartPosition", null);
    c(this, "state", "idle");
    /** True while an async `onBeforeEdgeCreate` decision is in flight — locks out new gestures. */
    c(this, "deciding", !1);
    c(this, "handlePointerMove", (e) => {
      this.deciding || (this.updateDragState(e), !(this.state !== "dragging" && this.state !== "click-connect") && (this.updatePointerPosition(e), this.updateHoveredNode(), this.updateShadowEdge()));
    });
    c(this, "handleContextMenu", (e) => {
      if (e.preventDefault(), e.stopPropagation(), !this.deciding) {
        if (this.sourceElement) {
          this.clearSource(), this.hoveredNode = null, this.updateCanvasState(), this.graph.renderer.hideShadowEdge();
          return;
        }
        this.connectManager.finishInteraction();
      }
    });
    c(this, "handlePointerUp", () => {
      if (this.deciding) return;
      if (this.state === "pending-drag") {
        this.clearSource(), this.state = "idle", this.dragStartPosition = null;
        return;
      }
      if (this.state !== "dragging")
        return;
      const e = this.graph.renderer.getNodeClosestToCursor(30);
      if (e && this.sourceElement) {
        if (this.sourceElement === e) {
          this.connectManager.finishInteraction();
          return;
        }
        const t = this.sourceElement;
        this.dragStartPosition = null, this.settleDecision(
          () => this.attemptConnection(t, e, "drag"),
          () => this.connectManager.restart()
        );
        return;
      }
      this.dragStartPosition = null, this.connectManager.restart();
    });
    this.graph = e, this.connectManager = t, this.canvas = this.graph.UIManager.layout.canvas, this.mode = i, this.activateImmediately = n;
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
  selectOrConnectNode(e) {
    if (this.deciding) return !0;
    if (this.state === "idle")
      return this.sourceElement = e, this.graph.highlightElement(e), this.state = "click-connect", this.activateInteractionUI(), !0;
    if (this.sourceElement === e)
      return this.connectManager.finishInteraction(), !0;
    if (this.sourceElement) {
      const t = this.sourceElement;
      return this.settleDecision(
        () => this.attemptConnection(t, e, "click"),
        () => this.connectManager.finishInteraction(!0)
      ), !0;
    }
    return this.connectManager.finishInteraction(!0), !0;
  }
  handleNoteClick(e) {
    return this.deciding ? !0 : this.state === "idle" ? (this.sourceElement = e, this.state = "click-connect", this.activateInteractionUI(), this.updateCanvasState(), !0) : !1;
  }
  updateDragState(e) {
    if (!this.dragStartPosition)
      return;
    const t = e.clientX - this.dragStartPosition.x, i = e.clientY - this.dragStartPosition.y;
    this.state === "pending-drag" && Math.hypot(t, i) > Ai.DRAG_THRESHOLD && (this.state = "dragging", this.activateInteractionUI(), this.sourceElement instanceof et && this.graph.highlightElement(this.sourceElement), this.updateCanvasState());
  }
  updatePointerPosition(e) {
    this.pointerPosition = this.graph.renderer.screenToGraphCoordinates(
      e.clientX,
      e.clientY
    );
  }
  updateHoveredNode() {
    this.hoveredNode = this.graph.renderer.getNodeClosestToCursor(30);
  }
  updateShadowEdge() {
    if (!this.sourceElement || !this.pointerPosition) return;
    const e = this.isTargetInvalid(this.sourceElement, this.hoveredNode);
    this.graph.renderer.showShadowEdge({
      source: this.sourceElement,
      targetNode: this.hoveredNode ?? void 0,
      targetPosition: this.hoveredNode ? void 0 : this.pointerPosition,
      invalid: e
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
  async attemptConnection(e, t, i) {
    var a;
    if (this.isTargetInvalid(e, t)) return;
    const n = (a = this.graph.getOptions().callbacks) == null ? void 0 : a.onBeforeEdgeCreate, s = this.getStaticLabelPromptMode(), o = n ? await this.resolveDecision(n, e, t, i) : await this.resolveStaticDecision(e, t, s);
    if (o.accept) {
      if (e instanceof et) {
        const l = !!n;
        this.connectManager.createEdge(e, t, o, { allowDuplicate: l });
        return;
      }
      e instanceof It && this.connectManager.createNoteLink(e, t);
    }
  }
  /** Invoke the before-create hook (if any) and normalise its return value. */
  async resolveDecision(e, t, i, n) {
    if (!e) return { accept: !0 };
    const s = t instanceof It ? "note-link" : "edge", a = await e({
      source: t,
      target: i,
      origin: n,
      kind: s,
      promptLabel: (l) => this.promptEdgeLabel(t, i, l),
      promptData: (l) => Dg(this.graph, l)
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
  async resolveStaticDecision(e, t, i) {
    if (!i || !(e instanceof et)) return { accept: !0 };
    const n = await this.promptEdgeLabel(e, t, { mode: i });
    return n === null ? { accept: !1 } : { accept: !0, data: { label: n } };
  }
  getStaticLabelPromptMode() {
    var e, t;
    return (t = (e = this.graph.UIManager.getOptions().editors) == null ? void 0 : e.edgeEditor) == null ? void 0 : t.labelPrompt;
  }
  /** Open the label prompt anchored at the (source→target) edge midpoint. */
  promptEdgeLabel(e, t, i) {
    const n = t.x ?? 0, s = t.y ?? 0;
    let o = n, a = s;
    e instanceof et && e.x != null && e.y != null && (o = (e.x + n) / 2, a = (e.y + s) / 2);
    const l = this.graph.renderer.graphToScreenCoordinates(o, a);
    return Lg(this.graph, l, i);
  }
  /** True when a live `isValidConnection` predicate rejects the hovered target. */
  isTargetInvalid(e, t) {
    var n;
    if (!t || e === t) return !1;
    const i = (n = this.graph.getOptions().callbacks) == null ? void 0 : n.isValidConnection;
    return i ? !i(e, t) : !1;
  }
  /** Run an async decision under the `deciding` lock (keeps the preview up, blocks new gestures). */
  async runDecision(e) {
    this.deciding = !0;
    try {
      await e();
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
  async settleDecision(e, t) {
    try {
      await this.runDecision(e);
    } catch (i) {
      console.warn("Pivotick: onBeforeEdgeCreate decision failed", i);
    }
    this.connectManager.ownsSession(this) && t();
  }
  beginDragConnection(e, t) {
    this.deciding || this.state === "dragging" || this.state === "click-connect" || (this.state = "pending-drag", this.sourceElement = e, this.dragStartPosition = {
      x: t.clientX,
      y: t.clientY
    });
  }
  clearSource() {
    var e, t;
    this.sourceElement instanceof et && ((t = (e = this.graph).unHighlightElement) == null || t.call(e, this.sourceElement)), this.sourceElement = null;
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
c(Ai, "DRAG_THRESHOLD", 4);
let je = Ai;
class Fg {
  constructor(e) {
    c(this, "graph");
    c(this, "activeSession", null);
    c(this, "modeActive", !1);
    c(this, "deferUIActivation", !1);
    c(this, "currentMode", null);
    c(this, "listeners", {
      start: /* @__PURE__ */ new Set(),
      stop: /* @__PURE__ */ new Set()
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    c(this, "nodeClickCB", (e, t, i, n) => {
      if (!this.activeSession || this.currentMode === "note-link" && this.activeSession.getState() === "idle")
        return !1;
      n.cancel(), this.selectOrConnectNode(t);
    });
    c(this, "nodePointerDownCB", (e, t) => {
      this.activeSession && (this.currentMode === "note-link" && this.activeSession.getState() === "idle" || this.activeSession.beginDragConnection(t, e));
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    c(this, "noteHandleClickCB", (e, t, i, n) => {
      if (!this.activeSession)
        return !1;
      n.cancel(), this.noteClick(t);
    });
    c(this, "noteHandlePointerDownCB", (e, t) => {
      this.activeSession && this.activeSession.beginDragConnection(t, e);
    });
    this.graph = e;
  }
  on(e, t) {
    this.listeners[e].add(t);
  }
  off(e, t) {
    this.listeners[e].delete(t);
  }
  startClickConnection(e = !1) {
    this.deferUIActivation = e, !this.modeActive && (this.modeActive = !0, this.activeSession = new je(
      this.graph,
      this,
      this.currentMode,
      !this.deferUIActivation
    ), this.activeSession.start(), this.currentMode === "node-edge" && this.graph.simulation.disable(), this.listeners.start.forEach((t) => t(this)));
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
  finishInteraction(e = !1) {
    var t;
    if ((t = this.activeSession) == null || t.cancel(), !e) {
      this.activeSession = null;
      return;
    }
    this.activeSession = new je(
      this.graph,
      this,
      this.currentMode,
      !this.deferUIActivation
    ), this.activeSession.start();
  }
  exitClickConnectionMode() {
    var e;
    this.modeActive = !1, this.currentMode === "node-edge" && this.graph.simulation.enable(), (e = this.activeSession) == null || e.cancel(), this.activeSession = null, this.listeners.stop.forEach((t) => t(this)), this.graph.renderer.getGraphInteraction().off("nodeClick", this.nodeClickCB), this.graph.renderer.getGraphInteraction().off("nodePointerDown", this.nodePointerDownCB), this.graph.renderer.getGraphInteraction().off("noteHandleClick", this.noteHandleClickCB), this.graph.renderer.getGraphInteraction().off("noteHandlePointerDown", this.noteHandlePointerDownCB);
  }
  resetSession() {
    var e;
    (e = this.activeSession) == null || e.cancel(), this.activeSession = new je(
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
  ownsSession(e) {
    return this.modeActive && this.activeSession === e;
  }
  isActiveAndNotIdle() {
    return this.activeSession !== null && this.activeSession.getState() !== "idle";
  }
  getMode() {
    return this.currentMode;
  }
  selectOrConnectNode(e) {
    return this.activeSession ? this.activeSession.selectOrConnectNode(e) : !1;
  }
  /** True if a source→target edge already exists. Exposed so an `onBeforeEdgeCreate` hook can run its own duplicate policy. */
  edgeExists(e, t) {
    return this.graph.getEdges().some(
      (i) => i.source.id === e.id && i.target.id === t.id
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
  createEdge(e, t, i, { allowDuplicate: n = !1 } = {}) {
    if (!n && this.edgeExists(e, t)) return;
    const s = (i == null ? void 0 : i.id) ?? ne(8, "edge-"), o = new Ct(s, e, t, (i == null ? void 0 : i.data) ?? {}, void 0, (i == null ? void 0 : i.directed) ?? null);
    i != null && i.style && o.updateStyle(i.style), this.graph.addEdge(o);
  }
  createNoteLink(e, t) {
    e.setAttachedElement({ type: "node", id: t.id }), this.graph.renderer.update(!0);
  }
  noteClick(e) {
    return this.activeSession ? this.activeSession.handleNoteClick(e) : !1;
  }
}
class Pg {
  constructor(e, t) {
    /**
     * The node being edited.
     */
    c(this, "node");
    /**
     * Snapshot of the original node data when the session started.
     */
    c(this, "originalData");
    /**
     * Mutable draft data.
     *
     * Consumers can either mutate this object directly
     * or replace it via `setDraft`.
     */
    c(this, "draft");
    /**
     * Whether the session is still active.
     */
    c(this, "active", !0);
    c(this, "manager");
    this.manager = e, this.node = t;
    const i = t.getData();
    this.originalData = { ...i }, this.draft = { ...i };
  }
  /**
   * Replaces the current draft.
   */
  setDraft(e) {
    this.ensureActive(), this.draft = e;
  }
  /**
   * Commits the draft data to the node.
   *
   * With no `onBeforeNodeEditCommit` hook the draft is written straight through.
   * With one, userland owns validation / persistence — and a refusal leaves the
   * node's data untouched so the user can correct the form and retry.
   *
   * @returns whether the commit went through.
   */
  async commit() {
    var s;
    this.ensureActive();
    const e = this.manager.graph, t = this.node.getData(), i = this.draft, n = (s = e.getOptions().callbacks) == null ? void 0 : s.onBeforeNodeEditCommit;
    return n && await n({
      node: this.node,
      previousData: t,
      nextData: i,
      session: this
    }) === !1 ? !1 : (this.node.setData(i), e.nodeDataChanged(this.node, t, i), e.renderer.update(!0), e.nextTickFor([this.node]), e.renderer.getGraphInteraction().selectNode(this.node.getGraphElement(), this.node), this.active = !1, this.manager.closeSession(this.node.id), !0);
  }
  /**
   * Cancels the edit session.
   *
   * No data is written to the node.
   */
  cancel() {
    var e, t;
    this.ensureActive(), (t = (e = this.manager.graph.getOptions().callbacks) == null ? void 0 : e.onNodeEditCancel) == null || t.call(e, this.node), this.active = !1, this.manager.closeSession(this.node.id);
  }
  ensureActive() {
    if (!this.active)
      throw new Error("This edit session is no longer active.");
  }
}
const Bg = { label: "New node" };
async function Hg(r, e) {
  var o;
  const t = (o = r.getOptions().callbacks) == null ? void 0 : o.onBeforeNodeCreate, i = t ? $g(await t(zg(r, e))) : { accept: !0 };
  if (!i.accept) return null;
  const n = i.id ?? ne(8, "node-");
  if (r.getMutableNode(n))
    return console.warn(`Pivotick: a node with id ${n} already exists; the create was skipped.`), null;
  const s = new et(n, i.data ?? { ...Bg }, i.style ?? {}, n);
  return s.x = e.position.x, s.y = e.position.y, r.addNode(s), r.selectElement(s), s;
}
function zg(r, e) {
  return {
    position: e.position,
    origin: e.origin,
    promptData: (t) => pa(r, t, { title: "Node details" })
  };
}
function $g(r) {
  return r === !0 ? { accept: !0 } : r ? { accept: r.accept, id: r.id, data: r.data, style: r.style } : { accept: !1 };
}
class Gg {
  constructor(e) {
    c(this, "graph");
    c(this, "connectManager");
    /**
     * Active node edit sessions indexed by node id.
     */
    c(this, "nodeSessions", /* @__PURE__ */ new Map());
    /**
     * Active edge edit sessions indexed by edge id.
     */
    c(this, "edgeSessions", /* @__PURE__ */ new Map());
    /** True while an async before-delete decision is in flight — locks out new requests. */
    c(this, "deleting", !1);
    /** True while an async before-create decision is in flight — locks out new requests. */
    c(this, "creatingNode", !1);
    this.graph = e, this.connectManager = new Fg(this.graph);
  }
  /**
   * Perform a **user-initiated** delete, gated by
   * {@link InterractionCallbacks.onBeforeDelete}. Every delete affordance routes
   * through here; programmatic `graph.removeNode()` / `removeEdge()` does not, and
   * is never gated.
   *
   * A second request is ignored while an async decision is pending, so a
   * double-click can't delete twice or re-enter the consumer's hook.
   *
   * @returns what was actually removed — `accepted: false` when the hook vetoed, so
   * the caller can leave its selection intact.
   */
  async requestDelete(e) {
    if (this.deleting) return { accepted: !1, nodes: [], edges: [], notes: [] };
    this.deleting = !0;
    try {
      return await Ng(this.graph, e);
    } finally {
      this.deleting = !1;
    }
  }
  /**
   * Opens an edit session for a node.
   *
   * If a session already exists for this node,
   * the existing session is returned.
   */
  openNodeSession(e) {
    var o;
    const t = e.id, i = this.nodeSessions.get(t);
    if (i && i.active)
      return i;
    const n = new Pg(this, e);
    this.nodeSessions.set(t, n);
    const s = (o = this.graph.getOptions().callbacks) == null ? void 0 : o.onNodeEdit;
    return Mg(e, n, this.graph.UIManager, s), n;
  }
  /**
   * Returns the active session for a node.
   */
  getNodeSession(e) {
    return this.nodeSessions.get(e);
  }
  /**
   * Opens an edit session for an edge, mirroring {@link openNodeSession}.
   *
   * If a session already exists for this edge, the existing session is returned.
   */
  openEdgeSession(e) {
    var s, o, a;
    const t = this.edgeSessions.get(e.id);
    if (t && t.active)
      return t;
    const i = new Rg(this, e);
    this.edgeSessions.set(e.id, i);
    const n = ((s = this.graph.getOptions().callbacks) == null ? void 0 : s.onEdgeEdit) ?? ((a = (o = this.graph.UIManager.getOptions().editors) == null ? void 0 : o.edgeEditor) == null ? void 0 : a.render);
    return Cg(e, i, this.graph.UIManager, n), i;
  }
  /**
   * Returns the active session for an edge.
   */
  getEdgeSession(e) {
    return this.edgeSessions.get(e);
  }
  /**
   * Closes and removes an edge session.
   *
   * Internal lifecycle method.
   */
  closeEdgeSession(e) {
    this.edgeSessions.delete(e);
  }
  /**
   * Create a node **interactively**, gated by
   * {@link InterractionCallbacks.onBeforeNodeCreate}. The affordances (Create ▸ Add
   * node, the canvas menu's "Add Node Here") route through here; programmatic
   * `graph.addNode()` does not, and is never gated.
   *
   * Without a hook this places a default, unnamed node — the tool still works, the
   * hook is what makes it carry real data. The new node is selected on success so
   * the Edit tool can act on it straight away.
   *
   * @returns the new node, or `null` when the hook vetoed.
   */
  async requestNodeCreate(e) {
    if (this.creatingNode) return null;
    this.creatingNode = !0;
    try {
      return await Hg(this.graph, e);
    } finally {
      this.creatingNode = !1;
    }
  }
  /**
   * Closes and removes a session.
   *
   * Internal lifecycle method.
   */
  closeSession(e) {
    this.nodeSessions.delete(e);
  }
  /**
   * Closes all active sessions.
   */
  closeAllSessions() {
    for (const e of this.nodeSessions.values())
      e.active = !1;
    for (const e of this.edgeSessions.values())
      e.active = !1;
    this.nodeSessions.clear(), this.edgeSessions.clear();
  }
}
class Ug {
  constructor(e) {
    c(this, "notes", /* @__PURE__ */ new Map());
    c(this, "hiddenNotes", /* @__PURE__ */ new Set());
    c(this, "graph");
    this.graph = e;
  }
  addNote(e, t = !1) {
    this.notes.set(e.id, e), t || (this.graph.noteAdd(e), this.graph.onChange());
  }
  removeNote(e) {
    const t = typeof e == "string" ? e : e.id, i = this.getNote(t);
    i && (this.hiddenNotes.delete(i), this.notes.delete(t), this.graph.noteRemove(i), this.graph.onChange());
  }
  editNote(e) {
    this.notes.has(e.id) && (this.notes.set(e.id, e), this.graph.noteChange(e), this.graph.onChange());
  }
  getNote(e) {
    return this.notes.get(e);
  }
  getNotes() {
    return Array.from(this.notes.values());
  }
  getHiddenNotes() {
    return Array.from(this.hiddenNotes);
  }
  getVisibleNotes() {
    return this.getNotes().filter((e) => !this.hiddenNotes.has(e));
  }
  clear() {
    this.notes.clear(), this.hiddenNotes.clear(), this.graph.onChange();
  }
  hideAll() {
    this.getNotes().forEach((e) => {
      e.visible = !1, this.hiddenNotes.add(e), this.graph.noteChange(e);
    }), this.graph.onChange();
  }
  showAll() {
    this.hiddenNotes.forEach((e) => {
      e.visible = !0, this.hiddenNotes.delete(e), this.graph.noteChange(e);
    }), this.graph.onChange();
  }
  hasNote(e) {
    return this.notes.has(e);
  }
  isVisible(e) {
    return !this.hiddenNotes.has(e);
  }
  isHidden(e) {
    return this.hiddenNotes.has(e);
  }
  count() {
    return this.notes.size;
  }
  hideNote(e) {
    this.hiddenNotes.add(e), e.visible = !1, this.graph.noteChange(e), this.graph.onChange();
  }
  showNote(e) {
    this.hiddenNotes.delete(e), e.visible = !0, this.graph.noteChange(e), this.graph.onChange();
  }
}
const qg = 1500, jg = 4e3, Wg = 200, Vg = 70, Kg = 400, Kr = 4, Yr = 4, Yg = 3.6, Xg = 2, Zg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M3.4 3.4l5.2 5.2M8.6 5.6v3h-3"/></svg>';
class Qg extends it {
  constructor(t, i = {}) {
    super(t);
    c(this, "options");
    c(this, "root");
    c(this, "surface");
    /** The collapse toggle, and whether it has the minimap folded away. */
    c(this, "toggle");
    c(this, "collapsed", !1);
    /** Whether the collapsed state follows the available room (`collapsed: 'auto'`). */
    c(this, "autoCollapse");
    /** Latched by the first explicit choice, which ends {@link autoCollapse}. */
    c(this, "userChose", !1);
    c(this, "context");
    /** Offscreen content layer, and the graph-space extent it covers. */
    c(this, "bitmap");
    c(this, "bitmapBounds", null);
    c(this, "observer");
    /** Hidden element used to resolve CSS colour expressions (see cssColor). */
    c(this, "probe");
    /** Resolved colours, keyed by the expression they came from. */
    c(this, "colorCache", /* @__PURE__ */ new Map());
    c(this, "rebuildFrame", null);
    c(this, "paintFrame", null);
    /** Offset between the pointer and the viewport centre, held for the duration of a drag. */
    c(this, "dragOffset", null);
    /** Whether the pointer moved since it went down — a press that doesn't move is a click. */
    c(this, "dragMoved", !1);
    /** Counts content rasterisations — asserted by the tests, cheap enough to always keep. */
    c(this, "rebuildCount", 0);
    this.options = i, this.autoCollapse = i.collapsed === "auto", this.collapsed = i.collapsed === !0;
  }
  /* ---------- lifecycle ---------- */
  onMount(t) {
    t && (this.root = document.createElement("div"), this.root.className = "pvt-minimap", this.root.dataset.position = this.options.position ?? "bottom-right", this.surface = document.createElement("canvas"), this.surface.className = "pvt-minimap-surface", this.root.appendChild(this.surface), this.toggle = document.createElement("button"), this.toggle.type = "button", this.toggle.className = "pvt-minimap-toggle", this.toggle.innerHTML = Zg, this.listen(this.toggle, "click", () => this.setCollapsed(!this.collapsed)), this.root.appendChild(this.toggle), this.probe = document.createElement("span"), this.probe.style.display = "none", this.root.appendChild(this.probe), t.appendChild(this.root), this.context = this.surface.getContext("2d") ?? void 0, this.autoCollapse && (this.collapsed = !this.hasRoom(Yr)), this.applyCollapsed(), this.resize(), this.wirePointer());
  }
  onAfterMount() {
    var o;
    const t = this.uiManager.graph, i = () => this.queueRebuild();
    t.on("dataBatchChanged", i), this.track(() => t.off("dataBatchChanged", i));
    const n = () => this.queueRebuild();
    t.queryEngine.on("filterChange", n), this.track(() => t.queryEngine.off("filterChange", n)), this.trackInteraction("simulationSlowTick", () => this.queueRebuild()), this.trackInteraction("dragended", () => this.queueRebuild()), this.trackInteraction("canvasZoom", () => this.queuePaint());
    const s = (o = this.uiManager.layout) == null ? void 0 : o.canvas;
    s && typeof ResizeObserver < "u" && (this.observer = new ResizeObserver(() => {
      this.reconsiderRoom(), this.resize(), this.queueRebuild();
    }), this.observer.observe(s)), this.queueRebuild();
  }
  onGraphReady() {
    this.queueRebuild();
  }
  onDestroy() {
    var t, i;
    this.rebuildFrame !== null && cancelAnimationFrame(this.rebuildFrame), this.paintFrame !== null && cancelAnimationFrame(this.paintFrame), this.rebuildFrame = null, this.paintFrame = null, (t = this.observer) == null || t.disconnect(), this.observer = void 0, (i = this.root) == null || i.remove(), this.root = void 0, this.toggle = void 0, this.probe = void 0, this.colorCache.clear(), this.surface = void 0, this.context = void 0, this.bitmap = void 0;
  }
  /** How many times the content bitmap has been rasterised. */
  getRebuildCount() {
    return this.rebuildCount;
  }
  /* ---------- collapsing ---------- */
  /** Whether the minimap is folded away to just its toggle. */
  isCollapsed() {
    return this.collapsed;
  }
  /**
   * Fold the minimap away to its toggle, or bring it back. Collapsed it draws nothing
   * at all — not even the rectangle — so it costs nothing while it is put away.
   *
   * Calling this ends `collapsed: 'auto'`: from here on the state is whatever it was
   * last set to.
   */
  setCollapsed(t) {
    this.userChose = !0, this.setCollapsedState(t);
  }
  setCollapsedState(t) {
    t !== this.collapsed && (this.collapsed = t, this.applyCollapsed(), t || (this.resize(), this.queueRebuild()));
  }
  /** Re-resolve `collapsed: 'auto'` against the room the canvas has now. */
  reconsiderRoom() {
    !this.autoCollapse || this.userChose || (this.collapsed ? this.hasRoom(Yr) && this.setCollapsedState(!1) : this.hasRoom(Yg) || this.setCollapsedState(!0));
  }
  /**
   * Whether the canvas is at least `ratio` minimaps across, in both axes. A canvas that
   * can't be measured (detached, `display:none`) counts as having room: the
   * ResizeObserver will ask again with a real size, and folding on a zero-sized canvas
   * would only be a guess.
   */
  hasRoom(t) {
    var o;
    const i = (o = this.uiManager.layout) == null ? void 0 : o.canvas;
    if (!i || i.clientWidth === 0 || i.clientHeight === 0) return !0;
    const { width: n, height: s } = this.targetSize();
    return i.clientWidth >= n * t && i.clientHeight >= s * t;
  }
  /** Reflect the collapsed state on the DOM: the CSS does the rest. */
  applyCollapsed() {
    if (!this.root || !this.toggle) return;
    this.root.dataset.collapsed = String(this.collapsed), this.collapsed && (this.root.style.width = "", this.root.style.height = "");
    const t = this.collapsed ? "Show the minimap" : "Collapse the minimap";
    this.toggle.title = t, this.toggle.setAttribute("aria-label", t), this.toggle.setAttribute("aria-expanded", String(!this.collapsed));
  }
  /* ---------- sizing ---------- */
  get dpr() {
    return Math.min(window.devicePixelRatio || 1, Xg);
  }
  /**
   * The box the minimap asks for: the width is configured, the height follows the
   * canvas's aspect ratio so the viewport rectangle isn't stretched.
   */
  targetSize() {
    var o;
    const t = (o = this.uiManager.layout) == null ? void 0 : o.canvas, i = this.options.width ?? Wg, n = t && t.clientWidth > 0 ? t.clientHeight / t.clientWidth : 0.625, s = this.options.height ?? Math.round(Math.min(Kg, Math.max(Vg, i * n)));
    return { width: i, height: s };
  }
  /** Size the surface to {@link targetSize}, in both CSS and device pixels. */
  resize() {
    if (!this.surface || !this.root || this.collapsed) return;
    const { width: t, height: i } = this.targetSize();
    this.root.style.width = `${t}px`, this.root.style.height = `${i}px`;
    const n = this.surface.clientWidth || t, s = this.surface.clientHeight || i;
    this.surface.width = Math.round(n * this.dpr), this.surface.height = Math.round(s * this.dpr);
  }
  /** Nothing to do while we're collapsed, display:none, detached or zero-sized. */
  get hidden() {
    return !this.root || !this.surface || this.collapsed ? !0 : !this.root.isConnected || this.root.offsetParent === null || this.surface.width === 0;
  }
  /* ---------- scheduling ---------- */
  queueRebuild() {
    this.rebuildFrame === null && (this.rebuildFrame = requestAnimationFrame(() => {
      this.rebuildFrame = null, this.rebuild();
    }));
  }
  queuePaint() {
    this.paintFrame !== null || this.rebuildFrame !== null || (this.paintFrame = requestAnimationFrame(() => {
      this.paintFrame = null, this.paint();
    }));
  }
  /* ---------- content bitmap ---------- */
  rebuild() {
    var i;
    if (this.hidden || !this.surface) return;
    this.colorCache.clear();
    const t = ((i = this.uiManager.graph.renderer) == null ? void 0 : i.getContentBounds()) ?? null;
    this.bitmapBounds = t, t && (this.rasterise(t), this.rebuildCount++), this.paint();
  }
  /**
   * Draw the graph into the offscreen bitmap, in the bitmap's own coordinate space:
   * content is mapped from `bounds` onto the bitmap with no padding, so the blit in
   * {@link paint} can place it wherever the display projection says it goes.
   */
  rasterise(t) {
    const i = this.surface;
    this.bitmap || (this.bitmap = document.createElement("canvas"));
    const n = this.bitmap;
    n.width = i.width, n.height = i.height;
    const s = n.getContext("2d");
    if (!s) return;
    s.clearRect(0, 0, n.width, n.height);
    const o = Math.min(n.width / t.width, n.height / t.height), a = { scale: o, offsetX: -t.x * o, offsetY: -t.y * o }, l = this.uiManager.graph.getMutableVisibleNodes().filter((h) => !h.isChild);
    if (l.length > qg) {
      this.drawDensity(s, l, a);
      return;
    }
    this.drawEdges(s, a), this.drawNodes(s, l, a);
  }
  /**
   * Hairline edges under the nodes. Skipped entirely past {@link DETAIL_EDGE_LIMIT} —
   * at thumbnail size a dense edge set washes out the clusters it is meant to reveal.
   */
  drawEdges(t, i) {
    const n = this.uiManager.graph.getEdges().filter((s) => s.visible !== !1);
    if (!(n.length === 0 || n.length > jg)) {
      t.save(), t.strokeStyle = this.ink("--pvt-minimap-edge", "rgba(120,140,170,0.55)"), t.lineWidth = Math.max(0.5, 0.5 * this.dpr), t.beginPath();
      for (const s of n) {
        const o = s.from, a = s.to;
        !(o != null && o.visible) || !(a != null && a.visible) || typeof o.x != "number" || typeof a.x != "number" || (t.moveTo(this.px(o.x, i), this.py(o.y, i)), t.lineTo(this.px(a.x, i), this.py(a.y, i)));
      }
      t.stroke(), t.restore();
    }
  }
  /** A dot per node in the colour the renderer actually painted it. */
  drawNodes(t, i, n) {
    const s = this.uiManager.graph.renderer;
    for (const o of i) {
      if (typeof o.x != "number" || typeof o.y != "number") continue;
      const a = s == null ? void 0 : s.getNodeStyle(o), l = typeof (a == null ? void 0 : a.size) == "number" ? a.size : 10, h = Math.max(1, Math.min(4 * this.dpr, l * n.scale));
      t.beginPath(), t.fillStyle = typeof (a == null ? void 0 : a.color) == "string" ? this.cssColor(a.color, "#7EA2FB") : "#7EA2FB", t.arc(this.px(o.x, n), this.py(o.y, n), h, 0, Math.PI * 2), t.fill();
    }
  }
  /**
   * The big-graph path: one small stamp per node in a single ink, letting the alpha
   * accumulate. Cost is one `fillRect` per node with no style resolution at all, and
   * dense regions saturate into a density map — a truer picture of a large graph than
   * 50k overlapping dots.
   */
  drawDensity(t, i, n) {
    const s = Math.max(1, Math.round(this.dpr));
    t.save(), t.fillStyle = this.ink("--pvt-minimap-ink", "rgba(90,120,190,0.75)"), t.globalAlpha = 0.35;
    for (const o of i)
      typeof o.x != "number" || typeof o.y != "number" || t.fillRect(this.px(o.x, n), this.py(o.y, n), s, s);
    t.restore();
  }
  px(t, i) {
    return t * i.scale + i.offsetX;
  }
  py(t, i) {
    return t * i.scale + i.offsetY;
  }
  /** A themed colour, resolved from the minimap's own CSS custom properties. */
  ink(t, i) {
    if (!this.root) return i;
    const n = getComputedStyle(this.root).getPropertyValue(t).trim();
    return this.cssColor(n, i);
  }
  /**
   * Turn any CSS colour *expression* into something a canvas can actually paint.
   *
   * This matters more than it looks: the renderer's resolved node colour is usually
   * something like `var(--pvt-node-color, #007acc)`, and a custom property's value is
   * substituted rather than computed, so `getPropertyValue` hands back
   * `color-mix(in srgb, var(…) 80%, transparent)` verbatim. Assigning either to
   * `fillStyle` is a no-op, and the canvas silently keeps the previous colour — which
   * is how every dot ends up black. So let the browser resolve it: park the value on a
   * probe inside the themed subtree and read back the computed `color`.
   */
  cssColor(t, i) {
    if (!t) return i;
    if (!t.includes("var(") && !t.includes("color-mix")) return t;
    const n = this.colorCache.get(t);
    if (n) return n;
    const s = this.probe;
    if (!s) return i;
    s.style.color = "", s.style.color = t;
    const o = s.style.color === "" ? i : getComputedStyle(s).color || i;
    return this.colorCache.set(t, o), o;
  }
  /* ---------- visible canvas ---------- */
  /**
   * The region currently on screen, in graph coordinates — what the rectangle draws,
   * derived from the canvas's
   * own corners through the renderer's public coordinate transform, so no zoom
   * transform (and no d3) is needed here.
   */
  getViewportBounds() {
    var a;
    const t = (a = this.uiManager.layout) == null ? void 0 : a.canvas, i = this.uiManager.graph.renderer;
    if (!t || !i) return null;
    const n = t.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return null;
    const s = i.screenToGraphCoordinates(n.left, n.top), o = i.screenToGraphCoordinates(n.right, n.bottom);
    return {
      x: s.x,
      y: s.y,
      width: o.x - s.x,
      height: o.y - s.y
    };
  }
  /** The extent the minimap shows: the graph, plus wherever the user is looking. */
  displayBounds() {
    const t = this.bitmapBounds, i = this.getViewportBounds();
    if (!t) return i;
    if (!i) return t;
    const n = Math.min(t.x, i.x), s = Math.min(t.y, i.y);
    return {
      x: n,
      y: s,
      width: Math.max(t.x + t.width, i.x + i.width) - n,
      height: Math.max(t.y + t.height, i.y + i.height) - s
    };
  }
  /** Where the display extent lands on the surface, honouring the frame inset. */
  projectionFor(t) {
    const i = this.surface, n = Math.max(1, i.width - 2 * Kr * this.dpr), s = Math.max(1, i.height - 2 * Kr * this.dpr), o = Math.min(n / t.width, s / t.height);
    return {
      scale: o,
      offsetX: (i.width - t.width * o) / 2 - t.x * o,
      offsetY: (i.height - t.height * o) / 2 - t.y * o
    };
  }
  paint() {
    if (this.hidden || !this.context || !this.surface) return;
    const t = this.context;
    t.clearRect(0, 0, this.surface.width, this.surface.height);
    const i = this.displayBounds();
    if (!i || i.width <= 0 || i.height <= 0) return;
    const n = this.projectionFor(i), s = this.bitmapBounds;
    if (this.bitmap && s) {
      const g = Math.min(this.bitmap.width / s.width, this.bitmap.height / s.height);
      t.drawImage(
        this.bitmap,
        0,
        0,
        s.width * g,
        s.height * g,
        this.px(s.x, n),
        this.py(s.y, n),
        s.width * n.scale,
        s.height * n.scale
      );
    }
    const o = this.getViewportBounds();
    if (!o) return;
    const a = this.px(o.x, n), l = this.py(o.y, n), h = o.width * n.scale, d = o.height * n.scale;
    t.save(), t.fillStyle = this.ink("--pvt-minimap-shroud", "rgba(20,24,32,0.10)");
    const { width: u, height: p } = this.surface;
    t.fillRect(0, 0, u, Math.max(0, l)), t.fillRect(0, l + d, u, Math.max(0, p - (l + d))), t.fillRect(0, Math.max(0, l), Math.max(0, a), Math.min(d, p)), t.fillRect(a + h, Math.max(0, l), Math.max(0, u - (a + h)), Math.min(d, p)), t.strokeStyle = this.ink("--pvt-minimap-viewport-stroke", "rgba(126,162,251,0.9)"), t.lineWidth = Math.max(1, this.dpr), t.strokeRect(a, l, h, d), t.restore();
  }
  /* ---------- interaction ---------- */
  wirePointer() {
    const t = this.surface;
    if (!t) return;
    this.listen(t, "pointerdown", (n) => {
      const s = n;
      if (s.button !== 0) return;
      const o = this.graphPointAt(s);
      if (!o) return;
      const a = this.getViewportBounds(), l = a !== null && o.x >= a.x && o.x <= a.x + a.width && o.y >= a.y && o.y <= a.y + a.height;
      this.dragOffset = l && a ? { x: a.x + a.width / 2 - o.x, y: a.y + a.height / 2 - o.y } : { x: 0, y: 0 }, this.dragMoved = !1, t.setPointerCapture(s.pointerId), t.classList.add("pvt-minimap-dragging"), l || this.moveViewTo(o), s.preventDefault();
    }), this.listen(t, "pointermove", (n) => {
      if (this.dragOffset === null) return;
      const s = this.graphPointAt(n);
      s && (this.dragMoved = !0, this.moveViewTo(s));
    });
    const i = (n) => {
      var o;
      if (this.dragOffset === null) return;
      const s = n;
      if (!this.dragMoved && s.type === "pointerup") {
        const a = this.graphPointAt(s);
        this.dragOffset = { x: 0, y: 0 }, a && this.moveViewTo(a);
      }
      this.dragOffset = null, this.dragMoved = !1, t.classList.remove("pvt-minimap-dragging"), (o = t.hasPointerCapture) != null && o.call(t, s.pointerId) && t.releasePointerCapture(s.pointerId);
    };
    this.listen(t, "pointerup", i), this.listen(t, "pointercancel", i);
  }
  /** Where a pointer event lands, in graph coordinates. */
  graphPointAt(t) {
    if (!this.surface) return null;
    const i = this.displayBounds();
    if (!i) return null;
    const n = this.surface.getBoundingClientRect(), s = this.projectionFor(i), o = (t.clientX - n.left) * (this.surface.width / n.width), a = (t.clientY - n.top) * (this.surface.height / n.height);
    return {
      x: (o - s.offsetX) / s.scale,
      y: (a - s.offsetY) / s.scale
    };
  }
  moveViewTo(t) {
    var n;
    const i = this.dragOffset ?? { x: 0, y: 0 };
    (n = this.uiManager.graph.renderer) == null || n.setViewport({ x: t.x + i.x, y: t.y + i.y }), this.queuePaint();
  }
}
function va(r = {}) {
  return {
    name: "minimap",
    install(e) {
      var i;
      if (e.ui.getOptions().mode === "static") {
        console.warn("Pivotick: the minimap is not available in 'static' mode; it was not mounted.");
        return;
      }
      const t = (i = e.layout) == null ? void 0 : i.canvas;
      t && e.addElement(new Qg(e.ui, r), t);
    }
  };
}
class ft {
  /**
   * Initializes a graph inside the specified container using the provided data and options.
   *
   * @param container - The HTMLElement that will serve as the main container for the graph.
   * @param data - The graph data, including nodes and edges, to render.
   * @param options - Optional configuration for the graph's behavior, UI, styling, simulation, etc.
   */
  constructor(e, t, i) {
    c(this, "nodes", /* @__PURE__ */ new Map());
    c(this, "edges", /* @__PURE__ */ new Map());
    /** @private */
    c(this, "UIManager");
    c(this, "noteManager");
    c(this, "notifier");
    c(this, "renderer");
    c(this, "simulation");
    c(this, "queryEngine");
    /** @private */
    c(this, "options");
    c(this, "app_id");
    c(this, "parentGraph");
    c(this, "graphDepth");
    c(this, "editing");
    c(this, "listeners");
    /** Subscribers to {@link onVisibleChange} — kept apart from the data event bus. */
    c(this, "changeListeners", []);
    var l, h, d, u, p, g, f;
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
      dataBatchChanged: [],
      legendToggle: []
    }, this.options = {
      isDirected: !0,
      ...i
    }, ((l = this.options.UI) == null ? void 0 : l.mode) === "static" && (this.options.simulation || (this.options.simulation = {}), this.options.simulation.enabled = !1, this.options.simulation.useWorker = !1, this.options.render || (this.options.render = {}), this.options.render.zoomEnabled = !1, this.options.render.zoomAnimation = !1, this.options.render.dragEnabled = !1, this.options.render.selectionBox || (this.options.render.selectionBox = {}), this.options.render.selectionBox.enabled = !1, this.options.UI.tooltip || (this.options.UI.tooltip = {}), this.options.UI.tooltip.enabled = !1, this.options.UI.contextMenu || (this.options.UI.contextMenu = {}), this.options.UI.contextMenu.enabled = !1), this.graphDepth = 0, this.options.parentGraph) {
      this.setParentGraph(this.options.parentGraph);
      let v = this.parentGraph;
      for (; v; )
        v = v.parentGraph, this.graphDepth++;
    }
    const n = {
      ...this.options.render
    }, s = this.options.UI, o = document.createElement("div");
    this.app_id = ne(8, "pivotick-app-"), o.id = this.app_id, o.classList.add("pivotick"), e.appendChild(o), this.noteManager = new Ug(this), this.queryEngine = new Ku(this), this.editing = new Gg(this), this.UIManager = new wg(this, o, s), this.queryEngine.setFacets((h = this.UIManager.getOptions().filter) == null ? void 0 : h.facets), this.queryEngine.setEdgeFacets((d = this.UIManager.getOptions().filter) == null ? void 0 : d.edgeFacets), this.queryEngine.setHideDisconnected(((u = this.UIManager.getOptions().filter) == null ? void 0 : u.hideDisconnected) === !0), this.notifier = new kg(this), this.renderer = ld(this, o, n), this.renderer.setupRendering();
    const a = {
      ...this.options.simulation,
      layout: (p = this.options) == null ? void 0 : p.layout
    };
    if (this.simulation = new Nn(this, a), t) {
      const v = ft.normalizeGraphData(t);
      this._setData(v == null ? void 0 : v.nodes, v == null ? void 0 : v.edges, v == null ? void 0 : v.notes), this.queryEngine.applyInitialVisibility(), (g = this.simulation) == null || g.update(), this.renderer.init(), this.renderer.fitAndCenter(1);
    }
    (f = this.options.plugins) == null || f.forEach((v) => this.use(v)), this.installModePlugins(), this.startAndRender();
  }
  /**
   * The plugins the chosen mode brings along, installed once `options.plugins`
   * has had first claim on the name — a consumer's own `minimap({ width: 240 })`
   * must win, and `installPlugin` drops whichever copy arrives second.
   */
  installModePlugins() {
    const e = this.UIManager.getOptions(), t = e.minimap;
    if (t === !1 || this.UIManager.hasPlugin("minimap") || t === void 0 && e.mode !== "full") return;
    const i = typeof t == "object" ? t : {};
    this.use(va({ collapsed: "auto", ...i }));
  }
  /**
   * Install a {@link PivotickPlugin}. Can be called at any time — the plugin's
   * UI elements are caught up to the current lifecycle phase. Returns `this`
   * for chaining.
   */
  use(e) {
    return this.UIManager.installPlugin(e), this;
  }
  on(e, t) {
    this.listeners[e].push(t);
  }
  off(e, t) {
    this.listeners[e] = this.listeners[e].filter((i) => i !== t);
  }
  emit(e, ...t) {
    for (const i of this.listeners[e])
      i(...t);
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
  static normalizeGraphData(e) {
    var p;
    const t = e.nodes.map((g) => ft.normalizeNode(g)), i = /* @__PURE__ */ new Map(), n = (g) => {
      g.children.forEach((f) => {
        i.set(f.id, f), f.hasChildren() && n(f);
      });
    };
    t.forEach((g) => {
      n(g);
    });
    const s = new Map(t.map((g) => [g.id, g])), o = new Map([...s, ...i]), a = e.edges.map((g) => ft.normalizeEdge(g, o)).filter((g) => g !== null), l = (g) => {
      const f = [];
      let v = g.parentNode;
      for (; v; )
        f.push(v), v = v.parentNode;
      return f;
    }, h = [], d = /* @__PURE__ */ new Map();
    for (const g of a)
      if (!g.from.isChild && g.to.isChild && g.to.parentNode) {
        let f = g.to.parentNode;
        const v = /* @__PURE__ */ new Set();
        for (; f && !v.has(f.id); ) {
          v.add(f.id);
          const y = `synthetic-${g.from.id}-${f.id}`, b = new Ct(
            y,
            g.from,
            f,
            // { 'label': `${edge.from.id}-${currentParent.id}` },
            {},
            {},
            null,
            g.to
          );
          if (b.to.isChild && b.hide(), b.representedEdges = [g], h.push(b), !f.parentNode) break;
          f = f.parentNode;
        }
      } else if (g.from.isChild && g.to.isChild) {
        const f = [g.from, ...l(g.from)], v = [g.to, ...l(g.to)], y = f[f.length - 1], b = v[v.length - 1];
        if (y.id === b.id) continue;
        g.isCrossCluster = !0, g.syntheticSourceNode = g.from, g.syntheticTerminalNode = g.to;
        for (const k of f)
          for (const S of v) {
            if (k === g.from && S === g.to) continue;
            const N = `synthetic-${k.id}-${S.id}`, L = d.get(N);
            if (L) {
              (p = L.representedEdges) == null || p.push(g);
              continue;
            }
            const I = new Ct(N, k, S, {}, {}, g.directed, g.to);
            I.isCrossCluster = !0, I.syntheticSourceNode = g.from, I.representedEdges = [g], d.set(N, I), h.push(I);
          }
      }
    a.push(...h), ft.resolveCrossClusterEdges(a);
    const u = (e.notes ?? []).map((g) => ft.normalizeNote(g)).filter((g) => g !== null);
    return {
      nodes: t,
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
  static resolveCrossClusterEdges(e) {
    for (const t of e) {
      if (!t.isCrossCluster || !t.syntheticSourceNode || !t.syntheticTerminalNode) continue;
      const i = t.from === t.syntheticSourceNode.canvasRepresentative() && t.to === t.syntheticTerminalNode.canvasRepresentative();
      t.visibleIgnoringLayer !== i && (i ? t.show() : t.hide());
    }
  }
  /**
   * Normalizes a node, marking its children and hiding them.
   * @private
   */
  static normalizeNode(e, t = 0) {
    let i = [];
    !(e instanceof et) && e.children && (i = e.children.map((s) => ft.normalizeNode(s, t + 1)));
    const n = e instanceof et ? e : new et(e.id.toString(), e.data, e.style, e.domID, i);
    return e instanceof et || (typeof e.x == "number" && (n.x = e.x), typeof e.y == "number" && (n.y = e.y), typeof e.fx == "number" && (n.fx = e.fx), typeof e.fy == "number" && (n.fy = e.fy)), n.children.forEach((s) => {
      s.markAsChild(n, t + 1), s.hide();
    }), n.weight = e.weight, n.expanded = e.expanded, n;
  }
  /**
   * Normalizes an edge, hiding it if it connects to a child node in a collapsed cluster.
   * @private
   */
  static normalizeEdge(e, t) {
    var a;
    if (e instanceof Ct) return e;
    const i = t, n = i.get(e.from.toString()), s = i.get(e.to.toString());
    if (!n || !s) return null;
    const o = new Ct(
      ((a = e.id) == null ? void 0 : a.toString()) ?? `${e.from}-${e.to}`,
      n,
      s,
      e.data,
      e.style
    );
    return (n.isChild || s.isChild) && o.hide(), o;
  }
  static normalizeNote(e) {
    return e instanceof It ? e : new It(e);
  }
  ready() {
    this.emit("ready");
  }
  nodeAdd(e) {
    this.emit("nodeAdd", e);
  }
  nodeRemove(e) {
    this.emit("nodeRemove", e);
  }
  nodeChange(e, t, i) {
    this.emit("nodeChange", e, t, i);
  }
  edgeAdd(e) {
    this.emit("edgeAdd", e);
  }
  edgeRemove(e) {
    this.emit("edgeRemove", e);
  }
  edgeChange(e, t, i) {
    this.emit("edgeChange", e, t, i);
  }
  noteAdd(e) {
    this.emit("noteAdd", e);
  }
  noteChange(e) {
    this.emit("noteChange", e);
  }
  noteRemove(e) {
    this.emit("noteRemove", e);
  }
  /**
   * @private
   * Announce that a legend entry was toggled. Called by the legend after it has
   * applied its filter, so a consumer can persist the user's choice.
   */
  legendToggled(e) {
    this.emit("legendToggle", e);
  }
  /**
   * Replace the canvas legend at runtime — the imperative twin of `UI.legend`.
   * A graph that started without one gets it built on the spot; `false` empties
   * the legend and drops its filter, and `true` / `undefined` fall back to
   * deriving one from `render.nodeTypeAccessor`. Pass a
   * {@link LegendGroupOptions} to key the graph on several dimensions at once.
   *
   * @param config - The legend to show, or `false` to remove it.
   */
  setLegend(e) {
    this.UIManager.setLegend(e);
  }
  /**
   * @private
   * Announce that a node's data was replaced in place — emits `nodeChange` plus a
   * `dataBatchChanged` entry. Used by the interactive node editor, which mutates the
   * live node rather than going through {@link updateData}.
   */
  nodeDataChanged(e, t, i) {
    this.dataBatchChanged([{
      type: "node:change",
      node: e,
      previousData: t,
      nextData: i
    }]);
  }
  /**
   * @private
   * The edge twin of {@link nodeDataChanged} — emits `edgeChange` plus a
   * `dataBatchChanged` entry for an edge whose data was replaced in place.
   */
  edgeDataChanged(e, t, i) {
    this.dataBatchChanged([{
      type: "edge:change",
      edge: e,
      previousData: t,
      nextData: i
    }]);
  }
  dataBatchChanged(e) {
    e && (this.emit("dataBatchChanged", e), e.forEach((t) => {
      switch (t.type) {
        case "node:add":
          this.nodeAdd(t.node);
          break;
        case "node:change":
          this.nodeChange(t.node, t.previousData, t.nextData);
          break;
        case "node:remove":
          this.nodeRemove(t.node);
          break;
        case "edge:add":
          this.edgeAdd(t.edge);
          break;
        case "edge:change":
          this.edgeChange(t.edge, t.previousData, t.nextData);
          break;
        case "edge:remove":
          this.edgeRemove(t.edge);
          break;
        case "note:add":
          this.noteAdd(t.note);
          break;
        case "note:change":
          this.noteChange(t.note);
          break;
        case "note:remove":
          this.noteRemove(t.note);
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
    var e;
    return (e = this.options) == null ? void 0 : e.callbacks;
  }
  /**
   * @private
   */
  onChange() {
    var e, t, i;
    (e = this.renderer) == null || e.update(!0), (t = this.simulation) == null || t.update(), (i = this.renderer) == null || i.nextTick();
    for (const n of this.changeListeners) n();
  }
  /**
   * Subscribe to {@link onChange} — the funnel every visible-graph change passes
   * through: add/remove, filter, cluster expand/collapse, manual hide. For UI that has
   * to re-read what is on the canvas when nothing more specific is emitted; a cluster
   * opening announces itself no other way, and on a pinned graph there are no
   * simulation ticks to fall back on either. Returns its own unsubscribe.
   * @private
   */
  onVisibleChange(e) {
    return this.changeListeners.push(e), () => {
      this.changeListeners = this.changeListeners.filter((t) => t !== e);
    };
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
  updateData(e, t, i = !0) {
    const n = [];
    e && e.forEach((s) => {
      var o;
      this.nodes.has(s.id) ? (n.push({
        type: "node:change",
        node: s,
        previousData: (o = this.nodes.get(s.id)) == null ? void 0 : o.getData(),
        nextData: s.getData()
      }), this.nodes.set(s.id, s)) : (this.addNode(s), n.push({
        type: "node:add",
        node: s
      }));
    }), t && t.forEach((s) => {
      var o;
      this.edges.has(s.id) ? (n.push({
        type: "edge:change",
        edge: s,
        previousData: (o = this.edges.get(s.id)) == null ? void 0 : o.getData(),
        nextData: s.getData()
      }), this.edges.set(s.id, s)) : (this.addEdge(s), n.push({
        type: "edge:add",
        edge: s
      }));
    }), (e || t) && this.onChange(), i && this.dataBatchChanged(n);
  }
  /**
   * Replaces all current nodes and edges in the graph with the provided data.
   * Clears existing nodes and edges before setting the new ones.
   * Triggers the `onChange` callback after the update.
   * 
   * @param nodes Array of nodes to set. Defaults to an empty array.
   * @param edges Array of edges to set. Defaults to an empty array.
   */
  setData(e = [], t = [], i = []) {
    this.nodes.clear(), this.edges.clear(), this.noteManager.clear();
    const n = ft.normalizeGraphData({ nodes: e, edges: t, notes: i });
    this._setData(n == null ? void 0 : n.nodes, n == null ? void 0 : n.edges, n == null ? void 0 : n.notes), this.onChange(), this.startAndRender();
  }
  /** 
   * @private
   */
  _setData(e, t, i) {
    const n = (o) => {
      o.children.forEach((a) => {
        this.nodes.set(a.id, a), a.hasChildren() && n(a);
      });
    }, s = [];
    e.forEach((o) => {
      this.nodes.set(o.id, o), s.push({
        type: "node:add",
        node: o
      }), n(o);
    }), t.forEach((o) => {
      if (!this.nodes.has(o.from.id) || !this.nodes.has(o.to.id)) {
        console.warn(`Edge is pointing a node that doesn't exist. (${this.nodes.get(o.from.id)}) -> (${this.nodes.get(o.to.id)}). It has been skipped`);
        return;
      }
      this.edges.set(o.id, o), s.push({
        type: "edge:add",
        edge: o
      });
    }), this.dataBatchChanged(s), i.forEach((o) => {
      this.noteManager.addNote(o, !0);
    });
  }
  /**
   * Adds a node to the graph.
   * 
   * @throws Error if a node with the same `id` already exists.
   * Triggers `onChange` after the node is successfully added.
   */
  addNode(e) {
    const t = ft.normalizeNode(e);
    if (this.nodes.has(t.id))
      throw new Error(`Node with id ${t.id} already exists.`);
    return this.nodes.set(t.id, t), this.dataBatchChanged([{
      type: "node:add",
      node: t
    }]), this.onChange(), t;
  }
  /**
   * Retrieves a node from the graph by its ID.
   * 
   * Returns a deep clone of the node to prevent external mutations.
   * 
   * @param id The ID of the node or a Node object.
   * @returns A cloned `Node` if found, otherwise `undefined`.
   */
  getNode(e) {
    const t = this._getNode(e);
    return t ? structuredClone(t) : void 0;
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
  getMutableNode(e) {
    return this._getNode(e);
  }
  _getNode(e) {
    if (typeof e == "string") {
      const t = this.nodes.get(e);
      return t || void 0;
    } else return e instanceof et ? e : void 0;
  }
  /**
   * Removes a node from the graph by its ID.
   * 
   * Also removes any edges connected to the node.
   * 
   * @param id The ID of the node to remove.
   * Triggers `onChange` after the node and its edges are removed.
   */
  removeNode(e) {
    if (this.nodes.has(e)) {
      this.dataBatchChanged([{
        type: "node:remove",
        node: this.nodes.get(e)
      }]), this.nodes.delete(e);
      for (const [t, i] of this.edges)
        (i.from.id === e || i.to.id === e) && (this.dataBatchChanged([{
          type: "edge:remove",
          edge: this.edges.get(t)
        }]), this.edges.delete(t));
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
  addEdge(e) {
    const t = ft.normalizeEdge(e, this.nodes);
    if (!t)
      throw new Error("Either of the from or to nodes do not exist");
    if (this.edges.has(t.id))
      throw new Error(`Edge with id ${t.id} already exists.`);
    if (!this.nodes.has(t.from.id) || !this.nodes.has(t.to.id))
      throw new Error("Both nodes must exist in the graph before adding an edge.");
    return this.edges.set(t.id, t), this.dataBatchChanged([{
      type: "edge:add",
      edge: t
    }]), this.onChange(), t;
  }
  /**
   * Retrieves an edge from the graph by its ID.
   * 
   * Returns a deep clone of the edge to prevent external mutations.
   * 
   * @param id The ID of the edge.
   * @returns A cloned `Edge` if found, otherwise `undefined`.
   */
  getEdge(e) {
    const t = this.edges.get(e);
    return t ? structuredClone(t) : void 0;
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
  getMutableEdge(e) {
    return this.edges.get(e);
  }
  /**
   * Removes an edge from the graph by its ID.
   * 
   * @param id The ID of the edge to remove.
   * Triggers `onChange` after the edge is removed.
   */
  removeEdge(e) {
    this.edges.has(e) && (this.dataBatchChanged([{
      type: "edge:remove",
      edge: this.edges.get(e)
    }]), this.edges.delete(e), this.onChange());
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
    return Array.from(this.nodes.values()).filter((e) => !e.isChild).map((e) => e.clone());
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
    return this.getMutableNodes().filter((e) => e.visible);
  }
  /**
   * Retrieves all edges in the graph.
   * 
   * Returns clones of the edges to prevent external modifications.
   * 
   * @returns An array of cloned `Edge` objects.
   */
  getEdges() {
    return Array.from(this.edges.values()).map((e) => e.clone());
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
    return this.getMutableEdges().filter((e) => e.visible);
  }
  /**
   * Finds all edges originating from a given node.
   * 
   * Returns cloned edges to prevent external modifications.
   * 
   * @param node The node or node ID to find outgoing edges from.
   * @returns An array of `Edge` objects whose `from` node matches the query.
   */
  getEdgesFromNode(e) {
    const t = this._getNode(e);
    return t ? this.getEdges().filter((i) => i.from.id === t.id) : [];
  }
  /**
   * Finds all edges pointing to a given node.
   * 
   * Returns cloned edges to prevent external modifications.
   * 
   * @param node The node or node ID to find incoming edges to.
   * @returns An array of `Edge` objects whose `to` node matches the query.
   */
  getEdgesToNode(e) {
    const t = this._getNode(e);
    return t ? this.getEdges().filter((i) => i.to.id === t.id) : [];
  }
  /**
   * Retrieves all nodes directly connected from the given node.
   * 
   * Returns cloned nodes to prevent external modifications.
   * 
   * @param node The node or node ID to find connections from.
   * @returns An array of `Node` objects directly connected from the given node.
   */
  getConnectedNodes(e) {
    const t = this._getNode(e);
    return t ? this.getEdgesFromNode(t.id).map((s) => s.to) : [];
  }
  getNotes() {
    return this.noteManager.getNotes();
  }
  getNote(e) {
    return this.noteManager.getNote(e);
  }
  /**
   * Would this edge be drawn, if `visibleIds` were the visible nodes? The endpoint,
   * collapse and synthetic reasons only — layers are a separate veto (`layerVisible`).
   *
   * Asked twice: once by {@link setVisibleNodes} as it commits, and once by the query
   * engine *before* it commits, to find the nodes a filter left with no relation. Both
   * ask here so there is one copy of the answer. A cross-cluster stand-in is not
   * answerable — `resolveCrossClusterEdges` owns those — so callers handle them.
   * @private
   */
  edgeWouldBeVisible(e, t) {
    const i = (o, a) => o ? o.visible : t.has(a.id), n = i(e.getSubgraphFromNode(), e.from) && i(e.getSubgraphToNode(), e.to), s = !e.isSynthetic || !e.to.expanded;
    return n && s;
  }
  /**
   * Returns whether anything moved, so an edge-only filter change can repaint itself.
   * `notify` is off for the query engine's first pass, which runs before anything is
   * drawn — the constructor's own `simulation.update()` / `renderer.init()` follow it.
   */
  setVisibleNodes(e, t = !0) {
    const i = new Set(e.map((s) => s.id));
    let n = !1;
    return this.nodes.forEach((s) => {
      const o = i.has(s.id);
      s.visible !== o && (s.toggleVisibility(o), n = !0);
    }), this.edges.forEach((s) => {
      if (s.isCrossCluster) return;
      const o = this.edgeWouldBeVisible(s, i);
      s.visibleIgnoringLayer !== o && (s.toggleVisibility(o), n = !0);
    }), n && t && this.onChange(), n;
  }
  /**
   * Repaint after an edge-layer change. Deliberately not {@link onChange}: layers
   * don't touch the link force (see `Simulation.getActiveEdges`), so restarting the
   * simulation would move the graph for no reason.
   */
  edgeVisibilityChanged() {
    var e, t;
    (e = this.renderer) == null || e.update(!0), (t = this.renderer) == null || t.nextTick();
  }
  hideNode(e) {
    e.hide(), e.getEdgesOut().forEach((t) => {
      t.hide();
    }), e.getEdgesIn().forEach((t) => {
      t.hide();
    }), this.onChange();
  }
  showNode(e) {
    e.show(), e.getEdgesOut().forEach((t) => {
      t.target.visible && t.show();
    }), e.getEdgesIn().forEach((t) => {
      t.from.visible && t.show();
    }), this.onChange();
  }
  toggleExpandNode(e) {
    e.toggleExpand(), this.onChange();
  }
  toggleExpandNodes(e) {
    e.forEach((t) => {
      t.toggleExpand();
    }), this.onChange();
  }
  /**
   * Trigger the next render update of the graph.
   */
  nextTick() {
    var e;
    (e = this.renderer) == null || e.nextTick();
  }
  /**
   * Trigger the next render update of the graph for the passed subjects.
   */
  nextTickFor(e) {
    var t;
    (t = this.renderer) == null || t.nextTickFor(e);
  }
  /**
   * Destroy all UI components.
   */
  destroy() {
    this.simulation.destroy(), this.UIManager.destroy(), this.renderer.destroy();
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
  setParentGraph(e) {
    this.parentGraph = e;
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
  updateLayoutProgress(e, t, i) {
    var n;
    (n = this.renderer) == null || n.updateLayoutProgress(e, t, i);
  }
  /**
   * Brings the specified node or edge into focus within the graph view.
   * 
   * @param element The `Node` or `Edge` to focus.
   */
  focusElement(e) {
    this.renderer.focusElement(e);
  }
  /**
   * Selects a given node or edge in the graph.
   * 
   * @param element The `Node` or `Edge` to select.
   */
  selectElement(e) {
    e instanceof Ct ? this.renderer.getGraphInteraction().selectEdge(e.getGraphElement(), e) : e instanceof et && this.renderer.getGraphInteraction().selectNode(e.getGraphElement(), e);
  }
  /**
   * Selects several nodes, or several edges, replacing the current selection — the
   * plural {@link selectElement}, resolving each element's rendered handle for you.
   *
   * Nodes and edges cannot be selected together (the interaction layer clears one kind
   * when the other is set), so a mixed array selects the **nodes** and warns.
   *
   * @param elements The `Node`s or `Edge`s to select. An empty array clears the selection.
   */
  selectElements(e) {
    const t = this.renderer.getGraphInteraction();
    if (e.length === 0) return t.unselectAll();
    const i = e.filter((s) => s instanceof et), n = e.filter((s) => s instanceof Ct);
    i.length && n.length && console.warn("Pivotick: selectElements cannot select nodes and edges together; selecting the nodes only."), i.length ? t.selectNodes(i.map((s) => ({ node: s, element: s.getGraphElement() }))) : n.length && t.selectEdges(n.map((s) => [s, s.getGraphElement()]));
  }
  /**
   * Adds nodes to the current selection, leaving what is already selected in place.
   * Already-selected nodes are ignored.
   *
   * Nodes only: the interaction layer has no additive setter for edges, which can only
   * be selected as a whole set via {@link selectElements}.
   *
   * @param nodes The `Node`s to add.
   */
  addToSelection(e) {
    this.renderer.getGraphInteraction().addNodesToSelection(e.map((t) => ({ node: t, element: t.getGraphElement() })));
  }
  /**
   * Removes nodes from the current selection, leaving the rest of it in place.
   * Nodes only, on the same terms as {@link addToSelection}.
   *
   * @param nodes The `Node`s to remove.
   */
  removeFromSelection(e) {
    this.renderer.getGraphInteraction().removeNodesFromSelection(e.map((t) => ({ node: t, element: t.getGraphElement() })));
  }
  /**
   * Opens the data dock — the graph's rows as a sortable, selectable grid split off
   * the bottom of the canvas. `full` mode only, and only when `UI.table` allows it;
   * a no-op otherwise.
   *
   * The dock can hold panes other than the table now, so this also brings the table's
   * pane to the front: the call is named for the table and should show you one. Reach
   * for `UIManager.dock` or `activateDockTab()` to drive the region without that.
   */
  openTable() {
    var t, i;
    (t = this.UIManager.dock) == null || t.setOpen(!0);
    const e = (i = this.UIManager.table) == null ? void 0 : i.dockTabId();
    e && this.UIManager.activateDockTab(e);
  }
  /** Closes the data dock. */
  closeTable() {
    var e;
    (e = this.UIManager.dock) == null || e.setOpen(!1);
  }
  /** Opens the data dock if it is closed, closes it if it is open. */
  toggleTable() {
    var e;
    (e = this.UIManager.dock) == null || e.toggleOpen();
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
  highlightElement(e) {
    this.renderer.highlightElement(e);
  }
  /**
   * Remove a highligh class to the given node or edge
   * 
   * @param element The `Node` or `Edge` to select.
   */
  unHighlightElement(e) {
    this.renderer.unHighlightElement(e);
  }
  /**
   * Remove any highligh class from any nodes or edges
   * 
   */
  clearHighlightedElements() {
    this.renderer.clearHighlightedElements();
  }
}
const wn = {
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
class Jg {
  constructor(e) {
    c(this, "palette");
    c(this, "valueToColor", /* @__PURE__ */ new Map());
    c(this, "nextIndex", 0);
    this.palette = this.resolvePalette(e);
  }
  resolvePalette(e) {
    var i;
    if (!e)
      return ((i = wn.pivotick) == null ? void 0 : i.colors) ?? Object.values(wn)[0].colors;
    if (Array.isArray(e)) {
      if (e.length === 0)
        throw new Error("Custom palette array cannot be empty.");
      return e;
    }
    const t = wn[e];
    if (!t)
      throw new Error(`Palette "${e}" not found in PALETTE_REGISTRY.`);
    return t.colors;
  }
  /**
   * Returns a color for the given value.
   * - If the value was already mapped, returns the same color.
   * - If not, assigns the next palette color (cycles if needed).
   */
  getColor(e) {
    if (e == null)
      return this.palette[0];
    const t = this.valueToColor.get(e);
    if (t)
      return t;
    const i = this.palette[this.nextIndex % this.palette.length];
    return this.valueToColor.set(e, i), this.nextIndex++, i;
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
ft.Node = et;
ft.Edge = Ct;
ft.ColorPaletteMapper = Jg;
ft.UIComponent = it;
ft.minimap = va;
ft.tableColumns = Ut;
export {
  Jg as C,
  Ct as E,
  ft as G,
  et as N,
  Nn as S,
  K as T,
  it as U,
  ve as a,
  va as m,
  Ut as t
};
