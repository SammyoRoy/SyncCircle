import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Tutorial from './Tutorial'
import './LandingPageStyles.css'

export const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className='curve'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f5f7fa" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,96C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      </div>
      <Tutorial />
    </div>
  )
}
