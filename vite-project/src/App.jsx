import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skill from './sections/Skill'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Testimonials from './sections/Testimonials'
import Project from './sections/Project'
import ParticlesBackground from './components/ParticlesBackground'

function App() {

  return (
   <div className='relative gradient'>
    <ParticlesBackground/>


    <Navbar/>
    <Home/>
    <About/>
    <Skill/>
    <Project/>
    <Experience/>
    <Testimonials/>
    <Contact/>
    <Footer/> 
  
   </div>
  )
}

export default App
