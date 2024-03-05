import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import moment from 'moment-timezone';

function GroupSlotPopup({ matrixKey, popupColor, groupSlotClicked }) {
    const { groupId, MAX_COLUMNS_DISPLAYED, startColumn, scheduleCheck } = useContext(AppContext);
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
    const [timeZone, setTimeZone] = useState("");
    const [abbr, setAbbr] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (scheduleCheck) {
            return null;
        }
        async function fetchData() {
            const response = await axios.get(`${API_URL}/groups/${groupId}`);
            const daysData = sortDays(response.data.days);
            const tempCols = Math.min(daysData.length, MAX_COLUMNS_DISPLAYED);

            setDays(daysData);
            setStartTime(response.data.start_time);
            if (response.data.time_zone !== "" && response.data.time_zone !== undefined) {

                const startTimeIndex = convertTimeToIndex(response.data.start_time);
                const now = new moment();
                const groupTimeZoneOffset = now.tz(response.data.time_zone).utcOffset();
                //const userTimeZoneOffset = now.tz("Asia/Kolkata").utcOffset();
                const userTimeZoneOffset = now.tz(moment.tz.guess()).utcOffset();
                setAbbr(now.tz(response.data.time_zone).format('z'));
                let timeZoneOffset = groupTimeZoneOffset - userTimeZoneOffset;
                timeZoneOffset = timeZoneOffset / 15;
                const adjustedStartIndex = (startTimeIndex - Math.round(timeZoneOffset) + 96) % 96;

                setStartTimeIndex(adjustedStartIndex);
            }
            else {
                setStartTimeIndex(convertTimeToIndex(response.data.start_time));
            }
            setCols(tempCols);
            setTimeZone(response.data.time_zone);
            setRow(Math.floor(matrixKey / (tempCols + 1)));
            setCol((matrixKey % (tempCols + 1)) - 1 + startColumn);
            setIsLoading(false);
            setShowPopup(true);
        }
        fetchData();
    }, [matrixKey, API_URL, groupId, groupSlotClicked, MAX_COLUMNS_DISPLAYED]);


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
        axios.get(`${API_URL}/groups/allmem/${groupId}`).then((response) => {
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
        '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM',
        '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
        '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
        '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
        '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
        '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
        '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
        '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
        '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
        '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
        '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
        '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
        '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM',
        '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
        '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM',
        '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM',
        '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM',
        '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM',
        '12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM',
        '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM',
        '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM',
        '3:00 AM', '3:15 AM', '3:30 AM', '3:45 AM',
        '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM',
        '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM'

    ];


    return (
        <div className="modal" id="groupModal" style={showPopup ? { display: "block", zIndex: "5000" } : null}>
            <div className="modal-content" style={popupColor !== "F7F7F7" ? { border: `3px solid ${popupColor}` } : null}>
                <div className="modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 className="modal-title">
                        {isLoading ? "Loading..." : `${days[col]}, ${timeOptions[(startTimeIndex + row) % 96]}-${timeOptions[(startTimeIndex + row + 1) % 96]}`}
                    </h4>
                    <div className="modal-title-abbr">
                        {abbr}
                    </div>
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
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(':').map(x => parseInt(x, 10));
    let index = hour * 4 + Math.floor(minute / 15);
    if (period === 'PM' && hour < 12) {
        index += 48;
    }
    return index - 24;
}


