import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";

function DaysOfTheWeek() {
    const [days, setDays] = useState([]);
    const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;
  
    useEffect(() => {
      async function fetchData() {
        const daysData = await GetDays();
        setDays(daysData);
      }
  
      fetchData();
    }, []);
  
    return (
      <div className="DOTWBar" style={{gridTemplateColumns}}>
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
      const response = await axios.post(`http://localhost:4000/days?group=${URL[URL.length - 1]}`);
      return response.data.split(",");
    } catch (error) {
      console.error(error);
      return [];
    }
  }

export default DaysOfTheWeek;