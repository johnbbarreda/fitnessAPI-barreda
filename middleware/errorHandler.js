class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicates whether this is an operational error or a programming error.
        
        Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging.
    }
}

const handleError = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Handle other errors (programming errors)
    console.error(err); // Log the error for debugging.

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
    });
};

module.exports = { AppError, handleError };
