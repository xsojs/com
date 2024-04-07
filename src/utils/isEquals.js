import isArray from "./isArray";
import isFunction from "./isFunction";
import isObject from "./isObject";
import isString from "./isString";
import isNumber from "./isNumber";
import isBoolean from "./isBoolean";

function isEquals(o1, o2) {
    if ((o1 == null && o2 == null)
        || (o1 == undefined && o2 == undefined)
        || (isBoolean(o1) && isBoolean(o2))
        || (isNumber(o1) && isNumber(o2))
        || (isString(o1) && isString(o2))) {
        return o1 == o2;
    }
    if (isObject(o1) && isObject(o2)) {
        const o1Keys = Object.keys(o1);
        const o2Keys = Object.keys(o2);
        if (o1Keys.length != o2Keys.length) {
            return false;
        }
        for (let i = 0; i < o1Keys.length; i++) {
            if (o1Keys[i] != o2Keys[i]
                || !isEquals(o1[o1Keys[i]], o2[o2Keys[i]])) {
                return false;
            }
        }
        return true;
    } else if (isArray(o1) && isArray(o2)) {
        if (o1.length != o2.length) {
            return false;
        }
        for (let i = 0; i < o1.length; i++) {
            if (!isEquals(o1[i], o2[i])) {
                return false;
            }
        }
        return true;
    } else if (isFunction(o1) && isFunction(o2)) {
        return o1.toString() === o2.toString();
    }
    return false;
}

export default isEquals;