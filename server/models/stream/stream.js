
const buildMakeStream = (streamValidator)=>{
    return (stream) =>{
        const {error} = streamValidator(stream)
        if(error){
          return {error:true}
        }
        return {...stream,error:false}
    }
}

module.exports = buildMakeStream;