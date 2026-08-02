import { useTransform, motion, useScroll } from 'framer-motion'
import React, { useEffect, useState, useRef, useMemo } from 'react'

const experiences = [
  { role: "Diploma in ME", company: "Google", year: "2022" },
  { role: "Pw Fullstack Course", company: "Amazon", year: "2025" },
  { role: "Sheriyan Fullstack Course", company: "Microsoft", year: "2026" },
]

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const animEnd = start + (end - start) * 0.3

  const scale = useTransform(scrollYProgress, [start, animEnd], [0, 1])
  const opacity = useTransform(scrollYProgress, [start, animEnd], [0, 1]) // ✅ stays at 1 forever
  const y = useTransform(scrollYProgress, [start, animEnd], [idx % 2 === 0 ? 30 : -30, 0])
  const x = useTransform(scrollYProgress, [start, animEnd], [-24, 0])

  if (layout === "desktop") {
    return (
      <div className='relative flex flex-1 justify-center items-center min-w-0'>
        <motion.div
          className="z-10 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white shadow-[0_0_0_4px] shadow-black"
          style={{ scale, opacity }}
        />
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-6 md:-top-8" : "-bottom-6 md:-bottom-8"} w-[2px] md:w-[3px] bg-white/40`}
          style={{ height: 30, opacity }}
        >
          <motion.article
            className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"} 
              bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl 
              p-3 md:p-5 lg:p-7 
              w-[140px] md:w-[180px] lg:w-[250px] 
              shadow-lg`}
            style={{ opacity, y, left: "50%", x: "-50%", maxWidth: "90vw" }}
            transition={{ duration: 0.2, delay: idx * 0.5 }}
          >
            <h3 className='text-sm md:text-base lg:text-xl font-semibold leading-tight'>{exp.role}</h3>
            <p className='text-xs md:text-sm mt-1 text-gray-300'>{exp.company}</p>
            <p className='text-xs text-gray-400 mt-1'>{exp.year}</p>
          </motion.article>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='relative flex items-start'>
      <motion.div
        className='absolute -left-[14px] top-3 z-10 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.5)]'
        style={{ scale, opacity }}
      />
      <motion.article
        className='bg-gray-900/80 border border-gray-700/70 rounded-xl p-4 md:p-5 w-[80vw] max-w-sm ml-6 shadow-lg'
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className='text-base md:text-lg font-semibold break-words'>{exp.role}</h3>
        <p className='text-sm md:text-base font-medium text-gray-300 break-words mt-1'>{exp.company}</p>
        <p className='text-xs md:text-sm text-gray-400 break-words mt-1'>{exp.year}</p>
      </motion.article>
    </div>
  )
}

const Experience = () => {
  const sceneRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const SCENE_HEIGHT_VH = isMobile ? 140 * experiences.length : 100 * experiences.length

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  )

  const lineSize = useTransform(scrollYProgress, v => `${v * 100}%`)

  return (
    <section id='experience' className='relative bg-black text-white'>
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className='relative'
      >
        <div className='sticky top-0 h-screen flex flex-col'>
          <h2 className='text-3xl sm:text-4xl font-semibold mt-5 text-center'>
            Experience
          </h2>
          <div className='flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-10 pb-10'>

            {/* Desktop */}
            {!isMobile && (
              <div className='relative w-full max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl'>
                <div className='relative h-[4px] md:h-[6px] bg-white/15 rounded'>
                  <motion.div
                    className='absolute left-0 top-0 h-full bg-white rounded origin-left'
                    style={{ width: lineSize }}
                  />
                </div>
                <div
                  className='absolute inset-x-0 flex justify-between overflow-visible'
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile */}
            {isMobile && (
              <div className='relative w-full max-w-xs sm:max-w-md'>
                <div className='absolute left-0 top-0 bottom-0 w-[4px] sm:w-[6px] bg-white/15 rounded'>
                  <motion.div
                    className='absolute top-0 left-0 w-full bg-white rounded origin-top'
                    style={{ height: lineSize }}
                  />
                </div>
                <div className='relative flex flex-col gap-8 sm:gap-10 ml-8 sm:ml-10 mt-6 pb-20 sm:pb-28'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience