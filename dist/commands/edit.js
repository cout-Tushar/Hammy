"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const storage_js_1 = require("../utils/storage.js");
const parser_js_1 = require("../utils/parser.js");
const editCommand = new commander_1.Command("edit")
    .description("Edit a saved request")
    .argument("<id>", "ID of the request to edit")
    .option("-m, --method <method>", "HTTP method")
    .option("-u, --url <url>", "API endpoint URL")
    .option("-H, --header <header...>", 'Add custom header, e.g. -H "Content-Type: application/json"')
    .option("-d, --data <data...>", "Add request body (JSON or key=value pairs)")
    .action((id, options) => {
    const data = (0, storage_js_1.readData)();
    const index = data.findIndex((request) => request.id === Number(id));
    if (index === -1) {
        console.error(`❌ Request with ID ${id} not found.`);
        return;
    }
    const request = data[index];
    if (options.method) {
        request.method = options.method.toUpperCase();
    }
    if (options.url) {
        request.url = options.url;
    }
    if (options.header) {
        request.headers = (0, parser_js_1.parseHeaders)(options.header);
    }
    if (options.data) {
        const parsedData = (0, parser_js_1.parseDataArg)(options.data);
        request.body =
            typeof parsedData === "string"
                ? tryParseJson(parsedData)
                : parsedData;
    }
    data[index] = request;
    (0, storage_js_1.writeData)(data);
    console.log(`✅ Request with ID ${id} updated successfully.`);
});
exports.default = editCommand;
function tryParseJson(value) {
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
}
