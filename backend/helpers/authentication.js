const expressJwt = require("express-jwt");

module.exports = function jwtAuth() {
    const api = process.env.API;

    const tokeConfig = {
        secret: process.env.SECRET,
        algorithms: ["HS256"],
        isRevoked: isRevokedCallback,
    };

    return expressJwt(tokeConfig).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/foodcategory(.*)/, methods: ["GET", "OPTIONS"] },
            {
                url: /\/api\/v1\/grocerycategory(.*)/,
                methods: ["GET", "OPTIONS"],
            },
            { url: `${api}/signin`, methods: ["POST"] },
            { url: `${api}/register`, methods: ["POST"] },
        ],
    });
};

function isRevokedCallback(req, payload, done) {
    if (payload.logNo <= 0) {
        console.log(
            "Access denied! You can not access this page because you don't have the authority."
        );
        console.log(payload);
        return done(null, true);
    }

    return done();
}
