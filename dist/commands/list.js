"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const storage_js_1 = require("../utils/storage.js");
const listCommand = new commander_1.Command("list")
    .description("List all saved API request configurations")
    .action(() => {
    const data = (0, storage_js_1.readData)();
    if (data.length === 0) {
        console.log("No saved requests found.");
        return;
    }
    console.log("Saved API Requests:\n");
    data.forEach((request) => {
        console.log(`ID: ${request.id} | Method: ${request.method} | URL: ${request.url}`);
    });
});
exports.default = listCommand;
