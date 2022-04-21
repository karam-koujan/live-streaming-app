import useLocalhost from "../useLocalhost";

interface bodyInterface{
    [key:string] : any
}

interface headerInterface {
    authorization? :string;
    [key:string]:any;
}
const setGet = async(uri:string,token:boolean=true)=>{
    let headers:headerInterface = {"Content-Type":"application/json"}
    const [authorization] = useLocalhost("authorization")
    const [googleToken] = useLocalhost("googleToken")
    if(token&&authorization){
         headers = {...headers,authorization:`Bearer ${authorization}`}
    }
    if(token&&googleToken){
        headers = {...headers,googleToken}
    }

    try{
       const response:any = await fetch(uri,{
            method:"GET",
           headers
       })
       return   await response.json()

    }catch(err){
            console.error(err)
    }
}
const useGet = ()=> setGet;

export default useGet;