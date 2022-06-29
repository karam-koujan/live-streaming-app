import * as React from "react";
import { useFetchQuery } from "../hooks/useFetchQuery";
interface contextInterface{
    data: any;   
    isLoading :any;
}
interface propsInterface{
    children : React.ReactNode;
}

const Context = React.createContext<contextInterface>({data:undefined,isLoading:true});


const UserContextProvider = ({children}:propsInterface)=>{
    const {data,isLoading} = useFetchQuery("user","http://localhost:8080/api/user/info")
    console.log(data,"data")
    return(
        <Context.Provider value={!isLoading?{data,isLoading}:{data:undefined,isLoading:true}}>
            {children}
        </Context.Provider>
    )
}

const useUserContext = ()=>{
    const {data,isLoading} = React.useContext(Context)
    return {data,isLoading}
}

export {UserContextProvider,useUserContext}  