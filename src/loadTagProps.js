import {
    ensureArray, ensureObject, ensureString,
    ensureFunction, isString, isArray,
    isObject
} from "@xso/utils";
import render from "./render";

function loadTagProps(tag, props, com) {
    ensureObject('Properties', props);
    for (const key of Object.keys(props)) {
        const value = props[key];
        if (key == '_' && value) {
            if (isArray(value)) {
                render(tag, value, com);
            } else if (isObject(value)) {
                render(tag, [ value ], com);
            } else {
                tag.textContent = value;
            }
        } else if (key == '$' && value) {
            if (isArray(value)) {
                render(tag, value, com, true);
            } else if (isObject(value)) {
                render(tag, [ value ], com, true);
            } else {
                tag.innerHTML = value;
            }
        } else if (key == 'text' && value) {
            ensureString(key, value);
            tag.innerText = value;
        } else if (key == 'html' && value) {
            ensureString(key, value);
            tag.innerHTML = value;
        } else if (key == 'style' && value) {
            ensureObject(key, value);
            for (const styleKey of Object.keys(value)) {
                if (styleKey.indexOf('--') === 0) {
                    tag.style.setProperty(styleKey, value[styleKey]);
                } else {
                    tag.style[styleKey] = value[styleKey];
                }
            }
        } else if (key == 'className' && value) {
            ensureString(key, value);
            tag.className = value;
        } else if (key == 'classList' && value) {
            loadClassList(tag, value);
        } else if (key == 'class' && value) {
            if (isString(value)) {
                tag.className = value;
            } else if (isArray(value)) {
                loadClassList(tag, value);
            } else if (value != undefined && value != null) {
                throw new Error(`CSS Class of type ${typeof value} is not valid, only string or array of strings is accepted.`);
            }
        } else if (key.indexOf('on') == 0) {
            if (value) {
                ensureFunction(key, value);
                tag.addEventListener(key.substring(2).toLowerCase(), value);
            }
        } else if (value != undefined && value != null) {
            tag.setAttribute(key, value);
        }
    }
}

function loadClassList(tag, prop) {
    ensureArray(key, prop);
    for (const cssClass of prop) {
        ensureString(cssClass);
        tag.classList.add(cssClass);
    }
}

export default loadTagProps;