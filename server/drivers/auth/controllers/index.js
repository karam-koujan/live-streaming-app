const {loginController,loginWithGoogle} = require("./login/");

const {registerController,registerWithGoogleController,getGoogleUserInfo} = require("./register/");

module.exports = {
    loginController,
    registerController,
    registerWithGoogleController,
    getGoogleUserInfo,
    loginWithGoogle,

}