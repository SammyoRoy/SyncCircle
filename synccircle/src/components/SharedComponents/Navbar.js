import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom'
import logo from './SyncCircle192.png';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isDarkMode, setIsDarkMode] = useState(false);

    function useDarkMode() {

        useEffect(() => {
            // Check if the media query matches the user's preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDarkMode(mediaQuery.matches); // Set the initial mode

            // Add a listener to track changes
            const handler = (event) => setIsDarkMode(event.matches);
            mediaQuery.addListener(handler);

            // Clean up the listener on component unmount
            return () => mediaQuery.removeListener(handler);
        }, []);

        return isDarkMode;
    }
    useDarkMode();

    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', fontFamily: 'Inter' }}>
            <List>
                {location.pathname !== '/' && <ListItem button onClick={() => navigate('/')}>
                    <ListItemText primary="Home" />
                </ListItem>}
                {location.pathname !== '/feedback' && <ListItem button onClick={() => navigate('/feedback')}>
                    <ListItemText primary="Feedback" />
                </ListItem>}
                {location.pathname !== '/about' && <ListItem button onClick={() => navigate('/about')}>
                    <ListItemText primary="About" />
                </ListItem>}
                <ListItem button onClick={() => {
                    const tweet = "Make time for your friends! Check out SyncCircle! It's awesome! https://synccircle.net";
                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
                    window.open(url, '_blank');
                }}>
                    <ListItemText primary="Share" /> <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black" />
                    </svg>
                </ListItem>
                <ListItem onClick={() => navigate('/create')}>
                    <ListItemText primary="Use SyncCircle" />
                </ListItem>
                {/* Add other nav items here */}
            </List>
        </Box>
    );

    return (
        <div className='Navbar'>
            <AppBar position="fixed" color="default" elevation={0} sx={{ backgroundColor: isDarkMode ? '#303134' : '#F5F7FA' }}>
                <Toolbar>
                    {/* Logo / Brand Name */}
                    <Typography variant="h6" noWrap component="div" marginLeft="10%" sx={{ flexGrow: 1, color: isDarkMode ? '#237563' : '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem' }}>
                        <img src={logo} alt="SyncCircle Logo" style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }} />
                        SyncCircle <span className='Beta'>Beta</span>
                    </Typography>

                    {/* Navigation Links - Hide on mobile */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-evenly', fontWeight: 700 }}>
                        {location.pathname !== '/' && <Button color="inherit" onClick={() => navigate('/')}>Home</Button>}
                        {location.pathname !== '/feedback' && <Button color="inherit" onClick={() => navigate('/feedback')}>Feedback</Button>}
                        {location.pathname !== '/about' && <Button color="inherit" onClick={() => navigate('/about')}>About</Button>}
                        <Button color="inherit" onClick={() => {
                            const tweet = "Make time for your friends! Check out SyncCircle! It's awesome! https://synccircle.net";
                            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
                            window.open(url, '_blank');
                        }}>Share <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black" />
                            </svg></Button>
                        {/* ... other nav items */}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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




                    {/* Hamburger Menu Icon - Show on mobile */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>

                {/* Drawer */}
                <Drawer
                    variant="temporary"
                    anchor="top"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%" },
                        fontFamily: 'Inter'
                    }}
                >
                    {drawer}
                </Drawer>
            </AppBar>
        </div>
    );
};

export default Navbar;
