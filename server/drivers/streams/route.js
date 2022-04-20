const express = require("express");
const {tokenVerification} = require("../auth/middlewares/tokenVerification");
const router = express()
const { generate_stream_key,create_new_stream} = require("./controllers");


router.get("/stream_key",tokenVerification,generate_stream_key.logic)
router.post("/create_stream",tokenVerification,create_new_stream.validateClientInput,create_new_stream.logic)
module.exports = router;




