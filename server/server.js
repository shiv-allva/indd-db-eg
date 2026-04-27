const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("API running");
});

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results);
  });
});

app.get("/users-clean", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");   // 👈 IMPORTANT
    res.send(JSON.stringify(results));
  });
});

// Get single user
app.get("/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.json({ error: err });
    res.json(results[0]);
  });
});

app.listen(3000, () => {
  console.log("Server running: http://127.0.0.1:3000");
});