import Context from "../types/context";
import {verify} from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
const {accessTokenKey} = require("../config/");


const isAuth:Middleware<Context> = async ({context},next)=>{
     const authorization = context.req.headers.authorization;
     if(!authorization){
          throw new Error("invalid token")
     }
	try{
          const token = authorization.split(" ")[1];	
          const payload = verify(token,accessTokenKey);
          context.payload = payload as any
          
     }catch{
          throw new Error("invalid token")
     }
     
     return next()
	
    
      
      }
      
export default isAuth
