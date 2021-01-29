// import helpers
const { generateQuery, asyncQuery } = require('../helpers/queryHelp')

// import database
const db = require('../database')

module.exports = {
    getAllProduct: (req, res) => {
        // define query sql
        const queryProduct = `select id_products, name, price, stock, title as category from products p
                              left join category c
                              on p.category_id = c.id`

        db.query(queryProduct, (err, result) => {
            // check error
            if (err) return res.status(500).send(err)

            // if success
            res.status(200).send(result)
        })
    },
    addProduct: async (req, res) => {
        const { name, category_id, price, stock } = req.body
        try {
            const addQuery = `insert into products (name, category_id, price, stock) 
                              values (${db.escape(name)}, ${db.escape(category_id)}, ${db.escape(price)}, ${db.escape(stock)})`

            const result = await asyncQuery(addQuery)

            const getQuery = `select id_products, name, price, stock, title as category from products p
                              left join category c
                              on p.category_id = c.id`

            const resultUpdate = await asyncQuery(getQuery)

            res.status(200).send(resultUpdate)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    delProduct: async (req, res) => {
        try{
            const delQuery = `delete from products where id_products = ${db.escape(parseInt(req.params.id))}`

            const result = await asyncQuery(delQuery)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editProduct: async (req, res) => {
        try{
            const editQuery = `update products set${generateQuery(req.body)} 
                               where id_products = ${db.escape(parseInt(req.params.id))}`

            const result = await asyncQuery(editQuery)

            const getDataProduct = `select id_products, name, price, stock, title as category from products p
                                    left join category c
                                    on p.category_id = c.id
                                    where id_products = ${db.escape(parseInt(req.params.id))}`

            const resultUpdate = await asyncQuery(getDataProduct)

            res.status(200).send(resultUpdate[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}