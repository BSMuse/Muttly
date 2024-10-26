import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../views/stylesheets/SignInModal.scss';

const SignInModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onClose } = props;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }

    try {
      const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          alert('Incorrect email or password. Please try again.');
        } else {
          alert('Sign-in failed. Please try again later.');
        }
        throw new Error('Sign-in failed');
      };
      
      onClose();
      window.location.reload();

    } catch (error) {
      console.error('Error during sign-in:', error.message);
    };
  };

  const insertCredentials = async () => {
    await Promise.all([setEmail('testing@email.com'), setPassword('demoPassword')]);
    handleSignIn();
  };

  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="logo-header">
          <img src="../icons/paws_pink.png" alt="Muttly Logo" className="logo" />
          <h2>Sign In!</h2>
          <h3>If you don't have an account, please click <a onClick={onClose}><Link to="/signup">here</Link></a> to sign up!</h3>
        </div>
        <div className="form-container">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email address" 
            value={email} 
            onChange={handleEmailChange} 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={handlePasswordChange} 
          />
          <br />
          <div className="signin-btn-ctn">
          <button type="button" onClick={handleSignIn}>Sign In</button>
          <button type="button" onClick={insertCredentials}>Test Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
