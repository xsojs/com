function isFunction(def) {
    return typeof def === 'function' && def != null;
}

export default isFunction;