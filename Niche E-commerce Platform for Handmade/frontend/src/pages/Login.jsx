import React, { useState, useContext } from "react";
import AuthForm from "../components/Auth/AuthForm";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (authUser) {
    const role = authUser?.role;
    if (role === "admin") {
      navigate("/admin/orders");
    } else if (role === "artisan") {
      navigate("/artisan/dashboard");
    } else {
      navigate("/home");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      toast.success(res.data.message);

      setAuthUser(res.data.user);
      const role = res.data.user?.role;

      if (role === "admin") {
        navigate("/admin/orders");
      } else if (role === "artisan") {
        navigate("/artisan/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isRegister={false}
      />

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link
          to="/forgot-password"
          style={{ color: "#555", textDecoration: "underline" }}
        >
          Forgot Password?
        </Link>
      </p>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Not registered yet?{" "}
        <Link
          to="/register"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Register here
        </Link>
      </p>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Want to become an Artisan?{" "}
        <Link
          to="/artisan/register"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Register as Artisan
        </Link>
      </p>
    </div>
  );
};

export default Login;
