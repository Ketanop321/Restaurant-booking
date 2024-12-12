// Define the ErrorHandler class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);  // Calls the parent class's constructor
        this.statusCode = statusCode;

        // Capture the stack trace to improve error logging
        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware to handle errors
export const errorMiddleware = (err, req, res, next) => {
    // Default to a generic internal server error message if none is provided
    const message = err.message || "Internal Server Error!";
    const statusCode = err.statusCode || 500;

    // Respond with the error details
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

// Export ErrorHandler as a named export
export { ErrorHandler };

// Export errorMiddleware as a default export
export default errorMiddleware;
