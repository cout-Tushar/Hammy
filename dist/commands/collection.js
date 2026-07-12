"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const collectionStore_js_1 = require("../services/collectionStore.js");
const storageService_js_1 = require("../services/storageService.js");
const requestService_js_1 = require("../services/requestService.js");
const collectionCommand = new commander_1.Command("collection");
collectionCommand
    .description("Manage API collections");
// Create collection
collectionCommand
    .command("create <name>")
    .description("Create a new collection")
    .action((name) => {
    const collection = (0, collectionStore_js_1.createCollection)(name);
    console.log(`✅ Created collection: ${collection.name}`);
    console.log(`ID: ${collection.id}`);
});
// List collections
collectionCommand
    .command("list")
    .description("List all collections")
    .action(() => {
    const collections = (0, collectionStore_js_1.listCollections)();
    if (collections.length === 0) {
        console.log("No collections found");
        return;
    }
    collections.forEach((collection) => {
        console.log(`\n${collection.id} - ${collection.name}`);
        console.log(`Requests: ${collection.requests.length}`);
    });
});
// Add request to collection
collectionCommand
    .command("add <collectionId> <requestId>")
    .description("Add saved request to collection")
    .action((collectionId, requestId) => {
    try {
        (0, collectionStore_js_1.addRequestToCollection)(Number(collectionId), Number(requestId));
        console.log(" Request added to collection");
    }
    catch (error) {
        console.log(" Failed to add request");
    }
});
// Run collection
collectionCommand
    .command("run <collectionId>")
    .description("Run all requests in a collection")
    .action(async (collectionId) => {
    const collection = (0, collectionStore_js_1.getCollection)(Number(collectionId));
    if (!collection) {
        console.log(" Collection not found");
        return;
    }
    console.log(`\n Running collection: ${collection.name}\n`);
    let success = 0;
    let failed = 0;
    for (const requestId of collection.requests) {
        const request = (0, storageService_js_1.getRequestById)(requestId);
        if (!request) {
            console.log(`⚠ Request ${requestId} not found`);
            failed++;
            continue;
        }
        try {
            const start = Date.now();
            const response = await (0, requestService_js_1.sendRequest)(request);
            const time = Date.now() - start;
            console.log(` ${request.method} ${request.url} | ${response.status} | ${time}ms`);
            success++;
        }
        catch (error) {
            console.log(` ${request.method} ${request.url}`);
            failed++;
        }
    }
    console.log("\n----------------");
    console.log(`Completed: ${success + failed}`);
    console.log(` Success: ${success}`);
    console.log(` Failed: ${failed}`);
});
exports.default = collectionCommand;
