"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequests = getAllRequests;
exports.getRequestById = getRequestById;
exports.saveRequest = saveRequest;
exports.updateRequest = updateRequest;
exports.deleteRequest = deleteRequest;
const storage_js_1 = require("../utils/storage.js");
function getAllRequests() {
    return (0, storage_js_1.readData)();
}
function getRequestById(id) {
    return (0, storage_js_1.readData)().find((request) => request.id === id);
}
function saveRequest(request) {
    const requests = (0, storage_js_1.readData)();
    const newRequest = {
        id: requests.length > 0
            ? Math.max(...requests.map(r => r.id)) + 1
            : 1,
        ...request
    };
    requests.push(newRequest);
    (0, storage_js_1.writeData)(requests);
    return newRequest;
}
function updateRequest(id, updates) {
    const requests = (0, storage_js_1.readData)();
    const index = requests.findIndex(request => request.id === id);
    if (index === -1) {
        return null;
    }
    requests[index] = {
        ...requests[index],
        ...updates
    };
    (0, storage_js_1.writeData)(requests);
    return requests[index];
}
function deleteRequest(id) {
    const requests = (0, storage_js_1.readData)();
    const filtered = requests.filter(request => request.id !== id);
    if (filtered.length === requests.length) {
        return false;
    }
    (0, storage_js_1.writeData)(filtered);
    return true;
}
