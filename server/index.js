const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const auth = require("./drivers/auth/route");
const port = 8080 || process.env.PORT
const nodeMediaServer = require("./media_server");
const {dbConnection} = require("./config/keys/keys");

const jsonBodyParser = bodyParser.json()
const urlBodyParser = bodyParser.urlencoded({ extended: false })
app.use(jsonBodyParser)
app.use(urlBodyParser)
app.use("/api/auth",auth)
app.listen(port,_=>console.log("the http server is listening at port ",port))
mongoose.connect(dbConnection,_=>console.log("database is connect successfully"))

nodeMediaServer.run()

module.exports = app


