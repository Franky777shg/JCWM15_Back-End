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

// database
let database = [
    {
        username: "Lisa",
        password: "lisa123",
        email: "lisa@gmail.com",
    },
    {
        username: "Jennie",
        password: "jennie123",
        email: "jennie@yahoo.com",
    },
    {
        username: "Rose",
        password: "rose123",
        email: "rose@hotmail.com",
    }
]

server.get('/home', (req, res) => {
    res.status(200).send('<h1>Hello this is Home</h1>')
})

server.post('/login', (req, res) => {
    // inputan dari user, akan masuk ke dalam req.body
    console.log(req.body)
    const { username, password } = req.body

    let userIndex = database.findIndex(
        (item) => item.username === username && item.password === password
    )

    // kita bisa kasih respon ketika ada kesalahan
    if(userIndex === -1) return res.status(400).send('Invalid username or password')

    res.status(200).send(database[userIndex])
})

server.listen(port, () => console.log(`Connected to port: ${port}`))