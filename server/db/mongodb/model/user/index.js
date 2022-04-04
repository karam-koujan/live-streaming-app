const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
     userName : String,
     email: String ,
     password : String ,
     followers : [{id:{type:ObjectId,ref:'User'}}],
     followings : [{id:{type:ObjectId,ref:'User'}}],
     profileImg :{type:String,default:"no picture"},
     profileBackgroundImg : {type:String,default:"no picture"},
     streamKey:String,
     rules : [{type:String}],
     aboutMe: {type:String,default:""},
     socialMedia:[{name:String,link:{type:String,validate:/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i}}] 
})

module.exports = mongoose.model('User',userSchema)