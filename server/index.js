const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

//application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected'))
.catch(err=> console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {

        if(!user) {
            return res.join({
                loginSuccess: false,
                message: "There is no user registered with that email address."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.join({
                    loginSuccess: false,
                    message: "The password is wrong."
                })
            }
    
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err) 
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    })
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (res, req) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ""},
        (err, user) => {
            if(err) return res.josin({success:false, err})
            return res.status(200).send({
                success: true
            })
        })
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요')
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))