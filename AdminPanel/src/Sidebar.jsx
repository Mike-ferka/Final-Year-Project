import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { FaDatabase } from "react-icons/fa6";
 import { MdOutlineSensors } from "react-icons/md";
 import { IoNotifications } from "react-icons/io5";
 import { IoHelpCircleOutline } from "react-icons/io5";
 import { AiFillDatabase } from "react-icons/ai";

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            <AiFillDatabase  className='icon_header'/> AGRIDATA
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/sensor">
                <MdOutlineSensors className='icon'/> Sensor Overview
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/realtime">
                <FaDatabase className='icon'/>  Real-Time Data
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/historical">
                    <FaDatabase className='icon'/> Historical Data
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/alert">
                <IoNotifications className='icon'/> Alerts & Notifications
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/report">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/setting">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/support">
                <IoHelpCircleOutline className='icon'/> Help & Support
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar