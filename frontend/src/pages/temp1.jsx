import { useEffect, useState }
from "react";

import axios from "axios";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Fetch Orders
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/orders/customer/${user._id}`

      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Cancel Order
  const cancelOrder =
    async (orderId) => {

      try {

        await axios.put(

          `http://localhost:5000/api/orders/cancel/${orderId}`

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-green-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        My Orders
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
                  Status:
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

              {/* Cancel */}
              {order.status !==
                "Delivered" &&

                order.status !==
                "Cancelled" && (

                <button
                  onClick={() =>
                    cancelOrder(
                      order._id
                    )
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Cancel Order
                </button>

              )}

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

export default MyOrders;