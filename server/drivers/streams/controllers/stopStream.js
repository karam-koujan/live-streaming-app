const { deleteStream } = require("../../../data__access/stream");
const BaseController = require("../../../utils/baseController");





class StopStream extends BaseController{
    constructor(){
        super()
    }
    async logic(req,res){
        const {_id} = req.user;
        const {error,dbErr,stream}  = await deleteStream({streamer:_id})
           if(!error&&!dbErr){
               return super.Ok(res,{message:"the stream is stopped successfully",stream})
           }
           if(error&&dbErr){
              return super.fail(res)
           }
    }
}


module.exports = new StopStream()