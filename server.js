// Require Middleware
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
//const path = require('path')

const app = express()

// Set Port Variable
const port = process.env.PORT || 5000

// Get Config File
require('dotenv').config()

// Middleware Setup
app.use(cors())
app.use(express.json())



// Bodyparser (ensures we can get data from req.body in our html form)
app.use(express.urlencoded({ extended: false }))

// Routes Setup
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// Display Static Pages on Deployment
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'))
    // Set request type to ALL routes and tell which file to load and where to find it
    app.get('*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))
}

// Connect to DB - HEROKU works with hardcoded URI
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))
// const connection = mongoose.connection
// connection.once('open', () => {
//     console.log('Connection to MongoDB established successfully')
// })

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`, process.env.ATLAS_URI)
}
)