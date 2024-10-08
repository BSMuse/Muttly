import React, { useState } from 'react';
import '../views/mobilestylesheets/MobileSignUp.scss';

const MobileSignUpPage = () => {
  const [ email, setEmail ] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleConfirmEmailChange = (e) => setConfirmEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const isFormValid = () => {
    return email === confirmEmail && password.length >= 8;
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Login failed');
      
      window.location.reload();
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login failed, please try again.');
    }
  };

  const handleSignUp = async () => {
    if (!isFormValid()) {
      alert('Please ensure all fields are filled correctly.');
      return;
    }

    try {
      const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/addnewuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Sign-up failed');

      await handleLogin(email, password);

    } catch (error) {
      console.error('Error during sign-up:', error.message);
      alert('Sign-up failed, please try again.');
    }
  };
  
  return (
    <div className="mobile-signup-container">
      <h1>Sign Up</h1>
      <p>Generate your own breeds today</p>
      <p>Please fill out the input fields below to sign up to Muttly</p>
      <div className="form-fields">
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Please enter a valid email address" value={email} onChange={handleEmailChange} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmEmail">Confirm Email</label>
          <input type="email" id="confirmEmail" placeholder="Confirm your email address" value={confirmEmail} onChange={handleConfirmEmailChange} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Must be at least 8 characters long" value={password} onChange={handlePasswordChange} />
        </div>
      </div>
      <div className="signup-button-container">
        <img className="signup-paw-icon" src="../icons/paws_pink.png" alt="Sign Up Paw Icon" onClick={handleSignUp} />
        <p>Sign me up!</p>
      </div>
    </div>
  );
};

export default MobileSignUpPage;
