import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ArtisanRegister from "./components/Auth/ArtisanRegister";
import ArtisanDashboard from "./components/Artisan/ArtisanDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import PendingArtisans from "./pages/PendingArtisans";
import PendingProducts from "./pages/PendingProducts";
import AdminOrders from "./pages/AdminOrders";
import RoleBasedNavbar from "./components/Navbar/RoleBasedNavbar";

function App() {
  return (
    <>
      <Toaster />
      <RoleBasedNavbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/artisan/register" element={<ArtisanRegister />} />
        <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/admin/pending-artisans" element={<PendingArtisans />} />
        <Route path="/admin/pending-products" element={<PendingProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </>
  );
}

export default App;
