import React from 'react';
import '../views/mobilestylesheets/MobileContactUs.scss';

const MobileContactUs = () => {
  return (
    <main className="mobile-contact-us-ctn ">
      <h2>Contact Us</h2>
      <p>Feel free to BARK at us any time...</p>
        <div className="mobile-coder-container">
          <a href='https://www.linkedin.com/in/alexander-dacosta/' target='_blank' rel='noopener noreferrer'>
            <img className="linkedin-icon" src='/icons/linkedin.png' alt='LinkedIn Alexander Da Costa'/>
          </a>
          <p>Alexander Da Costa</p>
        </div>

        <div className="-mobile-coder-container">
          <a href='https://www.linkedin.com/in/gregory-dechant/' target='_blank' rel='noopener noreferrer'>
            <img className="linkedin-icon" src='/icons/linkedin.png' alt='LinkedIn Gregory Dechant'/>
          </a>
          <p>Gregory Dechant</p>
        </div>

        <div className="mobile-coder-container">
          <a href='https://www.linkedin.com/in/cknowles90/' target='_blank' rel='noopener noreferrer'>
            <img className="linkedin-icon" src='/icons/linkedin.png' alt='LinkedIn Charles Denahy-Knowles'/>
          </a>
          <p>Charles Denahy-Knowles</p>
        </div>

      <div className="mobile-github-section">
        <a href='https://github.com/BSMuse/Muttly.git' target="_blank" rel='noopener noreferrer'>
          <img className="github-icon" src='/icons/github.png' alt="GitHub Icon" />
        </a>
        <p>Our Code</p>
      </div>
    </main>
  );
};

export default MobileContactUs;
