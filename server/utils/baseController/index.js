


class BaseController{
     constructor(){
         
     }
    
    
     
     static JsonResponse(res,code,payloadObj){
        return res.status(code).json(payloadObj)
    }
   
    

     Ok(res,{message,...rest}){
       return  BaseController.JsonResponse(res,200,{message:message?message:'Request is Successfull',error:false,...rest})
    }
     Created(res,{message,...rest}){
        return  BaseController.JsonResponse(res,201,{message:message?message:'Request is Successfull',error:false,...rest})
    }
     NotFound(res,{message,...rest}){
        return  BaseController.JsonResponse(res,404,{message:message?message:'Not Found',error:true,...rest})

    }
     Forbidden(res,{message,...rest}){
        return  BaseController.JsonResponse(res,403,{message:message?message:'Forbidden',error:true,...rest})
   }
    UnAuthorized(res,{message,...rest}){
     return  BaseController.JsonResponse(res,401,{message:message?message:'UnAuthorized',error:true,...rest})
  }
   BadRequest(res,{message,...rest}){
    return  BaseController.JsonResponse(res,400,{message:message?message:'Bad Request',error:true,...rest})
}
     fail(res,error){
        console.log(error) 
        return BaseController.JsonResponse(res,error?error.toString():"internal server error",500,true)
    }
}
module.exports = BaseController;