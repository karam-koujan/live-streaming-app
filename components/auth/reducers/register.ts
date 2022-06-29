
interface Istate{
  [key:string]: any
}
interface Iaction{
    type:string,
    payload?:any
}
const registerReducer = (state:Istate,action:Iaction)=>{
       switch(action.type){
           case "increment":
               return {...state,[action.payload.name]:state[action.payload.name]+1}
           case "decrement":
               return {...state,[action.payload.name]:state[action.payload.name]-1}
           case "write__text":
               return {...state,[action.payload.name]:state[action.payload.name].map((item:string, idx:number) => idx === action.payload.textId ? action.payload.text : item)}
           case "remove__text":
               return {...state,[action.payload.name]:state[action.payload.name].map((item:string, idx:number) => idx+1 === action.payload.textId ? undefined : item)}
           case "show__element":
               return {...state,[action.payload.name]:true}
           case "hide__element":
               return {...state,[action.payload.name]:false}
           default :
             return state                        
       }
} 



export default registerReducer;