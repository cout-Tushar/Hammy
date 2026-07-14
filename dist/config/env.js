export const env = {
    GROQ_API_KEY: process.env.GROQ_API_KEY ?? "",
};
if (!env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing.");
}
