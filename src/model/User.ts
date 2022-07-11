import { model, Schema } from "mongoose";


const validateEmail = (email:string)=>{
    const reExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reExp.test(email)
}

const userSchema = new Schema({
    userName:String,
    email:{
        type:String,
        unique:true,
        validate : [validateEmail,'invalid email']
    },
    password:String
})

export const User = model("user",userSchema);