import { sign } from "jsonwebtoken";
const {accessTokenKey,accessTokenExpiresIn,refreshTokenKey,refreshTokenKeyExpiresIn} = require("../config");


const generateAccessToken = (payload:string|object|Buffer)=>{
   return sign(payload,accessTokenKey,{expiresIn:accessTokenExpiresIn})
}
const generateRefreshToken = (payload:string|object|Buffer)=>{
  return sign(payload,refreshTokenKey,{expiresIn:refreshTokenKeyExpiresIn})
}

export {
    generateAccessToken,
    generateRefreshToken
}