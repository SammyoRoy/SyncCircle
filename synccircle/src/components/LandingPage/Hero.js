import React, { useEffect } from 'react'
import AOS from 'aos';
import { Typography, Box, Button } from '@mui/material';
import logo from './SyncCircle192.png'
import { useNavigate } from 'react-router';
const Hero = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    const navigate = useNavigate();

    const tempImageUrl = 'https://picsum.photos/250/300';
    return (
        <>
            <div className='Top'>
                <Typography variant="h6" noWrap component="div" marginLeft="10%" sx={{ flexGrow: 1, color: '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem' }}>
                    <img src={logo} alt="SyncCircle Logo" style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }} />
                    SyncCircle <span className='Beta'>Beta</span>
                </Typography>
                <Box sx={{ display: {md: 'flex' } }} marginRight="10%">
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
                    </Box>
            </div>
            <div className='HeroPage'>
                <div className='HeroDesc'>
                    <h1 data-aos="fade-up">
                        Scheduling with friends <span>made easy</span>.
                    </h1>
                    <h6 data-aos="fade-up">
                        Get those plans out of the group chat
                    </h6>
                    <button type="submit" className="CreateEventBtn" disabled>Create Event</button>
                </div>
                <div className='HeroImg'>
                    {<img src={tempImageUrl} alt='Temporary Placeholder'></img>}
                </div>
            </div>
        </>
    )
}

export default Hero;
