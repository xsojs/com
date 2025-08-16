import { ensureFunction } from "@xso/utils";
import Component from "./Component";
import ensureComponent from "./ensureComponent";
import isComponent from "./isComponent";

import propsDefined from "./propsDefined";
import ensureType from "./ensureType";
import jsonDefinition from "./jsonDefinition";

function com(func) {
    ensureFunction('Component', func);
    return new Component(func, new Error().stack);
}

com.create = (dom, component, props) => {
    ensureComponent(component);
    component.parent = dom;
    component.render(props);
};

com.ensure = ensureComponent;
com.is = isComponent;
com.isSameType = Component.isSameType;
com.ensureType = ensureType;
com.props = propsDefined;
com.json = jsonDefinition;

export default com;
