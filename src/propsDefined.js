import {ensureObject, isObject} from "@xso/utils";

function propsDefined(com, newProps) {
    ensureObject(`Component Props`, com);
    let props = null;
    for (const key of Object.keys(com)) {
        if (props != null) {
            throw new Error(`More than 1 component in the same object: ${com}`);
        }
        props = com[key];
        ensureObject(`Component Props Loaded`, props);
        if (newProps && isObject(newProps)) {
            props = { ...props, ...newProps };
            com[key] = props;
        }
    }
    return props;
}

export default propsDefined;