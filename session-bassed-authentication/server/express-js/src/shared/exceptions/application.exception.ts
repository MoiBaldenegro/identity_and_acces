// src/shared/exceptions/application.exception.ts
export class ApplicationException extends Error {
  constructor(
    message: string,
    public readonly code: string = 'INTERNAL_ERROR',
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'ApplicationException';
  }
}