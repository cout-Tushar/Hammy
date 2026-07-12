import axios from "axios";

import type { GeneratedRequest } from "../types/ai.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

async function askAI(prompt: string): Promise<string> {
   

    const apiKey =process.env.GROQ_API_KEY
    

    if (!apiKey) {
        console.log(apiKey)
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
You MUST return ONLY valid JSON.

User Request:
"${prompt}"

Return ONLY this format:

{
    "method":"GET",
    "url":"https://jsonplaceholder.typicode.com/posts",
    "headers":{
        "Content-Type":"application/json"
    },
    "body":{}
}
`;

    const result = await askAI(aiPrompt);

    const cleaned = cleanJson(result);

    return JSON.parse(cleaned) as GeneratedRequest;
}

export async function reviewApi(
    request: object,
    response: object
): Promise<string> {

    const prompt = `
You are an experienced Backend Engineer.

Review this API.

Request:

${JSON.stringify(request, null, 2)}

Response:

${JSON.stringify(response, null, 2)}

Give:

1. Security Issues
2. REST Best Practices
3. Performance Improvements
4. Documentation Suggestions
`;

    return askAI(prompt);
}

export async function explainResponse(
    response: object
): Promise<string> {

    const prompt = `
Explain this API response.

${JSON.stringify(response, null, 2)}

Explain it in simple language.
`;

    return askAI(prompt);
}

export async function generateDocumentation(
    request: object,
    response: object
): Promise<string> {

    const prompt = `
Generate professional API documentation.

Request

${JSON.stringify(request, null, 2)}

Response

${JSON.stringify(response, null, 2)}

Include:

Endpoint

Method

Headers

Example Request

Example Response

Possible Errors
`;

    return askAI(prompt);
}

export async function securityAudit(
    request: object,
    response: object
): Promise<string> {

    const prompt = `
You are an API Security Expert.

Analyze this API.

Request

${JSON.stringify(request, null, 2)}

Response

${JSON.stringify(response, null, 2)}

Check for

Authentication

Authorization

Sensitive Data Exposure

Security Headers

Rate Limiting

Injection Risks

Return a report under 100 words emphasize on criticality.
`;

    return askAI(prompt);
}

export async function explainApi(
    request: object,
    response: object
): Promise<string> {

    const prompt = `
You are an experienced Backend Engineer.

Explain this API in simple terms for a developer.
Keep it under 100 words

Request:

${JSON.stringify(request, null, 2)}

Response:

${JSON.stringify(response, null, 2)}

Explain:

1. What this API does
2. HTTP method purpose
3. Endpoint meaning
4. Required headers
5. Request body explanation
6. Response structure explanation
7. Possible use cases
8. Potential improvements

Keep the explanation beginner friendly.

Keep it under 100 words
`;

    return askAI(prompt);
}