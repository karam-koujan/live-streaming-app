const express = require("express");
const { registerController,loginWithGoogle,loginController,registerWithGoogleController,getGoogleUserInfo} = require("./controllers");

const router = express.Router()
router.post("/login",loginController.validateClientInput,loginController.logic)
router.post("/register",registerController.validateClientInput,registerController.logic)
router.get("/google/account/userInfo",getGoogleUserInfo.logic)
router.post("/google/account/register",registerWithGoogleController.validateClientInput,registerWithGoogleController.logic)
router.post("/google/account/login",loginWithGoogle.logic)
module.exports = router