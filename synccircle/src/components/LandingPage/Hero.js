import React, { useEffect, useState, useRef, useContext } from 'react'
import AOS from 'aos';
import { Typography, Box, Button, Select, MenuItem, Dialog } from '@mui/material';
import logo from './SyncCircle192.png'
import { useNavigate } from 'react-router';
import splashImage from './SCLandingPageImageFinal.png'
import { provider, auth } from '../../firebaseConfig';
import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { IndexContext } from '../../context/IndexContext';
import axios from 'axios';

const Hero = ({ scrollRef }) => {
    const { googleUser, setGoogleUser, setToken } = useContext(IndexContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [yourEventBtn, setYourEventBtn] = useState(false);
    const userImageRef = useRef(null);
    const navigate = useNavigate();
    const targetDivRef = scrollRef;
    const API_URL = process.env.REACT_APP_API_URL;
    const scrollToDiv = () => {
        targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setGoogleUser(user);
                setIsLoading(false);
            }
            else {
                setGoogleUser(null);
                setIsLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        if (googleUser) {
            console.log(googleUser);
            axios.get(`${API_URL}/authUsers/groups/${googleUser.email}`)
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        console.log(response.data);
                        if (response.data.length > 0) {
                            setYourEventBtn(true);
                        }
                    }
                });
        }
    }, [googleUser]);



        const handleLogin = async () => {
            const result = await signInWithPopup(auth, provider);
            axios.get(`${API_URL}/authUsers/${result.user.email}`)
                .then((response) => {
                    if (response.status === 404) {
                        axios.post(`${API_URL}/authUsers`, { email: result.user.email, photoUrl: result.user.photoURL, login_type: "google" });
                    }
                })
                .catch((error) => {
                    axios.post(`${API_URL}/authUsers`, { email: result.user.email, photoUrl: result.user.photoURL, login_type: "google" });
                });
            setGoogleUser(result.user);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            setToken(credential.accessToken);
        }

        const handleLogout = () => {
            auth.signOut();
            setGoogleUser(null);
            sessionStorage.removeItem('googleUser');
            setOpen(false);
        }

        const openPopup = () => {
            setOpen(true);
        }

        const openSettings = () => {
            navigate('/settings');
        }



        useEffect(() => {
            AOS.init();

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }, []);


        return (
            <>
                <div className='Top'>
                    <Typography variant="h1" display="flex" alignItems="Center" noWrap component="div" marginLeft="10%" sx={{ flexGrow: 1, color: '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem', gap: '20px' }}>
                        <div onClick={() => navigate('/create')} style={{ cursor: 'pointer' }}>
                            <img src={logo} alt="SyncCircle Logo" style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }} />
                            SyncCircle
                        </div>
                        {!isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "auto" }}>
                            {googleUser == null ? <button className='GoogleButton' onClick={handleLogin}>
                                Sign in
                            </button> :
                                <div className="GooglePhoto" onClick={openPopup}>
                                    <img className="GoogleLogo" ref={userImageRef} src={googleUser.photoURL} alt={googleUser.displayName} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                                </div>}
                        </div>}
                        {open && <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            BackdropProps={{ style: { backgroundColor: 'transparent' } }}
                            PaperProps={{
                                style: {
                                    position: 'absolute',
                                    top: userImageRef.current ? userImageRef.current.offsetTop + userImageRef.current.offsetHeight - 20 : 0,
                                    left: userImageRef.current ? userImageRef.current.offsetLeft - 150 : 0,
                                }
                            }}
                            ModalProps={{ disableScrollLock: true }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', borderRadius: "15px" }}>
                                {/** <button className='OptionsButton' onClick={openSettings}>
                                Settings
                            </button>*/}
                                <button className='OptionsButton' onClick={handleLogout}>
                                    Sign Out
                                </button>
                            </Box>
                        </Dialog>}
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
                            {yourEventBtn && googleUser && <button type="button" className="AllEventsBtn" onClick={() => (navigate('/events'))}>Your Events</button>}
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
