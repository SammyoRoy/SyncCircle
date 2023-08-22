import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";

function DaysOfTheWeek({ styling }) {
  const [days, setDays] = useState([]);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  useEffect(() => {
    async function fetchData() {
      const daysData = await GetDays();
      const sortedDaysData = sortDays(daysData);
      setDays(sortedDaysData);
    }

    fetchData();
  }, []);

  function sortDays(daysData) {
    // Define the correct order of the days
    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysData.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }

  return (
    <div className={styling} style={{ gridTemplateColumns }}>
      <ScrollIcon />
      {days.map((day, index) => (
        <DayLabels key={index} day={day} length={days.length} />
      ))}
    </div>
  );
}

async function GetDays() {
  const URL = window.location.href.split("/");
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await axios.get(
      `${API_URL}/groups/${URL[URL.length - 1]}`
    );
    return response.data.days;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default DaysOfTheWeek;
