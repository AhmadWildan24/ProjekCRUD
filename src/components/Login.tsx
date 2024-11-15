// src/pages/Login.tsx
import React, { useState } from "react";
import { login } from "../Api";
import { getMessages } from "../Api";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Fungsi login yang mengembalikan token (contoh sederhana)
      const token = await login(username, password);
      setToken(token);
      localStorage.setItem("token", token); // Simpan token ke localStorage
      alert("Login successful");
      getMessages(token);
      navigate("/home"); // Arahkan user ke /landing setelah login
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", width: "100%", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
        <button type="submit" style={{ padding: "10px", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
