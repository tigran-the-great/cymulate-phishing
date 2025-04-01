import React, { useEffect, useState } from "react";
import API from "../api.ts";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  const fetchAttempts = async () => {
    const res = await API.get("/attempts");
    setAttempts(res.data);
  };

  const sendPhishing = async () => {
    await API.post("/attempts/send", { email });
    fetchAttempts();
    setEmail("");
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  return (
    <div className="dashboard">
      <h2>Phishing Dashboard</h2>
      <div className="phishing-form">
        <input
          placeholder="Target Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={sendPhishing}>Send Phishing Email</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Sent At</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a: any) => (
            <tr key={a._id}>
              <td>{a.email}</td>
              <td>{a.status}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
