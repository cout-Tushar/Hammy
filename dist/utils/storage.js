"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const dir = path_1.default.join(os_1.default.homedir(), ".apix");
const file = path_1.default.join(dir, "requests.json");
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir, { recursive: true });
}
if (!fs_1.default.existsSync(file)) {
    fs_1.default.writeFileSync(file, "[]", "utf-8");
}
const readData = () => {
    const data = fs_1.default.readFileSync(file, "utf-8");
    try {
        return JSON.parse(data);
    }
    catch {
        return [];
    }
};
exports.readData = readData;
const writeData = (data) => {
    fs_1.default.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
};
exports.writeData = writeData;
