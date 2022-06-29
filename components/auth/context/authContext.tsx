import * as React from "react";


interface childrenInterface{
    children : React.ReactNode
}
interface contextInterface{
    auth:string,
    setAuth : React.Dispatch<React.SetStateAction<string>>
}
const context = React.createContext<contextInterface>({auth:"",setAuth:()=>""})


const AuthContextProvider = ({children}:childrenInterface)=>{
     const [auth,setAuth] = React.useState("");
    return(
        <context.Provider value={{auth,setAuth}}>
           {children}
        </context.Provider>
    )
}

const useAuthContext = ()=>{
    const {auth,setAuth} = React.useContext(context)
    return {auth,setAuth}
}

export {AuthContextProvider,useAuthContext}  