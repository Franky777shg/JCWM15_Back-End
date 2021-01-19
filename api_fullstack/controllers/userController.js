// import module yang dibutuhkan
const { validationResult, check } = require('express-validator')
const cryptojs = require('crypto-js')

// import helpers
const SECRET_KEY = '!@#$%^&*'
const { generateQuery } = require('../helpers/queryHelp')

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

        // hashing password
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)

        const loginQuery = `SELECT username, email FROM users 
                            WHERE username='${username}'
                            AND password=${db.escape(hashpass.toString())}`
        console.log(loginQuery)

        db.query(loginQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            // result bentuknya array of object
            // console.log(result)

            // cek apakah login berhasil
            if (result.length === 0) return res.status(400).send('Username or Password is wrong')

            res.status(200).send(result[0])
        })
        // res.status(200).send('testing login')
    },
    register: (req, res) => {
        const { username, password, email } = req.body

        // validation input from user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        // encrypt password with crypto js
        // data yang sudah di encrypt oleh crypto js, TIDAK BISA di decrypt
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)
        console.log('password : ', hashpass.toString())

        // kalau tidak ada error, proses penambahan data user baru berjalan
        const checkUser = `SELECT * FROM users 
                          WHERE username=${db.escape(username)}
                          OR email=${db.escape(email)}`
        db.query(checkUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // cek apakah di database ada user dengan username atau email yang sama
            if (result.length !== 0) return res.status(400).send('Username or Email is already exist')

            const regQuery = `INSERT INTO users (username, password, email)
                              VALUES (${db.escape(username)}, ${db.escape(hashpass.toString())}, ${db.escape(email)})`
            db.query(regQuery, (err2, result2) => {
                if (err2) res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
        // res.status(200).send('test hash password')
    },
    edit: (req, res) => {
        const id = parseInt(req.params.id)

        // validation input from user
        const errors = validationResult(req)
        console.log(errors.errors)
        
        const errUsername = errors.errors.filter(item => item.param === 'username' && item.value !== undefined)
        console.log(errUsername)
        if (errUsername.length !== 0) return res.status(400).send(errUsername[0].msg)
        
        const errEmail = errors.errors.filter(item => item.param === 'email' && item.value !== undefined)
        console.log(errEmail)
        if (errEmail.length !== 0) return res.status(400).send(errEmail[0].msg)
        

        const checkUser = `SELECT * FROM users WHERE id_users=${db.escape(id)}`
        // console.log(checkUser)

        db.query(checkUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // if id_users not found
            if (result.length === 0) return res.status(200).send(`User with id : ${id} is not found`)

            const editUser = `UPDATE users SET${generateQuery(req.body)} WHERE id_users=${id}`
            // console.log(editUser)
            db.query(editUser, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },
    editPass: (req, res) => {
        const id = parseInt(req.params.id)

        // validation input from user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        const checkUser = `SELECT * FROM users WHERE id_users=${db.escape(id)}`
        // console.log(checkUser)

        db.query(checkUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // if id_users not found
            if (result.length === 0) return res.status(200).send(`User with id : ${id} is not found`)

            const hashpass = cryptojs.HmacMD5(req.body.password, SECRET_KEY)

            // query change password
            const editPassword = `UPDATE users SET password=${db.escape(hashpass.toString())} WHERE id_users=${id}`
            // console.log(editPassword)

            db.query(editPassword, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },
    delete: (req, res) => {
        const checkUser = `SELECT * FROM users WHERE id_users=${db.escape(parseInt(req.params.id))}`

        db.query(checkUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // if id_users not found
            if (result.length === 0) return res.status(200).send(`User with id : ${parseInt(req.params.id)} is not found`)

            const deleteUser = `DELETE FROM users WHERE id_users=${parseInt(req.params.id)}`

            db.query(deleteUser, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })

        })
    }
}