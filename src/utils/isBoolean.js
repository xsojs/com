function isBoolean(def) {
    return (typeof def === 'boolean' || def instanceof Boolean) && def != null;
}

export default isBoolean;