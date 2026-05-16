import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerOrders from "./pages/FarmerOrders";
import MyOrders from "./pages/temp1";
import MyProducts from "./pages/temp2";
import EditProduct from "./pages/EditProduct";
function App() {
  return (
    <BrowserRouter>

     

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer-orders" element={<FarmerOrders />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;