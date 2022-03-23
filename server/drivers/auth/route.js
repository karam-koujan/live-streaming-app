const express = require("express");

const router = express.Router()


router.post("/signup/",clientSignup)
router.get("/signup/:email/:code",clientEmailVerification)
router.post("/login/",clientLogin)

router.post("/forgotPassword/sendResetPasswordCode/client",sendClientResetPasswordCode)
router.post("/forgotPassword/codeVerification/",codeVerification)
router.post("/forgotPassword/resetPassword/",resetClientPassword)
router.post("/sendEmailVerification/",sendClientEmailVerification)
module.exports = router