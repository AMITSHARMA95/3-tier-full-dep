import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required!");
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("username", res.data.name);
      setUser(res.data.name);
      setEmail(""); setPassword("");
    } catch (err) { alert(err.response?.data?.message || "Login failed"); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex-1">
      <h3 className="font-bold mb-2">Login</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</button>
    </form>
  );
}

