import React, { useState } from "react";
import api from "../axios"; // axios instance import

function RegisterForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // button click page reload rokega
    try {
      const res = await api.post("/register", { name, email, password });
      alert(res.data.message);
      setUser(name);
      localStorage.setItem("username", name);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;

