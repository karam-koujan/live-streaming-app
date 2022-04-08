const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./drivers/auth/route");
const port = 8080 || process.env.PORT
const nodeMediaServer = require("./drivers/media/media_server");
const {dbConnection,corsOrigin} = require("./config/keys/keys");
const stream = require("./drivers/streams/route");
const {tokenVerification} = require("./drivers/auth/middleware/tokenVerification");
const jsonBodyParser = bodyParser.json()
const urlBodyParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(jsonBodyParser)
app.use(urlBodyParser)
app.use("/api/auth",auth)
app.use("/api/stream",tokenVerification,stream)
app.listen(port,_=>console.log("the http server is listening at port ",port))

mongoose.connect(dbConnection,_=>console.log("database is connect successfully"))

nodeMediaServer.run()

module.exports = app


