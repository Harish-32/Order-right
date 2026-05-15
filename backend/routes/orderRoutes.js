const express = require("express");

const {

  createOrder,

  getFarmerOrders,

  getCustomerOrders,

  updateOrderStatus,

  cancelOrder,

} = require(
  "../controllers/orderController"
);

const router = express.Router();

router.post("/", createOrder);

router.get(
  "/farmer/:farmerId",
  getFarmerOrders
);

router.get(
  "/customer/:customerId",
  getCustomerOrders
);

router.put(
  "/update/:id",
  updateOrderStatus
);

router.put(
  "/cancel/:id",
  cancelOrder
);

module.exports = router;