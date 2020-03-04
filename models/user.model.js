const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator) // this returns a JSON response - need to put into UI

const User = mongoose.model('User', userSchema)

module.exports = User