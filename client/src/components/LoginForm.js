import React, { useState } from "react";
import api from "../axios";

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("username", res.data.user);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded shadow w-full md:w-1/2">
      <h2 className="text-xl mb-2">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Login
      </button>
    </form>
  );
}

