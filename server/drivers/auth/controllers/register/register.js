const bcrypt = require('bcrypt');
const {addUser,findUser} = require("../../../../data__access/user");
const validator = require('../../../../utils/dataValidator');
const {userRegisterSchema} = require("../../validation");
const BaseController = require("../../../../utils/baseController/index.js")
const {getSocialMediaNameFromLink} = require("../helpers");
const shortId = require("shortid");

class RegisterController extends BaseController{
    constructor(){
         super()
    }
    async logic(req,res){
         const {password,userName,email,socialMedia,...rest} = req.body;
         const findUserByUserName = await findUser({userName});  
         const findUserByEmail = await findUser({email});
         if(findUserByUserName.user!==null){
             console.log("er")
             return super.Forbidden(res,{message:"this username is already existed"})
          }
          if(findUserByEmail.user){
             return super.Forbidden(res,{message:"this email is already existed"})
          }
          if(findUserByUserName.dbErr){
              return super.fail(res)
          }
         try{
             const saltRounds = 10;
             const hashedPassword = await bcrypt.hash(password,saltRounds)
             const streamKey = shortId.generate();
             const socialMediaList = getSocialMediaNameFromLink(socialMedia)
             const newUser = {  
                 userName,
                   email,
                   streamKey,
                   password:hashedPassword,
                   socialMedia:socialMediaList,
                   ...rest
                 }
 
     const {message,error,dbErr} = await addUser(newUser)
      if(dbErr||error){
       return  super.fail(res,message)
      }   
         return super.Created(res)
         }catch(err){
            return  super.fail(res)
         }
 
     }
 
   
     validateClientInput(req,res,next){
         const data = req.body;
         const userValidation = validator(userRegisterSchema)(data);
         console.log(data,userValidation)
         if(userValidation.error){
            
             return super.UnAuthorized(res,{message:userValidation.error})
             
          }
          next()
     }
   
 }
 exports.registerController = new RegisterController()
