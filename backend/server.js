const express = require("express");
const cors = require("cors");
const db = require("./db"); // MySQL connection
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ====== REGISTER ======
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [existingUser] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0)
      return res.status(400).json({ message: "User already exists" });

    await db.promise().query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== LOGIN ======
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: users[0].name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== COMMENTS ======
app.get("/api/comments", async (req, res) => {
  try {
    const [comments] = await db.promise().query(
      "SELECT * FROM comments ORDER BY created_at DESC"
    );
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/comments", async (req, res) => {
  const { user, comment } = req.body;
  if (!user || !comment)
    return res.status(400).json({ message: "All fields required" });

  try {
    await db.promise().query(
      "INSERT INTO comments (user, comment) VALUES (?, ?)",
      [user, comment]
    );
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

