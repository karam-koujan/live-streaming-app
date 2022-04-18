const {registerController} = require("./defaultRegister")
const {registerWithGoogleController} = require("./registerWithGoogle")
const {getGoogleUserInfo} = require("./getGoogleUserInfo")
module.exports = {
registerController,
registerWithGoogleController,
getGoogleUserInfo
}
