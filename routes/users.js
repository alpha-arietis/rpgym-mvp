const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const auth = require('../middleware/auth')

// READ users (works in Insomnia, no frontend component)

// @route   GET /
// @desc    Get users list
// @access  Public (MAKE PRIVATE) - DO I NEED THIS AT ALL?
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// READ user by ID (works in Insomnia, no frontend component)

// @route   GET /user/id
// @desc    Get User Data
// @access  Private
router.route('/:id').get(auth, (req, res) => {
    User.findById(req.params.id).select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err))
})

// CREATE user (works with Insomnia)

// @route   POST /users/register
// @desc    Register new User
// @access  Public
router.route('/register').post((req, res) => {
    const { username, email, password } = req.body // tells server what should be inside the request 'box'
// VISUALISE A POST OFFICE WITH WORKERS HAVING CHECKLISTS WITH CONTENTS OF EACH PARCEL THEY RECEIVE

    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // Check for Existing User
    User.findOne({ email })
    .then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' })
        // if user doesn't already exist, then:
        const newUser = new User({
            username,
            email,
            password
        })
        // Create Salt & Hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => { 
                    jwt.sign(
                        { id: user.id }, // JWT 1 parameter = payload (request to api will have id in body)
                        secret, // JWT 2 parameter = secret (from config file)
                        { expiresIn: 3600 }, // JWT 3 parameter (optional) = token expiry (3600 seconds = 1 hr)
                        (err, token)=> { // JWT 4 parameter = callback
                            if (err) throw err
                            res.json({
                                token, // same as writing token: token
                                user: { id: user.id, username: user.username, email: user.email }
                            })
                        } 
                    ) 
                })
                .catch(err => res.status(400).json('Error: ' + err))
            })
        })
    })
})

// DELETE user (works in Insomnia, no frontend component)
router.route('/:id').delete(auth, (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json('User deleted!'))
    .catch(err => res.status(400).json('Error ' + err))
})

// UPDATE user (works in Insomnia, no frontend component) 
// *** THIS DOES NOT HASH PASSWORD YET ***

// @route   POST /update/:id
// @desc    Update user information
// @access  Public (MAKE PRIVATE)
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password

        user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err))
})

// LOGIN user (works with Insomnia)

// @route   POST users/login
// @desc    Authenticate User
// @access  Public
router.route('/login').post((req, res) => {
    const { email, password } = req.body // tells server what should be inside the request 'box'
// VISUALISE A POST OFFICE WITH WORKERS HAVING CHECKLISTS WITH CONTENTS OF EACH PARCEL THEY RECEIVE

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // Check for Existing User
    User.findOne({ email })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exist' })
        
        // Validate Password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Invalid password' })
            jwt.sign(
                { id: user.id }, // JWT 1 parameter = payload (request to api will have id in body)
                secret, // JWT 2 parameter = secret (from config file)
                { expiresIn: 3600 }, // JWT 3 parameter (optional) = token expiry (3600 seconds = 1 hr)
                (err, token)=> { // JWT 4 parameter = callback
                    if (err) throw err
                    res.json({ // this is the object SENT from BACKEND upon validation pass
                        token, // same as writing token: token
                        user: { id: user.id, username: user.username, email: user.email }
                    })
                } 
            )   
        })

            })
})

module.exports = router