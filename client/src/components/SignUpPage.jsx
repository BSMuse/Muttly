import React from 'react';

export default SignUpPage = () => {
  return (
    <div className="signup-container">
      {/* Top Navigation Bar */}
      <TopNavigationBar />

      {/* Sign Up Form */}
      <div className="signup-form">
        <h1>Sign Up</h1>
        <h2>Generate your own breeds today!</h2>
        <p>Please fill out the input fields below to sign up to Muttly!</p>

        {/* First Name and Last Name Fields */}
        <div className="name-fields">
          <div>
            <label htmlfor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="First Name" />
          </div>
          <div>
            <label htmlfor="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Last Name" />
          </div>
        </div>

        {/* Email Address Field */}
        <div className="email-field">
          <label htmlFor="email">Email Address</label>
          <p>Please enter a valid email address</p>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>

        {/* Confirm Email Field */}
        <div className="confirm-email-field">
          <label htmlfor="confirmEmail">Confirm Email</label>
          <input type="email" id="confirmEmail" placeholder="Confirm your email address" />
        </div>

        {/* Submit Button */}
        <button type="submit">Sign Me Up!</button>
      </div>
    </div>
  );
};