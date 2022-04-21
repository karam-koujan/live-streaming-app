import { useQuery } from "react-query";
import useGet from "./httpReq/get";



export const useFetchQuery = (query:string,endPoint:string)=>{
     const setGet = useGet()

     return useQuery(query,()=> setGet(endPoint,true))
}