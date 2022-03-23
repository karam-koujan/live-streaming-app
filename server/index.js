const express = require("express")
const app = express()
const mongoose = require("mongoose");
const auth = require("./drivers/auth/route");
const port = 8080 || process.env.PORT
const nodeMediaServer = require("./media_server");
const {dbConnection} = require("./config/keys/keys");

app.use("/auth",auth)
app.listen(port,_=>console.log("the http server is listening at port ",port))
mongoose.connect(dbConnection,_=>console.log("database is connect successfully"))

nodeMediaServer.run()



