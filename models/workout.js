const mongoose = require("mongoose");
const exercise = require("./exercise");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  day: {
    type: Date,
    required: true
  },
  exercises: [{
    type: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      unique: true
    },
    duration: {
      type: Number,
      unique: true
    },
    weight: {
      type: Number,
      unique: true
    },
    reps: {
      type: Number,
      unique: true
    },
    sets: {
      type: Number,
      unique: true
    }}]
});
// adds a dynamically-created property to schema
workOutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;
