const express = require("express");
const {tokenVerification} = require("../auth/middlewares/tokenVerification");
const router = express()
const { generate_stream_key,create_new_stream,get_stream_link} = require("./controllers");


router.put("/change_stream_key",tokenVerification,generate_stream_key.logic)
router.post("/create_stream",tokenVerification,create_new_stream.validateClientInput,create_new_stream.logic)
router.get("/stream_link",tokenVerification,get_stream_link.logic)
module.exports = router;




