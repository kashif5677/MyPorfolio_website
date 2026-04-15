import React from 'react'
import {motion} from 'framer-motion'
import boy from '../assets/boy.jpg'

const About = () => {

const stats=[
  { label: "Speciality", value: "Full stack developer" },
  { label: "Completed Projects", value: "5+" },
  { label: "Focus", value: "performance and scalability" },
]

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

        <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-stretch gap-5"
            initial={{y:24,opacity:0}}
            whileInView={{y:0,opacity:1}}
            transition={{duration:0.5,delay:0.1}}
            viewport={{once:true,amount:0.5}}  
          >
            <motion.div className='relative w-[180px] h-[160px] md:w-[200px] md:h-[200px]
                                    rounded-2xl  overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/20'>
              <img src={boy} alt="profile" className='absolute inset-0' />
            </motion.div>

            <div className='flex-1 flex flex-col justify-center text-center md:text-left'>
              <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] text-center md:text-left'>
                Md kashif Nisar
              </h2>
              <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold '>
                Full stack Developer 
              </p>
              <p className='mt-4 text-gray-300 leading-relax text-base sm:text-lg max-w-2xl '>I  build a Scalable,modern applications with a strong focus on user experience.My toolkit spans the full stack, encompassing both front-end and back-end technologies.</p>
              <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4'>
                {stats.map((item,i)=>(
                  <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
                  initial={{y:10,opacity:0}}
                  whileInView={{opacity:1,y:0}}
                  transition={{delay:0.05*i,duration:0.5}}
                  viewport={{once:true,amount:0.3}}
                  >
                    <div className=''>{item.label}</div>
                    <div className='text-base font-semibold'>{item.value}</div>

                  {/* </motion.div> */}
                ))}
              </div>
            </div>
            
          </motion.div>
        </div>
    </section>
  )
}

export default About
