"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const requestBuilder_js_1 = require("../services/requestBuilder.js");
const requestService_js_1 = require("../services/requestService.js");
const aiService_js_1 = require("../services/aiService.js");
const url_js_1 = require("../utils/url.js");
const explainCommand = new commander_1.Command("explain")
    .description("Explain an API using AI")
    .argument("<methodOrUrl>")
    .argument("[url]")
    .option("-H, --header <header...>")
    .option("-d, --data <data...>")
    .action(async (methodOrUrl, url, options) => {
    try {
        const request = (0, requestBuilder_js_1.buildRequest)(methodOrUrl, url, options);
        request.url = (0, url_js_1.normalizeUrl)(request.url);
        const response = await (0, requestService_js_1.sendRequest)(request);
        console.log(" Explaining API...\n");
        const explanation = await (0, aiService_js_1.explainApi)(request, response);
        console.log(explanation);
    }
    catch (error) {
        (0, requestService_js_1.handleAxiosError)(error);
    }
});
exports.default = explainCommand;
