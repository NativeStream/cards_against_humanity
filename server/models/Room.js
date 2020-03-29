const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    owner: {
      username: {
        type: String,
        required: true
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    },
    connected_users: [
      {
        _id: false,
        username: {
          type: String,
          required: true
        },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

RoomSchema.method({});
RoomSchema.static({});

module.exports = mongoose.model("Room", RoomSchema);
