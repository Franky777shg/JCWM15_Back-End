var http = require('http')
const port = 2000

const server = http.createServer((req, res) => {
    // console.log(req)
    console.log("URL: ", req.url)
    console.log("Headers: ", req.headers)
    if(req.url === '/users') {
        let user = {
            name: 'Frengky',
            age: 21,
            gender: 'Male'
        }
        res.writeHead(200, {'Content-Type' : 'application/json'})
        // data yang dikirim ke user harus berbentuk json
        res.end(JSON.stringify(user))
    }
    else if(req.url === '/buah') {
        let buah = [
            {
                nama: 'Apel',
                warna: 'merah'
            },
            {
                nama: 'Jeruk',
                warna: 'orange'
            }
        ]

        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify(buah))
    }
})

server.listen(port, () => console.log(`server running at: ${port}`))