import useLocalhost from "../useLocalhost";

interface bodyInterface{
    [key:string] : any
}

interface headerInterface {
    authorization? :string;
    [key:string]:any;
}
const setPost = async(uri:string,body:bodyInterface,token:boolean=true)=>{
    const [authorization] = useLocalhost("authorization")
    const [googleToken] = useLocalhost("googleToken")
    let headers:headerInterface = {"Content-Type":"application/json"}

    if(token&&authorization){
         headers = {...headers,authorization:authorization}
    }
    if(token&&googleToken){
        headers = {...headers,googleToken}
    }

    try{
       const response:any = await fetch(uri,{
            method:"POST",
           headers,
           body : JSON.stringify(body)
       })
       return   await response.json()

    }catch(err){
            console.error(err)
    }
}
const usePost = ()=> setPost;

export default usePost;