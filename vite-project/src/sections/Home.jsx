import React, { use, useMemo } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import {motion} from 'framer-motion'

const Home = () => {
  const roles=useMemo(()=>["web developer","SoftwareDeveloper"],[])

  const [index,setIndex]=React.useState(0)
  const [subIndex,setSubIndex]=React.useState(0)
  const [deleting,setdeleting]=React.useState(false)
  

  React.useEffect(()=>{
    const current=roles[index]
    const timeout=setTimeout(()=>{
      if(!deleting && subIndex<current.length)(
          setSubIndex(v=>v+1)
      )
      else if(!deleting && subIndex===current.length)( setTimeout(()=>{setdeleting(true)},1000))
      else if(deleting && subIndex>0)(
          setSubIndex(v=>v-1)   
      )
      else if(deleting && subIndex === 0)(
          setdeleting(false),
          setIndex(v=>(v+1)%roles.length)
      )
    },deleting?40:60)

    return()=>clearTimeout(timeout)

  },[subIndex,index,deleting,roles])


  return (
    <section className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticlesBackground/>
      <div className='absolute inset-0'>
      <div className='absolute -top-32 -left-32 
      w-[70vw]  sm:w-[50vw]  md:w-[40vw]
      h-[70vw]  sm:h-[50vw]  md:h-[40vw]
      max-w-[400px] max-h-[400px]
      rounded-full
      bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
      opacity-50 sm:opacity-20 md:opacity-10
      blur-[100px] sm:blur-[150px] md:blur-[200px]
      animate-pulse
      '> 
      </div>
      <div  className='absolute bottom-0 right-0 
      w-[70vw]  sm:w-[50vw]  md:w-[40vw]
      h-[70vw]  sm:h-[50vw]  md:h-[40vw]
      max-w-[400px] max-h-[400px]
      rounded-full
      bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
      opacity-50 sm:opacity-20 md:opacity-10
      blur-[100px] sm:blur-[150px] md:blur-[200px]
      animate-pulse delay-500
      '></div>
      </div>

    <div className='relative z-10 h-full w-full max-w-7xl mx-auto grid-cols-1 lg:grid-cols-2 '>
    <div className='flex flex-col justify-center h-full text-center lg:text-left relative '>
      <div className='w-full lg:pr-24 mx-auto max-w-[48rem}'></div>
    </div>
    </div>jhuhjijktrfewfy



    </section>
  )
}

export default Home
