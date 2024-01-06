import React, { useEffect } from 'react'
import AOS from 'aos';
import { Typography, Box, Button } from '@mui/material';
import logo from './SyncCircle192.png'
import { useNavigate } from 'react-router';
import splashImage from './SCLandingPageImageFinal.png'

const Hero = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    const navigate = useNavigate();

    const tempImageUrl = 'TransparentSCLandingPageImageFinal.png';
    return (
        <>
            <div className='Top'>
                <Typography variant="h6" noWrap component="div" marginLeft="10%" sx={{ flexGrow: 1, color: '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem' }}>
                    <img src={logo} alt="SyncCircle Logo" style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }} />
                    SyncCircle <span className='Beta'>Beta</span>
                </Typography>
                
            </div>
            <div className='HeroPage'>
                <div className='HeroDesc'>
                    <h1 data-aos="fade-up">
                        Scheduling with friends <span>made easy</span>.
                    </h1>
                    <h6 data-aos="fade-up">
                        So that amazing plan can finally make it out of the group chat.
                    </h6>
                    <button type="submit" className="CreateEventBtn" onClick={() => (navigate('/create'))}>Create Event</button>
                </div>
                <div className='HeroImg'>
                    {<img src={splashImage} 
                      alt='Temporary Placeholder'
                      style={{ maxWidth: '90%', maxHeight: '150%', height: 'auto', display: 'block', margin: '0 auto' }}>
                    </img>}
                </div>
            </div>
        </>
    )
}

export default Hero;
