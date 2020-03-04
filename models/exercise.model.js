const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    totalLevels: { type: Number, required: true },
    repsPerLevel: { type: Number, required: true },
    currentReps: { type: Number }, // entered by user when adding reps
    currentXP: { type: Number }, // currentReps divided by repsPerLevel e.g. 204/15=13.6 : LVL 13, XP 6/10
    totalXP: { type: Number }, // currentXP divided by totalLevels e.g. 13.6/20=0.68 : XP 6.8/10
}, {
    timestamps: true // add icon URL field and display icon for every exercise
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise

// Exercise = mongoose.model('Exercise', new mongoose.Schema({key: value}))
