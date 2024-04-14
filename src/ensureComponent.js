import isComponent from "./isComponent";

function ensureComponent(com) {
    if (!isComponent(com)) {
        throw new Error(`Invalid component, because not implement the component class.`);
    }
}

export default ensureComponent;