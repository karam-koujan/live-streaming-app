const {addUser,findUser} = require("../../../../data__access/user");
const validator = require('../../../../utils/dataValidator');
const {userRegisterWithGoogleSchema} = require("../../validation/");
const BaseController = require("../../../../utils/baseController/index.js")
const {getSocialMediaNameFromLink} = require("../helpers");
const shortId = require("shortid");



class RegisterWithGoogleController extends BaseController{
    constructor(){
        super()
    }
    
    async logic(req,res){
        const {userName,email,socialMedia,token,...rest} = req.body ;
        const findUserByEmail = await findUser({email,googleAccount:true})

        if(findUserByEmail.user!==null){
            return super.Forbidden(res,{message:"this email is already existed"})
        }
        if(findUserByEmail.dbErr){
            return super.fail(res)
        }
        const streamKey = shortId.generate();
        const socialMediaList = getSocialMediaNameFromLink(socialMedia)
    
        const newUser = {  
            userName,
              email,
              streamKey,
              socialMedia:socialMediaList,
              googleAccount:true,
              googleToken:token,
              ...rest
            }
            console.log(newUser)
      try{
         const {message,error,dbErr} = await addUser(newUser)
         if(dbErr||error){
            return super.fail(res,message)
             }
                             
           return super.Created(res,{token})
            }catch{
                  return super.fail(res)
              }
        
    }
    validateClientInput(req,res,next){
        const data = req.body
        console.log(data)
        const userValidation = validator(userRegisterWithGoogleSchema)(data)
    if(userValidation.error){
       return  super.UnAuthorized(res,{message:userValidation.error})
     }
     next()
    }
}


exports.registerWithGoogleController = new RegisterWithGoogleController()