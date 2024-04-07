
function event(key, info) {
    if (!event[key]) {
        throw new Error(`Event ${key} not exists.`);
    }
    if (event[key].__info && JSON.stringify())
    event[key](info);
}

event.create = (name, func) => {
    event[name] = func;
};

export default event;
