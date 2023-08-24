import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { IconButton, Button, Input } from '@mui/material';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

const GroupAdminControls = () => {
    const { userId } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const URL = window.location.href.split("/");
        axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`)
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }, []);

    return (
        <div className='GroupControls'>
            <h6>Users</h6>
            <ul className='UserList'>
                {users !== [] && userId && users.filter(user => user._id != userId).map(user => 
                    <div key={user.user_id}>
                        <IconButton 
                            className="RemoveButton" 
                            sx={{
                                color: "#D11A2A", 
                                '&:hover': {
                                    color: "#b01624" // darken the red color on hover
                                }
                            }}
                        >
                            <RemoveCircleOutlinedIcon fontSize="small"/>
                        </IconButton>
                        {user.user_name}
                    </div>
                )}
            </ul>
            <div>
                <h6>Change Group Name</h6>
                <Input sx={{marginLeft: "4%", background: "#fff", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", paddingLeft: "2%", minHeight: "36.5px"}} type='text' placeholder='New Group Name' />
                <Button 
                    sx={{
                        backgroundColor: "#0398dc", 
                        color: "#fff", 
                        borderTopRightRadius: "5px", 
                        borderBottomRightRadius: "5px", 
                        borderBottomLeftRadius: "0px", 
                        borderTopLeftRadius: "0px",
                        '&:hover': {
                            backgroundColor: "#027bb5" // darken the blue color on hover
                        }
                    }}
                >
                    Change
                </Button>
            </div>
            <div>
                <h6>Delete Group</h6>
                <Button 
                    sx={{
                        marginLeft: "4%", 
                        backgroundColor: "#D11A2A", 
                        color: "#fff", 
                        borderRadius: "5px",
                        '&:hover': {
                            backgroundColor: "#b01624" // darken the red color on hover
                        }
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default GroupAdminControls;
