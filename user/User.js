const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

User.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (error, hash) => {
    if (error) {
      return next(error);
    }
    this.password = hash;

    return next();
  });
});

module.exports = mongoose.model("User", User);