import React,{useState} from "react"
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'

import {Routes, Route,Navigate ,Outlet} from "react-router-dom";


export const Dashboard = () => {
      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
      <div className='grid-container'>
        
             <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
           <Outlet />
            </div>
  )
}

