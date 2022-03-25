const {modifyUser} = require("../../data__access/user/")
const shortId = require("shortid");


exports.generate_stream_key= async(req,res)=>{
    const streamKey = shortId.generate();
    const {dbErr} = await modifyUser({_id:req.user._id},{streamKey})
    if(dbErr){
       return res.status(500).json({
            error : true,
            message : "internal server error" 
        })
    }
    return res.json({
        error:false,
        message:"create new stream key"
    })
 }