const bcrypt = require('bcrypt');
const {addUser,findUser} = require("../../../data__access/user");
const validator = require('../../../utils/dataValidator');
const userRegisterSchema = require("../validation/userRegister-schema");
const userRegisterWithGoogleSchema = require("../validation/userRegisterWithGoogle")
const {ServerError,Forbidden,BadRequest} = require("../../../utils/httpError");
const {OAuth2Client} = require("google-auth-library");
const {clientId} = require("../../../config/keys/keys")
const shortId = require("shortid");
const saltRounds = 10;



exports.registerController = async(req,res)=>{

    const {password,userName,email,socialMedia,...rest} = req.body;
    const userValidation = validator(userRegisterSchema)({password,userName,email,socialMedia,...rest})
    if(userValidation.error){
         const {statusCode,error} = new BadRequest("invalid input")
        return res.status(statusCode).json({error,message:userValidation.error})
     }
    const {user,dbErr} = await findUser({userName})
    const serverError = new ServerError("internal server error")
    const forbiddenUser = new Forbidden("this userName is already existed")
    if(user!==null){
       return res.status(forbiddenUser.statusCode).json({
           error:forbiddenUser.error,
           message:forbiddenUser.message
        })
    }
    if(dbErr){
        return res.status(serverError.statusCode).json({
            error:serverError.error,
            message:serverError.message
         })
    }
    const userEmail = await findUser({email})

    if(userEmail.user!==null){
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
 bcrypt.hash(password,saltRounds).then(async(hash)=>{
     if(!hash){
        return res.status(serverError.statusCode).json({
             error:serverError.error,
             message:serverError.message
         })
     }
    const streamKey = shortId.generate();

const socialMediaList = socialMedia.map(url=>{
     const socialMediaObj = {}
    const domain = new URL(url);
    const name = domain.hostname.replace("www.","").split(".")[0];
    socialMediaObj["name"] = name ;
    socialMediaObj["link"] = url;
    return socialMediaObj
 })
    const newUser = {
        userName,
        email,
        streamKey,
        password:hash,
        socialMedia:socialMediaList,
        ...rest
    }

    const {message,error,dbErr} = await addUser(newUser)
     if(dbErr||error){
         return res.status(serverError.statusCode).json({error:serverError.error,message:serverError.message})
     }   
    return  res.status(201).json({error:false,message})
 })   
}

const authClient = new OAuth2Client({
    clientId 
})


exports.getUserInfoByGoogleIdController =async(req,res)=>{
    const {token} = req.query
    try{
        const ticket = await authClient.verifyIdToken({
            idToken:token,
            audient :clientId
        })     
        const {name,email} = ticket.getPayload();
    
        return res.json({userName:name,email})
    }catch(_){
        return res.status(serverError.statusCode).json({
            error:serverError.error,
            message:serverError.message
         })
    }
}
exports.registerWithGoogleController = async(req,res)=>{
    const {userName,email,socialMedia,token,...rest} = req.body ;
    const userValidation = validator(userRegisterWithGoogleSchema)({userName,email,socialMedia,...rest})
    if(userValidation.error){
         const {statusCode,error} = new BadRequest("invalid input")
        return res.status(statusCode).json({error,message:userValidation.error})
     }
   const userEmail = await findUser({email})

   if(userEmail.user!==null){
       const forbiddenUser = new Forbidden("this email is already existed")
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
   const streamKey = shortId.generate();

   const socialMediaList = socialMedia.map(url=>{
        const socialMediaObj = {}
       const domain = new URL(url);
       const name = domain.hostname.replace("www.","").split(".")[0];
       socialMediaObj["name"] = name ;
       socialMediaObj["link"] = url;
       return socialMediaObj
    })
   const newUser = {
    userName,
    email,
    socialMedia:socialMediaList,
    streamKey,
    ...rest
}

const {message,error,dbErr} = await addUser(newUser)
 if(dbErr||error){
     return res.status(serverError.statusCode).json({error:serverError.error,message:serverError.message})
 }   
return  res.status(201).json({error:false,message,token})
}

