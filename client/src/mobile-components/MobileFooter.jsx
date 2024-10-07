import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignInModal from "../components/SignInModal";
import '../views/mobilestylesheets/MobileFooter.scss';

const Footer = () => {
  const { isValid } = useAuth(); 
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [loggedIn, loggedStatus] = useState(false); 

  const openSignInModal = () => {
    setSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const handleSignInClick = () => {
    if (!loggedIn) {
      openSignInModal();
    } else {
      loggedStatus(false);
      history.push('/');
    };
  };

  const handleSignOut = async () =>  {
    try {
      const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
          alert('Logout Failed. Please try again.');
        throw new Error('Sign-in failed');
      };
      window.location.reload();
    } catch (error) {
      console.error('Error during sign-out:', error.message);
    };
  };

  return (
    <footer className="mobile-footer">
      <nav className="footer-nav">
        {
          isValid ? 
            <div className="nav-item">
              <img src="/icons/log-out.svg" alt="Log In" onClick={handleSignOut}/>
              <p>Sign Out</p>
            </div>
        : 
            <div className="nav-item">
              <img src="/icons/log-in.svg" alt="Log In" onClick={handleSignInClick}/>
              <p>Sign In</p>
            </div>
        }
        <Link to="/about" className="nav-item">
          <img src="/icons/about-us.svg" alt="About Us" />
          <p>About Us</p>
        </Link>
        <Link to="/contact" className="nav-item">
          <img src="/icons/contact-us.svg" alt="Contact Us" />
          <p>Contact Us</p>
        </Link>
        {
          isValid ? 
            <Link to="/newsfeeduser" className="nav-item">
              <img src="/icons/your-feed.svg" alt="Sign Up" />
              <p>Your Feed</p>
            </Link>
          : 
            <Link to="/signup" className="nav-item">
              <img src="/icons/sign-up.svg" alt="Sign Up" />
              <p>Sign Up</p>
            </Link>
        }
        {isSignInModalOpen && <SignInModal onClose={closeSignInModal} />}
      </nav>
    </footer>
  );
};

export default Footer;
