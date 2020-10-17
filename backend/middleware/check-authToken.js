const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

const checkAuthorization = (req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("OK OPTIONS");
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("None token splir");
      throw new Error("Authorizaion failed!");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_SIGN);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    console.log("DECODE: ", req.userData);
    next();
  } catch (error) {
    console.log("Hiaz error: ", error);
    const err = new HttpError("Authorization failed!");
    return next(err);
  }
};

module.exports = checkAuthorization;
