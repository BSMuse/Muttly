import React from 'react';
import '../views/mobilestylesheets/MobileHeader.scss'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileHeader = () => {
  const { isValid } = useAuth(); 
  const navigate = useNavigate(); 
  const handleLogoClick = () => {
    if (isValid) {
      navigate('/newsfeeduser'); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <header className="mobile-header" onClick={handleLogoClick}>
      <div className="header-content logo-container">
        <img src="../icons/paws_pink.png" alt="Left Paw" className="logo" />
        <h1 className="app-title">Muttly</h1>
        <img src="../icons/paws_pink.png" alt="Right Paw" className="logo" />
      </div>
    </header>
  );
};

export default MobileHeader;