const bcrypt = require('bcrypt');
const {findUser} = require("../../../data__access/user");
const validator = require('../../../utils/dataValidator');
const userLoginSchema = require("../validation/userLogin-schema");
var jwt = require('jsonwebtoken');
const { tokenKey} = require('../../../config/keys/keys');
const {BadRequest, ServerError,Forbidden} = require("../../../utils/httpError");
const {OAuth2Client} = require("google-auth-library");
const {clientId} = require("../../../config/keys/keys")



exports.loginController = async(req,res)=>{
    const userInput = req.body;
    const userValidation = validator(userLoginSchema)(userInput)
     if(userValidation.error){
         const {statusCode,error} = new BadRequest("invalid input")
        return res.status(statusCode).json({error,message:userValidation.error})
     }
     
     const {user,dbErr} = await findUser({userName:userInput.userName,email:userInput.email})
     if(dbErr){
      const {statusCode,error,message} = new ServerError("internal server error")
      return res.status(statusCode).json({error,message})
  }   
  const wrongUserCredentials = new Forbidden("wrong useName, email or password")
     if(user===null){
        return res.status(wrongUserCredentials.statusCode).json({
             error:wrongUserCredentials.error,
             message:wrongUserCredentials.message
         })
     }
    
    bcrypt.compare(userInput.password,user.password).then(result=>{
      
      if(!result){
          return res.status(wrongUserCredentials.statusCode).json({
              error:wrongUserCredentials.error,
              message:wrongUserCredentials.message
          })
                 
      }
      const token = jwt.sign({_id:user._id},tokenKey)
      return res.json({
          error:false,
          message:"login is successfull",
          token
      })
    })
    
  }
  
const authClient = new OAuth2Client({
    clientId 
})

exports.loginWithGoogle = async(req,res)=>{
        const {token} = req.body;
        const serverError = new ServerError("internal server error")
        try{
            const ticket = await authClient.verifyIdToken({
                idToken:token,
                audient :clientId
            })     
            const {email} = ticket.getPayload();
        
            const userEmail = await findUser({email})
            if(userEmail.user!==null){
                const forbiddenUser = new Forbidden("the email is already existed")
                return res.status(forbiddenUser.statusCode).json({
                    error:forbiddenUser.error,
                    message:forbiddenUser.message
                 })
            }
            if(userEmail.dbErr){
                return res.status(serverError.statusCode).json({
                    error:serverError.error,
                    message:serverError.message
                 })
            }
            return res.json({error:false,token})
        }catch(_){
            return res.status(serverError.statusCode).json({
                error:serverError.error,
                message:serverError.message
             })
        }
  }
