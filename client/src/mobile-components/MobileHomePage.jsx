import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import '../views/mobilestylesheets/MobileHomePage.scss';

const MobileHomePage = () => {
  const images = [ 
    'BoxerHusky',
    'BulldogBorder_Collie', 
    'Cavalier_King_Charles_SpanielGolden', 
    'DachshundGerman_Shepard', 
    'DalmatianLabrador_Retriever',  
    'Golden_RetrieverBorder_Collie', 
    'Great_DaneBernese_Mountain_Dog', 
    'Miniature_SchnauzerAlaskan_Malamute', 
    'Poodle_StandardBoston_Terrier', 
    'Shiba_Inupug'
  ];
  
  const [index, setIndex] = useState(0);
  const [loggedIn, loggedStatus] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval)
  }, [images.length]);

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

  return (
    <div className="mobile-homepage">
        <p className="tagline">
          Unleash your imagination, create your own breed, and join us in the symphony of barks - where every mutt has its day!
        </p>

      <div className="dog-image-container">
        <div className="dog-image-container">
          {images.map((image, idx) => (
            <img 
              key={idx}
              className={`dog_home ${idx === index ? 'active fade-in' : ''}`}
              src={`../mock_dogs/${image}.jpg`}
              alt={`Dog ${idx + 1}`}
            />
        ))}
        </div>
      </div>

      <div className="sign-in-container">
        <img className="paw-icon" onClick={handleSignInClick} src="../icons/paws_pink.png" alt="Sign In Paw Icon"/>
        <p>Sign In</p>
      </div> 
      {isSignInModalOpen && <SignInModal onClose={closeSignInModal} />}

      <Link to="/newsfeed">
        <button className="public-newsfeed-button">Check out what mutts have been mixed here!</button>
      </Link>
    </div>
  );
};

export default MobileHomePage;
