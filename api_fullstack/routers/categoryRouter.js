const router = require('express').Router()

const { categoryController } = require('../controllers')

router.get('/getAllCate', categoryController.getAllCate)
router.post('/addCate', categoryController.addCate)
router.delete('/delCate/:id', categoryController.deleteCate)
router.get('/parentCate', categoryController.getCateDetParent)
router.get('/childCate', categoryController.getCateDetChild)
router.get('/children', categoryController.cateChildren)
router.get('/topNode', categoryController.getTopNode)
router.get('/leavesNode', categoryController.getLeavesNode)
router.get('/parentCatebyid', categoryController.getCateDetParentById)
router.patch('/editCate/:id', categoryController.editCate)

module.exports = router