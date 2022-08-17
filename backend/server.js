require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// getting routes
const workoutsRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutsRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    })
  )
  .catch((err) => console.error(err));
