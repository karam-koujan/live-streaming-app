const {loginController,loginWithGoogle} = require("./login");

const {registerController,registerWithGoogleController,getUserInfoByGoogleIdController} = require("./register");

module.exports = {
    loginController,
    registerController,
    registerWithGoogleController,
    getUserInfoByGoogleIdController,
    loginWithGoogle
}