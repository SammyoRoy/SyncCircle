import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../SharedComponents/Navbar'
import Hero from './Hero'
import Tutorial from './Tutorial'
import Footer from './Footer'
import './LandingPageStyles.css'
import FeedbackPage from './FeedbackPage'
import { Alert } from '@mui/material';
import io from 'socket.io-client';
import { useContext } from 'react'
import { IndexContext } from '../../context/IndexContext'


export const LandingPage = () => {

  const location = useLocation();

  const targetDivRef = useRef(null);
  const { leaveMessage, setLeaveMessage } = useContext(IndexContext);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if the media query matches the user's preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches); // Set the initial mode
  }, [window.matchMedia('(prefers-color-scheme: dark)')]);

  useEffect(() => {
    if (leaveMessage !== '') {
      setTimeout(() => {
        setLeaveMessage('');
      }, 5000);
    }
  }, [leaveMessage])

  useEffect(() => {
    if (location.state?.scrollToBottom) {
      // Wait for the next tick to ensure the page has rendered
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    }
  }, [location.state]);


  return (
    <div className='LandingPage'>
      {leaveMessage !== '' && (
        <div className="alert-container">
          <Alert severity="error">{leaveMessage}</Alert>
        </div>)}
      {/**<Navbar />**/}
      <Hero scrollRef={targetDivRef} />
      <div className='curve'/>
      <Tutorial ref={targetDivRef} />
      <div className='curve2'/>
      <FeedbackPage />
      <Footer />
    </div>
  )
}
