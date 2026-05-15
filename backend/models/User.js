const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["farmer", "customer"],
    required: true,
  },

  location: {

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

  },

});

module.exports = mongoose.model("User", userSchema);