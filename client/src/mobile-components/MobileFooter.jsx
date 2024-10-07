import React from 'react';
import { Link } from 'react-router-dom';
import '../views/mobilestylesheets/MobileFooter.scss';

const Footer = () => {
  return (
    <footer className="mobile-footer">
      <nav className="footer-nav">
        <Link to="/signin" className="nav-item">
          <img src="/icons/log-in.svg" alt="Log In" />
          <p>Log In</p>
        </Link>
        <Link to="/about" className="nav-item">
          <img src="/icons/about-us.svg" alt="About Us" />
          <p>About Us</p>
        </Link>
        <Link to="/contact" className="nav-item">
          <img src="/icons/contact-us.svg" alt="Contact Us" />
          <p>Contact Us</p>
        </Link>
        <Link to="/signup" className="nav-item">
          <img src="/icons/sign-up.svg" alt="Sign Up" />
          <p>Sign Up</p>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
