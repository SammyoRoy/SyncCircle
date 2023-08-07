import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GroupSlot from "./GroupSlot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";

function GroupCalendar({ setPopupMatrixKey, setPopupColor }) {
  const { groupId, userId } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currTimeIndex, setCurrTimeIndex] = useState(0);

  useEffect(() => {
    // Combine fetching of days, start, and end into a single function
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`http://localhost:4000/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);
      setStart(response.data.start_time);
      setEnd(response.data.end_time);
    }

    fetchData();
  }, []);
  
  useEffect(() => {
    // Function to convert time to index, not asynchronous
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
    <div className="CalendarGrid" style={{ gridTemplateColumns, gridTemplateRows }}>
      {/* Generate and render grid items */}

      {Array.from({ length: totalCells }, (_, index) => (
        index % (days.length + 1) === 0 ? (
          <TimeLabel
            key={index}
            currTimeIndex={startIndex + Math.floor(index / (days.length + 1))}
          />
        ) : (<GroupSlot key={index} matrixKey={index} days={days} groupId={groupId} userId={userId} setPopupMatrixKey={setPopupMatrixKey} setPopupColor={setPopupColor} />
        ))
      )}
    </div>
  );
}

export default GroupCalendar;