import { useContext, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import { CartContext }
from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    setCartItems,
  } = useContext(CartContext);

  const [address, setAddress] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Total Price
  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price * item.quantity,

      0
    );

  // Place Order
  const placeOrder = async () => {

    try {

      if (cartItems.length === 0) {

        alert("Cart is Empty");

        return;
      }

      const orderData = {

        customerId: user._id,

        farmerId:
          cartItems[0].farmerId,

        products: cartItems.map(
          (item) => ({

            productId: item._id,

            productName:
              item.productName,

            quantity:
              item.quantity,

            price: item.price,

            image: item.image,

          })
        ),

        totalAmount: totalPrice,

        deliveryAddress: address,

        customerLocation:
          user.location,

      };

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders`,

        orderData
      );

      alert("Order Placed");

      // Clear Cart
      setCartItems([]);

    } catch (error) {

      console.log(error);

      alert("Order Failed");

    }
  };

  return (
    <div>

      <Navbar />

      <div className="p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <p className="text-xl">
            Cart is Empty
          </p>

        ) : (

          <div className="space-y-6">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="flex justify-between items-center bg-white shadow-md rounded-xl p-5"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.productName}
                    </h2>

                    <p>
                      Quantity:
                      {" "}
                      {item.quantity}
                    </p>

                    <p className="text-green-700 font-bold">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(
                      item._id
                    )
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            ))}

            {/* Address */}
            <textarea
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            />

            {/* Total */}
            <div className="text-right mt-10">

              <h2 className="text-3xl font-bold mb-5">
                Total: ₹{totalPrice}
              </h2>

              <button
                onClick={placeOrder}
                className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800"
              >
                Place Order
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;