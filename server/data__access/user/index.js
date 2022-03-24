const makeUser = require("../../models/user/");
const User = require("../../db/mongodb/model/user")

exports.addUser = async(userInfo)=>{
 const user = makeUser(userInfo);
  if(user.error){
       return {error:true,message:"invalid input",dbErr:false}
  }
  const newUser = await User(user)
  try{
      await newUser.save()
      return {error:false,message:"user is created successfully",dbErr:false}
  }catch(err){
      return {error:true,dbErr:true,message:"db error"}
  }
}

exports.findUser = async(filter)=>{
  try{
      const user = await User.findOne(filter);
      return {error:false,user,dbErr:false}
  }catch(err){
    return {error:true,dbErr:true,message:"db error"}
  }
}