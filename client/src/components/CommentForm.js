import React, { useState } from "react";
import api from "../axios";

export default function CommentForm({ user, fetchComments }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/comments", { user, comment });
      setComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("Failed to submit comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Comment
      </button>
    </form>
  );
}

