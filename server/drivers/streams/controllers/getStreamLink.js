const BaseController = require("../../../utils/baseController");
const config = require("../../../config/default");


 class GetStreamLink extends BaseController{
         constructor(){
              super()
         }
      async logic(req,res){
          const {streamKey} = req.user
        const streamLink= `http://${config.rtmp_server.http.hostName}:${config.rtmp_server.http.port}/live/${streamKey}.flv`;

        return super.Ok(res,{streamLink})
      }
 }
 

module.exports = new GetStreamLink();

