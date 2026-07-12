"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const aiService_js_1 = require("../services/aiService.js");
const requestService_js_1 = require("../services/requestService.js");
const storageService_js_1 = require("../services//storageService.js");
const generateCommand = new commander_1.Command("generate")
    .argument("<prompt>")
    .option("--save")
    .option("--run")
    .action(async (prompt, options) => {
    const request = await (0, aiService_js_1.generateRequest)(prompt);
    console.log(request);
    if (options.save) {
        (0, storageService_js_1.saveRequest)(request);
    }
    if (options.run) {
        const response = await (0, requestService_js_1.sendRequest)(request);
        console.log(response);
    }
});
exports.default = generateCommand;
