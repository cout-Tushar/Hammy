"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHttpMethod = toHttpMethod;
const METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
function toHttpMethod(method) {
    const upper = method.toUpperCase();
    if (METHODS.includes(upper)) {
        return upper;
    }
    throw new Error(`Invalid HTTP method: ${method}`);
}
