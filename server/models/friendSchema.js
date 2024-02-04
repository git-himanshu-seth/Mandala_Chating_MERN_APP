const mongoose = require("mongoose");
const friendshipSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requierd: true,
      },
      requester: {
        type: mongoose.Schema.Types.ObjectId,
        requierd: true,
      },
      status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending",
      },
    },
  ],
});
const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
