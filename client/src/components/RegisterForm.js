import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields required!");
    try {
      await axios.post("http://localhost:5000/register", { name, email, password });
      localStorage.setItem("username", name);
      setUser(name);
      setName(""); setEmail(""); setPassword("");
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex-1">
      <h3 className="font-bold mb-2">Register</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
    </form>
  );
}

