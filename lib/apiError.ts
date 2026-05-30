class ApiError extends Error {
  public statusCode: number;
  public error?: unknown;

  constructor(statusCode: number, message: string, error?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }

  static BAD_REQUEST(message = "Bad Request", error?: unknown) {
    return new ApiError(400, message, error);
  }

  static NOT_FOUND(message = "Not Found") {
    return new ApiError(404, message);
  }

  static INTERNAL(message = "Internal Server Error", error?: unknown) {
    return new ApiError(500, message, error);
  }

  static FORBIDDEN(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static UNAUTHORIZED(message = "Unauthorized") {
    return new ApiError(401, message);
  }
}

export default ApiError;
