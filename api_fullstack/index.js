// import module
const express = require('express') // pembuat server pengganti http module
const bodyParser = require('body-parser') // untuk menampung req.body
const cors = require('cors') // izin sharing data
const mysql = require('mysql') // untuk menyambungkan api dengan mysql database

// create app
const app = express()

// apply middleware
app.use(cors())
app.use(bodyParser.json())

// setup mysql
// import connection
const db = require('./database')

db.connect((err) => {
    // console.log(err)
    // console.log(connection)
    if (err) return console.log(`error connecting : ${err.stack}`)
    console.log(`connected as id : ${db.threadId}`)
})

// create home route
app.get('/', (req, res) => {
    res.status(200).send(`<h1>This is Home</h1>`)
})

// import router
const { productRouter, userRouter } = require('./routers')
app.use('/product', productRouter)
app.use('/user', userRouter)

const PORT = 2000
app.listen(PORT, () => console.log(`Connected to PORT: ${PORT}`))