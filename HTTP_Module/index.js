var http = require('http')
var fs = require('fs')
const port = 2000

const server = http.createServer((req, res) => {
    // console.log(req)
    console.log("URL: ", req.url)
    console.log("Headers: ", req.headers)
    if (req.url === '/users') {
        let user = {
            name: 'Frengky',
            age: 21,
            gender: 'Male'
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        // data yang dikirim ke user harus berbentuk json
        res.end(JSON.stringify(user))
    }
    else if (req.url === '/buah') {
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

        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(buah))
    }
    else if (req.url === '/home') {
        let home = fs.readFileSync('home.html', 'utf-8', () => console.log('home berhasil'))
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(home)
    }
    else if (req.url === '/products') {
        // data yang didapatkan dari hasil fs adalah berbentuk buffer
        let products = fs.readFileSync('product.json').toString()
        console.log(products)
        // agar data dapat terbaca kembali, harus kita satukan dengan mengubah nya menjadi string
        // console.log(products.toString())
        
        // let obj = JSON.parse(products.toString())
        // console.log(obj)

        // let result = JSON.stringify(obj)
        // console.log(result)
        // console.log(typeof(result))

        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(products.toString())
    }
    else if (req.url === '/add_product') {
        let input = ''
        req.on('data', (chunk) => {

            console.log(chunk)

            input = chunk.toString()

            console.log(input)
        })
        .on('end', () => {
            let obj = JSON.parse(input)
            console.log(obj)

            let products = JSON.parse(fs.readFileSync('product.json').toString())
            products.push(obj)

            fs.writeFileSync('product.json', JSON.stringify(products))
            res.writeHead(200, {'content-type' : 'text/html'})
            res.end('Add Product Done')

        })
    }
})

server.listen(port, () => console.log(`server running at: ${port}`))