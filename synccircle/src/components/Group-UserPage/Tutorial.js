import React, { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Tutorial = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="TutorialContainer">
            <button className="TutorialButton" onClick={handleClickOpen}>
                <HelpOutlineIcon sx={{ width: '24px', height: '24px', color: '#297050' }} />
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"How To Use SyncCircle"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* Add your tutorial content here */}
                        Step 1: Description of step 1...<br/>
                        Step 2: Description of step 2...<br/>
                        {/* Add more steps as needed */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Close</button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Tutorial;
