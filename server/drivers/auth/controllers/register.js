const bcrypt = require('bcrypt');
const {addUser,findUser} = require("../../../data__access/user");
const validator = require('../../../utils/dataValidator');
const userRegisterSchema = require("../validation/userRegister-schema")
const {ServerError,Forbidden,BadRequest} = require("../../../utils/httpError");
const shortId = require("shortid");
const saltRounds = 10;


const registerController = async(req,res)=>{

    const {password,userName,email,socialMedia,...rest} = req.body;
    const userValidation = validator(userRegisterSchema)({password,userName,email,socialMedia,...rest})
    if(userValidation.error){
         const {statusCode,error,message} = new BadRequest("invalid input")
        return res.status(statusCode).json({error,message})
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

module.exports = registerController ;