const router = require('express').Router()

const { profileController } = require('../controllers')

router.patch('/edit/:id', profileController.editProfile)

module.exports = router