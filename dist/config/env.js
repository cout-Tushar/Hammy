"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    GROQ_API_KEY: process.env.GROQ_API_KEY ?? "",
};
if (!exports.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing.");
}
