
class Ref {
    #component = null;
    #changes = null;
    #view = null;
    #current = null;
    constructor(component, changes) {
        this.#component = component;
        this.#changes = changes;
    }

    get current() {
        return this.#current;
    }

    set current(v) {
        this.#current = v;
        this.#changes.fire(this);
    }

    set(view) {
        this.#view = view;
        return this;
    }

    get() {
        return this.#view;
    }
}

Ref.prototype.toString = function() {
    return this.current;
}

export default Ref;