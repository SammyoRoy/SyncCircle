import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import moment from 'moment-timezone';
import _ from 'lodash';

const GroupSideBar = ({ matrixKey, popupColor, groupSlotClicked }) => {
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
    const [availableCount, setAvailableCount] = useState(0);
    const [allCount, setAllCount] = useState(0);
    const [allMembers, setAllMembers] = useState("");
    const [unavailableMembers, setUnavailableMembers] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [timeZone, setTimeZone] = useState("");
    const [abbr, setAbbr] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;


    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = useCallback(async () => {
        cancelTokenSource.cancel('Operation canceled due to new request.');

        const newCancelToken = axios.CancelToken.source();

        try {
            const response = await axios.get(`${API_URL}/groups/${groupId}`, {
                cancelToken: newCancelToken.token
            });

            const daysData = sortDays(response.data.days);
            const tempCols = Math.min(daysData.length, MAX_COLUMNS_DISPLAYED);

            setDays(daysData);
            setStartTime(response.data.start_time);
            if (response.data.time_zone !== "" && response.data.time_zone !== undefined) {
                const startTimeIndex = convertTimeToIndex(response.data.start_time);
                const now = new moment();
                const groupTimeZoneOffset = now.tz(response.data.time_zone).utcOffset();
                const userTimeZoneOffset = now.tz(moment.tz.guess()).utcOffset();
                setAbbr(now.tz(response.data.time_zone).format('z'));
                let timeZoneOffset = groupTimeZoneOffset - userTimeZoneOffset;
                timeZoneOffset = timeZoneOffset / 15;
                const adjustedStartIndex = (startTimeIndex - Math.round(timeZoneOffset) + 96) % 96;

                setStartTimeIndex(adjustedStartIndex);
            } else {
                setStartTimeIndex(convertTimeToIndex(response.data.start_time));
            }
            setCols(tempCols);
            setTimeZone(response.data.time_zone);
            setRow(Math.floor(matrixKey / (tempCols + 1)));
            setCol((matrixKey % (tempCols + 1)) - 1 + startColumn);
            setIsLoading(false);
            setShowPopup(true);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            }
        }
    }, [groupId, API_URL, matrixKey, startColumn]);

    const debouncedFetchData = useCallback(_.debounce(() => {
        fetchData();
    }, 50), [fetchData]); 

    useEffect(() => {
        debouncedFetchData();

        return () => {
            cancelTokenSource.cancel('Component got unmounted');
            debouncedFetchData.cancel();
        };
    }, [debouncedFetchData]);


    useEffect(() => {
        const availableMembersArray = availableMembers.split(',').map(x => x.trim());
        const allMembersArray = allMembers.split(',').map(x => x.trim());
        const difference = allMembersArray.filter(x => !availableMembersArray.includes(x));
        setUnavailableMembers(difference.join(', '));
        setMembersLoading(false);
        setAvailableCount(availableMembersArray.length);
        if (availableMembersArray[0] === '' && availableMembersArray.length == 1) {
            setAvailableCount(0);
        }
        setAllCount(allMembersArray.length);
    }, [availableMembers, allMembers]);

    let cancelToken1 = axios.CancelToken.source();
    let cancelToken2 = axios.CancelToken.source();

    const getMembers = useCallback(() => {
        cancelToken1.cancel("Canceling previous request");
        cancelToken2.cancel("Canceling previous request");

        cancelToken1 = axios.CancelToken.source();
        cancelToken2 = axios.CancelToken.source();

        axios.get(`${API_URL}/groups/slot/${groupId}`, {
            params: { row: row, col: col },
            cancelToken: cancelToken1.token
        }).then((response) => {
            setAvailableMembers(response.data.toString().split(',').join(', '));
        }).catch((error) => {
            if (!axios.isCancel(error)) {
                console.error(error);
            }
        });

        axios.get(`${API_URL}/groups/allmem/${groupId}`, {
            cancelToken: cancelToken2.token
        }).then((response) => {
            setAllMembers(response.data.toString());
        }).catch((error) => {
            if (!axios.isCancel(error)) {
                console.error(error);
            }
        });
    }, [row, col]);

    const debouncedGetMembers = useCallback(_.debounce(getMembers, 50), [getMembers]);

    useEffect(() => {
        debouncedGetMembers();

        return () => {
            cancelToken1.cancel("Component got unmounted");
            cancelToken2.cancel("Component got unmounted");
            debouncedGetMembers.cancel();
        };
    }, [debouncedGetMembers]);

    if (scheduleCheck) {
        return null;
    }

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

    const isUnavailable = (member) => {
        return !availableMembers.includes(member);
    };

    return (
        <div className='SideBar'>

            <div className='SideBarHeader'>
                <h3>Group Availability</h3>
                {isLoading ?
                    "Loading..." :
                    <React.Fragment>
                        {days[col]}<br />
                        {timeOptions[(startTimeIndex + row) % 96]} - {timeOptions[(startTimeIndex + row + 1) % 96]}
                    </React.Fragment>
                }
            </div>
            <div className='SideBarContent'>
                <h5>Available:<br />{availableCount}/{allCount}</h5>
                {membersLoading ? "Loading..." :
                    <ul>
                        {allMembers.split(',').map((member, index) => (
                            <li key={index} style={isUnavailable(member.trim()) ? { textDecoration: "line-through" } : {}}>
                                {member}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}

export default GroupSideBar

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