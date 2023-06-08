const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
