"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = sendRequest;
exports.handleAxiosError = handleAxiosError;
const axios_1 = __importDefault(require("axios"));
async function sendRequest(request) {
    const start = Date.now();
    const response = await (0, axios_1.default)({
        method: request.method.toLowerCase(),
        url: request.url,
        headers: request.headers,
        data: request.body
    });
    return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        url: request.url,
        method: request.method,
        time: Date.now() - start,
        size: JSON.stringify(response.data).length
    };
}
function handleAxiosError(error) {
    if (axios_1.default.isAxiosError(error)) {
        console.error(`❌ ${error.response?.status} ${error.response?.statusText}`);
        console.error(JSON.stringify(error.response?.data, null, 2));
        process.exit(1);
    }
    if (error instanceof Error) {
        console.error(error.message);
    }
    process.exit(1);
}
