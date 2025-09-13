const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "chat_app",
});

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "User registered successfully!" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(400).send({ message: "User not found" });

    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(400).send({ message: "Incorrect password" });

    const token = jwt.sign({ id: results[0].id }, "SECRET_KEY");
    res.json({ token, name: results[0].name });
  });
});

// Post Comment
app.post("/comments", (req, res) => {
  const { user_id, message } = req.body;
  db.query(
    "INSERT INTO comments (user_id, message) VALUES (?, ?)",
    [user_id, message],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, user_id, message, created_at: new Date() });
    }
  );
});

// Get Comments
app.get("/comments", (req, res) => {
  db.query(
    `SELECT comments.id, comments.message, comments.created_at, users.name as username
     FROM comments JOIN users ON comments.user_id = users.id
     ORDER BY comments.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));

