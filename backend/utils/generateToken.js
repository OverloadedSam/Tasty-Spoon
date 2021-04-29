const jwt = require("jsonwebtoken");

exports.generateToken = (id, email, logNo) => {
    return jwt.sign(
        {
            userId: id,
            email,
            logNo,
        },
        process.env.SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );
};
