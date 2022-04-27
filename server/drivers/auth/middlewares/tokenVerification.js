const jwt = require("jsonwebtoken");
const {tokenKey,clientId} = require("../../../config/keys/keys");
const {OAuth2Client} = require("google-auth-library");
const {findUser} = require("../../../data__access/user/index");
const authClient = new OAuth2Client()
exports.tokenVerification = async(req,res,next)=>{
    let token = req.headers.token;
    let googleToken = req.headers.googletoken ; 
    console.log(req.headers)

    console.log("google token",googleToken)
    if(googleToken){
      try{
        const ticket = await authClient.verifyIdToken({
            idToken:googleToken,
            audient :clientId
        })     
        const {email} = ticket.getPayload();

    const {user,dbErr}  = await findUser({email})
    console.log(user)
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
    
   return next()
  }catch(err){
    console.log(err)
    next()
  }
    }
  
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