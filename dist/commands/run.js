"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const requestBuilder_js_1 = require("../services/requestBuilder.js");
const requestService_js_1 = require("../services/requestService.js");
const url_js_1 = require("../utils/url.js");
const runCommand = new commander_1.Command("run")
    .description("Run an API request")
    .argument("[methodOrUrl]", "HTTP Method or Saved Request ID")
    .argument("[url]", "API URL")
    .usage("[method] <url> [options]")
    .option("-H, --header <header...>", "Add custom headers")
    .option("-d, --data <data...>", "Request body")
    .action(async (methodOrUrl, url, options) => {
    if (!methodOrUrl) {
        console.error("Usage: hammy run [method] <url> [options]");
        return;
    }
    try {
        const request = (0, requestBuilder_js_1.buildRequest)(methodOrUrl, url, options);
        request.url = (0, url_js_1.normalizeUrl)(request.url);
        const response = await (0, requestService_js_1.sendRequest)(request);
        console.log("\n✔ Request Successful");
        console.log(`Status : ${response.status}`);
        console.log(`Time   : ${response.time} ms`);
        console.log(`Size   : ${response.size} bytes\n`);
        console.log(JSON.stringify(response.data, null, 2));
    }
    catch (error) {
        (0, requestService_js_1.handleAxiosError)(error);
    }
});
exports.default = runCommand;
