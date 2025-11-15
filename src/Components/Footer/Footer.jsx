import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      
      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-content-left">
          <img src="/assets/logo.png" alt="logo" />

          <p>
            Our mission is to provide fresh, healthy, and high-protein meals that help people 
            meet their daily nutritional needs. We aim to make clean eating simple, accessible, 
            and delicious for everyone.
          </p>

          <div className="footer-social-icons">
            <img src="/assets/facebook_icon.png" alt="Facebook" />
            <img src="/assets/twitter_icon.png" alt="Twitter" />
            <img src="/assets/insta_icon.png" alt="Instagram" />
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-content-center">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>Phone: +123 456 7890</li>
            <li>Email: contact@tomato.com</li>
          </ul>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2024 Tomato. All rights reserved.</p>
        <p>Designed by Gaurav and Urval</p>
      </div>

    </div>
  )
}

export default Footer
