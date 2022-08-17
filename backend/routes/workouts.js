const express = require("express");

// workout controller
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.use(checkAuth);

// GET all workouts
router.get("/", getWorkouts);

// // GET single workout
router.get("/:id", getWorkout);

// POST single workout
router.post("/", createWorkout);

// DELETE single workout
router.delete("/:id", deleteWorkout);

// UPDATE single workout
router.patch("/:id", updateWorkout);

module.exports = router;
