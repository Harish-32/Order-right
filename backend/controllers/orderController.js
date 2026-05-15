const Order =
require("../models/Order");

const { io } =
require("../server");

// Create Order
exports.createOrder =
async (req, res) => {

  try {

    const order =
      await Order.create(req.body);

    // Emit Real-Time Event
    io.emit(
      "newOrder",
      order
    );

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Farmer Orders
exports.getFarmerOrders =
async (req, res) => {

  try {

    const orders =
      await Order.find({

        farmerId:
          req.params.farmerId,

      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Customer Orders
exports.getCustomerOrders =
async (req, res) => {

  try {

    const orders =
      await Order.find({

        customerId:
          req.params.customerId,

      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Order Status
exports.updateOrderStatus =
async (req, res) => {

  try {

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        {
          status:
            req.body.status,
        },

        { new: true }
      );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Cancel Order
exports.cancelOrder =
async (req, res) => {

  try {

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        {
          status:
            "Cancelled",
        },

        { new: true }
      );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};