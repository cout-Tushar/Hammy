const METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
export function toHttpMethod(method) {
    const upper = method.toUpperCase();
    if (METHODS.includes(upper)) {
        return upper;
    }
    throw new Error(`Invalid HTTP method: ${method}`);
}
