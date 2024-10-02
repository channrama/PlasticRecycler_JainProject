import React from "react"
import {Routes,Route} from "react-router-dom"
import { Main } from "./components/Main"
import { Register } from "./components/Register"
import { Login } from "./components/Login"


function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='/about' element={<Register/>}/>
    <Route path='/contractors' element={<Login/>}/>
   </Routes>
    </>
  )
}

export default App