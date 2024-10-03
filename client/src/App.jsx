import React from "react"
import {Routes,Route} from "react-router-dom"
import  {Main}  from "./components/Main"
import { Register } from "./components/Register"
import Login from "./components/Login"
import { Forget } from "./components/forget"



function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='api/auth/register' element={<Register/>}/>
    <Route path='api/auth/login' element={<Login/>}/>
    <Route path='/forgetpassword' element={<Forget/>}/>
   </Routes>
    </>
  )
}

export default App