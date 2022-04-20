const bcrypt = require('bcrypt');
const {findUser} = require("../../../../data__access/user");
const validator = require('../../../../utils/dataValidator');
const userLoginSchema = require("../../validation/userLogin-schema");
var jwt = require('jsonwebtoken');
const { tokenKey} = require('../../../../config/keys/keys');
const BaseController = require("../../../../utils/baseController/");



class LoginController extends BaseController{
    constructor(){
        super()
    }
    async logic(req,res){
        const {userName,email,password} = req.body ;
        try{
        const {user,dbErr} = await findUser({userName,email})
        if(dbErr){
           return super.fail(res)
        }
        if(user===null){
             return super.Forbidden(res,{message:'wrong userName, email or password'})
         }
         const isCorrectPassword = await bcrypt.compare(password,user.password)
         if(!isCorrectPassword){
            return super.Forbidden(res,{message:'wrong userName, email or password'})
         }
         const token = jwt.sign({_id:user._id},tokenKey)
         user.password=undefined;
        return super.Ok(res,{token,message:"login is successfull",user})
        }catch{
           return super.fail(res)
        }


    }
    validateClientInput(req,res,next){
      const data = req.body ; 
      const userValidation = validator(userLoginSchema)(data)
      if(userValidation.error){
         super.UnAuthorized(res,{message:userValidation.error})
      }
      next()
    }
}
exports.loginController = new LoginController()
