import React, { useState } from "react";
import api from "../axios";

export default function RegisterForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/register", { name, email, password });
      setUser(name);
      localStorage.setItem("username", name);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded shadow w-full md:w-1/2">
      <h2 className="text-xl mb-2">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
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
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

