"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequest = buildRequest;
const storage_js_1 = require("../utils/storage.js");
const parser_js_1 = require("../utils/parser.js");
const url_js_1 = require("../utils/url.js");
function buildRequest(methodOrUrl, url, options = {}) {
    // Run saved request by ID
    if (!url && !(0, url_js_1.isUrl)(methodOrUrl)) {
        const savedRequests = (0, storage_js_1.readData)();
        const saved = savedRequests.find((request) => request.id === Number(methodOrUrl));
        if (!saved) {
            throw new Error(`Request ${methodOrUrl} not found.`);
        }
        return {
            method: saved.method,
            url: saved.url,
            headers: {
                ...saved.headers,
                ...(0, parser_js_1.parseHeaders)(options.header)
            },
            body: options.data
                ? (0, parser_js_1.parseDataArg)(options.data)
                : saved.body
        };
    }
    // Manual request
    return {
        method: (url ? methodOrUrl.toUpperCase() : "GET"),
        url: url ?? methodOrUrl,
        headers: (0, parser_js_1.parseHeaders)(options.header),
        body: (0, parser_js_1.parseDataArg)(options.data)
    };
}
