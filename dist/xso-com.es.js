function o(t, e, n, i) {
  if (o.null == e)
    throw new Error(`${n} is null and not a valid ${t}.`);
  if (o.invalid == e)
    throw new Error(`${n} is ${typeof i} and not a valid ${t}.`);
}
o.array = "array";
o.function = "function";
o.object = "object";
o.string = "string";
o.null = 0;
o.invalid = 1;
function M(t, e) {
  e == null && o(o.array, o.null, t, e), (typeof e != "object" || !Array.isArray(e)) && o(o.array, o.invalid, t, e);
}
function k(t, e) {
  e == null && o(o.function, o.null, t, e), typeof e != "function" && o(o.function, o.invalid, t, e);
}
function m(t, e) {
  e == null && o(o.object, o.null, t, e), (typeof e != "object" || Array.isArray(e)) && o(o.object, o.invalid, t, e);
}
function w(t, e) {
  e == null && o(o.string, o.null, t, e), typeof e != "string" && !(e instanceof String) && o(o.string, o.invalid, t, e);
}
function y(t) {
  return typeof t == "object" && t != null && Array.isArray(t);
}
function L(t) {
  return typeof t == "function" && t != null;
}
function C(t) {
  return typeof t == "object" && t != null && !Array.isArray(t);
}
function j(t) {
  return (typeof t == "string" || t instanceof String) && t != null;
}
const b = [], N = "_xso_com_", h = {
  COMPONENTS: b,
  COMPONENTS_PREFIX: N,
  getComponent: (t) => {
    const e = b.find((n) => n.key == t);
    return e ? e.instance : null;
  },
  isKey: (t) => t.indexOf(N) == 0
};
class O {
  #i = null;
  #e = null;
  #s = null;
  #t = null;
  constructor(e, n) {
    this.#i = e, this.#e = n;
  }
  get current() {
    return this.#t;
  }
  set current(e) {
    this.#t = e, this.#e.fire(this);
  }
  set(e) {
    return this.#s = e, this;
  }
  get() {
    return this.#s;
  }
}
O.prototype.toString = function() {
  return this.current;
};
function S(t, e, n, i) {
  m("Properties", e);
  for (const r of Object.keys(e)) {
    const s = e[r];
    if (r === "_" && s)
      y(s) ? p(t, s, n, !1, i) : C(s) ? p(t, [s], n, !1, i) : t.textContent = s;
    else if (r === "$" && s)
      y(s) ? p(t, s, n, !0, i) : C(s) ? p(t, [s], n, !0, i) : t.innerHTML = s;
    else if (r === "text" && s)
      w(r, s), t.innerText = s;
    else if (r === "html" && s)
      w(r, s), t.innerHTML = s;
    else if (r === "style" && s) {
      m(r, s);
      for (const l of Object.keys(s))
        l.indexOf("--") === 0 ? t.style.setProperty(l, s[l]) : t.style[l] = s[l];
    } else if (r === "className" && s)
      w(r, s), t.className instanceof SVGAnimatedString ? t.className.baseVal = s : t.className = s;
    else if (r === "classList" && s)
      t.className instanceof SVGAnimatedString ? t.className.baseVal = s.join(" ") : T(r, t, s);
    else if (r === "class" && s) {
      if (j(s))
        t.className instanceof SVGAnimatedString ? t.className.baseVal = s : t.className = s;
      else if (y(s))
        T(r, t, s);
      else if (s != null)
        throw new Error(`CSS Class of type ${typeof s} is not valid, only string or array of strings is accepted.`);
    } else r.indexOf("on") === 0 ? s && (k(r, s), t.addEventListener(r.substring(2).toLowerCase(), s)) : s != null && t.setAttribute(r, s);
  }
}
function T(t, e, n) {
  M(t, n);
  for (const i of n)
    w(t, i), e.classList.add(i);
}
function p(t, e, n, i = !1, r) {
  const s = [];
  if (C(e))
    if (e instanceof O) {
      const l = p(t, e.get(), n);
      if (l.length === 0)
        throw new Error("Reference is empty with no valid elements.");
      if (l.length > 1)
        throw new Error("Reference with more than 1 element.");
      e.current = l[0];
    } else {
      const l = Object.keys(e);
      if (l.length > 1)
        throw new Error(`Object with more than 1 keys: ${l.join(", ")}`);
      if (l.length === 0)
        throw new Error("Object with no key, but one is required.");
      for (const u of l) {
        const a = e[u];
        if (h.isKey(u)) {
          let c = h.getComponent(u);
          if (c)
            c = c.clone(), c.parent = t, c.render(a), n && n.appendChildComponent(c), s.push(c);
          else {
            const v = document.createElement("xso-com-error");
            v.innerText = "# XSO Component Error #", t.appendChild(v);
          }
        } else if (u === "svg" && !a.xmlns && !r && (r = "http://www.w3.org/2000/svg"), a.xmlns) {
          const c = document.createElementNS(a.xmlns, u);
          S(c, a, n, a.xmlns), s.push(c), t.appendChild(c);
        } else if (r) {
          const c = document.createElementNS(r, u);
          S(c, a, n, r), s.push(c), t.appendChild(c);
        } else {
          const c = document.createElement(u);
          S(c, a, n), s.push(c), t.appendChild(c);
        }
      }
    }
  else if (y(e))
    for (const l of e)
      if (j(l))
        if (i) {
          const u = document.createElement("span");
          u.innerHTML = l, t.appendChild(u), s.push(l);
        } else {
          const u = document.createTextNode(l);
          t.appendChild(u), s.push(l);
        }
      else
        p(t, l, n, !1, r);
  else if (e != null)
    throw new Error(`View of type ${typeof e} is invalid, only object or array of objects.`);
  return s;
}
class P {
  #i = null;
  #e = null;
  #s = null;
  #t = null;
  constructor(e, n) {
    this.#i = e, this.#s = n;
  }
  set val(e) {
    JSON.stringify(this.#t) !== JSON.stringify(e) && (this.#e = this.#s, this.#s = e, this.#t = JSON.stringify(e));
  }
  get val() {
    return this.#s;
  }
  get previous() {
    return this.#e;
  }
}
P.prototype.toString = function() {
  return this.val;
};
class $ {
  #i = null;
  #e = null;
  #s = null;
  #t = null;
  #o = 0;
  constructor(e, n, i) {
    this.#i = e, this.#e = n, this.#t = i;
  }
  set $val(e) {
    this.#t !== e && (this.#r(e), this.#i.render(), this.#e.fire(this));
  }
  get $val() {
    return this.#t;
  }
  set val(e) {
    this.#t !== e && (this.#r(e), this.#e.fire(this));
  }
  get val() {
    return this.#t;
  }
  get previous() {
    return this.#s;
  }
  get lastChanged() {
    return this.#o;
  }
  #r(e) {
    this.#s = this.#t, this.#t = e, this.#o = Date.now();
  }
}
$.prototype.toString = function() {
  return this.val;
};
class _ {
  #i = [];
  #e = [];
  add(e, n) {
    this.#i.push({
      items: e,
      func: n
    });
  }
  fire(e) {
    const n = this.#i.filter((i) => i.items.includes(e));
    for (const i of n)
      i && !this.#e.includes(i.func) && (this.#e.push(i.func), setTimeout(() => {
        this.#e.splice(this.#e.indexOf(i.func), 1), i.func();
      }, 0));
  }
}
function x(t) {
  return t instanceof f;
}
function E(t) {
  if (!x(t))
    throw new Error("Invalid component, because not implement the component class.");
}
class f {
  #i = !1;
  #e = null;
  #s = null;
  #t = null;
  #o = null;
  #r = null;
  #h = [];
  #l = () => {
  };
  #a = () => {
  };
  #f = () => {
  };
  #n = { elements: [], components: [] };
  #u = new _();
  parent = null;
  #c = null;
  constructor(e, n) {
    if (!L(e) || e.toString().indexOf("function") != 0)
      throw new Error("Only classic functions are used for components and arrow function is not supported.");
    this.#e = e, this.#s = n, this.#d();
  }
  #d() {
    for (; ; ) {
      const e = h.COMPONENTS_PREFIX + "[" + this.name() + "]_" + (Math.random() + 1).toString(36).substring(2);
      if (!h.COMPONENTS.find((n) => n.key == e)) {
        this.#t = e;
        break;
      }
    }
    h.COMPONENTS.push({ key: this.#t, instance: this });
  }
  name() {
    return this.#e.name;
  }
  clone() {
    return new f(this.#e, this.#s);
  }
  logErrorStack() {
    window.setTimeout(() => console.error(this.name() + " >> Component" + this.#s), 0);
  }
  childrenElements() {
    return [...this.#n.elements];
  }
  childrenComponents() {
    return [...this.#n.components];
  }
  appendChildComponent(e) {
    E(e), this.#n.components.push(e);
  }
  #m() {
    if (this.#n.elements.length > 0) {
      if (parent = this.#n.elements[0].parentNode, parent == null)
        return;
      for (const e of this.#n.elements)
        parent.contains(e) && parent.removeChild(e);
    }
  }
  #y() {
    for (const e of this.#n.components)
      e.unmount();
    this.#n.components = [];
  }
  mount(e) {
    e ? this.#l = e : this.#l();
  }
  unmount(e) {
    e ? this.#a = e : (this.#y(), this.#m(), this.#a());
  }
  view(e) {
    this.#f = e;
  }
  ref() {
    return new O(this, this.#u);
  }
  changes(e, n) {
    this.#u.add(e, n);
  }
  render(e) {
    try {
      const n = this;
      this.#o ? (this.#c && clearTimeout(this.#c), this.#c = setTimeout(() => {
        n.#p(e);
      }, 0)) : n.#p(e);
    } catch (n) {
      throw this.logErrorStack(), n;
    }
  }
  #p(e) {
    this.#o ? e ? this.#o.val = e : this.#r = { state: 0 } : this.#o = new P(this, e), this.#i == !1 && this.#e.bind(this)(this.#o.val);
    let n = this.#f.bind(this)();
    (!n || n.length == 0) && (n = [{ span: { style: { display: "none" } } }]);
    let i = null;
    this.#r && (i = this.#n.elements[0].parentNode);
    const r = document.createDocumentFragment(), s = this.#n.components;
    if (this.#n.components = [], p(r, n, this), this.#r) {
      const l = [];
      for (const u of r.children)
        l.push(u);
      if (this.#n.elements.length == 0)
        this.parent.appendChild(r);
      else {
        i.insertBefore(r, this.#n.elements[0]);
        for (const u of s)
          u.unmount();
        for (const u of this.#n.elements)
          i.contains(u) && i.removeChild(u);
      }
      this.#n.elements = l;
    } else {
      for (const l of r.children)
        this.#n.elements.push(l);
      this.parent.appendChild(r);
    }
    this.#r = null, this.#i == !1 && (this.#i = !0, this.#l && window.setTimeout(this.#l, 0));
  }
  static isSameType(e, n) {
    let i = null;
    for (const s of Object.keys(e))
      i = s;
    return h.getComponent(i).#e === n.#e;
  }
  function() {
    return this.#e;
  }
  key() {
    return this.#t;
  }
  destroy() {
    const e = h.COMPONENTS.findIndex((n) => n.key == this.#t);
    h.COMPONENTS.splice(e, 1);
  }
  state(e) {
    if (this.#r)
      return this.#h[this.#r.state++];
    const n = new $(this, this.#u, e);
    return this.#h.push(n), n;
  }
}
f.prototype.toString = function() {
  return this.key();
};
function I(t) {
  m("Component Props", t);
  let e = null;
  for (const n of Object.keys(t)) {
    if (e != null)
      throw new Error(`More than 1 component in the same object: ${t}`);
    e = t[n], m("Component Props Loaded", e);
  }
  return e;
}
function A(t) {
  m("jsonDefinition of an invalid object.", t);
  let e = null;
  for (const i of Object.keys(t))
    e = i;
  let n = e;
  return e.indexOf(h.COMPONENTS_PREFIX) == 0 && (n = e.substring(e.indexOf("[") + 1, e.lastIndexOf("]"))), JSON.stringify({
    [n]: t[e]
  });
}
function g(t, e) {
  const n = (i) => new Error(`Only ${e.function().name} type is accepted! This component is invalid: ${A(i)}`);
  if (y(t)) {
    for (const i of t)
      if (m("ensureSameKind of an invalid object.", i), !f.isSameType(i, e))
        throw n(i);
  } else if (C(t)) {
    if (!f.isSameType(t, e))
      throw n(t);
  } else
    throw new Error("Invalid kind.");
}
g.required = (t, e) => {
  if (t)
    return g(t, e);
  throw new Error(`${e.name()} is required.`);
};
g.optional = (t, e) => {
  t && g(t, e);
};
function d(t) {
  return k("Component", t), new f(t, new Error().stack);
}
d.create = (t, e, n) => {
  E(e), e.parent = t, e.render(n);
};
d.ensure = E;
d.is = x;
d.isSameType = f.isSameType;
d.ensureType = g;
d.props = I;
d.json = A;
export {
  d as default
};
