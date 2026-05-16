const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  productName: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },

  deliveryRadius: {
    type: Number,
    default: 10,
  },

  location: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports = mongoose.model(
  "Product",
  productSchema
);
