import * as React from "react";
import Header from "./header";
import Auth from "../../auth";
interface childrenInterface{
    children : React.ReactNode
}


const Layout = ({children}:childrenInterface)=>{
    return(
        <React.Fragment>
            <Header/>
            <main>
            <Auth/>
          {children}
            </main>
        </React.Fragment>
    )
}
export default Layout;