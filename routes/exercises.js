const router = require('express').Router()
const Exercise = require('../models/exercise.model')
const auth = require('../middleware/auth')
const User = require('../models/user.model')

// READ exercises
router.route('/').get(auth, (req, res) => {

    User.findById(req.user.id)
    .then(res => res.username)
    .then(usernameQ => {
        Exercise.find({ username: usernameQ })
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error ' + err))
    })
    .catch(err => res.status(400).json('Could not get user ID' + err))
})
    

// CREATE exercise
router.route('/add').post(auth, (req, res) => {
    
    const username = req.body.username
    const description = req.body.description
    const totalLevels = Number(req.body.totalLevels)
    const repsPerLevel = Number(req.body.repsPerLevel)
    const currentReps = 0
    const currentXP = 0
    const totalXP = 0
    // need to XP calculation variables? YES, but set at 0 for newly created exercises

    const newExercise = new Exercise({
        username,
        description,
        totalLevels,
        repsPerLevel,
        currentReps,
        currentXP,
        totalXP
    })

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error ' + err))
})

// READ exercise by id
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error ' + err))
})

// DELETE exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Exercise deleted!'))
    .catch(err => res.status(400).json('Error ' + err))
})

// UPDATE exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.totalLevels = Number(req.body.totalLevels)
        exercise.repsPerLevel = Number(req.body.repsPerLevel)
        // do I need to write another method for updating current reps?
        exercise.currentReps = Number(req.body.currentReps)
        exercise.currentXP = Number(req.body.currentXP)
        exercise.totalXP = Number(req.body.totalXP)
// do I need all variables such as totalXP for save function not to crash? No, it just won't update them
        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router