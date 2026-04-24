import React, { use, useState } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import Astra from '../assets/Astra.png'

const SERVICE_ID=import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID=import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY=import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    service:"",
    budget:"",
    message:""
  })
  const [errors,setErrors]=useState({})
  const [status,setStatus]=useState("")

  const handleChange=(e)=>{
    const {name,value}=e.target
    if(name === "budget" && value && !/^\d+$/.test(value)) return

    setFormData((p)=>({...p,[name]:value}))
    if(errors[name]) setErrors((p)=>({...p,[name]:""}))

  }

  const validateForm=()=>{
    const required=["name","email","service","budget","message"]
    const newErrors={};
    required.forEach((field)=> !formData[field].trim() && (newErrors[field]="This field is required"))
    if(!formData.service !== "other" && !formData.budget.trim())
      newErrors.budget="This field is required"
    setErrors(newErrors)
    return !Object.keys(newErrors).length
  }

  const handleSumit=async(e)=>{
    e.preventDefault()
    if(!validateForm()) return
    setStatus("Sending...")
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name:formData.name,
          reply_to:formData.email
        },
        PUBLIC_KEY
      )
      setStatus("success")
      setFormData({
        name:"",
        email:"",
        service:"",
        budget:"",
        message:""
      })
    } catch (err) {
      console.log("Email error",err);
      setStatus(err)
    }
  }

  return (
    <section className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>
      <ParticlesBackground/>
      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>

        {/* Left side */}
      <motion.div className="w-full md:w-1/2 flex justify-center"
      initial={{opacity:0,x:-50}}
      whileInView={{opacity:1,x:0}}
      transform={{duration:0.5}}
      >
        <motion.img src={Astra} alt="Contact"
        className='w-60 md:w-140 rounded-2xl shadow-lg object-cover'
        animate={{y:[0,-10,0]}}
        transition={{duration:2,repeat:Infinity,ease:"easeInOut"}} 
        />
      </motion.div>

      {/* Right side */}
      <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{opacity:0,x:50}}
      whileInView={{opacity:1,x:0}}
      transform={{duration:0.5}}
      >
        <h2 className='text-3xl font-bold mb-6 '>
          Let's work together
          </h2>
          <form className='flex flex-col gap-5' onSubmit={handleSumit}>
            <div className='flex flex-col'>
              <label className='mb-1'>Your Name <span className='text-red-500'>*</span></label>
              <input type="text"
                name="name"
                placeholder='Your name'
                value={formData.name}
                onChange={handleChange}
                className={``}
              />
            </div>
          </form>

      </motion.div>
      </div>
    </section>
  )
}

export default Contact
