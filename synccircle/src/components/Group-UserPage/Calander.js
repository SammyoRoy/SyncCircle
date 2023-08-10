import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Slot from "./Slot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";

function Calendar() {
  const { userId } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currTimeIndex, setCurrTimeIndex] = useState(0);
  const [availabilityArray, setAvailabilityArray] = useState(null);

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
    }
    async function fetchUser() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`http://localhost:4000/users/${URL[URL.length - 1]}/${userId}`);
      setAvailabilityArray(response.data.availability_array);
    }

    fetchData();
    fetchUser();
    console.log(availabilityArray);
  }, [userId]);

  useEffect(() => {
    function convertTimeToIndex(time) {
      const [hour] = time.split(':');
      const parsedHour = parseInt(hour, 10);

      if (parsedHour >= 6) {
        return (parsedHour - 6);
      }
      else {
        return (parsedHour + 18);
      }
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
        const cellValue = availabilityArray && row >= 0 && row < availabilityArray.length && col >= 0 && col < availabilityArray[row].length
        ? availabilityArray[row][col]
        : 0;

        return index % (days.length + 1) === 0 ? (
          <TimeLabel
            key={index}
            currTimeIndex={startIndex + row}
          />
        ) : (<Slot key={index} matrixKey={index} days={days} dragging={isDragging} swiping={isSwiping} touchPosition={touchPosition} cellValue={cellValue} />
        );
      })}

    </div>
  );
}

export default Calendar;