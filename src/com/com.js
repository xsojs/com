import ensureFunction from "../utils/ensureFunction";
import Component from "./component";

function com(func) {
    ensureFunction('Component', func);
    return new Component(func);
}

com.create = (dom, component, props) => {
    Component.ensure(component);
    component.parent = dom;
    component.render(props);
};

export default com;
