const BaseController = require("../../../utils/baseController")
const validation = require("../../../utils/dataValidator");
const {addStream, findStream} = require("../../../data__access/stream");
const config  = require("../../../config/default");
class CreateNewStream extends BaseController{
    constructor(){
        super()
    }

    async logic(req,res){
        const stream = req.body;
        const {streamKey,_id} = req.user
        const findStreamById =  await findStream({_id});
        if(findStreamById.stream!==null){
           return super.Forbidden(res,{message:"the stream is already lauanched"})
        }
        if(findStreamById.dbErr){
            return super.fail(res)
        }
        const streamLink= `${config.rtmp_server.http.hostName}:${config.rtmp_server.http.port}/live/${streamKey}.flv`;
        const date = new Date(); 
        const now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
         date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        const {error,dbErr} = await addStream({...stream,date:new Date(now_utc),streamLink,streamer:_id})
        if(error){
           return super.BadRequest(res)
        }
        if(dbErr){
            return super.fail(res)
        }
        return super.Ok(res,{message:"stream is created"})

    }
    validateClientInput(req,res,next){
        const userInput =req.body
      const {error} = validation(userInput)
      if(error){
         return super.BadRequest(res,{message:error})
      }
      next()
    }
}

module.exports = new CreateNewStream()