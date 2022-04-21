const BaseController = require("../../../utils/baseController")


class GetProfileInfo extends BaseController{
    constructor(){
        super()
    }
    async logic(req,res){
       const user = req.user;
       user.password= undefined

       return super.Ok(res,{user})
    }
}

module.exports = new GetProfileInfo()