import React, { useEffect, useState, useRef } from 'react'
import AOS from 'aos';
import { Typography, Box, Button, Select, MenuItem } from '@mui/material';
import logo from './SyncCircle192.png'
import { useNavigate } from 'react-router';
import splashImage from './SCLandingPageImageFinal.png'

const Hero = ({ scrollRef }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const targetDivRef = scrollRef;
    const API_URL = process.env.REACT_APP_API_URL;
    const scrollToDiv = () => {
        targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        AOS.init();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = useNavigate();


    return (
        <>
            <div className='Top'>
                <Typography variant="h1" display="flex" alignItems="Center" noWrap component="div" marginLeft="10%" onClick={() => navigate('/create')} sx={{ flexGrow: 1, color: '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem' }}>
                    <img src={logo} alt="SyncCircle Logo" style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }} />
                    SyncCircle
                </Typography>
                {/**windowWidth >= 530 && <Box sx={{ display: { md: 'flex' } }} marginRight="10%" alignSelf="center">
                    <Button
                        sx={{
                            backgroundImage: 'linear-gradient(45deg, #5AD85F 30%, #4CAF4F 90%)',
                            color: 'white',
                            transition: 'box-shadow 0.3s ease-in-out',
                            '&:hover': {
                                backgroundImage: 'linear-gradient(45deg, #5AD85F 30%, #4CAF4F 90%)',
                                boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.5)',
                            }
                        }}
                    onClick={() => (navigate('/create'))}
                    >
                        Use SyncCircle
                    </Button>
                    </Box>**/}
            </div>
            <div className='HeroPage'>
                <div className='HeroDesc'>
                    <h2>
                        Group Scheduling <span>made easy</span>.
                    </h2>
                    <h6>
                        So that amazing plan can finally make it out of the group chat.
                    </h6>
                    <div className='Btns'>
                        <button type="submit" className="CreateEventBtn" onClick={() => (navigate('/create'))}>Create Event</button>
                        <button type="button" className='HowToBtn' onClick={scrollToDiv}>How to Use</button>
                    </div>
                </div>
                <div className='HeroImg'>
                    <img
                        src={splashImage}
                        alt='People working on a calendar'
                        style={{ maxWidth: '90%', maxHeight: '150%', height: 'auto', display: 'block', margin: '0 auto' }}
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    )
}

export default Hero;
