import React from 'react';
// import { Links } from 'react-router-dom';

import TopNavigationBar from  './NavigationBarTop';
import BottomNavigationBar from './NavigationBarBottom';

import '../views/stylesheets/ContactUsPage.scss';

function ContactUsPage() {
  return (
    <div className="contact-us-container">
      {/* Top Navigation Bar */}
      <TopNavigationBar />

      {/* Header Section */}
      <div className="header-section">
        <div className="header-text">
          <h1>Contact Us</h1>
          <h2>Feel free to BARK at us any time...</h2>
        </div>
        <div className="github-section">
          <img src="/path/to/github-icon.png" alt="GitHub Icon" className="github-icon" />
          <p>Our Code</p>
        </div>
      </div>

      {/* Paw Graphic + Social Media Links Section */}
      <div className="social-media-section">
        {/* Large Pawprint Icon */}
        <div className="large-pawprint">
          {/* TikTok Icon */}
          <img src="/path/to/tiktok-icon.png" alt="TikTok Icon" className="tiktok-icon" />
          {/* Instagram Icon */}
          <img src="/path/to/instagram-icon.png" alt="Instagram Icon" className="instagram-icon" />
          {/* Email Icon */}
          <img src="/path/to/email-icon.png" alt="Email Icon" className="email-icon" />
          {/* Facebook Icon */}
          <img src="/path/to/facebook-icon.png" alt="Facebook Icon" className="facebook-icon" />
        </div>

        {/* Mailing Address Icon */}
        <div className="address-icon" />
          <img src="/path/to/address-icon.png" alt="Address Icon" className="address-icon" />
          <h2>Muttly Canine Creations</h2>
          <p>456 Bark Avenue</p>
          <p>Vancouver, BC, Canada</p>
          <p>V6Z 3G1</p>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavigationBar />
      </div>
  );
}; 

export default ContactUsPage