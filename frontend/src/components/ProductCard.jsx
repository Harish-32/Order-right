import { useContext } from "react";

import { CartContext }
from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } =
    useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold text-green-700">
          {product.productName}
        </h2>

        <p className="text-gray-600 mt-2">
          Category: {product.category}
        </p>

        <p className="text-gray-600">
          Quantity: {product.quantity}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold">
            ₹{product.price}
          </span>

          <button
            onClick={() =>
              addToCart(product)
            }
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}
export default ProductCard;