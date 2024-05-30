import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//Login and Signup 
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { Dashboard } from './Dashboard'

function App() {
  //Login Token
  const user = localStorage.getItem("token");
  //Login Token
  return (
    <Router>
    <div>
      <Routes>
      {user && <Route path="/" exact element={<Dashboard/>} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
     </Routes>
    </div>
    
   </Router>
  )
}

export default App
