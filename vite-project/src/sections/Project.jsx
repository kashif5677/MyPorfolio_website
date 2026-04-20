import React, { useEffect, useMemo, useState,useRef } from 'react'
import { useScroll } from 'framer-motion'
import photo1 from "../assets/photo1.jpg"
import photo2 from "../assets/photo1.jpg"
import photo3 from "../assets/photo1.jpg"
import img1 from "../assets/photo1.jpg"
import img2 from "../assets/photo1.jpg"
import img3 from "../assets/photo1.jpg"
import { useMotionValueEvent } from 'framer-motion'

const useIsMobile=(query="(min-width: 768px)")=>{
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  ) 
  useEffect(()=>{
    if(typeof window !== "undefined") return 
    const mql=window.matchMedia(query)
    const handler=(e)=>setIsMobile(e.matches)

    mql.addListener("change",handler)
    setIsMobile(mql.matches)
    return ()=>mql.removeListener("change",handler)
  },[query])
  return isMobile
}
const Project = () => {

const isMobile=useIsMobile()
const scenRef=useRef(null)

const projects=useMemo(()=>[
  {
  title:"Project",
  link:"https://github.com",
  bgColor:"bg-gradient-to-r from-pink-700 to-blue-500",
  image:isMobile ? photo1 : photo2,
},
{
  title:"Project",
  link:"https://github.com",
  bgColor:"bg-gradient-to-r from-pink-700 to-blue-500",
  image:isMobile ? photo2:photo3,
},
{
  title:"Project",
  link:"https://github.com",
  bgColor:"bg-gradient-to-r from-pink-700 to-blue-500",
  image:isMobile ? img1 : img2,
}

],[isMobile])

const {scrollYProgress}= useScroll({
  target:scenRef,
  offset:["start start","end end"]
})

const threshold=projects.map((_,i)=>(i+1)/projects.length)
const [activeIndex,setActiveIndex]=useState(0)

useMotionValueEvent(scrollYProgress,"change",(v)=>{
  const idx=threshold.findIndex((t)=>v<t)
  setActiveIndex(idx === -1 ? threshold.length - 1 : idx)
})

const activeProject=projects[activeIndex]

  return (
    <section 
    ref={scenRef}
    id='projects' 
    className='relative text-white'
    style={{
      height:`${100*projects.length}vh`,
      backgroundColor:activeProject.bgColor
    }}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4":"mt-0"}`}>
          My work
        </h2>
        <div>
          {projects.map((projects,idx)=>(
            <div key={projects.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"} `}
            >
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Project
