"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseJson = exports.parseDataArg = exports.parseHeaders = void 0;
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
exports.parseHeaders = parseHeaders;
const normalizeJsonLikeString = (raw) => {
    let normalized = raw.trim();
    // Quote unquoted keys
    normalized = normalized.replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');
    // Convert single quotes to double quotes
    normalized = normalized.replace(/'([^']*)'/g, '"$1"');
    // Quote unquoted string values
    normalized = normalized.replace(/:\s*([A-Za-z_][A-Za-z0-9_-]*)(?=\s*[},])/g, (_, value) => {
        if (["true", "false", "null"].includes(value)) {
            return `: ${value}`;
        }
        return `: "${value}"`;
    });
    return normalized;
};
const parseDataArg = (dataArgs) => {
    if (!dataArgs)
        return undefined;
    const raw = Array.isArray(dataArgs)
        ? dataArgs.join(" ")
        : dataArgs;
    const trimmed = raw.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
            return JSON.parse(trimmed);
        }
        catch {
            const fixed = trimmed
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'");
            try {
                return JSON.parse(fixed);
            }
            catch {
                try {
                    return JSON.parse(normalizeJsonLikeString(trimmed));
                }
                catch {
                    return raw;
                }
            }
        }
    }
    const obj = {};
    const tokens = raw.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (!tokens)
        return raw;
    for (let i = 0; i < tokens.length; i++) {
        const item = tokens[i];
        if (!item.includes("=") && !item.includes(":"))
            continue;
        const separator = item.includes("=") ? "=" : ":";
        const [key, ...rest] = item.split(separator);
        let value = rest.join(separator).trim();
        if (value === "" &&
            i + 1 < tokens.length) {
            value = tokens[++i];
        }
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        obj[key] = isNaN(Number(value))
            ? value
            : Number(value);
    }
    return obj;
};
exports.parseDataArg = parseDataArg;
const tryParseJson = (value) => {
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
};
exports.tryParseJson = tryParseJson;
