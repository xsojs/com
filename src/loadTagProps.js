import {
    ensureArray, ensureObject, ensureString,
    ensureFunction, isString, isArray
} from "@xso/utils";
import render from "./render";

function loadTagProps(tag, props) {
    ensureObject('Properties', props);
    for (const key of Object.keys(props)) {
        const value = props[key];
        if (key == '_') {
            if (isString(value)) {
                tag.textContent = value;
            } else if (isArray(value)) {
                render(tag, value);
            } else {
                throw new Error(`Content of type ${typeof value} is not valid, only string or array with objects.`);
            }
        } else if (key == '$') {
            if (isString(value)) {
                tag.innerHTML = value;
            } else if (isArray(value)) {
                render(tag, value);
            } else {
                throw new Error(`Content of type ${typeof value} is not valid, only string or array with objects.`);
            }
        } else if (key == 'text') {
            ensureString(key, value);
            tag.innerText = value;
        } else if (key == 'html') {
            ensureString(key, value);
            tag.innerHTML = value;
        } else if (key == 'style') {
            ensureObject(key, value);
            for (const styleKey of Object.keys(value)) {
                tag.style[styleKey] = value[styleKey];
            }
        } else if (key == 'className') {
            ensureString(key, value);
            tag.className = value;
        } else if (key == 'classList') {
            loadClassList(tag, value);
        } else if (key == 'class') {
            if (isString(value)) {
                tag.className = value;
            } else if (isArray(value)) {
                loadClassList(tag, value);
            } else if (value != undefined && value != null) {
                throw new Error(`CSS Class of type ${typeof value} is not valid, only string or array of strings is accepted.`);
            }
        } else if (key.indexOf('on') == 0) {
            ensureFunction(key, value);
            tag.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
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