const express = require("express");
const {tokenVerification} = require("../auth/middleware/tokenVerification");
const router = express()
const { generate_stream_key } = require("./controller");


router.get("/stream_key",tokenVerification,generate_stream_key)

module.exports = router;




