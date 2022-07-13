import { Request,Response } from "express"
import { verify,sign} from "jsonwebtoken"
import { User } from "./model/User";
const {refreshTokenKey,tokenKey} = require("./config"); 


const getRefreshToken = async(req:Request,res:Response)=>{
       const refreshToken = req.cookies.jid
       if(!refreshToken){
          return res.status(403).json({
            Ok:false,
            message:"invalid token"
          })
       }
       try{ 
           const payload = verify(refreshToken as string,refreshTokenKey) as any
           const newRefreshToken = sign({email:payload.email},refreshTokenKey,{expiresIn:"7d"})
           res.cookie("jid",newRefreshToken,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            maxAge:30*24*60*60*1000
           })
           const user = await User.findOne({email:payload.email})
           const token = sign({userId:user?._id},tokenKey,{expiresIn:"5m"})
          return res.json({
            authToken:`Bearer ${token}`
           })
        }catch{
         return res.status(403).json({
            Ok:false,
            message:"invalid token"
          })       
         }
} 

export default getRefreshToken