import React from 'react'
import logo from '../../assets/icons/Logo-vector.svg'
import socialIcon1 from '../../assets/icons/1.svg'
import socialIcon2 from '../../assets/icons/2.svg'
import socialIcon3 from '../../assets/icons/3.svg'
import socialIcon4 from '../../assets/icons/4.svg'
import badge1 from '../../assets/icons/Badge.svg'
import badge2 from '../../assets/icons/Badge-1.svg'
import badge3 from '../../assets/icons/Badge-2.svg'
import badge4 from '../../assets/icons/Badge-3.svg'
import badge5 from '../../assets/icons/Badge-4.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__socials">
          <img src={logo} alt="company logo" className="footer__logo" />
          <p className="footer-text">
            We have clothes that suits your style and which you’re proud to wear. From women to men.
          </p>
          <div className="social-icons">
            <a href=""><img src={socialIcon1} alt="" /></a>
            <a href=""><img src={socialIcon2} alt="" /></a>
            <a href=""><img src={socialIcon3} alt="" /></a>
            <a href=""><img src={socialIcon4} alt="" /></a>
          </div>
        </div>
        <div className="footer__links">
          <div className="link-div">
            <h5>COMPANY</h5>
            <a href="">About</a>
            <a href="">Features</a>
            <a href="">Work</a>
            <a href="">Career</a>
          </div>
          <div className="link-div">
            <h5>HELP</h5>
            <a href="">Customer Support</a>
            <a href="">Delivery Details</a>
            <a href="">Terms & Conditions</a>
            <a href="">Privacy Policy</a>
          </div>
          <div className="link-div">
            <h5>FAQ</h5>
            <a href="">Account</a>
            <a href="">Manage Deliveries</a>
            <a href="">Orders</a>
            <a href="">Payments</a>
          </div>
          <div className="link-div">
            <h5>Resources</h5>
            <a href="">Free eBook</a>
            <a href="">Development Tutorial</a>
            <a href="">How to - Blog</a>
            <a href="">Youtube Playlist</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="text-bottom">Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="payment-icons">
          <img src={badge1} alt="" />
          <img src={badge2} alt="" />
          <img src={badge3} alt="" />
          <img src={badge4} alt="" />
          <img src={badge5} alt="" />
        </div>
      </div>
    </footer>
  )
}

export default Footer