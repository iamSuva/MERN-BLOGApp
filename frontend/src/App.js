
import React from 'react'
import Header from './components/Header'
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import Carousel from './components/Carousel';
function App() {
  return (
  <>
    <Header/>
    <Carousel/>
    <Outlet/>

    <Footer/>
  
  </>
  )
}

export default App