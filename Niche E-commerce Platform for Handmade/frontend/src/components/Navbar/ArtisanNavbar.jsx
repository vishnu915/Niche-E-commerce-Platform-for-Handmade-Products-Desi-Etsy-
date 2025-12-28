import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../../styles/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ArtisanNavbar = () => {
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
      <div className="nav-logo">Desi Etsy - Artisan</div>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ArtisanNavbar;
