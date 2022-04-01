const config = require("../../config/default");
const NodeMediaServer = require("node-media-server");
const {findUser} = require("../../data__access/user")

const nms = new NodeMediaServer(config.rtmp_server)

nms.on("prePublish",async(id,StreamPath,args)=>{
    const stream_key = getStreamKeyFromStreamPath(StreamPath)
    const {user,dbErr} = await findUser({streamKey:stream_key})
    const session = nms.getSession(id);
    if(dbErr|| user===null){
       session.reject()
    }
})

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
module.exports = nms ;