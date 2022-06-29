import type { NextPage } from "next";
import Head from "next/head"
import LuanchStream from "../components/luanchStream";


const Index:NextPage = ()=>{
         return(
             <div>
                 <Head>
                     <title>luanch stream</title>
                 </Head>
                 <LuanchStream/>

             </div>
         )
}

export default Index