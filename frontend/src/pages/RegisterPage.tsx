import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.ts";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>Register</button>
      <p onClick={() => navigate("/")}>
        Already have an account?{" "}
        <span style={{ cursor: "pointer", color: "blue" }}>Login</span>
      </p>
    </div>
  );
}
