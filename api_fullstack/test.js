// const input = {
//     email: "frengky@gmail.com"
// }
// cara mengambil value dari sebuah property obj
// console.log('cara pertama', input.email)
// console.log('cara kedua', input['email'])

// generate = (obj) => {
//     let result = ''
//     for (let property in obj) {
//         console.log(property)
//         console.log(typeof(property))
//         result += ` ${property} = '${obj[property]}',`
//         console.log(result)
//     }
//     return result.slice(0, -1)
// }

// // generate(input)
// const editUser = `UPDATE users SET${generate(input)}`

// console.log(editUser)

// const jwt = require('jsonwebtoken')
// let token = jwt.sign({username: 'frengky', password: 'frengky123!'}, '!@#$%^&*')
// console.log('token : ', token)

// let dataToken = jwt.verify(token, '!@#$%^&*')
// console.log('token yang sudah di kembalikan menjadi bentuk semula: ', dataToken)

// let a = 'aku'
// console.log(Boolean(a))
const path = require('path')

console.log(path.join(path.resolve('public'), 'images'))