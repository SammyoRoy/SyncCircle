import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { IndexContext } from '../../context/IndexContext';

const GroupCards = ({ setRendered }) => {
    const [groups, setGroups] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const { googleUser, setGoogleUser } = useContext(IndexContext);

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
                    if (groupData.length > 0) {
                        setGroups(groupData);
                        setRendered(true);
                    } else {
                        setRendered(false);
                    }
                }
            }
        }

        fetchData();
    }, [API_URL, googleUser]);

    const handleRemove = (e,id) => {
        e.stopPropagation();
        axios.put(`${API_URL}/authUsers/removegroup/${googleUser.email}`, { group: id })
            .then((response) => {
                if (response.status === 200) {
                    const newGroups = groups.filter((group) => group.group_id !== id);
                    setGroups(newGroups);
                }
            });
        axios.get(`${API_URL}/groups/findmem/${id}`, {
            params: { userName: googleUser.displayName }
        })
            .then((response) => {
                if (response.status === 200) {
                    const userId = response.data.user_id;
                    axios.delete(`${API_URL}/users/${id}/${userId}`)
                        .then((response) => {
                        });
                }
            });
    }




    const handleClick = (id) => {
        const groupId = id;
        window.location.href = `/group/${groupId}`;
    }

    return (
        <div className="GroupCards">
            {groups && groups.map((group) => (
                <div key={group.group_id} className="GroupCard"  onClick={() => handleClick(group.group_id)}>
                    {group.group_name.length < 11 &&<h2>{group.group_name}</h2>}
                    {group.group_name.length >= 11 && <h2>{group.group_name.slice(0, 11)}...</h2>}
                    <div className="Subtitle">
                        <p>{group.days[0]} - {group.days[group.days.length - 1]}</p>
                        <p>Click to View</p>
                        <button className="RemoveButton" onClick={(e) => handleRemove(e,group.group_id)}>Remove Me</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GroupCards