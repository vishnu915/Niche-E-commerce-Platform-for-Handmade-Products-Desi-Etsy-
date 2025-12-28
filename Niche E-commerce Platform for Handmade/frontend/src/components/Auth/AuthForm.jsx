import React from "react";
import "../../styles/Auth.css";

const AuthForm = ({ formData, setFormData, handleSubmit, isRegister }) => {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isRegister ? "Create an Account" : "Login to Desi Etsy"}</h2>

      {isRegister && (
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button type="submit">{isRegister ? "Register" : "Login"}</button>
    </form>
  );
};

export default AuthForm;
