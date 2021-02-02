// import module
const { generateQuery, asyncQuery } = require('../helpers/queryHelp')
const { validationResult } = require('express-validator')
const cryptojs = require('crypto-js')
const db = require('../database')

module.exports = {
    register: async (req, res) => {
        const { username, email, password } = req.body
        try {
            // validation input from user
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).send(errors.array())

            //hash password
            const hashpass = cryptojs.HmacMD5(password, process.env.CRYPTO_KEY).toString()

            // kalau tidak ada error, proses penambahan data user baru berjalan
            const checkUser = `SELECT * FROM user 
                              WHERE username=${db.escape(username)}
                              OR email=${db.escape(email)}`
            const resCheck = await asyncQuery(checkUser)

            if (resCheck.length !== 0) return res.status(400).send('Username or Email is already exist')

            const regQuery = `INSERT INTO user (username, password, email)
                              VALUES (${db.escape(username)}, ${db.escape(hashpass)}, ${db.escape(email)})`
            const resRegister = await asyncQuery(regQuery)
            console.log(resRegister)

            const getUser = `SELECT * FROM user WHERE id_user = ${resRegister.insertId}`
            const resultGetUser = await asyncQuery(getUser)

            res.status(200).send(resultGetUser[0])
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    login: async (req, res) => {
        const { username, password } = req.headers
        console.log(req.headers)
        try {
            const hashpass = cryptojs.HmacMD5(password, process.env.CRYPTO_KEY).toString()

            const loginQuery = `SELECT * FROM user WHERE username = ${db.escape(username)} AND password = ${db.escape(hashpass)}`
            const result = await asyncQuery(loginQuery)

            if (result.length === 0) return res.status(400).send('Username or Password is doesn\'t match')

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}