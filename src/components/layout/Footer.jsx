import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo-vector.svg";
import twitterIcon from "../../assets/icons/1.svg";
import facebookIcon from "../../assets/icons/2.svg";
import instagramIcon from "../../assets/icons/3.svg";
import githubIcon from "../../assets/icons/4.svg";
import visaBadge from "../../assets/icons/Badge.svg";
import mastercardBadge from "../../assets/icons/Badge-1.svg";
import paypalBadge from "../../assets/icons/Badge-2.svg";
import applePayBadge from "../../assets/icons/Badge-3.svg";
import googlePayBadge from "../../assets/icons/Badge-4.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__socials">
          <Link to="/" aria-label="Go to homepage">
            <img src={logo} alt="Shop.co Logo" className="footer__logo" />
          </Link>
          <p className="footer-text">
            We offer clothes tailored to your distinctive style, crafted with materials you'll be proud to wear every day.
          </p>
          <div className="social-icons" aria-label="Social media links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" />
            </a>
          </div>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <div className="link-div">
            <h5>COMPANY</h5>
            <Link to="/about">About</Link>
            <Link to="/features">Features</Link>
            <Link to="/work">Works</Link>
            <Link to="/career">Careers</Link>
          </div>
          <div className="link-div">
            <h5>HELP</h5>
            <Link to="/support">Customer Support</Link>
            <Link to="/delivery">Delivery Details</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="link-div">
            <h5>FAQ</h5>
            <Link to="/profile">Account</Link>
            <Link to="/profile">Manage Deliveries</Link>
            <Link to="/profile">Orders</Link>
            <Link to="/payments">Payments</Link>
          </div>
          <div className="link-div">
            <h5>RESOURCES</h5>
            <a href="#resources">Free eBook</a>
            <a href="#resources">Development Tutorial</a>
            <a href="#resources">How-to Blog</a>
            <a href="#resources">YouTube Playlist</a>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <p className="text-bottom">Shop.co © 2000-{currentYear}, All Rights Reserved</p>
        <div className="payment-icons" aria-label="Payment methods accepted">
          <img src={visaBadge} alt="Visa" />
          <img src={mastercardBadge} alt="Mastercard" />
          <img src={paypalBadge} alt="PayPal" />
          <img src={applePayBadge} alt="Apple Pay" />
          <img src={googlePayBadge} alt="Google Pay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
