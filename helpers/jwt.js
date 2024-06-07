const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const db = require("../schema/db");
const users = db.users;
const common = require('../controller/common')

/**
 * VERIFY USER AUTHENTICATION TOKEN FUNCTION
 */
const verifyTokenUser = async (req, res, next) => {
    const bearerToken =
        req.body.bearerToken || req.query.bearerToken || req.headers["authorization"];
    if (!bearerToken) {
        return res.status(401).send("Unauthorized");
    }
    try {
        if (bearerToken.startsWith("Bearer")) {
            var token = bearerToken.replace(/Bearer /g, '');
            await jwt.verify(token, process.env.secretKey, async function (err, decoded) {
                if (err) {
                    return res.status(401).send("Unauthorized");
                } else {
                    var decoded = jwtDecode(token);
                    var userExist = await users.findOne({
                        where:
                        {
                            id: decoded.userId
                        }
                    });
                    if (userExist == null) {
                        return res.status(401).send("Unauthorized");
                    } else {
                        return next();
                    }
                }
            });
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send("Unauthorized");
    }
};

async function getJWTToken() {
    try {
        return new Promise(resolve => {
            const API_KEY = process.env.callApiKey;
            const SECRET_KEY = process.env.callSecretKey;

            const options = { expiresIn: "24h", algorithm: "HS256" };

            const payload = {
                apikey: API_KEY,
                permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
            };

            const token = jwt.sign(payload, SECRET_KEY, options, async function (err, token) {
                if (token) {
                    return resolve(token);
                }
                if (err) {
                    return resolve(false);
                }
            });
        });
    } catch (err) {
        return false
    }
};


module.exports = {
    verifyTokenUser,
    getJWTToken,
};