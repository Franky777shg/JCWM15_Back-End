// import express router
const router = require('express').Router()

// import controller
const { productController } = require('../controllers')

// create router
router.get('/getProduct', productController.getAllProduct)

// export router
module.exports = router