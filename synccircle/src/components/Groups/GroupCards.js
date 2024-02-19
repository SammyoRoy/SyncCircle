import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { IndexContext } from '../../context/IndexContext';

const GroupCards = () => {
    const [groups, setGroups] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const {googleUser} = useContext(IndexContext);

    useEffect(() => {
        async function fetchData() {
            if (googleUser) {
                const response = await axios.get(`${API_URL}/authUsers/groups/${googleUser.email}`);

                if (response.status !== 404){
                    response.data.forEach((group) => {
                        axios.get(`${API_URL}/groups/${group}`)
                            .then((response) => {
                                setGroups((prevGroups) => {
                                    return [...prevGroups, response.data];
                                });
                            });
                    });
                }
            }
        }

        fetchData();
    }, [API_URL, googleUser]);

    const handleClick = (id) => {
        const groupId = id;
        window.location.href = `/group/${groupId}`;
    }

    console.log(groups);
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