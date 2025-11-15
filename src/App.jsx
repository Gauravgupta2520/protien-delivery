import { useState } from 'react'

import './App.css'
import Navbar  from './Components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Placeorder from './Pages/Place Order/Placeorder';
import Footer from './Components/Footer/Footer'
import SignIn from './Pages/SignIN/SignIn';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/placeorder' element={<Placeorder/>} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
