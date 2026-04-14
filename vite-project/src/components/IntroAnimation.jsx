import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'

const IntroAnimation = ({onFinish}) => {
  const greetings=useMemo(()=>[
     "Hello",        // English
  "Hola",         // Spanish
  "Bonjour",      // French
  "Olá",          // Portuguese
  "Hallo",        // German
  "Ciao",         // Italian
  "नमस्ते",       // Hindi
  "你好",          // Chinese
  "こんにちは",    // Japanese
  "안녕하세요",    // Korean
  "สวัสดี",       // Thai
  "مرحبا",        // Arabic
  "Привет",       // Russian
  "Γεια σου",     // Greek
  "Merhaba",      // Turkish
  "Jambo",        // Swahili
  ],[])
  const [index,setIndex]=React.useState(0)
  const [visible,setVisible]=React.useState(false)

  useEffect(()=>{
    if(index<greetings.length-1) {
      const id=setInterval(()=>{setIndex(index+1)},180)
      return ()=>clearInterval(id)
    }else{
      const t=setTimeout(()=>{setVisible(false)},3000)
      return ()=>clearTimeout(t)
    }

  },[index,greetings.length])

  return (
    <div>
      <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white overflow:hidden"
        initial={{y:0}}
        animate={{opacity:1}}
        exit={{y:"-100%",
          transition:{
            duration:1.2,
            ease:"easeInOut"
          }
        }}
        >
          <motion.h1 
          key={index}
          className='text-4xl md:text-7xl lg:text-8xl font-bold'
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          exit={{opacity:0,y:-20}}
          transition={{duration:0.12}}
          >
            greetings[index]
          </motion.h1>
        </motion.div>
      ) }
      </AnimatePresence>
    </div>
  )
}

export default IntroAnimation
