import { useState } from 'react'

import './App.css'
import Navbar  from './Components/NavBar/Navbar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Placeorder from './Pages/Place Order/Placeorder';
import Footer from './Components/Footer/footer'

function App() {


  return (
    <>
      <Navbar/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeorder' element={<Placeorder/>}/>  
        </Routes>   
      <Footer/>
     
    </>
    
  )
}

export default App
