const multer = require('multer')
const path = require('path')

module.exports = {
    upload: () => {
        // setup multer
        var storage = multer.diskStorage({
            destination: path.join(path.resolve('public'), 'images'),
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
                // bayangan rename file => 'IMG-123456.jpg'
            }
        })

        return multer({ storage: storage }).single('IMG')
    }
}