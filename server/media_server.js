const config = require("./config/default");
const NodeMediaServer = require("node-media-server");


const nms = new NodeMediaServer(config.rtmp_server)

nms.on("rePublish",async(id,StreamPath,args)=>{
    const stream_key = getStreamKeyFromStreamPath(StreamPath)
    console.log("stream info : "`id=${id}  StreamPath=${StreamPath} streamKey=${stream_key} args=${JSON.stringify(args)}`)
   console.log("stream key",stream_key)
})

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
module.exports = nms ;