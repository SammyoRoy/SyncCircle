import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { IndexContext } from '../../context/IndexContext';

const GroupCards = () => {
    const [groups, setGroups] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const {googleUser, setGoogleUser} = useContext(IndexContext);

    useEffect(() => {
        const sessionGoogleUser = sessionStorage.getItem('googleUser');
        if (sessionGoogleUser) {
            setGoogleUser(JSON.parse(sessionGoogleUser));
        }
    }, [setGoogleUser]);
    useEffect(() => {
        async function fetchData() {
            if (googleUser) {
                sessionStorage.setItem('googleUser', JSON.stringify(googleUser));
                const response = await axios.get(`${API_URL}/authUsers/groups/${googleUser.email}`);
    
                if (response.status === 200 && response.data) {
                    const fetchedGroups = response.data;
                    const groupPromises = fetchedGroups.map(async (group) => {
                        const groupResponse = await axios.get(`${API_URL}/groups/${group}`);
                        return groupResponse.data;
                    });
                    const groupData = await Promise.all(groupPromises);
                    setGroups(groupData);
                }
            }
        }
    
        fetchData();
    }, [API_URL, googleUser]);
    

    const handleClick = (id) => {
        const groupId = id;
        window.location.href = `/group/${groupId}`;
    }

  return (
    <div className="GroupCards">
        {groups && groups.map((group) => (
            <div key={group.group_id} className="GroupCard" onClick={() => handleClick(group.group_id)}>
                <h2>{group.group_name}</h2>
                <div className="Subtitle">
                <p>{group.days[0]} - {group.days[group.days.length-1]}</p>
                <p>Click to View</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default GroupCards