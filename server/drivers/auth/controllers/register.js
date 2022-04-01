const bcrypt = require('bcrypt');
const {addUser,findUser} = require("../../../data__access/user");
const {ServerError,Forbidden} = require("../../utils/error");
const shortId = require("shortid");
const saltRounds = 10;


const registerController = async(req,res)=>{

    const {password,userName,email} = req.body;
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
    const newUser = {
        userName,
        email,
        streamKey,
        password:hash
    }

    const {message,error,dbErr} = await addUser(newUser)
     if(dbErr){
         return res.status(serverError.statusCode).json({error:serverError.error,message:serverError.message})
     }   
    return  res.status(201).json({error,message})
 })   
}

module.exports = registerController ;