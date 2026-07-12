"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = createCollection;
exports.listCollections = listCollections;
exports.addRequestToCollection = addRequestToCollection;
exports.getCollection = getCollection;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE = path_1.default.join(process.cwd(), "collections.json");
function loadCollections() {
    if (!fs_1.default.existsSync(FILE)) {
        return [];
    }
    return JSON.parse(fs_1.default.readFileSync(FILE, "utf-8"));
}
function saveCollections(collections) {
    fs_1.default.writeFileSync(FILE, JSON.stringify(collections, null, 2));
}
function createCollection(name) {
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
function listCollections() {
    return loadCollections();
}
function addRequestToCollection(collectionId, requestId) {
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
function getCollection(id) {
    const collections = loadCollections();
    return collections.find(c => c.id === id);
}
