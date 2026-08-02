import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useScroll } from 'framer-motion'
import photo1 from "../assets/photo1.JPG"
import photo2 from "../assets/photo2.JPG"
import photo3 from "../assets/photo3.JPG"

import { useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'

const useIsMobile = (query = "(min-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia(query)
    const handler = (e) => setIsMobile(e.matches)

    mql.addEventListener("change", handler)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener("change", handler)
  }, [query])
  return isMobile
}

const Project = () => {

  const isMobile = useIsMobile()
  const scenRef = useRef(null)

  const projects = useMemo(() => [
    {
      title: "Social-Scheduler",
      link: "https://social-scheduler-1-khbc.onrender.com",
      bgColor: "bg-gradient-to-r from-pink-700 to-blue-500",
      image: isMobile ? photo1 : photo1,
    },
    {
      title: "Doctor-appointment",
      link: "https://doctor-appointment-app-frontend-7hfx.onrender.com",
      bgColor: "bg-gradient-to-r from-pink-700 to-blue-500",
      image: isMobile ? photo2 : photo2,
    },
    {
      title: "Design Website",
      link: "https://awebsite-xi.vercel.app/",
      bgColor: "bg-gradient-to-r from-pink-700 to-blue-500",
      image: isMobile ? photo3 : photo3,
    }
  ], [isMobile])

  const { scrollYProgress } = useScroll({
    target: scenRef,
    offset: ["start start", "end end"]
  })

  const threshold = projects.map((_, i) => (i + 1) / projects.length)
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = threshold.findIndex((t) => v < t)
    setActiveIndex(idx === -1 ? threshold.length - 1 : idx)
  })

  const activeProject = projects[activeIndex]

  return (
    <section
      ref={scenRef}
      id='project'
      className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor
      }}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-0"}`}>
          My work
        </h2>
        <div className={`relative flex flex-1 w-full justify-center items-center px-6 ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 transition-all duration-500 w-full max-w-4xl mx-auto ${activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"} `}
            >
              <AnimatePresence mode='wait'>
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-28 sm:left-[35%] lg:left-[-5%] mb-6 sm:mb-0 italic font-semibold ${isMobile ? "mt-4" : "mt-0"}`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left"
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative mx-auto w-full overflow-hidden bg-black/20 shadow-2xl rounded-2xl
                md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.75)] ${isMobile ? "mb-4 rounded-xl" : "mb-0"} h-[62vh] sm:h-[66vh]`}
                style={{ zIndex: 10, transition: "box-shadow 250ms" }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`} className="block w-full h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl cursor-pointer"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter: "drop-shadow(0px 16px 40px rgba(0,0,0,0.65))",
                      transition: "filter 200ms ease"
                    }}
                    loading='lazy'
                  />
                </a>
                <div
                  className='pointer-events-none'
                  style={{
                    zIndex: 11,
                    background: "linear-gradient(180deg,rgba(0,0,0,0.12) 0%,rgba(0,0,0,0) 40%)"
                  }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute ${isMobile ? "bottom-10" : "bottom-5"}`}>
          <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all' aria-label={`View ${activeProject.title}`}>
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Project