const express = require("express");
const { getProfileInfo } = require("./controllers");
const router =  express.Router()

router.get("/info",getProfileInfo.logic)

module.exports = router