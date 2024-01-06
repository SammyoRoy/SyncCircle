import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { IconButton, Button, Input } from '@mui/material';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const GroupAdminControls = () => {
    const { userId, groupId, first } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [changedName, setChangedName] = useState('');
    const [changedUser, setChangedUser] = useState('');
    const isAdmin = first;
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies([`username_${groupId}`]);



    useEffect(() => {
        const URL = window.location.href.split("/");
        axios.get(`https://backend.synccircle.net/groups/${groupId}`)
            .then((response) => {
                setUsers(response.data.users);
                console.log(response.data.users);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleRemove = (userId) => {
        const URL = window.location.href.split("/");
        axios.delete(`https://backend.synccircle.net/users/${groupId}/${userId}`)
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }

    const handleLogout = () => {
        removeCookie(`username_${groupId}`, { path: '/' });
        window.location.reload();

    }

    const handleUserNameChange = async () => {
        if (!users.some(user => user.user_name === changedUser)) {
            await setCookie(`username_${groupId}`, changedUser, { path: '/' });
            axios.put(`https://backend.synccircle.net/users/${groupId}/${userId}`, { name: changedUser })
                .then((response) => {
                    console.log(response.data);
                    setChangedUser('');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            console.log("already a name");
        }
    }

    const handleNameChange = () => {
        const URL = window.location.href.split("/");
        axios.put(`https://backend.synccircle.net/groups/${groupId}`, { name: changedName })
            .then((response) => {
                console.log(response.data);
                setChangedName('');

            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }

    const handleDelete = () => {
        const URL = window.location.href.split("/");
        axios.delete(`https://backend.synccircle.net/groups/${groupId}`)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }

    return (
        <div className='GroupControls'>
            <h6>Other Users</h6>
            <ul className='UserList'>
                {users != [] && userId && users.filter(user => user.user_id != userId).map(user =>
                    <div key={user.user_id}>
                        {isAdmin && <IconButton
                            className="RemoveButton"
                            sx={{
                                color: "#D11A2A",
                                '&:hover': {
                                    color: "#b01624" // darken the red color on hover
                                }
                            }}
                            onClick={() => handleRemove(user.user_id)}
                        >
                            <RemoveCircleOutlinedIcon fontSize="small" />
                        </IconButton>}
                        {
                            user.user_name === users[0].user_name
                                ? <span style={{ color: 'gold' }}>{user.user_name}</span>
                                : <span>{user.user_name}</span>
                        }
                    </div>
                )}
                {users.length === 1 && <p>No other users in this group</p>}
            </ul>
            <div>
                <h6>Change Your Name</h6>
                <form onSubmit={handleUserNameChange}>
                    <Input sx={{ marginLeft: "4%", background: "#fff", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", paddingLeft: "2%", minHeight: "36.5px" }} type='text' placeholder='New User Name' value={changedUser} onChange={(event) => setChangedUser(event.target.value)} />
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
                        type="submit"
                    >
                        Change
                    </Button>
                </form>

            </div>
            <div>
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
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
            {isAdmin && <div>
                <h6>Change Group Name</h6>
                <form onSubmit={handleNameChange}>
                    <Input sx={{ marginLeft: "4%", background: "#fff", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", paddingLeft: "2%", minHeight: "36.5px" }} type='text' placeholder='New Group Name' value={changedName} onChange={(event) => setChangedName(event.target.value)} />
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
                        type="submit"
                    >
                        Change
                    </Button>
                </form>
            </div>}
            {isAdmin && <div>
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
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>}
        </div>
    );
}

export default GroupAdminControls;
