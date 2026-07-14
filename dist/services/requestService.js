import axios from "axios";
export async function sendRequest(request) {
    const start = Date.now();
    const response = await axios({
        method: request.method.toLowerCase(),
        url: request.url,
        headers: request.headers,
        data: request.body
    });
    return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        url: request.url,
        method: request.method,
        time: Date.now() - start,
        size: JSON.stringify(response.data).length
    };
}
export function handleAxiosError(error) {
    if (axios.isAxiosError(error)) {
        console.error(`❌ ${error.response?.status} ${error.response?.statusText}`);
        console.error(JSON.stringify(error.response?.data, null, 2));
        process.exit(1);
    }
    if (error instanceof Error) {
        console.error(error.message);
    }
    process.exit(1);
}
