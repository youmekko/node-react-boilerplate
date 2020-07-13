const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        Type: Number
    }
})

userSchema.pre('save', next => {
    let user = this

    if (user.isModified('password')) {
        bcrypt.getSalt(saltRounds, (err, salt) => {
            console.log(1)
        if (err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log(2)
            if (err) return next(err)
            user.password = hash
            next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }