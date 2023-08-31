import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ScrollIcon from "./ScrollIcon";
import DayLabels from "./DayLabels";
import { AppContext } from "../../context/AppContext";

function DaysOfTheWeek({ styling }) {
  const [days, setDays] = useState([]);
  const { groupId } = useContext(AppContext);
  const gridTemplateColumns = `76px repeat(${days.length}, 1fr)`;

  useEffect(() => {
    async function fetchData() {
      const URL = window.location.href.split("/");
      try {
        const response = await axios.get(`https://backend.synccircle.net/groups/${URL[URL.length - 1]}`);
        const daysData = sortDays(response.data.days);
        setDays(daysData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [groupId]);

  function sortDays(daysData) {
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

export default DaysOfTheWeek;
