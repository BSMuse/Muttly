import './App.scss';

import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import HomePage from './components/HomePage';
import NavigationBarTop from './components/NavigationBarTop';
import ContactUsPage from './components/ContactUsPage';
import SignUpPage from './components/SignUpPage';
import AboutUsPage from './components/AboutUsPage';
import NewsFeedPublicPage from './components/NewsFeedPublicPage';
import NewsFeedUserPage from './components/NewsFeedUserPage';
import GenerateMixedBreedPage from './components/GenerateMixedBreedPage';
import UsersFavouritesPage from './components/UsersFavouritesPage';
import CardPage from './components/CardPage';
import NavigationBarBottom from './components/NavigationBarBottom';
import UsersGeneratedImages from './components/UsersGeneratedImages'
import RecentlyGeneratedImagesPage from './components/RecentlyGeneratedImagesPage';
import MostPopularGeneratedImagesPage from './components/MostPopularGeneratedImagesPage';
import ProtectedRoute from './components/ProtectedRoute';
import VisitorRoute from './components/VisitorRoute';
import PlaceholderImage from './components/PlaceHolderImage'; 
import MobileHomePage from './mobile-components/MobileHomePage'; 
import MobileAboutUs from './mobile-components/MobileAboutUs';
import MobileContactUs from './mobile-components/MobileContactUs';
import MobileSignUpPage from './mobile-components/MobileSignUp';
import MobilePublicFeedPage from './mobile-components/MobilePublicFeed';
import MobileUserFeed from './mobile-components/MobileUserFeed';
import MobileGenerateMixedBreedPage from './mobile-components/MobileGenerateMixedBreedPage';
import MobileFooter from './mobile-components/MobileFooter'; 
import MobileHeader from './mobile-components/MobileHeader';


const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isContactPage = location.pathname === '/contact';
  const isAboutPage = location.pathname === '/about';
  const isSignUp = location.pathname === '/signup';
  const isNewsFeed = location.pathname === '/newsfeed';
  const isNewsFeedUser = location.pathname === '/newsfeeduser';
  const isGenerate = location.pathname === '/generate';
  const isUsersFavouritesPage = location.pathname === '/usersfavourites';
  const isUserGenerated = location.pathname === "/usersgeneratedimages";
  const isMostPopular = location.pathname === "/mostpopulargeneratedimages";
  const isRecentlyGenerated = location.pathname === "/recentlygeneratedimages"; 
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/allbreednames`)
      .then(() => {
        console.log('Backend pinged to wake up Render server');
      })
      .catch((err) => {
        console.error('Ping failed:', err);
      });
  }, []);

  return (
    <div className="App">
      <div className="AppWrapper">
        {((isMobile && isHomePage) || isGenerate || isSignUp || isMostPopular || isRecentlyGenerated || isNewsFeedUser || isUserGenerated || isNewsFeed || isUsersFavouritesPage || isAboutPage || isContactPage)
         && (isMobile ? <MobileHeader /> : <NavigationBarTop/>)}
        <div className="AppContent">
          <Routes>
            <Route path='/placeholder' element={<PlaceholderImage/>}/>
            <Route path="/" element={
              <VisitorRoute>{isMobile ? <MobileHomePage /> : <HomePage />}</VisitorRoute>
            } />
            <Route path="/signup" element={
              <VisitorRoute>{isMobile ? <MobileSignUpPage/ > : <SignUpPage />}</VisitorRoute>
            } />
            <Route path="/usersfavourites" element={
              <ProtectedRoute><UsersFavouritesPage /></ProtectedRoute>
            } />
            <Route path="/newsfeeduser" element={
              <ProtectedRoute>{isMobile ? <MobileUserFeed /> : <NewsFeedUserPage /> }</ProtectedRoute>
            } />
            <Route path="/generate" element={
              <ProtectedRoute>{isMobile ? <MobileGenerateMixedBreedPage /> : <GenerateMixedBreedPage />}</ProtectedRoute>
            } />
            <Route path="/usersgeneratedimages" element={
              <ProtectedRoute><UsersGeneratedImages/></ProtectedRoute>
            } />
            <Route path="/recentlygeneratedimages" element={<RecentlyGeneratedImagesPage />} />
            <Route path="/mostpopulargeneratedimages" element={<MostPopularGeneratedImagesPage />} />
            <Route path="/contact" element={isMobile ? <MobileContactUs /> : <ContactUsPage />} />
            <Route path="/about" element={isMobile ?  <MobileAboutUs /> : <AboutUsPage />} />
            <Route path="/newsfeed" element={isMobile  ? <MobilePublicFeedPage/> : <NewsFeedPublicPage />} />
            <Route path="/card/:id" element={<CardPage/>}/>
          </Routes> 
        </div>

        {((isMobile && isSignUp) ||isNewsFeedUser || isNewsFeed || isMostPopular || isRecentlyGenerated || isAboutPage || isGenerate || isUserGenerated || isUsersFavouritesPage || isContactPage || isHomePage) 
        && (isMobile ? <MobileFooter /> : <NavigationBarBottom/>)}
        </div>
      </div>
  );
};

export default App;