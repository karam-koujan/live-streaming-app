const express = require("express");
const { registerController,loginWithGoogle,loginController,registerWithGoogleController,getUserInfoByGoogleIdController} = require("./controllers");

const router = express.Router()


router.post("/login",loginController)
router.post("/register",registerController)
router.get("/google/account/userInfo",getUserInfoByGoogleIdController)
router.post("/google/account/register",registerWithGoogleController)
router.post("/google/account/login",loginWithGoogle)
module.exports = router