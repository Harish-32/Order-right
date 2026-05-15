import { useEffect, useState } from "react";

import axios from "axios";
import socket from "../socket";
function FarmerOrders() {

  const [orders, setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Fetch Farmer Orders
  useEffect(() => {

  fetchOrders();

  socket.on(
    "newOrder",

    (order) => {

      alert(
        "New Order Received!"
      );

      fetchOrders();
    }
  );

}, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/orders/farmer/${user._id}`

      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Update Order Status
  const updateStatus =
    async (orderId, status) => {

      try {

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,

          { status }

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-green-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        Farmer Orders
      </h1>

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  Order Status:
                  {" "}
                  <span className="text-green-700">
                    {order.status}
                  </span>
                </h2>

                <p className="mt-2">
                  Address:
                  {" "}
                  {order.deliveryAddress}
                </p>

                <p>
                  Total:
                  {" "}
                  ₹{order.totalAmount}
                </p>

              </div>

              {/* Status Buttons */}
              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Accepted"
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Rejected"
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Preparing"
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Preparing
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Out for Delivery"
                    )
                  }
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                >
                  Out for Delivery
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Delivered"
                    )
                  }
                  className="bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Delivered
                </button>

              </div>

            </div>

            {/* Products */}
            <div className="mt-6">

              <h3 className="text-xl font-bold mb-4">
                Products
              </h3>

              <div className="space-y-4">

                {order.products.map(
                  (product, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={product.image}
                        alt={
                          product.productName
                        }
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div>

                        <h4 className="font-bold">
                          {product.productName}
                        </h4>

                        <p>
                          Quantity:
                          {" "}
                          {product.quantity}
                        </p>

                        <p>
                          ₹{product.price}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FarmerOrders;