import '../styles/globals.css';
import '../styles/button.css';
import '../styles/forminput.css';
import '../styles/text.css';
import Head from 'next/head';
import {AuthContextProvider} from "../components/auth/context/authContext";
import type { AppProps } from 'next/app'
import { UserContextProvider } from '../context/userContext';
import {QueryClientProvider,QueryClient} from "react-query";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return( 
    <div  className="light-theme">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;700&display=swap" rel="stylesheet"/>
      </Head>
      <QueryClientProvider client={queryClient}>
      <UserContextProvider>
      <AuthContextProvider>
      <Component {...pageProps}/>
      </AuthContextProvider>
      </UserContextProvider>
      </QueryClientProvider>

    </div>
  )
}

export default MyApp
