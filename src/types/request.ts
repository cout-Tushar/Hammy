
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface ApiRequest {
    id: number;
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: unknown;
}
export interface ApiRequest {
    id: number;
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: unknown;
}

export type NewApiRequest = Omit<ApiRequest, "id">;
