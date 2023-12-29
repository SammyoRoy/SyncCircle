import React, { useState } from 'react';
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
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', fontFamily: 'Inter' }}>
            <List>
                <ListItem button>
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Contact Us" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Use SyncCircle" />
                </ListItem>
                {/* Add other nav items here */}
            </List>
        </Box>
    );

    return (
        <div className='Navbar'>
            <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#F5F7FA' }}>
                <Toolbar>
                    {/* Logo / Brand Name */}
                    <Typography variant="h6" noWrap component="div" marginLeft="10%" sx={{ flexGrow: 1, color: '#5AD85F', fontFamily: 'Poppins', fontWeight: 700, fontSize: '2rem' }}>
                        SyncCircle
                    </Typography>

                    {/* Navigation Links - Hide on mobile */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'space-evenly', fontWeight: 700 }}>
                        <Button color="inherit">How To Use</Button>
                        <Button color="inherit">Contact Us</Button>
                        <Button color="inherit">About</Button>
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
                            onClick={() => (navigate('/'))}
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
