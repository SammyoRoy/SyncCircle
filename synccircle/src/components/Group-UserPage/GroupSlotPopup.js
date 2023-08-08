import React, { useContext, useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlotPopup({ matrixKey, popupColor }) {
    const { groupId } = useContext(AppContext);
    console.log(matrixKey);
    const [days, setDays] = useState([]);
    const [cols, setCols] = useState(0); // Use useState to set cols
    const [row, setRow] = useState(0); // Use useState to set row
    const [col, setCol] = useState(0); // Use useState to set col
    const [isLoading, setIsLoading] = useState(true);
    const [membersLoading, setMembersLoading] = useState(true);

    const [startTime, setStartTime] = useState("");
    const [startTimeIndex, setStartTimeIndex] = useState(0);

    const [availableMembers, setAvailableMembers] = useState("");
    const [allMembers, setAllMembers] = useState("");
    const [unavailableMembers, setUnavailableMembers] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    async function fetchData() {
        const daysData = await GetDays();
        const sortedDaysData = sortDays(daysData);
        setDays(sortedDaysData);
        const colsTemp = sortedDaysData.length;
        setCols(colsTemp);

        const startTimeData = await getStart();
        setStartTime(startTimeData);
        const startTimeIndexData = await convertTimeToIndex(startTimeData);
        setStartTimeIndex(startTimeIndexData);


        setRow(Math.floor(matrixKey / (colsTemp + 1)));
        setCol((matrixKey % (colsTemp + 1)) - 1);
    }
    
    const getMembers = () => {

        axios.get(`https://backend.synccircle.net:4000/display?slot=group=${groupId}=${row}=${col}`).then((response) => {
            setAvailableMembers(response.data.toString().slice(1, -1));
        }).catch((error) => {
            console.error(error);
        });
        axios.get(`https://backend.synccircle.net:4000/allMem?group=${groupId}`).then((response) => {
            setAllMembers(response.data.toString().slice(1, -1));
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        fetchData();
        setIsLoading(false);
        setShowPopup(true);
    }, [matrixKey]);

    useEffect(() => {
        getMembers();
    }, [row, col]);

    useEffect(() => {
        const availableMembersArray = availableMembers.split(',');
        const allMembersArray = allMembers.split(',')
        const difference = allMembersArray.map(x => x.trim()).filter((x) => !availableMembersArray.map(x => x.trim()).includes(x));
        setUnavailableMembers(difference.join(', '));
        setMembersLoading(false);
    }, [availableMembers, allMembers]);



    const timeOptions = [
        '6:00 AM', //06:00 -> 0
        '7:00 AM', //07:00 -> 1
        '8:00 AM', //08:00 -> 2
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM', //12:00 -> 6
        '1:00 PM', // 13:00 -> 7
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
        '7:00 PM',
        '8:00 PM',
        '9:00 PM',
        '10:00 PM',
        '11:00 PM', //23:00 -> 17
        '12:00 AM', //00:00 -> 18
        '1:00 AM',  //01:00 -> 19
        '2:00 AM',
        '3:00 AM',
        '4:00 AM',
        '5:00 AM', //05:00 -> 23
        '6:00 AM'
    ];


    return (
        <div className="modal" id="groupModal" style={showPopup ? { display: "block" } : null}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{isLoading ? "Loading..." : days[col] + ", " + timeOptions[startTimeIndex + row] + "-" + timeOptions[startTimeIndex + row + 1]}</h4>
                </div>
                <div className="modal-body">
                    <h5 style={popupColor !== "#F7F7F7" ? { color: popupColor } : null}>Available Members: {membersLoading ? "Loading..." : availableMembers}</h5>
                    <h5 style={popupColor !== "#F7F7F7" ? { color: popupColor } : null}>Unavailable Members: {membersLoading ? "Loading..." : unavailableMembers}</h5>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowPopup(false)}>Close</button>
                </div>
            </div>
        </div>

    )
}

export default GroupSlotPopup;




async function GetDays() {
    const URL = window.location.href.split("/");
    try {
        const response = await axios.post(`https://backend.synccircle.net:4000/days?group=${URL[URL.length - 1]}`);
        return response.data.split(",");
    } catch (error) {
        console.error(error);
        return [];
    }
}

function sortDays(daysData) {
    // Define the correct order of the days
    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
}

async function getStart() {
    const URL = window.location.href.split("/");
    try {
        const response = await axios.post(`https://backend.synccircle.net:4000/shours?group=${URL[URL.length - 1]}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return "";
    }
}

async function convertTimeToIndex(time) {
    const [hour] = time.split(':');
    const parsedHour = parseInt(hour, 10);

    if (parsedHour >= 6) {
        return (parsedHour - 6);
    }
    else {
        return (parsedHour + 18)
    }
}

async function getAllMembers() {
    const URL = window.location.href.split("/");
    try {
        const response = await axios.post(`https://backend.synccircle.net:4000/allMem?group=${URL[URL.length - 1]}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return "";
    }
}
