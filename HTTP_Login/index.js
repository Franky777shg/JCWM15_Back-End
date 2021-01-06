// import module yang kita perlukan
const http = require('http')
const fs = require('fs')
const url = require('url')

// define port
const port = 2000

// define database
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

// make server
const server = http.createServer((req, res) => {
    // akses index untuk edit dari user menggunakan url (pakai query)
    console.log(req.url)
    const alamat = url.parse(req.url)
    console.log(alamat)

    if(req.url === "/home") {
        let home = fs.readFileSync("home.html", "utf-8")
        res.writeHead(200, {"Content-type" : "text/html"})
        res.end(home)
    }
    else if (req.url === "/users") {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(database))
    }
    else if (req.url === "/login") {
        // get data from user
        let input = ""
        req.on("data", (chunk) => {
            input = chunk.toString()
            console.log(input)
        }) // kalau sudah selesai
        .on("end", () => {
            let obj = JSON.parse(input)
            console.log(obj)
            let username = obj.username
            let password = obj.password
            console.log(username, password)

            // untuk mencari index data user di database yang sesuai dengan data yang dikirim oleh user
            let userIndex = database.findIndex(
                (item) => item.username === username && item.password === password
            )
            console.log(userIndex)

            res.writeHead(200, {"content-type" : "application/json"})
            res.end(JSON.stringify(database[userIndex]))
        })
    }
    else if (req.url === "/register") {
        let input = ""
        req.on("data", (chunk) => {
            input = chunk.toString()
            console.log(input)
        })
        .on("end", () => {
            let obj = JSON.parse(input)
            console.log(obj)

            // push data user baru ke dalam database
            database.push(obj)
            res.writeHead(200, {"content-type" : "application/json"})
            res.end(JSON.stringify(database))
        })
    }
    else if (alamat.pathname === "/edit") {
        let input = ""
        req.on("data", (chunk) => {
            input = chunk.toString()
            console.log(input)
        })
        .on("end", () => {
            // get data user
            let itemUser = database[alamat.query]
            console.log(itemUser)

            let obj = JSON.parse(input)
            console.log(obj)

            // edit data sesuai keinginan user
            // for in untuk melooping di dalam object, for of untuk melooping di dalam array
            for(let key in obj) {
                for(let key2 in itemUser){
                    if (key === key2) {
                        itemUser[key2] = obj[key]
                    }
                }
            }

            // ganti database
            database.splice(alamat.query, 1, itemUser)

            res.writeHead(200, {"content-type" : "applicaton/json"})
            res.end(JSON.stringify(database))
        })
    }
})

server.listen(port, () => console.log(`Connected to port: ${port}`))