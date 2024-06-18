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
 import { Link } from "react-router-dom";

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
                <Link to="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/sensor">
                <MdOutlineSensors className='icon'/> Sensor Overview
                </Link>
            </li>
            
            <li className='sidebar-list-item'>
                <Link to="/historical">
                    <FaDatabase className='icon'/>Download Data
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/alert">
                <IoNotifications className='icon'/> Alerts & Notifications
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/report">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/setting">
                    <BsFillGearFill className='icon'/> Setting
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/support">
                <IoHelpCircleOutline className='icon'/> Help & Support
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar