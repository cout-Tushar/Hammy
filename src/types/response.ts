export interface ApiResponse {
    status: number;
    statusText: string;

    headers: Record<string, string>;

    data: unknown;

    time: number;      // milliseconds

    size: number;      // bytes

    url: string;

    method: string;
}