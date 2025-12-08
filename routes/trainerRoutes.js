// routes/trainerRoutes.js
const express = require("express");
const Trainer = require("../models/Trainer");
const router = express.Router();

// GET /api/trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    console.error("Get trainers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/trainers
router.post("/", async (req, res) => {
  try {
    const { name, expertise, experienceYears } = req.body;
    const trainer = await Trainer.create({ name, expertise, experienceYears });
    res.status(201).json(trainer);
  } catch (err) {
    console.error("Create trainer error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
