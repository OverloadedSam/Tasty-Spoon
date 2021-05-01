const { generateToken } = require("./generateToken");

const sendTokenToUser = (res, statusCode, user) => {
    const { _id, email, privileges } = user;
    const token = generateToken(_id, email, privileges);

    return res.status(statusCode).header("auth-user", token).json({
        success: true,
        message: "Logged in successfully!",
        userId: _id,
        userEmail: email,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        token,
    });
};

module.exports = sendTokenToUser;
