import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.ts";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await API.post("/auth/login", form);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit} style={{ cursor: "pointer" }}>
        Login
      </button>
      <p onClick={() => navigate("/register")}>
        New here?{" "}
        <span style={{ cursor: "pointer", color: "blue" }}>Register</span>
      </p>
    </div>
  );
}
