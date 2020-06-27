const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  day: {
    type: Date,
  },
  exercises: [{
    type: {
      type: String,
     
    },
    name: {
      type: String,
      
    },
    duration: {
      type: String,
      
    },
    weight: {
      type: Number,
      
    },
    reps: {
      type: Number,
      
    },
    sets: {
      type: Number,
    }}]
});
// trying to get totalDuration to function correctly...

workOutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workOutSchema);

module.exports = Workout;
