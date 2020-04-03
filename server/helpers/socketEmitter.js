const config = require("../config");
const io = require("socket.io-emitter")(config.redis);

module.exports.socketEmit = ({
  data = {},
  room = "",
  namespace = "",
  event = "message"
}) => {
  io.of(namespace)
    .to(room)
    .emit(event, data);
};
