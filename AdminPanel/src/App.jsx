import { useState } from 'react'
import './App.css'
import {Routes, Route, Navigate } from "react-router-dom";
//Login and Signup 
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { Dashboard } from './Dashboard'

//pages import
import Home from './Home'
import Sensors from './Pages/Sensors'
import Realtime from './Pages/Realtime'
import Historical from './Pages/Historical'
import Reports from './Pages/Reports'
import Setting from './Pages/Setting'
import Support from'./Pages/Support'
import Alerts from './Pages/Alerts'
import Notfund from './Pages/Notfund';

function App() {
  //Login Token
  const user = localStorage.getItem("token");
  //Login Token
  return (
    <div>
      <Routes>
      {user && <Route path="/" exact element={<Dashboard/>} >
      <Route path="/" element={<Home/>} />
            <Route path="/sensor" element={<Sensors/>} />
            <Route path="/realtime" element={<Realtime/>} />
            <Route path="/historical" element={<Historical/>} />
            <Route path="/alert" element={<Alerts/>} />
            <Route path="/report" element={<Reports/>} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="/support" element={<Support/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        <Route/>
        </Route>}
			<Route path="/signup" exact element={<Signup/>} />
			<Route path="/login" exact element={<Login/>} />
			<Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" exact element={<Login/>} />
     </Routes>
    </div>
  )
}

export default App
