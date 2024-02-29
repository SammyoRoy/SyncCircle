import React, { useState, useEffect, useRef, Suspense } from 'react'
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
