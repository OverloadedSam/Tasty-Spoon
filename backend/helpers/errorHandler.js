const errorHandler = (error, req, res, next) => {
    console.log(
        "------------------------  Inside custom errorHandler  ------------------------"
    );

    // For the case of invalid token signature and expired tokens.
    if (error.name === "UnauthorizedError" && error.code === "invalid_token") {
        console.log(
            "***********************  Token validation error ocurred!  ***********************"
        );
        return res.status(401).json({
            success: false,
            message: "Invalid token! Please log in again",
            error: error.message,
        });
    }

    // For the case when token is not in the request header.
    if (
        error.name === "UnauthorizedError" &&
        error.code === "credentials_required"
    ) {
        return res
            .status(404)
            .json({
                success: false,
                message: "Authorization token was not found in the request",
                error: error.code,
            });
    }

    // For the case if user is not an admin ().
    if (error.name === "UnauthorizedError" && error.code === "revoked_token") {
        console.log(
            "***********************  Access denied! Not an Admin  ***********************"
        );
        return res.status(401).json({
            success: false,
            message:
                "This is a private route. You do not have the authority to visit this route",
            error: error.message,
        });
    }

    next(error);
};

module.exports = errorHandler;
