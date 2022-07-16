import {ObjectType,Field} from "type-graphql";


interface responseMsg{
    Ok:boolean;
    [key:string]:any;
}

@ObjectType()
class LoginType implements responseMsg{
    @Field()
    Ok: boolean;
    @Field()
    authToken:string;
    
}

export {
    LoginType
}