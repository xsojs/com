function ensureString(info, def) {
    if ((typeof def !== 'string' && !(def instanceof String)) || def == null) {
        throw new Error(`${info} is ${typeof def} and not a valid string.`);
    }
}

export default ensureString;