const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
     userName : String,
     email: String ,
     password : String ,
     followers : [{id:{type:ObjectId,ref:'User'}}],
     followings : [{id:{type:ObjectId,ref:'User'}}],
     profileImg :{type:String,default:"no picture"},
     profileBackgroundImg : {type:String,default:"no picture"} 
})

module.exports = mongoose.model('User',userSchema)