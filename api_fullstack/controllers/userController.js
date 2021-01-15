// import module yang dibutuhkan
const { validationResult } = require('express-validator')
const cryptojs = require('crypto-js')
const SECRET_KEY = '!@#$%^&*'

// import database connection
const db = require('../database')

// export controller
module.exports = {
    getAllUser: (req, res) => {
        const userQuery = 'SELECT * FROM users'
        db.query(userQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    login: (req, res) => {
        const { username, password } = req.body
        const loginQuery = `SELECT username, email FROM users 
                            WHERE username='${username}'
                            AND password=${db.escape(password)}`
        db.query(loginQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            // result bentuknya array of object
            // console.log(result)

            // cek apakah login berhasil
            if (result.length === 0) return res.status(400).send('Username or Password is wrong')

            res.status(200).send(result[0])
        })
    },
    register: (req, res) => {
        const { username, password, email} = req.body

        // validation input from user
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        // encrypt password with crypto js
        // data yang sudah di encrypt oleh crypto js, TIDAK BISA di decrypt
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)
        console.log('password : ', hashpass.toString())

        // kalau tidak ada error, proses penambahan data user baru berjalan
        const checkUser = `SELECT * FROM users 
                          WHERE username=${db.escape(username)}
                          OR email=${db.escape(email)}`
        db.query(checkUser, (err, result) => {
            if(err) return res.status(500).send(err)

            // cek apakah di database ada user dengan username atau email yang sama
            if(result.length !== 0) return res.status(400).send('Username or Email is already exist')

            const regQuery = `INSERT INTO users (username, password, email)
                              VALUES (${db.escape(username)}, ${db.escape(hashpass.toString())}, ${db.escape(email)})`
            db.query(regQuery, (err2, result2) => {
                if(err2) res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
        // res.status(200).send('test hash password')
    }
}