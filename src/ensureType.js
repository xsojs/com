import { isArray, isObject, ensureObject } from "@xso/utils";
import Component from "./Component";
import jsonDefinition from "./jsonDefinition";

function ensureSameKind(any, com) {
    if (isArray(any)) {
        for (const obj of any) {
            ensureObject('ensureSameKind of an invalid object.', obj);
            if (!Component.isSameKind(obj, com)) {
                throw new Error(`Only ${com.function().name} type is accepted! This component is invalid: ${jsonDefinition(obj)}`);
            }
        }
    } else if (isObject(any)) {
        return Component.isSameKind(any, com);
    } else {
        throw new Error('Invalid kind.');
    }
}

export default ensureSameKind;
