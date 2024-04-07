function ensureArray(info, def) {
    if (typeof def !== 'object' || def == null || !Array.isArray(def)) {
        throw new Error(`${info} is ${typeof def} and not a valid array.`);
    }
}

export default ensureArray;