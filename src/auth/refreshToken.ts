import { Request,Response } from "express"
import { verify} from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "./generateToken";
import { User } from "../model/User";
const {refreshTokenKey} = require("../config"); 


const getRefreshToken = async(req:Request,res:Response)=>{
       const refreshToken = req.cookies.jid
       if(!refreshToken){
          return res.status(403).json({
            Ok:false,
            message:"invalid token"
          })
       }
       try{ 
           const refreshTokenPayload = verify(refreshToken as string,refreshTokenKey) as any
           const newRefreshToken = generateRefreshToken({email:refreshTokenPayload.email})
           res.cookie("jid",newRefreshToken,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            maxAge:30*24*60*60*1000
           })
           const user = await User.findOne({email:refreshTokenPayload.email})
           const token = generateAccessToken({userId:user?._id})
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