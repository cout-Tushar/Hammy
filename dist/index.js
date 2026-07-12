#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const commander_1 = require("commander");
const explain_js_1 = __importDefault(require("./commands/explain.js"));
const run_js_1 = __importDefault(require("./commands/run.js"));
const help_js_1 = __importDefault(require("./commands/help.js"));
const save_js_1 = __importDefault(require("./commands/save.js"));
const delete_js_1 = __importDefault(require("./commands/delete.js"));
const edit_js_1 = __importDefault(require("./commands/edit.js"));
const generate_js_1 = __importDefault(require("./commands/generate.js"));
const list_js_1 = __importDefault(require("./commands/list.js"));
const review_js_1 = __importDefault(require("./commands/review.js"));
const collection_js_1 = __importDefault(require("./commands/collection.js"));
const program = new commander_1.Command();
program
    .name("hammy")
    .description("AI-powered API testing tool")
    .version("1.0.1");
program.addCommand(help_js_1.default);
program.addCommand(run_js_1.default);
program.addCommand(save_js_1.default);
program.addCommand(delete_js_1.default);
program.addCommand(edit_js_1.default);
program.addCommand(generate_js_1.default);
program.addCommand(list_js_1.default);
program.addCommand(review_js_1.default);
program.addCommand(explain_js_1.default);
program.addCommand(collection_js_1.default);
program.parse();
