import Component from "./Component";

function isComponent(com) {
    return com instanceof Component;
}

export default isComponent;