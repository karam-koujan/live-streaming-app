import * as React from "react";;
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Auth from "../components/auth";
import {useAuthContext} from "../components/auth/context/authContext";
import VideoJS from "../components/videoPlayer";
const Home: NextPage = () => {
  const {setAuth} = useAuthContext()
 
  return (
    <div>
      <Head>
        <title>live streaming app</title>
       
      </Head>
     <button onClick={_=>setAuth("register")}>register</button>
     <button onClick={_=>setAuth("login")}>login</button>
     <button>
       <Link href="/luanchStream">
        <a>
       luanch a stream
        </a>
       </Link>
       </button>
    <VideoJS/>

     <Auth/>
    </div>
  )
}

export default Home
