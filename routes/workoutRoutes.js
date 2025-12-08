// routes/workoutRoutes.js
const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

// GET /api/workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    console.error("Get workouts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/workouts
router.post("/", async (req, res) => {
  try {
    const { userId, title, date, notes } = req.body;
    const workout = await Workout.create({ userId, title, date, notes });
    res.status(201).json(workout);
  } catch (err) {
    console.error("Create workout error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
