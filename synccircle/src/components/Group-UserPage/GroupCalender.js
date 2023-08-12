import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GroupSlot from "./GroupSlot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";
import io from 'socket.io-client';

function GroupCalendar({ setPopupMatrixKey, setPopupColor }) {
  const { groupId, userId, userSlot } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currTimeIndex, setCurrTimeIndex] = useState(0);
  const [masterArray, setMasterArray] = useState(null);

  const [groupSocket, setGroupSocket] = useState(null);

  useEffect( () => {
    const socket = io('http://localhost:4000', { transports : ['websocket'] });
    setGroupSocket(socket);
  }, []);

  useEffect(() => {
    if (groupSocket) { // Check if groupSocket is not null
      groupSocket.on('unbooked', (row, col) => {
        console.log("Unbooked" + row + " " + col);
      });
  
      groupSocket.on('booked', (row, col) => {
        console.log("booked" + row + " " + col);
      });
    }
  }, [groupSocket]); // Add groupSocket as a dependency

  useEffect(() => {
    // Combine fetching of days, start, and end into a single function
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`http://localhost:4000/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);
      setStart(response.data.start_time);
      setEnd(response.data.end_time);
      setMasterArray(response.data.master_array);
    }

    fetchData();
  }, [userSlot]);

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
    
      return (parsedHour - 6);
    }
    

    const startTimeIndex = convertTimeToIndex(start);
    const endTimeIndex = convertTimeToIndex(end);
    const timeIndex = convertTimeToIndex(start);

    setStartIndex(startTimeIndex);
    setCurrTimeIndex(timeIndex);
    setEndIndex(endTimeIndex);
  }, [start, end]);

  const numRows = (endIndex + 1 - startIndex);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows}, 1fr)`;
  const totalCells = (days.length + 1) * (numRows);



  // Set CSS variables

  return (
    <div className="CalendarGrid" style={{ gridTemplateColumns, gridTemplateRows }}>
      {/* Generate and render grid items */}

      {Array.from({ length: totalCells }, (_, index) => {
        const row = Math.floor(index / (days.length + 1));
        const col = index % (days.length + 1) - 1;

        const cellValue = masterArray && row >= 0 && row < masterArray.length && col >= 0 && col < masterArray[row].length
          ? masterArray[row][col]
          : 0;

        return index % (days.length + 1) === 0 ? (
          <TimeLabel
            key={index}
            currTimeIndex={startIndex + row}
          />
        ) : (<GroupSlot key={index} matrixKey={index} days={days} groupId={groupId} userId={userId} setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor} cellValue={cellValue} socket={groupSocket}/>
        );
      })}

    </div>
  );
}

export default GroupCalendar;