const config = require("../../config/default");
const NodeMediaServer = require("node-media-server");
const {findUser} = require("../../data__access/user")

const nms = new NodeMediaServer(config.rtmp_server)

nms.on("rePublish",async(id,StreamPath,args)=>{
    const stream_key = getStreamKeyFromStreamPath(StreamPath)
    const {user,dbErr} = findUser({streamKey:stream_key})
    const session = nms.getSession(id);
    if(dbErr){
       session.reject()
    }else{
        if(user===null){
            session.reject();
        }
        
    }
    console.log("stream info : "`id=${id}  StreamPath=${StreamPath} streamKey=${stream_key} args=${JSON.stringify(args)}`)
   console.log("stream key",stream_key)
})

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
module.exports = nms ;