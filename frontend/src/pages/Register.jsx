import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Get User Location
  const getLocation = () => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        setFormData((prev) => ({
          ...prev,

          location: {
            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,
          },
        }));

        alert("Location Captured");

      }
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
          required
        />

        {/* Role Selection */}
        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-5"
        >

          <option value="customer">
            Customer
          </option>

          <option value="farmer">
            Farmer
          </option>

        </select>

        {/* Location */}
        <button
          type="button"
          onClick={getLocation}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mb-5"
        >
          Get Location
        </button>

        <button
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
        >
          Register
        </button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-green-700 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;