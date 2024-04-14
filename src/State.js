
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
    set $val(value) {
        if (this.#value === value) {
            return;
        }
        this.#setValue(value);
        this.#component.render();
        this.#changes.fire(this);
    }
    set val(value) {
        if (this.#value === value) {
            return;
        }
        this.#setValue(value);
        this.#changes.fire(this);
    }
    get val() {
        return this.#value;
    }
    get previous() {
        return this.#previous;
    }
    get lastChanged() {
        return this.#lastChanged;
    }

    #setValue(value) {
        this.#previous = this.#value;
        this.#value = value;
        this.#lastChanged = Date.now();
    }
}

State.prototype.toString = function() {
    return this.val;
}

export default State;