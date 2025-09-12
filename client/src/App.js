import React, { useState, useEffect } from "react";
import api from "./axios";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

function App() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchComments();
    const storedName = localStorage.getItem("username");
    if (storedName) setUser(storedName);
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get("/api/comments");
      setComments(res.data);
    } catch (err) {
      console.error("Fetch comments error:", err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Header */}
      <header className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl mb-6">
        <h1 className="text-3xl font-bold">Hello, I am Amit Sharma</h1>
        <p className="mt-2 text-lg">Professional DevOps Engineer 🚀</p>
        <a
          href="https://www.linkedin.com/in/amit-sharma-a11837243/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block underline"
        >
          🔗 Connect on LinkedIn
        </a>
      </header>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">💡 My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">AWS (EC2, S3, RDS, IAM, VPC)</div>
          <div className="bg-white p-4 rounded shadow">Docker & Kubernetes (EKS)</div>
          <div className="bg-white p-4 rounded shadow">Terraform & Ansible</div>
          <div className="bg-white p-4 rounded shadow">CI/CD (Jenkins, GitHub Actions)</div>
          <div className="bg-white p-4 rounded shadow">Monitoring (Prometheus, Grafana, ELK)</div>
          <div className="bg-white p-4 rounded shadow">Security (Vault, Trivy, TLS, IAM)</div>
        </div>
      </section>

      {/* Register/Login */}
      {!user ? (
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <RegisterForm setUser={setUser} />
          <LoginForm setUser={setUser} />
        </div>
      ) : (
        <div className="mb-6 flex justify-between items-center bg-green-100 p-4 rounded">
          <p className="text-green-800 font-semibold">Logged in as {user}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Comments */}
      {user && (
        <section className="mb-6">
          <CommentForm user={user} fetchComments={fetchComments} />
          <CommentList comments={comments} />
        </section>
      )}
    </div>
  );
}

export default App;

