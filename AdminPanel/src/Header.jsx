import React from 'react'
import { useEffect, useState } from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'


function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='date'>
          <p>12:00pm Tuesday</p>
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header