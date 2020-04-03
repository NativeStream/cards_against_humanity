const User = require("../models/User");
const apiResponse = require("../helpers/apiResponse");
const bcrytp = require("bcrypt");
const jwt = require("jsonwebtoken");
const { server } = require("../config");

const Auth = {
  async register(req, res) {
    let user = User(req.body);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000)
        return apiResponse.ErrorResponse(res, "email already taken");
      else {
        console.log(error);
        return apiResponse.ErrorResponse(res, "server error");
      }
    }

    return apiResponse.successResponse(res, "success");
  },
  async login(req, res) {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user || !(await bcrytp.compare(password, user.password)))
      return apiResponse.unauthorizedResponse(
        res,
        "email or password incorrect"
      );

    user = user.toObject();
    delete user.password;

    const jwtPayload = user;
    const jwtData = {
      expiresIn: server.jwt_timeout_duration
    };
    const jwtSecret = server.jwt_secret;
    user.token = jwt.sign(jwtPayload, jwtSecret, jwtData);

    return apiResponse.successResponseWithData(res, "success", { user });
  }
};

module.exports = Auth;
