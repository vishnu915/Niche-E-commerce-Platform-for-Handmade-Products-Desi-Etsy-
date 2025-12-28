import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../../styles/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-logo">Desi Etsy - Admin</div>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li className={isActive("/admin/orders") ? "active" : ""}>
          <Link to="/admin/orders" onClick={() => setOpen(false)}>
            Manage Orders
          </Link>
        </li>
        <li className={isActive("/admin/pending-products") ? "active" : ""}>
          <Link to="/admin/pending-products" onClick={() => setOpen(false)}>
            Product Approvals
          </Link>
        </li>
        <li className={isActive("/admin/pending-artisans") ? "active" : ""}>
          <Link to="/admin/pending-artisans" onClick={() => setOpen(false)}>
            Artisan Approvals
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
