const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.post("/submit", ({ body }, res) => {
    res.json({ success: true })
});

app.get("/getAll", (req, res) => {
    db.Workout.find({}).then(r => {
        res.json({ data: r })
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});