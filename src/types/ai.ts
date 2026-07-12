import type { HttpMethod } from "./request.js";

export interface GeneratedRequest {
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: unknown;
}

export interface GroqResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}