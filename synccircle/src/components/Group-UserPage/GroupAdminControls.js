import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { IconButton, Button, Input } from '@mui/material';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import io from 'socket.io-client';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import Alert from '@mui/material/Alert';
import { IndexContext } from '../../context/IndexContext';
import { auth } from '../../firebaseConfig';

const GroupAdminControls = () => {
    const { userId, groupId, first } = useContext(AppContext);
    const {googleUser, setGoogleUser} = useContext(IndexContext);
    const [users, setUsers] = useState([]);
    const [changedName, setChangedName] = useState('');
    const [changedUser, setChangedUser] = useState('');
    const [groupSocket, setGroupSocket] = useState(null);
    const isAdmin = first;
    const API_URL = process.env.REACT_APP_API_URL;
    const [alertMessages, setAlertMessages] = useState([]);
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies([`username_${groupId}`]);

    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        const socket = io(`${API_URL}`, { transports: ['websocket'] });
        setGroupSocket(socket);
    
      }, []);

    useEffect(() => {
        const URL = window.location.href.split("/");
        axios.get(`${API_URL}/groups/${groupId}`)
            .then((response) => {
                setUsers(response.data.users);
               // console.log(response.data.users);
            })
            .catch((error) => {
                console.error(error);
            });

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addListener(handleDarkModeChange);

        return () => {
            darkModeMediaQuery.removeListener(handleDarkModeChange);
        };
    }, [API_URL, groupId]);

    const handleRemove = (userId) => {
        const URL = window.location.href.split("/");
        axios.delete(`${API_URL}/users/${groupId}/${userId}`)
            .then((response) => {
                setUsers(response.data.users);
                if (groupSocket) {
                    console.log(response.data.username)
                    const username = response.data.username;
                    groupSocket.emit('kicked user', username, groupId);
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
        });
     }

    

    const handleLogout = (event) => {
        event.preventDefault();
        if (googleUser !== null) {
            auth.signOut();
            setGoogleUser(null);
        }
        removeCookie(`username_${groupId}`, { path: '/' });
        window.location.reload();
    }

    const handleUserNameChange = async (event) => {
        event.preventDefault();
        if (!users.some(user => user.user_name === changedUser)) {
            if (changedUser.length < 20){

                const response = await axios.put(`${API_URL}/users/${groupId}/${userId}`, { name: changedUser })
                setChangedUser('');
                await setCookie(`username_${groupId}`, changedUser, { path: '/' });
                window.location.reload();
            }
            else {
                setAlertMessages(["Name must be less than 20 characters"]);
                setTimeout(() => {
                    setAlertMessages([]);
                }, 3000);
            }
        }
        else {
            //console.log("already a name");
        }
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        const URL = window.location.href.split("/");
        if (changedName.length < 30) {
            axios.put(`${API_URL}/groups/${groupId}`, { name: changedName })
            .then((response) => {
                //console.log(response.data);
                setChangedName('');
                window.location.reload();

            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
        }
        else{
            setAlertMessages(["Group name must be less than 30 characters"]);
            setTimeout(() => {
                setAlertMessages([]);
            }, 3000);
        }
    }

    const handleDelete = () => {
        const URL = window.location.href.split("/");
        axios.delete(`${API_URL}/groups/${groupId}`)
            .then((response) => {
                if (groupSocket) {
                    groupSocket.emit('delete group', groupId);
                }
                navigate('/');
            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }

    return (
        <div className='GroupControls'>
            {alertMessages.length > 0 && <div className="alert-container">
          <Alert severity="error">{alertMessages.join(" | ")}</Alert>
        </div>}
            <h6>Other Users</h6>
            <ul className='UserList'>
                {users.length > 0 && userId && users.filter(user => user.user_id !== userId).map(user =>
                    <div key={user.user_id}>
                        {isAdmin && (
                            <IconButton
                                className="RemoveButton"
                                sx={{
                                    color: "#D11A2A",
                                    '&:hover': {
                                        color: "#b01624"
                                    }
                                }}
                                onClick={() => handleRemove(user.user_id)}
                            >
                                <RemoveCircleOutlinedIcon fontSize="small" />
                            </IconButton>
                        )}
                        {
                            user.user_name === users[0].user_name
                                ? <span style={{ color: isDarkMode ? 'gold' : 'blue' }}>{user.user_name}</span>
                                : <span>{user.user_name}</span>
                        }
                    </div>
                )}
                {users.length === 1 && <p>No other users in this group</p>}
            </ul>
            <div>
                <h6>Change Your Name</h6>
                <form onSubmit={handleUserNameChange}>
                    <input className="UpdateForm" value={changedUser} onChange={(event) => setChangedUser(event.target.value)} placeholder='Enter Name'/>
                    <button className="UpdateButton" type="submit">
                        <ChangeCircleOutlinedIcon />
                    </button>
                </form>

            </div>
            <div>
                <button
                    className="LogoutButton"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            {isAdmin && <div>
                <h6>Change Group Name</h6>
                <form onSubmit={handleNameChange}>
                    <input className="UpdateForm" type='text' placeholder='Enter Name' value={changedName} onChange={(event) => setChangedName(event.target.value)} />
                    <button
                        className='UpdateButton'
                        type="submit"
                    >
                        <ChangeCircleOutlinedIcon />
                    </button>
                </form>
            </div>}
            {isAdmin && <div>
                <h6>Delete Group</h6>
                <button
                    className="LogoutButton"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>}
        </div>
    );
}

export default GroupAdminControls;
