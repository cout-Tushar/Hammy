"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const storage_js_1 = require("../utils/storage.js");
const htttps_js_1 = require("../utils/htttps.js");
const parseHeaders = (headerArgs) => {
    const headers = {};
    if (!headerArgs)
        return headers;
    headerArgs.forEach((header) => {
        const [key, ...valueParts] = header.split(":");
        const value = valueParts.join(":").trim();
        if (key) {
            headers[key.trim()] = value;
        }
    });
    return headers;
};
const parseDataArg = (dataArgs) => {
    if (!dataArgs)
        return undefined;
    const raw = Array.isArray(dataArgs) ? dataArgs.join(" ") : dataArgs;
    const trimmed = raw.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
            return JSON.parse(trimmed);
        }
        catch {
            return raw;
        }
    }
    const obj = {};
    const tokens = raw.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (!tokens)
        return raw;
    for (let i = 0; i < tokens.length; i++) {
        const item = tokens[i];
        if (!item.includes("="))
            continue;
        const [key, ...rest] = item.split("=");
        let value = rest.join("=").trim();
        if (value === "" && i + 1 < tokens.length && !tokens[i + 1].includes("=")) {
            value = tokens[++i];
        }
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        const trimmedKey = key.trim();
        obj[trimmedKey] =
            value === ""
                ? ""
                : isNaN(Number(value))
                    ? value
                    : Number(value);
    }
    return obj;
};
const saveCommand = new commander_1.Command('save')
    .description("Save API request configuration for future use")
    .argument('<method>')
    .argument('<url>')
    .option('-H, --header <header...>', 'Add custom header, e.g. -H "Content-Type: application/json"')
    .option('-d, --data <data...>', 'Add request body (JSON or key=value pairs)')
    .action((method, url, options) => {
    const data = (0, storage_js_1.readData)();
    const parsedHeader = parseHeaders(options.header);
    const parsedBody = parseDataArg(options.data);
    const newRequest = {
        id: data.length + 1,
        method: (0, htttps_js_1.toHttpMethod)(method),
        url,
        headers: parsedHeader,
        body: parsedBody,
    };
    data.push(newRequest);
    (0, storage_js_1.writeData)(data);
    console.log(`Saved request: ${newRequest.method} ${url} with id ${newRequest.id}`);
});
exports.default = saveCommand;
