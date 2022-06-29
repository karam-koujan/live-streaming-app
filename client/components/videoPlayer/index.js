
import dynamic from 'next/dynamic'
import * as React  from 'react';
import Styles from "./styles.module.css";
const DynamicComponent  = dynamic(() => import('react-flv-player').then(module=>module.ReactFlvPlayer),  { ssr: false })

const VideoJS = ( {liveUrl,isLoading}) => {
  const [err,setErr] = React.useState("")
  console.log(err)
  const refresh = ()=> {
   location.reload()
  }
  if(isLoading){
    return(
      <div className={Styles.videoErr}>
    </div>
    )
  }
  if(err){
    return(
      <div className={Styles.videoErr}>
        <p className={Styles.videoErr__text}>{err}</p>
        <button className='btn-primary' onClick={refresh}>
         refresh 
        </button>
      </div>
    )
  }
  
  return(
      <DynamicComponent
      url = {liveUrl}
      handleError = {
        (err)=>{
        switch (err) {
          case 'NetworkError':
            // todo
            setErr("Network error please check your network or check if you did start the stream in your streaming software")
          break;
          case 'MediaError':
            setErr("Media error please check your network or check if you did start the stream in your streaming software")
          break;
          default:
            setErr("check if you did start the stream in your streaming software")

      }}}
      isMuted={true}
      />  
  )
}

export default VideoJS;