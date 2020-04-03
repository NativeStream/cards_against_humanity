const socketio = require("socket.io");
const redis = require("socket.io-redis");
const config = require("../config");
const websocketAuthMiddleware = require("./middlewares/websocketAuthMiddleware");

module.exports = function(server) {
  io = socketio.listen(server);
  io.adapter(redis(config.redis));
  io.use(websocketAuthMiddleware);

  io.on("connection", function(socket) {
    // console.log("general:", socket.id);
  });

  room = io.of("/room");
  room.use(websocketAuthMiddleware);
  room.on("connection", function(socket) {
    const { user } = socket;

    socket.on("join", room_id => {
      socket.join(room_id);
      socket.emit("status", `joined room ${room_id}`);
    });

    socket.on("leave", room_id => {
      socket.leave(room_id);
      socket.emit("status", `leaved room ${room_id}`);
    });

    socket.on("chat_message", msg => {
      socket.broadcast.to(Object.keys(socket.rooms)[1]).emit("chat_message", {
        user,
        msg
      });
    });
  });

  // users = io.of("/users");
  // users.on("connection", function(socket) {
  //   socket.on;
  // });

  return io;
};
