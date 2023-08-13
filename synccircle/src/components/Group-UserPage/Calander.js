import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Slot from "./Slot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";
import io from 'socket.io-client';
import { Socket } from "engine.io-client";

function Calendar() {
  const { groupId, userId, userArray, setUserArray, stopped, setUserSlot, userSlot } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currTimeIndex, setCurrTimeIndex] = useState(0);

  const [calSocket, setCalSocket] = useState(null);

  useEffect( () => {
      const socket = io('http://localhost:4000', { transports : ['websocket'] });
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
      console.log("AM swiping")
    }
    else {
      console.log("Failed Swipe")
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    console.log("Not swiping")
  };

  const handleTouchMove = (e) => {
    // Get the touch position from the event
    const touch = e.changedTouches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };


  useEffect(() => {
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`http://localhost:4000/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);
      setStart(response.data.start_time);
      setEnd(response.data.end_time);
      console.log(response.data);
    }
    async function fetchUser() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`http://localhost:4000/users/${URL[URL.length - 1]}/${userId}`);
      setUserArray(response.data.availability_array);
    }

    fetchData();
    fetchUser();
    //console.log(userArray);
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

      return (parsedHour - 6);
    }


    const startTimeIndex = convertTimeToIndex(start);
    const endTimeIndex = convertTimeToIndex(end);
    const timeIndex = convertTimeToIndex(start);

    setStartIndex(startTimeIndex);
    setCurrTimeIndex(timeIndex);
    setEndIndex(endTimeIndex);
  }, [start, end]);

  /*useEffect(() => {
    //console.log(userSlot);
    if (isDragging === false || isSwiping === false  && stopped == true && userArray !== null && userId !== "" ) {
      const sendSlots = async () => {
        const response = await axios.post(`http://localhost:4000/users/massbook/${groupId}/${userId}`, { user_array: userArray });
        setUserSlot(Math.random());
      }
      sendSlots();
    }
    else if (typeof userSlot === 'string' && userSlot.startsWith("Press")) {
      setUserSlot(Math.random());
    }
  }, [isDragging, isSwiping]); */

  const numRows = (endIndex + 1 - startIndex);

  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
  const gridTemplateRows = `repeat(${numRows}, 1fr)`;
  const totalCells = (days.length + 1) * (numRows);

  // Set CSS variables

  return (
    <div className="CalendarGrid"
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ gridTemplateColumns, gridTemplateRows }}>
      {/* Generate and render grid items */}

      {Array.from({ length: totalCells }, (_, index) => {
        const row = Math.floor(index / (days.length + 1));
        const col = index % (days.length + 1) - 1;
        const cellValue = userArray && row >= 0 && row < userArray.length && col >= 0 && col < userArray[row].length
          ? userArray[row][col]
          : 0;

        return index % (days.length + 1) === 0 ? (
          <TimeLabel
            key={index}
            currTimeIndex={startIndex + row}
          />
        ) : (<Slot key={index} matrixKey={index} days={days} dragging={isDragging} swiping={isSwiping} touchPosition={touchPosition} cellValue={cellValue} socket={calSocket}/>
        );
      })}

    </div>
  );
}

export default Calendar;