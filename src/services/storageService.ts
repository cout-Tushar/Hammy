import { readData, writeData } from "../utils/storage.js";
import type { ApiRequest } from "../types/request.ts";

export function getAllRequests(): ApiRequest[] {
    return readData();
}

export function getRequestById(id: number): ApiRequest | undefined {
    return readData().find((request) => request.id === id);
}

export function saveRequest(
    request: Omit<ApiRequest, "id">
): ApiRequest {

    const requests = readData();

    const newRequest: ApiRequest = {
        id: requests.length > 0
            ? Math.max(...requests.map(r => r.id)) + 1
            : 1,
        ...request
    };

    requests.push(newRequest);

    writeData(requests);

    return newRequest;
}

export function updateRequest(
    id: number,
    updates: Partial<Omit<ApiRequest, "id">>
): ApiRequest | null {

    const requests = readData();

    const index = requests.findIndex(
        request => request.id === id
    );

    if (index === -1) {
        return null;
    }

    requests[index] = {
        ...requests[index],
        ...updates
    };

    writeData(requests);

    return requests[index];
}

export function deleteRequest(id: number): boolean {

    const requests = readData();

    const filtered = requests.filter(
        request => request.id !== id
    );

    if (filtered.length === requests.length) {
        return false;
    }

    writeData(filtered);

    return true;
}