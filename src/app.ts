import express from "express"; 
import {ApolloServer} from "apollo-server-express";
import { UserResolver } from "./userResolver";
import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {connect} from "mongoose";
const {dbConnection} = require("./config/"); 
(async()=>{
const app = express() 
const port = process.env.NODE_ENV || 8000 ; 

const apolloServer = new ApolloServer({
  schema : await buildSchema({
     resolvers : [UserResolver],
  })

})
apolloServer.start().then(()=>{
	
apolloServer.applyMiddleware({app})
   console.log(dbConnection)
   connect(dbConnection,()=>console.log("db is connected successfully"))
   app.listen(port,()=>console.log(`server is listening on port ${port}`))
})
})()
