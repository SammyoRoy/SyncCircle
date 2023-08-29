import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlotPopup({ matrixKey, popupColor, groupSlotClicked}) {
    const { groupId } = useContext(AppContext);
    const [days, setDays] = useState([]);
    const [cols, setCols] = useState(0);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [membersLoading, setMembersLoading] = useState(true);
    const [startTime, setStartTime] = useState("");
    const [startTimeIndex, setStartTimeIndex] = useState(0);
    const [availableMembers, setAvailableMembers] = useState("");
    const [allMembers, setAllMembers] = useState("");
    const [unavailableMembers, setUnavailableMembers] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${API_URL}/groups/${groupId}`);
            const daysData = sortDays(response.data.days);
            setDays(daysData);
            setStartTime(response.data.start_time);
            setStartTimeIndex(convertTimeToIndex(response.data.start_time));
            setCols(daysData.length);
            setRow(Math.floor(matrixKey / (daysData.length + 1)));
            setCol((matrixKey % (daysData.length + 1)) - 1);
            setIsLoading(false);
            setShowPopup(true);
        }
        fetchData();
    }, [matrixKey, API_URL, groupId, groupSlotClicked]);

    useEffect(() => {
        getMembers();
    }, [row, col, API_URL, groupId]);

    useEffect(() => {
        const availableMembersArray = availableMembers.split(',').map(x => x.trim());
        const allMembersArray = allMembers.split(',').map(x => x.trim());
        const difference = allMembersArray.filter(x => !availableMembersArray.includes(x));
        setUnavailableMembers(difference.join(', '));
        setMembersLoading(false);
    }, [availableMembers, allMembers]);

    const getMembers = () => {
        axios.get(`${API_URL}/groups/slot/${groupId}`, { params: { row: row, col: col } }).then((response) => {
            setAvailableMembers(response.data.toString().split(',').join(', '));
        }).catch((error) => {
            console.error(error);
        });
        axios.get(`https://backend.synccircle.net/groups/allmem/${groupId}`).then((response) => {
            setAllMembers(response.data.toString());
        }).catch((error) => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        const availableMembersArray = availableMembers.split(',');
        const allMembersArray = allMembers.split(',')
        const difference = allMembersArray.map(x => x.trim()).filter((x) => !availableMembersArray.map(x => x.trim()).includes(x));
        setUnavailableMembers(difference.join(', '));
        setMembersLoading(false);
    }, [availableMembers, allMembers]);



    const timeOptions = [
        "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
        "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
        "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
        "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
        "10:00 PM", "11:00 PM", "12:00 AM", "1:00 AM",
        "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM"
    ];

    return (
        <div className="modal" id="groupModal" style={showPopup ? { display: "block" } : null}>
            <div className="modal-content" style={popupColor !== "F7F7F7" ? { border: `3px solid ${popupColor}` } : null}>
                <div className="modal-header">
                    <h4 className="modal-title">{isLoading ? "Loading..." : days[col] + ", " + timeOptions[(startTimeIndex + row) %24] + "-" + timeOptions[(startTimeIndex + row + 1)%24]}</h4>
                </div>
                <div className="modal-body">
                    <h5>Available Members: {membersLoading ? "Loading..." : availableMembers}</h5>
                    <h5>Unavailable Members: {membersLoading ? "Loading..." : unavailableMembers}</h5>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { setShowPopup(false) }}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default GroupSlotPopup;

function sortDays(daysData) {
    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}

function convertTimeToIndex(time) {
    const [hour] = time.split(':');
    const parsedHour = parseInt(hour, 10);
    if (parsedHour >= 6) {
        return (parsedHour - 6);
    } else {
        return (parsedHour + 18);
    }
}

