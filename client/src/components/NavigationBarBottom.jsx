import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../views/stylesheets/NavigationBarBottom.scss';

const NavigationBarBottom = () => {
  const { isValid } = useAuth(); 

  return (
    <div className="bottom-navigation-bar">
      <Link to="/contact" className="nav-link">
      <img src="../icons/paws_pink.png" className="paws-icon-nav" /> Contact Us <img src="../icons/paws_pink.png" className="paws-icon-nav" />
      </Link>
      <Link to="/about" className="nav-link">
      <img src="../icons/paws_pink.png" className="paws-icon-nav" /> About Us <img src="../icons/paws_pink.png" className="paws-icon-nav" />
      </Link>
      <Link to={isValid ? "/newsfeeduser" : "/signup" } className="nav-link">
        {isValid ? (
          <>
            <img src="../icons/bone.png" alt="Bone Icon" className="bone-icon-nav" /> Your Feed <img src="../icons/bone.png" alt="Bone Icon" className="bone-icon-nav" />
          </>
        ) : (
          <>
            <img src="../icons/paws_pink.png" alt="Paws Icon" className="paws-icon-nav" /> Sign Up <img src="../icons/paws_pink.png" alt="Paws Icon" className="paws-icon-nav" />
          </>
        )}
      </Link>
    </div>
  );
};

export default NavigationBarBottom;
