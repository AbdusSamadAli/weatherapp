const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "weather_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Welcome to the weather app API");
});

function authenticateJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token

  if (!token) return res.status(403).send("Access denied. No token provided.");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = user;
    next();
  });
}

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).send("Error signing up");
      res.status(200).send("User created");
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err || result.length === 0)
        return res.status(401).send("Invalid credentials");
      const user = result[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return res.status(401).send("Invalid credentials");
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  );
});

app.get("/weather", authenticateJWT, async (req, res) => {
  const city = req.query.city;
  const apiKey = "26ce867270fd0b841f7e7d7916bfb67d";
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    db.query(
      "INSERT INTO weather_reports (username, city, weather_info) VALUES (?, ?, ?)",
      [req.user.username, city, JSON.stringify(weatherData)],
      (err) => {
        if (err) return res.status(500).send("Error saving weather report");
        res.json({ username: req.user.username, weatherData }); // Send the weather data and username
      }
    );
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});
app.get("/weather-reports", authenticateJWT, (req, res) => {
  const username = req.user.username;

  db.query(
    "SELECT * FROM weather_reports WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).send("Error fetching weather reports");
      res.json(results); // Send weather reports to the client
    }
  );
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
