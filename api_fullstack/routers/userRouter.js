// import router from express
const router = require('express').Router()
const { body, validationResult } = require('express-validator')

// import controller
const { userController } = require('../controllers')

// register validation
const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Username must have 6 character'),
    body('password')
        .notEmpty()
        .withMessage('Password can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Password must have 6 character')
        .matches(/[0-9]/)
        .withMessage('Password must include number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include symbol'),
    body('email')
        .isEmail()
        .withMessage('Invalid email')
]

// create router
router.get('/getAllUsers', userController.getAllUser)
router.post('/login', userController.login)
router.put('/register', registerValidation, userController.register)
router.post('/edit/:id', userController.edit)
router.post('/edit_password/:id', userController.editPass)
router.delete('/delete/:id', userController.delete)

// export router
module.exports = router