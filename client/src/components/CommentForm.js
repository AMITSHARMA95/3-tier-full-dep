import React, { useState } from "react";
import axios from "axios";

export default function CommentForm({ user, fetchComments }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return alert("Message required!");
    try {
      await axios.post("http://localhost:5000/comments", { user_id: 1, message }); // user_id ko real backend me JWT se replace kar
      setMessage("");
      fetchComments();
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea placeholder="Write your comment..." value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Submit Comment</button>
    </form>
  );
}

