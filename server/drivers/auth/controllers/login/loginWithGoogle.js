const {findUser} = require("../../../../data__access/user");
const {OAuth2Client} = require("google-auth-library");
const {clientId} = require("../../../../config/keys/keys")
const BaseController = require("../../../../utils/baseController/");




class LoginWithGoogle extends BaseController{
    constructor(){
        super()
    }
    async logic(req,res){
        const authClient = new OAuth2Client({
            clientId 
        })
        const {token} = req.body;
        try{
            const ticket = await authClient.verifyIdToken({
                idToken:token,
                audient :clientId
            })     
            const {email} = ticket.getPayload();
        
            const findUserByEmail = await findUser({email,googleAccount:true})
            if(findUserByEmail.user===null){
                return super.Forbidden(res,{message:"please create account before you login"})
            }
            if(findUserByEmail.dbErr){
                return super.fail(res)
            }
            return super.Ok(res,{token,message:"login is successfull"})
        }catch{
            return super.fail(res)
        }
    }
}



exports.loginWithGoogle = new LoginWithGoogle()