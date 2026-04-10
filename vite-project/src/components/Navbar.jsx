import React, { use, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import logo from '../assets/logo.png'

const Navbar = () => {
const [menuopen,setMenuOpen]=useState(false)
const [visible,setVisible]=useState(true)

  return (
    <>
    <nav className ={ `fixed top-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${ visible ? "translate-y-0" :"-translate-y-full"}`}>

    <div>
        <img src={logo} alt="" />
    </div>

    </nav>
    <OverlayMenu/>
    </>
  )
}

export default Navbar
