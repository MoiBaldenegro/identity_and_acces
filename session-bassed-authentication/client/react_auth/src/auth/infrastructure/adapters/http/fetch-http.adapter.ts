// src/infrastructure/adapters/http/fetch-http.adapter.ts
import type { HttpClientPort } from "../../../domain/ports/http-client.port";

export function fetchHttpAdapter(): HttpClientPort {

  const request = async <T>(
    method: string,
    url: string,
    body?: any
  ): Promise<T> =>{
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',        // ← Muy importante para enviar y recibir cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  const post = async <T>(url: string, body: any): Promise<T> => {
    return request<T>('POST', url, body);
  };

  const get = async <T>(url: string): Promise<T> => {
    return request<T>('GET', url);
  };

  const del = async <T>(url: string): Promise<T> => {
    return request<T>('DELETE', url);
  }

  return { post, get, del };
}