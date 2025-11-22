import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from '../../Pages/SignIN/SignIn'
const Navbar = () => {
  const navigate = useNavigate();
  const [menu,setMenu]=useState("home");
  const [showSignIn, setShowSignIn] = useState(false);
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
  <li>
    <Link 
      to="/" 
      className={menu === "home" ? "active" : ""} 
      onClick={() => setMenu("home")}
    >
      Home
    </Link>
  </li>

  <li>
    <a 
      href="#explore-menu" 
      className={menu === "Menu" ? "active" : ""} 
      onClick={() => setMenu("Menu")}
    >
      Menu
    </a>
  </li>

  <li>
    <a 
      href="#app-download" 
      className={menu === "mobile-app" ? "active" : ""} 
      onClick={() => setMenu("mobile-app")}
    >
      Mobile App
    </a>
  </li>

  <li>
    <a 
      href="#footer" 
      className={menu === "contact us" ? "active" : ""} 
      onClick={() => setMenu("contact us")}
    >
      Contact Us
    </a>
  </li>
</ul>

        </div>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="search" className='search-icon' />
          <div className="basket-icon-container" onClick={() => navigate('/cart')}>
            <img src ={assets.basket_icon} alt="basket" className='basket-icon' />
            <div className="dot"></div>
          </div>
          <button className="signin-btn" onClick={() => setShowSignIn(true)}>sign in</button>
        </div>
      </div>
      {showSignIn && (
        <div className="signin-modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="signin-modal-close" aria-label="Close sign in" onClick={() => setShowSignIn(false)}>✕</button>
            <SignIn />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
