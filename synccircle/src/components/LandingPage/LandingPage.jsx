import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Tutorial from './Tutorial'
import './LandingPageStyles.css'

export const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Tutorial/>
    </div>
  )
}
