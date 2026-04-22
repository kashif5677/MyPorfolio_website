import { useTransform } from 'framer-motion'
import React from 'react'

const expriences=[
  {
    role:"Frontend Developer",
    company:"Google",
    year:"2019"
  },{
    role:"Frontend Developer",
    company:"Amazon",
    year:"2020"
  },{
    role:"Frontend Developer",
    company:"Microsoft",
    year:"2021"
  }
]

function experienceItem({exp,idx,start,end,scrollYProgress,layout}){
  const scale=useTransform(scrollYProgress,[start,end],[0.5,1])
}



const Experience = () => {
  return (
    <section id='experience' 
    className='relative bg-black text-white'>
      
    </section>
  )
}

export default Experience
