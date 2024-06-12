var Ot = Object.defineProperty;
var vt = (e, t, n) => t in e ? Ot(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ut = (e, t, n) => (vt(e, typeof t != "symbol" ? t + "" : t, n), n), nt = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var i = (e, t, n) => (nt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), l = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, h = (e, t, n, r) => (nt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var C = (e, t, n) => (nt(e, t, "access private method"), n);
function u(e, t, n, r) {
  if (u.null == t)
    throw new Error(`${n} is null and not a valid ${e}.`);
  if (u.invalid == t)
    throw new Error(`${n} is ${typeof r} and not a valid ${e}.`);
}
u.array = "array";
u.function = "function";
u.object = "object";
u.string = "string";
u.null = 0;
u.invalid = 1;
function bt(e, t) {
  t == null && u(u.array, u.null, e, t), (typeof t != "object" || !Array.isArray(t)) && u(u.array, u.invalid, e, t);
}
function ft(e, t) {
  t == null && u(u.function, u.null, e, t), typeof t != "function" && u(u.function, u.invalid, e, t);
}
function $(e, t) {
  t == null && u(u.object, u.null, e, t), (typeof t != "object" || Array.isArray(t)) && u(u.object, u.invalid, e, t);
}
function Q(e, t) {
  t == null && u(u.string, u.null, e, t), typeof t != "string" && !(t instanceof String) && u(u.string, u.invalid, e, t);
}
function M(e) {
  return typeof e == "object" && e != null && Array.isArray(e);
}
function Et(e) {
  return typeof e == "function" && e != null;
}
function Y(e) {
  return typeof e == "object" && e != null && !Array.isArray(e);
}
function W(e) {
  return (typeof e == "string" || e instanceof String) && e != null;
}
const ht = [], ct = "_xso_com_", y = {
  COMPONENTS: ht,
  COMPONENTS_PREFIX: ct,
  getComponent: (e) => ht.find((t) => t.key == e).instance,
  isKey: (e) => e.indexOf(ct) == 0
};
var Z, K, L, _;
class rt {
  constructor(t, n) {
    l(this, Z, null);
    l(this, K, null);
    l(this, L, null);
    l(this, _, null);
    h(this, Z, t), h(this, K, n);
  }
  get current() {
    return i(this, _);
  }
  set current(t) {
    h(this, _, t), i(this, K).fire(this);
  }
  set(t) {
    return h(this, L, t), this;
  }
  get() {
    return i(this, L);
  }
}
Z = new WeakMap(), K = new WeakMap(), L = new WeakMap(), _ = new WeakMap();
rt.prototype.toString = function() {
  return this.current;
};
function St(e, t, n) {
  $("Properties", t);
  const r = (o) => new Error(`Content of type ${typeof o} is not valid, only string, object, or array with objects.`);
  for (const o of Object.keys(t)) {
    const s = t[o];
    if (o == "_" && s)
      if (W(s))
        e.textContent = s;
      else if (M(s))
        v(e, s, n);
      else if (Y(s))
        v(e, [s], n);
      else
        throw r(s);
    else if (o == "$" && s)
      if (W(s))
        e.innerHTML = s;
      else if (M(s))
        v(e, s, n, !0);
      else if (Y(s))
        v(e, [s], n, !0);
      else
        throw r(s);
    else if (o == "text" && s)
      Q(o, s), e.innerText = s;
    else if (o == "html" && s)
      Q(o, s), e.innerHTML = s;
    else if (o == "style" && s) {
      $(o, s);
      for (const a of Object.keys(s))
        e.style[a] = s[a];
    } else if (o == "className" && s)
      Q(o, s), e.className = s;
    else if (o == "classList" && s)
      at(e, s);
    else if (o == "class" && s) {
      if (W(s))
        e.className = s;
      else if (M(s))
        at(e, s);
      else if (s != null && s != null)
        throw new Error(`CSS Class of type ${typeof s} is not valid, only string or array of strings is accepted.`);
    } else
      o.indexOf("on") == 0 ? (ft(o, s), e.addEventListener(o.substring(2).toLowerCase(), s)) : e.setAttribute(o, s);
  }
}
function at(e, t) {
  bt(key, t);
  for (const n of t)
    Q(n), e.classList.add(n);
}
function v(e, t, n, r) {
  const o = [];
  if (Y(t))
    if (t instanceof rt) {
      const s = v(e, t.get(), n);
      if (s.length == 0)
        throw new Error("Reference is empty with no valid elements.");
      if (s.length > 1)
        throw new Error("Reference with more than 1 element.");
      t.current = s[0];
    } else {
      const s = Object.keys(t);
      if (s.length > 1)
        throw new Error(`Object with more than 1 keys: ${s.join(", ")}`);
      if (s.length == 0)
        throw new Error("Object with no key, but one is required.");
      for (const a of s) {
        const d = t[a];
        if (y.isKey(a)) {
          const w = y.getComponent(a).clone();
          w.parent = e, w.render(d), n && n.appendChildComponent(w), o.push(w);
        } else {
          const w = document.createElement(a);
          St(w, d, n), o.push(w), e.appendChild(w);
        }
      }
    }
  else if (M(t))
    for (const s of t)
      if (W(s))
        if (r) {
          const a = document.createElement("span");
          a.innerHTML = s, e.appendChild(a), o.push(s);
        } else {
          const a = document.createTextNode(s);
          e.appendChild(a), o.push(s);
        }
      else
        v(e, s, n);
  else
    throw new Error(`View of type ${typeof t} is invalid, only object or array of objects.`);
  return o;
}
var I, R, b, F;
class pt {
  constructor(t, n) {
    l(this, I, null);
    l(this, R, null);
    l(this, b, null);
    l(this, F, null);
    h(this, I, t), h(this, b, n);
  }
  set val(t) {
    JSON.stringify(i(this, F)) != JSON.stringify(t) && (h(this, R, i(this, b)), h(this, b, t), h(this, F, JSON.stringify(t)), console.log("Props >> " + i(this, I).key(), t));
  }
  get val() {
    return i(this, b);
  }
  get previous() {
    return i(this, R);
  }
}
I = new WeakMap(), R = new WeakMap(), b = new WeakMap(), F = new WeakMap();
pt.prototype.toString = function() {
  return this.val;
};
var D, k, J, p, q, H, it;
class dt {
  constructor(t, n, r) {
    l(this, H);
    l(this, D, null);
    l(this, k, null);
    l(this, J, null);
    l(this, p, null);
    l(this, q, 0);
    h(this, D, t), h(this, k, n), h(this, p, r);
  }
  set $val(t) {
    i(this, p) !== t && (C(this, H, it).call(this, t), i(this, D).render(), i(this, k).fire(this));
  }
  get $val() {
    return i(this, p);
  }
  set val(t) {
    i(this, p) !== t && (C(this, H, it).call(this, t), i(this, k).fire(this));
  }
  get val() {
    return i(this, p);
  }
  get previous() {
    return i(this, J);
  }
  get lastChanged() {
    return i(this, q);
  }
}
D = new WeakMap(), k = new WeakMap(), J = new WeakMap(), p = new WeakMap(), q = new WeakMap(), H = new WeakSet(), it = function(t) {
  h(this, J, i(this, p)), h(this, p, t), h(this, q, Date.now());
};
dt.prototype.toString = function() {
  return this.val;
};
var X, E;
class jt {
  constructor() {
    l(this, X, []);
    l(this, E, []);
  }
  add(t, n) {
    i(this, X).push({
      items: t,
      func: n
    });
  }
  fire(t) {
    const n = i(this, X).filter((r) => r.items.includes(t));
    for (const r of n)
      r && !i(this, E).includes(r.func) && (i(this, E).push(r.func), setTimeout(() => {
        i(this, E).splice(i(this, E).indexOf(r.func), 1), r.func();
      }, 0));
  }
}
X = new WeakMap(), E = new WeakMap();
function yt(e) {
  return e instanceof g;
}
function ot(e) {
  if (!yt(e))
    throw new Error("Invalid component, because not implement the component class.");
}
var N, f, S, O, m, z, j, B, U, c, T, P, V, mt, tt, gt, et, wt, G, st;
const lt = class {
  constructor(t) {
    l(this, V);
    l(this, tt);
    l(this, et);
    l(this, G);
    l(this, N, !1);
    l(this, f, null);
    l(this, S, null);
    l(this, O, null);
    l(this, m, null);
    l(this, z, []);
    l(this, j, () => {
    });
    l(this, B, () => {
    });
    l(this, U, () => {
    });
    l(this, c, { elements: [], components: [] });
    l(this, T, new jt());
    ut(this, "parent", null);
    l(this, P, null);
    if (!Et(t) || t.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    h(this, f, t), C(this, V, mt).call(this);
  }
  name() {
    return i(this, f).name;
  }
  clone() {
    return new lt(i(this, f));
  }
  childrenElements() {
    return [...i(this, c).elements];
  }
  childrenComponents() {
    return [...i(this, c).components];
  }
  appendChildComponent(t) {
    ot(t), i(this, c).components.push(t);
  }
  mount(t) {
    t ? h(this, j, t) : i(this, j).call(this);
  }
  unmount(t) {
    t ? h(this, B, t) : (C(this, et, wt).call(this), C(this, tt, gt).call(this), i(this, B).call(this));
  }
  view(t) {
    h(this, U, t);
  }
  ref() {
    return new rt(this, i(this, T));
  }
  changes(t, n) {
    i(this, T).add(t, n);
  }
  render(t) {
    var r;
    const n = this;
    i(this, O) ? (i(this, P) && clearTimeout(i(this, P)), h(this, P, setTimeout(() => {
      var o;
      C(o = n, G, st).call(o, t);
    }, 0))) : C(r = n, G, st).call(r, t);
  }
  static isSameKind(t, n) {
    let r = null;
    for (const s of Object.keys(t))
      r = s;
    const o = y.getComponent(r);
    return i(o, f) === i(n, f);
  }
  function() {
    return i(this, f);
  }
  key() {
    return i(this, S);
  }
  destroy() {
    const t = y.COMPONENTS.findIndex((n) => n.key == i(this, S));
    y.COMPONENTS.splice(t, 1);
  }
  state(t) {
    if (i(this, m))
      return i(this, z)[i(this, m).state++];
    const n = new dt(this, i(this, T), t);
    return i(this, z).push(n), n;
  }
};
let g = lt;
N = new WeakMap(), f = new WeakMap(), S = new WeakMap(), O = new WeakMap(), m = new WeakMap(), z = new WeakMap(), j = new WeakMap(), B = new WeakMap(), U = new WeakMap(), c = new WeakMap(), T = new WeakMap(), P = new WeakMap(), V = new WeakSet(), mt = function() {
  for (; ; ) {
    const t = y.COMPONENTS_PREFIX + "[" + i(this, f).name + "]_" + (Math.random() + 1).toString(36).substring(2);
    if (!y.COMPONENTS.find((n) => n.key == t)) {
      h(this, S, t);
      break;
    }
  }
  y.COMPONENTS.push({ key: i(this, S), instance: this });
}, tt = new WeakSet(), gt = function() {
  if (i(this, c).elements.length > 0) {
    if (parent = i(this, c).elements[0].parentNode, parent == null)
      return;
    for (const t of i(this, c).elements)
      parent.contains(t) && parent.removeChild(t);
  }
}, et = new WeakSet(), wt = function() {
  for (const t of i(this, c).components)
    t.unmount();
  i(this, c).components = [];
}, G = new WeakSet(), st = function(t) {
  i(this, O) ? t ? i(this, O).val = t : h(this, m, { state: 0 }) : h(this, O, new pt(this, t)), i(this, N) == !1 && i(this, f).bind(this)(i(this, O).val);
  let n = i(this, U).bind(this)();
  (!n || n.length == 0) && (n = [{ span: { style: { display: "none" } } }]);
  let r = null;
  i(this, m) && (r = i(this, c).elements[0].parentNode);
  const o = document.createDocumentFragment(), s = i(this, c).components;
  if (i(this, c).components = [], v(o, n, this), i(this, m)) {
    const a = [];
    for (const d of o.children)
      a.push(d);
    if (i(this, c).elements.length == 0)
      this.parent.appendChild(o);
    else {
      r.insertBefore(o, i(this, c).elements[0]);
      for (const d of s)
        d.unmount();
      for (const d of i(this, c).elements)
        r.contains(d) && r.removeChild(d);
    }
    i(this, c).elements = a;
  } else {
    for (const a of o.children)
      i(this, c).elements.push(a);
    this.parent.appendChild(o);
  }
  h(this, m, null), i(this, N) == !1 && (h(this, N, !0), i(this, j) && window.setTimeout(i(this, j), 0));
};
g.prototype.toString = function() {
  return this.key();
};
g.prototype.isSameKind = function(e, t) {
  return g.isSameKind(e, t);
};
function kt(e) {
  $("Component Props", e);
  let t = null;
  for (const n of Object.keys(e)) {
    if (t != null)
      throw new Error(`More than 1 component in the same object: ${e}`);
    t = e[n], $("Component Props Loaded", t);
  }
  return t;
}
function Ct(e) {
  $("jsonDefinition of an invalid object.", e);
  let t = null;
  for (const r of Object.keys(e))
    t = r;
  let n = t;
  return t.indexOf(y.COMPONENTS_PREFIX) == 0 && (n = t.substring(t.indexOf("[") + 1, t.lastIndexOf("]"))), JSON.stringify({
    [n]: e[t]
  });
}
function A(e, t) {
  const n = (r) => new Error(`Only ${t.function().name} type is accepted! This component is invalid: ${Ct(r)}`);
  if (M(e)) {
    for (const r of e)
      if ($("ensureSameKind of an invalid object.", r), !g.isSameKind(r, t))
        throw n(r);
  } else if (Y(e)) {
    if (!g.isSameKind(e, t))
      throw n(e);
  } else
    throw new Error("Invalid kind.");
}
A.required = (e, t) => {
  if (e)
    return A(e, t);
  throw new Error(`${t.name()} is required.`);
};
A.optional = (e, t) => {
  e && A(e, t);
};
function x(e) {
  return ft("Component", e), new g(e);
}
x.create = (e, t, n) => {
  ot(t), t.parent = e, t.render(n);
};
x.ensure = ot;
x.is = yt;
x.ensureType = A;
x.props = kt;
x.json = Ct;
export {
  x as default
};
