import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function GroupSlotPopup({ matrixKey }) {
    const { groupId } = useContext(AppContext);
    const popup = document.querySelector('#popup');

    const [days, setDays] = useState([]);
    const [cols, setCols] = useState(0); // Use useState to set cols
    const [row, setRow] = useState(0); // Use useState to set row
    const [col, setCol] = useState(0); // Use useState to set col

    const [startTime, setStartTime] = useState("");
    const [startTimeIndex, setStartTimeIndex] = useState(0);

    const [availableMembers, setAvailableMembers] = useState("");
    const [allMembers, setAllMembers] = useState("");

    useEffect(() => {
        async function fetchData() {
            const daysData = await GetDays();
            const sortedDaysData = sortDays(daysData);
            setDays(sortedDaysData);
            setCols(daysData.length);
            setRow(Math.floor(matrixKey / (cols + 1)));
            setCol(matrixKey - (row * (cols + 1)) - 1);

            const startData = await getStart();
            setStartTime(startData);

            const startIndex = await convertTimeToIndex(startTime);
            setStartTimeIndex(startIndex);
        }
        async function getMembers() {

            const response = await axios.get(`http://localhost:4000/display?slot=group=${groupId}=${row}=${col}`);
            setAvailableMembers(response.data.toString().slice(1, -1));

            const response2 = await axios.post(`http://localhost:4000/allMem?group=${groupId}`);
            setAllMembers(response2.data.toString().slice(1, -1));

            // Convert the comma-separated strings to arrays and trim spaces from elements
            const availableMembersArray = availableMembers.split(',');
            const allMembersArray = allMembers.split(',');
            const difference = allMembersArray.filter( x => !availableMembers.has(x));

            setAllMembers(difference.join());

        }
        fetchData();
        getMembers();
    });

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

    const closePopup = () => {
        popup.close();
    };


    return (
        <dialog class="popup" id="popup" className="Popup">
            <h2>{days[col]}, {timeOptions[startTimeIndex + row]} – {timeOptions[startTimeIndex + row + 1]}</h2>
            <p>Available: {availableMembers}</p>
            <p>Not Available: {allMembers}</p>
            <button class="button close-button" onClick={closePopup}>close</button>
        </dialog>
    )
}

export default GroupSlotPopup;




async function GetDays() {
    const URL = window.location.href.split("/");
    try {
        const response = await axios.post(`http://localhost:4000/days?group=${URL[URL.length - 1]}`);
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
        const response = await axios.post(`http://localhost:4000/shours?group=${URL[URL.length - 1]}`);
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
        const response = await axios.post(`http://localhost:4000/allMem?group=${URL[URL.length - 1]}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return "";
    }
}
