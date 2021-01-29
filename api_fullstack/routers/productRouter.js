// import express router
const router = require('express').Router()

// import controller
const { productController } = require('../controllers')

// create router
router.get('/getProduct', productController.getAllProduct)
router.post('/addProduct', productController.addProduct)
router.delete('/delProduct/:id', productController.delProduct)
router.patch('/editProduct/:id', productController.editProduct)

// export router
module.exports = router