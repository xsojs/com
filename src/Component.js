import { isFunction } from "@xso/utils";
import store from "./store";
import render from "./render";
import Props from "./Props";
import State from "./State";
import Ref from "./Ref";
import Changes from "./Changes";
import ensureComponent from "./ensureComponent";

class Component {
    #initialized = false;
    #func = null;
    #errorStack = null;
    #key = null;
    #props = null;
    #updating = null;
    #states = [];
    #onMount = () => {};
    #onUnmount = () => {};
    #onView = () => {};
    #children = { elements: [], components: [] };
    #changes = new Changes();
    parent = null;
    #renderTimeout = null;
    constructor(func, errorStack) {
        if (!isFunction(func) || func.toString().indexOf('function') != 0) {
            throw new Error('Only classic functions are used for components and arrow function is not supported.')
        }
        this.#func = func;
        this.#errorStack = errorStack;
        this.#load();
    }

    #load() {
        while (true) {
            const key = store.COMPONENTS_PREFIX +'['+ this.name() +']_'+ (Math.random() + 1).toString(36).substring(2);
            if (store.COMPONENTS.find((i)=> i.key == key)) {
                continue;
            }
            this.#key = key;
            break;
        }
        store.COMPONENTS.push({key: this.#key, instance: this});
    }

    name() {
        return this.#func.name;
    }

    clone() {
        const com = new Component(this.#func, this.#errorStack);
        return com;
    }

    logErrorStack() {
        window.setTimeout(()=> console.error(this.name() +' >> Component'+ this.#errorStack), 0);
    }

    childrenElements() {
        return [...this.#children.elements];
    }

    childrenComponents() {
        return [...this.#children.components];
    }

    appendChildComponent(com) {
        ensureComponent(com);
        this.#children.components.push(com);
    }

    #unmountChildrenElements() {
        if (this.#children.elements.length > 0) {
            parent = this.#children.elements[0].parentNode;
            if (parent == null) {
                return;
            }
            for (const child of this.#children.elements) {
                if (parent.contains(child)) {
                    parent.removeChild(child);
                }
            }
        }
    }

    #unmountChildrenComponents() {
        for (const child of this.#children.components) {
            child.unmount();
        }
        this.#children.components = [];
    }

    mount(func) {
        if (func) {
            this.#onMount = func;
        } else {
            this.#onMount();
        }
    }

    unmount(func) {
        if (func) {
            this.#onUnmount = func;
        } else {
            this.#unmountChildrenComponents();
            this.#unmountChildrenElements();
            this.#onUnmount();
        }
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
        try {
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
        } catch (e) {
            this.logErrorStack();
            throw e;
        }
    }

    #render(props) {
        if (!this.#props) {
            this.#props = new Props(this, props);
        } else if (props) {
            this.#props.val = props;
        } else {
            this.#updating = {state: 0};
        }
        if (this.#initialized == false) {
            this.#func.bind(this)(this.#props.val);
        }
        let view = this.#onView.bind(this)();
        if (!view || view.length == 0) {
            view = [{span: {style: {display: 'none'}}}]
        }
        let parent = null;
        if (this.#updating) {
            parent = this.#children.elements[0].parentNode;
        }
        const fragment = document.createDocumentFragment();
        const oldComponents = this.#children.components;
        this.#children.components = [];
        render(fragment, view, this);
        if (this.#updating) {
            const elements = [];
            for (const child of fragment.children) {
                elements.push(child);
            }
            if (this.#children.elements.length == 0) {
                this.parent.appendChild(fragment);
            } else {
                parent.insertBefore(fragment, this.#children.elements[0]);
                for (const child of oldComponents) {
                    child.unmount();
                }
                for (const child of this.#children.elements) {
                    if (parent.contains(child)) {
                        parent.removeChild(child);
                    }
                }
            }
            this.#children.elements = elements;
        } else {
            for (const child of fragment.children) {
                this.#children.elements.push(child);
            }
            this.parent.appendChild(fragment);
        }
        this.#updating = null;
        if (this.#initialized == false) {
            this.#initialized = true;
            if (this.#onMount) {
                window.setTimeout(this.#onMount, 0);
            }
        }
    }

    static isSameKind(obj, com) {
        let key = null;
        for (const _key of Object.keys(obj)) {
            key = _key;
        }
        const instance = store.getComponent(key);
        return instance.#func === com.#func;
    }

    function() {
        return this.#func;
    }

    key() {
        return this.#key;
    }

    destroy() {
        const index = store.COMPONENTS.findIndex((i)=> i.key == this.#key);
        store.COMPONENTS.splice(index, 1);
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

Component.prototype.isSameKind = function(obj, func) {
    return Component.isSameKind(obj, func);
}

export default Component;