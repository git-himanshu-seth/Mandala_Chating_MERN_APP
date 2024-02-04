const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  googleId: {
    type: String,
    required: [true, "GoogleId is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        // Simple email validation using a regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
