import React, { useState, useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (leaveMessage !== ''){
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
        <div className='curve'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 320"><path fill="#f5f7fa" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,96C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        </div>
        <Tutorial ref={targetDivRef} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220"><path fill="#F5F7FA" fill-opacity="1" d="M0,96L48,85.3C96,75,192,53,288,80C384,107,480,181,576,192C672,203,768,149,864,133.3C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <FeedbackPage />
        <Footer />
      </div>
    )
  }
