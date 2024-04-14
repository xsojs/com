import { isFunction } from "@xso/utils";
import store from "./store";
import render from "./render";
import Props from "./Props";
import State from "./State";
import Ref from "./Ref";
import Changes from "./Changes";

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
            const key = store.COMPONENTS_PREFIX +'['+ this.#func.name +']_'+ (Math.random() + 1).toString(36).substring(2);
            if (store.COMPONENTS.find((i)=> i.key == key)) {
                continue;
            }
            this.#key = key;
            break;
        }
        store.COMPONENTS.push({key: this.#key, instance: this});
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
            this.#props.val = props;
        } else {
            this.#updating = {state: 0};
        }
        if (this.#initialized == false) {
            this.#func.bind(this)(this.#props.val);
            this.#initialized = true;
        }
        let view = this.#onView.bind(this)();
        if (view.length == 0) {
            view = [{span: {style: {display: 'none'}}}]
        }
        const fragment = document.createDocumentFragment();
        render(fragment, view, this);
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