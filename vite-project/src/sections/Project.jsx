import React, { useEffect, useState } from 'react'

const useIsMobile={query="(min-width: 768px)"}=>{
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  ) 
  useEffect(()=>{
    if(typeof window !== "undefined") return 
    const mql=window.matchMedia(query)
  })
}
const Project = () => {
  return (
    <div id='projects' className='relative text-white'>
      
    </div>
  )
}

export default Project
