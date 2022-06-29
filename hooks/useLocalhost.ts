




 
const useLocalhost : (key:string)=>(any & ((key:any)=>void))[] = (key:string)=>{
       const item = localStorage.getItem(key)
       const setItem = (newItem:any)=>{
          let result;
          if (typeof newItem === "function"){
              result = newItem()
          }else{
              result = newItem
          }

          localStorage.setItem(key,result)
       }

       return [item,setItem]
}

export default useLocalhost;