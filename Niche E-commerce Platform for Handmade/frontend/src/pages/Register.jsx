import React, { useState } from "react";
import AuthForm from "../components/Auth/AuthForm";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isRegister
      />
    </div>
  );
};

export default Register;
