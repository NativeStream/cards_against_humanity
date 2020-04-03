const apiResponse = require("../helpers/apiResponse");
const { socketEmit } = require("../helpers/socketEmitter");
const Room = require("../models/Room");

module.exports = {
  async index(req, res) {
    const rooms = await Room.find({});
    return apiResponse.successResponseWithData(res, "success", rooms);
  },

  async create(req, res) {
    const { user } = req;
    let room = Room({ owner: { username: user.username, user_id: user._id } });

    try {
      room.save();
      io.emit("room_created", { data: room });
    } catch (error) {
      console.log(error);
      return apiResponse.ErrorResponse(res, "server error");
    }

    return apiResponse.successResponseWithData(res, "success", {
      room: room._id
    });
  },

  async destroy(req, res) {
    const { user, body } = req;
    const { id } = body;

    let room = await Room.findById(id);

    if (user._id != room.owner.user_id)
      return apiResponse.unauthorizedResponse(res, "unauthorized");

    try {
      room.delete();
    } catch (error) {
      console.log(error);
      return apiResponse.ErrorResponse(res, "server error");
    }

    return apiResponse.successResponse(res, "success");
  },

  async join(req, res) {
    const { user, body } = req;

    try {
      const userData = {
        username: user.username,
        user_id: user._id
      };

      let room = await Room.findByIdAndUpdate(
        body.room,
        {
          $addToSet: {
            connected_users: userData
          }
        },
        { new: true }
      );

      if (!room) return apiResponse.notFoundResponse(res, "room not found");

      socketEmit({
        data: userData,
        namespace: "/room",
        room: body.room,
        event: "user_join"
      });

      return apiResponse.successResponseWithData(res, "success", room);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  },

  async leave(req, res) {
    const { user, body } = req;

    const userData = {
      username: user.username,
      user_id: user._id
    };

    try {
      let room = await Room.findByIdAndUpdate(
        body.room,
        {
          $pull: {
            connected_users: { user_id: user._id }
          }
        },
        { new: true }
      );

      if (!room) return apiResponse.notFoundResponse(res, "room not found");

      socketEmit({
        data: userData,
        namespace: "/room",
        room: body.room,
        event: "user_leave"
      });
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }

    return apiResponse.successResponse(res, "success");
  }
};
