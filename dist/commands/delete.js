"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const storage_js_1 = require("../utils/storage.js");
const deleteCommand = new commander_1.Command("delete")
    .description("Delete a saved request")
    .argument("<id>", "ID of the request to delete")
    .action((id) => {
    const storedData = (0, storage_js_1.readData)();
    const requestExists = storedData.some((request) => request.id === Number(id));
    if (!requestExists) {
        console.error(`❌ Request with ID ${id} not found.`);
        return;
    }
    const updatedData = storedData.filter((request) => request.id !== Number(id));
    (0, storage_js_1.writeData)(updatedData);
    console.log(`✅ Request with ID ${id} deleted successfully.`);
});
exports.default = deleteCommand;
