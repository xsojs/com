var pt = Object.defineProperty;
var yt = (e, t, i) => t in e ? pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var nt = (e, t, i) => (yt(e, typeof t != "symbol" ? t + "" : t, i), i), W = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
};
var r = (e, t, i) => (W(e, t, "read from private field"), i ? i.call(e) : t.get(e)), o = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, l = (e, t, i, s) => (W(e, t, "write to private field"), s ? s.call(e, i) : t.set(e, i), i);
var C = (e, t, i) => (W(e, t, "access private method"), i);
function dt(e, t) {
  if (typeof t != "object" || t == null || !Array.isArray(t))
    throw new Error(`${e} is ${typeof t} and not a valid array.`);
}
function ot(e, t) {
  if (typeof t != "function" || t == null)
    throw new Error(`${e} is ${typeof t} and not a valid function.`);
}
function k(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`${e} is ${typeof t} and not a valid object.`);
}
function H(e, t) {
  if (typeof t != "string" && !(t instanceof String) || t == null)
    throw new Error(`${e} is ${typeof t} and not a valid string.`);
}
function j(e) {
  return typeof e == "object" && e != null && Array.isArray(e);
}
function mt(e) {
  return typeof e == "function" && e != null;
}
function B(e) {
  return typeof e == "object" && e != null && !Array.isArray(e);
}
function z(e) {
  return (typeof e == "string" || e instanceof String) && e != null;
}
const it = [], st = "_xso_com_", f = {
  COMPONENTS: it,
  COMPONENTS_PREFIX: st,
  getComponent: (e) => it.find((t) => t.key == e).instance,
  isKey: (e) => e.indexOf(st) == 0
};
var G, $, P, x;
class V {
  constructor(t, i) {
    o(this, G, null);
    o(this, $, null);
    o(this, P, null);
    o(this, x, null);
    l(this, G, t), l(this, $, i);
  }
  get current() {
    return r(this, x);
  }
  set current(t) {
    l(this, x, t), r(this, $).fire(this);
  }
  set(t) {
    return l(this, P, t), this;
  }
  get() {
    return r(this, P);
  }
}
G = new WeakMap(), $ = new WeakMap(), P = new WeakMap(), x = new WeakMap();
V.prototype.toString = function() {
  return this.current;
};
function wt(e, t) {
  k("Properties", t);
  const i = (s) => new Error(`Content of type ${typeof s} is not valid, only string, object, or array with objects.`);
  for (const s of Object.keys(t)) {
    const n = t[s];
    if (s == "_" && n)
      if (z(n))
        e.textContent = n;
      else if (j(n))
        w(e, n);
      else if (B(n))
        w(e, [n]);
      else
        throw i(n);
    else if (s == "$" && n)
      if (z(n))
        e.innerHTML = n;
      else if (j(n))
        w(e, n);
      else if (B(n))
        w(e, [n]);
      else
        throw i(n);
    else if (s == "text" && n)
      H(s, n), e.innerText = n;
    else if (s == "html" && n)
      H(s, n), e.innerHTML = n;
    else if (s == "style" && n) {
      k(s, n);
      for (const c of Object.keys(n))
        e.style[c] = n[c];
    } else if (s == "className" && n)
      H(s, n), e.className = n;
    else if (s == "classList" && n)
      rt(e, n);
    else if (s == "class" && n) {
      if (z(n))
        e.className = n;
      else if (j(n))
        rt(e, n);
      else if (n != null && n != null)
        throw new Error(`CSS Class of type ${typeof n} is not valid, only string or array of strings is accepted.`);
    } else
      s.indexOf("on") == 0 ? (ot(s, n), e.addEventListener(s.substring(2).toLowerCase(), n)) : e.setAttribute(s, n);
  }
}
function rt(e, t) {
  dt(key, t);
  for (const i of t)
    H(i), e.classList.add(i);
}
function w(e, t, i) {
  const s = [];
  if (B(t))
    if (t instanceof V) {
      const n = w(e, t.get());
      if (n.length == 0)
        throw new Error("Reference is empty with no valid elements.");
      if (n.length > 1)
        throw new Error("Reference with more than 1 element.");
      t.current = n[0];
    } else {
      const n = Object.keys(t);
      if (n.length > 1)
        throw new Error(`Object with more than 1 keys: ${n.join(", ")}`);
      if (n.length == 0)
        throw new Error("Object with no key, but one is required.");
      for (const c of n) {
        const et = t[c];
        if (c.indexOf("_") != 0) {
          const m = document.createElement(c);
          wt(m, et), s.push(m), e.appendChild(m);
        } else if (f.isKey(c)) {
          const m = f.getComponent(c).clone();
          m.parent = e, m.render(et), s.push(m);
        }
      }
    }
  else if (j(t))
    for (const n of t)
      if (z(n)) {
        const c = document.createTextNode(n);
        e.appendChild(c), s.push(n);
      } else
        w(e, n);
  else
    throw new Error(`View of type ${typeof t} is invalid, only object or array of objects.`);
  return s;
}
var M, A, g, K;
class lt {
  constructor(t, i) {
    o(this, M, null);
    o(this, A, null);
    o(this, g, null);
    o(this, K, null);
    l(this, M, t), l(this, g, i);
  }
  set val(t) {
    JSON.stringify(r(this, K)) != JSON.stringify(t) && (l(this, A, r(this, g)), l(this, g, t), l(this, K, JSON.stringify(t)), console.log("Props >> " + r(this, M).key(), t));
  }
  get val() {
    return r(this, g);
  }
  get previous() {
    return r(this, A);
  }
}
M = new WeakMap(), A = new WeakMap(), g = new WeakMap(), K = new WeakMap();
lt.prototype.toString = function() {
  return this.val;
};
var _, E, L, u, I, R, Y;
class ct {
  constructor(t, i, s) {
    o(this, R);
    o(this, _, null);
    o(this, E, null);
    o(this, L, null);
    o(this, u, null);
    o(this, I, 0);
    l(this, _, t), l(this, E, i), l(this, u, s);
  }
  set $val(t) {
    r(this, u) !== t && (C(this, R, Y).call(this, t), r(this, _).render(), r(this, E).fire(this));
  }
  get $val() {
    return r(this, u);
  }
  set val(t) {
    r(this, u) !== t && (C(this, R, Y).call(this, t), r(this, E).fire(this));
  }
  get val() {
    return r(this, u);
  }
  get previous() {
    return r(this, L);
  }
  get lastChanged() {
    return r(this, I);
  }
}
_ = new WeakMap(), E = new WeakMap(), L = new WeakMap(), u = new WeakMap(), I = new WeakMap(), R = new WeakSet(), Y = function(t) {
  l(this, L, r(this, u)), l(this, u, t), l(this, I, Date.now());
};
ct.prototype.toString = function() {
  return this.val;
};
var D, O;
class gt {
  constructor() {
    o(this, D, []);
    o(this, O, []);
  }
  add(t, i) {
    r(this, D).push({
      items: t,
      func: i
    });
  }
  fire(t) {
    const i = r(this, D).filter((s) => s.items.includes(t));
    for (const s of i)
      s && !r(this, O).includes(s.func) && (r(this, O).push(s.func), setTimeout(() => {
        r(this, O).splice(r(this, O).indexOf(s.func), 1), s.func();
      }, 0));
  }
}
D = new WeakMap(), O = new WeakMap();
var F, h, v, y, d, J, Q, q, a, S, b, U, ht, X, Z;
const tt = class {
  constructor(t) {
    o(this, U);
    o(this, X);
    o(this, F, !1);
    o(this, h, null);
    o(this, v, null);
    o(this, y, null);
    o(this, d, null);
    o(this, J, []);
    o(this, Q, () => {
    });
    o(this, q, () => {
    });
    o(this, a, []);
    o(this, S, new gt());
    nt(this, "parent", null);
    o(this, b, null);
    if (!mt(t) || t.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    l(this, h, t), C(this, U, ht).call(this);
  }
  name() {
    return r(this, h).name;
  }
  clone() {
    return new tt(r(this, h));
  }
  destroy(t) {
    l(this, Q, t);
  }
  view(t) {
    l(this, q, t);
  }
  ref() {
    return new V(this, r(this, S));
  }
  changes(t, i) {
    r(this, S).add(t, i);
  }
  render(t) {
    var s;
    const i = this;
    r(this, y) ? (r(this, b) && clearTimeout(r(this, b)), l(this, b, setTimeout(() => {
      var n;
      C(n = i, X, Z).call(n, t);
    }, 0))) : C(s = i, X, Z).call(s, t);
  }
  static isSameKind(t, i) {
    let s = null;
    for (const c of Object.keys(t))
      s = c;
    const n = f.getComponent(s);
    return r(n, h) === r(i, h);
  }
  function() {
    return r(this, h);
  }
  key() {
    return r(this, v);
  }
  destroy() {
    const t = f.COMPONENTS.findIndex((i) => i.key == r(this, v));
    f.COMPONENTS.splice(t, 1);
  }
  state(t) {
    if (r(this, d))
      return r(this, J)[r(this, d).state++];
    const i = new ct(this, r(this, S), t);
    return r(this, J).push(i), i;
  }
};
let p = tt;
F = new WeakMap(), h = new WeakMap(), v = new WeakMap(), y = new WeakMap(), d = new WeakMap(), J = new WeakMap(), Q = new WeakMap(), q = new WeakMap(), a = new WeakMap(), S = new WeakMap(), b = new WeakMap(), U = new WeakSet(), ht = function() {
  for (; ; ) {
    const t = f.COMPONENTS_PREFIX + "[" + r(this, h).name + "]_" + (Math.random() + 1).toString(36).substring(2);
    if (!f.COMPONENTS.find((i) => i.key == t)) {
      l(this, v, t);
      break;
    }
  }
  f.COMPONENTS.push({ key: r(this, v), instance: this });
}, X = new WeakSet(), Z = function(t) {
  r(this, y) ? t ? r(this, y).val = t : l(this, d, { state: 0 }) : l(this, y, new lt(this, t)), r(this, F) == !1 && (r(this, h).bind(this)(r(this, y).val), l(this, F, !0));
  let i = r(this, q).bind(this)();
  (!i || i.length == 0) && (i = [{ span: { style: { display: "none" } } }]);
  const s = document.createDocumentFragment();
  if (w(s, i), r(this, d)) {
    const n = [];
    for (const c of s.children)
      n.push(c);
    if (r(this, a).length == 0)
      this.parent.appendChild(s);
    else {
      parent = r(this, a)[0].parentNode, parent.insertBefore(s, r(this, a)[0]);
      for (const c of r(this, a))
        parent.removeChild(c);
    }
    l(this, a, n);
  } else {
    for (const n of s.children)
      r(this, a).push(n);
    this.parent.appendChild(s);
  }
  l(this, d, null);
};
p.prototype.toString = function() {
  return this.key();
};
p.prototype.isSameKind = function(e, t) {
  return p.isSameKind(e, t);
};
function ut(e) {
  return e instanceof p;
}
function ft(e) {
  if (!ut(e))
    throw new Error("Invalid component, because not implement the component class.");
}
function Ot(e) {
  k("Component Props", e);
  let t = null;
  for (const i of Object.keys(e)) {
    if (t != null)
      throw new Error(`More than 1 component in the same object: ${e}`);
    t = e[i], k("Component Props Loaded", t);
  }
  return t;
}
function at(e) {
  k("jsonDefinition of an invalid object.", e);
  let t = null;
  for (const s of Object.keys(e))
    t = s;
  let i = t;
  return t.indexOf(f.COMPONENTS_PREFIX) == 0 && (i = t.substring(t.indexOf("[") + 1, t.lastIndexOf("]"))), JSON.stringify({
    [i]: e[t]
  });
}
function T(e, t) {
  const i = (s) => new Error(`Only ${t.function().name} type is accepted! This component is invalid: ${at(s)}`);
  if (j(e)) {
    for (const s of e)
      if (k("ensureSameKind of an invalid object.", s), !p.isSameKind(s, t))
        throw i(s);
  } else if (B(e)) {
    if (!p.isSameKind(e, t))
      throw i(e);
  } else
    throw new Error("Invalid kind.");
}
T.required = (e, t) => {
  if (e)
    return T(e, t);
  throw new Error(`${t.name()} is required.`);
};
T.optional = (e, t) => {
  e && T(e, t);
};
function N(e) {
  return ot("Component", e), new p(e);
}
N.create = (e, t, i) => {
  ft(t), t.parent = e, t.render(i);
};
N.ensure = ft;
N.is = ut;
N.ensureType = T;
N.props = Ot;
N.json = at;
export {
  N as default
};
