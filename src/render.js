import {
    isArray, isObject, isString
} from "@xso/utils";
import Ref from "./Ref";
import loadTagProps from "./loadTagProps";
import store from "./store";

function render(dom, defView, com, html) {
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
                const props = defView[key];
                if (store.isKey(key)) {
                    let subCom = store.getComponent(key);
                    if (subCom) {
                        subCom = subCom.clone();
                        subCom.parent = dom;
                        subCom.render(props);
                        if (com) {
                            com.appendChildComponent(subCom);
                        }
                        elements.push(subCom);
                    } else {
                        const tag = document.createElement('xso-com-error');
                        tag.innerText = '# XSO Component Error #';
                        dom.appendChild(tag);
                    }
                } else {
                    const tag = document.createElement(key);
                    loadTagProps(tag, props, com);
                    elements.push(tag);
                    dom.appendChild(tag);
                } 
            }
        }
    } else if (isArray(defView)) {
        for (const item of defView) {
            if (isString(item)) {
                if (html) {
                    const content = document.createElement('span');
                    content.innerHTML = item;
                    dom.appendChild(content);
                    elements.push(item);
                } else {
                    const content = document.createTextNode(item);
                    dom.appendChild(content);
                    elements.push(item);
                }
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