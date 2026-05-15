import { useState } from "react";
import axios from "axios";
const user =JSON.parse(localStorage.getItem("user"));
function FarmerDashboard() {
if (!user || user.role !== "farmer") {

  return (
    <h1 className="text-3xl text-center mt-20">
      Access Denied
    </h1>
  );
}
  const [formData, setFormData] = useState({

    productName: "",

    category: "",

    price: "",

    quantity: "",

    deliveryRadius: ""

  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
const user =JSON.parse(localStorage.getItem("user"));
      const data = new FormData();
data.append(
  "latitude",
  user.location.latitude
);

data.append(
  "longitude",
  user.location.longitude
);
      data.append(
        "productName",
        formData.productName
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "quantity",
        formData.quantity
      );

      data.append(
        "deliveryRadius",
        formData.deliveryRadius
      );

      data.append(
        "farmerId",
        user._id
      );

      data.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        data
      );

      alert("Product Uploaded");

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          Farmer Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="deliveryRadius"
            placeholder="Delivery Radius (km)"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

      

          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Upload Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default FarmerDashboard;