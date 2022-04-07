import type { NextPage } from 'next'
import Head from 'next/head'
import Auth from "../components/auth";
import {useAuthContext} from "../components/auth/context/authContext";
const Home: NextPage = () => {
  const {setAuth} = useAuthContext()
  return (
    <div>
      <Head>
        <title>live streaming app</title>
       
      </Head>
     <button onClick={_=>setAuth("register")}>register</button>
     <button onClick={_=>setAuth("login")}>login</button>
     <Auth/>
    </div>
  )
}

export default Home
