import React from 'react'
import ParticlesBackground from '../components/ParticlesBackground'

const Home = () => {
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
      <div></div>
      </div>
    </section>
  )
}

export default Home
