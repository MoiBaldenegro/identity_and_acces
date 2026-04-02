// Tipos de la API
export interface ApiResponse<T> {
  data: T;
  error?: string;
}