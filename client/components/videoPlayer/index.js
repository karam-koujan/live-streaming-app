
import dynamic from 'next/dynamic'
import React from 'react';

const DynamicComponent  = dynamic(() => import('react-flv-player').then(module=>module.ReactFlvPlayer),  { ssr: false })

const VideoJS = ( props ) => {
 
  return(
    <DynamicComponent
    url = "http://127.0.0.1:8000/live/uqLYxFng5.flv"
    heigh = "800px"
    width = "800px"
    isMuted={true}
    />  )

}

export default VideoJS;