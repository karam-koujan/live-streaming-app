const express = require("express");
const {tokenVerification} = require("../auth/middlewares/tokenVerification");
const router = express()
const { generate_stream_key} = require("./controllers");


router.get("/stream_key",tokenVerification,generate_stream_key.logic)

module.exports = router;




