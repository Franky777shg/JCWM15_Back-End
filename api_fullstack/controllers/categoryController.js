const { generateQuery, asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')

module.exports = {
    getAllCate: async (req, res) => {
        try {
            const queryCate = 'SELECT * FROM category'
            const result = await asyncQuery(queryCate)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    addCate: async (req, res) => {
        const { title, parent_id } = req.body

        const parentId = parent_id ? parent_id : null

        try {
            const addQuery = `INSERT INTO category (title, parent_id) VALUES (${db.escape(title)}, ${db.escape(parentId)})`

            const result = await asyncQuery(addQuery)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteCate: async (req, res) => {
        try {
            const delQuery = `DELETE FROM category WHERE id = ${db.escape(parseInt(req.params.id))}`

            const result = await asyncQuery(delQuery)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}