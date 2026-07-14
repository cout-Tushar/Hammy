import { readData } from "../utils/storage.js";
import { parseHeaders, parseDataArg } from "../utils/parser.js";
import { isUrl } from "../utils/url.js";
export function buildRequest(methodOrUrl, url, options = {}) {
    // Run saved request by ID
    if (!url && !isUrl(methodOrUrl)) {
        const savedRequests = readData();
        const saved = savedRequests.find((request) => request.id === Number(methodOrUrl));
        if (!saved) {
            throw new Error(`Request ${methodOrUrl} not found.`);
        }
        return {
            method: saved.method,
            url: saved.url,
            headers: {
                ...saved.headers,
                ...parseHeaders(options.header)
            },
            body: options.data
                ? parseDataArg(options.data)
                : saved.body
        };
    }
    // Manual request
    return {
        method: (url ? methodOrUrl.toUpperCase() : "GET"),
        url: url ?? methodOrUrl,
        headers: parseHeaders(options.header),
        body: parseDataArg(options.data)
    };
}
