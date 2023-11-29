import React from 'react';
import { Link } from 'react-router-dom';

function TopNavigationBar() {
  return (
    <div className="top-navigation-bar">
      <div className="left-side">
        {/* <Link to="/news-feed" className="logo-link">
          <img src="/path/to/muttlylogo.png" alt="Muttly Logo" className="muttly-logo" />
        </Link> */}
        <h1 className="muttly-brand">Muttly</h1>
        <h2 className="muttly-slogan">Unlimited paw-sibilities... Tailored Tails, Your Way!</h2>
      </div>
      <div className="right-side">
        {/* <Link to="/signin" className="sign-in-out-button">
          Bark In/Bark Out
        </Link> */}
      </div>
    </div>
  );
};

export default TopNavigationBar