import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

function EditProduct() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      productName: "",

      category: "",

      price: "",

      quantity: "",

      deliveryRadius: "",
    });

  // Fetch Product
  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct =
    async () => {

      try {

        const res =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/products`
          );

        const product =
          res.data.find(

            (item) =>
              item._id === id
          );

        if (product) {

          setFormData({

            productName:
              product.productName,

            category:
              product.category,

            price:
              product.price,

            quantity:
              product.quantity,

            deliveryRadius:
              product.deliveryRadius,
          });
        }

      } catch (error) {

        console.log(error);

      }
    };

  // Handle Change
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // Update Product
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/products/${id}`,

          formData
        );

        alert(
          "Product Updated"
        );

        navigate(
          "/my-products"
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-[500px]"
      >

        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          Edit Product
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="productName"
            value={
              formData.productName
            }
            onChange={
              handleChange
            }
            placeholder="Product Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            placeholder="Price"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            value={
              formData.quantity
            }
            onChange={
              handleChange
            }
            placeholder="Quantity"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="deliveryRadius"
            value={
              formData.deliveryRadius
            }
            onChange={
              handleChange
            }
            placeholder="Delivery Radius"
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Update Product
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProduct;