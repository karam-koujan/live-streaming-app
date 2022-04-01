const bcrypt = require('bcrypt');
const {findUser} = require("../../../data__access/user");
const validator = require('../../../models/validator');
const userLoginSchema = require("../validation/userLogin-schema");
var jwt = require('jsonwebtoken');
const { tokenKey} = require('../../../config/keys/keys');
const {BadRequest, ServerError,Forbidden} = require("../../utils/error");



const loginController = async(req,res)=>{
    const userInput = req.body;
    const userValidation = validator(userLoginSchema)(userInput)
     if(userValidation.error){
         const {statusCode,error,message} = new BadRequest("invalid input")
        return res.status(statusCode).json({error,message})
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
  module.exports = loginController