import React,{useState} from "react"
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Sensors from './Pages/Sensors'
import Realtime from './Pages/Realtime'
import Historical from './Pages/Historical'
import Reports from './Pages/Reports'
import Setting from './Pages/Setting'
import Support from'./Pages/Support'
import Alerts from './Pages/Alerts'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export const Dashboard = () => {
      const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
      <div className='grid-container'>
        
             <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sensor" element={<Sensors/>} />
            <Route path="/realtime" element={<Realtime/>} />
            <Route path="/historical" element={<Historical/>} />
            <Route path="/alert" element={<Alerts/>} />
            <Route path="/report" element={<Reports/>} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="/support" element={<Support/>} />
            </Routes>
            </div>
  )
}

