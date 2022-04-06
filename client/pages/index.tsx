import type { NextPage } from 'next'
import Head from 'next/head'
import Auth from "../components/auth"
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>live streaming app</title>
       
      </Head>

     <Auth/>
    </div>
  )
}

export default Home
