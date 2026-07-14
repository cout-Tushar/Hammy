import axios from "axios";

import type { GeneratedRequest } from "../types/ai.js";
import type { NewApiRequest } from "../types/request.js";
import type { ApiResponse } from "../types/response.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

async function askAI(prompt: string): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new Error("Missing GROQ_API_KEY");
    }

    const response = await axios.post(
        GROQ_URL,
        {
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data.choices[0].message.content as string;
}

function cleanJson(text: string): string {
    return text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .replace(/^Here is.*?:\s*/i, "")
        .replace(/^Here's.*?:\s*/i, "")
        .trim();
}

export async function generateRequest(
    prompt: string
): Promise<GeneratedRequest> {

    const aiPrompt = `
You are a senior backend engineer generating a REST API request.

User Request:
"${prompt}"

Rules:
- Output ONLY valid JSON. No Markdown, no code fences, no explanations, no extra text before or after.
- Choose the HTTP method that best matches the user's intent (GET, POST, PUT, PATCH, DELETE).
- Include realistic, production-quality headers (e.g. "Content-Type", "Accept", "Authorization" when relevant).
- Include a request body only when the method requires one; use realistic, well-typed sample values.
- Use a real, plausible endpoint URL following REST conventions (resource-based paths, correct pluralization, path/query params where appropriate).

Return ONLY this exact JSON shape (values filled in, no comments):

{
    "method": "GET",
    "url": "https://jsonplaceholder.typicode.com/posts",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {}
}
`;

    const result = await askAI(aiPrompt);

    return JSON.parse(cleanJson(result)) as GeneratedRequest;
}

export async function reviewApi(
    request: NewApiRequest,
    response: ApiResponse
): Promise<string> {

    const prompt = `
You are a Senior Backend Engineer reviewing an API call for another developer reading this in a terminal.

Request:
${JSON.stringify(request, null, 2)}

Response:
${JSON.stringify(response.data, null, 2)}

Return Markdown in EXACTLY this structure:

# API Review

## Overall Score
Give a single score out of 10 with a one-line justification.

## Strengths
- Bullet points only, most important first.

## Issues
- Bullet points only, most important first. Skip trivial nitpicks.

## Recommendations
- Bullet points only. Each one must be a concrete, actionable fix.

Rules:
- Maximum 150 words total.
- No long paragraphs, no filler, no repetition.
- Be direct and specific, not generic.
`;

    return askAI(prompt);
}

export async function explainResponse(
    response: ApiResponse
): Promise<string> {

    const prompt = `
Explain this API response for a developer, in plain language.

Response:

${JSON.stringify(response.data, null, 2)}

Return Markdown in EXACTLY this structure:

# Response Explanation

## What happened
One or two short lines on the outcome (success/failure, status meaning).

## Important fields
- Bullet the key fields and what each one means.

## What the response means
A short, plain-language takeaway.

## Common use cases
- Bullet 1-3 realistic ways a developer would use this data.

Rules:
- Under 120 words total.
- Simple language, minimal jargon.
- No walls of text, no repetition.
`;

    return askAI(prompt);
}

export async function generateDocumentation(
    request: NewApiRequest,
    response: ApiResponse
): Promise<string> {

    const example = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

    const prompt = `
You are a Senior Backend Engineer writing professional API documentation for other developers.

Request:
${JSON.stringify(request, null, 2)}

Example Response:
${JSON.stringify(example, null, 2)}

Return ONLY Markdown in EXACTLY this structure:

# API Documentation

## Endpoint

## Method

## Description
Infer the purpose of this endpoint from the request and response; keep it to 1-2 sentences.

## Headers
- List relevant headers and their purpose.

## Request Body
- Describe expected fields, or state "None" if not applicable.

## Response Schema
Infer the schema and represent it like this (do NOT dump the full JSON):

ResourceName
- field: type
- field: type

Then show exactly ONE example object built from the inferred schema, explain the important fields briefly, list common status codes, and add short developer notes.

Rules:
- Do NOT dump the entire raw response.
- Keep the whole document under 500 words.
- No repetition, no generic filler, terminal-friendly formatting.
`;

    return askAI(prompt);
}

export async function securityAudit(
    request: NewApiRequest,
    response: ApiResponse
): Promise<string> {

    const prompt = `
You are an API Security Expert performing a security audit for a developer.

Request:
${JSON.stringify(request, null, 2)}

Response:
${JSON.stringify(response.data, null, 2)}

Return Markdown in EXACTLY this structure:

# Security Audit

## Overall Risk
State Low, Medium, or High with a one-line reason.

## Findings
Use these markers for each finding:
- ✅ Good
- ⚠ Warning
- ❌ Critical

Cover, only where actually observable from the request/response above:
- HTTPS usage
- Authentication
- Authorization
- Sensitive data exposure
- Security headers
- Rate limiting
- Input validation
- Injection risks

Never invent a vulnerability that isn't supported by the data. If something cannot be verified from the available information, state exactly: "Cannot be determined from the available information."

## Recommendations
- List the top improvements in priority order, most critical first.

Rules:
- Maximum 180 words total.
- No filler, no repeated points, terminal-friendly formatting.
`;

    return askAI(prompt);
}

export async function explainApi(
    request: NewApiRequest,
    response: ApiResponse
): Promise<string> {

    const prompt = `
You are an experienced Backend Engineer explaining this API to a beginner developer.

Request:
${JSON.stringify(request, null, 2)}

Response:
${JSON.stringify(response.data, null, 2)}

Return Markdown in EXACTLY this structure:

# API Explanation

## Purpose
One short line on what this API does.

## HTTP Method
Explain the method used and why it fits this action.

## Endpoint
Explain what the endpoint path represents.

## Headers
Explain the key headers in plain terms.

## Request Body
Explain what's being sent, or state "None" if not applicable.

## Response
Explain what the response represents (concept, not a re-print of the JSON).

## Typical Use Cases
- Bullet 1-3 realistic scenarios.

## Tips
- Bullet 1-2 short, practical tips or possible improvements.

Rules:
- Under 150 words total.
- Beginner-friendly language, no unnecessary jargon.
- Explain concepts; do not just echo the JSON back.
`;

    return askAI(prompt);
}