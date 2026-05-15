import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);
      alert("Login Successful");

     if (res.data.user.role === "farmer") {

  navigate("/farmer-dashboard");

} else {

  navigate("/");

}

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
          Login
        </h1>

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

        <button
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
        >
          Login
        </button>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-green-700 font-bold ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;