var St = Object.defineProperty;
var vt = (e, t, n) => t in e ? St(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ht = (e, t, n) => (vt(e, typeof t != "symbol" ? t + "" : t, n), n), nt = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var i = (e, t, n) => (nt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), o = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, u = (e, t, n, r) => (nt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var C = (e, t, n) => (nt(e, t, "access private method"), n);
function l(e, t, n, r) {
  if (l.null == t)
    throw new Error(`${n} is null and not a valid ${e}.`);
  if (l.invalid == t)
    throw new Error(`${n} is ${typeof r} and not a valid ${e}.`);
}
l.array = "array";
l.function = "function";
l.object = "object";
l.string = "string";
l.null = 0;
l.invalid = 1;
function bt(e, t) {
  t == null && l(l.array, l.null, e, t), (typeof t != "object" || !Array.isArray(t)) && l(l.array, l.invalid, e, t);
}
function pt(e, t) {
  t == null && l(l.function, l.null, e, t), typeof t != "function" && l(l.function, l.invalid, e, t);
}
function $(e, t) {
  t == null && l(l.object, l.null, e, t), (typeof t != "object" || Array.isArray(t)) && l(l.object, l.invalid, e, t);
}
function W(e, t) {
  t == null && l(l.string, l.null, e, t), typeof t != "string" && !(t instanceof String) && l(l.string, l.invalid, e, t);
}
function A(e) {
  return typeof e == "object" && e != null && Array.isArray(e);
}
function kt(e) {
  return typeof e == "function" && e != null;
}
function Y(e) {
  return typeof e == "object" && e != null && !Array.isArray(e);
}
function dt(e) {
  return (typeof e == "string" || e instanceof String) && e != null;
}
const ct = [], at = "_xso_com_", y = {
  COMPONENTS: ct,
  COMPONENTS_PREFIX: at,
  getComponent: (e) => {
    const t = ct.find((n) => n.key == e);
    return t ? t.instance : null;
  },
  isKey: (e) => e.indexOf(at) == 0
};
var Z, L, _, I;
class rt {
  constructor(t, n) {
    o(this, Z, null);
    o(this, L, null);
    o(this, _, null);
    o(this, I, null);
    u(this, Z, t), u(this, L, n);
  }
  get current() {
    return i(this, I);
  }
  set current(t) {
    u(this, I, t), i(this, L).fire(this);
  }
  set(t) {
    return u(this, _, t), this;
  }
  get() {
    return i(this, _);
  }
}
Z = new WeakMap(), L = new WeakMap(), _ = new WeakMap(), I = new WeakMap();
rt.prototype.toString = function() {
  return this.current;
};
function Nt(e, t, n) {
  $("Properties", t);
  for (const r of Object.keys(t)) {
    const s = t[r];
    if (r == "_" && s)
      A(s) ? E(e, s, n) : Y(s) ? E(e, [s], n) : e.textContent = s;
    else if (r == "$" && s)
      A(s) ? E(e, s, n, !0) : Y(s) ? E(e, [s], n, !0) : e.innerHTML = s;
    else if (r == "text" && s)
      W(r, s), e.innerText = s;
    else if (r == "html" && s)
      W(r, s), e.innerHTML = s;
    else if (r == "style" && s) {
      $(r, s);
      for (const h of Object.keys(s))
        h.indexOf("--") === 0 ? e.style.setProperty(h, s[h]) : e.style[h] = s[h];
    } else if (r == "className" && s)
      W(r, s), e.className = s;
    else if (r == "classList" && s)
      ft(e, s);
    else if (r == "class" && s) {
      if (dt(s))
        e.className = s;
      else if (A(s))
        ft(e, s);
      else if (s != null && s != null)
        throw new Error(`CSS Class of type ${typeof s} is not valid, only string or array of strings is accepted.`);
    } else
      r.indexOf("on") == 0 ? s && (pt(r, s), e.addEventListener(r.substring(2).toLowerCase(), s)) : s != null && s != null && e.setAttribute(r, s);
  }
}
function ft(e, t) {
  bt(key, t);
  for (const n of t)
    W(n), e.classList.add(n);
}
function E(e, t, n, r) {
  const s = [];
  if (Y(t))
    if (t instanceof rt) {
      const h = E(e, t.get(), n);
      if (h.length == 0)
        throw new Error("Reference is empty with no valid elements.");
      if (h.length > 1)
        throw new Error("Reference with more than 1 element.");
      t.current = h[0];
    } else {
      const h = Object.keys(t);
      if (h.length > 1)
        throw new Error(`Object with more than 1 keys: ${h.join(", ")}`);
      if (h.length == 0)
        throw new Error("Object with no key, but one is required.");
      for (const a of h) {
        const m = t[a];
        if (y.isKey(a)) {
          let f = y.getComponent(a);
          if (f)
            f = f.clone(), f.parent = e, f.render(m), n && n.appendChildComponent(f), s.push(f);
          else {
            const ut = document.createElement("xso-com-error");
            ut.innerText = "# XSO Component Error #", e.appendChild(ut);
          }
        } else {
          const f = document.createElement(a);
          Nt(f, m, n), s.push(f), e.appendChild(f);
        }
      }
    }
  else if (A(t))
    for (const h of t)
      if (dt(h))
        if (r) {
          const a = document.createElement("span");
          a.innerHTML = h, e.appendChild(a), s.push(h);
        } else {
          const a = document.createTextNode(h);
          e.appendChild(a), s.push(h);
        }
      else
        E(e, h, n);
  else
    throw new Error(`View of type ${typeof t} is invalid, only object or array of objects.`);
  return s;
}
var R, F, S, D;
class mt {
  constructor(t, n) {
    o(this, R, null);
    o(this, F, null);
    o(this, S, null);
    o(this, D, null);
    u(this, R, t), u(this, S, n);
  }
  set val(t) {
    JSON.stringify(i(this, D)) != JSON.stringify(t) && (u(this, F, i(this, S)), u(this, S, t), u(this, D, JSON.stringify(t)), console.log("Props >> " + i(this, R).key(), t));
  }
  get val() {
    return i(this, S);
  }
  get previous() {
    return i(this, F);
  }
}
R = new WeakMap(), F = new WeakMap(), S = new WeakMap(), D = new WeakMap();
mt.prototype.toString = function() {
  return this.val;
};
var J, N, X, p, q, H, it;
class yt {
  constructor(t, n, r) {
    o(this, H);
    o(this, J, null);
    o(this, N, null);
    o(this, X, null);
    o(this, p, null);
    o(this, q, 0);
    u(this, J, t), u(this, N, n), u(this, p, r);
  }
  set $val(t) {
    i(this, p) !== t && (C(this, H, it).call(this, t), i(this, J).render(), i(this, N).fire(this));
  }
  get $val() {
    return i(this, p);
  }
  set val(t) {
    i(this, p) !== t && (C(this, H, it).call(this, t), i(this, N).fire(this));
  }
  get val() {
    return i(this, p);
  }
  get previous() {
    return i(this, X);
  }
  get lastChanged() {
    return i(this, q);
  }
}
J = new WeakMap(), N = new WeakMap(), X = new WeakMap(), p = new WeakMap(), q = new WeakMap(), H = new WeakSet(), it = function(t) {
  u(this, X, i(this, p)), u(this, p, t), u(this, q, Date.now());
};
yt.prototype.toString = function() {
  return this.val;
};
var z, v;
class jt {
  constructor() {
    o(this, z, []);
    o(this, v, []);
  }
  add(t, n) {
    i(this, z).push({
      items: t,
      func: n
    });
  }
  fire(t) {
    const n = i(this, z).filter((r) => r.items.includes(t));
    for (const r of n)
      r && !i(this, v).includes(r.func) && (i(this, v).push(r.func), setTimeout(() => {
        i(this, v).splice(i(this, v).indexOf(r.func), 1), r.func();
      }, 0));
  }
}
z = new WeakMap(), v = new WeakMap();
function gt(e) {
  return e instanceof w;
}
function ot(e) {
  if (!gt(e))
    throw new Error("Invalid component, because not implement the component class.");
}
var j, d, T, b, O, g, B, k, U, G, c, x, P, V, wt, tt, Ct, et, Ot, Q, st;
const lt = class lt {
  constructor(t, n) {
    o(this, V);
    o(this, tt);
    o(this, et);
    o(this, Q);
    o(this, j, !1);
    o(this, d, null);
    o(this, T, null);
    o(this, b, null);
    o(this, O, null);
    o(this, g, null);
    o(this, B, []);
    o(this, k, () => {
    });
    o(this, U, () => {
    });
    o(this, G, () => {
    });
    o(this, c, { elements: [], components: [] });
    o(this, x, new jt());
    ht(this, "parent", null);
    o(this, P, null);
    if (!kt(t) || t.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    u(this, d, t), u(this, T, n), C(this, V, wt).call(this);
  }
  name() {
    return i(this, d).name;
  }
  clone() {
    return new lt(i(this, d), i(this, T));
  }
  logErrorStack() {
    window.setTimeout(() => console.error(this.name() + " >> Component" + i(this, T)), 0);
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
    t ? u(this, k, t) : i(this, k).call(this);
  }
  unmount(t) {
    t ? u(this, U, t) : (C(this, et, Ot).call(this), C(this, tt, Ct).call(this), i(this, U).call(this));
  }
  view(t) {
    u(this, G, t);
  }
  ref() {
    return new rt(this, i(this, x));
  }
  changes(t, n) {
    i(this, x).add(t, n);
  }
  render(t) {
    var n;
    try {
      const r = this;
      i(this, O) ? (i(this, P) && clearTimeout(i(this, P)), u(this, P, setTimeout(() => {
        var s;
        C(s = r, Q, st).call(s, t);
      }, 0))) : C(n = r, Q, st).call(n, t);
    } catch (r) {
      throw this.logErrorStack(), r;
    }
  }
  static isSameKind(t, n) {
    let r = null;
    for (const h of Object.keys(t))
      r = h;
    const s = y.getComponent(r);
    return i(s, d) === i(n, d);
  }
  function() {
    return i(this, d);
  }
  key() {
    return i(this, b);
  }
  destroy() {
    const t = y.COMPONENTS.findIndex((n) => n.key == i(this, b));
    y.COMPONENTS.splice(t, 1);
  }
  state(t) {
    if (i(this, g))
      return i(this, B)[i(this, g).state++];
    const n = new yt(this, i(this, x), t);
    return i(this, B).push(n), n;
  }
};
j = new WeakMap(), d = new WeakMap(), T = new WeakMap(), b = new WeakMap(), O = new WeakMap(), g = new WeakMap(), B = new WeakMap(), k = new WeakMap(), U = new WeakMap(), G = new WeakMap(), c = new WeakMap(), x = new WeakMap(), P = new WeakMap(), V = new WeakSet(), wt = function() {
  for (; ; ) {
    const t = y.COMPONENTS_PREFIX + "[" + this.name() + "]_" + (Math.random() + 1).toString(36).substring(2);
    if (!y.COMPONENTS.find((n) => n.key == t)) {
      u(this, b, t);
      break;
    }
  }
  y.COMPONENTS.push({ key: i(this, b), instance: this });
}, tt = new WeakSet(), Ct = function() {
  if (i(this, c).elements.length > 0) {
    if (parent = i(this, c).elements[0].parentNode, parent == null)
      return;
    for (const t of i(this, c).elements)
      parent.contains(t) && parent.removeChild(t);
  }
}, et = new WeakSet(), Ot = function() {
  for (const t of i(this, c).components)
    t.unmount();
  i(this, c).components = [];
}, Q = new WeakSet(), st = function(t) {
  i(this, O) ? t ? i(this, O).val = t : u(this, g, { state: 0 }) : u(this, O, new mt(this, t)), i(this, j) == !1 && i(this, d).bind(this)(i(this, O).val);
  let n = i(this, G).bind(this)();
  (!n || n.length == 0) && (n = [{ span: { style: { display: "none" } } }]);
  let r = null;
  i(this, g) && (r = i(this, c).elements[0].parentNode);
  const s = document.createDocumentFragment(), h = i(this, c).components;
  if (i(this, c).components = [], E(s, n, this), i(this, g)) {
    const a = [];
    for (const m of s.children)
      a.push(m);
    if (i(this, c).elements.length == 0)
      this.parent.appendChild(s);
    else {
      r.insertBefore(s, i(this, c).elements[0]);
      for (const m of h)
        m.unmount();
      for (const m of i(this, c).elements)
        r.contains(m) && r.removeChild(m);
    }
    i(this, c).elements = a;
  } else {
    for (const a of s.children)
      i(this, c).elements.push(a);
    this.parent.appendChild(s);
  }
  u(this, g, null), i(this, j) == !1 && (u(this, j, !0), i(this, k) && window.setTimeout(i(this, k), 0));
};
let w = lt;
w.prototype.toString = function() {
  return this.key();
};
w.prototype.isSameKind = function(e, t) {
  return w.isSameKind(e, t);
};
function Tt(e) {
  $("Component Props", e);
  let t = null;
  for (const n of Object.keys(e)) {
    if (t != null)
      throw new Error(`More than 1 component in the same object: ${e}`);
    t = e[n], $("Component Props Loaded", t);
  }
  return t;
}
function Et(e) {
  $("jsonDefinition of an invalid object.", e);
  let t = null;
  for (const r of Object.keys(e))
    t = r;
  let n = t;
  return t.indexOf(y.COMPONENTS_PREFIX) == 0 && (n = t.substring(t.indexOf("[") + 1, t.lastIndexOf("]"))), JSON.stringify({
    [n]: e[t]
  });
}
function K(e, t) {
  const n = (r) => new Error(`Only ${t.function().name} type is accepted! This component is invalid: ${Et(r)}`);
  if (A(e)) {
    for (const r of e)
      if ($("ensureSameKind of an invalid object.", r), !w.isSameKind(r, t))
        throw n(r);
  } else if (Y(e)) {
    if (!w.isSameKind(e, t))
      throw n(e);
  } else
    throw new Error("Invalid kind.");
}
K.required = (e, t) => {
  if (e)
    return K(e, t);
  throw new Error(`${t.name()} is required.`);
};
K.optional = (e, t) => {
  e && K(e, t);
};
function M(e) {
  return pt("Component", e), new w(e, new Error().stack);
}
M.create = (e, t, n) => {
  ot(t), t.parent = e, t.render(n);
};
M.ensure = ot;
M.is = gt;
M.ensureType = K;
M.props = Tt;
M.json = Et;
export {
  M as default
};
