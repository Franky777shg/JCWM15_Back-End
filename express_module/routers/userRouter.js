// import module express beserta method router
// method router dari express berguna untuk membuat router
const router = require('express').Router()

// import controller yang dibutuhkan
const { user } = require('../controllers')

// use body for express validator
const { body } = require('express-validator')

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
router.get('/getUser', user.getUser)
router.post('/login', user.login)
router.put('/register', registerValidation, user.register)
router.patch('/edit/:id', user.edit)
router.delete('/delete/:id', user.delete)

// export router
module.exports = router