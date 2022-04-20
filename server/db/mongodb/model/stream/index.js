const mongoose = require("mongoose");



const StreamSchema = mongoose.Schema({
    title:String,
    tags:[{type:String}],
    type:String,
    streamLink:{type:String,validate:/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i},
    date: Date 
})


module.exports = mongoose.model("Stream",StreamSchema)