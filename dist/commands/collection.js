import { Command } from "commander";
import { createCollection, listCollections, addRequestToCollection, getCollection } from "../services/collectionStore.js";
import { getRequestById } from "../services/storageService.js";
import { sendRequest } from "../services/requestService.js";
const collectionCommand = new Command("collection");
collectionCommand
    .description("Manage API collections");
// Create collection
collectionCommand
    .command("create <name>")
    .description("Create a new collection")
    .action((name) => {
    const collection = createCollection(name);
    console.log(`✅ Created collection: ${collection.name}`);
    console.log(`ID: ${collection.id}`);
});
// List collections
collectionCommand
    .command("list")
    .description("List all collections")
    .action(() => {
    const collections = listCollections();
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
        addRequestToCollection(Number(collectionId), Number(requestId));
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
    const collection = getCollection(Number(collectionId));
    if (!collection) {
        console.log(" Collection not found");
        return;
    }
    console.log(`\n Running collection: ${collection.name}\n`);
    let success = 0;
    let failed = 0;
    for (const requestId of collection.requests) {
        const request = getRequestById(requestId);
        if (!request) {
            console.log(`⚠ Request ${requestId} not found`);
            failed++;
            continue;
        }
        try {
            const start = Date.now();
            const response = await sendRequest(request);
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
export default collectionCommand;
