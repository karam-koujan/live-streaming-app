const {registerController} = require("./register")
const {registerWithGoogleController} = require("./registerWithGoogle")
const {getGoogleUserInfo} = require("./getGoogleUserInfo")
module.exports = {
registerController,
registerWithGoogleController,
getGoogleUserInfo
}
