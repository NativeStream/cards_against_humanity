const jwt = require("jsonwebtoken");
const { server } = require("../config");
const apiResponse = require("../helpers/apiResponse");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return apiResponse.unauthorizedResponse(res, "no token provided");

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer")
    return apiResponse.unauthorizedResponse(res, "invalid token format");

  try {
    const user = jwt.verify(token, server.jwt_secret);
    req.user = user;
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return apiResponse.unauthorizedResponse(res, error.message);
  }

  next();
};
