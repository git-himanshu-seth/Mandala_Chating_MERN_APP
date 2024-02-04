const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const userChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  messages: [
    {
      message: messageSchema,
    },
  ],
});

const UserChat = mongoose.model("UserChat", userChatSchema);

module.exports = UserChat;
