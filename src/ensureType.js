import { isArray, isObject, ensureObject } from "@xso/utils";
import Component from "./Component";
import jsonDefinition from "./jsonDefinition";

function ensureType(any, com) {
    const invalidError = (obj) => new Error(`Only ${com.function().name} type is accepted! This component is invalid: ${jsonDefinition(obj)}`);
    if (isArray(any)) {
        for (const obj of any) {
            ensureObject('ensureSameKind of an invalid object.', obj);
            if (!Component.isSameType(obj, com)) {
                throw invalidError(obj);
            }
        }
    } else if (isObject(any)) {
        if (!Component.isSameType(any, com)) {
            throw invalidError(any);
        }
    } else {
        throw new Error('Invalid kind.');
    }
}

ensureType.required = (any, com)=> {
    if (any) {
        return ensureType(any, com);
    }
    throw new Error(`${com.name()} is required.`);
}

ensureType.optional = (any, com)=> {
    if (any) {
        ensureType(any, com);
    }
}

export default ensureType;
