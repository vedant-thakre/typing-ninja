
export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(error.status || 500).json({ 
            success: false,
            message: error.message || 'Internal Server Error',
         });
    }
}

export class ErrorHandler extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.status = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class Response {
  constructor(statusCode, data, message = "Success") {
    this.success = statusCode < 400;
    this.status = statusCode;
    this.message = message;
    this.data = data;
  }
}