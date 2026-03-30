// src/application/dtos/shared/api-response.dto.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}