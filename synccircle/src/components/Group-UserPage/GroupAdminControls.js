import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

const GroupAdminControls = () => {
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
        <div>
            <h1>Group Admin Controls</h1>
            <h2>Users</h2>
            <ul>
                {users !== [] && users.map((user) => (
                    <div key={user.user_id}>
                        {user.user_name}
                        <button className='btn btn-danger'>Remove</button>
                    </div>
                ))}
            </ul>
            <div>
                <h2>Change Group Name</h2>
                <input type='text' placeholder='New Group Name' />
                <button className='btn btn-primary'>Change</button>
            </div>
            <div>
                <h2>Reset Group</h2>
                <button className='btn btn-danger'>Reset</button>
            </div>
        </div>
    )
}

export default GroupAdminControls