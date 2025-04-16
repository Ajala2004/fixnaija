import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Findservice from "../src/pages/findservices"
import 'bootstrap/dist/js/bootstrap.min.js'
import Nav from "../src/component/nav"
import Hero from "./pages/Hero"
import Providersignupdetails from "../src/pages/providersignupdetails"
import ProviderSignup from "../src/pages/providersignup"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "react-toastify"
import AboutSection from "../src/pages/about"
import Contact from "../src/pages/contact"
import Notification from "../src/component/notification"
import Footer from "../src/pages/footer"
import Dashboard from "../src/dashboard/dashboard"

import Signin from "../src/pages/signin"
import { ToastContainer } from 'react-toastify'
import { Toast } from 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
function App() {


  return (
    <>

      <div className="body">

        <BrowserRouter>

          <ToastContainer />
         <Nav/>
          <Routes>
            <Route element={<ProviderSignup />} path={"/signup"}/>
            <Route  path={"/"} element={<Hero/>}/>
            <Route  path={"/complete-profile"} element={<Providersignupdetails/>}/>
            <Route  path={"/findservice"} element={<Findservice/>}/>
            <Route  path={"/findservice"} element={<Findservice/>}/>
            <Route  path={"/about"} element={<AboutSection/>}/>
            <Route  path={"/contact"} element={<Contact/>}/>
            <Route  path={"/notifications"} element={<Notification/>}/>
            <Route  path={"/signin"} element={<Signin/>}/>
            <Route  path={"/dashboard"} element={<Dashboard />}/>
          </Routes>
          <Footer/>


        </BrowserRouter>
      </div>


    </>
  )
}

export default App
