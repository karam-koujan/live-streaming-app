const bcrypt = require('bcrypt');
const {addUser,findUser} = require("../../data__access/user/");
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
   
   const {user,error,dbErr} = await findUser({userName:userInput.userName,email:userInput.email})
   if(dbErr){
    return res.status(500).json({error,message:"internal server error"})
}   
   if(user===null){
      return res.status(400).json({
           error:true,
           message:"wrong password or email"
       })
   }
  
  bcrypt.compare(userInput.password,user.password).then(result=>{
    
    if(!result){
          return res.status(400).json({
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

    const {password,userName,email,...rest} = req.body;
    const {user,dbErr} = await findUser({userName})
    if(user!==null){
       return res.status(400).json({
           error:true,
           message:"this userName is already existed"
        })
    }
    if(dbErr){
        return res.status(500).json({
            error:true,
            message:"internal server"
         })
    }
    const userEmail = await findUser({email})
    console.log(userEmail)

    if(userEmail.user!==null){
       return res.status(400).json({
           error:true,
           message:"this email is already existed"
        })
    }
    if(userEmail.dbErr){
        return res.status(500).json({
            error:true,
            message:"internal server"
         })
    }
 bcrypt.hash(password,saltRounds).then(async(hash)=>{
     if(!hash){
        return res.status(500).json({
             error:true,
             message:"internal server error"
         })
     }
    const newUser = {
        ...rest,
        password:hash
    }
    const {message,error,dbErr} = await addUser(newUser)
     if(dbErr){
         return res.status(500).json({error,message:"internal server error"})
     }   
    return  res.status(201).json({error,message})
 })   
}