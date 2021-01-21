const nodemailer = require('nodemailer')
const NODEMAILER = process.env.NODEMAILER

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: 'frengky.sihombing.777@gmail.com',
        pass : NODEMAILER
    },
    tls : {
        rejectUnauthorized: true
    }
})

module.exports = transporter