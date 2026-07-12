"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUrl = exports.isUrl = void 0;
const isUrl = (value) => {
    try {
        new URL(value);
        return true;
    }
    catch {
        return false;
    }
};
exports.isUrl = isUrl;
const normalizeUrl = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }
    if (url.startsWith("//")) {
        return `https:${url}`;
    }
    // Relative API path
    if (url.startsWith("/")) {
        return `http://localhost${url}`;
    }
    if (url.includes(".") ||
        url.startsWith("localhost") ||
        /^\d+\.\d+\.\d+\.\d+/.test(url)) {
        return `http://${url}`;
    }
    return url;
};
exports.normalizeUrl = normalizeUrl;
