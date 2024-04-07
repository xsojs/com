
class Props {
    #component = null;
    #previous = null;
    #value = null;
    #valueJSON = null;
    constructor(component, initial) {
        this.#component = component;
        this.#value = initial;
    }
    set value(v) {
        if (JSON.stringify(this.#valueJSON) == JSON.stringify(v)) {
            return;
        }
        this.#previous = this.#value;
        this.#value = v;
        this.#valueJSON = JSON.stringify(v);
        console.log('Props >> '+ this.#component.key(), v);
        //this.#component.render(v);
    }
    get value() {
        return this.#value;
    }
    get previous() {
        return this.#previous;
    }
}

Props.prototype.toString = function() {
    return this.value;
}

export default Props;