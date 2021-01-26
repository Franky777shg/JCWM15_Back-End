const router = require('express').Router()

const { categoryController } = require('../controllers')

router.get('/getAllCate', categoryController.getAllCate)
router.post('/addCate', categoryController.addCate)
router.delete('/delCate/:id', categoryController.deleteCate)

module.exports = router