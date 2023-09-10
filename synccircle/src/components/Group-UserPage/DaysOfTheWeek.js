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
      console.log(daysData);
      if (daysData[0] == "isDaysOftheWeek"){
        daysData.shift(); //remove isDaysOftheWeek from the array
        const sortedDaysData = sortDays(daysData);
        setDays(sortedDaysData);
      }
      else{
        const extractedDays = [];
        for (let i = 1; i < daysData.length; i+=2) {
          extractedDays.push(daysData[i]);
        }
        setDays(extractedDays); // Set the state with the extracted days
      }
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

export default DaysOfTheWeek;
