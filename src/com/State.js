
class State {
    #component = null;
    #changes = null;
    #previous = null;
    #value = null;
    #lastChanged = 0;
    constructor(component, changes, value) {
        this.#component = component;
        this.#changes = changes;
        this.#value = value;
    }
    set value(value) {
        if (this.#value === value) {
            return;
        }
        this.#previous = this.#value;
        this.#value = value;
        this.#lastChanged = Date.now();
        this.#component.render();
        this.#changes.fire(this);
    }
    get value() {
        return this.#value;
    }
    get previous() {
        return this.#previous;
    }
    get lastChanged() {
        return this.#lastChanged;
    }
}

State.prototype.toString = function() {
    return this.value;
}

export default State;