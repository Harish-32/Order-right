import { useEffect, useState }
from "react";

import axios from "axios";

import { Link }
from "react-router-dom";

function MyProducts() {

  const [products, setProducts] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // Fetch Products
  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/products/farmer/${user._id}`

      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Product
  const deleteProduct =
    async (id) => {

      try {

        await axios.delete(

          `${import.meta.env.VITE_API_URL}/api/products/${id}`

        );

        alert("Product Deleted");

        fetchProducts();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="min-h-screen bg-green-100 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        My Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-green-700">
                {product.productName}
              </h2>

              {/* Category */}
              <p className="mt-2">
                Category:
                {" "}
                {product.category}
              </p>

              {/* Quantity */}
              <p>
                Quantity:
                {" "}
                {product.quantity}
              </p>

              {/* Delivery Radius */}
              <p>
                Delivery Radius:
                {" "}
                {product.deliveryRadius}
                {" "}
                km
              </p>

              {/* Price */}
              <p className="text-xl font-bold mt-3">
                ₹{product.price}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">

                {/* Edit Button */}
                <Link
                  to={`/edit-product/${product._id}`}
                >

                  <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                </Link>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    deleteProduct(
                      product._id
                    )
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyProducts;