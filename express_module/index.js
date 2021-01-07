// import module
const express = require('express') // untuk sebagai pengganti http
const bodyParser = require('body-parser') // untuk mengambil data body dari request
const cors = require('cors') // untuk izin akses
const port = 2000

// make server
const server = express()

// use module
server.use(bodyParser.json())
server.use(cors())

// route untuk tampilan home
server.get('/home', (req, res) => {
    res.status(200).send('<h1>Hello this is Home</h1>')
})

// connect to all router
const { userRouter } = require('./routers')
server.use('/user', userRouter)


server.listen(port, () => console.log(`Connected to port: ${port}`))