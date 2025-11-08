import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
const Navbar = () => {

  const [menu,setMenu]=useState("home");
  return (
    <div className='Navbar'>
      <div className="container">
        <div className="navbar-left">
          <img
            src={assets.logo || 'https://via.placeholder.com/42x42/ff8a00/ffffff?text=LOGO'}
            alt="Logo"
            className='logo'
            onError={(e) => { 
              console.error('Logo failed to load:', e.target.src);
              e.currentTarget.onerror = null; 
              e.currentTarget.src = 'https://via.placeholder.com/42x42/ff8a00/ffffff?text=LOGO'; 
            }}
          />
          <ul className="navbar-menu">
            <li className={menu === "home" ? 'active' : ''} onClick={() => setMenu('home')}>Home</li>
            <li className={menu === "Menu" ? 'active' : ''} onClick={() => setMenu('Menu')}>menu</li>
            <li className={menu === "mobile-app" ? 'active' : ''} onClick={() => setMenu('mobile-app')}>mobile-app</li>
            <li className={menu === "contact us" ? 'active' : ''} onClick={() => setMenu('contact us')}>contact us</li>
          </ul>
        </div>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="search" className='search-icon' />
          <div className="basket-icon-container">
            <img src ={assets.basket_icon} alt="basket" className='basket-icon' />
            <div className="dot"></div>
          </div>
          <button className="signin-btn">sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
