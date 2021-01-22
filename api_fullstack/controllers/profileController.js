// import from helpers
const { parse } = require('handlebars')
const { asyncQuery, generateQuery } = require('../helpers/queryHelp')

module.exports = {
    editProfile: async (req, res) => {
        const { gender, kota, umur } = req.body

        const editQuery = `UPDATE profile SET${generateQuery(req.body)} WHERE id_users = ${parseInt(req.params.id)}`
        // console.log(editQuery)
        try {
            const result = await asyncQuery(editQuery)

            res.status(200).send(result)
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
        // res.status(200).send('test edit profile')
    }
}