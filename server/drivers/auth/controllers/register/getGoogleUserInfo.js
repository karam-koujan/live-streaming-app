const {OAuth2Client} = require("google-auth-library");
const {clientId} = require("../../../../config/keys/keys")
const BaseController = require("../../../../utils/baseController/index.js")

class GetGoogleUserInfo extends BaseController{
    constructor(){
        super()
    }
    async logic(req,res){
        const authClient = new OAuth2Client()
        const {token} = req.query
        try{
            const ticket = await authClient.verifyIdToken({
                idToken:token,
                audient :clientId
            })     
            const {name,email} = ticket.getPayload();
             return super.Ok(res,{userName:name,email})
        }catch{
            super.fail(res)
        }
    }

}

exports.getGoogleUserInfo = new GetGoogleUserInfo()
