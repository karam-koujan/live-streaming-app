import "reflect-metadata";
import  {Arg, Mutation, ObjectType, Query, Resolver,Field, Ctx, UseMiddleware} from "type-graphql" ;
import {User} from "./model/User";
import Joi from "@hapi/joi";
import {hash,compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import Context from "./types/context";
import isAuth from "./isAuth";
const {tokenKey,refreshTokenKey} = require("./config/");
/*
 {
    userName
    email
    password 
 }
*/
interface userType{
 userName:string;
 email:string;
 password:string
}
interface responseMsg{
    Ok:boolean;
    [key:string]:any;
}
@ObjectType()
class UserType implements userType{
    @Field()
    userName : string;
    @Field()
    email:string;
    @Field()
    password: string;
}
@ObjectType()
class LoginRes implements responseMsg{
    @Field()
    Ok: boolean;
    @Field()
    authToken:string;
    
}

@Resolver()
export class UserResolver{
    @Query(()=>String)
    @UseMiddleware(isAuth)
    hello(@Ctx() {req}:Context){
        console.log(req.cookies)
        return "hi"
    }
    @Mutation(()=>String)
   async register(
     @Arg("userName")userName:string,   
     @Arg("email")email:string,
     @Arg("password")password:string
    ){  
        const inputSchema  = Joi.object({
            userName : Joi.string(),
            email : Joi.string().email(),
            password : Joi.string().min(8)
        })
        try{
            await inputSchema.validateAsync({userName,email,password})
            const isEmailExist =  await User.findOne({email})
            const isUserNameExist = await  User.findOne({userName})
            if(isEmailExist!==null){
               throw new Error("the email has already existed")
            } 
            if(isUserNameExist!==null){
                throw new Error("userName has already existed")

            }
            const salt = 10;
            const passwordHash =  await hash(password,salt) 
            const user = new User({userName,email,password:passwordHash})
            await user.save()
              return "register is successfully"
        }catch(err:any){
            throw new Error(err)
        }
    }
    @Mutation(()=>LoginRes) 
    async Login(@Arg("email") email:string,@Arg("password") password:string,@Ctx() {res}:Context){
        const inputSchema  = Joi.object({
            email : Joi.string().email(),
            password : Joi.string().min(8)
        })
        try{
            await inputSchema.validateAsync({email,password})
            const user =  await User.findOne({email})
            if(user===null){
               throw new Error("the email or password is wrong")
            }

         const isCorrectPassword = await compare(password,user.password!)
         if(!isCorrectPassword){
              throw new Error("the email or password is wrong")
         }
         
         const refreshToken = sign({email:user.email},refreshTokenKey,{expiresIn:"7d"})
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            maxAge:30*24*60*60*1000
        })
        const token = sign({userId:user._id!},tokenKey,{expiresIn:"5m"});
         
         return {Ok:true,authToken:`Bearer ${token}`}
       }catch(err:any){
        throw new Error(err)
       }
    }
}
