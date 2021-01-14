const mysql = require('mysql')

// set up my sql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Frengky777',
    password: 'Mysql123',
    database: 'practice_jcwm15'
})

module.exports = connection