const mongoose = require("mongoose");

// Define Group Schema
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending",
      },
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create Group Model
const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
