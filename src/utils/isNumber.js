function isNumber(def) {
    return (typeof def === 'number' || def instanceof Number) && def != null;
}

export default isNumber;