// SignInModal.jsx

import React from 'react';

import '../views/stylesheets/SignInModal.scss';

const SignInModal = ({ onClose }) => {
  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="logo-header">
          <img src="/path/to/logo.png" alt="Muttly Logo" className="logo" />
          <h2>Sign In!</h2>
        </div>
        <div className="form-container">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email address" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="button">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;