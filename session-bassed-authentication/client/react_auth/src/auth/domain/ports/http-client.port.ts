// src/domain/ports/http-client.port.ts
export interface HttpClientPort {
  post<T>(url: string, body: any): Promise<T>;
  get<T>(url: string): Promise<T>;
  del<T>(url: string): Promise<T>;
}