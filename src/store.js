
const COMPONENTS = [];
const COMPONENTS_PREFIX = "_xso_com_";

const store = {
    COMPONENTS,
    COMPONENTS_PREFIX,
    getComponent: (key) => {
        const com = COMPONENTS.find((i)=> i.key == key);
        if (com) {
            return com.instance;
        }
        return null;
    },
    isKey: (key)=> {
        return key.indexOf(COMPONENTS_PREFIX) == 0;
    }
}

export default store;