const makeStream = require("../../models/stream");
const Stream = require("../../db/mongodb/model/stream")

exports.addStream = async(streamInfo)=>{
 const stream = makeStream(streamInfo);
  if(stream.error){
       return {error:true,message:"invalid input",dbErr:false}
  }
  const newStream = await Stream(stream)
  try{
      await newStream.save()
      return {error:false,message:"stream is created successfully",dbErr:false}
  }catch(err){
      return {error:true,dbErr:true,message:"db error"}
  }
}

exports.findStream = async(filter)=>{
  try{
      const stream = await Stream.findOne(filter);
      return {error:false,stream,dbErr:false}
  }catch(err){
    return {error:true,dbErr:true,message:"db error"}
  }
}

exports.modifyStream = async(filter,newInfo)=>{
  try{
    const stream = await Stream.findOneAndUpdate(filter,newInfo);
    return {error:false,stream,dbErr:false}
}catch(err){
  return {error:true,dbErr:true,message:"db error"}
}
}