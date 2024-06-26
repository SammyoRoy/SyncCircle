import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Slot from "./Slot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";
import io from 'socket.io-client';
import { CircularProgress } from "@mui/material";
import moment from 'moment-timezone';


function Calendar() {
  const { groupId, userId, userArray, setUserArray, stopped, loading, setUserSlot, userSlot, startColumn, MAX_COLUMNS_DISPLAYED } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [initialCellValue, setInitialCellValue] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL;

  //const [currTimeIndex, setCurrTimeIndex] = useState(0);
  const touchRef = useRef(null);

  const [calSocket, setCalSocket] = useState(null);

  useEffect(() => {
    const socket = io(`${API_URL}`, { transports: ['websocket'] });
    setCalSocket(socket);
  }, []);


  //Dragging
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    if (userId !== "") {
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e) => {
    if (userId !== "") {
      setIsSwiping(true);
      // Get the touch position from the event
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    setTouchPosition(null);
  };



  useEffect(() => {
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);
      setStart(response.data.start_time);
      setEnd(response.data.end_time);
      setTimeZone(response.data.time_zone);
      //console.log(response.data);
    }
    async function fetchUser() {
      if (groupId) {
        const URL = window.location.href.split("/");
        const response = await axios.get(`${API_URL}/users/${groupId}/${userId}`);
        setUserArray(response.data.availability_array);
      }
    }

    fetchData();
    fetchUser();
  }, [userId]);

  useEffect(() => {
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
    if (timeZone !== "" && timeZone !== undefined) {

      const startTimeIndex = convertTimeToIndex(start);
      const endTimeIndex = convertTimeToIndex(end);
      const timeIndex = convertTimeToIndex(start);
      const now = new moment();
      const groupTimeZoneOffset = now.tz(timeZone).utcOffset();
      //const userTimeZoneOffset = now.tz("Asia/Kolkata").utcOffset();
      const userTimeZoneOffset = now.tz(moment.tz.guess()).utcOffset();
      let timeZoneOffset = groupTimeZoneOffset - userTimeZoneOffset;
      timeZoneOffset = timeZoneOffset / 60;
      const adjustedStartIndex = (startTimeIndex - Math.round(timeZoneOffset) + 24) % 24;
      const adjustedEndIndex = (endTimeIndex - Math.round(timeZoneOffset) + 24) % 24;

      setStartIndex(adjustedStartIndex);
      setEndIndex(adjustedEndIndex);
    }
    else{
      const startTimeIndex = convertTimeToIndex(start);
      const endTimeIndex = convertTimeToIndex(end);
      const timeIndex = convertTimeToIndex(start);
      setStartIndex(startTimeIndex);
      setEndIndex(endTimeIndex);
    }

  }, [start, end, timeZone]);

  useEffect(() => {
    if (isDragging === false && isSwiping === false && userArray !== undefined && userId !== "") {
      const sendSlots = async () => {
        const response = await axios.post(`${API_URL}/users/massbook/${groupId}/${userId}`, { user_array: userArray });
        setUserSlot(Math.random());

      }
      sendSlots();
      setInitialCellValue(0);
    }
    setInitialCellValue(1);
  }, [isDragging, isSwiping]);

  const numRows = endIndex >= startIndex
    ? endIndex - startIndex
    : endIndex + 24 - startIndex;


  /*const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows}, 1fr)`;
  const totalCells = (days.length + 1) * (numRows);*/

  const columnsDisplayed = Math.min(days.length, MAX_COLUMNS_DISPLAYED);
  const gridTemplateColumns = `76px repeat(${columnsDisplayed}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows}, 1fr)`

  const totalCells = (columnsDisplayed + 1) * (numRows);

  const eventHandlers = !loading ? {
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onMouseLeave: handleMouseUp,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  } : {};

  // Set CSS variables

  return (
    <div className="CalenderContainer">
      {loading && (
        <div className="CalendarLoadingOverlay" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 1000 
        }}>
          <CircularProgress />
        </div>
      )}
      <div className="CalendarGrid"
        {...eventHandlers}
        style={{ gridTemplateColumns, gridTemplateRows }}>
        {/* Generate and render grid items */}

        {Array.from({ length: totalCells }, (_, index) => {
          const row = Math.floor(index / (columnsDisplayed + 1));
          const col = index % (columnsDisplayed + 1) - 1 + startColumn;
          const cellValue = userArray && row >= 0 && row < userArray.length && col >= 0 && col < userArray[row].length
            ? userArray[row][col]
            : 0;

          return index % (columnsDisplayed + 1) === 0 ? (
            <TimeLabel
              key={index}
              currTimeIndex={(startIndex + row) % 24}
            />
          ) : (<Slot key={index} matrixKey={index} days={days} dragging={isDragging} swiping={isSwiping} touchPosition={touchPosition} cellValue={cellValue} socket={calSocket} initialCellValue={initialCellValue} />
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;