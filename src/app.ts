import express from "express"; 
import {ApolloServer} from "apollo-server-express";
import { UserResolver } from "./userResolver";
import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {connect} from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const {dbConnection} = require("./config/"); 
import refreshToken from "./refreshToken";

(async()=>{
const app = express() 
const port = process.env.NODE_ENV || 8000 ; 

const apolloServer = new ApolloServer({
  schema : await buildSchema({
     resolvers : [UserResolver]  
    }),
  context : ({req,res})=>({req,res}),

})
app.use(cookieParser())
apolloServer.start().then(()=>{
apolloServer.applyMiddleware({app,cors:{origin:"https://studio.apollographql.com",credentials:true}})
   app.get("/refresh_token",refreshToken)
   console.log(dbConnection)
   connect(dbConnection,()=>console.log("db is connected successfully"))
   app.listen(port,()=>console.log(`server is listening on port ${port}`))
})
})()
