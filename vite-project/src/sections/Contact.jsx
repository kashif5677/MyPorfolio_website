import React, { useState } from 'react'
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
    const required=["name","email","service","message"]
    const newErrors={}
    required.forEach((field)=> !formData[field].trim() && (newErrors[field]="This field is required"))
    if(formData.service !== "other" && !formData.budget.trim())  // ✅ fix 5: removed !
      newErrors.budget="This field is required"
    setErrors(newErrors)
    return !Object.keys(newErrors).length
  }

  const handleSumit=async(e)=>{
    e.preventDefault()
    if(!validateForm()) return
    setStatus("sending")  // ✅ fix 4: no trailing space
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
      console.log("Email error",err)
      setStatus("error")  // ✅ fix 6: string not object
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
          transition={{duration:0.5}}  // ✅ fix 1: was transform
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
          transition={{duration:0.5}}  // ✅ fix 1: was transform
        >
          <h2 className='text-3xl font-bold mb-6'>
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
                className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-white/20"} text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1'>Your Email <span className='text-red-500'>*</span></label>
              <input type="text"
                name='email'
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1'>Service Needed <span className='text-red-500'>*</span></label>
              <select name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              >
                <option value="" className='text-black'>something in mind?</option>
                <option value="web development" className='text-black'>Web development</option>
                <option value="Mobile application" className='text-black'>Mobile application</option>
                <option value="other" className='text-black'>Others</option>
              </select>
              {errors.service && <p className='text-red-500 text-xs'>{errors.service}</p>}
            </div>

            {formData.service && formData.service !== "other" && (
              <div className='flex flex-col'>
                <label className="mb-1">Budget <span className='text-red-500'>*</span></label>
                <input type="text"
                  name='budget'
                  placeholder='Your Budget'
                  onChange={handleChange}
                  value={formData.budget}
                  className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
                />
                {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}
              </div>
            )}

            <div className='flex flex-col'>
              <label className='mb-1'>Explain your idea <span className='text-red-500'>*</span></label>
              <textarea
                name="message"          // ✅ fix 2: was "idea"
                rows={5}
                placeholder='Enter your idea'
                value={formData.message} // ✅ fix 2: was formData.idea
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.message ? "border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.message && <p className='text-red-500 text-xs'>{errors.message}</p>}  {/* ✅ fix 3: outside textarea */}
            </div>

            {status && (
              <p className={`text-sm ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-500"}`}>
                {status === "sending" ? "Sending..." : status === "success" ? "Message sent successfully!" : "Something went wrong"}
              </p>
            )}

            <motion.button
              className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition'
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              disabled={status === "sending"}
              type='submit'
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact