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
        const findUserByEmail = await findUser({email})

        if(findUserByEmail.user!==null){
            return super.Forbidden(res,findUserByEmail.message)
        }
        if(userEmail.dbErr){
            return super.fail(res)
        }
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
      try{
         const {message,error,dbErr} = await addUser(newUser)
         if(dbErr||error){
            return super.fail(res,message)
             }
                             
           return super.Created(res,{message,token})
            }catch{
                  return super.fail(res)
              }
        
    }
    validateClientInput(req,res,next){
        const data = req.body
        console.log(data)
        const userValidation = validator(userRegisterWithGoogleSchema)(data)
    if(userValidation.error){
       return  super.UnAuthorized(res,userValidation.error)
     }
     next()
    }
}


exports.registerWithGoogleController = new RegisterWithGoogleController()