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
     

    </div>
  )
}

export default Home
