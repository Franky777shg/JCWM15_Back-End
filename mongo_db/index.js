const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(cors())

// set up mongo db
mongoose.connect(process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log(`Connected to Mongo DB`)
    })

// create route home
app.get('/', (req, res) => {
    res.status(200).send(`<h1>This is Home Mongo DB</h1>`)
})

// create schema or database rules
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

// create model
const User = mongoose.model('Users', userSchema)

// register
app.post('/register', (req, res) => {
    const { username, password, email } = req.body

    if(!username || !password || !email) return res.status(400).send('Please input all data')

    // create new user
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    // save data user
    newUser.save()
    .then(result => {
        // console.log(result)
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

// login
app.post('/login', (req, res) => {
    User.find({ username: req.body.username, password: req.body.password})
    .then(result => {
        if(result.length === 0) return res.status(400).send('Username or Password is doesn\'t exist')

        res.status(200).send(result)
    })
    .catch(err => res.status(400).send(err))
})

// get all user
// get user by id

const Port = 2000
app.listen(Port, () => console.log(`Connected to PORT : ${Port}`))