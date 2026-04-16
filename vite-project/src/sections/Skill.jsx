import React from 'react'
import { FaC, FaCss3, FaHtml5, FaJs, FaReact } from 'react-icons/fa6'
import { SiMongodb, SiNodedotjs, SiTailwindcss, SiTypescript } from 'react-icons/si'
import {motion} from 'framer-motion'

const Skill = () => {
  const skills=[
    {icon:<FaHtml5/>,name:"HTML"},
    {icon:<FaReact/>,name:"React"},
    {icon:<FaJs/>,name:"Javascript"}, 
    {icon:<FaCss3/>,name:"CSS"},
    {icon:<SiTailwindcss/>,name:"Tailwind"},
    {icon:<SiTypescript/>,name:"Typescript"},
    {icon:<SiMongodb/>,name:"MongoDB"},
    {icon:<SiNodedotjs/>,name:"NodeJS"},
    
  ];

  const repeated=[...skills, ...skills]

  return (
    <section id="skills" className='h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none '>
          <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] blur-[120px] opacity-20 animate-pulse'/>

          <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] blur-[120px] opacity-20 animate-pulse delay-500'/>
        </div>

        <motion.h2 className='text-3xl mt-5 sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
          initial={{opacity:0,y:-30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.5,delay:0.1}}
        >
            My Skills
        </motion.h2>

        <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
          initial={{opacity:0,y:-30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.5,delay:0.2}}
        >
          Modern Applications | Modern Technologies
        </motion.p>

        <div className='relative w-full overflow-hidden'>
            <motion.div className='flex gap-10 text-5xl text-[#1cd8d2] '>
                {repeated.map((items,i)=>(
                    <div key={i} className='flex flex-col items-center gap-2 min-w-[120px]'
                      aria-label={items.name}
                      title={items.name}
                    >
                      <span className='hover:scale-125 transition-transform duration-300'>
                        {items.icon}
                      </span>
                      <p className='text-sm'>
                        {items.name}
                      </p>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
  )
}

export default Skill
