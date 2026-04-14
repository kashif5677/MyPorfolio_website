import React, { use, useMemo } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import {motion, scale} from 'framer-motion'
import {FaXTwitter,FaLinkedin,FaGithub} from 'react-icons/fa6'
import avator from '../assets/avator.png'

const socials=[
  {Icon : FaXTwitter,label:"X",href:"https://twitter.com/"},
  {Icon:FaLinkedin,label:"LinkedIn",href:"https://www.linkedin.com/in/"},
  {Icon:FaGithub,label:"Github",href:"https://github.com/"}
]

const glowVariants={
  initial:{ scale:1,y:0,filter:"drop-shadow(0 0 0px white)"},
  hover:{
    scale:1.2,
    y:-2,
    filter:"drop-shadow(0 0 10px rgba(13,88,204,0.5)) drop-shadow(0 0 20px rgba(16,185,129,0.5))",
    transition:{type:"spring",stiffness:300,damping:15}
  },
  tap:{scale:0.95,y:0,transition:{duration:0.08}}
}


const Home = () => {
  const roles=useMemo(()=>["web developer","Software Developer"],[])

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
    <section className='w-full h-screen pt-20 pb-1 relative text-white bg-black overflow-hidden'>
      <ParticlesBackground/>
      <div className='absolute inset-0'>
      <div className='absolute -top-12 -left-32 
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

    <div className='relative z-10 h-full w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 '>
    <div className='flex flex-col justify-center h-full text-center lg:text-left relative '>
      <div className='w-full lg:pr-24 mx-auto max-w-[48rem}'>
        <motion.div
          className='mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]'
          initial={{opacity:0.5,y:12}}
          animate={{opacity:1,y:0}}
          transition={{duration:1,ease:[0.4,0,0.2,1]}}
        >
          <span>
            {roles[index].substring(0,subIndex)}
          </span>
          <span className="inline-block w-[10px] ml-1 bg-white animate-pulse align-middle" style={{height:'1em'}}></span>
          </motion.div>
          <motion.h1 className='text-1xl sm:text-5xl md:text-xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cc2d8] via-[#00b2bf] to-[#2b2c63] drop-shadow-lg'
          initial={{opacity:0.5,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:2}}
          >
            Hello's  I am <br />
            <span className='text-white font-bold text-5xl  sm:text-6xl md:text-5xl lg:text-5xl lg:space-nowrap'>Md kashif Nisar</span>
          </motion.h1>
          <motion.p className='mt-6 tet-base sm:text-lg md:text-1 text-gray-300 mx-w-2xl mx-auto lg:mx-0'
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{delay:2,duration:1.2}}
          >
            I turn coplex ideas into seamless,high-impact web experiences - building modern,scalable,and lighting-fast applications that make a difference
          </motion.p>
          <motion.div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.8,duration:0.8}}
          >
            <a 
            href="#project"
            className='px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all'
            >View my work</a>
            <a 
            href="/KASHIF_RESUME.pdf"
            className='px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 '
            >My Resume</a>
          </motion.div>

          <div className='mt-10 flex  gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              {socials.map(({Icon,label,href})=>(
                  <motion.a 
                    href={href}
                    key={label}
                    target="_blank"
                    aria_label={label}
                    rel="noopener noreferrer"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className='text-gray-300'
                  > 
                      <Icon/>
                  </motion.a>
              ))}
          </div>
      </div>
    </div>
                 <motion.img 
                src={avator} 
                  alt="avator"
                  className='absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none'
                  style={{
                    right:"-20px",width:"min(35vw,600px)",maxWidth:"80vh"
                  }}
                  initial={{opacity:0,y:40,scale:0.98}}
                  animate={{opacity:1,y:0,scale:1}}
                  tranistion={{delay:0.2,duration:0.8}}
                />


    </div>



    </section>
  )
}

export default Home
