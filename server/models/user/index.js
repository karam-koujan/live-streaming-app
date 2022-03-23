let buildMakeUser = require('./user')
let userSchema = require('./user-schema')
let studentValidator = require('../validator/')(userSchema)

let makeUser = buildMakeUser(studentValidator)

module.exports = makeUser
