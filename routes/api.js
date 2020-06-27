const db = require("../models");
const { update } = require("../models/workout");

module.exports = app => {
    db.Workout.create({ day: new Date().setDate(new Date().getDate()) })
        .then(dbWorkout => {
            console.log(dbWorkout.day);
        })
        .catch(({ message }) => {
            console.log(message);
        });
    app.post("/submit", ({ body }, res) => {
        res.json({ success: true })
    });
    app.get("/notes", (req, res) => {
        db.Note.find({})
            .then(dbNote => {
                res.json(dbNote);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/user", (req, res) => {
        db.User.find({})
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/submit", ({ body }, res) => {
        db.Note.create(body)
            .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/populateduser", (req, res) => {
        db.User.find({})
            .populate("notes")
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // app.get("/getAll", (req, res) => {
    //     db.Workout.find({}).populate("exercise").then(r => {
    //         res.json({ data: r })
    //     })
    // })
    // app.post("/api/exercise/new/:id", async (req, res) => {
    //     let new_exercise = await db.Exercise.create(req.body).catch(err => res.json({ error: err }))
    //     let update_product = await db.Workout.findOneAndUpdate({ _id: req.params.id }, { exercises: new_exercise._id }, { new: true })
    //     res.json({ data: update_product })
    // })
}


