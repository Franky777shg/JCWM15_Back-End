const input = {
    email: "frengky@gmail.com"
}
// cara mengambil value dari sebuah property obj
// console.log('cara pertama', input.email)
// console.log('cara kedua', input['email'])

generate = (obj) => {
    let result = ''
    for (let property in obj) {
        console.log(property)
        console.log(typeof(property))
        result += ` ${property} = '${obj[property]}',`
        console.log(result)
    }
    return result.slice(0, -1)
}

// generate(input)
const editUser = `UPDATE users SET${generate(input)}`

console.log(editUser)
