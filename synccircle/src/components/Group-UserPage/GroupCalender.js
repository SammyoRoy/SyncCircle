import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import GroupSlot from "./GroupSlot";
import TimeLabel from "./TimeLabel";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";
import { AppContext } from "../../context/AppContext";
import io from 'socket.io-client';

function GroupCalendar({ setPopupMatrixKey, setPopupColor, setGroupSlotClicked, isDaysOfTheWeek, setIsDaysOfTheWeek }) {
  const { groupId, userId, userSlot } = useContext(AppContext);

  const [days, setDays] = useState([]);
  const [dates, setDates] = useState([]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const [masterArray, setMasterArray] = useState(null);
  const [numAvailArr, setNumAvailArr] = useState(null);


  const [groupSocket, setGroupSocket] = useState(null);
  const [modifiedKey, setModifiedKey] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [addedNewMember, setAddedNewMember] = useState(true);

  useEffect(() => {
    const socket = io('https://backend.synccircle.net', { transports: ['websocket'] });
    setGroupSocket(socket);
  }, []);

  useEffect(() => {
    // Combine fetching of days, start, and end into a single function
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`https://backend.synccircle.net/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);

      const daysData = await GetDays();
      if (daysData[0] === "isDaysOftheWeek") {
        daysData.shift(); //remove isDaysOftheWeek from the array
        setIsDaysOfTheWeek(true);
        const sortedDaysData = sortDays(daysData);
        setDays(sortedDaysData);
      }
      else {
        const extractedDays = [];
        const extractedDates = [];
        for (let i = 1; i < daysData.length; i += 2) {
          extractedDays.push(daysData[i]);
        }
        for (let i = 0; i < daysData.length; i += 2) {
          extractedDates.push(convertDateString(daysData[i]));
        }
        setDates(extractedDates); // Set the state with the extracted dates
        setDays(extractedDays); // Set the state with the extracted days
      }

      setStart(response.data.start_time);
      setEnd(response.data.end_time);
      setMasterArray(response.data.master_array);
      setAddedNewMember(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (masterArray) {
      const lengthsArray = masterArray.map(innerArray =>
        // Map through each sub-array in the inner array
        innerArray.map(subArray => subArray.length)
      );

      setNumAvailArr(lengthsArray);
      console.log("Num avail :" + numAvailArr);
    }
  }, [masterArray]);

  useEffect(() => {
    if (groupId !== "") {
      async function fetchData() {
        const response = await axios.get(
          `https://backend.synccircle.net/groups/nummem/${groupId}`
        );
        const totalMembersValue = parseInt(response.data);
        setTotalMembers(totalMembersValue);
        setAddedNewMember(true);
      }
      fetchData();
      console.log("Getting total mems");
    }
  }, [addedNewMember]);

  function sortDays(daysData) {
    // Define the correct order of the days
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }

  async function GetDays() {
    const URL = window.location.href.split("/");
    try {
      const response = await axios.get(
        `https://backend.synccircle.net/groups/${URL[URL.length - 1]}`
      );
      return response.data.days;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function convertDateString(dateStr) {
    const months = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    };

    const [monthStr, day] = dateStr.split(" ");
    const month = months[monthStr];
    return `${month}/${day}`;
  }

  useEffect(() => {
    // Function to convert time to index, not asynchronous
    function convertTimeToIndex(time) {
      const [hourMinute, period] = time.split(' ');
      const [hour] = hourMinute.split(':');
      let parsedHour = parseInt(hour, 10);

      if (period === "PM" && parsedHour < 12) {
        parsedHour += 12;
      }

      if (period === "AM" && parsedHour === 12) {
        parsedHour = 0;
      }

      const timeOptions = [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM'
      ];

      // Find the index of the parsed time in the timeOptions array
      const index = timeOptions.findIndex(option => option === time);

      return index;
    }

    const startTimeIndex = convertTimeToIndex(start);
    const endTimeIndex = convertTimeToIndex(end);
    const timeIndex = convertTimeToIndex(start);

    setStartIndex(startTimeIndex);
    setEndIndex(endTimeIndex);
  }, [start, end]);

  useEffect(() => {
    if (groupSocket) { // Check if groupSocket is not null

      groupSocket.on('new user', (signalGroupId) => {
        if (groupId == signalGroupId) {
          setAddedNewMember(false);
        }
      });

      groupSocket.on('unbooked', (matrixKey, signalGroupId) => {
        if (groupId == signalGroupId) {
          setModifiedKey(matrixKey);
          setIsBooked(false);
        }
      });

      groupSocket.on('booked', (matrixKey, signalGroupId) => {
        if (groupId == signalGroupId) {
          setModifiedKey(matrixKey);
          setIsBooked(true);
        }
      });
    }
  }, [groupSocket]); // Add groupSocket as a dependency

  function getNumAvail(row, col) {
    if (numAvailArr === null) {
      return;
    }
    const num = numAvailArr[row][col];
    return num;
  }

  const numRows = endIndex >= startIndex
    ? endIndex - startIndex + 1
    : endIndex + 24 - startIndex + 1;

  const gridTemplateColumns = `repeat(${days.length}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows + 1}, 1fr)`;
  const totalCells = (days.length) * (numRows);

  return (
    <div className="CalendarContainer">

      <div className="TimeLabelContainer">
        <ScrollIcon />
        {Array.from({ length: numRows }, (_, index) => {
          return (
            <TimeLabel
              key={index}
              currTimeIndex={(startIndex + index) % 24}
            />
          );
        })}
      </div>

      <div className="CalendarGrid" style={{ gridTemplateColumns, gridTemplateRows }}>
        {/* Generate and render grid items */}

        {days.map((day, index) => {
          return (
            <div className="DayLabelContainer">
              <DayLabels key={index} day={day} length={days.length} />
              {!isDaysOfTheWeek && <div className="dateLabel">{dates[index]}</div>}
            </div>
          );
        })}

        {Array.from({ length: totalCells }, (_, index) => {
          const row = Math.floor(index / (days.length));
          const col = index % (days.length);
          let cellValue = getNumAvail(row, col);

          return (
            <GroupSlot
              key={index}
              matrixKey={index}
              days={days}
              groupId={groupId}
              userId={userId}
              setPopupMatrixKey={setPopupMatrixKey}
              setPopupColor={setPopupColor}
              setGroupSlotClicked={setGroupSlotClicked}
              cellValue={cellValue}
              totalMembers={totalMembers}
              modifiedKey={modifiedKey}
              isBooked={isBooked}
            />
          );
        })}

      </div>

    </div>
  );
}

export default GroupCalendar;