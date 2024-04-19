import {
    ensureArray, ensureObject, ensureString,
    ensureFunction, isString, isArray,
    isObject
} from "@xso/utils";
import render from "./render";

function loadTagProps(tag, props) {
    ensureObject('Properties', props);
    const invalidContent = (v)=> new Error(`Content of type ${typeof v} is not valid, only string, object, or array with objects.`);
    for (const key of Object.keys(props)) {
        const value = props[key];
        if (key == '_' && value) {
            if (isString(value)) {
                tag.textContent = value;
            } else if (isArray(value)) {
                render(tag, value);
            } else if (isObject(value)) {
                render(tag, [ value ]);
            } else {
                throw invalidContent(value);
            }
        } else if (key == '$' && value) {
            if (isString(value)) {
                tag.innerHTML = value;
            } else if (isArray(value)) {
                render(tag, value);
            } else if (isObject(value)) {
                render(tag, [ value ]);
            } else {
                throw invalidContent(value);
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
                tag.style[styleKey] = value[styleKey];
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