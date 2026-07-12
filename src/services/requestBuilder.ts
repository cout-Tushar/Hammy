import { readData } from "../utils/storage.js";
import { parseHeaders, parseDataArg } from "../utils/parser.js";
import { isUrl } from "../utils/url.js";

import type { ApiRequest, NewApiRequest } from "../types/request.js";
import type { HttpMethod } from "../types/request.js";

export interface BuildRequestOptions {
    header?: string[];
    data?: string[];
}

export function buildRequest(
    methodOrUrl: string,
    url?: string,
    options: BuildRequestOptions = {}
): NewApiRequest {

    // Run saved request by ID
    if (!url && !isUrl(methodOrUrl)) {

        const savedRequests = readData();

        const saved = savedRequests.find(
            (request: ApiRequest) => request.id === Number(methodOrUrl)
        );

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
        method: (url ? methodOrUrl.toUpperCase() : "GET") as HttpMethod,
        url: url ?? methodOrUrl,
        headers: parseHeaders(options.header),
        body: parseDataArg(options.data)
    };
}

