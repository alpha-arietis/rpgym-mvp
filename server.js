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

// Connect to DB
const uri = process.env.ATLAS_URI
mongoose.connect('mongodb://rpgym:rpgym@cluster0-shard-00-00-volnf.gcp.mongodb.net:27017,cluster0-shard-00-01-volnf.gcp.mongodb.net:27017,cluster0-shard-00-02-volnf.gcp.mongodb.net:27017/RPGym?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connection to MongoDB established successfully')
})

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

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)