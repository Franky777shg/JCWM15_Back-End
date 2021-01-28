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
            const addQuery = `INSERT INTO category (title, parent_id) VALUES ('${title}', ${db.escape(parentId)})`

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
    },
    getCateDetParent: async (req, res) => {
        try {
            const parentQuery = `SELECT c2.id, c2.title, c2.parent_id, c1.title as parent
            FROM category c1
            RIGHT JOIN category c2 ON c1.id = c2.parent_id`

            const result = await asyncQuery(parentQuery)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getCateDetChild: async (req, res) => {
        try {
            const childQuery = `SELECT c1.id, c1.title, c2.title AS child FROM category c1
                                LEFT JOIN category c2
                                ON c1.id = c2.parent_id`

            const result = await asyncQuery(childQuery)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    cateChildren: async (req, res) => {
        try {
            const query = `SELECT c1.id, c1.title, group_concat(c2.title SEPARATOR ', ') AS children FROM category c1
                            LEFT JOIN category c2
                            ON c1.id = c2.parent_id
                            GROUP BY c1.title
                            HAVING children IS NOT NULL
                            ORDER BY c1.id`

            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getTopNode: async (req, res) => {
        try {
            const query = `SELECT id, title AS top_node FROM category WHERE parent_id IS NULL`

            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getLeavesNode: async (req, res) => {
        try {
            const query = `select c1.id, c1.title from category c1
            left join category c2
            ON c1.id = c2.parent_id
            WHERE c2.title IS NULL`

            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getCateDetParentById: async (req, res) => {
        try {
            console.log('req query : ', req.query)

            const query = `SELECT c1.id, c1.title, c2.title AS parent FROM category c1
            LEFT JOIN category c2
            ON c1.parent_id = c2.id
            WHERE c1.id = ${req.query.id}`

            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editCate: async (req, res) => {
        try {
            const query = `UPDATE category SET${generateQuery(req.body)} where id = ${db.escape(parseInt(req.params.id))}`
            // console.log(query)

            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}