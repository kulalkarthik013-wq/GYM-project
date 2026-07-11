require("dotenv").config();
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");

// ✅ node-fetch fix (ESM compatible)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// SQLite DB
const db = new sqlite3.Database("gym.db", (err) => {
  if (err) console.log("Database error:", err);
  else console.log("Connected to SQLite database");
});

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  username TEXT UNIQUE,
  age INTEGER,
  weight REAL,
  height REAL,
  bmi REAL,
  password TEXT,
  profilePic TEXT
)
`);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Gym backend is running 🚀");
});


// ======================= SIGNUP =======================
app.post("/signup", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, username, age, weight, height, bmi, password } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users(name, username, age, weight, height, bmi, password, profilePic)
      VALUES(?,?,?,?,?,?,?,?)
    `;

    db.run(
      sql,
      [name, username, age, weight, height, bmi, hashedPassword, profilePic],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Database error ❌" });
        }
        res.json({ message: "Account created successfully ✅" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ======================= LOGIN =======================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Server error ❌" });
    }

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Invalid password ❌" });
    }

    res.json({
      message: "Login successful ✅",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        age: user.age,
        weight: user.weight,
        height: user.height,
        bmi: user.bmi,
        profilePic: user.profilePic
      }
    });
  });
});


// ======================= AI CHATBOT =======================
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          input: `You are a professional gym trainer.
Give short, practical answers about workouts, diet, fat loss, muscle gain.

User: ${message}`
        })
      }
    );

    const data = await response.json();

    // 🔍 DEBUG LOG (important)
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    // ✅ SAFE RESPONSE HANDLING
    const reply =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.error?.message ||
      "AI did not return a valid response";

    res.json({ reply });

  } catch (error) {
    console.log("AI Error:", error);
    res.status(500).json({
      reply: "AI server error ❌"
    });
  }
});


// ======================= START SERVER =======================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});