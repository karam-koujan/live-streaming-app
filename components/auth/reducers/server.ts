


interface Istate{
    [key:string]: any
  }
  interface Iaction{
      type:string,
      payload?:any
  }
  const serverReducer = (state:Istate,action:Iaction)=>{
         switch(action.type){
             case "server__err":
                 return {...state,[action.payload.name]:action.payload.err}
             case "server__response":
                 return {...state,[action.payload.name]:action.payload.data}    
             default :
               return state                        
         }
  } 
  
  
  
  export default serverReducer ;