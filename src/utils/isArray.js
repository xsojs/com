function isArray(def) {
    return typeof def === 'object' && def != null && Array.isArray(def);
}

export default isArray;