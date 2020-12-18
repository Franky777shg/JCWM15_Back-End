var timers = require('timers') // import timers from 'timers'
var assert = require('assert')
var url = require('url')
var link = 'http://localhost:2000/user/jakarta?umur=12&gender=wanita'

// var objFRomURL = url.parse(link, true)
// console.log(objFRomURL)
// console.log('Host: ', objFRomURL.host)
// console.log('Port: ', objFRomURL.port)
// console.log('Query: ', objFRomURL.query)
// console.log('Umur: ', objFRomURL.query.umur)
// console.log('Gender: ', objFRomURL.query.gender)

// var item = ['satu', 'dua', 'tiga']
// assert.strictEqual(item.length, 3, "Error strict equal")
// assert.notStrictEqual(item.length, 3, "Error not strict equal")

// timers.setTimeout(function coba(){
//     console.log('coba timers module')
// }, 2000)