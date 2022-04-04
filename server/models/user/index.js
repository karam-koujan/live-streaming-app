let buildMakeUser = require('./user')
let userSchema = require('./user-schema')
let studentValidator = require('../../utils/dataValidator')(userSchema)

let makeUser = buildMakeUser(studentValidator)

module.exports = makeUser
