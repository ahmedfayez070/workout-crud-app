const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

//get all workout
const getWorkouts = async (req, res) => {
  const userId = req.user._id;
  const workouts = await Workout.find({ user_id: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json({ workouts });
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json({ workout });
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const userId = req.user._id;
    const workout = await Workout.create({ title, reps, load, userId });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//update a single workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, ...req.body);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json({ workout });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
