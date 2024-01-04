import React from 'react'
import Navbar from '../SharedComponents/Navbar'
import FeedbackBox from './FeedbackBox'
import './FeedbackPage.css'

const FeedbackPage = () => {
    return (
        <div className='FeedbackPage'>
            <Navbar />
            <div style={{ paddingTop: '64px' }}>
                <FeedbackBox />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F7FA" fill-opacity="1" d="M0,160L48,149.3C96,139,192,117,288,101.3C384,85,480,75,576,106.7C672,139,768,213,864,218.7C960,224,1056,160,1152,133.3C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>
        </div>
    )
}

export default FeedbackPage