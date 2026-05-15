import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext }
from "../context/CartContext";

function Navbar() {

  const { cartItems } =
    useContext(CartContext);

  return (

    <nav className="bg-green-700 text-white px-8 py-5 flex justify-between items-center">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold"
      >
        ORDER RIGHT
      </Link>

      {/* Navigation */}
      <div className="flex gap-6 items-center">

        <Link to="/">
          Home
        </Link>

        <Link to="/my-orders">
          My Orders
        </Link>

        <Link to="/cart">

          Cart
          {" "}
          (
          {cartItems.length}
          )

        </Link>

        <Link to="/login">
          Login
        </Link>
        <Link to="/my-products">
            My Products
</Link>

      </div>

    </nav>
  );
}

export default Navbar;