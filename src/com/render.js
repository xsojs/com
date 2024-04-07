import isArray from "../utils/isArray";
import isObject from "../utils/isObject";
import isString from "../utils/isString";
import Component from "./Component";
import Ref from "./Ref";
import loadTagProps from "./loadTagProps";

const COMPONENTS = [];

function render(dom, defView, com) {
    //const dom = document.createElement('div');
    const elements = [];
    if (isObject(defView)) {
        if (defView instanceof Ref) {
            const refElements = render(dom, defView.get(), com);
            if (refElements.length == 0) {
                throw new Error('Reference is empty with no valid elements.')
            } else if (refElements.length > 1) {
                throw new Error('Reference with more than 1 element.')
            }
            defView.current = refElements[0];
        } else {
            const keys = Object.keys(defView);
            if (keys.length > 1) {
                throw new Error(`Object with more than 1 keys: ${keys.join(', ')}`);
            }
            if (keys.length == 0) {
                throw new Error('Object with no key, but one is required.');
            }
            for (const key of keys) {
                if (key.indexOf('_') != 0) {
                    const tag = document.createElement(key);
                    loadTagProps(tag, defView[key]);
                    elements.push(tag);
                    dom.appendChild(tag);
                } else if (Component.isKey(key)) {
                    const subCom = Component.get(key).clone();
                    subCom.parent = com.parent;
                    subCom.render(defView[key]);
                    elements.push(subCom);
                }
            }
        }
    } else if (isArray(defView)) {
        for (const item of defView) {
            if (isString(item)) {
                const content = document.createTextNode(item);
                dom.appendChild(content);
                elements.push(item);
            } else {
                render(dom, item, com);
            }
        }
    } else {
        throw new Error(`View of type ${typeof defView} is invalid, only object or array of objects.`)
    }
    return elements;
}

export default render;