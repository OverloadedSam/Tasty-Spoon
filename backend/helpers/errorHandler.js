const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose error for duplicate field value.
    if (err.code === 11000) {
        const message = `Duplicate value for a field entered. Field: "${Object.keys(
            err.keyValue
        )}", Value: "${err.keyValue[Object.keys(err.keyPattern)]}"`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose error for validation of data.
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    // Mongoose error for failed to cast invalid ObjectIds.
    if (err.name === "CastError") {
        const message = `${error.message}. ${err.reason}`;
        error = new ErrorResponse(message, 400);
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        status: error.statusCode || 500,
        message:
            error.message ||
            "Unable to process your request! Internal server error!",
    });
};

module.exports = errorHandler;
