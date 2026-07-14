import fs from "fs";
import path from "path";
const FILE = path.join(process.cwd(), "collections.json");
function loadCollections() {
    if (!fs.existsSync(FILE)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}
function saveCollections(collections) {
    fs.writeFileSync(FILE, JSON.stringify(collections, null, 2));
}
export function createCollection(name) {
    const collections = loadCollections();
    const collection = {
        id: Date.now(),
        name,
        requests: []
    };
    collections.push(collection);
    saveCollections(collections);
    return collection;
}
export function listCollections() {
    return loadCollections();
}
export function addRequestToCollection(collectionId, requestId) {
    const collections = loadCollections();
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) {
        throw new Error("Collection not found");
    }
    if (collection.requests.includes(requestId)) {
        throw new Error("Request already exists in collection");
    }
    collection.requests.push(requestId);
    saveCollections(collections);
}
export function getCollection(id) {
    const collections = loadCollections();
    return collections.find(c => c.id === id);
}
