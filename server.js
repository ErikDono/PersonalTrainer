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

// require("./routes/api")(app)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
app.get("/stats", (req, res) =>{
    res.sendFile(__dirname + '/public/stats.html')
});
app.get("/api/workouts/range", (req, res)=>{


})
app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params)

    db.Workout.update(
        {
            _id: req.params.id
        },
        {
            $set: {
                exercises: req.body
            }
        }, (error, edited) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(edited);
                res.send(edited);
            }
        })
})

app.get("/exercise", (req, res) => {
    res.sendFile(__dirname + '/public/exercise.html')
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create({ date: new Date().setDate(new Date().getDate()) })
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

