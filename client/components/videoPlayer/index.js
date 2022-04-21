
import dynamic from 'next/dynamic'
import React from 'react';
const DynamicComponent  = dynamic(() => import('react-flv-player').then(module=>module.ReactFlvPlayer),  { ssr: false })

const VideoJS = ( {liveUrl}) => {
 
  return(
      <DynamicComponent
      url = {liveUrl}
     
      isMuted={true}
      />  
  )
}

export default VideoJS;