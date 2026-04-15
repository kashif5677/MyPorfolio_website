import React from 'react'

const About = () => {

const glows=[
  "top-10 left-10 w-[360px] h-[300px] opacity-20 blur-[120px] ",
  "bottom-0 right-10 w-[420px] h-[400px] opacity-20 blur-[140px] delay-300",
  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[220px] opacity-20 blur-[120px] "
]

  return (
    <section 
    id="about"
    className='min-h-screen w-full flex items-center relative bg-black text-white overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          {glows.map((c,i)=>(
              <div 
              key={i}
              className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}/>
            
          ))}
        </div>
    </section>
  )
}

export default About
