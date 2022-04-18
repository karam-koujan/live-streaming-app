


class BaseController{
     constructor(){
         
     }
    
    
     
     static JsonResponse(res,message,code,error){
        return res.status(code).json({
            error,
            message
        })
    }
   
    

     Ok(res,message){
       return  BaseController.JsonResponse(res,message?message:'Request is Successfull',200,false)
    }
     Created(res,message){
        return  BaseController.JsonResponse(res,message?message:'Request is successfull',200,false)
    }
     NotFound(res,message){
        return  BaseController.JsonResponse(res,message?message:'Not Found',404,true)
    }
     Forbidden(res,message){
       return  BaseController.JsonResponse(res,message?message:'Forbidden',403,true)
   }
    UnAuthorized(res,message){
     return  BaseController.JsonResponse(res,message?message:'UnAuthorized',401,true)
  }
   BadRequest(res,message){
     return   BaseController.JsonResponse(res,message?message:'Bad Request',400,true)
}
     fail(res,error){
        console.log(error) 
        return BaseController.JsonResponse(res,error?error.toString():"internal server error",500,true)
    }
}
module.exports = BaseController;