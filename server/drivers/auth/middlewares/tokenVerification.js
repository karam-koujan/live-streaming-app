const jwt = require("jsonwebtoken");
const {tokenKey} = require("../../../config/keys/keys");
const {findUser} = require("../../../data__access/user/index");
exports.tokenVerification = async(req,res,next)=>{
    let token = req.headers.token;
    let googleToken = req.headers.googleToken ; 
    
    if(googleToken){
       console.log("google token",googe)
      const {user,dbErr}  = await findUser({googleToken})
      if(user===null){
        return res.status(400).json({
            error: true,
            message:"invalid google token"     
        })
      }
      if(dbErr){
        return res.status(500).json({
            error: true,
            message:"internal server error"     
        })
      }
      req.user = user ; 
      next()
    }
    console.log("token",token)
    if(!token.startsWith('Bearer')){       
       return res.status(400).json({
           error: true,
           message:"invalid token"     
       })
    }
    token = token.substring(7,token.length)  
    const {_id} = jwt.verify(token,tokenKey)
      const {user,dbErr} =  await findUser({_id})
      if(user===null){
        return res.status(400).json({
            error: true,
            message:"invalid token"     
        })
      }
      if(dbErr){
        return res.status(500).json({
            error: true,
            message:"internal server error"     
        })
      }
      user.password=""
      req.user = user
      next()

    
    
        
      
}