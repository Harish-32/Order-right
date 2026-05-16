const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      productName: String,

      quantity: Number,

      price: Number,

      image: String,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  deliveryAddress: {
    type: String,
    required: true,
  },

  customerLocation: {

    latitude: Number,

    longitude: Number,
  },

  status: {
    type: String,

    enum: [
      "Pending",
      "Accepted",
      "Rejected",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ],

    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Order",
  orderSchema
);
