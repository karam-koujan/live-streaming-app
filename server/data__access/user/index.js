const makeUser = require("../../models/user/");
const User = require("../../db/mongodb/model/user")

exports.addUser = async(userInfo)=>{
 const user = makeUser(userInfo);
  if(user.error){
       return {error:true,message:"invalid input",statusCode:400}
  }
  const newUser = await User(user)
  try{
      await newUser.save()
      return {error:false,message:"user is created successfully",statusCode:201}
  }catch(err){
      console.log(err)
      return {error:true,message:"internal server error",statusCode:500}
  }
}

exports.findUser = async(filter)=>{
  try{
      const user = await User.findOne(filter);
      return {error:false,user}
  }catch(err){
    console.log(err)
    return {error:true,message:"internal server error",statusCode:500}
  }
}