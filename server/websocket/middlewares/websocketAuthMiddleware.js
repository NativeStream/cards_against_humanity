const jwt = require("jsonwebtoken");
const { server } = require("../../config");
const User = require("../../models/User");

module.exports = async function(socket, next) {
  const { authorization } = socket.handshake.query;

  if (!authorization) return next(new Error("no token provided"));

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") return next(new Error("bad token"));

  try {
    const { _id } = jwt.verify(token, server.jwt_secret);

    let user = await User.findById(_id);
    user.updateSocket(socket.id);

    user = user.toObject();
    delete user.password;

    socket.user = user;
  } catch (error) {
    return next(new Error(error.message));
  }

  next();
};
