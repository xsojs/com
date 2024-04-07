function ensureFunction(info, def) {
    if (typeof def !== 'function' || def == null) {
        throw new Error(`${info} is ${typeof def} and not a valid function.`);
    }
}

export default ensureFunction;