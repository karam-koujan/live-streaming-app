const bcrypt = require('bcrypt');
const {addUser} = require("../../data__access/user/");
const { findOne } = require('../../db/mongodb/model/user');
const validator = require('../../models/validator');
const userLoginSchema = require("./validation/userLogin-schema");
var jwt = require('jsonwebtoken');
const { tokenKey } = require('../../config/keys/keys');
const saltRounds = 10;

exports.loginController = async(req,res)=>{
  const userInput = req.body;
  const userValidation = validator(userLoginSchema)(userInput)
   if(userValidation.error){
      return res.status(400).json({
          error:true,
          message:"invalid input"
      })
   }
   
   const user = await findOne({userName:userInput.userName,email:userInput.email})
   
   if(user.error){
      return res.json({
           error:true,
           message:"wrong password or email"
       })
   }
  
  bcrypt.compare(userInput.password,user.password).then(result=>{
      if(!result){
          return res.json({
              error:true,
              message:"wrong password or email"
          })
               
    }
    const token = jwt.sign({_id:user._id},tokenKey)
    return res.json({
        error:false,
        message:"login successfull",
        token
    })
  })
  
}
exports.registerController = async(req,res)=>{
 const {password,...rest} = req.body;
 bcrypt.hash(userInfo.password,saltRounds).then((hash)=>{
     if(!hash){
        return res.status(500).json({
             error:true,
             message:"internal server error"
         })
     }
    const newUser = {
        rest,
        password:hash
    }
    const {message,statusCode} = await addUser(newUser)
       return  res.status(statusCode).json(message)
 })   
}