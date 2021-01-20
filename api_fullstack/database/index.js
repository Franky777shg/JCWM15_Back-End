const mysql = require('mysql')

// set up my sql
// data my sql sudah pakai dotenv
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME
})

module.exports = connection