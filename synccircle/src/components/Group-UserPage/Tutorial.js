import React, { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import UserJoinImg from './images/User_Join.webp';
import UserPreJoin from './images/User_PreJoin.png';
import DragSlots from './images/DragSlots.png';
import GroupPageBtn from './images/GroupPageBtn.png';
import GroupPage from './images/GroupPage.png';
import GroupPopup from './images/GroupPopup.png';
import GearIcon from './images/GearIcon.png';
import PencilIcon from './images/PencilIcon.png';
import GroupControls from './images/GroupControls.png';
import AdminControls from './images/AdminControls.png';
import GroupIcon from './images/GroupIcon.png';
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
                <DialogTitle sx={{backgroundColor:"#202124", color:"#F7F7F7", display:"flex", justifyContent:"Center"}} >{"How To Use SyncCircle"}</DialogTitle>
                <DialogContent sx={{backgroundColor:"#202124", color:"#F7F7F7"}}>
                    <div style={{display:"flex", justifyContent:"Center", flexDirection:"column"}}>
                        <p>Step 1: Enter a username and hit the join button.</p>
                        <img src={UserPreJoin} alt="User PreJoin" width="100%" style={{paddingBottom:"10px"}}/>
                        <img src={UserJoinImg} alt="User Join" width="100%" style={{paddingBottom:"10px"}}/>
                        <p>Step 2: Click/drag the slots to show others when you are free. <br></br>
                        *You can use the arrow buttons to look at the other days the creator of the group set up as available.*</p>
                        <img src={DragSlots} alt="Drag Slots" width="100%"/>
                        <p>Step 3: Open the group page by clicking the group page button.</p>
                        <img src={GroupPageBtn} alt="Group Page Button" width="30%" style={{ display: "block", margin: "auto", paddingBottom: "10px" }}/>
                        <p>Step 4: Find specifically who is available by clicking a time slot on the group page.</p>
                        <img src={GroupPage} alt="Group Page" width="100%"/>
                        <img src={GroupPopup} alt="Group Popup" width="100%" style={{paddingBottom:"30px"}}/>
                        <p><b>Extra Features</b></p>
                        <p>Click the gear/pencil icon (on the group page next to the title) to see more settings. <br></br>
                        *If you're the creator of the group you will have the pencil icon others will have the gear icon.*</p>
                        <img src={GearIcon} alt="Gear Icon" width="30%" style={{ display: "block", margin: "auto", paddingBottom: "10px" }}/>
                        <img src={PencilIcon} alt="Pencil Icon" width="30%" style={{ display: "block", margin: "auto", paddingBottom: "10px" }}/>
                        <p>If you have the gear icon, you can change your username or logout.</p>
                        <img src={GroupControls } alt="Group Controls" width="100%"/>
                        <p>If you have the pencil icon, you can remove users, change your username, logout, change the group name, or delete the group.</p>
                        <img src={AdminControls} alt="Admin Controls" width="100%"/>
                        <p>Hit the group icon to get back to seeing the group slots.</p>
                        <img src={GroupIcon} alt="Group Icon" width="50%" style={{ display: "block", margin: "auto", paddingBottom: "10px" }}/>
                        <p><b>Now you know how to use SyncCircle inside and out. 🙂</b></p>
                    </div>
                </DialogContent>
                <DialogActions sx={{backgroundColor:"#202124", color:"#F7F7F7"}}>
                    <button className="TutorialClose" onClick={handleClose} >Close</button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Tutorial;
