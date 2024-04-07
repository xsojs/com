function isObject(def) {
    return typeof def === 'object' && def != null && !Array.isArray(def);
}

export default isObject;