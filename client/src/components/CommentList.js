import React from "react";

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map(c => (
        <li key={c.id} className="bg-white p-2 rounded shadow mb-2">
          <strong>{c.username}</strong>: {c.message}
          <br/>
          <small className="text-gray-500">{new Date(c.created_at).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}

