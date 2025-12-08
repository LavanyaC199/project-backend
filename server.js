// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ===== HEALTH CHECK =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running ✅" });
});

// ===== ROUTES =====
app.use("/api/auth", authRoutes);       // /api/auth/register, /api/auth/login
app.use("/api/users", userRoutes);      // /api/users/...
app.use("/api/trainers", trainerRoutes);// /api/trainers/...
app.use("/api/workouts", workoutRoutes);// /api/workouts/...

// ===== MONGO CONNECTION =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
