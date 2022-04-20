const buildMakeStream = require("./stream")
const streamValidation = require("../../utils/dataValidator")


describe("test stream buildMakeStream",()=>{
     
     it("build successfully",()=>{
        const streamInput= {
            title : "coding stream",
            tags:["tech"],
            type:"science and technologie",
            streamLink:"http://127.0.0.1/live/streamKey.flv",
            date:new Date.now()
        }
        const stream =  buildMakeStream(streamValidation)(streamInput);
        const output = {...streamInput,error:false}
            expect(stream).toEqual(output)
     })

})