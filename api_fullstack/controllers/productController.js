// import database
const db = require('../database')

module.exports = {
    getAllProduct: (req, res) => {
        // define query sql
        const queryProduct = 'SELECT * FROM products'

        db.query(queryProduct, (err, result) => {
            // check error
            if (err) return res.status(500).send(err)

            // if success
            res.status(200).send(result)
        })
    }
}