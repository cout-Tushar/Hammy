"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const requestBuilder_js_1 = require("../services/requestBuilder.js");
const requestService_js_1 = require("../services/requestService.js");
const aiService_js_1 = require("../services/aiService.js");
const url_js_1 = require("../utils/url.js");
const reviewCommand = new commander_1.Command("review")
    .description("Review an API using AI")
    .argument("[methodOrUrl]")
    .argument("[url]")
    .option("-H, --header <header...>")
    .option("-d, --data <data...>")
    .action(async (methodOrUrl, url, options) => {
    if (!methodOrUrl) {
        console.error("Usage: hammy review [method] <url>");
        return;
    }
    try {
        const request = (0, requestBuilder_js_1.buildRequest)(methodOrUrl, url, options);
        request.url = (0, url_js_1.normalizeUrl)(request.url);
        const response = await (0, requestService_js_1.sendRequest)(request);
        console.log(" Reviewing API...\n");
        const review = await (0, aiService_js_1.reviewApi)(request, response);
        console.log(review);
    }
    catch (error) {
        (0, requestService_js_1.handleAxiosError)(error);
    }
});
exports.default = reviewCommand;
