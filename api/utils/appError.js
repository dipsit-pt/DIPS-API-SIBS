export class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Add details , for eg error details when needed it
    if (details) {
      this.details = details;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
