// import method Router dari module express
const router = require('express').Router()

// import controller yang dibutuhkan
const {product} = require('../controllers')

router.get('/getProduct', product.allProduct)
router.get('/productById/:id', product.productById)
router.put('/add', product.add)
router.patch('/edit/:id', product.edit)
router.delete('/delete/:id', product.delete)

module.exports = router