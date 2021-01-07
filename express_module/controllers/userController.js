const { validationResult } = require('express-validator')

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

// export semua controller
module.exports = {
    getUser: (req, res) => {
        res.status(200).send(database)
    },
    login: (req, res) => {
        // inputan dari user, akan masuk ke dalam req.body
        console.log(req.body)
        const { username, password } = req.body

        let userIndex = database.findIndex(
            (item) => item.username === username && item.password === password
        )

        // kita bisa kasih respon ketika ada kesalahan
        if (userIndex === -1) return res.status(400).send('Invalid username or password')

        res.status(200).send(database[userIndex])
    },
    register: (req, res) => {
        let errors = validationResult(req)
        // console.log(errors)
        // console.log(errors.array())

        // mengambil msg error dari express-validator
        const msg = errors.array().map(
            (item) => item.msg
        )
        console.log(msg)

        if (!errors.isEmpty()) return res.status(400).send(msg)

        database.push(req.body)
        res.status(200).send(database)
    },
    edit: (req, res) => {
        // ambil data user yang mau diedit
        let tempUser = database[parseInt(req.params.id)]

        // kalau user nya tidak ada
        if (!tempUser) return res.status(400).send(`tidak ada user dengan index ${req.params.id}`)

        console.log(tempUser)
        console.log(req.body)

        // looping untuk mengedit data user
        for (let key in req.body) {
            for (let key2 in tempUser) {
                if (key === key2) {
                    tempUser[key2] = req.body[key]
                }
            }
        }

        res.status(200).send(database)
    },
    delete: (req, res) => {
        let tempUser = database[parseInt(req.params.id)]

        if (!tempUser) return res.status(400).send(`tidak ada data user dengan index ${req.params.id}`)

        database.splice(parseInt(req.params.id), 1)
        res.status(200).send(database)
    }
}