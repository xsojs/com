import isFunction from "../utils/isFunction";
import render from "./render";
import Props from "./Props";
import State from "./State";
import Ref from "./Ref";
import Changes from "./Changes";

const COMPONENTS = [];
const COMPONENTS_PREFIX = "_rso_com_";

class Component {
    #initialized = false;
    #func = null;
    #key = null;
    #props = null;
    #updating = null;
    #states = [];
    #onDestroy = () => {};
    #onView = () => {};
    #children = [];
    #changes = new Changes();
    parent = null;
    #renderTimeout = null;
    constructor(func) {
        if (!isFunction(func) || func.toString().indexOf('function') != 0) {
            throw new Error('Only classic functions are used for components and arrow function is not supported.')
        }
        this.#func = func;
        this.#load();
    }

    #load() {
        while (true) {
            const key = COMPONENTS_PREFIX + (Math.random() + 1).toString(36).substring(2);
            if (COMPONENTS.find((i)=> i.key == key)) {
                continue;
            }
            this.#key = key;
            break;
        }
        COMPONENTS.push({key: this.#key, instance: this});
    }

    clone() {
        const com = new Component(this.#func);
        return com;
    }

    destroy(func) {
        this.#onDestroy = func;
    }

    view(func) {
        this.#onView = func;
    }

    ref() {
        return new Ref(this, this.#changes);
    }

    changes(items, func) {
        this.#changes.add(items, func);
    }

    render(props) {
        const that = this;
        if (!this.#props) {
            that.#render(props);
        } else {
            if (this.#renderTimeout) {
                clearTimeout(this.#renderTimeout);
            }
            this.#renderTimeout = setTimeout(() => {
                that.#render(props);
            }, 0);
        }
    }

    #render(props) {
        if (!this.#props) {
            this.#props = new Props(this, props);
        } else if (props) {
            this.#props.value = props;
        } else {
            this.#updating = {state: 0};
        }
        if (this.#initialized == false) {
            this.#func.bind(this)(this.#props.value);
            this.#initialized = true;
        }
        const view = this.#onView.bind(this)();
        const fragment = document.createDocumentFragment();
        render(fragment, view, this, this.#children);
        if (this.#updating) {
            const children = [];
            for (const child of fragment.children) {
                children.push(child);
            }
            if (this.#children.length == 0) {
                this.parent.appendChild(fragment);
            } else {
                parent = this.#children[0].parentNode;
                parent.insertBefore(fragment, this.#children[0]);
                for (const child of this.#children) {
                    parent.removeChild(child);
                }
            }
            this.#children = children;
        } else {
            for (const child of fragment.children) {
                this.#children.push(child);
            }
            this.parent.appendChild(fragment);
        }
        this.#updating = null;
    }

    static get(key) {
        return COMPONENTS.find((i)=> i.key == key).instance;
    }

    static isKey(key) {
        return key.indexOf(COMPONENTS_PREFIX) == 0;
    }

    static is(com) {
        return com instanceof Component;
    }

    static ensure(com) {
        if (!Component.is(com)) {
            throw new Error(`Invalid component class.`);
        }
    }

    key() {
        return this.#key;
    }

    destroy() {
        const index = COMPONENTS.findIndex((i)=> i.key == this.#key);
        COMPONENTS.splice(index, 1);
    }

    state(value) {
        if (this.#updating) {
            return this.#states[this.#updating.state++];
        }
        const state = new State(this, this.#changes, value);
        this.#states.push(state)
        return state;
    }
}

Component.prototype.toString = function() {
    return this.key();
}

export default Component;