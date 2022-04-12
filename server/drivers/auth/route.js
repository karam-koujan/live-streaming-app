const express = require("express");
const { registerController, loginController,registerWithGoogleController,getUserInfoByGoogleIdController} = require("./controllers");

const router = express.Router()


router.post("/login",loginController)
router.post("/register",registerController)
router.get("/google/account/userInfo",getUserInfoByGoogleIdController)
router.post("/google/account/register",registerWithGoogleController)
module.exports = router