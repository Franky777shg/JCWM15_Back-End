// database
let products = [
    {
        id: 1,
        name: 'nike-01',
        price: 2000
    },
    {
        id: 2,
        name: 'nike-02',
        price: 3000
    }
]

// get all product, get product by id, add product, edit product, delete product
module.exports = {
    allProduct: (req, res) => {
        res.status(200).send(products)
    },
    productById: (req, res) => {
        // ambil data dari params
        const id = parseInt(req.params.id)
        
        // ambil data product sesuai index dari params
        let tempProd = products[id]

        // cek apakah tempProduct ada isinya atau tidak
        if(!tempProd) return res.status(400).send('Produk tidak ditemukan')

        res.status(200).send(tempProd)
    },
    add: (req, res) => {
        const {name, price} = req.body

        // cek apakah data product yang mau di tambahkan, sudah lengkap atau belum
        if(!name || !price) return res.status(400).send('Tolong isi semua data produk dengan lengkap')

        // kalau sudah lengkap, kita tambahkan ke dalam database product menggunakan push
        products.push({
            id: (products[products.length - 1].id) + 1,
            name,
            price
        })
        res.status(200).send(products)
    },
    edit: (req, res) => {
        const id = parseInt(req.params.id)

        // ambil data product sesuai yang user ingin edit
        let tempProd = products[id]

        // cek ketersediaan produk yang ingin diedit
        if(!tempProd) return res.status(400).send(`Product dengan index ${id} tidak ditemukan`)

        // looping mengedit data product sesuai keinginan user
        for(let key in req.body){
            for(let key2 in tempProd){
                if(key2 === key){
                    tempProd[key2] = req.body[key]
                }
            }
        }

        res.status(200).send(products)
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id)

        let tempProd = products[id]

        // cek ketersediaan produk yang ingin dihapus
        if(!tempProd) return res.status(400).send(`Product dengan index ${id} tidak ditemukan`)

        // pakai splice untuk mendelete data product sesuai index dari user
        products.splice(id, 1)
        res.status(200).send(products)
    }
}