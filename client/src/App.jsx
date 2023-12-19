import './App.scss';

import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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

  return (
    <div className="App">
      <div className="AppWrapper">
        {(isGenerate || isSignUp || isMostPopular || isRecentlyGenerated || isNewsFeedUser || isUserGenerated || isNewsFeed || isUsersFavouritesPage || isAboutPage || isContactPage) && <NavigationBarTop/>}
        <div className="AppContent">
          <Routes>
            <Route path='/placeholder' element={<PlaceholderImage/>}/>
            <Route path="/" element={
              <VisitorRoute><HomePage /></VisitorRoute>
            } />
            <Route path="/signup" element={
              <VisitorRoute><SignUpPage /></VisitorRoute>
            } />
            <Route path="/usersfavourites" element={
              <ProtectedRoute><UsersFavouritesPage /></ProtectedRoute>
            } />
            <Route path="/newsfeeduser" element={
              <ProtectedRoute><NewsFeedUserPage /></ProtectedRoute>
            } />
            <Route path="/generate" element={
              <ProtectedRoute><GenerateMixedBreedPage /></ProtectedRoute>
            } />
            <Route path="/usersgeneratedimages" element={
              <ProtectedRoute><UsersGeneratedImages/></ProtectedRoute>
            } />
            <Route path="/recentlygeneratedimages" element={<RecentlyGeneratedImagesPage />} />
            <Route path="/mostpopulargeneratedimages" element={<MostPopularGeneratedImagesPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/newsfeed" element={<NewsFeedPublicPage />} />
            <Route path="/generated/breedbyid/:id" element={<CardPage/>}/>
          </Routes> 
        </div>

        {(isNewsFeedUser || isNewsFeed || isMostPopular || isRecentlyGenerated || isAboutPage || isGenerate || isUserGenerated || isUsersFavouritesPage || isContactPage || isHomePage) && <NavigationBarBottom/>}
        </div>
      </div>
  );
};

export default App;