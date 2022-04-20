const {modifyUser} = require("../../../data__access/user")
const BaseController = require("../../../utils/baseController");
const shortId = require("shortid");



 class Generate_stream_key extends BaseController{
         constructor(){
              super()
         }
      async logic(req,res){
        const streamKey = shortId.generate();
        const {dbErr} = await modifyUser({_id:req.user._id},{streamKey})
        if(dbErr){ 
           return super.fail(res)
        }
        return super.Ok(res,{message:"stream key is changed successfully",streamKey})
      }
 }
 

module.exports = new Generate_stream_key();