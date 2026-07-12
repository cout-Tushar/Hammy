import type { HttpMethod } from "../types/request.js";

const METHODS: HttpMethod[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];

export function toHttpMethod(method: string): HttpMethod {
    const upper = method.toUpperCase();

    if (METHODS.includes(upper as HttpMethod)) {
        return upper as HttpMethod;
    }

    throw new Error(`Invalid HTTP method: ${method}`);
}