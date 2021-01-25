const router = require('express').Router()

const { profileController } = require('../controllers')

const { upload } = require('../helpers/multer')
const uploader = upload()

router.patch('/edit/:id', profileController.editProfile)
router.post('/upload/:id', uploader, profileController.uploadFile)

module.exports = router