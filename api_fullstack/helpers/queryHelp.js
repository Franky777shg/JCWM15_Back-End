module.exports = {
    generateQuery: (body) => {
        let result = ''
        for (let property in body) {
            result += ` ${property} = '${body[property]}',`
        }
        return result.slice(0, -1)
    }
}