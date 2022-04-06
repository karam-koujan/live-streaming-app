import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>live streaming app</title>
       
      </Head>

      <div>
      <button className='btn-primary'>
        click me
      </button>
      <button className='btn-secondary'>
        click me
      </button>
      <input type="text" className='formInput-medium' placeholder='first name'/>
      <p className='text-small text-secondary'>
      ;Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nulla, aliquam explicabo eos odit rerum dolorem consequatur quidem, hic nihil magnam, consectetur tempore tenetur dolorum dolores eum quam soluta deleniti!
      </p>
      </div>
    </div>
  )
}

export default Home
