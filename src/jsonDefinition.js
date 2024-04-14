import { ensureObject } from "@xso/utils";
import store from "./store";

function jsonDefinition(obj) {
    ensureObject('jsonDefinition of an invalid object.', obj);
    let foundKey = null;
    for (const key of Object.keys(obj)) {
        foundKey = key;
    }
    let finalKey = foundKey;
    if (foundKey.indexOf(store.COMPONENTS_PREFIX) == 0) {
        finalKey = foundKey.substring(foundKey.indexOf('[') + 1, foundKey.lastIndexOf(']'));
    }
    return JSON.stringify({
        [finalKey]: obj[foundKey]
    });
}

export default jsonDefinition;
