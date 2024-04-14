
const COMPONENTS = [];
const COMPONENTS_PREFIX = "_xso_com_";

const store = {
    COMPONENTS,
    COMPONENTS_PREFIX,
    getComponent: (key) => {
        return COMPONENTS.find((i)=> i.key == key).instance;
    },
    isKey: (key)=> {
        return key.indexOf(COMPONENTS_PREFIX) == 0;
    }
}

export default store;