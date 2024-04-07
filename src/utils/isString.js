function isString(def) {
    return (typeof def === 'string' || def instanceof String) && def != null;
}

export default isString;